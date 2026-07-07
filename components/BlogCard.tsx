'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/data/blogPosts';
import { trackEvent } from '@/lib/analytics';

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-captain-border bg-white shadow-brand transition hover:-translate-y-1 hover:shadow-brand-hover">
      <Link href={`/blog/${post.slug}`} onClick={() => trackEvent('click_blog_card', { slug: post.slug, title: post.title })} className="block">
        <div className="relative aspect-[16/10] bg-captain-soft">
          <Image src={post.coverImage.src} alt={post.coverImage.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-captain-dark">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-lg font-bold text-captain-text">{post.title}</h3>
        <p className="text-sm leading-6 text-captain-muted">{post.excerpt}</p>
        <div className="text-xs font-semibold text-captain-muted">{post.publishedAt}</div>
      </div>
    </article>
  );
}
