import { Montserrat, Poppins, Noto_Sans_Thai } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { i18n } from '@/i18n.config';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { captainMaidSchema } from '@/lib/schema';

// Load Google Fonts natively via next/font to optimize LCP & CLS and eliminate render blocking
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

  return (
    <html lang={locale} className={`${poppins.variable} ${montserrat.variable} ${notoSansThai.variable}`} suppressHydrationWarning>
      <head>
        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(captainMaidSchema.organization),
          }}
        />
        {/* Schema.org Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(captainMaidSchema.product),
          }}
        />
        {/* Schema.org FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(captainMaidSchema.faq),
          }}
        />
        {/* Schema.org Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(captainMaidSchema.breadcrumb),
          }}
        />
      </head>
      <body className="bg-captain-white text-captain-text antialiased font-body">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
