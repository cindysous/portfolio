'use client'

import { useEffect, useRef } from 'react'

const STAGES = [
  {
    num: '01',
    stage: 'Stage 01',
    title: 'Root',
    desc: 'Research, discovery, stakeholder alignment. I don\'t design until I understand the soil — the constraints, the users, the business stakes.',
    tools: ['user interviews', 'competitive audit', 'jobs-to-be-done'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" style={{ width: 36, height: 36, marginBottom: 24 }}>
        <circle cx="18" cy="26" r="3" fill="none" stroke="#4a6b45" strokeWidth="1.2"/>
        <path d="M18 23 C14 18 10 14 11 9 C12 5 16 4 18 7" stroke="#4a6b45" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        <path d="M18 23 C22 18 26 14 25 9 C24 5 20 4 18 7" stroke="#7a9e75" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        <line x1="18" y1="29" x2="12" y2="34" stroke="#4a6b45" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
        <line x1="18" y1="29" x2="24" y2="34" stroke="#4a6b45" strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    num: '02',
    stage: 'Stage 02',
    title: 'Structure',
    desc: 'Information architecture, flows, system mapping. I build skeletons that hold up under edge cases and scale.',
    tools: ['IA mapping', 'user flows', 'system diagrams'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" style={{ width: 36, height: 36, marginBottom: 24 }}>
        <line x1="18" y1="32" x2="18" y2="6" stroke="#4a6b45" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M18 24 C12 20 8 15 10 10 C12 6 18 8 18 15" fill="rgba(74,107,69,0.2)" stroke="#7a9e75" strokeWidth="0.9"/>
        <path d="M18 18 C24 14 28 9 26 5 C24 2 18 4 18 11" fill="rgba(74,107,69,0.15)" stroke="#7a9e75" strokeWidth="0.9"/>
      </svg>
    ),
  },
  {
    num: '03',
    stage: 'Stage 03',
    title: 'Bloom',
    desc: 'High-fidelity design, prototyping, iteration. Where constraints become craft and the thing finally looks like itself.',
    tools: ['Figma', 'prototyping', 'usability testing'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" style={{ width: 36, height: 36, marginBottom: 24 }}>
        <circle cx="18" cy="18" r="5" fill="rgba(212,137,106,0.3)" stroke="#d4896a" strokeWidth="0.9"/>
        <ellipse cx="18" cy="18" rx="5" ry="11" fill="rgba(212,137,106,0.2)" stroke="#d4896a" strokeWidth="0.7" transform="rotate(0 18 18)"/>
        <ellipse cx="18" cy="18" rx="5" ry="11" fill="rgba(212,137,106,0.18)" stroke="#d4896a" strokeWidth="0.7" transform="rotate(60 18 18)"/>
        <ellipse cx="18" cy="18" rx="5" ry="11" fill="rgba(212,137,106,0.15)" stroke="#d4896a" strokeWidth="0.7" transform="rotate(120 18 18)"/>
      </svg>
    ),
  },
  {
    num: '04',
    stage: 'Stage 04',
    title: 'Seed',
    desc: 'Handoff, documentation, design systems. The work should grow beyond any single sprint or any single designer.',
    tools: ['design system', 'dev handoff', 'documentation'],
    icon: (
      <svg viewBox="0 0 36 36" fill="none" style={{ width: 36, height: 36, marginBottom: 24 }}>
        <circle cx="18" cy="18" r="4" fill="rgba(74,107,69,0.3)" stroke="#4a6b45" strokeWidth="1"/>
        <line x1="18" y1="6"  x2="18" y2="11" stroke="#7a9e75" strokeWidth="1" strokeLinecap="round"/>
        <line x1="18" y1="25" x2="18" y2="30" stroke="#7a9e75" strokeWidth="1" strokeLinecap="round"/>
        <line x1="6"  y1="18" x2="11" y2="18" stroke="#7a9e75" strokeWidth="1" strokeLinecap="round"/>
        <line x1="25" y1="18" x2="30" y2="18" stroke="#7a9e75" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="18" cy="5"  r="2" fill="#d4896a" opacity="0.5"/>
        <circle cx="18" cy="31" r="2" fill="#d4896a" opacity="0.5"/>
        <circle cx="5"  cy="18" r="2" fill="#d4896a" opacity="0.5"/>
        <circle cx="31" cy="18" r="2" fill="#d4896a" opacity="0.5"/>
      </svg>
    ),
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    if (!reveals) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ padding: '100px 80px 100px var(--sidebar-gap)' }}
    >
      {/* Section header */}
      <div
        className="reveal flex items-end justify-between mb-16 pb-5"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div>
          <div className="section-tag">// process</div>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700, letterSpacing: '-0.03em',
            color: 'var(--ink)', lineHeight: 1.05,
          }}>
            Design as a<br /><em style={{ fontStyle: 'normal', color: 'var(--sage)' }}>living system</em>
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-inter)', fontSize: 11, color: 'var(--warm-mid)',
          letterSpacing: '0.04em', maxWidth: 260, textAlign: 'right', lineHeight: 1.6,
        }}>
          Each stage builds on the last — nothing is thrown away, everything compounds.
        </p>
      </div>

      {/* Process grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--border)',
        }}
      >
        {STAGES.map((s, i) => (
          <div
            key={s.num}
            className={`reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}
            style={{
              background: 'var(--bg)',
              padding: '36px 28px 32px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'background 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--sage-wash)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}
          >
            {/* Corner number */}
            <div
              className="absolute"
              style={{
                top: 20, right: 20,
                fontFamily: 'var(--font-inter)', fontSize: 10,
                color: 'var(--warm-light)', letterSpacing: '0.08em',
              }}
              aria-hidden="true"
            >
              {s.num}
            </div>

            {s.icon}

            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 6 }}>
              {s.stage}
            </div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 12 }}>
              {s.title}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--warm-mid)' }}>
              {s.desc}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {s.tools.map(tool => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.06em',
                    color: 'var(--sage)', background: 'transparent',
                    border: '1px solid var(--border)', borderRadius: 2, padding: '3px 7px',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
