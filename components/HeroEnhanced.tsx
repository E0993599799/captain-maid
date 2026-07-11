'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from './Button';

/**
 * Hero section with captain maid branded gradient background
 * Character on left (desktop), content on right
 * Mobile: character on top, content below
 */
export const HeroEnhanced = () => {
  const t = useTranslations();

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
    { titleKey: 'features.items.natural.title', descKey: 'features.items.natural.description' },
    { titleKey: 'features.items.powerful.title', descKey: 'features.items.powerful.description' },
    { titleKey: 'features.items.safe.title', descKey: 'features.items.safe.description' },
    { titleKey: 'features.items.sustainable.title', descKey: 'features.items.sustainable.description' },
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0066CC] via-[#0080FF] to-[#00AAFF] min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Mobile: Character on top */}
        <div className="md:hidden mb-8 w-full flex justify-center">
          <div className="relative w-full max-w-sm h-80">
            <img
              src="/images/heroes/captain-maid-hero.png"
              alt="Captain Maid Hero Character"
              className="h-full w-full object-contain object-bottom"
            />
          </div>
        </div>

        {/* Desktop & Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[500px] md:min-h-[600px]">
          {/* LEFT: Character (hidden on mobile) */}
          <motion.div
            variants={itemVariants}
            className="hidden md:flex relative h-full min-h-[500px] md:min-h-[600px] items-end justify-center"
          >
            <div className="relative w-full h-full max-w-md">
              <img
                src="/images/heroes/captain-maid-hero.png"
                alt="Captain Maid Hero Character"
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 py-8 md:py-0"
          >
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-h1 md:text-[54px] font-bold text-white leading-tight"
            >
              {t('hero.mainHeading')}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-body md:text-h4 text-white/90"
            >
              {t('hero.subHeading')}
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
            >
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-left p-3 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors border border-white/30"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-[#0066CC]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">{t(feature.titleKey)}</span>
                    <span className="text-white/80 text-xs">{t(feature.descKey)}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 pt-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white font-semibold text-sm"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-white/90">
                  <span className="font-semibold text-white">2,500+</span> {t('common.happyCustomers') || 'Happy Customers'}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-300 text-lg">★</span>
                ))}
                <span className="ml-2 text-sm text-white/90">
                  4.9/5 {t('common.fromReviews') || 'from'} 500+ {t('common.reviews') || 'reviews'}
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button size="lg" variant="primary">
                {t('hero.ctaPrimary')}
              </Button>
              <Button size="lg" variant="secondary">
                {t('hero.ctaSecondary')}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/80"
        >
          <span className="text-sm font-medium">{t('common.scrollToExplore') || 'Scroll to explore'}</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};