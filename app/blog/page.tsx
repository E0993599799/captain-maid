'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'How to Clean Every Surface in Your Home',
    slug: 'clean-every-surface',
    excerpt: 'Learn the best techniques for cleaning different surfaces safely and effectively.',
    author: 'Captain Maid',
    date: '2026-07-01',
    readTime: '5 min read',
    image: '/images/logos/captain-maid-logo.webp',
  },
  {
    id: 2,
    title: 'Natural Cleaning Products: Why They Matter',
    slug: 'natural-cleaning-products',
    excerpt: 'Discover why natural ingredients are better for your home and family.',
    author: 'Captain Maid',
    date: '2026-06-25',
    readTime: '7 min read',
    image: '/images/logos/captain-maid-logo.webp',
  },
  {
    id: 3,
    title: 'Pet-Friendly Cleaning Solutions',
    slug: 'pet-friendly-solutions',
    excerpt: 'Safe cleaning tips for homes with cats and dogs.',
    author: 'Captain Maid',
    date: '2026-06-18',
    readTime: '6 min read',
    image: '/images/logos/captain-maid-logo.webp',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#EAF6FD] to-[#90D0F0] py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#001360] mb-4">
              Captain Maid Blog
            </h1>
            <p className="text-lg text-[#506090] max-w-2xl">
              Tips, tricks, and insights for keeping your home clean naturally.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="bg-[#EAF6FD] rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-[#B0D0F0] group-hover:bg-[#90D0F0] transition-colors">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-[#001360] mb-2 group-hover:text-[#02a6e3] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#506090] mb-4 line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[#506090] border-t border-[#D9EAF6] pt-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
