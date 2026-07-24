import { Link } from 'react-router-dom'
import { categories } from '../data/categories.ts'

export default function AllGemstones() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="gs-breadcrumbs">
        <Link to="/">Home</Link> <span>/</span>
        <strong>All Gemstones</strong>
      </div>

      <div className="category-header-wrap">
        <h1>All Gemstones</h1>
        <p>Browse our complete collection of natural loose gemstones by category.</p>
      </div>

      <div className="category-tiles" style={{marginTop: 16}}>
        {categories.map(c => (
          <Link key={c.slug} to={`/gemstones/${c.slug}`} className="category-tile">
            <img src={c.imageUrl} alt={c.name} />
            <span>{c.name}</span>
            <small style={{fontSize: 11, color: '#999'}}>{c.productCount} stones</small>
          </Link>
        ))}
      </div>
    </div>
  )
}
