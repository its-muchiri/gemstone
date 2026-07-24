import { NextRequest, NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from '@/lib/rateLimit'

const handler = NextAuth(authOptions)

async function rateLimitedHandler(req: NextRequest, ctx: { params: { nextauth: string[] } }) {
  const action = ctx.params.nextauth?.[0]

  if (action === 'callback' || action === 'signin') {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = checkRateLimit(`login:${ip}`, RATE_LIMITS.login)
    if (!rl.allowed) {
      return rateLimitResponse(rl.resetAt)
    }
  }

  return handler(req, ctx)
}

export { rateLimitedHandler as GET, rateLimitedHandler as POST }
