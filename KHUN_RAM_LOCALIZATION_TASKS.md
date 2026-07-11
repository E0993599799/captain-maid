# Khun-Ram-Oracle Thai Localization Tasks

**Status**: 🟡 In Progress  
**Priority**: High  
**Deadline**: 2026-07-12 EOD  

---

## Overview

Khun-Ram is responsible for all Thai content, translation accuracy, cultural adaptation, and documentation standards for Captain Maid project.

---

## Task 1: Navigation & UI Text Translation 🗣️

**Current Files**:
- `/locales/th.json` - Thai translations
- `/locales/en.json` - English (reference)

**Required Translations**:

### Navigation Menu
- [ ] Products → สินค้า
- [ ] Cleaning Tips & Solutions → เคล็ดลับและวิธีแก้ไข
- [ ] Support → ช่วยเหลือ
- [ ] About us → เกี่ยวกับเรา
- [ ] Blog → บทความ

### Product Categories
- [ ] Floor Cleaner → ผลิตภัณฑ์ทำความสะอาดพื้น
- [ ] Bathroom Cleaner → ผลิตภัณฑ์ทำความสะอาดห้องน้ำ
- [ ] Kitchen Cleaner → ผลิตภัณฑ์ทำความสะอาดครัว
- [ ] Glass Cleaner → ผลิตภัณฑ์ทำความสะอาดแกว
- [ ] Multi-purpose Disinfectant → ผลิตภัณฑ์ฆ่าเชื้อแบบหลายประเภท
- [ ] Dishwasher → ผลิตภัณฑ์ล้างจาน

### Buttons & CTAs
- [ ] Shop Now → ซื้อเลย
- [ ] View All Products → ดูสินค้าทั้งหมด
- [ ] Add to Cart → เพิ่มลงตะกร้า
- [ ] Buy Now → ซื้อเดี๋ยวนี้
- [ ] Contact Us → ติดต่อเรา
- [ ] Learn More → เรียนรู้เพิ่มเติม

### Messages & Labels
- [ ] Welcome → ยินดีต้อนรับ
- [ ] Made for Easy Home Cleaning → ออกแบบมาเพื่อทำความสะอาดบ้านได้ง่ายขึ้น
- [ ] Happy Customers → ลูกค้าที่พึงพอใจ
- [ ] From Reviews → จากการรีวิว
- [ ] Scroll to explore → เลื่อนเพื่อสำรวจ

---

## Task 2: Product Content Translation 📝

**Current Files**:
- `/data/products.ts` - Product data

**For each product, provide**:
- [ ] Thai product name
- [ ] Thai product description (2-3 lines)
- [ ] Thai usage instructions
- [ ] Thai ingredients/specifications (if applicable)

**Example Products to Translate**:
1. Floor Cleaner (Basic)
2. Bathroom Cleaner (Deluxe)
3. Kitchen Cleaner (Professional)
4. Glass Cleaner (Standard)
5. Multi-purpose Disinfectant
6. Dishwasher (Automatic)

**Quality Standards**:
- Translations should reflect brand voice (professional yet approachable)
- Use consistent terminology across all products
- Avoid literal translations; use natural Thai phrasing
- Consider consumer reading level (secondary education)

---

## Task 3: Blog & Content Localization 📚

**Blog Posts to Translate**:
- [ ] "5 Tips for Spotless Floors" → "5 เคล็ดลับเพื่อพื้นที่สะอาดวาวไร้จุด"
- [ ] "Bathroom Cleaning Secrets" → "ความลับการทำความสะอาดห้องน้ำ"
- [ ] "Kitchen Grease Removal" → "วิธีกำจัดน้ำมันคราบในครัว"
- [ ] Create 3-5 new blog posts specific to Thai audience

**Topics for Thai audience**:
- [ ] Cleaning humid climate (tropical relevance)
- [ ] Mold & mildew prevention (important in Thailand)
- [ ] Hard water stain removal (common issue)
- [ ] Eco-friendly cleaning practices
- [ ] Cost-effective cleaning routines

**Translation approach**:
- Keep brand voice consistent
- Adapt examples to Thai context (mention local products, climate)
- Include cultural references that resonate with Thai audience

---

## Task 4: Support & FAQ Localization 📋

**FAQ Topics to Translate** (from TIPS list):
- [ ] Clogs → อุดตันท่อ
- [ ] Dirt & Grime → ฝุ่น และคราบสกปรก
- [ ] Germs & Bacteria → เชื้อโรค และแบคทีเรีย
- [ ] Grease → น้ำมัน
- [ ] Whole House → ทั้งบ้าน
- [ ] Hard Water Spots → คราบน้ำแข็ง
- [ ] Limescale → ตะกรันปูน
- [ ] Odour → กลิ่นอับชื้น
- [ ] Scuffs & Marks → รอยขีด รอยยา
- [ ] Soap Scum → ตะกรันสบู่

**For each FAQ**:
- [ ] Thai question
- [ ] Thai solution/answer
- [ ] Recommended products (with Thai names)
- [ ] Step-by-step instructions in Thai

---

## Task 5: Website Metadata Translation 🔍

**SEO & Technical Translations**:

**Page Titles & Descriptions**:
- [ ] Home: "Captain Maid - ผลิตภัณฑ์ทำความสะอาดบ้านแบบมืออาชีพ"
- [ ] Products: "สินค้าทำความสะอาด | Captain Maid"
- [ ] Blog: "บทความและเคล็ดลับการทำความสะอาด"
- [ ] Contact: "ติดต่อ Captain Maid"
- [ ] About: "เกี่ยวกับ Captain Maid"

**Meta Descriptions** (155-160 chars Thai):
- [ ] Each page should have SEO-optimized Thai description

**Alt Text for Images**:
- [ ] All product images (ผลิตภัณฑ์ [category] [name])
- [ ] Hero character (ตัวการ์ด Captain Maid ยิ้มแย้ม)
- [ ] Decorative images (with aria-hidden if purely decorative)

---

## Task 6: Glossary & Terminology Standards 📖

**Create `/docs/THAI_GLOSSARY.md`**:

A comprehensive glossary of:
- [ ] All product-related terms (English → Thai)
- [ ] Technical cleaning terms
- [ ] Common household problems
- [ ] Brand terminology (Captain Maid → เชฟ เมด)

**Example entries**:
```
| English | Thai | Context |
|---------|------|---------|
| Floor Cleaner | ผลิตภัณฑ์ทำความสะอาดพื้น | Product category |
| Streak-free | ไร้รอยยา | Product benefit |
| Disinfectant | ผลิตภัณฑ์ฆ่าเชื้อ | Technical term |
```

**Consistency check**:
- [ ] Same term always translated the same way
- [ ] Abbreviations standardized
- [ ] Brand voice consistent across all Thai text

---

## Task 7: Content Style Guide 📝

**Create `/docs/THAI_CONTENT_STYLE_GUIDE.md`**

**Guidelines for Thai copywriting**:
- [ ] Tone of voice (professional + friendly)
- [ ] Sentence structure (short, clear Thai sentences)
- [ ] Capitalization rules (Thai doesn't have uppercase/lowercase)
- [ ] Number formatting (Thai uses period as thousands separator)
- [ ] Date formatting (วันที่ X เดือน X ปี X)
- [ ] Currency (฿ for Thai Baht)
- [ ] Common phrases and their proper usage

**Example style**:
- Use inclusive language ("เราจะช่วยให้..." rather than imperative)
- Avoid overly formal Thai (suitable for modern audience)
- Include cultural context where relevant
- Keep technical terms readable (with parenthetical English if needed)

---

## Task 8: Documentation Maintenance 📚

**Update/Create Documentation**:

- [ ] `/docs/LOCALIZATION.md` - Comprehensive localization guide
- [ ] `/docs/THAI_GLOSSARY.md` - Term reference
- [ ] `/docs/THAI_CONTENT_STYLE_GUIDE.md` - Writing standards
- [ ] Add Thai translations to main `/CLAUDE.md`
- [ ] Create `/docs/TRANSLATION_WORKFLOW.md` - Process for future translations

**Documentation standards**:
- [ ] Include examples in both languages
- [ ] Clear instructions for adding new Thai content
- [ ] Guidelines for maintaining translation quality
- [ ] Contact info for Thai language expert review

---

## Quality Assurance

**Before finalizing, verify**:

- [ ] All text displayed in Thai (no English leakage)
- [ ] Font renders correctly (Thai characters display properly)
- [ ] Text wrapping is correct (Thai doesn't have space-separated words)
- [ ] Right-to-left considerations (if any)
- [ ] Mobile display of Thai text (longer lines, font sizing)
- [ ] Numbers and currency format correctly
- [ ] Dates display correctly (Thai calendar if applicable)

**Browser testing**:
- [ ] Chrome/Safari on desktop
- [ ] Mobile Safari on iPhone
- [ ] Chrome on Android
- [ ] Verify all Thai characters render

---

## Deliverables

**By EOD 2026-07-12, deliver**:
- ✅ `/locales/th.json` (100% complete)
- ✅ `/data/products.ts` with Thai translations
- ✅ `/docs/THAI_GLOSSARY.md`
- ✅ `/docs/THAI_CONTENT_STYLE_GUIDE.md`
- ✅ All blog posts with Thai versions
- ✅ All FAQ content in Thai
- ✅ Meta tags and SEO text in Thai
- ✅ Quality assurance testing complete

---

## Translation Quality Checklist

Before marking complete, verify:

- [ ] No typos in Thai text
- [ ] Proper tone (brand-appropriate)
- [ ] Consistency with glossary
- [ ] Grammar and punctuation correct
- [ ] Natural flow (not word-for-word from English)
- [ ] Cultural appropriateness
- [ ] Technical accuracy for product info
- [ ] SEO keywords included where appropriate

---

## Communication

**Report progress**: Update this file with checkmarks  
**Questions about translation**: Leave comments  
**Glossary updates**: Document new terms as they arise  

---

## Notes for Khun-Ram

As Royal Scribe and Thai Language Authority:
- Prioritize accuracy and cultural appropriateness over literal translation
- Consider that Thai audience values respectful, humble tone
- Product safety information must be crystal clear
- Support/FAQ content should be warm and helpful
- Blog posts should educate, not just sell

**Thai is the primary market** — Thai content quality is critical to success.

---

**Ready to begin Thai localization?** ✨
