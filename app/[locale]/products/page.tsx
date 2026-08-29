import type { Locale } from '@/types/cms'
import ProductsPage from '@/app/products/page'

export default async function LocalizedProductsPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string }> }) {
  const { locale } = await params
  return <ProductsPage searchParams={searchParams} locale={locale as Locale} />
}
