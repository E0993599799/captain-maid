import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import '@/app/globals.css';
import { i18n } from '@/i18n.config';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://captain-maid.vercel.app'),
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className="bg-white dark:bg-slate-950">
        {children}
      </body>
    </html>
  );
}
