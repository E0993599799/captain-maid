# Captain Maid Asset Library

แหล่งอ้างอิงกลางสำหรับภาพของ Captain Maid ในโปรเจกต์นี้

## Rules

- Source assets อยู่ใน `photo_from_googlr_drive/` และถือเป็น reference originals
- Production assets ที่หน้าเว็บเรียกใช้ อยู่ใน `public/images/`
- ห้ามแก้ไข source originals โดยตรง
- Hero slide 1 คง artwork เดิม ไม่ปรับ crop หรือแทนที่เนื้อหา
- Hero slides 2–4 ใช้ภาพแยกตาม breakpoint เพื่อรักษาองค์ประกอบสินค้า
- Product card ใช้ภาพสี่เหลี่ยมที่มีสินค้าและข้อความคุณสมบัติอ่านได้ในขนาดเล็ก
- ภาพ Glass Cleaner แบบพื้นขาวใช้เป็น alternate gallery/detail image ไม่ใช้แทนภาพ card หลัก

## Hero library

| Asset ID | Desktop | Tablet | Mobile | การใช้งาน |
|---|---|---|---|---|
| `brand-hero` | `slide-1-brand-clean.webp` (1280×600) | เดิม | เดิม | Brand introduction; unchanged |
| `product-range` | `slide-2-floor-care-desktop.jpg` (1920×900) | `slide-2-floor-care-tablet.jpg` (1440×1080) | `slide-2-floor-care-mobile.jpg` (1080×1440) | Floor-care range |
| `family-pet-safety` | `slide-3-family-safe-desktop.jpg` (1920×900) | `slide-3-family-safe-tablet.jpg` (1440×1080) | `slide-3-family-safe-mobile.jpg` (1080×1440) | Family and pet-safe positioning |
| `natural-cleaning-tech` | `slide-4-surface-care-desktop.jpg` (1920×900) | `slide-4-surface-care-tablet.jpg` (1440×1080) | `slide-4-surface-care-mobile.jpg` (1080×1440) | Surface-care positioning |

Runtime mapping: `components/home/HeroSlider.tsx`

## Product library

| Product | Production image | Source original | Dimensions | Selection |
|---|---|---|---|---|
| Floor Cleaner Lavender Kerry | `public/images/products-img/floor-lavender.webp` | `CAPTAINMAID Floor Cleaner Lavender Kerry  900 ml/00_00.webp` | 900×900 | Purple bottle, lavender visual, suitable for card |
| Floor Cleaner Floral Passion | `public/images/products-img/floor-floral.webp` | `CAPTAINMAID Floor Cleaner Floral Passion  900 ml/00.webp` | 900×900 | Pink bottle, floral visual, suitable for card |
| Floor Cleaner Tea Tree Flash | `public/images/products-img/floor-teatree.webp` | `CAPTAINMAID Floor Cleaner Tea Tree Flash  900 ml/01_00.webp` | 900×900 | Green bottle, tea-tree visual, suitable for card |
| Bathroom Cleaner Spray | `public/images/products-img/bathroom.jpg` | `CAPTAINMAID Bathroom Cleaner Spray 900 ml/Banner Bathroom Cleaner 500x500-01.jpg` | 500×500 | Product plus bathroom-cleaning callouts |
| Kitchen Cleaner Spray | `public/images/products-img/kitchen.jpg` | `CAPTAINMAID Kitchen Cleaner Spray 900 ml/Banner Kitchen Cleaner 500x500-01.jpg` | 500×500 | Product plus kitchen-cleaning callouts |
| Glass Cleaner | `public/images/products-img/glass.jpg` | `CAPTAINMAID Glass Cleaner 900 ml/Banner Glass-Cleaner 500x500-01.jpg` | 500×500 | Product plus glass-cleaning callouts |
| Glass Cleaner alternate | not card primary | `CAPTAINMAID Glass Cleaner 900 ml/กัปตันเมด ผลิตภัณฑ์เช็ดกระจก กลิ่นฟรุตตี้ เฟรช.png` | 1908×1620 | Clean product-only image for detail/gallery |

Runtime mapping: `lib/captain-products.ts`

## Source collections

- `photo_from_googlr_drive/CAPTAINMAID Bathroom Cleaner Spray 900 ml/` — 6 square feature images
- `photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Floral Passion  900 ml/` — 5 product images
- `photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Lavender Kerry  900 ml/` — 5 product images
- `photo_from_googlr_drive/CAPTAINMAID Floor Cleaner Tea Tree Flash  900 ml/` — 5 product images
- `photo_from_googlr_drive/CAPTAINMAID Glass Cleaner 900 ml/` — 6 square feature images plus 1 transparent product image
- `photo_from_googlr_drive/CAPTAINMAID Kitchen Cleaner Spray 900 ml/` — 6 square feature images
- `photo_from_googlr_drive/Slide Banner/` — supplied desktop, tablet, and phone banner references
- `photo_from_googlr_drive/LOGO CAPTAINMAID/` — supplied transparent logo

## Verification

The machine-readable inventory is `asset-library.json`. It records production paths, source paths, dimensions, semantic role, and selection rationale. Production product mappings were checksum-compared against their source originals before registration.
