import { Shield, Award, Headphones, FileCheck } from 'lucide-react'

const trustItems = [
  {
    icon: Shield,
    title: 'Legal Assurance',
    description: 'All properties come with clear deeds and legal verification for your peace of mind.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized as the number one real estate company in Sri Lanka for excellence.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer support team available around the clock to assist you.',
  },
  {
    icon: FileCheck,
    title: 'Bank Financing',
    description: 'Easy bank loan arrangements with major banks and financial institutions.',
  },
]

export default function TrustSection() {
  return (
    <section className="bg-paper-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-heritage-green mb-2 block">
            Why Choose Us
          </span>
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            With 30 years of experience and over 300,000 satisfied customers,
            Infinity Property is the most trusted name in Sri Lankan real estate.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="text-center p-6 rounded-lg border border-outline-border bg-paper-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow"
              >
                <div className="w-14 h-14 bg-heritage-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-heritage-green" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold text-on-surface mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
