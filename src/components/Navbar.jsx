import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, User, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Brand',    href: '#brands' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Struktur', href: '#struktur' },
  { label: 'Partner',  href: '#partner' },
  { label: 'Contact',  href: '#contact' },
  { label: 'Investor', href: '/investor-relations' },
]

const Logo = ({ scrolled }) => (
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
    <div
      style={{ display: 'none' }}
      className={`h-10 w-10 rounded-lg border items-center justify-center shrink-0
                  ${scrolled ? 'bg-brand-green/10 border-brand-green/20' : 'bg-white/15 border-white/25'}`}
    >
      <span className={`text-[8px] font-bold ${scrolled ? 'text-brand-green' : 'text-white/50'}`}>LOGO</span>
    </div>
    <div className="flex flex-col leading-none">
      <span className={`font-display font-extrabold text-[15px] tracking-wider uppercase transition-colors duration-300
                        ${scrolled ? 'text-brand-green-deep' : 'text-white'}`}>
        PT BOBA
      </span>
      <span className="font-display font-semibold text-brand-green text-[11px] tracking-[0.12em] uppercase mt-0.5">
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
    const onScroll = () => setScrolled(window.scrollY > 60)
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
    ? 'bg-white shadow-[0_2px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl'
    : 'bg-transparent'

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-40 transition-all duration-400 ${navBg}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10
                        flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a href="/" className="shrink-0">
            <Logo scrolled={scrolled} />
          </a>

          {/* Desktop nav */}
          <ul className="hidden xl:flex items-center">
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                {link.highlight ? (
                  <a href={link.href} onClick={() => setActive(link.label)}
                     className={`ml-2 flex items-center px-3 py-1.5 text-[11.5px] font-bold
                                 tracking-widest uppercase rounded-md border transition-all duration-300
                                 ${scrolled
                                   ? 'text-brand-green border-brand-green/50 hover:bg-brand-green hover:text-white'
                                   : 'text-brand-green-light border-brand-green-light/50 hover:bg-brand-green-light hover:text-white'
                                 }`}>
                    {link.label}
                  </a>
                ) : (
                  <a href={link.href} onClick={() => setActive(link.label)}
                     className={`nav-link-underline relative px-3 py-2 text-[13px] font-semibold
                                 tracking-wide transition-colors duration-200 block
                                 ${scrolled
                                   ? active === link.label
                                     ? 'text-brand-green active-dark'
                                     : 'text-brand-gray-dark hover:text-brand-green'
                                   : active === link.label
                                     ? 'text-white active'
                                     : 'text-white/75 hover:text-white'
                                 }`}>
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Auth — desktop */}
          <div className="hidden xl:flex items-center gap-2">
            <div className="relative" ref={authRef}>
              <button onClick={() => setAuthOpen(!authOpen)}
                      className={`flex items-center gap-2 text-[13px] font-semibold
                                  px-3 py-2 rounded-md transition-all duration-200
                                  ${scrolled
                                    ? 'text-brand-gray-dark hover:text-brand-green hover:bg-brand-green-pale'
                                    : 'text-white/75 hover:text-white hover:bg-white/10'
                                  }`}>
                <LogIn size={15} />
                Login
                <ChevronDown size={13} className={`transition-transform duration-300 ${authOpen ? 'rotate-180' : ''}`} />
              </button>

              {authOpen && (
                <div className="absolute right-0 top-full mt-2 w-52
                                bg-white border border-gray-100 rounded-2xl
                                shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 bg-brand-green-pale">
                    <p className="text-brand-green text-[11px] uppercase tracking-widest font-bold">
                      Masuk sebagai
                    </p>
                  </div>
                  {['Mitra Bisnis', 'Karyawan', 'Admin'].map((role) => (
                    <button key={role}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-gray-600
                                 hover:text-brand-green hover:bg-brand-green-pale
                                 transition-colors flex items-center gap-2.5">
                      <User size={13} className="text-brand-green" />
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="/register"
               className="flex items-center gap-2 bg-brand-green text-white
                          text-[13px] font-bold px-4 py-2 rounded-md
                          hover:bg-brand-green-dark transition-all duration-300
                          hover:shadow-[0_4px_20px_rgba(27,168,130,0.4)]">
              <UserPlus size={14} />
              Register
            </a>
          </div>

          {/* Mobile */}
          <div className="xl:hidden flex items-center gap-1">
            <a href="/login" className={`p-2 transition-colors ${scrolled ? 'text-brand-gray-dark' : 'text-white/75 hover:text-white'}`}>
              <LogIn size={20} />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}
                    className={`p-2 transition-colors ${scrolled ? 'text-brand-gray-dark' : 'text-white/75 hover:text-white'}`}
                    aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scrolled bottom line */}
        {scrolled && (
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gray-100" />
        )}
      </nav>

      {/* Mobile Drawer */}
      <div className={`xl:hidden fixed inset-0 z-30 transition-all duration-300
                       ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"
             onClick={() => setMenuOpen(false)} />

        <div className={`absolute top-0 right-0 h-full w-[300px] bg-white
                         shadow-2xl transition-transform duration-300 flex flex-col
                         ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 mt-[68px]">
            <Logo scrolled={true} />
            <button onClick={() => setMenuOpen(false)} className="p-1.5 text-gray-400 hover:text-gray-700">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-2 scrollbar-hide">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href}
                 onClick={() => { setActive(link.label); setMenuOpen(false) }}
                 className={`flex items-center justify-between px-6 py-3.5
                             text-[14px] font-semibold border-b border-gray-50
                             transition-all duration-200
                             ${link.highlight
                               ? 'text-brand-green hover:bg-brand-green-pale'
                               : active === link.label
                                 ? 'text-brand-green bg-brand-green-pale'
                                 : 'text-gray-600 hover:text-brand-green hover:bg-brand-green-pale'
                             }`}>
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="text-[10px] bg-brand-green text-white px-2 py-0.5 rounded font-bold tracking-wider">
                    IR
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="px-5 py-5 border-t border-gray-100 flex flex-col gap-3">
            <a href="/login"
               className="flex items-center justify-center gap-2 w-full py-3
                          border border-gray-200 rounded-xl text-gray-600 font-semibold
                          text-[14px] hover:border-brand-green hover:text-brand-green transition-all">
              <LogIn size={16} /> Login
            </a>
            <a href="/register"
               className="flex items-center justify-center gap-2 w-full py-3
                          bg-brand-green rounded-xl text-white font-bold
                          text-[14px] hover:bg-brand-green-dark transition-all">
              <UserPlus size={16} /> Register
            </a>
          </div>
        </div>
      </div>
    </>
  )
}