import { useEffect, useRef, useState } from 'react'
import { Recycle, Send, ArrowRight, Leaf, Truck, Factory, Flame, ChevronRight } from 'lucide-react'

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

/* ── Service data ── */
const SERVICES = [
  {
    id: 1,
    icon: Truck,
    title: 'Pengambilan Sampah Rumah Tangga',
    tag: 'Pengambilan Sampah',
    desc: 'Layanan jemput sampah rumah tangga rutin sesuai jadwal yang Anda pilih.',
    price: 'Rp 75.000',
    unit: '/ bulan',
    cta: 'Pesan Layanan',
  },
  {
    id: 2,
    icon: Factory,
    title: 'Pengelolaan Sampah Korporat',
    tag: 'Pengelolaan Sampah',
    desc: 'Pengelolaan sampah lengkap untuk perusahaan, perkantoran, dan kawasan industri.',
    price: 'Rp 1.500.000',
    unit: '/ bulan',
    cta: 'Pesan Layanan',
  },
  {
    id: 3,
    icon: Leaf,
    title: 'Pengolahan Sampah Organik',
    tag: 'Pengolahan Organik',
    desc: 'Pengolahan sampah organik menjadi kompos dan pupuk berkualitas.',
    price: 'Rp 250.000',
    unit: '/ ton',
    cta: 'Pesan Layanan',
  },
  {
    id: 4,
    icon: Flame,
    title: 'Konversi Sampah Organik ke Bahan Bakar',
    tag: 'Bahan Bakar Hijau',
    desc: 'Konversi sampah organik menjadi bahan bakar kendaraan ramah lingkungan.',
    price: 'Rp 5.000.000',
    unit: '/ project',
    cta: 'Pesan Layanan',
  },
]

export default function ServiceSection() {
  const [headerRef, headerInView] = useInView(0.1)
  const [cardsRef,  cardsInView]  = useInView(0.08)

  return (
    <section id="services" className="bg-white py-12 md:py-14 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700
                      ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Chip centered */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
              Green Technology
            </span>
            <span className="w-8 h-[2px] bg-brand-green rounded-full" />
          </div>

          <h2 className="font-display font-extrabold text-brand-green-deep
                         text-3xl sm:text-4xl md:text-5xl mb-5">
            Green Services PT BOBA
          </h2>

          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
            Layanan green technology PT BOBA — pengelolaan sampah &amp; konversi sampah organik menjadi
            bahan bakar kendaraan, dipasarkan via{' '}
            <strong className="text-brand-green-deep font-bold">Ponpin</strong> marketplace.
          </p>
        </div>

        {/* ── Service cards ── */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={svc.id}
                className={`bg-white border border-gray-150 rounded-2xl p-6
                             flex flex-col gap-4
                             shadow-[0_2px_16px_rgba(0,0,0,0.05)]
                             hover:shadow-[0_8px_36px_rgba(27,168,130,0.12)]
                             hover:-translate-y-1
                             transition-all duration-300
                             ${cardsInView
                               ? 'opacity-100 translate-y-0'
                               : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms`, transitionDuration: '550ms' }}
              >
                {/* Recycle icon */}
                <div className="w-9 h-9 rounded-lg bg-brand-green-pale
                                flex items-center justify-center">
                  <Recycle size={18} className="text-brand-green" />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-brand-green-deep
                               text-[17px] leading-snug">
                  {svc.title}
                </h3>

                {/* Tag pill */}
                <span className="self-start bg-brand-green-pale text-brand-green
                                  text-[12px] font-semibold px-3 py-1 rounded-full">
                  {svc.tag}
                </span>

                {/* Desc */}
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {svc.desc}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-brand-green text-xl">
                    {svc.price}
                  </span>
                  <span className="text-gray-400 text-sm">{svc.unit}</span>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="btn-brand group mt-auto"
                >
                  <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  {svc.cta}
                </a>
              </div>
            )
          })}
        </div>

        {/* ── Bottom note ── */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500
                         ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-400 text-sm mb-4">
            Butuh solusi kustom? Kami siap merancang paket layanan khusus untuk kebutuhan Anda.
          </p>
          <a href="#contact"
             className="inline-flex items-center gap-2 text-brand-green font-bold text-sm
                        hover:text-brand-green-dark transition-colors group">
            Konsultasi Gratis
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  )
}