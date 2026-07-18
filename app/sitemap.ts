import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return []
  const routes = ['', '/products', '/about', '/blog', '/contact', '/faq']
  return ['th', 'en'].flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.6,
    }))
  )
}
