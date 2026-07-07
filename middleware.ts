const createMiddleware = require('next-intl/middleware').default;
import { i18n } from './i18n.config';

export default createMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(th|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
