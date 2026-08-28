import Link from 'next/link'
import { Droplet, Waves, Flame, Zap, Wind, Sparkles } from 'lucide-react'
import Reveal from '@/components/Reveal'

const cards = [
  {
    title: 'Floor Cleaner',
    img: '/images/products-img/solution-floor.webp',
    href: '/products?category=floor',
    icon: Droplet,
  },
  {
    title: 'Bathroom Cleaner',
    img: '/images/products-img/solution-bathroom.webp',
    href: '/products?category=bathroom',
    icon: Waves,
  },
  {
    title: 'Kitchen Cleaner',
    img: '/images/products-img/solution-kitchen.webp',
    href: '/products?category=kitchen',
    icon: Flame,
  },
  {
    title: 'Glass Cleaner',
    img: '/images/products-img/solution-glass.webp',
    href: '/products?category=glass',
    icon: Zap,
  },
  {
    title: 'Multi-purpose Disinfectant',
    img: '/images/products-img/solution-disinfectant.webp',
    href: '/products?category=disinfectant',
    icon: Wind,
  },
  {
    title: 'Dishwasher',
    img: '/images/products-img/solution-dishwasher.webp',
    href: '/products?category=dishwasher',
    icon: Sparkles,
  },
]

function SolutionCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <Link
      href={card.href}
      className="group relative block aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="eager"
        decoding="sync"
      />
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow backdrop-blur">
        <card.icon className="h-4 w-4 text-[#0079c1]" />
        <span className="text-sm font-bold text-[#002d5f]">{card.title}</span>
      </div>
    </Link>
  )
}

export default function SolutionsGrid() {
  return (
    <section className="bg-[#f9fbfd] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-left">
          <h2 className="text-3xl font-extrabold text-[#002d5f] sm:text-4xl">
            สินค้าทำความสะอาด ครบทุกมุมของบ้าน
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <SolutionCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
