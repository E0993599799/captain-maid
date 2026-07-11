import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';
import { site } from '@/data/site';
import { ThemeProvider } from '@/components/ThemeProvider';
import { captainMaidSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${site.brandName}`,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  openGraph: {
    type: 'website',
    title: site.seo.title,
    description: site.seo.description,
    url: site.baseUrl,
    siteName: site.brandName,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': new URL('/en', site.baseUrl).toString(),
      'th': new URL('/th', site.baseUrl).toString(),
      'x-default': site.baseUrl,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="th" suppressHydrationWarning>
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
      <body className="bg-captain-white text-captain-text antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
