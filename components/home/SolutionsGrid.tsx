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
    img: '/images/products-img/solution-bathroom.jpg',
    href: '/products?category=bathroom',
    icon: Waves,
  },
  {
    title: 'Kitchen Cleaner',
    img: '/images/products-img/solution-kitchen.jpg',
    href: '/products?category=kitchen',
    icon: Flame,
  },
  {
    title: 'Glass Cleaner',
    img: '/images/products-img/solution-glass.jpg',
    href: '/products?category=glass',
    icon: Zap,
  },
  {
    title: 'Multi-purpose Disinfectant',
    img: '/images/products-img/solution-disinfectant.jpg',
    href: '/products?category=disinfectant',
    icon: Wind,
  },
  {
    title: 'Dishwasher',
    img: '/images/products-img/solution-dishwasher.jpg',
    href: '/products?category=dishwasher',
    icon: Sparkles,
  },
]

function SolutionCard({ card }: { card: (typeof cards)[number] }) {
  return (
    <Link
      href={card.href}
      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[16/10] bg-white"
    >
      {/* Use a native img so local public assets load directly without Next image optimization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.img}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow">
        <card.icon className="w-4 h-4 text-[#0079c1]" />
        <span className="text-sm font-bold text-[#002d5f]">{card.title}</span>
      </div>
    </Link>
  )
}

export default function SolutionsGrid() {
  return (
    <section className="py-16 lg:py-20 bg-[#f9fbfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-left mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002d5f]">
            สินค้าทำความสะอาด ครบทุกมุมของบ้าน
          </h2>
        </Reveal>

        <Reveal delayMs={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <SolutionCard key={card.title} card={card} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
