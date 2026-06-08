import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function PageHero({ title, description, bgImage, breadcrumb }) {
  return (
    <section className="relative pt-16">
      <div
        className="relative h-64 md:h-100 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center px-4">
          <h1 className="font-montserrat text-3xl md:text-5xl font-bold text-paper-white mb-3 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-paper-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 -mt-0">
        <nav className="flex items-center gap-2 py-3 text-sm">
          <Link to="/" className="flex items-center gap-1 text-heritage-green hover:underline">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <span className="text-on-surface-variant">{'>'}</span>
          <span className="text-on-surface font-medium">{breadcrumb || title}</span>
        </nav>
      </div>
    </section>
  )
}
