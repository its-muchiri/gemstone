import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, SlidersHorizontal } from 'lucide-react'
import { products as allProducts } from '../data/products.ts'
import { getCategoryBySlug } from '../data/categories.ts'
import ProductCard from '../components/ProductCard.tsx'
import FilterSidebar, { type Filters } from '../components/FilterSidebar.tsx'

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
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-text-secondary mb-4">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={12} />
        <Link to="/all-gemstones" className="hover:text-primary">Gemstones</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">{category.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setPage(1) }} categoryColors={category.colors} />
        </div>

        {/* Mobile filter toggle */}
        <button onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium border border-border rounded-lg px-4 py-2 mb-2">
          <SlidersHorizontal size={16} /> Filters
        </button>
        {showFilters && (
          <div className="lg:hidden">
            <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setPage(1) }} categoryColors={category.colors} />
          </div>
        )}

        <div className="flex-1">
          {/* Category header */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-sm text-text-secondary mb-4">{category.description}</p>

          {/* Sort + count */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-text-secondary">{categoryProducts.length} gemstones</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="border border-border rounded-lg px-3 py-1.5 text-sm bg-white">
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Product grid */}
          {paginated.length === 0 ? (
            <div className="text-center py-16 text-text-secondary">
              <p className="mb-2">No gemstones match your filters.</p>
              <button onClick={() => setFilters({ color: '', shape: '', priceMin: '', priceMax: '', caratMin: '', caratMax: '', treatment: '', inStock: false })}
                className="text-primary hover:underline text-sm">Clear all filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => { setPage(n); window.scrollTo(0, 0) }}
                  className={`w-9 h-9 rounded text-sm font-medium transition-colors ${n === page ? 'bg-primary text-white' : 'border border-border hover:bg-surface'}`}>
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
