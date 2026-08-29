import type { Metadata } from 'next'

export type SupportedLocale = 'th' | 'en'

const copy: Record<SupportedLocale, { title: string; description: string; openGraphLocale: string }> = {
  th: {
    title: 'Captain Maid | ทำความสะอาดบ้านง่ายขึ้น เพื่อชีวิตที่ดีขึ้น',
    description: 'ผลิตภัณฑ์ทำความสะอาด Captain Maid เพื่อบ้านสะอาด ดูแลง่าย และการใช้ชีวิตที่ดีขึ้นทุกวัน',
    openGraphLocale: 'th_TH',
  },
  en: {
    title: 'Captain Maid | Easy Home Cleaning for Better Living',
    description: 'Discover Captain Maid household cleaning solutions for a cleaner home and better everyday living.',
    openGraphLocale: 'en_US',
  },
}

export function localizedMetadata(locale: SupportedLocale, pathname = ''): Metadata {
  const selected = copy[locale]
  return {
    title: selected.title,
    description: selected.description,
    alternates: {
      canonical: `/${locale}${pathname}`,
      languages: { 'th-TH': `/th${pathname}`, 'en-US': `/en${pathname}` },
    },
    openGraph: { type: 'website', locale: selected.openGraphLocale, title: selected.title, description: selected.description },
  }
}
