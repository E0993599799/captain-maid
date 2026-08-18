import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePage from '@/app/page'

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

  return {
    ...selected,
    openGraph: {
      title: selected.title,
      description: selected.description,
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
      title: selected.title,
      description: selected.description,
      images: ['/og-image.jpg'],
    },
  }
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params
  if (!(locale in copy)) notFound()
  return <HomePage />
}
