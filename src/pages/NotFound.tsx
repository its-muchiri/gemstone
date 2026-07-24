import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="cart-wrap" style={{textAlign: 'center', padding: '80px 0'}}>
      <h1 style={{fontSize: 48, color: '#ccc', marginBottom: 10}}>404</h1>
      <h2 style={{fontSize: 22, fontWeight: 'bold', marginBottom: 8}}>Page Not Found</h2>
      <p style={{color: '#666', marginBottom: 20}}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link to="/" className="gs-btn">Back to Home</Link>
    </div>
  )
}
