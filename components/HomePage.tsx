'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { ProductFinder } from '@/components/sections/ProductFinder';
import { FeaturedProductsCarousel } from '@/components/sections/FeaturedProductsCarousel';
import { ProductCategoriesShowcase } from '@/components/sections/ProductCategoriesShowcase';
import { SolutionsGrid } from '@/components/sections/SolutionsGrid';
import { FooterSection } from '@/components/sections/FooterSection';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { heroSlides } from '@/data/hero-slides';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <div>
      {/* Fixed Header */}
      <Header />

      {/* Hero Slider - Phase 1 */}
      <HeroSlider slides={heroSlides} />

      {/* Product Finder Module - Phase 1 */}
      <div className="bg-gradient-to-b from-transparent to-blue-50 py-12">
        <Container>
          <ProductFinder />
        </Container>
      </div>

      {/* Featured Products Carousel - Phase 2 (Sammakorn-inspired) */}
      <FeaturedProductsCarousel products={products} />

      {/* Product Categories Showcase - Phase 2 */}
      <ProductCategoriesShowcase />

      {/* Solutions Grid - Phase 2 (8 cleaning problem categories) */}
      <SolutionsGrid />

      {/* Trust & Quality Section - Phase 2 Placeholder */}
      <Section variant="light">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Captain Maid?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Trusted by thousands of households across Thailand
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Premium Quality', desc: 'Rigorous testing standards' },
              { icon: '🌿', title: 'Safe Formula', desc: 'Family-friendly & eco-conscious' },
              { icon: '✨', title: 'Proven Results', desc: 'Visible cleanliness in seconds' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blog/Articles Placeholder - Phase 2 */}
      <Section variant="white">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-gray-600 text-lg">
              Cleaning tips, DIY solutions, and product news
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="bg-gray-200 h-48 animate-pulse" />
                <div className="p-6">
                  <p className="text-sm text-blue-600 font-semibold mb-2">Article</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Article Title {i}</h3>
                  <p className="text-gray-600 text-sm">Coming soon: Latest blog posts & cleaning tips</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section - Phase 2 */}
      <Section variant="deep">
        <Container>
          <div className="text-center py-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Home?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Shop our complete range of premium cleaning solutions today
            </p>
            <button className="inline-block bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
              Shop Now
            </button>
          </div>
        </Container>
      </Section>

      {/* Footer - Phase 2 (Sammakorn deep blue design) */}
      <FooterSection />
    </div>
  );
}
