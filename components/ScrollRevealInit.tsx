'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    // Short delay lets Next.js finish painting the new page
    const timeout = setTimeout(() => {
      const els = document.querySelectorAll<Element>('[data-reveal], [data-reveal-stagger]')

      // Reset previous state
      els.forEach((el) => {
        el.classList.remove('is-visible', 'will-animate')
      })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0, rootMargin: '0px 0px -32px 0px' }
      )

      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top >= window.innerHeight) {
          // Below the fold — hide it and watch for scroll
          el.classList.add('will-animate')
          observer.observe(el)
        }
        // Already in viewport — leave visible, no animation needed
      })

    }, 80)

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
