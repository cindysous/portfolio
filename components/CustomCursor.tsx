'use client'

import { useEffect } from 'react'

// Injects a clean minimal SVG arrow cursor globally.
// Dark fill + white outline ensures visibility on any background.
export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    // Compact arrow — 20×20 canvas, hotspot at tip (3,2)
    const svg = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M3 1.5L17 9.5L10.5 11.5L8.5 18.5Z" fill="#1a1614" stroke="white" stroke-width="1.4" stroke-linejoin="round"/></svg>`
    )
    const url = `url("data:image/svg+xml,${svg}") 3 2, default`

    const style = document.createElement('style')
    style.id = 'custom-cursor'
    style.textContent = `*, *::before, *::after { cursor: ${url} !important; }`
    document.head.appendChild(style)

    return () => { document.getElementById('custom-cursor')?.remove() }
  }, [])

  return null
}
