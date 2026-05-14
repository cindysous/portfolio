'use client'

import { useState } from 'react'
import EntityOverviewVisual from './EntityOverviewVisual'

// Slides: the typed-entity diagram + two actual UI screenshots
const SLIDES = [
  { type: 'component' as const, label: 'Entity type system' },
  { type: 'image' as const, src: '/images/entity-outcomes-2.png', label: 'Virtual accounts UI' },
  { type: 'image' as const, src: '/images/entity-outcomes-1.png', label: 'Entity management overview' },
]

export default function EntityOverviewCarousel() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(a => Math.max(0, a - 1))
  const next = () => setActive(a => Math.min(SLIDES.length - 1, a + 1))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Slide container */}
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 14 }}>
        <div style={{
          display: 'flex',
          transform: `translateX(${-active * 100}%)`,
          transition: 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {SLIDES.map((slide, i) => (
            <div key={i} style={{ flexShrink: 0, width: '100%' }}>
              {slide.type === 'component' ? (
                <EntityOverviewVisual />
              ) : (
                <div style={{
                  borderRadius: 14, overflow: 'hidden',
                  border: '1px solid rgba(125,79,62,0.18)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.label}
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 2, paddingRight: 2,
      }}>

        {/* Slide label */}
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.10em', textTransform: 'uppercase',
          color: 'rgba(125,79,62,0.55)',
        }}>
          {SLIDES[active].label}
        </span>

        {/* Arrows + dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous slide"
            style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'none',
              border: '1px solid rgba(125,79,62,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: active === 0 ? 0.28 : 0.72,
              transition: 'opacity 0.15s',
              padding: 0,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M5 1L2 4L5 7" stroke="#7d4f3e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === active ? '#7d4f3e' : 'rgba(125,79,62,0.22)',
                border: 'none', padding: 0,
                transition: 'width 0.28s cubic-bezier(0.16,1,0.3,1), background 0.18s ease',
              }}
            />
          ))}

          <button
            onClick={next}
            disabled={active === SLIDES.length - 1}
            aria-label="Next slide"
            style={{
              width: 24, height: 24, borderRadius: '50%',
              background: 'none',
              border: '1px solid rgba(125,79,62,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: active === SLIDES.length - 1 ? 0.28 : 0.72,
              transition: 'opacity 0.15s',
              padding: 0,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M3 1L6 4L3 7" stroke="#7d4f3e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
