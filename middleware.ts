const createMiddleware = require('next-intl/middleware').default;
import { i18n } from './i18n.config';

export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'as-needed',
});

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Admin routes (/admin/*)
  // - Next.js internals (_next)
  // - Vercel internals (_vercel)
  // - Files with extensions (e.g. favicon.ico, sitemap.xml, robots.txt)
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
