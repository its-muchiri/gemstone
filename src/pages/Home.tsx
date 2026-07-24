import { Link } from 'react-router-dom'
import { bestSellers } from '../data/bestSellers.ts'
import { testimonials } from '../data/testimonials.ts'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-4">
                Natural Loose Gemstones for Jewelry &amp; Collecting
              </h1>
              <h2 className="text-lg text-text-secondary mb-6">
                Trusted by Jewelers, Designers, Collectors &amp; Gem Enthusiasts Worldwide
              </h2>
              <div className="flex flex-wrap gap-4 text-sm mb-6">
                {['✔ Natural Gemstones', '✔ Since 2003', '✔ 130+ Gem Types', '✔ Worldwide Shipping', '✔ 30-Day Returns'].map(badge => (
                  <span key={badge} className="text-text-secondary">{badge}</span>
                ))}
              </div>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src="/images/gemselect-gemstones-for-sale.jpg" alt="Natural Gemstones for Sale" className="w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✔</span> Natural Gemstones</span>
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✔</span> Since 2003</span>
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✔</span> 130+ Gem Types</span>
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✔</span> Worldwide Shipping</span>
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">✔</span> 30-Day Returns</span>
          </div>
        </div>
      </section>

      {/* Best Selling Gems */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Best Selling Gems - Last 30 Days</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4">
          {bestSellers.map(bs => (
            <Link key={bs.categorySlug} to={`/gemstones/${bs.categorySlug}`}
              className="group relative rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
              <img src={bs.imageUrl} alt={`${bs.name} Gemstones`} className="w-full aspect-[2/1] object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white font-medium text-sm">{bs.name}</span>
              </div>
              <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {bs.bestSellerPercent}%
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">Certified Customer Reviews</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map(t => (
              <div key={t.id} className="bg-white rounded border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-text-secondary">Overall Rating →</span>
                  <span className="text-sm font-bold text-primary">{t.rating}</span>
                  <img src="/images/gs_rating_10.gif" alt="Rating" className="h-3" />
                </div>
                <p className="text-sm text-text-secondary mb-3 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs text-text-secondary">
                  Posted By <strong>{t.name}</strong> in {t.date}
                </p>
                <p className="text-xs text-text-secondary mt-1"><strong>Source:</strong> {t.source}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {testimonials.slice(3, 6).map(t => (
              <div key={t.id} className="bg-white rounded border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-text-secondary">Overall Rating →</span>
                  <span className="text-sm font-bold text-primary">{t.rating}</span>
                  <img src="/images/gs_rating_10.gif" alt="Rating" className="h-3" />
                </div>
                <p className="text-sm text-text-secondary mb-3 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs text-text-secondary">
                  Posted By <strong>{t.name}</strong> in {t.date}
                </p>
                <p className="text-xs text-text-secondary mt-1"><strong>Source:</strong> {t.source}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {testimonials.slice(6, 9).map(t => (
              <div key={t.id} className="bg-white rounded border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-text-secondary">Overall Rating →</span>
                  <span className="text-sm font-bold text-primary">{t.rating}</span>
                  <img src="/images/gs_rating_10.gif" alt="Rating" className="h-3" />
                </div>
                <p className="text-sm text-text-secondary mb-3 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs text-text-secondary">
                  Posted By <strong>{t.name}</strong> in {t.date}
                </p>
                <p className="text-xs text-text-secondary mt-1"><strong>Source:</strong> {t.source}</p>
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
