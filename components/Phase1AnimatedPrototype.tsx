'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── Exact Figma design tokens ──────────────────────────────────────────────────
const VIOLET    = '#614DE6'
const VIOLET_LT = 'rgba(97,77,230,0.09)'
const NAVY      = '#1B1543'
const INK       = '#141414'
const CHARCOAL  = '#85829A'
const BORDER    = '#DAE1ED'
const GRAY_BG   = '#F2F5FA'

// ── Inner canvas dimensions — height matches Phase1ScreenPreview aspect ratio ──
const CANVAS_W = 1728
const CANVAS_H = 1141

// ── Animation phases ───────────────────────────────────────────────────────────
type Phase = 'idle' | 'search' | 'filter' | 'export' | 'detail'
const SEQUENCE: Phase[] = ['idle', 'search', 'filter', 'export', 'detail']
const DURATION: Record<Phase, number> = {
  idle: 2200, search: 4500, filter: 4200, export: 2800, detail: 4800,
}

// ── Animation state ────────────────────────────────────────────────────────────
interface AnimState {
  phase: Phase
  searchText: string
  filterOpen: boolean
  filterOn: boolean
  exported: boolean
  detailOpen: boolean
  activeRow: number | null
}

// ── Transaction data ───────────────────────────────────────────────────────────
interface Row {
  month: string; day: string; dir: 'in' | 'out' | 'dep'
  label: string; sub: string; amount: string; status: string
}
const ROWS: Row[] = [
  { month: 'JUL', day: '19', dir: 'in',  label: 'USD → USDC (ETH)', sub: 'BlueSky Ventures · $200,000', amount: '269,730 USDC', status: 'completed'  },
  { month: 'JUL', day: '19', dir: 'in',  label: 'USD → USDC (ETH)', sub: 'BlueSky Ventures · $200,000', amount: '269,730 USDC', status: 'settlement' },
  { month: 'JUL', day: '19', dir: 'in',  label: 'USD → USDC (ETH)', sub: 'BlueSky Ventures · $200,000', amount: '269,730 USDC', status: 'awaiting'   },
  { month: 'JUL', day: '17', dir: 'out', label: 'USDC (ETH) → USD', sub: 'My Conduit Account',          amount: '$270,000 USD',  status: 'compliance' },
  { month: 'JUL', day: '17', dir: 'out', label: 'USDC (ETH) → USD', sub: 'My Conduit Account',          amount: '$270,000 USD',  status: 'payment'    },
  { month: 'JUL', day: '16', dir: 'dep', label: 'Deposit',           sub: '0x3995...c7f6',              amount: '19,984 USDT',   status: 'compliance' },
]
const BADGE: Record<string, { bg: string; clr: string; dot?: string; label: string }> = {
  completed:  { bg: '#E8F5E9', clr: '#3B873E',                 label: 'Completed'                 },
  settlement: { bg: '#EEF2FF', clr: '#4338CA', dot: '#4338CA', label: 'Processing Settlement'      },
  awaiting:   { bg: '#EFEDFE', clr: INK,        dot: VIOLET,   label: 'Awaiting Compliance Review' },
  compliance: { bg: '#FFF5D3', clr: INK,        dot: '#FFC400',label: 'In Compliance Review'       },
  payment:    { bg: '#EEF2FF', clr: '#4338CA', dot: '#4338CA', label: 'Processing Payment'         },
}

// ── Direction icon ─────────────────────────────────────────────────────────────
function DirIcon({ dir }: { dir: Row['dir'] }) {
  const s = { width: 16, height: 16, strokeWidth: 2, strokeLinecap: 'round' as const, stroke: INK, fill: 'none' }
  if (dir === 'in')  return <svg viewBox="0 0 24 24" {...s}><path d="M7 17 17 7M7 7h10v10"/></svg>
  if (dir === 'out') return <svg viewBox="0 0 24 24" {...s}><path d="M17 7 7 17M17 17H7V7"/></svg>
  return <svg viewBox="0 0 24 24" {...s}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}

// ── Status badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const b = BADGE[status] ?? BADGE.compliance
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 12px', borderRadius: 9,
      background: b.bg, flexShrink: 0,
    }}>
      {b.dot && <div style={{ width: 7, height: 7, borderRadius: '50%', background: b.dot, flexShrink: 0 }} />}
      <span style={{ fontSize: 13, fontWeight: 500, color: b.clr, whiteSpace: 'nowrap', lineHeight: 1 }}>
        {b.label}
      </span>
    </div>
  )
}

// ── TxnUI — rendered at CANVAS_W × CANVAS_H, scaled by parent ─────────────────
function TxnUI({ anim }: { anim: AnimState }) {
  const { phase, searchText, filterOpen, filterOn, exported, detailOpen, activeRow } = anim

  const visibleRows = ROWS.filter(r => {
    if (phase === 'search' && searchText.length > 2) return r.sub.startsWith('BlueSky')
    if (phase === 'filter' && filterOn) return r.status === 'completed'
    return true
  })

  const searchFocused = phase === 'search'
  const exportPressed = phase === 'export'

  return (
    <div style={{
      width: CANVAS_W, height: CANVAS_H,
      background: GRAY_BG,
      fontFamily: 'var(--font-inter)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden', position: 'relative',
      userSelect: 'none',
    }}>

      {/* ── Nav bar ────────────────────────────────────────────────────────── */}
      <div style={{
        height: 56, flexShrink: 0,
        background: '#fff', borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 40px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/conduit-logo-nav.png" alt="Conduit" style={{ height: 24, width: 'auto', objectFit: 'contain' }} />
          <div style={{ display: 'flex', gap: 4 }}>
            {(['Send Money', 'Transactions', 'Senders & Recipients'] as const).map(tab => (
              <div key={tab} style={{
                padding: '6px 16px', borderRadius: 25, fontSize: 14, whiteSpace: 'nowrap',
                background: tab === 'Transactions' ? NAVY : 'transparent',
                color: tab === 'Transactions' ? '#fff' : CHARCOAL,
                fontWeight: tab === 'Transactions' ? 500 : 400,
              }}>
                {tab}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 14, color: CHARCOAL }}>
          <span>Gatsby Company ∨</span>
          <span>J. Smith ∨</span>
        </div>
      </div>

      {/* ── Search / Actions bar ───────────────────────────────────────────── */}
      <div style={{
        height: 80, flexShrink: 0,
        background: '#fff', borderBottom: `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center',
        padding: '0 40px', gap: 12,
      }}>
        {/* Search input */}
        <div style={{
          flex: 1, height: 48, borderRadius: 28,
          border: `1px solid ${searchFocused ? VIOLET : BORDER}`,
          boxShadow: searchFocused ? `0 0 0 3px ${VIOLET_LT}` : 'none',
          display: 'flex', alignItems: 'center',
          padding: '0 20px', gap: 10,
          transition: 'border-color 0.2s, box-shadow 0.2s',
          background: '#fff',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={searchFocused ? VIOLET : CHARCOAL} strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: 15, color: searchText ? INK : CHARCOAL, flex: 1 }}>
            {searchText || 'Search by Name, Wallet Address, or Transaction ID'}
          </span>
          {phase === 'search' && (
            <span className="p1proto-cursor" style={{ width: 2, height: 18, background: VIOLET, display: 'inline-block' }} />
          )}
        </div>

        {/* Filter chip (when active) */}
        {filterOn && (
          <div style={{
            height: 40, padding: '0 16px', borderRadius: 8,
            background: VIOLET_LT, border: `1px solid ${VIOLET}`,
            fontSize: 14, color: VIOLET, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
            animation: 'p1protoIn 0.18s ease',
          }}>
            <span>✓</span> Completed
          </div>
        )}

        {/* Filters button */}
        <div style={{
          height: 40, padding: '0 18px', borderRadius: 8,
          border: `1px solid ${filterOpen ? VIOLET : BORDER}`,
          background: filterOpen ? VIOLET_LT : '#fff',
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 14, color: filterOpen ? VIOLET : CHARCOAL, flexShrink: 0,
          transition: 'all 0.15s',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filters
        </div>

        {/* Export CSV */}
        <div style={{
          height: 40, padding: '0 20px', borderRadius: 8,
          background: exported ? '#3B873E' : VIOLET,
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 14, color: '#fff', fontWeight: 500, flexShrink: 0,
          transition: 'background 0.25s, transform 0.1s',
          transform: exportPressed && !exported ? 'scale(0.96)' : 'scale(1)',
        }}>
          {exported ? (
            <><span>✓</span> Exported!</>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </>
          )}
        </div>
      </div>

      {/* ── Filter dropdown ────────────────────────────────────────────────── */}
      {filterOpen && (
        <div style={{
          position: 'absolute', top: 136, right: 220, zIndex: 20,
          background: '#fff', border: `1px solid ${BORDER}`,
          borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          padding: 20, width: 240,
          animation: 'p1protoDown 0.15s ease',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: CHARCOAL, marginBottom: 12 }}>
            Status
          </div>
          {(['Completed', 'Processing', 'Awaiting Funds', 'In Compliance Review'] as const).map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px', borderRadius: 6 }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                border: `1.5px solid ${i === 0 ? '#3B873E' : BORDER}`,
                background: i === 0 ? '#3B873E' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                {i === 0 && <span style={{ color: '#fff', fontSize: 11, lineHeight: 1 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14, color: INK }}>{s}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <div style={{ padding: '6px 14px', borderRadius: 6, fontSize: 13, color: CHARCOAL }}>Clear</div>
            <div style={{ padding: '6px 14px', borderRadius: 6, background: VIOLET, fontSize: 13, color: '#fff' }}>Apply</div>
          </div>
        </div>
      )}

      {/* ── Transaction list ───────────────────────────────────────────────── */}
      <div style={{
        flex: 1, overflow: 'hidden', background: GRAY_BG,
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        transform: detailOpen ? 'translateX(-7%)' : 'none',
      }}>
        {/* Month group header */}
        <div style={{ padding: '20px 40px 10px', fontSize: 12, fontWeight: 600, color: CHARCOAL, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          July 2024
        </div>

        {/* Rows */}
        <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {visibleRows.slice(0, 6).map((row, i) => {
            const isActive = i === activeRow
            return (
              <div key={i} style={{
                background: isActive ? 'rgba(97,77,230,0.04)' : '#fff',
                border: `1px solid ${isActive ? 'rgba(97,77,230,0.28)' : BORDER}`,
                borderRadius: 8, padding: '16px 24px',
                display: 'flex', alignItems: 'center', gap: 20,
                transition: 'all 0.2s',
                opacity: detailOpen && !isActive ? 0.28 : 1,
              }}>
                {/* Date */}
                <div style={{ minWidth: 36, flexShrink: 0, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: CHARCOAL, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{row.month}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: CHARCOAL, lineHeight: 1.1 }}>{row.day}</div>
                </div>
                {/* Direction icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: GRAY_BG,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <DirIcon dir={row.dir} />
                </div>
                {/* Label + sub */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: CHARCOAL, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.sub}</div>
                </div>
                {/* Amount */}
                <div style={{ minWidth: 120, textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: INK }}>{row.amount}</div>
                </div>
                {/* Badge */}
                <StatusBadge status={row.status} />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Detail panel ────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 136, right: 0, bottom: 0,
        width: 520, background: '#fff',
        borderLeft: `1px solid ${BORDER}`,
        boxShadow: '-8px 0 32px rgba(0,0,0,0.08)',
        transform: detailOpen ? 'translateX(0)' : 'translateX(110%)',
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column',
        padding: 32, overflow: 'hidden', zIndex: 10,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: INK }}>Transaction Detail</div>
          <div style={{ fontSize: 20, color: CHARCOAL, lineHeight: 1 }}>✕</div>
        </div>
        {/* Status badge */}
        <div style={{ marginBottom: 20, flexShrink: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 9, background: '#E8F5E9' }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#3B873E' }}>Completed</span>
          </div>
        </div>
        {/* Amount */}
        <div style={{ marginBottom: 24, flexShrink: 0 }}>
          <div style={{ fontSize: 13, color: CHARCOAL, marginBottom: 4 }}>Amount received</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: INK, letterSpacing: '-0.025em', lineHeight: 1 }}>269,730 USDC</div>
          <div style={{ fontSize: 13, color: CHARCOAL, marginTop: 4 }}>≈ $200,000.00 USD</div>
        </div>
        {/* Fields */}
        {[
          { label: 'From',           val: 'BlueSky Ventures'         },
          { label: 'To',             val: 'My Conduit Account'       },
          { label: 'Date',           val: 'Jul 19, 2024 · 14:22 UTC' },
          { label: 'Transaction ID', val: 'txn_0x3995...c7f6'        },
        ].map(({ label, val }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderTop: `1px solid ${BORDER}` }}>
            <span style={{ fontSize: 13, color: CHARCOAL }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: INK, textAlign: 'right', maxWidth: '60%' }}>{val}</span>
          </div>
        ))}
        {/* Timeline */}
        <div style={{ marginTop: 24, flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: CHARCOAL, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.10em' }}>
            Status Timeline
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Initiated', 'Processing', 'Completed'].map((label, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                  background: '#3B873E',
                  boxShadow: '0 0 0 3px rgba(59,135,62,0.15)',
                }} />
                <span style={{ fontSize: 14, color: INK, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phase indicator ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 12, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,255,255,0.94)',
        border: `1px solid ${BORDER}`,
        borderRadius: 999, padding: '7px 18px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        pointerEvents: 'none', zIndex: 30,
        whiteSpace: 'nowrap',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: VIOLET, animation: 'p1protoPulse 1.6s ease-in-out infinite' }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: VIOLET, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {phase === 'idle'   ? 'Transaction History'
          : phase === 'search' ? `Search — "${searchText || '...'}" `
          : phase === 'filter' ? (filterOn ? 'Filter Applied — Completed' : 'Opening Filters…')
          : phase === 'export' ? (exported ? 'CSV Exported ✓' : 'Exporting CSV…')
          : detailOpen         ? 'Transaction Detail'
          :                      'Selecting Transaction…'}
        </span>
      </div>

    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Phase1AnimatedPrototype() {
  // ── Lifted animation state ─────────────────────────────────────────────────
  const [phase,      setPhase]      = useState<Phase>('idle')
  const [searchText, setSearchText] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterOn,   setFilterOn]   = useState(false)
  const [exported,   setExported]   = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [activeRow,  setActiveRow]  = useState<number | null>(null)

  // ── Modal + scale state ────────────────────────────────────────────────────
  const [modalOpen,   setModalOpen]   = useState(false)
  const [thumbScale,  setThumbScale]  = useState(0.25)
  const [modalScale,  setModalScale]  = useState(0.72)

  const thumbRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = useCallback(() => setModalOpen(false), [])

  // ── Compute thumbnail scale via ResizeObserver ─────────────────────────────
  useEffect(() => {
    const el = thumbRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      setThumbScale(entries[0].contentRect.width / CANVAS_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ── Compute modal scale via ResizeObserver ─────────────────────────────────
  useEffect(() => {
    if (!modalOpen) return
    const el = modalRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      setModalScale(entries[0].contentRect.width / CANVAS_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [modalOpen])

  // ── ESC to close modal + scroll lock ──────────────────────────────────────
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modalOpen, closeModal])

  // ── Phase sequencer ────────────────────────────────────────────────────────
  useEffect(() => {
    let idx = 0
    let timer: ReturnType<typeof setTimeout>
    const advance = () => {
      idx = (idx + 1) % SEQUENCE.length
      const p = SEQUENCE[idx]
      setPhase(p)
      timer = setTimeout(advance, DURATION[p])
    }
    timer = setTimeout(advance, DURATION.idle)
    return () => clearTimeout(timer)
  }, [])

  // ── Phase side-effects ─────────────────────────────────────────────────────
  useEffect(() => {
    setSearchText(''); setFilterOpen(false); setFilterOn(false)
    setExported(false); setDetailOpen(false); setActiveRow(null)

    if (phase === 'search') {
      const word = 'BlueSky'
      const ts = word.split('').map((_, i) =>
        setTimeout(() => setSearchText(word.slice(0, i + 1)), 800 + i * 320)
      )
      return () => ts.forEach(clearTimeout)
    }
    if (phase === 'filter') {
      const t1 = setTimeout(() => setFilterOpen(true), 600)
      const t2 = setTimeout(() => { setFilterOpen(false); setFilterOn(true) }, 2400)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
    if (phase === 'export') {
      const t = setTimeout(() => setExported(true), 1000)
      return () => clearTimeout(t)
    }
    if (phase === 'detail') {
      const t1 = setTimeout(() => setActiveRow(0), 600)
      const t2 = setTimeout(() => setDetailOpen(true), 1200)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [phase])

  // ── Shared animation state object ─────────────────────────────────────────
  const anim: AnimState = { phase, searchText, filterOpen, filterOn, exported, detailOpen, activeRow }
  const modalAspect = CANVAS_W / CANVAS_H

  return (
    <figure className="p1proto-fig" style={{ margin: 0 }}>
      <style>{`
        @keyframes p1protoPulse  { 0%,100%{opacity:.4;transform:scale(.85)} 50%{opacity:1;transform:scale(1)} }
        @keyframes p1protoIn     { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:none} }
        @keyframes p1protoDown   { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
        @keyframes p1protoFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes p1protoRise   { from{opacity:0;transform:scale(.97) translateY(10px)} to{opacity:1;transform:none} }
        .p1proto-cursor { animation: p1protoBlink 0.9s step-end infinite; }
        @keyframes p1protoBlink  { 0%,100%{opacity:1} 50%{opacity:0} }
        .p1proto-thumb { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease; }
        .p1proto-thumb:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(97,77,230,0.16), 0 2px 8px rgba(0,0,0,0.10) !important; }
        .p1proto-thumb:hover .p1proto-badge { opacity: 1 !important; transform: translateY(0) !important; }
        .p1proto-thumb:hover .p1proto-overlay { background: rgba(97,77,230,0.04) !important; }
        /* Override .prose figure+figure { margin-top:0 !important } — higher specificity wins */
        .prose figure.p1proto-fig { margin-top: 40px !important; }
      `}</style>

      {/* ── Thumbnail ──────────────────────────────────────────────────────── */}
      <button
        className="p1proto-thumb"
        onClick={() => setModalOpen(true)}
        aria-label="View animated prototype fullscreen"
        style={{
          display: 'block', width: '100%', padding: 0,
          border: '1px solid var(--border)', background: 'none',
          cursor: 'zoom-in', borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 2px 20px rgba(97,77,230,0.08), 0 1px 4px rgba(0,0,0,0.06)',
          position: 'relative',
        }}
      >
        {/* Scale container — ResizeObserver target */}
        <div
          ref={thumbRef}
          style={{
            width: '100%',
            aspectRatio: `${CANVAS_W}/${CANVAS_H}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: CANVAS_W, height: CANVAS_H,
            transform: `scale(${thumbScale})`,
            transformOrigin: 'top left',
          }}>
            <TxnUI anim={anim} />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="p1proto-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s ease',
          pointerEvents: 'none',
        }}>
          <div className="p1proto-badge" style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(255,255,255,0.94)',
            border: '1px solid rgba(97,77,230,0.20)',
            borderRadius: 20, padding: '7px 14px',
            opacity: 0, transform: 'translateY(4px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={VIOLET} strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: VIOLET, letterSpacing: '0.04em' }}>
              View fullscreen
            </span>
          </div>
        </div>
      </button>

      <figcaption style={{
        marginTop: 10, fontFamily: 'var(--font-inter)', fontSize: 11,
        letterSpacing: '0.05em', color: 'var(--warm-light)', textAlign: 'center',
      }}>
        Phase 1 — Animated prototype: search, filter, export &amp; detail view
      </figcaption>

      {/* ── Modal / Lightbox ───────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Animated prototype preview"
          onClick={closeModal}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(4,8,18,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '56px 24px 40px',
            animation: 'p1protoFadeIn 0.18s ease both',
          }}
        >
          {/* Close button */}
          <button
            onClick={e => { e.stopPropagation(); closeModal() }}
            aria-label="Close preview"
            style={{
              position: 'absolute', top: 16, right: 20,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: '50%', width: 36, height: 36,
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.72)', fontSize: 20,
              fontFamily: 'sans-serif', lineHeight: 1,
            }}
          >
            ×
          </button>

          {/* Dismiss hint */}
          <div style={{
            position: 'absolute', bottom: 18, left: 0, right: 0,
            textAlign: 'center', fontFamily: 'var(--font-inter)', fontSize: 10,
            letterSpacing: '0.10em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)', pointerEvents: 'none',
          }}>
            ESC or click outside to close
          </div>

          {/* Modal frame — stops propagation */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: `min(90vw, calc(88vh * ${modalAspect.toFixed(4)}))`,
              width: '100%',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)',
              animation: 'p1protoRise 0.22s cubic-bezier(0.16,1,0.3,1) both',
              position: 'relative',
            }}
          >
            {/* Scale container — ResizeObserver target for modal */}
            <div
              ref={modalRef}
              style={{
                width: '100%',
                aspectRatio: `${CANVAS_W}/${CANVAS_H}`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: CANVAS_W, height: CANVAS_H,
                transform: `scale(${modalScale})`,
                transformOrigin: 'top left',
              }}>
                <TxnUI anim={anim} />
              </div>
            </div>
          </div>
        </div>
      )}
    </figure>
  )
}
