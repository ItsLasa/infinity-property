import { ArrowRight, Award, Map, Users, CheckCircle2 } from 'lucide-react'

const stats = [
  { value: '30+', label: 'Years of Trust', icon: Award },
  { value: '18', label: 'Districts Covered', icon: Map },
  { value: '300,000+', label: 'Satisfied Customers', icon: Users },
]

const highlights = [
  'Legal & financial assistance included',
  'Island-wide land portfolio',
  'Transparent pricing, no hidden fees',
  'Dedicated post-sale support',
]

export default function AboutSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1a0b 0%, #1a3d1c 45%, #0d2410 100%)' }}
    >

      {/* ── Topographic contour art ──────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1280 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{ opacity: 0.045 }}
      >
        {[60, 120, 180, 240, 300, 360, 420, 480].map((r, i) => (
          <ellipse
            key={i}
            cx="900"
            cy="350"
            rx={r + i * 30}
            ry={r * 0.55 + i * 14}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))}
        {[60, 120, 180, 240, 300].map((r, i) => (
          <ellipse
            key={`l${i}`}
            cx="160"
            cy="600"
            rx={r + i * 20}
            ry={r * 0.5 + i * 10}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* ── Survey grid — top right ───────────────────────────────── */}
      <svg
        className="absolute top-0 right-0 pointer-events-none"
        width="340"
        height="340"
        viewBox="0 0 340 340"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        {Array.from({ length: 9 }).map((_, col) =>
          Array.from({ length: 9 }).map((_, row) => (
            <rect
              key={`${col}-${row}`}
              x={col * 38}
              y={row * 38}
              width="36"
              height="36"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.6"
            />
          ))
        )}
      </svg>

      {/* ── Diagonal land-plot lines — bottom left ───────────────── */}
      <svg
        className="absolute bottom-0 left-0 pointer-events-none"
        width="260"
        height="260"
        viewBox="0 0 260 260"
        aria-hidden="true"
        style={{ opacity: 0.04 }}
      >
        {[0, 40, 80, 120, 160, 200, 240].map((offset, i) => (
          <line
            key={i}
            x1={offset}
            y1="0"
            x2="0"
            y2={offset}
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))}
        {[0, 40, 80, 120, 160, 200, 240].map((offset, i) => (
          <line
            key={`b${i}`}
            x1={260}
            y1={offset}
            x2={offset}
            y2="260"
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* ── Green glow orbs ───────────────────────────────────────── */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(68,97,74,0.35) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(68,97,74,0.2) 0%, transparent 70%)' }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative max-w-[1280px] mx-auto px-4 md:px-16 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-heritage-green-light" />
              <span
                className="text-xs font-semibold uppercase tracking-[4px] text-heritage-green-light"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                About Infinity Property
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl md:text-5xl font-bold text-paper-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Why Infinity Property <br />
              is{' '}
              <span
                className="relative inline-block"
                style={{ color: '#badabe' }}
              >
                Number One
                {/* underline accent */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0,4 Q50,0 100,4 Q150,8 200,4"
                    fill="none"
                    stroke="#badabe"
                    strokeWidth="2"
                    strokeOpacity="0.6"
                  />
                </svg>
              </span>
              ?
            </h2>

            {/* Body */}
            <p
              className="text-paper-white/70 text-base leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Everyone aspires to own a great piece of property. At Infinity Property,
              we made it our aim to turn this dream into reality — offering Sri Lanka's
              finest land alternatives alongside legal and financial support services,
              so your property journey is smooth from start to finish.
            </p>

            {/* Highlights checklist */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: '#badabe' }}
                  />
                  <span
                    className="text-sm text-paper-white/75"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA - Fixed the missing opening <a tag */}
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 group"
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: '#1a3d1c',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#badabe'
                e.currentTarget.style.color = '#0a1a0b'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.95)'
                e.currentTarget.style.color = '#1a3d1c'
              }}
            >
              Discover Our Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right — stats */}
          <div className="flex flex-col gap-5">

            {/* Large feature stat */}
            <div
              className="rounded-2xl p-8 flex items-center gap-6"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(68,97,74,0.5)', border: '1px solid rgba(186,218,190,0.2)' }}
              >
                <Users className="w-7 h-7" style={{ color: '#badabe' }} />
              </div>
              <div>
                <p
                  className="text-5xl font-bold text-paper-white leading-none mb-1"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  300,000+
                </p>
                <p
                  className="text-paper-white/60 text-sm uppercase tracking-widest"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Satisfied Customers Across Sri Lanka
                </p>
              </div>
            </div>

            {/* Two smaller stats */}
            <div className="grid grid-cols-2 gap-5">
              {stats.slice(0, 2).map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-6 text-center relative overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {/* Decorative corner dot */}
                    <div
                      className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
                      style={{ background: '#badabe', opacity: 0.5 }}
                    />
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(68,97,74,0.45)', border: '1px solid rgba(186,218,190,0.15)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#badabe' }} />
                    </div>
                    <p
                      className="text-3xl font-bold text-paper-white mb-1"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-paper-white/55 text-xs uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Thin trust bar */}
            <div
              className="rounded-xl px-6 py-4 flex items-center gap-4"
              style={{
                background: 'rgba(68,97,74,0.25)',
                border: '1px solid rgba(186,218,190,0.2)',
              }}
            >
              <div className="flex -space-x-2">
                {[51, 52, 53, 54, 55].map((id) => (
                  <img
                    key={id}
                    src={`https://ui-avatars.com/api/?name=${id}&background=44614A&color=fff&size=40&bold=true`}
                    alt="customer"
                    className="w-8 h-8 rounded-full object-cover"
                    style={{ border: '2px solid rgba(255,255,255,0.15)' }}
                  />
                ))}
              </div>
              <p
                className="text-paper-white/70 text-xs leading-snug"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Trusted by over{' '}
                <span className="text-paper-white font-semibold">300,000 Sri Lankan families</span>
                {' '}since 1994
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom wave into next section ─────────────────────────── */}
      

    </section>
  )
}