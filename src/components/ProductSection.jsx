import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronRight, ExternalLink, Star } from 'lucide-react'
import data from '../data/product.json'

function useInView(threshold = 0.12) {
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

const BrandLogo = ({ brand, size = 'md' }) => {
  const sizes = { sm: 'w-10 h-10 text-[11px]', md: 'w-14 h-14 text-[13px]', lg: 'w-20 h-20 text-[18px]' }
  return (
    <div className={`${sizes[size]} rounded-2xl flex items-center justify-center font-display font-extrabold text-white shrink-0`}
         style={{ backgroundColor: brand.color }}>
      {brand.initials}
    </div>
  )
}

export default function ProductSection() {
  const { header, categories, brands, marqueeItems, cta } = data
  const FEATURED = brands.filter(b => b.featured || b.id <= 3)

  const [activeCategory, setActiveCategory] = useState('Semua')
  const [hoveredId, setHoveredId]           = useState(null)
  const [featuredIdx, setFeaturedIdx]       = useState(0)
  const [headerRef, headerInView] = useInView(0.1)
  const [gridRef,   gridInView]   = useInView(0.08)

  const featured = FEATURED[featuredIdx]
  const filtered = activeCategory === 'Semua' ? brands : brands.filter(b => b.category === activeCategory)

  useEffect(() => {
    const t = setInterval(() => setFeaturedIdx(i => (i + 1) % FEATURED.length), 4500)
    return () => clearInterval(t)
  }, [FEATURED.length])

  return (
    <section id="products" className="bg-white overflow-hidden">

      {/* Header */}
      <div ref={headerRef} className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="section-chip">{header.chip}</span>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.08] max-w-xl">
              {header.title}{' '}<span className="text-brand-green">{header.titleHighlight}</span>{' '}{header.titleEnd}
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-brand-gray-mid leading-relaxed">{header.desc}</p>
            <a href={header.ctaHref} className="inline-flex items-center gap-2 mt-4 text-brand-green font-bold text-sm hover:text-brand-green-dark transition-colors group">
              {header.ctaLabel} <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Featured spotlight */}
      <div className="bg-brand-green-deep overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-8">
                {FEATURED.map((_, i) => (
                  <button key={i} onClick={() => setFeaturedIdx(i)}
                    className={`transition-all duration-300 rounded-full ${i === featuredIdx ? 'w-8 h-2.5 bg-brand-green-light' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`} />
                ))}
              </div>
              <div key={featured.id} className="transition-all duration-500">
                <div className="flex items-center gap-4 mb-5">
                  <BrandLogo brand={featured} size="lg" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-brand-green-light text-[11px] font-bold tracking-[0.2em] uppercase">{featured.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1 text-yellow-400 text-[11px] font-semibold">
                        <Star size={11} fill="currentColor" /> Featured
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl">{featured.name}</h3>
                  </div>
                </div>
                <p className="text-brand-green-light font-semibold italic mb-3">"{featured.tagline}"</p>
                <p className="text-white/65 leading-relaxed mb-8 max-w-md">{featured.desc}</p>
                <div className="flex flex-wrap gap-6 mb-8">
                  {featured.stats.map(s => (
                    <div key={s.l}>
                      <p className="font-display font-extrabold text-white text-2xl leading-none">{s.v}</p>
                      <p className="text-white/45 text-xs mt-1 uppercase tracking-widest">{s.l}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#products" className="btn-primary" style={{ borderRadius: '0.5rem' }}>
                    Jelajahi Brand <ArrowRight size={15} />
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-semibold text-sm transition-colors">
                    <ExternalLink size={14} /> Website Resmi
                  </a>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[3/2] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                <img key={featured.id} src={featured.img} alt={featured.name} className="w-full h-full object-cover transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green-deep/70 via-brand-green-deep/10 to-transparent" />
                <div className="absolute top-4 right-4 glass rounded-xl px-3 py-2">
                  <p className="text-white font-bold text-xs">{featured.name}</p>
                </div>
              </div>
              <div className="absolute -bottom-4 left-6 bg-white rounded-full shadow-[0_8px_32px_rgba(27,168,130,0.2)] px-4 py-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span className="text-brand-green-deep font-bold text-xs">{featured.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter + grid */}
      <div ref={gridRef} className="bg-brand-gray py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 mb-12">
            <div className="flex items-center gap-2 w-max lg:w-auto lg:flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${activeCategory === cat ? 'bg-brand-green text-white border-brand-green shadow-[0_4px_20px_rgba(27,168,130,0.35)]' : 'bg-white text-brand-gray-mid border-gray-200 hover:border-brand-green hover:text-brand-green'}`}>
                  {cat}
                </button>
              ))}
              <span className="flex-shrink-0 ml-2 text-brand-gray-mid text-xs font-medium hidden sm:inline">
                {filtered.length} brand ditemukan
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((brand, i) => (
              <div key={brand.id}
                   onMouseEnter={() => setHoveredId(brand.id)}
                   onMouseLeave={() => setHoveredId(null)}
                   className={`group relative bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:border-transparent hover:shadow-[0_16px_56px_rgba(27,168,130,0.14)] transition-all duration-300 ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                   style={{ transitionDelay: `${i * 60}ms`, transitionDuration: '550ms' }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={brand.img} alt={brand.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{brand.category}</span>
                  <div className="absolute bottom-3 left-3"><BrandLogo brand={brand} size="sm" /></div>
                </div>
                <div className="p-5">
                  <h4 className="font-display font-extrabold text-brand-green-deep text-lg mb-1">{brand.name}</h4>
                  <p className="text-brand-green text-xs font-semibold italic mb-3">{brand.tagline}</p>
                  <p className="text-brand-gray-mid text-sm leading-relaxed line-clamp-2 mb-4">{brand.desc}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    {brand.stats.slice(0, 2).map(s => (
                      <div key={s.l}>
                        <p className="font-display font-extrabold text-brand-green-deep text-sm leading-none">{s.v}</p>
                        <p className="text-brand-gray-mid text-[10px] mt-0.5 uppercase tracking-wider">{s.l}</p>
                      </div>
                    ))}
                    <div className="ml-auto">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredId === brand.id ? 'bg-brand-green text-white' : 'bg-brand-green-pale text-brand-green'}`}>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="bg-brand-green-pale py-5 overflow-hidden border-y border-brand-green/10">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {marqueeItems.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green/40" />
              <span className="text-brand-green font-bold text-sm tracking-widest uppercase">{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="relative bg-brand-green rounded-3xl overflow-hidden px-8 sm:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-16 right-40 w-48 h-48 rounded-full bg-brand-green-light/20 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
            <div className="relative text-center md:text-left">
              <p className="text-brand-green-light font-bold text-sm tracking-widest uppercase mb-3">{cta.eyebrow}</p>
              <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl md:text-4xl leading-tight">{cta.title}</h3>
              <p className="text-white/65 mt-3 max-w-md leading-relaxed">{cta.desc}</p>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
              {cta.buttons.map(btn => (
                btn.variant === 'white'
                  ? <a key={btn.label} href={btn.href} className="inline-flex items-center justify-center gap-2 bg-white text-brand-green font-bold px-7 py-3.5 rounded-xl hover:bg-brand-green-pale transition-all duration-300 hover:shadow-lg">{btn.label} <ArrowRight size={16} /></a>
                  : <a key={btn.label} href={btn.href} className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-7 py-3.5 rounded-xl border border-white/25 hover:bg-white/20 transition-all duration-300">{btn.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
