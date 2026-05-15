'use client'

const INK = '#111827'
const MID = '#5c6677'

const CARDS = [
  {
    icon: 'shield' as const,
    tag: 'Compliance Design',
    tagColor: '#0445f5',
    tagBg: 'rgba(4,69,245,0.08)',
    headline: 'Design for the worst case.',
    body: 'Compliance officers operate under pressure. Every status needs to be instantly legible, every destructive action needs to name its consequence, and every flow needs to work when the user is stressed and time-poor.',
  },
  {
    icon: 'map' as const,
    tag: 'Information Architecture',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.08)',
    headline: 'Make relationships visible by default.',
    body: "The highest-impact decision wasn't visual — it was structural. Surfacing entity hierarchy by default, rather than burying it in a detail view, changed how users understood the entire system.",
  },
  {
    icon: 'anchor' as const,
    tag: 'Trust',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.08)',
    headline: 'A product must earn its place as source of truth.',
    body: "When users build spreadsheets and Slack threads to compensate for the UI, the product has failed. Trust isn't designed in — it's earned by being reliably, visibly correct every time.",
  },
]

function LearningIcon({ name, color }: { name: typeof CARDS[0]['icon']; color: string }) {
  if (name === 'shield') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
  if (name === 'map') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
      <line x1="8" y1="2" x2="8" y2="18"/>
      <line x1="16" y1="6" x2="16" y2="22"/>
    </svg>
  )
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    </svg>
  )
}

export default function EntityLearnings() {
  return (
    <div
      data-reveal
      className="entity-learnings-section"
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

      <div className="entity-learnings-grid" style={{
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
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: card.tagBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16, flexShrink: 0,
            }}>
              <LearningIcon name={card.icon} color={card.tagColor} />
            </div>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 9,
              fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase',
              color: card.tagColor, marginBottom: 8,
            }}>
              {card.tag}
            </div>
            <h3 style={{
              fontFamily: 'var(--font-inter)', fontSize: 16,
              fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3,
              color: INK, margin: '0 0 10px',
            }}>
              {card.headline}
            </h3>
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
          .entity-learnings-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .entity-learnings-grid { grid-template-columns: 1fr !important; }
          .entity-learnings-section { padding-left: calc(24px + var(--sidebar-gap)) !important; padding-right: 24px !important; }
        }
        @media (max-width: 767px) {
          .entity-learnings-section {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .entity-learnings-section {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
        }
      `}</style>
    </div>
  )
}
