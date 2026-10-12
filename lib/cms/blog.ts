import { cmsClient } from './client'
import { mapArticleLayout, type CmsArticleBlock } from './article-layout'
import type { Locale } from '@/types/cms'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  readTime: number
  publishedAt: string
  content: unknown
  articleLayout: CmsArticleBlock[]
  heroImage?: { url: string; alt: string }
  seo?: { title?: string; description?: string }
}

type RawPost = Record<string, unknown>

function localized(value: unknown, locale: Locale): string {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ''
  const row = value as { th?: unknown; en?: unknown }
  const primary = row[locale]
  const fallback = row[locale === 'th' ? 'en' : 'th']
  return typeof primary === 'string' ? primary : typeof fallback === 'string' ? fallback : ''
}

function media(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  const row = value as Record<string, unknown>
  if (typeof row.url !== 'string') return undefined
  return {
    url: row.url,
    alt: localized(row.alt, 'th') || (typeof row.filename === 'string' ? row.filename : ''),
  }
}

function seoValue(value: unknown, key: 'metaTitle' | 'metaDescription', locale: Locale): string {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return ''
  return localized((value as Record<string, unknown>)[key], locale)
}

export function mapCmsBlogPost(raw: RawPost, locale: Locale = 'th'): BlogPost | null {
  const slug = typeof raw.slug === 'string' ? raw.slug.trim() : ''
  const id = raw.id == null ? '' : String(raw.id)
  const title = localized(raw.title, locale).trim()
  if (!id || !slug || !title) return null
  return {
    id,
    slug,
    title,
    excerpt: localized(raw.excerpt, locale),
    category: typeof raw.newsCategory === 'string' && raw.newsCategory.trim()
      ? raw.newsCategory.trim()
      : 'Blog',
    author: 'Captain Maid',
    readTime: Number.isFinite(Number(raw.readTime)) ? Number(raw.readTime) : 1,
    publishedAt: typeof raw.publishedDate === 'string'
      ? raw.publishedDate
      : String(raw.updatedAt || raw.createdAt || ''),
    content: raw.body ?? null,
    articleLayout: mapArticleLayout(raw.articleLayout),
    heroImage: media(raw.coverImage),
    seo: raw.seo ? {
      title: seoValue(raw.seo, 'metaTitle', locale),
      description: seoValue(raw.seo, 'metaDescription', locale),
    } : undefined,
  }
}

export async function getBlogPosts(locale: Locale = 'th'): Promise<BlogPost[]> {
  const response = await cmsClient.getArticles({ locale, limit: 100 }) as { docs?: RawPost[] }
  return (response.docs || []).map((post) => mapCmsBlogPost(post, locale)).filter((post): post is BlogPost => Boolean(post))
}

export async function getBlogPost(slug: string, locale: Locale = 'th'): Promise<BlogPost | null> {
  const response = await cmsClient.getArticle(slug, locale) as { docs?: RawPost[] }
  return response.docs?.[0] ? mapCmsBlogPost(response.docs[0], locale) : null
}
