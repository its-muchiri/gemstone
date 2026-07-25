import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { products as allProducts } from '../data/products.ts'
import { getCategoryBySlug } from '../data/categories.ts'
import ProductCard from '../components/ProductCard.tsx'
import FilterSidebar, { type Filters } from '../components/FilterSidebar.tsx'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

const ITEMS_PER_PAGE = 12

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const category = getCategoryBySlug(slug || '')
  const [sort, setSort] = useState('best-selling')
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    color: '', shape: '', priceMin: '', priceMax: '', caratMin: '', caratMax: '', treatment: '', inStock: false,
  })
  const revealRef = useScrollReveal()

  const categoryProducts = useMemo(() => {
    let filtered = allProducts.filter(p => p.category === slug)

    if (filters.color) {
      filtered = filtered.filter(p => p.color.toLowerCase().includes(filters.color.toLowerCase()))
    }
    if (filters.shape) {
      filtered = filtered.filter(p => p.shape === filters.shape)
    }
    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= Number(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= Number(filters.priceMax))
    }
    if (filters.caratMin) {
      filtered = filtered.filter(p => p.weightCarats >= Number(filters.caratMin))
    }
    if (filters.caratMax) {
      filtered = filtered.filter(p => p.weightCarats <= Number(filters.caratMax))
    }
    if (filters.treatment) {
      filtered = filtered.filter(p => p.treatment === filters.treatment)
    }
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock)
    }

    switch (sort) {
      case 'price-low': return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-high': return [...filtered].sort((a, b) => b.price - a.price)
      case 'newest': return [...filtered].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
      default: return filtered
    }
  }, [slug, sort, filters])

  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE)
  const paginated = categoryProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link to="/all-gemstones" className="text-primary hover:underline">Browse All Gemstones</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 page-enter">
      {/* Breadcrumb */}
      <div className="gs-breadcrumbs anim-slide-down">
        <Link to="/">Home</Link> <span>/</span>
        <Link to="/all-gemstones">Gemstones</Link> <span>/</span>
        <strong>{category.name}</strong>
      </div>

      {/* Category header */}
      <div className="category-header-wrap scroll-reveal" ref={revealRef}>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block" style={{width: 220, flexShrink: 0}}>
          <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setPage(1) }} categoryColors={category.colors} />
        </div>

        {/* Mobile filter toggle */}
        <button onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden gs-btn-outline"
          style={{marginBottom: 10}}>
          <SlidersHorizontal size={14} style={{display: 'inline', marginRight: 6}} /> Filters
        </button>
        {showFilters && (
          <div className="lg:hidden">
            <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setPage(1) }} categoryColors={category.colors} />
          </div>
        )}

        <div className="flex-1">
          {/* Sort + count */}
          <div className="gs-sort-bar">
            <span className="gs-result-count">{categoryProducts.length} gemstones</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Product grid */}
          {paginated.length === 0 ? (
            <div className="anim-scale-in" style={{textAlign: 'center', padding: '60px 0', color: '#999'}}>
              <p style={{marginBottom: 8}}>No gemstones match your filters.</p>
              <button onClick={() => setFilters({ color: '', shape: '', priceMin: '', priceMax: '', caratMin: '', caratMax: '', treatment: '', inStock: false })}
                style={{color: '#005334', textDecoration: 'underline', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer'}}>Clear all filters</button>
            </div>
          ) : (
            <div className="product-grid">
              {paginated.map((p, i) => (
                <div key={p.id} className={`scroll-reveal delay-${(i % 12) + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="gs-pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => { setPage(n); window.scrollTo(0, 0) }}
                  className={n === page ? 'active' : ''}>
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
