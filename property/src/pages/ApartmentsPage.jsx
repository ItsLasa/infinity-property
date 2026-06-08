import { MapPin, ArrowRight, Bed, Bath, Maximize, Search, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

export default function ApartmentsPage() {
  const [searchParams] = useSearchParams()
  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [district, setDistrict] = useState(searchParams.get('district') || 'All Districts')
  const [sortBy, setSortBy] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.toString().replace(/,/g, ''));
  }

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/properties?type=apartment')
        setApartments(data)
      } catch (error) {
        console.error('Error fetching apartments', error)
      } finally {
        setLoading(false)
      }
    }
    fetchApartments()
  }, [])

  const filtered = apartments
    .filter((a) => {
      const matchDistrict = district === 'All Districts' || a.district === district;
      const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.location.toLowerCase().includes(searchTerm.toLowerCase());
      const priceVal = parsePrice(a.price);
      const matchMin = minPrice === '' || priceVal >= parseFloat(minPrice);
      const matchMax = maxPrice === '' || priceVal <= parseFloat(maxPrice);
      return matchDistrict && matchSearch && matchMin && matchMax;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return parsePrice(a.price) - parsePrice(b.price);
      if (sortBy === 'price-high') return parsePrice(b.price) - parsePrice(a.price);
      return b.id - a.id;
    });

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        title="Modern Apartments"
        subtitle="Urban Living at its Finest"
        backgroundImage="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          
          {/* Enhanced Filter Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row gap-4 items-center">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="h-12 px-4 rounded-xl border border-slate-200 text-sm focus:border-heritage-green outline-none bg-white font-medium text-slate-700 w-full md:w-auto"
            >
              {[
                'All Districts', 'Colombo', 'Gampaha', 'Kalutara', 'Kandy',
                'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
                'Kurunegala', 'Anuradhapura', 'Kegalle', 'Ratnapura',
              ].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search apartments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-heritage-green outline-none text-sm transition-all"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 rounded-xl border border-slate-200 text-sm focus:border-heritage-green outline-none bg-white font-medium text-slate-700"
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
                className="w-28 h-12 px-3 rounded-xl border border-slate-200 text-sm focus:border-heritage-green outline-none"
              />
              <span className="text-slate-300">-</span>
              <input
                type="number"
                placeholder="Max Rs."
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-28 h-12 px-3 rounded-xl border border-slate-200 text-sm focus:border-heritage-green outline-none"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin h-10 w-10 text-heritage-green" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((apt) => (
                <div key={apt.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={apt.image} alt={apt.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-heritage-green text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{apt.status}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-heritage-green font-montserrat">{apt.name}</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1 mb-4">
                      <MapPin className="w-3.5 h-3.5" />
                      {apt.location}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-heritage-green" />{apt.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-heritage-green" />{apt.baths} Baths</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5 text-heritage-green" />{apt.sqft}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-outline-border flex items-center justify-between">
                      <div>
                        <span className="font-montserrat text-lg font-bold text-heritage-green">{apt.price} LKR</span>
                        <p className="text-xs text-on-surface-variant italic">{apt.unit}</p>
                      </div>
                      <Link to={`/properties/${apt.id}`} className="text-xs font-semibold uppercase tracking-wider text-heritage-green hover:underline cursor-pointer flex items-center gap-1">
                        View Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-on-surface-variant text-lg">No apartments found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
