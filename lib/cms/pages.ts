import { cmsClient } from './client'
import type { CMSPage, CmsSection, Locale, ResolvedCmsPage, ResolvedPageLayout } from '../../types/cms'

export interface CmsPageResponse { docs?: CMSPage[] }

export interface CmsPageClient {
  getPage(slug: string, locale: Locale, options?: { timeout?: number }): Promise<CmsPageResponse>
  getSections(pageSlug: string, locale: Locale, options?: { timeout?: number }): Promise<{ docs?: CmsSection[] }>
}

export function resolvePageLayout(
  page: CMSPage,
  sections: CmsSection[],
  staticFallback: ResolvedPageLayout,
): ResolvedPageLayout {
  const publishedSections = sections
    .filter((section) => section.active && section._status === 'published')
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))

  return publishedSections.length > 0
    ? publishedSections.flatMap((section) => section.content)
    : (page.layout || page.blocks || staticFallback)
}

export async function getCmsPage(
  slug: string,
  locale: Locale,
  staticFallback: ResolvedPageLayout,
  client: CmsPageClient = cmsClient,
): Promise<ResolvedCmsPage | null> {
  try {
    const pageResponse = await client.getPage(slug, locale, { timeout: 10000 })
    const page = pageResponse.docs?.[0]
    if (!page) return null
    const sectionsResponse = await client.getSections(slug, locale, { timeout: 10000 })
    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      seo: page.seo,
      layout: resolvePageLayout(page, sectionsResponse.docs || [], staticFallback),
    }
  } catch {
    return null
  }
}

export async function getCmsPageLayout(
  slug: string,
  locale: Locale,
  staticFallback: ResolvedPageLayout,
  client: CmsPageClient = cmsClient,
): Promise<ResolvedPageLayout> {
  const page = await getCmsPage(slug, locale, staticFallback, client)
  return page?.layout || staticFallback
}
