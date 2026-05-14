import { BrowserRouter, Routes, Route } from 'react-router-dom'
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