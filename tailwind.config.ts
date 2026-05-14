import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern clean palette
        bg: '#ffffff',
        'bg-dark': '#09090b',
        ink: '#09090b',
        sage: '#27272a',
        'sage-light': '#52525b',
        'sage-muted': '#d4d4d8',
        'sage-wash': '#f4f4f5',
        blush: '#3f3f46',
        'blush-light': '#e4e4e7',
        'warm-mid': '#71717a',
        'warm-light': '#a1a1aa',
        // Legacy aliases kept for compatibility
        cream: '#ffffff',
        'warm-white': '#fafafa',
        'stone-mid': 'rgba(0,0,0,0.08)',
        'warm-black': '#09090b',
        'warm-gray': '#71717a',
        'warm-brown': '#27272a',
      },
      fontFamily: {
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      typography: () => ({
        warm: {
          css: {
            '--tw-prose-body':         '#09090b',
            '--tw-prose-headings':     '#09090b',
            '--tw-prose-lead':         '#71717a',
            '--tw-prose-links':        '#27272a',
            '--tw-prose-bold':         '#09090b',
            '--tw-prose-counters':     '#71717a',
            '--tw-prose-bullets':      '#bbf7d0',
            '--tw-prose-hr':           'rgba(0,0,0,0.08)',
            '--tw-prose-quotes':       '#71717a',
            '--tw-prose-quote-borders':'#16a34a',
            '--tw-prose-captions':     '#71717a',
            '--tw-prose-code':         '#09090b',
            '--tw-prose-pre-code':     '#fafafa',
            '--tw-prose-pre-bg':       '#09090b',
            '--tw-prose-th-borders':   'rgba(0,0,0,0.08)',
            '--tw-prose-td-borders':   'rgba(0,0,0,0.05)',
            maxWidth: 'none',
            h1: {
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontWeight: '700',
              fontSize: '2.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
            },
            h2: {
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontWeight: '700',
              fontSize: '2rem',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              marginTop: '3rem',
              marginBottom: '1.25rem',
            },
            h3: {
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontWeight: '600',
              fontSize: '1.4rem',
              lineHeight: '1.25',
            },
            p: { lineHeight: '1.8', fontSize: '1rem' },
          },
        },
      }),
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/typography')],
}

export default config
