import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => ({}))) as { route?: string }
  const route = body.route && body.route.startsWith('/') ? body.route : '/products'

  revalidatePath(route)
  revalidatePath('/products')
  return Response.json({ ok: true, revalidated: [route, '/products'] })
}
