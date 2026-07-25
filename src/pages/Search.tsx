import { useState, useMemo } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import { searchProducts } from '../data/products.ts'
import { categories } from '../data/categories.ts'
import ProductCard from '../components/ProductCard.tsx'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

export default function Search() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const query = params.get('q') || ''
  const [inputValue, setInputValue] = useState(query)
  const revealRef = useScrollReveal()

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
    <div className="cart-wrap page-enter">
      <form onSubmit={handleSubmit} className="anim-slide-down" style={{display: 'flex', gap: 10, marginBottom: 20}}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search gemstones, colors, origins..."
          className="gs-form-input"
          style={{flex: 1}}
        />
        <button type="submit" className="gs-btn" style={{padding: '10px 24px', fontSize: 13}}>
          Search
        </button>
      </form>

      <h1 className="anim-slide-up" style={{fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1a3a24'}}>
        Search Results for &quot;{query}&quot;
      </h1>

      {matchedCategories.length > 0 && (
        <div className="scroll-reveal" ref={revealRef} style={{marginBottom: 20}}>
          <h2 style={{fontSize: 13, fontWeight: 'bold', color: '#1a3a24', marginBottom: 8}}>Matching Categories</h2>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            {matchedCategories.map(c => (
              <Link key={c.slug} to={`/gemstones/${c.slug}`}
                style={{padding: '5px 14px', border: '1px solid #e0e6e0', borderRadius: 4, fontSize: 13, color: '#333', textDecoration: 'none', transition: 'all 0.15s'}}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 ? (
        <>
          <p style={{fontSize: 13, color: '#666', marginBottom: 12}}>{results.length} gemstones found</p>
          <div className="product-grid">
            {results.map((p, i) => (
              <div key={p.id} className={`scroll-reveal delay-${(i % 12) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="anim-scale-in" style={{textAlign: 'center', padding: '60px 0'}}>
          <SearchIcon size={40} className="anim-float" style={{color: '#ccc', margin: '0 auto 12px'}} />
          <h2 style={{fontSize: 18, fontWeight: 'bold', marginBottom: 8}}>No Results Found</h2>
          <p style={{color: '#666', marginBottom: 20}}>
            We couldn&apos;t find any gemstones matching &quot;{query}&quot;. Try a different search term.
          </p>
          <div style={{marginBottom: 16}}>
            <p style={{fontSize: 13, color: '#666', marginBottom: 8}}>Popular searches:</p>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8}}>
              {['Sapphire', 'Ruby', 'Emerald', 'Blue', 'Natural', 'Ceylon'].map(term => (
                <Link key={term} to={`/search?q=${term.toLowerCase()}`}
                  style={{padding: '4px 12px', border: '1px solid #ddd', borderRadius: 3, fontSize: 13, color: '#333', textDecoration: 'none', transition: 'all 0.15s'}}>
                  {term}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/all-gemstones" style={{color: '#005334', textDecoration: 'underline', fontSize: 13}}>Browse All Gemstones</Link>
        </div>
      )}
    </div>
  )
}
