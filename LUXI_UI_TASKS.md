# Luxi-Oracle UI/UX Implementation Tasks

**Status**: 🟡 In Progress  
**Priority**: High  
**Deadline**: 2026-07-12 EOD  

---

## Task 1: Hero Section Polish ⭐

**Current State**: HeroEnhanced.tsx exists with animations  
**Required Changes**:

- [ ] Ensure mascot character image path is correct (`/images/heroes/captain-maid-hero.png`)
- [ ] Add blue gradient background matching design brief (#007BFF to lighter blue)
- [ ] Optimize character positioning for mobile (bottom of screen)
- [ ] Add subtle bounce animation to character
- [ ] Verify responsive layout (mobile: character on top, desktop: character on left)
- [ ] Test animations on real devices (not just browser)

**Component**: `/components/HeroEnhanced.tsx`  
**Props to verify**: All animation variants should use Framer Motion  

---

## Task 2: Navigation Dropdowns 🎯

**Current State**: NavigationEnhanced.tsx has mega-menu structure  
**Required Changes**:

- [ ] Style dropdown menu background to match brief (white with shadow)
- [ ] Add product category icons (floor, bathroom, kitchen, glass icons)
- [ ] Ensure all 7 product categories visible in dropdown
- [ ] Test hover states on desktop
- [ ] Verify mobile hamburger menu has proper accordion collapse/expand
- [ ] Add language switcher (TH/EN) styling
- [ ] Test on mobile devices (hamburger should not overlap content)

**Component**: `/components/NavigationEnhanced.tsx`  
**Menu items**: Products, Cleaning Tips & Solutions, Support, About us, Blog  

---

## Task 3: Product Card Enhancements 📦

**Current State**: ProductCard.tsx basic layout  
**Required Changes**:

- [ ] Display star ratings (★★★★★ format)
- [ ] Add "Add to Cart" button with hover effect
- [ ] Show product price in both USD and THB
- [ ] Add category badge/tag
- [ ] Ensure image optimization with next/image
- [ ] Add product image hover zoom effect
- [ ] Mobile: Stack layout should be single column
- [ ] Desktop: 3-column grid with consistent spacing

**Component**: `/components/ProductCard.tsx`  
**Data source**: `/lib/products.ts` should include ratings  

---

## Task 4: Product Detail Page 🔍

**Current State**: `/app/[locale]/products/[id]/page.tsx` exists  
**Required Changes**:

- [ ] Add breadcrumb navigation (Home > Products > Product Name)
- [ ] Display large product image with zoom capability
- [ ] Show product specifications (ingredients, usage, safety info)
- [ ] Add quantity selector (1-10)
- [ ] Implement "Add to Cart" button with visual feedback
- [ ] Show ratings and review count
- [ ] Add "Related Products" section (3-4 products)
- [ ] Mobile: Single column layout
- [ ] Desktop: 2-column (image left, details right)

**Component**: Create `/components/ProductDetail.tsx`  
**Related products**: Query by category excluding current product  

---

## Task 5: Design System & Spacing 🎨

**Current State**: Tailwind config exists with captain-* colors  
**Required Changes**:

- [ ] Verify all spacing uses Tailwind units (px-4, py-8, etc.)
- [ ] Ensure consistent padding across all sections (16px mobile, 24px desktop)
- [ ] Verify font sizes (h1: 54px desktop, h2: 36px desktop)
- [ ] Check line-height consistency (1.5 for body, 1.2 for headers)
- [ ] Ensure color palette matches brief (blue #007BFF, white, soft grays)
- [ ] Test dark mode is disabled (if not needed)

**Config files**:
- `/tailwind.config.ts`
- `/components/Button.tsx` (should use captain-* colors)

---

## Task 6: Mobile Responsiveness 📱

**Required Changes**:

- [ ] Test on iPhone 12 (390px)
- [ ] Test on iPhone 14 Pro (393px)
- [ ] Test on Samsung Galaxy S21 (360px)
- [ ] Test on iPad (768px)
- [ ] Test on iPad Pro (1024px)
- [ ] Verify no horizontal scroll
- [ ] Check touch targets are at least 44x44px
- [ ] Test navigation on mobile (hamburger menu)
- [ ] Verify product grid is responsive (1 col mobile, 2 col tablet, 3 col desktop)

**Breakpoints**: 
- Mobile: 0-640px
- Tablet: 641-1024px
- Desktop: 1025px+

---

## Task 7: Animations & Performance ⚡

**Required Changes**:

- [ ] All entrance animations should complete <500ms
- [ ] Reduce motion support (prefers-reduced-motion)
- [ ] Framer Motion animations on scroll (InView)
- [ ] Lazy loading for images below fold
- [ ] Hero section should load <2s (LCP target)
- [ ] Product page should load <3s

**Performance targets**:
- Lighthouse score: >90
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

---

## Task 8: Component Polish 💎

**Components to enhance**:

- [ ] Button: Active/hover/disabled states clear
- [ ] ProductCard: Consistent shadow and border radius
- [ ] Navigation: Smooth transitions between states
- [ ] Footer: Proper spacing and link styling
- [ ] Forms: Proper focus states and error messages

**Accessibility**:
- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AA standards
- [ ] Buttons have proper aria-labels
- [ ] Images have alt text

---

## Deliverables

**By EOD 2026-07-12, deliver**:
- ✅ Updated HeroEnhanced.tsx (blue gradient, mascot)
- ✅ Updated NavigationEnhanced.tsx (styled dropdowns)
- ✅ Enhanced ProductCard.tsx (ratings, buttons)
- ✅ New ProductDetail.tsx (specs, related products)
- ✅ Responsive testing complete
- ✅ Mobile navigation working
- ✅ All animations verified
- ✅ Lighthouse >90 score

---

## Communication

**Report progress**: Update this file with checkmarks  
**Blockers**: Note any styling conflicts or missing assets  
**Questions**: Tag in comments with `[LUXI_QUESTION]`  

---

## Assets Needed

Please verify these exist in `/public/`:
- `images/heroes/captain-maid-hero.png` (mascot character)
- `images/products/*.png` (product images)
- Icons for categories (floor, bathroom, kitchen, glass)

---

**Ready to begin?** ✨
