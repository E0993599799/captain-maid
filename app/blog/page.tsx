import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/cms/blog'

export const metadata: Metadata = {
  title: 'Blog | Cleaning Tips & Solutions | Captain Maid',
  description: 'Cleaning advice and home care tips from Captain Maid.',
}

export const revalidate = 300

export default async function BlogPage() {
  const posts = await getBlogPosts('th')
  return (
    <main className="min-h-screen bg-captain-cream dark:bg-captain-cream-dark pt-24">
      <div className="container-safe">
        <div className="mb-2xl py-xl">
          <h1 className="text-5xl font-serif font-bold mb-md text-captain-blue">Cleaning Tips &amp; Solutions</h1>
          <p className="text-xl text-captain-neutral max-prose">Practical home-care guidance from Captain Maid.</p>
        </div>
        {posts.length === 0 ? (
          <p className="py-2xl text-captain-neutral">ยังไม่มีบทความที่เผยแพร่</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-2xl">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-captain-light rounded-sm overflow-hidden border border-captain-light hover:border-captain-blue hover:shadow-lg transition-all">
                {post.heroImage ? <img src={post.heroImage.url} alt={post.heroImage.alt || post.title} className="h-48 w-full object-cover" /> : <div className="h-48 bg-gradient-to-br from-captain-blue to-captain-yellow" />}
                <div className="p-lg flex flex-col flex-grow">
                  <span className="text-xs font-semibold uppercase tracking-wider text-captain-blue mb-sm">{post.category}</span>
                  <h2 className="text-lg font-serif font-bold mb-md text-captain-text group-hover:text-captain-blue">{post.title}</h2>
                  <p className="text-sm text-captain-neutral leading-relaxed mb-md flex-grow">{post.excerpt}</p>
                  <span className="text-xs font-mono text-captain-neutral border-t border-captain-light pt-md">{post.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
