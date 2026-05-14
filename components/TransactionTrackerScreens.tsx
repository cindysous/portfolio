'use client'

// ── Inline SVG icons — permanent, no external dependency ─────────────────────
const _ARROW = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M12 19V5M5 12l7-7 7 7' stroke='%231b1543' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"
const _CHEV  = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M9 18l6-6-6-6' stroke='%2385829a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>"
const _COPY  = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><rect x='9' y='9' width='13' height='13' rx='2' stroke='%2385829a' stroke-width='1.8'/><path d='M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' stroke='%2385829a' stroke-width='1.8' stroke-linecap='round'/></svg>"
const _EYE   = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' stroke='%2385829a' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><circle cx='12' cy='12' r='3' stroke='%2385829a' stroke-width='1.8'/></svg>"
const _LINK  = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71' stroke='%23141414' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71' stroke='%23141414' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>"
const _LOCK  = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><rect x='3' y='11' width='18' height='11' rx='2' stroke='%2385829a' stroke-width='1.8'/><path d='M7 11V7a5 5 0 0110 0v4' stroke='%2385829a' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>"

const PROC_ARROW_UP  = _ARROW
const PROC_CHEVRON   = _CHEV
const PROC_COPY_ICON = _COPY
const PROC_EYE_ICON  = _EYE
const PROC_LINK_ICON = _LINK
const PROC_LOCK_ICON = _LOCK

const AWAIT_ARROW_UP  = _ARROW
const AWAIT_CHEVRON   = _CHEV
const AWAIT_EYE_ICON  = _EYE
const AWAIT_LINK_ICON = _LINK
const AWAIT_LOCK_ICON = _LOCK

const APP_ARROW_UP = _ARROW
const APP_CHEVRON  = _CHEV

// ── Neumorphic pill ────────────────────────────────────────────────────────────
const PILL_WRAP: React.CSSProperties = {
  height: 14, borderRadius: 999,
  background: '#d8dee3',
  boxShadow: '0 1px 2px rgba(164,174,183,0.3), 3px 3px 4px rgba(164,174,183,0.15)',
  position: 'relative', overflow: 'hidden', flexShrink: 0,
}
const PILL_INNER: React.CSSProperties = {
  position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
  boxShadow: 'inset 3px 3px 4px rgba(0,0,0,0.07), inset -1px -1px 3px rgba(255,255,255,0.7)',
}

function FilledPill({ width }: { width: number | string }) {
  return (
    <div style={{ ...PILL_WRAP, width }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'linear-gradient(90deg, #0445f5 0%, rgba(4,69,245,0.8) 60%, rgba(4,69,245,0.33) 90%, rgba(4,69,245,0.13) 100%)' }} />
      <div style={PILL_INNER} />
    </div>
  )
}
function GreyPill({ width }: { width: number | string }) {
  return (
    <div style={{ ...PILL_WRAP, width }}>
      <div style={PILL_INNER} />
    </div>
  )
}
function OrangePill({ width }: { width: number | string }) {
  return (
    <div style={{ ...PILL_WRAP, width }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'linear-gradient(90deg, #f97316 0%, rgba(249,115,22,0.8) 60%, rgba(249,115,22,0.33) 90%, rgba(249,115,22,0.13) 100%)' }} />
      <div style={PILL_INNER} />
    </div>
  )
}

// ── Row header shared across all 3 screens ────────────────────────────────────
function RowHeader({
  month, day, arrowSrc, chevronSrc,
  badge,
}: {
  month: string; day: string; arrowSrc: string; chevronSrc: string
  badge: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#fff' }}>
      {/* Date */}
      <div style={{ width: 26, textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 500, color: '#85829a', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1.4 }}>{month}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1b1543', lineHeight: 1.2 }}>{day}</div>
      </div>
      {/* Arrow icon */}
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#eaeef5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <img alt="" src={arrowSrc} style={{ width: 11, height: 11, display: 'block' }} />
      </div>
      {/* Tx info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#141414', whiteSpace: 'nowrap' }}>USD → USDC (ETH)</div>
        <div style={{ fontSize: 10, color: '#85829a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>From My Conduit Account | 269,730 USDC</div>
      </div>
      {/* Badge */}
      {badge}
      {/* Chevron */}
      <img alt="" src={chevronSrc} style={{ width: 12, height: 12, display: 'block', flexShrink: 0 }} />
    </div>
  )
}

// ── Screen 1: Transaction List Overview ───────────────────────────────────────
function OverviewScreen() {
  const rows = [
    { dot: '#0445f5', label: 'Processing Payment', active: true },
    { dot: '#22c55e', label: 'Completed',           active: false },
    { dot: '#f97316', label: 'Awaiting Funds',      active: false },
  ]
  return (
    <div style={{ background: '#f5f6f8', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 10, overflow: 'hidden' }}>
      {/* App nav — Conduit logo + user avatar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #dae1ed', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/conduit-logo.svg" alt="Conduit" style={{ height: 14, width: 'auto', display: 'block' }} />
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#0445f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 8, fontWeight: 600, color: '#fff' }}>CS</span>
        </div>
      </div>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #dae1ed', padding: '14px 16px 10px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1b1543', letterSpacing: '-0.03em', marginBottom: 10 }}>Transactions</div>
        <div style={{ display: 'flex', gap: 14, borderBottom: '1px solid #dae1ed', paddingBottom: 8 }}>
          {['All', 'Pending 12', 'Completed'].map((t, i) => (
            <span key={t} style={{ fontSize: 11, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#0445f5' : '#85829a', paddingBottom: 8, borderBottom: i === 0 ? '2px solid #0445f5' : '2px solid transparent' }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #dae1ed', borderRadius: 7, padding: '5px 10px', color: '#85829a', fontSize: 10 }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="#85829a" strokeWidth="1.5"/><path d="M11 11l3 3" stroke="#85829a" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Search by Name, Wallet Address, or Transaction ID
        </div>
      </div>
      {/* Date group */}
      <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 600, color: '#141414' }}>September 2025</div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div key={i} style={{ background: row.active ? '#fafbff' : '#fff', borderTop: '1px solid #eaeef5', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px' }}>
          <div style={{ width: 26, textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 9, fontWeight: 500, color: '#85829a', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: 1.4 }}>NOV</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1b1543' }}>15</div>
          </div>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#eaeef5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img alt="" src={APP_ARROW_UP} style={{ width: 10, height: 10, display: 'block' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#141414', whiteSpace: 'nowrap' }}>USD → USDC (ETH)</div>
            <div style={{ fontSize: 10, color: '#85829a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>From My Conduit Account</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #dae1ed', borderRadius: 7, padding: '4px 10px', background: '#fff', flexShrink: 0 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: row.dot, display: 'inline-block' }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: '#141414', whiteSpace: 'nowrap' }}>{row.label}</span>
          </div>
          <img alt="" src={APP_CHEVRON} style={{ width: 11, height: 11, display: 'block', flexShrink: 0 }} />
        </div>
      ))}
    </div>
  )
}

// ── Screen 2: Processing Payment expanded ─────────────────────────────────────
function ProcessingScreen() {
  return (
    <div style={{ background: '#fff', border: '1px solid #dae1ed', borderRadius: 10, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <RowHeader
        month="NOV" day="15"
        arrowSrc={PROC_ARROW_UP}
        chevronSrc={PROC_CHEVRON}
        badge={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #dae1ed', borderRadius: 7, padding: '4px 10px', flexShrink: 0, background: '#fff' }}>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: '#0445f5', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: '#0445f5', whiteSpace: 'nowrap' }}>Processing Payment</span>
          </div>
        }
      />

      {/* Expanded detail */}
      <div style={{ borderTop: '1px solid #f3f4f6', padding: '14px 16px 14px', flex: 1 }}>
        {/* Spinner + heading */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 18, height: 18, flexShrink: 0, marginTop: 2, position: 'relative' }}>
            <div style={{ width: '100%', height: '100%', border: '2px solid #e5e7eb', borderTopColor: '#0445f5', borderRadius: '50%', animation: 'txSpin 1.1s linear infinite' }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#141414', letterSpacing: '-0.02em', marginBottom: 3 }}>Starting Journey Onchain</div>
            <div style={{ fontSize: 11, color: '#85829a', lineHeight: 1.5, marginBottom: 4 }}>Beginning to process transfer of value with stablecoins.</div>
            <div style={{ fontSize: 11, color: '#85829a' }}>
              Est. Settlement{' '}
              <span style={{ fontWeight: 500, color: '#141414' }}>Nov 16, 2025 8:00 AM EST</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', padding: '6px 0 10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: 44, flexShrink: 0 }}>
            <FilledPill width={44} />
            <span style={{ fontSize: 8, color: '#141414', textAlign: 'center' }}>Created</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: 64, flexShrink: 0 }}>
            <FilledPill width={64} />
            <span style={{ fontSize: 8, color: '#141414', textAlign: 'center' }}>Compliance<br/>Approved</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', flex: 1, minWidth: 0 }}>
            <FilledPill width="100%" />
            <div style={{ display: 'flex', gap: 2, fontSize: 8, justifyContent: 'center', whiteSpace: 'nowrap' }}>
              <span style={{ fontWeight: 600, color: '#141414' }}>Processing Payment</span>
              <span style={{ color: '#85829a' }}>| 2 of 3</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: 50, flexShrink: 0 }}>
            <GreyPill width={50} />
            <span style={{ fontSize: 8, color: '#b2b0c1', textAlign: 'center' }}>Completed</span>
          </div>
        </div>

        {/* Transaction ID */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 8, borderTop: '1px solid #f3f4f6', marginBottom: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 500, color: '#141414', whiteSpace: 'nowrap' }}>Transaction ID:</span>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#141414' }}>38ezNE9JgRxy…</span>
          <img alt="" src={PROC_COPY_ICON} style={{ width: 12, height: 12, display: 'block' }} />
        </div>

        {/* Action buttons */}
        <div style={{ borderTop: '1px solid #dae1ed', paddingTop: 10, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #dae1ed', borderRadius: 8, padding: '5px 10px', cursor: 'default' }}>
            <img alt="" src={PROC_EYE_ICON} style={{ width: 12, height: 12, display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: '#1b1543' }}>Preview</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #232323', borderRadius: 8, padding: '5px 10px', cursor: 'default' }}>
            <img alt="" src={PROC_LINK_ICON} style={{ width: 11, height: 11, display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: '#232323' }}>Copy Tracking Link</span>
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
            <img alt="" src={PROC_LOCK_ICON} style={{ width: 10, height: 10, display: 'block', flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: '#85829a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Link expires after 48 hours.</span>
          </div>
          <button style={{ background: '#232323', border: 'none', borderRadius: 8, padding: '5px 10px', cursor: 'default', flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>View Full Details</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Screen 3: Awaiting Funds expanded ─────────────────────────────────────────
function AwaitingScreen() {
  return (
    <div style={{ background: '#fff', border: '1px solid #dae1ed', borderRadius: 10, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <RowHeader
        month="JAN" day="15"
        arrowSrc={AWAIT_ARROW_UP}
        chevronSrc={AWAIT_CHEVRON}
        badge={
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #dae1ed', borderRadius: 7, padding: '4px 10px', flexShrink: 0, background: '#fff' }}>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: '#f97316', flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: '#f97316', whiteSpace: 'nowrap' }}>Awaiting Funds</span>
          </div>
        }
      />

      {/* Expanded detail */}
      <div style={{ borderTop: '1px solid #f3f4f6', padding: '14px 16px 14px', flex: 1 }}>
        {/* Orange pulse + heading */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: '#f97316', flexShrink: 0, marginTop: 4 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#141414', letterSpacing: '-0.02em', marginBottom: 3 }}>Awaiting funds from the sender.</div>
            <div style={{ fontSize: 11, color: '#85829a', lineHeight: 1.5, marginBottom: 4 }}>Funds must be added or reserved before the payment can continue. No processing occurs at this stage.</div>
            <div style={{ fontSize: 11, color: '#85829a' }}>
              Est. Settlement{' '}
              <span style={{ fontWeight: 500, color: '#141414' }}>Jan 16, 2025 8:00 AM EST</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', padding: '6px 0 10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: 44, flexShrink: 0 }}>
            <OrangePill width={44} />
            <span style={{ fontSize: 8, color: '#141414', textAlign: 'center' }}>Approved</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', flex: 1, minWidth: 0 }}>
            <OrangePill width="100%" />
            <span style={{ fontSize: 8, fontWeight: 600, color: '#141414', textAlign: 'center' }}>Awaiting Funds</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: 56, flexShrink: 0 }}>
            <GreyPill width={56} />
            <span style={{ fontSize: 8, color: '#b2b0c1', textAlign: 'center' }}>In Compliance</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: 50, flexShrink: 0 }}>
            <GreyPill width={50} />
            <span style={{ fontSize: 8, color: '#b2b0c1', textAlign: 'center' }}>Processing</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', width: 50, flexShrink: 0 }}>
            <GreyPill width={50} />
            <span style={{ fontSize: 8, color: '#b2b0c1', textAlign: 'center' }}>Completed</span>
          </div>
        </div>

        {/* Spacer + divider */}
        <div style={{ height: 18 }} />

        {/* Action buttons */}
        <div style={{ borderTop: '1px solid #dae1ed', paddingTop: 10, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #dae1ed', borderRadius: 8, padding: '5px 10px', cursor: 'default' }}>
            <img alt="" src={AWAIT_EYE_ICON} style={{ width: 12, height: 12, display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: '#1b1543' }}>Preview</span>
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1px solid #232323', borderRadius: 8, padding: '5px 10px', cursor: 'default' }}>
            <img alt="" src={AWAIT_LINK_ICON} style={{ width: 11, height: 11, display: 'block' }} />
            <span style={{ fontSize: 10, fontWeight: 500, color: '#232323' }}>Copy Tracking Link</span>
          </button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
            <img alt="" src={AWAIT_LOCK_ICON} style={{ width: 10, height: 10, display: 'block', flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: '#85829a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Link expires after 48 hours.</span>
          </div>
          <button style={{ background: '#232323', border: 'none', borderRadius: 8, padding: '5px 10px', cursor: 'default', flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap' }}>View Full Details</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Screen card wrapper with label ────────────────────────────────────────────
function ScreenCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 280 }}>
      {/* Browser chrome */}
      <div style={{
        background: '#1c2b3a', padding: '8px 12px',
        borderRadius: '12px 12px 0 0',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#141412',
          background: '#d0e5fa', padding: '2px 7px', borderRadius: 4,
        }}>
          {label}
        </span>
      </div>
      {/* Screen */}
      <div style={{
        border: '1px solid rgba(74,107,69,0.15)',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        boxShadow: '0px 4px 24px 0px rgba(0,0,0,0.1)',
      }}>
        {children}
      </div>
    </div>
  )
}

// ── Main exported component ───────────────────────────────────────────────────
export default function TransactionTrackerScreens() {
  const screens = [
    { label: 'transaction list', el: <OverviewScreen /> },
    { label: 'processing state', el: <ProcessingScreen /> },
    { label: 'awaiting funds state', el: <AwaitingScreen /> },
  ]

  const isCarousel = screens.length > 3

  if (isCarousel) {
    return (
      <div style={{ position: 'relative', margin: '0 0 32px' }}>
        <div style={{
          display: 'flex', gap: 16, overflowX: 'auto',
          paddingBottom: 12,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          // @ts-expect-error vendor
          scrollbarWidth: 'none',
        }}>
          {screens.map((s, i) => (
            <div key={i} style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 320 }}>
              <ScreenCard label={s.label}>{s.el}</ScreenCard>
            </div>
          ))}
        </div>
        {/* Fade hint at right edge */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 12, width: 48,
          background: 'linear-gradient(to right, transparent, var(--section-bg, #fff))',
          pointerEvents: 'none',
        }} />
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${screens.length}, 1fr)`,
      gap: 16,
      margin: '0 0 32px',
    }}>
      {screens.map((s, i) => (
        <ScreenCard key={i} label={s.label}>{s.el}</ScreenCard>
      ))}
    </div>
  )
}
