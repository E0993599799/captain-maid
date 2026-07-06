'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/navigation';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
}

/**
 * Blog card component with new design system
 * Features image hover zoom, category badge, and hover lift animation
 */
export const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  ({ id, title, excerpt, image, category, date, readTime, slug }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-cm-border-soft shadow-md hover:shadow-xl transition-all duration-300"
      >
        {/* Featured Image */}
        <div className="relative h-56 md:h-64 overflow-hidden bg-cm-surface-light">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex px-3 py-1.5 rounded-full bg-cm-mint text-cm-fresh-green font-semibold text-xs uppercase tracking-wider"
            >
              {category}
            </motion.div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-6 md:p-8">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-cm-navy mb-3 line-clamp-2 group-hover:text-cm-primary-blue transition-colors duration-200">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-cm-text-secondary text-sm md:text-base mb-6 line-clamp-3 flex-grow leading-relaxed">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-xs md:text-sm text-cm-text-secondary border-t border-cm-border-soft pt-6 mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="flex-shrink-0" />
              <span>{date}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-cm-border-soft" />
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="flex-shrink-0" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Read More Link */}
          <Link href={`/blog/${slug}`} className="block">
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-cm-primary-blue font-semibold group/link"
            >
              <span>อ่านบทความ</span>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    );
  }
);

BlogCard.displayName = 'BlogCard';
