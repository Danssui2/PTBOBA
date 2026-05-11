import { useEffect, useRef, useState } from 'react'
import {
  Building2, ShoppingBag, Store, Globe2,
  TrendingUp, BarChart2, ExternalLink, User
} from 'lucide-react'

function useInView(threshold = 0.1) {
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

/* ── Data ── */
const FOUNDERS = [
  {
    name: 'Bachrul Ullum Assrori',
    role: 'Chief Executive Officer',
    desc: 'Bertanggung jawab atas pengambilan keputusan utama, arah bisnis perusahaan, pengembangan brand, kerja sama, serta pengawasan operasional PT BOBA.',
  },
  {
    name: 'Ario Putra Bakti',
    role: 'Chief Operating Officer',
    desc: 'Bertanggung jawab dalam pengawasan utama terhadap kebijakan perusahaan, memberikan arahan strategis, serta memastikan perusahaan berjalan sesuai tujuan perusahaan.',
  },
  {
    name: 'Ellen Sinta Budirahayu',
    role: 'Chief Business Officer',
    desc: 'Bertanggung jawab membantu pengawasan perusahaan, memberikan masukan terhadap pengembangan bisnis, dan mendukung keberlanjutan perusahaan.',
  },
]

const ECOSYSTEM = [
  {
    icon: Building2,
    name: 'Holding',
    sub: 'PT Bikin Orang Bahagia',
    desc: null,
  },
  {
    icon: ShoppingBag,
    name: 'tsoecha.co',
    sub: 'Fashion Pria',
    desc: 'Tekstil & Produk Olahan',
  },
  {
    icon: ShoppingBag,
    name: 'sokyuut',
    sub: 'Fashion Wanita',
    desc: 'Tekstil & Aksesoris',
  },
  {
    icon: Store,
    name: 'Ponpin',
    sub: 'ASEAN Marketplace Platform',
    desc: 'tempat brand & layanan PT BOBA dijual',
  },
]

const INVEST_POINTS = [
  'Diversifikasi pendapatan: fashion + jasa lingkungan.',
  'Komitmen ESG & ekonomi sirkular via Green Services PT BOBA.',
  'Skalabilitas tinggi melalui marketplace digital.',
  'Tim pendiri berpengalaman lintas sektor.',
]

/* ─────────────────────────────────────────── */
export default function StrukturSection() {
  const [founderRef, founderInView] = useInView(0.08)
  const [ecoRef,     ecoInView]     = useInView(0.08)
  const [investRef,  investInView]  = useInView(0.08)

  return (
    <section id="struktur" className="overflow-hidden">

      {/* ══════════════════════════════════════════
          1. PENDIRI PT BOBA
      ══════════════════════════════════════════ */}
      <div className="bg-[#edfaf6] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* Header */}
          <div ref={founderRef}
               className={`text-center mb-14 transition-all duration-700
                           ${founderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Struktur Perusahaan
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep
                           text-3xl sm:text-4xl md:text-5xl mb-4">
              Pendiri PT BOBA
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Tim profesional yang menggerakkan PT Bikin Orang Bahagia.
            </p>
          </div>

          {/* Founder cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {FOUNDERS.map((f, i) => (
              <div
                key={f.name}
                className={`bg-white rounded-2xl border border-gray-100 p-8
                             shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                             hover:shadow-[0_8px_40px_rgba(27,168,130,0.10)]
                             hover:-translate-y-1 text-center
                             transition-all duration-300 flex flex-col items-center
                             ${founderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms`, transitionDuration: '600ms' }}
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-brand-green-pale
                                flex items-center justify-center mb-5 border-2 border-brand-green/10">
                  <User size={36} className="text-brand-green-mid" />
                </div>

                <h3 className="font-display font-bold text-brand-green-deep text-lg mb-1">
                  {f.name}
                </h3>
                <span className="text-brand-green text-xs font-semibold tracking-wide
                                  uppercase mb-4 bg-brand-green-pale px-3 py-1 rounded-full">
                  {f.role}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. EKOSISTEM BISNIS
      ══════════════════════════════════════════ */}
      <div className="bg-white py-20 md:py-28 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* Header */}
          <div ref={ecoRef}
               className={`text-center mb-14 transition-all duration-700
                           ${ecoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Business Ecosystem
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep
                           text-3xl sm:text-4xl md:text-5xl">
              Ekosistem Bisnis PT BOBA
            </h2>
          </div>

          {/* Ecosystem cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {ECOSYSTEM.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.name}
                  className={`border border-gray-150 rounded-2xl p-7 text-center
                               bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                               hover:shadow-[0_8px_36px_rgba(27,168,130,0.10)]
                               hover:-translate-y-1
                               transition-all duration-300
                               ${ecoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 100}ms`, transitionDuration: '550ms' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green-pale
                                  flex items-center justify-center mx-auto mb-5">
                    <Icon size={22} className="text-brand-green" />
                  </div>
                  <h4 className="font-display font-bold text-brand-green-deep text-lg mb-1">
                    {item.name}
                  </h4>
                  <p className="text-brand-green font-semibold text-sm mb-1">{item.sub}</p>
                  {item.desc && (
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. PELUANG INVESTASI
      ══════════════════════════════════════════ */}
      <div ref={investRef} className="bg-brand-green-deep py-20 md:py-28 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full
                        bg-brand-green/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full
                        bg-brand-green-light/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),
                              linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)`,
            backgroundSize: '48px 48px'
          }} />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — copy */}
            <div className={`transition-all duration-700
                             ${investInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Badge */}
              <span className="inline-block bg-yellow-400 text-yellow-900
                               text-[11px] font-bold px-3 py-1 rounded-full
                               tracking-wide uppercase mb-6">
                Investment Opportunity
              </span>

              <h2 className="font-display font-extrabold text-white
                             text-3xl sm:text-4xl md:text-[44px] leading-tight mb-5">
                Peluang Investasi PT BOBA
              </h2>

              <p className="text-white/65 leading-relaxed mb-8 max-w-lg">
                PT BOBA membuka peluang kerja sama strategis bagi investor nasional dan
                internasional. Dengan ekosistem fashion + green technology yang terintegrasi,
                PT BOBA memiliki potensi pertumbuhan tinggi di pasar lokal maupun ekspor.
              </p>

              <ul className="space-y-3">
                {INVEST_POINTS.map((point, i) => (
                  <li key={i}
                      className={`flex items-start gap-3 transition-all duration-500
                                  ${investInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ transitionDelay: `${200 + i * 100}ms` }}>
                    <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
                    <span className="text-white/80 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — investor card */}
            <div className={`transition-all duration-700 delay-300
                             ${investInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white/8 border border-white/15 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <BarChart2 size={20} className="text-brand-green-light" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl">
                    Tertarik Berinvestasi?
                  </h3>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  Akses Investor Relations untuk profil lengkap, pitch deck, dan
                  jadwal pertemuan.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10">
                  {[
                    { v: '3', l: 'Entitas Bisnis' },
                    { v: '2026', l: 'Tahun Berdiri' },
                    { v: 'ASEAN', l: 'Target Pasar' },
                  ].map(s => (
                    <div key={s.l} className="text-center">
                      <p className="font-display font-extrabold text-white text-2xl">{s.v}</p>
                      <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wider">{s.l}</p>
                    </div>
                  ))}
                </div>

                <a href="/investor-relations"
                   className="flex items-center justify-center gap-2
                              w-full bg-brand-green text-white font-bold py-3.5 rounded-xl
                              hover:bg-brand-green-dark transition-all duration-300
                              hover:shadow-[0_4px_24px_rgba(27,168,130,0.4)]">
                  <TrendingUp size={16} />
                  Buka Investor Relations
                </a>

                <a href="#contact"
                   className="flex items-center justify-center gap-2 mt-3
                              w-full text-white/60 hover:text-white font-semibold
                              text-sm transition-colors py-2">
                  <ExternalLink size={13} />
                  Hubungi Tim Kami
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}