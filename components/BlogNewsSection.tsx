'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import {
  BLOG_NEWS_ARTICLES,
  getFeaturedArticle,
  getCategoryLabel,
  getCategoryColor,
} from '@/lib/blog-news-data';

export const BlogNewsSection = () => {
  const t = useTranslations();
  const featured = getFeaturedArticle();
  const articles = BLOG_NEWS_ARTICLES.filter((a) => !a.featured).slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-captain-text mb-4">
            {t('blog.sectionTitle') || 'ข่าวสาร & บทความ'}
          </h2>
          <p className="text-lg text-captain-muted max-w-2xl mx-auto">
            {t('blog.sectionSubtitle') ||
              'ติดตามข่าวสาร บทความ ความรู้ และกิจกรรมล่าสุดจากแบรนด์ของเรา'}
          </p>
        </motion.div>

        {/* Featured Article */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-16 md:mb-20"
          >
            <Link href={`/blog/${featured.slug}`}>
              <div className="group cursor-pointer bg-captain-light rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="relative h-64 md:h-96 overflow-hidden bg-captain-border">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Featured Content */}
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(featured.category)}`}
                      >
                        {getCategoryLabel(featured.category)}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-captain-muted">
                        <Calendar size={14} />
                        {featured.date}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-captain-text mb-4 group-hover:text-captain-primary transition-colors line-clamp-3">
                      {featured.title}
                    </h3>

                    <p className="text-lg text-captain-muted mb-8 line-clamp-3">
                      {featured.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-captain-primary font-semibold group-hover:gap-4 transition-all">
                      <span>{t('common.readMore') || 'อ่านเพิ่มเติม'}</span>
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {articles.map((article) => (
            <motion.div key={article.id} variants={itemVariants}>
              <Link href={`/blog/${article.slug}`}>
                <div className="group h-full cursor-pointer bg-white rounded-2xl overflow-hidden border border-captain-border hover:border-captain-primary shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-captain-border">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-106 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(article.category)}`}
                      >
                        {getCategoryLabel(article.category)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-captain-muted">
                        <Calendar size={12} />
                        {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-captain-text mb-2 group-hover:text-captain-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-captain-muted mb-6 flex-grow line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Read More Button */}
                    <div className="flex items-center gap-2 text-captain-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>{t('common.readMore') || 'อ่านต่อ'}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex justify-center"
        >
          <Link href="/blog">
            <button className="px-8 py-4 bg-captain-primary text-white font-semibold rounded-xl hover:bg-captain-dark transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2">
              <span>{t('blog.viewAll') || 'ดูบทความทั้งหมด'}</span>
              <ArrowRight size={20} className="group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
