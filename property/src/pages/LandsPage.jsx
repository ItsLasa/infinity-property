import { MapPin, ArrowRight, Search, Building2, TreePine, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

const districts = [
  'All Districts', 'Colombo', 'Gampaha', 'Kalutara', 'Kandy',
  'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Kurunegala', 'Anuradhapura', 'Kegalle', 'Ratnapura',
]

const stats = [
  { icon: Building2, label: 'Active Projects', value: '120+' },
  { icon: TreePine, label: 'Districts Covered', value: '18' },
  { icon: TrendingUp, label: 'Happy Investors', value: '5,000+' },
]

export default function LandsPage() {
  const [searchParams] = useSearchParams()
  const [lands, setLands] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'All Districts')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest') // newest, price-low, price-high
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Helper to convert string prices (e.g., "1,500,000") to numbers
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.toString().replace(/,/g, ''));
  }

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/properties?type=land')
        setLands(data)
      } catch (error) {
        console.error('Error fetching lands', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLands()
  }, [])

  const filtered = lands
    .filter((l) => {
      const matchDistrict = selectedDistrict === 'All Districts' || l.district === selectedDistrict;
      const matchSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.location.toLowerCase().includes(searchTerm.toLowerCase());
      const priceVal = parsePrice(l.price);
      const matchMin = minPrice === '' || priceVal >= parseFloat(minPrice);
      const matchMax = maxPrice === '' || priceVal <= parseFloat(maxPrice);
      
      return matchDistrict && matchSearch && matchMin && matchMax;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return parsePrice(a.price) - parsePrice(b.price);
      if (sortBy === 'price-high') return parsePrice(b.price) - parsePrice(a.price);
      return b.id - a.id; // newest (by ID)
    });

  return (
    <div className="min-h-screen" style={{ background: '#f7f8f4' }}>
      <PageHero
        title="Lands"
        bgImage="https://plcms.primelands.lk/images/260602120601Greenhide_1920x400.webp"
      />

      {/* ── Hero Banner ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d1f0e 0%, #1a3d1c 50%, #0a1a0b 100%)' }}
      >
        {/* Decorative SVG topographic lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
          viewBox="0 0 1280 320"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290].map((y, i) => (
            <ellipse
              key={i}
              cx="640"
              cy={y + 20}
              rx={300 + i * 60}
              ry={30 + i * 12}
              fill="none"
              stroke="#ffffff"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Decorative corner grid */}
        <svg
          className="absolute right-0 top-0 h-full opacity-[0.04] pointer-events-none"
          viewBox="0 0 400 320"
          aria-hidden="true"
        >
          {Array.from({ length: 10 }).map((_, col) =>
            Array.from({ length: 8 }).map((_, row) => (
              <rect
                key={`${col}-${row}`}
                x={col * 40}
                y={row * 40}
                width="38"
                height="38"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            ))
          )}
        </svg>

        {/* Glowing orb */}
        <div
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(68,97,74,0.4) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-[1280px] mx-auto px-4 md:px-16 py-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left — text */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-8 h-px bg-heritage-green-light" />
                <span
                  className="text-xs font-semibold uppercase tracking-[4px] text-heritage-green-light"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Prime Land Projects
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold text-paper-white mb-5 leading-tight"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Own a Piece of <br />
                <span className="text-heritage-green-light">Sri Lanka</span>
              </h2>
              <p className="text-paper-white/70 leading-relaxed text-base max-w-md">
                Choose from a wide range of lands across 18 districts, tailored to suit your
                needs and preferred location. Find the perfect plot for your lifestyle or
                investment today!
              </p>
            </div>

            {/* Right — stat cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl py-6 px-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(68,97,74,0.4)' }}
                  >
                    <Icon className="w-5 h-5 text-heritage-green-light" />
                  </div>
                  <span
                    className="text-2xl font-bold text-paper-white"
                    style={{ fontFamily: 'var(--font-oswald)' }}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-paper-white/50 uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

     

      {/* ── Filter + Grid ─────────────────────────────────────────── */}
      <section
        className="relative"
        style={{
          background: `
            radial-gradient(ellipse at 10% 20%, rgba(68,97,74,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(68,97,74,0.05) 0%, transparent 50%),
            #f7f8f4
          `,
        }}
      >
        {/* Subtle corner land-survey lines */}
        <svg
          className="absolute top-0 left-0 w-48 h-48 opacity-[0.04] pointer-events-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <line x1="0" y1="0" x2="200" y2="200" stroke="#44614A" strokeWidth="1" />
          <line x1="40" y1="0" x2="200" y2="160" stroke="#44614A" strokeWidth="1" />
          <line x1="80" y1="0" x2="200" y2="120" stroke="#44614A" strokeWidth="1" />
          <line x1="0" y1="40" x2="160" y2="200" stroke="#44614A" strokeWidth="1" />
          <line x1="0" y1="80" x2="120" y2="200" stroke="#44614A" strokeWidth="1" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-48 h-48 opacity-[0.04] pointer-events-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <line x1="200" y1="0" x2="0" y2="200" stroke="#44614A" strokeWidth="1" />
          <line x1="160" y1="0" x2="0" y2="160" stroke="#44614A" strokeWidth="1" />
          <line x1="120" y1="0" x2="0" y2="120" stroke="#44614A" strokeWidth="1" />
          <line x1="200" y1="40" x2="40" y2="200" stroke="#44614A" strokeWidth="1" />
          <line x1="200" y1="80" x2="80" y2="200" stroke="#44614A" strokeWidth="1" />
        </svg>

        <div className="relative max-w-[1280px] mx-auto px-4 md:px-16 py-12">

          {/* Filter bar */}
          <div
            className="flex flex-col md:flex-row gap-3 mb-10 p-4 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(68,97,74,0.15)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}
          >
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="h-12 px-4 rounded-xl border text-sm bg-paper-white focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(68,97,74,0.25)', minWidth: '180px' }}
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input
                type="text"
                placeholder="Search by project name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border text-sm bg-paper-white focus:outline-none transition-colors"
                style={{ borderColor: 'rgba(68,97,74,0.25)' }}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 rounded-xl border text-sm bg-paper-white focus:outline-none transition-colors"
              style={{ borderColor: 'rgba(68,97,74,0.25)', minWidth: '150px' }}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min Rs."
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-24 h-12 px-3 rounded-xl border text-sm bg-paper-white focus:outline-none transition-colors"
                style={{ borderColor: 'rgba(68,97,74,0.25)' }}
              />
              <span className="text-gray-400 font-bold">-</span>
              <input
                type="number"
                placeholder="Max Rs."
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 h-12 px-3 rounded-xl border text-sm bg-paper-white focus:outline-none transition-colors"
                style={{ borderColor: 'rgba(68,97,74,0.25)' }}
              />
            </div>

            <div className="flex items-center gap-2 px-4 h-12 rounded-xl text-sm font-medium text-outline"
              style={{ background: 'rgba(68,97,74,0.06)', border: '1px solid rgba(68,97,74,0.15)' }}
            >
              <span className="w-2 h-2 rounded-full bg-heritage-green" />
              {filtered.length} Properties
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((land, idx) => (
              <div
                key={land.name}
                className="group relative rounded-2xl overflow-hidden bg-paper-white transition-all duration-300"
                style={{
                  border: '1px solid rgba(68,97,74,0.12)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  animationDelay: `${idx * 40}ms`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={land.image}
                    alt={land.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(10,26,11,0.92) 0%, rgba(10,26,11,0.3) 50%, transparent 100%)' }}
                  />

                  {/* District badge */}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    {land.district}
                  </div>

                  {/* Card content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className="text-xl font-bold text-paper-white mb-1"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      {land.name}
                    </h3>
                    <p className="text-paper-white/75 text-sm flex items-center gap-1 mb-4">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {land.location}
                    </p>

                    {/* Price row */}
                    <div
                      className="flex items-end justify-between mb-4 pb-4"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      <div>
                        <p className="text-paper-white font-bold text-lg leading-tight">
                          Rs. {land.price}
                        </p>
                        <p className="text-paper-white/60 text-xs italic">{land.unit}</p>
                      </div>
                    </div>

                    <Link
                      to={`/properties/${land.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 group/btn"
                      style={{ background: 'rgba(68,97,74,0.9)', color: '#fff', border: '1px solid rgba(186,218,190,0.3)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#44614A' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(68,97,74,0.9)' }}
                    >
                      Explore Land
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                style={{ background: 'rgba(68,97,74,0.08)' }}
              >
                <Search className="w-7 h-7 text-heritage-green" />
              </div>
              <p className="text-on-surface-variant text-lg font-medium">No lands found</p>
              <p className="text-outline text-sm mt-1">Try adjusting your search or district filter</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}