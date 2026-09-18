import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CmsRichText } from '@/components/cms/CmsRichText'
import { getBlogPost } from '@/lib/cms/blog'

interface BlogPostProps { params: Promise<{ slug: string }> }
export const revalidate = 300

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug, 'th')
  if (!post) return { title: 'Post Not Found', robots: { index: false, follow: false } }
  return {
    title: post.seo?.title || `${post.title} | Captain Maid Blog`,
    description: post.seo?.description || post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.publishedAt },
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const post = await getBlogPost(slug, 'th')
  if (!post) notFound()
  return (
    <main className="min-h-screen bg-captain-cream dark:bg-captain-cream-dark pt-24">
      <div className="container-safe">
        <Link href="/blog" className="inline-flex items-center text-captain-blue hover:text-captain-blue-dark mb-2xl">← Back to Blog</Link>
        {post.heroImage ? <img src={post.heroImage.url} alt={post.heroImage.alt || post.title} className="w-full aspect-video object-cover rounded-sm mb-2xl" /> : null}
        <div className="flex flex-wrap items-center gap-lg mb-lg text-sm text-captain-neutral">
          <span className="px-sm py-xs bg-captain-blue text-white rounded text-xs font-semibold uppercase">{post.category}</span>
          {post.publishedAt ? <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('th-TH')}</time> : null}
          <span>{post.readTime} min read</span><span>By {post.author}</span>
        </div>
        <h1 className="text-5xl font-serif font-bold mb-2xl text-captain-text">{post.title}</h1>
        {post.excerpt ? <p className="text-xl text-captain-neutral max-prose mb-xl">{post.excerpt}</p> : null}
        <CmsRichText value={post.content} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title,
        description: post.excerpt, datePublished: post.publishedAt, author: { '@type': 'Organization', name: post.author },
      }) }} />
    </main>
  )
}
