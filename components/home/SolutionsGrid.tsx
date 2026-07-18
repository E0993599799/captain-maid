import Link from 'next/link'
import Image from 'next/image'
import { Droplets, Bath, CookingPot, AppWindow, SprayCan, UtensilsCrossed, LayoutGrid } from 'lucide-react'

const cards = [
  {
    title: 'Floor Cleaner',
    img: '/images/solution-floor.png',
    href: '/products?category=floor',
    icon: Droplets,
  },
  {
    title: 'Bathroom Cleaner',
    img: '/images/solution-bathroom.png',
    href: '/products?category=bathroom',
    icon: Bath,
  },
  {
    title: 'Kitchen Cleaner',
    img: '/images/solution-kitchen.png',
    href: '/products?category=kitchen',
    icon: CookingPot,
  },
  {
    title: 'Glass Cleaner',
    img: '/images/solution-glass.png',
    href: '/products?category=glass',
    icon: AppWindow,
  },
  {
    title: 'Multi-purpose Disinfectant',
    img: '/images/solution-disinfectant.png',
    href: '/products?category=disinfectant',
    icon: SprayCan,
  },
  {
    title: 'Dishwasher',
    img: '/images/solution-dishwasher.png',
    href: '/products?category=dishwasher',
    icon: UtensilsCrossed,
  },
]

export default function SolutionsGrid() {
  return (
    <section className="py-16 lg:py-20 bg-[#f9fbfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002d5f]">
            โซลูชันครบทุกมุมของบ้าน
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.slice(0, 3).map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[16/10]"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002d5f]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow">
                <card.icon className="w-4 h-4 text-[#0079c1]" />
                <span className="text-sm font-bold text-[#002d5f]">{card.title}</span>
              </div>
            </Link>
          ))}

          {cards.slice(3).map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[16/10]"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002d5f]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow">
                <card.icon className="w-4 h-4 text-[#0079c1]" />
                <span className="text-sm font-bold text-[#002d5f]">{card.title}</span>
              </div>
            </Link>
          ))}

          {/* View All card */}
          <Link
            href="/products"
            className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 aspect-[16/10] hidden lg:flex flex-col items-center justify-center gap-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e6f3fa] group-hover:bg-[#0079c1] flex items-center justify-center transition-colors duration-300">
              <LayoutGrid className="w-6 h-6 text-[#0079c1] group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-sm font-bold text-[#002d5f]">View All</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
