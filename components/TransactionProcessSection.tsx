'use client'

import ProcessCarousel from '@/components/ProcessCarousel'

const STEPS = [
  { num: '01', title: 'Name the issue',        desc: 'Plain language — "Payment is delayed"' },
  { num: '02', title: 'Give a reason',          desc: 'When available — "Flagged for compliance review"' },
  { num: '03', title: 'Show next steps',        desc: 'Self-serve options before any support contact' },
  { num: '04', title: 'Surface contact last',   desc: 'Only after contextual options exhausted' },
]

export default function TransactionProcessSection() {
  return (
    <div
      data-reveal
      className="tx-process-section"
      style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))',
        marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))',
        paddingRight: '80px',
        paddingTop: 80,
        paddingBottom: 80,
        background: '#ffffff',
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--warm-light)', marginBottom: 12,
        }}>
          // my process
        </div>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.6vw, 38px)',
          fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
          color: 'var(--ink)', margin: '0 0 10px',
        }}>
          Missing narrative, not missing data.
        </h2>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 14,
          lineHeight: 1.7, color: 'var(--warm-mid)', margin: 0,
        }}>
          Less abandonment. More trust.
        </p>
      </div>

      {/* 4-column step grid — full width */}
      <div className="tx-process-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid var(--border)',
        marginBottom: 56,
      }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{
            padding: '28px 24px 32px',
            borderRight: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(4,69,245,0.06)',
              border: '1px solid rgba(4,69,245,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
            }}>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 10,
                fontWeight: 700, color: '#0445f5', letterSpacing: '0.02em',
              }}>{step.num}</span>
            </div>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 14,
              fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.25,
              color: 'var(--ink)', marginBottom: 6,
            }}>
              {step.title}
            </div>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 13,
              lineHeight: 1.65, color: 'var(--warm-mid)',
            }}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Process carousel — negative margins escape section padding */}
      <ProcessCarousel />

      <style>{`
        @media (max-width: 720px) {
          .tx-process-grid { grid-template-columns: 1fr 1fr !important; }
          .tx-process-section { padding-left: calc(24px + var(--sidebar-gap)) !important; padding-right: 24px !important; }
        }
        @media (max-width: 480px) {
          .tx-process-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .tx-process-section {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .tx-process-section {
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
