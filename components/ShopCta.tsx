'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Lock, Gift } from 'lucide-react';
import { Button } from './Button';

export const ShopCTA = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'ส่งไว',
      description: 'สั่งซื้อผ่านช่องทางหลักได้ทันที',
    },
    {
      icon: Lock,
      title: 'จ่ายปลอดภัย',
      description: 'รองรับช่องทางชำระเงินมาตรฐาน',
    },
    {
      icon: Gift,
      title: 'มีโปรฯ',
      description: 'ดีลพิเศษและเซ็ตแนะนำ',
    },
    {
      icon: ShoppingCart,
      title: 'สั่งง่าย',
      description: 'พาไปหน้าสินค้าและจุดซื้อ',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#02a6e3] via-[#0090c8] to-[#1070b0] md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white mb-12 md:mb-16"
        >
          <h2 className="text-h2 md:text-h1 font-bold mb-4">
            Ready to Clean Smarter?
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90 mb-8">
            Join thousands of happy customers who have switched to Captain Maid. Experience the difference of natural, effective cleaning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="primary"
              className="bg-white text-[#001360] hover:bg-white/90 border-0"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30 border-2 border-white"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Icon size={32} className="text-emerald-300 mb-3" />
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-white/80 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Retail Partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-white/80 mb-6">Also available at:</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {[
              { name: 'Shopee', img: '/assets/Shopee.svg', link: 'https://shopee.co.th/captainmaid' },
              { name: 'Lazada', img: '/assets/Lazada_(2019).svg', link: 'https://www.lazada.co.th/shop/captainmaid' },
              { name: 'TikTok Shop', img: '/assets/TikTok_logo.svg', link: 'https://www.tiktok.com/@captainmaid' },
              { name: 'HomePro', img: '/assets/homepro.svg', link: 'https://www.homepro.co.th/captainmaid' },
            ].map((partner, idx) => (
              <a
                key={idx}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
