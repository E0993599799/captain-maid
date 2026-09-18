import { cmsClient } from './client'
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
  heroImage?: { url: string; alt: string }
  seo?: { title?: string; description?: string }
}

type RawPost = Record<string, any>
type Localized = string | { th?: string; en?: string } | null | undefined

function localized(value: Localized, locale: Locale): string {
  if (typeof value === 'string') return value
  return value?.[locale] || value?.[locale === 'th' ? 'en' : 'th'] || ''
}

function media(value: any) {
  if (!value || typeof value !== 'object' || typeof value.url !== 'string') return undefined
  return { url: value.url, alt: localized(value.alt, 'th') || value.filename || '' }
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
    category: Array.isArray(raw.categories) && raw.categories[0]
      ? localized(raw.categories[0].name, locale) || String(raw.categories[0].slug || '')
      : 'Blog',
    author: typeof raw.author === 'object' && raw.author?.name ? String(raw.author.name) : 'Captain Maid',
    readTime: Number.isFinite(Number(raw.readTime)) ? Number(raw.readTime) : 1,
    publishedAt: typeof raw.publishedAt === 'string' ? raw.publishedAt : String(raw.updatedAt || raw.createdAt || ''),
    content: raw.content ?? null,
    heroImage: media(raw.heroImage),
    seo: raw.seo ? {
      title: localized(raw.seo.title, locale),
      description: localized(raw.seo.description, locale),
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
