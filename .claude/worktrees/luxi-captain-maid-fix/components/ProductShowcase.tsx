'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface TabContent {
  id: string;
  label: string;
  scene: string;
  features: string[];
  accentColor: string;
  accentBg: string;
}

/**
 * Interactive product showcase with tab-based product selector
 * Features scene backgrounds, floating product bottle, and animated feature list
 */
export const ProductShowcase = () => {
  const tabs: TabContent[] = [
    {
      id: 'floor',
      label: 'Floor Cleaner',
      scene: '/images/products/floor-scene.jpg',
      features: [
        'ขจัดคราบสกปรกอย่างแน่นหนา',
        'กลิ่นสดชื่นนาน',
        'ปลอดภัยสำหรับทุกประเภทพื้น',
      ],
      accentColor: '#21A85B',
      accentBg: '#E8F8EF',
    },
    {
      id: 'kitchen',
      label: 'Kitchen Spray',
      scene: '/images/products/kitchen-scene.jpg',
      features: [
        'ทำลายน้ำมันอย่างมีประสิทธิภาพ',
        'ทำให้แวว 반짝반짝',
        'สูตรปลอดภัยสำหรับอาหาร',
      ],
      accentColor: '#0057B8',
      accentBg: '#EAF5FF',
    },
    {
      id: 'bathroom',
      label: 'Bathroom Cleaner',
      scene: '/images/products/bathroom-scene.jpg',
      features: [
        'ขจัดสารสะสมบนพื้นผิว',
        'ฆ่าเชื้อแบคทีเรีย 99.9%',
        'กลิ่นสดชื่นเรื้อรัง',
      ],
      accentColor: '#063A78',
      accentBg: '#EAF5FF',
    },
    {
      id: 'multi',
      label: 'Multi-purpose',
      scene: '/images/products/multi-scene.jpg',
      features: [
        'ใช้งานได้ทั่วไปในบ้าน',
        'โซลูชั่นครบ วัตถุประสงค์เดียว',
        'ประหยัดพื้นที่เก็บของ',
      ],
      accentColor: '#FFD84D',
      accentBg: '#FFF9E6',
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab];

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cm-navy mb-4">
            ผลิตภัณฑ์เพื่อทุกห้องในบ้าน
          </h2>
          <p className="text-lg text-cm-text-secondary max-w-2xl mx-auto">
            Captain Maid มีสมาชิกครบครันเพื่อให้ทุกห้องในบ้านสะอาดและปลอดภัย
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* LEFT: Tab Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-cm-text-secondary uppercase tracking-wide mb-2">
              เลือกผลิตภัณฑ์
            </h3>
            <div className="flex flex-row lg:flex-col gap-3">
              {tabs.map((tab, idx) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 text-left whitespace-nowrap lg:whitespace-normal ${
                    activeTab === idx
                      ? 'text-white shadow-lg scale-105'
                      : 'text-cm-text-primary bg-cm-surface-light hover:bg-cm-border-soft'
                  }`}
                  style={
                    activeTab === idx
                      ? { backgroundColor: tab.accentColor }
                      : {}
                  }
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col lg:flex-row gap-12 items-center"
              >
                {/* Scene Background & Product */}
                <motion.div
                  className="flex-1 relative"
                  animate={{ rotateY: 4 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                >
                  <div
                    className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-lg"
                    style={{ backgroundColor: currentTab.accentBg }}
                  >
                    {/* Scene background with blur */}
                    <div className="absolute inset-0">
                      <Image
                        src={currentTab.scene}
                        alt={currentTab.label}
                        fill
                        className="object-cover blur-md opacity-40"
                      />
                    </div>

                    {/* Product image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="relative w-48 h-64"
                      >
                        <Image
                          src="/images/heroes/captain-maid-hero.png"
                          alt={currentTab.label}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      </motion.div>
                    </div>

                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${currentTab.accentColor}, transparent)`,
                      }}
                    />
                  </div>

                  {/* Wave animation behind product */}
                  <motion.div
                    className="absolute -inset-8 rounded-full border border-dashed opacity-20"
                    style={{ borderColor: currentTab.accentColor }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Product Info */}
                <motion.div className="flex-1 flex flex-col gap-8">
                  <div>
                    <div
                      className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-4"
                      style={{ backgroundColor: currentTab.accentColor }}
                    >
                      {currentTab.label}
                    </div>
                    <h3 className="text-3xl font-bold text-cm-navy mb-4">
                      ทำความสะอาดที่ยอดเยี่ยม
                    </h3>
                    <p className="text-lg text-cm-text-secondary leading-relaxed">
                      ผลิตภัณฑ์ของเราออกแบบมาเพื่อให้ทั่วไปและปลอดภัยสำหรับครอบครัวของคุณ
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-cm-text-primary">คุณสมบัติหลัก:</h4>
                    {currentTab.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        custom={idx}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={24}
                          className="flex-shrink-0 mt-1"
                          style={{ color: currentTab.accentColor }}
                        />
                        <span className="text-cm-text-secondary">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="lg"
                    variant="primary"
                    className="mt-4"
                    style={{ backgroundColor: currentTab.accentColor }}
                  >
                    Shop {currentTab.label}
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
