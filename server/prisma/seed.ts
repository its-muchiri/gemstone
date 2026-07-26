import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { products } from './seed-data'

const prisma = new PrismaClient()

const categoryDescriptions: Record<string, string> = {
  sapphire: 'Sapphires are among the most coveted gemstones in the world, prized for their extraordinary depth of color.',
  ruby: 'The ruby is the king of precious stones, revered for its passionate red hue.',
  emerald: 'Emeralds have been treasured for over 5,000 years as a symbol of rebirth and eternal love.',
  amethyst: 'Amethyst, the February birthstone, ranges from pale lavender to deep royal purple.',
  topaz: 'Topaz occurs in a rainbow of colors, from imperial golden-orange to sky blue.',
  aquamarine: 'Named after seawater, aquamarine captures the serene beauty of tropical oceans.',
  tourmaline: 'Tourmaline is the most colorful gemstone family, occurring in virtually every shade of the rainbow.',
  opal: 'Opals display a mesmerizing play of color unmatched by any other gemstone.',
  garnet: 'Garnets span a remarkable color range from deep red tsavorite to vivid mandarin orange spessartite.',
  tanzanite: 'Found only in a small area near Mount Kilimanjaro, tanzanite is 1,000 times rarer than diamond.',
  zircon: 'Not to be confused with cubic zirconia, natural zircon is one of the oldest minerals on Earth.',
  citrine: 'Citrine, the gemstone of abundance and warmth, ranges from pale lemon to deep amber.',
  moonstone: 'Moonstone captivates with its ethereal adularescence — a luminous sheen that appears to float beneath the surface.',
  spinel: 'Once confused with ruby, spinel is now recognized as a first-rate gemstone in its own right.',
  alexandrite: 'The legendary color-change alexandrite shifts from emerald green in daylight to ruby red under incandescent light.',
}

const categoryNames: Record<string, string> = {
  sapphire: 'Sapphire',
  ruby: 'Ruby',
  emerald: 'Emerald',
  amethyst: 'Amethyst',
  topaz: 'Topaz',
  aquamarine: 'Aquamarine',
  tourmaline: 'Tourmaline',
  opal: 'Opal',
  garnet: 'Garnet',
  tanzanite: 'Tanzanite',
  zircon: 'Zircon',
  citrine: 'Citrine',
  moonstone: 'Moonstone',
  spinel: 'Spinel',
  alexandrite: 'Alexandrite',
}

function toSlug(name: string, id: string): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}-${id}`
}

async function main() {
  console.log('Seeding database...')

  const adminPassword = await hash('admin123456', 12)
  const customerPassword = await hash('customer123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gemstore.com' },
    update: {},
    create: { email: 'admin@gemstore.com', passwordHash: adminPassword, name: 'Admin', role: 'ADMIN' },
  })
  console.log('Admin:', admin.email)

  const customer = await prisma.user.upsert({
    where: { email: 'customer@gemstore.com' },
    update: {},
    create: { email: 'customer@gemstore.com', passwordHash: customerPassword, name: 'Test Customer', role: 'CUSTOMER' },
  })
  console.log('Customer:', customer.email)

  const categoryMap = new Map<string, string>()
  for (const cat of Object.keys(categoryNames)) {
    const created = await prisma.category.upsert({
      where: { slug: cat },
      update: { name: categoryNames[cat], description: categoryDescriptions[cat] },
      create: { slug: cat, name: categoryNames[cat], description: categoryDescriptions[cat] },
    })
    categoryMap.set(cat, created.id)
  }
  console.log(`Seeded ${categoryMap.size} categories`)

  let productCount = 0
  for (const p of products) {
    const categoryId = categoryMap.get(p.category)
    if (!categoryId) {
      console.warn(`Unknown category "${p.category}" for product ${p.id}, skipping`)
      continue
    }

    const sku = `GS-${p.id}`
    const slug = toSlug(p.name, p.id)
    const priceCents = Math.round(p.price * 100)

    await prisma.product.upsert({
      where: { sku },
      update: { name: p.name, slug, categoryId, priceCents, weightCarats: p.weightCarats, shape: p.shape, color: p.color, clarity: p.clarity, treatment: p.treatment, origin: p.origin, description: p.description, images: [p.imageUrl], inStock: p.inStock },
      create: { sku, name: p.name, slug, categoryId, priceCents, weightCarats: p.weightCarats, shape: p.shape, color: p.color, clarity: p.clarity, treatment: p.treatment, origin: p.origin, description: p.description, images: [p.imageUrl], inStock: p.inStock },
    })
    productCount++
  }
  console.log(`Seeded ${productCount} products`)
  console.log('Done!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
