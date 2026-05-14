import { useEffect, useRef, useState } from 'react'
import {
  TrendingUp, Building2, Leaf, Users, BarChart3, Globe2,
  FileText, Download, Send, CheckCircle2, ChevronDown,
  Mail, Phone, ArrowRight, ShieldCheck, Zap, Target,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   Hook: animate when element enters viewport
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Hook: animated counter
───────────────────────────────────────────── */
function useCounter(target, inView, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const METRICS = [
  { icon: Building2,  value: 3,    suffix: '',    label: 'Brand Utama',          sub: 'tsoecha.co · sokyuut · Ponpin' },
  { icon: BarChart3,  value: 2,    suffix: '',    label: 'Bidang Bisnis',         sub: 'Fashion & Green Technology' },
  { icon: Target,     value: 12,   suffix: '+',   label: 'Kategori Produk',       sub: 'Fashion & lifestyle items' },
  { icon: Leaf,       value: 500,  suffix: '+',   label: 'Ton/tahun (target)',    sub: 'Sampah dikelola Ponpin' },
  { icon: TrendingUp, value: 120,  suffix: '+',   label: 'Ton CO₂e/tahun (target)', sub: 'Reduksi emisi karbon' },
  { icon: Globe2,     value: null, suffix: '',    label: 'Potensi Pasar',         sub: 'Lokal & Internasional' },
]

const ROADMAP = [
  {
    year: '2024',
    month: 'Januari',
    title: 'Pendirian PT BOBA',
    desc: 'PT Bikin Orang Bahagia resmi didirikan dengan visi industri tekstil, fashion, dan green technology.',
    color: 'bg-brand-green',
  },
  {
    year: '2024',
    month: 'Maret',
    title: 'Peluncuran Brand tsoecha.co & sokyuut',
    desc: 'Dua brand fashion utama PT BOBA resmi diluncurkan ke pasar nasional.',
    color: 'bg-brand-green',
  },
  {
    year: '2024',
    month: 'Juli',
    title: 'Peluncuran Ponpin',
    desc: 'Holding company green technology Ponpin resmi beroperasi melayani pengelolaan sampah berkelanjutan.',
    color: 'bg-brand-green',
  },
  {
    year: '2026',
    month: 'April',
    title: 'Ekspansi Marketplace Digital',
    desc: 'PT BOBA meluncurkan marketplace digital terintegrasi untuk produk fashion dan layanan green technology.',
    color: 'bg-brand-green-deep',
    active: true,
  },
  {
    year: '2027',
    month: '',
    title: 'Visi Pertumbuhan Internasional',
    desc: 'Rencana ekspansi ke pasar Asia Tenggara dan kerja sama investor strategis nasional/internasional.',
    color: 'bg-gray-300',
    upcoming: true,
  },
]

const DOCUMENTS = [
  {
    tag: 'Profile',
    tagColor: 'bg-brand-green text-white',
    title: 'Company Profile PT BOBA 2026',
    desc: 'Profil lengkap perusahaan PT Bikin Orang Bahagia.',
    status: '2026 Coming Soon',
    icon: FileText,
  },
  {
    tag: 'Investor',
    tagColor: 'bg-brand-green-deep text-white',
    title: 'Pitch Deck Investor',
    desc: 'Materi presentasi peluang investasi PT BOBA.',
    status: '2026 Coming Soon',
    icon: TrendingUp,
  },
  {
    tag: 'ESG',
    tagColor: 'bg-emerald-600 text-white',
    title: 'Sustainability Report Ponpin',
    desc: 'Laporan keberlanjutan layanan Ponpin.',
    status: '2026 Coming Soon',
    icon: Leaf,
  },
]

const RANGE_OPTIONS = ['< Rp 1 M', 'Rp 1 M – 5 M', 'Rp 5 M – 25 M', 'Rp 25 M – 100 M', '> Rp 100 M']
const INTEREST_OPTIONS = ['Fashion (tsoecha.co / sokyuut)', 'Green Technology (Ponpin)', 'Holding PT BOBA', 'Lainnya']

const WHY_BOBA = [
  { icon: ShieldCheck, title: 'Risiko Terdiversifikasi',  desc: 'Tiga brand kuat di sektor berbeda meminimalkan risiko konsentrasi bisnis.' },
  { icon: Zap,         title: 'Skalabilitas Tinggi',      desc: 'Ekspansi cepat via marketplace digital Ponpin di seluruh kawasan ASEAN.' },
  { icon: Leaf,        title: 'Kepatuhan ESG',            desc: 'Komitmen green technology melalui Ponpin sesuai standar keberlanjutan global.' },
  { icon: Users,       title: 'Tim Profesional',          desc: 'Pendiri berpengalaman dengan fokus pertumbuhan jangka panjang dan transparan.' },
]

/* ─────────────────────────────────────────────
   METRIC CARD (with animated counter)
───────────────────────────────────────────── */
function MetricCard({ metric, inView, delay }) {
  const Icon = metric.icon
  const count = useCounter(metric.value ?? 0, inView)

  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-100
                  shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_8px_32px_rgba(27,168,130,0.12)]
                  hover:-translate-y-1 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 rounded-xl bg-brand-green-pale flex items-center justify-center mb-4">
        <Icon size={18} className="text-brand-green" />
      </div>
      <div className="font-display font-extrabold text-brand-green-deep text-3xl mb-1">
        {metric.value === null ? '🌏' : `${count}${metric.suffix}`}
      </div>
      <p className="font-semibold text-brand-green-deep text-sm mb-0.5">{metric.label}</p>
      <p className="text-gray-400 text-xs leading-snug">{metric.sub}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function InvestorPage() {
  const [heroRef,    heroInView]    = useInView(0.05)
  const [whyRef,     whyInView]     = useInView(0.08)
  const [metricsRef, metricsInView] = useInView(0.08)
  const [roadmapRef, roadmapInView] = useInView(0.05)
  const [docsRef,    docsInView]    = useInView(0.08)
  const [formRef,    formInView]    = useInView(0.05)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    country: '', range: '', interest: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div className="overflow-hidden">

      {/* ══════════════════════════════════════════════
          1. HERO — full bleed behind transparent navbar
      ══════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative bg-brand-green-deep overflow-hidden pt-32 pb-24 md:pt-44 md:pb-36"
      >
        {/* ── background image ── */}
        <img
          src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* ── gradient overlays (same pattern as HeroSection) ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-deep/90 via-brand-green-deep/65 to-brand-green-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep/80 via-transparent to-brand-green-deep/40" />

        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96
                        rounded-full bg-brand-green/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-16 w-72 h-72
                        rounded-full bg-brand-green/10 blur-3xl" />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: text ── */}
            <div className={`transition-all duration-700
                             ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* badge */}
              <div className="inline-flex items-center gap-2 bg-brand-green/25 border border-brand-green/40
                              rounded-full px-4 py-1.5 mb-6">
                <TrendingUp size={13} className="text-brand-green-light" />
                <span className="text-brand-green-light text-[11px] font-bold tracking-[0.18em] uppercase">
                  Investor Relations
                </span>
              </div>

              <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl md:text-6xl
                             leading-tight mb-6">
                Investor Relations
                <span className="block text-brand-green-light">PT BOBA</span>
              </h1>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
                Halaman khusus bagi investor nasional dan internasional yang ingin memahami
                profil bisnis, potensi pertumbuhan, dan komitmen ESG PT Bikin Orang Bahagia.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#investor-form"
                  className="inline-flex items-center gap-2 bg-brand-green text-white
                             font-bold px-7 py-3.5 rounded-xl hover:bg-brand-green-dark
                             hover:shadow-[0_4px_24px_rgba(27,168,130,0.45)]
                             transition-all duration-300 active:scale-[0.98]"
                >
                  <Send size={15} />
                  Kirim Inquiry
                </a>
                <a
                  href="#investor-roadmap"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                             text-white font-bold px-7 py-3.5 rounded-xl
                             hover:bg-white/20 transition-all duration-300"
                >
                  Lihat Roadmap
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* ── Right: floating stat cards ── */}
            <div className={`hidden lg:flex flex-col gap-4 items-end transition-all duration-700 delay-200
                             ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {[
                { icon: Building2,  value: '3',     label: 'Brand Utama',            sub: 'tsoecha.co · sokyuut · Ponpin' },
                { icon: Leaf,       value: '500+',  label: 'Ton/tahun (target)',      sub: 'Sampah dikelola Ponpin' },
                { icon: Globe2,     value: '2',     label: 'Bidang Bisnis',           sub: 'Fashion & Green Technology' },
                { icon: TrendingUp, value: '120+',  label: 'Ton CO₂e reduksi/tahun', sub: 'Komitmen ESG Ponpin' },
              ].map((s, i) => {
                const Icon = s.icon
                return (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
                               px-6 py-4 flex items-center gap-4 w-72
                               hover:bg-white/15 transition-all duration-300"
                    style={{ transitionDelay: `${i * 80 + 300}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-green/40 flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-brand-green-light" />
                    </div>
                    <div>
                      <p className="font-display font-extrabold text-white text-xl leading-none mb-0.5">{s.value}</p>
                      <p className="text-white/80 text-xs font-semibold">{s.label}</p>
                      <p className="text-white/40 text-[10px]">{s.sub}</p>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          2. PROFIL + MENGAPA PT BOBA
      ══════════════════════════════════════════════ */}
      <div ref={whyRef} className="bg-[#edfaf6] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* label */}
          <div className={`text-center mb-14 transition-all duration-700
                           ${whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Profil Perusahaan
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl mb-4">
              Mengapa PT BOBA?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              PT BOBA adalah perusahaan multi-sektor yang menggabungkan industri tekstil,
              fashion brand, dan layanan green technology dalam satu ekosistem terintegrasi.
              Strategi kami: <span className="font-semibold text-brand-green-deep">diversifikasi pendapatan + dampak ESG</span>.
            </p>
          </div>

          {/* why cards */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 delay-150
                           ${whyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {WHY_BOBA.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100
                              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                              hover:shadow-[0_8px_32px_rgba(27,168,130,0.10)]
                              hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-green flex items-center
                                  justify-center mb-5">
                    <Icon size={19} className="text-white" />
                  </div>
                  <h4 className="font-bold text-brand-green-deep text-base mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. KEY METRICS
      ══════════════════════════════════════════════ */}
      <div ref={metricsRef} className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className={`text-center mb-14 transition-all duration-700
                           ${metricsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Key Metrics
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl">
              Angka yang Bicara
            </h2>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-3 gap-5 transition-all duration-700 delay-150
                           ${metricsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {METRICS.map((m, i) => (
              <MetricCard key={i} metric={m} inView={metricsInView} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          4. ROADMAP
      ══════════════════════════════════════════════ */}
      <div id="investor-roadmap" ref={roadmapRef} className="bg-[#edfaf6] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className={`text-center mb-16 transition-all duration-700
                           ${roadmapInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Roadmap & Milestones
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl">
              Perjalanan PT BOBA
            </h2>
          </div>

          {/* timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px]
                            bg-brand-green/20 -translate-x-px hidden sm:block" />

            <div className="space-y-8">
              {ROADMAP.map((item, i) => {
                const isRight = i % 2 === 0
                return (
                  <div
                    key={i}
                    className={`relative flex flex-col sm:flex-row gap-6
                                ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}
                                transition-all duration-700
                                ${roadmapInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    {/* dot */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2
                                    w-9 h-9 rounded-full border-4 border-[#edfaf6] z-10
                                    items-center justify-center
                                    top-1/2 -translate-y-1/2"
                    >
                      <div className={`w-full h-full rounded-full ${item.upcoming ? 'bg-gray-300' : 'bg-brand-green'}`} />
                    </div>

                    {/* spacer */}
                    <div className="hidden sm:block flex-1" />

                    {/* card */}
                    <div className={`flex-1 ${isRight ? 'sm:pl-10' : 'sm:pr-10'}`}>
                      <div className={`bg-white rounded-2xl p-6 border shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                                       transition-all duration-300 hover:-translate-y-1
                                       hover:shadow-[0_8px_32px_rgba(27,168,130,0.10)]
                                       ${item.active
                                          ? 'border-brand-green/30 ring-1 ring-brand-green/20'
                                          : 'border-gray-100'
                                        }`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full
                                           ${item.upcoming
                                              ? 'bg-gray-100 text-gray-400'
                                              : item.active
                                                ? 'bg-brand-green/15 text-brand-green'
                                                : 'bg-brand-green-pale text-brand-green-deep'
                                            }`}>
                            {item.year}{item.month ? ` · ${item.month}` : ''}
                          </span>
                          {item.active && (
                            <span className="text-[10px] font-bold text-brand-green
                                             bg-brand-green/10 px-2 py-0.5 rounded-full tracking-wide uppercase">
                              Sekarang
                            </span>
                          )}
                          {item.upcoming && (
                            <span className="text-[10px] font-bold text-gray-400
                                             bg-gray-100 px-2 py-0.5 rounded-full tracking-wide uppercase">
                              Akan Datang
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-brand-green-deep text-base mb-2">{item.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          5. COMPANY DOCUMENTS
      ══════════════════════════════════════════════ */}
      <div ref={docsRef} className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className={`text-center mb-14 transition-all duration-700
                           ${docsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Company Documents
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl">
              Dokumen Perusahaan
            </h2>
          </div>

          <div className={`grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto
                           transition-all duration-700 delay-150
                           ${docsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {DOCUMENTS.map((doc, i) => {
              const Icon = doc.icon
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-7
                              shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                              hover:shadow-[0_8px_32px_rgba(27,168,130,0.10)]
                              hover:-translate-y-1 transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-brand-green-pale
                                    flex items-center justify-center
                                    group-hover:bg-brand-green transition-colors duration-300">
                      <Icon size={20} className="text-brand-green group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${doc.tagColor}`}>
                      {doc.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-brand-green-deep text-base mb-2 leading-snug">{doc.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{doc.desc}</p>
                  <div className="flex items-center gap-2 text-gray-300 cursor-not-allowed select-none">
                    <Download size={14} />
                    <span className="text-xs font-semibold">{doc.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          6. CONTACT / INQUIRY FORM
      ══════════════════════════════════════════════ */}
      <div id="investor-form" ref={formRef} className="bg-[#edfaf6] py-20 md:py-28 border-t border-brand-green/10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className={`text-center mb-14 transition-all duration-700
                           ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Hubungi Kami
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl mb-4">
              Hubungi Tim Investor Relations
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Kami terbuka untuk diskusi serius tentang investasi, kemitraan strategis,
              dan kerja sama jangka panjang.
            </p>
          </div>

          <div className={`grid lg:grid-cols-5 gap-12 xl:gap-16 transition-all duration-700 delay-150
                           ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* ── Contact info sidebar ── */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {[
                { icon: Mail,  label: 'Email Investor Relations', value: 'investor@ptboba.co.id', href: 'mailto:investor@ptboba.co.id' },
                { icon: Phone, label: 'Telepon Langsung',         value: '+62 812-0000-0000',    href: 'tel:+628120000000' },
              ].map((c, i) => {
                const Icon = c.icon
                return (
                  <a
                    key={i} href={c.href}
                    className="bg-white rounded-2xl p-6 border border-gray-100
                                shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                                hover:shadow-[0_8px_32px_rgba(27,168,130,0.12)]
                                hover:border-brand-green/30 hover:-translate-y-1
                                transition-all duration-300 group block"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center
                                    justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={17} className="text-white" />
                    </div>
                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">{c.label}</p>
                    <p className="font-bold text-brand-green-deep text-sm">{c.value}</p>
                  </a>
                )
              })}

              {/* commitment box */}
              <div className="bg-brand-green-deep rounded-2xl p-6 text-white">
                <ShieldCheck size={24} className="text-brand-green-light mb-3" />
                <h4 className="font-bold text-base mb-2">Komitmen Kami</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Tim Investor Relations PT BOBA akan menghubungi Anda kembali
                  dalam <strong className="text-white">2×24 jam</strong> kerja untuk
                  mendiskusikan peluang investasi lebih lanjut.
                </p>
              </div>
            </div>

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4
                                bg-white rounded-2xl p-14 text-center
                                border border-brand-green/20
                                shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <CheckCircle2 size={52} className="text-brand-green" />
                  <h4 className="font-display font-bold text-brand-green-deep text-xl">
                    Inquiry Terkirim!
                  </h4>
                  <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                    Terima kasih atas minat Anda. Tim Investor Relations PT BOBA
                    akan menghubungi Anda dalam 2×24 jam kerja.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name:'', email:'', phone:'', company:'', country:'', range:'', interest:'', message:'' })
                    }}
                    className="mt-2 text-brand-green font-semibold text-sm hover:text-brand-green-dark transition-colors"
                  >
                    Kirim inquiry lain →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}
                      className="bg-white rounded-2xl p-8 border border-gray-100
                                  shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-5">

                  {/* Nama + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: 'name',  label: 'Nama',  type: 'text',  placeholder: 'Nama lengkap Anda', required: true },
                      { name: 'email', label: 'Email', type: 'email', placeholder: 'nama@email.com',    required: true },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">
                          {f.label} {f.required && <span className="text-brand-green">*</span>}
                        </label>
                        <input
                          type={f.type} name={f.name} value={form[f.name]}
                          onChange={handleChange} placeholder={f.placeholder} required={f.required}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                     text-brand-green-deep placeholder-gray-300
                                     focus:outline-none focus:border-brand-green
                                     focus:ring-2 focus:ring-brand-green/15 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Telepon + Perusahaan */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: 'phone',   label: 'Telepon',    type: 'tel',  placeholder: '+62 8xx xxxx xxxx', required: false },
                      { name: 'company', label: 'Perusahaan', type: 'text', placeholder: 'Nama perusahaan',   required: false },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">{f.label}</label>
                        <input
                          type={f.type} name={f.name} value={form[f.name]}
                          onChange={handleChange} placeholder={f.placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                     text-brand-green-deep placeholder-gray-300
                                     focus:outline-none focus:border-brand-green
                                     focus:ring-2 focus:ring-brand-green/15 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Negara */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">Negara</label>
                    <input
                      type="text" name="country" value={form.country}
                      onChange={handleChange} placeholder="Contoh: Indonesia"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                 text-brand-green-deep placeholder-gray-300
                                 focus:outline-none focus:border-brand-green
                                 focus:ring-2 focus:ring-brand-green/15 transition-all duration-200"
                    />
                  </div>

                  {/* Range Investasi + Bidang Minat */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: 'range',    label: 'Range Investasi', options: RANGE_OPTIONS,    placeholder: 'Pilih range...' },
                      { name: 'interest', label: 'Bidang Minat',    options: INTEREST_OPTIONS, placeholder: 'Pilih bidang...' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">{f.label}</label>
                        <div className="relative">
                          <select
                            name={f.name} value={form[f.name]} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                       text-brand-green-deep appearance-none bg-white
                                       focus:outline-none focus:border-brand-green
                                       focus:ring-2 focus:ring-brand-green/15 transition-all duration-200"
                          >
                            <option value="">{f.placeholder}</option>
                            {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                          <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2
                                                             text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pesan */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">
                      Pesan <span className="text-brand-green">*</span>
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      required rows={4}
                      placeholder="Tuliskan pertanyaan, proposal, atau minat investasi Anda..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                 text-brand-green-deep placeholder-gray-300 resize-none
                                 focus:outline-none focus:border-brand-green
                                 focus:ring-2 focus:ring-brand-green/15 transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-brand-green
                               text-white font-bold py-4 rounded-xl hover:bg-brand-green-dark
                               hover:shadow-[0_4px_24px_rgba(27,168,130,0.40)]
                               transition-all duration-300 active:scale-[0.98]"
                  >
                    <Send size={16} />
                    Kirim Inquiry
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    Dengan mengirim inquiry, Anda menyetujui Kebijakan Privasi PT BOBA.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}