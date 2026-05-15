'use client'

import { useState, useEffect, useCallback } from 'react'

const PROTO_URL = 'https://conduit-transactions-tracker.netlify.app/'

const PROMPTS = [
  'layout.grid → aligned',
  'spacing.tokens → applied',
  'interaction.states → mapped',
  'breakpoints → generated',
  'micro-interactions → polished',
  'edge.cases → resolved',
  'transaction.variants → built',
  'animation.timing → calibrated',
]

// ─── Phone dimensions ─────────────────────────────────────────────────────────
const PHONE_PAD = 14
const SCREEN_W  = 258
const SCREEN_H  = 520
const IFRAME_W  = 390
const NAV_H     = 56
const SCALE     = SCREEN_W / IFRAME_W
const PHONE_W   = SCREEN_W + PHONE_PAD * 2

const LG_PAD      = 18
const LG_SCREEN_W = 375
const LG_SCREEN_H = 720
const LG_PHONE_W  = LG_SCREEN_W + LG_PAD * 2
const OVERLAY_MS  = 300

// ─── Colours ──────────────────────────────────────────────────────────────────
const BG    = '#f2f4f7'
const INK   = '#111827'
const MUTED = '#6b7280'
const BLUE  = '#0445f5'
const DARK  = '#0d1520'

// ─── Terminal-style cycling animation ────────────────────────────────────────
function DesignThinkingCycle() {
  const [idx, setIdx]         = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % PROMPTS.length); setVisible(true) }, 320)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      marginTop: 18, marginBottom: 48,
      background: 'rgba(4,69,245,0.06)',
      border: '1px solid rgba(4,69,245,0.12)',
      borderRadius: 6,
      padding: '7px 12px',
    }}>
      {/* Asterisk — "Claude thinking" motif */}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
        style={{ flexShrink: 0, animation: 'aiAsterisk 5s linear infinite' }}>
        <line x1="6" y1="1" x2="6" y2="11" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="10.3" y1="3.5" x2="1.7" y2="8.5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="1.7" y1="3.5" x2="10.3" y2="8.5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round"/>
      </svg>

      {/* Terminal-style prompt */}
      <span style={{
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 11, color: 'rgba(4,69,245,0.75)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.32s ease',
        userSelect: 'none',
        letterSpacing: '-0.01em',
      }}>
        {PROMPTS[idx]}
      </span>

      {/* Blinking cursor */}
      <span style={{
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 11, color: BLUE,
        animation: 'aiCursor 1.1s step-end infinite',
        userSelect: 'none',
        lineHeight: 1,
      }}>█</span>
    </div>
  )
}

// ─── Clickable phone preview ──────────────────────────────────────────────────
function MobilePhoneFrame({ onExpand }: { onExpand: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ position: 'sticky', top: 40 }}>
      <div
        role="button" tabIndex={0} aria-label="Expand mobile prototype"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onExpand}
        onKeyDown={e => e.key === 'Enter' && onExpand()}
        style={{
          background: '#18191e', borderRadius: 44, padding: PHONE_PAD, width: PHONE_W,
          cursor: 'pointer',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered
            ? '0 48px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.10)'
            : '0 32px 64px rgba(0,0,0,0.20), 0 0 0 1px rgba(255,255,255,0.07)',
          transition: 'transform 0.26s cubic-bezier(0.16,1,0.3,1), box-shadow 0.26s ease',
        }}
      >
        <div style={{ borderRadius: 32, overflow: 'hidden', height: SCREEN_H, position: 'relative', background: '#000' }}>
          <div style={{ width: IFRAME_W, height: 900, transform: `scale(${SCALE})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
            <iframe src={PROTO_URL} loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              title="Transaction Tracker — mobile preview"
              style={{ width: '100%', height: 900, border: 'none', display: 'block' }}
            />
          </div>
          {/* Hover scrim */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: hovered ? 'rgba(6,12,22,0.55)' : 'rgba(6,12,22,0)',
            transition: 'background 0.26s ease', pointerEvents: 'none',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.96)',
              transition: 'opacity 0.2s ease, transform 0.26s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Expand
              </span>
            </div>
          </div>
        </div>
        <div style={{ margin: '8px auto 0', width: 110, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.14)' }} />
      </div>

      {/* Prominent CTA */}
      <button
        onClick={onExpand}
        style={{
          marginTop: 12, width: PHONE_W, padding: '11px 16px',
          background: BLUE, border: 'none', borderRadius: 10, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.07em', textTransform: 'uppercase', color: '#fff',
          transition: 'background 0.18s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0336cc' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = BLUE }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
          <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
        </svg>
        Explore Mobile Prototype
      </button>
    </div>
  )
}

// ─── Large phone overlay ──────────────────────────────────────────────────────
function MobileExpansionOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready,   setReady]   = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (open) { setMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true))) }
    else { setVisible(false); t = setTimeout(() => { setMounted(false); setReady(false) }, OVERLAY_MS) }
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!mounted) return null

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(6,10,18,0.90)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0, transition: `opacity ${OVERLAY_MS}ms ease`,
    }}>
      <div style={{ position: 'absolute', top: 22, right: 28, display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none', opacity: visible ? 1 : 0, transition: `opacity ${OVERLAY_MS}ms ease` }}>
        <kbd style={{ fontFamily: 'var(--font-inter)', fontSize: 10, padding: '4px 8px', border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.06)', color: 'rgba(220,228,240,0.60)' }}>Esc</kbd>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(220,228,240,0.35)' }}>to close</span>
      </div>
      <div onClick={e => e.stopPropagation()} style={{
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(18px)',
        transition: `transform ${OVERLAY_MS + 60}ms cubic-bezier(0.16,1,0.3,1)`,
      }}>
        <div style={{ background: '#18191e', borderRadius: 56, padding: LG_PAD, width: LG_PHONE_W, boxShadow: '0 60px 120px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.07)' }}>
          <div style={{ borderRadius: 44, overflow: 'hidden', height: LG_SCREEN_H, position: 'relative', background: '#000' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: ready ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: 'none' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid rgba(4,69,245,0.20)', borderTopColor: BLUE, animation: 'aiOverlaySpin 0.8s linear infinite' }} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: 'rgba(220,228,240,0.35)', letterSpacing: '0.10em', textTransform: 'uppercase' }}>Loading</span>
            </div>
            <iframe src={PROTO_URL} sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              title="Transaction Tracker — mobile expanded view" onLoad={() => setReady(true)}
              style={{ width: LG_SCREEN_W, height: LG_SCREEN_H, border: 'none', display: 'block', opacity: ready ? 1 : 0, transition: 'opacity 0.35s ease' }}
            />
          </div>
          <div style={{ margin: '10px auto 0', width: 130, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.14)' }} />
        </div>
      </div>
      <style>{`@keyframes aiOverlaySpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function TransactionAiExplorationSection() {
  const [overlayOpen, setOverlayOpen] = useState(false)
  const openOverlay  = useCallback(() => setOverlayOpen(true),  [])
  const closeOverlay = useCallback(() => setOverlayOpen(false), [])
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  const bullets = [
    { tag: 'Layout',   clr: '#3b6cf4', bg: 'rgba(4,69,245,0.09)',   text: 'Fully responsive across all breakpoints' },
    { tag: 'Motion',   clr: '#8b5cf6', bg: 'rgba(124,58,237,0.09)', text: 'Micro-interactions built in the same session' },
    { tag: 'Coverage', clr: '#059669', bg: 'rgba(5,150,105,0.09)',  text: 'All transaction states and edge cases' },
    { tag: 'System',   clr: '#d97706', bg: 'rgba(217,119,6,0.09)',  text: 'One design system across all transaction types' },
    { tag: 'Process',  clr: '#3b6cf4', bg: 'rgba(4,69,245,0.09)',   text: 'Decisions made and shipped in the same session' },
  ]

  return (
    <>
      <div data-reveal className="ai-exploration-section" style={{
        marginLeft: 'calc(-80px - var(--sidebar-gap))', marginRight: '-80px',
        paddingLeft: 'calc(80px + var(--sidebar-gap))', paddingRight: '80px',
        paddingTop: 88, paddingBottom: 88, background: BG,
      }}>

        {/* ── Header ───────────────────────────────────────────────── */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTED, marginBottom: 14 }}>
            // ai exploration
          </div>
          <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: INK, margin: 0, maxWidth: 520 }}>
            What happened when AI entered the workflow.
          </h2>
          <DesignThinkingCycle />
        </div>

        {/* ── Grid: phone LEFT · text RIGHT ────────────────────────── */}
        <div className="ai-exploration-grid" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '0 72px', alignItems: 'start' }}>

          {/* Left — phone frame */}
          <MobilePhoneFrame onExpand={openOverlay} />

          {/* Right — bullets + callout */}
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, lineHeight: 1.7, color: MUTED, margin: '0 0 24px', maxWidth: '52ch' }}>
              Claude Code as full execution partner — weeks of work compressed into focused sessions.
            </p>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {bullets.map(b => (
                <li key={b.tag} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.07em',
                    textTransform: 'uppercase', color: b.clr,
                    background: b.bg, padding: '3px 8px', borderRadius: 4,
                    flexShrink: 0, whiteSpace: 'nowrap',
                  }}>{b.tag}</span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: 13, lineHeight: 1.5, color: INK }}>{b.text}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>

        <style>{`
          @keyframes aiAsterisk {
            0%   { transform: rotate(0deg);   opacity: 0.4; }
            33%  { opacity: 0.9; }
            66%  { opacity: 0.5; }
            100% { transform: rotate(360deg); opacity: 0.4; }
          }
          @keyframes aiCursor {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @media (max-width: 860px) {
            .ai-exploration-section { padding-left: calc(24px + var(--sidebar-gap)) !important; padding-right: 24px !important; }
            .ai-exploration-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 767px) {
            .ai-exploration-section {
              margin-left: 0 !important;
              margin-right: 0 !important;
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .ai-exploration-section {
              margin-left: 0 !important;
              margin-right: 0 !important;
              padding-left: 40px !important;
              padding-right: 40px !important;
            }
          }
        `}</style>
      </div>

      <MobileExpansionOverlay open={overlayOpen} onClose={closeOverlay} />
    </>
  )
}
