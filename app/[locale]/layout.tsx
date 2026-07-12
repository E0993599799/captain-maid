import { Montserrat, Poppins, Noto_Sans_Thai } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { i18n } from '@/i18n.config';
import type { ReactNode } from 'react';
import { ClientWrapper } from '@/app/ClientWrapper';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-thai',
  display: 'swap',
});

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('title'),
    description: t('description'),
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
  const messages = (await import(`../../locales/${locale}.json`)).default;

  const fontClasses = `${poppins.variable} ${montserrat.variable} ${notoSansThai.variable}`;

  return (
    <ClientWrapper locale={locale} messages={messages} fonts={fontClasses}>
      {children}
    </ClientWrapper>
  );
}
