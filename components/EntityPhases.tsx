'use client'

const INK = '#111827'
const MID = '#5c6677'

const PHASES = [
  {
    number: '01',
    label: 'Phase 1',
    title: 'Entity separation & requirements gathering',
    color: '#059669',
    colorBg: 'rgba(5,150,105,0.08)',
    colorBorder: 'rgba(5,150,105,0.18)',
    items: [
      'Separate entity types at the data model level',
      'Migrate misclassified existing entities into correct buckets',
      'Identify per-type requirements and surface gaps in each',
      'Rebuild entity UI with type-aware components',
      'Surface compliance status distinctly per entity type',
      'KYB onboarding flows for new customer entities',
    ],
  },
  {
    number: '02',
    label: 'Phase 2',
    title: 'Customer accounts & balance management',
    color: '#0445f5',
    colorBg: 'rgba(4,69,245,0.07)',
    colorBorder: 'rgba(4,69,245,0.18)',
    items: [
      'Customer account and balance management for operators',
      'Customer-of-customer hierarchical structure support',
      'Visibility into customer accounts, balances, and transactions',
      'Major UX improvements across all entity-type views',
      'Full auditability — change logs linked to the entity they describe',
      'Foundation for downstream product areas (3 built on this system)',
    ],
  },
]

export default function EntityPhases() {
  return (
    <div
      data-reveal
      className="entity-phases-section"
      style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))',
        marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))',
        paddingRight: '80px',
        paddingTop: 80,
        paddingBottom: 80,
        background: '#f7f5f2',
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
          // delivery
        </div>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.6vw, 38px)',
          fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
          color: INK, margin: '0 0 10px',
        }}>
          Two phases. One coherent system.
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 14,
          lineHeight: 1.7, color: MID, margin: 0, maxWidth: 520,
        }}>
          Product, Engineering, and Design worked in lock-step across both phases — scoping tightly, delivering incrementally, and ensuring nothing regressed between.
        </p>
      </div>

      {/* Phase cards */}
      <div className="entity-phases-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
      }}>
        {PHASES.map(phase => (
          <div key={phase.label} style={{
            padding: '28px 26px 30px',
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Phase tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: phase.colorBg,
              border: `1px solid ${phase.colorBorder}`,
              borderRadius: 20, padding: '4px 12px',
              alignSelf: 'flex-start',
              marginBottom: 18,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: phase.color, flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 10.5, fontWeight: 700,
                color: phase.color, letterSpacing: '0.04em',
              }}>
                {phase.label}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-inter)', fontSize: 17, fontWeight: 700,
              letterSpacing: '-0.02em', lineHeight: 1.25,
              color: INK, margin: '0 0 18px',
            }}>
              {phase.title}
            </h3>

            {/* Items */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {phase.items.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="6.5" cy="6.5" r="6" fill={phase.colorBg} stroke={phase.colorBorder} strokeWidth="0.75"/>
                    <path d="M3.8 6.5l2 2 3.4-3.4" stroke={phase.color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{
                    fontFamily: 'var(--font-inter)', fontSize: 13, lineHeight: 1.65, color: MID,
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .entity-phases-grid { grid-template-columns: 1fr !important; }
          .entity-phases-section { padding-left: calc(24px + var(--sidebar-gap)) !important; padding-right: 24px !important; }
        }
      `}</style>
    </div>
  )
}
