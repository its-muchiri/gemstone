import { Link } from 'react-router-dom'
import { bestSellers } from '../data/bestSellers.ts'
import { testimonials } from '../data/testimonials.ts'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="gs-hero">
        <img src="/images/gemselect-gemstones-for-sale.jpg" alt="Natural Gemstones for Sale" />
        <div className="gs-hero-overlay">
          <h1>Natural Loose Gemstones for Jewelry &amp; Collecting</h1>
          <p>Trusted by Jewelers, Designers, Collectors &amp; Gem Enthusiasts Worldwide</p>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16, fontSize: 14}}>
            {['Natural Gemstones', 'Since 2003', '130+ Gem Types', 'Worldwide Shipping', '30-Day Returns'].map(badge => (
              <span key={badge}>✔ {badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="gs-trust-bar">
        <div className="gs-trust-bar-item">
          <img src="/images/m_report.png" alt="" />
          <div><strong>Independent Gem Reports</strong><small>Included With Every Order</small></div>
        </div>
        <div className="gs-trust-bar-item">
          <img src="/images/m_worldwide.png" alt="" />
          <div><strong>Worldwide Shipping</strong><small>Free &amp; Insured</small></div>
        </div>
        <div className="gs-trust-bar-item">
          <img src="/images/m_return.png" alt="" />
          <div><strong>30-Day Returns</strong><small>No Questions Asked</small></div>
        </div>
      </div>

      {/* Best Selling Gems */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Best Selling Gems - Last 30 Days</h3>
        <div className="gs-best-sellers-grid">
          {bestSellers.map(bs => (
            <Link key={bs.categorySlug} to={`/gemstones/${bs.categorySlug}`}
              className="gs-best-seller-card">
              <img src={bs.imageUrl} alt={`${bs.name} Gemstones`} />
              <span>{bs.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Certified Customer Reviews</h3>
          <div className="gs-testimonials">
            {testimonials.slice(0, 9).map(t => (
              <div key={t.id} className="gs-testimonial">
                <div className="gs-testimonial-stars">
                  <img src="/images/gs_rating_10.gif" alt="Rating" style={{height: 12}} />
                  <span style={{fontSize: 13, fontWeight: 'bold', color: '#005334', marginLeft: 6}}>{t.rating}</span>
                </div>
                <p className="gs-testimonial-text">&ldquo;{t.quote}&rdquo;</p>
                <p className="gs-testimonial-author">
                  Posted By {t.name} in {t.date}
                </p>
                <p style={{fontSize: 11, color: '#999', marginTop: 2}}>Source: {t.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners and Trust */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Partners and Trust</h3>
        <Link to="/help" className="block rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
          <img src="/images/trust_desktop_2.jpg" alt="Partners and Trust" className="w-full object-cover" />
        </Link>
      </section>

      {/* CTA Banner */}
      <section className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-bold mb-4">Enjoy the Largest Online Shop for Natural Gemstones</p>
          <Link to="/all-gemstones"
            className="inline-block bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary-dark transition-colors uppercase text-sm tracking-wide">
            Discover Now
          </Link>
        </div>
      </section>

      {/* SEO Content Blocks */}
      <section className="max-w-7xl mx-auto px-4 py-8 bg-surface rounded-lg mt-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-2">Explore a World of Gems</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Our collection includes an array of natural gemstones ranging from well-known precious stones like sapphire, diamond, ruby, and emerald to unique and beautiful semi-precious options. It includes faceted, cabochon and carved gemstones. Each gemstone possesses its character, color, and charm, allowing you to find the perfect piece that speaks to you.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Gemstones for Sale: A Unique Opportunity</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Looking for that special gem without breaking the bank? Our exclusive sale on precious and semi-precious gemstones provides an opportunity to own exquisite gems at a fraction of the price. Even a blue sapphire can be affordable in certain tones or from certain locations. Whether you are a collector, jeweler, or simply an admirer of beautiful stones, our sale offers an unrivaled selection.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Loose Gemstones: For Customized Jewelry</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              For those with an eye for design, loose gemstones provide the freedom to create personalized jewelry. From pendants to engagement rings, choose the size, shape, and type of the loose stones to craft a piece that is uniquely yours. Colored gemstones are perfect for a ring, pendant or in earrings.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2">Invest in Precious Gemstones</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              With the value of gemstones often appreciating over time, purchasing precious gems can be seen as a wise investment. Our expert team is on hand to guide you in selecting quality gemstones that not only captivate the eye but also hold lasting value.
            </p>
          </div>
        </div>
      </section>

      {/* Gemstone Information */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white border border-border rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 uppercase">Gemstone Information</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              The biggest selection of gemstone articles online. Find technical, historical, spiritual and much more details on almost any gemstone available. We cover virtually every topic surrounding gemstones. Free gemstone education is just one click away.
            </p>
          </div>
          <Link to="/help"
            className="bg-primary text-white font-bold px-8 py-3 rounded hover:bg-primary-dark transition-colors uppercase text-sm tracking-wide whitespace-nowrap">
            Education
          </Link>
        </div>
      </section>
    </div>
  )
}
