import { cmsClient } from '@/lib/cms/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const response = (await cmsClient.getProducts({ locale: 'th', limit: 50 })) as {
      docs?: Array<{ slug?: string }>
    }
    const slugs = (response.docs || [])
      .map((product) => product.slug)
      .filter((slug): slug is string => Boolean(slug))

    return Response.json({
      ok: true,
      source: 'cms',
      site: 'captain-maid',
      productCount: slugs.length,
      slugs,
    })
  } catch {
    return Response.json(
      {
        ok: false,
        source: 'cms',
        site: 'captain-maid',
        error: 'CMS_UNAVAILABLE',
      },
      { status: 503 },
    )
  }
}
