import type { Product } from '@/types'

const API_BASE = ''

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`)
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(body.error || `HTTP ${res.status}`)
  }
  return res.json()
}

interface ApiProduct {
  id: string
  sku: string
  name: string
  slug: string
  categoryId: string
  category: { id: string; name: string; slug: string }
  priceCents: number
  weightCarats: number
  shape: string
  color: string
  clarity: string
  treatment: string
  origin: string
  description: string
  images: string[]
  inStock: boolean
  createdAt: string
  updatedAt: string
}

interface ApiCategory {
  id: string
  slug: string
  name: string
  description: string | null
  _count: { products: number }
}

interface ProductsResponse {
  products: ApiProduct[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export function apiProductToFrontend(p: ApiProduct): Product {
  return {
    id: p.sku || p.id,
    name: p.name,
    category: p.category?.slug || '',
    price: p.priceCents / 100,
    weightCarats: p.weightCarats,
    shape: p.shape,
    color: p.color,
    clarity: p.clarity,
    treatment: p.treatment,
    origin: p.origin,
    description: p.description,
    imageUrl: p.images[0] || '/images/placeholder.jpg',
    inStock: p.inStock,
    dateAdded: p.createdAt,
  }
}

export interface ProductFilters {
  category?: string
  color?: string
  shape?: string
  priceMin?: number
  priceMax?: number
  caratMin?: number
  caratMax?: number
  treatment?: string
  inStock?: boolean
  search?: string
  page?: number
  limit?: number
  sort?: string
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.set(k, String(v))
  })
  const qs = params.toString()
  const data = await fetchJSON<ProductsResponse>(`/api/products${qs ? `?${qs}` : ''}`)
  return {
    ...data,
    products: data.products.map(apiProductToFrontend),
  } as unknown as ProductsResponse
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const p = await fetchJSON<ApiProduct>(`/api/products/${slug}`)
    return apiProductToFrontend(p)
  } catch {
    return null
  }
}

export async function fetchCategories() {
  return fetchJSON<(ApiCategory & { slug: string; name: string })[]>(`/api/categories`)
}

/* ── Checkout API ─────────────────────────────────────────────────────────── */

export interface ShippingAddress {
  name: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface OrderItem {
  productId: string
  quantity: number
}

export interface ApiOrder {
  id: string
  status: string
  subtotalCents: number
  shippingCents: number
  totalCents: number
  currency: string
  shippingAddress: ShippingAddress
  items: Array<{ id: string; productId: string; quantity: number; priceCents: number; product: ApiProduct }>
  createdAt: string
}

async function fetchJSONWithAuth<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(body.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export async function createOrder(items: OrderItem[], shippingAddress: ShippingAddress): Promise<ApiOrder> {
  return fetchJSONWithAuth<ApiOrder>('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ items, shippingAddress }),
  })
}

export interface NowPaymentsInvoice {
  invoiceId: string
  invoiceUrl: string
  orderId: string
}

export async function createNowPaymentsInvoice(orderId: string): Promise<NowPaymentsInvoice> {
  return fetchJSONWithAuth<NowPaymentsInvoice>('/api/checkout/nowpayments', {
    method: 'POST',
    body: JSON.stringify({ orderId }),
  })
}

export interface MpesaCheckoutResponse {
  orderId: string
  status: string
  message: string
}

export async function initiateMpesaPayment(orderId: string, phoneNumber: string): Promise<MpesaCheckoutResponse> {
  return fetchJSONWithAuth<MpesaCheckoutResponse>('/api/checkout/mpesa', {
    method: 'POST',
    body: JSON.stringify({ orderId, phoneNumber }),
  })
}
