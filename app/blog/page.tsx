'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';
import { BlogCard } from '@/components/BlogCard';
import { getAllBlogPosts } from '@/lib/blog-posts';

/**
 * Blog page with redesigned card layout
 * Responsive grid (1 mobile, 2 tablet, 3 desktop)
 * Cards feature image hover zoom, category badges, and meta info
 */
export default function BlogPage() {
  const posts = useMemo(() => getAllBlogPosts(), []);

  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hero-gradient py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-cm-navy mb-4"
          >
            บล็อก Captain Maid
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-cm-text-secondary leading-relaxed"
          >
            เคล็ดลับการทำความสะอาด คำแนะนำจากผู้เชี่ยวชาญ และข้อมูลเชิงลึกเกี่ยวกับผลิตภัณฑ์
          </motion.p>
        </div>
      </motion.section>

      {/* Blog Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <BlogCard
                    id={String(post.id)}
                    title={post.title}
                    excerpt={post.excerpt}
                    image="/images/blog-placeholder.jpg"
                    category="บทความ"
                    date={post.date}
                    readTime={post.readTime}
                    slug={post.slug}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <p className="text-lg text-cm-text-secondary">
                ยังไม่มีบทความในตอนนี้ โปรดกลับมาในภายหลัง
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
