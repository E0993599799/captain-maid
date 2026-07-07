import type { Metadata } from 'next';
import Link from 'next/link';
import { CTASection } from '@/components/CTASection';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';
import { BlogPreview } from '@/components/BlogPreview';
import { FAQAccordion } from '@/components/FAQAccordion';
import { ProductGrid } from '@/components/ProductGrid';
import { PromoBanner } from '@/components/PromoBanner';
import { SEOJsonLd } from '@/components/SEOJsonLd';
import { WhereToBuyButtons } from '@/components/WhereToBuyButtons';
import { featuredProducts } from '@/data/products';
import { blogPosts } from '@/data/blogPosts';
import { faqItems } from '@/data/faqs';
import { whereToBuy } from '@/data/whereToBuy';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: site.brandName,
  description: site.seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.siteUrl,
    siteName: site.brandName,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-14 px-4 py-6 md:px-6 md:py-10">
      <SEOJsonLd type="website" />
      <header className="flex flex-col gap-4 rounded-3xl border border-captain-border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-captain-primary">Captain Maid</p>
          <h1 className="mt-1 text-2xl font-bold text-captain-text">Brand storefront / product catalog</h1>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm font-semibold text-captain-muted">
          <Link href="/products">Products</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/where-to-buy">Where to buy</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <PromoBanner />

      <section className="grid gap-8 rounded-[2rem] bg-gradient-to-br from-captain-soft via-white to-captain-soft p-6 md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-captain-primary shadow-sm">แห้งไว 1 นาที • 5 FREE • Plant-Based • Robot Friendly</p>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight text-captain-text md:text-5xl">บ้านสะอาดเร็วขึ้น ด้วยสินค้าที่ออกแบบมาเพื่อชีวิตจริง</h2>
            <p className="max-w-2xl text-lg leading-8 text-captain-muted">
              Captain Maid รวมสินค้าโซนพื้น ห้องน้ำ และครัว พร้อมเส้นทางซื้อที่ตรวจสอบได้ และข้อมูลที่ยังรออัปเดตจะถูกระบุชัดเจนด้วย [รอข้อมูล]
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full bg-captain-primary px-5 py-3 text-sm font-semibold text-white shadow-brand transition hover:bg-captain-dark">Browse products</Link>
            <Link href="/where-to-buy" className="rounded-full border border-captain-border bg-white px-5 py-3 text-sm font-semibold text-captain-text transition hover:border-captain-primary">Where to buy</Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {site.highlights.map((item) => (
            <div key={item} className="rounded-2xl border border-captain-border bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-captain-primary">Key claim</p>
              <p className="mt-2 text-lg font-bold text-captain-text">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Featured products</p>
            <h2 className="mt-2 text-2xl font-bold text-captain-text md:text-3xl">สินค้าหลักที่ควรดู</h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-captain-primary underline underline-offset-4">View all</Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-captain-border bg-white p-6 shadow-sm lg:col-span-1">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Why Captain Maid</p>
          <h2 className="mt-2 text-2xl font-bold text-captain-text">จุดขายที่สื่อสารได้ชัด</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-captain-muted">
            <li>• แห้งไว 1 นาที</li>
            <li>• สูตร 5 FREE / Plant-Based / pH Neutral</li>
            <li>• Robot Friendly และเหมาะกับบ้านที่มีเด็กและสัตว์เลี้ยง</li>
            <li>• ช่วยจัดการคราบมันและคราบฝังแน่น</li>
            <li>• ไม่ทิ้งคราบเหนียว</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-captain-border bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Product category preview</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {['น้ำยาทำความสะอาดพื้น', 'สเปรย์ล้างห้องน้ำ', 'สเปรย์ทำความสะอาดครัว'].map((item) => (
              <div key={item} className="rounded-2xl bg-captain-soft p-4">
                <p className="text-lg font-bold text-captain-text">{item}</p>
                <p className="mt-2 text-sm text-captain-muted">สินค้าหลักที่วางตำแหน่งตาม use case จริงในบ้าน</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <FAQAccordion items={faqItems.slice(0, 5)} title="FAQ preview" subtitle="คำถามที่ควรตอบบนหน้าแรก" />
        <BlogPreview posts={blogPosts.slice(0, 3)} title="Blog preview" subtitle="บทความที่ช่วยปิดการตัดสินใจซื้อ" />
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">Where to buy</p>
          <h2 className="mt-2 text-2xl font-bold text-captain-text md:text-3xl">ช่องทางจำหน่าย</h2>
        </div>
        <WhereToBuyButtons links={whereToBuy} />
      </section>

      <CTASection />
      <FloatingContactButtons />
    </main>
  );
}
