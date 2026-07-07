# Captain Maid UI Design Specification

เอกสารนี้รวมทุกอย่างตั้งแต่ต้นสำหรับใช้เป็น `ui-design.md` ของโปรเจกต์ Captain Maid ได้แก่ UI direction, brand palette, typography, component guide, section guide, implementation notes และ asset link สำหรับนำไปใช้ใน Markdown / HTML

---

## 1) Overview

This document defines the implementation-ready UI direction for the Captain Maid landing page / storefront.

The goal is to transform the current layout into a brand-consistent, modern, clean, product-focused website using the Captain Maid visual language from the provided references.

Key visual direction:

- bright aqua / sky-blue brand base
- deep royal blue for headline, logo text, and emphasis
- soft pale blue surfaces for cards and sections
- white highlights for cleanliness and trust
- energetic, clear, family-safe, friendly household-cleaning brand mood
- premium but approachable
- easy to scan, mobile-friendly, and conversion-focused

---

## 2) Brand Visual Direction

Captain Maid should feel:

- clean
- trustworthy
- bright
- active
- modern Thai consumer brand
- family-friendly
- pet-friendly
- surface-care focused
- easy to use
- confident and protective

Visual cues from the references:

- aqua logo background
- bold dark-blue lettering
- white outlines / highlights
- soft blue background sections
- rounded, clean promotional UI
- shield / protection feeling
- sparkling clean accents
- product-forward visual hierarchy

---

## 3) File-level Change Map

| File | Change |
|---|---|
| `tailwind.config.ts` | new Captain Maid palette + font families |
| `globals.css` | CSS variables + font import + utility classes |
| `layout.tsx` | OG image setup + font preload / font connection |
| `NavigationEnhanced.tsx` | new top utility bar + Captain Maid brand nav styling |
| `HeroEnhanced.tsx` | new blue gradient hero + clean brand messaging |
| `Button.tsx` | primary / secondary / ghost variants using brand palette |
| `ProductCard.tsx` | light blue card surface, pricing, badge, CTA |
| `Footer.tsx` | deep navy footer with bright brand accents |
| `ShopCta.tsx` | strong branded CTA block with product / catalog prompt |
| `FAQ.tsx` | brand section surface + accessible accordion |
| `page.tsx` | section backgrounds + landing composition using brand tokens |

---

## 4) Color Palette

Use the following palette as the source of truth.

### Core Tokens

```css
--cm-primary: #02A6E3;   /* main aqua / logo background */
--cm-accent:  #90D0F0;   /* soft blue surface */
--cm-light:   #B0D0F0;   /* pale card / section blue */
--cm-dark:    #1070B0;   /* hover / deeper blue */
--cm-text:    #001360;   /* deep navy text */
--cm-muted:   #506090;   /* secondary text */
--cm-white:   #FFFFFF;
--cm-border:  #D9EAF6;
--cm-soft:    #EAF6FD;
--cm-shadow:  rgba(0, 19, 96, 0.12);
```

### Semantic Usage

```css
--background: var(--cm-white);
--foreground: var(--cm-text);

--surface: var(--cm-accent);
--surface-soft: var(--cm-soft);
--surface-card: var(--cm-light);

--primary: var(--cm-primary);
--primary-hover: var(--cm-dark);
--primary-foreground: var(--cm-white);

--secondary: var(--cm-white);
--secondary-foreground: var(--cm-text);

--muted: var(--cm-muted);
--border: var(--cm-border);
```

### Color Usage Rules

- `#02A6E3` → primary CTA, highlight blocks, logo background accents
- `#1070B0` → hover states, stronger emphasis, selected states
- `#001360` → main headings, navigation text, important content
- `#90D0F0` → large background surfaces, hero wash, promo sections
- `#B0D0F0` → product cards, soft panels, FAQ items
- `#FFFFFF` → button text, clean contrast, negative space
- `#506090` → supporting copy, helper text, metadata

---

## 5) Typography

### Font Families

Use:

- `Poppins` for headings and strong UI emphasis
- `Montserrat` for body, labels, supporting copy
- `Monotype Corsiva` only as a decorative optional accent, not for core UI or content
- Thai fallback: `Noto Sans Thai`, `sans-serif`

### Font Tokens

```css
--font-heading: "Poppins", "Noto Sans Thai", sans-serif;
--font-body: "Montserrat", "Noto Sans Thai", sans-serif;
--font-accent: "Monotype Corsiva", cursive;
```

### Type Scale

```css
--text-xs: 12px;
--text-sm: 14px;
--text-md: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
--text-5xl: 48px;
--text-6xl: 60px;
```

### Typography Rules

#### Headings

- font: `Poppins`
- weight: `700` or `800`
- color: `#001360`
- letter spacing: slightly tight
- use strong, short lines

#### Body

- font: `Montserrat`
- weight: `400` / `500`
- color: `#506090` for secondary text
- color: `#001360` for important explanatory copy

#### UI Labels / Buttons

- font: `Poppins`
- weight: `600` / `700`
- color: depends on button variant
- use short action verbs

#### Decorative Accent

- `Monotype Corsiva` may be used very sparingly in a campaign ribbon, micro brand flourish, or subtitle
- do not use it for nav, product titles, FAQ, or long content

---

## 6) Layout Principles

### Container

```css
max-width: 1200px;
padding-inline: 20px;
margin-inline: auto;
```

Responsive suggestion:

- mobile: `20px`
- tablet: `32px`
- desktop: `48px`

### Breakpoints

```css
mobile: 0px - 767px;
tablet: 768px - 1023px;
desktop: 1024px+;
large: 1280px+;
```

### Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Radius

```css
--radius-sm: 10px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-pill: 999px;
```

### Shadow

```css
box-shadow: 0 10px 30px rgba(0, 19, 96, 0.12);
```

Use soft shadows only. No harsh dark shadow.

---

## 7) Branding Rules

### General Brand Language

The UI should visually reflect:

- cleaning power
- protection
- freshness
- clarity
- convenience
- multi-surface usability

### Tone of Voice

Copy should feel:

- clear
- confident
- practical
- benefit-led
- household friendly

Examples:

- เช็ดง่าย สะอาดได้ทุกคราบ
- ใช้ได้กับทุกพื้นผิว
- เป็นมิตรกับสัตว์เลี้ยง
- ปกป้องและถนอมพื้น
- ขจัดฝุ่นและคราบในรอบเดียว
- สะอาดทุกพื้น ใช้ได้กับทุกหุ่นยนต์
- กับตันเมด 3 สี 3 กลิ่น

---

## 8) Original Layout Interpretation

The original reference layout was a long e-commerce landing page with these major sections:

1. Promotion Snap / utility top bar
2. Main Navbar
3. Hero header
4. New Products
5. Weekly Discount
6. Top Sellings
7. Guideline / message section
8. Footer

Production implementation should not copy the absolute-position CSS directly. Instead, rebuild it using responsive sections, CSS grid, flexbox, reusable components, and Captain Maid design tokens.

---

## 9) Navigation Design (`NavigationEnhanced.tsx`)

### Structure

1. top utility bar
2. main navigation
3. optional mobile drawer

### Top Utility Bar

Include short utility items such as:

- Help
- Contact
- Promotion / free delivery note
- optional language switch

Style:

```css
background: #001360;
color: #FFFFFF;
height: 36px;
font-size: 12px;
```

### Main Nav

Should include:

- logo on left or center-left
- nav links
- product category link
- about / FAQ / contact
- optional cart / search icon

### Visual Style

```css
background: #FFFFFF;
border-bottom: 1px solid #D9EAF6;
color: #001360;
```

Hover / active state:

```css
color: #1070B0;
```

### Mobile

- collapse to hamburger
- keep logo visible
- keep CTA / shop access easy
- drawer background: white
- selected item accent: aqua or dark blue pill

---

## 10) Hero Design (`HeroEnhanced.tsx`)

### Objective

Immediately communicate:

- what the product is
- why it matters
- why users should trust it
- key product benefits

### Layout

Desktop:

- left: headline + benefit bullets + CTA
- right: product / brand visual
- background: blue gradient with soft clean feel

Mobile:

- stack text first
- show product image / logo after text
- keep CTA visible above fold

### Background

Use a gradient such as:

```css
linear-gradient(135deg, #EAF6FD 0%, #90D0F0 40%, #02A6E3 100%)
```

Optional decorative elements:

- soft sparkles
- curved divider
- subtle shield motif
- clean-wave motif

### Hero Content Model

#### Eyebrow

```text
Trusted household care
Multi-surface cleaning
```

#### Headline Options

```text
เช็ดง่าย สะอาดได้ทุกคราบ
```

```text
พลังความสะอาดที่ใช้ได้ทุกพื้นผิว
```

```text
กับตันเมด สะอาดง่าย ถนอมพื้น
```

#### Supporting Copy

Mention the main benefits:

- ใช้ได้กับทุกพื้นผิว
- เป็นมิตรกับสัตว์เลี้ยง
- ปกป้องและถนอมพื้น
- ขจัดฝุ่นและคราบได้อย่างรวดเร็ว

#### CTA

- ดูสินค้า
- สั่งซื้อเลย
- ดูรายละเอียดเพิ่มเติม

### Hero Styling

```css
heading.color: #001360;
subtext.color: #506090;
primary.cta.background: #02A6E3;
secondary.cta.background: #FFFFFF;
```

---

## 11) Button System (`Button.tsx`)

Support at least these variants:

- `primary`
- `secondary`
- `ghost`
- `outline`

### Primary

```css
background: #02A6E3;
color: #FFFFFF;
border: 1px solid #02A6E3;
```

Hover:

```css
background: #1070B0;
border-color: #1070B0;
```

### Secondary

```css
background: #FFFFFF;
color: #001360;
border: 1px solid #B0D0F0;
```

Hover:

```css
background: #EAF6FD;
```

### Ghost

```css
background: transparent;
color: #001360;
border: transparent;
```

Hover:

```css
background: rgba(2, 166, 227, 0.08);
```

### Shape

- rounded pill or rounded-lg
- medium height
- strong readable text
- no tiny CTA buttons

---

## 12) Product Card (`ProductCard.tsx`)

### Goal

Cards should feel:

- clean
- bright
- easy to scan
- product-focused
- retail-friendly

### Structure

- image area
- optional badge
- product title
- short descriptor
- price / CTA row
- optional fragrance or category tag

### Surface

```css
background: #B0D0F0 or #EAF6FD;
border: 1px solid #D9EAF6;
border-radius: 24px;
box-shadow: 0 10px 30px rgba(0, 19, 96, 0.08);
```

### Title

```css
font-family: Poppins, Noto Sans Thai, sans-serif;
font-weight: 700;
color: #001360;
```

### Description

```css
font-family: Montserrat, Noto Sans Thai, sans-serif;
color: #506090;
```

### CTA

- ดูสินค้า
- สั่งซื้อ
- ดูรายละเอียด

### Optional Badges

- ใหม่
- ขายดี
- 3 กลิ่น
- ใช้ได้ทุกพื้นผิว
- เป็นมิตรกับสัตว์เลี้ยง

Badge style:

```css
background: #02A6E3;
color: #FFFFFF;
border-radius: 999px;
```

---

## 13) Product / Benefit Sections

### New Products Section

Purpose: Showcase newly launched or highlighted products.

Recommended layout:

```css
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 32px;
```

Mobile:

```css
grid-template-columns: 1fr;
```

Section title examples:

- สินค้าแนะนำ
- กับตันเมด 3 สี 3 กลิ่น
- เลือกสูตรที่เหมาะกับบ้านคุณ

### Weekly Discount / Promotion Section

Purpose: Promote discounted products and campaign offers.

Recommended layout:

- left side: product / campaign visual
- right side: copy + product cards / CTA
- background: soft blue section

Title examples:

- โปรโมชันประจำสัปดาห์
- ดีลพิเศษ Captain Maid
- สะอาดคุ้มกว่าในรอบเดียว

### Top Sellings Section

Purpose: Highlight best-selling products.

Title examples:

- สินค้าขายดี
- สูตรยอดนิยม
- บ้านสะอาดง่ายด้วย Captain Maid

---

## 14) Key Benefits Strip

Use a horizontal benefit strip under hero.

Recommended benefits:

1. ใช้ได้กับทุกพื้นผิว
2. เป็นมิตรกับสัตว์เลี้ยง
3. ปกป้องและถนอมพื้น
4. ขจัดฝุ่นและคราบ
5. ใช้ได้กับทุกหุ่นยนต์

### Visual Style

```css
background: #FFFFFF;
border: 1px solid #D9EAF6;
border-radius: 24px;
box-shadow: 0 10px 30px rgba(0, 19, 96, 0.08);
```

Icon style:

```css
color: #02A6E3;
background: #EAF6FD;
border-radius: 999px;
```

---

## 15) Footer (`Footer.tsx`)

### Mood

Footer should feel:

- deep and solid
- trustworthy
- clean and complete
- slightly more premium than the body sections

### Style

```css
background: #001360;
color: #FFFFFF;
```

Secondary text:

```css
color: rgba(255,255,255,0.75);
```

Accent links:

```css
color: #90D0F0;
```

### Content

- logo / brand
- quick links
- shop categories
- contact
- social icons
- copyright
- optional brand statement

### Footer CTA

Optional:

- ดูสินค้าทั้งหมด
- ติดต่อเรา
- สอบถามตัวแทนจำหน่าย

---

## 16) Shop CTA Section (`ShopCta.tsx`)

### Purpose

A conversion block placed before footer or after key product sections.

### Content Direction

- headline: strong and short
- supporting sentence: invite user to explore products or learn more
- CTA button: clear and prominent

### Style

```css
background: linear-gradient(135deg, #001360 0%, #1070B0 55%, #02A6E3 100%);
color: #FFFFFF;
border-radius: 32px;
```

Example copy:

```text
พร้อมให้ทุกพื้นผิวสะอาดได้ในรอบเดียว
```

```text
เลือก Captain Maid ที่เหมาะกับบ้านของคุณ
```

---

## 17) FAQ Section (`FAQ.tsx`)

### Visual Design

- section background: `#EAF6FD`
- accordion items: white or pale blue cards
- headings: dark navy
- body text: muted navy-gray
- border: subtle soft blue

### Common FAQ Topics

- ใช้กับพื้นผิวอะไรได้บ้าง
- ปลอดภัยกับสัตว์เลี้ยงหรือไม่
- มีกี่กลิ่น
- ใช้กับพื้นรถได้ไหม
- เหมาะกับบ้านแบบไหน
- วิธีใช้งานอย่างไร
- ใช้กับหุ่นยนต์ถูพื้นได้หรือไม่

### Accordion States

- closed: white card
- open: pale blue surface
- icon rotates smoothly
- keep spacing generous

---

## 18) Page Composition (`page.tsx`)

Recommended section order:

1. utility bar
2. main navigation
3. hero
4. key benefits strip
5. featured products
6. category / fragrance highlights
7. product benefits section
8. shop CTA
9. FAQ
10. footer

### Suggested Section Background Flow

- hero → gradient blue
- benefit strip → white
- product showcase → soft pale blue
- feature explanation → white
- CTA → deep navy or aqua gradient
- FAQ → pale blue
- footer → dark navy

This creates a clean rhythmic alternation without losing brand consistency.

---

## 19) Section-specific Background Guidance

### Hero

- gradient blue
- clean sparkles acceptable
- curved divider acceptable

### Product Sections

Alternate between:

- `#FFFFFF`
- `#EAF6FD`
- `#90D0F0` very lightly applied as wash

### Avoid

- muddy gray
- dark-heavy backgrounds in content sections
- overly saturated red / orange
- unrelated green palette
- luxury black / gold styling

---

## 20) Imagery Direction

Use product / brand imagery that supports:

- bottle visibility
- logo clarity
- freshness
- home cleaning context
- floor / tile / surface care
- pet-friendly reassurance
- family-safe visual tone

### Preferred Image Style

- bright
- clean
- isolated or lightly contextualized
- high contrast against soft blue backgrounds
- no cluttered stock imagery

### Supporting Graphics

Allowed:

- sparkles
- shield motif
- curved lines
- thin connector lines
- soft icons for benefits

---

## 21) Micro-interactions

Use subtle, modern motion.

### Recommended Motion

- button hover: slight lift
- card hover: subtle translateY(-4px)
- accordion open: smooth height transition
- nav link hover: color shift + underline / indicator
- image hover: slight scale

### Motion Constraints

- keep transitions 180–250ms
- do not over-animate
- avoid distracting bounce effects

Example:

```css
transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
```

---

## 22) Accessibility

Must support:

- adequate contrast
- keyboard navigation
- visible focus ring
- semantic HTML structure
- clear button labels
- meaningful alt text
- readable mobile type sizes

### Focus Ring

Use a visible aqua / dark-blue ring:

```css
outline: 2px solid #02A6E3;
outline-offset: 2px;
```

### Contrast Guidance

- dark text on pale blue or white is preferred
- avoid pale text on pale blue
- white text only on dark blue / strong aqua blocks

---

## 23) Tailwind Guidance (`tailwind.config.ts`)

Recommended extension:

```ts
colors: {
  captain: {
    primary: "#02A6E3",
    accent: "#90D0F0",
    light: "#B0D0F0",
    dark: "#1070B0",
    text: "#001360",
    muted: "#506090",
    soft: "#EAF6FD",
    border: "#D9EAF6",
    white: "#FFFFFF",
  },
},
fontFamily: {
  heading: ["Poppins", "Noto Sans Thai", "sans-serif"],
  body: ["Montserrat", "Noto Sans Thai", "sans-serif"],
  accent: ["Monotype Corsiva", "cursive"],
}
```

---

## 24) Global CSS Guidance (`globals.css`)

Include:

- root CSS variables
- font imports
- selection color
- reusable utility classes
- brand gradient utility
- card / section helpers

### Suggested CSS Variables

```css
:root {
  --cm-primary: #02A6E3;
  --cm-accent: #90D0F0;
  --cm-light: #B0D0F0;
  --cm-dark: #1070B0;
  --cm-text: #001360;
  --cm-muted: #506090;
  --cm-white: #FFFFFF;
  --cm-border: #D9EAF6;
  --cm-soft: #EAF6FD;
  --cm-shadow: rgba(0, 19, 96, 0.12);
}
```

### Suggested Helper Utilities

```css
.bg-captain-gradient {
  background: linear-gradient(135deg, #EAF6FD 0%, #90D0F0 40%, #02A6E3 100%);
}

.text-brand {
  color: #001360;
}

.text-muted-brand {
  color: #506090;
}

.surface-card {
  background: #EAF6FD;
  border: 1px solid #D9EAF6;
  border-radius: 24px;
}

.shadow-brand {
  box-shadow: 0 10px 30px rgba(0, 19, 96, 0.12);
}

.ring-brand:focus-visible {
  outline: 2px solid #02A6E3;
  outline-offset: 2px;
}
```

---

## 25) Shop Asset Links for Markdown Articles

Use this section when placing store image links in `.md` articles.

### Markdown Version

```md
## สั่งซื้อ Captain Maid ได้ที่

<!-- ปุ่มไปช้อปที่ HomePro -->
[![สั่งซื้อ Captain Maid ที่ HomePro](https://upload.wikimedia.org/wikipedia/commons/d/d8/HomePro_Logo.svg)](ใส่ลิงก์ร้านค้าHomeProของคุณที่นี่)

<!-- ปุ่มไปช้อปที่ TikTok Shop -->
[![สั่งซื้อ Captain Maid ที่ TikTok Shop](https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg)](ใส่ลิงก์ร้านค้าTikTokของคุณที่นี่)

<!-- ปุ่มไปช้อปที่ Lazada -->
[![สั่งซื้อ Captain Maid ที่ Lazada](https://upload.wikimedia.org/wikipedia/commons/4/4d/Lazada_%282019%29.svg)](ใส่ลิงก์ร้านค้าLazadaของคุณที่นี่)

<!-- ปุ่มไปช้อปที่ Shopee -->
[![สั่งซื้อ Captain Maid ที่ Shopee](https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg)](ใส่ลิงก์ร้านค้าShopeeของคุณที่นี่)
```

---

## 26) Shop Asset Links for HTML / MDX

Use this version when the site supports HTML inside Markdown or MDX.

```html
<section class="shop-links">
  <h2>สั่งซื้อ Captain Maid ได้ที่</h2>

  <div class="shop-link-grid">
    <a href="ใส่ลิงก์ร้านค้าHomeProของคุณที่นี่" target="_blank" rel="noopener noreferrer" aria-label="สั่งซื้อ Captain Maid ที่ HomePro">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/HomePro_Logo.svg" alt="สั่งซื้อ Captain Maid ที่ HomePro" />
    </a>

    <a href="ใส่ลิงก์ร้านค้าTikTokของคุณที่นี่" target="_blank" rel="noopener noreferrer" aria-label="สั่งซื้อ Captain Maid ที่ TikTok Shop">
      <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="สั่งซื้อ Captain Maid ที่ TikTok Shop" />
    </a>

    <a href="ใส่ลิงก์ร้านค้าLazadaของคุณที่นี่" target="_blank" rel="noopener noreferrer" aria-label="สั่งซื้อ Captain Maid ที่ Lazada">
      <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Lazada_%282019%29.svg" alt="สั่งซื้อ Captain Maid ที่ Lazada" />
    </a>

    <a href="ใส่ลิงก์ร้านค้าShopeeของคุณที่นี่" target="_blank" rel="noopener noreferrer" aria-label="สั่งซื้อ Captain Maid ที่ Shopee">
      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" alt="สั่งซื้อ Captain Maid ที่ Shopee" />
    </a>
  </div>
</section>
```

### CSS for HTML Shop Links

```css
.shop-links {
  margin: 40px 0;
  padding: 28px;
  border-radius: 24px;
  background: #eaf6fd;
  text-align: center;
}

.shop-links h2 {
  margin: 0 0 20px;
  color: #001360;
  font-family: "Poppins", "Noto Sans Thai", sans-serif;
  font-size: 28px;
  font-weight: 700;
}

.shop-link-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr));
  gap: 16px;
  align-items: center;
}

.shop-link-grid a {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;
  padding: 18px;
  border: 1px solid #d9eaf6;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 19, 96, 0.08);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.shop-link-grid a:hover {
  transform: translateY(-2px);
  border-color: #02a6e3;
  box-shadow: 0 14px 34px rgba(0, 19, 96, 0.14);
}

.shop-link-grid img {
  max-width: 140px;
  max-height: 46px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .shop-link-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .shop-links {
    padding: 20px;
  }

  .shop-links h2 {
    font-size: 22px;
  }
}
```

---

## 27) Recommended Local Asset Structure

For more stable production use, store marketplace logos locally instead of relying on external image URLs.

```text
/public/shop-assets/homepro-logo.svg
/public/shop-assets/tiktok-shop-logo.svg
/public/shop-assets/lazada-logo.svg
/public/shop-assets/shopee-logo.svg
```

Then use:

```md
## สั่งซื้อ Captain Maid ได้ที่

[![สั่งซื้อ Captain Maid ที่ HomePro](/shop-assets/homepro-logo.svg)](ใส่ลิงก์ร้านค้าHomeProของคุณที่นี่)

[![สั่งซื้อ Captain Maid ที่ TikTok Shop](/shop-assets/tiktok-shop-logo.svg)](ใส่ลิงก์ร้านค้าTikTokของคุณที่นี่)

[![สั่งซื้อ Captain Maid ที่ Lazada](/shop-assets/lazada-logo.svg)](ใส่ลิงก์ร้านค้าLazadaของคุณที่นี่)

[![สั่งซื้อ Captain Maid ที่ Shopee](/shop-assets/shopee-logo.svg)](ใส่ลิงก์ร้านค้าShopeeของคุณที่นี่)
```

---

## 28) Blog Article CTA Block

Use this block at the end of Captain Maid blog articles.

```md
---

## อยากให้บ้านสะอาดง่ายขึ้น?

Captain Maid ช่วยให้การเช็ดถูพื้นและทำความสะอาดพื้นผิวต่าง ๆ ง่ายขึ้น เหมาะสำหรับบ้านที่ต้องการความสะอาด ใช้งานสะดวก และมีกลิ่นหอมสดชื่น

### สั่งซื้อ Captain Maid ได้ที่

[![สั่งซื้อ Captain Maid ที่ HomePro](https://upload.wikimedia.org/wikipedia/commons/d/d8/HomePro_Logo.svg)](ใส่ลิงก์ร้านค้าHomeProของคุณที่นี่)

[![สั่งซื้อ Captain Maid ที่ TikTok Shop](https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg)](ใส่ลิงก์ร้านค้าTikTokของคุณที่นี่)

[![สั่งซื้อ Captain Maid ที่ Lazada](https://upload.wikimedia.org/wikipedia/commons/4/4d/Lazada_%282019%29.svg)](ใส่ลิงก์ร้านค้าLazadaของคุณที่นี่)

[![สั่งซื้อ Captain Maid ที่ Shopee](https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg)](ใส่ลิงก์ร้านค้าShopeeของคุณที่นี่)
```

---

## 29) Implementation Standard

When implementing:

- do not recreate fixed-position design artifacts
- convert all layouts into responsive grid / flex systems
- prioritize mobile experience
- keep visual cleanliness high
- use the brand palette consistently
- ensure all sections feel from the same system
- keep the Captain Maid identity immediately recognizable
- use local assets when possible
- keep CTA links editable from a single config file if possible

---

## 30) Final Design Summary

This UI should look like:

- a clean, bright, modern Thai FMCG / household-care website
- strongly branded in Captain Maid blue tones
- easy to trust
- easy to scan
- light, fresh, and energetic
- product-first, benefit-led, and mobile-friendly

The visual system should consistently express:

- cleanliness
- protection
- usability
- freshness
- confidence

Use the Captain Maid aqua + deep blue palette as the main source of truth across all components and sections.
