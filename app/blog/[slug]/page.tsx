import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SEOJsonLd } from '@/components/SEOJsonLd';
import { blogPosts, getBlogPost } from '@/data/blogPosts';
import { getProductBySlug } from '@/data/products';
import { site } from '@/data/site';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return { title: 'Blog post not found', description: 'Captain Maid blog post' };
  }
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${site.siteUrl}/blog/${post.slug}`,
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split('\n\n');
  const relatedProducts = post.relatedProductSlugs.map((productSlug) => getProductBySlug(productSlug)).filter(Boolean);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-6 md:px-6 md:py-10">
      <SEOJsonLd type="article" article={post} />
      <article className="space-y-8 rounded-3xl border border-captain-border bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">{post.category}</p>
          <h1 className="text-3xl font-bold text-captain-text md:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-captain-muted">
            <span>{post.publishedAt}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-captain-soft">
          <Image src={post.coverImage.src} alt={post.coverImage.alt} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="space-y-4 text-base leading-8 text-captain-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="whitespace-pre-line">{paragraph}</p>
          ))}
        </div>
        {relatedProducts.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-captain-text">Related products</h2>
            <div className="flex flex-wrap gap-3">
              {relatedProducts.map((product) => (
                <Link key={product!.slug} href={`/products/${product!.slug}`} className="rounded-full bg-captain-soft px-4 py-2 text-sm font-semibold text-captain-text">
                  {product!.productName}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
