'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from './Button';

/**
 * Hero section with captain maid branded gradient background
 * Character on left (desktop), content on right
 * Mobile: character on top, content below
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
    'Eliminates 99.9% of germs',
    'Nature-derived ingredients',
    'Safe for kids & pets',
    'Eco-friendly formula',
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f8ff] via-white to-[#e8f4ff] min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 bg-[#90d0f0]/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-[#b0d0f0]/30 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Mobile: Character on top */}
        <div className="md:hidden mb-8 w-full flex justify-center">
          <div className="relative w-full max-w-sm h-80">
            <Image
              src="/images/heroes/captain-maid-hero.png"
              alt="Captain Maid Hero Character"
              fill
              className="object-contain object-bottom"
              priority
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
              <Image
                src="/images/heroes/captain-maid-hero.png"
                alt="Captain Maid Hero Character"
                fill
                className="object-contain object-bottom"
                priority
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
              className="font-display text-h1 md:text-[54px] font-bold text-[#001360] leading-tight"
            >
              Made for Easy{' '}
              <span className="text-[#02a6e3]">
                Home Cleaning
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-body md:text-h4 text-[#506090]"
            >
              Better Living, Taken Care of by Captain Maid. Premium cleaning products made from nature-derived ingredients.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
            >
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-left p-3 rounded-lg bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#02a6e3] flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-[#001360] font-medium text-sm">{feature}</span>
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
                      className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-[#90d0f0] to-[#02a6e3] flex items-center justify-center text-white font-semibold text-sm"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-[#506090]">
                  <span className="font-semibold text-[#001360]">2,500+</span> Happy Customers
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#02a6e3] text-lg">★</span>
                ))}
                <span className="ml-2 text-sm text-[#506090]">
                  4.9/5 from 500+ reviews
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button size="lg" variant="primary">
                Shop Now
              </Button>
              <Button size="lg" variant="secondary">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[#506090]"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};