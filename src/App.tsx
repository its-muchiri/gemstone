import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Home from './pages/Home.tsx'
import Category from './pages/Category.tsx'
import AllGemstones from './pages/AllGemstones.tsx'
import Product from './pages/Product.tsx'
import Cart from './pages/Cart.tsx'
import Wishlist from './pages/Wishlist.tsx'
import Search from './pages/Search.tsx'
import Help from './pages/Help.tsx'
import NotFound from './pages/NotFound.tsx'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gemstones/:slug" element={<Category />} />
          <Route path="/all-gemstones" element={<AllGemstones />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help/:topic" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
