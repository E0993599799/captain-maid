import type { Locale } from '@/types/cms'
import ProductDetailPage from '@/app/products/[id]/page'

export default async function LocalizedProductDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  return <ProductDetailPage params={Promise.resolve({ id })} locale={locale as Locale} />
}
