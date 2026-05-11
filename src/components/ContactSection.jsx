import { useEffect, useRef, useState } from 'react'
import {
  Mail, Phone, MapPin, Clock, Send,
  CheckCircle2, ChevronDown, MessageSquare
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
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Alamat',
    value: 'Jl. Mayjend. Jonosewojo No.Kav.3, Surabaya',
    sub: 'Kantor Pusat PT BOBA',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '+62 21 5555 8888',
    sub: 'Senin – Jumat, 09.00–17.00 WIB',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@ptboba.id',
    sub: 'Balasan dalam 1×24 jam',
  },
  {
    icon: Clock,
    label: 'Jam Operasional',
    value: 'Senin – Jumat: 09.00 – 17.00 WIB',
    sub: 'Sabtu: 09.00 – 13.00 WIB',
  },
]

const SUBJECTS = [
  'Pertanyaan Umum',
  'Kemitraan & Kolaborasi',
  'Investor Relations',
  'Layanan Green Technology',
  'Produk Fashion',
  'Marketplace Ponpin',
  'Lainnya',
]

const FAQ = [
  {
    q: 'Bagaimana cara mendaftar sebagai mitra PT BOBA?',
    a: 'Isi formulir kontak dengan subjek "Kemitraan & Kolaborasi", atau hubungi tim kami langsung via email hello@ptboba.id. Tim kami akan merespons dalam 1×24 jam.',
  },
  {
    q: 'Apakah produk fashion tsoecha.co & sokyuut tersedia secara online?',
    a: 'Ya, semua produk tersedia di platform Ponpin Marketplace. Anda juga bisa menghubungi kami untuk pemesanan partai besar (wholesale).',
  },
  {
    q: 'Bagaimana cara memesan layanan Green Services PT BOBA?',
    a: 'Isi formulir dengan subjek "Layanan Green Technology" atau kunjungi halaman Services untuk detail harga dan cakupan layanan.',
  },
  {
    q: 'Apakah PT BOBA membuka peluang investasi?',
    a: 'Ya. Kunjungi halaman Investor Relations atau hubungi kami dengan subjek "Investor Relations" untuk mendapatkan pitch deck dan jadwal pertemuan.',
  },
]

export default function ContactSection() {
  const [headerRef, headerInView] = useInView(0.1)
  const [formRef,   formInView]   = useInView(0.08)
  const [faqRef,    faqInView]    = useInView(0.08)

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq]     = useState(null)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="overflow-hidden">

      {/* ══════════════════════════════════════════
          1. HEADER
      ══════════════════════════════════════════ */}
      <div ref={headerRef} className="bg-[#edfaf6] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* Section label */}
          <div className={`text-center mb-16 transition-all duration-700
                           ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                Hubungi Kami
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h2 className="font-display font-extrabold text-brand-green-deep
                           text-3xl sm:text-4xl md:text-5xl mb-4">
              Ada yang Ingin Ditanyakan?
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Tim PT BOBA siap membantu Anda — mulai dari pertanyaan produk,
              kemitraan, hingga layanan green technology.
            </p>
          </div>

          {/* Contact info cards */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 delay-200
                           ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {CONTACT_INFO.map((c, i) => {
              const Icon = c.icon
              return (
                <div key={c.label}
                     className="bg-white rounded-2xl p-6 border border-gray-100
                                shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                                hover:shadow-[0_8px_32px_rgba(27,168,130,0.10)]
                                hover:-translate-y-1 transition-all duration-300"
                     style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 rounded-xl bg-brand-green-pale
                                  flex items-center justify-center mb-4">
                    <Icon size={18} className="text-brand-green" />
                  </div>
                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-1">
                    {c.label}
                  </p>
                  <p className="font-semibold text-brand-green-deep text-sm leading-snug mb-1">
                    {c.value}
                  </p>
                  <p className="text-gray-400 text-xs">{c.sub}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. FORM + MAP
      ══════════════════════════════════════════ */}
      <div ref={formRef} className="bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">

            {/* Form */}
            <div className={`transition-all duration-700
                             ${formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare size={20} className="text-brand-green" />
                <h3 className="font-display font-bold text-brand-green-deep text-2xl">
                  Kirim Pesan
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-8">
                Isi formulir di bawah dan kami akan merespons dalam 1×24 jam.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4
                                bg-brand-green-pale rounded-2xl p-12 text-center border border-brand-green/20">
                  <CheckCircle2 size={48} className="text-brand-green" />
                  <h4 className="font-display font-bold text-brand-green-deep text-xl">
                    Pesan Terkirim!
                  </h4>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Terima kasih telah menghubungi kami. Tim PT BOBA akan merespons
                    pesan Anda dalam 1×24 jam kerja.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }) }}
                          className="mt-2 text-brand-green font-semibold text-sm
                                     hover:text-brand-green-dark transition-colors">
                    Kirim pesan lain →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: 'name',  label: 'Nama Lengkap', type: 'text',  placeholder: 'Masukkan nama Anda', required: true },
                      { name: 'email', label: 'Email',         type: 'email', placeholder: 'nama@email.com',    required: true },
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
                                     focus:ring-2 focus:ring-brand-green/15
                                     transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange} placeholder="+62 8xx xxxx xxxx"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                 text-brand-green-deep placeholder-gray-300
                                 focus:outline-none focus:border-brand-green
                                 focus:ring-2 focus:ring-brand-green/15
                                 transition-all duration-200"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">
                      Subjek <span className="text-brand-green">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="subject" value={form.subject}
                        onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                   text-brand-green-deep appearance-none bg-white
                                   focus:outline-none focus:border-brand-green
                                   focus:ring-2 focus:ring-brand-green/15
                                   transition-all duration-200"
                      >
                        <option value="" disabled>Pilih subjek pesan...</option>
                        {SUBJECTS.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2
                                                         text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-green-deep mb-1.5">
                      Pesan <span className="text-brand-green">*</span>
                    </label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} required rows={5}
                      placeholder="Tuliskan pesan, pertanyaan, atau proposal Anda..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                                 text-brand-green-deep placeholder-gray-300 resize-none
                                 focus:outline-none focus:border-brand-green
                                 focus:ring-2 focus:ring-brand-green/15
                                 transition-all duration-200"
                    />
                  </div>

                  <button type="submit"
                          className="w-full flex items-center justify-center gap-2
                                     bg-brand-green text-white font-bold py-4 rounded-xl
                                     hover:bg-brand-green-dark transition-all duration-300
                                     hover:shadow-[0_4px_24px_rgba(27,168,130,0.40)]
                                     active:scale-[0.98]">
                    <Send size={16} />
                    Kirim Pesan
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    Dengan mengirim pesan, Anda menyetujui Kebijakan Privasi PT BOBA.
                  </p>
                </form>
              )}
            </div>

            {/* Map + info */}
            <div className={`transition-all duration-700 delay-200
                             ${formInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden h-72 mb-6
                              border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <iframe
                  title="Lokasi PT BOBA"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4029.715454857656!2d112.67497467508198!3d-7.289414792717991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fc37c16803b9%3A0x209ab8b64b6905d0!2sSpazio!5e1!3m2!1sen!2sid!4v1778474717153!5m2!1sen!2sid"                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick contact cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Phone, label: 'Telepon Langsung', value: '+62 21 5555 8888', href: 'tel:+622155558888', cta: 'Hubungi' },
                  { icon: Mail,  label: 'Kirim Email',      value: 'hello@ptboba.id',  href: 'mailto:hello@ptboba.id', cta: 'Email Kami' },
                ].map(c => {
                  const Icon = c.icon
                  return (
                    <a key={c.label} href={c.href}
                       className="bg-brand-green-pale rounded-2xl p-5 border border-brand-green/15
                                  hover:border-brand-green hover:bg-brand-green-pale
                                  hover:shadow-[0_4px_20px_rgba(27,168,130,0.15)]
                                  transition-all duration-300 group block">
                      <div className="w-9 h-9 rounded-lg bg-brand-green flex items-center
                                      justify-center mb-3
                                      group-hover:scale-110 transition-transform duration-300">
                        <Icon size={16} className="text-white" />
                      </div>
                      <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                        {c.label}
                      </p>
                      <p className="font-bold text-brand-green-deep text-sm">{c.value}</p>
                    </a>
                  )
                })}
              </div>

              {/* WhatsApp CTA */}
              <a href="https://wa.me/622155558888"
                 target="_blank" rel="noopener noreferrer"
                 className="mt-4 flex items-center justify-center gap-3
                            w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl
                            hover:bg-[#1ebe5c] transition-all duration-300
                            hover:shadow-[0_4px_20px_rgba(37,211,102,0.35)]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          3. FAQ
      ══════════════════════════════════════════ */}
      <div ref={faqRef} className="bg-[#edfaf6] py-20 md:py-24 border-t border-brand-green/10">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10">
          <div className={`text-center mb-12 transition-all duration-700
                           ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
              <span className="text-brand-green text-[11px] font-bold tracking-[0.22em] uppercase">
                FAQ
              </span>
              <span className="w-8 h-[2px] bg-brand-green rounded-full" />
            </div>
            <h3 className="font-display font-extrabold text-brand-green-deep text-3xl sm:text-4xl">
              Pertanyaan yang Sering Ditanyakan
            </h3>
          </div>

          <div className={`space-y-3 transition-all duration-700 delay-200
                           ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {FAQ.map((item, i) => (
              <div key={i}
                   className="bg-white rounded-2xl border border-gray-100 overflow-hidden
                              shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4
                             px-6 py-5 text-left transition-colors duration-200
                             hover:bg-brand-green-pale/50"
                >
                  <span className="font-semibold text-brand-green-deep text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-brand-green shrink-0 transition-transform duration-300
                                ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-400 ease-in-out
                                 ${openFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}