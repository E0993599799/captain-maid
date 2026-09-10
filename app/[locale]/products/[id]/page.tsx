import type { Metadata } from 'next'
import type { Locale } from '@/types/cms'
import { getCaptainProduct } from '@/lib/cms/captain-products'
import ProductDetailPage from '@/app/products/[id]/page'

type LocalizedPageProps = { params: Promise<{ locale: string; id: string }> }

function resolveLocale(locale: string): Locale {
  return locale === 'en' ? 'en' : 'th'
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale: rawLocale, id } = await params
  const locale = resolveLocale(rawLocale)
  const product = await getCaptainProduct(id, locale)
  if (!product) return { title: 'Product not found | Captain Maid' }

  const title = product.seo?.metaTitle?.[locale] || `${product.name[locale]} ${product.size} | Captain Maid`
  const description = product.seo?.metaDescription?.[locale] || product.intro[locale][0] || `${product.name[locale]} ${product.size} | Captain Maid`

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/products/${id}`,
      languages: { 'th-TH': `/th/products/${id}`, 'en-US': `/en/products/${id}` },
    },
    ...(product.seo?.ogImage ? { openGraph: { images: [{ url: product.seo.ogImage }] } } : {}),
    ...(product.seo?.noIndex ? { robots: { index: false } } : {}),
  }
}

export default async function LocalizedProductDetailPage({ params }: LocalizedPageProps) {
  const { locale, id } = await params
  return <ProductDetailPage params={Promise.resolve({ id })} locale={resolveLocale(locale)} />
}
