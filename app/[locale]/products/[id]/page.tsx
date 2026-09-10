import type { Metadata } from 'next'
import type { Locale } from '@/types/cms'
import { getCaptainProduct } from '@/lib/cms/captain-products'
import ProductDetailPage from '@/app/products/[id]/page'
import { localizedMetadata } from '../../seo'

interface PageProps {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params
  const supportedLocale = (locale === 'en' ? 'en' : 'th') as Locale
  const product = await getCaptainProduct(id, supportedLocale)
  const base = localizedMetadata(supportedLocale, `/products/${id}`)

  if (!product) return { ...base, title: 'Product not found | Captain Maid' }

  const title = `${product.name[supportedLocale]} ${product.size} | Captain Maid`
  const description = product.intro[supportedLocale][0] || base.description

  return {
    ...base,
    title,
    description,
    openGraph: { ...base.openGraph, title, description: description ?? undefined },
  }
}

export default async function LocalizedProductDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  return <ProductDetailPage params={Promise.resolve({ id })} locale={locale as Locale} />
}
