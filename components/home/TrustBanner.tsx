import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="trust-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[460px] items-center overflow-hidden rounded-3xl shadow-xl sm:min-h-[420px]">
          <Image
            src="/images/trust-banner.png"
            alt="Trust quality you can count on"
            fill
            className="absolute inset-0 object-cover"
            sizes="(max-width: 640px) 100vw, 100vw"
          />
          <div className="absolute inset-0 lg:right-auto lg:w-[55%] bg-gradient-to-r from-[#002d5f]/70 via-[#002d5f]/40 to-transparent" />

          <div className="relative max-w-lg p-5 sm:p-12">
            <div className="rounded-3xl bg-[#002d5f]/85 p-7 text-white shadow-2xl backdrop-blur sm:p-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8ed7ff]">Our promise</p>
              <h2 id="trust-title" className="text-3xl font-extrabold leading-tight sm:text-4xl">
                Trust quality
                <span className="block">you can count on.</span>
              </h2>
              <p className="mt-4 text-white/75 text-sm sm:text-base leading-relaxed">
                เราคัดสรรวัตถุดิบคุณภาพสูง พัฒนาด้วยนวัตกรรม
                เพื่อให้ทุกบ้านสะอาด ปลอดภัย และคุณวางใจได้ทุกวัน
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold border-b border-white/60 pb-0.5 hover:gap-3 transition-all"
              >
                เกี่ยวกับเรา <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
