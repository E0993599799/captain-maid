'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Link } from '@/lib/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Bath,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChefHat,
  Leaf,
  Package,
  ShieldCheck,
  Shirt,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import logoMark from './assets/captain-maid-logo.webp';

// Slide 1: Brand Hero - Responsive Images
import slide1Mobile from './assets/landing/01_Brand-Hero_Mobile.png';
import slide1Tablet from './assets/landing/01_Brand-Hero_Tablet.png';
import slide1Desktop from './assets/landing/01_Brand-Hero_Desktop.png';

// Slide 2: Product Range - Responsive Images
import slide2Mobile from './assets/landing/02_Product-Range_Mobile.png';
import slide2Tablet from './assets/landing/02_Product-Range_Tablet.png';
import slide2Desktop from './assets/landing/02_Product-Range_Desktop.png';

// Slide 3: Family and Pet Safety - Responsive Images
import slide3Mobile from './assets/landing/03_Family-and-Pet-Safety_Mobile.png';
import slide3Tablet from './assets/landing/03_Family-and-Pet-Safety_Tablet.png';
import slide3Desktop from './assets/landing/03_Family-and-Pet-Safety_Desktop.png';

// Slide 4: Natural Cleaning Technology - Responsive Images
import slide4Mobile from './assets/landing/04_Natural-Cleaning-Technology_Mobile.png';
import slide4Tablet from './assets/landing/04_Natural-Cleaning-Technology_Tablet.png';
import slide4Desktop from './assets/landing/04_Natural-Cleaning-Technology_Desktop.png';

// Slide 5: Trust and Call to Action - Responsive Images
import slide5Mobile from './assets/landing/05_Trust-and-Call-to-Action_Mobile.png';
import slide5Tablet from './assets/landing/05_Trust-and-Call-to-Action_Tablet.png';
import slide5Desktop from './assets/landing/05_Trust-and-Call-to-Action_Desktop.png';

import greenBottle from './assets/green-bottle.jpg';
import pinkBottle from './assets/pink-bottle.jpg';
import purpleBottle from './assets/purple-bottle.jpg';

const iconMap = {
  ChefHat,
  Bath,
  Sparkles,
  Shirt,
  Package,
};

type IconKey = keyof typeof iconMap;

const getSlideAltText = (slideKey: string, breakpoint: string): string => {
  const alts: Record<string, string> = {
    intro: 'Captain Maid Brand Hero - Made for Easy Home Cleaning with Natural Power - shows mascot and headline',
    range: 'Captain Maid Product Range - Multi-Purpose Cleaners for Kitchen, Bathroom, Floor, Laundry, and Multi-Purpose use',
    lifestyle: 'Captain Maid Family and Pet Safety - Mother, child, and dog in clean, bright home environment with natural cleaning products',
    technology: 'Captain Maid Natural Cleaning Technology - Water splash, molecular structure, and leaf representing eco-friendly scientific approach',
    trust: 'Captain Maid Trust and Safety Badges - Certified quality tested, eco-friendly, trusted brand with mascot endorsement',
  };
  return `${alts[slideKey]} (${breakpoint} view)`;
};

export function CaptainMaidLandingPage() {
  const t = useTranslations('landingPage');
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = useMemo(
    () => [
      {
        key: 'intro',
        tone: 'from-[#073E91] via-[#1764BA] to-white',
        image: { mobile: slide1Mobile, tablet: slide1Tablet, desktop: slide1Desktop }
      },
      {
        key: 'range',
        tone: 'from-white via-[#F7FBFF] to-[#DCEEFF]',
        image: { mobile: slide2Mobile, tablet: slide2Tablet, desktop: slide2Desktop }
      },
      {
        key: 'lifestyle',
        tone: 'from-[#FFFDF8] via-white to-[#EAF4FF]',
        image: { mobile: slide3Mobile, tablet: slide3Tablet, desktop: slide3Desktop }
      },
      {
        key: 'technology',
        tone: 'from-[#043E91] via-[#0869BE] to-[#EAF4FF]',
        image: { mobile: slide4Mobile, tablet: slide4Tablet, desktop: slide4Desktop }
      },
      {
        key: 'trust',
        tone: 'from-[#EAF4FF] via-white to-[#F6FBFF]',
        image: { mobile: slide5Mobile, tablet: slide5Tablet, desktop: slide5Desktop }
      },
    ],
    [],
  );

  useEffect(() => {
    if (shouldReduceMotion || paused) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, shouldReduceMotion, slides.length]);

  const productCards = [
    {
      image: greenBottle,
      title: 'Tea Tree Flash',
      category: 'Floor Cleaner',
      price: 299,
      priceUSD: 8.99,
      rating: 4.8,
      reviewCount: 156,
      description: locale === 'th'
        ? 'ภาพแพ็กเกจสีเขียวสำหรับงานดูแลพื้นและความสดชื่นในบ้าน'
        : 'Green packaging for floor care and a fresh home-cleaning story.',
    },
    {
      image: pinkBottle,
      title: 'Floral Passionate',
      category: 'Multi-Purpose',
      price: 349,
      priceUSD: 9.99,
      rating: 4.9,
      reviewCount: 243,
      description: locale === 'th'
        ? 'ภาพแพ็กเกจโทนชมพูสำหรับบรรยากาศหอมละมุนและสะอาดทุกวัน'
        : 'Pink packaging for a softer fragrance-led daily cleaning story.',
    },
    {
      image: purpleBottle,
      title: 'Lavender Kerry',
      category: 'Bathroom Cleaner',
      price: 399,
      priceUSD: 11.99,
      rating: 4.7,
      reviewCount: 189,
      description: locale === 'th'
        ? 'ภาพแพ็กเกจโทนม่วงสำหรับความผ่อนคลายที่ยังคงความพรีเมียม'
        : 'Purple packaging for a calm, premium cleaning presence.',
    },
  ];

  const current = slides[activeSlide];

  // Retrieve raw lists for array mappings from localized JSON configuration safely
  const categoriesList = useMemo(() => [
    { label: locale === 'th' ? 'ครัว' : 'Kitchen', icon: ChefHat },
    { label: locale === 'th' ? 'ห้องน้ำ' : 'Bathroom', icon: Bath },
    { label: locale === 'th' ? 'พื้น' : 'Floor', icon: Sparkles },
    { label: locale === 'th' ? 'ซักผ้า' : 'Laundry', icon: Shirt },
    { label: locale === 'th' ? 'อเนกประสงค์' : 'Multi-Purpose', icon: Package },
  ], [locale]);

  const slide3Bullets = useMemo(() => t.raw('slides.slide3.bullets') as string[], [t]);
  const slide4Bullets = useMemo(() => t.raw('slides.slide4.bullets') as string[], [t]);
  const slide5Badges = useMemo(() => t.raw('slides.slide5.badges') as { label: string; key: string }[], [t]);
  const solutionsCards = useMemo(() => t.raw('solutions.cards') as { title: string; description: string }[], [t]);
  const faqItems = useMemo(() => t.raw('faq.items') as { q: string; a: string }[], [t]);

  const solutionsIconKeys: IconKey[] = ['ChefHat', 'Bath', 'Sparkles', 'Shirt', 'Package'];

  return (
    <div className="min-h-screen bg-[#F4F8FF]">
      {/* Dynamic Navigation */}
      <nav className="sticky top-0 z-50 border-b border-cm-border-soft bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-cm-navy">
                Captain Maid
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-cm-text">
              <a href="#solutions" className="transition hover:text-cm-primary-blue">{t('header.solutions')}</a>
              <a href="#products" className="transition hover:text-cm-primary-blue">{t('header.products')}</a>
              <a href="#trust" className="transition hover:text-cm-primary-blue">{t('header.trust')}</a>
              <a href="#faq" className="transition hover:text-cm-primary-blue">{t('header.faq')}</a>
            </div>
            <Link href="/products" className="rounded-full bg-cm-primary-blue px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-cm-primary-blue/15 hover:bg-cm-navy active:scale-95 transition-all">
              {t('header.ctaButton')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Five-Slide Responsive Hero Carousel Section */}
      <section id="hero" className="mx-auto w-full max-w-7xl px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div
          className={`relative overflow-hidden rounded-[36px] border border-white/60 bg-gradient-to-br ${current.tone} shadow-[0_24px_70px_rgba(10,86,194,0.08)] h-[360px] sm:h-[480px] lg:h-[580px]`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Native Art Direction: 3 separate containers for Mobile, Tablet, and Desktop */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            {/* Mobile View */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src={current.image.mobile}
                alt={getSlideAltText(current.key, 'mobile')}
                fill
                priority={activeSlide === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            {/* Tablet View */}
            <div className="hidden md:block xl:hidden absolute inset-0">
              <Image
                src={current.image.tablet}
                alt={getSlideAltText(current.key, 'tablet')}
                fill
                priority={activeSlide === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            {/* Desktop View */}
            <div className="hidden xl:block absolute inset-0">
              <Image
                src={current.image.desktop}
                alt={getSlideAltText(current.key, 'desktop')}
                fill
                priority={activeSlide === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            {/* Overlays for text contrast */}
            {current.key === 'intro' && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#000]/30 via-[#000]/20 to-[#000]/40 z-1" />
            )}
            {current.key === 'technology' && (
              <div className="absolute inset-0 bg-[#043E91]/15 z-1" />
            )}
          </div>

          {/* HTML Overlay with precise Tailwind Responsive Safe Areas */}
          {/* SLIDE 1 — BRAND HERO */}
          {current.key === 'intro' && (
            <div className="absolute z-10 select-none overflow-visible left-[7%] top-[35%] w-[58%] h-[55%] md:left-[5%] md:top-[16%] md:w-[43%] md:h-[68%] xl:left-[4%] xl:top-[18%] xl:w-[44%] xl:h-[66%] flex flex-col justify-center text-left">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${current.key}-intro`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
                  className="flex flex-col items-start justify-center gap-4 sm:gap-6 lg:gap-8 h-full"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Image
                      src={logoMark}
                      alt="Captain Maid logo"
                      width={80}
                      height={80}
                      className="h-14 sm:h-16 lg:h-18 w-auto object-contain"
                    />
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-heading text-white leading-[0.98] tracking-[-0.03em] whitespace-pre-line drop-shadow-[0_3px_8px_rgba(0,40,110,.22)] [-webkit-text-stroke:4px_#0D4EA6] [paint-order:stroke_fill]">
                    {t('slides.slide1.headline')}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed font-semibold whitespace-pre-line drop-shadow-[0_3px_8px_rgba(0,40,110,.22)]">
                    {t('slides.slide1.supporting')}
                  </p>
                  <Link href="/about" className="rounded-full bg-[#0D4EA6] px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(13,78,166,0.24)] active:scale-95 shadow-[0_12px_24px_rgba(13,78,166,0.18)] mt-2 sm:mt-4">
                    {t('slides.slide1.cta')}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* SLIDE 2 — PRODUCT RANGE */}
          {current.key === 'range' && (
            <div className="absolute z-10 select-none overflow-visible left-[7%] top-[5%] w-[86%] h-[28%] md:left-[13%] md:top-[7%] md:w-[78%] md:h-[38%] xl:left-[16%] xl:top-[7%] xl:w-[78%] xl:h-[36%] flex flex-col justify-center text-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${current.key}-range`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-start gap-4 sm:gap-6 text-center h-full max-w-4xl mx-auto pt-2 sm:pt-4"
                >
                  <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-white leading-[0.98] tracking-[-0.03em] whitespace-normal sm:whitespace-pre-line drop-shadow-[0_3px_8px_rgba(0,40,110,.22)] [-webkit-text-stroke:4px_#0D4EA6] [paint-order:stroke_fill]">
                    {t('slides.slide2.headline')}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-sm sm:max-w-2xl mx-auto">
                    {categoriesList.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <div key={idx} className="flex flex-col items-center gap-1.5 p-1.5 bg-white/95 border border-[#D7E7FB] rounded-[20px] shadow-[0_12px_28px_rgba(10,86,194,0.10)] min-w-[50px] sm:min-w-[68px] md:min-w-[90px] backdrop-blur-sm">
                          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-white text-[#0D4EA6] border border-[#D7E7FB]">
                            <Icon size={18} strokeWidth={2} />
                          </div>
                          <span className="text-[9px] sm:text-[11px] font-bold text-[#173B68] whitespace-nowrap">
                            {cat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* SLIDE 3 — LIFESTYLE / FAMILY AND PET SAFETY */}
          {current.key === 'lifestyle' && (
            <div className="absolute z-10 select-none overflow-visible left-[8%] top-[5%] w-[84%] h-[34%] md:left-[4%] md:top-[9%] md:w-[44%] md:h-[42%] xl:left-[6%] xl:top-[10%] xl:w-[43%] xl:h-[43%] flex flex-col justify-center text-left">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${current.key}-lifestyle`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
                  className="flex flex-col items-start justify-center gap-4 sm:gap-5 lg:gap-7 h-full"
                >
                  <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-white leading-[0.98] tracking-[-0.03em] whitespace-pre-line drop-shadow-[0_3px_8px_rgba(0,40,110,.22)] [-webkit-text-stroke:4px_#0D4EA6] [paint-order:stroke_fill]">
                    {t('slides.slide3.headline')}
                  </h2>
                  <ul className="space-y-2 sm:space-y-3 mt-1 sm:mt-2">
                    {slide3Bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-base lg:text-lg font-bold text-white leading-tight drop-shadow-[0_3px_8px_rgba(0,40,110,.22)]">
                        <span className="flex h-5 w-5 sm:h-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-white text-[#0D4EA6] flex-shrink-0 shadow-[0_8px_18px_rgba(10,86,194,0.08)]">
                          <CheckCircle2 size={16} strokeWidth={2.2} />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* SLIDE 4 — NATURAL CLEANING TECHNOLOGY */}
          {current.key === 'technology' && (
            <div className="absolute z-10 select-none overflow-visible left-[8%] top-[5%] w-[84%] h-[31%] md:left-[7%] md:top-[9%] md:w-[53%] md:h-[42%] xl:left-[6%] xl:top-[10%] xl:w-[50%] xl:h-[43%] flex flex-col justify-center text-left">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${current.key}-tech`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
                  className="flex flex-col items-start justify-center gap-3 sm:gap-5 lg:gap-7 h-full"
                >
                  <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-white leading-[0.98] tracking-[-0.03em] whitespace-pre-line drop-shadow-[0_3px_8px_rgba(0,40,110,.22)] [-webkit-text-stroke:4px_#0D4EA6] [paint-order:stroke_fill]">
                    {t('slides.slide4.headline')}
                  </h2>
                  <p className="text-xs sm:text-base text-white leading-relaxed font-semibold drop-shadow-[0_3px_8px_rgba(0,40,110,.22)]">
                    {t('slides.slide4.supporting')}
                  </p>
                  <ul className="space-y-2 sm:space-y-3 mt-1 sm:mt-2">
                    {slide4Bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-base lg:text-lg font-bold text-white leading-tight drop-shadow-[0_3px_8px_rgba(0,40,110,.22)]">
                        <span className="flex h-5 w-5 sm:h-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-white text-[#0D4EA6] flex-shrink-0 shadow-[0_8px_18px_rgba(10,86,194,0.08)]">
                          <Leaf size={16} strokeWidth={2.2} />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* SLIDE 5 — TRUST / CALL TO ACTION */}
          {current.key === 'trust' && (
            <div className="absolute z-10 select-none overflow-visible left-[7%] top-[5%] w-[55%] h-[67%] md:left-[5%] md:top-[9%] md:w-[49%] md:h-[79%] xl:left-[5%] xl:top-[10%] xl:w-[48%] xl:h-[76%] flex flex-col justify-center text-left">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${current.key}-trust`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
                  className="flex flex-col items-start justify-center gap-4 sm:gap-5 w-full h-full"
                >
                  <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-white leading-[0.98] tracking-[-0.03em] whitespace-pre-line drop-shadow-[0_3px_8px_rgba(0,40,110,.22)] [-webkit-text-stroke:4px_#0D4EA6] [paint-order:stroke_fill]">
                    {t('slides.slide5.headline')}
                  </h2>

                  {/* Trust point badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
                    {slide5Badges.map((badge, idx) => (
                      <div key={idx} className="flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-2 px-3 py-2 bg-white/95 border border-[#D7E7FB] rounded-[20px] shadow-[0_12px_24px_rgba(10,86,194,0.10)] backdrop-blur-sm">
                        <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-[#0D4EA6] shrink-0 border border-[#D7E7FB]">
                          {badge.key === 'derm' && <ShieldCheck size={18} className="text-[#1764BA]" />}
                          {badge.key === 'recyclable' && <Leaf size={18} className="text-[#70B52C]" />}
                          {badge.key === 'family' && <Star size={18} className="text-[#FFD84D] fill-[#FFD84D]" />}
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-[#073E91] text-left sm:text-center leading-tight">
                          {badge.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stacked CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                    <Link href="/products" className="rounded-full bg-[#0D4EA6] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all text-center hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(13,78,166,0.22)] active:scale-95 shadow-[0_12px_24px_rgba(13,78,166,0.18)]">
                      {t('slides.slide5.ctaPrimary')}
                    </Link>
                    <Link href="/contact" className="rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0D4EA6] transition-all text-center border border-[#D7E7FB] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(10,86,194,0.10)] active:scale-95 shadow-[0_10px_18px_rgba(10,86,194,0.08)]">
                      {t('slides.slide5.ctaSecondary')}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Interactive Navigation Elements */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/25 active:scale-90 shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
              aria-label="Next slide"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/25 active:scale-90 shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-white/12 border border-white/25 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
            {slides.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeSlide ? 'w-5 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">
            {t('solutions.badge')}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
            {t('solutions.title')}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {t('solutions.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {solutionsCards.map((card, index) => {
            const IconKey = solutionsIconKeys[index % solutionsIconKeys.length];
            const Icon = iconMap[IconKey];
            
            // Determine Bento grid sizing span dynamically (marcuz-skills/11/12)
            let colSpanClass = 'lg:col-span-2';
            if (index === 0 || index === 3) {
              colSpanClass = 'lg:col-span-3';
            } else if (index === 4) {
              colSpanClass = 'lg:col-span-5 flex flex-col md:flex-row md:items-center md:gap-8';
            }

            return (
              <article 
                key={index} 
                className={`rounded-[28px] border border-[#D7E7FB] bg-white p-6 sm:p-8 shadow-[0_18px_40px_rgba(10,86,194,0.06)] transition hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(10,86,194,0.10)] group overflow-hidden relative ${colSpanClass}`}
              >
                {/* Visual Glow background on Hover (marcuz-skills/12) */}
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#0A56C2]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                
                <div className={`${index === 4 ? 'shrink-0' : ''}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A56C2] text-white shadow-[0_14px_28px_rgba(10,86,194,0.15)] group-hover:scale-105 transition-transform duration-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-cm-primary-blue transition-colors">
                    {card.title}
                  </h3>
                </div>
                <div className={`mt-2 ${index === 4 ? 'md:mt-0 flex-1' : ''}`}>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                  
                  {/* Subtle link cue to make it feel premium */}
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-cm-primary-blue mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 cursor-pointer">
                    {locale === 'th' ? 'เรียนรู้เพิ่มเติม' : 'Learn more'} →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Products Spotlight Section */}
      <section id="products" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">
              {t('products.badge')}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
              {t('products.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {productCards.map((product) => (
              <article key={product.title} className="overflow-hidden rounded-[32px] border border-[#D7E7FB] bg-gradient-to-br from-[#F8FBFF] to-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
                <div className="relative flex min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[380px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(10,86,194,0.1),transparent_52%)] px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
                  <Image src={product.image} alt={`${product.title} Captain Maid package`} width={420} height={420} className="h-auto w-[160px] sm:w-[180px] md:w-[220px] lg:w-[240px] object-contain drop-shadow-[0_20px_40px_rgba(10,86,194,0.16)]" />
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0A56C2] mb-2">
                        {product.category}
                      </span>
                      <h3 className="text-2xl font-semibold text-slate-900">{product.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">{product.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0A56C2]">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-[#0A56C2] text-[#0A56C2]" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-xs">{product.rating} ({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-slate-500">{locale === 'th' ? 'ราคา' : 'Price'}</p>
                      <p className="text-lg font-bold text-slate-900">฿{product.price} <span className="text-sm text-slate-600">(${product.priceUSD})</span></p>
                    </div>
                    <button className="rounded-full bg-[#0A56C2] px-4 py-2 text-xs font-semibold text-white hover:bg-[#003C8F] transition-colors">
                      {locale === 'th' ? 'ซื้อเลย' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust and Quality Section */}
      <section id="trust" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2] shadow-[0_12px_24px_rgba(10,86,194,0.06)]">
              Trust
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl leading-tight">
              {locale === 'th' ? 'มาตรฐานความปลอดภัยสูงสุด\nเพื่อบ้านที่น่าอยู่ของคุณ' : 'Highest Safety Standards\nfor Your Happy Home'}
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              {locale === 'th'
                ? 'ผลิตภัณฑ์ของเราผ่านการวิจัยและทดสอบเพื่อให้แน่ใจในความปลอดภัยและประสิทธิภาพ ขจัดคราบและฆ่าเชื้อแบคทีเรียได้อย่างสมบูรณ์แบบ แต่อ่อนโยนต่อครอบครัวและสิ่งแวดล้อม'
                : 'Our products are researched and tested to guarantee extreme safety and effectiveness. Eliminates stains and bacteria completely while remaining safe for families and pets.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]">
                <Users size={16} className="text-[#0A56C2]" />
                {locale === 'th' ? 'แบรนด์ที่ได้รับความไว้วางใจ' : 'Trusted Brand'}
              </span>
            </div>
          </div>

          <figure className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] lg:h-[480px] overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
            {/* Responsive Art Direction for Mascot image */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src={slide5Mobile}
                alt="Captain Maid friendly mascot character in professional cleaning uniform - trusted brand ambassador"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div className="hidden sm:block lg:hidden absolute inset-0">
              <Image
                src={slide5Tablet}
                alt="Captain Maid friendly mascot character in professional cleaning uniform - trusted brand ambassador"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            <div className="hidden lg:block absolute inset-0">
              <Image
                src={slide5Desktop}
                alt="Captain Maid friendly mascot character in professional cleaning uniform - trusted brand ambassador"
                fill
                className="object-cover object-center"
                sizes="44vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent z-1" />
            <div className="absolute bottom-4 right-4 flex gap-3 z-2">
              {[
                { src: greenBottle, alt: 'Captain Maid Tea Tree Flash - green natural multi-purpose cleaner bottle' },
                { src: pinkBottle, alt: 'Captain Maid Floral Passionate - pink fragrant daily cleaner bottle' },
                { src: purpleBottle, alt: 'Captain Maid Lavender Kerry - purple premium calm cleaning bottle' },
              ].map((item, index) => (
                <div key={index} className="w-14 sm:w-16 md:w-18 lg:w-20 xl:w-24 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
                  <Image src={item.src} alt={item.alt} className="h-auto w-full object-contain" />
                </div>
              ))}
            </div>
          </figure>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">
              {t('faq.badge')}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
              {t('faq.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {faqItems.map((item, index) => (
              <article key={index} className="rounded-3xl border border-[#D7E7FB] bg-[#F8FBFF] p-6 shadow-[0_14px_30px_rgba(10,86,194,0.05)]">
                <h3 className="text-lg font-bold text-slate-900">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Conversion Card Section */}
      <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-gradient-to-br from-[#063273] to-[#1258AF] px-6 py-16 text-center shadow-[0_24px_60px_rgba(10,86,194,0.12)] sm:px-12 md:py-20">
          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl font-heading leading-tight">
              {t('cta.title')}
            </h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 w-full sm:w-auto">
              <Link href="/products" className="rounded-full bg-white px-8 py-3.5 text-sm sm:text-base font-bold text-[#0D4EA6] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(255,255,255,0.15)] active:scale-95">
                {t('cta.primary')}
              </Link>
              <Link href="/contact" className="rounded-full bg-transparent border border-white/40 px-8 py-3.5 text-sm sm:text-base font-bold text-white transition-all hover:bg-white/5 active:scale-95">
                {t('cta.secondary')}
              </Link>
            </div>
          </div>
          {/* Subtle backgrounds */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(10,86,194,0.15),transparent_60%)]" />
        </div>
      </section>

      {/* Global Footer */}
      <footer className="border-t border-cm-border-soft bg-[#003C8F] text-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4 mb-12">
            {/* Column 1: Brand Info */}
            <div className="flex flex-col gap-4">
              <span className="text-lg font-black">Captain Maid</span>
              <p className="text-sm text-white/80">
                {locale === 'th' ? 'ผลิตภัณฑ์ทำความสะอาดบ้านที่ปลอดภัยและเป็นมิตรต่อสิ่งแวดล้อม' : 'Safe and eco-friendly home cleaning products for your family.'}
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-white/60 hover:text-white transition">📱</a>
                <a href="#" className="text-white/60 hover:text-white transition">📧</a>
              </div>
            </div>

            {/* Column 2: Products */}
            <div>
              <h3 className="font-bold text-white mb-4">{locale === 'th' ? 'สินค้า' : 'Products'}</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/products?category=floor" className="hover:text-white transition">Floor Cleaner</Link></li>
                <li><Link href="/products?category=bathroom" className="hover:text-white transition">Bathroom Cleaner</Link></li>
                <li><Link href="/products?category=kitchen" className="hover:text-white transition">Kitchen Cleaner</Link></li>
                <li><Link href="/products?category=glass" className="hover:text-white transition">Glass Cleaner</Link></li>
                <li><Link href="/products?category=disinfectant" className="hover:text-white transition">Multi-purpose Disinfectant</Link></li>
                <li><Link href="/products?category=dishwasher" className="hover:text-white transition">Dishwasher</Link></li>
                <li><Link href="/products" className="hover:text-white transition font-semibold text-white">View All</Link></li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div>
              <h3 className="font-bold text-white mb-4">{locale === 'th' ? 'วิธีแก้ปัญหา' : 'Solutions'}</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#solutions" className="hover:text-white transition">Clogs & Drains</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Germs & Bacteria</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Grease & Buildup</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Hard Water Spots</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Limescale</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Odour & Freshness</a></li>
              </ul>
            </div>

            {/* Column 4: Support & Legal */}
            <div>
              <h3 className="font-bold text-white mb-4">{locale === 'th' ? 'ช่วยเหลือ' : 'Support'}</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href={`/${locale}/about`} className="hover:text-white transition">{locale === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-white transition">{locale === 'th' ? 'ติดต่อ' : 'Contact'}</Link></li>
                <li><Link href={`/${locale}/blog`} className="hover:text-white transition">{locale === 'th' ? 'บล็อก' : 'Blog'}</Link></li>
                <li><Link href={`/${locale}/faq`} className="hover:text-white transition">{locale === 'th' ? 'FAQ' : 'FAQ'}</Link></li>
                <li className="pt-2 border-t border-white/20">
                  <a href="#" className="hover:text-white transition text-xs">{locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition text-xs">{locale === 'th' ? 'เงื่อนไขการใช้' : 'Terms of Service'}</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
