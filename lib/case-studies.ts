import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface CaseStudyFrontmatter {
  title: string
  company: string
  year: string
  role: string
  platform: string
  tags: string[]
  teaser: string
  description: string
  heroColor: string
  heroBg?: string
  heroFullBleed?: boolean   // when true: card expands to full-width unified surface
  order: number
  archived?: boolean   // soft-archive: set true to hide; remove or set false to restore
  inProgress?: boolean // show "in progress" banner on the case study page
  prevSlug?: string
  prevTitle?: string
  nextSlug?: string
  nextTitle?: string
}

export interface CaseStudy {
  slug: string
  frontmatter: CaseStudyFrontmatter
  content: string
}

const CASE_STUDIES_DIR = path.join(process.cwd(), 'content', 'case-studies')

export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return []
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export function getCaseStudy(slug: string): CaseStudy {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    content,
  }
}

export function getAllCaseStudies(
  { includeArchived = false }: { includeArchived?: boolean } = {}
): (CaseStudyFrontmatter & { slug: string })[] {
  return getCaseStudySlugs()
    .map((slug) => {
      const { frontmatter } = getCaseStudy(slug)
      return { ...frontmatter, slug }
    })
    .filter((cs) => includeArchived || !cs.archived)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
}
