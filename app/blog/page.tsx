'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#EAF6FD] to-[#90D0F0] py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#001360] mb-4">
              บล็อก Captain Maid
            </h1>
            <p className="text-lg text-[#506090] max-w-2xl">
              รวมทิปส์ เทคนิค และไอเดียดีๆ เพื่อบ้านที่สะอาด ปลอดภัย และน่าอยู่ยิ่งขึ้น
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full"
              >
                <div className="bg-[#EAF6FD] rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                  {/* Color block instead of image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#02a6e3] to-[#1070b0] group-hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center">
                    <div className="text-white/20 text-6xl font-bold select-none">
                      CM
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-xl font-bold text-[#001360] mb-2 group-hover:text-[#02a6e3] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[#506090] mb-4 line-clamp-3 flex-grow leading-6">
                      {post.excerpt}
                    </p>

                    {/* Meta + CTA */}
                    <div className="border-t border-[#D9EAF6] pt-4">
                      <div className="flex items-center gap-4 text-xs text-[#506090] mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('th-TH')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#02a6e3] group-hover:gap-2 transition-all">
                        อ่านต่อ <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}