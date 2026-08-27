import type { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, Heart, CheckCircle2, Zap, Droplets, Recycle } from 'lucide-react'
import { TipCard } from '@/components/TipCard'

export const metadata: Metadata = {
  title: 'Blog | Cleaning Tips & Solutions | Captain Maid',
  description:
    'Cleaning advice and home care tips from Captain Maid, including everyday cleaning methods, deep cleaning routines, and family-focused home care.',
  keywords: 'cleaning tips, cleaning advice, blog, household cleaning, home care',
  openGraph: {
    title: 'Blog | Cleaning Tips & Solutions | Captain Maid',
    description: 'Cleaning advice and home care tips from Captain Maid',
    type: 'website',
  },
}

const blogArticles = [
  {
    slug: 'natural-ingredients-homemade-cleaners',
    icon: Leaf,
    category: 'Eco-Friendly',
    title: '5 Natural Ingredients for Homemade Cleaners',
    excerpt:
      'Lemon, vinegar, baking soda, and more. Learn how common household ingredients can be used in everyday cleaning routines.',
    readTime: '5 min read',
  },
  {
    slug: 'keeping-home-safe-kids-pets',
    icon: Heart,
    category: 'Family Care',
    title: 'Keeping Your Home Safe for Kids & Pets',
    excerpt:
      'Practical ways to choose and store cleaners and build a cleaning routine around family life.',
    readTime: '7 min read',
  },
  {
    slug: 'monthly-deep-clean-checklist',
    icon: CheckCircle2,
    category: 'Deep Clean',
    title: 'Monthly Deep Clean Checklist for Your Home',
    excerpt:
      'A room-by-room guide to deep cleaning for a more manageable home-care routine.',
    readTime: '10 min read',
  },
  {
    slug: 'thai-tile-floor-cleaning',
    icon: Zap,
    category: 'Floor Care',
    title: 'How to Clean Thai Tile Floors in Hot, Humid Weather',
    excerpt: 'Practical tips for maintaining tile floors in Southeast Asia\'s humid climate.',
    readTime: '6 min read',
  },
  {
    slug: 'bathroom-mold-prevention',
    icon: Droplets,
    category: 'Bathroom',
    title: 'Preventing Mold & Mildew in Thai Bathrooms',
    excerpt: 'Everyday ventilation and cleaning habits that can help reduce humidity-related bathroom problems.',
    readTime: '8 min read',
  },
  {
    slug: 'sustainable-cleaning',
    icon: Recycle,
    category: 'Sustainability',
    title: 'Sustainable Cleaning: Reduce Waste, Keep Your Home Clean',
    excerpt: 'Ways to reduce waste while keeping a practical cleaning routine at home.',
    readTime: '7 min read',
  },
]

export default function BlogPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

  return (
    <div className="min-h-screen bg-captain-cream dark:bg-captain-cream-dark pt-24">
      <div className="container-safe">
        <div className="mb-2xl py-xl">
          <h1 className="text-5xl font-serif font-bold mb-md text-captain-blue">Cleaning Tips & Solutions</h1>
          <p className="text-xl text-captain-neutral max-prose">
            Practical home-care guidance, from everyday cleaning routines to deeper room-by-room maintenance.
          </p>
        </div>

        <div className="mb-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl bg-captain-light rounded-sm overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-captain-blue to-captain-yellow flex items-center justify-center">
              {(() => {
                const Icon = blogArticles[0].icon
                return <Icon className="w-32 h-32 text-white" />
              })()}
            </div>

            <div className="p-xl flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-captain-blue mb-sm inline-block">
                {blogArticles[0].category}
              </span>
              <h2 className="text-3xl font-serif font-bold mb-md text-captain-text">
                {blogArticles[0].title}
              </h2>
              <p className="text-lg text-captain-neutral mb-lg leading-relaxed">
                {blogArticles[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono text-captain-neutral">{blogArticles[0].readTime}</span>
                <Link
                  href={`/blog/${blogArticles[0].slug}`}
                  className="text-captain-blue font-semibold hover:text-captain-blue-dark"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-2xl">
          {blogArticles.slice(1).map((article) => (
            <TipCard key={article.slug} {...article} />
          ))}
        </div>

        <div className="text-center py-xl border-t border-captain-light">
          <p className="text-captain-neutral">Showing all {blogArticles.length} available articles.</p>
        </div>
      </div>

      {siteUrl && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Blog',
                  item: `${siteUrl}/blog`,
                },
              ],
            }),
          }}
        />
      )}
    </div>
  )
}
