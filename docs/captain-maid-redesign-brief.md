# Captain Maid redesign brief

## Goal
Turn homepage into product-led cleaning brand page with clear browsing paths, stronger content depth, and mobile-safe nav.

## Reference rule
Use only structural/template cues from example. Do not mention or copy the example brand name in product-facing copy.

## Required IA
- Main nav with `Products` dropdown
- Support links: `Support`, `About us`, `Blog`
- Homepage entry points for:
  - Floor Cleaner
  - Bathroom Cleaner
  - Kitchen Cleaner
  - Glass Cleaner
  - Multi-purpose Disinfectant
  - Dishwasher
  - View All
- Cleaning tips / solutions hub:
  - Clogs
  - Dirt & Grime
  - Germs & Bacteria
  - Grease
  - Whole House
  - Hard Water Spots
  - Limescale
  - Odour
  - Scuffs & Marks
  - Soap Scum

## Content requirements
- Add richer product detail blocks per item
- Use commercial, trust-building copy
- Keep Thai/English parity where the site already supports both
- Remove any leftover example-brand references from user-facing text

## 5-slide visual treatment
Need 5 reusable homepage/banner slide templates:
1. Hero / core promise
2. Product range
3. Cleaning problem → solution
4. Trust / proof / safety
5. CTA / shop / support

## Responsive requirements
- Mobile-safe dropdown and nav
- No horizontal overflow at small widths
- Stack sections cleanly on mobile
- Preserve desktop function and spacing
- Hero and product cards must stay readable on phone width

## Implementation target files
- `components/NavigationEnhanced.tsx`
- `components/HeroEnhanced.tsx`
- `components/ProductCard.tsx`
- `components/BlogNewsSection.tsx`
- `components/FAQAccordion.tsx`
- `components/ShopCta.tsx`
- `components/Footer.tsx`
- `app/[locale]/page.tsx`
- `locales/th.json`
- `locales/en.json`
- `lib/products.ts`

## Acceptance check
- Build passes
- Nav has Products dropdown
- Homepage has 5-slide-ready template structure
- Product content is richer
- No example-brand name in output copy
- Mobile view stays stable
