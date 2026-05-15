import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCaseStudy, getCaseStudySlugs } from '@/lib/case-studies'
import MdxComponents from '@/components/MdxComponents'
import CaseStudyScrollBar from '@/components/CaseStudyScrollBar'
import CaseStudyHeroVisual from '@/components/CaseStudyHeroVisual'
import InProgressBanner from '@/components/InProgressBanner'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Exclude archived studies from static generation — they'll 404 at runtime too
  return getCaseStudySlugs()
    .filter((slug) => {
      try {
        const { frontmatter } = getCaseStudy(slug)
        return !frontmatter.archived
      } catch {
        return false
      }
    })
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const { frontmatter } = getCaseStudy(slug)
    return {
      title: `${frontmatter.title} — ${frontmatter.company}`,
      description: frontmatter.description,
    }
  } catch {
    return { title: 'Case Study' }
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  let caseStudy
  try {
    caseStudy = getCaseStudy(slug)
  } catch {
    notFound()
  }

  // Archived studies are hidden everywhere — treat direct URL as 404
  if (caseStudy.frontmatter.archived) notFound()

  const { frontmatter, content } = caseStudy
  const fullBleed = !!frontmatter.heroFullBleed  // hero-full-bleed: remove to revert

  return (
    <main style={{ paddingLeft: 'var(--sidebar-gap)' }}>

      {frontmatter.inProgress && <InProgressBanner />}

      <CaseStudyScrollBar
        title={frontmatter.title}
        company={frontmatter.company}
        teaser={frontmatter.teaser}
      />

      {/* ── HERO — full-bleed when heroFullBleed; tinted wrapper otherwise ── */}
      <div className="case-hero-outer" style={{
        marginLeft: 'calc(-1 * var(--sidebar-gap))',
        paddingLeft: 'var(--sidebar-gap)',
        background: fullBleed ? frontmatter.heroColor : (frontmatter.heroBg ?? '#f4f4f5'),
        paddingBottom: '80px',
      }}>

      {/* Back button */}
      <div className="case-back-btn-wrap" style={{ padding: '32px 80px 20px' }}>
        <Link href="/#featured-work" className="all-work-btn">
          ← All work
        </Link>
      </div>

      {/* Hero card */}
      <div className="case-hero-card" style={{
        margin: fullBleed ? 0 : '0 80px',
        background: frontmatter.heroColor,
        borderRadius: fullBleed ? 0 : 20,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: ['conduit-transaction-tracker', 'intelycare-search-filter', 'conduit-entity-management'].includes(slug) ? '1fr 1fr' : '1fr',
      }}>

        {/* Left — text content */}
        <div style={{ padding: '64px 64px 60px' }}>

          {/* Company / logo above title */}
          <div style={{ marginBottom: 16 }}>
            {frontmatter.company === 'Conduit' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/whitelogo.svg" alt="Conduit" style={{ height: 16, width: 'auto', display: 'block', opacity: 0.55 }} />
            ) : (
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                {frontmatter.company}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(32px, 4vw, 64px)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.0,
            color: 'rgba(245,243,239,0.96)',
            maxWidth: 600, marginBottom: 28,
          }}>
            {frontmatter.title}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: 16, lineHeight: 1.75,
            color: 'rgba(245,243,239,0.65)',
            maxWidth: 460, marginBottom: 56, marginTop: 0,
          }}>
            {frontmatter.description}
          </p>

          {/* Metadata row */}
          <div style={{
            display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-start',
            paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.10)',
          }}>
            {[
              { label: 'Role',     value: frontmatter.role     },
              { label: 'Platform', value: frontmatter.platform },
              { label: 'Year',     value: frontmatter.year     },
            ].map(item => (
              <div key={item.label}>
                <div style={{
                  fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                  marginBottom: 8,
                }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(245,243,239,0.72)', lineHeight: 1.4 }}>
                  {item.value}
                </div>
              </div>
            ))}
            <div>
              <div style={{
                fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
                marginBottom: 8,
              }}>
                Skills
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {frontmatter.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.06em',
                    color: 'rgba(245,243,239,0.52)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 4, padding: '3px 8px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — visual mockup (slug-specific) */}
        <div className={`case-hero-visual case-hero-visual-${slug}`} style={{ position: 'relative', minHeight: 400, overflow: 'hidden' }}>
          <CaseStudyHeroVisual slug={slug} heroColor={frontmatter.heroColor} />
        </div>

      </div>{/* end hero card */}

      </div>{/* end hero white wrapper */}

      {/* ── CASE STUDY CONTENT ────────────────────────────────── */}
      <div className="case-content-area" style={{ padding: '0 80px 96px' }}>
        <article className="prose prose-warm max-w-none">
          <MDXRemote source={content} components={MdxComponents} />
        </article>
      </div>

      {/* ── PREV / NEXT NAV ───────────────────────────────────── */}
      <div data-reveal style={{ borderTop: '1px solid var(--border)' }}>
        <div className="case-prevnext-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

          {/* Prev */}
          <div style={{ borderRight: '1px solid var(--border)' }}>
            {frontmatter.prevSlug ? (
              <Link
                href={`/work/${frontmatter.prevSlug}`}
                style={{
                  display: 'flex', flexDirection: 'column',
                  padding: '48px 64px', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                className="case-nav-link"
              >
                <span style={{
                  fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--warm-light)',
                  marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  ← Previous
                </span>
                <span style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  fontWeight: 700, letterSpacing: '-0.02em',
                  color: 'var(--ink)', lineHeight: 1.2,
                }}>
                  {frontmatter.prevTitle}
                </span>
              </Link>
            ) : (
              <div style={{ padding: '48px 64px', fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--warm-light)' }}>
                — First project
              </div>
            )}
          </div>

          {/* Next */}
          <div>
            {frontmatter.nextSlug ? (
              <Link
                href={`/work/${frontmatter.nextSlug}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                  padding: '48px 64px', textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                className="case-nav-link"
              >
                <span style={{
                  fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--warm-light)',
                  marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  Next →
                </span>
                <span style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  fontWeight: 700, letterSpacing: '-0.02em',
                  color: 'var(--ink)', lineHeight: 1.2,
                  textAlign: 'right',
                }}>
                  {frontmatter.nextTitle}
                </span>
              </Link>
            ) : (
              <div style={{ padding: '48px 64px', display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/#featured-work" style={{
                  fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--warm-light)', textDecoration: 'none',
                }}>
                  All work →
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

    </main>
  )
}
