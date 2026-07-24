import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@gemstore.com'
  const adminPassword = await hash('admin123456', 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  })

  console.log('Admin user:', admin.email)

  const customerEmail = 'customer@gemstore.com'
  const customerPassword = await hash('customer123', 12)

  const customer = await prisma.user.upsert({
    where: { email: customerEmail },
    update: {},
    create: {
      email: customerEmail,
      passwordHash: customerPassword,
      name: 'Test Customer',
      role: 'CUSTOMER',
    },
  })

  console.log('Customer user:', customer.email)

  const sapphireCat = await prisma.category.upsert({
    where: { slug: 'sapphire' },
    update: {},
    create: {
      slug: 'sapphire',
      name: 'Sapphire',
      description: 'Natural sapphire gemstones in a variety of colors.',
    },
  })

  const rubyCat = await prisma.category.upsert({
    where: { slug: 'ruby' },
    update: {},
    create: {
      slug: 'ruby',
      name: 'Ruby',
      description: 'Natural ruby gemstones.',
    },
  })

  const emeraldCat = await prisma.category.upsert({
    where: { slug: 'emerald' },
    update: {},
    create: {
      slug: 'emerald',
      name: 'Emerald',
      description: 'Natural emerald gemstones.',
    },
  })

  const products = [
    {
      sku: 'SAP-001',
      name: 'Blue Sapphire - Oval Cut 1.52ct',
      slug: 'blue-sapphire-oval-152ct',
      categoryId: sapphireCat.id,
      priceCents: 450000,
      weightCarats: 1.52,
      shape: 'Oval',
      color: 'Blue',
      clarity: 'VS1',
      treatment: 'Heated',
      origin: 'Sri Lanka',
      description: 'Beautiful blue sapphire with excellent color saturation.',
      images: ['/images/sapphire-gem-429657a.jpg'],
    },
    {
      sku: 'SAP-002',
      name: 'Pink Sapphire - Cushion Cut 2.05ct',
      slug: 'pink-sapphire-cushion-205ct',
      categoryId: sapphireCat.id,
      priceCents: 680000,
      weightCarats: 2.05,
      shape: 'Cushion',
      color: 'Pink',
      clarity: 'VS2',
      treatment: 'Natural / Untreated',
      origin: 'Madagascar',
      description: 'Rare natural pink sapphire with vivid color.',
      images: ['/images/sapphire-gem-439698a.jpg'],
    },
    {
      sku: 'RUB-001',
      name: 'Ruby - Round Cut 1.20ct',
      slug: 'ruby-round-120ct',
      categoryId: rubyCat.id,
      priceCents: 320000,
      weightCarats: 1.20,
      shape: 'Round',
      color: 'Red',
      clarity: 'VS1',
      treatment: 'Heated',
      origin: 'Mozambique',
      description: 'Fine red ruby with excellent brilliance.',
      images: ['/images/sapphire-gem-429657a.jpg'],
    },
    {
      sku: 'EME-001',
      name: 'Emerald - Rectangle Cut 1.80ct',
      slug: 'emerald-rectangle-180ct',
      categoryId: emeraldCat.id,
      priceCents: 890000,
      weightCarats: 1.80,
      shape: 'Rectangle',
      color: 'Green',
      clarity: 'VS2',
      treatment: 'Treated',
      origin: 'Colombia',
      description: 'Classic Colombian emerald with deep green color.',
      images: ['/images/sapphire-gem-429657a.jpg'],
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('Seeded', products.length, 'products')
  console.log('Seeded', 3, 'categories')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
