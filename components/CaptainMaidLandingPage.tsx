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
import heroScene from './assets/01_Brand Hero03.png';
import rangeScene from './assets/02_Product Range03.png';
import familyScene from './assets/03_Family and Pet Safety05.png';
import techScene from './assets/04_Natural Cleaning Technology01.png';
import trustScene from './assets/05_Trust_and_Call_to_Action03.png';
import greenBottle from './assets/green-bottle.jpg';
import pinkBottle from './assets/pink-bottle.jpg';
import purpleBottle from './assets/purple-bottle.jpg';

type LocaleKey = 'en' | 'th';

type Copy = {
  header: {
    products: string;
    solutions: string;
    trust: string;
    faq: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    chips: string[];
  };
  slides: {
    intro: {
      badge: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
      points: string[];
    };
    range: {
      badge: string;
      title: string;
      subtitle: string;
      categories: { label: string; icon: typeof ChefHat }[];
    };
    lifestyle: {
      badge: string;
      title: string;
      subtitle: string;
      points: string[];
    };
    technology: {
      badge: string;
      title: string;
      subtitle: string;
      points: string[];
    };
    trust: {
      badge: string;
      title: string;
      subtitle: string;
      badges: string[];
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
      products: 'Products',
      solutions: 'Solutions',
      trust: 'Trust',
      faq: 'FAQ',
    },
    hero: {
      badge: 'Premium Home Care',
      title: 'Captain Maid, made for modern homes',
      subtitle: 'Bright, premium cleaning products designed for a calm home, a clean routine, and a brand experience that feels elevated from the first scroll.',
      primaryCta: 'Shop Now',
      secondaryCta: 'Become Distributor',
      chips: ['White space', 'Soft shadows', 'Blue and white palette'],
    },
    slides: {
      intro: {
        badge: 'Brand introduction',
        title: 'Made for Easy Home Cleaning',
        subtitle: 'Better Living, Taken Care of by Captain Maid.',
        ctaPrimary: 'Shop Now',
        ctaSecondary: 'Learn More',
        points: ['Premium feel', 'Bright and welcoming', 'Mascot-led brand story'],
      },
      range: {
        badge: 'Complete product range',
        title: 'Complete Cleaning Solutions for Every Corner of Your Home',
        subtitle: 'A premium shelf presentation of the major Captain Maid cleaning categories, arranged for clarity and instant scanning.',
        categories: [
          { label: 'Kitchen', icon: ChefHat },
          { label: 'Bathroom', icon: Bath },
          { label: 'Floor', icon: Sparkles },
          { label: 'Laundry', icon: Shirt },
          { label: 'Multi-purpose', icon: Package },
        ],
      },
      lifestyle: {
        badge: 'Lifestyle',
        title: 'Safe for Your Family, Everyday Comfort',
        subtitle: 'A warm home scene built around family living, pets, and a clean, breathable environment.',
        points: ['Safe for kids', 'Safe for pets', 'Gentle & effective'],
      },
      technology: {
        badge: 'Technology',
        title: 'Advanced Cleaning with Natural Power',
        subtitle: 'A refined science-led visual with water, bubbles, and fresh botanical cues supporting the brand’s modern cleaning story.',
        points: ['Natural ingredients', 'Deep cleaning technology', 'Surface protection'],
      },
      trust: {
        badge: 'Trust',
        title: 'Trusted Quality You Can Count On',
        subtitle: 'Premium packaging, consistent presentation, and a brand system that feels dependable from first impression to repeat purchase.',
        badges: ['Made in Thailand', 'Quality Tested', 'Eco Friendly', 'Trusted Brand'],
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
      title: 'Frequently asked questions',
      subtitle: 'Short answers that support the premium landing page without inventing claims beyond the supplied product set.',
      items: [
        {
          q: 'Which products are shown on the homepage?',
          a: 'The landing page highlights the main Captain Maid range from the supplied assets, including floor, bathroom, glass, multi-purpose, laundry, and concentrated cleaner presentations.',
        },
        {
          q: 'Are the product images from the provided folder only?',
          a: 'Yes. All product, mascot, logo, and package visuals on this page are imported from components/assets only.',
        },
        {
          q: 'Is the floor cleaner compatible with robot vacuum cleaning?',
          a: 'The supplied product data positions the floor cleaner range as robot-friendly, and the page reflects that brand story.',
        },
        {
          q: 'Does the page work on mobile and desktop?',
          a: 'Yes. The hero carousel uses split layouts on large screens and stacked layouts on smaller screens so the mascot and products are not cropped.',
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
      description: 'Premium household cleaning products with a bright, modern identity and a clean, trustworthy presentation.',
      copyright: 'Captain Maid. All rights reserved.',
    },
  },
  th: {
    header: {
      products: 'สินค้า',
      solutions: 'โซลูชัน',
      trust: 'ความน่าเชื่อถือ',
      faq: 'คำถาม',
    },
    hero: {
      badge: 'Premium Home Care',
      title: 'Captain Maid สำหรับบ้านสมัยใหม่',
      subtitle: 'ผลิตภัณฑ์ทำความสะอาดพรีเมียม โทนสว่าง ภาพลักษณ์สะอาด และประสบการณ์แบรนด์ที่ดูยกระดับตั้งแต่เลื่อนเห็นครั้งแรก',
      primaryCta: 'ซื้อเลย',
      secondaryCta: 'เป็นตัวแทน',
      chips: ['White space', 'Soft shadows', 'Blue and white palette'],
    },
    slides: {
      intro: {
        badge: 'แนะนำแบรนด์',
        title: 'ทำให้การทำความสะอาดบ้านง่ายขึ้น',
        subtitle: 'ชีวิตที่ดีขึ้น ดูแลโดย Captain Maid',
        ctaPrimary: 'ซื้อเลย',
        ctaSecondary: 'ดูเพิ่มเติม',
        points: ['พรีเมียม', 'สว่างและเป็นมิตร', 'เล่าเรื่องด้วยมาสคอต'],
      },
      range: {
        badge: 'ไลน์สินค้า',
        title: 'วิธีทำความสะอาดอย่างสมบูรณ์สำหรับทุกมุมของบ้านคุณ',
        subtitle: 'จัดวางกลุ่มผลิตภัณฑ์หลักของ Captain Maid แบบพรีเมียมและอ่านง่ายในครั้งเดียว',
        categories: [
          { label: 'ครัว', icon: ChefHat },
          { label: 'ห้องน้ำ', icon: Bath },
          { label: 'พื้น', icon: Sparkles },
          { label: 'ซักผ้า', icon: Shirt },
          { label: 'อเนกประสงค์', icon: Package },
        ],
      },
      lifestyle: {
        badge: 'ไลฟ์สไตล์',
        title: 'ปลอดภัยสำหรับครอบครัว สบายในทุกวัน',
        subtitle: 'ภาพบ้านที่อบอุ่น สะอาด และเป็นมิตรกับการใช้ชีวิตของคนในบ้านรวมถึงสัตว์เลี้ยง',
        points: ['ปลอดภัยสำหรับเด็ก', 'ปลอดภัยสำหรับสัตว์เลี้ยง', 'อ่อนโยนแต่สะอาดจริง'],
      },
      technology: {
        badge: 'เทคโนโลยี',
        title: 'การทำความสะอาดขั้นสูงด้วยพลังธรรมชาติ',
        subtitle: 'ภาพเชิงวิทยาศาสตร์ที่ดูพรีเมียมด้วยน้ำ ฟอง และโทนธรรมชาติ สื่อเรื่องการทำความสะอาดสมัยใหม่',
        points: ['ส่วนผสมธรรมชาติ', 'พลังทำความสะอาดลึก', 'ช่วยปกป้องพื้นผิว'],
      },
      trust: {
        badge: 'ความเชื่อใจ',
        title: 'คุณภาพที่เชื่อถือได้ที่คุณสามารถไว้ใจได้',
        subtitle: 'แพ็กเกจจิงพรีเมียม การจัดวางที่สม่ำเสมอ และระบบแบรนด์ที่สร้างความมั่นใจได้ตั้งแต่เห็นครั้งแรกจนถึงการซื้อซ้ำ',
        badges: ['ผลิตในประเทศไทย', 'ทดสอบคุณภาพ', 'เป็นมิตรต่อสิ่งแวดล้อม', 'แบรนด์ที่เชื่อถือได้'],
        ctaPrimary: 'ซื้อเลย',
        ctaSecondary: 'เป็นตัวแทน',
      },
    },
    solutions: {
      badge: 'โซลูชัน',
      title: 'Complete Cleaning Solutions for Every Corner of Your Home',
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
      title: 'คำถามที่พบบ่อย',
      subtitle: 'คำตอบสั้น ๆ ที่ช่วยให้หน้าแลนดิ้งดูครบโดยไม่แต่งเติมข้อมูลเกินจากชุดสินค้าที่มีอยู่จริง',
      items: [
        {
          q: 'หน้าแรกแสดงสินค้าอะไรบ้าง?',
          a: 'หน้าแลนดิ้งไฮไลต์ไลน์หลักของ Captain Maid จาก assets ที่ให้มา ได้แก่ floor, bathroom, glass, multi-purpose, laundry และ concentrated cleaner',
        },
        {
          q: 'ใช้ภาพจากโฟลเดอร์ที่กำหนดเท่านั้นหรือไม่?',
          a: 'ใช่ ภาพทุกชิ้นของหน้าเว็บนี้มาจาก components/assets เท่านั้น ทั้งสินค้า มาสคอต โลโก้ และแพ็กเกจ',
        },
        {
          q: 'สูตรถูพื้นรองรับ robot vacuum หรือไม่?',
          a: 'ข้อมูลสินค้าที่ให้มาวางตำแหน่งสูตรถูพื้นไว้ให้เป็นมิตรกับ robot vacuum และหน้าเว็บนี้สะท้อนเรื่องนั้น',
        },
        {
          q: 'รองรับมือถือและเดสก์ท็อปไหม?',
          a: 'รองรับ โดย hero carousel ใช้ split layout บนจอใหญ่ และ stacked layout บนจอเล็กเพื่อไม่ให้มาสคอตหรือสินค้าโดนครอป',
        },
      ],
    },
    cta: {
      title: 'ยกระดับการทำความสะอาดให้เป็นเรื่องประจำวันแบบพรีเมียม',
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

const categorySwatches = [
  'from-[#DCEEFF] to-white',
  'from-white to-[#F4F8FF]',
  'from-[#EAF4FF] to-white',
  'from-white to-[#EEF7FF]',
  'from-[#F6FBFF] to-white',
];

function ResponsiveBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
      {children}
    </span>
  );
}

function TrustPill({ label, icon: Icon }: { label: string; icon: typeof CheckCircle2 }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#C8DBF7] bg-white px-4 py-2 text-sm font-semibold text-[#0A305C] shadow-[0_12px_30px_rgba(10,86,194,0.08)]">
      <Icon size={16} className="text-[#0A56C2]" />
      {label}
    </span>
  );
}

export function CaptainMaidLandingPage() {
  const locale = useLocale() as LocaleKey;
  const c = COPY[locale] ?? COPY.en;
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = useMemo(
    () => [
      { key: 'intro', tone: 'from-[#0A56C2] via-[#2F7FE8] to-[#EAF4FF]' },
      { key: 'range', tone: 'from-white via-[#F7FBFF] to-[#DCEEFF]' },
      { key: 'lifestyle', tone: 'from-[#FFF9F0] via-[#FFFDF8] to-[#EDF7FF]' },
      { key: 'technology', tone: 'from-[#001F4D] via-[#0A56C2] to-[#DCEEFF]' },
      { key: 'trust', tone: 'from-[#EAF4FF] via-white to-[#F6FBFF]' },
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
    <main className="bg-[#F5F9FF] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="sticky top-0 z-50 border-b border-[#D8E7FA] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image src={logoMark} alt="Captain Maid logo" width={48} height={48} priority className="h-12 w-12 rounded-2xl object-contain shadow-[0_10px_24px_rgba(10,86,194,0.12)]" />
            <div className="leading-tight">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0A56C2]">Captain Maid</p>
              <p className="text-xs font-medium text-slate-500">Premium home care</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-3 md:flex" aria-label="Primary">
            <a href="#solutions" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#EAF4FF] hover:text-[#0A56C2]">
              {c.header.solutions}
            </a>
            <a href="#products" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#EAF4FF] hover:text-[#0A56C2]">
              {c.header.products}
            </a>
            <a href="#trust" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#EAF4FF] hover:text-[#0A56C2]">
              {c.header.trust}
            </a>
            <a href="#faq" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#EAF4FF] hover:text-[#0A56C2]">
              {c.header.faq}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={`/${locale}/products`} className="hidden rounded-full bg-[#0A56C2] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(10,86,194,0.22)] transition hover:bg-[#003C8F] sm:inline-flex">
              {c.hero.primaryCta}
            </Link>
          </div>
        </div>
      </header>

      <section id="hero" className="mx-auto w-full max-w-7xl px-4 pb-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div
          className={`relative overflow-hidden rounded-[36px] border border-white/80 bg-gradient-to-br ${current.tone} shadow-[0_30px_80px_rgba(18,74,154,0.12)]`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(10,86,194,0.16),transparent_45%)]" />
          <div className="relative flex items-center justify-between gap-2 border-b border-white/40 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <ResponsiveBadge>{c.hero.badge}</ResponsiveBadge>
              <span className="hidden text-sm font-medium text-white/90 md:inline">{c.hero.chips.join(' · ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
                aria-label="Next slide"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={current.key}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, ease: 'easeOut' }}
              className="grid gap-8 px-5 py-6 sm:px-8 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-10 lg:py-10"
            >
              {current.key === 'intro' && (
                <>
                  <div className="space-y-6 text-white">
                    <ResponsiveBadge>{c.slides.intro.badge}</ResponsiveBadge>
                    <div className="max-w-2xl space-y-4">
                      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
                        {c.slides.intro.title}
                      </h1>
                      <p className="max-w-xl text-lg leading-8 text-white/92 sm:text-xl">
                        {c.slides.intro.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0A56C2] shadow-[0_16px_30px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(255,255,255,0.25)]">
                        {c.slides.intro.ctaPrimary}
                        <ArrowRight size={16} />
                      </Link>
                      <Link href={`/${locale}/about`} className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/18">
                        {c.slides.intro.ctaSecondary}
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {c.slides.intro.points.map((point) => (
                        <span key={point} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur-md">
                          <CheckCircle2 size={16} />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>

                  <figure className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/20 shadow-[0_20px_60px_rgba(3,32,86,0.18)] backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#0A56C2]/70 via-[#0A56C2]/20 to-transparent" />
                    <Image
                      src={heroScene}
                      alt="Captain Maid mascot in a bright modern living room"
                      fill
                      priority={activeSlide === 0}
                      placeholder="blur"
                      className="object-contain object-right"
                      sizes="(min-width: 1024px) 44vw, 100vw"
                    />
                    <figcaption className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                      Captain Maid
                    </figcaption>
                  </figure>
                </>
              )}

              {current.key === 'range' && (
                <>
                  <div className="space-y-6 text-slate-900">
                    <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0A56C2]">
                      {c.slides.range.badge}
                    </span>
                    <div className="max-w-2xl space-y-4">
                      <h2 className="text-4xl font-semibold tracking-tight text-[#083A75] sm:text-5xl">
                        {c.slides.range.title}
                      </h2>
                      <p className="max-w-xl text-lg leading-8 text-slate-600">
                        {c.slides.range.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                      {c.slides.range.categories.map(({ label, icon: Icon }, index) => (
                        <div key={label} className={`rounded-3xl border border-[#D7E7FB] bg-gradient-to-br ${categorySwatches[index % categorySwatches.length]} p-4 shadow-[0_14px_30px_rgba(10,86,194,0.06)]`}>
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A56C2] text-white shadow-lg shadow-[#0A56C2]/20">
                            <Icon size={20} />
                          </div>
                          <p className="mt-3 text-sm font-semibold text-slate-900">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <figure className="relative overflow-hidden rounded-[32px] border border-[#D7E7FB] bg-white shadow-[0_20px_50px_rgba(10,86,194,0.10)]">
                    <Image
                      src={rangeScene}
                      alt="Captain Maid products arranged in a premium shelf presentation"
                      fill
                      priority={activeSlide === 1}
                      placeholder="blur"
                      className="object-contain"
                      sizes="(min-width: 1024px) 44vw, 100vw"
                    />
                    <figcaption className="absolute left-4 top-4 rounded-full bg-[#0A56C2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-[#0A56C2]/20">
                      Premium shelf
                    </figcaption>
                  </figure>
                </>
              )}

              {current.key === 'lifestyle' && (
                <>
                  <div className="space-y-6 text-slate-900">
                    <span className="inline-flex items-center rounded-full bg-[#F8F1E4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B5E00]">
                      {c.slides.lifestyle.badge}
                    </span>
                    <div className="max-w-2xl space-y-4">
                      <h2 className="text-4xl font-semibold tracking-tight text-[#5A3C00] sm:text-5xl">
                        {c.slides.lifestyle.title}
                      </h2>
                      <p className="max-w-xl text-lg leading-8 text-slate-600">
                        {c.slides.lifestyle.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {c.slides.lifestyle.points.map((point) => (
                        <span key={point} className="inline-flex items-center gap-2 rounded-full border border-[#F0DFC0] bg-white px-4 py-2 text-sm font-semibold text-[#5A3C00] shadow-[0_12px_24px_rgba(128,88,26,0.08)]">
                          <Users size={16} className="text-[#A97821]" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>

                  <figure className="relative overflow-hidden rounded-[32px] border border-[#F1E8D7] bg-white shadow-[0_20px_50px_rgba(109,78,24,0.10)]">
                    <Image
                      src={familyScene}
                      alt="Mother, child, pets, and robot vacuum in a bright family living room"
                      fill
                      priority={activeSlide === 2}
                      placeholder="blur"
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 44vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#FFF8EC]/10 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex gap-3">
                      {[greenBottle, pinkBottle, purpleBottle].map((image, index) => (
                        <div key={index} className="w-20 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.12)] sm:w-24">
                          <Image src={image} alt="Captain Maid product package" width={96} height={120} placeholder="blur" className="h-auto w-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </figure>
                </>
              )}

              {current.key === 'technology' && (
                <>
                  <div className="space-y-6 text-white">
                    <span className="inline-flex items-center rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                      {c.slides.technology.badge}
                    </span>
                    <div className="max-w-2xl space-y-4">
                      <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        {c.slides.technology.title}
                      </h2>
                      <p className="max-w-xl text-lg leading-8 text-white/88">
                        {c.slides.technology.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {c.slides.technology.points.map((point) => (
                        <span key={point} className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                          <Leaf size={16} />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>

                  <figure className="relative overflow-hidden rounded-[32px] border border-white/20 bg-[#052B73] shadow-[0_20px_50px_rgba(1,16,50,0.20)]">
                    <Image
                      src={techScene}
                      alt="Blue scientific visual with water, molecules, leaf, and glass sphere"
                      fill
                      priority={activeSlide === 3}
                      placeholder="blur"
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 44vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#001338]/20 via-transparent to-[#7BD0FF]/10" />
                    <div className="absolute bottom-4 right-4 w-24 overflow-hidden rounded-3xl border border-white/30 bg-white/15 p-2 shadow-[0_16px_36px_rgba(0,0,0,0.16)] backdrop-blur-md sm:w-28">
                      <Image src={greenBottle} alt="Captain Maid product package" width={112} height={168} placeholder="blur" className="h-auto w-full object-contain" />
                    </div>
                  </figure>
                </>
              )}

              {current.key === 'trust' && (
                <>
                  <div className="space-y-6 text-slate-900">
                    <span className="inline-flex items-center rounded-full bg-[#EAF4FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0A56C2]">
                      {c.slides.trust.badge}
                    </span>
                    <div className="max-w-2xl space-y-4">
                      <h2 className="text-4xl font-semibold tracking-tight text-[#083A75] sm:text-5xl">
                        {c.slides.trust.title}
                      </h2>
                      <p className="max-w-xl text-lg leading-8 text-slate-600">
                        {c.slides.trust.subtitle}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {c.slides.trust.badges.map((badge) => (
                        <div key={badge} className="flex items-center gap-3 rounded-3xl border border-[#D7E7FB] bg-white px-4 py-3 shadow-[0_12px_24px_rgba(10,86,194,0.06)]">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A56C2] text-white shadow-lg shadow-[#0A56C2]/20">
                            <ShieldCheck size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{badge}</p>
                            <p className="text-xs text-slate-500">Captain Maid premium promise</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0A56C2] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(10,86,194,0.24)] transition hover:bg-[#003C8F]">
                        {c.slides.trust.ctaPrimary}
                        <ArrowRight size={16} />
                      </Link>
                      <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center rounded-full border border-[#B8D2F5] bg-white px-6 py-3.5 text-sm font-semibold text-[#0A56C2] transition hover:bg-[#EAF4FF]">
                        {c.slides.trust.ctaSecondary}
                      </Link>
                    </div>
                  </div>

                  <figure className="relative overflow-hidden rounded-[32px] border border-[#D7E7FB] bg-white shadow-[0_20px_50px_rgba(10,86,194,0.08)]">
                    <Image
                      src={trustScene}
                      alt="Luxury home with Captain Maid mascot and trust-led composition"
                      fill
                      priority={activeSlide === 4}
                      placeholder="blur"
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 44vw, 100vw"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0A56C2] shadow-lg backdrop-blur-md">
                      Captain Maid
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {[greenBottle, pinkBottle, purpleBottle].map((image, index) => (
                        <div key={index} className="w-18 overflow-hidden rounded-2xl border border-white/70 bg-white/85 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:w-20">
                          <Image src={image} alt="Captain Maid product package" width={88} height={120} placeholder="blur" className="h-auto w-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </figure>
                </>
              )}
            </motion.article>
          </AnimatePresence>

          <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-white/50 px-5 py-4 sm:px-8">
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.key}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-10 bg-[#0A56C2]' : 'w-2.5 bg-[#9FC1EA] hover:bg-[#6FA0DE]'}`}
                />
              ))}
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              {activeSlide + 1}/{slides.length}
            </p>
          </div>
        </div>
      </section>

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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
                <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(10,86,194,0.1),transparent_52%)] px-8 py-10">
                  <Image src={product.image} alt={`${product.title} Captain Maid package`} width={420} height={420} placeholder="blur" className="h-auto w-[220px] object-contain drop-shadow-[0_20px_40px_rgba(10,86,194,0.16)]" />
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
                <TrustPill label={locale === 'th' ? 'Made in Thailand' : 'Made in Thailand'} icon={CheckCircle2} />
                <TrustPill label={locale === 'th' ? 'Quality Tested' : 'Quality Tested'} icon={ShieldCheck} />
                <TrustPill label={locale === 'th' ? 'Eco Friendly' : 'Eco Friendly'} icon={Leaf} />
                <TrustPill label={locale === 'th' ? 'Trusted Brand' : 'Trusted Brand'} icon={Users} />
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
              <Image
                src={trustScene}
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

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {c.faq.items.map((item) => (
              <article key={item.q} className="rounded-[28px] border border-[#D7E7FB] bg-[#F8FBFF] p-6 shadow-[0_16px_30px_rgba(10,86,194,0.06)]">
                <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <footer className="border-t border-[#D7E7FB] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
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
            <a href="#solutions" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{c.header.solutions}</a>
            <a href="#products" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{c.header.products}</a>
            <a href="#trust" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{c.header.trust}</a>
            <a href="#faq" className="rounded-2xl border border-[#D7E7FB] px-4 py-3 transition hover:bg-[#F8FBFF]">{c.header.faq}</a>
          </div>
        </div>
        <div className="border-t border-[#D7E7FB] px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          {c.footer.copyright}
        </div>
      </footer>
    </main>
  );
}
