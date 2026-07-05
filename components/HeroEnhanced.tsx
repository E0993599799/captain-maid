'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from './Button';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl"
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
          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-h1 md:text-h1 font-bold text-slate-900 dark:text-white leading-tight">
            Made for Easy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-400 dark:to-blue-400">
              Home Cleaning
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={itemVariants} className="text-body md:text-h4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Better Living, Taken Care of by Captain Maid. Premium cleaning products made from nature-derived ingredients.
          </motion.p>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto py-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-left p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check size={16} className="text-white" />
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center text-white font-semibold text-sm"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">2,500+</span> Happy Customers
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                4.9/5 from 500+ reviews
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" variant="primary">
              Shop Now
            </Button>
            <Button size="lg" variant="secondary">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};
