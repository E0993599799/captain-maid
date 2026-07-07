import { getRequestConfig } from 'next-intl/server';
export const locales = ['th', 'en'] as const;
export const defaultLocale = 'th' as const;
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../locales/${locale}.json`)).default,
}));
