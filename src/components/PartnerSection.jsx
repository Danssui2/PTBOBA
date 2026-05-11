import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Handshake, ChevronRight, CheckCircle2, Send } from 'lucide-react'

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ── Data ─────────────────────────────────────────────────────────── */
const CATEGORIES = ['Semua', 'Strategis', 'Distribusi', 'Teknologi', 'Lingkungan']

const PARTNERS = [
  // Strategis
  { id: 1,  cat: 'Strategis',   initials: 'GBI',  name: 'Green Business Indonesia',  desc: 'Mitra pengembangan ekosistem bisnis hijau nasional.',         color: '#1BA882', textColor: '#fff' },
  { id: 2,  cat: 'Strategis',   initials: 'ANI',  name: 'ASEAN Net Initiative',       desc: 'Kolaborasi ekspansi pasar ASEAN bersama Ponpin.',            color: '#0D5040', textColor: '#fff' },
  { id: 3,  cat: 'Strategis',   initials: 'IPF',  name: 'Indo Pacific Fund',          desc: 'Kemitraan investasi dan pengembangan kapasitas bisnis.',      color: '#148F6D', textColor: '#fff' },
  // Distribusi
  { id: 4,  cat: 'Distribusi',  initials: 'JNE',  name: 'JNE Express',               desc: 'Mitra logistik pengiriman produk fashion ke seluruh Indonesia.', color: '#e63946', textColor: '#fff' },
  { id: 5,  cat: 'Distribusi',  initials: 'SiC',  name: 'SiCepat',                   desc: 'Solusi pengiriman same-day untuk order marketplace Ponpin.', color: '#f4a261', textColor: '#fff' },
  { id: 6,  cat: 'Distribusi',  initials: 'WHS',  name: 'Wahana Shipping',           desc: 'Jaringan distribusi produk ke wilayah 3T Indonesia.',         color: '#457b9d', textColor: '#fff' },
  // Teknologi
  { id: 7,  cat: 'Teknologi',   initials: 'AWZ',  name: 'AWS Indonesia',             desc: 'Infrastruktur cloud untuk platform Ponpin Marketplace.',      color: '#FF9900', textColor: '#fff' },
  { id: 8,  cat: 'Teknologi',   initials: 'MDB',  name: 'MongoDB Atlas',             desc: 'Database solusi untuk manajemen data skala besar.',          color: '#00ED64', textColor: '#13241e' },
  { id: 9,  cat: 'Teknologi',   initials: 'VRL',  name: 'Vercel',                    desc: 'Platform deployment frontend Ponpin dan properti digital BOBA.', color: '#000', textColor: '#fff' },
  // Lingkungan
  { id: 10, cat: 'Lingkungan',  initials: 'KLH',  name: 'KLHK Indonesia',            desc: 'Kemitraan pengelolaan sampah sesuai regulasi lingkungan hidup.', color: '#2d6a4f', textColor: '#fff' },
  { id: 11, cat: 'Lingkungan',  initials: 'WWF',  name: 'WWF Indonesia',             desc: 'Kolaborasi program pelestarian lingkungan & ESG perusahaan.',  color: '#333', textColor: '#fff' },
  { id: 12, cat: 'Lingkungan',  initials: 'BIA',  name: 'Bio Indonesia',             desc: 'Riset bersama pengolahan sampah organik menjadi bioenergi.',  color: '#52b788', textColor: '#fff' },
]

const BENEFITS = [
  'Akses ke ekosistem brand fashion & green tech PT BOBA',
  'Integrasi langsung dengan marketplace Ponpin (ASEAN)',
  'Co-branding dan promosi lintas platform digital',
  'Dukungan operasional & after-sales dari tim PT BOBA',
  'Laporan kemitraan transparan setiap bulan',
]

const PARTNER_TYPES = [
  {
    title: 'Mitra Distribusi',
    desc: 'Bergabung sebagai mitra logistik & distribusi produk fashion dan layanan green tech PT BOBA ke seluruh nusantara.',
    icon: '🚚',
    cta: 'Daftar Mitra Distribusi',
  },
  {
    title: 'Mitra Teknologi',
    desc: 'Kolaborasi pengembangan infrastruktur digital, integrasi API, dan inovasi platform Ponpin Marketplace.',
    icon: '💻',
    cta: 'Daftar Mitra Teknologi',
  },
  {
    title: 'Mitra Lingkungan',
    desc: 'Bersama membangun solusi green technology — dari pengelolaan sampah hingga produksi bahan bakar bio.',
    icon: '🌱',
    cta: 'Daftar Mitra Lingkungan',
  },
]

/* ── Logo placeholder ───────────────────────────────────────────────── */
const PartnerLogo = ({ partner, size = 'md' }) => {
  const sz = size === 'lg'
    ? 'w-16 h-16 text-[13px]'
    : 'w-12 h-12 text-[11px]'
  return (
    <div className={`${sz} rounded-xl flex items-center justify-center
                     font-display font-extrabold shrink-0`}
         style={{ backgroundColor: partner.color, color: partner.textColor }}>
      {partner.initials}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function PartnerSection() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [headerRef, headerInView] = useInView(0.1)
  const [gridRef,   gridInView]   = useInView(0.08)
  const [joinRef,   joinInView]   = useInView(0.08)

  const filtered = activeCategory === 'Semua'
    ? PARTNERS
    : PARTNERS.filter(p => p.cat === activeCategory)

  return (
    <section id="partner" className="overflow-hidden">

      {/* ══════════════════════════════════════════
          1. HEADER + FILTER + PARTNER GRID
      ══════════════════════════════════════════ */}
      <div className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* Header */}
          <div ref={headerRef}
               className={`text-center mb-14 transition-all duration-700
                           ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Mitra Kami
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep
                           text-3xl sm:text-4xl md:text-5xl mb-4">
              Partner &amp; Mitra PT BOBA
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Bersama mitra terpercaya, kami membangun ekosistem bisnis yang kuat —
              dari distribusi, teknologi, hingga pelestarian lingkungan.
            </p>
          </div>

          {/* Category filter */}
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 mb-10">
            <div className="flex items-center gap-2 w-max lg:w-auto lg:justify-center mx-auto">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold
                               border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-brand-green text-white border-brand-green shadow-[0_4px_20px_rgba(27,168,130,0.3)]'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-brand-green hover:text-brand-green'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Partner grid */}
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((partner, i) => (
              <div key={partner.id}
                   className={`group bg-white border border-gray-100 rounded-2xl p-5
                                flex items-start gap-4
                                shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                                hover:shadow-[0_8px_36px_rgba(27,168,130,0.12)]
                                hover:-translate-y-1
                                transition-all duration-300
                                ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                   style={{ transitionDelay: `${i * 60}ms`, transitionDuration: '500ms' }}>
                <PartnerLogo partner={partner} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-display font-bold text-brand-green-deep text-[15px] leading-snug">
                      {partner.name}
                    </h4>
                  </div>
                  <span className="inline-block text-[10px] font-bold text-brand-green
                                    bg-brand-green-pale px-2 py-0.5 rounded-full uppercase
                                    tracking-wider mb-2">
                    {partner.cat}
                  </span>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {partner.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Count note */}
          <p className="text-center text-gray-400 text-sm mt-8">
            Menampilkan <span className="font-semibold text-brand-green">{filtered.length}</span> dari{' '}
            <span className="font-semibold text-brand-green-deep">{PARTNERS.length}</span> mitra terdaftar
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. KEUNTUNGAN BERMITRA
      ══════════════════════════════════════════ */}
      <div className="bg-[#edfaf6] py-20 md:py-24 border-y border-brand-green/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-brand-green rounded-full" />
                <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                  Keuntungan Mitra
                </span>
              </div>
              <h3 className="font-display font-extrabold text-brand-green-deep
                             text-2xl sm:text-3xl md:text-4xl mb-6 leading-tight">
                Mengapa Bermitra<br />dengan PT BOBA?
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8">
                Kami percaya bahwa kemitraan yang baik adalah fondasi pertumbuhan bersama.
                Setiap mitra mendapatkan akses penuh ke ekosistem, data, dan dukungan tim PT BOBA.
              </p>
              <ul className="space-y-3.5">
                {BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-brand-green mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — image placeholder with stats */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]
                              shadow-[0_16px_56px_rgba(27,168,130,0.15)]">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Kolaborasi Mitra PT BOBA"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t
                                from-brand-green-deep/60 via-transparent to-transparent" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl
                              shadow-[0_8px_32px_rgba(27,168,130,0.18)]
                              px-5 py-4">
                <p className="font-display font-extrabold text-brand-green text-3xl leading-none">
                  12+
                </p>
                <p className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-wider">
                  Mitra Aktif
                </p>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-2xl
                              shadow-[0_8px_32px_rgba(27,168,130,0.18)]
                              px-5 py-4">
                <p className="font-display font-extrabold text-brand-green-deep text-3xl leading-none">
                  4
                </p>
                <p className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-wider">
                  Kategori Mitra
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. JENIS KEMITRAAN + CTA
      ══════════════════════════════════════════ */}
      <div ref={joinRef} className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Bergabung
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h3 className="font-display font-extrabold text-brand-green-deep
                           text-3xl sm:text-4xl md:text-[42px]">
              Jenis Kemitraan
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {PARTNER_TYPES.map((pt, i) => (
              <div key={pt.title}
                   className={`border border-gray-100 rounded-2xl p-7
                                shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                                hover:shadow-[0_8px_36px_rgba(27,168,130,0.12)]
                                hover:-translate-y-1
                                transition-all duration-300 flex flex-col
                                ${joinInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                   style={{ transitionDelay: `${i * 120}ms`, transitionDuration: '550ms' }}>
                <div className="text-4xl mb-5">{pt.icon}</div>
                <h4 className="font-display font-bold text-brand-green-deep text-lg mb-3">
                  {pt.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">
                  {pt.desc}
                </p>
                <a href="#contact"
                   className="btn-brand group">
                  <Send size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  {pt.cta}
                </a>
              </div>
            ))}
          </div>

          {/* Bottom CTA banner */}
          <div className="relative bg-brand-green rounded-3xl overflow-hidden
                          px-8 sm:px-12 py-12 text-center">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-brand-green-light/15" />
            <div className="relative">
              <Handshake size={36} className="text-white/40 mx-auto mb-4" />
              <h4 className="font-display font-extrabold text-white text-2xl sm:text-3xl mb-3">
                Siap Bermitra dengan PT BOBA?
              </h4>
              <p className="text-white/65 max-w-lg mx-auto mb-7 leading-relaxed">
                Kirimkan proposal kemitraan Anda atau jadwalkan pertemuan dengan tim kami.
                Kami siap merespons dalam 1×24 jam.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="#contact"
                   className="inline-flex items-center gap-2 bg-white text-brand-green
                              font-bold px-7 py-3.5 rounded-xl
                              hover:bg-brand-green-pale transition-all duration-300
                              hover:shadow-lg">
                  Hubungi Kami <ArrowRight size={16} />
                </a>
                <a href="/investor-relations"
                   className="inline-flex items-center gap-2 bg-white/10 text-white
                              font-semibold px-7 py-3.5 rounded-xl
                              border border-white/25 hover:bg-white/20
                              transition-all duration-300">
                  Investor Relations
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}