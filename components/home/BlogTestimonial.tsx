import Link from 'next/link'
import Image from 'next/image'
import { Quote, ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { cmsLink, cmsText, type CmsBindings } from '@/lib/cms/bindings'
import type { BlogPost } from '@/lib/cms/blog'
import CmsPicture from '@/components/cms/CmsPicture'

function publishedDate(value: string, locale: 'th' | 'en'): string {
  const date = new Date(value)
  if (!value || Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogTestimonial({
  bindings = {},
  posts,
  locale,
}: {
  bindings?: CmsBindings
  posts: BlogPost[]
  locale: 'th' | 'en'
}) {
  const viewAll = cmsLink(bindings, 'home.blog.viewAll', { text: 'View All', href: `/${locale}/blog` })
  const viewAllHref = viewAll.href === '/blog' ? `/${locale}/blog` : viewAll.href

  return (
    <section className="bg-[#f9fbfd] py-16 sm:py-20 lg:py-24" aria-labelledby="community-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-5">
            <h2 data-cms-key="home.community.heading" id="community-title" className="mb-5 text-2xl font-extrabold leading-tight text-[#002d5f] sm:text-3xl">
              {cmsText(bindings, 'home.community.heading', 'เสียงจาก ครอบครัวของเรา')}
            </h2>
            <div className="bg-gradient-to-br from-[#e6f3fa] to-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-16 h-16 text-[#0079c1]/10" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <CmsPicture
                    bindings={bindings}
                    cmsKey="home.community.testimonial.image"
                    fallback={{ src: '/images/testimonial.png', alt: 'Captain Maid customer' }}
                    pictureClassName="block h-14 w-14"
                    imgClassName="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-md"
                    width={56}
                    height={56}
                  />
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className="text-[#ffc107] text-lg">★</span>
                    ))}
                  </div>
                </div>
                <p data-cms-key="home.community.testimonial.quote" className="text-base text-[#002d5f] font-medium leading-relaxed">
                  {cmsText(bindings, 'home.community.testimonial.quote', '“บ้านสะอาด หอมสดชื่น ปลอดภัยกับลูกๆ ค่ะ Captain Maid ทำความสะอาดได้ดีมาก และช่วยให้แม่บ้านสบายขึ้นเยอะเลย”')}
                </p>
                <div className="mt-5">
                  <div data-cms-key="home.community.testimonial.name" className="font-bold text-sm text-[#002d5f]">{cmsText(bindings, 'home.community.testimonial.name', 'คุณนิดา สุขมานนท์')}</div>
                  <div data-cms-key="home.community.testimonial.role" className="text-xs text-gray-400">{cmsText(bindings, 'home.community.testimonial.role', 'คุณแม่ลูก 2')}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={100} className="lg:col-span-7">
            <div className="flex items-end justify-between mb-5">
              <h2 data-cms-key="home.blog.heading" className="text-2xl font-extrabold leading-tight text-[#002d5f] sm:text-3xl">{cmsText(bindings, 'home.blog.heading', 'บทความน่าอ่าน')}</h2>
              <Link
                data-cms-key="home.blog.viewAll"
                href={viewAllHref}
                className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#0079c1] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1]"
              >
                {viewAll.text} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-[#eef4f8]">
                    {post.heroImage ? (
                      <Image
                        src={post.heroImage.url}
                        alt={post.heroImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#e6f3fa] to-[#f9fbfd]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-[#002d5f] line-clamp-2 group-hover:text-[#0079c1] transition-colors">{post.title}</h3>
                    {publishedDate(post.publishedAt, locale) ? (
                      <time dateTime={post.publishedAt} className="mt-2 block text-xs text-gray-400">{publishedDate(post.publishedAt, locale)}</time>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
