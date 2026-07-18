import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function TrustBanner() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[380px] flex items-center">
          <Image
            src="/images/trust-banner.png"
            alt="Trust quality you can count on"
            fill
            className="absolute inset-0 object-cover"
            sizes="(max-width: 640px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002d5f]/70 via-[#002d5f]/25 to-transparent" />

          <div className="relative p-8 sm:p-12 max-w-lg">
            <div className="bg-[#002d5f]/85 backdrop-blur rounded-3xl p-8 sm:p-10 text-white shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Trust quality
                <br />
                you can count on.
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
