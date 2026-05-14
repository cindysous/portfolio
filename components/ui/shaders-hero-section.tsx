"use client"

import type React from "react"
import { MeshGradient } from "@paper-design/shaders-react"

/**
 * AnimatedMeshBackground
 *
 *   darkMode = false → nature: deep forest / emerald / sage — rich animated greens,
 *                      same energy as night but in a green palette
 *   darkMode = true  → night: deep navy / indigo
 */
export function AnimatedMeshBackground({
  className = "",
  style,
  speed = 0.22,
  darkMode = false,
}: {
  className?: string
  style?: React.CSSProperties
  speed?: number
  darkMode?: boolean
}) {
  const primary = darkMode
    // Night — deep navy / indigo
    ? ["#020c18", "#0f1a50", "#083050", "#0a2a6a", "#030810"]
    // Day — forest, emerald, sage, moss — rich mix of greens
    : ["#041408", "#0f3818", "#1a5a2c", "#083020", "#2a6838"]

  const secondary = darkMode
    // Night — dark indigo haze (screen)
    ? ["#0a2050", "#04122a", "#0c2a48", "#060e20"]
    // Day — brighter emerald / lime accents (screen)
    : ["#2a9042", "#0e5422", "#48a858", "#1a6030"]

  return (
    <div className={`absolute inset-0 ${className}`} style={style}>
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={primary}
        speed={speed}
        distortion={0.33}
        swirl={0.18}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        style={{ opacity: darkMode ? 0.55 : 0.50, mixBlendMode: "screen" } as React.CSSProperties}
        colors={secondary}
        speed={speed * 0.65}
        distortion={0.25}
      />
    </div>
  )
}
