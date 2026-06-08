import { MapPin, Phone, Mail, Clock, Globe, Send, MessageCircle, Home as HomeIcon, Building, Building2, Key, Landmark, TreePine, Map as MapIcon, Warehouse, Compass, Ruler, Banknote, Shield, Layers } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import PageHero from '../components/PageHero'
import Footer from '../components/Footer'

const districts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale',
  'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Kurunegala', 'Anuradhapura', 'Kegalle', 'Ratnapura',
]

const propertyTypes = ['Land', 'House', 'Apartment', 'Commercial', 'Investment']

const vectorLayout = [
  { Icon: HomeIcon, x: '4%', y: '5%', size: 50, rotate: -14 },
  { Icon: Building2, x: '82%', y: '3%', size: 42, rotate: 9 },
  { Icon: Key, x: '10%', y: '50%', size: 34, rotate: -22 },
  { Icon: Landmark, x: '70%', y: '38%', size: 46, rotate: 11 },
  { Icon: TreePine, x: '88%', y: '58%', size: 38, rotate: -6 },
  { Icon: Building, x: '3%', y: '82%', size: 38, rotate: 16 },
  { Icon: Layers, x: '52%', y: '84%', size: 32, rotate: -9 },
  { Icon: Warehouse, x: '32%', y: '8%', size: 40, rotate: 7 },
  { Icon: Compass, x: '93%', y: '84%', size: 36, rotate: -18 },
  { Icon: Ruler, x: '42%', y: '4%', size: 30, rotate: 32 },
  { Icon: Banknote, x: '16%', y: '28%', size: 28, rotate: 5 },
  { Icon: Shield, x: '75%', y: '72%', size: 30, rotate: -11 },
  { Icon: MapIcon, x: '60%', y: '10%', size: 34, rotate: 14 },
  { Icon: HomeIcon, x: '50%', y: '62%', size: 26, rotate: -8 },
]

function VectorBg({ opacity = 0.08, className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none ${className}`}>
      {vectorLayout.map(({ Icon, x, y, size, rotate }, i) => (
        <Icon
          key={i}
          className="text-emerald-800 absolute"
          style={{
            left: x,
            top: y,
            width: size,
            height: size,
            opacity,
            transform: `rotate(${rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}

const heroVectorIcons = [
  { Icon: HomeIcon, x: '70%', y: '15%', size: 64, rotate: -10, opacity: 0.09 },
  { Icon: Building2, x: '82%', y: '35%', size: 52, rotate: 8, opacity: 0.11 },
  { Icon: Key, x: '92%', y: '20%', size: 40, rotate: -18, opacity: 0.07 },
  { Icon: Landmark, x: '75%', y: '60%', size: 48, rotate: 12, opacity: 0.09 },
  { Icon: TreePine, x: '60%', y: '70%', size: 36, rotate: -5, opacity: 0.07 },
  { Icon: Building, x: '88%', y: '65%', size: 44, rotate: 15, opacity: 0.11 },
  { Icon: Warehouse, x: '65%', y: '40%', size: 38, rotate: 6, opacity: 0.09 },
  { Icon: Compass, x: '55%', y: '10%', size: 32, rotate: -20, opacity: 0.07 },
]

const mapVectorIcons = [
  { Icon: MapIcon, x: '5%', y: '8%', size: 36, rotate: -10 },
  { Icon: Compass, x: '88%', y: '15%', size: 32, rotate: 12 },
  { Icon: Landmark, x: '8%', y: '75%', size: 30, rotate: 8 },
  { Icon: Building2, x: '85%', y: '70%', size: 28, rotate: -14 },
  { Icon: HomeIcon, x: '50%', y: '85%', size: 24, rotate: 6 },
  { Icon: Key, x: '92%', y: '45%', size: 26, rotate: -22 },
]

function MapVectorBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {mapVectorIcons.map(({ Icon, x, y, size, rotate }, i) => (
        <Icon
          key={i}
          className="text-emerald-800 absolute"
          style={{
            left: x,
            top: y,
            width: size,
            height: size,
            opacity: 0.07,
            transform: `rotate(${rotate}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', district: '', propertyType: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) errs.email = 'Email is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    
    try {
      await axios.post('http://localhost:5000/api/inquiries', formData)
      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', district: '', propertyType: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      alert('Failed to send inquiry. Please try again.')
    }
  }

  const inputClass = (field) =>
    `w-full px-3 py-2.5 text-sm bg-white border rounded-lg outline-none transition-colors
    font-sans text-gray-800 placeholder-gray-400
    ${errors[field] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-emerald-700'}
    focus:ring-2 focus:ring-emerald-700/10`

  return (
    <div className="min-h-screen bg-surface">
      <PageHero
        title=""
        bgImage="https://plcms.primelands.lk/images/210813160841inner_top_bg.jpg"
      />

      {/* Hero banner */}
      <section className="bg-[#1a3a2a] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full border-[40px] border-white/5 translate-x-12 -translate-y-12" />
        <div className="absolute right-16 bottom-0 w-40 h-40 rounded-full border-[24px] border-white/4 translate-y-10" />
        {heroVectorIcons.map(({ Icon, x, y, size, rotate, opacity }, i) => (
          <Icon
            key={i}
            className="text-white absolute pointer-events-none select-none"
            style={{ left: x, top: y, width: size, height: size, opacity, transform: `rotate(${rotate}deg)` }}
          />
        ))}
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-14 relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-emerald-300 text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            <MapPin className="w-3 h-3" /> Infinity Property
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            Get in touch<br className="hidden sm:block" /> with us
          </h2>
          <p className="text-white/55 text-base max-w-md leading-relaxed">
            We're here to help you find the perfect property. Reach out by phone, WhatsApp, or fill in the form and we'll respond promptly.
          </p>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-[#2d5a3e] ">
        <div className="max-w-[1280px]  mx-auto px-4 md:px-16 py-3.5 flex flex-wrap gap-6 items-center">
          {[
            { icon: Clock, text: 'Mon–Sun, 8:30 AM – 8:00 PM' },
            { icon: MapPin, text: 'Kundasale, Kandy, Sri Lanka' },
            { icon: Globe, text: 'www.infinitypropertylk.com' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/80 text-sm">
              <Icon className="w-4 h-4 text-emerald-400" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Main content: contacts + form */}
      <section className="bg-white relative overflow-hidden">
        <VectorBg />
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-0 relative z-10">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            {/* Left: contact info */}
            <div className="py-12 lg:pr-12">
              <p className="text-[14px]  uppercase text-gray-600 font-semibold mb-5 flex items-center gap-3 after:flex-1 after:h-px after:bg-gray-100">
               Our  Contact  Deatils :
              </p>

              <div className="space-y-2.5">
                {/* Address */}
                <div className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Address</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      No.15/I/C, 2nd Floor, Edirisinghe Tower,<br />
                      New Digana Road, Kundasale, Kandy
                    </p>
                  </div>
                </div>

                {/* General phone */}
                <a  className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl hover:border-emerald-700/40 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Tel Phone</p>
                    <p className="text-sm text-gray-700 group-hover:text-emerald-800 transition-colors">0774 152 525</p>
                                        <p className="text-sm text-gray-700 group-hover:text-emerald-800 transition-colors">0775 559 422</p>

                  </div>
                </a>

                {/* Hotline */}
                <a href="tel:+94112030890" className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl hover:border-emerald-700/40 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">WhatsApp</p>
                    <p className="text-sm text-gray-700 group-hover:text-emerald-800 transition-colors">0777 851 589</p>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:infinitypropertydevelopers@gmail.com" className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl hover:border-emerald-700/40 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Email</p>
                    <p className="text-sm text-gray-700 group-hover:text-emerald-800 transition-colors leading-relaxed">
                      infinitypropertydevelopers@gmail.com<br />
                      sales.infinityproperty@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              {/* Direct contact */}
              {/* <p className="text-[10px] tracking-[0.12em]  uppercase text-gray-400 mt-8 mb-4 flex items-center gap-3 before:flex-1 before:h-px before:bg-gray-100 after:flex-1 after:h-px after:bg-gray-100">
                Direct contact
              </p> */}

              {/* <div className="grid grid-cols-2 gap-2.5">
                <div className="p-4 border border-gray-100 rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5">Phone</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    0774 152 525<br />0775 559 422
                  </p>
                </div>
                <div className="p-4 border border-gray-100 rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <MessageCircle className="w-3 h-3 text-emerald-700" /> WhatsApp
                  </p>
                  <p className="text-sm text-gray-700">0777 851 589</p>
                </div>
              </div> */}
            </div>

            {/* Right: inquiry form */}
            <div className="py-13 lg:p-12 bg-gray-100 mt-10 mb-4 rounded-xl">
              <p className="text-[15px] tracking-[0.12em] uppercase text-gray-400 mb-5 flex items-center gap-3 after:flex-1 after:h-px after:bg-gray-100">
                Send an inquiry
              </p>

              <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-1">How can we help?</h3>
              <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                Fill in the form and a property advisor will respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                      Full name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} placeholder="Your name"
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">Phone number</label>
                    <input
                      type="tel" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="+94 7X XXX XXXX"
                      className={inputClass('phone')}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                    Email address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="you@example.com"
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">District</label>
                    <select name="district" value={formData.district} onChange={handleChange} className={inputClass('district')}>
                      <option value="">Select district</option>
                      {districts.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">Property interest</label>
                    <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={inputClass('propertyType')}>
                      <option value="">Select type</option>
                      {propertyTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">Your message</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    rows={4} placeholder="Tell us about your requirements — budget, location, timeline…"
                    className={inputClass('message')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#1a3a2a] hover:bg-[#2d5a3e] text-white text-sm font-medium py-3 rounded-lg transition-colors active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" /> Send inquiry
                </button>
              </form>

              {submitted && (
                <div className="mt-4 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-800">
                  <span className="text-lg leading-none mt-0.5">✓</span>
                  <p>Thank you! Your inquiry has been sent. We'll be in touch within 24 hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white border-t border-gray-100 relative overflow-hidden">
        <MapVectorBg />
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 relative z-10">
          <p className="text-[14px] tracking-[0.12em] uppercase text-gray-400 mb-5 flex items-center gap-3 after:flex-1 after:h-px after:bg-gray-100">
            Find us on the map
          </p>
          <div className="rounded-2xl overflow-hidden border border-gray-100 h-72">
            <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d297.9198554816975!2d80.67876911396088!3d7.279020680894111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae36700498c3a9f%3A0xa0131e5219fe80ca!2sEdirisinghe%20Homes%20Pvt%20(Ltd)!5e1!3m2!1sen!2slk!4v1780894556672!5m2!1sen!2slk"              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="Infinity Property Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}