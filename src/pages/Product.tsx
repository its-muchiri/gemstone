import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, ShoppingCart, Heart, Truck, RotateCcw, Shield, Info, FileText, Package } from 'lucide-react'
import { getProductById, products as allProducts } from '../data/products.ts'
import { useCart } from '../context/CartContext.tsx'
import { useWishlist } from '../context/WishlistContext.tsx'
import { useCurrency } from '../context/CurrencyContext.tsx'
import ProductCard from '../components/ProductCard.tsx'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const [qty, setQty] = useState(1)
  const [mainImg, setMainImg] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const { addItem } = useCart()
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist()
  const { convert } = useCurrency()
  const inWish = product ? isInWishlist(product.id) : false

  const related = useMemo(() => {
    if (!product) return []
    return allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/all-gemstones" className="text-primary hover:underline">Browse All Gemstones</Link>
      </div>
    )
  }

  const thumbnails = [product.imageUrl, `${product.imageUrl}?v=2`, `${product.imageUrl}?v=3`]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-1 text-xs text-text-secondary mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/gemstones/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image gallery */}
        <div>
          <div className="rounded-xl overflow-hidden border border-border bg-surface mb-3">
            <img src={thumbnails[mainImg]} alt={product.name} className="w-full aspect-square object-cover" />
          </div>
          <div className="flex gap-2">
            {thumbnails.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)}
                className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${i === mainImg ? 'border-primary' : 'border-border hover:border-text-secondary'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">{product.name}</h1>
          <p className="text-sm text-text-secondary mb-4">SKU: {product.id.toUpperCase()}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">{convert(product.price)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="bg-surface rounded-lg p-3">
              <span className="text-text-secondary text-xs">Weight</span>
              <p className="font-medium">{product.weightCarats} ct</p>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <span className="text-text-secondary text-xs">Shape</span>
              <p className="font-medium">{product.shape}</p>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <span className="text-text-secondary text-xs">Color</span>
              <p className="font-medium">{product.color}</p>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <span className="text-text-secondary text-xs">Clarity</span>
              <p className="font-medium">{product.clarity}</p>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <span className="text-text-secondary text-xs">Treatment</span>
              <p className="font-medium">{product.treatment}</p>
            </div>
            <div className="bg-surface rounded-lg p-3">
              <span className="text-text-secondary text-xs">Origin</span>
              <p className="font-medium">{product.origin}</p>
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 text-lg hover:bg-surface rounded-l-lg transition-colors">−</button>
              <span className="px-4 py-1.5 text-sm font-medium min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 text-lg hover:bg-surface rounded-r-lg transition-colors">+</button>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={() => addItem(product, qty)}
              disabled={!product.inStock}
              className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button onClick={() => inWish ? removeWishlist(product.id) : addWishlist(product)}
              className={`px-4 py-3 rounded-lg border-2 transition-colors ${inWish ? 'border-gold bg-gold/10 text-gold' : 'border-border hover:border-primary hover:text-primary'}`}>
              <Heart size={18} fill={inWish ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-surface rounded-lg p-2">
              <Truck size={16} className="mx-auto mb-1 text-primary" />
              <p className="font-medium">Free Shipping</p>
            </div>
            <div className="bg-surface rounded-lg p-2">
              <RotateCcw size={16} className="mx-auto mb-1 text-primary" />
              <p className="font-medium">30-Day Returns</p>
            </div>
            <div className="bg-surface rounded-lg p-2">
              <Shield size={16} className="mx-auto mb-1 text-primary" />
              <p className="font-medium">Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className="flex gap-0">
          {[
            { key: 'description', label: 'Description', icon: Info },
            { key: 'certification', label: 'Certification', icon: FileText },
            { key: 'shipping', label: 'Shipping', icon: Package },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        {activeTab === 'description' && (
          <div className="max-w-2xl">
            <p className="text-text-secondary leading-relaxed">{product.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium">Category:</span> <span className="capitalize">{product.category}</span></div>
              <div><span className="font-medium">Weight:</span> {product.weightCarats} carats</div>
              <div><span className="font-medium">Shape:</span> {product.shape}</div>
              <div><span className="font-medium">Color:</span> {product.color}</div>
              <div><span className="font-medium">Clarity:</span> {product.clarity}</div>
              <div><span className="font-medium">Treatment:</span> {product.treatment}</div>
              <div><span className="font-medium">Origin:</span> {product.origin}</div>
            </div>
          </div>
        )}
        {activeTab === 'certification' && (
          <div className="max-w-2xl">
            <p className="text-text-secondary leading-relaxed mb-3">
              Premium gemstones from GemSelect may come with an independent gemological laboratory report from GIA, GRS, Gübelin, or SSEF. The report verifies the gemstone's identity, weight, measurements, color, clarity, treatment status, and origin (when determinable).
            </p>
            <p className="text-text-secondary leading-relaxed">
              For this {product.name}, treatment status is listed as <strong>{product.treatment}</strong>. All gemstones are sold with our lifetime authenticity guarantee. If any gemstone is ever found to be misrepresented, we will provide a full refund.
            </p>
          </div>
        )}
        {activeTab === 'shipping' && (
          <div className="max-w-2xl">
            <p className="text-text-secondary leading-relaxed mb-3">
              All orders are shipped from our Bangkok, Thailand office via insured, tracked international carriers.
            </p>
            <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
              <li>Express Shipping: $29.90, 2-5 business days (fully insured, tracked)</li>
              <li>International Standard: $8.90, 10-21 business days (insured, tracked)</li>
              <li>Free shipping available on qualifying orders over $500 USD</li>
              <li>All shipments are insured for full value</li>
              <li>Signature required on delivery</li>
            </ul>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
