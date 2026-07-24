import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { transitionOrderStatus, decrementStock } from '@/lib/orders'
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from '@/lib/rateLimit'

interface MpesaCallbackItem {
  Name: string
  Value: string | number
}

interface MpesaStkCallback {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResultCode: number
  ResultDesc: string
  CallbackMetadata?: {
    Item: MpesaCallbackItem[]
  }
}

interface MpesaCallbackBody {
  Body: {
    stkCallback: MpesaStkCallback
  }
}

export async function POST(req: NextRequest) {
  try {
    const rl = checkRateLimit('webhook:mpesa', RATE_LIMITS.webhook)
    if (!rl.allowed) {
      return rateLimitResponse(rl.resetAt)
    }

    const rawBody = await req.text()
    let body: MpesaCallbackBody
    try {
      body = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    const stkCallback = body.Body?.stkCallback
    if (!stkCallback) {
      console.warn('M-Pesa webhook: Missing stkCallback')
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = stkCallback

    const payment = await prisma.payment.findFirst({
      where: { mpesaCheckoutRequestId: CheckoutRequestID },
    })

    if (!payment) {
      console.warn('M-Pesa webhook: No payment found for CheckoutRequestID')
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    if (payment.status === 'FINISHED') {
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        rawCallbackPayload: body as any,
      },
    })

    if (ResultCode === 0) {
      const items = CallbackMetadata?.Item || []
      const receiptItem = items.find((i) => i.Name === 'MpesaReceiptNumber')
      const amountItem = items.find((i) => i.Name === 'Amount')
      const phoneItem = items.find((i) => i.Name === 'PhoneNumber')

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FINISHED',
          mpesaReceiptNumber: receiptItem ? String(receiptItem.Value) : undefined,
          amount: amountItem ? Number(amountItem.Value) : payment.amount,
          phoneNumber: phoneItem ? String(phoneItem.Value) : payment.phoneNumber,
        },
      })

      try {
        await transitionOrderStatus(payment.orderId, 'PAID')
        await decrementStock(payment.orderId)
      } catch (err) {
        console.error('M-Pesa webhook: Failed to transition order:', err instanceof Error ? err.message : err)
      }
    } else {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
        },
      })

      try {
        await transitionOrderStatus(payment.orderId, 'FAILED')
      } catch {
        // Order may already be in a terminal state
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (error) {
    console.error('M-Pesa webhook error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  }
}
