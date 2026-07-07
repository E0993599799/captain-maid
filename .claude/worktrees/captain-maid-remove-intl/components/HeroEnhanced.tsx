'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './Button';

export default function HeroEnhanced() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 dark:bg-teal-900 rounded-full blur-3xl"
      />

      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex items-center justify-center"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Premium Natural Products
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight"
            >
              Clean Better,{' '}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">
                Live Better
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-xl"
            >
              Premium home cleaning products made from natural, eco-friendly ingredients. Powerful cleaning without harmful chemicals.
            </motion.p>

            {/* Features List */}
            <motion.ul
              variants={itemVariants}
              className="mb-8 space-y-3 max-w-xl"
            >
              {[
                'Eco-friendly natural ingredients',
                'Safe for kids and pets',
                'Powerful cleaning performance',
              ].map((feature, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300"
                >
                  <span className="text-2xl">✓</span>
                  <span className="text-lg">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="group"
                icon={<ArrowRight size={24} />}
              >
                Shop Now
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="border-2"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700"
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 font-semibold">
                Trusted by 50,000+ happy customers
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white dark:border-neutral-800"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                    Average 4.9/5 stars
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 lg:h-full flex items-center justify-center order-1 lg:order-2"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-64 h-64 lg:w-full lg:h-full max-w-md"
            >
              {/* Hero Image Placeholder */}
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="text-9xl opacity-20"
                >
                  🧹
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    x: [-30, 30, -30],
                    y: [-20, 20, -20],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-10 right-10 text-6xl"
                >
                  ✨
                </motion.div>
                <motion.div
                  animate={{
                    x: [30, -30, 30],
                    y: [20, -20, 20],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute bottom-10 left-10 text-6xl"
                >
                  🌿
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-teal-600 dark:border-teal-400 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-teal-600 dark:bg-teal-400 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
