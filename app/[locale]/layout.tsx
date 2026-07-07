import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import '@/app/globals.css';
import { i18n } from '@/i18n.config';

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title') || 'Captain Maid - Premium Home Cleaning Products',
    description:
      t('description') ||
      'Professional-grade cleaning products. Eco-friendly, family-safe, dermatologist tested.',
    metadataBase: new URL('https://captain-maid.vercel.app'),
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="bg-white dark:bg-slate-950">
        {children}
      </body>
    </html>
  );
}
