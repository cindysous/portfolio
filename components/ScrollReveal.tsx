'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = 'up',
  duration = 0.65,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '0px 0px -40px 0px' })

  const initial: Record<string, number> = { opacity: 0 }
  const animate: Record<string, number> = { opacity: 1 }

  if (direction === 'up') { initial.y = 28; animate.y = 0 }
  if (direction === 'down') { initial.y = -28; animate.y = 0 }
  if (direction === 'left') { initial.x = 28; animate.x = 0 }
  if (direction === 'right') { initial.x = -28; animate.x = 0 }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
