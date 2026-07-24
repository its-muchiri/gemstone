# Security Overview — GemStore

## Scope

This document covers application-level security controls implemented in the GemStore backend (`server/` directory). It does **not** cover:

- **Card/payment data custody** — NowPayments and Safaricom Daraja handle all payment instrument data. GemStore never stores, transmits, or logs raw card numbers, CVVs, or M-Pesa PINs.
- **Infrastructure security** — TLS termination, firewall rules, and OS-level hardening are the responsibility of the hosting provider (e.g. Vercel, Railway, AWS).
- **Regulatory compliance** — This application does not hold PCI-DSS, SOC 2, or GDPR certifications. Payment processing is delegated to NowPayments and Safaricom, which maintain their own compliance postures.

## Authentication & Authorization

**Password hashing:** bcrypt via `bcryptjs`, cost factor 12. Passwords are never stored in plaintext or reversibly encrypted.

**Password policy:** Minimum 8 characters, enforced at registration via Zod validation (`lib/validation/auth.ts`).

**Session strategy:** JWT via NextAuth.js (Auth.js), signed with `NEXTAUTH_SECRET`. The JWT token contains `id`, `email`, `name`, and `role` (CUSTOMER | ADMIN).

**Session cookies:** Configured with `httpOnly: true`, `sameSite: lax`, `path: /`, and `secure: true` in production. In development, the `Secure` flag is disabled for localhost.

**Role-based access control:**
- `requireAuth()` in `lib/auth.ts` — rejects unauthenticated requests with 401.
- `requireAdmin()` in `lib/auth.ts` — rejects non-admin users with 403. Used on all `/api/admin/**` routes.
- Every API route that touches user-specific resources calls `requireAuth()` before any database operation.

**Ownership checks:** Resources belonging to a user (orders, wishlist) verify `resource.userId === session.user.id` or `session.user.role === 'ADMIN'` before returning data. See `app/api/orders/[id]/route.ts` for the canonical example.

**Login error messages:** The NextAuth `authorize` callback returns `null` for both "no such user" and "wrong password" — the same generic error is returned either way, preventing user enumeration.

## Secrets Management

All secrets are read exclusively via `process.env` on the server side. No secret is prefixed with `NEXT_PUBLIC_`. No secret value appears in client-side bundles, console logs returned to clients, error messages, or code comments.

| Variable | Purpose | File |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `lib/prisma.ts` |
| `NEXTAUTH_SECRET` | JWT signing key | `lib/auth.ts` (via NextAuth) |
| `NEXTAUTH_URL` | NextAuth base URL | NextAuth config |
| `APP_URL` | Application URL for webhook callbacks | Checkout routes |
| `NOWPAYMENTS_API_KEY` | NowPayments API authentication | `lib/payments/nowpayments.ts` |
| `NOWPAYMENTS_IPN_SECRET` | NowPayments IPN HMAC-SHA512 secret | Webhook handler |
| `NOWPAYMENTS_API_BASE` | NowPayments API endpoint | `lib/payments/nowpayments.ts` |
| `NOWPAYMENTS_SANDBOX` | NowPayments sandbox mode flag | Referenced in env |
| `MPESA_CONSUMER_KEY` | Safaricom Daraja consumer key | `lib/payments/mpesa.ts` |
| `MPESA_CONSUMER_SECRET` | Safaricom Daraja consumer secret | `lib/payments/mpesa.ts` |
| `MPESA_SHORTCODE` | M-Pesa PayBill/Till number | `lib/payments/mpesa.ts` |
| `MPESA_PASSKEY` | M-Pesa Daraja passkey | `lib/payments/mpesa.ts` |
| `MPESA_ENV` | "sandbox" or "production" | `lib/payments/mpesa.ts` |

**NEXTAUTH_SECRET generation:** Generate with `openssl rand -base64 32`. Do not hardcode an example secret.

**.env policy:** `.env` and `.env.*` are gitignored. Only `.env.example` is committed, containing empty/placeholder values. No real secrets in `.env.example`.

## Webhook Verification

### NowPayments IPN

- Signature algorithm: HMAC-SHA512
- Verification: The IPN secret (`NOWPAYMENTS_IPN_SECRET`) is used to compute HMAC-SHA512 over the JSON body with keys sorted alphabetically. The computed signature is compared against the `x-nowpayments-sig` header using `crypto.timingSafeEqual` (constant-time comparison) to prevent timing attacks.
- The raw body is read as text before parsing to preserve exact bytes for signature computation.
- Requests without a signature header are rejected with 401.

### M-Pesa Daraja Callback

- Daraja does not provide a signature scheme. Verification is done by confirming the `CheckoutRequestID` in the callback matches an existing `Payment.mpesaCheckoutRequestId` row in the database — a row that was only created by our own `POST /api/checkout/mpesa` call.
- Callbacks with unrecognized `CheckoutRequestID` values are acknowledged with 200 but not processed.
- The source IP of every callback is logged for audit purposes. IP allow-listing of Safaricom's published IP ranges is recommended at the infrastructure/firewall level for production but not implemented in application code.

### Idempotency

Both webhook handlers check `Payment.status` before processing transitions. If the payment is already in `FINISHED` status, the callback is acknowledged with 200 and no further state changes occur. This prevents double-fulfillment from retried callbacks.

## Rate Limiting

An in-memory rate limiter (`lib/rateLimit.ts`) is used. **Known limitation:** The rate limiter state resets on server restart and does not work across multiple server instances. In a multi-instance deployment, each instance maintains its own counters.

| Route | Threshold | Window | Key |
|---|---|---|---|
| `POST /api/auth/[...nextauth]` (login) | 5 attempts | 15 minutes | IP address |
| `POST /api/register` | 3 attempts | 1 minute | Global |
| `POST /api/checkout/nowpayments` | 3 requests | 1 minute | User ID |
| `POST /api/checkout/mpesa` | 3 requests | 1 minute | User ID |
| `POST /api/webhooks/*` | 100 requests | 1 minute | Global |

Webhook rate limits are deliberately generous to avoid dropping legitimate provider retries (NowPayments and Safaricom both retry on non-200 responses).

Rate-limited requests receive HTTP 429 with a `Retry-After` header.

## Data Handling

### PII Stored

| Field | Location | Purpose |
|---|---|---|
| `User.email` | `User` table | Authentication identifier |
| `User.name` | `User` table | Display name |
| `User.phone` | `User` table | Contact (optional) |
| `Order.shippingAddress` (JSON) | `Order` table | Order fulfillment |
| `Payment.phoneNumber` | `Payment` table | M-Pesa transaction reference |
| `Payment.rawCallbackPayload` (JSON) | `Payment` table | Audit trail for payment callbacks |

### Log Redaction

- Error logs use `error instanceof Error ? error.message : error` to avoid logging full stack traces or Prisma query details.
- Raw payment callback payloads are stored in the database for audit but not logged in plaintext to console.
- Phone numbers and shipping addresses are not logged in application logs.

## Error Handling

- All API routes return `{ error: "Internal server error" }` with status 500 for unexpected errors in production. Stack traces and raw Prisma errors are never returned to the client.
- Validation errors return `{ error: "Validation failed", details: ... }` with status 400 — the Zod error details contain field-level validation messages, not internal implementation details.
- Auth errors return generic messages ("Unauthenticated", "Forbidden") without revealing internal state.
- Expected failures (M-Pesa `ResultCode !== 0` from user cancellation, NowPayments `EXPIRED` status) are handled gracefully and logged as warnings, not errors.

## Dependency Management

- `package-lock.json` is committed to ensure reproducible installs.
- Security-sensitive packages (`bcryptjs`, `next-auth`, `zod`, `@prisma/client`) are pinned to specific major.minor versions in `package.json`.
- `npm audit` should be run before each deploy. No analytics SDKs or unnecessary external dependencies are included.

## Known Limitations

1. **In-memory rate limiter:** Resets on server restart and does not synchronize across multiple server instances. A Redis-backed limiter would be needed for production multi-instance deployments.
2. **M-Pesa IP allow-listing:** Safaricom recommends restricting callback sources to their published IP ranges. This is recommended at the infrastructure/firewall level but not implemented in application code.
3. **M-Pesa exchange rate:** The USD-to-KES conversion uses a hardcoded rate (`155`) in `app/api/checkout/mpesa/route.ts`. A production deployment should use a live exchange rate API.
4. **No CSRF protection beyond NextAuth defaults:** NextAuth provides built-in CSRF protection for its routes. Other API routes rely on SameSite cookie policy and the fact that they require authentication.
5. **HTTPS enforcement:** Must be configured at the hosting/proxy level (e.g. Vercel automatic HTTPS, Cloudflare, nginx redirect rules). Next.js itself does not enforce HTTPS redirects.
6. **Database backups and encryption at rest:** Responsibility of the PostgreSQL hosting provider (Supabase, Neon, Railway). Verify your provider's plan includes encrypted backups.

## Reporting a Vulnerability

If you discover a security vulnerability in this application, please report it responsibly:

- **Email:** security@gemstore.example.com (placeholder — replace with a real address before production)
- **Do not** open a public GitHub issue for security vulnerabilities.
- Include a description of the vulnerability, steps to reproduce, and your suggested fix.
- We will acknowledge receipt within 48 hours and provide an update on remediation within 7 days.
