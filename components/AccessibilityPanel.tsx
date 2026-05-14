'use client'

import { useEffect, useRef, useState } from 'react'

type Settings = {
  largeText:     boolean
  reduceMotion:  boolean
  highContrast:  boolean
  focusVisible:  boolean
  dyslexiaFont:  boolean
}

const DEFAULTS: Settings = {
  largeText:    false,
  reduceMotion: false,
  highContrast: false,
  focusVisible: false,
  dyslexiaFont: false,
}

const OPTIONS: { key: keyof Settings; label: string; desc: string; icon: string }[] = [
  { key: 'largeText',    label: 'Larger text',      desc: 'Scale body text up for easier reading',       icon: 'Aa' },
  { key: 'dyslexiaFont', label: 'Dyslexia-friendly', desc: 'Switch to a high-legibility font',            icon: 'Dd' },
  { key: 'reduceMotion', label: 'Reduce motion',    desc: 'Disable animations and transitions',           icon: '⟳' },
  { key: 'highContrast', label: 'High contrast',    desc: 'Boost contrast for low-vision accessibility',  icon: '◑' },
  { key: 'focusVisible', label: 'Focus indicators', desc: 'Always show keyboard focus outlines',          icon: '⬚' },
]

function applySettings(s: Settings) {
  const html = document.documentElement
  html.classList.toggle('a11y-large-text',    s.largeText)
  html.classList.toggle('a11y-reduce-motion', s.reduceMotion)
  html.classList.toggle('a11y-high-contrast', s.highContrast)
  html.classList.toggle('a11y-focus-visible', s.focusVisible)
  html.classList.toggle('a11y-dyslexia-font', s.dyslexiaFont)
}

export default function AccessibilityPanel() {
  const [open, setOpen]         = useState(false)
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [dark, setDark]         = useState(false)
  const [hovered, setHovered]   = useState(false)
  const [atTop, setAtTop]       = useState(true)
  const panelRef                = useRef<HTMLDivElement>(null)

  // Init from localStorage + detect theme
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('a11y') ?? '{}')
      const merged = { ...DEFAULTS, ...saved }
      setSettings(merged)
      applySettings(merged)
    } catch {}

    setDark(document.documentElement.classList.contains('dark'))
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'))
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  // Track scroll position to adapt button contrast for dark hero sections
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function toggle(key: keyof Settings) {
    const next = { ...settings, [key]: !settings[key] }
    setSettings(next)
    applySettings(next)
    localStorage.setItem('a11y', JSON.stringify(next))
  }

  function reset() {
    setSettings(DEFAULTS)
    applySettings(DEFAULTS)
    localStorage.removeItem('a11y')
  }

  const anyActive = Object.values(settings).some(Boolean)

  const pillBg     = dark ? 'rgba(42,48,36,0.98)' : 'rgba(255,255,255,0.97)'
  const pillBorder = dark ? 'rgba(122,158,117,0.40)' : 'rgba(74,107,69,0.22)'
  const pillShadow = dark
    ? '0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.5)'
    : '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)'

  return (
    <div
      ref={panelRef}
      style={{ position: 'fixed', top: 10, right: 140, zIndex: 101 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Accessibility options"
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: '50%',
          // atTop = over dark hero → frosted light pill; scrolled = normal styling
          background: atTop
            ? 'rgba(255,255,255,0.14)'
            : anyActive
              ? (dark ? 'rgba(74,107,69,0.45)' : 'rgba(74,107,69,0.14)')
              : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'),
          border: `1px solid ${
            atTop ? 'rgba(255,255,255,0.28)'
            : anyActive ? pillBorder
            : dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'
          }`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'background 0.25s, border-color 0.25s',
          padding: 0,
        }}
      >
        <AccessibilityIcon active={anyActive} overrideColor={atTop ? 'rgba(255,255,255,0.82)' : undefined} />
      </button>

      {/* ── WIP Tooltip ── */}
      <div style={{
        position: 'absolute', top: 'calc(100% + 8px)', right: 0,
        background: pillBg, border: `1px solid ${pillBorder}`,
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 8, padding: '5px 11px', whiteSpace: 'nowrap',
        fontFamily: 'var(--font-inter)', fontSize: 9,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: dark ? 'rgba(250,250,250,0.85)' : '#09090b',
        pointerEvents: 'none',
        opacity: hovered && !open ? 1 : 0,
        transition: 'opacity 0.18s ease',
      }}>
        Work in progress
      </div>

      {/* ── Panel ── */}
      <div
        aria-hidden={!open}
        style={{
          position: 'absolute', top: 'calc(100% + 10px)', right: 0,
          width: 260,
          background: pillBg,
          border: `1px solid ${pillBorder}`,
          boxShadow: pillShadow,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 16,
          padding: '6px 0',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
          transformOrigin: 'top right',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '10px 16px 8px',
          borderBottom: `1px solid ${pillBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: dark ? 'rgba(200,191,180,0.5)' : 'rgba(90,83,72,0.5)',
          }}>
            Accessibility
          </span>
          {anyActive && (
            <button
              onClick={reset}
              style={{
                fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.08em',
                textTransform: 'uppercase',                color: 'var(--sage)', background: 'none', border: 'none', padding: 0,
                opacity: 0.8,
              }}
            >
              Reset all
            </button>
          )}
        </div>

        {/* Options */}
        {OPTIONS.map(opt => {
          const active = settings[opt.key]
          return (
            <button
              key={opt.key}
              onClick={() => toggle(opt.key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
                background: active
                  ? dark ? 'rgba(74,107,69,0.18)' : 'rgba(74,107,69,0.07)'
                  : 'transparent',
                border: 'none',                textAlign: 'left',
                transition: 'background 0.15s',
              }}
            >
              {/* Icon badge */}
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active
                  ? dark ? 'rgba(74,107,69,0.40)' : 'rgba(74,107,69,0.14)'
                  : dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${active ? pillBorder : 'transparent'}`,
                fontFamily: 'var(--font-inter)', fontSize: 11,
                color: active ? 'var(--sage)' : dark ? 'rgba(200,191,180,0.45)' : 'rgba(90,83,72,0.45)',
                transition: 'background 0.15s, color 0.15s',
                letterSpacing: '-0.02em',
              }}>
                {opt.icon}
              </div>

              {/* Label + desc */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 13, fontWeight: 500, lineHeight: 1.2,
                  color: active ? 'var(--ink)' : dark ? 'rgba(200,191,180,0.75)' : 'rgba(60,56,50,0.75)',
                  transition: 'color 0.15s',
                }}>
                  {opt.label}
                </div>
                <div style={{
                  fontSize: 10.5, lineHeight: 1.3, marginTop: 1,
                  color: dark ? 'rgba(200,191,180,0.35)' : 'rgba(90,83,72,0.45)',
                }}>
                  {opt.desc}
                </div>
              </div>

              {/* Toggle pill */}
              <div style={{
                width: 34, height: 20, borderRadius: 10, flexShrink: 0,
                background: active
                  ? 'rgba(74,107,69,0.75)'
                  : dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
                border: `1px solid ${active ? 'rgba(74,107,69,0.9)' : dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                position: 'relative',
                transition: 'background 0.2s, border-color 0.2s',
              }}>
                <div style={{
                  position: 'absolute', top: 2,
                  left: active ? 16 : 2,
                  width: 14, height: 14, borderRadius: '50%',
                  background: active ? '#fff' : dark ? 'rgba(200,191,180,0.6)' : 'rgba(90,83,72,0.4)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  transition: 'left 0.22s cubic-bezier(0.34,1.4,0.64,1), background 0.2s',
                }} />
              </div>
            </button>
          )
        })}

        {/* Footer note */}
        <div style={{
          padding: '8px 16px 10px',
          borderTop: `1px solid ${pillBorder}`,
          fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.06em',
          color: dark ? 'rgba(200,191,180,0.28)' : 'rgba(90,83,72,0.35)',
          lineHeight: 1.5,
        }}>
          Settings are saved to your browser.
        </div>
      </div>
    </div>
  )
}

function AccessibilityIcon({ active, overrideColor }: { active: boolean; overrideColor?: string }) {
  const c = overrideColor ?? (active ? 'var(--sage)' : 'rgba(140,128,112,0.72)')
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="currentColor"
      style={{ color: c, transition: 'color 0.2s' }}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="12" cy="4" r="2.2" />
      {/* Arms — thick rounded bar */}
      <rect x="3.5" y="8.5" width="17" height="2.5" rx="1.25" />
      {/* Body */}
      <rect x="10.75" y="10" width="2.5" height="6" rx="1.25" />
      {/* Left leg */}
      <path d="M11 16 Q9.5 19.5 8 22.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      {/* Right leg */}
      <path d="M13 16 Q14.5 19.5 16 22.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
