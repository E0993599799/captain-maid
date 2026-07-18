'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react'
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
  const [qty, setQty] = React.useState(1)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-[#f9fbfd]">
        <Image
          src={product.image}
          alt={product.name.en}
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute top-3 left-3 bg-[#e6f3fa] text-[#0079c1] text-[10px] font-bold px-2.5 py-1 rounded-full">
          {categoryLabel(product)}
        </span>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < product.rating ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
          <span className="text-[11px] text-gray-400 ml-1">({product.reviews})</span>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-[#002d5f] line-clamp-2 min-h-[2.5rem] hover:text-[#0079c1] transition-colors">
            {product.name.en} {product.size}
          </h3>
        </Link>
        <div className="mt-2 text-lg font-extrabold text-[#0079c1]">
          ฿{product.price.toFixed(2)}
          <span className="ml-1 text-[11px] font-medium text-gray-400">
            (≈ ${(product.price / 33).toFixed(2)})
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center border border-gray-200 rounded-full">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
              className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-[#0079c1] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center text-sm font-semibold text-[#002d5f]">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              aria-label="Increase quantity"
              className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-[#0079c1] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button className="inline-flex items-center bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition-all">
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-20 bg-[#f9fbfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002d5f]">สินค้ายอดนิยม</h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-[#0079c1] hover:underline inline-flex items-center gap-1"
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
