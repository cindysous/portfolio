'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import Link from 'next/link'

const variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.11, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

function Grain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 4,
        opacity: 0.45,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23grain)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
        mixBlendMode: 'overlay',
      }}
      aria-hidden="true"
    />
  )
}

// Wrapper that applies cursor parallax to its child (avoids CSS animation conflicts)
function ParallaxLayer({
  springX,
  springY,
  mx,
  my,
  style,
  children,
}: {
  springX: MotionValue<number>
  springY: MotionValue<number>
  mx: number
  my: number
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  const x = useTransform(springX, (v) => v * mx)
  const y = useTransform(springY, (v) => v * my)
  return (
    <motion.div style={{ position: 'absolute', x, y, ...style }}>
      {children}
    </motion.div>
  )
}

function OrbitRing({
  springX,
  springY,
}: {
  springX: MotionValue<number>
  springY: MotionValue<number>
}) {
  const x = useTransform(springX, (v) => v * 18)
  const y = useTransform(springY, (v) => v * 14)

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3, x, y }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="orbit-ring absolute w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <ellipse
          cx="720" cy="400" rx="700" ry="230"
          stroke="rgba(96,122,80,0.28)" strokeWidth="1" fill="none"
          transform="rotate(-13, 720, 400)"
        />
        <ellipse
          cx="720" cy="400" rx="540" ry="175"
          stroke="rgba(96,122,80,0.13)" strokeWidth="0.75" fill="none"
          transform="rotate(-13, 720, 400)"
        />
        {/* Star — left intersection */}
        <g transform="translate(48, 520)">
          <line x1="0" y1="-13" x2="0" y2="13" stroke="rgba(96,122,80,0.60)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="-13" y1="0" x2="13" y2="0" stroke="rgba(96,122,80,0.60)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="-9" y1="-9" x2="9" y2="9" stroke="rgba(96,122,80,0.60)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="9" y1="-9" x2="-9" y2="9" stroke="rgba(96,122,80,0.60)" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        {/* Dot — right */}
        <circle cx="1388" cy="283" r="3" fill="rgba(96,122,80,0.40)"/>
        {/* Tiny star — top right */}
        <g transform="translate(1160, 118)">
          <line x1="0" y1="-7" x2="0" y2="7" stroke="rgba(96,122,80,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="-7" y1="0" x2="7" y2="0" stroke="rgba(96,122,80,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="-5" y1="-5" x2="5" y2="5" stroke="rgba(96,122,80,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="5" y1="-5" x2="-5" y2="5" stroke="rgba(96,122,80,0.35)" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
      </svg>
    </motion.div>
  )
}

function AnimatedMesh({
  springX,
  springY,
}: {
  springX: MotionValue<number>
  springY: MotionValue<number>
}) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0" style={{ backgroundColor: '#e6e6e6' }} />

      {/* Wave 1 — turquoise sweep, upper-left diagonal */}
      <ParallaxLayer springX={springX} springY={springY} mx={30} my={18}
        style={{ width: '160%', height: '45%', top: '-5%', left: '-30%' }}>
        <div className="blob blob-1 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(55,195,185,1) 0%, rgba(55,195,185,0.65) 42%, transparent 68%)' }} />
      </ParallaxLayer>

      {/* Wave 2 — yellow-green sweep, upper-right */}
      <ParallaxLayer springX={springX} springY={springY} mx={-28} my={22}
        style={{ width: '155%', height: '40%', top: '15%', right: '-35%' }}>
        <div className="blob blob-2 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(185,225,55,0.95) 0%, rgba(185,225,55,0.60) 42%, transparent 68%)' }} />
      </ParallaxLayer>

      {/* Wave 3 — deep teal sweep, lower diagonal */}
      <ParallaxLayer springX={springX} springY={springY} mx={-25} my={-28}
        style={{ width: '150%', height: '42%', bottom: '-2%', left: '-25%' }}>
        <div className="blob blob-3 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(35,168,158,0.95) 0%, rgba(35,168,158,0.58) 42%, transparent 68%)' }} />
      </ParallaxLayer>

      {/* Wave 4 — lime-sage sweep, lower-right */}
      <ParallaxLayer springX={springX} springY={springY} mx={28} my={-25}
        style={{ width: '145%', height: '38%', bottom: '10%', right: '-30%' }}>
        <div className="blob blob-4 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(148,218,118,0.95) 0%, rgba(148,218,118,0.58) 42%, transparent 68%)' }} />
      </ParallaxLayer>

      {/* Wave 5 — soft white-green center glow */}
      <ParallaxLayer springX={springX} springY={springY} mx={14} my={12}
        style={{ width: '90%', height: '55%', top: '22%', left: '5%' }}>
        <div className="blob blob-5 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(215,248,210,1) 0%, rgba(215,248,210,0.72) 38%, transparent 65%)' }} />
      </ParallaxLayer>

      {/* Orbit ring — softer follow */}
      <OrbitRing springX={springX} springY={springY} />

      <Grain />
    </div>
  )
}

export function Sparkle({
  size = 14, opacity = 0.5, className = '',
}: { size?: number; opacity?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      className={className} style={{ opacity }} aria-hidden="true">
      <path d="M12 2 L13.4 10.6 L22 12 L13.4 13.4 L12 22 L10.6 13.4 L2 12 L10.6 10.6 Z" fill="currentColor"/>
    </svg>
  )
}

export function StarGlyph({
  size = 16, opacity = 0.45, className = '',
}: { size?: number; opacity?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"
      className={className} style={{ opacity }} aria-hidden="true">
      <line x1="10" y1="1" x2="10" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="1" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="3.1" y1="3.1" x2="16.9" y2="16.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="16.9" y1="3.1" x2="3.1" y2="16.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// ── AI role tag — spinning asterisk + fading workflow phrase ─────────────────
const AI_STEPS = [
  'understanding problem',
  'researching users',
  'generating concepts',
  'prototyping in ai',
  'iterating quickly',
  'shipping product',
] as const

function AiRoleTag() {
  const [step, setStep]       = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setStep(s => (s + 1) % AI_STEPS.length)
        setVisible(true)
      }, 380)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <style>{`@keyframes thinkDot{0%,80%,100%{opacity:0.15}40%{opacity:0.65}}`}</style>
      <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 3, height: 3, borderRadius: '50%', background: '#27272a',
            display: 'inline-block',
            animation: `thinkDot 1.4s ease-in-out ${i * 0.22}s infinite`,
          }} />
        ))}
      </div>
      <span style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '0.68rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#27272a',
        fontWeight: 500,
        opacity: visible ? 0.72 : 0,
        transition: 'opacity 0.35s ease',
        minWidth: 190,
        display: 'inline-block',
        textAlign: 'left',
      }}>
        {AI_STEPS[step]}
      </span>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Soft spring — slow, fluid response
  const springX = useSpring(rawX, { stiffness: 32, damping: 18, mass: 1.2 })
  const springY = useSpring(rawY, { stiffness: 32, damping: 18, mass: 1.2 })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      rawX.set((e.clientX - r.left - r.width / 2) / (r.width / 2))
      rawY.set((e.clientY - r.top - r.height / 2) / (r.height / 2))
    }
    const onLeave = () => {
      rawX.set(0)
      rawY.set(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [rawX, rawY])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden"
    >
      <AnimatedMesh springX={springX} springY={springY} />

      <div
        className="relative w-full max-w-site mx-auto px-6 md:px-12 flex flex-col items-center text-center"
        style={{ zIndex: 5 }}
      >
        {/* Location */}
        <motion.div
          custom={0} variants={variants} initial="hidden" animate="visible"
          className="flex items-center gap-2.5 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sage-dark inline-block" />
          <span className="font-sans text-xs uppercase tracking-[0.22em] text-warm-gray">Based in Denver, CO</span>
          <div className="h-px w-8 bg-stone-mid" />
        </motion.div>

        {/* Name */}
        <motion.div custom={1} variants={variants} initial="hidden" animate="visible">
          <h1
            className="font-display font-normal tracking-[-0.01em] pb-3"
            style={{
              fontSize: 'clamp(4rem, 13vw, 10.5rem)',
              lineHeight: 1.05,
              background: 'linear-gradient(158deg, #1c211a 0%, #1c211a 42%, #3a5030 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Cindy Sous
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div
          custom={2} variants={variants} initial="hidden" animate="visible"
          className="flex items-center justify-center gap-3 mt-2 mb-8"
        >
          <AiRoleTag />
        </motion.div>

        {/* Bio */}
        <motion.p
          custom={3} variants={variants} initial="hidden" animate="visible"
          className="font-sans text-base leading-[1.85] text-warm-black/60 max-w-lg mb-10"
        >
          10+ years designing at the intersection of trust and complexity — across B2B fintech
          infrastructure and B2C healthtech. Twice brought in as the first design hire to set
          the foundation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4} variants={variants} initial="hidden" animate="visible"
          className="flex items-center gap-5 mb-12"
        >
          <Link href="/about" className="btn-outline">About Me</Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="font-sans text-sm text-warm-gray hover:text-warm-black transition-colors underline-link">
            Resume ↗
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          custom={5} variants={variants} initial="hidden" animate="visible"
          href="#work"
          className="flex flex-col items-center gap-2 text-warm-gray hover:text-warm-black transition-colors group"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.25em]">See my work</span>
          <div className="h-6 w-px bg-stone-mid group-hover:bg-warm-gray transition-colors" />
        </motion.a>
      </div>
    </section>
  )
}
