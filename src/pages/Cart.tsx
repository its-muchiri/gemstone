import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react'
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
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <CheckCircle size={64} className="text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-text-secondary mb-2">Thank you for your mock order. This is a demo — no real payment was processed.</p>
        <p className="text-sm text-text-secondary mb-6">
          Order total: {convert(totalUsd)} ({totalItems} item{totalItems !== 1 ? 's' : ''})
        </p>
        <Link to="/all-gemstones"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="text-text-secondary/30 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-6">Looks like you haven't added any gemstones yet.</p>
        <Link to="/all-gemstones"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-white border border-border rounded-lg p-4">
              <Link to={`/product/${product.id}`} className="flex-shrink-0">
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`} className="font-medium hover:text-primary transition-colors text-sm md:text-base line-clamp-1">
                  {product.name}
                </Link>
                <p className="text-xs text-text-secondary mt-0.5">{product.weightCarats} ct · {product.shape} · {product.origin}</p>
                <p className="text-lg font-bold text-primary mt-1">{convert(product.price)}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-2 py-1 hover:bg-surface rounded-l-lg transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-2 py-1 hover:bg-surface rounded-r-lg transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{convert(product.price * quantity)}</span>
                    <button onClick={() => removeItem(product.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-white border border-border rounded-lg p-6 sticky top-32">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-medium">{convert(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="font-medium">
                  {shippingUsd === 0 ? (
                    <span className="text-primary">Free</span>
                  ) : (
                    convert(shippingUsd)
                  )}
                </span>
              </div>
              {subtotal > 0 && subtotal <= convertRaw(FREE_SHIPPING_USD) && currency === 'USD' && (
                <p className="text-xs text-text-secondary">Free shipping on orders over {convert(FREE_SHIPPING_USD)} USD</p>
              )}
              {subtotal > 0 && subtotal <= convertRaw(FREE_SHIPPING_USD) && currency !== 'USD' && (
                <p className="text-xs text-text-secondary">Free shipping on orders over {convert(FREE_SHIPPING_USD)}</p>
              )}
              <hr className="border-border my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{convert(totalUsd)}</span>
              </div>
            </div>
            <button onClick={() => { setCheckedOut(true); clearCart() }}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-4 hover:bg-primary-dark transition-colors">
              Proceed to Checkout
            </button>
            <Link to="/all-gemstones" className="block text-center text-sm text-primary mt-3 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
