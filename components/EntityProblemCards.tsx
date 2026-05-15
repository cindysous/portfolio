'use client'

const INK = '#111827'
const MID = '#5c6677'

const PROBLEMS = [
  {
    icon: 'alert' as const,
    tag: 'Actor Conflation',
    tagColor: '#b45309',
    tagBg: 'rgba(180,83,9,0.07)',
    headline: 'Three actors. One broken table.',
    body: 'Clients, Customers, and Counterparties lived in one undifferentiated list — no classification, no hierarchy. Regulators require clear separation. The system couldn\'t provide it.',
  },
  {
    icon: 'signal' as const,
    tag: 'Compliance Exposure',
    tagColor: '#dc2626',
    tagBg: 'rgba(220,38,38,0.07)',
    headline: 'Wrong standards applied at scale.',
    body: 'Without entity separation, KYC/AML requirements couldn\'t be applied correctly per type. Sanctions screening had gaps that created OFAC exposure with no systematic way to address it.',
  },
  {
    icon: 'tree' as const,
    tag: 'Partnership Risk',
    tagColor: '#7c3aed',
    tagBg: 'rgba(124,58,237,0.08)',
    headline: 'Fiat access at existential risk.',
    body: 'Banking partners and payment networks require auditable entity separation as a condition of access. The old model put Conduit\'s fiat on/off-ramp relationships — core to the business — in jeopardy.',
  },
  {
    icon: 'log' as const,
    tag: 'Growth Ceiling',
    tagColor: '#059669',
    tagBg: 'rgba(5,150,105,0.08)',
    headline: 'Roadmap blocked at the model level.',
    body: 'Risk-based pricing, customer segmentation, and automated transaction limits were all downstream of entity separation. None were buildable on an undifferentiated model.',
  },
]

function ProblemIcon({ name, color }: { name: typeof PROBLEMS[0]['icon']; color: string }) {
  if (name === 'tree') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )
  if (name === 'signal') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )
  if (name === 'alert') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )
}

export default function EntityProblemCards() {
  return (
    <div
      data-reveal
      className="entity-problems-section"
      style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))',
        marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))',
        paddingRight: '80px',
        paddingTop: 80,
        paddingBottom: 80,
        background: '#fafaf8',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 44 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--warm-light)', marginBottom: 12,
        }}>
          // the problem
        </div>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.6vw, 38px)',
          fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
          color: INK, margin: '0 0 10px',
        }}>
          One table. Three incompatible actors.
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 14,
          lineHeight: 1.7, color: MID, margin: 0,
        }}>
          Getting the entity model wrong wasn&rsquo;t a UX issue — it was an existential risk.
        </p>
      </div>

      {/* 2×2 problem card grid */}
      <div className="entity-problems-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
      }}>
        {PROBLEMS.map(card => (
          <div key={card.tag} style={{
            padding: '26px 24px 28px',
            background: '#ffffff',
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
              <ProblemIcon name={card.icon} color={card.tagColor} />
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
        @media (max-width: 720px) {
          .entity-problems-grid { grid-template-columns: 1fr !important; }
          .entity-problems-section { padding-left: calc(24px + var(--sidebar-gap)) !important; padding-right: 24px !important; }
        }
        @media (max-width: 767px) {
          .entity-problems-section {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .entity-problems-section {
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
