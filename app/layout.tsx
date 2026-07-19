import type { Metadata, Viewport } from 'next'
import { Mitr, Noto_Sans_Thai } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const bodyFont = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const headingFont = Mitr({
  subsets: ['thai', 'latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Captain Maid | Premium Household Cleaning Products',
  description: 'Trusted cleaning solutions for Thai families. Safe, effective, and kind to your home.',
  applicationName: 'Captain Maid',
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  alternates: {
    canonical: '/',
    languages: {
      'th-TH': '/th',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    title: 'Captain Maid | Premium Household Cleaning Products',
    description: 'Trusted cleaning solutions for Thai families. Safe, effective, and kind to your home.',
    siteName: 'Captain Maid',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Captain Maid – Clean Homes, Happy Lives',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captain Maid | Premium Household Cleaning Products',
    description: 'Trusted cleaning solutions for Thai families.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  keywords: [
    'cleaning products',
    'household cleaning',
    'Thai cleaning',
    'eco-friendly cleaning',
    'floor cleaner',
    'surface cleaner',
    'safe cleaning',
  ],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="th"
      className={`${bodyFont.variable} ${headingFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0079c1" />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
