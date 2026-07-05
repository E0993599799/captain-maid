'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './Button';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  featured?: boolean;
  onAddCart?: () => void;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      name,
      description,
      price,
      originalPrice,
      image,
      category,
      rating = 4.5,
      reviewCount = 0,
      inStock = true,
      featured = false,
      onAddCart,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
      <div
        ref={ref}
        className={`group flex flex-col rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-white dark:bg-slate-800 ${
          featured ? 'md:col-span-2 md:row-span-2' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-slate-100 dark:bg-slate-700">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            quality={95}
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-4 md:p-6">
          {/* Category Badge */}
          <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wide mb-2">
            {category}
          </span>

          {/* Product Name */}
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow">
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
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              ))}
            </div>
            {reviewCount > 0 && (
              <span className="text-xs text-slate-600 dark:text-slate-400">
                ({reviewCount})
              </span>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-2xl md:text-3xl font-bold text-teal-700 dark:text-teal-400">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-500 dark:text-slate-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="md"
            disabled={!inStock}
            onClick={onAddCart}
            icon={<ShoppingCart size={20} />}
            iconPosition="left"
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';
