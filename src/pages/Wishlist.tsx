import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext.tsx'
import { useCart } from '../context/CartContext.tsx'
import { useCurrency } from '../context/CurrencyContext.tsx'

export default function Wishlist() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { convert } = useCurrency()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Heart size={64} className="text-text-secondary/30 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-text-secondary mb-6">Save your favorite gemstones here for later.</p>
        <Link to="/all-gemstones"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          <ArrowLeft size={18} /> Browse Gemstones
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(product => (
          <div key={product.id} className="bg-white rounded-lg border border-border overflow-hidden shadow-sm">
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover" />
            </Link>
            <div className="p-3">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
              </Link>
              <p className="text-xs text-text-secondary mt-1">{product.weightCarats} ct · {product.shape}</p>
              <p className="text-lg font-bold text-primary mt-1">{convert(product.price)}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { addItem(product); removeItem(product.id) }}
                  className="flex-1 bg-primary text-white text-xs py-1.5 rounded hover:bg-primary-dark transition-colors flex items-center justify-center gap-1">
                  <ShoppingCart size={13} /> Move to Cart
                </button>
                <button onClick={() => removeItem(product.id)}
                  className="p-1.5 rounded border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
