import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n } from '@/i18n.config';
import '../globals.css';

export const viewport = { width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
  title: 'Captain Maid - Premium Home Cleaning Products',
  description: 'Quality home cleaning products made from natural ingredients.',
  openGraph: {
    title: 'Captain Maid',
    description: 'Premium cleaning products made with nature-derived ingredients',
    type: 'website',
    url: 'https://captain-maid.vercel.app',
    images: [{ url: '/images/logos/captain-maid-logo.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captain Maid',
    description: 'Premium home cleaning products',
  },
};

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!i18n.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logos/captain-maid-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
