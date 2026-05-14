'use client'

// ─── Design tokens from Figma ────────────────────────────────────────────────
const T = {
  border:   '#dae1ed',
  bg:       '#ffffff',
  bgGrey:   '#eaeef5',
  text:     '#141414',
  muted:    '#85829a',
  light:    '#b2b0c1',
  blue:     '#0445f5',
  green:    '#16a34a',
  greenBg:  '#f0fdf4',
  orange:   '#f97316',
  orangeBg: '#fff7ed',
  yellow:   '#d97706',
  yellowBg: '#fffbeb',
  red:      '#dc2626',
  redBg:    '#fef2f2',
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────
function ArrowIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="#5a6a7e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Chevron ─────────────────────────────────────────────────────────────────
function Chevron({ open }: { open?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.35 }}>
      <path d={open ? "M4 8.5L7 5.5L10 8.5" : "M4 5.5L7 8.5L10 5.5"} stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────
type BadgeVariant = 'processing' | 'completed' | 'awaiting' | 'info' | 'compliance'

const BADGE_CONFIG: Record<BadgeVariant, { label: string; color: string; bg: string; dot?: boolean; check?: boolean }> = {
  processing: { label: 'Processing Payment', color: T.blue,    bg: T.bg,       dot: true },
  completed:  { label: 'Completed',           color: T.green,   bg: T.greenBg,  check: true },
  awaiting:   { label: 'Awaiting Funds',      color: T.orange,  bg: T.orangeBg, dot: true },
  info:       { label: 'Additional Info',     color: T.yellow,  bg: T.yellowBg, dot: true },
  compliance: { label: 'Compliance Review',   color: T.red,     bg: T.redBg,    dot: true },
}

function Badge({ variant }: { variant: BadgeVariant }) {
  const { label, color, bg, dot, check } = BADGE_CONFIG[variant]
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px',
      border: `1px solid ${T.border}`,
      borderRadius: 8, background: bg, flexShrink: 0,
    }}>
      {check && <span style={{ fontSize: 11, color, lineHeight: 1, fontWeight: 600 }}>✓</span>}
      {dot   && <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />}
      <span style={{ fontSize: 11, fontWeight: 500, color, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap' }}>
        {label}
      </span>
    </div>
  )
}

// ─── Progress pill ────────────────────────────────────────────────────────────
function Pill({ fill, flex, width, color = T.blue }: { fill: number; flex?: boolean; width?: number; color?: string }) {
  return (
    <div style={{
      position: 'relative', height: 13,
      width: flex ? '100%' : width, flexShrink: flex ? undefined : 0,
      flex: flex ? 1 : undefined,
      borderRadius: 999,
      background: '#d8dee3',
      borderTop: '1px solid rgba(255,255,255,0.95)',
      boxShadow: '0px 1px 1.5px rgba(164,174,183,0.3), 3px 3px 4px rgba(164,174,183,0.18)',
      overflow: 'hidden',
    }}>
      {fill > 0 && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${fill}%`, borderRadius: 999,
          background: `linear-gradient(90deg, ${color} 0%, ${color}cc 75%, ${color}40 100%)`,
          opacity: 0.88,
        }} />
      )}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.08), inset -1px -1px 2px rgba(255,255,255,0.65)', pointerEvents: 'none' }} />
    </div>
  )
}

// ─── Collapsed transaction row ────────────────────────────────────────────────
function CollapsedRow({ variant }: { variant: BadgeVariant }) {
  return (
    <div style={{
      background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8,
      padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{ flexShrink: 0, width: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 7, color: T.muted, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1 }}>JAN</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.3 }}>15</div>
      </div>
      <div style={{ width: 26, height: 26, borderRadius: '50%', background: T.bgGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <ArrowIcon size={10} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: 'Inter, system-ui, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>USD → USDC (ETH)</div>
        <div style={{ fontSize: 9, color: T.muted, fontFamily: 'Inter, system-ui, sans-serif', marginTop: 2 }}>From My Conduit Account</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>269,730 USDC</div>
        <div style={{ fontSize: 9, color: T.muted, marginTop: 2 }}>To Jane Doe</div>
      </div>
      <Badge variant={variant} />
      <Chevron />
    </div>
  )
}

// ─── Expanded row: Processing Payment ─────────────────────────────────────────
function ProcessingRow() {
  const stages = [
    { label: 'Created',    fill: 100, width: 38, color: T.blue },
    { label: 'Compliance', fill: 100, width: 52, color: T.blue },
    { label: 'Processing Payment | 1 of 3', fill: 45, flex: true, color: T.blue },
    { label: 'Completed',  fill: 0,   width: 44, color: T.light },
  ]
  return (
    <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: `1px solid #f3f4f6` }}>
        <div style={{ flexShrink: 0, width: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 7, color: T.muted, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1 }}>NOV</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.3 }}>15</div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: T.bgGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowIcon size={10} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>USD → USDC (ETH)</div>
          <div style={{ fontSize: 9, color: T.muted, marginTop: 2 }}>From My Conduit Account · 269,730 USDC</div>
        </div>
        <Badge variant="processing" />
        <Chevron open />
      </div>
      {/* Body */}
      <div style={{ padding: '12px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid #e5e7eb`, borderTopColor: T.blue, animation: 'spin 0.9s linear infinite', flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.3 }}>Starting Journey On Chain</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>We're safely recording this transaction on the blockchain.</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>Est. Settlement <span style={{ color: T.text, fontWeight: 500 }}>Nov 16, 2025 · 8:00 AM EST</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', ...(s.flex ? { flex: 1, minWidth: 0 } : { flexShrink: 0 }) }}>
              <Pill fill={s.fill} width={s.width} flex={s.flex} color={s.color} />
              <span style={{ fontSize: 8, color: s.fill === 0 ? T.light : T.text, fontWeight: s.label.startsWith('Processing') ? 600 : 400, whiteSpace: 'nowrap', fontFamily: 'Inter, system-ui, sans-serif' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Expanded row: Awaiting Funds ─────────────────────────────────────────────
function AwaitingRow() {
  const stages = [
    { label: 'Created',     fill: 100, width: 38, color: T.orange },
    { label: 'Awaiting Funds', fill: 80, flex: true, color: T.orange },
    { label: 'Compliance', fill: 0, width: 44, color: T.light },
    { label: 'Processing',  fill: 0, width: 44, color: T.light },
    { label: 'Completed',   fill: 0, width: 44, color: T.light },
  ]
  return (
    <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: `1px solid #f3f4f6` }}>
        <div style={{ flexShrink: 0, width: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 7, color: T.muted, letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1 }}>JAN</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.3 }}>15</div>
        </div>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: T.bgGrey, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ArrowIcon size={10} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>USD → USDC (ETH)</div>
          <div style={{ fontSize: 9, color: T.muted, marginTop: 2 }}>From My Conduit Account · 269,730 USDC</div>
        </div>
        <Badge variant="awaiting" />
        <Chevron open />
      </div>
      <div style={{ padding: '12px 16px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.orange, flexShrink: 0, marginTop: 4 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.3 }}>Currently awaiting funds from the sender.</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>Est. Settlement <span style={{ color: T.text, fontWeight: 500 }}>Jan 16, 2025 · 8:00 AM EST</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', ...(s.flex ? { flex: 1, minWidth: 0 } : { flexShrink: 0 }) }}>
              <Pill fill={s.fill} width={s.width} flex={s.flex} color={s.color} />
              <span style={{ fontSize: 8, color: s.fill === 0 ? T.light : T.text, fontWeight: s.label === 'Awaiting Funds' ? 600 : 400, whiteSpace: 'nowrap', fontFamily: 'Inter, system-ui, sans-serif' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-inter)', fontSize: 8, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: 'var(--warm-light)',
      marginBottom: 10,
    }}>
      {children}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function ComponentSystemShowcase() {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-inter)',
          fontSize: 10, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--ink)',
          background: 'var(--border)', padding: '3px 8px', borderRadius: 4,
        }}>
          component system
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/conduit-logo.svg" alt="Conduit" style={{ height: 12, width: 'auto', display: 'block', opacity: 0.55 }} />
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 9, color: 'var(--warm-light)', letterSpacing: '0.08em' }}>
            TransactionRow · StatusBadge · ProgressTracker
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* Status Badges */}
        <div>
          <SectionLabel>Status Badge — all variants</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(Object.keys(BADGE_CONFIG) as BadgeVariant[]).map(v => (
              <Badge key={v} variant={v} />
            ))}
          </div>
        </div>

        {/* Collapsed rows */}
        <div>
          <SectionLabel>Transaction Row — collapsed</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <CollapsedRow variant="processing" />
            <CollapsedRow variant="completed" />
            <CollapsedRow variant="awaiting" />
          </div>
        </div>

        {/* Expanded rows */}
        <div>
          <SectionLabel>Transaction Row — expanded states</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ProcessingRow />
            <AwaitingRow />
          </div>
        </div>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
