import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';
import { site } from '@/data/site';

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
  return children;
}
