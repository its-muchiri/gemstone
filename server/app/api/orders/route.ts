import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await requireAuth()

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: { include: { product: { select: { id: true, name: true, images: true } } } },
        payment: { select: { provider: true, status: true, amount: true, currency: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AuthError') {
      return NextResponse.json({ error: error.message }, { status: (error as any).status })
    }
    console.error('Orders list error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await req.json()

    const { createOrderSchema } = await import('@/lib/validation/order')
    const parsed = createOrderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { calculateOrderTotals } = await import('@/lib/orders')
    const { orderItems, subtotalCents, shippingCents, totalCents } =
      await calculateOrderTotals(parsed.data.items)

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        subtotalCents,
        shippingCents,
        totalCents,
        currency: 'USD',
        shippingAddress: parsed.data.shippingAddress,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: { include: { product: true } },
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AuthError') {
      return NextResponse.json({ error: error.message }, { status: (error as any).status })
    }
    console.error('Order create error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
