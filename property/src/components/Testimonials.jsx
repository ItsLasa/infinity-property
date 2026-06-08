import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function YourPage() {
  return<section className="w-full bg-soft-beige py-16 px-6 md:px-12">
  {/* Section Header */}
  <div className="max-w-[1400px] mx-auto mb-12">
    <div className="flex flex-col items-center text-center gap-4">

      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        <span className="block w-8 h-px bg-heritage-green" />
        <span
          className="text-xs font-semibold uppercase tracking-[4px] text-heritage-green"
          style={{ fontFamily: 'var(--font-oswald)' }}
        >
          Client Testimonials
        </span>
        <span className="block w-8 h-px bg-heritage-green" />
      </div>

      {/* Main Heading */}
      <h2
        className="text-4xl md:text-5xl font-bold text-on-surface leading-tight"
        style={{ fontFamily: 'var(--font-oswald)' }}
      >
        What Our <span className="text-heritage-green">Clients</span> Say
      </h2>

      {/* Subheading */}
      <p
        className="max-w-xl text-base text-outline leading-relaxed"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Real experiences from real people across Sri Lanka — families, investors,
        and businesses who found their perfect property with us.
      </p>

      {/* Star Rating Summary */}
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-heritage-green fill-heritage-green"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span
          className="text-sm font-semibold text-on-surface"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          4.9 / 5.0
        </span>
        <span
          className="text-sm text-outline"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          from 200+ verified clients
        </span>
      </div>

    </div>
  </div>

  {/* Testimonials Carousel */}
  <StaggerTestimonials />
</section>
  
}