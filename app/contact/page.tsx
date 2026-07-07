import type { Metadata } from 'next';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';
import { CTASection } from '@/components/CTASection';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Captain Maid contact page',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl space-y-8 px-4 py-6 md:px-6 md:py-10">
      <section className="space-y-4 rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Contact</p>
        <h1 className="text-3xl font-bold text-captain-text md:text-4xl">ติดต่อ Captain Maid</h1>
        <p className="max-w-3xl text-base leading-8 text-captain-muted">ข้อมูลติดต่อหลักยังมีหลายรายการที่รออัปเดต จึงแสดงเป็น [รอข้อมูล] ตามข้อกำหนด</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-captain-primary">LINE OA</p>
          <p className="mt-2 text-sm text-captain-muted">{site.contact.line}</p>
        </div>
        <div className="rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-captain-primary">Phone</p>
          <p className="mt-2 text-sm text-captain-muted">{site.contact.phone}</p>
        </div>
        <div className="rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-captain-primary">Email</p>
          <p className="mt-2 text-sm text-captain-muted">{site.contact.email}</p>
        </div>
      </section>

      <CTASection />
      <FloatingContactButtons />
    </main>
  );
}
