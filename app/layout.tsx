import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';
import { site } from '@/data/site';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${site.brandName}`,
  },
  description: site.seo.description,
  keywords: [...site.seo.keywords],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: site.seo.title,
    description: site.seo.description,
    url: site.baseUrl,
    siteName: site.brandName,
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
      <body className="bg-captain-white text-captain-text antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
