'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import Button from './Button';

interface ProductCardProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  emoji?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  badge?: string;
  onAddToCart?: () => void;
  featured?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  emoji,
  rating = 5,
  reviews = 24,
  inStock = true,
  badge,
  onAddToCart,
  featured = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart?.();
    setTimeout(() => setIsAdded(false), 2000);
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-white dark:bg-neutral-800 rounded-xl overflow-hidden transition-all duration-300 ${
        featured ? 'border-2 border-emerald-500 shadow-xl' : 'border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Badge */}
      {(badge || discount > 0) && (
        <div className="absolute top-4 right-4 z-10">
          {discount > 0 ? (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          ) : (
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {badge}
            </div>
          )}
        </div>
      )}

      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-700 dark:to-neutral-600 flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        ) : emoji ? (
          <div className="text-8xl mb-4">{emoji}</div>
        ) : null}

        {/* Overlay on Hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
          >
            <p className="text-white text-sm font-semibold px-4 text-center">View Details</p>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        {/* Category/Type */}
        <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide mb-2">
          Premium Cleaner
        </p>

        {/* Product Name */}
        <h3 className="text-lg lg:text-xl font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300 dark:text-neutral-600'}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            ({reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-neutral-900 dark:text-white">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          {inStock ? (
            <p className="text-xs font-semibold text-green-600 dark:text-green-400">
              ✓ In Stock (12 available)
            </p>
          ) : (
            <p className="text-xs font-semibold text-red-600 dark:text-red-400">
              Out of Stock
            </p>
          )}
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            variant="primary"
            size="md"
            className="w-full"
            icon={<ShoppingCart size={20} />}
          >
            {isAdded ? '✓ Added!' : 'Add to Cart'}
          </Button>
        </motion.div>

        {/* Trust Badge */}
        <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mt-3">
          🛒 Free shipping on orders over $50
        </p>
      </div>
    </motion.div>
  );
}
