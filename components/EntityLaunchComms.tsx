'use client'

const ITEMS = [
  {
    icon: 'check' as const,
    color: '#059669',
    colorBg: 'rgba(5,150,105,0.09)',
    colorBorder: 'rgba(5,150,105,0.20)',
    text: 'Known mislabeled customers have been automatically migrated to the correct entity type — no action required.',
  },
  {
    icon: 'check' as const,
    color: '#059669',
    colorBg: 'rgba(5,150,105,0.09)',
    colorBorder: 'rgba(5,150,105,0.20)',
    text: 'No manual recreation necessary — all entity data, relationships, and history have been preserved.',
  },
  {
    icon: 'check' as const,
    color: '#059669',
    colorBg: 'rgba(5,150,105,0.09)',
    colorBorder: 'rgba(5,150,105,0.20)',
    text: 'All accounts retain full transacting ability during and after migration.',
  },
  {
    icon: 'warn' as const,
    color: '#b45309',
    colorBg: 'rgba(180,83,9,0.08)',
    colorBorder: 'rgba(180,83,9,0.22)',
    text: 'Missing compliance documents must be submitted within 30 days to maintain account standing and avoid transacting restrictions.',
  },
]

function ItemIcon({ type, color }: { type: 'check' | 'warn'; color: string }) {
  if (type === 'warn') return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M7.5 1.5L13.5 12H1.5L7.5 1.5Z" stroke={color} strokeWidth="1.1" strokeLinejoin="round" fill={`${color}14`}/>
      <line x1="7.5" y1="5.5" x2="7.5" y2="8.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="7.5" cy="10.5" r="0.6" fill={color}/>
    </svg>
  )
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="7.5" cy="7.5" r="6.5" stroke={color} strokeWidth="1" fill={`${color}12`}/>
      <path d="M4.5 7.5l2.2 2.2 3.8-4.4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function EntityLaunchComms() {
  return (
    <div
      data-reveal
      className="entity-launch-section"
      style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))',
        marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))',
        paddingRight: '80px',
        paddingTop: 80,
        paddingBottom: 80,
        background: '#ffffff',
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
          // launch comms
        </div>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.6vw, 38px)',
          fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
          color: '#111827', margin: '0 0 10px',
        }}>
          The migration message.
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 14,
          lineHeight: 1.7, color: '#5c6677', margin: 0, maxWidth: 520,
        }}>
          Delivered as an in-app notice on first login after migration. Designed to answer the question before it became a support ticket.
        </p>
      </div>

      {/* Centered modal mockup */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: 504, width: '100%',
          background: '#ffffff',
          border: '1px solid #dae1ed',
          borderRadius: 16,
          boxShadow: '0 4px 32px rgba(0,0,0,0.10), 0 1px 6px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          fontFamily: 'var(--font-inter)',
        }}>
          {/* Modal header */}
          <div style={{
            padding: '20px 24px 18px',
            borderBottom: '1px solid #dae1ed',
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              background: 'rgba(4,69,245,0.08)',
              border: '1px solid rgba(4,69,245,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0445f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                Entity migration complete
              </div>
              <div style={{ fontSize: 12, color: '#5c6677', marginTop: 3 }}>
                Changes applied to your account — here's what to know
              </div>
            </div>
            {/* Close affordance */}
            <div style={{
              marginLeft: 'auto', flexShrink: 0,
              width: 22, height: 22, borderRadius: '50%',
              background: 'rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2l6 6M8 2L2 8" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Modal body */}
          <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ITEMS.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 11,
                padding: '12px 14px',
                background: item.colorBg,
                border: `1px solid ${item.colorBorder}`,
                borderRadius: 10,
              }}>
                <ItemIcon type={item.icon} color={item.color} />
                <span style={{
                  fontSize: 12.5, lineHeight: 1.65, color: '#374151',
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Modal footer */}
          <div style={{
            padding: '0 24px 20px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <button
              disabled
              aria-hidden
              style={{
                padding: '9px 18px',
                background: '#0445f5',
                border: 'none', borderRadius: 8,
                fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600,
                color: '#ffffff', cursor: 'default',
                letterSpacing: '-0.01em',
              }}
            >
              Review my entities
            </button>
            <button
              disabled
              aria-hidden
              style={{
                padding: '9px 16px',
                background: 'transparent',
                border: '1px solid #dae1ed', borderRadius: 8,
                fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 500,
                color: '#5c6677', cursor: 'default',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .entity-launch-section {
          --entity-launch-pad: calc(80px + var(--sidebar-gap));
        }
        @media (max-width: 640px) {
          .entity-launch-section {
            padding-left: calc(24px + var(--sidebar-gap)) !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </div>
  )
}
