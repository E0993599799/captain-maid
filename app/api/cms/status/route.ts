import { cmsClient } from '@/lib/cms/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!process.env.NEXT_PUBLIC_CMS_URL) {
    return Response.json(
      { ok: false, source: 'static', site: 'captain-maid', error: 'CMS_NOT_CONFIGURED' },
      { status: 503 },
    )
  }

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
  } catch (error) {
    return Response.json(
      {
        ok: false,
        source: 'cms',
        site: 'captain-maid',
        error: error instanceof Error ? error.message : 'CMS_UNAVAILABLE',
      },
      { status: 503 },
    )
  }
}
