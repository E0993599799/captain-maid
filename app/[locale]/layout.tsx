import { Inter, Poppins, Prompt } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { i18n } from '@/i18n.config';
import type { ReactNode } from 'react';
import { ClientWrapper } from '@/app/ClientWrapper';
import { notFound } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const prompt = Prompt({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-prompt',
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

  if (!i18n.locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`../../locales/${locale}.json`)).default;

  const fontClasses = `${poppins.variable} ${inter.variable} ${prompt.variable}`;

  return (
    <ClientWrapper locale={locale} messages={messages} fonts={fontClasses}>
      {children}
    </ClientWrapper>
  );
}
