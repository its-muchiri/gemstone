'use client'
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import type { Product } from '@/types'

interface WishlistContextType {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)
const WISHLIST_KEY = 'gemselect_wishlist'

function loadLocalWishlist(): Product[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveLocalWishlist(items: Product[]) {
  try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(items)) } catch {}
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [hydrated, setHydrated] = useState(false)
  const { data: session } = useSession()
  const isAuth = !!session

  useEffect(() => {
    if (isAuth) {
      fetch('/api/wishlist')
        .then(res => {
          if (!res.ok) return []
          return res.json()
        })
        .then((data: Array<{ product: { id: string; name: string; slug: string; priceCents: number; images: string[]; weightCarats: number; shape: string; color: string; origin: string; inStock: boolean } }>) => {
          if (!Array.isArray(data)) return
          const mapped: Product[] = data.map(item => ({
            id: item.product.id,
            name: item.product.name,
            category: '',
            price: item.product.priceCents / 100,
            weightCarats: item.product.weightCarats,
            shape: item.product.shape,
            color: item.product.color,
            clarity: '',
            treatment: '',
            origin: item.product.origin,
            description: '',
            imageUrl: item.product.images[0] || '/images/placeholder.jpg',
            inStock: item.product.inStock,
            dateAdded: '',
          }))
          setItems(mapped)
        })
        .catch(() => {})
    } else if (!hydrated) {
      setItems(loadLocalWishlist())
      setHydrated(true)
    }
  }, [isAuth, hydrated])

  useEffect(() => {
    if (!isAuth && hydrated) {
      saveLocalWishlist(items)
    }
  }, [items, isAuth, hydrated])

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.some(p => p.id === product.id)) return prev
      return [...prev, product]
    })

    if (isAuth) {
      fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      }).catch(() => {})
    }
  }, [isAuth])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(p => p.id !== productId))

    if (isAuth) {
      fetch(`/api/wishlist?productId=${encodeURIComponent(productId)}`, {
        method: 'DELETE',
      }).catch(() => {})
    }
  }, [isAuth])

  const isInWishlist = useCallback((productId: string) => {
    return items.some(p => p.id === productId)
  }, [items])

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
