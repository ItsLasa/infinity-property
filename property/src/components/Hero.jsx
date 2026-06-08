import { Search, MapPin, Home, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const tabs = [
  { id: 'lands', label: 'Lands', icon: MapPin },
  { id: 'houses', label: 'Houses', icon: Home },
  { id: 'apartments', label: 'Apartments', icon: Building2 },
]

const heroBanners = [
  'https://plcms.primelands.lk/images/260605110624C_est_La_Vie_PL_Home_Slider_Desktop__1920x1080.webp',
  'https://plcms.primelands.lk/images/260605110624C_est_La_Vie_PL_Home_Slider_Desktop__1920x1080.webp',
  'https://plcms.primelands.lk/images/260605110624C_est_La_Vie_PL_Home_Slider_Desktop__1920x1080.webp',
]

const districts = [
  'All Districts', 'Colombo', 'Gampaha', 'Kalutara', 'Kandy',
  'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Kurunegala', 'Anuradhapura', 'Kegalle', 'Ratnapura',
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState('lands')
  const [currentImage, setCurrentImage] = useState(0)

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)
  }

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % heroBanners.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://plcms.primelands.lk/images/260605110624C_est_La_Vie_PL_Home_Slider_Desktop__1920x1080.webp)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-16 w-full py-20">
        <div className="text-center mb-10">
          <h1 className="font-montserrat text-4xl md:text-6xl font-bold text-paper-white leading-tight tracking-tight mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-paper-white/95 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Everyone aspires to own a great piece of property. We, at Infinity Property,
            made it our aim to make this dream a reality.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-paper-white rounded-lg p-6 shadow-lg">
          <div className="flex justify-center gap-3 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-heritage-green text-paper-white'
                      : 'text-on-surface hover:bg-soft-beige'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <select className="flex-1 h-12 px-4 rounded border border-outline-border text-sm text-on-surface bg-paper-white focus:border-heritage-green focus:outline-none transition-colors">
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by project name..."
              className="flex-1 h-12 px-4 rounded border border-outline-border text-sm text-on-surface bg-paper-white focus:border-heritage-green focus:outline-none transition-colors"
            />
            <button className="h-12 px-6 bg-heritage-green text-paper-white rounded flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider hover:bg-heritage-green-dark transition-colors">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-10">
          {[
            { icon: FaFacebook, label: 'Facebook', href: '#' },
            { icon: FaYoutube, label: 'YouTube', href: '#' },
            { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
            { icon: FaInstagram, label: 'Instagram', href: '#' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-heritage-green/50"
            >
              {/* Background animated circle */}
              <div className="absolute inset-0 rounded-full bg-paper-white/10 group-hover:bg-heritage-green transition-all duration-300" />
              
              {/* Icon */}
              <Icon className="relative text-lg text-paper-white group-hover:text-paper-white transition-all duration-300 group-hover:scale-125" />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-heritage-green/20 opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
