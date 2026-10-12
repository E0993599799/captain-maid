import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/cms/blog'
import { getCaptainProducts } from '@/lib/cms/captain-products'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
const LOCALES = ['th', 'en'] as const

function safeDate(value: string): Date {
  const date = new Date(value)
  return value && !Number.isNaN(date.getTime()) ? date : new Date()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteUrl) return []
  const routes = ['', '/products', '/about', '/blog', '/contact', '/faq']
  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.6,
    }))
  )

  const productEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const products = await getCaptainProducts(locale)
        return products
          .filter((product) => !product.seo?.noIndex)
          .map((product) => ({
            url: `${siteUrl}/${locale}/products/${product.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          }))
      })
    )
  ).flat()

  const blogEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const posts = await getBlogPosts(locale)
        const seen = new Set<string>()
        return posts.flatMap((post) => {
          const url = `${siteUrl}/${locale}/blog/${post.slug}`
          if (seen.has(url)) return []
          seen.add(url)
          return [{
            url,
            lastModified: safeDate(post.publishedAt),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          }]
        })
      })
    )
  ).flat()

  return [...staticEntries, ...productEntries, ...blogEntries]
}
