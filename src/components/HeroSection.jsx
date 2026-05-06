import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    src: 'https://www.pexels.com/download/video/30443146/',
    poster: 'https://images.pexels.com/videos/3571264/free-video-3571264.jpg?auto=compress&cs=tinysrgb&dpr=1&w=1280',
    title: 'Energi untuk Kehidupan',
    subtitle: 'Menghadirkan solusi energi berkelanjutan untuk generasi mendatang',
    tag: 'Visi & Misi',
    cta: { primary: 'Pelajari Lebih Lanjut', href: '#about', secondary: 'Lihat Produk', href2: '#products' },
  },
  {
    id: 2,
    src: 'https://www.pexels.com/download/video/8328046/',
    poster: 'https://images.pexels.com/videos/2169880/free-video-2169880.jpg?auto=compress&cs=tinysrgb&dpr=1&w=1280',
    title: 'Inovasi Tanpa Batas',
    subtitle: 'Mendorong transformasi digital di sektor energi nasional',
    tag: 'Inovasi',
    cta: { primary: 'Tentang Kami', href: '#about', secondary: 'Investor', href2: '/investor-relations' },
  },
  {
    id: 3,
    src: 'https://www.pexels.com/download/video/8426047/',
    poster: 'https://images.pexels.com/videos/2792369/free-video-2792369.jpg?auto=compress&cs=tinysrgb&dpr=1&w=1280',
    title: 'Mitra Strategis Bangsa',
    subtitle: 'Berkomitmen menjadi perusahaan energi nasional kelas dunia',
    tag: 'Kemitraan',
    cta: { primary: 'Hubungi Kami', href: '#contact', secondary: 'Partner', href2: '#partner' },
  },
  {
    id: 4,
    src: 'https://www.pexels.com/download/video/36511231/',
    poster: 'https://images.pexels.com/videos/3163534/free-video-3163534.jpg?auto=compress&cs=tinysrgb&dpr=1&w=1280',
    title: 'Keberlanjutan untuk Masa Depan',
    subtitle: 'Bergerak menuju energi hijau yang ramah lingkungan dan berkelanjutan',
    tag: 'Sustainability',
    cta: { primary: 'Program ESG', href: '#services', secondary: 'Brand Kami', href2: '#brands' },
  },
]

const AUTOPLAY_DURATION = 7000

export default function HeroSection() {
  const [current, setCurrent]         = useState(0)
  const [playing, setPlaying]         = useState(true)
  const [muted, setMuted]             = useState(true)
  const [progress, setProgress]       = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const videoRefs = useRef([])
  const progRef   = useRef(null)
  const startRef  = useRef(null)

  const getVideo = (idx) => videoRefs.current[idx]

  const goTo = useCallback((idx) => {
    if (transitioning) return
    setTransitioning(true)
    setTextVisible(false)
    getVideo(current)?.pause()
    setTimeout(() => {
      setCurrent(idx)
      setProgress(0)
      startRef.current = performance.now()
      setTransitioning(false)
      setTimeout(() => {
        setTextVisible(true)
        if (playing) getVideo(idx)?.play().catch(() => {})
      }, 80)
    }, 350)
  }, [current, playing, transitioning])

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo])

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(progRef.current); return }
    startRef.current = performance.now() - (progress / 100) * AUTOPLAY_DURATION
    const tick = (now) => {
      const pct = Math.min(((now - startRef.current) / AUTOPLAY_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) next()
      else progRef.current = requestAnimationFrame(tick)
    }
    progRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progRef.current)
  }, [playing, current]) // eslint-disable-line

  useEffect(() => {
    const vid = getVideo(current)
    if (!vid) return
    vid.muted = muted
    if (playing) vid.play().catch(() => {})
    else vid.pause()
  }, [current, playing, muted])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const slide = SLIDES[current]

  return (
    <section id="home"
      className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden bg-brand-green-deep">

      {/* Video layers */}
      {SLIDES.map((s, i) => (
        <div key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <video
            ref={el => videoRefs.current[i] = el}
            src={s.src} poster={s.poster}
            muted={muted} loop playsInline
            preload={i === 0 ? 'auto' : 'none'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 z-20 hero-gradient" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-brand-green-deep/55 via-transparent to-brand-green-deep/20" />
      <div className="absolute bottom-0 inset-x-0 z-20 h-52 bg-gradient-to-t from-brand-green-deep via-brand-green-deep/25 to-transparent" />

      {/* Slide content */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-24 md:pt-36">

          {/* Tag */}
          <div className={`inline-flex items-center gap-2 mb-5 transition-all duration-500 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
            <span className="w-6 h-[2px] bg-brand-green-light rounded-full" />
            <span className="text-brand-green-light text-[11px] font-bold tracking-[0.22em] uppercase">
              {slide.tag}
            </span>
          </div>

          {/* Headline */}
          <h1 className={`font-display font-extrabold text-white leading-[1.08]
                          text-shadow-lg mb-5
                          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[78px]
                          max-w-[680px] transition-all duration-500 delay-100 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className={`text-white/70 font-medium leading-relaxed mb-10
                         text-base sm:text-lg md:text-xl max-w-[500px]
                         transition-all duration-500 delay-200 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap gap-3 transition-all duration-500 delay-300 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <a href={slide.cta.href} className="btn-primary group">
              {slide.cta.primary}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={slide.cta.href2} className="btn-outline">{slide.cta.secondary}</a>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-30
                      flex items-center justify-between
                      px-6 sm:px-10 lg:px-16 xl:px-20 gap-4">
        {/* Progress dots */}
        <div className="flex items-center gap-3">
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)}
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
              aria-label={`Slide ${i + 1}`}>
              <div className={`h-[3px] rounded-full overflow-hidden transition-all duration-300
                               bg-white/25 ${i === current ? 'w-16' : 'w-4 hover:w-6'}`}>
                {i === current && (
                  <div className="h-full bg-brand-green-light rounded-full transition-none"
                       style={{ width: `${progress}%` }} />
                )}
              </div>
              <span className={`text-[10px] font-bold transition-all ${
                i === current ? 'text-white' : 'text-white/25 group-hover:text-white/50'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-2">
          {[
            { icon: muted ? <VolumeX size={15}/> : <Volume2 size={15}/>, action: () => setMuted(m => !m), label: 'Mute' },
            { icon: playing ? <Pause size={15}/> : <Play size={15}/>, action: () => setPlaying(p => !p), label: 'Play' },
          ].map((btn) => (
            <button key={btn.label} onClick={btn.action} aria-label={btn.label}
              className="p-2.5 rounded-full border border-white/20 text-white/65
                         hover:text-white hover:border-white/50 hover:bg-white/10
                         backdrop-blur-sm transition-all duration-200">
              {btn.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      {[
        { fn: prev, label: 'Previous', pos: 'left-5 lg:left-8', icon: <ChevronLeft size={22}/> },
        { fn: next, label: 'Next',     pos: 'right-5 lg:right-8', icon: <ChevronRight size={22}/> },
      ].map((btn) => (
        <button key={btn.label} onClick={btn.fn} aria-label={btn.label}
          className={`hidden md:flex absolute ${btn.pos} top-1/2 -translate-y-1/2 z-30
                      items-center justify-center w-11 h-11
                      border border-white/20 rounded-full text-white/55
                      hover:text-white hover:border-white/60 hover:bg-white/10
                      backdrop-blur-sm transition-all duration-300
                      hover:scale-110 active:scale-95`}>
          {btn.icon}
        </button>
      ))}

      {/* Big slide counter decoration */}
      <span className="hidden md:block absolute top-36 right-16 z-30
                       font-display font-extrabold text-white/8 text-[80px]
                       leading-none select-none tabular-nums">
        {String(current + 1).padStart(2, '0')}
      </span>

      {/* Floating stats */}
      <div className="hidden lg:flex absolute bottom-24 right-6 sm:right-10 lg:right-16 z-30 flex-col gap-3">
        {[
          { value: '6+', label: 'Lini Bisnis' },
          { value: '120+', label: 'Mitra Strategis' },
          { value: '99.9%', label: 'Uptime Layanan' },
        ].map((stat, i) => (
          <div key={stat.label}
            className={`glass rounded-xl px-5 py-3 text-right transition-all duration-500 ${
              textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
            style={{ transitionDelay: `${300 + i * 80}ms` }}>
            <p className="font-display font-extrabold text-white text-[22px] leading-none mb-0.5">
              {stat.value}
            </p>
            <p className="text-white/45 text-[10px] uppercase tracking-widest font-semibold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile swipe hint */}
      <div className="md:hidden absolute bottom-20 inset-x-0 z-30 flex justify-center">
        <span className="flex items-center gap-2 text-white/35 text-[11px] font-medium">
          <ChevronLeft size={11}/> Geser untuk navigasi <ChevronRight size={11}/>
        </span>
      </div>
    </section>
  )
}