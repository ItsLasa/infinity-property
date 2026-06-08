import { Phone, Mail, MapPin, Globe } from 'lucide-react'
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa'

const footerLinks = {
  'Quick Links': [
    'Home', 'Lands', 'Houses', 'Apartments',
  ],
  'Company': [
    'About Us', 'Services', 'Blogs',
  ],
  'Support': [
    'Contact Us', 'Sell Your Land',
  ],
}

const socialLinks = [
  { icon: FaFacebook, label: 'Facebook', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
  { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FaInstagram, label: 'Instagram', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-heritage-green-dark mt-10 text-paper-white" id="contact">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center  gap-2 -mt-4 ">
              <img src='logo.png' width={180} height={100} />

            </div>
            <p className="text-paper-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              The best lands & houses for sale in Sri Lanka with all the facilities &
              amenities by Infinity Property, one of the top real estate companies.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+94112699822"
                className="flex items-center gap-2 text-sm text-paper-white/70 hover:text-paper-white transition-colors"
              >
                <Phone className="w-4 h-4 text-heritage-green-light" />
                +94 112 333333
              </a>
              <a
                href="mailto:info@Infinitypropertylk"
                className="flex items-center gap-2 text-sm text-paper-white/70 hover:text-paper-white transition-colors"
              >
                <Mail className="w-4 h-4 text-heritage-green-light" />
                info@Infinitypropertylk
              </a>
              <div className="flex items-start gap-2 text-sm text-paper-white/70">
                <MapPin className="w-4 h-4 text-heritage-green-light mt-0.5 shrink-0" />
                No.15/I/C, 2nd Floor, Edirisinghe Tower,New Digana Road, Kundasale, Kandy
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-montserrat font-semibold text-sm uppercase tracking-wider mb-4 text-heritage-green-light">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-paper-white/60 hover:text-paper-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-paper-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-paper-white/40">
            &copy; {new Date().getFullYear()} Infinity Property (Pvt) Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-paper-white/10 flex items-center justify-center hover:bg-heritage-green transition-all duration-300 text-paper-white hover:text-paper-white hover:scale-110 group"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-125" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
