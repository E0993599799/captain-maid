import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/ProductCatalog';
import { PromoBanner } from '@/components/PromoBanner';
import { SEOJsonLd } from '@/components/SEOJsonLd';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Captain Maid product catalog',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-6 md:px-6 md:py-10">
      <SEOJsonLd type="website" />
      <PromoBanner />
      <section className="space-y-4 rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Products</p>
        <h1 className="text-3xl font-bold text-captain-text md:text-4xl">แคตตาล็อกสินค้า Captain Maid</h1>
        <p className="max-w-3xl text-base leading-8 text-captain-muted">
          กรองตาม category, scent และ customer need เพื่อหาสินค้าที่เหมาะกับบ้านของคุณมากที่สุด
        </p>
      </section>
      <ProductCatalog />
    </main>
  );
}
