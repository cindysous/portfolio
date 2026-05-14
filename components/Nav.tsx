'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// ── Section map ───────────────────────────────────────────────
const NAV_ITEMS = [
  { href: '/',               label: 'Home',    section: 'home',        hidden: false },
  { href: '/#featured-work', label: 'Work',    section: 'work',        hidden: false },
  { href: '/experiments',    label: 'Garden',  section: 'experiments', hidden: true  }, // hidden for now
  { href: '/life',           label: 'Life',    section: 'life',        hidden: true  }, // hidden for now
  { href: '/#about',         label: 'About',   section: 'about',       hidden: false },
  { href: '/#contact',       label: 'Contact', section: 'contact',     hidden: false },
]

// Maps DOM section IDs → nav section names (homepage only)
const SCROLL_SECTIONS = [
  { id: 'hero',          section: 'home' },
  { id: 'featured-work', section: 'work' },
  { id: 'about',         section: 'about' },
  { id: 'contact',       section: 'contact' },
]

// ── Icons ─────────────────────────────────────────────────────
function HomeIcon({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2.1L2.5 9.1V21a1 1 0 0 0 1 1H9v-7h6v7h5.5a1 1 0 0 0 1-1V9.1L12 2.1z"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )
}
function WorkIcon({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M9 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9z"/>
      <path d="M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8zm10 3h-1.5v2H8v1.5h2.5V17H12v-2.5h2.5V13H12v-2z"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="17"/>
      <line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/>
    </svg>
  )
}
function ProcessIcon({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
      <path d="M19 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8L19 14z"/>
      <path d="M5 17l.6 1.4 1.4.6-1.4.6L5 21l-.6-1.4-1.4-.6 1.4-.6L5 17z"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
      <path d="M19 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8L19 14z"/>
      <path d="M5 17l.6 1.4 1.4.6-1.4.6L5 21l-.6-1.4-1.4-.6 1.4-.6L5 17z"/>
    </svg>
  )
}
function AboutIcon({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7H4z"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}
function ContactIcon({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v.73l-10 6.5-10-6.5V6.5z"/>
      <path d="M2 9.27V17.5A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5V9.27l-10 6.5-10-6.5z"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  )
}
function SunIcon({ dim = false }: { dim?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ color: dim ? 'rgba(161,161,170,0.35)' : '#f59e0b', transition: 'color 0.3s', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="4.5"/>
      <line x1="12" y1="2"    x2="12" y2="4.5"/>
      <line x1="12" y1="19.5" x2="12" y2="22"/>
      <line x1="2"  y1="12"   x2="4.5" y2="12"/>
      <line x1="19.5" y1="12" x2="22"  y2="12"/>
      <line x1="4.93"  y1="4.93"   x2="6.76"  y2="6.76"/>
      <line x1="17.24" y1="17.24"  x2="19.07" y2="19.07"/>
      <line x1="4.93"  y1="19.07"  x2="6.76"  y2="17.24"/>
      <line x1="17.24" y1="6.76"   x2="19.07" y2="4.93"/>
    </svg>
  )
}
function MoonIcon({ dim = false }: { dim?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      style={{ color: dim ? 'rgba(161,161,170,0.35)' : '#6366f1', transition: 'color 0.3s', flexShrink: 0 }}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function ExperimentsIcon({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="22" x2="12" y2="11"/>
      <path d="M12 16 C8 15 6 11 8.5 8 C10 6 12 10 12 13Z" fill="currentColor" stroke="none"/>
      <path d="M12 13 C16 13 18 9 15.5 6.5 C14 5 12 9 12 12Z" fill="currentColor" stroke="none"/>
      <path d="M5 22 Q12 20 19 22" strokeWidth="1.4"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="22" x2="12" y2="11"/>
      <path d="M12 17 C8.5 16 7 12 9.5 9 C11 7 12 11 12 14Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M12 14 C15.5 14 17 10 14.5 7.5 C13 6 12 10 12 13Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M5 22 Q12 20 19 22" strokeWidth="1.4"/>
    </svg>
  )
}

function LifeIcon({ filled = false }: { filled?: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      <path d="M8 10.5c.5-1.5 1.5-2.5 3-2.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

const ICONS = [HomeIcon, WorkIcon, ExperimentsIcon, LifeIcon, AboutIcon, ContactIcon]

// ── Component ─────────────────────────────────────────────────
export default function Nav() {
  const [dark, setDark]           = useState(false)
  const [hovered, setHovered]     = useState<number | null>(null)
  const [themeHovered, setThemeHovered] = useState(false)
  const [scrolled, setScrolled]   = useState(0)
  const [scrollSection, setScrollSection] = useState('home')
  const pathname              = usePathname()

  // For any /#anchor link: smooth-scroll when already on the homepage;
  // from any other page Next.js navigates to /#anchor normally.
  const handleAnchorClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      document.getElementById(href.slice(2))?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Derive active section — on homepage use scroll position, elsewhere use pathname
  const activeSection = (() => {
    if (pathname === '/') return scrollSection
    const segment = pathname.split('/')[1]
    if (segment === 'work') return 'work'
    if (segment === 'experiments') return 'experiments'
    if (segment === 'life') return 'life'
    if (segment === 'about') return 'about'
    if (segment === 'contact') return 'contact'
    return 'home'
  })()

  // Case study pages handle their own top bar + wordmark
  const isCaseStudy = pathname.startsWith('/work/') && pathname.split('/').length >= 3

  useEffect(() => {
    // ── Theme init ───────────────────────────────────────────
    const saved = localStorage.getItem('theme')
    let shouldBeDark: boolean
    if (saved === 'dark' || saved === 'light') {
      shouldBeDark = saved === 'dark'
    } else {
      const hour = new Date().getHours()
      shouldBeDark = hour >= 19 || hour < 7
    }
    document.documentElement.classList.toggle('dark', shouldBeDark)
    setDark(shouldBeDark)

    // ── Scroll tracking ──────────────────────────────────────
    const updateScrollSection = () => {
      // Consider a section "active" once its top edge passes 40% down the viewport
      const trigger = window.scrollY + window.innerHeight * 0.4
      let active = 'home'
      for (const { id, section } of SCROLL_SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= trigger) active = section
      }
      setScrollSection(active)
    }

    const onScroll = () => {
      setScrolled(window.scrollY)
      updateScrollSection()
    }

    // Run once on mount so the initial state is correct
    updateScrollSection()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // Over dark hero (case study pages): frosted light styling for both toggles
  const atTop = scrolled < 320

  // Pill colours adapt to theme
  const pillBg     = dark ? 'rgba(9,9,11,0.97)'  : 'rgba(255,255,255,0.97)'
  const pillBorder = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'
  const pillShadow = dark
    ? '0 12px 40px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
    : '0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)'
  const iconColor  = dark ? 'rgba(161,161,170,0.80)' : 'rgba(113,113,122,0.80)'
  const iconActive = dark ? '#fafafa' : '#09090b'

  // Toggle track: frosted-white when over dark hero, normal otherwise
  const trackBg     = atTop ? 'rgba(255,255,255,0.16)' : (dark ? 'rgba(228,228,231,0.12)' : 'rgba(0,0,0,0.07)')
  const trackBorder = atTop ? 'rgba(255,255,255,0.28)' : (dark ? 'rgba(228,228,231,0.18)' : 'rgba(0,0,0,0.14)')

  return (
    <>
      {/* ── Sticky top bar (fades in on scroll) — hidden on case study pages ── */}
      {!isCaseStudy && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 52, zIndex: 49,
          background: dark ? 'rgba(9,9,11,0.88)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled > 40 ? pillBorder : 'transparent'}`,
          opacity: scrolled > 40 ? 1 : 0,
          transition: 'opacity 0.3s ease, border-color 0.3s ease',
          pointerEvents: 'none',
        }} />
      )}

      {/* ── Wordmark — top left (hidden on case study pages, scroll bar owns it) ── */}
      {!isCaseStudy && (
        <Link
          href="/"
          style={{
            position: 'fixed', top: 16, left: 26, zIndex: 50,
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-inter)', fontSize: 15, fontWeight: 600,
            letterSpacing: '-0.02em', textDecoration: 'none',
            color: dark ? 'rgba(250,250,250,0.75)' : 'rgba(9,9,11,0.75)',
            transition: 'color 0.35s',
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--sage)',
            animation: 'pulse 2.5s ease-in-out infinite',
            flexShrink: 0,
          }} />
          Cindy Sous
        </Link>
      )}

      {/* ── Left floating pill ───────────────────────────────── */}
      <nav
        aria-label="Site navigation"
        style={{
          position: 'fixed', left: 20, top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 2,
          background: pillBg,
          border: `1px solid ${pillBorder}`,
          boxShadow: pillShadow,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 28,
          padding: '14px 10px',
          transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        }}
      >
        {/* Section links */}
        {NAV_ITEMS.map((item, i) => {
          if (item.hidden) return null
          const Icon      = ICONS[i]
          const isActive  = activeSection === item.section
          const isHovered = hovered === i

          return (
            <div
              key={item.href}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href={item.href}
                onClick={item.href.startsWith('/#') ? handleAnchorClick(item.href) : undefined}
                style={{
                  width: 42, height: 42,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 14,
                  background: isActive
                    ? dark ? 'rgba(228,228,231,0.12)' : 'rgba(0,0,0,0.07)'
                    : isHovered
                      ? dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
                      : 'transparent',
                  color: isActive ? (dark ? '#e4e4e7' : '#09090b') : isHovered ? iconActive : iconColor,
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                <Icon filled={isActive} />
              </Link>

              {/* Hover label */}
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(100% + 14px)',
                  top: '50%',
                  background: pillBg,
                  border: `1px solid ${pillBorder}`,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 8,
                  padding: '5px 11px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: dark ? 'rgba(250,250,250,0.85)' : '#09090b',
                  pointerEvents: 'none',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered
                    ? 'translateY(-50%) translateX(0)'
                    : 'translateY(-50%) translateX(-6px)',
                  transition: 'opacity 0.18s ease, transform 0.18s ease',
                }}
              >
                {item.label}
              </div>

              {/* Divider after Home */}
              {i === 0 && (
                <div style={{
                  width: 20, height: 1, margin: '4px auto 2px',
                  background: pillBorder,
                }} />
              )}
            </div>
          )
        })}

      </nav>

      {/* ── Theme toggle — top right ─────────────────────────── */}
      <div
        style={{ position: 'fixed', top: 14, right: 24, zIndex: 101 }}
        onMouseEnter={() => setThemeHovered(true)}
        onMouseLeave={() => setThemeHovered(false)}
      >
        <button
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', padding: 0 }}
        >
          {/* Sun icon */}
          <SunIcon dim={atTop ? false : dark} />

          {/* Track */}
          <div style={{
            position: 'relative',
            width: 44, height: 24,
            borderRadius: 12,
            background: trackBg,
            border: `1px solid ${trackBorder}`,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'background 0.25s, border-color 0.25s',
            flexShrink: 0,
          }}>
            {/* Knob */}
            <div style={{
              position: 'absolute',
              top: 3, left: dark ? 23 : 3,
              width: 16, height: 16,
              borderRadius: '50%',
              background: atTop ? 'rgba(255,255,255,0.90)' : (dark ? '#e4e4e7' : '#27272a'),
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              transition: 'left 0.28s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.25s',
            }} />
          </div>

          {/* Moon icon */}
          <MoonIcon dim={atTop ? false : !dark} />
        </button>

        {/* Tooltip */}
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          background: pillBg, border: `1px solid ${pillBorder}`,
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 8, padding: '5px 11px', whiteSpace: 'nowrap',
          fontFamily: 'var(--font-inter)', fontSize: 9,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: dark ? 'rgba(250,250,250,0.85)' : '#09090b',
          pointerEvents: 'none',
          opacity: themeHovered ? 1 : 0,
          transition: 'opacity 0.18s ease',
        }}>
          Work in progress
        </div>
      </div>
    </>
  )
}
