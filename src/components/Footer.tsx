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
    <footer className="gs-footer page-enter">
      <div className="gs-footer-cols">
        <div className="gs-footer-col scroll-reveal delay-1">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/all-gemstones" className="footer-link">New Gems</Link></li>
            <li><Link to="/all-gemstones" className="footer-link">All Gemstones</Link></li>
            <li><Link to="/all-gemstones" className="footer-link">Birthstones</Link></li>
            <li><Link to="/all-gemstones" className="footer-link">Top Grade Gemstones</Link></li>
            <li><Link to="/all-gemstones" className="footer-link">Cabochon Gemstones</Link></li>
          </ul>
        </div>

        <div className="gs-footer-col scroll-reveal delay-2">
          <h4>Policies</h4>
          <ul>
            <li><Link to="/help/returns" className="footer-link">Return Policy</Link></li>
            <li><Link to="/help/checkout" className="footer-link">Payment Policy</Link></li>
            <li><Link to="/help/shipping" className="footer-link">Shipping Policy</Link></li>
            <li><Link to="/help" className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/help" className="footer-link">Terms of Service</Link></li>
            <li><Link to="/help/guarantee" className="footer-link">Gemstone Guarantee</Link></li>
            <li><Link to="/help/shipping" className="footer-link">International Orders</Link></li>
          </ul>
        </div>

        <div className="gs-footer-col scroll-reveal delay-3">
          <h4>Who Are We?</h4>
          <ul>
            <li><Link to="/help/about" className="footer-link">About Us</Link></li>
            <li><Link to="/" className="footer-link">Customer Reviews</Link></li>
            <li><Link to="/help/contact" className="footer-link">Contact Us</Link></li>
            <li><Link to="/help" className="footer-link">Partners and Trust</Link></li>
            <li><Link to="/help" className="footer-link">Help</Link></li>
          </ul>
        </div>

        <div className="gs-footer-col scroll-reveal delay-4">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/all-gemstones" className="footer-link">Collections</Link></li>
            <li><Link to="/help" className="footer-link">Education</Link></li>
            <li><Link to="/all-gemstones" className="footer-link">Sitemap</Link></li>
            <li><span className="footer-link" style={{cursor: 'pointer'}}>Newsletter</span></li>
          </ul>
        </div>

        <div className="gs-footer-col scroll-reveal delay-5">
          <h4>Location</h4>
          <div style={{fontSize: 13, color: '#a8d4a8', lineHeight: 1.7}}>
            <p>183/24-25 Moo 4, Trirat Rd.</p>
            <p>T. Chantanimit, A. Muang</p>
            <p>Chanthaburi 22000</p>
            <p>THAILAND</p>
            <p style={{marginTop: 8, color: '#fff', fontWeight: 'bold'}}>Phone: 1-800-464-1640</p>
            <p style={{color: '#fff', fontWeight: 'bold'}}>Phone: +66-39601289</p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{borderTop: '1px solid #3a5040', padding: '20px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap'}}>
          <span style={{fontWeight: 'bold', fontSize: 13, color: '#fff'}}>Stay in Touch | Newsletter</span>
          {subscribed ? (
            <p className="newsletter-success" style={{color: '#a8d4a8', fontSize: 13}}>Thank you for subscribing to GemSelect!</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{display: 'flex'}}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address..." required
                style={{padding: '7px 12px', border: '1px solid #4a6650', background: '#1a2e1d', color: '#fff', fontSize: 13, borderRadius: '3px 0 0 3px', outline: 'none', width: 240}} />
              <button type="submit"
                style={{background: '#005334', color: '#fff', fontWeight: 'bold', padding: '7px 16px', border: '1px solid #005334', borderRadius: '0 3px 3px 0', fontSize: 13, cursor: 'pointer', transition: 'background 0.15s'}}>
                Go
              </button>
            </form>
          )}
        </div>
        <p style={{fontSize: 11, color: '#8aaa8e', textAlign: 'center', marginTop: 8}}>*You&apos;re signing up to receive GemSelect promotional email.</p>
      </div>

      {/* Partners & Payment */}
      <div className="gs-footer-payments">
        <img src="/images/pay-options_footer.jpg" alt="Payment Options" />
      </div>
      <div className="gs-footer-partners">
        <img src="/images/partners_footer.jpg" alt="Partners" />
      </div>

      {/* Social */}
      <div style={{display: 'flex', justifyContent: 'center', gap: 12, padding: '12px 0'}}>
        <a href="https://www.facebook.com/gemselect" target="_blank" rel="noopener noreferrer">
          <img src="/images/gemselect-facebook.png" alt="Facebook" style={{height: 32}} />
        </a>
        <a href="https://www.pinterest.com/gemselect/" target="_blank" rel="noopener noreferrer">
          <img src="/images/gemselect-pinterest.png" alt="Pinterest" style={{height: 32}} />
        </a>
        <a href="https://www.linkedin.com/in/gemselect/" target="_blank" rel="noopener noreferrer">
          <img src="/images/gemselect-linkedin.png" alt="LinkedIn" style={{height: 32}} />
        </a>
        <a href="https://www.instagram.com/gemselect_gems/" target="_blank" rel="noopener noreferrer">
          <img src="/images/gemselect-instagram.png" alt="Instagram" style={{height: 32}} />
        </a>
        <a href="https://www.youtube.com/@gemselect-settcompanyltd939" target="_blank" rel="noopener noreferrer">
          <img src="/images/gemselect-youtube.png" alt="YouTube" style={{height: 32}} />
        </a>
      </div>

      {/* Languages */}
      <div style={{borderTop: '1px solid #3a5040', padding: '12px 20px', textAlign: 'center'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8}}>
          {languages.map(l => (
            <span key={l} style={{fontSize: 12, color: '#8aaa8e', cursor: 'pointer'}}>{l}</span>
          ))}
        </div>
      </div>

      <div className="gs-footer-bottom">
        <p>Copyright &copy; 2005-2026 GemSelect.com all rights reserved.</p>
        <p style={{marginTop: 4}}>Reproduction (text or graphics) without the express written consent of GemSelect.com (SETT Company Ltd.) is strictly prohibited.</p>
      </div>
    </footer>
  )
}
