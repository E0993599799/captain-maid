import type { Metadata } from 'next';
import './globals.css';

export const viewport = { width: 'device-width', initialScale: 1 };
export const metadata: Metadata = {
  title: 'Captain Maid - Premium Home Cleaning Products',
  description: 'Quality home cleaning products made from natural ingredients.',
  openGraph: { title: 'Captain Maid', description: 'Premium cleaning products', type: 'website', url: 'https://captain-maid.com' }
};

const themeScript = `(function() { var t = localStorage.getItem('theme') || 'light'; if (t === 'dark') document.documentElement.classList.add('dark'); })();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
