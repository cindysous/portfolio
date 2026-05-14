import type { Metadata } from 'next'
import { Inter, Homemade_Apple } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import LayoutWrapper from '@/components/LayoutWrapper'
import CustomCursor from '@/components/CustomCursor'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import AccessibilityPanel from '@/components/AccessibilityPanel'

// Inter — used for display, body, and label roles throughout the site
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
})

// Homemade Apple — handwriting accent for name styling (400 only)
const homemadeApple = Homemade_Apple({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-handwriting',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Cindy Sous',
    default: 'Cindy Sous | Principal Product Designer',
  },
  description:
    'Principal Product Designer with 10+ years across B2B fintech and B2C healthtech. Based in Denver, CO.',
  openGraph: {
    type: 'website',
    url: 'https://cindysous.com',
    title: 'Cindy Sous | Principal Product Designer',
    description:
      'Principal Product Designer with 10+ years across B2B fintech and B2C healthtech.',
    siteName: 'Cindy Sous',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cindy Sous | Principal Product Designer',
    description:
      'Principal Product Designer with 10+ years across B2B fintech and B2C healthtech.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${homemadeApple.variable}`}
    >
      <head>
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </head>
      <body className="bg-bg font-sans antialiased">
        <ScrollRevealInit />
        <CustomCursor />
        <Nav />
        <AccessibilityPanel />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Footer />
      </body>
    </html>
  )
}
