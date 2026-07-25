import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext.tsx'
import { useCart } from '../context/CartContext.tsx'
import { useCurrency } from '../context/CurrencyContext.tsx'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

export default function Wishlist() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { convert } = useCurrency()
  const revealRef = useScrollReveal()

  if (items.length === 0) {
    return (
      <div className="cart-wrap page-enter" style={{textAlign: 'center', padding: '80px 0'}}>
        <Heart size={48} className="anim-float" style={{color: '#ccc', margin: '0 auto 16px'}} />
        <h1 style={{fontSize: 22, fontWeight: 'bold', marginBottom: 8}}>Your Wishlist is Empty</h1>
        <p style={{color: '#666', marginBottom: 20}}>Save your favorite gemstones here for later.</p>
        <Link to="/all-gemstones" className="gs-btn">Browse Gemstones</Link>
      </div>
    )
  }

  return (
    <div className="cart-wrap page-enter">
      <h1 style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>My Wishlist ({items.length})</h1>
      <div className="product-grid" ref={revealRef}>
        {items.map((product, i) => (
          <div key={product.id} className={`product-tile scroll-reveal delay-${(i % 12) + 1}`}>
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} className="product-tile-img product-img-hover" />
            </Link>
            <Link to={`/product/${product.id}`} className="product-tile-name">
              {product.name}
            </Link>
            <span className="product-tile-carat">{product.weightCarats} ct · {product.shape}</span>
            <span className="product-tile-price">{convert(product.price)}</span>
            <div style={{display: 'flex', gap: 6, marginTop: 8, padding: '0 4px'}}>
              <button onClick={() => { addItem(product); removeItem(product.id) }}
                className="gs-btn btn-cart-press"
                style={{flex: 1, padding: '7px 10px', fontSize: 12, textAlign: 'center', borderRadius: 3}}>
                <ShoppingCart size={12} style={{display: 'inline', marginRight: 4}} /> Move to Cart
              </button>
              <button onClick={() => removeItem(product.id)}
                className="heart-btn"
                style={{
                  width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid #ddd', borderRadius: 3, background: '#fff', color: '#999', cursor: 'pointer', padding: 0
                }}>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
