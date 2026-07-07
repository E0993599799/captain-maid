import type { Metadata } from 'next';
import { FAQAccordion } from '@/components/FAQAccordion';
import { SEOJsonLd } from '@/components/SEOJsonLd';
import { faqItems } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Captain Maid frequently asked questions',
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl space-y-8 px-4 py-6 md:px-6 md:py-10">
      <SEOJsonLd type="faq" faqs={faqItems} />
      <section className="space-y-4 rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">FAQ</p>
        <h1 className="text-3xl font-bold text-captain-text md:text-4xl">คำถามที่พบบ่อย</h1>
        <p className="max-w-3xl text-base leading-8 text-captain-muted">รวมคำถามสำคัญก่อนซื้อ วิธีใช้ พื้นผิวที่เหมาะสม และช่องทางจำหน่าย</p>
      </section>
      <FAQAccordion items={faqItems} title="FAQ" subtitle="หมวดคำถามที่จัดให้ค้นหาง่าย" />
    </main>
  );
}
