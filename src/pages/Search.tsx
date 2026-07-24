import { useState, useMemo } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { searchProducts } from '../data/products.ts'
import { categories } from '../data/categories.ts'
import ProductCard from '../components/ProductCard.tsx'

export default function Search() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') || ''
  const [inputValue, setInputValue] = useState(query)

  const results = useMemo(() => query ? searchProducts(query) : [], [query])

  const matchedCategories = useMemo(() => {
    if (!query) return []
    const q = query.toLowerCase()
    return categories.filter(c => c.name.toLowerCase().includes(q) || c.slug.includes(q))
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6 max-w-xl">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search gemstones, colors, origins..."
            className="w-full border border-border rounded-full px-4 py-2 pr-10 text-sm focus:outline-none focus:border-primary"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary">
            <SearchIcon size={18} />
          </button>
        </div>
      </form>

      <div className="flex items-center gap-2 mb-6">
        <SearchIcon size={20} className="text-text-secondary" />
        <h1 className="text-2xl font-bold">
          Search Results for "{query}"
        </h1>
      </div>

      {matchedCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-text-secondary mb-2">Matching Categories</h2>
          <div className="flex flex-wrap gap-2">
            {matchedCategories.map(c => (
              <Link key={c.slug} to={`/gemstones/${c.slug}`}
                className="bg-surface border border-border rounded-full px-4 py-1.5 text-sm hover:bg-primary/10 hover:border-primary transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 ? (
        <>
          <p className="text-sm text-text-secondary mb-4">{results.length} gemstones found</p>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {results.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <SearchIcon size={48} className="text-text-secondary/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No Results Found</h2>
          <p className="text-text-secondary mb-6">
            We couldn't find any gemstones matching "{query}". Try a different search term.
          </p>
          <div className="mb-4">
            <p className="text-sm text-text-secondary mb-2">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Sapphire', 'Ruby', 'Emerald', 'Blue', 'Natural', 'Ceylon'].map(term => (
                <Link key={term} to={`/search?q=${term.toLowerCase()}`}
                  className="bg-surface border border-border rounded-full px-4 py-1.5 text-sm hover:bg-primary/10 hover:border-primary transition-colors">
                  {term}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/all-gemstones" className="text-primary hover:underline text-sm">Browse All Gemstones →</Link>
        </div>
      )}
    </div>
  )
}
