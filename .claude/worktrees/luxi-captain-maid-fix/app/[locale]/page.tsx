'use client';

import { Leaf, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { HeroEnhancedV2 } from '@/components/HeroEnhancedV2';
import { ProductShowcase } from '@/components/ProductShowcase';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { FAQ } from '@/components/FAQ';
import { ShopCTA } from '@/components/ShopCta';
import { Footer } from '@/components/Footer';
import { CAPTAIN_MAID_PRODUCTS } from '@/lib/products';

// Use real product data from scraping (2026-07-06)
const PRODUCTS = CAPTAIN_MAID_PRODUCTS;

const FEATURES = [
  {
    icon: Leaf,
    titleKey: 'Natural Ingredients',
    descriptionKey: 'Eco-friendly formula with plant-based components',
  },
  {
    icon: Sparkles,
    titleKey: 'Powerful Cleaning',
    descriptionKey: 'Advanced encapsulation technology for deep clean',
  },
  {
    icon: Heart,
    titleKey: 'Family Safe',
    descriptionKey: 'Gentle on kids and pets, dermatologist tested',
  },
];

export default function Home() {
  const t = useTranslations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavigationEnhanced />

      {/* Hero Section - Redesigned */}
      <HeroEnhancedV2 />

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f0f8ff]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="section-heading text-h3 md:text-h2 mb-4">
              Why Choose Captain Maid?
            </h2>
            <p className="text-body text-[#506090] max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 md:p-8 rounded-xl bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-[#e0e8f0]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#b0d0f0] flex items-center justify-center mb-4">
                    <Icon className="text-[#001360]" size={24} />
                  </div>
                  <h3 className="text-h4 font-bold text-[#001360] mb-2">
                    {feature.titleKey}
                  </h3>
                  <p className="text-body text-[#506090]">
                    {feature.descriptionKey}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Product Showcase Section — Interactive Tabs */}
      <ProductShowcase />

      {/* Products Section — MACC style */}
      <section id="products" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="section-heading text-h3 md:text-h2 mb-4">
              {t('products.title')}
            </h2>
            <p className="text-body text-[#506090]">
              {t('products.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {PRODUCTS.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  {...product}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12 md:mt-16"
          >
            <Button size="lg" variant="secondary">
              {t('products.viewAll')}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#b0d0f0] to-[#90d0f0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-heading text-h3 md:text-h2 text-[#001360] mb-6">
              Trusted by 2,500+ Families
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-[#02a6e3]">★</span>
                ))}
              </div>
              <span className="text-body font-semibold text-[#001360]">
                4.8/5 from 1,000+ reviews
              </span>
            </div>
            <Button size="lg" variant="primary">
              Join Our Community
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Shop CTA Section */}
      <ShopCTA />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}