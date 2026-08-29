import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const configuredSecret = process.env.REVALIDATE_SECRET
  const bearer = request.headers.get('authorization')
  const legacySecret = request.headers.get('x-revalidate-secret')

  if (
    !configuredSecret ||
    (bearer !== `Bearer ${configuredSecret}` && legacySecret !== configuredSecret)
  ) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => ({}))) as { route?: string; tag?: string }

  if (body.tag && body.tag !== 'products') {
    return Response.json({ ok: false, error: 'invalid_tag' }, { status: 400 })
  }

  const route = body.route && body.route.startsWith('/') ? body.route : '/products'

  revalidateTag('products', 'max')
  revalidatePath(route)
  if (route !== '/products') revalidatePath('/products')

  return Response.json({
    ok: true,
    revalidated: route === '/products' ? ['/products'] : [route, '/products'],
    tags: ['products'],
    now: Date.now(),
  })
}
