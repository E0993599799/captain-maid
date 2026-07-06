'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from './Button';

/**
 * Hero section with captain maid branded gradient background
 * Showcases main value proposition with features and CTA
 */
export const HeroEnhanced = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const features = [
    'ใช้ได้กับทุกพื้นผิว',
    'เป็นมิตรกับสัตว์เลี้ยง',
    'ปกป้องและถนอมพื้น',
    'ขจัดฝุ่นและคราบได้อย่างรวดเร็ว',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-captain-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 bg-captain-accent/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-captain-light/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Eyebrow / Label */}
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 rounded-[999px] bg-white/50 text-captain-dark font-semibold text-sm">
              {t('hero.eyebrow') || 'Trusted household care'}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-captain-text leading-tight"
          >
            เช็ดง่าย{' '}
            <span className="text-captain-primary">
              สะอาดได้ทุกคราบ
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="font-body text-lg md:text-xl text-captain-muted max-w-2xl mx-auto leading-relaxed"
          >
            Captain Maid ช่วยให้การทำความสะอาดทุกพื้นผิวเป็นเรื่องง่าย ด้วยสูตรที่ได้รับการพัฒนาเป็นพิเศษสำหรับบ้านสมัยใหม่
          </motion.p>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto py-8"
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-left p-4 rounded-[16px] bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-captain-primary flex items-center justify-center">
                  <Check size={16} className="text-white font-bold" />
                </div>
                <span className="text-captain-text font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 pt-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-captain-accent to-captain-primary flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="text-sm text-captain-muted">
                <span className="font-semibold text-captain-text">2,500+</span> ลูกค้าที่มีความสุข
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-captain-primary text-lg">★</span>
              ))}
              <span className="ml-2 text-sm text-captain-muted">
                4.9/5 จากการรีวิว 500+ รายการ
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <Button size="lg" variant="primary">
              {t('hero.cta1') || 'Shop Now'}
            </Button>
            <Button size="lg" variant="secondary">
              {t('hero.cta2') || 'Learn More'}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-captain-muted"
        >
          <span className="text-sm font-medium">เลื่อนเพื่อสำรวจเพิ่มเติม</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};

// Helper function for translations (for now)
function t(key: string): string {
  const translations: Record<string, string> = {
    'hero.eyebrow': 'ดูแลบ้านอย่างไว้วางใจได้',
    'hero.cta1': 'ดูสินค้า',
    'hero.cta2': 'เรียนรู้เพิ่มเติม',
  };
  return translations[key] || '';
}
