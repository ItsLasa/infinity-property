import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { MapPin, Bed, Bath, Maximize, Share2, Heart, Phone, Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import Footer from '../components/Footer'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState([])

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/properties/${id}`)
        setProperty(data)
        
        // Fetch related properties of same type
        const { data: relatedData } = await axios.get(`http://localhost:5000/api/properties?type=${data.type}`)
        setRelated(relatedData.filter(item => item.id !== parseInt(id)).slice(0, 3))
      } catch (error) {
        console.error('Error fetching property details', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6]">
        <Loader2 className="animate-spin h-12 w-12 text-green-900" />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf6]">
        <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
        <Link to="/" className="mt-4 text-green-800 hover:underline">Back to Home</Link>
      </div>
    )
  }

  // Helper to extract src from full iframe tag if the user pasted the whole thing
  const getMapSrc = (input) => {
    if (!input) return null;
    if (input.includes('src="')) {
      const match = input.match(/src="([^"]+)"/);
      return match ? match[1] : input;
    }
    return input;
  }

  return (
    <div className="bg-[#fdfaf6] pt-24 min-h-screen">
      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-800 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                {property.status}
              </span>
              <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">
                ID: PR-{property.id}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{property.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} className="text-green-800" />
              <span className="text-lg">{property.location}, {property.district}</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Starting From</p>
            <h2 className="text-4xl font-bold text-green-900">Rs. {property.price}</h2>
            <p className="text-gray-600 text-sm mt-1">{property.unit}</p>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="grid lg:grid-cols-4 gap-4 mb-12">
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden aspect-[16/9] shadow-2xl group">
            <img 
              src={property.image} 
              alt={property.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute top-6 right-6 flex gap-3">
              <button className="bg-white/90 backdrop-blur p-3 rounded-full text-gray-900 hover:bg-white transition-all shadow-lg">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          <div className="hidden lg:grid grid-rows-3 gap-4">
            {property.images && property.images.length > 0 ? (
              property.images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden shadow-md">
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition-all duration-500 cursor-pointer" alt={`${property.name} ${idx}`} />
                </div>
              ))
            ) : (
                [1,2,3].map((_, i) => (
                    <div key={i} className="rounded-2xl bg-gray-100 animate-pulse"></div>
                ))
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Details Column */}
          <div className="lg:col-span-2">
            
            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm mb-12">
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50">
                <Bed className="text-green-800 mb-2" size={24} />
                <span className="text-xl font-bold text-gray-900">{property.beds || '-'}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50">
                <Bath className="text-green-800 mb-2" size={24} />
                <span className="text-xl font-bold text-gray-900">{property.baths || '-'}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50">
                <Maximize className="text-green-800 mb-2" size={24} />
                <span className="text-xl font-bold text-gray-900">{property.sqft}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Total Area</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50">
                <MapPin className="text-green-800 mb-2" size={24} />
                <span className="text-xl font-bold text-gray-900 capitalize">{property.type}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Property Type</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Overview</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-line">
                {property.description || `Welcome to ${property.name}, an exquisite ${property.type} development located in the heart of ${property.location}. This property represents the pinnacle of modern living.`}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {(property.amenities && property.amenities.length > 0 ? property.amenities : [
                  '24/7 Gate Security', 'Modern Floor Designs', 'High-speed Utilities', 
                  'Landscaped Gardens', 'Prime Neighborhood', 'Vested Land Title'
                ]).map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 size={18} className="text-green-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Map */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Location & Neighborhood</h3>
              {property.mapUrl ? (
                <div className="rounded-3xl overflow-hidden aspect-[16/9] shadow-inner bg-gray-100">
                    <iframe 
                      src={getMapSrc(property.mapUrl)}
                      className="w-full h-full border-0"
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Property Location"
                    ></iframe>
                </div>
              ) : (
                <div className="bg-gray-200 rounded-3xl aspect-[16/6] flex items-center justify-center overflow-hidden grayscale">
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1400" className="w-full h-full object-cover opacity-50" alt="Map Placeholder" />
                    <div className="absolute bg-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 border border-green-800/20">
                    <MapPin className="text-green-800" />
                    <span className="font-bold text-gray-900">Map Pending</span>
                    </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 bg-green-900 rounded-[2rem] text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Request Callback</h3>
              <p className="text-green-100/70 mb-8 text-sm">Our expert investment advisors are ready to help you secure this property.</p>
              
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  className="w-full h-14 px-6 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-white transition-all outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Your Phone Number" 
                  className="w-full h-14 px-6 rounded-xl bg-white/10 border border-white/20 focus:bg-white/20 focus:border-white transition-all outline-none"
                />
                <button type="submit" className="w-full h-14 bg-white text-green-900 font-bold rounded-xl hover:bg-green-50 transition-all">
                  Submit Interest
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <a href="tel:+94112699822" className="flex items-center gap-4 hover:text-green-200 transition-colors">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-green-200/50">Call Us</p>
                    <p className="font-bold">+94 112 699 822</p>
                  </div>
                </a>
                <a href="mailto:info@infinity.com" className="flex items-center gap-4 hover:text-green-200 transition-colors">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-green-200/50">Email Us</p>
                    <p className="font-bold">info@infinityproperty.lk</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Similar Options</h2>
              <p className="text-gray-600">Properties you might also be interested in.</p>
            </div>
            <Link to="/lands" className="hidden sm:flex items-center gap-2 text-green-800 font-bold hover:gap-3 transition-all">
              View All <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(item => (
              <Link to={`/properties/${item.id}`} key={item.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h4>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                    <MapPin size={14} className="text-green-800" /> {item.location}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="font-bold text-green-900">Rs. {item.price}</span>
                    <span className="text-xs uppercase font-bold tracking-tighter text-gray-400">View Detail</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
