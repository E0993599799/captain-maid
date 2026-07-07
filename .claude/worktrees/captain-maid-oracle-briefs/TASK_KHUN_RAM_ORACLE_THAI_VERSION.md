# TASK BRIEF FOR KHUN-RAM-ORACLE: THAI LANGUAGE WEBSITE VERSION

**Assigned To:** Khun-Ram-Oracle (Thai Language & Content Specialist)  
**Date:** 2026-07-06  
**Deadline:** 2026-07-10  
**Priority:** HIGH  
**Status:** READY FOR EXECUTION

---

## 🎯 MISSION

Create a complete Thai language version of the Captain Maid website with:
1. Full Thai language implementation using next-intl
2. Thai-specific content and localization
3. Thai routing structure (/th and /en)
4. Complete Thai translations for all pages
5. Thai-optimized product pages
6. Thai customer support content

---

## 📋 CURRENT STATE

**Live Website:** https://captain-maid.vercel.app

### Current Language Support ⚠️
- **English:** Default language (100% complete)
- **Thai:** UI strings in `locales/th.json` (partially complete)
- **Language Toggle:** Basic button only (TH/EN)
- **Routing:** Single route (no `/th/` routing yet)
- **Translations:** ~80 UI strings (needs expansion)

### Current Issues to Fix
- [ ] No locale-based routing implemented
- [ ] Thai language files not served properly
- [ ] Language toggle doesn't fully switch pages
- [ ] next-intl middleware not configured
- [ ] No Thai-specific content pages
- [ ] No Thai blog articles
- [ ] No Thai FAQs with localized answers
- [ ] No Thai customer reviews/testimonials

---

## 🌐 IMPLEMENTATION REQUIREMENTS

### Phase 1: Setup & Infrastructure (CRITICAL)

**next-intl Configuration:**
- [ ] Install and configure next-intl package
- [ ] Create i18n middleware for route handling
- [ ] Set up locale detection (browser language preference)
- [ ] Configure default locale (English)
- [ ] Configure supported locales (en, th)
- [ ] Set up locale-specific routing

**Folder Structure:**
```
app/
├── [locale]/
│   ├── page.tsx (home)
│   ├── layout.tsx (locale layout)
│   ├── about/
│   ├── blog/
│   ├── products/
│   ├── contact/
│   └── ...
├── api/ (shared, no locale)
locales/
├── en.json (complete translations)
├── th.json (complete translations)
```

**Environment Setup:**
- [ ] Update `next.config.js` for i18n
- [ ] Create locale middleware
- [ ] Configure routing in `vercel.json` or `next.config.ts`
- [ ] Set up language detection
- [ ] Test redirect logic

### Phase 2: Translation & Content (HIGH)

**Complete Thai Translations:**
- [ ] Navigation menu (Thai)
- [ ] Hero section (Thai)
- [ ] Product names and descriptions (Thai)
- [ ] Features section (Thai)
- [ ] FAQ content (Thai - localized answers)
- [ ] Trust section (Thai)
- [ ] Footer content (Thai)
- [ ] CTAs and buttons (Thai)
- [ ] Error messages (Thai)
- [ ] Form labels (Thai)

**Thai-Specific Content:**
- [ ] About Captain Maid (Thai version) - Company history, mission, values
- [ ] Product descriptions - Detailed, Thai-focused benefits
- [ ] Usage guides - Step-by-step Thai instructions
- [ ] Blog articles - Cleaning knowledge in Thai (Khun-Ram's specialty)
- [ ] Customer testimonials - Thai customer reviews
- [ ] FAQ answers - Thai-specific questions and answers
- [ ] Contact information - Thai customer service details
- [ ] Local partnerships - Thai retailers and partners

**Blog Articles (Thai):**
Need 5-10 blog articles on:
1. Natural cleaning tips (Thai homes)
2. Eco-friendly cleaning methods
3. Safe cleaning for families
4. Product care and storage
5. Seasonal cleaning guide
6. Pet-safe cleaning
7. Allergies and natural products
8. Thai home cleaning traditions
9. Health benefits of natural cleaning
10. Sustainable living at home

### Phase 3: Pages & Routes (SECONDARY)

**Home Page (`/th/` and `/en/`):**
- [ ] Hero section (localized)
- [ ] Product showcase (localized)
- [ ] Features (localized)
- [ ] Trust section (localized)
- [ ] CTA sections (localized)
- [ ] FAQ (localized)

**About Page (`/th/about` and `/en/about`):**
- [ ] Company history
- [ ] Mission and values
- [ ] Team information
- [ ] Product sourcing
- [ ] Certifications

**Products Page (`/th/products` and `/en/products`):**
- [ ] Product grid with filters
- [ ] Product detail pages
- [ ] Related products
- [ ] Customer reviews (Thai)
- [ ] Product specifications
- [ ] Pricing and availability

**Blog Page (`/th/blog` and `/en/blog`):**
- [ ] Blog article listing
- [ ] Search and filters
- [ ] Categories (Thai cleaning tips, product guides, etc.)
- [ ] Article detail pages
- [ ] Related articles
- [ ] Comments/discussions

**Contact Page (`/th/contact` and `/en/contact`):**
- [ ] Contact form (Thai labels)
- [ ] Company information
- [ ] Business hours (Thai timezone)
- [ ] Map/location
- [ ] FAQ quick links
- [ ] Support email

---

## 📝 TRANSLATION FILES

### locales/th.json (NEEDS EXPANSION)

Current structure (update and expand):
```json
{
  "nav": {
    "products": "สินค้า",
    "blog": "บทความ",
    "about": "เกี่ยวกับเรา",
    "contact": "ติดต่อเรา",
    "home": "หน้าแรก"
  },
  "hero": {
    "title": "สินค้าทำความสะอาดที่ปลอดภัยสำหรับครอบครัว",
    "subtitle": "ทำจากส่วนผสมธรรมชาติ",
    "cta": "ซื้อเลย"
  },
  "products": {
    "glass_cleaner": "น้ำยาทำความสะอาดกระจก",
    // ... more
  },
  // ... expand for all sections
}
```

### Content Categories to Translate

1. **Navigation & UI** (50 strings)
   - Menu items
   - Buttons and CTAs
   - Form labels
   - Error messages

2. **Product Content** (30 strings)
   - Product names
   - Descriptions
   - Features
   - Specifications

3. **Blog & Articles** (50+ strings)
   - Article titles
   - Article content
   - Categories
   - Tags

4. **Pages** (40 strings)
   - About page content
   - Contact page
   - FAQs
   - Legal/Privacy

5. **Marketing Copy** (30 strings)
   - Headlines
   - CTAs
   - Trust messages
   - Testimonials

---

## 🎓 THAI CONTENT GUIDELINES

**Language & Style:**
- Use formal Thai (ภาษาไทยราชการ) for business content
- Use conversational Thai for product descriptions
- Natural and idiomatic phrasing
- Culturally appropriate examples
- Thai-specific benefits and use cases

**SEO & Localization:**
- Thai keywords for search optimization
- Localized URLs with Thai-friendly slugs
- Meta descriptions in Thai
- Thai-specific content for Thai search
- Local business information

**Cultural Considerations:**
- Thai feng shui and home organization
- Traditional Thai cleaning methods
- Thai family values and safety
- Local product preferences
- Thai seasonal considerations

---

## 🛠️ TECHNICAL SETUP

### Installation & Configuration

```bash
# Install next-intl
npm install next-intl

# Create middleware
touch src/middleware.ts

# Create locale folder structure
mkdir -p app/[locale]
```

### middleware.ts Setup
```typescript
import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from '@/i18n.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### Layout Structure
```typescript
// app/[locale]/layout.tsx
export async function generateStaticParams() {
  return locales.map(locale => ({locale}));
}

export default function RootLayout({children, params}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}
```

### Page Structure
```typescript
// app/[locale]/page.tsx
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations();
  return <div>{t('hero.title')}</div>;
}
```

---

## 📊 EXPECTED DELIVERABLES

### Code Files
- [ ] `src/middleware.ts` - next-intl middleware
- [ ] `app/[locale]/layout.tsx` - Locale-aware layout
- [ ] `app/[locale]/page.tsx` - Home page with i18n
- [ ] `app/[locale]/about/page.tsx` - About page
- [ ] `app/[locale]/blog/page.tsx` - Blog listing
- [ ] `app/[locale]/products/page.tsx` - Products listing
- [ ] `app/[locale]/contact/page.tsx` - Contact page
- [ ] Updated `locales/th.json` - Complete Thai strings
- [ ] Updated `locales/en.json` - Complete English strings
- [ ] `i18n.config.ts` - Updated config with middleware

### Translation Files
- [ ] locales/th.json (500+ strings)
- [ ] locales/en.json (500+ strings)
- [ ] Blog articles (5-10 in Thai)
- [ ] Product descriptions (Thai)
- [ ] FAQ answers (Thai)
- [ ] Contact templates (Thai)

### Testing & Validation
- [ ] Thai text displays correctly
- [ ] Character encoding is UTF-8
- [ ] RTL/LTR handling (if needed)
- [ ] Language toggle works
- [ ] Locale-based routing works
- [ ] All pages accessible in both languages

---

## 📅 TIMELINE

**Day 1 (Jul 6):** Setup next-intl, middleware, folder structure  
**Day 2 (Jul 7):** Complete translation files (500+ strings)  
**Day 3 (Jul 8):** Create Thai pages and content  
**Day 4 (Jul 9):** Blog articles (5-10 articles)  
**Day 5 (Jul 10):** Testing, polish, deployment  

---

## 🔗 REFERENCE DOCUMENTS

**Available Resources:**
- `locales/th.json` - Current Thai translations (needs expansion)
- `locales/en.json` - English reference
- `PRODUCT_SCRAPING_SPEC.md` - Product data available
- `captain-maid-product-index/` - Actual product data

**Components to Update:**
- `app/page.tsx` - Home page
- `components/HeroEnhanced.tsx` - Hero section
- `components/ProductCard.tsx` - Product cards
- `components/Footer.tsx` - Footer
- `components/FAQ.tsx` - FAQ section

---

## ✅ QUALITY CHECKLIST

### Language Quality
- [ ] Correct Thai grammar and spelling
- [ ] Proper tone and formality
- [ ] Consistent terminology
- [ ] No English words (unless necessary)
- [ ] Culturally appropriate

### Technical Quality
- [ ] All routes work (en and th)
- [ ] Language toggle functions
- [ ] No missing translations
- [ ] Build succeeds
- [ ] No TypeScript errors

### Content Quality
- [ ] Product descriptions complete
- [ ] Blog articles engaging
- [ ] FAQ answers helpful
- [ ] All pages fully localized
- [ ] Navigation works in Thai

### SEO & Performance
- [ ] Thai metadata complete
- [ ] Proper language tags
- [ ] Sitemap updated
- [ ] Load time acceptable
- [ ] Mobile responsive

---

## 📞 BLOG ARTICLE SUGGESTIONS

**Topics for 5-10 Thai Articles:**

1. "วิธีทำความสะอาดบ้านด้วยส่วนผสมธรรมชาติ"
   (How to clean your home with natural ingredients)

2. "ผลิตภัณฑ์ทำความสะอาดที่ปลอดภัยสำหรับครอบครัวไทย"
   (Safe cleaning products for Thai families)

3. "เคล็ดลับการทำความสะอาดพื้นเป็นมันเงา"
   (Tips for sparkling clean floors)

4. "ความส่งเสริมด้านสุขภาพของการใช้ผลิตภัณฑ์ธรรมชาติ"
   (Health benefits of natural cleaning products)

5. "การทำความสะอาดตามแบบดั้งเดิมไทย vs สมัยใหม่"
   (Traditional Thai cleaning methods vs modern)

6. "ผลิตภัณฑ์ปลอดภัยสำหรับสัตว์เลี้ยงในบ้าน"
   (Pet-safe cleaning products for Thai homes)

7. "วิธีเก็บรักษาผลิตภัณฑ์ให้มีคุณภาพนาน"
   (How to store products properly for longevity)

8. "การทำความสะอาดอย่างยั่งยืนสำหรับสิ่งแวดล้อม"
   (Sustainable cleaning for the environment)

---

## 💬 KEY DECISIONS

**Should clarify with user:**
1. Include customer reviews in Thai?
2. Create Thai customer testimonials?
3. Need Thai language customer support?
4. Blog article frequency (monthly, weekly)?
5. Should we translate existing English blog content?
6. Need Thai-specific product pages?
7. Include Thai retailers information?

---

## 🏆 SUCCESS CRITERIA

✅ **Complete Thai Version:**
- All pages available in Thai
- Full locale-based routing
- All content translated

✅ **Quality Content:**
- Engaging Thai blog articles
- Helpful FAQ answers
- Authentic product descriptions
- Professional tone maintained

✅ **Technical Excellence:**
- next-intl properly configured
- Locale switching works
- No missing translations
- Build succeeds
- SEO optimized

✅ **User Experience:**
- Seamless language toggle
- Fast page loads in Thai
- Mobile responsive
- Proper Thai character display
- Smooth navigation

---

## 📞 HANDOFF STATUS

**Current Thai Support:**
- UI strings partially translated
- No page routing yet
- No blog articles
- No Thai-specific content

**Your Responsibilities:**
1. Complete i18n setup with next-intl
2. Expand translations to 500+ strings
3. Create Thai pages and routing
4. Write 5-10 Thai blog articles
5. Create Thai-specific content
6. Test thoroughly
7. Deploy to Vercel

**Support Available:**
- Product data in `captain-maid-product-index/`
- Design system ready in `tailwind.config.ts`
- Components in `/components/`
- Live site at https://captain-maid.vercel.app

---

**Status:** READY FOR EXECUTION ✅  
**Assigned:** 2026-07-06  
**Deadline:** 2026-07-10  
**Priority:** HIGH 🔴  
**Language:** Thai with English support  
**Branch:** main (work from main)

---

## 🚀 NEXT STEPS FOR YOU

1. Review this brief thoroughly
2. Set up next-intl and middleware
3. Plan translation structure
4. Start with critical pages (home, products)
5. Write blog articles
6. Test language switching
7. Deploy and verify

**Good luck, Khun-Ram-Oracle! ขอให้โชคดี!** 🇹🇭
