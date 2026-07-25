import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext.tsx'
import { useCurrency } from '../context/CurrencyContext.tsx'

const FREE_SHIPPING_USD = 500
const SHIPPING_STANDARD_USD = 8.90

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart()
  const { convert, convertRaw, currency } = useCurrency()
  const [checkedOut, setCheckedOut] = useState(false)

  const shippingUsd = items.length > 0 ? (subtotal > FREE_SHIPPING_USD ? 0 : SHIPPING_STANDARD_USD) : 0
  const totalUsd = subtotal + shippingUsd

  if (checkedOut) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center page-enter">
        <CheckCircle size={64} className="anim-pop-in" style={{color: '#005334', margin: '0 auto 16px'}} />
        <h1 className="text-2xl font-bold mb-2 anim-slide-up">Order Confirmed!</h1>
        <p className="text-text-secondary mb-2 anim-slide-up" style={{animationDelay: '0.1s'}}>Thank you for your mock order. This is a demo — no real payment was processed.</p>
        <p className="text-sm text-text-secondary mb-6 anim-slide-up" style={{animationDelay: '0.2s'}}>
          Order total: {convert(totalUsd)} ({totalItems} item{totalItems !== 1 ? 's' : ''})
        </p>
        <Link to="/all-gemstones"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors best-seller-card anim-slide-up"
          style={{animationDelay: '0.3s'}}>
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center page-enter">
        <ShoppingCart size={64} className="anim-float" style={{color: '#ccc', margin: '0 auto 16px'}} />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-6">Looks like you haven't added any gemstones yet.</p>
        <Link to="/all-gemstones"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors best-seller-card">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-wrap page-enter">
      <h1 style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>Shopping Cart ({totalItems} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          {items.map(({ product, quantity }, i) => (
            <div key={product.id} className={`cart-item cart-item-enter`} style={{animationDelay: `${i * 0.05}s`}}>
              <Link to={`/product/${product.id}`} style={{flexShrink: 0}}>
                <img src={product.imageUrl} alt={product.name} style={{width: 80, height: 80, objectFit: 'contain'}} className="product-img-hover" />
              </Link>
              <div style={{minWidth: 0}}>
                <Link to={`/product/${product.id}`} style={{fontWeight: 'bold', fontSize: 13, color: '#333'}}>
                  {product.name}
                </Link>
                <p style={{fontSize: 12, color: '#666', marginTop: 2}}>{product.weightCarats} ct · {product.shape} · {product.origin}</p>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8}}>
                  <div className="qty-wrap">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <span style={{fontSize: 15, fontWeight: 'bold', color: '#005334'}}>{convert(product.price * quantity)}</span>
                    <button onClick={() => removeItem(product.id)}
                      style={{background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 18}}>
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span style={{fontWeight: 'bold'}}>{convert(subtotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span style={{fontWeight: 'bold'}}>
                {shippingUsd === 0 ? (
                  <span style={{color: '#005334'}}>Free</span>
                ) : (
                  convert(shippingUsd)
                )}
              </span>
            </div>
            {subtotal > 0 && subtotal <= convertRaw(FREE_SHIPPING_USD) && currency === 'USD' && (
              <p style={{fontSize: 12, color: '#666', marginTop: 4}}>Free shipping on orders over {convert(FREE_SHIPPING_USD)} USD</p>
            )}
            {subtotal > 0 && subtotal <= convertRaw(FREE_SHIPPING_USD) && currency !== 'USD' && (
              <p style={{fontSize: 12, color: '#666', marginTop: 4}}>Free shipping on orders over {convert(FREE_SHIPPING_USD)}</p>
            )}
            <div className="cart-summary-total">
              <span>Total</span>
              <span style={{color: '#005334'}}>{convert(totalUsd)}</span>
            </div>
            <button onClick={() => { setCheckedOut(true); clearCart() }}
              className="gs-btn-cart" style={{width: '100%', marginTop: 16}}>
              Proceed to Checkout
            </button>
            <Link to="/all-gemstones" style={{display: 'block', textAlign: 'center', fontSize: 13, color: '#005334', marginTop: 12}}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
