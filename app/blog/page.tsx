import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogPreview } from '@/components/BlogPreview';
import { SEOJsonLd } from '@/components/SEOJsonLd';
import { blogPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Captain Maid blog and guides',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-6 md:px-6 md:py-10">
      <SEOJsonLd type="website" />
      <section className="space-y-4 rounded-3xl border border-captain-border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Blog</p>
        <h1 className="text-3xl font-bold text-captain-text md:text-4xl">บทความและไกด์การใช้งาน</h1>
        <p className="max-w-3xl text-base leading-8 text-captain-muted">เนื้อหาที่ช่วยอธิบายวิธีเลือกสินค้าและการใช้งานให้เหมาะกับบ้านจริง</p>
        <Link href="/blog/where-to-buy-captain-maid" className="text-sm font-semibold text-captain-primary underline underline-offset-4">ดูบทความรวมช่องทางซื้อ</Link>
      </section>
      <BlogPreview posts={blogPosts} title="All articles" subtitle="บทความทั้งหมดที่เตรียมไว้ใช้เป็น mock content" />
    </main>
  );
}
