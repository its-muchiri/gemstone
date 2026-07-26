import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

interface CheckResult {
  name: string
  pass: boolean
  detail: string
}

const results: CheckResult[] = []

function check(name: string, pass: boolean, detail: string) {
  results.push({ name, pass, detail })
  const icon = pass ? '✓' : '✗'
  console.log(`  ${icon} ${name}: ${detail}`)
}

async function verifySeedData() {
  console.log('\n═══════════════════════════════════════')
  console.log('  SEED DATA VERIFICATION REPORT')
  console.log('═══════════════════════════════════════\n')

  // ── 1a. Row Counts ──────────────────────────────────────────────────────
  console.log('1a. Row Counts')
  const [userCount, categoryCount, productCount] = await Promise.all([
    prisma.user.count(),
    prisma.category.count(),
    prisma.product.count(),
  ])
  check('Users', userCount === 2, `Expected 2, got ${userCount}`)
  check('Categories', categoryCount === 15, `Expected 15, got ${categoryCount}`)
  check('Products', productCount === 299, `Expected 299, got ${productCount}`)
  console.log()

  // ── 1b. Admin Role ──────────────────────────────────────────────────────
  console.log('1b. Admin Role Correctness')
  const admin = await prisma.user.findUnique({ where: { email: 'admin@gemstore.com' } })
  check('Admin exists', !!admin, admin ? `role=${admin.role}` : 'NOT FOUND')
  check('Admin role=ADMIN', admin?.role === 'ADMIN', `Got ${admin?.role}`)
  if (admin && admin.role !== 'ADMIN') {
    console.log('    → Fixing admin role...')
    await prisma.user.update({ where: { email: 'admin@gemstore.com' }, data: { role: 'ADMIN' } })
    console.log('    → Admin role updated to ADMIN')
  }
  console.log()

  // ── 1c. Password Hashing ────────────────────────────────────────────────
  console.log('1c. Password Hashing')
  const customer = await prisma.user.findUnique({ where: { email: 'customer@gemstore.com' } })
  check('Customer exists', !!customer, customer ? `role=${customer.role}` : 'NOT FOUND')

  if (admin) {
    const adminHashValid = await bcrypt.compare('admin123456', admin.passwordHash)
    check('Admin password hash valid', adminHashValid, adminHashValid ? 'bcrypt compare passed' : 'MISMATCH')
    const adminCost = parseInt(admin.passwordHash.split('$')[2] || '0', 10)
    check('Admin bcrypt cost >= 12', adminCost >= 12, `cost=${adminCost}`)
  }

  if (customer) {
    const custHashValid = await bcrypt.compare('customer123', customer.passwordHash)
    check('Customer password hash valid', custHashValid, custHashValid ? 'bcrypt compare passed' : 'MISMATCH')
    const custCost = parseInt(customer.passwordHash.split('$')[2] || '0', 10)
    check('Customer bcrypt cost >= 12', custCost >= 12, `cost=${custCost}`)
    // Verify it's not plaintext
    const isBcrypt = customer.passwordHash.startsWith('$2a$') || customer.passwordHash.startsWith('$2b$') || customer.passwordHash.startsWith('$2y$')
    check('Customer hash is bcrypt format', isBcrypt, isBcrypt ? 'starts with $2b$' : `ACTUAL: ${customer.passwordHash.substring(0, 20)}...`)
  }
  console.log()

  // ── 1d. No Duplicate SKUs or Slugs ──────────────────────────────────────
  console.log('1d. Duplicate SKUs / Slugs')
  const products = await prisma.product.findMany({ select: { sku: true, slug: true } })
  const skus = products.map(p => p.sku)
  const slugs = products.map(p => p.slug)
  const dupeSkus = skus.filter((s, i) => skus.indexOf(s) !== i)
  const dupeSlugs = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  check('No duplicate SKUs', dupeSkus.length === 0, dupeSkus.length === 0 ? 'all unique' : `dupes: ${[...new Set(dupeSkus)].join(', ')}`)
  check('No duplicate slugs', dupeSlugs.length === 0, dupeSlugs.length === 0 ? 'all unique' : `dupes: ${[...new Set(dupeSlugs)].join(', ')}`)
  console.log()

  // ── 1e. priceCents Sanity Check ─────────────────────────────────────────
  console.log('1e. priceCents Sanity (sample of 10)')
  const sample = await prisma.product.findMany({ take: 10 })
  let nonIntegerCount = 0
  sample.forEach(p => {
    if (!Number.isInteger(p.priceCents)) {
      console.error(`    ✗ Non-integer priceCents on ${p.sku}: ${p.priceCents}`)
      nonIntegerCount++
    }
  })
  check('All sampled priceCents are integers', nonIntegerCount === 0, nonIntegerCount === 0 ? '10/10 OK' : `${nonIntegerCount}/10 failed`)

  // Full check
  const allProducts = await prisma.product.findMany({ select: { sku: true, priceCents: true } })
  const allNonInt = allProducts.filter(p => !Number.isInteger(p.priceCents))
  check('ALL 299 priceCents are integers', allNonInt.length === 0, allNonInt.length === 0 ? '299/299 OK' : `${allNonInt.length} non-integer found`)
  console.log()

  // ── 1f. Every Product Has Category ───────────────────────────────────────
  console.log('1f. Category Relations')
  const withCategory = await prisma.product.findMany({
    select: { sku: true, name: true, category: { select: { slug: true } } },
  })
  const orphaned = withCategory.filter(p => !p.category)
  check('No orphaned products', orphaned.length === 0, orphaned.length === 0 ? 'all 299 have categories' : `${orphaned.length} orphaned`)

  // Spot-check: products named "Blue Sapphire" should have category "sapphire"
  const spotCheck = withCategory.filter(p => p.name.toLowerCase().includes('blue sapphire')).slice(0, 3)
  const spotCheckOk = spotCheck.every(p => p.category?.slug === 'sapphire')
  check('Spot-check: Blue Sapphire → sapphire', spotCheckOk, spotCheckOk ? `${spotCheck.length} samples OK` : `MISMATCH`)
  console.log()

  // ── 1g. Images Array ────────────────────────────────────────────────────
  console.log('1g. Images Array')
  const emptyImages = await prisma.product.findMany({
    where: { images: { equals: [] } },
  })
  check('No products with empty images', emptyImages.length === 0, emptyImages.length === 0 ? 'all 299 have images' : `${emptyImages.length} have empty images`)
  console.log()

  // ── Summary ─────────────────────────────────────────────────────────────
  const passed = results.filter(r => r.pass).length
  const failed = results.filter(r => !r.pass).length
  console.log('═══════════════════════════════════════')
  console.log(`  TOTAL: ${passed} passed, ${failed} failed (${results.length} checks)`)
  console.log('═══════════════════════════════════════\n')

  if (failed > 0) {
    console.log('FAILED CHECKS:')
    results.filter(r => !r.pass).forEach(r => {
      console.log(`  ✗ ${r.name}: ${r.detail}`)
    })
  }

  return failed === 0
}

verifySeedData()
  .then(ok => {
    prisma.$disconnect()
    process.exit(ok ? 0 : 1)
  })
  .catch(async (e) => {
    console.error('\nVerification failed with error:', e.message)
    if (e.message.includes('DATABASE_URL')) {
      console.error('No DATABASE_URL configured. Create .env with a valid PostgreSQL connection string and re-run.')
    }
    await prisma.$disconnect()
    process.exit(1)
  })
