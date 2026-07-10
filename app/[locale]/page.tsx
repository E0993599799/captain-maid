'use client';

import { Leaf, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { HeroEnhanced } from '@/components/HeroEnhanced';
import { ProductCard } from '@/components/ProductCard';
import { BlogNewsSection } from '@/components/BlogNewsSection';
import { FAQ } from '@/components/FAQ';
import { ShopCTA } from '@/components/ShopCta';
import { Footer } from '@/components/Footer';
import { CAPTAIN_MAID_PRODUCTS } from '@/lib/products';

const PRODUCTS = CAPTAIN_MAID_PRODUCTS;

const SLIDES = [
  { title: { th: 'สะอาดง่ายขึ้น ทุกวัน', en: 'Clean smarter every day' }, desc: { th: 'ภาพรวมแบรนด์และคำมั่นหลัก', en: 'Brand promise and core message' } },
  { title: { th: 'สินค้าหลัก', en: 'Core product range' }, desc: { th: 'Floor / Bathroom / Kitchen / Glass', en: 'Floor / Bathroom / Kitchen / Glass' } },
  { title: { th: 'ปัญหา → คำตอบ', en: 'Problem → solution' }, desc: { th: 'คราบ ดิน ไขมัน กลิ่น', en: 'Dirt, grease, odor, residue' } },
  { title: { th: 'ความมั่นใจ', en: 'Trust and proof' }, desc: { th: 'ความปลอดภัย มาตรฐาน และรีวิว', en: 'Safety, standards, and proof' } },
  { title: { th: 'พร้อมซื้อ', en: 'Ready to shop' }, desc: { th: 'พาไปหน้าสินค้า ช่องทางซื้อ และติดต่อ', en: 'Lead to products, channels, and contact' } },
] as const;

const TIPS = [
  { th: 'Clogs', en: 'Clogs' },
  { th: 'Dirt & Grime', en: 'Dirt & Grime' },
  { th: 'Germs & Bacteria', en: 'Germs & Bacteria' },
  { th: 'Grease', en: 'Grease' },
  { th: 'Whole House', en: 'Whole House' },
  { th: 'Hard Water Spots', en: 'Hard Water Spots' },
  { th: 'Limescale', en: 'Limescale' },
  { th: 'Odour', en: 'Odour' },
  { th: 'Scuffs & Marks', en: 'Scuffs & Marks' },
  { th: 'Soap Scum', en: 'Soap Scum' },
] as const;

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const lang = locale === 'th' ? 'th' : 'en';

  const FEATURES = [
    { icon: Leaf, titleKey: 'features.items.natural.title', descriptionKey: 'features.items.natural.description' },
    { icon: Sparkles, titleKey: 'features.items.powerful.title', descriptionKey: 'features.items.powerful.description' },
    { icon: Heart, titleKey: 'features.items.safe.title', descriptionKey: 'features.items.safe.description' },
  ];

  return (
    <div className="min-h-screen bg-captain-white">
      <NavigationEnhanced />
      <HeroEnhanced />

      <section className="bg-gradient-to-b from-captain-white to-captain-soft px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-captain-primary">5-slide template</p>
            <h2 className="text-3xl font-bold text-captain-text md:text-5xl">Homepage frame set</h2>
            <p className="mx-auto max-w-2xl text-captain-muted">Template sequence for hero, products, problem-solution, proof, and CTA.</p>
          </div>
          <div className="overflow-x-auto pb-2 md:overflow-visible">
            <div className="grid min-w-[900px] gap-4 md:min-w-0 md:grid-cols-5">
              {SLIDES.map((slide, index) => (
                <div key={index} className="rounded-3xl border border-captain-border bg-white p-5 shadow-brand">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-captain-soft text-sm font-bold text-captain-text">{index + 1}</div>
                  <h3 className="text-lg font-bold text-captain-text">{slide.title[lang]}</h3>
                  <p className="mt-2 text-sm leading-6 text-captain-muted">{slide.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-captain-primary">Cleaning tips & solutions</p>
            <h2 className="text-3xl font-bold text-captain-text md:text-5xl">Browse by problem</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {TIPS.map((tip) => (
              <Link key={tip.en} href="/products" className="rounded-2xl border border-captain-border bg-captain-soft px-4 py-4 text-center text-sm font-semibold text-captain-text hover:bg-captain-light">
                {tip[lang]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-captain-white to-captain-soft px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-captain-text md:text-5xl">{t('features.sectionTitle')}</h2>
            <p className="text-lg text-captain-muted">{t('features.sectionSubtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} className="text-center">
                  <div className="mb-4 flex justify-center"><Icon className="h-16 w-16 text-captain-primary" /></div>
                  <h3 className="mb-2 text-xl font-bold text-captain-text">{t(feature.titleKey)}</h3>
                  <p className="text-captain-muted">{t(feature.descriptionKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-captain-primary">Products</p>
            <h2 className="text-4xl font-bold text-captain-text md:text-5xl">Product range</h2>
            <p className="text-lg text-captain-muted">Richer product entry points and detail-first cards.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.slice(0, 6).map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/products" className="inline-flex items-center justify-center rounded-lg bg-captain-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-captain-dark">{t('products.viewAll')}</Link>
          </div>
        </div>
      </section>

      <BlogNewsSection />
      <FAQ />
      <ShopCTA />
      <Footer />
    </div>
  );
}
