# Captain Maid UI/UX Responsive Design Audit
**Date:** 2026-07-12  
**Component:** CaptainMaidLandingPage.tsx (1040 lines)  
**Audit Focus:** Responsive design, image overflow, text truncation, layout consistency

---

## Executive Summary

The landing page has **11 critical responsive design issues** affecting mobile (< 768px) and tablet (768px-1279px) breakpoints. Primary problems include:

1. **Hardcoded image dimensions** that don't adapt to screen sizes
2. **Missing tablet breakpoints** causing layout collapse on medium screens
3. **Excessive padding on mobile** reducing usable content area
4. **Unsafe text positioning** that may clip headlines on small screens
5. **Inflexible grid layouts** that stack unexpectedly at certain widths

**Impact:** Users on phones and tablets experience cramped layouts, image overflow, and text truncation.

---

## Detailed Findings

### SEVERITY: HIGH

#### Issue #1: Product Card Images Have Hardcoded Width
**Location:** Lines 784-785  
**Component:** Products Section - Product Cards  
**Problem:**
```tsx
<Image src={product.image} alt={...} width={420} height={420} 
  placeholder="blur" 
  className="h-auto w-[220px] object-contain drop-shadow-[0_20px_40px_rgba(10,86,194,0.16)]" 
/>
```
- Fixed `w-[220px]` doesn't scale for mobile/tablet
- Container has `px-8` (32px each side) = 64px total horizontal padding
- On mobile (375px viewport): 375 - 64 = 311px available, but image is locked to 220px ✓
- However, image sizing should respond to container width, not be hardcoded

**Affected Screens:** Mobile (320-375px), Tablet (768px+)  
**Severity:** HIGH  
**Recommendation:**
- Replace hardcoded width with responsive sizing using Tailwind `sm:w-[160px] md:w-[200px] lg:w-[220px]`
- Use CSS `max-w-[90%]` to scale within container instead of fixed pixel values

---

#### Issue #2: Product Card Container Too Large on Mobile
**Location:** Lines 784  
**Component:** Products Section - Product Image Container  
**Problem:**
```tsx
<div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[radial-gradient(...)] px-8 py-10">
```
- `min-h-[320px]` is excessive for mobile phones
- On iPhone SE (375px height viewport), this container alone takes up 85%+ of screen
- `py-10` (40px top/bottom) adds 80px of padding, total height ~400px+ 
- Creates visual imbalance on small screens

**Affected Screens:** Mobile (320-568px)  
**Severity:** HIGH  
**Recommendation:**
- Add responsive height: `sm:min-h-[250px] md:min-h-[320px] lg:min-h-[380px]`
- Add responsive padding: `px-4 sm:px-6 md:px-8` and `py-6 sm:py-8 md:py-10`

---

#### Issue #3: Solutions Grid Missing Tablet Breakpoint
**Location:** Line 750  
**Component:** Solutions Section - Card Grid  
**Problem:**
```tsx
<div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
```
- **Default (mobile):** 1 column ✓
- **sm (640px+):** 2 columns ✓
- **md (768px):** Reverts to 1 column ✗ (no `md:` class)
- **lg (1024px):** Still 1 column ✗ (jumps directly to xl)
- **xl (1280px+):** 5 columns ✓

**Affected Screens:** Tablet (768px-1279px)  
**Severity:** HIGH  
**Recommendation:**
```tsx
grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
```

---

#### Issue #4: FAQ Grid Missing Tablet Breakpoint
**Location:** Line 877  
**Component:** FAQ Section - Card Grid  
**Problem:**
```tsx
<div className="mt-10 grid gap-4 lg:grid-cols-2">
```
- **Default/mobile/tablet:** 1 column (no `md:` breakpoint)
- **lg (1024px+):** 2 columns ✓
- Tablets (768-1023px) show 4 FAQ cards in single column = excessive scrolling

**Affected Screens:** Tablet (768px-1023px)  
**Severity:** HIGH  
**Recommendation:**
```tsx
grid gap-4 md:grid-cols-2 lg:grid-cols-2
```

---

#### Issue #5: Trust Badge Grid Switches Too Abruptly
**Location:** Line 670  
**Component:** Slide 5 (Trust) - Badge Grid  
**Problem:**
```tsx
<div className={`grid ${device === 'mobile' ? 'grid-cols-1 gap-2' : 'grid-cols-4 gap-3'} w-full mt-2`}>
```
- **Mobile (< 768px):** 1 column (gap-2) ✓
- **Tablet (768px-1279px):** 4 columns (gap-3) ✗ Too cramped!
- **Desktop (1280px+):** 4 columns (gap-3) ✓

On iPad (768px), 4 badges per row at gap-3 = very tight spacing, text may truncate.

**Affected Screens:** Tablet (768px-1023px)  
**Severity:** HIGH  
**Recommendation:**
```tsx
const badgeGridClass = device === 'mobile' 
  ? 'grid-cols-1 gap-2' 
  : device === 'tablet' 
  ? 'grid-cols-2 gap-2.5' 
  : 'grid-cols-4 gap-3';

<div className={`grid ${badgeGridClass} w-full mt-2`}>
```

---

#### Issue #6: Category Icons Might Overflow on Mobile
**Location:** Line 600-613  
**Component:** Slide 2 (Product Range) - Category Icons  
**Problem:**
```tsx
<div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 w-full">
  {c.slides.slide2.categories.map((cat, idx) => (
    <div key={idx} className="flex flex-col items-center gap-1 p-1 bg-white/90 
      border border-cm-border-soft rounded-2xl shadow-sm min-w-[50px] sm:min-w-[90px] backdrop-blur-md">
```
- 5 categories × `min-w-[50px]` = 250px minimum on mobile (375px viewport)
- `gap-1.5` = 6px between each item
- 5 × 50px + 4 × 6px = 274px + horizontal padding of parent
- **May cause horizontal overflow on very small phones (320px)**

**Affected Screens:** Mobile (320px-480px)  
**Severity:** HIGH  
**Recommendation:**
- Adjust mobile min-width: `min-w-[45px] xs:min-w-[50px] sm:min-w-[90px]`
- Add gap scaling: `gap-1 sm:gap-1.5 md:gap-3`
- Consider wrapping to 2 rows on mobile: `max-w-[280px] mx-auto`

---

### SEVERITY: MEDIUM

#### Issue #7: Trust Section Image Too Large on Mobile
**Location:** Line 840-857  
**Component:** Trust Section - Right Column Image  
**Problem:**
```tsx
<figure className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] 
  overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
```
- **Mobile:** `h-[320px]` (no sm: prefix, so default applies)
- **Tablet:** `sm:h-[420px]` (768px+ defaults to this)
- **Desktop:** `lg:h-[480px]` (1024px+)

On mobile with 375px viewport height, a 320px image in a grid item creates excessive vertical scroll.

**Affected Screens:** Mobile (320px-480px)  
**Severity:** MEDIUM  
**Recommendation:**
```tsx
h-[240px] sm:h-[280px] md:h-[380px] lg:h-[480px]
```

---

#### Issue #8: Footer Grid Missing Tablet Breakpoint
**Location:** Line 911  
**Component:** Footer - Content Grid  
**Problem:**
```tsx
<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 
  lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
```
- **Mobile:** 1 column ✓
- **Tablet (768px-1023px):** No `md:` breakpoint, still 1 column
- **Desktop:** 2 columns (1.2fr + 0.8fr ratio)

Tablets should use 2-column layout for better space utilization.

**Affected Screens:** Tablet (768px-1023px)  
**Severity:** MEDIUM  
**Recommendation:**
```tsx
grid max-w-7xl gap-8 
  md:grid-cols-2 md:gap-6
  lg:grid-cols-[1.2fr_0.8fr] lg:gap-8
```

---

#### Issue #9: CTA Section Missing Tablet Breakpoint
**Location:** Line 891-905  
**Component:** CTA Section - Grid Layout  
**Problem:**
```tsx
<div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
```
- **Mobile/Tablet (< 1024px):** 1 column ✓ (acceptable)
- **Desktop:** 2 columns

However, the button layout inside (line 896) could be optimized for tablet:
```tsx
<div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
```
- Mobile: Stacks vertically ✓
- Tablet+: 2 buttons side-by-side (acceptable but could be full-width on tablet)

**Affected Screens:** Tablet (768px-1023px)  
**Severity:** MEDIUM  
**Recommendation:** Add conditional button layout for tablet width optimization.

---

#### Issue #10: Bottle Images Fixed Width in Trust Section
**Location:** Line 852  
**Component:** Trust Section - Bottle Images (bottom-right)  
**Problem:**
```tsx
<div key={index} className="w-18 overflow-hidden rounded-2xl border border-white/70 
  bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:w-20">
```
- **Mobile:** `w-18` (72px) — too large for space available
- **Tablet+:** `sm:w-20` (80px) — small improvement only

No `md:` or `lg:` scaling. These bottles are quite small on desktop.

**Affected Screens:** Mobile (320-375px), Desktop (1280px+)  
**Severity:** MEDIUM  
**Recommendation:**
```tsx
w-14 sm:w-16 md:w-18 lg:w-20 xl:w-24
```

---

#### Issue #11: Hero Text Safe Area May Clip on Mobile
**Location:** Lines 410-435 (safeAreaStyle)  
**Component:** Slide 1 (Brand Hero) - Text Positioning  
**Problem:**

Mobile safe area for intro slide:
```tsx
intro: {
  mobile: { x: 7, y: 57, w: 58, h: 34 }
}
```
- Positioned at 57% from top (past middle of 360px hero = 205px down)
- Only 34% height remaining (122px) 
- Headline + Logo + Supporting text + Button may not fit

On very small phones (320px height), this overlay has only ~110px of vertical space for all content.

**Affected Screens:** Mobile (320px-480px height)  
**Severity:** MEDIUM  
**Recommendation:**
- Test with actual phone dimensions
- Consider responsive positioning: `mobile: { y: 50, h: 40 }` (more bottom-heavy)
- Add conditional height scaling based on viewport

---

### SEVERITY: LOW

#### Issue #12: Text May Wrap Unexpectedly on CTA Buttons
**Location:** Lines 688-693  
**Component:** Slide 5 - CTA Buttons  
**Problem:**
```tsx
<div className="flex flex-col sm:flex-row gap-2.5 mt-3 sm:mt-4 w-full sm:w-auto">
  <Link href="/products" className="rounded-full bg-[#0753AC] px-7 py-3 
    sm:px-9 sm:py-3.5 lg:px-10 text-sm sm:text-base font-bold text-white">
    {c.slides.slide5.ctaPrimary}
  </Link>
```
- Text `"ซื้อสินค้า"` (Thai) or `"Shop Now"` is short, unlikely to wrap
- However, on narrow mobile, fixed `px-7` padding might squish text
- Low priority but worth monitoring

**Affected Screens:** Mobile (320-360px)  
**Severity:** LOW  
**Recommendation:** Monitor, add `px-5 sm:px-7` if issues appear

---

#### Issue #13: Header Navigation Wrapping on Tablet
**Location:** Line 504  
**Component:** Header Navigation  
**Problem:**
```tsx
<nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
```
- Hidden on mobile (good)
- Shows on `md:` (768px+)
- With 4 nav items + rounded-full styling, might wrap on small tablets

**Affected Screens:** Tablet (768px-800px)  
**Severity:** LOW  
**Recommendation:** Monitor, consider reducing `gap-2` to `gap-1` on md breakpoint

---

## Responsive Design Breakpoints Reference

Current Tailwind breakpoints (standard):
- **xs:** 0px (mobile)
- **sm:** 640px
- **md:** 768px (tablet start)
- **lg:** 1024px (desktop)
- **xl:** 1280px (large desktop)

**Missing breakpoints in this component:**
- `md:` in Solutions grid, FAQ grid, Footer grid (multiple places)
- Tablet-specific adjustments (768-1023px range) are underserved

---

## Testing Checklist

### Mobile (320-480px)
- [ ] Test Slide 1 (Brand Hero) text visibility - does it clip?
- [ ] Test Slide 2 (Product Range) category icons - do they overflow?
- [ ] Test product card images - are they properly sized?
- [ ] Test product card padding - is content readable?

### Tablet (768-1023px)
- [ ] Solutions grid displays 3 columns (currently shows 1)
- [ ] FAQ grid displays 2 columns (currently shows 1)
- [ ] Trust badges display 2x2 grid (currently shows 4 across - cramped)
- [ ] Footer displays 2 columns (currently shows 1)

### Desktop (1024-1279px)
- [ ] Solutions grid displays 4 columns
- [ ] All images have adequate space
- [ ] Typography scales appropriately

### Desktop+ (1280px+)
- [ ] Solutions grid displays 5 columns
- [ ] Bottle images scale up nicely

---

## Code Fixes Summary

### Fix Priority Order

**1. IMMEDIATE (Critical Layout Issues)**
- Product card image sizing (Issue #1)
- Product card container height (Issue #2)
- Solutions grid tablet breakpoint (Issue #3)

**2. HIGH (Major Layout Problems)**
- FAQ grid tablet breakpoint (Issue #4)
- Trust badge grid tablet optimization (Issue #5)
- Category icons overflow prevention (Issue #6)

**3. MEDIUM (Polish & Refinement)**
- Trust section image heights (Issue #7)
- Footer grid tablet layout (Issue #8)
- Bottle images responsive sizing (Issue #10)

---

## Performance Notes

### Current Optimizations
✓ Uses responsive image imports (slide1Mobile, slide1Tablet, slide1Desktop)  
✓ Uses Next.js Image component with proper sizing  
✓ Lazy loading on non-active slides  
✓ CSS-in-JS with Tailwind (zero layout shifts)

### Potential Issues
- Text shadows on light backgrounds may reduce contrast (low severity)
- Large hero heights (480-580px) on desktop might affect LCP
- Consider CSS containment on grid items for performance

---

## Recommendations Priority

### Phase 1 (Urgent - Deploy ASAP)
1. Fix product card responsive sizing
2. Add tablet breakpoints to grids
3. Fix text safe area positioning for small screens

### Phase 2 (Next Sprint)
1. Optimize image heights for mobile
2. Fine-tune spacing and padding at all breakpoints
3. Test on real devices (not just DevTools)

### Phase 3 (Polish)
1. Monitor header navigation wrapping
2. Test edge cases (landscape mode, split-screen)
3. Consider dark mode responsive issues

---

## Files to Update

- `/components/CaptainMaidLandingPage.tsx` (main file with all issues)

## Contact & Questions

For implementation details or clarification on any issues, refer to specific line numbers and class names provided above.

---

**Audit completed by:** Luxi Oracle (UI/UX Specialist)  
**Date:** 2026-07-12  
**Status:** Ready for implementation
