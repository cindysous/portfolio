'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Balance count-up — one-time scroll-triggered, no loop ───────────────────
const START   = 269_580.00
const TARGET  = 269_730.00
const ANIM_MS = 1200

function useOnceInView(ref: React.RefObject<HTMLDivElement | null>) {
  const [fired, setFired] = useState(false)
  useEffect(() => {
    if (fired) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFired(true) },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, fired])
  return fired
}

// ─── Chart ────────────────────────────────────────────────────────────────────
const DATA = [
  { label: 'Jun',    v: 62000  },
  { label: 'Jul',    v: 100000 },
  { label: 'Aug',    v: 148000 },
  { label: 'Sep',    v: 118000 },
  { label: 'Oct',    v: 129000 },
  { label: 'Nov 1',  v: 138000 },
  { label: 'Nov 8',  v: 152000 },
  { label: 'Nov 15', v: 178000 },
  { label: 'Nov 22', v: 205000 },
  { label: 'Nov 29', v: 220342 },
]
const W = 300, H = 110, N = DATA.length
const Y_MIN = 40000, Y_RANGE = 250000

function toPt(i: number, v: number): [number, number] {
  return [(i / (N - 1)) * W, H - ((v - Y_MIN) / Y_RANGE) * H]
}
function smooth(pts: [number, number][], close?: boolean) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1][0] + pts[i][0]) / 2
    d += ` C${cx},${pts[i - 1][1]} ${cx},${pts[i][1]} ${pts[i][0]},${pts[i][1]}`
  }
  if (close) d += ` L${pts[pts.length - 1][0]},${H} L0,${H} Z`
  return d
}
const PTS  = DATA.map((d, i) => toPt(i, d.v))
const LINE = smooth(PTS)
const AREA = smooth(PTS, true)

// ─── Account fields ───────────────────────────────────────────────────────────
const FIELDS: { label: string; value: string; sub?: string }[] = [
  { label: 'Customer Name',          value: 'Acme Inc.'     },
  { label: 'Virtual Account Number', value: '123456789012'  },
  { label: 'Routing Number',         value: '098766421'     },
  { label: 'Bank Address', value: 'Bank Name', sub: '123 Main Street, Beverly Hills, CA' },
]

function fmtBalance(v: number) {
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ─── Root ─────────────────────────────────────────────────────────────────────
// stacked=false (default, homepage): full-panel absolute card
// stacked=true  (case study hero):   fixed-height flex child, no absolute wrapper
export default function EntityManagementMockup({ stacked = false }: { stacked?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView  = useOnceInView(rootRef)
  const [triggered, setTriggered] = useState(false)
  const [chartP, setChartP] = useState(0)
  const hasRun  = useRef(false)
  const [active, setActive] = useState<number | null>(null)

  const isAnimating = triggered && chartP < 0.99

  // One-time trigger on scroll-into-view: flip balance instantly, animate chart via rAF
  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true
    setTriggered(true)
    const t0 = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - t0) / ANIM_MS, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setChartP(e)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView])

  // Chart animation — Nov points (i≥5) rise from Oct baseline as chartP progresses
  const ptsAnim  = DATA.map((d, i) => toPt(i, i >= 5 ? DATA[4].v + (d.v - DATA[4].v) * chartP : d.v))
  const lineAnim = smooth(ptsAnim)
  const areaAnim = smooth(ptsAnim, true)

  // Shared white-panel style — only outer wrapper differs between modes
  const panelStyle: React.CSSProperties = stacked
    ? { flex: '0 0 auto', background: '#fff', borderTopLeftRadius: 14, borderBottomLeftRadius: 14, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', boxShadow: '0 -4px 32px rgba(0,0,0,0.14)', pointerEvents: 'none', display: 'flex', flexDirection: 'column' }
    : { position: 'absolute', inset: 0, background: '#fff', borderTopLeftRadius: 14, borderBottomLeftRadius: 14, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', boxShadow: '0 -6px 40px rgba(0,0,0,0.14)' }

  const panel = (
    <div ref={stacked ? rootRef : undefined} style={panelStyle}>

        {/* Nav */}
        <div style={{
          height: 42, display: 'flex', alignItems: 'center',
          padding: '0 14px', gap: 8,
          borderBottom: '1px solid #f0f0f0', flexShrink: 0,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#bbb" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 12, fontWeight: 600, color: '#111827' }}>
            Acme Inc.
          </span>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 600,
            color: '#15803d', background: '#dcfce7',
            padding: '2px 7px', borderRadius: 99,
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>Active</span>
        </div>

        {/* Balance */}
        <div style={{
          padding: '10px 14px 9px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, color: '#aaa', marginBottom: 3 }}>
              USD Balance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>🇺🇸</span>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 19, fontWeight: 700,
                letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums',
                color: isAnimating ? '#15803d' : '#111827',
                transition: 'color 0.8s ease',
                textShadow: isAnimating ? '0 0 18px rgba(21,128,61,0.22)' : 'none',
              }}>
                ${fmtBalance(triggered ? TARGET : START)}
              </span>
              <span style={{ fontSize: 10, fontWeight: 400, color: '#ccc' }}>USD</span>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 9, fontWeight: 600,
                color: '#15803d', background: '#dcfce7',
                padding: '2px 5px', borderRadius: 4,
                opacity: isAnimating ? 1 : 0,
                transform: isAnimating ? 'translateY(0)' : 'translateY(3px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                pointerEvents: 'none',
              }}>↑</span>
            </div>
          </div>
          <div style={{
            background: '#4f46e5', color: '#fff',
            fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600,
            padding: '6px 11px', borderRadius: 20,
            display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0,
          }}>
            Move Money
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Two-column body */}
        <div style={{ display: 'flex', flex: 1, pointerEvents: 'auto' }}>

          {/* Account details (primary) */}
          <div style={{ flex: '0 0 54%', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', padding: '0 14px', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 600, color: '#111827',
                padding: '8px 0', marginRight: 14, borderBottom: '2px solid #4f46e5',
              }}>Domestic</span>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: 11, color: '#bbb',
                padding: '8px 0', borderBottom: '2px solid transparent',
              }}>International</span>
            </div>
            {FIELDS.map((f, i) => (
              <div key={f.label} style={{
                padding: '7px 14px',
                borderBottom: i < FIELDS.length - 1 ? '1px solid #f5f5f5' : 'none',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6,
              }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 9.5, color: '#aaa', flexShrink: 0 }}>
                  {f.label}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 10.5, fontWeight: 500, color: '#111827', textAlign: 'right' }}>
                  {f.value}
                  {f.sub && <><br/><span style={{ fontSize: 9.5, color: '#aaa', fontWeight: 400 }}>{f.sub}</span></>}
                </span>
              </div>
            ))}
          </div>

          {/* Chart (secondary) */}
          <div style={{ flex: 1, padding: '10px 10px 0', position: 'relative' }}>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, fontWeight: 600, color: '#111827', marginBottom: 6 }}>
              Balance Over Time
            </div>
            {active !== null && (
              <div style={{
                position: 'absolute', top: 8,
                left: `${Math.max(0, Math.min((PTS[active][0] / W) * 85, 50))}%`,
                background: '#fff', border: '1px solid #e5e7eb',
                borderRadius: 6, padding: '3px 8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 10,
              }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 9, color: '#aaa', marginRight: 4 }}>
                  {DATA[active].label}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, fontWeight: 700, color: '#111827' }}>
                  ${DATA[active].v.toLocaleString()}
                </span>
              </div>
            )}
            {/* Chart glow keyframes */}
            <style>{`@keyframes emGlow{0%,100%{opacity:0}50%{opacity:0.08}}`}</style>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="em-g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.01"/>
                </linearGradient>
              </defs>
              {[0.33, 0.66].map(f => (
                <line key={f} x1={0} y1={H * f} x2={W} y2={H * f} stroke="#f0f0f0" strokeWidth={1}/>
              ))}
              <path d={areaAnim} fill="url(#em-g)"/>
              {/* Slow soft glow overlay on the chart area */}
              <path d={areaAnim} fill="#7c3aed" aria-hidden="true"
                style={{ animation: 'emGlow 5s ease-in-out 1.2s infinite', opacity: 0, pointerEvents: 'none' }}/>
              <path d={lineAnim} fill="none" stroke="#7c3aed" strokeWidth={2}/>
              {active !== null && <>
                <line x1={PTS[active][0]} y1={0} x2={PTS[active][0]} y2={H}
                  stroke="#7c3aed" strokeWidth={1} strokeOpacity={0.3}/>
                <circle cx={PTS[active][0]} cy={ptsAnim[active][1]} r={4}
                  fill="#fff" stroke="#7c3aed" strokeWidth={2}/>
              </>}
              {DATA.map((_, i) => {
                const x0 = i === 0     ? 0 : (PTS[i-1][0] + PTS[i][0]) / 2
                const x1 = i === N - 1 ? W : (PTS[i][0]   + PTS[i+1][0]) / 2
                return <rect key={i} x={x0} y={0} width={x1 - x0} height={H}
                  fill="transparent" style={{ cursor: 'crosshair' }}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}/>
              })}
            </svg>
          </div>

        </div>
    </div>
  )

  if (stacked) return panel

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{ position: 'absolute', top: 28, left: 16, right: 0, bottom: 20, pointerEvents: 'none' }}
    >
      {panel}
    </div>
  )
}
