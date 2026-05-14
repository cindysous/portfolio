'use client'

import { CommsDetailCard, CommsModalCard } from '@/components/EntityCommsCards'

const INK = '#111827'
const MID = '#5c6677'

const WORKSTREAMS = [
  {
    team: 'Product',
    color: '#7c3aed',
    colorBg: 'rgba(124,58,237,0.08)',
    colorBorder: 'rgba(124,58,237,0.20)',
    items: [
      '“What’s coming soon” banners surfaced in-app ahead of each phase',
      'Changelog entries published with each release',
      'Scoped migration timeline communicated to clients',
    ],
  },
  {
    team: 'Engineering',
    color: '#0445f5',
    colorBg: 'rgba(4,69,245,0.07)',
    colorBorder: 'rgba(4,69,245,0.18)',
    items: [
      'Data migration scripts run on known mislabeled entities',
      'Feature flags to gate the new entity UI per client',
      'Zero-downtime switchover — all accounts retained full transacting ability',
    ],
  },
  {
    team: 'Design',
    color: '#d97706',
    colorBg: 'rgba(217,119,6,0.08)',
    colorBorder: 'rgba(217,119,6,0.20)',
    items: [
      'In-app communication templates designed for each phase',
      'Migration notice modal reviewed with client relations before launch',
      'Visual diff artifacts prepared for sales and CS to use in client calls',
    ],
  },
]

export default function EntityPhasedRollout() {
  return (
    <div
      data-reveal
      className="entity-rollout-section"
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
          // rollout
        </div>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.6vw, 38px)',
          fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
          color: INK, margin: '0 0 10px',
        }}>
          Delivering without breaking trust.
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 14,
          lineHeight: 1.7, color: MID, margin: 0, maxWidth: 560,
        }}>
          Existing clients were live and transacting. The rollout had to be invisible in its disruption — changes communicated clearly, migrations automated, and nothing broken in transit.
        </p>
      </div>

      {/* Workstream cards */}
      <div className="entity-rollout-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14,
        marginBottom: 56,
      }}>
        {WORKSTREAMS.map(ws => (
          <div key={ws.team} style={{
            padding: '22px 20px 24px',
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Team badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: ws.colorBg,
              border: `1px solid ${ws.colorBorder}`,
              borderRadius: 20, padding: '3px 10px',
              alignSelf: 'flex-start', marginBottom: 14,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: ws.color }} />
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 700,
                color: ws.color, letterSpacing: '0.05em',
              }}>
                {ws.team}
              </span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {ws.items.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: ws.color, opacity: 0.5,
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-inter)', fontSize: 12.5, lineHeight: 1.65, color: MID,
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Client communication examples — structured grid of Figma vector renders */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--warm-light)', marginBottom: 20,
        }}>
          Client communication examples
        </div>

        {/* Grid: detail card + modal top row, two inline banners below */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Row 1: detail card + modal — rendered as crisp React components */}
          <div className="entity-comms-top-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignItems: 'start' }}>
            <CommsDetailCard />
            <CommsModalCard />
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .entity-rollout-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .entity-rollout-grid { grid-template-columns: 1fr !important; }
          .entity-comms-top-row { grid-template-columns: 1fr !important; }
          .entity-rollout-section { padding-left: calc(24px + var(--sidebar-gap)) !important; padding-right: 24px !important; }
        }
      `}</style>
    </div>
  )
}
