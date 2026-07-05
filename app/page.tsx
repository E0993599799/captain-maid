'use client';

import Image from 'next/image';
import { Leaf, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { HeroEnhanced } from '@/components/HeroEnhanced';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';

const PRODUCTS = [
  {
    id: 'glass-cleaner',
    name: 'Glass Cleaner',
    description: 'Crystal clear cleaning results for sparkling windows',
    price: 5.99,
    originalPrice: 7.99,
    image: '/images/products/glass-cleaner.webp',
    category: 'Glass',
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
  },
  {
    id: 'bathroom-cleaner',
    name: 'Bathroom Cleaner',
    description: 'Deep clean for tiles, tubs, and fixtures',
    price: 6.99,
    image: '/images/products/bathroom-cleaner.webp',
    category: 'Bath',
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
  },
  {
    id: 'kitchen-cleaner',
    name: 'Kitchen Cleaner',
    description: 'Effective against everyday stains and grease',
    price: 5.99,
    image: '/images/products/kitchen-cleaner.webp',
    category: 'Kitchen',
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
  },
  {
    id: 'floor-cleaner',
    name: 'Floor Cleaner',
    description: 'Quick-dry formula, safe for all floor types',
    price: 7.99,
    image: '/images/products/floor-cleaner.webp',
    category: 'Floor',
    rating: 4.8,
    reviewCount: 267,
    inStock: true,
    featured: true,
  },
  {
    id: 'drain-foamer',
    name: 'Drain Foamer',
    description: 'Foaming action clears drains naturally',
    price: 6.99,
    image: '/images/products/drain-foamer.webp',
    category: 'Drain',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
  },
  {
    id: 'drain-cleaner',
    name: 'Drain Cleaner',
    description: 'Powerful drain maintenance solution',
    price: 7.99,
    image: '/images/products/drain-cleaner.webp',
    category: 'Drain',
    rating: 4.5,
    reviewCount: 98,
    inStock: true,
  },
];

const FEATURES = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Eco-friendly formula with plant-based components',
  },
  {
    icon: Sparkles,
    title: 'Powerful Cleaning',
    description: 'Advanced encapsulation technology for deep clean',
  },
  {
    icon: Heart,
    title: 'Family Safe',
    description: 'Gentle on kids and pets, dermatologist tested',
  },
];

export default function Home() {
  const handleAddToCart = (productId: string) => {
    console.log(`Added ${productId} to cart`);
  };

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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navigation */}
      <NavigationEnhanced />

      {/* Hero Section */}
      <HeroEnhanced />

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-h2 md:text-h1 font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Captain Maid?
            </h2>
            <p className="text-body text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We combine nature-derived ingredients with advanced cleaning technology for a superior clean
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
                  className="p-6 md:p-8 rounded-xl bg-white dark:bg-slate-700 shadow-card hover:shadow-card-hover transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-4">
                    <Icon className="text-teal-700 dark:text-teal-400" size={24} />
                  </div>
                  <h3 className="text-h4 font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-body text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-h2 md:text-h1 font-bold text-slate-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-body text-slate-600 dark:text-slate-400">
              Discover our complete line of premium cleaning solutions
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
                  onAddCart={() => handleAddToCart(product.id)}
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
              View All Products
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h2 md:text-h1 font-bold text-slate-900 dark:text-white mb-6">
              Trusted by 2,500+ Families
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-body font-semibold text-slate-900 dark:text-white">
                4.8/5 from 1,000+ reviews
              </span>
            </div>
            <Button size="lg" variant="primary">
              Join Our Community
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="relative h-12 w-12 mb-4">
                <Image
                  src="/images/logos/captain-maid-icon.webp"
                  alt="Captain Maid"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">Captain Maid</h3>
              <p className="text-slate-400 text-sm">
                Premium cleaning solutions for modern homes
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Glass Cleaner</a></li>
                <li><a href="#" className="hover:text-white transition">Bathroom Cleaner</a></li>
                <li><a href="#" className="hover:text-white transition">Floor Cleaner</a></li>
                <li><a href="#" className="hover:text-white transition">Drain Solutions</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition">Returns</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>© 2026 ARIGEO, Inc. All rights reserved. | Made with ♥ for cleaner homes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
