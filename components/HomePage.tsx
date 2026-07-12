'use client';

import { useLocale } from 'next-intl';
import { blogPosts } from '@/data/blogPosts';
import { faqItems } from '@/data/faqs';
import { BlogSection } from '@/components/sections/BlogSection';
import {
  CTASection,
  FAQSection,
  FooterSection,
  HeroSection,
  HomeCopy,
  ProductsSection,
  SolutionsSection,
  TrustSection,
} from '@/components/sections';

const COPY: Record<'en' | 'th', HomeCopy> = {
  en: {
    hero: {
      badge: 'Captain Maid',
      title: 'Made for easy home cleaning',
      description: 'A section-based homepage keeps the brand clear, fast to edit, and easy to expand without breaking the rest of the site.',
      primary: 'Shop now',
      secondary: 'Read the blog',
    },
    solutions: {
      badge: 'Solutions',
      title: 'Complete cleaning solutions for every corner of your home',
      subtitle: 'Built for the spaces and tasks that matter most: cooking, bathing, floors, laundry, and daily multi-purpose care.',
      cards: [
        { title: 'Kitchen', icon: 'chef', description: 'For grease, wipe-downs, and fast daily refreshes.' },
        { title: 'Bathroom', icon: 'bath', description: 'For soap scum, shine, and calm spotless routines.' },
        { title: 'Floor', icon: 'sparkles', description: 'For smooth, quick-drying floor care across the home.' },
        { title: 'Laundry', icon: 'shirt', description: 'For fresh, clean fabric care with a premium feel.' },
        { title: 'Multi-purpose', icon: 'package', description: 'For surfaces that need one dependable solution.' },
      ],
    },
    products: {
      badge: 'Product spotlight',
      title: 'Three hero packages from the Captain Maid range',
      subtitle: 'These package images come directly from the supplied asset folder and are used as-is with no stock replacement.',
    },
    trust: {
      badge: 'Trust',
      title: 'Trusted quality you can count on',
      subtitle: 'A clean, clear brand system that sends confidence from the first screen.',
    },
    blog: {
      badge: 'Blog',
      title: 'Practical cleaning stories and home care guidance',
      subtitle: 'A quick reading lane for product insights, household routines, and useful cleaning knowledge.',
      cta: 'Read the blog',
    },
    faq: {
      badge: 'FAQ',
      title: 'Common questions about Captain Maid',
      subtitle: 'Find answers to questions about our cleaning products and safety.',
      items: faqItems,
    },
    cta: {
      title: 'Bring premium cleaning into the everyday routine',
      subtitle: 'A focused landing page designed to sell the brand clearly, beautifully, and with very little friction.',
      primary: 'Shop now',
      secondary: 'Contact us',
    },
    footer: {
      description: 'Premium household cleaning products with a bright, modern identity and a trustworthy, clean presentation.',
      copyright: 'Captain Maid. All rights reserved.',
      links: { solutions: 'Solutions', products: 'Products', trust: 'Trust', faq: 'FAQ' },
    },
  },
  th: {
    hero: {
      badge: 'Captain Maid',
      title: 'ดูแลบ้านอย่างง่ายและเป็นระบบ',
      description: 'หน้าเว็บแบบ Section ทำให้แบรนด์ชัด แก้ง่าย และขยายต่อได้โดยไม่รื้อทั้งเว็บ',
      primary: 'ซื้อเลย',
      secondary: 'อ่านบทความ',
    },
    solutions: {
      badge: 'โซลูชัน',
      title: 'ผลิตภัณฑ์ทำความสะอาดที่ออกแบบมาสำหรับทุกห้องในบ้าน',
      subtitle: 'ออกแบบมาสำหรับพื้นที่และงานที่สำคัญที่สุด: ครัว ห้องน้ำ พื้น ซักผ้า และการดูแลอเนกประสงค์ในทุกวัน',
      cards: [
        { title: 'ครัว', icon: 'chef', description: 'รับมือคราบมันและงานเช็ดทุกวันได้อย่างรวดเร็ว' },
        { title: 'ห้องน้ำ', icon: 'bath', description: 'ลดคราบสบู่ เพิ่มความเงางาม และคุมโทนสะอาด' },
        { title: 'พื้น', icon: 'sparkles', description: 'ดูแลพื้นให้แห้งไวและสวยเรียบในทุกมุมบ้าน' },
        { title: 'ซักผ้า', icon: 'shirt', description: 'ดูแลผ้าให้สะอาดสดใหม่ในภาพลักษณ์พรีเมียม' },
        { title: 'อเนกประสงค์', icon: 'package', description: 'โซลูชันเดียวสำหรับหลายพื้นผิวที่ต้องการความมั่นใจ' },
      ],
    },
    products: {
      badge: 'แนะนำสินค้า',
      title: 'ผลิตภัณฑ์ฮีโร่จากไลน์ Captain Maid',
      subtitle: 'เลือกสูตรที่เหมาะกับความต้องการของบ้านคุณ จากผลิตภัณฑ์ที่ได้รับการพิสูจน์ว่ามีประสิทธิภาพ',
    },
    trust: {
      badge: 'ความน่าเชื่อถือ',
      title: 'แบรนด์ที่เชื่อถือได้และดูแลบ้านอย่างมั่นใจ',
      subtitle: 'ระบบภาพลักษณ์ที่สะอาด ชัดเจน และให้ความมั่นใจในทันที',
    },
    blog: {
      badge: 'บทความ',
      title: 'เรื่องเล่าการดูแลบ้านและเคล็ดลับทำความสะอาด',
      subtitle: 'อ่านสั้น ๆ เพื่อเข้าใจสินค้า แนวทางดูแลบ้าน และความรู้ที่เอาไปใช้ได้จริง',
      cta: 'อ่านบทความทั้งหมด',
    },
    faq: {
      badge: 'คำถามที่พบบ่อย',
      title: 'คำถามที่พบบ่อยเกี่ยวกับ Captain Maid',
      subtitle: 'ค้นหาคำตอบเกี่ยวกับสินค้าทำความสะอาดและความปลอดภัยของเรา',
      items: faqItems,
    },
    cta: {
      title: 'เลือก Captain Maid ยกระดับการดูแลบ้าน',
      subtitle: 'สินค้าจากแบรนด์ที่ไว้วางใจได้ สำหรับการทำความสะอาดที่มีประสิทธิภาพและปลอดภัย',
      primary: 'ซื้อเลย',
      secondary: 'ติดต่อเรา',
    },
    footer: {
      description: 'ผลิตภัณฑ์ทำความสะอาดบ้านระดับพรีเมียม ภาพลักษณ์สว่าง ทันสมัย และดูน่าเชื่อถือ',
      copyright: 'Captain Maid. สงวนลิขสิทธิ์',
      links: { solutions: 'โซลูชัน', products: 'สินค้า', trust: 'ความน่าเชื่อถือ', faq: 'คำถาม' },
    },
  },
};

export function HomePage() {
  const locale = useLocale() as 'en' | 'th';
  const c = COPY[locale] ?? COPY.en;

  return (
    <main className="bg-[#F5F9FF] text-slate-900 font-body antialiased">
      <HeroSection copy={c.hero} locale={locale} />
      <SolutionsSection copy={c.solutions} />
      <ProductsSection copy={c.products} />
      <TrustSection locale={locale} />
      <BlogSection posts={blogPosts.slice(0, 3)} eyebrow={c.blog.badge} title={c.blog.title} description={c.blog.subtitle} ctaLabel={c.blog.cta} />
      <FAQSection copy={c.faq} locale={locale} />
      <CTASection copy={c.cta} locale={locale} />
      <FooterSection copy={c.footer} locale={locale} />
    </main>
  );
}
