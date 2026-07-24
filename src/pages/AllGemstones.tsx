import { Link } from 'react-router-dom'
import { categories } from '../data/categories.ts'

export default function AllGemstones() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">All Gemstones</h1>
      <p className="text-text-secondary mb-8">Browse our complete collection of natural loose gemstones by category.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map(c => (
          <Link key={c.slug} to={`/gemstones/${c.slug}`}
            className="group bg-white rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="overflow-hidden">
              <img src={c.imageUrl} alt={c.name}
                className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3 text-center">
              <h2 className="font-bold text-sm group-hover:text-primary transition-colors">{c.name}</h2>
              <p className="text-xs text-text-secondary mt-1">{c.productCount} stones</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
