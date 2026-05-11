import { ShoppingBag, Recycle, ArrowRight, ExternalLink } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ── Brand data ── */
const BRANDS = [
  {
    id: 1,
    name: 'tsoecha.co',
    category: 'Fashion Pria',
    desc: 'Brand fashion pria PT BOBA yang menghadirkan kaos, kemeja, hoodie, jaket, celana, dan aksesoris pria dengan desain modern dan kualitas premium.',
    cta: { label: 'Lihat Produk', icon: ShoppingBag, href: '#products' },
    logo: null,
    logoText: 'TSOECHA.CO',
    logoBg: '#f5f5f5',
    logoTextColor: '#333',
    accent: '#BBBBBB',
  },
  {
    id: 2,
    name: 'sokyuut',
    category: 'Fashion Wanita',
    desc: 'Brand fashion wanita PT BOBA yang menyediakan blouse, dress, outer, hijab, rok, celana, dan aksesoris wanita yang modis, nyaman, dan berkualitas.',
    cta: { label: 'Lihat Produk', icon: ShoppingBag, href: '#products' },
    logo: null,
    logoText: 'sokyuut',
    logoBg: '#fce4ec',
    logoTextColor: '#c2185b',
    accent: '#c2185b',
  },
  {
    id: 3,
    name: 'Ponpin',
    category: 'Green Technology',
    desc: 'Holding company green technology PT BOBA — pengambilan sampah, pengelolaan sampah, pengolahan sampah organik, dan pembuatan bahan bakar kendaraan dari sampah organik.',
    cta: { label: 'Pesan Layanan', icon: Recycle, href: '#services' },
    logo: null,
    logoText: 'PONPIN',
    logoBg: '#1BA882',
    logoTextColor: '#ffffff',
    accent: '#1BA882',
  },
]

/* ── Logo box ── */
const LogoBox = ({ brand }) => (
  <div
    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
    style={{ backgroundColor: brand.logoBg }}
  >
    <span
      className="font-display font-extrabold text-[9px] text-center leading-tight px-1"
      style={{ color: brand.logoTextColor }}
    >
      {brand.logoText}
    </span>
  </div>
)

export default function BrandSection() {
  const [sectionRef, inView] = useInView(0.08)

  return (
    <section id="brands" className="bg-[#edfaf6] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* ── Header centered ── */}
        <div ref={sectionRef}
             className={`text-center mb-14 transition-all duration-700
                         ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* chip with lines on both sides */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
              Brand Perusahaan
            </span>
            <span className="w-8 h-[2px] bg-brand-green rounded-full" />
          </div>

          <h2 className="font-display font-extrabold text-brand-green-deep
                         text-3xl sm:text-4xl md:text-5xl mb-4">
            Brand &amp; Platform PT BOBA
          </h2>

          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
            Dua brand fashion (pria &amp; wanita) di bawah PT BOBA, dipasarkan via{' '}
            <strong className="text-brand-green-deep font-bold">Ponpin</strong>,
            platform marketplace ASEAN milik PT BOBA.
          </p>
        </div>

        {/* ── Brand cards ── */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {BRANDS.map((brand, i) => {
            const CtaIcon = brand.cta.icon
            return (
              <div
                key={brand.id}
                className={`bg-white rounded-2xl border border-gray-100
                             shadow-[0_2px_20px_rgba(0,0,0,0.05)]
                             hover:shadow-[0_8px_40px_rgba(27,168,130,0.12)]
                             hover:-translate-y-1
                             transition-all duration-350 flex flex-col overflow-hidden
                             ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms`, transitionDuration: '600ms' }}
              >
                {/* Top accent line */}
                <div className="h-[3px] w-full" style={{ backgroundColor: brand.accent }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Logo + name row */}
                  <div className="flex items-center gap-4 mb-6">
                    <LogoBox brand={brand} />
                    <div>
                      <h3 className="font-display font-extrabold text-brand-green-deep text-xl leading-none mb-1">
                        {brand.name}
                      </h3>
                      <span className="text-gray-400 text-sm font-medium">
                        {brand.category}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 mb-5" />

                  {/* Description */}
                  <p className="text-gray-500 leading-relaxed text-sm flex-1 mb-7">
                    {brand.desc}
                  </p>

                  {/* CTA button */}
                  <a
                    href={brand.cta.href}
                    className="btn-brand group"
                  >
                    <CtaIcon size={15} className="transition-transform duration-300 group-hover:scale-110" />
                    {brand.cta.label}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Ponpin platform note ── */}
        <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-4
                         text-center transition-all duration-700 delay-500
                         ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-2 bg-white border border-brand-green/20
                          rounded-full px-5 py-2.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-brand-green-deep text-sm font-semibold">
              Semua brand tersedia di{' '}
              <span className="text-brand-green font-bold">Ponpin Marketplace</span>
            </span>
            <a href="#" className="inline-flex items-center gap-1 text-brand-green ml-2
                                   text-xs font-bold hover:underline">
              Kunjungi <ExternalLink size={11} />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}