'use client'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react'

interface OrderItem {
  id: string
  quantity: number
  priceCentsAtPurchase: number
  product: { id: string; name: string; images: string[] }
}

interface Order {
  id: string
  status: string
  subtotalCents: number
  shippingCents: number
  totalCents: number
  currency: string
  createdAt: string
  items: OrderItem[]
  payment: { status: string; provider: string } | null
}

function formatCents(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Order not found')
        return res.json()
      })
      .then(setOrder)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="animate-pulse text-gray-400">Loading order details...</div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
        <p className="text-gray-500 mb-6">{error || 'This order could not be found.'}</p>
        <Link href="/" className="inline-flex items-center gap-2 text-[#005334] font-semibold hover:underline">
          Back to Home <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  const isCancelled = status === 'cancelled' || order.status === 'CANCELLED' || order.status === 'FAILED'
  const isPending = order.status === 'AWAITING_PAYMENT' || order.status === 'PENDING'

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        {isCancelled ? (
          <>
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
            <p className="text-gray-500">Your order was not completed. No charges were made.</p>
          </>
        ) : isPending ? (
          <>
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Awaiting Payment</h1>
            <p className="text-gray-500">Your payment is being processed. We&apos;ll update your order shortly.</p>
          </>
        ) : (
          <>
            <CheckCircle className="w-16 h-16 text-[#005334] mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-500">Thank you for your order. A confirmation has been sent to your email.</p>
          </>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Order ID</span>
          <span className="font-mono text-xs">{order.id}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Status</span>
          <span className="font-semibold">{order.status.replace(/_/g, ' ')}</span>
        </div>
        {order.payment && (
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">Payment</span>
            <span>{order.payment.provider} — {order.payment.status}</span>
          </div>
        )}

        <hr className="my-4" />

        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 mb-3">
            <Image
              src={item.product.images[0] || '/images/placeholder.jpg'}
              alt={item.product.name}
              width={48}
              height={48}
              className="rounded object-cover"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.product.name}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold">{formatCents(item.priceCentsAtPurchase * item.quantity)}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Subtotal</span>
          <span>{formatCents(order.subtotalCents)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Shipping</span>
          <span>{order.shippingCents === 0 ? 'Free' : formatCents(order.shippingCents)}</span>
        </div>
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span className="text-[#005334]">{formatCents(order.totalCents)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/"
          className="flex-1 text-center py-3 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors">
          Back to Home
        </Link>
        {!isCancelled && (
          <Link href="/all-gemstones"
            className="flex-1 text-center py-3 rounded-lg bg-[#005334] text-white text-sm font-medium hover:bg-[#004229] transition-colors">
            Continue Shopping
          </Link>
        )}
      </div>
    </div>
  )
}
