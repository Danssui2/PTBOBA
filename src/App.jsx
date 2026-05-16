import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import BrandSection from './components/BrandSection'
import ProductSection from './components/ProductSection'
import ServiceSection from './components/ServiceSection'
import StrukturSection from './components/StrukturSection'
import PartnerSection from './components/PartnerSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import InvestorPage from './components/InvestorPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Ada hash (#about, #brands, dll.) → scroll ke element setelah DOM render
      const timer = setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
      return () => clearTimeout(timer)
    } else {
      // Tidak ada hash → scroll ke atas langsung
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BrandSection />
      <ProductSection />
      <ServiceSection />
      <StrukturSection />
      <PartnerSection />
      <ContactSection />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/investor-relations" element={<InvestorPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}