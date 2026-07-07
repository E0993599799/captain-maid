'use client';

import { Leaf, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { HeroEnhanced } from '@/components/HeroEnhanced';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { FAQ } from '@/components/FAQ';
import { ShopCTA } from '@/components/ShopCta';
import { Footer } from '@/components/Footer';
import { CAPTAIN_MAID_PRODUCTS } from '@/lib/products';

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
    descriptionKey: 'Non-toxic and dermatologist tested',
  },
];

export default function Home() {
  let t;
  try {
    t = useTranslations();
  } catch (error) {
    console.error('Failed to get translations:', error);
    // Fallback if translations fail
    t = (key: string) => key;
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />
      <HeroEnhanced />

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-[#EAF6FD]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#001360] mb-4">
              Why Choose Captain Maid?
            </h2>
            <p className="text-lg text-[#506090]">
              Premium cleaning products trusted by families across Thailand
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
                    <Icon className="w-16 h-16 text-[#00A3E0]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#001360] mb-2">
                    {feature.titleKey}
                  </h3>
                  <p className="text-[#506090]">{feature.descriptionKey}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#001360] mb-4">
              Our Products
            </h2>
            <p className="text-lg text-[#506090]">
              Specially formulated cleaning solutions for every room
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
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button href="/products" variant="primary">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      <FAQ />
      <ShopCTA />
      <Footer />
    </div>
  );
}
