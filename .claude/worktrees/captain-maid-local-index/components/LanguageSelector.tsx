'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LanguageSelector = () => {
  const [lang, setLang] = useState<'en' | 'th'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as 'en' | 'th' || 'en';
    setLang(savedLang);
    document.documentElement.lang = savedLang;
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'th' : 'en';
    setLang(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    window.location.reload();
  };

  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="fixed top-24 right-6 z-40 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
      title={lang === 'en' ? 'Switch to Thai' : 'Switch to English'}
    >
      {lang === 'en' ? (
        <>
          <span>EN</span>
          <span className="text-sm">→ TH</span>
        </>
      ) : (
        <>
          <span>TH</span>
          <span className="text-sm">→ EN</span>
        </>
      )}
    </motion.button>
  );
};
