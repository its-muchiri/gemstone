import { Link } from 'react-router-dom'
import { categories } from '../data/categories.ts'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

export default function AllGemstones() {
  const revealRef = useScrollReveal()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      <div className="gs-breadcrumbs">
        <Link to="/">Home</Link> <span>/</span>
        <strong>All Gemstones</strong>
      </div>

      <div className="category-header-wrap scroll-reveal" ref={revealRef}>
        <h1>All Gemstones</h1>
        <p>Browse our complete collection of natural loose gemstones by category.</p>
      </div>

      <div className="category-tiles" style={{marginTop: 16}}>
        {categories.map((c, i) => (
          <Link key={c.slug} to={`/gemstones/${c.slug}`}
            className={`category-tile category-tile-hover scroll-reveal delay-${(i % 12) + 1}`}>
            <img src={c.imageUrl} alt={c.name} className="product-img-hover" />
            <span>{c.name}</span>
            <small style={{fontSize: 11, color: '#888', marginTop: 2, display: 'block'}}>{c.productCount} stones</small>
          </Link>
        ))}
      </div>
    </div>
  )
}
