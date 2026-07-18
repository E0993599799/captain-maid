'use client'

import React from 'react'
import Link from 'next/link'
import {
  Star,
  ChevronLeft,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { CaptainProduct, CATEGORIES, PRODUCTS } from '@/lib/captain-products'

type Lang = 'th' | 'en'

const LABELS: Record<Lang, { benefits: string; suitable: string; freeFrom: string; addToCart: string; related: string }> = {
  th: {
    benefits: 'คุณสมบัติเด่น',
    suitable: 'เหมาะสำหรับ',
    freeFrom: 'ปราศจากสารอันตราย (5 FREE)',
    addToCart: 'เพิ่มลงตะกร้า',
    related: 'สินค้าที่เกี่ยวข้อง',
  },
  en: {
    benefits: 'Key Benefits',
    suitable: 'Suitable For',
    freeFrom: 'Free From (5 FREE)',
    addToCart: 'Add to Cart',
    related: 'Related Products',
  },
}

export default function ProductDetail({ product }: { product: CaptainProduct }) {
  const [lang, setLang] = React.useState<Lang>('th')
  const [qty, setQty] = React.useState(1)
  const t = LABELS[lang]

  const categoryLabel =
    CATEGORIES.find((c) => c.id === product.category)?.label[lang] ?? product.category

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb + language toggle */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0079c1] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Products / {categoryLabel}
          </Link>
          <div className="flex items-center gap-1 text-xs font-bold bg-[#f0f7fc] rounded-full p-1">
            <button
              onClick={() => setLang('th')}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                lang === 'th' ? 'bg-[#0079c1] text-white shadow' : 'text-gray-500'
              }`}
            >
              ไทย
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                lang === 'en' ? 'bg-[#0079c1] text-white shadow' : 'text-gray-500'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div className="rounded-3xl overflow-hidden bg-[#eef6fb] aspect-square shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name[lang]} className="w-full h-full object-cover" />
            </div>
            {product.freeFrom && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.freeFrom.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 bg-[#e9f7ee] text-[#2D7A3E] text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {f}-Free
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-xs font-bold text-[#0079c1] tracking-widest uppercase">
              {categoryLabel}
            </span>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#002d5f] leading-snug">
              {product.name[lang]} {product.size}
            </h1>

            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating ? 'fill-[#ffc107] text-[#ffc107]' : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">
                {product.rating}.0 ({product.reviews} reviews)
              </span>
            </div>

            <div className="mt-4 text-3xl font-extrabold text-[#0079c1]">
              ฿{product.price.toFixed(2)}
            </div>

            {/* Intro paragraphs */}
            <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              {product.intro[lang].map((para, i) => (
                <p key={i} className={i === 0 ? 'text-[#002d5f] font-medium' : undefined}>
                  {para}
                </p>
              ))}
            </div>

            {/* Add to cart */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#0079c1] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-base font-semibold text-[#002d5f]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#0079c1] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 sm:flex-none inline-flex items-center justify-center bg-[#0079c1] hover:bg-[#0066a8] text-white rounded-full px-8 py-3 text-sm font-semibold shadow-lg transition-all">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t.addToCart}
              </button>
            </div>
          </div>
        </div>

        {/* Benefits + suitable for */}
        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          <div className="bg-[#f9fbfd] rounded-3xl p-7 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#002d5f] mb-5">
              <Sparkles className="w-5 h-5 text-[#0079c1]" />
              {t.benefits}
            </h2>
            <ul className="space-y-3">
              {product.benefits[lang].map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-[#0079c1] flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-[#f9fbfd] rounded-3xl p-7 sm:p-8">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#002d5f] mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#0079c1]" />
                {t.suitable}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.suitableFor[lang]}</p>
            </div>

            {product.freeFrom && (
              <div className="bg-[#e9f7ee] rounded-3xl p-7 sm:p-8">
                <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#2D7A3E] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                  {t.freeFrom}
                </h2>
                <p className="text-sm text-[#2D7A3E]/80 font-medium">
                  {product.freeFrom.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <h2 className="text-xl font-extrabold text-[#002d5f] mb-6">{t.related}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#eef6fb]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#002d5f] line-clamp-2 group-hover:text-[#0079c1] transition-colors">
                    {p.name[lang]} {p.size}
                  </h3>
                  <div className="mt-2 text-base font-extrabold text-[#0079c1]">
                    ฿{p.price.toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
