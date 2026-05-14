'use client'

import { useEffect, useRef, useState } from 'react'

const STAGE_LABELS = [
  'photosynthesizing pixels...',
  'in full bloom ✿',
]
const STAGE_DELAYS = [800]

export default function Loader() {
  const [stageIndex, setStageIndex] = useState(-1)
  const [exiting,    setExiting]    = useState(false)
  const [gone,       setGone]       = useState(false)
  const dismissed = useRef(false)

  const dismiss = () => {
    if (dismissed.current) return
    dismissed.current = true
    setExiting(true)
    document.body.classList.remove('loading')
    setTimeout(() => setGone(true), 850)
  }

  useEffect(() => {
    document.body.classList.add('loading')

    const timers = STAGE_DELAYS.map((delay, i) =>
      setTimeout(() => setStageIndex(i), delay)
    )

    const doneTimer  = setTimeout(() => setStageIndex(1), 2000)
    const autoTimer  = setTimeout(dismiss, 4500)

    return () => {
      ;[...timers, doneTimer, autoTimer].forEach(clearTimeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null

  const stageName = stageIndex >= 0 ? STAGE_LABELS[stageIndex] : '—'

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background: 'var(--hero-bg)',
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? 'none' : 'auto',
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />

      {/* Wordmark */}
      <div
        className="absolute top-9 left-12 flex items-center gap-2"
        style={{ fontFamily: 'var(--font-inter)', fontSize: 13, fontWeight: 700, color: 'var(--hero-ink-muted)', letterSpacing: '-0.01em' }}
      >
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--sage)', animation: 'pulse 2s ease-in-out infinite' }} />
        Cindy Sous
      </div>

      {/* Growing plant */}
      <svg width="230" height="300" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 1 }}>

        {/* Pixel roots — diagonal staircase steps */}
        <rect className="lp-root1" x="140" y="372" width="8" height="8" fill="#4a6b45" opacity="0.85"/>
        <rect x="132" y="380" width="8" height="8" fill="#4a6b45" opacity="0.65"/>
        <rect x="124" y="388" width="8" height="8" fill="#4a6b45" opacity="0.4"/>
        <rect className="lp-root2" x="156" y="372" width="8" height="8" fill="#4a6b45" opacity="0.85"/>
        <rect x="164" y="380" width="8" height="8" fill="#4a6b45" opacity="0.65"/>
        <rect x="172" y="388" width="8" height="8" fill="#4a6b45" opacity="0.4"/>
        <rect className="lp-root3" x="132" y="372" width="8" height="8" fill="#4a6b45" opacity="0.45"/>
        <rect x="124" y="380" width="8" height="8" fill="#4a6b45" opacity="0.25"/>

        {/* Stem — 8px wide solid block */}
        <rect className="lp-stem" x="148" y="76" width="8" height="296" fill="#4a6b45"/>

        {/* Left pixel leaf 1 — staircase to lower-left */}
        <g className="lp-ll1">
          <rect x="140" y="268" width="8" height="8" fill="#4a6b45"/>
          <rect x="132" y="268" width="8" height="8" fill="#4a6b45"/>
          <rect x="124" y="276" width="8" height="8" fill="#4a6b45"/>
          <rect x="116" y="276" width="8" height="8" fill="#4a6b45"/>
          <rect x="108" y="284" width="8" height="8" fill="#4a6b45"/>
          <rect x="116" y="284" width="8" height="8" fill="#7a9e75"/>
          <rect x="124" y="284" width="8" height="8" fill="#7a9e75"/>
          <rect x="132" y="276" width="8" height="8" fill="#7a9e75"/>
          <rect x="124" y="268" width="8" height="8" fill="#7a9e75"/>
          <rect x="116" y="268" width="8" height="8" fill="#7a9e75" opacity="0.7"/>
        </g>

        {/* Right pixel leaf 1 — staircase to lower-right */}
        <g className="lp-lr1">
          <rect x="156" y="216" width="8" height="8" fill="#4a6b45"/>
          <rect x="164" y="216" width="8" height="8" fill="#4a6b45"/>
          <rect x="172" y="224" width="8" height="8" fill="#4a6b45"/>
          <rect x="180" y="224" width="8" height="8" fill="#4a6b45"/>
          <rect x="188" y="232" width="8" height="8" fill="#4a6b45"/>
          <rect x="180" y="232" width="8" height="8" fill="#7a9e75"/>
          <rect x="172" y="232" width="8" height="8" fill="#7a9e75"/>
          <rect x="164" y="224" width="8" height="8" fill="#7a9e75"/>
          <rect x="172" y="216" width="8" height="8" fill="#7a9e75"/>
          <rect x="164" y="208" width="8" height="8" fill="#7a9e75" opacity="0.7"/>
        </g>

        {/* Left pixel leaf 2 — smaller */}
        <g className="lp-ll2">
          <rect x="140" y="164" width="8" height="8" fill="#4a6b45"/>
          <rect x="132" y="164" width="8" height="8" fill="#4a6b45"/>
          <rect x="124" y="172" width="8" height="8" fill="#4a6b45"/>
          <rect x="116" y="172" width="8" height="8" fill="#4a6b45"/>
          <rect x="124" y="164" width="8" height="8" fill="#7a9e75"/>
          <rect x="132" y="172" width="8" height="8" fill="#7a9e75"/>
        </g>

        {/* Right pixel leaf 2 — smaller */}
        <g className="lp-lr2">
          <rect x="156" y="132" width="8" height="8" fill="#4a6b45"/>
          <rect x="164" y="132" width="8" height="8" fill="#4a6b45"/>
          <rect x="172" y="140" width="8" height="8" fill="#4a6b45"/>
          <rect x="180" y="140" width="8" height="8" fill="#4a6b45"/>
          <rect x="164" y="140" width="8" height="8" fill="#7a9e75"/>
          <rect x="172" y="132" width="8" height="8" fill="#7a9e75"/>
        </g>

        {/* Tiny pixel bud */}
        <g className="lp-ll3">
          <rect x="140" y="100" width="8" height="8" fill="#7a9e75"/>
          <rect x="132" y="100" width="8" height="8" fill="#4a6b45"/>
          <rect x="132" y="108" width="8" height="8" fill="#4a6b45"/>
          <rect x="140" y="108" width="8" height="8" fill="#7a9e75" opacity="0.7"/>
        </g>

        {/* Pixel art flower — rose colors, 8×8 px grid */}
        <g className="lp-bloom">
          {/* row y=4 — top cap, light pink highlights */}
          <rect x="136" y="4"  width="8" height="8" fill="#fce8ef"/>
          <rect x="144" y="4"  width="8" height="8" fill="#f4bece"/>
          <rect x="152" y="4"  width="8" height="8" fill="#f4bece"/>
          <rect x="160" y="4"  width="8" height="8" fill="#fce8ef"/>
          {/* row y=12 */}
          <rect x="128" y="12" width="8" height="8" fill="#fce8ef"/>
          <rect x="136" y="12" width="8" height="8" fill="#f4bece"/>
          <rect x="144" y="12" width="8" height="8" fill="#d4789a"/>
          <rect x="152" y="12" width="8" height="8" fill="#d4789a"/>
          <rect x="160" y="12" width="8" height="8" fill="#f4bece"/>
          <rect x="168" y="12" width="8" height="8" fill="#fce8ef"/>
          {/* row y=20 */}
          <rect x="120" y="20" width="8" height="8" fill="#fce8ef"/>
          <rect x="128" y="20" width="8" height="8" fill="#f4bece"/>
          <rect x="136" y="20" width="8" height="8" fill="#d4789a"/>
          <rect x="144" y="20" width="8" height="8" fill="#d4789a"/>
          <rect x="152" y="20" width="8" height="8" fill="#a04870"/>
          <rect x="160" y="20" width="8" height="8" fill="#d4789a"/>
          <rect x="168" y="20" width="8" height="8" fill="#f4bece"/>
          <rect x="176" y="20" width="8" height="8" fill="#fce8ef"/>
          {/* row y=28 */}
          <rect x="120" y="28" width="8" height="8" fill="#f4bece"/>
          <rect x="128" y="28" width="8" height="8" fill="#d4789a"/>
          <rect x="136" y="28" width="8" height="8" fill="#d4789a"/>
          <rect x="144" y="28" width="8" height="8" fill="#a04870"/>
          <rect x="152" y="28" width="8" height="8" fill="#a04870"/>
          <rect x="160" y="28" width="8" height="8" fill="#d4789a"/>
          <rect x="168" y="28" width="8" height="8" fill="#d4789a"/>
          <rect x="176" y="28" width="8" height="8" fill="#f4bece"/>
          {/* row y=36 — widest */}
          <rect x="112" y="36" width="8" height="8" fill="#fce8ef"/>
          <rect x="120" y="36" width="8" height="8" fill="#f4bece"/>
          <rect x="128" y="36" width="8" height="8" fill="#d4789a"/>
          <rect x="136" y="36" width="8" height="8" fill="#a04870"/>
          <rect x="144" y="36" width="8" height="8" fill="#a04870"/>
          <rect x="152" y="36" width="8" height="8" fill="#a04870"/>
          <rect x="160" y="36" width="8" height="8" fill="#a04870"/>
          <rect x="168" y="36" width="8" height="8" fill="#d4789a"/>
          <rect x="176" y="36" width="8" height="8" fill="#f4bece"/>
          <rect x="184" y="36" width="8" height="8" fill="#fce8ef"/>
          {/* row y=44 */}
          <rect x="112" y="44" width="8" height="8" fill="#fce8ef"/>
          <rect x="120" y="44" width="8" height="8" fill="#f4bece"/>
          <rect x="128" y="44" width="8" height="8" fill="#d4789a"/>
          <rect x="136" y="44" width="8" height="8" fill="#d4789a"/>
          <rect x="144" y="44" width="8" height="8" fill="#a04870"/>
          <rect x="152" y="44" width="8" height="8" fill="#a04870"/>
          <rect x="160" y="44" width="8" height="8" fill="#d4789a"/>
          <rect x="168" y="44" width="8" height="8" fill="#d4789a"/>
          <rect x="176" y="44" width="8" height="8" fill="#f4bece"/>
          <rect x="184" y="44" width="8" height="8" fill="#fce8ef"/>
          {/* row y=52 */}
          <rect x="120" y="52" width="8" height="8" fill="#fce8ef"/>
          <rect x="128" y="52" width="8" height="8" fill="#f4bece"/>
          <rect x="136" y="52" width="8" height="8" fill="#d4789a"/>
          <rect x="144" y="52" width="8" height="8" fill="#d4789a"/>
          <rect x="152" y="52" width="8" height="8" fill="#d4789a"/>
          <rect x="160" y="52" width="8" height="8" fill="#d4789a"/>
          <rect x="168" y="52" width="8" height="8" fill="#f4bece"/>
          <rect x="176" y="52" width="8" height="8" fill="#fce8ef"/>
          {/* row y=60 */}
          <rect x="128" y="60" width="8" height="8" fill="#fce8ef"/>
          <rect x="136" y="60" width="8" height="8" fill="#f4bece"/>
          <rect x="144" y="60" width="8" height="8" fill="#d4789a"/>
          <rect x="152" y="60" width="8" height="8" fill="#d4789a"/>
          <rect x="160" y="60" width="8" height="8" fill="#fce8ef"/>
          {/* row y=68 — neck to stem */}
          <rect x="144" y="68" width="8" height="8" fill="#d4789a"/>
          <rect x="152" y="68" width="8" height="8" fill="#a04870"/>
        </g>
      </svg>

      {/* Stage label */}
      <div
        className="flex flex-col items-center gap-2 mt-10"
        style={{ position: 'relative', zIndex: 1, opacity: 0, animation: 'fadeIn 0.6s 0.3s ease forwards' }}
      >
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em',
          color: 'var(--hero-ink-muted)',
          transition: 'color 0.5s ease',
          minWidth: 200, textAlign: 'center',
        }}>
          {stageName}
        </div>
      </div>

      {/* Tiny watermark */}
      <div
        style={{
          position: 'absolute', bottom: 24, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: 0, animation: 'fadeIn 0.6s 1.2s ease forwards',
          zIndex: 1,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.06em',
          color: 'var(--hero-ink-muted)',
          textAlign: 'center',
        }}>
          🌱 vibe coded with{' '}
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Claude Code
          </a>
          {' '}✨
        </span>
      </div>

    </div>
  )
}
