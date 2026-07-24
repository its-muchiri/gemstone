import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { mpesaCheckoutSchema } from '@/lib/validation/order'
import { initiateStkPush, normalizeKenyanPhone } from '@/lib/payments/mpesa'
import { transitionOrderStatus } from '@/lib/orders'
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from '@/lib/rateLimit'

const USD_TO_KES_RATE = 155

export async function POST(req: NextRequest) {
  try {
    let user
    try {
      user = await requireAuth()
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AuthError') {
        return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 })
      }
      throw err
    }

    const rl = checkRateLimit(`checkout:${user.id}`, RATE_LIMITS.checkout)
    if (!rl.allowed) {
      return rateLimitResponse(rl.resetAt)
    }
    const body = await req.json()

    const parsed = mpesaCheckoutSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { orderId, phoneNumber } = parsed.data

    const normalizedPhone = normalizeKenyanPhone(phoneNumber)
    if (!normalizedPhone) {
      return NextResponse.json(
        { error: 'Invalid Kenyan phone number. Use format 07XXXXXXXX or 2547XXXXXXXX' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (order.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Order status is ${order.status}, expected PENDING` },
        { status: 409 }
      )
    }

    if (order.payment) {
      return NextResponse.json(
        { error: 'Payment already initiated for this order' },
        { status: 409 }
      )
    }

    const amountKes = Math.round((order.totalCents / 100) * USD_TO_KES_RATE)

    const stkResponse = await initiateStkPush({
      amount: amountKes,
      phoneNumber: normalizedPhone,
      accountReference: order.id,
      transactionDesc: `GemStore order ${order.id}`,
    })

    await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: 'MPESA',
        status: 'WAITING',
        amount: amountKes,
        currency: 'KES',
        mpesaCheckoutRequestId: stkResponse.CheckoutRequestID,
        mpesaMerchantRequestId: stkResponse.MerchantRequestID,
        phoneNumber: normalizedPhone,
      },
    })

    await transitionOrderStatus(order.id, 'AWAITING_PAYMENT')

    return NextResponse.json({
      checkoutRequestId: stkResponse.CheckoutRequestID,
      message: 'Check your phone to complete payment',
    })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AuthError') {
      return NextResponse.json({ error: error.message }, { status: (error as any).status })
    }
    console.error('M-Pesa checkout error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'Failed to initiate M-Pesa payment' },
      { status: 502 }
    )
  }
}
