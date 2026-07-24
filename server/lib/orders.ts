import { prisma } from './prisma'
import type { OrderStatus } from '@prisma/client'

const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ['AWAITING_PAYMENT', 'CANCELLED'],
  AWAITING_PAYMENT: ['PAID', 'FAILED', 'CANCELLED'],
  PAID: ['FULFILLED', 'FAILED'],
  FAILED: [],
  CANCELLED: [],
  FULFILLED: [],
}

export class OrderTransitionError extends Error {
  constructor(from: OrderStatus, to: OrderStatus) {
    super(`Invalid order status transition: ${from} → ${to}`)
    this.name = 'OrderTransitionError'
  }
}

export async function transitionOrderStatus(
  orderId: string,
  newStatus: OrderStatus
) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    select: { id: true, status: true },
  })

  const allowed = VALID_TRANSITIONS[order.status]
  if (!allowed.includes(newStatus)) {
    throw new OrderTransitionError(order.status, newStatus)
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  })
}

export async function decrementStock(orderId: string) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  })

  for (const item of order.items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { inStock: false },
    })
  }
}

const FREE_SHIPPING_THRESHOLD_CENTS = 50_000
const SHIPPING_COST_CENTS = 890

export function calculateShipping(subtotalCents: number): number {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_COST_CENTS
}

export async function calculateOrderTotals(
  items: { productId: string; quantity: number }[]
) {
  let subtotalCents = 0

  const orderItems = await Promise.all(
    items.map(async (item) => {
      const product = await prisma.product.findUniqueOrThrow({
        where: { id: item.productId },
        select: { id: true, priceCents: true, inStock: true },
      })

      if (!product.inStock) {
        throw new Error(`Product ${product.id} is out of stock`)
      }

      const lineTotal = product.priceCents * item.quantity
      subtotalCents += lineTotal

      return {
        productId: product.id,
        quantity: item.quantity,
        priceCentsAtPurchase: product.priceCents,
      }
    })
  )

  const shippingCents = calculateShipping(subtotalCents)
  const totalCents = subtotalCents + shippingCents

  return { orderItems, subtotalCents, shippingCents, totalCents }
}
