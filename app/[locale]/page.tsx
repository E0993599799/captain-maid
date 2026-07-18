import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePage from '@/app/page'

type Locale = 'th' | 'en'

interface LocalePageProps {
  params: Promise<{ locale: string }>
}

const copy: Record<Locale, { title: string; description: string }> = {
  th: {
    title: 'Captain Maid | บ้านสะอาด ชีวิตสุขสันต์',
    description: 'ผลิตภัณฑ์ทำความสะอาดที่เชื่อถือได้ สำหรับบ้านของครอบครัวไทย',
  },
  en: {
    title: 'Captain Maid | Clean Homes, Happy Lives',
    description: 'Trusted cleaning solutions for Thai families and modern homes.',
  },
}

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params
  if (!(locale in copy)) return {}
  return copy[locale as Locale]
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params
  if (!(locale in copy)) notFound()
  return <HomePage />
}
