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
    <footer className="gs-footer">
      <div className="gs-footer-cols">
        <div className="gs-footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/all-gemstones">New Gems</Link></li>
            <li><Link to="/all-gemstones">All Gemstones</Link></li>
            <li><Link to="/all-gemstones">Birthstones</Link></li>
            <li><Link to="/all-gemstones">Top Grade Gemstones</Link></li>
            <li><Link to="/all-gemstones">Cabochon Gemstones</Link></li>
          </ul>
        </div>

        <div className="gs-footer-col">
          <h4>Policies</h4>
          <ul>
            <li><Link to="/help/returns">Return Policy</Link></li>
            <li><Link to="/help/checkout">Payment Policy</Link></li>
            <li><Link to="/help/shipping">Shipping Policy</Link></li>
            <li><Link to="/help">Privacy Policy</Link></li>
            <li><Link to="/help">Terms of Service</Link></li>
            <li><Link to="/help/guarantee">Gemstone Guarantee</Link></li>
            <li><Link to="/help/shipping">International Orders</Link></li>
          </ul>
        </div>

        <div className="gs-footer-col">
          <h4>Who Are We?</h4>
          <ul>
            <li><Link to="/help/about">About Us</Link></li>
            <li><Link to="/">Customer Reviews</Link></li>
            <li><Link to="/help/contact">Contact Us</Link></li>
            <li><Link to="/help">Partners and Trust</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
        </div>

        <div className="gs-footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/all-gemstones">Collections</Link></li>
            <li><Link to="/help">Education</Link></li>
            <li><Link to="/all-gemstones">Sitemap</Link></li>
            <li><span style={{cursor: 'pointer'}}>Newsletter</span></li>
          </ul>
        </div>

        <div className="gs-footer-col">
          <h4>We Are Located At</h4>
          <div>
            <p>183/24-25 Moo 4, Trirat Rd.</p>
            <p>T. Chantanimit, A. Muang</p>
            <p>Chanthaburi 22000</p>
            <p>THAILAND</p>
            <p style={{marginTop: 8}}>Phone: 1-800-464-1640</p>
            <p>Phone: +66-39601289</p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{borderTop: '1px solid #3a4f3d', padding: '20px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap'}}>
          <span style={{fontWeight: 'bold', fontSize: 13}}>Stay in Touch | Newsletter</span>
          {subscribed ? (
            <p style={{color: '#aad9b0', fontSize: 13}}>Thank you for subscribing to GemSelect!</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{display: 'flex'}}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address..." required
                style={{padding: '6px 10px', border: '1px solid #555', background: '#1a2e1d', color: '#fff', fontSize: 13, borderRadius: '3px 0 0 3px', outline: 'none', width: 220}} />
              <button type="submit"
                style={{background: '#005334', color: '#fff', fontWeight: 'bold', padding: '6px 14px', border: '1px solid #005334', borderRadius: '0 3px 3px 0', fontSize: 13, cursor: 'pointer'}}>
                Go
              </button>
            </form>
          )}
        </div>
        <p style={{fontSize: 11, color: '#9ab89e', textAlign: 'center', marginTop: 8}}>*You&apos;re signing up to receive GemSelect promotional email.</p>
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
      <div style={{borderTop: '1px solid #3a4f3d', padding: '12px 20px', textAlign: 'center'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8}}>
          {languages.map(l => (
            <span key={l} style={{fontSize: 12, color: '#9ab89e', cursor: 'pointer'}}>{l}</span>
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
