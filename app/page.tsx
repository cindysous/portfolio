import Link from 'next/link'
import Image from 'next/image'
import HeroWrapper from '@/components/HeroWrapper'
import Ticker from '@/components/Ticker'
import LaptopMockup from '@/components/LaptopMockup'
import TransactionTrackerMockup from '@/components/TransactionTrackerMockup'
import EntityManagementMockup from '@/components/EntityManagementMockup'
import SearchFilterMockup from '@/components/SearchFilterMockup'
import { getAllCaseStudies } from '@/lib/case-studies'

export default async function HomePage() {
  const caseStudies = getAllCaseStudies()
  const featured = caseStudies.slice(0, 3)

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────── */}
      <HeroWrapper />

      {/* ─── TICKER ───────────────────────────────────── */}
      <Ticker />

      {/* ─── FEATURED WORK ────────────────────────────── */}
      <section
        id="featured-work"
        style={{
          padding: '80px 80px 80px var(--sidebar-gap)',
          background: 'var(--bg)',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Header */}
        <div data-reveal style={{ marginBottom: 40 }}>
          <div style={{
            fontFamily: 'var(--font-inter)', fontSize: 9,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--warm-light)', marginBottom: 10,
          }}>
            // selected work
          </div>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(28px, 3vw, 44px)',
            fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--ink)', margin: 0,
          }}>
            Featured projects
          </h2>
        </div>

        {/* Feature card (full width) + side-by-side row */}
        <div data-reveal-stagger style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Row 1 — large feature card */}
          {featured[0] && (
            <Link
              href={`/work/${featured[0].slug}`}
              className="featured-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: 380,
                borderRadius: 20,
                overflow: 'hidden',
                textDecoration: 'none',
                background: 'linear-gradient(145deg, #0f1c24 0%, #091318 100%)',
                border: '1px solid rgba(4,69,245,0.18)',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
                position: 'relative',
              }}
            >
              {/* Text side */}
              <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/whitelogo.svg" alt="Conduit" style={{ height: 16, width: 'auto', display: 'block', opacity: 0.55, marginBottom: 20 }} />
                  <div style={{
                    fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.10em',
                    textTransform: 'uppercase', color: '#5b88ff', marginBottom: 20,
                    fontWeight: 600,
                  }}>
                    {featured[0].tags?.[0] ?? ''}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(26px, 2.5vw, 38px)',
                    fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05,
                    color: 'rgba(245,243,239,0.96)', marginBottom: 16,
                  }}>
                    {featured[0].title}
                  </div>
                  <p style={{
                    fontSize: 14, lineHeight: 1.7,
                    color: 'rgba(245,243,239,0.65)', margin: 0, maxWidth: 340,
                  }}>
                    {featured[0].teaser}
                  </p>
                </div>
                <div style={{
                  fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: '#5b88ff', marginTop: 32,
                }}>
                  Read case study →
                </div>
              </div>
              {/* Visual side — Transaction Tracker mockup */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380 }}>
                <TransactionTrackerMockup />
              </div>
            </Link>
          )}

          {/* Card 2 — Entity Management */}
          {featured[1] && (
            <Link
              href={`/work/${featured[1].slug}`}
              className="featured-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: 380,
                borderRadius: 20,
                overflow: 'visible',
                textDecoration: 'none',
                background: 'linear-gradient(145deg, #1a2a18 0%, #0f1a0d 100%)',
                border: '1px solid rgba(122,158,117,0.15)',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
                clipPath: 'inset(0 round 20px)',
              }}
            >
              {/* Text side */}
              <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/whitelogo.svg" alt="Conduit" style={{ height: 16, width: 'auto', display: 'block', opacity: 0.55, marginBottom: 20 }} />
                  <div style={{
                    fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.10em',
                    textTransform: 'uppercase', color: '#7a9e75', marginBottom: 20,
                    fontWeight: 600,
                  }}>
                    {featured[1].tags?.[0] ?? ''}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(26px, 2.5vw, 38px)',
                    fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05,
                    color: 'rgba(245,243,239,0.96)', marginBottom: 16,
                  }}>
                    {featured[1].title}
                  </div>
                  <p style={{
                    fontSize: 14, lineHeight: 1.7,
                    color: 'rgba(245,243,239,0.65)', margin: 0, maxWidth: 340,
                  }}>
                    {featured[1].teaser}
                  </p>
                </div>
                <div style={{
                  fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: '#7a9e75', marginTop: 32,
                }}>
                  Read case study →
                </div>
              </div>
              {/* Entity Management mockup side */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380 }}>
                <EntityManagementMockup />
              </div>
            </Link>
          )}

          {/* Card 3 — IntelyCare */}
          {featured[2] && (
            <Link
              href={`/work/${featured[2].slug}`}
              className="featured-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: 380,
                borderRadius: 20,
                overflow: 'visible',
                textDecoration: 'none',
                background: 'linear-gradient(145deg, #101520 0%, #0a0e18 100%)',
                border: '1px solid rgba(106,138,176,0.15)',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
                clipPath: 'inset(0 round 20px)',
              }}
            >
              {/* Text side */}
              <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-inter)', fontSize: 11, letterSpacing: '0.10em',
                    textTransform: 'uppercase', color: '#009ae9', marginBottom: 20,
                    fontWeight: 600,
                  }}>
                    {featured[2].company}{featured[2].tags?.[0] ? ` · ${featured[2].tags[0]}` : ''}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(26px, 2.5vw, 38px)',
                    fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05,
                    color: 'rgba(245,243,239,0.96)', marginBottom: 16,
                  }}>
                    {featured[2].title}
                  </div>
                  <p style={{
                    fontSize: 14, lineHeight: 1.7,
                    color: 'rgba(245,243,239,0.65)', margin: 0, maxWidth: 340,
                  }}>
                    {featured[2].teaser}
                  </p>
                </div>
                <div style={{
                  fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: '#009ae9', marginTop: 32,
                }}>
                  Read case study →
                </div>
              </div>
              {/* IntelyCare app mockup */}
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380, '--bg-card': '#101520' } as React.CSSProperties}>
                <SearchFilterMockup />
              </div>
            </Link>
          )}
        </div>
      </section>



      {/* ─── ABOUT ────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: '100px 80px 100px var(--sidebar-gap)',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg)',
        }}
      >
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: '44px 48px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        }}>

          {/* Card header — label + name */}
          <div data-reveal style={{ marginBottom: 36, paddingBottom: 36, borderBottom: '1px solid var(--border)' }}>
            <div style={{
              fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--warm-light)', marginBottom: 10,
            }}>
              // about
            </div>
            <h2 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1,
              color: 'var(--ink)', margin: 0,
            }}>
              Cindy Sous
            </h2>
          </div>

          {/* 3-column grid: photo | bio | experience+skills */}
          <div data-reveal-stagger style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr 260px',
            gap: '0 52px',
            alignItems: 'start',
          }}>

            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/me.jpg"
              alt="Cindy Sous"
              style={{
                width: 160, height: 160,
                objectFit: 'cover', objectPosition: 'center top',
                borderRadius: 14, display: 'block',
                border: '1px solid var(--border)',
              }}
            />

            {/* Bio */}
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--warm-mid)', marginBottom: 20, marginTop: 0 }}>
                I&apos;m a Principal Product Designer based in Denver, CO, with over a decade of
                experience building products where the stakes are high and the complexity is real.
                I specialize in fintech infrastructure, compliance-heavy B2B tools, and B2C
                healthtech platforms — the kinds of products where clarity isn&apos;t just good
                UX, it&apos;s a risk management strategy.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--warm-mid)', marginBottom: 20, marginTop: 0 }}>
                I&apos;ve been the first design hire twice — once at a payments infrastructure
                company, once at a healthcare staffing platform — and I know what it means to
                build foundations from scratch: design systems, research operations, cross-functional
                ways of working, and the political will to advocate for the user in rooms that are
                used to moving without them.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--warm-mid)', margin: 0 }}>
                My work is characterized by systems thinking, a high tolerance for ambiguity, and
                a genuine interest in the people who have to use the products I design.
              </p>
            </div>

            {/* Experience + Skills stacked */}
            <div>
              <div style={{
                fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12,
              }}>
                Experience
              </div>
              <div style={{ marginBottom: 36 }}>
                {[
                  { company: 'Conduit',              period: '2024–2026', note: '1st design hire', logo: '/conduit-blacklogomark.svg' },
                  { company: 'IntelyCare',           period: '2017–2024', note: '1st design hire', logo: '/intelylogomarker.svg'      },
                  { company: 'Eastern Labs',         period: '2016–2017', note: '',           logo: '/EB-logomark.svg'           },
                  { company: 'Fidelity Investments', period: '2015–2016', note: '',           logo: '/fidelity-logomark.svg'     },
                  { company: 'Emanio Creative',      period: '2013–2015', note: '',           logo: '/emaniologomark.svg'        },
                ].map((e, i) => (
                  <div key={e.company} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: 8, paddingTop: 11, paddingBottom: 11,
                    borderBottom: '1px solid var(--border)',
                    ...(i === 0 ? { borderTop: '1px solid var(--border)' } : {}),
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {e.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={e.logo} alt="" aria-hidden="true" style={{ width: 16, height: 16, objectFit: 'contain', opacity: 0.55, flexShrink: 0 }} />
                      )}
                      <span style={{
                        fontFamily: 'var(--font-inter)', fontSize: 13,
                        fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--ink)',
                      }}>
                        {e.company}
                      </span>
                      {e.note && (
                        <span style={{
                          fontFamily: 'var(--font-inter)', fontSize: 8, letterSpacing: '0.05em',
                          textTransform: 'uppercase', color: 'var(--warm-light)', marginLeft: 7,
                        }}>
                          {e.note}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.05em',
                      textTransform: 'uppercase', color: 'var(--warm-mid)', whiteSpace: 'nowrap',
                    }}>
                      {e.period}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                fontFamily: 'var(--font-inter)', fontSize: 9, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 12,
              }}>
                Tools & methods
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {[
                  'Figma', 'FigJam', 'Claude Code', 'Claude Design', 'Google Stitch',
                  'Claude', 'Systems Thinking', 'UX Research',
                  'Design Systems', 'B2B FinTech', 'Compliance UX',
                ].map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-inter)', fontSize: 9,
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                    color: 'var(--warm-mid)', background: 'var(--bg-mid, rgba(0,0,0,0.04))',
                    border: '1px solid var(--border)',
                    borderRadius: 4, padding: '3px 8px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>{/* end 3-col grid */}

        </div>{/* end card */}
      </section>

      {/* ─── CONTACT ──────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: '100px 80px 100px var(--sidebar-gap)',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg)',
        }}
      >
        <div data-reveal style={{ maxWidth: 640 }}>
          <div style={{
            fontFamily: 'var(--font-inter)', fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--warm-light)', marginBottom: 10,
          }}>
            // get in touch
          </div>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(28px, 3vw, 44px)',
            fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--ink)', marginBottom: 24,
          }}>
            Let&apos;s work together.
          </h2>
          <p style={{
            fontSize: 15, lineHeight: 1.75, color: 'var(--warm-mid)',
            marginBottom: 40, maxWidth: 380,
          }}>
            Open to full-time positions — senior and principal IC, and design lead roles.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a
              href="mailto:sous.cindy@gmail.com"
              className="contact-link"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'var(--ink)' }}
            >
              sous.cindy@gmail.com →
            </a>
            <a
              href="https://linkedin.com/in/cindysous"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 15, color: 'var(--ink)' }}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
