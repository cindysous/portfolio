'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Plant = {
  id: number
  x: number        // % from left
  type: 'romdoul' | 'grass' | 'fern' | 'mushroom' | 'clover'
  scale: number
  tilt: number     // degrees
  hue: number      // color shift
  born: number     // timestamp for grow animation
  sway: number     // sway phase offset
}

let uid = 0

const PALETTE = {
  romdoul: { petal: 'rgba(245,232,155,VAL)', stroke: 'rgba(195,165,55,VAL)', center: '#c89a28', stem: '#4a6b45' },
  grass:   { fill: '#4a6b45', stroke: '#3a5535' },
  fern:    { fill: 'rgba(98,142,90,VAL)', stroke: '#4a6b45' },
  mushroom:{ cap: '#c87a5a', spot: 'rgba(245,230,200,0.85)', stem: '#d4bfa0' },
  clover:  { fill: 'rgba(74,107,69,VAL)', stroke: '#3a5535' },
}

const MAX_PLANTS = 40
const HINT_MESSAGES = [
  'click anywhere to plant ✦',
  'keep going, the garden grows',
  'your garden is taking shape',
  'a little wild, a little designed',
  'that\'s the spirit',
  'almost a forest in here',
  'more. always more.',
]

// --- SVG shape renderers ---

function RomdoulSVG({ scale, tilt, hue, age }: { scale: number; tilt: number; hue: number; age: number }) {
  const progress = Math.min(1, age / 800)
  const stemH = 52 * progress
  const flowerOpacity = Math.max(0, (age - 500) / 400)
  const cx = 20, cy = 70

  const petalColor = `rgba(${235 + hue},${220 + hue * 0.5},${140 - hue * 0.3},${0.75 * flowerOpacity})`
  const strokeColor = `rgba(195,165,55,${0.9 * flowerOpacity})`

  return (
    <svg
      width={40 * scale} height={80 * scale}
      viewBox="0 0 40 80" style={{ overflow: 'visible', transform: `rotate(${tilt}deg)`, transformOrigin: '50% 100%' }}
    >
      {/* Stem */}
      <line x1={cx} y1={cy} x2={cx} y2={cy - stemH} stroke={PALETTE.romdoul.stem} strokeWidth="1.4" strokeLinecap="round"/>
      {/* Leaves */}
      {progress > 0.4 && (
        <path d={`M${cx} ${cy - stemH * 0.5} C${cx - 12} ${cy - stemH * 0.5 - 8},${cx - 14} ${cy - stemH * 0.5 - 18},${cx} ${cy - stemH * 0.5 - 12}`}
          fill="rgba(74,107,69,0.25)" stroke="#4a6b45" strokeWidth="0.7" opacity={Math.min(1, (age-320)/200)}/>
      )}
      {progress > 0.55 && (
        <path d={`M${cx} ${cy - stemH * 0.65} C${cx + 11} ${cy - stemH * 0.65 - 7},${cx + 13} ${cy - stemH * 0.65 - 16},${cx} ${cy - stemH * 0.65 - 10}`}
          fill="rgba(74,107,69,0.20)" stroke="#4a6b45" strokeWidth="0.7" opacity={Math.min(1, (age-440)/200)}/>
      )}
      {/* Flower */}
      {[0,60,120,180,240,300].map(a => (
        <path key={a}
          d={`M${cx} ${cy - stemH + 3} C${cx - 5} ${cy - stemH - 5},${cx - 6} ${cy - stemH - 16},${cx} ${cy - stemH - 22} C${cx + 6} ${cy - stemH - 16},${cx + 5} ${cy - stemH - 5},${cx} ${cy - stemH + 3}Z`}
          fill={petalColor} stroke={strokeColor} strokeWidth="0.7"
          transform={`rotate(${a},${cx},${cy - stemH})`}
          opacity={flowerOpacity}
        />
      ))}
      <circle cx={cx} cy={cy - stemH} r={5 * flowerOpacity} fill={PALETTE.romdoul.center} opacity={flowerOpacity}/>
      {/* Stamens */}
      {[0,45,90,135,180,225,270,315].map((a,i) => {
        const rad = a * Math.PI / 180
        return <circle key={i} cx={cx + Math.sin(rad)*3.5} cy={(cy-stemH) - Math.cos(rad)*3.5} r="0.9"
          fill="#a07818" opacity={flowerOpacity * 0.9}/>
      })}
    </svg>
  )
}

function GrassSVG({ scale, tilt, age }: { scale: number; tilt: number; age: number }) {
  const progress = Math.min(1, age / 500)
  return (
    <svg width={24 * scale} height={44 * scale} viewBox="0 0 24 44"
      style={{ overflow: 'visible', transform: `rotate(${tilt}deg)`, transformOrigin: '50% 100%' }}>
      {[0,1,2].map(i => {
        const ox = i * 5 - 5
        const h = (24 + i * 6) * progress
        return <path key={i}
          d={`M${12 + ox} 42 C${12 + ox - 4} ${42 - h*0.6},${12 + ox + 2 + i*2} ${42 - h*0.8},${12 + ox + i*3 - 3} ${42 - h}`}
          stroke={PALETTE.grass.fill} strokeWidth={1.2 - i*0.1} fill="none" strokeLinecap="round"
          opacity={0.7 + i * 0.1}/>
      })}
    </svg>
  )
}

function FernSVG({ scale, tilt, hue, age }: { scale: number; tilt: number; hue: number; age: number }) {
  const progress = Math.min(1, age / 600)
  const g = 74 + hue * 0.3
  const fill = `rgba(74,${g},69,0.55)`
  return (
    <svg width={36 * scale} height={50 * scale} viewBox="0 0 36 50"
      style={{ overflow: 'visible', transform: `rotate(${tilt}deg)`, transformOrigin: '50% 100%' }}>
      <line x1="18" y1="48" x2="18" y2={48 - 34 * progress} stroke="#4a6b45" strokeWidth="1" strokeLinecap="round"/>
      {progress > 0.3 && [-1,1].map(side => [0.35,0.55,0.72,0.88].map((frac, i) => {
        const y = 48 - 34 * frac * progress
        const len = (10 - i*1.5) * Math.min(1,(age - 300)/300)
        return <path key={`${side}-${i}`}
          d={`M18 ${y} C${18 + side*len*0.5} ${y - len*0.3},${18 + side*len*0.9} ${y - len*0.5},${18 + side*len} ${y - len*0.8}`}
          stroke={fill.replace('0.55', '0.7')} strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      }))}
    </svg>
  )
}

function MushroomSVG({ scale, tilt, age }: { scale: number; tilt: number; age: number }) {
  const progress = Math.min(1, age / 600)
  const capW = 18 * progress, capH = 12 * progress
  const stemH = 10 * progress
  return (
    <svg width={36 * scale} height={36 * scale} viewBox="0 0 36 36"
      style={{ overflow: 'visible', transform: `rotate(${tilt}deg)`, transformOrigin: '50% 100%' }}>
      <rect x="14" y={32 - stemH} width="8" height={stemH} rx="3"
        fill={PALETTE.mushroom.stem} opacity={progress}/>
      <ellipse cx="18" cy={32 - stemH} rx={capW} ry={capH}
        fill={PALETTE.mushroom.cap} opacity={progress}/>
      {progress > 0.5 && [
        [14, 26], [20, 23], [10, 24],
      ].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5 * Math.min(1,(age-300)/300)}
          fill={PALETTE.mushroom.spot} opacity={0.9}/>
      ))}
    </svg>
  )
}

function CloverSVG({ scale, tilt, hue, age }: { scale: number; tilt: number; hue: number; age: number }) {
  const progress = Math.min(1, age / 500)
  const g = 107 + hue * 0.3
  return (
    <svg width={32 * scale} height={40 * scale} viewBox="0 0 32 40"
      style={{ overflow: 'visible', transform: `rotate(${tilt}deg)`, transformOrigin: '50% 100%' }}>
      <line x1="16" y1="38" x2="16" y2={38 - 16 * progress} stroke="#4a6b45" strokeWidth="1.1" strokeLinecap="round"/>
      {progress > 0.5 && [0, 120, 240].map(a => {
        const rad = (a - 90) * Math.PI / 180
        const r = 6 * Math.min(1,(age-300)/300)
        const cx2 = 16 + Math.cos(rad) * 8
        const cy2 = 22 - Math.sin(rad) * 8
        return <ellipse key={a} cx={cx2} cy={cy2} rx={r} ry={r}
          fill={`rgba(74,${g},69,0.55)`} stroke={`rgba(58,85,53,0.7)`} strokeWidth="0.6" opacity={Math.min(1,(age-300)/300)}/>
      })}
    </svg>
  )
}

export default function GardenPlayground() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [tick, setTick]     = useState(0)
  const [hint, setHint]     = useState(0)
  const [dark, setDark]     = useState(false)
  const containerRef        = useRef<HTMLDivElement>(null)
  const rafRef              = useRef<number | null>(null)

  // Detect dark mode
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark'))
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Animation tick for grow progress
  useEffect(() => {
    const loop = () => {
      setTick(t => t + 1)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // Advance hint message
  useEffect(() => {
    if (plants.length === 0) { setHint(0); return }
    const idx = Math.min(Math.floor(plants.length / 4), HINT_MESSAGES.length - 1)
    setHint(idx)
  }, [plants.length])

  const plant = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const xPct = ((e.clientX - rect.left) / rect.width) * 100

    const types: Plant['type'][] = ['romdoul','romdoul','romdoul','grass','grass','fern','mushroom','clover']
    const type = types[Math.floor(Math.random() * types.length)]

    const newPlant: Plant = {
      id: uid++,
      x: xPct,
      type,
      scale: 0.7 + Math.random() * 0.7,
      tilt: (Math.random() - 0.5) * 18,
      hue: Math.floor(Math.random() * 30) - 10,
      born: Date.now(),
      sway: Math.random() * Math.PI * 2,
    }
    setPlants(p => [...p.slice(-(MAX_PLANTS - 1)), newPlant])
  }, [])

  const clearAll = () => setPlants([])

  const now = Date.now()

  const bg = dark
    ? 'linear-gradient(180deg, #0e1008 0%, #141a0e 60%, #0a0d07 100%)'
    : 'linear-gradient(180deg, #1a2614 0%, #1e2d16 60%, #141f0f 100%)'

  const soilColor = dark ? '#0a0c07' : '#0d1209'

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: '80px 80px 0 var(--sidebar-gap)',
      }}
    >
      {/* Header */}
      <div data-reveal style={{ marginBottom: 32 }}>
        <div style={{
          fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12,
        }}>
          // secret garden
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{
            fontFamily: 'var(--font-inter)', fontSize: 'clamp(28px, 3vw, 44px)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--ink)', margin: 0,
          }}>
            Grow something
          </h2>
          {plants.length > 0 && (
            <button onClick={clearAll} style={{
              fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--warm-mid)', background: 'none', border: '1px solid var(--border)',
              borderRadius: 6, padding: '5px 12px',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--sage)'; (e.target as HTMLElement).style.borderColor = 'rgba(74,107,69,0.5)' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--warm-mid)'; (e.target as HTMLElement).style.borderColor = 'var(--border)' }}
            >
              clear garden ↺
            </button>
          )}
        </div>
      </div>

      {/* Garden bed */}
      <div
        ref={containerRef}
        onClick={plant}
        data-reveal
        style={{
          position: 'relative',
          height: 320,
          borderRadius: '16px 16px 0 0',
          background: bg,
          overflow: 'hidden',
          cursor: 'crosshair',
          userSelect: 'none',
          marginLeft: -80,
          marginRight: 0,
        }}
      >
        {/* Stars / fireflies */}
        {[...Array(18)].map((_,i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? 2 : 1.5,
            height: i % 3 === 0 ? 2 : 1.5,
            borderRadius: '50%',
            background: 'rgba(245,232,172,0.55)',
            top: `${8 + (i * 17) % 42}%`,
            left: `${(i * 13 + 7) % 92}%`,
            animation: `twinkle ${1.8 + (i % 4) * 0.4}s ${i * 0.3}s ease-in-out infinite`,
          }}/>
        ))}

        {/* Moon */}
        <div style={{
          position: 'absolute', top: 20, right: 40,
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(245,232,172,0.12)',
          boxShadow: '0 0 20px 4px rgba(245,232,172,0.06)',
        }}/>

        {/* Soil horizon line */}
        <div style={{
          position: 'absolute', bottom: 40, left: 0, right: 0, height: 1,
          background: 'rgba(74,107,69,0.12)',
        }}/>

        {/* Plants */}
        {plants.map(p => {
          const age = now - p.born
          // Gentle sway using sin wave
          const swayAngle = Math.sin((Date.now() / 2200) + p.sway) * 3
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                bottom: 40,
                left: `${p.x}%`,
                transform: `translateX(-50%) rotate(${swayAngle}deg)`,
                transformOrigin: '50% 100%',
                transition: 'none',
              }}
            >
              {p.type === 'romdoul'  && <RomdoulSVG  scale={p.scale} tilt={p.tilt} hue={p.hue} age={age}/>}
              {p.type === 'grass'    && <GrassSVG    scale={p.scale} tilt={p.tilt} age={age}/>}
              {p.type === 'fern'     && <FernSVG     scale={p.scale} tilt={p.tilt} hue={p.hue} age={age}/>}
              {p.type === 'mushroom' && <MushroomSVG scale={p.scale} tilt={p.tilt} age={age}/>}
              {p.type === 'clover'   && <CloverSVG   scale={p.scale} tilt={p.tilt} hue={p.hue} age={age}/>}
            </div>
          )
        })}

        {/* Soil strip */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 40,
          background: `linear-gradient(180deg, ${soilColor}cc 0%, ${soilColor} 100%)`,
          borderRadius: '0 0 16px 16px',
        }}/>

        {/* Hint prompt */}
        <div style={{
          position: 'absolute', bottom: 54, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          pointerEvents: 'none',
          opacity: plants.length === 0 ? 1 : 0.5,
          transition: 'opacity 0.4s',
        }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'rgba(180,200,170,0.55)',
          }}>
            {HINT_MESSAGES[hint]}
          </span>
        </div>

        {/* Plant count badge */}
        {plants.length > 0 && (
          <div style={{
            position: 'absolute', top: 16, right: 20,
            fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.08em',
            color: 'rgba(180,200,170,0.4)',
          }}>
            {plants.length} planted
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
      `}</style>
    </section>
  )
}
