import { MapPin, ArrowRight, Bed, Bath, Maximize, Search, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

export default function HousesPage() {
  const [searchParams] = useSearchParams()
  const [houses, setHouses] = useState([])
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
    const fetchHouses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/properties?type=house')
        setHouses(data)
      } catch (error) {
        console.error('Error fetching houses', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHouses()
  }, [])

  const filtered = houses
    .filter((h) => {
      const matchDistrict = district === 'All Districts' || h.district === district;
      const matchSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          h.location.toLowerCase().includes(searchTerm.toLowerCase());
      const priceVal = parsePrice(h.price);
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
        title="Luxury Houses"
        subtitle="Elegance & Comfort Redefined"
        backgroundImage="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2000"
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
                placeholder="Search houses..."
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
              {filtered.map((house) => (
                <div key={house.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={house.image} alt={house.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-heritage-green text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{house.status}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-heritage-green font-montserrat">{house.name}</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1 mb-4">
                      <MapPin className="w-3.5 h-3.5" />
                      {house.location}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-heritage-green" />{house.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-heritage-green" />{house.baths} Baths</span>
                      <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5 text-heritage-green" />{house.sqft}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-outline-border flex items-center justify-between">
                      <div>
                        <span className="font-montserrat text-lg font-bold text-heritage-green">{house.price} LKR</span>
                        <p className="text-xs text-on-surface-variant italic">{house.unit}</p>
                      </div>
                      <Link to={`/properties/${house.id}`} className="text-xs font-semibold uppercase tracking-wider text-heritage-green hover:underline cursor-pointer flex items-center gap-1">
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
              <p className="text-on-surface-variant text-lg">No houses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
