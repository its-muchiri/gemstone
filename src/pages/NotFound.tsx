import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-text-secondary/30 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-text-secondary mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/"
        className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
        <Home size={18} /> Back to Home
      </Link>
    </div>
  )
}
