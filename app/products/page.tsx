import type { Metadata } from 'next'
import ProductsGrid from '@/components/products/ProductsGrid'
import type { ProductCategory } from '@/lib/captain-products'

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

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category } = await searchParams
  const initial = (VALID as string[]).includes(category ?? '')
    ? ((category as ProductCategory | 'all') ?? 'all')
    : 'all'

  return <ProductsGrid initialCategory={initial} />
}
