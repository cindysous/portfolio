'use client'

const INK = '#111827'
const MID = '#5c6677'

const CARDS = [
  {
    icon: 'info' as const,
    tag: 'Information Design',
    tagColor: '#0445f5',
    tagBg: 'rgba(4,69,245,0.08)',
    headline: 'More info — carefully curated.',
    body: "In high-stakes experiences — like moving large sums — users want more context, not less. But there's a precise balance: too much creates anxiety, too little erodes trust. The goal is enough to feel in control.",
  },
  {
    icon: 'chat' as const,
    tag: 'Narrative & Trust',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.08)',
    headline: 'Confidence comes from narrative.',
    body: 'Status labels tell users what\'s happening. Narrative tells them it\'s going to be OK. The "pizza tracker" pattern works because it replaces uncertainty with a sense of forward progress — even before anything fully resolves.',
  },
  {
    icon: 'zap' as const,
    tag: 'Motion & Feel',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.08)',
    headline: 'How it feels is part of the product.',
    body: 'Micro-interactions had an outsized impact on perceived reliability. Users described more confidence in payment completion after smooth state transitions — not because anything changed functionally, but because it felt right.',
  },
]

function CardIcon({ name, color }: { name: typeof CARDS[0]['icon']; color: string }) {
  if (name === 'info') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="8" x2="12" y2="8.01"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
    </svg>
  )
  if (name === 'chat') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}

export default function TransactionLearnings() {
  return (
    <div
      data-reveal
      className="learnings-section"
      style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))',
        marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))',
        paddingRight: '80px',
        paddingTop: 80,
        paddingBottom: 96,
        background: '#ffffff',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 44 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--warm-light)', marginBottom: 14,
        }}>
          // what i learned
        </div>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(26px, 3vw, 40px)',
          fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
          color: INK, margin: 0,
        }}>
          Lessons that reshaped my thinking.
        </h2>
      </div>

      {/* 3-column card grid */}
      <div className="learnings-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 18,
      }}>
        {CARDS.map(card => (
          <div key={card.tag} style={{
            padding: '26px 24px 28px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Icon badge */}
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: card.tagBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16, flexShrink: 0,
            }}>
              <CardIcon name={card.icon} color={card.tagColor} />
            </div>
            {/* Category tag */}
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 9,
              fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase',
              color: card.tagColor, marginBottom: 8,
            }}>
              {card.tag}
            </div>
            {/* Headline */}
            <h3 style={{
              fontFamily: 'var(--font-inter)', fontSize: 16,
              fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3,
              color: INK, margin: '0 0 10px',
            }}>
              {card.headline}
            </h3>
            {/* Body */}
            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: 13,
              lineHeight: 1.72, color: MID, margin: 0,
            }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .learnings-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .learnings-grid { grid-template-columns: 1fr !important; }
          .learnings-section { padding-left: calc(24px + var(--sidebar-gap)) !important; padding-right: 24px !important; }
        }
      `}</style>
    </div>
  )
}
