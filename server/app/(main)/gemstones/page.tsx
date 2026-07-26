'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface ApiCategory {
  id: string
  slug: string
  name: string
  description: string | null
  _count: { products: number }
}

export default function GemstonesIndex() {
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [loading, setLoading] = useState(true)
  useScrollReveal()

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then((data: ApiCategory[]) => { setCategories(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 page-enter">
      <div className="gs-breadcrumbs">
        <Link href="/">Home</Link> <span>/</span>
        <strong>All Gemstones</strong>
      </div>

      <div className="category-header-wrap scroll-reveal">
        <h1>All Gemstones</h1>
        <p>Browse our complete collection of natural loose gemstones by category.</p>
      </div>

      {loading ? (
        <div style={{textAlign: 'center', padding: '60px 0', color: '#999'}}>Loading categories...</div>
      ) : (
        <div className="category-tiles" style={{marginTop: 16}}>
          {categories.map((c, i) => (
            <Link key={c.slug} href={`/gemstones/${c.slug}`}
              className={`category-tile category-tile-hover scroll-reveal delay-${(i % 12) + 1}`}>
              <Image src={`/images/all_${c.slug}.jpg`} alt={c.name} width={200} height={200} loading="lazy" sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 200px" className="product-img-hover" />
              <span>{c.name}</span>
              <small style={{fontSize: 11, color: '#888', marginTop: 2, display: 'block'}}>{c._count.products} stones</small>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
