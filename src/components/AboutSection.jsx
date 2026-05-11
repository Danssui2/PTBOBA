import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, ShieldCheck, Leaf, Zap, Users,
  TrendingUp, Award, Globe, ChevronRight
} from 'lucide-react'

/* ── Intersection Observer hook untuk animasi scroll-in ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ── Animated counter ── */
function Counter({ to, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const [ref, inView] = useInView(0.3)
  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const pct = Math.min((ts - start) / duration, 1)
      // ease-out cubic
      const ease = 1 - Math.pow(1 - pct, 3)
      setVal(Math.floor(ease * to))
      if (pct < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to, duration])
  return <span ref={ref}>{val.toLocaleString('id-ID')}{suffix}</span>
}

/* ── Data ── */
const STATS = [
  { icon: TrendingUp,  value: 75,   suffix: '+', label: 'Tahun Pengalaman',    sub: 'sejak 1957' },
  { icon: Users,       value: 31000, suffix: '+', label: 'Karyawan Aktif',     sub: 'seluruh Indonesia' },
  { icon: Globe,       value: 13,   suffix: '',  label: 'Negara Operasional', sub: 'ekspansi global' },
  { icon: Award,       value: 100,  suffix: '+', label: 'Penghargaan',         sub: 'nasional & internasional' },
]

const PILLARS = [
  {
    icon: Zap,
    title: 'Ketahanan Energi',
    desc:  'Memastikan ketersediaan energi yang andal dan terjangkau untuk seluruh masyarakat Indonesia dari Sabang sampai Merauke.',
    color: 'from-brand-green to-brand-green-mid',
  },
  {
    icon: Leaf,
    title: 'Energi Berkelanjutan',
    desc:  'Berkomitmen mengurangi emisi karbon dan mengembangkan portofolio energi terbarukan menuju Indonesia Net Zero 2060.',
    color: 'from-brand-green-mid to-brand-green-light',
  },
  {
    icon: ShieldCheck,
    title: 'Tata Kelola Unggul',
    desc:  'Menjalankan bisnis dengan standar GCG tertinggi, transparansi penuh, dan integritas sebagai fondasi kepercayaan publik.',
    color: 'from-emerald-600 to-teal-500',
  },
  {
    icon: Users,
    title: 'Dampak Sosial',
    desc:  'Program CSR & TJSL yang menyentuh ribuan komunitas — dari pemberdayaan UMKM hingga pendidikan dan kesehatan masyarakat.',
    color: 'from-teal-600 to-brand-green-light',
  },
]

const MILESTONES = [
  { year: '2015', event: 'Restrukturisasi holding dan pembentukan subholding untuk efisiensi operasional.' },
  { year: '2018', event: 'Restrukturisasi holding dan pembentukan subholding untuk efisiensi operasional.' },
  { year: '2022', event: 'Masuk daftar Fortune Global 500 dan memperkuat komitmen energi terbarukan.' },
  { year: '2025', event: 'Akselerasi transisi energi — target 23% portofolio dari renewable energy.' },
]

/* ─────────────────────────────────────────────── */
export default function AboutSection() {
  const [heroRef, heroInView]       = useInView(0.1)
  const [pillarsRef, pillarsInView] = useInView(0.1)
  const [timelineRef, tlInView]     = useInView(0.1)
  const [activeYear, setActiveYear] = useState('2025')

  return (
    <section id="about" className="bg-white overflow-hidden">

      {/* ══════════════════════════════════════════════════════
          1. HERO INTRO — full-width banner dengan teks besar
      ══════════════════════════════════════════════════════ */}
      <div ref={heroRef} className="relative bg-brand-green-deep overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                        bg-brand-green/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full
                        bg-brand-green-light/10 blur-3xl pointer-events-none" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }} />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20
                        py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className={`transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="section-chip" style={{ color: '#2DD4B0' }}>
                &nbsp;Tentang Kami
              </span>
            </div>

            <h2 className={`font-display font-extrabold text-white leading-[1.1]
                            text-[28px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] mb-6
                            break-words transition-all duration-700 delay-100 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Bikin Orang Bahagia{' '} 
              Lewat {' '}
              <span className="text-brand-green-light">Produk & Lingkungan</span>
            </h2>

            <p className={`text-white/65 leading-relaxed text-lg mb-8 max-w-lg
                           transition-all duration-700 delay-200 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              PT Bikin Orang Bahagia (PT BOBA) adalah perusahaan yang bergerak di bidang industri tekstil, produk olahan, fashion brand, dan layanan green technology. PT BOBA menaungi brand fashion tsoecha.co dan sokyuut, serta layanan green technology — seluruhnya dipasarkan melalui Ponpin, platform marketplace ASEAN milik PT BOBA.
            </p>

            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#struktur"
                 className="btn-primary">
                Struktur Perusahaan <ArrowRight size={16} />
              </a>
              <a href="#partner"
                 className="btn-outline">
                Mitra Kami
              </a>
            </div>
          </div>

          {/* Right — image card stack */}
          <div className={`relative h-[320px] sm:h-[380px] lg:h-[480px] w-full
                           transition-all duration-700 delay-200 ${
            heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>

            {/* Card back */}
            <div className="absolute top-8 right-0 w-[85%] h-full rounded-2xl overflow-hidden
                            border border-white/10 shadow-2xl rotate-3">
              <div className="w-full h-full bg-brand-green/30
                              flex items-center justify-center">
                <div className="text-white/20 font-display font-extrabold text-[100px]">
                  PT
                </div>
              </div>
            </div>

            {/* Card front — photo placeholder */}
            <div className="absolute top-0 left-0 w-[88%] h-[90%] rounded-2xl overflow-hidden
                            border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.5)] -rotate-1">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Tim PT BOBA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep/70 via-transparent to-transparent" />
              {/* Label */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-display font-bold text-xl">
                  Tim Profesional Kami
                </p>
                <p className="text-white/60 text-sm mt-1">
                  1.000+ karyawan berdedikasi
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 right-8 bg-white rounded-2xl
                            shadow-[0_16px_48px_rgba(27,168,130,0.25)]
                            px-5 py-4 flex items-center gap-3 z-10">
              <div className="w-10 h-10 rounded-xl bg-brand-green-pale
                              flex items-center justify-center shrink-0">
                <Award size={20} className="text-brand-green" />
              </div>
              <div>
                <p className="font-display font-extrabold text-brand-green-deep text-lg leading-none">
                  Indonesia 100%
                </p>
                <p className="text-brand-gray-mid text-[12px] mt-0.5 font-medium">
                  National Identity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          2. STATS BAR — angka-angka impresif
      ══════════════════════════════════════════════════════ */}
      <div className="bg-brand-green">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/15">
            {STATS.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label}
                  className="flex flex-col items-center text-center py-10 px-4 gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-1">
                    <Icon size={20} className="text-white" />
                  </div>
                  <p className="font-display font-extrabold text-white text-4xl sm:text-[44px] leading-none">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <div>
                    <p className="text-white font-bold text-[13px] sm:text-sm tracking-wide">{s.label}</p>
                    <p className="text-white/50 text-[11px] mt-0.5">{s.sub}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          3. VISI MISI — clean white cards
      ══════════════════════════════════════════════════════ */}
      <div className="bg-brand-gray py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className="text-center mb-16">
            <span className="section-chip justify-center">Arah Perusahaan</span>
            <h3 className="font-display font-extrabold text-brand-green-deep
                           text-3xl sm:text-4xl md:text-5xl">
              Visi & Misi Kami
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Visi */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm
                            border border-brand-green-pale
                            hover:shadow-[0_8px_40px_rgba(27,168,130,0.12)]
                            transition-all duration-400 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center">
                  <Globe size={22} className="text-white" />
                </div>
                <span className="font-display font-extrabold text-brand-green text-xl">VISI</span>
              </div>
              <p className="font-display font-bold text-brand-green-deep text-2xl leading-snug mb-4">
                Menjadi Perusahaan Energi Nasional Kelas Dunia
              </p>
              <p className="text-brand-gray-mid leading-relaxed">
                Kami beraspirasi menjadi perusahaan terdepan dalam industri energi, yang diakui
                secara global atas inovasi, keberlanjutan, dan kontribusi nyata bagi kemakmuran
                bangsa Indonesia.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-brand-green rounded-2xl p-8 md:p-10 shadow-sm
                            hover:shadow-[0_8px_40px_rgba(27,168,130,0.35)]
                            transition-all duration-400">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                  <Zap size={22} className="text-white" />
                </div>
                <span className="font-display font-extrabold text-white text-xl">MISI</span>
              </div>
              <ul className="space-y-4">
                {[
                  'Menjalankan usaha minyak, gas, serta energi baru & terbarukan secara terintegrasi.',
                  'Memaksimalkan nilai perusahaan melalui inovasi, tata kelola baik, dan SDM unggul.',
                  'Memberikan manfaat optimal bagi pemegang saham, pelanggan, dan masyarakat.',
                  'Mendukung ketahanan energi nasional dan agenda keberlanjutan Indonesia.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 leading-relaxed text-sm">
                    <span className="mt-1.5 w-5 h-5 rounded-full bg-white/15
                                     flex items-center justify-center shrink-0 text-white text-[10px] font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          4. PILAR UTAMA — 4 cards dengan icon
      ══════════════════════════════════════════════════════ */}
      <div ref={pillarsRef} className="bg-white py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="section-chip">Fondasi Kami</span>
              <h3 className="font-display font-extrabold text-brand-green-deep
                             text-3xl sm:text-4xl md:text-5xl max-w-md">
                Empat Pilar Utama Perusahaan
              </h3>
            </div>
            <a href="#services"
               className="inline-flex items-center gap-2 text-brand-green font-bold
                          text-sm hover:text-brand-green-dark transition-colors group shrink-0">
              Lihat Semua Layanan
              <ChevronRight size={16}
                className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={p.title}
                  className={`group relative bg-white rounded-2xl p-7
                              border border-gray-100
                              hover:border-transparent hover:shadow-[0_16px_56px_rgba(27,168,130,0.15)]
                              transition-all duration-400 cursor-default
                              ${pillarsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 100}ms`, transitionDuration: '600ms' }}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color}
                                   flex items-center justify-center mb-6 shadow-md
                                   group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className="text-white" />
                  </div>

                  <h4 className="font-display font-bold text-brand-green-deep text-lg mb-3">
                    {p.title}
                  </h4>
                  <p className="text-brand-gray-mid text-sm leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Hover bottom line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl
                                   bg-gradient-to-r ${p.color}
                                   scale-x-0 group-hover:scale-x-100
                                   transition-transform duration-400 origin-left`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          5. TIMELINE SEJARAH — interactive milestones
      ══════════════════════════════════════════════════════ */}
      <div ref={timelineRef} className="bg-brand-green-deep py-24 md:py-32 overflow-hidden">
        {/* Decorative bg */}
        <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[800px] h-[800px] rounded-full border border-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[1100px] h-[1100px] rounded-full border border-white/[0.02]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          <div className="text-center mb-16">
            <span className="section-chip" style={{ color: '#2DD4B0' }}>
              &nbsp;Perjalanan Kami
            </span>
            <h3 className="font-display font-extrabold text-white text-3xl sm:text-4xl md:text-5xl">
              Sejarah & Pencapaian
            </h3>
          </div>

          {/* Year selector tabs — horizontal scroll on mobile */}
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 mb-14">
            <div className="flex items-center gap-2 w-max mx-auto lg:flex-wrap lg:justify-center lg:w-auto">
              {MILESTONES.map((m) => (
                <button
                  key={m.year}
                  onClick={() => setActiveYear(m.year)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeYear === m.year
                      ? 'bg-brand-green text-white shadow-[0_0_20px_rgba(27,168,130,0.6)]'
                      : 'bg-white/8 text-white/50 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {m.year}
                </button>
              ))}
            </div>
          </div>

          {/* Active milestone detail */}
          {MILESTONES.filter(m => m.year === activeYear).map((m) => (
            <div key={m.year}
              className={`max-w-2xl mx-auto text-center
                          transition-all duration-500 ${
                tlInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="inline-flex items-center justify-center w-20 h-20
                              rounded-full bg-brand-green/30 border border-brand-green-light/30 mb-6">
                <span className="font-display font-extrabold text-brand-green-light text-xl">
                  {m.year}
                </span>
              </div>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                {m.event}
              </p>
            </div>
          ))}

          {/* Timeline horizontal track — scrollable on mobile */}
          <div className="relative mt-16 overflow-x-auto scrollbar-hide -mx-6 px-6 pt-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 pb-4">
            <div className="flex items-center w-max mx-auto lg:w-auto lg:justify-center">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex items-center">
                  <button
                    onClick={() => setActiveYear(m.year)}
                    className="flex flex-col items-center gap-2 group transition-all duration-300 focus:outline-none"
                  >
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      activeYear === m.year
                        ? 'bg-brand-green-light border-brand-green-light scale-150 shadow-[0_0_14px_rgba(34,169,138,0.7)]'
                        : 'bg-transparent border-white/25 group-hover:border-brand-green-light'
                    }`} />
                    <span className={`text-[11px] font-bold transition-colors whitespace-nowrap ${
                      activeYear === m.year ? 'text-brand-green-light' : 'text-white/30 group-hover:text-white/60'
                    }`}>
                      {m.year}
                    </span>
                  </button>
                  {i < MILESTONES.length - 1 && (
                    <div className="w-10 sm:w-16 lg:w-20 h-[1px] bg-white/15 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          6. CTA STRIP — ajakan ke halaman lain
      ══════════════════════════════════════════════════════ */}
      <div className="bg-brand-green-pale py-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20
                        flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="font-display font-extrabold text-brand-green-deep text-2xl sm:text-3xl mb-2">
              Ingin Berkolaborasi Bersama Kami?
            </h4>
            <p className="text-brand-gray-mid leading-relaxed max-w-xl">
              Kami membuka peluang kemitraan strategis, investasi, dan kolaborasi lintas sektor
              untuk membangun masa depan energi Indonesia yang lebih cerah.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="#contact" className="btn-primary" style={{ borderRadius: '0.75rem' }}>
              Hubungi Kami <ArrowRight size={16} />
            </a>
            <a href="/investor-relations"
               className="inline-flex items-center gap-2 bg-white text-brand-green font-bold
                          px-6 py-3 rounded-xl border border-brand-green/20
                          hover:border-brand-green hover:shadow-md transition-all duration-300">
              Hubungan Investor
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}