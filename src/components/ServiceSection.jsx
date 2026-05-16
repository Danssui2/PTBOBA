import { useEffect, useRef, useState } from 'react'
import { Truck, Factory, Leaf, Flame, Recycle, Send, ChevronRight } from 'lucide-react'
import data from '../data/service.json'

const ICON_MAP = { Truck, Factory, Leaf, Flame }

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

export default function ServiceSection() {
  const [headerRef, headerInView] = useInView(0.1)
  const [cardsRef,  cardsInView]  = useInView(0.08)
  const { header, services, footer: footerData } = data

  return (
    <section id="services" className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

        <div ref={headerRef}
             className={`text-center mb-14 transition-all duration-700
                         ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
              {header.chip}
            </span>
            <span className="w-8 h-[2px] bg-brand-green rounded-full" />
          </div>
          <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl mb-5">
            {header.title}
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
            {header.subtitle}{' '}
            <strong className="text-brand-green-deep font-bold">{header.subtitleBold}</strong>
            {header.subtitleEnd}
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon]
            return (
              <div key={svc.id}
                   className={`bg-white border border-gray-150 rounded-2xl p-6
                                flex flex-col gap-4
                                shadow-[0_2px_16px_rgba(0,0,0,0.05)]
                                hover:shadow-[0_8px_36px_rgba(27,168,130,0.12)]
                                hover:-translate-y-1 transition-all duration-300
                                ${cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                   style={{ transitionDelay: `${i * 100}ms`, transitionDuration: '550ms' }}>
                <div className="w-9 h-9 rounded-lg bg-brand-green-pale flex items-center justify-center">
                  <Recycle size={18} className="text-brand-green" />
                </div>
                <h3 className="font-display font-bold text-brand-green-deep text-[17px] leading-snug">
                  {svc.title}
                </h3>
                <span className="self-start bg-brand-green-pale text-brand-green text-[12px] font-semibold px-3 py-1 rounded-full">
                  {svc.tag}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{svc.desc}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-brand-green text-xl">{svc.price}</span>
                  <span className="text-gray-400 text-sm">{svc.unit}</span>
                </div>
                <a href={svc.ctaHref} className="btn-brand group mt-auto">
                  <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  {svc.cta}
                </a>
              </div>
            )
          })}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500
                         ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-400 text-sm mb-4">{footerData.note}</p>
          <a href={footerData.ctaHref}
             className="inline-flex items-center gap-2 text-brand-green font-bold text-sm hover:text-brand-green-dark transition-colors group">
            {footerData.ctaLabel}
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  )
}
