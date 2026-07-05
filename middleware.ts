import createIntlMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/request';

const intlMiddleware = createIntlMiddleware({ locales, defaultLocale, localePrefix: 'as-needed' });

export async function middleware(request: NextRequest) {
  try {
    return intlMiddleware(request);
  } catch (error) {
    console.error('Middleware error:', error);
    return intlMiddleware(request);
  }
}

export const config = { matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'] };
