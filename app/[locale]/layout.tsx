import { getTranslations } from 'next-intl/server';
import { i18n } from '@/i18n.config';
import type { ReactNode } from 'react';
import { ClientWrapper } from '@/app/ClientWrapper';
import { notFound } from 'next/navigation';

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

  return (
    <ClientWrapper locale={locale} messages={messages} fonts="">
      {children}
    </ClientWrapper>
  );
}
