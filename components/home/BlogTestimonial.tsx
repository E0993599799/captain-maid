import Link from 'next/link'
import Image from 'next/image'
import { Quote, ArrowRight } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog'
import Reveal from '@/components/Reveal'

export default function BlogTestimonial() {
  const allPosts = getAllBlogPosts()
  const blogPosts = allPosts.slice(0, 3)
  return (
    <section className="bg-[#f9fbfd] py-16 sm:py-20 lg:py-24" aria-labelledby="community-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Testimonial */}
          <Reveal className="lg:col-span-5">
            <h2 id="community-title" className="mb-5 text-2xl font-extrabold leading-tight text-[#002d5f] sm:text-3xl">
              เสียงจาก
              <br className="hidden lg:block" /> ครอบครัวของเรา
            </h2>
            <div className="bg-gradient-to-br from-[#e6f3fa] to-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-16 h-16 text-[#0079c1]/10" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/testimonial.png"
                    alt="Captain Maid customer"
                    width={56}
                    height={56}
                    className="rounded-full object-cover ring-2 ring-white shadow-md"
                  />
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className="text-[#ffc107] text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-base text-[#002d5f] font-medium leading-relaxed">
                  “บ้านสะอาด หอมสดชื่น ปลอดภัยกับลูกๆ ค่ะ Captain Maid
                  ทำความสะอาดได้ดีมาก และช่วยให้แม่บ้านสบายขึ้นเยอะเลย”
                </p>
                <div className="mt-5">
                  <div className="font-bold text-sm text-[#002d5f]">คุณนิดา สุขมานนท์</div>
                  <div className="text-xs text-gray-400">คุณแม่ลูก 2</div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Blog posts */}
          <Reveal delayMs={100} className="lg:col-span-7">
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-2xl font-extrabold leading-tight text-[#002d5f] sm:text-3xl">บทความน่าอ่าน</h2>
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#0079c1] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1]"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {blogPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={`/images/blog-${(index % 3) + 1}.png`}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-[#002d5f] line-clamp-2 group-hover:text-[#0079c1] transition-colors">
                      {post.title}
                    </h3>
                    <span className="mt-2 block text-xs text-gray-400">{post.date}</span>
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
