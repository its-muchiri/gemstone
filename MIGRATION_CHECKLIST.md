# Migration Checklist — Vite/React Router → Next.js App Router

## Phase 0: Pre-Migration Inventory

### Pages & Routes
- [ ] `/` — Home page (hero, best sellers, reviews, CTA, SEO content blocks)
- [ ] `/all-gemstones` — category index
- [ ] `/gemstones/:slug` — category listing with filters/sort
- [ ] `/product/:id` — product detail with gallery, related products
- [ ] `/cart` — cart page
- [ ] `/wishlist` — wishlist page
- [ ] `/search` — search results (reads `?q=`)
- [ ] `/help` — help landing
- [ ] `/help/:topic` — help subtopic (shipping, returns, checkout, contact, guarantee, about)
- [ ] 404 page

### Components
- [ ] Header: desktop nav, mobile hamburger, search-as-you-type, cart badge, wishlist link, currency selector
- [ ] Footer: link columns, newsletter signup, social icons, language switcher
- [ ] ProductCard: product tile with heart/cart buttons
- [ ] FilterSidebar: collapsible filter sections

### Contexts
- [ ] CartContext: add/remove/update quantity, live subtotal/total
- [ ] WishlistContext: add/remove
- [ ] CurrencyContext: convert, setCurrency

### Data Sources (to be replaced)
- [ ] products.ts → Prisma Product table
- [ ] categories.ts → Prisma Category table
- [ ] bestSellers.ts → computed from products
- [ ] testimonials.ts → keep as static data (no backend model)

### Animations
- [ ] useScrollReveal hook
- [ ] All CSS animations in index.css

### Backend API Routes (already exist)
- [ ] POST /api/auth/[...nextauth] — NextAuth
- [ ] POST /api/register — user registration
- [ ] GET /api/products — list with filters
- [ ] GET /api/products/[slug] — single product
- [ ] GET /api/categories — list categories
- [ ] GET/POST/PATCH/DELETE /api/wishlist — wishlist CRUD
- [ ] GET/POST /api/orders — order list/create
- [ ] GET /api/orders/[id] — single order
- [ ] POST /api/checkout/nowpayments — NowPayments
- [ ] POST /api/checkout/mpesa — M-Pesa STK Push
- [ ] POST /api/webhooks/nowpayments — IPN callback
- [ ] POST /api/webhooks/mpesa — STK callback
- [ ] Admin routes (products, orders)

## Data Model Mapping (frontend → backend)
- `Product.price` (USD float) → `Product.priceCents` (int cents)
- `Product.imageUrl` (single) → `Product.images[0]` (array)
- `Product.id` (used for URLs) → `Product.slug` (used for URLs)
- `Product.category` (string) → `Product.category.slug` (relation)
- `Product.dateAdded` → `Product.createdAt`
- `Category.imageUrl` → computed from product images
- `Category.productCount` → `_count.products`
- `Category.bestSellerPercent` → not in backend (remove or compute)
- `Category.colors` → not in backend (compute from products)

## Known Issues
- Frontend React 19 / Backend React 18 — need to upgrade backend to React 19
- Frontend Tailwind v4 / Backend no Tailwind — need to add Tailwind v4
- Product type fields differ between frontend and backend
