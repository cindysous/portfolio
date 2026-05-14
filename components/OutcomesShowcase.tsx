'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Figma design tokens ──────────────────────────────────────────────────────
const C = {
  bg:           '#ffffff',
  bgPage:       '#f5f6f8',
  bgGrey:       '#eaeef5',
  border:       '#dae1ed',
  text:         '#141414',
  textNavy:     '#1b1543',
  muted:        '#85829a',
  light:        '#b2b0c1',
  blue:         '#0445f5',
  green:        '#16a34a',   greenBg: '#f0fdf4',
  orange:       '#f97316',   orangeBg: '#fff7ed',
  yellow:       '#d97706',   yellowBg: '#fffbeb',
  red:          '#dc2626',   redBg: '#fef2f2',
  purple:       '#7c3aed',   purpleBg: '#f5f3ff',
  charcoal:     '#232323',
}

// ─── Animated progress hook ──────────────────────────────────────────────────
function useCyclePct() {
  const [pct, setPct] = useState(22)
  const raf = useRef<number | null>(null)
  const t0  = useRef<number | null>(null)
  const TRAVEL = 2800, HOLD = 1200, TOTAL = TRAVEL + HOLD
  useEffect(() => {
    const tick = (now: number) => {
      if (!t0.current) t0.current = now
      const e = (now - t0.current) % TOTAL
      if (e < TRAVEL) {
        const r = e / TRAVEL
        const ease = r < 0.5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2
        setPct(ease * 100)
      } else setPct(100)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [])
  return pct
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function IconArrowUp() {
  return (
    <svg width="13" height="13" viewBox="0 0 10 10" fill="none">
      <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="#5a6a7e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconArrowDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 10 10" fill="none">
      <path d="M8 2L2 8M2 8H6.5M2 8V3.5" stroke="#5a6a7e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconChevron({ down }: { down?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
      <path d={down ? "M4 5.5L7 8.5L10 5.5" : "M4 8.5L7 5.5L10 8.5"} stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6" stroke="#85829a" strokeWidth="1.5"/>
      <path d="M13.5 13.5L17 17" stroke="#85829a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function IconFilter() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M6 10h8M9 15h2" stroke={C.textNavy} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function IconDownload() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
      <path d="M10 3v10M6 9l4 4 4-4M4 17h12" stroke={C.textNavy} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconSpinner() {
  return (
    <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2.5px solid #e5e7eb`, borderTopColor: C.blue, animation: 'outSpin 0.9s linear infinite', flexShrink: 0 }} />
  )
}
function IconPulse() {
  return (
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.orange, flexShrink: 0, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: `${C.orange}30` }} />
    </div>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
type Variant = 'processing' | 'completed' | 'awaiting' | 'compliance' | 'cancelled' | 'settlement' | 'awaitingCompliance' | 'additionalInfo'
const BDGS: Record<Variant, { label: string; color: string; bg: string; dot?: boolean; check?: boolean }> = {
  processing:         { label: 'Processing Payment',           color: C.blue,    bg: C.bg,         dot: true },
  completed:          { label: 'Completed',                    color: C.green,   bg: C.greenBg,    check: true },
  awaiting:           { label: 'Awaiting Funds',               color: C.orange,  bg: C.orangeBg,   dot: true },
  compliance:         { label: 'In Compliance Review',         color: C.yellow,  bg: C.yellowBg,   dot: true },
  cancelled:          { label: 'Cancelled',                    color: C.muted,   bg: C.bgGrey },
  settlement:         { label: 'Processing Settlement',        color: C.blue,    bg: C.bg,         dot: true },
  awaitingCompliance: { label: 'Awaiting Compliance Review',   color: C.purple,  bg: C.purpleBg,   dot: true },
  additionalInfo:     { label: 'Additional Info Requested',    color: C.orange,  bg: C.orangeBg,   dot: true },
}
function Badge({ v }: { v: Variant }) {
  const { label, color, bg, dot, check } = BDGS[v]
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', border: `1px solid ${C.border}`, borderRadius: 8, background: bg, flexShrink: 0 }}>
      {check && <span style={{ fontSize: 11, color, fontWeight: 700, lineHeight: 1 }}>✓</span>}
      {dot   && <span style={{ width: 9, height: 9, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />}
      <span style={{ fontSize: 12, fontWeight: 500, color, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{label}</span>
    </span>
  )
}

// ─── Progress pill ────────────────────────────────────────────────────────────
function Pill({ fill, color = C.blue, flex, width }: { fill: number; color?: string; flex?: boolean; width?: number }) {
  return (
    <div style={{
      position: 'relative', height: 16,
      width: flex ? '100%' : width, flex: flex ? '1 1 0' : undefined, flexShrink: flex ? undefined : 0,
      borderRadius: 999, background: '#d8dee3',
      boxShadow: '0 1px 2px rgba(164,174,183,0.3), 3px 3px 4px rgba(164,174,183,0.15)',
      overflow: 'hidden',
    }}>
      {fill > 0 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.min(fill, 100)}%`,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${color} 0%, ${color}cc 60%, ${color}55 90%, ${color}22 100%)`,
        }} />
      )}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 3px 3px 4px rgba(0,0,0,0.07), inset -1px -1px 3px rgba(255,255,255,0.7)', pointerEvents: 'none' }} />
    </div>
  )
}

// ─── Action footer (Preview | Copy Tracking Link | lock note | View Full Details) ─
function ActionFooter() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: `1px solid ${C.border}`, marginTop: 2 }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: `1px solid ${C.border}`, borderRadius: 10, background: C.bg, fontSize: 12, fontWeight: 500, color: C.textNavy, fontFamily: 'Inter, system-ui, sans-serif', cursor: 'default', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={C.textNavy} strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke={C.textNavy} strokeWidth="1.5"/></svg>
        Preview
      </button>
      <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', border: `1px solid ${C.charcoal}`, borderRadius: 10, background: C.bg, fontSize: 12, fontWeight: 500, color: C.charcoal, fontFamily: 'Inter, system-ui, sans-serif', cursor: 'default', flexShrink: 0 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.charcoal} strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        Copy Tracking Link
      </button>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', flex: 1 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        For security, this tracking link expires after 48 hours.
      </span>
      <button style={{ padding: '9px 18px', borderRadius: 10, background: C.charcoal, fontSize: 12, fontWeight: 500, color: '#fff', fontFamily: 'Inter, system-ui, sans-serif', border: 'none', cursor: 'default', flexShrink: 0 }}>
        View Full Details
      </button>
    </div>
  )
}

// ─── Transaction row header (collapsed-style top line) ───────────────────────
function RowHeader({ mon, day, label, sub, amount, amountSub, badge, open, incoming }: {
  mon: string; day: string; label: string; sub: string; amount: string; amountSub: string; badge: Variant; open?: boolean; incoming?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px', minHeight: 72 }}>
      {/* Date */}
      <div style={{ flexShrink: 0, width: 28, textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: C.muted, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif' }}>{mon}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: C.textNavy, lineHeight: 1.3, fontFamily: 'Inter, system-ui, sans-serif' }}>{day}</div>
      </div>
      {/* Type icon */}
      <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.bgGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {incoming ? <IconArrowDown /> : <IconArrowUp />}
      </div>
      {/* From */}
      <div style={{ width: 220, flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>
      </div>
      {/* Amount */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.text, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{amount}</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 2 }}>{amountSub}</div>
      </div>
      {/* Badge */}
      <div style={{ flexShrink: 0 }}><Badge v={badge} /></div>
      {/* Chevron */}
      <IconChevron down={open} />
    </div>
  )
}

// ─── Expanded row: Processing Payment ─────────────────────────────────────────
function ProcessingExpanded({ pct }: { pct: number }) {
  const step = pct < 34 ? '1' : pct < 68 ? '2' : '3'
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, background: C.bg, overflow: 'hidden' }}>
      <RowHeader
        mon="NOV" day="15" label="USD → USDC (ETH)"
        sub="From My Conduit Account | 269,730 USDC (ETH)"
        amount="269,730 USDC (ETH)" amountSub="To Jane Doe"
        badge="processing" open
      />
      <div style={{ padding: '0 24px 20px', borderTop: `1px solid #f3f4f6` }}>
        {/* Status text */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 0 16px' }}>
          <div style={{ marginTop: 2, flexShrink: 0 }}><IconSpinner /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: 'Inter, system-ui, sans-serif' }}>Starting Journey Onchain</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 3 }}>Beginning to process transfer of value with stablecoins.</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 6 }}>
              Est. Settlement&nbsp;<span style={{ color: C.text, fontWeight: 500 }}>Nov 16, 2025 8:00 AM EST</span>
            </div>
          </div>
        </div>
        {/* Transaction tracker */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', marginBottom: 14 }}>
          {/* Created */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flexShrink: 0, width: 50 }}>
            <Pill fill={100} width={50} />
            <span style={{ fontSize: 9.5, color: C.text, fontFamily: 'Inter, system-ui, sans-serif' }}>Created</span>
          </div>
          {/* Compliance Approved */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flexShrink: 0, width: 80 }}>
            <Pill fill={100} width={80} />
            <span style={{ fontSize: 9.5, color: C.text, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>Compliance Approved</span>
          </div>
          {/* Processing Payment — animated */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flex: 1, minWidth: 0 }}>
            <Pill fill={pct} flex />
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: C.text, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>Processing Payment</span>
              <span style={{ fontSize: 9.5, color: C.light }}>|</span>
              <span style={{ fontSize: 9.5, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{step} of 3 Steps</span>
            </div>
          </div>
          {/* Completed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', flexShrink: 0, width: 64 }}>
            <Pill fill={0} width={64} />
            <span style={{ fontSize: 9.5, color: C.light, fontFamily: 'Inter, system-ui, sans-serif' }}>Completed</span>
          </div>
        </div>
        {/* Transaction ID */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 0', borderTop: `1px solid #f3f4f6`, fontSize: 12, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <span style={{ fontWeight: 500, color: C.text }}>Transaction ID:</span>
          <span style={{ color: C.text, fontFamily: 'monospace', fontSize: 11 }}>38ezNE9JgRxy1iioBNbQKu0KtOS</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </div>
        <ActionFooter />
      </div>
    </div>
  )
}

// ─── Expanded row: Awaiting Funds ─────────────────────────────────────────────
function AwaitingExpanded() {
  const stages = [
    { label: 'Approved',      fill: 100, width: 50, color: C.orange },
    { label: 'Approved',      fill: 100, width: 50, color: C.orange },
    { label: 'Awaiting Funds', fill: 80, flex: true, color: C.orange },
    { label: 'In Compliance', fill: 0,   width: 70, color: C.light },
    { label: 'Processing',    fill: 0,   width: 60, color: C.light },
    { label: 'Completed',     fill: 0,   width: 64, color: C.light },
  ]
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, background: C.bg, overflow: 'hidden' }}>
      <RowHeader
        mon="JAN" day="15" label="USD → USDC (ETH)"
        sub="From My Conduit Account | 269,730 USDC (ETH)"
        amount="269,730 USDC (ETH)" amountSub="To Jane Doe"
        badge="awaiting" open
      />
      <div style={{ padding: '0 24px 20px', borderTop: `1px solid #f3f4f6` }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 0 16px' }}>
          <div style={{ marginTop: 3, flexShrink: 0 }}><IconPulse /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: 'Inter, system-ui, sans-serif' }}>Awaiting funds from the sender.</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 3 }}>Funds must be added or reserved before the payment can continue. No processing occurs at this stage.</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 6 }}>
              Est. Settlement&nbsp;<span style={{ color: C.text, fontWeight: 500 }}>Jan 16, 2025 8:00 AM EST</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', marginBottom: 14 }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', ...(s.flex ? { flex: 1, minWidth: 0 } : { flexShrink: 0, width: s.width }) }}>
              <Pill fill={s.fill} color={s.color} flex={s.flex} width={s.width} />
              <span style={{ fontSize: 9, color: s.fill === 0 ? C.light : C.text, fontWeight: s.label === 'Awaiting Funds' ? 600 : 400, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <ActionFooter />
      </div>
    </div>
  )
}

// ─── Expanded row: Processing (step 2) ────────────────────────────────────────
function ProcessingStep2() {
  const stages = [
    { label: 'Approved',          fill: 100, width: 50 },
    { label: 'Processing Payment', fill: 65, flex: true },
    { label: 'Compliance',        fill: 0,  width: 70, dim: true },
    { label: 'Completed',         fill: 0,  width: 64, dim: true },
  ]
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, background: C.bg, overflow: 'hidden' }}>
      <RowHeader
        mon="JAN" day="15" label="USD → USDC (ETH)"
        sub="From My Conduit Account | 269,730 USDC (ETH)"
        amount="269,730 USDC (ETH)" amountSub="To Jane Doe"
        badge="processing" open
      />
      <div style={{ padding: '0 24px 20px', borderTop: `1px solid #f3f4f6` }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 0 16px' }}>
          <div style={{ marginTop: 2, flexShrink: 0 }}><IconSpinner /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, fontFamily: 'Inter, system-ui, sans-serif' }}>Our team currently processing this transaction.</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 3 }}>Tim currently is in the process of transferring funds into the recipient account.</div>
            <div style={{ fontSize: 12, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 6 }}>
              Est. Settlement&nbsp;<span style={{ color: C.text, fontWeight: 500 }}>Jan 16, 2025 8:00 AM EST</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', marginBottom: 14 }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', ...(s.flex ? { flex: 1, minWidth: 0 } : { flexShrink: 0, width: s.width }) }}>
              <Pill fill={s.fill} flex={s.flex} width={s.width} />
              <span style={{ fontSize: 9, color: (s as any).dim ? C.light : C.text, fontWeight: s.label === 'Processing Payment' ? 600 : 400, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <ActionFooter />
      </div>
    </div>
  )
}

// ─── Collapsed row ────────────────────────────────────────────────────────────
function CollapsedRow({ mon, day, label, sub, amount, amountSub, badge, incoming }: {
  mon: string; day: string; label: string; sub: string; amount: string; amountSub: string; badge: Variant; incoming?: boolean
}) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, background: C.bg }}>
      <RowHeader mon={mon} day={day} label={label} sub={sub} amount={amount} amountSub={amountSub} badge={badge} incoming={incoming} />
    </div>
  )
}

// ─── Section date header ──────────────────────────────────────────────────────
function SectionDate({ children }: { children: string }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif', padding: '4px 0 8px' }}>
      {children}
    </div>
  )
}

// ─── App chrome ───────────────────────────────────────────────────────────────
function AppChrome({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      {/* MVP label */}
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--warm-light)', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ background: C.bgPage, borderRadius: 14, border: `1px solid ${C.border}`, overflow: 'hidden', flex: 1 }}>
        {/* Nav bar */}
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 20, background: C.textNavy, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" fill="white" opacity=".9"/><rect x="7" y="1" width="4" height="4" rx="1" fill="white" opacity=".5"/><rect x="1" y="7" width="4" height="4" rx="1" fill="white" opacity=".5"/><rect x="7" y="7" width="4" height="4" rx="1" fill="white" opacity=".3"/></svg>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.textNavy, fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em' }}>Conduit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: '#fff', fontWeight: 700, fontFamily: 'Inter, system-ui, sans-serif' }}>C</span>
            </div>
            <span style={{ fontSize: 10, color: C.muted, fontFamily: 'Inter, system-ui, sans-serif' }}>cindy@conduit.financial</span>
          </div>
        </div>
        {/* Page header */}
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: '16px 24px 0' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.textNavy, fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.02em', marginBottom: 12 }}>Transactions</div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {['All', 'Pending 12', 'Completed'].map((tab, i) => (
              <div key={tab} style={{ padding: '8px 16px', fontSize: 12, color: i === 0 ? C.textNavy : C.muted, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? `2.5px solid ${C.textNavy}` : '2.5px solid transparent', marginBottom: -1, cursor: 'default' }}>{tab}</div>
            ))}
          </div>
        </div>
        {/* Search + filters */}
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}`, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 14px', background: C.bg }}>
            <IconSearch />
            <span style={{ fontSize: 12, color: C.light, fontFamily: 'Inter, system-ui, sans-serif' }}>Search by Name, Wallet Address, or Transaction ID</span>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: `1px solid ${C.border}`, borderRadius: 10, background: C.bg, fontSize: 12, color: C.textNavy, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500, cursor: 'default', flexShrink: 0 }}>
            <IconFilter /> Filters
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: `1px solid ${C.border}`, borderRadius: 10, background: C.bg, fontSize: 12, color: C.textNavy, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500, cursor: 'default', flexShrink: 0 }}>
            <IconDownload /> Export CSV
          </button>
        </div>
        {/* Content */}
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function OutcomesShowcase() {
  const pct = useCyclePct()

  const defaultSub = 'From BlueSky Ventures... | $200,000.00 USD'
  const defaultAmt = '269,730 USDC (ETH)'
  const defaultAmtSub = 'To My Conduit Account'

  return (
    <div style={{
      display: 'flex', gap: 20, alignItems: 'flex-start',
      width: 'calc(100vw - var(--sidebar-gap) - 160px)',
      marginRight: 0,
    }}>

      {/* ── MVP 1: Transaction List ── */}
      <AppChrome label="MVP 1 — Transaction List">
        <SectionDate>July 2024</SectionDate>
        <CollapsedRow mon="JUL" day="19" label="USD → USDC (ETH)" sub={defaultSub} amount={defaultAmt} amountSub={defaultAmtSub} badge="completed" />
        <CollapsedRow mon="JUL" day="19" label="USD → USDC (ETH)" sub={defaultSub} amount={defaultAmt} amountSub={defaultAmtSub} badge="cancelled" />
        <CollapsedRow mon="JUL" day="19" label="USD → USDC (ETH)" sub={defaultSub} amount={defaultAmt} amountSub={defaultAmtSub} badge="awaiting" />
        <CollapsedRow mon="JUL" day="19" label="USD → USDC (ETH)" sub={defaultSub} amount={defaultAmt} amountSub={defaultAmtSub} badge="settlement" />
        <CollapsedRow mon="JUL" day="17" label="USDC (ETH) → USD" sub="From My Conduit Account | 269,730 USDC (ETH)" amount="$270,000 USD" amountSub="To Carmoly SA" badge="compliance" incoming />
        <CollapsedRow mon="JUL" day="17" label="USDC (ETH) → USD" sub="From My Conduit Account | 269,730 USDC (ETH)" amount="$270,000 USD" amountSub="To Carmoly SA" badge="processing" incoming />
        <CollapsedRow mon="JUL" day="17" label="USDC (ETH) → USD" sub="From My Conduit Account | 269,730 USDC (ETH)" amount="$270,000 USD" amountSub="To Carmoly SA" badge="awaitingCompliance" incoming />
      </AppChrome>

      {/* ── MVP 2: Transaction Tracker ── */}
      <AppChrome label="MVP 2 — Transaction Tracker">
        <SectionDate>September 2025</SectionDate>
        <ProcessingExpanded pct={pct} />
        <CollapsedRow mon="JAN" day="15" label="USD → USDC (ETH)" sub="From My Conduit Account | 269,730 USDC (ETH)" amount="269,730 USDC (ETH)" amountSub="To Jane Doe" badge="completed" />
        <AwaitingExpanded />
        <ProcessingStep2 />
        <CollapsedRow mon="JAN" day="15" label="USD → USDC (ETH)" sub="From My Conduit Account | 269,730 USDC (ETH)" amount="269,730 USDC (ETH)" amountSub="To Jane Doe" badge="processing" />
        <CollapsedRow mon="JAN" day="15" label="USD → USDC (ETH)" sub="From My Conduit Account | 269,730 USDC (ETH)" amount="269,730 USDC (ETH)" amountSub="To Jane Doe" badge="processing" />
      </AppChrome>

      <style>{`@keyframes outSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
