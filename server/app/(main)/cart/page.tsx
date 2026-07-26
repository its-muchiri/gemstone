'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, ArrowLeft, CheckCircle, ArrowRight, CreditCard, Smartphone, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { createOrder, createNowPaymentsInvoice, initiateMpesaPayment, type ShippingAddress } from '@/lib/api'

const FREE_SHIPPING_USD = 500
const SHIPPING_STANDARD_USD = 8.90

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'processing' | 'confirmation' | 'error'
type PaymentMethod = 'nowpayments' | 'mpesa'

const initialAddress: ShippingAddress = {
  name: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'US',
  phone: '',
}

function AddressForm({ address, onChange }: { address: ShippingAddress; onChange: (a: ShippingAddress) => void }) {
  const set = (field: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...address, [field]: e.target.value })

  const inputClass = 'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005334] focus:ring-1 focus:ring-[#005334]/30 bg-white'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
        <input className={inputClass} value={address.name} onChange={set('name')} placeholder="John Doe" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-600 mb-1">Address Line 1 *</label>
        <input className={inputClass} value={address.address1} onChange={set('address1')} placeholder="123 Gem Street" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-600 mb-1">Address Line 2</label>
        <input className={inputClass} value={address.address2} onChange={set('address2')} placeholder="Apt, Suite, etc. (optional)" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">City *</label>
        <input className={inputClass} value={address.city} onChange={set('city')} placeholder="New York" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">State / Province *</label>
        <input className={inputClass} value={address.state} onChange={set('state')} placeholder="NY" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Postal Code *</label>
        <input className={inputClass} value={address.postalCode} onChange={set('postalCode')} placeholder="10001" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Country *</label>
        <input className={inputClass} value={address.country} onChange={set('country')} placeholder="US" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-600 mb-1">Phone (for M-Pesa)</label>
        <input className={inputClass} value={address.phone} onChange={set('phone')} placeholder="+254 7XX XXX XXX" />
      </div>
    </div>
  )
}

function PaymentOption({ label, description, icon, selected, onClick }: {
  label: string; description: string; icon: React.ReactNode; selected: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
        selected ? 'border-[#005334] bg-[#005334]/5' : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
        selected ? 'bg-[#005334] text-white' : 'bg-gray-100 text-gray-500'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        selected ? 'border-[#005334]' : 'border-gray-300'
      }`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#005334]" />}
      </div>
    </button>
  )
}

const STEPS = ['Cart', 'Shipping', 'Payment'] as const

function StepIndicator({ current }: { current: CheckoutStep }) {
  const idx = current === 'cart' ? 0 : current === 'shipping' ? 1 : current === 'payment' || current === 'processing' ? 2 : current === 'confirmation' ? 3 : 2

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            i <= idx ? 'bg-[#005334] text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {i < idx ? <CheckCircle size={16} /> : i + 1}
          </div>
          <span className={`text-xs font-medium hidden sm:inline ${i <= idx ? 'text-[#005334]' : 'text-gray-400'}`}>{step}</span>
          {i < STEPS.length - 1 && <ChevronRight size={14} className="text-gray-300 mx-1" />}
        </div>
      ))}
    </div>
  )
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, clearCart } = useCart()
  const { convert, convertRaw, currency } = useCurrency()
  const [step, setStep] = useState<CheckoutStep>('cart')
  const [address, setAddress] = useState<ShippingAddress>(initialAddress)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('nowpayments')
  const [mpesaPhone, setMpesaPhone] = useState('')
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)

  const shippingUsd = items.length > 0 ? (subtotal > FREE_SHIPPING_USD ? 0 : SHIPPING_STANDARD_USD) : 0
  const totalUsd = subtotal + shippingUsd

  const isAddressValid = address.name && address.address1 && address.city && address.state && address.postalCode && address.country

  async function handleCheckout() {
    setStep('processing')
    setError('')

    try {
      const orderItems = items.map(({ product, quantity }) => ({ productId: product.id, quantity }))
      const order = await createOrder(orderItems, address)
      setOrderId(order.id)

      if (paymentMethod === 'nowpayments') {
        const invoice = await createNowPaymentsInvoice(order.id)
        setPaymentUrl(invoice.invoiceUrl)
        clearCart()
        setStep('confirmation')
      } else {
        const phone = mpesaPhone || address.phone || ''
        await initiateMpesaPayment(order.id, phone)
        clearCart()
        setStep('confirmation')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Checkout failed'
      if (msg.includes('401') || msg.includes('Unauthorized')) {
        setError('Please sign in to complete your order.')
        setStep('payment')
      } else {
        setError(msg)
        setStep('payment')
      }
    }
  }

  // Confirmation
  if (step === 'confirmation') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center page-enter">
        <CheckCircle size={64} className="anim-pop-in" style={{color: '#005334', margin: '0 auto 16px'}} />
        <h1 className="text-2xl font-bold mb-2 anim-slide-up">Order Confirmed!</h1>
        {orderId ? (
          <p className="text-text-secondary mb-2 anim-slide-up" style={{animationDelay: '0.1s'}}>
            Order #{orderId.slice(0, 8)}... created successfully.
          </p>
        ) : (
          <p className="text-text-secondary mb-2 anim-slide-up" style={{animationDelay: '0.1s'}}>
            Thank you for your order. This is a demo — no real payment was processed.
          </p>
        )}
        <p className="text-sm text-text-secondary mb-6 anim-slide-up" style={{animationDelay: '0.2s'}}>
          Total: {convert(totalUsd)}
        </p>
        {paymentUrl && (
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#005334] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#00422a] transition-colors mb-4 anim-slide-up"
            style={{animationDelay: '0.25s'}}>
            Complete Payment <ArrowRight size={18} />
          </a>
        )}
        <div className="anim-slide-up" style={{animationDelay: '0.3s'}}>
          <Link href="/all-gemstones"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors best-seller-card">
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    )
  }

  // Processing
  if (step === 'processing') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center page-enter">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#005334] rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2">Processing Your Order...</h1>
        <p className="text-text-secondary text-sm">Please don&apos;t close this page.</p>
      </div>
    )
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center page-enter">
        <ShoppingCart size={64} className="anim-float" style={{color: '#ccc', margin: '0 auto 16px'}} />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-6">Looks like you haven&apos;t added any gemstones yet.</p>
        <Link href="/all-gemstones"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors best-seller-card">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-wrap page-enter">
      <StepIndicator current={step} />

      {/* ── Step 1: Cart Review ────────────────────────────────────────── */}
      {step === 'cart' && (
        <>
          <h1 style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>Shopping Cart ({totalItems} items)</h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {items.map(({ product, quantity }, i) => (
                <div key={product.id} className="cart-item cart-item-enter" style={{animationDelay: `${i * 0.05}s`}}>
                  <Link href={`/product/${product.id}`} style={{flexShrink: 0}}>
                    <Image src={product.imageUrl} alt={product.name} width={80} height={80} loading="lazy" sizes="80px" style={{objectFit: 'contain'}} className="product-img-hover" />
                  </Link>
                  <div style={{minWidth: 0}}>
                    <Link href={`/product/${product.id}`} style={{fontWeight: 'bold', fontSize: 13, color: '#333'}}>
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
                    {shippingUsd === 0 ? <span style={{color: '#005334'}}>Free</span> : convert(shippingUsd)}
                  </span>
                </div>
                {subtotal > 0 && subtotal <= convertRaw(FREE_SHIPPING_USD) && (
                  <p style={{fontSize: 12, color: '#666', marginTop: 4}}>Free shipping on orders over {convert(FREE_SHIPPING_USD)}</p>
                )}
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span style={{color: '#005334'}}>{convert(totalUsd)}</span>
                </div>
                <button onClick={() => setStep('shipping')}
                  className="gs-btn-cart" style={{width: '100%', marginTop: 16}}>
                  Proceed to Checkout <ArrowRight size={16} style={{marginLeft: 4}} />
                </button>
                <Link href="/all-gemstones" style={{display: 'block', textAlign: 'center', fontSize: 13, color: '#005334', marginTop: 12}}>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Step 2: Shipping Address ───────────────────────────────────── */}
      {step === 'shipping' && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep('cart')} className="text-gray-400 hover:text-[#005334] transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Shipping Address</h1>
          </div>
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <AddressForm address={address} onChange={setAddress} />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button onClick={() => setStep('cart')} className="text-sm text-gray-500 hover:text-[#005334] flex items-center gap-1">
                <ArrowLeft size={14} /> Back to Cart
              </button>
              <button onClick={() => setStep('payment')} disabled={!isAddressValid}
                className="bg-[#005334] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#00422a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Step 3: Payment Method ─────────────────────────────────────── */}
      {step === 'payment' && (
        <>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep('shipping')} className="text-gray-400 hover:text-[#005334] transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Payment Method</h1>
          </div>
          <div className="max-w-2xl space-y-6">
            {/* Order summary mini */}
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center text-sm">
              <span className="text-gray-600">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
              <span className="font-bold text-[#005334] text-lg">{convert(totalUsd)}</span>
            </div>

            {/* Payment options */}
            <div className="space-y-3">
              <PaymentOption
                label="Credit / Debit Card (Crypto)"
                description="Pay via NowPayments — Visa, Mastercard, or 50+ cryptocurrencies"
                icon={<CreditCard size={22} />}
                selected={paymentMethod === 'nowpayments'}
                onClick={() => setPaymentMethod('nowpayments')}
              />
              <PaymentOption
                label="M-Pesa"
                description="Pay directly from your M-Pesa mobile wallet (Kenya)"
                icon={<Smartphone size={22} />}
                selected={paymentMethod === 'mpesa'}
                onClick={() => setPaymentMethod('mpesa')}
              />
            </div>

            {/* M-Pesa phone input */}
            {paymentMethod === 'mpesa' && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1">M-Pesa Phone Number *</label>
                <input
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#005334] focus:ring-1 focus:ring-[#005334]/30"
                  value={mpesaPhone}
                  onChange={e => setMpesaPhone(e.target.value)}
                  placeholder="+254 7XX XXX XXX"
                />
                <p className="text-xs text-gray-400 mt-1">You will receive an STK push prompt on your phone</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-2">
              <button onClick={() => setStep('shipping')} className="text-sm text-gray-500 hover:text-[#005334] flex items-center gap-1">
                <ArrowLeft size={14} /> Back to Shipping
              </button>
              <button onClick={handleCheckout} disabled={paymentMethod === 'mpesa' && !mpesaPhone}
                className="bg-[#005334] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#00422a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                Place Order <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
