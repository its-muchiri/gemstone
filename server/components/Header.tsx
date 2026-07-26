'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useCurrency, type Currency } from '@/context/CurrencyContext'
import { apiProductToFrontend } from '@/lib/api'
import type { Product } from '@/types'

const popularGems = ['Sapphire', 'Topaz', 'Amethyst', 'Emerald', 'Citrine', 'Ruby', 'Tourmaline', 'Garnet', 'Tanzanite', 'Aquamarine', 'Opal', 'Zircon']
const mainCategories = ['Top Grade Gemstones', 'Gemstones By Piece', 'Cabochon Gemstones', 'Matching Gemstone Pairs', 'Gemstone Lots', 'Untreated Gemstones', 'Star Gemstones', 'Color Change Gemstones', "Cat's Eye Gemstones", 'Gemstone Carvings', 'Drilled Gemstones', 'Calibrated Gemstones', 'Fancy Cut Gemstones']
const colorList = ['Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Black', 'White', 'Orange', 'Brown', 'Gray', 'Multicolor', 'Purple', 'Violet', 'Bi-Color']

const helpSubLinks = [
  { to: '/help/shipping', label: 'Shipping' },
  { to: '/help/checkout', label: 'Payment and Checkout' },
  { to: '/help', label: 'Customer Reviews' },
  { to: '/help/guarantee', label: 'Gem Certification' },
  { to: '/help/guarantee', label: 'Guarantee' },
  { to: '/help/returns', label: 'Returns' },
  { to: '/help', label: 'Security and Privacy' },
  { to: '/help/about', label: 'About Us' },
  { to: '/help/contact', label: 'Contact Us' },
  { to: '/help', label: 'Help Central' },
]

interface ApiCategory {
  id: string
  slug: string
  name: string
  description: string | null
  _count: { products: number }
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [gemstonesOpen, setGemstonesOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [categories, setCategories] = useState<ApiCategory[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null) as React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  const gemstonesTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const helpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()
  const { data: session } = useSession()
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { currency, setCurrency } = useCurrency()
  const signedIn = !!session

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then((data: ApiCategory[]) => setCategories(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q)
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    if (q.trim().length > 1) {
      searchTimerRef.current = setTimeout(() => {
        fetch(`/api/products?search=${encodeURIComponent(q.trim())}&limit=6`)
          .then(r => r.json())
          .then(data => {
            setSuggestions((data.products || []).map(apiProductToFrontend))
            setShowSuggestions(true)
          })
          .catch(() => { setSuggestions([]); setShowSuggestions(false) })
      }, 300)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [])

  const submitSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSuggestions(false)
    }
  }

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY']

  const toggleMobileSection = (section: string) => {
    setMobileSection(prev => prev === section ? null : section)
  }

  return (
    <>
      {/* ===== DESKTOP HEADER ===== */}
      <div className="gs-header hidden lg:block">
        <div className="gs-desktop-top">
          <Link href="/" className="gs-logo">
            <Image src="/images/m_logo_gs.jpg" alt="GemSelect" width={140} height={40} priority />
          </Link>

          <div ref={searchRef} className="gs-search-form" style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
              placeholder="Search gemstones..."
            />
            <button onClick={submitSearch}>
              <Search size={18} />
            </button>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-white shadow-lg rounded border border-[#ddd] z-50 anim-slide-down">
                {suggestions.map(p => (
                  <Link key={p.id} href={`/product/${p.id}`}
                    onClick={() => { setShowSuggestions(false); setSearchQuery('') }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#f5f8f5] transition-colors">
                    <Image src={p.imageUrl} alt="" width={40} height={40} className="w-10 h-10 rounded object-cover" loading="lazy" />
                    <div>
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-[#666]">{p.weightCarats} ct — ${p.price.toLocaleString()}</div>
                    </div>
                  </Link>
                ))}
                <button onClick={submitSearch}
                  className="w-full text-left px-4 py-2 text-sm text-[#005334] font-medium hover:bg-[#f5f8f5] border-t border-[#ddd]">
                  View all results for &quot;{searchQuery}&quot;
                </button>
              </div>
            )}
          </div>

          <div className="gs-trust-inline">
            <div>
              <Image src="/images/m_report.png" alt="" width={32} height={32} loading="lazy" />
              <div>
                <b>Free Report</b>
                <small>Included</small>
              </div>
            </div>
            <div>
              <Image src="/images/m_worldwide.png" alt="" width={32} height={32} loading="lazy" />
              <div>
                <b>Worldwide</b>
                <small>Shipping</small>
              </div>
            </div>
            <div>
              <Image src="/images/m_return.png" alt="" width={32} height={32} loading="lazy" />
              <div>
                <b>30 Day</b>
                <small>Returns</small>
              </div>
            </div>
          </div>

          <div className="gs-actions">
            <Link href="/wishlist" className="gs-action-btn">
              <span className="gs-action-icon">♡</span>
              <span>Wishlist</span>
              {wishlistItems.length > 0 && (
                <em style={{ position: 'absolute', top: '-5px', right: '5px', minWidth: '17px', height: '17px', padding: '0 4px', borderRadius: '9px', background: '#007a1f', color: '#fff', fontSize: '11px', lineHeight: '17px', textAlign: 'center' }}>
                  {wishlistItems.length}
                </em>
              )}
            </Link>
            <button onClick={() => setAccountOpen(!accountOpen)} className="gs-action-btn">
              <span className="gs-action-icon"><User size={23} /></span>
              <span>Account</span>
            </button>
            <Link href="/cart" className="gs-action-btn gs-cart-link" id="cart_bl">
              <span className="gs-action-icon"><ShoppingCart size={23} /></span>
              <span>Cart</span>
              {totalItems > 0 && (
                <em>{totalItems}</em>
              )}
            </Link>
          </div>
        </div>

        {accountOpen && (
          <div className="absolute right-8 top-full bg-white shadow-lg rounded border border-[#ddd] p-4 z-50 w-72 anim-slide-down">
            {signedIn ? (
              <div>
                <p className="text-sm font-medium mb-1">Welcome, {session.user.name || session.user.email}</p>
                <p className="text-xs text-gray-500 mb-3">{session.user.email}</p>
                <button
                  onClick={() => { signOut({ callbackUrl: '/' }); setAccountOpen(false) }}
                  className="w-full text-sm text-[#005334] hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium mb-3">Sign In to Your Account</p>
                <Link
                  href="/login"
                  onClick={() => setAccountOpen(false)}
                  className="block w-full bg-[#005334] text-white py-2 rounded text-sm font-medium hover:bg-[#003d26] transition-colors text-center"
                >
                  Sign In
                </Link>
                <p className="text-xs text-[#666] mt-3 text-center">
                  Don&apos;t have an account?{' '}
                  <Link href="/register" onClick={() => setAccountOpen(false)} className="text-[#005334] hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}

        <nav className="gs-desktop-nav">
          <div className="gs-nav-left">
            <Link href="/">Home</Link>
            <div
              onMouseEnter={() => { if (gemstonesTimerRef.current) clearTimeout(gemstonesTimerRef.current); setGemstonesOpen(true) }}
              onMouseLeave={() => { gemstonesTimerRef.current = setTimeout(() => setGemstonesOpen(false), 150) }}
              style={{ position: 'relative' }}
            >
              <button className="flex items-center gap-1 text-white text-sm font-normal nav-underline">
                Gemstones <ChevronDown size={14} />
              </button>
              {gemstonesOpen && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-b border border-[#ddd] p-4 z-50 w-[600px] anim-slide-down" style={{boxShadow: '0 8px 24px rgba(0,0,0,0.12)'}}
                  onMouseEnter={() => { if (gemstonesTimerRef.current) clearTimeout(gemstonesTimerRef.current) }}
                  onMouseLeave={() => { gemstonesTimerRef.current = setTimeout(() => setGemstonesOpen(false), 150) }}
                >
                  <div className="grid grid-cols-3 gap-1">
                    {categories.map(c => (
                      <Link key={c.slug} href={`/gemstones/${c.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#f5f8f5] transition-colors text-sm text-[#333]">
                        <span>{c.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#ddd]">
                    <Link href="/all-gemstones" className="text-[#005334] text-sm font-medium hover:underline">
                      Browse All Gemstones →
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/all-gemstones">New Arrivals</Link>
            <div
              onMouseEnter={() => { if (helpTimerRef.current) clearTimeout(helpTimerRef.current); setHelpOpen(true) }}
              onMouseLeave={() => { helpTimerRef.current = setTimeout(() => setHelpOpen(false), 150) }}
              style={{ position: 'relative' }}
            >
              <button className="flex items-center gap-1 text-white text-sm font-normal nav-underline">
                Help <ChevronDown size={14} />
              </button>
              {helpOpen && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-b border border-[#ddd] py-2 z-50 min-w-[200px] anim-slide-down"
                  onMouseEnter={() => { if (helpTimerRef.current) clearTimeout(helpTimerRef.current) }}
                  onMouseLeave={() => { helpTimerRef.current = setTimeout(() => setHelpOpen(false), 150) }}
                >
                  {helpSubLinks.map((l, i) => (
                    <Link key={i} href={l.to} className="block px-4 py-1.5 text-sm text-[#333] hover:bg-[#f5f8f5]">{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/help">Education</Link>
          </div>
          <div className="gs-nav-right">
            <Link href="/wishlist" className="text-white text-sm no-underline" style={{ padding: '0 12px' }}>Wishlist</Link>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setCurrencyOpen(!currencyOpen)} className="flex items-center gap-1 text-sm text-white cursor-pointer bg-transparent border-0" style={{ padding: '0 12px', height: '34px' }}>
                {currency} <ChevronDown size={12} />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded border border-[#ddd] py-1 z-50 min-w-[80px]">
                  {currencies.map(c => (
                    <button key={c} onClick={() => { setCurrency(c); setCurrencyOpen(false) }}
                      className={`block w-full text-left px-3 py-1 text-xs hover:bg-[#f5f8f5] ${c === currency ? 'font-bold text-[#005334]' : 'text-[#333]'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* ===== MOBILE HEADER ===== */}
      <div className="m-cart-header lg:hidden">
        <div className="m-topbar">
          <button onClick={() => setMobileOpen(true)} className="m-icon-btn" aria-label="Menu">
            <Menu size={26} />
          </button>
          <Link href="/" className="m-logo">
            <Image src="/images/m_logo_gs.jpg" alt="GemSelect" width={120} height={36} loading="lazy" />
          </Link>
          <div className="m-icons">
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className="m-icon-btn" aria-label="Search">
              <Search size={26} />
            </button>
            <Link href="/cart" className="m-icon-btn" aria-label="Cart" style={{ position: 'relative' }}>
              <ShoppingCart size={26} />
              {totalItems > 0 && (
                <span className="cc_loaded">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>

        {mobileSearchOpen && (
          <div className="anim-slide-down" style={{ padding: '8px 14px' }}>
            <div className="mobile-search" style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { submitSearch(); setMobileSearchOpen(false) } }}
                placeholder="Search gemstones..."
                className="mobile-search-input"
              />
              <button onClick={() => { submitSearch(); setMobileSearchOpen(false) }} className="mobile-search-btn">
                <Search size={22} />
              </button>
            </div>
          </div>
        )}

        <div className="m-trust-strip">
          <div>
            <span className="trust-ico">✔</span>
            <div>
              <strong>Natural Gemstones</strong>
              <small>Certified & Authentic</small>
            </div>
          </div>
          <div>
            <span className="trust-ico">🌍</span>
            <div>
              <strong>Worldwide</strong>
              <small>Shipping</small>
            </div>
          </div>
          <div>
            <span className="trust-ico">↩</span>
            <div>
              <strong>30 Day</strong>
              <small>Returns</small>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE SLIDE-OUT MENU ===== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="mobile-menu-overlay active anim-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="mobile-menu open anim-slide-in-left" style={{ left: 0 }}>
            <div className="mobile-menu-header">
              <button onClick={() => setMobileOpen(false)} className="menu-close">×</button>
              <div className="menu-logo">
                GEMSELECT
                <span>Your Trusted Gemstone Source</span>
              </div>
            </div>

            <ul className="mobile-menu-list">
              <li>
                <Link href="/all-gemstones" onClick={() => setMobileOpen(false)} className="menu-link" style={{ gap: '14px' }}>
                  <span style={{ width: '22px', height: '20px', background: '#e8f5e9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🆕</span>
                  New Gemstone Arrivals
                </Link>
              </li>

              <li className="has-submenu">
                <div className="menu-row" onClick={() => toggleMobileSection('gems')}>
                  <span style={{ width: '22px', height: '20px', background: '#e3f2fd', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>💎</span>
                  Gemstones A-Z
                  <ChevronRight size={28} className={`submenu-arrow ${mobileSection === 'gems' ? 'rotate-90' : ''}`} />
                </div>
                {mobileSection === 'gems' && (
                  <div className="submenu" style={{ maxHeight: 'none', overflow: 'visible' }}>
                    {categories.map(c => (
                      <Link key={c.slug} href={`/gemstones/${c.slug}`} onClick={() => setMobileOpen(false)}>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="has-submenu">
                <div className="menu-row" onClick={() => toggleMobileSection('popular')}>
                  <span style={{ width: '22px', height: '20px', background: '#fff3e0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🔥</span>
                  Popular Gemstones
                  <ChevronRight size={28} className={`submenu-arrow ${mobileSection === 'popular' ? 'rotate-90' : ''}`} />
                </div>
                {mobileSection === 'popular' && (
                  <div className="submenu" style={{ maxHeight: 'none', overflow: 'visible' }}>
                    {popularGems.map(name => {
                      const cat = categories.find(c => c.name === name)
                      return (
                        <Link key={name} href={`/gemstones/${cat?.slug || name.toLowerCase()}`} onClick={() => setMobileOpen(false)}>
                          {name}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </li>

              <li className="has-submenu">
                <div className="menu-row" onClick={() => toggleMobileSection('main')}>
                  <span style={{ width: '22px', height: '20px', background: '#fce4ec', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>📂</span>
                  Main Categories
                  <ChevronRight size={28} className={`submenu-arrow ${mobileSection === 'main' ? 'rotate-90' : ''}`} />
                </div>
                {mobileSection === 'main' && (
                  <div className="submenu" style={{ maxHeight: 'none', overflow: 'visible' }}>
                    {mainCategories.map(c => (
                      <Link key={c} href="/all-gemstones" onClick={() => setMobileOpen(false)}>
                        {c}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="has-submenu">
                <div className="menu-row" onClick={() => toggleMobileSection('color')}>
                  <span style={{ width: '22px', height: '20px', background: '#f3e5f5', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🎨</span>
                  Gemstones By Color
                  <ChevronRight size={28} className={`submenu-arrow ${mobileSection === 'color' ? 'rotate-90' : ''}`} />
                </div>
                {mobileSection === 'color' && (
                  <div className="submenu" style={{ maxHeight: 'none', overflow: 'visible' }}>
                    {colorList.map(color => (
                      <Link key={color} href={`/search?q=${color.toLowerCase()}`} onClick={() => setMobileOpen(false)}>
                        {color} Gemstones
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="divider" />

              <li>
                <Link href="/" onClick={() => setMobileOpen(false)} className="menu-link">
                  Customer Testimonials
                </Link>
              </li>
              <li>
                <Link href="/help/guarantee" onClick={() => setMobileOpen(false)} className="menu-link">
                  Our Guarantee
                </Link>
              </li>
              <li>
                <Link href="/help" onClick={() => setMobileOpen(false)} className="menu-link">
                  Sign up for our Newsletter
                </Link>
              </li>

              <li>
                {signedIn ? (
                  <button onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false) }} className="menu-link w-full text-left">
                    Sign Out
                  </button>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="menu-link">
                    Login / Register
                  </Link>
                )}
              </li>

              <li className="has-submenu">
                <div className="menu-row" onClick={() => toggleMobileSection('help')}>
                  <span style={{ width: '21px', height: '16px', background: '#e8eaf6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>❓</span>
                  Help
                  <ChevronRight size={28} className={`submenu-arrow ${mobileSection === 'help' ? 'rotate-90' : ''}`} />
                </div>
                {mobileSection === 'help' && (
                  <div className="submenu" style={{ maxHeight: 'none', overflow: 'visible' }}>
                    {helpSubLinks.map((l, i) => (
                      <Link key={i} href={l.to} onClick={() => setMobileOpen(false)}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <Link href="/help/contact" onClick={() => setMobileOpen(false)} className="menu-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="menu-link">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/help" onClick={() => setMobileOpen(false)} className="menu-link">
                  Education
                </Link>
              </li>
            </ul>

            <Link href="/cart" onClick={() => setMobileOpen(false)} className="menu-cart">
              <ShoppingCart size={22} />
              {totalItems > 0 ? `View Cart (${totalItems})` : 'View Cart'}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
