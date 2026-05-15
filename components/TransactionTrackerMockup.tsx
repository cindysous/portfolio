'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Animated progress hook ──────────────────────────────────────────────────
function useCycleProgress() {
  const [pct, setPct] = useState(18)
  const raf = useRef<number | null>(null)
  const t0  = useRef<number | null>(null)
  const TRAVEL = 2800, HOLD = 1400, TOTAL = TRAVEL + HOLD

  useEffect(() => {
    const tick = (now: number) => {
      if (!t0.current) t0.current = now
      const e = (now - t0.current) % TOTAL
      if (e < TRAVEL) {
        const r = e / TRAVEL
        const ease = r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2
        setPct(ease * 100)
      } else {
        setPct(100)
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [])
  return pct
}

// ─── Neumorphic transaction-tracker pill ──────────────────────────────────────────
function Pill({ fillPct, flex, fixedWidth }: { fillPct: number; flex?: boolean; fixedWidth?: number }) {
  return (
    <div style={{
      position: 'relative',
      height: 13,
      width: flex ? '100%' : fixedWidth ?? undefined,
      flexShrink: 0,
      borderRadius: 999,
      background: '#d8dee3',
      borderTop:  '1px solid rgba(255,255,255,0.95)',
      borderLeft: '1px solid rgba(255,255,255,0.95)',
      boxShadow: '0px 1px 1.5px rgba(164,174,183,0.3), 3px 3px 4px rgba(164,174,183,0.18), -1px -1px 3.5px rgba(255,255,255,0.9)',
      overflow: 'hidden',
    }}>
      {fillPct > 0 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${fillPct}%`,
          borderRadius: 999,
          background: 'linear-gradient(90deg, #0445F5 0%, #4b78f8 50%, #7aa0ff 75%, rgba(190,210,255,0.4) 100%)',
          opacity: 0.88,
        }} />
      )}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 55% 70% at 50% 38%, rgba(255,255,255,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 'inherit',
        boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.08), inset -1px -1px 2px rgba(255,255,255,0.65)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ─── Status badge (matches Figma: border #dae1ed, rounded-[8px]) ─────────────
// compactLabel: if provided, shows compactLabel on ≤414px and label on wider screens
function Badge({ label, dot, check, color, bg, compactLabel }: {
  label: string; color: string; bg: string; dot?: boolean; check?: boolean; compactLabel?: string
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '5px 12px',
      border: '1px solid #dae1ed',
      borderRadius: 8,
      background: bg,
      flexShrink: 0,
    }}>
      {check && <span style={{ fontSize: 11, color, lineHeight: 1 }}>✓</span>}
      {dot && <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />}
      {compactLabel ? (
        <>
          <span className="tx-badge-full" style={{ fontSize: 11, fontWeight: 500, color, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{label}</span>
          <span className="tx-badge-compact" style={{ fontSize: 11, fontWeight: 500, color, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{compactLabel}</span>
        </>
      ) : (
        <span style={{ fontSize: 11, fontWeight: 500, color, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
    </div>
  )
}

// ─── Collapsed row ───────────────────────────────────────────────────────────
function CollapsedRow({ month, day, label, amount, currency, badgeLabel, badgeColor, badgeBg, dot, check }: {
  month: string; day: string; label: string; amount: string; currency: string
  badgeLabel: string; badgeColor: string; badgeBg: string; dot?: boolean; check?: boolean
}) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #dae1ed',
      borderRadius: 8,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      {/* Date */}
      <div style={{ flexShrink: 0, width: 26, textAlign: 'center' }}>
        <div style={{ fontSize: 7.5, fontFamily: 'Inter, sans-serif', color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1 }}>{month}</div>
        <div style={{ fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#141414', lineHeight: 1.3 }}>{day}</div>
      </div>
      {/* Arrow icon */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: '#eaeef5',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
          <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="#5a6a7e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {/* From */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#141414', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
        <div className="tx-from-detail" style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>From My Conduit Account</div>
      </div>
      {/* Amount */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#141414', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{amount}</div>
        <div className="tx-to-detail" style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>{currency}</div>
      </div>
      {/* Badge */}
      <Badge label={badgeLabel} color={badgeColor} bg={badgeBg} dot={dot} check={check} />
      {/* Chevron */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.35 }}>
        <path d="M4 5.5L7 8.5L10 5.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// ─── Expanded row (transaction tracker) ─────────────────────────────────────────────
function ExpandedRow({ processingPct }: { processingPct: number }) {
  const stepLabel = processingPct < 34 ? '1' : processingPct < 68 ? '2' : '3'
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #dae1ed',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 20px',
        borderBottom: '1px solid #f3f4f6',
      }}>
        <div style={{ flexShrink: 0, width: 26, textAlign: 'center' }}>
          <div style={{ fontSize: 7.5, fontFamily: 'Inter, sans-serif', color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1 }}>NOV</div>
          <div style={{ fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#141414', lineHeight: 1.3 }}>15</div>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: '#eaeef5',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="#5a6a7e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#141414', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>USD → USDC (ETH)</div>
          <div className="tx-from-detail" style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>From My Conduit Account · 269,730 USDC (ETH)</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#141414', fontFamily: 'Inter, sans-serif' }}>269,730 USDC (ETH)</div>
          <div className="tx-to-detail" style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>To Jane Doe</div>
        </div>
        <Badge label="Processing Payment" compactLabel="Processing" color="#0445F5" bg="#fff" dot />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.35 }}>
          <path d="M4 8.5L7 5.5L10 8.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Tracker body */}
      <div style={{ padding: '16px 20px 18px' }}>
        {/* Spinner + title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 18, height: 18, flexShrink: 0, marginTop: 1,
            borderRadius: '50%',
            border: '2px solid #e5e7eb',
            borderTopColor: '#0445F5',
            animation: 'spin 0.9s linear infinite',
          }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#141414', letterSpacing: '-0.01em', lineHeight: '17px', fontFamily: 'Inter, sans-serif' }}>
              Starting Journey On Chain
            </div>
            <div style={{ fontSize: 11, color: '#85829a', lineHeight: '15px', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>
              We're safely recording this transaction on the blockchain.
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 5, fontSize: 11, fontFamily: 'Inter, sans-serif' }}>
              <span style={{ color: '#85829a' }}>Est. Settlement</span>
              <span style={{ fontWeight: 500, color: '#141414' }}>Nov 16, 2025 · 8:00 AM EST</span>
            </div>
          </div>
        </div>

        {/* ── Transaction tracker pills ── */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          {/* Created */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flexShrink: 0 }}>
            <Pill fillPct={100} fixedWidth={42} />
            <span style={{ fontSize: 9, fontFamily: 'Inter, sans-serif', color: '#141414', whiteSpace: 'nowrap' }}>Created</span>
          </div>
          {/* Compliance Approved */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flexShrink: 0 }}>
            <Pill fillPct={100} fixedWidth={78} />
            <span style={{ fontSize: 9, fontFamily: 'Inter, sans-serif', color: '#141414', whiteSpace: 'nowrap' }}>
              Compliance<span className="tx-compliance-approved-suffix"> Approved</span>
            </span>
          </div>
          {/* Processing — animated, fills remaining space */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flex: 1, minWidth: 0 }}>
            <Pill fillPct={processingPct} flex />
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflow: 'hidden' }}>
              <span style={{ fontSize: 9, fontWeight: 600, color: '#141414', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>Processing<span className="tx-processing-payment-suffix"> Payment</span></span>
              <span className="tx-steps-sep" style={{ fontSize: 9, color: '#85829a' }}>|</span>
              <span className="tx-steps-label" style={{ fontSize: 9, color: '#85829a', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{stepLabel} of 3 Steps</span>
            </div>
          </div>
          {/* Completed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flexShrink: 0 }}>
            <Pill fillPct={0} fixedWidth={50} />
            <span style={{ fontSize: 9, fontFamily: 'Inter, sans-serif', color: '#b2b0c1', whiteSpace: 'nowrap' }}>Completed</span>
          </div>
        </div>

        {/* Transaction ID */}
        <div style={{
          display: 'flex', gap: 6, alignItems: 'center',
          marginTop: 12, paddingTop: 10,
          borderTop: '1px solid #f0f0f0',
        }}>
          <span style={{ fontSize: 10.5, fontWeight: 500, color: '#141414', fontFamily: 'Inter, sans-serif' }}>Transaction ID:</span>
          <span style={{ fontSize: 10.5, color: '#141414', fontFamily: 'monospace' }}>38ezNE9J…Ku0KtOS</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#85829a" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function TransactionTrackerMockup() {
  const pct = useCycleProgress()

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px 0 16px',
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Stack of 3 cards — top and bottom bleed off edges */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        /* shift up slightly so the expanded (middle) card is centered,
           top row bleeds off top, bottom row bleeds off bottom */
        marginTop: 24,
      }}>
        {/* Row 1 — Completed, bleeds off top */}
        <div className="tx-blurred-row tx-blurred-row-top" style={{ filter: 'blur(2.5px)', opacity: 0.7 }}>
        <CollapsedRow
          month="JAN" day="15"
          label="USD → EUR"
          amount="12,800.00 EUR"
          currency="To Lumina Group"
          badgeLabel="Completed"
          badgeColor="#16a34a"
          badgeBg="#f0fdf4"
          check
        />
        </div>

        {/* Row 2 — Processing Payment (expanded) */}
        <ExpandedRow processingPct={pct} />

        {/* Row 3 — Awaiting Funds, bleeds off bottom */}
        <div className="tx-blurred-row" style={{ filter: 'blur(2.5px)', opacity: 0.7 }}>
        <CollapsedRow
          month="OCT" day="28"
          label="USD → MXN"
          amount="$890.50 MXN"
          currency="To Meridian LLC"
          badgeLabel="Awaiting Funds"
          badgeColor="#ea7c1e"
          badgeBg="#fff7ed"
          dot
        />
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
