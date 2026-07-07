import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { i18n, type Locale } from '@/i18n.config';

type RootLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params.locale;

  if (!i18n.locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
