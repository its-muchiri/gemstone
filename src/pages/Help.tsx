import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, HelpCircle, Phone, Mail, MapPin } from 'lucide-react'

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1 text-xs text-text-secondary mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={12} />
        <span className="text-text-primary font-medium">Help</span>
      </nav>

      <div className="grid md:grid-cols-4 gap-8">
        <nav className="md:col-span-1">
          <div className="bg-white border border-border rounded p-4 sticky top-24">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-1.5">
              <HelpCircle size={16} /> Help Topics
            </h3>
            <ul className="space-y-1">
              {links.map(l => (
                <li key={l.slug}>
                  <Link to={l.slug ? `/help/${l.slug}` : '/help'}
                    className={`block py-1.5 px-2 text-sm rounded transition-colors ${(!topic && !l.slug) || topic === l.slug ? 'bg-primary/10 text-primary font-medium' : 'text-text-secondary hover:bg-surface'}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="md:col-span-3">
          {showNotFound ? (
            <div className="bg-white border border-border rounded p-6 md:p-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
              <p className="text-text-secondary mb-4">
                The help topic &quot;{topic}&quot; doesn&apos;t exist. Please choose from the topics on the left.
              </p>
              <Link to="/help" className="text-primary hover:underline text-sm">← Back to Help Center</Link>
            </div>
          ) : (
            <div className="bg-white border border-border rounded p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-6">{data.title}</h1>
              <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                {data.content}
              </div>
            </div>
          )}

          {topic === 'contact' && (
            <>
              <div className="mt-6 bg-surface rounded p-6 grid sm:grid-cols-3 gap-4 text-center">
                <div>
                  <Phone size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-xs text-text-secondary">1-800-464-1640</p>
                  <p className="text-xs text-text-secondary">+66-39601289</p>
                </div>
                <div>
                  <Mail size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-text-secondary">help@gemselect.com</p>
                </div>
                <div>
                  <MapPin size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-xs text-text-secondary">183/24-25 Moo 4, Chanthaburi 22000, THAILAND</p>
                </div>
              </div>

              <div className="mt-6 bg-white border border-border rounded p-6">
                <h3 className="font-bold text-sm mb-4">Send Us a Message</h3>
                {sent ? (
                  <p className="text-primary font-medium">Thank you! Your message has been sent. We&apos;ll get back to you within 24 hours.</p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-3">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email" required
                      className="w-full border border-border rounded px-3 py-2 text-sm" />
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message" required rows={4}
                      className="w-full border border-border rounded px-3 py-2 text-sm resize-none" />
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded text-sm font-medium hover:bg-primary-dark transition-colors">
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
