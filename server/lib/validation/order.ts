import { z } from 'zod'

export const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive(),
  })).min(1, 'At least one item is required'),
  shippingAddress: z.object({
    name: z.string().min(1),
    address1: z.string().min(1),
    address2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
    phone: z.string().optional(),
  }),
})

export const nowpaymentsCheckoutSchema = z.object({
  orderId: z.string().min(1),
})

export const mpesaCheckoutSchema = z.object({
  orderId: z.string().min(1),
  phoneNumber: z.string().min(1),
})

export const updateOrderStatusSchema = z.object({
  status: z.enum(['FULFILLED', 'CANCELLED']),
})
