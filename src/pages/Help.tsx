import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, HelpCircle, Phone, Mail, MapPin } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

const helpTopics: Record<string, { title: string; content: string }> = {
  shipping: {
    title: 'Shipping Policy',
    content: `We offer worldwide shipping on all gemstone orders. All shipments are fully insured for their purchase value and require signature upon delivery.

US Orders: Free standard shipping via USPS Priority Mail (2-4 business days). Express shipping available for $29.90 (1-2 business days).

Canada: $8.90 flat rate via FedEx International (5-7 business days).

UK & Europe: $8.90 flat rate via FedEx International Priority (7-10 business days).

Australia & Asia: $8.90 flat rate via DHL Express (7-12 business days).

All international customers are responsible for any customs duties or import taxes. We mark all packages as "Natural Gemstones" with declared value for customs purposes.`,
  },
  returns: {
    title: 'Return Policy',
    content: `We want you to be completely satisfied with your purchase. If for any reason you are not, we offer a hassle-free 30-day return policy.

Returns must be initiated within 30 days of delivery. Gemstones must be returned in their original condition and packaging.

To initiate a return, contact our customer service team with your order number. We will provide a prepaid return shipping label.

Refunds are processed within 5 business days of receiving the returned item. Refunds are issued to the original payment method.

Custom jewelry orders are non-refundable but may be exchanged or modified. Please contact us for any special circumstances.`,
  },
  checkout: {
    title: 'Payment and Checkout',
    content: `We accept the following payment methods: Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Alipay, WeChat Pay, and wire transfer.

All transactions are processed in US Dollars (USD). Your bank may apply currency conversion fees for international orders.

For orders over $5,000, we offer a wire transfer option with a 2% discount.

During checkout, you can:
- Enter your shipping address
- Select your preferred shipping method
- Apply any promotional codes
- Review your order before payment

All payment information is encrypted using 256-bit SSL technology. We never store your credit card details on our servers.`,
  },
  contact: {
    title: 'Contact Us',
    content: `Our customer service team is available Monday through Friday, 9 AM to 6 PM Eastern Time.

Phone: 1-800-464-1640
International: +66-39601289
Email: help@gemselect.com
Live Chat: Available on our website during business hours

Address:
SETT Company Limited
183/24-25 Moo 4, Trirat Rd.
T. Chantanimit, A. Muang
Chanthaburi 22000
THAILAND

We typically respond to email inquiries within 24 hours during business days. For urgent matters, please call us directly.`,
  },
  about: {
    title: 'About Us',
    content: `GemSelect was founded in 2003 with a simple mission: to make the world's finest natural gemstones accessible to everyone.

Over the past two decades, we've built relationships with miners and suppliers in Sri Lanka, Myanmar, Colombia, Mozambique, Brazil, Madagascar, and dozens of other source countries. This direct sourcing allows us to offer exceptional quality at competitive prices.

Our team includes certified gemologists trained by the Gemological Institute of America (GIA). Every gemstone we sell is examined by our in-house experts, and premium purchases include independent laboratory certification from GIA, GRS, Gübelin, or SSEF.

We are committed to ethical sourcing and responsible business practices. We work directly with small-scale miners and ensure fair compensation throughout our supply chain.

Today, we serve over 90,000 customers in 80+ countries, from individual collectors to professional jewelers.`,
  },
  guarantee: {
    title: 'Gemstone Guarantee',
    content: `At GemSelect, we guarantee that every gemstone we sell is 100% natural and authentic. Our guarantee includes:

Authenticity: Every gemstone is guaranteed to be a natural stone as described. If any gemstone is ever found to be synthetic, treated without disclosure, or otherwise misrepresented, we will provide a full refund.

Quality: The color, clarity, and quality descriptions of our gemstones are accurate representations. We use professional photography under standardized lighting conditions.

Certification: Premium gemstones come with independent laboratory reports from GIA, GRS, Gübelin, or SSEF.

Value: We offer a price-match guarantee against any authorized gemstone retailer for identical stones.

Lifetime Service: We provide free gemological assessment for any stone purchased from us, for as long as you own it.`,
  },
}

const defaultTopic = {
  title: 'Help Center',
  content: `Welcome to our Help Center. Here you can find answers to common questions and important policies.

Browse the topics in the navigation for detailed information about:
- Shipping options and rates worldwide
- Our 30-day return policy
- Checkout and payment options
- Our gemstone guarantee
- How to contact our team
- About GemSelect

For any questions not covered here, please don't hesitate to contact our customer service team.`
}

export default function Help() {
  const { topic } = useParams<{ topic: string }>()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  useScrollReveal()

  const validTopic = topic ? helpTopics[topic] : undefined
  const showNotFound = topic && !validTopic
  const data = validTopic || defaultTopic

  const links = [
    { slug: '', label: 'Help Central' },
    { slug: 'shipping', label: 'Shipping' },
    { slug: 'returns', label: 'Returns' },
    { slug: 'checkout', label: 'Payment and Checkout' },
    { slug: 'guarantee', label: 'Guarantee' },
    { slug: 'contact', label: 'Contact Us' },
    { slug: 'about', label: 'About Us' },
  ]

  return (
    <div className="gem-detail-wrap page-enter">
      <div className="gs-breadcrumbs anim-slide-down">
        <Link to="/">Home</Link> <span>/</span>
        <strong>Help</strong>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <nav className="md:col-span-1">
          <div className="gs-sidebar anim-slide-in-left" style={{position: 'sticky', top: 100}}>
            <h3 style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 14}}>
              <HelpCircle size={14} /> Help Topics
            </h3>
            <ul style={{listStyle: 'none', padding: 0, marginTop: 10}}>
              {links.map((l, i) => (
                <li key={l.slug} style={{marginBottom: 2}}>
                  <Link to={l.slug ? `/help/${l.slug}` : '/help'}
                    className="scroll-reveal"
                    style={{
                      display: 'block', padding: '7px 12px', fontSize: 13, textDecoration: 'none',
                      borderRadius: 3, transition: 'all 0.15s',
                      background: (!topic && !l.slug) || topic === l.slug ? '#e6f5ec' : 'transparent',
                      color: (!topic && !l.slug) || topic === l.slug ? '#005334' : '#555',
                      fontWeight: (!topic && !l.slug) || topic === l.slug ? 'bold' : 'normal'
                    }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="md:col-span-3">
          {showNotFound ? (
            <div className="anim-scale-in" style={{background: '#fff', border: '1px solid #eee', padding: 24, textAlign: 'center'}}>
              <h1 style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>Page Not Found</h1>
              <p style={{color: '#666', marginBottom: 12}}>
                The help topic &quot;{topic}&quot; doesn&apos;t exist. Please choose from the topics on the left.
              </p>
              <Link to="/help" style={{color: '#005334', textDecoration: 'underline', fontSize: 13}}>Back to Help Center</Link>
            </div>
          ) : (
            <div className="anim-slide-up" style={{background: '#fff', border: '1px solid #eee', padding: 24}}>
              <h1 style={{fontSize: 20, fontWeight: 'bold', marginBottom: 16}}>{data.title}</h1>
              <div style={{fontSize: 13, color: '#555', lineHeight: 1.8, whiteSpace: 'pre-line'}}>
                {data.content}
              </div>
            </div>
          )}

          {topic === 'contact' && (
            <>
              <div className="scroll-reveal" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20, background: 'linear-gradient(180deg, #f5f8f5 0%, #eef3ee 100%)', padding: 20, textAlign: 'center', borderRadius: 4, border: '1px solid #e0e6e0'}}>
                <div>
                  <Phone size={22} style={{color: '#005334', margin: '0 auto 6px'}} />
                  <p style={{fontSize: 13, fontWeight: 'bold', color: '#1a3a24'}}>Phone</p>
                  <p style={{fontSize: 12, color: '#666'}}>1-800-464-1640</p>
                  <p style={{fontSize: 12, color: '#666'}}>+66-39601289</p>
                </div>
                <div>
                  <Mail size={22} style={{color: '#005334', margin: '0 auto 6px'}} />
                  <p style={{fontSize: 13, fontWeight: 'bold', color: '#1a3a24'}}>Email</p>
                  <p style={{fontSize: 12, color: '#666'}}>help@gemselect.com</p>
                </div>
                <div>
                  <MapPin size={22} style={{color: '#005334', margin: '0 auto 6px'}} />
                  <p style={{fontSize: 13, fontWeight: 'bold', color: '#1a3a24'}}>Address</p>
                  <p style={{fontSize: 12, color: '#666'}}>183/24-25 Moo 4, Chanthaburi 22000, THAILAND</p>
                </div>
              </div>

              <div style={{marginTop: 20, background: '#fff', border: '1px solid #e0e6e0', padding: 20, borderRadius: 4}}>
                <h3 style={{fontSize: 14, fontWeight: 'bold', marginBottom: 12, color: '#1a3a24'}}>Send Us a Message</h3>
                {sent ? (
                  <p className="newsletter-success" style={{color: '#005334', fontWeight: 'bold', fontSize: 13}}>Thank you! Your message has been sent. We&apos;ll get back to you within 24 hours.</p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                    <div className="gs-form-group">
                      <label>Your Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
                    </div>
                    <div className="gs-form-group">
                      <label>Your Message</label>
                      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" required rows={4}
                        style={{resize: 'none'}} />
                    </div>
                    <button type="submit" className="gs-btn" style={{padding: '8px 24px', fontSize: 13}}>
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
