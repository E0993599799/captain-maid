# Captain Maid 2.0 — Section-Based Architecture

## Project Overview

Modern Next.js website for Captain Maid premium home cleaning products. Redesigned with **composable section-based architecture** for scalability, maintainability, and strong Thai/English content parity.

**Design Partner**: Codex (Architecture) + Luxi (UI/UX) + Khun-Ram (Localization)

## Architecture Vision

**From**: Monolithic homepage components
**To**: Composable section system with clean data contracts

Homepage renders as **8 ordered sections**:
1. Hero (core promise)
2. Solutions (problem → solution hub)
3. Products (product range showcase)
4. Trust (proof, safety, credibility)
5. Blog (content updates, tips)
6. FAQ (common questions)
7. CTA (shop, support)
8. Footer (links, legal)

Each section is **independently testable**, **locale-aware**, and **reusable** across pages.

## Tech Stack

- **Framework**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Localization**: next-intl (Thai/English with parity)
- **Animations**: Framer Motion
- **Backend**: Supabase (products, contacts, orders)
- **Deployment**: Vercel
- **Architecture Pattern**: Section-based composition with layout primitives

## Key Features

✅ **Product-led** homepage with browsing paths
✅ **Solutions hub** for cleaning problems (clogs, germs, grime, etc.)
✅ **5-slide visual treatment** (Hero, Products, Solutions, Trust, CTA)
✅ **Mobile-safe nav** with Products dropdown
✅ **Rich product detail** blocks per item
✅ **Thai/English parity** maintained throughout
✅ **Blog integration** as homepage section (3 latest posts)
✅ **Section-based layout** for maintainability
✅ **Trust indicators** (proof, safety, credibility)
✅ **Fast performance** optimized for Thailand 4G

## Project Structure (Section-Based)

```
components/
├── layout/
│   ├── Container.tsx         # max-w-7xl + padding wrapper
│   ├── Section.tsx           # vertical spacing + styling
│   └── SectionHeader.tsx     # eyebrow + title + description
├── sections/
│   ├── HeroSection.tsx       # Hero slide (promise, CTA)
│   ├── SolutionsSection.tsx  # Solutions hub (8 problem cards)
│   ├── ProductsSection.tsx   # Product showcase (6 products + View All)
│   ├── TrustSection.tsx      # Proof, safety, credibility
│   ├── BlogSection.tsx       # 3 latest blog posts
│   ├── FAQSection.tsx        # FAQ accordion
│   ├── CTASection.tsx        # Final shop/support CTA
│   ├── FooterSection.tsx     # Footer with links
│   └── home-copy.ts          # Copy contract (shared types)
├── HomePage.tsx              # Composer: assembles sections + manages locale
├── NavigationEnhanced.tsx    # Nav with Products dropdown
├── ProductCard.tsx           # Reusable product card
└── FAQAccordion.tsx         # Reusable FAQ component

app/[locale]/
├── page.tsx                  # Entry point → HomePage.tsx
├── products/
│   ├── page.tsx              # Products listing
│   ├── [id]/page.tsx         # Product detail
│   └── layout.tsx
├── blog/
│   ├── page.tsx              # Blog listing
│   ├── [slug]/page.tsx       # Blog post detail
│   └── layout.tsx
├── about/page.tsx
├── contact/page.tsx
├── faq/page.tsx
└── where-to-buy/page.tsx

data/
├── products.ts               # Product data (6 core + extend)
├── faqs.ts                   # FAQ items (10+)
├── blogPosts.ts              # Blog posts
└── solutions.ts              # Cleaning solutions (8 categories)

locales/
├── th.json                   # Thai copy (comprehensive)
└── en.json                   # English reference

public/
├── robots.txt
└── sitemap.xml
```

## Core Product Categories

Homepage showcases 6 core products with entry points:
1. **Floor Cleaner** — All floors, safe & effective
2. **Bathroom Cleaner** — Soap scum, mold, germs
3. **Kitchen Cleaner** — Grease, shine, safety
4. **Glass Cleaner** — Streak-free shine
5. **Multi-purpose Disinfectant** — Whole house protection
6. **Dishwasher** — Powerful clean, fresh dishes

**+ View All** → Full product directory

## Solutions Hub (Cleaning Problems → Solutions)

8 cleaning problem categories (each links to relevant products):
1. **Clogs** — Drain care, prevention
2. **Dirt & Grime** — Deep clean surfaces
3. **Germs & Bacteria** — Disinfection, safety
4. **Grease** — Kitchen, cooktop, degreasing
5. **Whole House** — Multi-room solutions
6. **Hard Water Spots** — Glass, fixtures, shine
7. **Limescale** — Bathroom, kettles, buildup
8. **Odour** — Fresh, long-lasting scent

## Data Contract: Section Props

Each section receives **only what it needs**:

```typescript
// HeroSection
{ heroTitle, heroCopy, ctaText, locale }

// SolutionsSection
{ solutions: Solution[], locale }

// ProductsSection
{ products: Product[], locale }

// TrustSection
{ trusts: Trust[], locale }

// BlogSection
{ posts: BlogPost[], locale }

// FAQSection
{ faqs: FAQ[], locale }

// CTASection
{ ctaCopy, ctaLink, locale }

// FooterSection
{ footerCopy, locale }
```

Each section uses `useLocale()` from `next-intl` to access copy.

## Environment Setup

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Database Schema (Supabase)

Products table:
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(255),
  category VARCHAR(100),
  rating DECIMAL(2, 1),
  review_count INT,
  created_at TIMESTAMP
);
```

Contacts table:
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP
);
```

Blog posts table:
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY,
  title VARCHAR(255),
  slug VARCHAR(255),
  content TEXT,
  author VARCHAR(255),
  published_at TIMESTAMP,
  created_at TIMESTAMP
);
```

## Development Guidelines

### Adding a New Section

1. Create component in `components/sections/NewSection.tsx`
2. Use layout primitives: `Container`, `Section`, `SectionHeader`
3. Define props contract (what data it needs)
4. Accept `locale` prop if using copy
5. Register in `components/HomePage.tsx`
6. Place in render order (typically before Footer)

### Locale & Copy Management

- All UI copy lives in `components/HomePage.tsx` or locale JSON
- Use `useLocale()` from `next-intl` in sections
- Maintain Thai/English parity (no English-only features)
- Test both languages before commit

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| LCP | < 2.5s | Thailand 4G networks |
| FID | < 100ms | Touch interactions on mobile |
| CLS | < 0.1 | Layout stability |
| Bundle Size | < 500KB | Fast download |
| Lighthouse | > 90 | Mobile & desktop |

### Responsive Design Rules

- Mobile-first breakpoints
- No horizontal overflow at any width
- Hero & product cards readable at 360px width
- Navigation dropdowns stack cleanly on mobile
- Touch targets ≥ 44×44px

## Building & Deployment

```bash
# Development
npm install
npm run dev

# Production build
npm run build

# Deploy to Vercel
vercel deploy --prod
```

## Deployment Checklist

- [ ] Section-based architecture implemented
- [ ] All 8 sections render correctly
- [ ] Thai/English copy parity verified
- [ ] Products dropdown in nav functional
- [ ] Solutions hub links to products
- [ ] Mobile responsive (tested on real devices)
- [ ] Blog section shows 3 latest posts
- [ ] FAQ accordion works
- [ ] No console errors (critical only)
- [ ] Lighthouse score > 90
- [ ] Environment variables configured
- [ ] Vercel project linked
- [ ] Custom domain configured
- [ ] Analytics monitoring active

## Known Requirements from Redesign Brief

✅ **Navigation**
- Main nav with Products dropdown
- Support, About us, Blog links
- Mobile-safe (no horizontal overflow)

✅ **Homepage Entry Points**
- Direct links to: Floor, Bathroom, Kitchen, Glass, Disinfectant, Dishwasher
- View All products link
- Solutions hub (8 categories)

✅ **Content**
- Richer product detail blocks
- Commercial, trust-building copy
- Thai/English parity maintained
- No example-brand references

✅ **Visual Treatment**
- 5-slide reusable templates
- Hero, Products, Solutions, Trust, CTA slides
- Consistent spacing & typography

## Architecture Validation

Section-based design ensures:
- ✅ **Scalability** — Add sections without modifying HomePage
- ✅ **Testability** — Each section independently testable
- ✅ **Reusability** — Sections usable on multiple pages
- ✅ **Maintainability** — Clear data contracts, no hidden dependencies
- ✅ **Performance** — Lazy-load non-critical sections
- ✅ **Localization** — Centralized copy management

## Standing Orders

1. **No monolithic components** — Keep sections focused and small
2. **Locale first** — Thai support is non-negotiable
3. **Mobile tested** — Use real devices, not just DevTools
4. **Copy centralized** — No hardcoded UI text in components
5. **Performance monitored** — Target metrics tracked per deploy
6. **Archive preserved** — Nothing is deleted; evolution tracked

---

**Architecture designed by Codex**  
**UI/UX by Luxi Junior Oracle**  
**Localization by Khun-Ram Oracle**

*Last updated: 2026-07-12*  
© 2026 Captain Maid - All rights reserved
