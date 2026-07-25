'use client'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import QueryProvider from '@/components/QueryProvider'
import type { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        <CurrencyProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </CurrencyProvider>
      </QueryProvider>
    </SessionProvider>
  )
}
