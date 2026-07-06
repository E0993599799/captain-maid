'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Star, ChevronLeft } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/Button';
import { CAPTAIN_MAID_PRODUCTS } from '@/lib/products';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const t = useTranslations();
  const locale = useLocale();

  // Handle async params - get id from the promise
  const id = (params as any).id || '';

  // Find product by ID
  const product = CAPTAIN_MAID_PRODUCTS.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  // Select language-specific fields
  const name = locale === 'th' ? product.nameThb : product.name;
  const description = locale === 'th' ? product.descriptionThb : product.description;
  const category = locale === 'th' ? product.categoryThb : product.category;

  const displayPrice = product.priceThb || product.price;
  const displayOriginalPrice = product.originalPriceThb || product.originalPrice;
  const currencySymbol = '฿';
  const discount = displayOriginalPrice ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-white sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#02a6e3] hover:text-[#0090c8] transition-colors"
          >
            <ChevronLeft size={20} />
            {t('productDetail.backToProducts')}
          </Link>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
            {/* Left: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={product.image}
                  alt={name}
                  fill
                  className="object-contain"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                    -{discount}%
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-start"
            >
              {/* Category */}
              <span className="text-sm font-semibold text-[#1070b0] uppercase tracking-wide mb-3">
                {category}
              </span>

              {/* Product Name */}
              <h1 className="text-4xl md:text-5xl font-bold text-[#001360] mb-4">
                {name}
              </h1>

              {/* Description */}
              <p className="text-lg text-[#506090] mb-6 leading-relaxed">
                {description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating || 0)
                          ? 'fill-[#02a6e3] text-[#02a6e3]'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                {product.reviewCount > 0 && (
                  <span className="text-sm text-[#506090]">
                    ({product.reviewCount})
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-slate-200">
                <span className="text-4xl font-bold text-[#02a6e3]">
                  {currencySymbol}{Math.round(displayPrice)}
                </span>
                {displayOriginalPrice && (
                  <span className="text-xl text-[#506090] line-through">
                    {currencySymbol}{Math.round(displayOriginalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`text-sm font-semibold ${
                  product.inStock ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inStock ? t('products.inStock') : t('products.outOfStock')}
                </span>
              </div>

              {/* Action Button */}
              <Button
                variant="primary"
                size="lg"
                disabled={!product.inStock}
                className="w-full md:w-auto mb-6"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-12"
          >
            {/* Key Benefits */}
            {product.properties && product.properties.length > 0 && (
              <div className="border-t pt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#001360] mb-6">
                  {t('productDetail.properties')}
                </h2>
                <ul className="space-y-3">
                  {product.properties.map((prop, idx) => (
                    <li key={idx} className="flex gap-3 text-[#506090]">
                      <span className="text-[#02a6e3] font-bold mt-1">✓</span>
                      <span>{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="border-t pt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#001360] mb-6">
                  {t('productDetail.usage')}
                </h2>
                <p className="text-lg text-[#506090] leading-relaxed">
                  {product.usage}
                </p>
              </div>
            )}

            {/* Directions */}
            {product.directions && product.directions.length > 0 && (
              <div className="border-t pt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#001360] mb-6">
                  {t('productDetail.directions')}
                </h2>
                <ul className="space-y-4">
                  {product.directions.map((dir, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="font-bold text-[#02a6e3] min-w-fit">{idx + 1}.</span>
                      <span className="text-[#506090]">{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Precautions */}
            {product.precautions && product.precautions.length > 0 && (
              <div className="border-t pt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#001360] mb-6">
                  {t('productDetail.precautions')}
                </h2>
                <ul className="space-y-3">
                  {product.precautions.map((precaution, idx) => (
                    <li key={idx} className="flex gap-3 text-[#506090]">
                      <span className="text-red-600 font-bold mt-1">!</span>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            <div className="border-t pt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#001360] mb-6">
                {t('productDetail.specifications')}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[#506090]">
                  <tbody>
                    {product.size && (
                      <tr className="border-b border-slate-200">
                        <td className="py-3 font-semibold text-[#001360] w-1/3">{t('productDetail.size')}</td>
                        <td className="py-3">{product.size}</td>
                      </tr>
                    )}
                    {product.weight && (
                      <tr className="border-b border-slate-200">
                        <td className="py-3 font-semibold text-[#001360]">{t('productDetail.weight')}</td>
                        <td className="py-3">{product.weight}</td>
                      </tr>
                    )}
                    {product.height && (
                      <tr className="border-b border-slate-200">
                        <td className="py-3 font-semibold text-[#001360]">{t('productDetail.height')}</td>
                        <td className="py-3">{product.height}</td>
                      </tr>
                    )}
                    {product.width && (
                      <tr className="border-b border-slate-200">
                        <td className="py-3 font-semibold text-[#001360]">{t('productDetail.width')}</td>
                        <td className="py-3">{product.width}</td>
                      </tr>
                    )}
                    {product.depth && (
                      <tr>
                        <td className="py-3 font-semibold text-[#001360]">{t('productDetail.depth')}</td>
                        <td className="py-3">{product.depth}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Back to Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t pt-12 mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#02a6e3] hover:text-[#0090c8] transition-colors font-semibold text-lg"
            >
              <ChevronLeft size={24} />
              {t('productDetail.backToProducts')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
