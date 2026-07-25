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
    <div className="product-tile category-tile-hover">
      <Link to={`/product/${product.id}`} className="block relative">
        <img src={product.imageUrl} alt={product.name}
          className="product-tile-img product-img-hover" />
        {!product.inStock && (
          <span style={{position: 'absolute', top: 6, left: 6, background: '#cc0000', color: '#fff', fontSize: 10, fontWeight: 'bold', padding: '2px 8px', borderRadius: 3, letterSpacing: '0.5px', textTransform: 'uppercase'}}>Out of Stock</span>
        )}
        {product.treatment === 'Natural / Untreated' && (
          <span style={{position: 'absolute', top: 6, right: 6, background: '#005334', color: '#fff', fontSize: 10, fontWeight: 'bold', padding: '2px 8px', borderRadius: 3, letterSpacing: '0.5px'}}>Natural</span>
        )}
      </Link>
      <Link to={`/product/${product.id}`} className="product-tile-name">
        {product.name}
      </Link>
      <span className="product-tile-carat">{product.weightCarats} ct · {product.shape} · {product.origin}</span>
      <span className="product-tile-price">{convert(product.price)}</span>
      <div style={{display: 'flex', gap: 6, marginTop: 10, padding: '0 4px', width: '100%'}}>
        <button onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="gs-btn btn-cart-press"
          style={{flex: 1, padding: '8px 10px', fontSize: 12, textAlign: 'center', borderRadius: 3}}>
          <ShoppingCart size={12} style={{display: 'inline', marginRight: 4, verticalAlign: 'middle'}} /> Add
        </button>
        <button onClick={() => inWish ? removeWishlist(product.id) : addWishlist(product)}
          className={`heart-btn ${inWish ? 'anim-heart-beat' : ''}`}
          style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: inWish ? '1px solid #005334' : '1px solid #ccc',
            borderRadius: 3, background: inWish ? '#e6f5ec' : '#fff',
            color: inWish ? '#005334' : '#999', cursor: 'pointer', padding: 0,
            transition: 'all 0.15s'
          }}>
          <Heart size={14} fill={inWish ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  )
}
