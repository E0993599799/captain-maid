'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Calendar } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { NavigationEnhanced } from '@/components/NavigationEnhanced';
import { Footer } from '@/components/Footer';

export default function BlogPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      <NavigationEnhanced />

      {/* Header */}
      <div className="bg-gradient-to-br from-captain-soft via-white to-captain-light py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-captain-text mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-lg text-captain-muted max-w-2xl">
              {t('blog.subtitle')}
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
              <div className="bg-captain-light rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 bg-captain-border group-hover:bg-captain-accent transition-colors">
                  <img
                    src="/images/logos/captain-maid-logo.jpg"
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-captain-text mb-3 group-hover:text-captain-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-captain-muted mb-4 line-clamp-3 flex-grow leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-captain-muted border-t border-captain-border pt-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-captain-primary" />
                      <span>{new Date(post.date).toLocaleDateString('th-TH')}</span>
                    </div>
                    <span className="font-medium text-captain-text">{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
