import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SEOJsonLd } from '@/components/SEOJsonLd';
import { blogPosts, getBlogPost } from '@/data/blogPosts';
import { site } from '@/data/site';
import { Link } from '@/lib/navigation';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
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
      url: `${site.baseUrl}/blog/${post.slug}`,
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const lang = locale as 'en' | 'th';
  const post = getBlogPost(slug);
  
  if (!post) notFound();

  // Split content and handle simple markdown images: ![alt](url)
  const paragraphs = post.content.split('\\n\\n').filter(p => p.trim() !== '');
  const relatedProducts = post.relatedProducts || [];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-6 md:px-6 md:py-10 bg-captain-white">
      <SEOJsonLd type="article" blogPost={post} />
      <article className="space-y-8 rounded-3xl border border-captain-border bg-captain-white p-6 shadow-sm md:p-8">
        
        {/* Header */}
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-captain-primary">{post.category[lang]}</p>
          <h1 className="text-3xl font-bold text-captain-text md:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-captain-muted">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-captain-soft">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        </div>

        {/* Content */}
        <div className="space-y-6 text-base leading-8 text-captain-muted">
          {paragraphs.map((paragraph, idx) => {
            // Check if paragraph is an image markdown
            const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (imageMatch) {
              const [, alt, src] = imageMatch;
              return (
                <div key={idx} className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-captain-soft my-6">
                  <Image src={src} alt={alt} fill className="object-cover" />
                </div>
              );
            }
            
            // Check if it's a heading
            const h2Match = paragraph.match(/^##\s+(.*)$/);
            if (h2Match) {
               return <h2 key={idx} className="text-2xl font-bold text-captain-text mt-8 mb-4">{h2Match[1]}</h2>;
            }

            const h3Match = paragraph.match(/^###\s+(.*)$/);
            if (h3Match) {
               return <h3 key={idx} className="text-xl font-bold text-captain-text mt-6 mb-3">{h3Match[1]}</h3>;
            }

            // Normal text
            return <p key={idx} className="whitespace-pre-line">{paragraph}</p>;
          })}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-4 pt-8 border-t border-captain-border">
            <h2 className="text-2xl font-bold text-captain-text">ผลิตภัณฑ์ที่เกี่ยวข้อง</h2>
            <div className="flex flex-wrap gap-3">
              {relatedProducts.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`} className="rounded-full bg-captain-soft hover:bg-captain-light transition-colors px-4 py-2 text-sm font-semibold text-captain-text">
                  {product.productName[lang]}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}