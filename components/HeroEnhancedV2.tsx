'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

  // Stagger animation for text content
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
    'ปลอดภัยสำหรับสัตว์ลูกเลี้ยง',
  ];

  return (
    <section className="relative min-h-screen py-16 md:py-24 overflow-hidden px-4 sm:px-6 lg:px-8 hero-gradient flex items-center">
      {/* Animated background glow circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isLoaded && (
          <>
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute top-10 right-10 w-64 h-64 bg-cm-fresh-green/15 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
              transition={{ duration: 14, repeat: Infinity }}
              className="absolute bottom-20 left-5 w-72 h-72 bg-cm-primary-blue/10 rounded-full blur-3xl"
            />
          </>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Mobile: Product on top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:hidden mb-8 w-full flex flex-col items-center"
        >
          <div className="relative w-full max-w-xs h-96">
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-cm-sky-light/30 backdrop-blur-sm border border-cm-border-soft">
              <Image
                src="/images/heroes/captain-maid-hero.png"
                alt="Captain Maid Product"
                fill
                className="object-contain object-center p-4 animate-float"
                priority
              />
            </div>
            {/* Floating sparkles */}
            <div className="absolute -top-4 -right-4 text-cm-sparkle">
              <Sparkle size={32} delay={100} />
            </div>
            <div className="absolute -bottom-2 -left-2 text-cm-fresh-green">
              <Sparkle size={24} delay={300} />
            </div>
          </div>
        </motion.div>

        {/* Desktop & Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="flex flex-col gap-8 py-8 md:py-0"
          >
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cm-navy leading-tight"
            >
              บ้านสะอาด
              <br />
              <span className="text-cm-primary-blue">สดชื่น พร้อมดูแล</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-cm-text-secondary leading-relaxed max-w-lg"
            >
              Captain Maid ช่วยขจัดคราบสกปรกและดูแลพื้นผิวในบ้าน ให้ทุกวันของคุณสะอาด มั่นใจ และน่าอยู่มากขึ้น
            </motion.p>

            {/* Proof Badges */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4"
            >
              {proofBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-cm-border-soft hover:bg-white/70 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cm-fresh-green flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-cm-text-primary">{badge}</span>
                </div>
              ))}
            </motion.div>

            {/* Social Proof & Rating */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 pt-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-cm-primary-blue to-cm-fresh-green flex items-center justify-center text-white font-semibold text-xs"
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
                  <span key={i} className="text-cm-primary-blue text-xl">
                    ★
                  </span>
                ))}
                <span className="ml-2 text-sm text-cm-text-secondary">
                  4.9/5 จาก 500+ รีวิว
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button size="lg" variant="primary" className="cta-gradient">
                Shop Now
              </Button>
              <Button size="lg" variant="secondary">
                Explore Products
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Product Visual (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex relative h-full min-h-[600px] items-center justify-center"
          >
            <div className="relative w-full h-full max-w-sm">
              {/* Glow background */}
              <div className="absolute inset-0 product-glow rounded-full" />

              {/* Product container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-cm-sky-light/40 backdrop-blur-sm border border-cm-border-soft flex items-center justify-center p-8">
                <Image
                  src="/images/heroes/captain-maid-hero.png"
                  alt="Captain Maid Product"
                  fill
                  className="object-contain p-8 animate-float"
                  priority
                />
              </div>

              {/* Floating sparkles */}
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

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-cm-text-secondary"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
};
