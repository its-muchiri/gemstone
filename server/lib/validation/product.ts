import { z } from 'zod'

export const createProductSchema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string().min(1),
  priceCents: z.number().int().positive(),
  weightCarats: z.number().positive(),
  shape: z.string().min(1),
  color: z.string().min(1),
  clarity: z.string().min(1),
  treatment: z.string().min(1),
  origin: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string().url()).min(1),
  inStock: z.boolean().optional().default(true),
})

export const updateProductSchema = createProductSchema.partial()

export const productFilterSchema = z.object({
  category: z.string().optional(),
  color: z.string().optional(),
  shape: z.string().optional(),
  priceMin: z.coerce.number().int().nonnegative().optional(),
  priceMax: z.coerce.number().int().positive().optional(),
  caratMin: z.coerce.number().nonnegative().optional(),
  caratMax: z.coerce.number().positive().optional(),
  treatment: z.string().optional(),
  inStock: z.coerce.boolean().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(500).optional().default(24),
  sort: z.enum(['price-asc', 'price-desc', 'newest', 'best-selling']).optional().default('newest'),
})
