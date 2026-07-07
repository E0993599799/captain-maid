'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Button } from './Button';
import { Badge } from './Badge';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  priceThb?: number;
  originalPrice?: number;
  originalPriceThb?: number;
  image: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  featured?: boolean;
  badge?: string;
}

/**
 * Product card component with light blue surface and hover effects
 * Features price, discount badge, rating, and CTA button
 */
export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      id,
      name,
      description,
      price,
      priceThb,
      originalPrice,
      originalPriceThb,
      image,
      category,
      rating = 4.5,
      reviewCount = 0,
      inStock = true,
      featured = false,
      badge,
    },
    ref
  ) => {
    const t = useTranslations();
    const displayPrice = priceThb || price;
    const displayOriginalPrice = originalPriceThb || originalPrice;
    const currencySymbol = '฿';

    const discount = displayOriginalPrice
      ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)
      : 0;

    return (
      <div
        ref={ref}
        className={`group flex flex-col rounded-[24px] overflow-hidden shadow-brand hover:shadow-brand-hover transition-all duration-180 bg-captain-light border border-captain-border hover:-translate-y-1 ${
          featured ? 'md:col-span-2 md:row-span-2' : ''
        }`}
      >
        {/* Image Container */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-captain-soft">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            quality={85}
            priority={featured}
          />
          {discount > 0 && (
            <div className="absolute top-4 right-4">
              <Badge variant="error" size="md">
                -{discount}%
              </Badge>
            </div>
          )}
          {badge && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary" size="md">
                {badge}
              </Badge>
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-4 md:p-6">
          {/* Category Badge */}
          <span className="text-xs font-semibold text-captain-dark uppercase tracking-wide mb-2">
            {category}
          </span>

          {/* Product Name */}
          <h3 className="text-lg md:text-xl font-heading font-bold text-captain-text mb-2 line-clamp-2 group-hover:text-captain-primary transition-colors duration-180">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-captain-muted mb-4 line-clamp-2 flex-grow">
            {description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(rating)
                      ? 'fill-captain-primary text-captain-primary'
                      : 'text-captain-border'
                  }`}
                />
              ))}
            </div>
            {reviewCount > 0 && (
              <span className="text-xs text-captain-muted">
                ({reviewCount})
              </span>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl md:text-3xl font-heading font-bold text-captain-primary">
              {currencySymbol}{Math.round(displayPrice).toLocaleString()}
            </span>
            {displayOriginalPrice && (
              <span className="text-sm text-captain-muted line-through">
                {currencySymbol}{Math.round(displayOriginalPrice).toLocaleString()}
              </span>
            )}
          </div>

          {/* View Details Link */}
          <Link href={`/products/${id}`} className="block">
            <Button
              variant="primary"
              size="md"
              disabled={!inStock}
              icon={<ChevronRight size={20} />}
              iconPosition="right"
              className="w-full"
            >
              {t('products.moreDetail') || 'View Details'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

