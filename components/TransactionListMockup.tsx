'use client'

import { useEffect, useRef, useState } from 'react'

// ── Inline SVG icons — permanent, no external dependency ─────────────────────
const IMG_ARROW_UP   = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M12 19V5M5 12l7-7 7 7' stroke='%231b1543' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"
const IMG_ARROW_SM   = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M5 12h14M12 5l7 7-7 7' stroke='%2385829a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"
const IMG_CHEVRON    = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M6 9l6 6 6-6' stroke='%2385829a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"
const IMG_COPY_ICON  = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><rect x='9' y='9' width='13' height='13' rx='2' stroke='%2385829a' stroke-width='1.8'/><path d='M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' stroke='%2385829a' stroke-width='1.8' stroke-linecap='round'/></svg>"
const IMG_EYE_ICON   = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' stroke='%23141414' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><circle cx='12' cy='12' r='3' stroke='%23141414' stroke-width='1.8'/></svg>"
const IMG_LINK_ICON  = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71' stroke='%23141414' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71' stroke='%23141414' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>"
const IMG_LOCK_ICON  = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><rect x='3' y='11' width='18' height='11' rx='2' stroke='%2385829a' stroke-width='1.8'/><path d='M7 11V7a5 5 0 0110 0v4' stroke='%2385829a' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>"
// IMG_TRACK, IMG_INDICATOR: replaced with CSS spinner below
// IMG_FILL_BAR: decorative texture, img tag removed below
// IMG_BLUE_DOT: replaced with CSS span below

// ── Neumorphic pill helpers ───────────────────────────────────────────────────
const PILL_BASE: React.CSSProperties = {
  height: 24,
  borderRadius: 36,
  border: '0.718px solid white',
  boxShadow: '0px 1.436px 1.436px rgba(164,174,183,0.25), 4.308px 4.308px 5.744px rgba(164,174,183,0.15), -1.436px -1.436px 5.026px white',
  background: 'linear-gradient(90deg,#d8dee3 0%,#d8dee3 100%)',
  position: 'relative',
  overflow: 'hidden',
}
const INNER_SHADOW: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
  boxShadow: 'inset 4px 4px 4px rgba(0,0,0,0.1), inset -2px -2px 2px white',
}

function FilledPill({ width }: { width?: number | string }) {
  return (
    <div style={{ ...PILL_BASE, width: width ?? '100%', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 5, left: 8, right: 8, height: 13, borderRadius: 12, background: 'rgba(4,69,245,0.8)' }} />
      <div style={INNER_SHADOW} />
    </div>
  )
}

function GreyPill({ width }: { width?: number | string }) {
  return (
    <div style={{ ...PILL_BASE, width: width ?? '100%', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 5, left: 8, right: 8, height: 13, borderRadius: 12, background: '#cdd9e3' }} />
      <div style={INNER_SHADOW} />
    </div>
  )
}

function AnimatedPill() {
  const [pct, setPct] = useState(22)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    startRef.current = performance.now()
    const animate = (now: number) => {
      const t = Math.min((now - startRef.current) / 2800, 1)
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      setPct(25 + e * 40)
      if (t < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{ ...PILL_BASE, flex: 1, minWidth: 0 }}>
      <div style={{
        position: 'absolute', top: 5, left: 8, height: 13, borderRadius: 12,
        width: `calc(${pct}% - 8px)`,
        background: 'rgba(4,69,245,0.8)',
        overflow: 'hidden',
      }}>
        {/* decorative fill texture removed — CSS background handles this */}
      </div>
      <div style={INNER_SHADOW} />
    </div>
  )
}

// ── Row types ─────────────────────────────────────────────────────────────────
const ROWS = [
  { label: 'Created',              dotColor: '#94a3b8', icon: null,    muted: false },
  { label: 'Awaiting Funds',       dotColor: '#f97316', icon: null,    muted: false },
  { label: 'In Compliance Review', dotColor: '#eab308', icon: null,    muted: false },
  { label: 'Processing Payment',   dotColor: null,      icon: null,    muted: false }, // uses IMG_BLUE_DOT
  { label: 'Completed',            dotColor: '#22c55e', icon: 'check', muted: false },
  { label: 'Compliance Rejected',  dotColor: '#ef4444', icon: 'x',     muted: false },
  { label: 'Cancelled',            dotColor: null,      icon: null,    muted: true  },
]

// ── Main component ────────────────────────────────────────────────────────────
export default function TransactionListMockup() {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #dae1ed',
      borderRadius: 8,
      fontFamily: "'Inter', system-ui, sans-serif",
      margin: '40px 0',
      userSelect: 'none',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
    }}>

      {/* ── Top nav bar ── */}
      <div style={{
        padding: '10px 20px', borderBottom: '1px solid #dae1ed',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/conduit-logo.svg" alt="Conduit" style={{ height: 18, width: 'auto', display: 'block' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Bell icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          {/* Help icon */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          {/* User avatar */}
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#0445f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#fff', fontFamily: "'Inter', system-ui, sans-serif" }}>CS</span>
          </div>
        </div>
      </div>

      {/* ── Table header ── */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>
          Transactions
        </div>
        <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #dae1ed' }}>
          {['All', 'Pending', 'Completed'].map((tab, i) => (
            <div key={tab} style={{
              paddingBottom: 10, fontSize: 13, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? '#0445f5' : '#85829a',
              borderBottom: i === 0 ? '2px solid #0445f5' : '2px solid transparent',
              cursor: 'default', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {tab}
              {tab === 'Pending' && (
                <span style={{ background: '#0445f5', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '1px 6px' }}>12</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '12px 0' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #dae1ed', borderRadius: 8, padding: '6px 12px', color: '#85829a', fontSize: 12 }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#85829a" strokeWidth="1.5"/><path d="M11 11l3 3" stroke="#85829a" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Search by Name, Wallet Address, or Transaction ID
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, border: '1px solid #dae1ed', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 500, color: '#141414' }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="#85829a" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Filters
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, border: '1px solid #dae1ed', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 500, color: '#141414' }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4 8l4 4 4-4M2 13h12" stroke="#85829a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Export CSV
          </div>
        </div>
      </div>

      <div style={{ padding: '2px 20px 8px', fontSize: 12, fontWeight: 600, color: '#141414' }}>
        September 2025
      </div>

      {/* ── Rows ── */}
      {ROWS.map((row, i) => {
        const isProcessing = i === 3
        return (
          <div key={i} style={{ borderTop: '1px solid #eaeef5', background: isProcessing ? '#fafbff' : '#fff' }}>

            {/* Row summary */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', gap: 12 }}>

              {/* Date */}
              <div style={{ width: 30, textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 500, color: '#85829a', letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.4 }}>NOV</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1b1543', lineHeight: 1.2 }}>15</div>
              </div>

              {/* Type icon */}
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eaeef5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 20, height: 20, overflow: 'hidden', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <img alt="" src={IMG_ARROW_UP} style={{ display: 'block', width: '100%', height: '100%' }} />
                </div>
              </div>

              {/* From */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: row.muted ? '#85829a' : '#141414', whiteSpace: 'nowrap' }}>USD</span>
                  <img alt="" src={IMG_ARROW_SM} style={{ width: 10, height: 10, display: 'block', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: row.muted ? '#85829a' : '#141414', whiteSpace: 'nowrap' }}>USDC (ETH)</span>
                </div>
                <div style={{ fontSize: 11, color: '#85829a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  From My Conduit Account | 269,730 USDC (ETH)
                </div>
              </div>

              {/* Badge */}
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #dae1ed', borderRadius: 8, padding: '5px 12px', whiteSpace: 'nowrap', background: '#fff' }}>
                {isProcessing ? (
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#0445f5', display: 'inline-block', flexShrink: 0 }} />
                ) : row.dotColor ? (
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: row.dotColor, flexShrink: 0, display: 'inline-block' }} />
                ) : row.icon === 'check' ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}><path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : row.icon === 'x' ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}><path d="M2 2l8 8M10 2l-8 8" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                ) : null}
                <span style={{ fontSize: 12, fontWeight: 500, color: row.muted ? '#85829a' : '#141414' }}>{row.label}</span>
              </div>

              {/* Chevron */}
              <div style={{ width: 28, height: 28, borderRadius: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img alt="" src={IMG_CHEVRON} style={{ width: 12, height: 12, display: 'block', transform: isProcessing ? 'rotate(180deg) scaleY(-1)' : undefined }} />
              </div>
            </div>

            {/* ── Expanded detail (Processing Payment only) ── */}
            {isProcessing && (
              <div style={{ padding: '24px 20px 20px', borderTop: '1px solid #eaeef5' }}>

                {/* Status heading — spinner LEFT, all text RIGHT */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  {/* Spinner — whole div rotates */}
                  <div style={{ width: 24, height: 24, flexShrink: 0, borderRadius: '50%', border: '2.5px solid #e5e7eb', borderTopColor: '#0445f5', animation: 'txSpin 1.1s linear infinite' }} />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#141414', letterSpacing: '-0.016em', marginBottom: 4 }}>
                      Starting Journey On Chain
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 400, color: '#141414', lineHeight: 1.6, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                      Your on-chain journey is starting. We&apos;re safely recording this transaction on the blockchain.
                    </p>
                    <div style={{ display: 'flex', gap: 6, fontSize: 13, letterSpacing: '-0.01em' }}>
                      <span style={{ color: '#141414', fontWeight: 400 }}>Est. Settlement</span>
                      <span style={{ color: '#141414', fontWeight: 500 }}>Nov 16, 2025 8:00 AM EST</span>
                    </div>
                  </div>
                </div>

                {/* Progress tracker */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '8px 0', marginBottom: 12 }}>
                  {/* Created */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', width: 52, flexShrink: 0 }}>
                    <FilledPill width="100%" />
                    <span style={{ fontSize: 9, fontWeight: 400, color: '#141414', textAlign: 'center', lineHeight: 1.3 }}>Created</span>
                  </div>
                  {/* Compliance Approved */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', width: 76, flexShrink: 0 }}>
                    <FilledPill width="100%" />
                    <span style={{ fontSize: 9, fontWeight: 400, color: '#141414', textAlign: 'center', lineHeight: 1.3 }}>Compliance<br/>Approved</span>
                  </div>
                  {/* Processing Payment — animated, flex */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flex: 1, minWidth: 0 }}>
                    <AnimatedPill />
                    <div style={{ display: 'flex', gap: 3, alignItems: 'center', fontSize: 9, justifyContent: 'center', flexWrap: 'nowrap' }}>
                      <span style={{ fontWeight: 600, color: '#141414', whiteSpace: 'nowrap' }}>Processing Payment</span>
                      <span style={{ color: '#85829a' }}>|</span>
                      <span style={{ color: '#85829a', whiteSpace: 'nowrap' }}>1 of 3 Steps</span>
                    </div>
                  </div>
                  {/* Completed */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', width: 52, flexShrink: 0 }}>
                    <GreyPill width="100%" />
                    <span style={{ fontSize: 9, fontWeight: 400, color: '#b2b0c1', textAlign: 'center', lineHeight: 1.3 }}>Completed</span>
                  </div>
                </div>

                {/* Transaction ID */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#141414', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Transaction ID:</span>
                  <span style={{ fontSize: 12, fontWeight: 400, color: '#141414', fontFamily: 'monospace', letterSpacing: '-0.01em' }}>38ezNE9JgRxy1iioBNbQKu0KtOS</span>
                  <div style={{ width: 20, height: 20, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img alt="" src={IMG_COPY_ICON} style={{ display: 'block', width: 16, height: 16 }} />
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: '#dae1ed', marginBottom: 16 }} />

                {/* Action buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  {/* Preview */}
                  <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #dae1ed', borderRadius: 10, padding: '8px 16px', cursor: 'default' }}>
                    <img alt="" src={IMG_EYE_ICON} style={{ width: 18, height: 18, display: 'block' }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#1b1543', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Preview</span>
                  </button>
                  {/* Copy Tracking Link */}
                  <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #232323', borderRadius: 10, padding: '8px 16px', cursor: 'default' }}>
                    <img alt="" src={IMG_LINK_ICON} style={{ width: 16, height: 16, display: 'block' }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#232323', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Copy Tracking Link</span>
                  </button>
                  {/* Security note */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, flex: 1, minWidth: 0 }}>
                    <img alt="" src={IMG_LOCK_ICON} style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: '#85829a', letterSpacing: '-0.01em' }}>For security, this link expires after 48 hours.</span>
                  </div>
                  {/* View Full Details */}
                  <button style={{ background: '#232323', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'default', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>View Full Details</span>
                  </button>
                </div>

              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
