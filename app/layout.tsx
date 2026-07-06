import type { Metadata } from 'next';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logos/captain-maid-icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}