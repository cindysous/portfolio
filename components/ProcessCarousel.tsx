'use client'

import { useState, useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

// ── layout constants ──────────────────────────────────────────────────────────
const CARD_W = 500
const GAP    = 12
const SPEED  = 0.018

const NW     = 1440
const NH     = 810
const CS     = CARD_W / NW
const CARD_H = Math.round(NH * CS)   // 281
const LB_W   = 1100
const LB_S   = LB_W / NW
const LB_H   = Math.round(NH * LB_S) // 618

// ── tokens ────────────────────────────────────────────────────────────────────
const F    = 'var(--font-inter)'
const INK  = 'var(--ink)'
const MID  = 'var(--warm-mid)'
const LITE = 'var(--warm-light)'
const BDR  = 'var(--border)'
const SAGE = 'var(--sage)'

const EY: CSSProperties = {
  fontFamily: F, fontSize: 11, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: LITE, margin: 0,
}

// ── slide primitives ──────────────────────────────────────────────────────────

function Logo({ dark }: { dark?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={dark ? '/process/conduit-wordmark-white.png' : '/process/charcoallogo.svg'} alt="Conduit" style={{ position: 'absolute', bottom: 36, left: 56, width: 100, height: 'auto', opacity: dark ? 0.5 : 0.4, pointerEvents: 'none' }} />
}

function Shell({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div style={{ width: NW, height: NH, background: dark ? '#18181b' : '#fff', position: 'relative', overflow: 'hidden', fontFamily: F, boxSizing: 'border-box', padding: '68px 64px 110px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: dark ? '#3f3f46' : SAGE }} />
      {children}
      <Logo dark={dark} />
    </div>
  )
}

function SHeader({ eyebrow, title, dark }: { eyebrow: string; title: string; dark?: boolean }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <p style={{ ...EY, color: dark ? '#52525b' : LITE }}>{eyebrow}</p>
      <h2 style={{ fontFamily: F, fontSize: 52, fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05, color: dark ? '#f4f4f5' : INK, margin: '6px 0 0' }}>{title}</h2>
    </div>
  )
}

// ── tx-flow renderer ──────────────────────────────────────────────────────────

interface SState { label: string; subs?: string[] }
interface SRow   { type: string; desc: string; states: SState[]; badges: ('' | 'auto' | 'mixed' | 'manual')[] }
const BC: Record<string, string> = { auto: '#16a34a', mixed: '#d97706', manual: '#dc2626' }

function FlowRow({ type, desc, states, badges }: SRow) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 20 }}>
        <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.13em', textTransform: 'uppercase', color: LITE }}>{type}</span>
        <span style={{ fontFamily: F, fontSize: 13, color: MID }}>{desc}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {states.map((st, si) => (
          <div key={si} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ border: `1px solid ${BDR}`, borderRadius: 10, padding: '14px 18px', minWidth: 170, background: '#fafafa', display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: INK }}>{st.label}</span>
              {st.subs?.map(s => <span key={s} style={{ fontFamily: F, fontSize: 11, color: LITE, lineHeight: 1.4 }}>{s}</span>)}
            </div>
            {si < states.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 60 }}>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <div style={{ flex: 1, height: 1, background: BDR }} />
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1l4 4-4 4" stroke="#a1a1aa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {badges[si] && <span style={{ fontFamily: F, fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase', color: BC[badges[si]], border: `1px solid ${BC[badges[si]]}35`, borderRadius: 4, padding: '2px 7px', marginTop: 6 }}>{badges[si]}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TxSlide({ eyebrow, title, rows }: { eyebrow: string; title: string; rows: SRow[] }) {
  return (
    <Shell>
      <SHeader eyebrow={eyebrow} title={title} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
        {rows.map((r, i) => <FlowRow key={i} {...r} />)}
      </div>
    </Shell>
  )
}

// ── slides ────────────────────────────────────────────────────────────────────

type Slide = { alt: string; dark?: boolean; node: ReactNode }

const SLIDES: Slide[] = [
  // 01 — Title
  { alt: '01 — Title', node: (
    <Shell>
      <p style={EY}>Conduit · Product Spec</p>
      <h1 style={{ fontFamily: F, fontSize: 130, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.9, color: INK, margin: '20px 0 0' }}>
        Transaction<br />Tracker
      </h1>
      <p style={{ fontFamily: F, fontSize: 18, letterSpacing: '0.05em', color: MID, margin: '44px 0 0', textTransform: 'uppercase' }}>
        & Shareable Links
      </p>
      <div style={{ position: 'absolute', bottom: 110, left: 64, right: 64, borderTop: `1px solid ${BDR}`, paddingTop: 24, display: 'flex', alignItems: 'center', gap: 28 }}>
        <span style={{ ...EY }}>DRIs</span>
        <span style={{ fontFamily: F, fontSize: 14, color: MID }}>Andre Masse · Cindy Sous · Ryan Chavez · Filipe Kertcher</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {['V0', 'V1', 'V2'].map(v => <span key={v} style={{ fontFamily: F, fontSize: 12, border: `1px solid ${BDR}`, borderRadius: 6, padding: '5px 16px', color: MID }}>{v}</span>)}
        </div>
      </div>
    </Shell>
  )},

  // 02 — The Problem
  { alt: '02 — The Problem', node: (
    <Shell>
      <SHeader eyebrow="01 / Context" title="The Problem" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 56px' }}>
        <div>
          <p style={{ ...EY, marginBottom: 28 }}>Today</p>
          {[
            ['No visibility', "Clients can't track money in motion"],
            ['No ETAs', 'Uncertainty breeds support tickets'],
            ['Stuck txs', 'No actionable path when blocked'],
            ['Recipients blind', 'Payees have zero status access'],
            ['Support load', 'AM + support fielding avoidable asks'],
          ].map(([h, d]) => (
            <div key={h} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4d4d8', marginTop: 8, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: F, fontSize: 15, fontWeight: 600, color: INK }}>{h}</div>
                <div style={{ fontFamily: F, fontSize: 13, color: MID, marginTop: 3, lineHeight: 1.5 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: BDR }} />
        <div>
          <p style={{ ...EY, marginBottom: 28 }}>Vision</p>
          {[
            ['End-to-end visibility', 'Every state surfaced to senders + recipients'],
            ['Time estimates', 'Clear ETAs at every stage of movement'],
            ['Shareable links', 'Auth-free TX status pages for anyone'],
            ['Actionable blocks', "Know what's stuck and how to fix it"],
            ['Self-service', 'Reduce AM + support load systemically'],
          ].map(([h, d]) => (
            <div key={h} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: SAGE, marginTop: 8, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: F, fontSize: 15, fontWeight: 600, color: INK }}>{h}</div>
                <div style={{ fontFamily: F, fontSize: 13, color: MID, marginTop: 3, lineHeight: 1.5 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )},

  // 03 — Phased Rollout
  { alt: '03 — Phased Rollout', node: (
    <Shell>
      <SHeader eyebrow="02 / Solution" title="Phased Rollout" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        {[
          { v: 'V0', badge: 'Ship now', title: 'Links + Artificial Tracker', items: ['Status stages mapped to backend states', 'Timer-based substates for non-instant txs', 'Unauthenticated shareable TX links', 'Partner settlement time matrix', 'Time-bounded access tokens'] },
          { v: 'V1', badge: 'Next', title: 'Granular Real Tracker', items: ['Full dispositive state tracking + time deltas', 'SWIFT / Fedwire links (IMAD / OMAD / UETR)', 'Recipient email on tx initiation', 'Business hours accounting across regions'] },
          { v: 'V2', badge: 'Future', title: 'The Realest Tracker', items: ['True minute-by-minute state tracking', 'Whitelabel TX link sharing for clients', 'Custom colors + logo', 'API surface for external integration'] },
        ].map(({ v, badge, title, items }) => (
          <div key={v} style={{ border: `1px solid ${BDR}`, borderRadius: 12, padding: '26px 26px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: INK }}>{v}</span>
              <span style={{ fontFamily: F, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', border: `1px solid ${BDR}`, borderRadius: 20, padding: '4px 14px', color: MID }}>{badge}</span>
            </div>
            <div style={{ height: 1, background: BDR, marginBottom: 18 }} />
            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 600, color: INK, letterSpacing: '-0.01em', margin: '0 0 18px' }}>{title}</p>
            {items.map(item => (
              <div key={item} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 4, height: 4, borderRadius: 1, background: LITE, marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontFamily: F, fontSize: 13, color: MID, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Shell>
  )},

  // 04 — Deposit & Withdrawal
  { alt: '04 — Deposit & Withdrawal', node: (
    <TxSlide eyebrow="03 / TX States" title="Deposit & Withdrawal" rows={[
      { type: 'Deposit', desc: 'Moving funds into Conduit',
        states: [
          { label: 'Created' },
          { label: 'In Compliance Review', subs: ['Initializing compliance checks', 'Assessing transaction data', 'Running contractual diligence'] },
          { label: 'Completed' },
        ],
        badges: ['auto', 'mixed'],
      },
      { type: 'Withdrawal', desc: 'Moving stables off Conduit to external wallet',
        states: [
          { label: 'Created' },
          { label: 'In Compliance Review', subs: ['Initializing compliance checks', 'Assessing transaction data', 'Running contractual diligence'] },
          { label: 'Processing Withdrawal', subs: ['Starting journey on chain', 'Communicating authorizations', 'Executing contract'] },
          { label: 'Completed' },
        ],
        badges: ['auto', 'mixed', 'auto'],
      },
    ]} />
  )},

  // 05 — Off Ramp & On Ramp
  { alt: '05 — Off Ramp & On Ramp', node: (
    <TxSlide eyebrow="03 / TX States" title="Off Ramp & On Ramp" rows={[
      { type: 'Off Ramp', desc: 'Moving stables into fiat',
        states: [
          { label: 'Created' },
          { label: 'Awaiting Compliance' },
          { label: 'In Compliance Review', subs: ['Initializing compliance checks', 'Assessing transaction data', 'Running contractual diligence'] },
          { label: 'Processing Settlement', subs: ['Starting journey on chain', 'Exchanging value to fiat', 'Transferring fiat to account'] },
          { label: 'Completed' },
        ],
        badges: ['auto', 'mixed', 'mixed', 'auto'],
      },
      { type: 'On Ramp', desc: 'Moving fiat into stables',
        states: [
          { label: 'Created' },
          { label: 'Awaiting Funds' },
          { label: 'In Compliance Review', subs: ['Initializing compliance checks', 'Assessing transaction data', 'Running contractual diligence'] },
          { label: 'Processing Payment', subs: ['Starting journey on chain', 'Exchanging value to stablecoin', 'Transferring stables to wallet'] },
          { label: 'Completed' },
        ],
        badges: ['auto', 'auto', 'mixed', 'auto'],
      },
    ]} />
  )},

  // 06 — Conversion
  { alt: '06 — Conversion', node: (
    <TxSlide eyebrow="03 / TX States" title="Conversion" rows={[
      { type: 'Simple', desc: 'Crypto → Crypto (near instant; no compliance hold)',
        states: [
          { label: 'Created' },
          { label: 'Processing Settlement', subs: ['Starting journey on chain', 'Exchanging value in stables', 'Transferring stables to wallet'] },
          { label: 'Completed' },
        ],
        badges: ['auto', 'auto'],
      },
      { type: 'Complex', desc: 'Crypto → Crypto | Fiat → Fiat (multi-step with compliance)',
        states: [
          { label: 'Created' },
          { label: 'Awaiting Funds' },
          { label: 'In Compliance Review', subs: ['Initializing compliance checks', 'Assessing transaction data', 'Running contractual diligence'] },
          { label: 'Processing Payment', subs: ['Starting journey on chain', 'Exchanging fiat to stables', 'Exchanging stables to fiat', 'Transferring fiat to account'] },
          { label: 'Completed' },
        ],
        badges: ['auto', 'auto', 'mixed', 'auto'],
      },
    ]} />
  )},

  // 07 — Transfer
  { alt: '07 — Transfer', node: (
    <TxSlide eyebrow="03 / TX States" title="Transfer" rows={[
      { type: 'Transfer', desc: 'Fiat → same currency (e.g. $ → $)',
        states: [
          { label: 'Created' },
          { label: 'Awaiting Funds' },
          { label: 'In Compliance Review', subs: ['Initializing compliance checks', 'Assessing transaction data', 'Running contractual diligence'] },
          { label: 'Processing Payment', subs: ['Initiating money movement', 'Structuring data for payment', 'Money traveling within network'] },
          { label: 'Completed' },
        ],
        badges: ['auto', 'auto', 'mixed', 'auto'],
      },
    ]} />
  )},

  // 08 — Shareable TX Links
  { alt: '08 — Shareable TX Links', node: (
    <Shell>
      <SHeader eyebrow="04 / Sharing" title="Shareable TX Links" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {[
          { n: '01', v: 'V0', title: 'Minimal Status Page', desc: 'Auth-free, non-interactive view of the Transaction Tracker. No RFI upload. Anyone with the link sees current TX status.' },
          { n: '02', v: 'V0', title: 'Time-Bounded Tokens', desc: 'Access tokens expire automatically. No persistent viewable pages — scoped, short-lived, and safe.' },
          { n: '03', v: 'V1', title: 'Recipient Notification', desc: 'Email sent to recipient on transaction initiation. Sets expectations before they think to ask.' },
          { n: '04', v: 'V2', title: 'Whitelabel TX Links', desc: 'Custom colors and logo on the TX status page. Clients can make it feel like their own product.' },
        ].map(({ n, v, title, desc }) => (
          <div key={n} style={{ border: `1px solid ${BDR}`, borderRadius: 12, padding: '26px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: INK }}>{n}</span>
              <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.08em', border: `1px solid ${BDR}`, borderRadius: 6, padding: '3px 12px', color: MID }}>{v}</span>
            </div>
            <div style={{ height: 1, background: BDR, marginBottom: 18 }} />
            <p style={{ fontFamily: F, fontSize: 17, fontWeight: 600, color: INK, letterSpacing: '-0.015em', margin: '0 0 12px' }}>{title}</p>
            <p style={{ fontFamily: F, fontSize: 13, color: MID, lineHeight: 1.65, margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>
    </Shell>
  )},

  // 09 — Closing (dark)
  { alt: '09 — Closing', dark: true, node: (
    <Shell dark>
      <p style={{ fontFamily: F, fontSize: 160, fontWeight: 300, color: '#3f3f46', lineHeight: 1, margin: '-20px 0 0 -12px' }}>&ldquo;</p>
      <p style={{ fontFamily: F, fontSize: 56, fontWeight: 600, color: '#f4f4f5', letterSpacing: '-0.03em', lineHeight: 1.08, margin: '-44px 0 0', maxWidth: 900 }}>
        Money in motion.<br />Visibility by design.
      </p>
      <div style={{ position: 'absolute', bottom: 212, left: 64, right: 64, height: 1, background: '#3f3f46' }} />
      <p style={{ position: 'absolute', bottom: 150, left: 64, fontFamily: F, fontSize: 16, color: '#71717a', lineHeight: 1.6, maxWidth: 740, margin: 0 }}>
        Building the table-stakes experience that earns trust, reduces support load, and powers end-to-end self-service.
      </p>
      <div style={{ position: 'absolute', bottom: 90, left: 64, display: 'flex', gap: 12 }}>
        {[
          { v: 'V0', label: 'Ship tracker + shareable links' },
          { v: 'V1', label: 'Real states + Swift / Fedwire' },
          { v: 'V2', label: 'Whitelabel + API surface' },
        ].map(({ v, label }) => (
          <div key={v} style={{ border: '1px solid #3f3f46', borderRadius: 8, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#71717a' }}>{v}</span>
            <span style={{ fontFamily: F, fontSize: 13, color: '#52525b' }}>{label}</span>
          </div>
        ))}
      </div>
    </Shell>
  )},
]

const N     = SLIDES.length
const TRACK = [...SLIDES, ...SLIDES]

// ── arrow button ──────────────────────────────────────────────────────────────

function ArrowBtn({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === -1 ? 'Previous' : 'Next'}
      style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        ...(dir === -1 ? { left: 16 } : { right: 16 }),
        width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(255,255,255,0.90)',
        border: '1px solid rgba(0,0,0,0.09)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.11)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 2, flexShrink: 0,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d={dir === -1 ? 'M9 2L4 7L9 12' : 'M5 2L10 7L5 12'} stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

// ── carousel ──────────────────────────────────────────────────────────────────

export default function ProcessCarousel() {
  const trackRef  = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const lbOpenRef = useRef(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => { lbOpenRef.current = lightbox !== null }, [lightbox])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let rafId: number, last = 0, autoPos = 0
    const tick = (ts: number) => {
      const half = track.scrollWidth / 2
      if (!pausedRef.current && !lbOpenRef.current) {
        const dt = last ? ts - last : 0
        autoPos += SPEED * dt
        if (half > 0 && autoPos >= half) autoPos -= half
        track.scrollLeft = autoPos
      } else {
        // While paused, keep autoPos in sync so arrow nav is preserved on resume
        autoPos = track.scrollLeft
      }
      last = ts
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const scroll = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: 'smooth' })

  const lightboxNav = (dir: 1 | -1) =>
    setLightbox(i => ((i ?? 0) + dir + N) % N)

  return (
    <>
      <style>{`.proc-track::-webkit-scrollbar{display:none}`}</style>

      <div
        style={{ position: 'relative', margin: '32px -80px 0 calc(-80px - var(--sidebar-gap))' }}
        onMouseEnter={() => { pausedRef.current = true  }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div
          ref={trackRef}
          className="proc-track"
          style={{ display: 'flex', gap: GAP, paddingLeft: 'calc(80px + var(--sidebar-gap))', overflowX: 'scroll', scrollbarWidth: 'none' }}
        >
          {TRACK.map((s, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i % N)}
              style={{ flexShrink: 0, width: CARD_W, height: CARD_H, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.09)', cursor: 'zoom-in' }}
            >
              <div style={{ transform: `scale(${CS})`, transformOrigin: 'top left', width: NW, height: NH }}>
                {s.node}
              </div>
            </div>
          ))}
        </div>

        <ArrowBtn dir={-1} onClick={() => scroll(-1)} />
        <ArrowBtn dir={1}  onClick={() => scroll(1)}  />
      </div>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: LB_W, maxWidth: '88vw', height: LB_H, overflow: 'hidden', borderRadius: 12, boxShadow: '0 24px 80px rgba(0,0,0,0.55)', flexShrink: 0 }}
          >
            <div style={{ width: NW, height: NH, transform: `scale(${LB_S})`, transformOrigin: 'top left' }}>
              {SLIDES[lightbox].node}
            </div>
          </div>

          <button onClick={() => setLightbox(null)} aria-label="Close" style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)', fontSize: 32, lineHeight: 1, cursor: 'pointer', padding: 8 }}>×</button>

          {([-1, 1] as const).map(dir => (
            <button
              key={dir}
              onClick={e => { e.stopPropagation(); lightboxNav(dir) }}
              aria-label={dir === -1 ? 'Previous' : 'Next'}
              style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', ...(dir === -1 ? { left: 24 } : { right: 24 }), width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.13)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path d={dir === -1 ? 'M9 2L4 7L9 12' : 'M5 2L10 7L5 12'} stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
