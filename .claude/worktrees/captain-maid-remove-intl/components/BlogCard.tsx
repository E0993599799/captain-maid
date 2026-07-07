'use client';

import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  author: string;
  publishedAt: string;
  category?: string;
  readTime?: number;
  featured?: boolean;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  image,
  author,
  publishedAt,
  category = 'Cleaning Tips',
  readTime = 5,
  featured = false,
}: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group h-full overflow-hidden rounded-xl border transition-all duration-300 ${
        featured
          ? 'border-emerald-200 dark:border-emerald-800 shadow-xl bg-white dark:bg-neutral-800 lg:col-span-2'
          : 'border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg bg-white dark:bg-neutral-800'
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-700 dark:to-neutral-600 ${
        featured ? 'h-80 md:h-96' : 'h-48'
      }`}>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl opacity-20">
            📰
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full text-xs font-semibold">
          {category}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className={`p-6 lg:p-8 flex flex-col justify-between h-full ${
        featured ? 'md:flex-row md:items-end md:gap-8' : ''
      }`}>
        <div className="flex-1">
          {/* Meta Info */}
          <div className={`flex flex-wrap items-center gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400 ${
            featured ? 'md:absolute md:bottom-6 md:right-8' : ''
          }`}>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <time>{new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}</time>
            </div>
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{author}</span>
            </div>
            <div className="text-xs bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 px-2 py-1 rounded">
              {readTime} min read
            </div>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {title}
          </h3>

          {/* Excerpt */}
          <p className={`text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-2 ${
            featured ? 'md:line-clamp-3' : ''
          }`}>
            {excerpt}
          </p>
        </div>

        {/* Read More Link */}
        <motion.div
          whileHover={{ x: 4 }}
          className="mt-auto"
        >
          <Link
            href={`/blog/${id}`}
            className="inline-flex items-center gap-2 font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors group/link"
          >
            Read Article
            <motion.span
              className="inline-block"
              groupHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
