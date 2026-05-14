import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import SectionAsterisk from '@/components/SectionAsterisk'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Principal Product Designer with 10+ years across B2B fintech and B2C healthtech. Based in Denver, CO.',
}

const tools = [
  { category: 'Design', items: ['Figma', 'FigJam', 'Principle', 'ProtoPie'] },
  { category: 'Research', items: ['Maze', 'UserTesting', 'Dovetail', 'Lookback'] },
  { category: 'AI Tools', items: ['Claude', 'ChatGPT', 'Midjourney'] },
  { category: 'Collaboration', items: ['Notion', 'Linear', 'Jira', 'Confluence'] },
  { category: 'Domain Expertise', items: ['B2B FinTech', 'B2C HealthTech', 'Compliance UX', 'Design Systems'] },
  { category: 'Methods', items: ['UX Research', 'Systems Thinking', 'Information Architecture', 'Service Design'] },
]

const experience = [
  {
    company: 'Conduit',
    role: 'Principal Product Designer',
    period: '2022 – 2024',
    note: 'First design hire',
  },
  {
    company: 'IntelyCare',
    role: 'Principal Product Designer',
    period: '2020 – 2022',
    note: 'First design hire',
  },
  {
    company: 'Various',
    role: 'Senior Product Designer',
    period: '2014 – 2020',
    note: 'Fintech & enterprise',
  },
]

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-site mx-auto px-6 md:px-12">

        {/* ─── PAGE HEADER ───────────────────────────────── */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <SectionAsterisk />
            <span className="section-label">About</span>
            <div className="h-px w-12 bg-stone-mid" />
          </div>
          <h1 className="font-display font-normal text-5xl md:text-7xl text-warm-black leading-none tracking-[-0.02em]">
            Cindy Sous
          </h1>
        </ScrollReveal>

        {/* ─── BIO + PHOTO ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-16 md:gap-24 mb-24">

          {/* Left: bio text */}
          <div>
            <ScrollReveal delay={0.05}>
              <p className="font-sans text-lg leading-[1.8] text-warm-black/70 mb-6">
                I&apos;m a Principal Product Designer based in Denver, CO, with over a decade of
                experience building products where the stakes are high and the complexity is real.
                I specialize in fintech infrastructure, compliance-heavy B2B tools, and B2C
                healthtech platforms — the kinds of products where clarity isn&apos;t just good
                UX, it&apos;s a risk management strategy.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="font-sans text-lg leading-[1.8] text-warm-black/70 mb-6">
                I&apos;ve been the first design hire twice — once at a payments infrastructure
                company, once at a healthcare staffing platform — and I know what it means to
                build foundations from scratch: design systems, research operations, cross-functional
                ways of working, and the political will to advocate for the user in rooms that are
                used to moving without them.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="font-sans text-lg leading-[1.8] text-warm-black/70 mb-8">
                My work is characterized by systems thinking, a high tolerance for ambiguity, and
                a genuine interest in the people who have to use the products I design — whether
                they&apos;re compliance managers untangling entity structures at 2am or nurses
                trying to find a shift that fits their life.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="flex items-center gap-4">
              <Link href="/#work" className="btn-solid">
                See my work
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Resume ↗
              </a>
            </ScrollReveal>
          </div>

          {/* Right: photo */}
          <ScrollReveal delay={0.1} direction="left">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/me.jpg"
                alt="Cindy Sous"
                className="aspect-[3/4] block w-full object-cover"
              />
              {/* Decorative frame detail — sage */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-blue-accent/50 pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>

        {/* ─── DIVIDER ───────────────────────────────────── */}
        <div className="divider mb-20" />

        {/* ─── EXPERIENCE ────────────────────────────────── */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <SectionAsterisk />
            <span className="section-label">Experience</span>
          </div>

          <div className="flex flex-col divide-y divide-stone-mid">
            {experience.map((role, i) => (
              <ScrollReveal
                key={role.company}
                delay={i * 0.1}
                className="py-6 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2"
              >
                <div>
                  <h3 className="font-display font-normal text-2xl text-warm-black">{role.company}</h3>
                  <p className="font-sans text-sm text-warm-gray mt-1">{role.role}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="tag">{role.note}</span>
                  <span className="font-sans text-sm text-warm-gray tabular-nums">{role.period}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── DIVIDER ───────────────────────────────────── */}
        <div className="divider mb-20" />

        {/* ─── TOOLS & METHODS ───────────────────────────── */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-12">
            <SectionAsterisk />
            <span className="section-label">Tools & Methods</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tools.map((group, i) => (
              <ScrollReveal key={group.category} delay={i * 0.07}>
                <div>
                  <p className="label mb-3">{group.category}</p>
                  <ul className="flex flex-col gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="font-sans text-sm text-warm-black/70 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-accent/60 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── DIVIDER ───────────────────────────────────── */}
        <div className="divider mt-20 mb-20" />

        {/* ─── CTA ───────────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-light text-4xl md:text-5xl text-warm-black leading-tight tracking-[-0.01em] mb-2">
                Let&apos;s work together.
              </h2>
              <p className="font-sans text-sm text-warm-gray">
                Open to senior/principal IC roles, contract, and advisory.
              </p>
            </div>
            <a href="mailto:hello@cindysous.com" className="btn-solid flex-shrink-0">
              Get in touch →
            </a>
          </div>
        </ScrollReveal>

      </div>
    </main>
  )
}
