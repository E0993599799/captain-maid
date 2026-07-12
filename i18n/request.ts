import { getRequestConfig } from 'next-intl/server';
import { i18n } from '../i18n.config';

function isLocale(value: string | null | undefined): value is (typeof i18n)['locales'][number] {
  return typeof value === 'string' && (i18n.locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ locale: requestedLocale }) => {
  const locale = isLocale(requestedLocale) ? requestedLocale : i18n.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
    timeZone: 'Asia/Bangkok',
  };
});
