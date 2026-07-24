import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateOrderStatusSchema } from '@/lib/validation/order'
import { transitionOrderStatus } from '@/lib/orders'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

    const body = await req.json()
    const parsed = updateOrderStatusSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({ where: { id: params.id } })
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    await transitionOrderStatus(order.id, parsed.data.status)

    const updated = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: { include: { product: true } },
        payment: true,
      },
    })

    return NextResponse.json(updated)
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AuthError') {
      return NextResponse.json({ error: error.message }, { status: (error as any).status })
    }
    if (error instanceof Error && error.name === 'OrderTransitionError') {
      return NextResponse.json({ error: 'Invalid status transition' }, { status: 409 })
    }
    console.error('Admin order update error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
