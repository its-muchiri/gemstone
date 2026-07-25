'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchProductBySlug, type ProductFilters } from '@/lib/api'
import { products as mockProducts, searchProducts as mockSearch, getProductById as mockGetById } from '@/data/products'
import { categories as mockCategories, getCategoryBySlug } from '@/data/categories'
import type { Product } from '@/types'

function useApiAvailable() {
  return useQuery({
    queryKey: ['api-health'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/categories', { signal: AbortSignal.timeout(3000) })
        return res.ok
      } catch {
        return false
      }
    },
    staleTime: 300_000,
    retry: false,
  })
}

export function useProducts(filters: ProductFilters = {}) {
  const { data: apiUp } = useApiAvailable()

  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    enabled: apiUp === true,
    placeholderData: (prev) => prev,
  })
}

export function useMockProducts(slug?: string) {
  const { data: apiUp } = useApiAvailable()

  const categoryProducts = slug
    ? mockProducts.filter(p => p.category === slug)
    : mockProducts

  return {
    products: categoryProducts as Product[],
    isLoading: false,
    isFromApi: apiUp === true,
  }
}

export function useMockProduct(id?: string) {
  if (!id) return null
  return mockGetById(id) || null
}

export function useMockSearch(query: string) {
  if (!query.trim()) return []
  return mockSearch(query)
}

export { mockCategories as categories, getCategoryBySlug }
