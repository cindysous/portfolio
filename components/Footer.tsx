'use client'

const LINKS = [
  { href: 'https://linkedin.com/in/cindysous', label: 'LinkedIn', external: true },
  { href: '/resume.pdf', label: 'Resume', external: true },
  { href: 'mailto:hello@cindysous.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer
      className="flex flex-col gap-4"
      style={{
        padding: '36px 80px 28px var(--sidebar-gap)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Top row */}
      <div className="footer-top-row flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--ink)',
          }}
        >
          <span style={{ width: 5, height: 5, background: 'var(--sage)', borderRadius: '50%', display: 'inline-block' }} />
          Cindy Sous
        </div>

        {/* Status */}
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 10,
            letterSpacing: '0.08em',
            color: 'var(--warm-light)',
          }}
        >
          Denver, CO — Open to remote &amp; hybrid
        </span>

        {/* Links */}
        <ul className="footer-links-list flex gap-7 list-none m-0 p-0">
          {LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--warm-mid)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--warm-mid)')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Silly credit line */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 10,
            letterSpacing: '0.05em',
            color: 'var(--warm-mid)',
            opacity: 1,
            textAlign: 'center',
          }}
        >
          🌿 vibe coded with{' '}
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            Claude Code
          </a>
          {' '}✨
        </span>
      </div>
    </footer>
  )
}
