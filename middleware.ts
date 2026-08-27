import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.[^/]+$/
const LOCALES = new Set(['th', 'en'])
const LOCALE_COOKIE = 'captain_locale'

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
  const routeLocale = parts[0]

  if (!routeLocale || !LOCALES.has(routeLocale)) {
    const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value
    const locale = savedLocale && LOCALES.has(savedLocale) ? savedLocale : 'th'
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  if (parts.length === 1) {
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE, routeLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${parts.slice(1).join('/')}`
  url.search = request.nextUrl.search

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-captain-maid-locale', routeLocale)

  const response = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  })
  response.cookies.set(LOCALE_COOKIE, routeLocale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
