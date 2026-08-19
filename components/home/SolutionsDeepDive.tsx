import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'

const largeCards = [
  {
    title: 'ห้องครัวสะอาด ปลอดภัยทุกมื้อ',
    sub: 'ขจัดคราบมันและเชื้อโรค ให้คุณทำอาหารได้อย่างมั่นใจ',
    img: '/images/deep-kitchen.png',
    href: '/products?category=kitchen',
    span: 'lg:col-span-6',
  },
  {
    title: 'ห้องนั่งเล่นหอมสะอาด อากาศสดชื่น',
    sub: 'สร้างบรรยากาศที่ดีให้ทุกช่วงเวลาของครอบครัว',
    img: '/images/deep-living.png',
    href: '/products?category=floor',
    span: 'lg:col-span-6',
  },
]

const smallCards = [
  {
    title: 'ห้องน้ำสะอาด ไร้คราบกังวล',
    sub: 'ขจัดคราบมัน คราบน้ำ และเชื้อรา ได้อย่างมีประสิทธิภาพ',
    img: '/images/deep-bathroom.png',
    href: '/products?category=bathroom',
  },
  {
    title: 'กระจกใส ไร้รอยขีดข่วน',
    sub: 'ให้ความใสในทุกจุด สบายตาทุกครั้งที่มองผ่าน',
    img: '/images/deep-glass-1.png',
    href: '/products?category=glass',
  },
  {
    title: 'ฆ่าเชื้อมั่นใจ ปกป้องทุกพื้นที่',
    sub: 'ลดการสะสมของเชื้อโรคได้อย่างมีประสิทธิภาพ',
    img: '/images/deep-disinfectant.png',
    href: '/products?category=disinfectant',
  },
]

export default function SolutionsDeepDive() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="solutions-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 max-w-2xl sm:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0079c1]">Clean by room</p>
          <h2 id="solutions-title" className="text-3xl font-extrabold leading-tight text-[#002d5f] sm:text-4xl">Solutions</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">เลือกวิธีดูแลบ้านตามพื้นที่ที่คุณใช้งานจริง แล้วค้นหาผลิตภัณฑ์ที่เหมาะกับทุกวันของคุณ</p>
        </Reveal>

        {/* Large cards */}
        <Reveal className="grid lg:grid-cols-12 gap-4 mb-4">
          {largeCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d9edf8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30 ${card.span}`}
            >
              <div className="solution-card-media relative aspect-[4/3] w-full overflow-hidden bg-white sm:aspect-[16/10]">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="solution-card-body flex flex-1 flex-col bg-[#eef7fc] p-5 sm:p-6">
                <h3 className="mb-1 font-bold text-lg text-[#002d5f] sm:text-2xl">{card.title}</h3>
                <p className="mb-3 max-w-md text-xs leading-relaxed text-[#526b7f] sm:text-sm">{card.sub}</p>
                <span className="mt-auto inline-flex w-fit items-center gap-1 border-b border-[#0079c1]/35 pb-0.5 text-xs font-semibold text-[#0079c1] transition-all group-hover:gap-2 sm:text-sm">
                  เรียนรู้เพิ่มเติม <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>

        {/* Small cards */}
        <Reveal delayMs={100} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smallCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d9edf8] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30"
            >
              <div className="solution-card-media relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
                />
              </div>
              <div className="solution-card-body flex flex-1 flex-col bg-[#eef7fc] p-5">
                <h3 className="mb-1 font-bold text-sm text-[#002d5f] sm:text-base">{card.title}</h3>
                <p className="mb-2 text-[11px] leading-relaxed text-[#526b7f]">{card.sub}</p>
                <span className="mt-auto inline-flex w-fit items-center gap-1 border-b border-[#0079c1]/35 pb-0.5 text-xs font-semibold text-[#0079c1] transition-all group-hover:gap-2">
                  เรียนรู้เพิ่มเติม <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
