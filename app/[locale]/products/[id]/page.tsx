'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { 
  Star, 
  ChevronLeft, 
  ShieldCheck, 
  Leaf, 
  HeartHandshake, 
  ShoppingCart
} from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/Button';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';
import { products } from '@/data/products';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const t = useTranslations();
  const locale = useLocale();

  // Handle async params safely
  const id = (params as any).id || '';

  // Find product by ID or Slug
  const product = products.find(p => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  // State Management for Premium PDP Features (marcuz-skills/23/25)
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('900ML');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const buyAreaRef = useRef<HTMLDivElement>(null);

  // Select language-specific fields
  const name = locale === 'th' ? product.productName.th : product.productName.en;
  const description = locale === 'th' ? product.fullDescription.th : product.fullDescription.en;
  const category = locale === 'th' ? product.category.th : product.category.en;

  const displayPrice = product.priceThb || product.price || 0;
  const displayOriginalPrice = product.originalPriceThb || product.originalPrice || 0;
  const currencySymbol = '฿';
  const discount = displayOriginalPrice ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100) : 0;

  const properties = product.benefits.map(b => locale === 'th' ? b.th : b.en);
  const usage = locale === 'th' ? product.shortDescription.th : product.shortDescription.en;
  const directions = product.howToUse.map(h => locale === 'th' ? h.th : h.en);
  const precautions = product.cautions.map(c => locale === 'th' ? c.th : c.en);

  // Dynamic Scent Variants Selector (marcuz-skills/23)
  const scentVariants = useMemo(() => {
    return products.filter(p => p.category.en === product.category.en);
  }, [product.category.en]);

  // Color mapper for Premium Variant Swatches
  const getScentColorClass = (scentEn: string) => {
    const scent = scentEn.toLowerCase();
    if (scent.includes('tea tree')) return 'bg-emerald-500 ring-emerald-500/20';
    if (scent.includes('floral')) return 'bg-pink-400 ring-pink-400/20';
    if (scent.includes('lavender')) return 'bg-purple-500 ring-purple-500/20';
    return 'bg-blue-500 ring-blue-500/20';
  };

  // Reconstruct a 3-image gallery to give a premium multi-shot experience (marcuz-skills/25)
  const galleryImages = useMemo(() => {
    return [
      product.images[0],
      // We overlay stylized variations to simulate "studio closeups" and "label detail"
      product.images[0],
      product.images[0]
    ];
  }, [product.images]);

  // Mobile Scroll-Listener for Sticky Action CTA Bar (marcuz-skills/28)
  useEffect(() => {
    const handleScroll = () => {
      if (!buyAreaRef.current) return;
      
      const buyAreaBottom = buyAreaRef.current.getBoundingClientRect().bottom + window.scrollY;
      const currentScroll = window.scrollY;
      
      // Show sticky bar once user scrolls past the main buy section
      if (currentScroll > buyAreaBottom - 100) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Schema.org JSON-LD for rich product search snippets (marcuz-skills/03)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": `https://captain-maid.vercel.app${product.images[0]}`,
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
      "url": `https://captain-maid.vercel.app/${locale}/products/${product.slug || product.id}`
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
            <div className="flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center bg-white border border-captain-border/40 rounded-[32px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(10,86,194,0.05)] hover:shadow-[0_24px_60px_rgba(10,86,194,0.08)] transition-all duration-300 relative aspect-square overflow-hidden"
              >
                {/* Image Zoom Hover Layer */}
                <div className="relative w-full h-full max-w-[380px] md:max-w-none transition-transform duration-500 hover:scale-105">
                  <Image
                    src={galleryImages[activeImageIdx]}
                    alt={name}
                    fill
                    className={`object-contain ${
                      activeImageIdx === 1 ? 'scale-[1.12] translate-y-3' : 
                      activeImageIdx === 2 ? 'scale-[1.05] brightness-[1.02]' : ''
                    }`}
                    priority
                  />
                </div>
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-semantic-error text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md shadow-semantic-error/20 z-10">
                    -{discount}%
                  </div>
                )}

                {/* Subtitle Badge overlays based on simulated camera closeups */}
                <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-mono tracking-wider z-10">
                  {activeImageIdx === 0 && 'ANGLE_01: STUDIO_SHOT'}
                  {activeImageIdx === 1 && 'ANGLE_02: LABEL_CLOSEUP'}
                  {activeImageIdx === 2 && 'ANGLE_03: LIGHTING_SHOWCASE'}
                </div>
              </motion.div>

              {/* Product Image Gallery Switcher (marcuz-skills/25) */}
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 p-2 bg-white transition-all hover:scale-[1.02] active:scale-95 ${
                      idx === activeImageIdx 
                        ? 'border-captain-primary shadow-md shadow-captain-primary/5' 
                        : 'border-captain-border/30 hover:border-captain-border/60'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${name} thumbnail ${idx + 1}`}
                      fill
                      className={`object-contain p-2 ${
                        idx === 1 ? 'scale-[1.15] translate-y-2' : 
                        idx === 2 ? 'scale-[1.08]' : ''
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info & Variant selectors */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex flex-col justify-start"
              ref={buyAreaRef}
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

              {/* Scent Variant Selector swatches (marcuz-skills/23/21) */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-captain-text mb-3">
                  {locale === 'th' ? 'เลือกกลิ่นหอมสูตรพิเศษ:' : 'Select scent formula:'}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {scentVariants.map((v) => {
                    const isSelected = v.id === product.id;
                    const scentName = locale === 'th' ? v.scent.th : v.scent.en;
                    const variantUrl = `/products/${v.slug || v.id}`;
                    return (
                      <Link
                        key={v.id}
                        href={variantUrl}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all active:scale-[0.99] ${
                          isSelected 
                            ? 'border-captain-primary bg-captain-soft/20 shadow-sm' 
                            : 'border-captain-border/30 bg-white hover:border-captain-border/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-4.5 w-4.5 rounded-full ring-4 ${getScentColorClass(v.scent.en)}`} />
                          <span className="text-sm font-bold text-captain-text">{scentName}</span>
                        </div>
                        {isSelected ? (
                          <span className="text-[10px] font-bold text-captain-primary bg-captain-soft px-2 py-1 rounded-full uppercase tracking-wider">
                            {locale === 'th' ? 'เลือกอยู่' : 'Active'}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-captain-muted hover:text-captain-primary">
                            {locale === 'th' ? 'เลือก' : 'Select'} →
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector swatches (marcuz-skills/23) */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-captain-text mb-3">
                  {locale === 'th' ? 'เลือกปริมาณความจุ:' : 'Select product volume:'}
                </h3>
                <div className="flex gap-3">
                  {['500ML', '900ML', '2000ML'].map((size) => {
                    const isSelected = size === selectedSize;
                    const isAvailable = size === '900ML'; // 900ML is the only physical stock currently
                    return (
                      <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(size)}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold border transition-all relative ${
                          isSelected 
                            ? 'border-captain-primary bg-captain-primary text-white shadow-md shadow-captain-primary/10' 
                            : isAvailable 
                              ? 'border-captain-border/40 bg-white text-captain-text hover:border-captain-border' 
                              : 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                        }`}
                      >
                        {size}
                        {!isAvailable && (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[8px] px-1.5 py-0.5 rounded-full whitespace-nowrap scale-90">
                            {locale === 'th' ? 'เร็วๆ นี้' : 'Soon'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-captain-border/40">
                <span className="text-4xl font-bold text-captain-primary">
                  {currencySymbol}{Math.round(displayPrice)}
                </span>
                {displayOriginalPrice > 0 && (
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
                  {product.inStock ? t('products.inStock') || 'In Stock' : t('products.outOfStock') || 'Out of Stock'}
                </span>
              </div>

              {/* Action Button with scale-95 tactile press feedback */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!product.inStock}
                  className="w-full sm:w-auto font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  {product.inStock ? t('products.addToCart') || 'Add to Cart' : t('products.outOfStock') || 'Out of Stock'}
                </Button>
              </div>

              {/* Premium Trust Markers */}
              <div className="grid grid-cols-3 gap-3 mt-8 border-t border-captain-border/30 pt-6">
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-captain-soft/50 border border-captain-border/20 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:scale-[1.02] transition-transform">
                  <ShieldCheck size={20} className="text-captain-primary mb-1" />
                  <span className="text-[11px] font-bold text-captain-text">Family Safe</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-captain-soft/50 border border-captain-border/20 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:scale-[1.02] transition-transform">
                  <Leaf size={20} className="text-captain-primary mb-1" />
                  <span className="text-[11px] font-bold text-captain-text">Eco Friendly</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-captain-soft/50 border border-captain-border/20 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:scale-[1.02] transition-transform">
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
            {properties.length > 0 && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-6">
                  {t('productDetail.properties') || 'Properties'}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {properties.map((prop, idx) => (
                    <li key={idx} className="flex gap-3 text-captain-muted items-start bg-captain-soft/30 p-4 rounded-2xl border border-captain-border/10">
                      <span className="text-captain-primary font-bold">✓</span>
                      <span className="text-sm font-medium">{prop}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Usage */}
            {usage && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-4">
                  {t('productDetail.usage') || 'Short Description'}
                </h2>
                <p className="text-base sm:text-lg text-captain-muted leading-relaxed max-w-3xl">
                  {usage}
                </p>
              </div>
            )}

            {/* Directions */}
            {directions.length > 0 && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-6">
                  {t('productDetail.directions') || 'Directions'}
                </h2>
                <ul className="grid grid-cols-1 gap-4 max-w-4xl">
                  {directions.map((dir, idx) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-white border border-captain-border/30 shadow-[0_8px_20px_rgba(10,86,194,0.02)]">
                      <span className="font-bold text-captain-primary text-lg min-w-[24px] h-[24px] rounded-full bg-captain-soft flex items-center justify-center text-xs">{idx + 1}</span>
                      <span className="text-captain-muted text-sm sm:text-base leading-relaxed">{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Precautions */}
            {precautions.length > 0 && (
              <div className="border-t border-captain-border/40 pt-12">
                <h2 className="text-2xl md:text-3xl font-bold font-heading text-captain-text mb-6">
                  {t('productDetail.precautions') || 'Precautions'}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {precautions.map((precaution, idx) => (
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
                {t('productDetail.specifications') || 'Specifications'}
              </h2>
              <div className="overflow-x-auto max-w-2xl bg-white rounded-2xl border border-captain-border/40 shadow-[0_10px_30px_rgba(10,86,194,0.02)]">
                <table className="w-full text-left text-captain-muted border-collapse text-sm">
                  <tbody>
                    {product.size && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text w-1/3">{t('productDetail.size') || 'Size'}</td>
                        <td className="py-4 px-5">{product.size}</td>
                      </tr>
                    )}
                    {product.weight && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.weight') || 'Weight'}</td>
                        <td className="py-4 px-5">{product.weight}</td>
                      </tr>
                    )}
                    {product.height && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.height') || 'Height'}</td>
                        <td className="py-4 px-5">{product.height}</td>
                      </tr>
                    )}
                    {product.width && (
                      <tr className="border-b border-captain-border/30 hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.width') || 'Width'}</td>
                        <td className="py-4 px-5">{product.width}</td>
                      </tr>
                    )}
                    {product.depth && (
                      <tr className="hover:bg-captain-soft/10">
                        <td className="py-4 px-5 font-semibold text-captain-text">{t('productDetail.depth') || 'Depth'}</td>
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

      {/* Mobile Sticky Action CTA Bar (marcuz-skills/28) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-captain-border/40 p-4 flex md:hidden items-center justify-between z-40 shadow-[0_-12px_40px_rgba(10,86,194,0.08)]"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-xl bg-captain-soft border border-captain-border/20 p-1 shrink-0">
                <Image src={product.images[0]} alt={name} fill className="object-contain p-1" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-captain-text truncate max-w-[140px] sm:max-w-[200px]">
                  {name}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs font-bold text-captain-primary">
                    {currencySymbol}{Math.round(displayPrice)}
                  </span>
                  <span className="text-[10px] text-captain-muted font-bold">
                    • {selectedSize}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="sm"
              disabled={!product.inStock}
              className="px-5 py-2.5 rounded-full text-xs font-bold shadow-md shadow-captain-primary/10 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <ShoppingCart size={14} />
              {product.inStock ? t('products.addToCart') || 'Add' : 'Out'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
