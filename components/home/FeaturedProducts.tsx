import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight } from 'lucide-react'
import { PRODUCTS, CaptainProduct, CATEGORIES } from '@/lib/captain-products'

const featured: CaptainProduct[] = [
  PRODUCTS.find((p) => p.id === 'floor-cleaner-lavender-kerry')!,
  PRODUCTS.find((p) => p.id === 'bathroom-cleaner-spray')!,
  PRODUCTS.find((p) => p.id === 'kitchen-cleaner-spray')!,
  PRODUCTS.find((p) => p.id === 'glass-cleaner')!,
]

function categoryLabel(p: CaptainProduct): string {
  return CATEGORIES.find((c) => c.id === p.category)?.label.en ?? p.category
}

function ProductCard({ product }: { product: CaptainProduct }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-[#f9fbfd] p-4">
        <Image
          src={product.image}
          alt={product.name.en}
          fill
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute top-3 left-3 bg-[#e6f3fa] text-[#0079c1] text-[10px] font-bold px-2.5 py-1 rounded-full">
          {categoryLabel(product)}
        </span>
      </Link>
      <div className="p-4">
        {product.rating > 0 && product.reviews > 0 && <div className="flex items-center gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < product.rating ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
          <span className="text-[11px] text-gray-400 ml-1">({product.reviews})</span>
        </div>}
        <Link href={`/products/${product.id}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2">
          <h3 className="min-h-[3.25rem] text-sm font-semibold leading-6 text-[#002d5f] transition-colors group-hover:text-[#0079c1]">
            {product.name.en} {product.size}
          </h3>
        </Link>
        {product.price > 0 ? <div className="mt-2 text-lg font-extrabold text-[#0079c1]">
          ฿{product.price.toFixed(2)}
          <span className="ml-1 text-[11px] font-medium text-gray-400">(≈ ${(product.price / 33).toFixed(2)})</span>
        </div> : <div className="mt-2 text-xs font-medium text-amber-700">Price pending approval</div>}

        <div className="mt-4">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0079c1] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0066a8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0079c1]/30"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function FeaturedProducts() {
  return (
    <section className="bg-[#f9fbfd] py-16 sm:py-20 lg:py-24" aria-labelledby="featured-products-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0079c1]">Everyday essentials</p>
            <h2 id="featured-products-title" className="text-3xl font-extrabold leading-tight text-[#002d5f] sm:text-4xl">สินค้ายอดนิยม</h2>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold text-[#0079c1] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] sm:self-auto"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
