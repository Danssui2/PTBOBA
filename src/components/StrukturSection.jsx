import { useEffect, useRef, useState } from 'react'
import { Building2, ShoppingBag, Store, TrendingUp, BarChart2, ExternalLink, User } from 'lucide-react'
import data from '../data/struktur.json'

const ICON_MAP = { Building2, ShoppingBag, Store }

function useInView(threshold = 0.08) {
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

export default function StrukturSection() {
  const [founderRef, founderInView] = useInView()
  const [ecoRef,     ecoInView]     = useInView()
  const [investRef,  investInView]  = useInView()
  const { founders, ecosystem, investment } = data

  return (
    <section id="struktur" className="overflow-hidden">

      {/* 1. PENDIRI */}
      <div className="bg-[#edfaf6] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div ref={founderRef}
               className={`text-center mb-14 transition-all duration-700
                           ${founderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">{founders.chip}</span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl mb-4">
              {founders.title}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              {founders.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {founders.members.map((f, i) => (
              <div key={f.name}
                   className={`bg-white rounded-2xl border border-gray-100 p-8
                                shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                                hover:shadow-[0_8px_40px_rgba(27,168,130,0.10)]
                                hover:-translate-y-1 text-center transition-all duration-300
                                flex flex-col items-center
                                ${founderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                   style={{ transitionDelay: `${i * 120}ms`, transitionDuration: '600ms' }}>
                <div className="w-24 h-24 rounded-full bg-brand-green-pale flex items-center justify-center mb-5 border-2 border-brand-green/10">
                  <User size={36} className="text-brand-green-mid" />
                </div>
                <h3 className="font-display font-bold text-brand-green-deep text-lg mb-1">{f.name}</h3>
                <span className="text-brand-green text-xs font-semibold tracking-wide uppercase mb-4 bg-brand-green-pale px-3 py-1 rounded-full">
                  {f.role}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. EKOSISTEM */}
      <div className="bg-white py-20 md:py-28 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div ref={ecoRef}
               className={`text-center mb-14 transition-all duration-700
                           ${ecoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">{ecosystem.chip}</span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl md:text-5xl">
              {ecosystem.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {ecosystem.items.map((item, i) => {
              const Icon = ICON_MAP[item.icon]
              return (
                <div key={item.name}
                     className={`border border-gray-150 rounded-2xl p-7 text-center bg-white
                                  shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                                  hover:shadow-[0_8px_36px_rgba(27,168,130,0.10)]
                                  hover:-translate-y-1 transition-all duration-300
                                  ${ecoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                     style={{ transitionDelay: `${i * 100}ms`, transitionDuration: '550ms' }}>
                  <div className="w-12 h-12 rounded-xl bg-brand-green-pale flex items-center justify-center mx-auto mb-5">
                    <Icon size={22} className="text-brand-green" />
                  </div>
                  <h4 className="font-display font-bold text-brand-green-deep text-lg mb-1">{item.name}</h4>
                  <p className="text-brand-green font-semibold text-sm mb-1">{item.sub}</p>
                  {item.desc && <p className="text-gray-400 text-sm mt-1 leading-relaxed">{item.desc}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. INVESTASI */}
      <div ref={investRef} className="bg-brand-green-deep py-20 md:py-28 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-green/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-brand-green-light/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage:`linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)`, backgroundSize:'48px 48px' }} />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`transition-all duration-700 ${investInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block bg-yellow-400 text-yellow-900 text-[11px] font-bold px-3 py-1 rounded-full tracking-wide uppercase mb-6">
                {investment.badge}
              </span>
              <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl md:text-[44px] leading-tight mb-5">
                {investment.title}
              </h2>
              <p className="text-white/65 leading-relaxed mb-8 max-w-lg">{investment.desc}</p>
              <ul className="space-y-3">
                {investment.points.map((point, i) => (
                  <li key={i}
                      className={`flex items-start gap-3 transition-all duration-500 ${investInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ transitionDelay: `${200 + i * 100}ms` }}>
                    <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
                    <span className="text-white/80 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`transition-all duration-700 delay-300 ${investInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white/8 border border-white/15 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <BarChart2 size={20} className="text-brand-green-light" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl">{investment.card.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-8">{investment.card.desc}</p>
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10">
                  {investment.card.stats.map(s => (
                    <div key={s.l} className="text-center">
                      <p className="font-display font-extrabold text-white text-2xl">{s.v}</p>
                      <p className="text-white/40 text-[10px] mt-1 uppercase tracking-wider">{s.l}</p>
                    </div>
                  ))}
                </div>
                <a href={investment.card.ctaHref}
                   className="flex items-center justify-center gap-2 w-full bg-brand-green text-white font-bold py-3.5 rounded-xl hover:bg-brand-green-dark transition-all duration-300 hover:shadow-[0_4px_24px_rgba(27,168,130,0.4)]">
                  <TrendingUp size={16} /> {investment.card.ctaLabel}
                </a>
                <a href={investment.card.secondaryHref}
                   className="flex items-center justify-center gap-2 mt-3 w-full text-white/60 hover:text-white font-semibold text-sm transition-colors py-2">
                  <ExternalLink size={13} /> {investment.card.secondaryLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
