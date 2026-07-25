import { Link } from 'react-router-dom'
import { bestSellers } from '../data/bestSellers.ts'
import { testimonials } from '../data/testimonials.ts'
import { useScrollReveal } from '../hooks/useScrollReveal.ts'

export default function Home() {
  useScrollReveal()

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="gs-hero">
        <img src="/images/gemselect-gemstones-for-sale.jpg" alt="Natural Gemstones for Sale" className="hero-img-ken-burns" />
        <div className="gs-hero-overlay">
          <h1 className="anim-slide-up">Natural Loose Gemstones for Jewelry &amp; Collecting</h1>
          <p className="anim-slide-up" style={{animationDelay: '0.1s'}}>Trusted by Jewelers, Designers, Collectors &amp; Gem Enthusiasts Worldwide</p>
          <div className="anim-slide-up" style={{display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 18, fontSize: 14, animationDelay: '0.2s'}}>
            {['Natural Gemstones', 'Since 2003', '130+ Gem Types', 'Worldwide Shipping', '30-Day Returns'].map((badge, i) => (
              <span key={badge} className="best-seller-card" style={{display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 4, backdropFilter: 'blur(4px)', animationDelay: `${0.25 + i * 0.06}s`}}>✔ {badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="gs-trust-bar">
        <div className="gs-trust-bar-item trust-icon-hover scroll-reveal delay-1">
          <img src="/images/m_report.png" alt="" />
          <div><strong>Independent Gem Reports</strong><small>Included With Every Order</small></div>
        </div>
        <div className="gs-trust-bar-item trust-icon-hover scroll-reveal delay-2">
          <img src="/images/m_worldwide.png" alt="" />
          <div><strong>Worldwide Shipping</strong><small>Free &amp; Insured</small></div>
        </div>
        <div className="gs-trust-bar-item trust-icon-hover scroll-reveal delay-3">
          <img src="/images/m_return.png" alt="" />
          <div><strong>30-Day Returns</strong><small>No Questions Asked</small></div>
        </div>
      </div>

      {/* Best Selling Gems */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide scroll-reveal">Best Selling Gems - Last 30 Days</h3>
        <div className="gs-best-sellers-grid">
          {bestSellers.map((bs, i) => (
            <Link key={bs.categorySlug} to={`/gemstones/${bs.categorySlug}`}
              className={`gs-best-seller-card best-seller-card scroll-reveal delay-${(i % 12) + 1}`}>
              <img src={bs.imageUrl} alt={`${bs.name} Gemstones`} className="product-img-hover" />
              <span>{bs.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide scroll-reveal">Certified Customer Reviews</h3>
          <div className="gs-testimonials">
            {testimonials.slice(0, 9).map((t, i) => (
              <div key={t.id} className={`gs-testimonial best-seller-card scroll-reveal delay-${(i % 12) + 1}`}>
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
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide scroll-reveal">Partners and Trust</h3>
        <Link to="/help" className="block rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow scroll-reveal">
          <img src="/images/trust_desktop_2.jpg" alt="Partners and Trust" className="w-full object-cover" />
        </Link>
      </section>

      {/* CTA Banner */}
      <section style={{background: 'linear-gradient(135deg, #005334 0%, #003d26 100%)', padding: '32px 0'}}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-bold mb-4 scroll-reveal" style={{color: '#fff'}}>Enjoy the Largest Online Shop for Natural Gemstones</p>
          <Link to="/all-gemstones"
            className="best-seller-card scroll-reveal"
            style={{display: 'inline-block', background: '#fff', color: '#005334', fontWeight: 'bold', padding: '12px 32px', borderRadius: 4, textDecoration: 'none', fontSize: 14, letterSpacing: '0.5px', border: '2px solid #fff'}}>
            Discover Now
          </Link>
        </div>
      </section>

      {/* SEO Content Blocks */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: 'Explore a World of Gems', text: 'Our collection includes an array of natural gemstones ranging from well-known precious stones like sapphire, diamond, ruby, and emerald to unique and beautiful semi-precious options. It includes faceted, cabochon and carved gemstones. Each gemstone possesses its character, color, and charm, allowing you to find the perfect piece that speaks to you.' },
            { title: 'Gemstones for Sale: A Unique Opportunity', text: 'Looking for that special gem without breaking the bank? Our exclusive sale on precious and semi-precious gemstones provides an opportunity to own exquisite gems at a fraction of the price. Even a blue sapphire can be affordable in certain tones or from certain locations.' },
            { title: 'Loose Gemstones: For Customized Jewelry', text: 'For those with an eye for design, loose gemstones provide the freedom to create personalized jewelry. From pendants to engagement rings, choose the size, shape, and type of the loose stones to craft a piece that is uniquely yours.' },
            { title: 'Invest in Precious Gemstones', text: 'With the value of gemstones often appreciating over time, purchasing precious gems can be seen as a wise investment. Our expert team is on hand to guide you in selecting quality gemstones that not only captivate the eye but also hold lasting value.' },
          ].map((block, i) => (
            <div key={i} className={`bg-white border border-[#e0e6e0] rounded-lg p-6 best-seller-card scroll-reveal delay-${(i % 4) + 1}`}>
              <h2 className="text-base font-bold mb-2 text-[#1a3a24]">{block.title}</h2>
              <p className="text-sm text-[#555] leading-relaxed">{block.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gemstone Information */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white border border-[#e0e6e0] rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 scroll-reveal" style={{boxShadow: '0 2px 10px rgba(0,0,0,0.04)'}}>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2" style={{color: '#1a3a24'}}>GEMSTONE INFORMATION</h3>
            <p className="text-sm text-[#555] leading-relaxed">
              The biggest selection of gemstone articles online. Find technical, historical, spiritual and much more details on almost any gemstone available. We cover virtually every topic surrounding gemstones. Free gemstone education is just one click away.
            </p>
          </div>
          <Link to="/help"
            className="best-seller-card"
            style={{display: 'inline-block', background: '#005334', color: '#fff', fontWeight: 'bold', padding: '10px 28px', borderRadius: 4, textDecoration: 'none', fontSize: 13, letterSpacing: '0.5px', whiteSpace: 'nowrap'}}>
            Education
          </Link>
        </div>
      </section>
    </div>
  )
}
