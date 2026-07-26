import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { nowpaymentsCheckoutSchema } from '@/lib/validation/order'
import { createNowPaymentsInvoice } from '@/lib/payments/nowpayments'
import { transitionOrderStatus } from '@/lib/orders'
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from '@/lib/rateLimit'

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

    const parsed = nowpaymentsCheckoutSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { orderId } = parsed.data

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

    const appUrl = process.env.APP_URL || 'http://localhost:3001'

    const invoice = await createNowPaymentsInvoice({
      price_amount: order.totalCents / 100,
      price_currency: 'usd',
      order_id: order.id,
      order_description: `GemStore order ${order.id}`,
      ipn_callback_url: `${appUrl}/api/webhooks/nowpayments`,
      success_url: `${appUrl}/orders/${order.id}?status=success`,
      cancel_url: `${appUrl}/orders/${order.id}?status=cancelled`,
    })

    await prisma.payment.create({
      data: {
        orderId: order.id,
        provider: 'NOWPAYMENTS',
        status: 'WAITING',
        amount: order.totalCents,
        currency: 'USD',
        nowpaymentsInvoiceId: String(invoice.id),
        nowpaymentsPaymentId: String(invoice.invoice_id),
        payAddress: invoice.invoice_url,
      },
    })

    await transitionOrderStatus(order.id, 'AWAITING_PAYMENT')

    return NextResponse.json({ invoiceUrl: invoice.invoice_url })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AuthError') {
      return NextResponse.json({ error: error.message }, { status: (error as any).status })
    }
    const detail = error instanceof Error ? error.message : String(error)
    console.error('NowPayments checkout error:', detail)
    return NextResponse.json(
      { error: `Payment failed: ${detail}` },
      { status: 502 }
    )
  }
}
