'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Star, ChevronLeft, ShieldCheck, Leaf, HeartHandshake } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/Button';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';
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

  // Dynamic Schema.org JSON-LD for rich product search snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": `https://captain-maid.vercel.app${product.image}`,
    "sku": product.sku || product.id,
    "mpn": product.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "Captain Maid"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "THB",
      "price": displayPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://captain-maid.vercel.app/${locale}/products/${product.id}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 5.0,
      "reviewCount": product.reviewCount || 12
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Dynamic Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Global Navigation Header */}
      <NavigationEnhanced />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-captain-soft border-b border-captain-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-sm">
          <Link href="/products" className="text-captain-muted hover:text-captain-primary transition-colors">
            {t('navigation.products') || 'Products'}
          </Link>
          <span className="text-captain-muted">/</span>
          <span className="text-captain-text font-medium truncate max-w-[200px] sm:max-w-none">{name}</span>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-captain-soft/20 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation Button with tactile micro-interaction */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-captain-primary hover:text-captain-dark transition-all font-semibold active:scale-95"
            >
              <ChevronLeft size={18} />
              {t('productDetail.backToProducts') || 'Back to products'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-16">
            {/* Left: Product Hero Sizing Box with tactile hover and shadow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center bg-white border border-captain-border/40 rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(10,86,194,0.06)] hover:shadow-[0_24px_60px_rgba(10,86,194,0.10)] transition-all duration-300"
            >
              <div className="relative w-full aspect-square max-w-[380px] md:max-w-none">
                <Image
                  src={product.image}
                  alt={name}
                  fill
                  className="object-contain"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-semantic-error text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md shadow-semantic-error/20">
                    -{discount}%
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex flex-col justify-start"
            >
              {/* Category */}
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-captain-primary mb-3 bg-captain-soft px-3 py-1.5 rounded-full w-fit">
                {category}
              </span>

              {/* Product Name */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-captain-text mb-4 leading-tight">
                {name}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-captain-muted mb-6 leading-relaxed">
                {description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating || 5.0)
                          ? 'fill-[#FFD84D] text-[#FFD84D]'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-captain-text">{(product.rating || 5.0).toFixed(1)}</span>
                <span className="text-xs text-captain-muted">
                  ({product.reviewCount || 12} {t('productDetail.reviews') || 'reviews'})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-captain-border/40">
                <span className="text-4xl font-bold text-captain-primary">
                  {currencySymbol}{Math.round(displayPrice)}
                </span>
                {displayOriginalPrice && (
                  <span className="text-xl text-captain-muted line-through">
                    {currencySymbol}{Math.round(displayOriginalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6 flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${
                  product.inStock ? 'bg-semantic-success animate-pulse' : 'bg-semantic-error'
                }`} />
                <span className={`text-sm font-semibold ${
                  product.inStock ? 'text-semantic-success' : 'text-semantic-error'
                }`}>
                  {product.inStock ? t('products.inStock') : t('products.outOfStock')}
                </span>
              </div>

              {/* Action Button with scale-95 tactile press feedback */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!product.inStock}
                  className="w-full sm:w-auto font-semibold shadow-md active:scale-95 transition-all"
                >
                  {product.inStock ? t('products.addToCart') || 'Add to Cart' : t('products.outOfStock') || 'Out of Stock'}
                </Button>
              </div>

              {/* Premium Trust Markers */}
              <div className="grid grid-cols-3 gap-3 mt-8 border-t border-captain-border/30 pt-6">
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-captain-soft/50 border border-captain-border/20">
                  <ShieldCheck size={20} className="text-captain-primary mb-1" />
                  <span className="text-[11px] font-bold text-captain-text">Family Safe</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-captain-soft/50 border border-captain-border/20">
                  <Leaf size={20} className="text-captain-primary mb-1" />
                  <span className="text-[11px] font-bold text-captain-text">Eco Friendly</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-captain-soft/50 border border-captain-border/20">
                  <HeartHandshake size={20} className="text-captain-primary mb-1" />
                  <span className="text-[11px] font-bold text-captain-text">Derm-Tested</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-12"
          >
            {/* Key Benefits */}
            {product.properties && product.properties.length > 0 && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-6">
                  {t('productDetail.properties')}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.properties.map((prop, idx) => (
                    <li key={idx} className="flex gap-3 text-captain-muted items-start bg-captain-soft/30 p-4 rounded-2xl border border-captain-border/10">
                      <span className="text-captain-primary font-bold">✓</span>
                      <span className="text-sm font-medium">{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-4">
                  {t('productDetail.usage')}
                </h2>
                <p className="text-base sm:text-lg text-captain-muted leading-relaxed max-w-3xl">
                  {product.usage}
                </p>
              </div>
            )}

            {/* Directions */}
            {product.directions && product.directions.length > 0 && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-6">
                  {t('productDetail.directions')}
                </h2>
                <ul className="grid grid-cols-1 gap-4 max-w-4xl">
                  {product.directions.map((dir, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-white border border-captain-border/30 shadow-[0_8px_20px_rgba(10,86,194,0.02)]">
                      <span className="font-bold text-captain-primary text-lg min-w-[24px] h-[24px] rounded-full bg-captain-soft flex items-center justify-center text-xs">{idx + 1}</span>
                      <span className="text-captain-muted text-sm sm:text-base leading-relaxed">{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Precautions */}
            {product.precautions && product.precautions.length > 0 && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-6">
                  {t('productDetail.precautions')}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.precautions.map((precaution, idx) => (
                    <li key={idx} className="flex gap-3 text-captain-muted items-start bg-red-50/30 p-4 rounded-2xl border border-red-100/50">
                      <span className="text-red-600 font-bold">!</span>
                      <span className="text-sm font-medium">{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            <div className="border-t border-captain-border/40 pt-12">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-6">
                {t('productDetail.specifications')}
              </h2>
              <div className="overflow-x-auto max-w-2xl bg-white rounded-2xl border border-captain-border/40 shadow-[0_10px_30px_rgba(10,86,194,0.02)]">
                <table className="w-full text-left text-captain-muted border-collapse text-sm">
                  <tbody>
                    {product.size && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text w-1/3">{t('productDetail.size')}</td>
                        <td className="py-4 px-5">{product.size}</td>
                      </tr>
                    )}
                    {product.weight && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.weight')}</td>
                        <td className="py-4 px-5">{product.weight}</td>
                      </tr>
                    )}
                    {product.height && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.height')}</td>
                        <td className="py-4 px-5">{product.height}</td>
                      </tr>
                    )}
                    {product.width && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.width')}</td>
                        <td className="py-4 px-5">{product.width}</td>
                      </tr>
                    )}
                    {product.depth && (
                      <tr className="hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.depth')}</td>
                        <td className="py-4 px-5">{product.depth}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Footer Back Link with scale-95 tactile press feedback */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border-t border-captain-border/40 pt-12 mt-16"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-captain-primary hover:text-captain-dark transition-all font-semibold text-lg active:scale-95"
            >
              <ChevronLeft size={24} />
              {t('productDetail.backToProducts') || 'Back to products'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}