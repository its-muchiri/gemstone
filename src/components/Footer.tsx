import { useState } from 'react'
import { Link } from 'react-router-dom'

const languages = ['English', 'Français', 'Español', 'Italiano', 'Deutsch', 'Русский', '中文', '日本語', 'العربية', 'Português', '한국인']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-white border-t border-border mt-auto text-text-primary text-sm">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wide">Shop</h4>
            <ul className="space-y-1.5 text-text-secondary">
              <li><Link to="/all-gemstones" className="hover:text-primary transition-colors">New Gems</Link></li>
              <li><Link to="/all-gemstones" className="hover:text-primary transition-colors">All Gemstones</Link></li>
              <li><Link to="/all-gemstones" className="hover:text-primary transition-colors">Birthstones</Link></li>
              <li><Link to="/all-gemstones" className="hover:text-primary transition-colors">Top Grade Gemstones</Link></li>
              <li><Link to="/all-gemstones" className="hover:text-primary transition-colors">Cabochon Gemstones</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wide">Policies</h4>
            <ul className="space-y-1.5 text-text-secondary">
              <li><Link to="/help/returns" className="hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link to="/help/checkout" className="hover:text-primary transition-colors">Payment Policy</Link></li>
              <li><Link to="/help/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/help/guarantee" className="hover:text-primary transition-colors">Gemstone Guarantee</Link></li>
              <li><Link to="/help/shipping" className="hover:text-primary transition-colors">International Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wide">Who Are We?</h4>
            <ul className="space-y-1.5 text-text-secondary">
              <li><Link to="/help/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Customer Reviews</Link></li>
              <li><Link to="/help/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Partners and Trust</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Help</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wide">Resources</h4>
            <ul className="space-y-1.5 text-text-secondary">
              <li><Link to="/all-gemstones" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link to="/help" className="hover:text-primary transition-colors">Education</Link></li>
              <li><Link to="/all-gemstones" className="hover:text-primary transition-colors">Sitemap</Link></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Newsletter</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-xs uppercase tracking-wide">We Are Located At</h4>
            <div className="text-text-secondary space-y-1.5">
              <p>183/24-25 Moo 4, Trirat Rd.</p>
              <p>T. Chantanimit, A. Muang</p>
              <p>Chanthaburi 22000</p>
              <p>THAILAND</p>
              <p className="mt-2">Phone: 1-800-464-1640</p>
              <p>Phone: +66-39601289</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-bold text-xs uppercase tracking-wide">Stay in Touch | Newsletter</span>
            </div>
            {subscribed ? (
              <p className="text-primary font-medium text-sm">Thank you for subscribing to GemSelect!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address..." required
                  className="flex-1 md:w-64 border border-border rounded-l px-3 py-2 text-sm outline-none focus:border-primary" />
                <button type="submit" className="bg-primary text-white font-bold px-4 py-2 rounded-r text-sm hover:bg-primary-dark transition-colors">
                  Go
                </button>
              </form>
            )}
          </div>
          <p className="text-[11px] text-text-secondary mt-2">*You&apos;re signing up to receive GemSelect promotional email.</p>
        </div>

        {/* Partners & Payment */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col items-center gap-4">
          <img src="/images/pay-options_footer.jpg" alt="Payment Options" className="max-w-full h-auto" />
          <img src="/images/partners_footer.jpg" alt="Partners" className="max-w-full h-auto" />
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/gemselect" target="_blank" rel="noopener noreferrer">
              <img src="/images/gemselect-facebook.png" alt="Facebook" className="h-8" />
            </a>
            <a href="https://www.pinterest.com/gemselect/" target="_blank" rel="noopener noreferrer">
              <img src="/images/gemselect-pinterest.png" alt="Pinterest" className="h-8" />
            </a>
            <a href="https://www.linkedin.com/in/gemselect/" target="_blank" rel="noopener noreferrer">
              <img src="/images/gemselect-linkedin.png" alt="LinkedIn" className="h-8" />
            </a>
            <a href="https://www.instagram.com/gemselect_gems/" target="_blank" rel="noopener noreferrer">
              <img src="/images/gemselect-instagram.png" alt="Instagram" className="h-8" />
            </a>
            <a href="https://www.youtube.com/@gemselect-settcompanyltd939" target="_blank" rel="noopener noreferrer">
              <img src="/images/gemselect-youtube.png" alt="YouTube" className="h-8" />
            </a>
          </div>
        </div>

        {/* Languages */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-secondary mb-2">Languages:</p>
          <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
            {languages.map(l => (
              <span key={l} className="hover:text-primary cursor-pointer transition-colors">{l}</span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-border text-center text-xs text-text-secondary">
          <p>Copyright &copy; 2005-2026 GemSelect.com all rights reserved.</p>
          <p className="mt-1">Reproduction (text or graphics) without the express written consent of GemSelect.com (SETT Company Ltd.) is strictly prohibited.</p>
        </div>
      </div>
    </footer>
  )
}
