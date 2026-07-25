import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Truck, RotateCcw, Shield } from 'lucide-react'
import { getProductById, products as allProducts } from '../data/products.ts'
import { useCart } from '../context/CartContext.tsx'
import { useWishlist } from '../context/WishlistContext.tsx'
import { useCurrency } from '../context/CurrencyContext.tsx'
import ProductCard from '../components/ProductCard.tsx'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const [qty, setQty] = useState(1)
  const [mainImg, setMainImg] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [imgZoom, setImgZoom] = useState(false)
  const { addItem } = useCart()
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlist()
  const { convert } = useCurrency()
  const inWish = product ? isInWishlist(product.id) : false
  useScrollReveal()

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
    <div className="gem-detail-wrap page-enter">
      <div className="gs-breadcrumbs">
        <Link to="/">Home</Link> <span>/</span>
        <Link to={`/gemstones/${product.category}`} className="capitalize">{product.category}</Link> <span>/</span>
        <strong>{product.name}</strong>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image gallery */}
        <div className="anim-slide-in-left">
          <div style={{border: '1px solid #e0e6e0', padding: 10, background: '#fafafa', marginBottom: 10, borderRadius: 4, overflow: 'hidden', cursor: 'zoom-in'}}
            onMouseEnter={() => setImgZoom(true)}
            onMouseLeave={() => setImgZoom(false)}>
            <img src={thumbnails[mainImg]} alt={product.name}
              className="gem-detail-img"
              style={{transition: 'transform 0.3s ease', transform: imgZoom ? 'scale(1.06)' : 'scale(1)'}} />
          </div>
          <div style={{display: 'flex', gap: 6}}>
            {thumbnails.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)}
                style={{
                  width: 60, height: 60, border: i === mainImg ? '2px solid #005334' : '1px solid #ddd',
                  background: '#fff', padding: 2, cursor: 'pointer', borderRadius: 3, transition: 'border-color 0.15s'
                }}>
                <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="gem-detail-info anim-slide-up">
          <h1 className="gem-detail-title">{product.name}</h1>
          <p style={{fontSize: 12, color: '#999', marginBottom: 8, fontFamily: 'monospace'}}>SKU: {product.id.toUpperCase()}</p>
          <p className="gem-detail-price">{convert(product.price)}</p>

          <table className="gem-detail-specs">
            <tbody>
              <tr><td>Weight</td><td>{product.weightCarats} ct</td></tr>
              <tr><td>Shape</td><td>{product.shape}</td></tr>
              <tr><td>Color</td><td>{product.color}</td></tr>
              <tr><td>Clarity</td><td>{product.clarity}</td></tr>
              <tr><td>Treatment</td><td>{product.treatment}</td></tr>
              <tr><td>Origin</td><td>{product.origin}</td></tr>
            </tbody>
          </table>

          {/* Quantity + actions */}
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, marginBottom: 16}}>
            <span style={{fontSize: 13, fontWeight: 'bold', color: '#1a3a24'}}>Quantity:</span>
            <div className="qty-wrap">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <input type="text" value={qty} readOnly />
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <div style={{display: 'flex', gap: 10, marginBottom: 20}}>
            <button onClick={() => addItem(product, qty)}
              disabled={!product.inStock}
              className="gs-btn-cart btn-cart-press"
              style={{flex: 1}}>
              Add to Cart
            </button>
            <button onClick={() => inWish ? removeWishlist(product.id) : addWishlist(product)}
              className={`heart-btn ${inWish ? 'anim-heart-beat' : ''}`}
              style={{
                width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: inWish ? '2px solid #005334' : '1px solid #ccc', borderRadius: 4,
                background: inWish ? '#e6f5ec' : '#fff', color: inWish ? '#005334' : '#999', cursor: 'pointer',
                transition: 'all 0.15s'
              }}>
              <Heart size={20} fill={inWish ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Trust badges */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 12, textAlign: 'center'}}>
            <div style={{background: '#f5f8f5', padding: '10px 6px', borderRadius: 4, border: '1px solid #e0e6e0'}}>
              <Truck size={20} style={{color: '#005334', margin: '0 auto 6px'}} />
              <p style={{fontWeight: 'bold', color: '#1a3a24'}}>Free Shipping</p>
            </div>
            <div style={{background: '#f5f8f5', padding: '10px 6px', borderRadius: 4, border: '1px solid #e0e6e0'}}>
              <RotateCcw size={20} style={{color: '#005334', margin: '0 auto 6px'}} />
              <p style={{fontWeight: 'bold', color: '#1a3a24'}}>30-Day Returns</p>
            </div>
            <div style={{background: '#f5f8f5', padding: '10px 6px', borderRadius: 4, border: '1px solid #e0e6e0'}}>
              <Shield size={20} style={{color: '#005334', margin: '0 auto 6px'}} />
              <p style={{fontWeight: 'bold', color: '#1a3a24'}}>Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{borderBottom: '2px solid #e0e6e0', marginBottom: 20}}>
        <div style={{display: 'flex', gap: 0}}>
          {[
            { key: 'description', label: 'Description' },
            { key: 'certification', label: 'Certification' },
            { key: 'shipping', label: 'Shipping' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '12px 24px', fontSize: 13, fontWeight: 'bold', background: 'none', border: 'none',
                borderBottom: activeTab === tab.key ? '3px solid #005334' : '3px solid transparent',
                color: activeTab === tab.key ? '#005334' : '#666', cursor: 'pointer',
                transition: 'all 0.15s', marginBottom: '-2px'
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{marginBottom: 40}}>
        {activeTab === 'description' && (
          <div className="tab-content-enter" style={{maxWidth: 700}}>
            <p style={{fontSize: 13, color: '#555', lineHeight: 1.7}}>{product.description}</p>
            <table className="gem-detail-specs" style={{marginTop: 16}}>
              <tbody>
                <tr><td>Category</td><td className="capitalize">{product.category}</td></tr>
                <tr><td>Weight</td><td>{product.weightCarats} carats</td></tr>
                <tr><td>Shape</td><td>{product.shape}</td></tr>
                <tr><td>Color</td><td>{product.color}</td></tr>
                <tr><td>Clarity</td><td>{product.clarity}</td></tr>
                <tr><td>Treatment</td><td>{product.treatment}</td></tr>
                <tr><td>Origin</td><td>{product.origin}</td></tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'certification' && (
          <div className="tab-content-enter" style={{maxWidth: 700}}>
            <p style={{fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 10}}>
              Premium gemstones from GemSelect may come with an independent gemological laboratory report from GIA, GRS, Gübelin, or SSEF. The report verifies the gemstone's identity, weight, measurements, color, clarity, treatment status, and origin (when determinable).
            </p>
            <p style={{fontSize: 13, color: '#555', lineHeight: 1.7}}>
              For this {product.name}, treatment status is listed as <strong>{product.treatment}</strong>. All gemstones are sold with our lifetime authenticity guarantee. If any gemstone is ever found to be misrepresented, we will provide a full refund.
            </p>
          </div>
        )}
        {activeTab === 'shipping' && (
          <div className="tab-content-enter" style={{maxWidth: 700}}>
            <p style={{fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 10}}>
              All orders are shipped from our Bangkok, Thailand office via insured, tracked international carriers.
            </p>
            <ul style={{fontSize: 13, color: '#555', paddingLeft: 20, lineHeight: 2}}>
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
        <div style={{marginTop: 20}}>
          <h2 className="scroll-reveal" style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1a3a24', paddingBottom: 8, borderBottom: '2px solid #005334', display: 'inline-block'}}>You May Also Like</h2>
          <div className="product-grid" style={{marginTop: 12}}>
            {related.map((p, i) => (
              <div key={p.id} className={`scroll-reveal delay-${(i % 4) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
