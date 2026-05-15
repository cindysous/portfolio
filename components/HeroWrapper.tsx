'use client'

import Link from 'next/link'

const METRICS = [
  { num: '10+', label: 'years experience' },
  { num: '2×',  label: 'first design hire' },
  { num: 'B2B', label: 'fintech' },
  { num: 'B2C', label: 'healthtech' },
]

const BAR_HEIGHTS = ['100%','60%','90%','40%','100%','70%','50%','100%','80%','40%','100%','65%']

export default function HeroWrapper() {
  return (
    <section
      id="hero"
      className="relative"
      style={{
        minHeight: 'calc(100vh - 72px)',
        paddingTop: 0,
        display: 'grid',
        gridTemplateColumns: '1fr',
        background: 'var(--hero-bg)',
        backgroundImage: `
          linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
          linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }}
    >
      {/* ── LEFT ───────────────────────────────────────────── */}
      <div
        className="flex flex-col justify-center relative z-10"
        style={{ padding: '52px 64px 48px var(--sidebar-gap)' }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-5"
          style={{
            opacity: 0, animation: 'fadeUp 0.6s 0.1s ease forwards',
          }}
        >
          <span style={{ display: 'block', width: 28, height: 2, background: 'var(--blush)' }} />
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blush)' }}>
            Principal Product Designer
          </span>
        </div>

        {/* Name */}
        <h1
          className="hero-name"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(52px, 7.5vw, 120px)',
            whiteSpace: 'nowrap',
            fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.04em',
            color: 'var(--hero-ink)', marginBottom: 24,
            opacity: 0, animation: 'fadeUp 0.7s 0.2s ease forwards',
          }}
        >
          Cindy Sous
        </h1>

        {/* Bio */}
        <p
          style={{
            maxWidth: 560, fontSize: 16, lineHeight: 1.65, color: 'var(--hero-ink-muted)', marginBottom: 28,
            opacity: 0, animation: 'fadeUp 0.6s 0.35s ease forwards',
          }}
        >
          I turn complicated product problems into systems people can trust —
          compliance flows, payment UX, shift tools for nurses at 5am.{' '}
          <strong style={{ color: 'var(--hero-ink)', fontWeight: 600 }}>Details matter. Foundations more.</strong>
        </p>

        {/* CTAs */}
        <div
          className="flex gap-3 items-center"
          style={{ opacity: 0, animation: 'fadeUp 0.6s 0.45s ease forwards' }}
        >
          <Link href="/#featured-work" className="btn-fill">View Work →</Link>
          <Link href="/#about" className="btn-outline">About Me</Link>
        </div>

        {/* Metrics */}
        <div
          className="flex flex-wrap gap-x-6 gap-y-2 mt-8 pt-6"
          style={{
            borderTop: '1px solid var(--border)',
            opacity: 0, animation: 'fadeUp 0.6s 0.55s ease forwards',
          }}
        >
          {METRICS.map((m, i) => (
            <span key={m.label} style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600,
                color: 'var(--hero-ink)', letterSpacing: '-0.01em',
              }}>
                {m.num}
              </span>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 400,
                color: 'var(--hero-ink-muted)',
              }}>
                {m.label}
              </span>
              {i < METRICS.length - 1 && (
                <span style={{ color: 'var(--border)', marginLeft: 2, fontWeight: 300, fontSize: 13 }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
