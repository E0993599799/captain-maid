# Captain Maid Premium Landing Page Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a premium, modern, responsive Captain Maid landing page with a 5-slide hero carousel and SEO/performance polish using only the provided assets.

**Architecture:** Replace the current homepage with a client-side carousel-driven landing page that uses the existing Next.js app, next-intl locale routing, and local assets from `components/assets`. Keep the rest of the site intact. Use semantic sections, responsive layouts, and minimal client-side logic for the carousel, with metadata and structured data handled in the page/layout layer.

**Tech Stack:** Next.js 14/React 18/TypeScript, Tailwind CSS, Framer Motion, next/image, next-intl, lucide-react.

---

### Task 1: Audit current homepage and asset set

**Objective:** Confirm the current landing route, reusable components, and highest-quality source assets.

**Files:**
- Inspect: `app/[locale]/page.tsx`
- Inspect: `components/assets/*`
- Inspect: `app/[locale]/layout.tsx`
- Inspect: `locales/en.json`, `locales/th.json`

**Steps:**
1. Confirm the homepage route is `app/[locale]/page.tsx`.
2. Confirm the five visual story beats map to the available asset groups.
3. Record the best source image for each slide by dimension and composition.

**Verification:**
- Each slide has a clearly selected source image.
- All used imagery comes from `components/assets` only.

### Task 2: Build the carousel landing page

**Objective:** Replace the homepage with a premium landing page matching the requested style and slide structure.

**Files:**
- Modify: `app/[locale]/page.tsx`
- Create/modify: `components/HeroCarousel.tsx` if extraction is needed
- Create/modify: `components/PremiumSection.tsx` if needed for supporting sections

**Steps:**
1. Create a hero carousel with 5 slides and responsive layouts.
2. Use the mascot/logo/product assets from `components/assets` only.
3. Add CTA buttons, trust signals, and premium composition rules.
4. Keep text accessible and easy to scan on mobile.

**Verification:**
- Desktop, tablet, and mobile layouts remain readable.
- No cropped mascot or product images.
- No external/stock/generated product imagery is used.

### Task 3: Add SEO and structured data

**Objective:** Ensure the new landing page is search-friendly and metadata-complete.

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify if necessary: `app/[locale]/layout.tsx`

**Steps:**
1. Add title, description, canonical, OpenGraph, and Twitter metadata.
2. Add JSON-LD for Organization, Product, Breadcrumb, and FAQ where appropriate.
3. Make sure semantic HTML is used throughout.

**Verification:**
- Metadata is present in page source.
- JSON-LD is valid JSON and references real page content.

### Task 4: Validate build and polish

**Objective:** Prove the page compiles and the UI is stable.

**Files:**
- Affected homepage files from previous tasks

**Steps:**
1. Run lint and build.
2. Fix any image import, typing, or hydration issues.
3. Re-check the final homepage in the browser for layout issues.

**Verification:**
- `npm run lint` passes.
- `npm run build` passes.
- Browser check shows a polished premium landing page with no obvious overflow.

### Risks / Notes

- Product facts must stay aligned with the provided product data; do not invent certifications or claims.
- If a slide needs a product image that is not present in the asset folder, use another provided asset rather than introducing a new source.
- Keep client-side JS minimal so the carousel remains performant.
