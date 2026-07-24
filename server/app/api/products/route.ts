import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { productFilterSchema } from '@/lib/validation/product'
import { Prisma } from '@prisma/client'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const params: Record<string, string> = {}
    searchParams.forEach((v, k) => { params[k] = v })

    const parsed = productFilterSchema.safeParse(params)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid filters', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { category, color, shape, priceMin, priceMax, caratMin, caratMax, treatment, inStock, search, page, limit, sort } = parsed.data

    const where: Prisma.ProductWhereInput = {}
    if (category) where.category = { slug: category }
    if (color) where.color = { contains: color, mode: 'insensitive' }
    if (shape) where.shape = shape
    if (treatment) where.treatment = treatment
    if (inStock !== undefined) where.inStock = inStock
    if (priceMin !== undefined || priceMax !== undefined) {
      where.priceCents = {}
      if (priceMin !== undefined) where.priceCents.gte = priceMin
      if (priceMax !== undefined) where.priceCents.lte = priceMax
    }
    if (caratMin !== undefined || caratMax !== undefined) {
      where.weightCarats = {}
      if (caratMin !== undefined) where.weightCarats.gte = caratMin
      if (caratMax !== undefined) where.weightCarats.lte = caratMax
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      sort === 'price-asc' ? { priceCents: 'asc' } :
      sort === 'price-desc' ? { priceCents: 'desc' } :
      sort === 'best-selling' ? { createdAt: 'desc' } :
      { createdAt: 'desc' }

    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: { category: { select: { id: true, name: true, slug: true } } },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Products list error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin()

    const body = await req.json()
    const { createProductSchema } = await import('@/lib/validation/product')
    const parsed = createProductSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    const existing = await prisma.product.findFirst({
      where: { OR: [{ sku: data.sku }, { slug: data.slug }] },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'A product with this SKU or slug already exists' },
        { status: 409 }
      )
    }

    const category = await prisma.category.findUnique({ where: { id: data.categoryId } })
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    const product = await prisma.product.create({ data })
    return NextResponse.json(product, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AuthError') {
      return NextResponse.json({ error: error.message }, { status: (error as any).status })
    }
    console.error('Product create error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
