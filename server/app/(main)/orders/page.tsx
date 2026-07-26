'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

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

function statusColor(s: string) {
  if (s === 'FULFILLED' || s === 'PAID') return 'text-green-700 bg-green-50'
  if (s === 'CANCELLED' || s === 'FAILED') return 'text-red-700 bg-red-50'
  return 'text-yellow-700 bg-yellow-50'
}

function statusIcon(s: string) {
  if (s === 'FULFILLED' || s === 'PAID') return <CheckCircle size={14} />
  if (s === 'CANCELLED' || s === 'FAILED') return <XCircle size={14} />
  return <Clock size={14} />
}

export default function OrdersPage() {
  const { data: session, status: authStatus } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login')
      return
    }
    if (authStatus !== 'authenticated') return

    fetch('/api/orders')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load orders')
        return res.json()
      })
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [authStatus, router])

  if (authStatus === 'loading' || loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#005334] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading your orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/" className="text-[#005334] font-semibold hover:underline text-sm">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 page-enter">
      <h1 className="text-2xl font-bold mb-1">My Orders</h1>
      <p className="text-sm text-gray-500 mb-8">Signed in as <span className="text-[#005334] font-medium">{session?.user.email}</span></p>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} style={{color: '#ccc', margin: '0 auto 12px'}} />
          <h2 className="text-lg font-semibold mb-2">No Orders Yet</h2>
          <p className="text-sm text-gray-500 mb-6">You haven&apos;t placed any orders.</p>
          <Link href="/all-gemstones"
            className="inline-flex items-center gap-2 bg-[#005334] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#00422a] transition-colors text-sm">
            Browse Gemstones <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}
              className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-[#005334]/30 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-mono text-gray-400 mb-1">#{order.id.slice(0, 8)}...</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(order.status)}`}>
                    {statusIcon(order.status)}
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                {order.items.slice(0, 4).map((item) => (
                  <Image
                    key={item.id}
                    src={item.product.images[0] || '/images/placeholder.jpg'}
                    alt={item.product.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded object-cover border border-gray-100"
                    loading="lazy"
                  />
                ))}
                {order.items.length > 4 && (
                  <span className="text-xs text-gray-400">+{order.items.length - 4} more</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                <p className="text-base font-bold text-[#005334]">{formatCents(order.totalCents)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
