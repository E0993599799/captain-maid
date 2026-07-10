'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { Sparkle } from './Sparkle';

/**
 * Redesigned hero section with UXCam-inspired design
 * Mint/sky-light gradient background with floating product bottle
 * Responsive layout: product on right (desktop), top (mobile)
 */
export const HeroEnhancedV2 = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const proofBadges = [
    '99.9% ขจัดเชื้อแบคทีเรีย',
    'กลิ่นสดชื่น',
    'ปลอดภัยทุกพื้นผิว',
    'ปลอดภัยสำหรับสัตว์เลี้ยง',
  ];

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-16 sm:px-6 lg:px-8 md:py-24 hero-gradient flex items-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isLoaded && (
          <>
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute top-10 right-10 h-64 w-64 rounded-full bg-cm-fresh-green/15 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
              transition={{ duration: 14, repeat: Infinity }}
              className="absolute bottom-20 left-5 h-72 w-72 rounded-full bg-cm-primary-blue/10 blur-3xl"
            />
          </>
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex w-full flex-col items-center md:hidden"
        >
          <div className="relative h-96 w-full max-w-xs">
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-cm-border-soft bg-cm-sky-light/30 backdrop-blur-sm">
              <img
                src="/images/heroes/captain-maid-hero.png"
                alt="Captain Maid Product"
                className="h-full w-full animate-float object-contain object-center p-4"
              />
            </div>
            <div className="absolute -top-4 -right-4 text-cm-sparkle">
              <Sparkle size={32} delay={100} />
            </div>
            <div className="absolute -bottom-2 -left-2 text-cm-fresh-green">
              <Sparkle size={24} delay={300} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="flex flex-col gap-8 py-8 md:py-0"
          >
            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl font-bold leading-tight text-cm-navy md:text-5xl lg:text-6xl"
            >
              บ้านสะอาด
              <br />
              <span className="text-cm-primary-blue">สดชื่น พร้อมดูแล</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-lg text-lg leading-relaxed text-cm-text-secondary md:text-xl"
            >
              Captain Maid ช่วยขจัดคราบสกปรกและดูแลพื้นผิวในบ้าน ให้ทุกวันของคุณสะอาด มั่นใจ และน่าอยู่มากขึ้น
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2">
              {proofBadges.map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-3 rounded-2xl border border-cm-border-soft bg-white/50 p-3 backdrop-blur-sm transition-colors duration-200 hover:bg-white/70"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-cm-fresh-green">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-cm-text-primary">{badge}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="-space-x-3 flex">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-cm-primary-blue to-cm-fresh-green text-xs font-semibold text-white"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-cm-text-secondary">
                  <span className="font-semibold text-cm-navy">2,500+</span> ลูกค้าที่พึงพอใจ
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl text-cm-primary-blue">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-cm-text-secondary">4.9/5 จาก 500+ รีวิว</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button size="lg" variant="primary" className="cta-gradient">
                Shop Now
              </Button>
              <Button size="lg" variant="secondary">
                Explore Products
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden min-h-[600px] items-center justify-center md:flex"
          >
            <div className="relative h-full w-full max-w-sm">
              <div className="absolute inset-0 product-glow rounded-full" />
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-cm-border-soft bg-cm-sky-light/40 p-8 backdrop-blur-sm">
                <img
                  src="/images/heroes/captain-maid-hero.png"
                  alt="Captain Maid Product"
                  className="h-full w-full animate-float object-contain p-8"
                />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -right-8 text-cm-sparkle"
              >
                <Sparkle size={40} delay={0} />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-4 left-1/4 text-cm-fresh-green"
              >
                <Sparkle size={32} delay={200} />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 -right-6 text-cm-primary-blue"
              >
                <Sparkle size={28} delay={400} />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cm-text-secondary lg:flex"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};
