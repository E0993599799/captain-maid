import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/ProductDetail';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { faqItems } from '@/data/faqs';
import { whereToBuy } from '@/data/whereToBuy';
import { site } from '@/data/site';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product not found',
      description: 'Captain Maid product detail',
    };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `${site.siteUrl}/products/${product.slug}`,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(slug, 3);
  const productFaqs = faqItems.filter((faq) => !faq.relatedProductSlugs || faq.relatedProductSlugs.includes(slug)).slice(0, 6);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <ProductDetail product={product} relatedProducts={relatedProducts} faqs={productFaqs} storeLinks={whereToBuy} />
    </main>
  );
}
