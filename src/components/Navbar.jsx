import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, User, LogIn, UserPlus, Globe } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',     href: 'https://ptbikinorangbahagia.com/#home' },
  { label: 'About',    href: 'https://ptbikinorangbahagia.com/#about' },
  { label: 'Brand',    href: 'https://ptbikinorangbahagia.com/#brands' },
  { label: 'Products', href: 'https://ptbikinorangbahagia.com/#products' },
  { label: 'Services', href: 'https://ptbikinorangbahagia.com/#services' },
  { label: 'Struktur', href: 'https://ptbikinorangbahagia.com/#struktur' },
  { label: 'Partner',  href: 'https://ptbikinorangbahagia.com/#partner' },
  { label: 'Contact',  href: 'https://ptbikinorangbahagia.com/#contact' },
  { label: 'Investor', href: 'https://ptbikinorangbahagia.com/investor-relations', highlight: true },
]

/* ─── Logo ─────────────────────────────────────────────────────────────────
   Taruh file logo di  public/logo.png  (bisa juga .svg / .webp).
────────────────────────────────────────────────────────────────────────── */
const Logo = () => (
  <div className="flex items-center gap-3">
    <img
      src="/logo.png"
      alt="Logo PT BOBA"
      className="h-10 w-10 object-contain"
      onError={(e) => {
        e.currentTarget.style.display = 'none'
        e.currentTarget.nextElementSibling.style.display = 'flex'
      }}
    />
    {/* Fallback placeholder */}
    <div
      style={{ display: 'none' }}
      className="h-10 w-10 rounded-lg bg-white/15 border border-white/25
                 items-center justify-center shrink-0"
    >
      <span className="text-white/50 text-[8px] font-bold">LOGO</span>
    </div>

    <div className="flex flex-col leading-none">
      <span className="font-display font-extrabold text-white text-[15px] tracking-wider uppercase">
        PT BOBA
      </span>
      <span className="font-display font-semibold text-brand-green-light text-[11px] tracking-[0.12em] uppercase mt-0.5">
        Bikin Orang Bahagia
      </span>
    </div>
  </div>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [active, setActive]     = useState('Home')
  const authRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) setAuthOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navBg = scrolled
    ? 'bg-brand-green-deep/95 shadow-[0_2px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl'
    : 'bg-transparent'

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="fixed top-0 inset-x-0 z-50 bg-brand-green text-white
                      text-[11px] font-medium hidden md:flex items-center
                      justify-between px-6 lg:px-12 h-8">
        <span className="tracking-wide opacity-90">
          Selamat datang di PT Bikin Orang Bahagia — Membahagiakan Setiap Langkah
        </span>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <Globe size={12} />
            <span>ID</span>
            <ChevronDown size={10} />
          </button>
          <span className="opacity-30">|</span>
          <a href="tel:135" className="opacity-80 hover:opacity-100 transition-opacity">
            Call Center: 135
          </a>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <nav className={`fixed inset-x-0 z-40 transition-all duration-500 ${navBg} md:top-8 top-0`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10
                        flex items-center justify-between h-16 md:h-[68px]">

          {/* Logo */}
          <a href="/" className="shrink-0 animate-fade-in-down">
            <Logo />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((link, i) => (
              <li key={link.label} className="animate-fade-in-down"
                  style={{ animationDelay: `${60 * i}ms` }}>
                {link.highlight ? (
                  <a
                    href={link.href}
                    onClick={() => setActive(link.label)}
                    className="relative ml-2 flex items-center gap-1 px-3 py-1.5
                               text-[11.5px] font-bold tracking-widest uppercase
                               text-brand-green-light border border-brand-green-light/60
                               rounded-md hover:bg-brand-green-light hover:text-white
                               transition-all duration-300"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setActive(link.label)}
                    className={`nav-link-underline px-3 py-2 text-[13px] font-semibold
                                tracking-wide transition-colors duration-200 block
                                ${active === link.label
                                  ? 'text-white active'
                                  : 'text-white/70 hover:text-white'}`}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Auth buttons — desktop */}
          <div className="hidden xl:flex items-center gap-2 animate-fade-in-down animation-delay-500">
            {/* Login dropdown */}
            <div className="relative" ref={authRef}>
              <button
                onClick={() => setAuthOpen(!authOpen)}
                className="flex items-center gap-2 text-white/75 hover:text-white
                           text-[13px] font-semibold px-3 py-2 rounded-md
                           hover:bg-white/10 transition-all duration-200"
              >
                <LogIn size={15} />
                Login
                <ChevronDown size={13}
                  className={`transition-transform duration-300 ${authOpen ? 'rotate-180' : ''}`} />
              </button>

              {authOpen && (
                <div className="absolute right-0 top-full mt-2 w-52
                                bg-brand-green-deep border border-white/10 rounded-xl
                                shadow-2xl animate-fade-in-down overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-white/40 text-[11px] uppercase tracking-widest font-semibold">
                      Masuk sebagai
                    </p>
                  </div>
                  {['Mitra Bisnis', 'Karyawan', 'Admin'].map((role) => (
                    <button key={role}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-white/75
                                 hover:text-white hover:bg-brand-green/30
                                 transition-colors flex items-center gap-2.5">
                      <User size={13} className="text-brand-green-light" />
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Register */}
            <a href="/register"
               className="flex items-center gap-2 bg-brand-green text-white
                          text-[13px] font-bold px-4 py-2 rounded-md
                          hover:bg-brand-green-dark transition-all duration-300
                          hover:shadow-[0_0_20px_rgba(22,97,82,0.5)]">
              <UserPlus size={14} />
              Register
            </a>
          </div>

          {/* Mobile icons */}
          <div className="xl:hidden flex items-center gap-1">
            <a href="/login" className="text-white/75 hover:text-white p-2 transition-colors">
              <LogIn size={20} />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 text-white/75 hover:text-white transition-colors"
                    aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Bottom accent line on scroll */}
        {scrolled && (
          <div className="absolute bottom-0 inset-x-0 h-[2px]
                          bg-gradient-to-r from-transparent via-brand-green-light to-transparent opacity-50" />
        )}
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`xl:hidden fixed inset-0 z-30 transition-all duration-300 ${
        menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             onClick={() => setMenuOpen(false)} />

        <div className={`absolute top-0 right-0 h-full w-[300px] bg-brand-green-deep
                         shadow-2xl transition-transform duration-350 flex flex-col
                         ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-5 py-4
                          border-b border-white/10 mt-16">
            <Logo />
            <button onClick={() => setMenuOpen(false)}
                    className="p-1.5 text-white/50 hover:text-white transition-colors">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
            {NAV_LINKS.map((link, i) => (
              <a key={link.label} href={link.href}
                 onClick={() => { setActive(link.label); setMenuOpen(false) }}
                 className={`flex items-center justify-between px-6 py-3.5
                             text-[14px] font-semibold border-b border-white/5
                             transition-all duration-200
                             ${link.highlight
                               ? 'text-brand-green-light hover:bg-brand-green/20'
                               : active === link.label
                                 ? 'text-white bg-white/5'
                                 : 'text-white/65 hover:text-white hover:bg-white/5'}`}
                 style={{ animationDelay: `${i * 40}ms` }}>
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="text-[10px] bg-brand-green text-white
                                   px-2 py-0.5 rounded font-bold tracking-wider">
                    IR
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="px-5 py-5 border-t border-white/10 flex flex-col gap-3">
            <a href="/login"
               className="flex items-center justify-center gap-2 w-full py-3
                          border border-white/25 rounded-lg text-white font-semibold
                          text-[14px] hover:bg-white/10 transition-all">
              <LogIn size={16} /> Login
            </a>
            <a href="/register"
               className="flex items-center justify-center gap-2 w-full py-3
                          bg-brand-green rounded-lg text-white font-bold
                          text-[14px] hover:bg-brand-green-dark transition-all">
              <UserPlus size={16} /> Register
            </a>
          </div>
        </div>
      </div>
    </>
  )
}