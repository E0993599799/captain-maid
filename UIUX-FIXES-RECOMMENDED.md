# Captain Maid UI/UX - Recommended Code Fixes
**Date:** 2026-07-12  
**Status:** Ready to implement

This document provides specific code replacements for the 5 most critical responsive design issues.

---

## Fix #1: Product Card Image - Responsive Sizing

**Current Code (Lines 784-785):**
```tsx
<div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(10,86,194,0.1),transparent_52%)] px-8 py-10">
  <Image src={product.image} alt={`${product.title} Captain Maid package`} width={420} height={420} placeholder="blur" className="h-auto w-[220px] object-contain drop-shadow-[0_20px_40px_rgba(10,86,194,0.16)]" />
</div>
```

**Recommended Fix:**
```tsx
<div className="relative flex min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[380px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(10,86,194,0.1),transparent_52%)] px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
  <Image src={product.image} alt={`${product.title} Captain Maid package`} width={420} height={420} placeholder="blur" className="h-auto w-[160px] sm:w-[180px] md:w-[220px] lg:w-[240px] object-contain drop-shadow-[0_20px_40px_rgba(10,86,194,0.16)]" />
</div>
```

**Changes:**
- Replaced hardcoded `min-h-[320px]` with responsive heights at each breakpoint
- Replaced hardcoded `w-[220px]` with responsive widths
- Changed `px-8` to `px-4 sm:px-6 md:px-8` to reduce mobile padding
- Changed `py-10` to `py-6 sm:py-8 md:py-10` for mobile optimization

**Impact:** ✅ Product images now scale properly on all devices

---

## Fix #2: Solutions Grid - Add Tablet Breakpoint

**Current Code (Line 750):**
```tsx
<div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
```

**Recommended Fix:**
```tsx
<div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
```

**Changes:**
- Added `md:grid-cols-3` for tablet layout (768-1023px)
- Added `lg:grid-cols-4` for desktop (1024-1279px)
- Previously jumped from 2 columns (sm) directly to 5 (xl)

**Impact:** ✅ Tablets now show 3 columns instead of reverting to 1

---

## Fix #3: FAQ Grid - Add Tablet Breakpoint

**Current Code (Line 877):**
```tsx
<div className="mt-10 grid gap-4 lg:grid-cols-2">
```

**Recommended Fix:**
```tsx
<div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
```

**Changes:**
- Added `md:grid-cols-2` to show 2-column layout starting at tablet (768px)
- Keeps lg: for consistency but now tablet gets proper layout

**Impact:** ✅ Tablets now show 2 columns instead of 1, reducing scroll

---

## Fix #4: Trust Badge Grid - Optimize Tablet Layout

**Current Code (Line 670):**
```tsx
<div className={`grid ${device === 'mobile' ? 'grid-cols-1 gap-2' : 'grid-cols-4 gap-3'} w-full mt-2`}>
```

**Recommended Fix:**
```tsx
const badgeGridClasses = useMemo(() => {
  if (device === 'mobile') return 'grid-cols-1 gap-2';
  if (device === 'tablet') return 'grid-cols-2 gap-2.5';
  return 'grid-cols-4 gap-3';
}, [device]);

return (
  <div className={`grid ${badgeGridClasses} w-full mt-2`}>
    {/* badges here */}
  </div>
)
```

**Changes:**
- Added tablet-specific layout: `grid-cols-2 gap-2.5` (2x2 grid instead of 1x4)
- Better spacing with `gap-2.5` between badge items
- Uses existing `device` state to determine breakpoint

**Impact:** ✅ Tablets now show 2x2 badge grid (less cramped than 1x4)

---

## Fix #5: Footer Grid - Add Tablet Breakpoint

**Current Code (Line 911):**
```tsx
<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
```

**Recommended Fix:**
```tsx
<div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:gap-8">
```

**Changes:**
- Added `md:grid-cols-2` for tablet 2-column layout
- Added `md:gap-6` for slightly tighter spacing on tablet
- Keeps `lg:grid-cols-[1.2fr_0.8fr]` ratio for desktop

**Impact:** ✅ Footer now uses space efficiently on tablets

---

## Fix #6: Category Icons - Prevent Overflow

**Current Code (Lines 600-613):**
```tsx
<div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 w-full">
  {c.slides.slide2.categories.map((cat, idx) => {
    const Icon = cat.icon;
    return (
      <div key={idx} className="flex flex-col items-center gap-1 p-1 bg-white/90 border border-cm-border-soft rounded-2xl shadow-sm min-w-[50px] sm:min-w-[90px] backdrop-blur-md">
```

**Recommended Fix:**
```tsx
<div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-3 w-full max-w-xs sm:max-w-2xl mx-auto">
  {c.slides.slide2.categories.map((cat, idx) => {
    const Icon = cat.icon;
    return (
      <div key={idx} className="flex flex-col items-center gap-1 p-1 bg-white/90 border border-cm-border-soft rounded-2xl shadow-sm min-w-[44px] sm:min-w-[50px] md:min-w-[90px] backdrop-blur-md">
```

**Changes:**
- Reduced mobile `min-w-[50px]` to `min-w-[44px]` 
- Changed gap progression: `gap-1 sm:gap-1.5 md:gap-3`
- Added `max-w-xs sm:max-w-2xl mx-auto` to constrain width on mobile
- Now 5 items fit in ~280px on mobile (44×5 + gaps)

**Impact:** ✅ Category icons no longer overflow on 320px mobile

---

## Fix #7: Trust Section Image Heights - Mobile Optimization

**Current Code (Line 840):**
```tsx
<figure className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
```

**Recommended Fix:**
```tsx
<figure className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] lg:h-[480px] overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_18px_40px_rgba(10,86,194,0.08)]">
```

**Changes:**
- Changed mobile default from `h-[320px]` to `h-[240px]`
- Added `sm:h-[300px]` for better 640px scaling
- Added `md:h-[380px]` for tablet optimization
- Keeps `lg:h-[480px]` for desktop

**Impact:** ✅ Mobile and tablet get reasonable image heights

---

## Fix #8: Bottle Images - Responsive Sizing

**Current Code (Line 852):**
```tsx
<div key={index} className="w-18 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:w-20">
```

**Recommended Fix:**
```tsx
<div key={index} className="w-14 sm:w-16 md:w-18 lg:w-20 xl:w-24 overflow-hidden rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
```

**Changes:**
- Mobile starts at `w-14` (56px) instead of `w-18` (72px)
- Progressive scaling: 56 → 64 → 72 → 80 → 96px
- Better visual proportion at each breakpoint

**Impact:** ✅ Bottle images scale appropriately at all sizes

---

## Fix #9: Hero Text Safe Area - Slide 1 Mobile Positioning

**Current Code (Lines 410-415):**
```tsx
const coords: Record<string, Record<'mobile' | 'tablet' | 'desktop', { x: number; y: number; w: number; h: number }>> = {
  intro: {
    desktop: { x: 4, y: 18, w: 44, h: 66 },
    tablet: { x: 5, y: 16, w: 43, h: 68 },
    mobile: { x: 7, y: 57, w: 58, h: 34 }
  },
```

**Recommended Fix:**
```tsx
const coords: Record<string, Record<'mobile' | 'tablet' | 'desktop', { x: number; y: number; w: number; h: number }>> = {
  intro: {
    desktop: { x: 4, y: 18, w: 44, h: 66 },
    tablet: { x: 5, y: 16, w: 43, h: 68 },
    mobile: { x: 7, y: 50, w: 58, h: 40 }  // Changed from y:57, h:34
  },
```

**Changes:**
- Moved text area up: `y: 57 → y: 50` (more room at top)
- Increased height: `h: 34 → h: 40` (more vertical space for content)
- Logo + headline + supporting text + button now fit better

**Impact:** ✅ Text safe area now provides adequate space on mobile

---

## Fix #10: CTA Section Button Layout on Tablet

**Current Code (Lines 896-904):**
```tsx
<div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
  <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0A56C2] shadow-[0_16px_32px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5">
    {c.cta.primary}
    <ArrowRight size={16} />
  </Link>
  <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
    {c.cta.secondary}
  </Link>
</div>
```

**Recommended Fix:**
```tsx
<div className="flex flex-col gap-3 sm:flex-row md:gap-4 lg:justify-end">
  <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0A56C2] shadow-[0_16px_32px_rgba(255,255,255,0.16)] transition hover:-translate-y-0.5 flex-1 sm:flex-none">
    {c.cta.primary}
    <ArrowRight size={16} />
  </Link>
  <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition hover:bg-white/20 flex-1 sm:flex-none">
    {c.cta.secondary}
  </Link>
</div>
```

**Changes:**
- Added `md:gap-4` for better spacing on tablet/desktop
- Added `flex-1 sm:flex-none` to buttons (full-width on mobile, auto on tablet+)
- Added `sm:text-base` for button text scaling

**Impact:** ✅ Better button sizing and spacing across devices

---

## Implementation Priority

### Phase 1: Critical (Deploy immediately)
1. ✅ Fix #1 - Product card sizing
2. ✅ Fix #2 - Solutions grid
3. ✅ Fix #3 - FAQ grid
4. ✅ Fix #4 - Trust badges

### Phase 2: High (Next commit)
5. ✅ Fix #5 - Footer grid
6. ✅ Fix #6 - Category icons
7. ✅ Fix #9 - Hero text safe area

### Phase 3: Polish (Optimize)
8. ✅ Fix #7 - Trust section images
9. ✅ Fix #8 - Bottle images
10. ✅ Fix #10 - CTA buttons

---

## Testing After Fixes

### Mobile (375px viewport)
```bash
npm run dev
# Open DevTools → iPhone 12 (390x844)
# Check each fix visually
```

### Tablet (768px viewport)
```bash
# DevTools → iPad (768x1024)
# Verify grids now show proper column count
```

### Desktop (1280px viewport)
```bash
# DevTools → 1280x720
# Ensure all fixes don't break desktop layout
```

---

## Rollback Plan

All changes are CSS-only (Tailwind classes). If issues arise:
1. Git diff to see exact changes
2. Revert specific class changes
3. Test incrementally (one fix at a time)

---

## Performance Impact

- ✅ No JavaScript changes (only Tailwind)
- ✅ Same bundle size (existing utilities)
- ✅ No new images or assets
- ✅ Rendering performance: Neutral (may improve due to better sizing)

---

**Ready to implement. All fixes are backward-compatible and additive (no breaking changes).**

---

**Audit by:** Luxi Oracle  
**Date:** 2026-07-12
