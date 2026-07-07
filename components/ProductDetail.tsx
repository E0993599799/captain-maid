'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Check, AlertTriangle } from 'lucide-react';

import { Product, getRelatedProducts } from '@/data/products';
import { ProductBadges } from './ProductBadges';
import { WhereToBuyButtons } from './WhereToBuyButtons';
import { FAQAccordion } from './FAQAccordion';
import { ProductGrid } from './ProductGrid';
import { faqItems } from '@/data/faqs';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const locale = useLocale();
  const lang = locale as 'th' | 'en';

  const relatedProducts = getRelatedProducts(product.slug);
  const productFaqs = faqItems.filter(item => item.productSlugs?.includes(product.slug));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        {/* Left: Image Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-full aspect-square bg-gray-100 rounded-xl">
            <Image
              src={product.images[0]}
              alt={product.productName[lang]}
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            {product.category[lang]}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {product.productName[lang]}
          </h1>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            {product.shortDescription[lang]}
          </p>
          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b">
            <span className="text-4xl font-bold text-primary">{product.priceText}</span>
          </div>
          
          <div className="mb-6">
             <ProductBadges badges={['5-FREE', 'Plant-Based', 'pH Neutral', 'Robot Friendly']} />
          </div>

          <p className="font-semibold mb-3 text-text-primary">ช่องทางจำหน่าย:</p>
          <WhereToBuyButtons product={product} />

        </motion.div>
      </div>

      {/* Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-12"
      >
        {product.fullDescription && (
          <div className="border-t pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              รายละเอียด
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {product.fullDescription[lang]}
            </p>
          </div>
        )}
        
        {product.benefits && product.benefits.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              คุณสมบัติเด่น
            </h2>
            <ul className="space-y-3">
              {product.benefits.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <Check className="text-primary mt-1 flex-shrink-0" />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.howToUse && product.howToUse.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              วิธีใช้
            </h2>
             <ul className="space-y-4">
              {product.howToUse.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="font-bold text-primary min-w-fit">{idx + 1}.</span>
                  <span className="text-text-secondary">{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.cautions && product.cautions.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              ข้อควรระวัง
            </h2>
            <ul className="space-y-3">
              {product.cautions.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <AlertTriangle className="text-yellow-500 mt-1 flex-shrink-0" />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {productFaqs.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              คำถามที่พบบ่อยสำหรับผลิตภัณฑ์นี้
            </h2>
            <FAQAccordion items={productFaqs} />
          </div>
        )}

      </motion.div>

      {relatedProducts.length > 0 && (
          <div className="border-t pt-12 mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
                  สินค้าที่เกี่ยวข้อง
              </h2>
              <ProductGrid products={relatedProducts} />
          </div>
      )}
    </>
  );
}
