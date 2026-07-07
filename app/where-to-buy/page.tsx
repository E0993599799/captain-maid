import type { Metadata } from 'next';
import { CTASection } from '@/components/CTASection';
import { SEOJsonLd } from '@/components/SEOJsonLd';
import { WhereToBuyButtons } from '@/components/WhereToBuyButtons';
import { whereToBuy } from '@/data/whereToBuy';

export const metadata: Metadata = {
  title: 'Where to buy',
  description: 'Captain Maid purchase channels',
  alternates: { canonical: '/where-to-buy' },
};

export default function WhereToBuyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-8 px-4 py-6 md:px-6 md:py-10">
      <SEOJsonLd type="website" />
      <section className="space-y-4 rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Where to buy</p>
        <h1 className="text-3xl font-bold text-captain-text md:text-4xl">ช่องทางซื้อ Captain Maid</h1>
        <p className="max-w-3xl text-base leading-8 text-captain-muted">แสดงเฉพาะช่องทางที่ยืนยันได้ และใช้ [รอข้อมูล] สำหรับลิงก์ที่ยังไม่พร้อม</p>
      </section>
      <WhereToBuyButtons links={whereToBuy} />
      <CTASection />
    </main>
  );
}
