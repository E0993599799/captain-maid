import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

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
    img: '/images/deep-glass.png',
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
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002d5f]">Solutions</h2>
        </div>

        {/* Large cards */}
        <div className="grid lg:grid-cols-12 gap-4 mb-4">
          {largeCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${card.span} aspect-[16/9]`}
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002d5f]/90 via-[#002d5f]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                <h3 className="font-bold text-lg sm:text-2xl mb-1">{card.title}</h3>
                <p className="text-xs sm:text-sm text-white/75 mb-3 max-w-md line-clamp-2">{card.sub}</p>
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold border-b border-white/50 pb-0.5 group-hover:gap-2 transition-all">
                  เรียนรู้เพิ่มเติม <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Small cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smallCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002d5f]/90 via-[#002d5f]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-bold text-sm sm:text-base mb-1">{card.title}</h3>
                <p className="text-[11px] text-white/75 mb-2 line-clamp-1">{card.sub}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold border-b border-white/50 pb-0.5 group-hover:gap-2 transition-all">
                  เรียนรู้เพิ่มเติม <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
