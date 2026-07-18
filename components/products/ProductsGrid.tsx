'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Star, SlidersHorizontal } from 'lucide-react'
import {
  PRODUCTS,
  CATEGORIES,
  CaptainProduct,
  ProductCategory,
} from '@/lib/captain-products'

interface Props {
  initialCategory: ProductCategory | 'all'
}

function categoryLabel(id: ProductCategory): string {
  return CATEGORIES.find((c) => c.id === id)?.label.en ?? id
}

export default function ProductsGrid({ initialCategory }: Props) {
  const [category, setCategory] = React.useState<ProductCategory | 'all'>(initialCategory)
  const router = useRouter()

  const products: CaptainProduct[] =
    category === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)

  return (
    <div className="pt-28 pb-20 bg-[#f9fbfd] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <span className="text-xs font-bold text-[#0079c1] tracking-widest uppercase">Products</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#002d5f]">
            ผลิตภัณฑ์ของเรา
          </h1>
          <p className="mt-3 text-gray-500 max-w-xl">
            เลือกผลิตภัณฑ์ทำความสะอาดที่เหมาะกับทุกพื้นที่ในบ้านของคุณ
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCategory(c.id)
                router.replace(c.id === 'all' ? '/products' : `/products?category=${c.id}`, { scroll: false })
              }}
              aria-pressed={category === c.id}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                category === c.id
                  ? 'bg-[#0079c1] text-white border-[#0079c1] shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0079c1] hover:text-[#0079c1]'
              }`}
            >
              {c.label.en}
            </button>
          ))}
          <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 border border-gray-200 rounded-full px-3 py-2 bg-white">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
          </span>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eef6fb]">
                  <Image
                    src={p.image}
                    alt={p.name.en}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#0079c1] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e6f3fa]">
                    {categoryLabel(p.category)}
                  </span>
                  {p.badge && (
                    <span className="absolute top-3 right-3 bg-[#0079c1] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-base font-bold text-[#002d5f] group-hover:text-[#0079c1] transition-colors">
                    {p.name.en} {p.size}
                  </h2>
                  <div className="flex items-center gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < p.rating
                            ? 'fill-[#ffc107] text-[#ffc107]'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] text-gray-400 ml-1">({p.reviews})</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{p.intro.en[0]}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-[#0079c1]">
                      ฿{p.price.toFixed(2)}
                    </span>
                    <span className="inline-flex items-center bg-[#e6f3fa] group-hover:bg-[#0079c1] text-[#0079c1] group-hover:text-white rounded-full px-4 py-2 text-xs font-semibold transition-colors">
                      ดูสินค้า
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center text-gray-400">
            <p className="font-semibold text-[#002d5f] mb-1">เร็วๆ นี้</p>
            <p className="text-sm">สินค้าในหมวดนี้กำลังจะมาเร็วๆ นี้ โปรดติดตาม</p>
          </div>
        )}
      </div>
    </div>
  )
}
