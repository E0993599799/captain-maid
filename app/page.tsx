import type { Metadata } from 'next'
import HeroSlider from '@/components/home/HeroSlider'
import ValueProps from '@/components/home/ValueProps'
import SolutionsGrid from '@/components/home/SolutionsGrid'
import SolutionsDeepDive from '@/components/home/SolutionsDeepDive'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import TrustBanner from '@/components/home/TrustBanner'
import WhyCaptainMaid from '@/components/home/WhyCaptainMaid'
import BlogTestimonial from '@/components/home/BlogTestimonial'

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
        url: '/images/hero/captain-maid-brand-hero.svg',
        width: 1600,
        height: 750,
        alt: 'Captain Maid brand mascot and logo for easy home cleaning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captain Maid | Easy Home Cleaning for Better Living',
    description: 'Made for easy home cleaning. Better living, taken care of by Captain Maid.',
    images: ['/images/hero/captain-maid-brand-hero.svg'],
  },
}

export default function HomePage() {
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
      <HeroSlider />
      <ValueProps />
      <SolutionsGrid />
      <SolutionsDeepDive />
      <FeaturedProducts />
      <TrustBanner />
      <WhyCaptainMaid />
      <BlogTestimonial />
    </>
  )
}
