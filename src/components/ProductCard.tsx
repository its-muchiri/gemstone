import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext.tsx'
import { useWishlist } from '../context/WishlistContext.tsx'
import { useCurrency } from '../context/CurrencyContext.tsx'
import type { Product } from '../data/products.ts'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist()
  const { convert } = useCurrency()
  const inWish = isInWishlist(product.id)

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <img src={product.imageUrl} alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300" />
        {!product.inStock && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">Out of Stock</span>
        )}
        {product.treatment === 'Natural / Untreated' && (
          <span className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-0.5 rounded">Natural</span>
        )}
      </Link>
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">{product.name}</h3>
        </Link>
        <p className="text-xs text-text-secondary mt-1">{product.weightCarats} ct · {product.shape} · {product.origin}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{convert(product.price)}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="flex-1 bg-primary text-white text-xs py-1.5 rounded hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1">
            <ShoppingCart size={14} /> Add to Cart
          </button>
          <button onClick={() => inWish ? removeWishlist(product.id) : addWishlist(product)}
            className={`p-1.5 rounded border transition-colors ${inWish ? 'bg-gold/10 border-gold text-gold' : 'border-border hover:border-primary hover:text-primary'}`}>
            <Heart size={14} fill={inWish ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}
