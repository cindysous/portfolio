'use client'

import { useState, useEffect } from 'react'

const C = {
  bg:     '#1a1614',
  ink:    'rgba(245,243,239,0.92)',
  muted:  'rgba(220,215,208,0.60)',
  subtle: 'rgba(220,215,208,0.32)',
  border: 'rgba(255,255,255,0.08)',
  dot:    'rgba(125,79,62,0.65)',
}

const OUTCOMES = [
  {
    num: '01',
    label: 'Compliance Foundation',
    paragraph: false,
    items: [
      'Correct KYC/AML standards applied per entity type — no manual intervention required',
      'Clear audit trail answers "who authorized this payment?" for every transaction',
      'Sanctions screening applied consistently — OFAC exposure addressed at the process level',
      'Regulators can audit the entity model and find a defensible structure',
    ],
  },
  {
    num: '02',
    label: 'Operational Scalability',
    paragraph: false,
    items: [
      'Clients can manage hundreds or thousands of Customers with filtering, search, and bulk operations',
      'Dedicated interfaces prevent UI confusion as client portfolios scale',
      'Database queries optimized independently per entity type — no performance degradation from mixed use cases',
    ],
  },
  {
    num: '03',
    label: 'Foundation for Future Capability',
    paragraph: true,
    items: [
      'Properly separated entities unlocked a previously blocked roadmap: risk-based pricing, Customer segmentation, automated transaction limits, and enhanced reporting. None were buildable on the old undifferentiated model.',
    ],
  },
]

const SCREENSHOTS = [
  { src: '/images/entity-outcomes-1.png', alt: 'Virtual accounts interface' },
  { src: '/images/entity-outcomes-2.png', alt: 'Entity management view' },
  { src: '/images/entity-outcomes-3.png', alt: 'Customer management interface' },
  { src: '/images/entity-outcomes-4.png', alt: 'Counterparty management' },
  { src: '/images/entity-outcomes-5.png', alt: 'Entity detail view' },
  { src: '/images/entity-outcomes-6.png', alt: 'Transaction authorization trail' },
]

export default function EntityOutcomes() {
  const [lightbox, setLightbox]   = useState<string | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <>
    <div
      data-reveal
      className="entity-outcomes-section"
      style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))',
        marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))',
        paddingRight: '80px',
        paddingTop: 80,
        paddingBottom: 80,
        background: C.bg,
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 52 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: C.subtle, marginBottom: 12,
        }}>
          // outcomes
        </div>
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(24px, 2.6vw, 38px)',
          fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
          color: C.ink, margin: 0,
        }}>
          Outcomes
        </h2>
      </div>

      {/* Three outcome columns */}
      <div
        className="entity-outcomes-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0 48px',
          marginBottom: 64,
          paddingBottom: 64,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {OUTCOMES.map(o => (
          <div key={o.num}>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 9,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: C.subtle, marginBottom: 10,
            }}>
              {o.num}
            </div>
            <h3 style={{
              fontFamily: 'var(--font-inter)', fontSize: 15,
              fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25,
              color: C.ink, margin: '0 0 16px',
            }}>
              {o.label}
            </h3>

            {o.paragraph ? (
              <p style={{
                fontFamily: 'var(--font-inter)', fontSize: 13,
                lineHeight: 1.72, color: C.muted, margin: 0,
              }}>
                {o.items[0]}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {o.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: C.dot, flexShrink: 0, marginTop: 8,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-inter)', fontSize: 13,
                      lineHeight: 1.72, color: C.muted,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Screenshot carousel */}
      <div>

        {/* Arrows flanking the slide viewport */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

          {/* Left arrow */}
          <button
            onClick={() => setActiveSlide(a => Math.max(0, a - 1))}
            disabled={activeSlide === 0}
            aria-label="Previous"
            style={{
              flexShrink: 0,
              width: 40, height: 40, borderRadius: '50%', padding: 0,
              background: activeSlide === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.13)',
              border: `1px solid ${activeSlide === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.30)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: activeSlide === 0 ? 0.25 : 1,
              transition: 'opacity 0.15s, background 0.15s, border-color 0.15s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 9 9" fill="none">
              <path d="M6 1.5L3 4.5L6 7.5" stroke="rgba(245,243,239,0.95)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Slide viewport */}
          <div style={{ flex: 1, overflow: 'hidden', borderRadius: 14, border: `1px solid ${C.border}` }}>
            <div style={{
              display: 'flex',
              transform: `translateX(${-activeSlide * 100}%)`,
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              {SCREENSHOTS.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setLightbox(s.src)}
                  aria-label={`Expand: ${s.alt}`}
                  style={{
                    flexShrink: 0, width: '100%', display: 'block',
                    padding: 0, background: 'none', border: 'none',
                    cursor: 'zoom-in',
                    opacity: i === activeSlide ? 1 : 0.4,
                    transition: 'opacity 0.35s ease',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={s.alt}
                    style={{ width: '100%', display: 'block', pointerEvents: 'none' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => setActiveSlide(a => Math.min(SCREENSHOTS.length - 1, a + 1))}
            disabled={activeSlide === SCREENSHOTS.length - 1}
            aria-label="Next"
            style={{
              flexShrink: 0,
              width: 40, height: 40, borderRadius: '50%', padding: 0,
              background: activeSlide === SCREENSHOTS.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.13)',
              border: `1px solid ${activeSlide === SCREENSHOTS.length - 1 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.30)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: activeSlide === SCREENSHOTS.length - 1 ? 0.25 : 1,
              transition: 'opacity 0.15s, background 0.15s, border-color 0.15s',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 9 9" fill="none">
              <path d="M3 1.5L6 4.5L3 7.5" stroke="rgba(245,243,239,0.95)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        </div>

        {/* Below: slide label + dot indicators */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 14, paddingLeft: 52, paddingRight: 52,
        }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: 9,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: C.subtle,
          }}>
            {SCREENSHOTS[activeSlide].alt}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === activeSlide ? 20 : 6, height: 6,
                  borderRadius: 3, padding: 0, border: 'none',
                  background: i === activeSlide ? 'rgba(245,243,239,0.75)' : C.border,
                  transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.18s ease',
                }}
              />
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .entity-outcomes-grid {
            grid-template-columns: 1fr !important;
            gap: 40px 0 !important;
          }
          .entity-outcomes-section {
            padding-left: calc(24px + var(--sidebar-gap)) !important;
            padding-right: 24px !important;
          }
        }
        @media (max-width: 767px) {
          .entity-outcomes-section {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .entity-outcomes-section {
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
        }
      `}</style>
    </div>

    {/* Lightbox */}
    {lightbox && (
      <div
        onClick={() => setLightbox(null)}
        style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(6,10,18,0.92)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40,
        }}
      >
        {/* Esc hint */}
        <div style={{
          position: 'absolute', top: 20, right: 24,
          display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none',
        }}>
          <kbd style={{
            fontFamily: 'var(--font-inter)', fontSize: 10,
            padding: '4px 8px', borderRadius: 5,
            border: '1px solid rgba(255,255,255,0.22)',
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(220,228,240,0.60)',
          }}>Esc</kbd>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(220,228,240,0.35)' }}>to close</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lightbox}
          alt=""
          onClick={e => e.stopPropagation()}
          style={{
            maxWidth: '100%', maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: 12,
            boxShadow: '0 40px 80px rgba(0,0,0,0.55)',
          }}
        />
      </div>
    )}
    </>
  )
}
