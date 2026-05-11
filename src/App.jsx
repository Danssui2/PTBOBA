import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import BrandSection from './components/BrandSection'
import ProductSection from './components/ProductSection'
import ServiceSection from './components/ServiceSection'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BrandSection />
      <ProductSection />
      <ServiceSection />

      {[
        { id: 'struktur', label: 'Struktur' },
        { id: 'partner',  label: 'Partner' },
        { id: 'contact',  label: 'Contact' },
      ].map((sec, i) => (
        <section key={sec.id} id={sec.id}
          className={`min-h-[60vh] flex items-center justify-center
                      ${i % 2 === 0 ? 'bg-white' : 'bg-[#edfaf6]'}`}>
          <div className="text-center">
            <span className="section-chip centered justify-center">Seksi</span>
            <h2 className="font-display font-extrabold text-brand-green-deep text-5xl md:text-7xl mt-2">
              {sec.label}
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Komponen <span className="text-brand-green font-semibold">{sec.label}</span> akan ditambahkan.
            </p>
          </div>
        </section>
      ))}
    </div>
  )
}