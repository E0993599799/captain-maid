# Captain Maid Section-Based Homepage Logic

เอกสารนี้อธิบายโครง logic ของหน้า Home แบบ section-based เพื่อให้คนถัดไปต่อได้เร็ว และไม่ต้องไล่แกะจาก component ใหญ่ตัวเดียว

## ภาพรวม

หน้า Home ตอนนี้ไม่ได้ render จาก component ก้อนเดียวแล้ว แต่ compose จาก section ย่อยหลายตัวในลำดับที่กำหนดชัดเจน

ลำดับการ render:

1. Hero
2. Solutions
3. Products
4. Trust
5. Blog
6. FAQ
7. CTA
8. Footer

entry point หลัก:

- `app/[locale]/page.tsx`
- render ผ่าน `components/HomePage.tsx`

## โครงสร้างไฟล์

### Layout primitives

- `components/layout/Container.tsx`
  - กำหนด width กลางของ section
  - ใช้ `max-w-7xl` และ padding มาตรฐาน
- `components/layout/Section.tsx`
  - ครอบ section แต่ละ block
  - ใส่ vertical spacing มาตรฐาน
- `components/layout/SectionHeader.tsx`
  - ใช้กับ section ที่มี eyebrow / title / description

### Section components

- `components/sections/HeroSection.tsx`
  - hero block
- `components/sections/SolutionsSection.tsx`
  - solution cards block
- `components/sections/ProductsSection.tsx`
  - product showcase block
- `components/sections/TrustSection.tsx`
  - trust / proof block
- `components/sections/FAQSection.tsx`
  - FAQ block
- `components/sections/CTASection.tsx`
  - final CTA block
- `components/sections/FooterSection.tsx`
  - footer block
- `components/sections/BlogSection.tsx`
  - blog preview block
- `components/sections/home-copy.ts`
  - shared copy type contract

### Compose layer

- `components/HomePage.tsx`
  - เป็นตัวประกอบหน้าหลัก
  - ดึง copy ตาม locale
  - เรียง sections ตามลำดับ rendering

## Data flow

### ภาษา / locale

- `useLocale()` จาก `next-intl`
- รองรับ `en` และ `th`
- copy ถูกเก็บใน object `COPY` ภายใน `components/HomePage.tsx`
- FAQ ใช้ `faqItems` จาก `data/faqs.ts`
- Blog ใช้ `blogPosts` จาก `data/blogPosts.ts`

### Section contract

แนวคิดคือ:

- section รับเฉพาะ data ที่ตัวเองต้องใช้
- section ไม่ควรรู้ว่าข้อมูลมาจากไหน
- compose layer เป็นคนตัดสินใจว่าจะส่ง data อะไรเข้าไป

ตัวอย่าง:

- `HeroSection` รับ hero copy + locale
- `SolutionsSection` รับ solutions copy
- `ProductsSection` รับ products copy
- `TrustSection` รับ locale
- `FAQSection` รับ faq copy + locale
- `CTASection` รับ cta copy + locale
- `FooterSection` รับ footer copy + locale

## Blog logic

Blog ถูกยกเป็น section กลางของหน้า Home เพื่อทำ 2 อย่างพร้อมกัน:

1. ทำให้ homepage มี content อัปเดตได้ง่าย
2. ทำให้คนเข้าหน้า Home เห็นบทความล่าสุด/แนวทางการใช้งานสินค้า

บนหน้า Home:

- แสดง `blogPosts.slice(0, 3)`
- ใช้ `BlogSection`
- ไม่ผูกกับ logic หน้ารายละเอียดบทความ

บนหน้า Blog route:

- ใช้ section primitives เดียวกัน
- แต่ใช้ layout ของหน้า blog โดยเฉพาะ

## แนวทางแก้ไขต่อ

ถ้าจะเพิ่ม section ใหม่ ให้ทำตามนี้:

1. สร้าง component ใหม่ใน `components/sections/`
2. ถ้า layout ซ้ำ ให้ใช้ `Container`, `Section`, `SectionHeader`
3. เพิ่ม data/copy ใน `components/HomePage.tsx`
4. วาง section ใหม่ในลำดับที่เหมาะสม

## ข้อควรระวัง

- อย่าเอา copy ภาษาไทย/อังกฤษไป hardcode กระจายหลายไฟล์ถ้าไม่จำเป็น
- อย่าให้ section หนึ่งไปดึง data ของอีก section โดยตรง
- ถ้า logic เริ่มยาว ให้แยกเป็น section component ใหม่ แทนการทำให้ `HomePage.tsx` หนาขึ้นเรื่อย ๆ

## สถานะปัจจุบัน

- หน้า Home ถูก refactor เป็น section-based แล้ว
- Blog ถูกทำเป็น section reusable แล้ว
- legacy landing component เก่าถูกลบแล้ว; route หลักใช้ `components/HomePage.tsx` และชุด section ใหม่ทั้งหมด
