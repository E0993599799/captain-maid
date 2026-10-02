import type { Metadata } from 'next'
import HeroSlider from '@/components/home/HeroSlider'
import ValueProps from '@/components/home/ValueProps'
import SolutionsGrid from '@/components/home/SolutionsGrid'
import SolutionsDeepDive from '@/components/home/SolutionsDeepDive'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBanner from '@/components/home/TrustBanner'
import WhyCaptainMaid from '@/components/home/WhyCaptainMaid'
import BlogTestimonial from '@/components/home/BlogTestimonial'
import { headers } from 'next/headers'
import { getCaptainMaidRuntime, type CmsBindings } from '@/lib/cms/bindings'

export const metadata: Metadata = {
  title: 'Captain Maid | Easy Home Cleaning for Better Living',
  description:
    'Made for easy home cleaning. Discover Captain Maid household cleaning solutions for a cleaner home and better everyday living.',
  openGraph: {
    title: 'Captain Maid | Easy Home Cleaning for Better Living',
    description:
      'Made for easy home cleaning. Better living, taken care of by Captain Maid.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Captain Maid – Easy Home Cleaning for Better Living',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captain Maid | Easy Home Cleaning for Better Living',
    description: 'Made for easy home cleaning. Better living, taken care of by Captain Maid.',
    images: ['/og-image.jpg'],
  },
}

export async function HomeContent({ locale }: { locale: 'th' | 'en' }) {
  const runtime = await getCaptainMaidRuntime('home', locale)
  const bindings: CmsBindings = runtime.bindings
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const brandSchema = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: 'Captain Maid',
    slogan: 'Made for Easy Home Cleaning',
    description: 'Better Living, Taken Care of by Captain Maid.',
    ...(siteUrl ? { url: siteUrl } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
      <HeroSlider bindings={bindings} />
      <ValueProps bindings={bindings} />
      <SolutionsGrid bindings={bindings} />
      <SolutionsDeepDive bindings={bindings} />
      <FeaturedProducts bindings={bindings} />
      <TrustBanner bindings={bindings} />
      <WhyCaptainMaid bindings={bindings} />
      <BlogTestimonial bindings={bindings} />
    </>
  )
}


export default async function HomePage() {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-captain-maid-locale') === 'en' ? 'en' : 'th'
  return <HomeContent locale={locale} />
}
