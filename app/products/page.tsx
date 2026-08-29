import type { Metadata } from 'next'
import ProductsGrid from '@/components/products/ProductsGrid'
import type { ProductCategory } from '@/lib/captain-products'
import { getCaptainProducts } from '@/lib/cms/captain-products'
import type { Locale } from '@/types/cms'

export const metadata: Metadata = {
  title: 'Products | Captain Maid',
  description:
    'สินค้าทำความสะอาดบ้านครบทุกหมวด — Floor Cleaner, Bathroom Cleaner, Kitchen Cleaner, Glass Cleaner และอื่นๆ จาก Captain Maid',
}

const VALID: (ProductCategory | 'all')[] = [
  'all',
  'floor',
  'bathroom',
  'kitchen',
  'glass',
  'disinfectant',
  'dishwasher',
]

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export const revalidate = 3600

export async function ProductsPage({ searchParams, locale = 'th' }: PageProps & { locale?: Locale }) {
  const { category } = await searchParams
  const initial = (VALID as string[]).includes(category ?? '')
    ? ((category as ProductCategory | 'all') ?? 'all')
    : 'all'

  const products = await getCaptainProducts(locale)
  return <ProductsGrid initialCategory={initial} initialProducts={products} initialLocale={locale} />
}

export default ProductsPage
