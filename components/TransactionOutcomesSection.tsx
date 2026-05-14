'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import ShapeTexture from '@/components/ShapeTexture'

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  bg:        '#0d1520',
  bgCard:    '#111d2d',
  bgInset:   '#080e18',
  bgChrome:  '#0a1118',
  border:    'rgba(255,255,255,0.07)',
  ink:       '#eef2f7',
  muted:     'rgba(220,228,240,0.55)',
  subtle:    'rgba(220,228,240,0.28)',
  blue:      '#0445f5',
  blueGlow:  'rgba(4,69,245,0.22)',
  blueDim:   'rgba(4,69,245,0.12)',
  green:     '#22c55e',
}

const PROTO_URL = 'https://conduit-transactions-tracker.netlify.app/'

// ─── Chapter data ─────────────────────────────────────────────────────────────
const CHAPTERS: Array<{
  id: string; num: string; label: string; heading: string; bullets: string[]
}> = [
  {
    id: 'problem', num: '01', label: 'The problem',
    heading: '"Where is my money?"',
    bullets: [],
  },
  {
    id: 'decision', num: '02', label: 'The design decision',
    heading: 'Progress as a story',
    bullets: [
      'Payment states mapped to plain language — no rail jargon',
      'Exception states: issue named, reason given, next steps shown',
      'Support contact only after self-serve options exhausted',
    ],
  },
  {
    id: 'impact', num: '03', label: 'Impact',
    heading: 'In their words',
    bullets: [],
  },
  {
    id: 'beyond', num: '04', label: 'What this unlocked',
    heading: 'What this made possible',
    bullets: [
      'Clients share real-time payment status with end customers via white-labeled tracking link — no infrastructure exposed, no manual chasing',
      'Granular states replaced "Processing" ambiguity — settlement timing surfaced, IMAD/OMAD links included for finance teams to self-verify',
      'Micro-animations communicate active progress for multi-day international transfers — motion conveys confidence across languages and literacy levels',
      'Journey view pattern adopted across 4 subsequent product surfaces',
    ],
  },
]

// ─── Testimonial quote — full-width focal centrepiece ────────────────────────
// Rendered between the prototype panel and the supporting chapter row so it
// sits at the widest point of the section and isn't constrained by a grid cell.
function TestimonialQuote() {
  return (
    <div style={{
      paddingTop: 72,
      paddingBottom: 72,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
    }}>
      {/* Decorative opening mark — large but understated */}
      <div style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: 'clamp(80px, 10vw, 120px)',
        lineHeight: 0.65,
        color: C.blue,
        opacity: 0.35,
        marginBottom: 24,
        userSelect: 'none',
        letterSpacing: '-0.04em',
      }}>
        &ldquo;
      </div>

      {/* Quote body — hero-scale typography */}
      <p style={{
        fontFamily: 'var(--font-inter)',
        fontSize: 'clamp(22px, 2.8vw, 34px)',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '-0.025em',
        color: C.ink,
        margin: '0 0 40px',
        maxWidth: '72ch',
      }}>
        Since launching this feature, client transaction status messages have dropped
        from hourly to none. It&apos;s freed our team to focus on higher-priority work.
      </p>

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 24, height: 1,
          background: C.blue, opacity: 0.45,
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(220,228,240,0.55)',
        }}>
          Operations Team · Conduit
        </span>
      </div>
    </div>
  )
}

// ─── External-link icon ───────────────────────────────────────────────────────
function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M15 3h6v6M9 21H4a1 1 0 01-1-1V5a1 1 0 011-1h6"/>
      <path d="M21 3l-9 9"/>
    </svg>
  )
}

// ─── Full-width prototype preview ────────────────────────────────────────────
// The iframe is non-interactive — a transparent overlay intercepts all clicks
// and opens the full-screen overlay instead.
function PrototypePreviewPanel({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div>
      {/* Browser frame — lifts + brightens border on hover */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 12, overflow: 'hidden',
          background: C.bgInset,
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.18)' : C.border}`,
          boxShadow: hovered
            ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)'
            : '0 24px 64px rgba(0,0,0,0.5)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s ease, border-color 0.2s ease',
          cursor: 'pointer',
        }}
      >
        {/* Chrome — URL bar + live badge */}
        <div style={{
          background: C.bgChrome, borderBottom: `1px solid ${C.border}`,
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 6,
            padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 7,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2"
                stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
              <path d="M7 11V7a5 5 0 0110 0v4"
                stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
            </svg>
            <span style={{
              fontSize: 10, color: 'rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-inter)',
            }}>
              conduit-transactions-tracker.netlify.app
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
            <span style={{
              fontSize: 9, color: C.subtle, fontFamily: 'var(--font-inter)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              Live
            </span>
          </div>
        </div>

        {/* Preview area — click blocker + hover CTA */}
        <div style={{ position: 'relative', height: 700, overflow: 'hidden' }}>

          {/* Click blocker — intercepts all interaction and opens overlay */}
          <div
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={e => e.key === 'Enter' && onOpen()}
            aria-label="Open prototype"
            style={{
              position: 'absolute', inset: 0, zIndex: 2,
              cursor: 'pointer', background: 'transparent',
            }}
          />

          {/* Hover CTA — scrim + expand pill, pointer-events: none so clicks reach blocker */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hovered ? 'rgba(8,14,24,0.42)' : 'rgba(8,14,24,0)',
            transition: 'background 0.28s ease',
            pointerEvents: 'none',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '11px 22px',
              background: 'rgba(255,255,255,0.09)',
              border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.96)',
              transition: 'opacity 0.22s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)',
            }}>
              {/* Expand icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round">
                <polyline points="15 3 21 3 21 9"/>
                <polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/>
                <line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 10, letterSpacing: '0.1em',
                textTransform: 'uppercase', fontWeight: 500,
                color: 'rgba(255,255,255,0.9)',
                whiteSpace: 'nowrap',
              }}>
                Open full view
              </span>
            </div>
          </div>

          <iframe
            src={PROTO_URL}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            title="Transaction Tracker prototype preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Primary CTA — forced dark context so btn-fill shows as light on dark bg */}
      <div className="dark" style={{ marginTop: 14 }}>
        <button className="btn-fill" onClick={onOpen} style={{ cursor: 'pointer' }}>
          Open Prototype
          <ExternalIcon />
        </button>
      </div>
    </div>
  )
}

// ─── Full-screen overlay ──────────────────────────────────────────────────────
const ANIM_MS = 340

function PrototypeOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted]         = useState(false)
  const [visible, setVisible]         = useState(false)
  const [iframeReady, setIframeReady] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (open) {
      setMounted(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    } else {
      setVisible(false)
      t = setTimeout(() => { setMounted(false); setIframeReady(false) }, ANIM_MS)
    }
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!mounted) return
    const iframe = iframeRef.current
    if (!iframe) return
    const mark = () => setIframeReady(true)
    iframe.addEventListener('load', mark)
    const fallback = setTimeout(mark, 6000)
    return () => { iframe.removeEventListener('load', mark); clearTimeout(fallback) }
  }, [mounted])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!mounted) return null

  return (
    // Backdrop — clicking outside the top bar closes the overlay
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: C.bg,
        display: 'flex', flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transition: `opacity ${ANIM_MS}ms cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.bgChrome,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 24px',
          height: 52,
          display: 'flex', alignItems: 'center', gap: 16,
          flexShrink: 0,
          transform: visible ? 'translateY(0)' : 'translateY(-12px)',
          transition: `transform ${ANIM_MS + 40}ms cubic-bezier(0.16,1,0.3,1)`,
        }}
      >
        {/* Product identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6, background: C.blue,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" rx="1" fill="white" opacity=".9"/>
              <rect x="7" y="1" width="4" height="4" rx="1" fill="white" opacity=".5"/>
              <rect x="1" y="7" width="4" height="4" rx="1" fill="white" opacity=".5"/>
              <rect x="7" y="7" width="4" height="4" rx="1" fill="white" opacity=".3"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 600,
            color: C.ink, letterSpacing: '-0.01em',
          }}>
            Transaction Tracker
          </span>
          <span style={{ fontSize: 10, color: C.subtle, fontFamily: 'var(--font-inter)' }}>
            — Conduit · 2023
          </span>
        </div>

        {/* URL bar */}
        <div style={{
          flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 7,
          padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 7,
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2"
              stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
            <path d="M7 11V7a5 5 0 0110 0v4"
              stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
          </svg>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}>
            conduit-transactions-tracker.netlify.app
          </span>
        </div>

        {/* Dismiss controls — Esc hint + labeled Close button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Esc badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <kbd style={{
              fontFamily: 'var(--font-inter)', fontSize: 10, lineHeight: 1,
              padding: '4px 8px',
              border: '1px solid rgba(255,255,255,0.22)',
              background: 'rgba(255,255,255,0.06)',
              color: C.muted,
            }}>
              Esc
            </kbd>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: 10,
              color: C.subtle, letterSpacing: '0.04em',
            }}>
              to close
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 18, background: C.border, flexShrink: 0 }} />

          {/* Close button — labeled for clarity */}
          <button
            onClick={onClose}
            aria-label="Close prototype"
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.16)',
              color: C.ink, cursor: 'pointer',
              fontFamily: 'var(--font-inter)',
              fontSize: 11, letterSpacing: '0.07em', textTransform: 'uppercase',
              transition: 'background 0.18s ease, border-color 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.32)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Close
          </button>
        </div>
      </div>

      {/* ── iframe — fills the remaining viewport height ─────────────── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          flex: 1, position: 'relative', overflow: 'hidden',
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: `transform ${ANIM_MS + 40}ms cubic-bezier(0.16,1,0.3,1)`,
        }}
      >
        {/* Loading state */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: C.bgInset,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 14,
          opacity: iframeReady ? 0 : 1,
          transition: 'opacity 0.4s ease', pointerEvents: 'none',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            border: `2.5px solid ${C.blueDim}`,
            borderTopColor: C.blue,
            animation: 'protoSpin 0.85s linear infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: 11,
            color: C.subtle, letterSpacing: '0.10em', textTransform: 'uppercase',
          }}>
            Loading prototype
          </span>
        </div>

        <iframe
          ref={iframeRef}
          src={PROTO_URL}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          title="Transaction Tracker — full prototype"
          style={{
            width: '100%', height: '100%', border: 'none', display: 'block',
            opacity: iframeReady ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function TransactionOutcomesSection() {
  const [protoOpen, setProtoOpen] = useState(false)

  const openProto = useCallback(() => {
    setProtoOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeProto = useCallback(() => {
    setProtoOpen(false)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => () => { document.body.style.overflow = '' }, [])

  return (
    <>
      <div
        data-reveal
        className="outcomes-section"
        style={{
          marginLeft: 'calc(-80px - var(--sidebar-gap))',
          marginRight: '-80px',
          paddingLeft: 'calc(var(--sidebar-gap) + 48px)',
          paddingRight: '48px',
          paddingTop: 96,
          paddingBottom: 112,
          background: C.bg,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background shape — exact Figma vector, V2 crop ("7 Verbal ID"). */}
        {/* V2 frame: vector at x=−1518, y=−1079 in 1920×1080. Units: vw (100vw = 1920px). */}
        <ShapeTexture
          fill="#0445f5"
          opacity={0.09}
          style={{
            left: '-79.1vw',
            top: '-56.2vw',
            width: '209vw',
            height: '209vw',
          }}
        />
        {/* All content above the ShapeTexture (z-index: 0 positioned absolute) */}
        <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontFamily: 'var(--font-inter)', fontSize: 9,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: C.subtle, marginBottom: 20,
          }}>
            // outcomes
          </div>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(34px, 4.5vw, 60px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02,
            color: C.ink, margin: 0, maxWidth: 580,
          }}>
            The results spoke<br />for themselves.
          </h2>
        </div>

        {/* ── Prototype — full width ─────────────────────────────────────── */}
        <PrototypePreviewPanel onOpen={openProto} />

        {/* ── Testimonial — full-width focal centrepiece ─────────────────── */}
        <TestimonialQuote />

        {/* ── Chapter grid — 2 columns (decision · beyond) ────────────────── */}
        <div
          className="outcomes-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginTop: 0,
          }}
        >
          {CHAPTERS.filter(ch => ch.id !== 'impact' && ch.id !== 'problem').map((ch, i, arr) => (
            <div
              key={ch.id}
              style={{
                padding: '44px 40px',
                borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : 'none',
              }}
            >
              {/* Chapter label */}
              <div style={{
                fontFamily: 'var(--font-inter)', fontSize: 9,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: C.subtle, marginBottom: 14,
              }}>
                {ch.num} — {ch.label}
              </div>

              {/* Heading */}
              <h3 style={{
                fontFamily: 'var(--font-inter)', fontSize: 20,
                fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2,
                color: C.ink, margin: '0 0 16px',
              }}>
                {ch.heading}
              </h3>

              {/* Bullets */}
              {ch.bullets.map((b, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'baseline' }}>
                  <span style={{ color: C.blue, opacity: 0.55, fontSize: 12, flexShrink: 0, lineHeight: '21px' }}>→</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, lineHeight: 1.65, color: C.muted }}>{b}</span>
                </div>
              ))}

              {ch.id === 'beyond' && (
                /* forced .dark context so btn-fill renders as light on dark bg */
                <div className="dark" style={{ marginTop: 28 }}>
                  <button
                    className="btn-fill"
                    onClick={openProto}
                    style={{ cursor: 'pointer' }}
                  >
                    Try the full experience
                    <ExternalIcon />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        </div>{/* end content z-index wrapper */}

        <style>{`
          @keyframes protoSpin { to { transform: rotate(360deg); } }
          @media (max-width: 640px) {
            .outcomes-grid { grid-template-columns: 1fr !important; }
            .outcomes-section {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
          }
        `}</style>
      </div>

      <PrototypeOverlay open={protoOpen} onClose={closeProto} />
    </>
  )
}
