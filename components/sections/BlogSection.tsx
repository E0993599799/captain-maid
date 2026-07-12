'use client';

import Image from 'next/image';
import type { BlogPost } from '@/data/blogPosts';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';

type BlogSectionProps = {
  posts: BlogPost[];
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel: string;
};

export function BlogSection({
  posts,
  eyebrow = 'Blog',
  title,
  description,
  ctaLabel,
}: BlogSectionProps) {
  return (
    <Section className="bg-white" id="blog">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

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

        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="rounded-full bg-[#0A56C2] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(10,86,194,0.18)] transition hover:bg-[#073E91]"
          >
            {ctaLabel}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
