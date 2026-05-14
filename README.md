# Cindy Sous — Portfolio

Personal design portfolio built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Case study content is stored in MDX files for easy editing without touching components.

---

## Running Locally

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx           # Root layout: fonts, Nav, Footer, page transitions
│   ├── page.tsx             # Home page: Hero + Case Studies + About teaser + Contact
│   ├── about/
│   │   └── page.tsx         # Full about page: bio, experience, tools
│   └── work/
│       └── [slug]/
│           └── page.tsx     # Case study page template (reads from MDX)
├── components/
│   ├── Nav.tsx              # Sticky nav with scroll effect + mobile menu
│   ├── Hero.tsx             # Animated hero section
│   ├── CaseStudyCard.tsx    # Card with hover reveal for the work grid
│   ├── ScrollReveal.tsx     # Scroll-triggered fade-in wrapper
│   ├── LayoutWrapper.tsx    # AnimatePresence page transition wrapper
│   ├── Footer.tsx           # Simple footer with email + LinkedIn
│   └── MdxComponents.tsx    # Custom MDX components (Stat, StatsGrid, Callout, etc.)
├── content/
│   └── case-studies/        # ← All case study content lives here
│       ├── conduit-entity-management.mdx
│       ├── conduit-pizza-tracker.mdx
│       └── intelycare-search-filter.mdx
├── lib/
│   └── case-studies.ts      # File-system helpers to read MDX files
└── public/
    └── images/              # Drop project images here (see naming below)
```

---

## Adding a New Case Study

### 1. Create the MDX file

Add a new file to `content/case-studies/your-project-slug.mdx`.

Copy this frontmatter template to start:

```yaml
---
title: "Your Project Title"
company: "Company Name"
year: "2024"
role: "Principal Product Designer"
platform: "Web App"           # e.g. B2B Web App, iOS, B2C Mobile + Web
tags: ["B2B", "FinTech", "Systems Design"]
teaser: "One-line hook for the card hover state."
description: "2-3 sentence description used in the case study hero and meta tags."
heroColor: "#1A1614"          # Dark color for the hero banner background
order: 4                      # Controls sort order on the home page
prevSlug: "conduit-pizza-tracker"
prevTitle: "Pizza Tracker"
nextSlug: ""                  # Leave empty if no next project
nextTitle: ""
---

## Overview

Write your case study content here using Markdown...
```

### 2. Add your images

Drop images in `/public/images/` using this naming convention:

| File | Where it's used |
|---|---|
| `your-project-slug.jpg` | Card thumbnail on the home page |
| `cindy-photo.jpg` | Hero photo (home + about pages) |

The hero banner and process image sections on case study pages use placeholder divs by default — replace them in `app/work/[slug]/page.tsx` when you have real screenshots.

### 3. Update prev/next links

Open the MDX files for the projects on either side and update their `prevSlug`/`nextSlug` frontmatter to include your new project in the navigation chain.

### 4. Done

The new page will be live at `/work/your-project-slug`. The home page grid automatically picks it up sorted by the `order` field.

---

## Updating Existing Content

All copy, metadata, tags, and project structure for the 3 case studies can be edited directly in their `.mdx` files — no component changes needed.

| Want to change | Edit this |
|---|---|
| Hero title, company, tags, year | Frontmatter in the `.mdx` file |
| Case study body copy | Markdown content in the `.mdx` file |
| Teaser text on home page cards | `teaser` field in frontmatter |
| Card sort order | `order` field in frontmatter |
| About page bio / experience | `app/about/page.tsx` |
| Contact email / LinkedIn | `app/page.tsx` (ContactForm) and `components/Footer.tsx` |
| Nav links | `components/Nav.tsx` |
| Color palette | `tailwind.config.ts` and `app/globals.css` |

---

## Special MDX Components

These custom components are available inside any `.mdx` case study file:

```mdx
## Outcomes

<StatsGrid>
  <Stat value="41%" label="drop in support tickets" />
  <Stat value="27%" label="increase in booking conversion" />
  <Stat value="3.4→4.6" label="CSAT score improvement" />
</StatsGrid>

<Callout>
  The most effective UX for financial products is emotional scaffolding, not information density.
</Callout>

<ImagePlaceholder label="Wireframe explorations" caption="Early concept sketches from the discovery sprint" aspect="16/9" />

<ProcessStep number="1" title="Discovery">
  Ran 8 moderated usability sessions with nurses across experience levels.
</ProcessStep>
```

---

## Deploying to Vercel

```bash
# Push to GitHub first, then:
vercel --prod

# Or connect your GitHub repo in the Vercel dashboard — it auto-deploys on push.
```

No environment variables required. The build is fully static (SSG).

---

## Adding Your Photo

Drop your photo at `public/images/cindy-photo.jpg`. It's used in:
- The hero section on the home page (left column)
- The about page (right column)

Recommended: a square or portrait crop, at least 640×800px.

---

## Connecting a Real Contact Form

The contact form currently points to a placeholder Formspree URL. To connect it:

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy your form ID
3. In `app/page.tsx`, update the form action:
   ```tsx
   action="https://formspree.io/f/YOUR_ACTUAL_FORM_ID"
   ```

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 15 | Framework (App Router, static export) |
| React | 19 | UI library |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 11 | Animations (hero, scroll reveals, transitions) |
| next-mdx-remote | 5 | MDX rendering (RSC-compatible) |
| gray-matter | 4 | MDX frontmatter parsing |
| Cormorant Garamond | — | Display / heading font |
| DM Sans | — | Body / UI font |
