import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.[^/]+$/
const LOCALES = new Set(['th', 'en'])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const parts = pathname.split('/').filter(Boolean)
  const locale = parts[0]

  if (!locale || !LOCALES.has(locale)) {
    const url = request.nextUrl.clone()
    url.pathname = `/th${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  if (parts.length === 1) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${parts.slice(1).join('/')}`
  url.search = request.nextUrl.search

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-captain-maid-locale', locale)

  return NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
