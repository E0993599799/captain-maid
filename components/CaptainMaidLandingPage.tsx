'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Link } from '@/lib/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
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
import { useLocale } from 'next-intl';
import { site } from '@/data/site';

import logoMark from './assets/logo-captainmaid.png';

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

type LocaleKey = 'en' | 'th';

type Copy = {
  header: {
    solutions: string;
    products: string;
    trust: string;
    faq: string;
    ctaButton: string;
  };
  slides: {
    slide1: {
      headline: string;
      supporting: string;
      cta: string;
    };
    slide2: {
      headline: string;
      categories: { label: string; icon: typeof ChefHat }[];
    };
    slide3: {
      headline: string;
      bullets: string[];
    };
    slide4: {
      headline: string;
      supporting: string;
      bullets: string[];
    };
    slide5: {
      headline: string;
      badges: { label: string; key: string }[];
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };
  solutions: {
    badge: string;
    title: string;
    subtitle: string;
    cards: { title: string; icon: typeof ChefHat; description: string }[];
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
};

const COPY: Record<LocaleKey, Copy> = {
  en: {
    header: {
      solutions: 'Solutions',
      products: 'Products',
      trust: 'Trust',
      faq: 'FAQ',
      ctaButton: 'Shop Now',
    },
    slides: {
      slide1: {
        headline: 'Made for Easy\nHome Cleaning',
        supporting: 'Better Living, Taken Care of\nby Captain Maid.',
        cta: 'Learn More',
      },
      slide2: {
        headline: 'Complete Cleaning Solutions\nfor Every Corner of Your Home',
        categories: [
          { label: 'Kitchen', icon: ChefHat },
          { label: 'Bathroom', icon: Bath },
          { label: 'Floor', icon: Sparkles },
          { label: 'Laundry', icon: Shirt },
          { label: 'Multi-Purpose', icon: Package },
        ],
      },
      slide3: {
        headline: 'Safe for Your Family\nEveryday Comfort',
        bullets: ['Safe for Kids', 'Safe for Pets', 'Gentle & Effective'],
      },
      slide4: {
        headline: 'Advanced Cleaning\nwith Natural Power',
        supporting: 'From tackling heavy stains to solving clogged drains, Captain Maid is ready to care for your home.',
        bullets: ['Natural-Derived Ingredients', 'Deep Clean Technology', 'Surface Protection'],
      },
      slide5: {
        headline: 'Trusted Quality\nYou Can Count On',
        badges: [
          { label: 'Made in Thailand', key: 'flag' },
          { label: 'Quality Tested', key: 'tested' },
          { label: 'Eco Friendly', key: 'eco' },
          { label: 'Trusted Brand', key: 'trusted' },
        ],
        ctaPrimary: 'Shop Now',
        ctaSecondary: 'Become Distributor',
      },
    },
    solutions: {
      badge: 'Solutions',
      title: 'Complete Cleaning Solutions for Every Corner of Your Home',
      subtitle: 'Built for the spaces and tasks that matter most: cooking, bathing, floors, laundry, and daily multi-purpose care.',
      cards: [
        { title: 'Kitchen', icon: ChefHat, description: 'For grease, wipe-downs, and fast daily refreshes.' },
        { title: 'Bathroom', icon: Bath, description: 'For soap scum, shine, and calm spotless routines.' },
        { title: 'Floor', icon: Sparkles, description: 'For smooth, quick-drying floor care across the home.' },
        { title: 'Laundry', icon: Shirt, description: 'For fresh, clean fabric care with a premium feel.' },
        { title: 'Multi-purpose', icon: Package, description: 'For surfaces that need one dependable solution.' },
      ],
    },
    products: {
      badge: 'Product spotlight',
      title: 'Three hero packages from the Captain Maid range',
      subtitle: 'These package images come directly from the supplied asset folder and are used as-is with no stock replacement.',
    },
    faq: {
      badge: 'FAQ',
      title: 'Common Questions About Captain Maid',
      subtitle: 'Find answers to questions about our cleaning products and safety.',
      items: [
        {
          q: 'Are Captain Maid products safe for children and pets?',
          a: 'Yes, Captain Maid products are formulated with child and pet safety in mind. Our natural-derived ingredients make them safe for families with kids and pets. Always follow usage instructions on the package.',
        },
        {
          q: 'Are Captain Maid products eco-friendly?',
          a: 'Captain Maid is committed to environmental responsibility. Our products are made with natural-derived ingredients and eco-conscious manufacturing practices to reduce environmental impact.',
        },
        {
          q: 'Can I use Captain Maid floor cleaner with robot vacuum cleaners?',
          a: 'Yes, Captain Maid floor cleaner is formulated to be compatible with robot vacuum cleaners. Our floor care products are designed to work safely with automated cleaning systems.',
        },
        {
          q: 'Where are Captain Maid products manufactured?',
          a: 'Captain Maid is proudly made in Thailand. All our products are manufactured under strict quality control standards to ensure the highest level of safety and effectiveness.',
        },
      ],
    },
    cta: {
      title: 'Bring premium cleaning into the everyday routine',
      subtitle: 'A focused landing page designed to sell the brand clearly, beautifully, and with very little friction.',
      primary: 'Shop Now',
      secondary: 'Contact Us',
    },
    footer: {
      description: 'Premium household cleaning products with a bright, modern identity and a trustworthy, clean presentation.',
      copyright: 'Captain Maid. All rights reserved.',
    },
  },
  th: {
    header: {
      solutions: 'โซลูชัน',
      products: 'สินค้า',
      trust: 'ความน่าเชื่อถือ',
      faq: 'คำถาม',
      ctaButton: 'ซื้อเลย',
    },
    slides: {
      slide1: {
        headline: 'ทำให้การดูแลบ้าน\nเป็นเรื่องง่าย',
        supporting: 'ชีวิตที่ดีขึ้น ดูแลโดย\nCaptain Maid.',
        cta: 'เรียนรู้เพิ่มเติม',
      },
      slide2: {
        headline: 'โซลูชันทำความสะอาด\nครบทุกมุมของบ้าน',
        categories: [
          { label: 'ห้องครัว', icon: ChefHat },
          { label: 'ห้องน้ำ', icon: Bath },
          { label: 'พื้น', icon: Sparkles },
          { label: 'ซักผ้า', icon: Shirt },
          { label: 'อเนกประสงค์', icon: Package },
        ],
      },
      slide3: {
        headline: 'ปลอดภัยสำหรับทุกคน\nในครอบครัว สบายใจได้ทุกวัน',
        bullets: ['ปลอดภัยสำหรับเด็ก', 'เป็นมิตรต่อสัตว์เลี้ยง', 'อ่อนโยนแต่มีประสิทธิภาพ'],
      },
      slide4: {
        headline: 'เทคโนโลยีทำความสะอาดขั้นสูง\nผสานพลังจากธรรมชาติ',
        supporting: 'ตั้งแต่จัดการคราบหนัก ไปจนถึงแก้ปัญหาท่อระบายน้ำอุดตัน Captain Maid พร้อมช่วยดูแลบ้านของคุณ',
        bullets: ['ส่วนผสมที่มีที่มาจากธรรมชาติ', 'เทคโนโลยีทำความสะอาดล้ำลึก', 'ช่วยดูแลและปกป้องพื้นผิว'],
      },
      slide5: {
        headline: 'คุณภาพที่คุณไว้วางใจได้\nในทุกการดูแลบ้าน',
        badges: [
          { label: 'ผลิตในประเทศไทย', key: 'flag' },
          { label: 'ผ่านการทดสอบคุณภาพ', key: 'tested' },
          { label: 'ใส่ใจสิ่งแวดล้อม', key: 'eco' },
          { label: 'แบรนด์ที่ได้รับความไว้วางใจ', key: 'trusted' },
        ],
        ctaPrimary: 'ซื้อสินค้า',
        ctaSecondary: 'ร่วมเป็นตัวแทนจำหน่าย',
      },
    },
    solutions: {
      badge: 'โซลูชัน',
      title: 'วิธีทำความสะอาดอย่างสมบูรณ์สำหรับทุกมุมของบ้านคุณ',
      subtitle: 'ออกแบบมาสำหรับพื้นที่และงานที่สำคัญที่สุด: ครัว ห้องน้ำ พื้น ซักผ้า และการดูแลอเนกประสงค์ในทุกวัน',
      cards: [
        { title: 'ครัว', icon: ChefHat, description: 'รับมือคราบมันและงานเช็ดทุกวันได้อย่างรวดเร็ว' },
        { title: 'ห้องน้ำ', icon: Bath, description: 'ลดคราบสบู่ เพิ่มความเงางาม และคุมโทนสะอาด' },
        { title: 'พื้น', icon: Sparkles, description: 'ดูแลพื้นให้แห้งไวและสวยเรียบในทุกมุมบ้าน' },
        { title: 'ซักผ้า', icon: Shirt, description: 'ดูแลผ้าให้สะอาดสดใหม่ในภาพลักษณ์พรีเมียม' },
        { title: 'อเนกประสงค์', icon: Package, description: 'โซลูชันเดียวสำหรับหลายพื้นผิวที่ต้องการความมั่นใจ' },
      ],
    },
    products: {
      badge: 'แนะนำสินค้า',
      title: 'สามแพ็กเกจฮีโร่จากไลน์ Captain Maid',
      subtitle: 'ภาพแพ็กเกจทั้งหมดมาจากโฟลเดอร์ assets ที่ผู้ใช้กำหนด และใช้ตามต้นฉบับโดยไม่แทนด้วยสต็อก',
    },
    faq: {
      badge: 'คำถามที่พบบ่อย',
      title: 'คำถามที่พบบ่อยเกี่ยวกับ Captain Maid',
      subtitle: 'ค้นหาคำตอบเกี่ยวกับสินค้าทำความสะอาดและความปลอดภัยของเรา',
      items: [
        {
          q: 'สินค้า Captain Maid ปลอดภัยสำหรับเด็กและสัตว์เลี้ยงไหม?',
          a: 'ใช่ สินค้า Captain Maid ผลิตมาโดยคำนึงถึงความปลอดภัยของเด็กและสัตว์เลี้ยง ส่วนผสมที่มาจากธรรมชาติทำให้ปลอดภัยสำหรับครอบครัว โปรดปฏิบัติตามคำแนะนำบนแพ็กเกจเสมอ',
        },
        {
          q: 'สินค้า Captain Maid เป็นมิตรต่อสิ่งแวดล้อมหรือไม่?',
          a: 'Captain Maid มุ่งมั่นในความรับผิดชอบต่อสิ่งแวดล้อม สินค้าของเราผลิตจากส่วนผสมที่มาจากธรรมชาติและกระบวนการผลิตที่สำนึกสิ่งแวดล้อม',
        },
        {
          q: 'ใช้สูตรถูพื้น Captain Maid กับเครื่องดูดฝุ่นหุ่นยนต์ได้ไหม?',
          a: 'ได้ สูตรถูพื้น Captain Maid ออกแบบมาให้เข้ากันได้กับเครื่องดูดฝุ่นหุ่นยนต์ สินค้าดูแลพื้นของเราออกแบบเพื่อทำงานอย่างปลอดภัยกับระบบทำความสะอาดอัตโนมัติ',
        },
        {
          q: 'สินค้า Captain Maid ผลิตที่ไหน?',
          a: 'Captain Maid ผลิตในประเทศไทยอย่างภูมิใจ สินค้าทั้งหมดผลิตภายใต้มาตรฐานควบคุมคุณภาพที่เข้มงวดเพื่อรับประกันความปลอดภัยและประสิทธิผลสูงสุด',
        },
      ],
    },
    cta: {
      title: 'ยกระดับการทำความสะอาดให้เป็นเรื่องประจำวันแบบพียม',
      subtitle: 'หน้าแลนดิ้งที่ออกแบบมาให้ขายแบรนด์อย่างชัดเจน สวย และลดแรงเสียดทานในการตัดสินใจ',
      primary: 'ซื้อเลย',
      secondary: 'ติดต่อเรา',
    },
    footer: {
      description: 'ผลิตภัณฑ์ทำความสะอาดบ้านระดับพรีเมียม ภาพลักษณ์สว่าง ทันสมัย และดูน่าเชื่อถือ',
      copyright: 'Captain Maid. สงวนลิขสิทธิ์',
    },
  },
};

export function CaptainMaidLandingPage() {
  const locale = useLocale() as LocaleKey;
  const c = COPY[locale] ?? COPY.en;
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    setViewportWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const device = useMemo<'mobile' | 'tablet' | 'desktop'>(() => {
    if (viewportWidth < 768) return 'mobile';
    if (viewportWidth < 1280) return 'tablet';
    return 'desktop';
  }, [viewportWidth]);

  const getResponsiveImage = (mobile: any, tablet: any, desktop: any) => {
    if (device === 'mobile') return mobile;
    if (device === 'tablet') return tablet;
    return desktop;
  };

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
      description: locale === 'th'
        ? 'ภาพแพ็กเกจสีเขียวสำหรับงานดูแลพื้นและความสดชื่นในบ้าน'
        : 'Green packaging for floor care and a fresh home-cleaning story.',
    },
    {
      image: pinkBottle,
      title: 'Floral Passionate',
      description: locale === 'th'
        ? 'ภาพแพ็กเกจโทนชมพูสำหรับบรรยากาศหอมละมุนและสะอาดทุกวัน'
        : 'Pink packaging for a softer fragrance-led daily cleaning story.',
    },
    {
      image: purpleBottle,
      title: 'Lavender Kerry',
      description: locale === 'th'
        ? 'ภาพแพ็กเกจโทนม่วงสำหรับความผ่อนคลายที่ยังคงความพรีเมียม'
        : 'Purple packaging for a calm, premium cleaning presence.',
    },
  ];

  const current = slides[activeSlide];

  // Specific absolute pixel-perfect text safe area styling mapped dynamically based on coordinates
  const safeAreaStyle = useMemo(() => {
    const coords: Record<string, Record<'mobile' | 'tablet' | 'desktop', { x: number; y: number; w: number; h: number }>> = {
      intro: {
        desktop: { x: 4, y: 18, w: 44, h: 66 },
        tablet: { x: 5, y: 16, w: 43, h: 68 },
        mobile: { x: 7, y: 50, w: 58, h: 40 }
      },
      range: {
        desktop: { x: 16, y: 7, w: 78, h: 36 },
        tablet: { x: 13, y: 7, w: 78, h: 38 },
        mobile: { x: 7, y: 5, w: 86, h: 40 }
      },
      lifestyle: {
        desktop: { x: 6, y: 10, w: 43, h: 43 },
        tablet: { x: 6, y: 9, w: 44, h: 42 },
        mobile: { x: 8, y: 5, w: 84, h: 34 }
      },
      technology: {
        desktop: { x: 6, y: 10, w: 50, h: 43 },
        tablet: { x: 7, y: 9, w: 53, h: 42 },
        mobile: { x: 8, y: 5, w: 84, h: 31 }
      },
      trust: {
        desktop: { x: 5, y: 10, w: 48, h: 76 },
        tablet: { x: 5, y: 9, w: 49, h: 79 },
        mobile: { x: 7, y: 5, w: 55, h: 67 }
      }
    };

    const c = coords[current.key]?.[device] || coords.intro.desktop;
    return {
      left: `${c.x}%`,
      top: `${c.y}%`,
      width: `${c.w}%`,
      height: `${c.h}%`
    };
  }, [current.key, device]);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.baseUrl}#organization`,
        name: site.brandName,
        url: `${site.baseUrl}/${locale}`,
        logo: logoMark.src,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.baseUrl}/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Captain Maid', item: `${site.baseUrl}/${locale}` },
        ],
      },
      {
        '@type': 'Product',
        name: 'Captain Maid Floor Cleaner - Tea Tree Flash',
        brand: { '@type': 'Brand', name: site.brandName },
        image: greenBottle.src,
        description:
          'Captain Maid floor cleaner package presented from the supplied asset library.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'THB',
          price: '76.63',
          availability: 'https://schema.org/InStock',
          url: `${site.baseUrl}/${locale}/products`,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: c.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <main className="bg-[#F5F9FF] text-slate-900 font-body antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Modern Clean White Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-cm-border-soft bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src={logoMark} alt="Captain Maid logo" width={44} height={44} priority className="h-11 w-11 rounded-2xl object-contain shadow-[0_8px_20px_rgba(10,86,194,0.06)]" />
            <div className="leading-none">
              <p className="text-base font-bold uppercase tracking-[0.2em] text-[#073E91]">Captain Maid</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            <a href="#solutions" className="rounded-full px-4 py-2 text-sm font-semibold text-cm-text-secondary transition hover:bg-[#EAF4FF] hover:text-[#073E91]">
              {locale === 'th' ? 'โซลูชัน' : c.header.solutions}
            </a>
            <a href="#products" className="rounded-full px-4 py-2 text-sm font-semibold text-cm-text-secondary transition hover:bg-[#EAF4FF] hover:text-[#073E91]">
              {locale === 'th' ? 'สินค้า' : c.header.products}
            </a>
            <a href="#trust" className="rounded-full px-4 py-2 text-sm font-semibold text-cm-text-secondary transition hover:bg-[#EAF4FF] hover:text-[#073E91]">
              {locale === 'th' ? 'ความน่าเชื่อถือ' : c.header.trust}
            </a>
            <a href="#faq" className="rounded-full px-4 py-2 text-sm font-semibold text-cm-text-secondary transition hover:bg-[#EAF4FF] hover:text-[#073E91]">
              {locale === 'th' ? 'คำถาม' : c.header.faq}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href={`/${locale}/products`} className="rounded-full bg-cm-primary-blue px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-cm-primary-blue/15 hover:bg-cm-navy active:scale-95 transition-all">
              {locale === 'th' ? 'ซื้อเลย' : c.header.ctaButton}
            </Link>
          </div>
        </div>
      </header>

      {/* Five-Slide Responsive Hero Carousel Section */}
      <section id="hero" className="mx-auto w-full max-w-7xl px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div
          className={`relative overflow-hidden rounded-[36px] border border-white/60 bg-gradient-to-br ${current.tone} shadow-[0_24px_70px_rgba(10,86,194,0.08)] h-[360px] sm:h-[480px] lg:h-[580px]`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Lazy Loaded Dynamic Images */}
          <div className="absolute inset-0 z-0">
            <Image
              src={getResponsiveImage(current.image.mobile, current.image.tablet, current.image.desktop)}
              alt="Captain Maid premium presentation slide"
              fill
              priority={activeSlide === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Overlays for text contrast */}
            {current.key === 'intro' && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#000]/30 via-[#000]/20 to-[#000]/40 z-1" />
            )}
            {current.key === 'technology' && (
              <div className="absolute inset-0 bg-[#043E91]/15 z-1" />
            )}
          </div>

          {/* HTML Overlay with precise Text Safe Areas */}
          <div className="absolute z-10 select-none overflow-hidden" style={safeAreaStyle}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${current.key}-${device}`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: 'easeOut' }}
                className="w-full h-full flex flex-col justify-center text-left animate-fade-in"
              >
                {/* SLIDE 1 — BRAND HERO */}
                {current.key === 'intro' && (
                  <div className="flex flex-col items-start justify-center gap-4 sm:gap-6 lg:gap-8 h-full">
                    {/* Large prominent logo */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Image
                        src={logoMark}
                        alt="Captain Maid logo"
                        width={80}
                        height={80}
                        className="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 rounded-3xl object-contain bg-white shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                      />
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold font-heading text-white leading-tight whitespace-pre-line drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] [text-shadow:-2px_-2px_0_rgba(255,255,255,0.6),2px_-2px_0_rgba(255,255,255,0.6),-2px_2px_0_rgba(255,255,255,0.6),2px_2px_0_rgba(255,255,255,0.6)]">
                      {c.slides.slide1.headline}
                    </h1>

                    <p className="text-sm sm:text-base lg:text-lg text-white/98 leading-relaxed font-semibold whitespace-pre-line drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] [text-shadow:-1px_-1px_0_rgba(255,255,255,0.5),1px_-1px_0_rgba(255,255,255,0.5),-1px_1px_0_rgba(255,255,255,0.5),1px_1px_0_rgba(255,255,255,0.5)]">
                      {c.slides.slide1.supporting}
                    </p>

                    <Link href="/about" className="rounded-full bg-white px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base font-bold text-[#073E91] transition-all hover:bg-white/95 active:scale-95 shadow-lg shadow-black/20 mt-2 sm:mt-4">
                      {c.slides.slide1.cta}
                    </Link>
                  </div>
                )}

                {/* SLIDE 2 — PRODUCT RANGE */}
                {current.key === 'range' && (
                  <div className="flex flex-col items-center justify-start gap-4 sm:gap-6 text-center h-full max-w-4xl mx-auto pt-8 sm:pt-12 lg:pt-16">
                    <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-[#073E91] leading-tight whitespace-normal sm:whitespace-pre-line drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] [text-shadow:-2px_-2px_0_rgba(255,255,255,0.8),2px_-2px_0_rgba(255,255,255,0.8),-2px_2px_0_rgba(255,255,255,0.8),2px_2px_0_rgba(255,255,255,0.8)]">
                      ผลิตภัณฑ์ทำความสะอาดที่ออกแบบมาสำหรับทุกห้องในบ้าน
                    </h2>

                    {/* Five minimal outline category icons row */}
                    <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-3 w-full max-w-xs sm:max-w-2xl mx-auto">
                      {c.slides.slide2.categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1 p-1 bg-white/90 border border-cm-border-soft rounded-2xl shadow-sm min-w-[44px] sm:min-w-[50px] md:min-w-[90px] backdrop-blur-md">
                            <div className="flex h-6 w-6 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-cm-sky-light text-cm-primary-blue border border-cm-border-soft">
                              <Icon size={device === 'mobile' ? 12 : 18} />
                            </div>
                            <span className="text-[8px] sm:text-[11px] font-bold text-[#173B68] whitespace-nowrap">
                              {cat.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SLIDE 3 — LIFESTYLE / FAMILY AND PET SAFETY */}
                {current.key === 'lifestyle' && (
                  <div className="flex flex-col items-start justify-center gap-3 sm:gap-5 lg:gap-6 h-full">
                    <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-[#073E91] leading-tight whitespace-pre-line drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] [text-shadow:-2px_-2px_0_rgba(255,255,255,0.8),2px_-2px_0_rgba(255,255,255,0.8),-2px_2px_0_rgba(255,255,255,0.8),2px_2px_0_rgba(255,255,255,0.8)]">
                      {c.slides.slide3.headline}
                    </h2>

                    <ul className="space-y-2 sm:space-y-3 mt-2 sm:mt-3">
                      {c.slides.slide3.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                          <span className="flex h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-white/90 text-[#1762B5] flex-shrink-0">
                            <CheckCircle2 size={device === 'mobile' ? 14 : 20} />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* SLIDE 4 — NATURAL CLEANING TECHNOLOGY */}
                {current.key === 'technology' && (
                  <div className="flex flex-col items-start justify-center gap-3 sm:gap-5 lg:gap-6 h-full">
                    <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-white leading-tight whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                      {c.slides.slide4.headline}
                    </h2>

                    <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                      {c.slides.slide4.supporting}
                    </p>

                    <ul className="space-y-2.5 sm:space-y-4 lg:space-y-5 mt-1 sm:mt-2">
                      {c.slides.slide4.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 text-sm sm:text-base lg:text-lg font-bold text-white/98 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                          <span className="flex h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-white/15 border border-white/30 text-[#8ED6FF] flex-shrink-0">
                            <Leaf size={device === 'mobile' ? 16 : 22} />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* SLIDE 5 — TRUST / CALL TO ACTION */}
                {current.key === 'trust' && (
                  <div className="flex flex-col items-start justify-center gap-4 sm:gap-6 h-full w-full">
                    <h2 className="text-base sm:text-2xl lg:text-4xl font-extrabold font-heading text-white leading-tight whitespace-pre-line drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] [text-shadow:0_0_30px_rgba(255,255,255,0.4),0_0_60px_rgba(255,255,255,0.2)]">
                      {c.slides.slide5.headline}
                    </h2>

                    {/* Trust points: 1 col mobile, 2 col tablet, 4 col desktop */}
                    <div className={`grid ${device === 'mobile' ? 'grid-cols-1 gap-2' : device === 'tablet' ? 'grid-cols-2 gap-2.5' : 'grid-cols-4 gap-3'} w-full mt-2`}>
                      {c.slides.slide5.badges.map((badge, idx) => (
                        <div key={idx} className={`flex ${device === 'mobile' ? 'flex-row items-center justify-start gap-3 px-4 py-3' : 'flex-col items-center justify-center gap-2.5 p-3'} bg-white/98 border-2 border-white rounded-3xl shadow-md backdrop-blur-md`}>
                          <div className="flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-[#EAF4FF] text-[#1764BA] shrink-0">
                            {badge.key === 'flag' && <span className="text-xs sm:text-sm lg:text-base">🇹🇭</span>}
                            {badge.key === 'tested' && <ShieldCheck size={device === 'mobile' ? 18 : 24} className="text-[#1764BA]" />}
                            {badge.key === 'eco' && <Leaf size={device === 'mobile' ? 18 : 24} className="text-[#70B52C]" />}
                            {badge.key === 'trusted' && <Star size={device === 'mobile' ? 18 : 24} className="text-[#FFD84D] fill-[#FFD84D]" />}
                          </div>
                          <span className="text-xs sm:text-sm lg:text-base font-bold text-[#073E91] text-center leading-tight">
                            {badge.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Stacked CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5 mt-3 sm:mt-4 w-full sm:w-auto">
                      <Link href="/products" className="rounded-full bg-[#0753AC] px-7 py-3 sm:px-9 sm:py-3.5 lg:px-10 text-sm sm:text-base font-bold text-white transition-all text-center hover:bg-cm-navy active:scale-95 shadow-md shadow-[#0753AC]/25">
                        {c.slides.slide5.ctaPrimary}
                      </Link>
                      <Link href="/contact" className="rounded-full bg-white border-2 border-white px-7 py-3 sm:px-9 sm:py-3.5 lg:px-10 text-sm sm:text-base font-bold text-[#0A4C9D] transition-all text-center hover:bg-white/95 active:scale-95 shadow-md">
                        {c.slides.slide5.ctaSecondary}
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Navigation Elements */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30 active:scale-90"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
              aria-label="Next slide"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30 active:scale-90"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
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
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">
            {c.solutions.badge}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
            {c.solutions.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {c.solutions.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {c.solutions.cards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="rounded-[28px] border border-[#D7E7FB] bg-white p-5 shadow-[0_18px_40px_rgba(10,86,194,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(10,86,194,0.12)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A56C2] text-white shadow-[0_16px_30px_rgba(10,86,194,0.2)]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">
              {c.products.badge}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
              {c.products.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              {c.products.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {productCards.map((product) => (
              <article key={product.title} className="overflow-hidden rounded-[32px] border border-[#D7E7FB] bg-gradient-to-br from-[#F8FBFF] to-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
                <div className="relative flex min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[380px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(10,86,194,0.1),transparent_52%)] px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
                  <Image src={product.image} alt={`${product.title} Captain Maid package`} width={420} height={420} placeholder="blur" className="h-auto w-[160px] sm:w-[180px] md:w-[220px] lg:w-[240px] object-contain drop-shadow-[0_20px_40px_rgba(10,86,194,0.16)]" />
                </div>
                <div className="space-y-3 p-6">
                  <h3 className="text-2xl font-semibold text-slate-900">{product.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{product.description}</p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0A56C2]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF4FF]">
                      <Star size={16} className="fill-[#0A56C2] text-[#0A56C2]" />
                    </span>
                    Captain Maid premium package
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[36px] border border-[#D7E7FB] bg-gradient-to-br from-[#EAF4FF] via-white to-[#F7FBFF] p-6 shadow-[0_22px_60px_rgba(10,86,194,0.09)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2] shadow-[0_12px_24px_rgba(10,86,194,0.06)]">
                Trust
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
                Trusted quality you can count on
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {locale === 'th'
                  ? 'องค์ประกอบแบรนด์ที่สว่าง สะอาด และดูน่าเชื่อถือ เพื่อให้หน้าแรกส่งต่อความมั่นใจแบบพรีเมียมได้ทันที'
                  : 'A bright, clean, trustworthy brand system that sends premium confidence from the very first screen.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]">
                  <CheckCircle2 size={16} className="text-[#0A56C2]" />
                  {locale === 'th' ? 'ผลิตในประเทศไทย' : 'Made in Thailand'}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]">
                  <ShieldCheck size={16} className="text-[#0A56C2]" />
                  {locale === 'th' ? 'ผ่านการทดสอบคุณภาพ' : 'Quality Tested'}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]">
                  <Leaf size={16} className="text-[#0A56C2]" />
                  {locale === 'th' ? 'ใส่ใจสิ่งแวดล้อม' : 'Eco Friendly'}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]">
                  <Users size={16} className="text-[#0A56C2]" />
                  {locale === 'th' ? 'แบรนด์ที่ได้รับความไว้วางใจ' : 'Trusted Brand'}
                </span>
              </div>
            </div>

            <figure className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
              <Image
                src={getResponsiveImage(slide5Mobile, slide5Tablet, slide5Desktop)}
                alt="Captain Maid mascot and premium home exterior"
                fill
                placeholder="blur"
                className="object-cover object-center"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 flex gap-3">
                {[greenBottle, pinkBottle, purpleBottle].map((image, index) => (
                  <div key={index} className="w-18 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:w-20">
                    <Image src={image} alt="Captain Maid package" width={88} height={120} placeholder="blur" className="h-auto w-full object-contain" />
                  </div>
                ))}
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">
              {c.faq.badge}
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#083A75] sm:text-4xl lg:text-5xl">
              {c.faq.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              {c.faq.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {c.faq.items.map((item) => (
              <article key={item.q} className="rounded-[28px] border border-[#D7E7FB] bg-[#F8FBFF] p-6 shadow-[0_16px_30px_rgba(10,86,194,0.06)]">
                <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[36px] bg-[#0A56C2] px-6 py-10 text-white shadow-[0_24px_60px_rgba(10,86,194,0.24)] sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">{c.cta.title}</h2>
              <p className="max-w-2xl text-lg leading-8 text-white/90">{c.cta.subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0A56C2] shadow-[0_16px_32px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5">
                {c.cta.primary}
                <ArrowRight size={16} />
              </Link>
              <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                {c.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-[#D7E7FB] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src={logoMark} alt="Captain Maid logo" width={44} height={44} className="h-11 w-11 rounded-2xl object-contain" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">Captain Maid</p>
                <p className="text-xs text-slate-500">Premium home care</p>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">{c.footer.description}</p>
          </div>
          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <a href="#solutions" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'โซลูชัน' : c.header.solutions}</a>
            <a href="#products" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'สินค้า' : c.header.products}</a>
            <a href="#trust" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'ความน่าเชื่อถือ' : c.header.trust}</a>
            <a href="#faq" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{locale === 'th' ? 'คำถาม' : c.header.faq}</a>
          </div>
        </div>
        <div className="border-t border-[#D7E7FB] px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          {c.footer.copyright}
        </div>
      </footer>
    </main>
  );
}
