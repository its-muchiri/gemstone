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
    <div className="product-tile">
      <Link to={`/product/${product.id}`} className="block relative">
        <img src={product.imageUrl} alt={product.name}
          className="product-tile-img" />
        {!product.inStock && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">Out of Stock</span>
        )}
        {product.treatment === 'Natural / Untreated' && (
          <span className="absolute top-2 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded">Natural</span>
        )}
      </Link>
      <Link to={`/product/${product.id}`} className="product-tile-name">
        {product.name}
      </Link>
      <span className="product-tile-carat">{product.weightCarats} ct · {product.shape} · {product.origin}</span>
      <span className="product-tile-price">{convert(product.price)}</span>
      <div style={{display: 'flex', gap: 6, marginTop: 8, padding: '0 4px'}}>
        <button onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="gs-btn"
          style={{flex: 1, padding: '7px 10px', fontSize: 12, textAlign: 'center', borderRadius: 3}}>
          <ShoppingCart size={12} style={{display: 'inline', marginRight: 4}} /> Add
        </button>
        <button onClick={() => inWish ? removeWishlist(product.id) : addWishlist(product)}
          style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: inWish ? '1px solid #005334' : '1px solid #ccc',
            borderRadius: 3, background: inWish ? '#e6f5ec' : '#fff',
            color: inWish ? '#005334' : '#999', cursor: 'pointer', padding: 0
          }}>
          <Heart size={14} fill={inWish ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  )
}
