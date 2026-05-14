'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CaseStudyCardProps {
  slug: string
  title: string
  company: string
  tags: string[]
  teaser: string
  heroColor: string
  index?: number
}

// Earthy sage gradient placeholders — deep forest / dark moss / dark warm earth
const GRADIENTS = [
  'from-[#1a2418] via-[#1c2a19] to-[#0d140c]',  // deep forest moss
  'from-[#201c10] via-[#281f0d] to-[#130f05]',  // dark earthy amber
  'from-[#1a2018] via-[#1e2a1a] to-[#0d120b]',  // dark olive forest
]

export default function CaseStudyCard({
  slug,
  title,
  company,
  tags,
  teaser,
  heroColor,
  index = 0,
}: CaseStudyCardProps) {
  return (
    <Link href={`/work/${slug}`} className="group block">
      <article className="flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-[4/3] mb-5">
          {/*
            Gradient placeholder — replace with a real <Image> once you have thumbnails:
            <Image src={`/images/${slug}.jpg`} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} transition-transform duration-700 group-hover:scale-[1.03]`}
            style={{ backgroundColor: heroColor }}
          />

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-warm-black/70 flex items-end p-5"
          >
            <div>
              <p className="font-sans text-sm text-cream/80 leading-snug mb-3 max-w-xs">
                {teaser}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.18em] text-cream">
                View project
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Card body */}
        <div className="flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-display font-light text-2xl md:text-3xl text-warm-black leading-tight tracking-[-0.01em] mb-2 group-hover:text-warm-brown transition-colors duration-300">
            {title}
          </h3>

          {/* Company */}
          <p className="font-sans text-sm text-warm-gray mt-auto pt-3 border-t border-stone-light">
            {company}
          </p>
        </div>
      </article>
    </Link>
  )
}
