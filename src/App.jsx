import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />

      {/* Placeholder sections */}
      {[
        { id: 'brands',   label: 'Brand' },
        { id: 'products', label: 'Products' },
        { id: 'services', label: 'Services' },
        { id: 'struktur', label: 'Struktur' },
        { id: 'partner',  label: 'Partner' },
        { id: 'contact',  label: 'Contact' },
      ].map((sec, i) => (
        <section
          key={sec.id}
          id={sec.id}
          className={`min-h-screen flex items-center justify-center
                      ${i % 2 === 0 ? 'bg-white' : 'bg-brand-gray'}`}
        >
          <div className="text-center">
            <span className="section-chip justify-center">Seksi</span>
            <h2 className="font-display font-extrabold text-brand-green-deep text-5xl md:text-7xl">
              {sec.label}
            </h2>
            <p className="mt-4 text-brand-gray-mid text-lg">
              Komponen <span className="text-brand-green font-semibold">{sec.label}</span> akan ditambahkan di sini.
            </p>
          </div>
        </section>
      ))}
    </div>
  )
}