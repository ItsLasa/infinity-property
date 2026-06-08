import { Menu, X, Phone, User as UserIcon, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Lands', to: '/lands' },
  { label: 'Houses', to: '/houses' },
  { label: 'Apartments', to: '/apartments' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Handle scroll effect
  typeof window !== 'undefined' &&
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 10)
    })

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'bg-paper-white/95 backdrop-blur-xl shadow-lg shadow-black/5 '
          : 'bg-gradient-to-b from-black/100 to-black/92 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Default logo — visible when NOT scrolled */}
<img
  src="logo.png"
  width={200}
  height={100}
  alt="Logo"
  className={[
    ' inset-0 transition-all duration-300 ease-out',
    scrolled ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
  ].join(' ')}
/>

{/* Scrolled logo — visible when scrolled */}
<img
  src="bg-logo.png"
  width={190}
  height={100}
  alt="Logo"
  className={[
    'absolute inset-0 transition-all duration-300 ease-out',
    scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
  ].join(' ')}
/>
            </div>
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                    scrolled ? 'text-on-surface' : 'text-paper-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-heritage-green to-heritage-green-light transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              )
            })}
            {user && user.isAdmin && (
              <Link
                to="/admin"
                className={`relative px-4 py-2 text-sm font-bold text-amber-500 transition-all duration-300 group uppercase tracking-widest`}
              >
                Admin
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {!user ? (
              <Link
                to="/login"
                className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                  scrolled ? 'text-on-surface' : 'text-paper-white'
                } hover:opacity-80`}
              >
                <UserIcon size={18} className="text-heritage-green" />
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <span className={`text-xs font-bold uppercase tracking-widest ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                  {user.name.split(' ')[0]}
                </span>
                <button 
                  onClick={() => { logout(); navigate('/login'); }}
                  className={`p-2 rounded-full hover:bg-red-500/10 text-red-400 transition-all`}
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}

            <Link
              to="/contact"
              className="relative px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-heritage-green to-heritage-green-dark text-paper-white rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-heritage-green/30"
            >
              <span className="relative z-10">Enquire Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-heritage-green-dark to-heritage-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              scrolled
                ? 'text-on-surface hover:bg-outline-border/30'
                : 'text-paper-white hover:bg-paper-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-outline-border/20">
            <nav className="flex flex-col gap-2 mt-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-heritage-green/15 text-heritage-green border-l-2 border-heritage-green'
                        : scrolled
                        ? 'text-on-surface hover:bg-outline-border/10'
                        : 'text-paper-white hover:bg-paper-white/10'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                to="/contact"
                className="mt-4 px-4 py-3 bg-gradient-to-r from-heritage-green to-heritage-green-dark text-paper-white rounded-lg font-semibold text-sm uppercase tracking-wider text-center hover:shadow-lg transition-all duration-300"
                onClick={() => setMobileOpen(false)}
              >
                Enquire Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
