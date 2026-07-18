import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTS } from '@/lib/captain-products'
import { getCaptainProduct } from '@/lib/cms/captain-products'
import ProductDetail from '@/components/products/ProductDetail'

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getCaptainProduct(id)
  if (!product) return { title: 'Product not found | Captain Maid' }
  return {
    title: `${product.name.en} ${product.size} | Captain Maid`,
    description: product.intro.en[0],
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const product = await getCaptainProduct(id)
  if (!product) notFound()

  return <ProductDetail product={product} />
}
