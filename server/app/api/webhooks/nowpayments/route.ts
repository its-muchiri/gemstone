import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyNowPaymentsSignature } from '@/lib/payments/nowpayments'
import { transitionOrderStatus, decrementStock } from '@/lib/orders'
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from '@/lib/rateLimit'

const NOWPAYMENTS_STATUS_MAP: Record<string, string> = {
  waiting: 'WAITING',
  confirming: 'CONFIRMING',
  confirmed: 'CONFIRMED',
  finished: 'FINISHED',
  failed: 'FAILED',
  expired: 'EXPIRED',
  refunded: 'REFUNDED',
}

export async function POST(req: NextRequest) {
  try {
    const rl = checkRateLimit('webhook:nowpayments', RATE_LIMITS.webhook)
    if (!rl.allowed) {
      return rateLimitResponse(rl.resetAt)
    }

    const rawBody = await req.text()
    let body: Record<string, unknown>
    try {
      body = JSON.parse(rawBody)
    } catch {
      return new NextResponse('Invalid JSON', { status: 400 })
    }

    const signature = req.headers.get('x-nowpayments-sig')
    if (!signature) {
      return new NextResponse('Missing signature', { status: 401 })
    }

    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET
    if (!ipnSecret) {
      console.error('NowPayments IPN: NOWPAYMENTS_IPN_SECRET not configured')
      return new NextResponse(null, { status: 500 })
    }

    const isValid = await verifyNowPaymentsSignature(body, signature, ipnSecret)
    if (!isValid) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    const invoiceId = String(body.invoice_id || body.nowpayments_invoice_id)
    const orderId = String(body.order_id)
    const paymentStatus = String(body.payment_status)

    const payment = await prisma.payment.findFirst({
      where: {
        OR: [
          { nowpaymentsInvoiceId: invoiceId },
          { orderId: orderId },
        ],
      },
    })

    if (!payment) {
      console.warn('NowPayments IPN: No payment found for invoice')
      return new NextResponse(null, { status: 200 })
    }

    const mappedStatus = NOWPAYMENTS_STATUS_MAP[paymentStatus]
    if (!mappedStatus) {
      console.warn('NowPayments IPN: Unknown status')
      return new NextResponse(null, { status: 200 })
    }

    if (payment.status === 'FINISHED') {
      return new NextResponse(null, { status: 200 })
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: mappedStatus as any,
        nowpaymentsPaymentId: String(body.payment_id || payment.nowpaymentsPaymentId),
        rawCallbackPayload: body as any,
      },
    })

    if (mappedStatus === 'FINISHED') {
      try {
        await transitionOrderStatus(payment.orderId, 'PAID')
        await decrementStock(payment.orderId)
      } catch (err) {
        console.error('NowPayments IPN: Failed to transition order to PAID:', err instanceof Error ? err.message : err)
        return new NextResponse('Order transition failed', { status: 500 })
      }
    } else if (mappedStatus === 'FAILED' || mappedStatus === 'EXPIRED') {
      try {
        await transitionOrderStatus(payment.orderId, 'FAILED')
      } catch {
        return new NextResponse('Order transition failed', { status: 500 })
      }
    }

    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.error('NowPayments webhook error:', error instanceof Error ? error.message : error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
