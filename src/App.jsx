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

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BrandSection />
      <ProductSection />
      <ServiceSection />
      <StrukturSection />
      <PartnerSection />
      <ContactSection />
      <Footer />
    </div>
  )
}