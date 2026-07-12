'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { blogPosts } from '@/data/blogPosts';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Link } from '@/lib/navigation';

const COPY = {
  en: {
    eyebrow: 'Blog',
    title: 'Cleaning stories, product notes, and practical home tips',
    subtitle: 'A section-based blog layout that keeps reading fast, easy to scan, and consistent with the rest of the site.',
    latestEyebrow: 'Latest articles',
    latestTitle: 'Read the latest Captain Maid articles',
    latestSubtitle: 'Use these posts as a quick knowledge lane for home care, product education, and everyday cleaning routines.',
    featuredLabel: 'Featured post',
    readMore: 'Read article',
    allBlogCta: 'Browse all posts',
    productsCta: 'See products',
  },
  th: {
    eyebrow: 'บทความ',
    title: 'เรื่องเล่าการทำความสะอาด ข้อมูลสินค้า และทริคดูแลบ้าน',
    subtitle: 'โครงสร้างแบบ Section ทำให้อ่านง่าย แยกหัวข้อชัด และขยายเนื้อหาได้โดยไม่ทำให้ทั้งเว็บรก',
    latestEyebrow: 'บทความล่าสุด',
    latestTitle: 'อ่านบทความล่าสุดจาก Captain Maid',
    latestSubtitle: 'ใช้หน้านี้เป็นทางลัดสำหรับความรู้เกี่ยวกับบ้าน สินค้า และวิธีดูแลประจำวัน',
    featuredLabel: 'บทความแนะนำ',
    readMore: 'อ่านบทความ',
    allBlogCta: 'ดูบทความทั้งหมด',
    productsCta: 'ดูสินค้า',
  },
} as const;

export default function BlogPage() {
  const locale = useLocale() as keyof typeof COPY;
  const c = COPY[locale] ?? COPY.en;
  const featured = blogPosts[0];
  const posts = blogPosts.slice(0, 6);

  return (
    <div className="min-h-screen bg-captain-white text-captain-text">
      <NavigationEnhanced />

      <Section className="bg-gradient-to-br from-[#EAF4FF] via-white to-[#F7FBFF]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2] shadow-[0_12px_24px_rgba(10,86,194,0.06)]">
                {c.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-[#083A75] sm:text-5xl lg:text-6xl">
                {c.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {c.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A56C2] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(10,86,194,0.18)] transition hover:bg-[#073E91]"
                >
                  {c.productsCta}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-6 py-3 text-sm font-semibold text-[#0A56C2] transition hover:border-[#0A56C2]"
                >
                  {c.allBlogCta}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-[36px] border border-[#D7E7FB] bg-white shadow-[0_24px_60px_rgba(10,86,194,0.10)]"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#F8FBFF]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-4 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A56C2]">
                  {c.featuredLabel}
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {featured.title}
                </h2>
                <p className="text-sm leading-7 text-slate-600">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-[#D7E7FB] pt-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#0A56C2]" />
                    <span>{featured.date}</span>
                  </div>
                  <span>{featured.readTime}</span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A56C2] transition hover:text-[#073E91]"
                >
                  {c.readMore}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeader
            eyebrow={c.latestEyebrow}
            title={c.latestTitle}
            description={c.latestSubtitle}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="flex h-full flex-col overflow-hidden rounded-[32px] border border-[#D7E7FB] bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(10,86,194,0.12)]">
                  <div className="relative h-56 overflow-hidden bg-[#F8FBFF]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A56C2]">
                      {post.category.th}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-[#0A56C2]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-[#D7E7FB] pt-4 text-xs font-medium text-slate-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-[#F8FBFF]">
        <Container>
          <div className="grid gap-6 rounded-[36px] border border-[#D7E7FB] bg-white p-8 shadow-[0_18px_40px_rgba(10,86,194,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A56C2]">
                {c.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl">
                {locale === 'th' ? 'อยากอ่านก่อนซื้อ หรืออยากหาความรู้เรื่องการดูแลบ้าน' : 'Need product context or practical home-care guidance?'}
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {locale === 'th'
                  ? 'บทความช่วยให้หน้าเว็บมีชั้นข้อมูลที่ชัด และช่วยให้ลูกค้าเลือกสินค้าหรือดูวิธีใช้ได้ง่ายขึ้น'
                  : 'Articles add a readable knowledge layer so customers can understand products and use cases more easily.'}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0A56C2] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(10,86,194,0.18)] transition hover:bg-[#073E91]"
              >
                {c.productsCta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-6 py-3 text-sm font-semibold text-[#0A56C2] transition hover:border-[#0A56C2]"
              >
                {locale === 'th' ? 'ติดต่อเรา' : 'Contact us'}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
}
