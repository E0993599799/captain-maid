import { notFound } from 'next/navigation'

const locales = new Set(['th', 'en'])

export function generateStaticParams() {
  return [{ locale: 'th' }, { locale: 'en' }]
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!locales.has(locale)) notFound()
  return children
}
