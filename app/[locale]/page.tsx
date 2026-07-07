'use client';

import { Leaf, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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

export default function Home() {
  const t = useTranslations();

  const FEATURES = [
    {
      icon: Leaf,
      titleKey: 'features.items.natural.title',
      descriptionKey: 'features.items.natural.description',
    },
    {
      icon: Sparkles,
      titleKey: 'features.items.powerful.title',
      descriptionKey: 'features.items.powerful.description',
    },
    {
      icon: Heart,
      titleKey: 'features.items.safe.title',
      descriptionKey: 'features.items.safe.description',
    },
  ];

  return (
    <div className="min-h-screen bg-captain-white">
      <NavigationEnhanced />
      <HeroEnhanced />

      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-captain-white to-captain-soft">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-captain-text mb-4">
              {t('features.sectionTitle')}
            </h2>
            <p className="text-lg text-captain-muted">
              {t('features.sectionSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-16 h-16 text-captain-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-captain-text mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-captain-muted">{t(feature.descriptionKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-captain-text mb-4">
              {t('products.sectionTitle')}
            </h2>
            <p className="text-lg text-captain-muted">
              {t('products.sectionSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg bg-captain-primary text-white hover:bg-captain-dark transition-colors"
            >
              {t('products.viewAll')}
            </Link>
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
