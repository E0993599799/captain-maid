import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePage from '@/app/page'
import { getCmsPage } from '@/lib/cms/pages'
import { localizedMetadata } from './seo'

type Locale = 'th' | 'en'

interface LocalePageProps {
  params: Promise<{ locale: string }>
}

const copy: Record<Locale, { title: string; description: string }> = {
  th: {
    title: 'Captain Maid | ทำความสะอาดบ้านง่ายขึ้น เพื่อชีวิตที่ดีขึ้น',
    description:
      'Made for Easy Home Cleaning — ผลิตภัณฑ์ทำความสะอาด Captain Maid เพื่อบ้านสะอาด ดูแลง่าย และการใช้ชีวิตที่ดีขึ้นทุกวัน',
  },
  en: {
    title: 'Captain Maid | Easy Home Cleaning for Better Living',
    description:
      'Made for easy home cleaning. Discover Captain Maid household cleaning solutions for a cleaner home and better everyday living.',
  },
}

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params
  if (!(locale in copy)) return {}
  const selected = copy[locale as Locale]
  const cmsPage = await getCmsPage('home', locale as Locale, [])
  const cmsSeo = cmsPage?.seo
  const title = cmsSeo?.title?.[locale as Locale] || selected.title
  const description = cmsSeo?.description?.[locale as Locale] || selected.description

  return {
    ...localizedMetadata(locale as Locale),
    title,
    description,
    openGraph: {
      locale: locale === 'en' ? 'en_US' : 'th_TH',
      title,
      description,
      ...(cmsSeo?.ogImage?.url ? { images: [{ url: cmsSeo.ogImage.url }] } : { images: ['/og-image.jpg'] }),
    },
    ...(cmsSeo?.canonicalUrl ? { alternates: { canonical: cmsSeo.canonicalUrl } } : {}),
    ...(cmsSeo?.robotsIndex === false ? { robots: { index: false } } : {}),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: cmsSeo?.ogImage?.url ? [cmsSeo.ogImage.url] : ['/og-image.jpg'],
    },
  }
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params
  if (!(locale in copy)) notFound()
  return <HomePage />
}
