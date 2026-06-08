import { MapPin, ArrowRight, Bed, Bath, Maximize, Search, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

const districts = ['All Districts', 'Colombo', 'Gampaha']

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

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

  const filtered = apartments.filter((apt) => {
    const matchDistrict = selectedDistrict === 'All Districts' || apt.district === selectedDistrict
    const matchSearch = apt.name.toLowerCase().includes(searchTerm.toLowerCase()) || apt.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchDistrict && matchSearch
  })

  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        title="Apartments"
        description="Discover premium apartments in prime locations with modern amenities and exceptional value."
        bgImage="https://plcms.primelands.lk/images/260605120632Yolo_PL_Home_Slider_Desktop__1920x1080.webp"
      />

      <section className="bg-heritage-green relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-12">
          <div className="max-w-2xl">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-paper-white mb-4">
              Featured Apartments
            </h2>
            <p className="text-paper-white/80 leading-relaxed">
              Experience modern living with our curated selection of apartments. From compact studios to spacious penthouses, find your ideal urban home in Sri Lanka's most vibrant neighborhoods.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft-beige">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-8">
          <div className="flex flex-col md:flex-row gap-3 mb-8">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="h-12 px-4 rounded border border-outline-border text-sm bg-paper-white focus:border-heritage-green focus:outline-none transition-colors"
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search by project name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded border border-outline-border text-sm bg-paper-white focus:border-heritage-green focus:outline-none transition-colors"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="animate-spin h-12 w-12 text-heritage-green" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((apt) => {
              const statusColor =
                apt.status === 'Hot Offer' ? 'bg-signal-red' : apt.status === 'New Launch' ? 'bg-heritage-green' : 'bg-heritage-green-dark'
              return (
                <div key={apt.name} className="group border border-outline-border rounded-lg overflow-hidden bg-paper-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={apt.image} alt={apt.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute top-3 left-3 ${statusColor} text-paper-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-montserrat text-xl font-semibold text-on-surface mb-1">{apt.name}</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1 mb-4">
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
                      <span className="text-xs font-semibold uppercase tracking-wider text-heritage-green hover:underline cursor-pointer flex items-center gap-1">
                        View Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          )}

          {filtered.length === 0 && (
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
