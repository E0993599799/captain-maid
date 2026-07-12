# Luxi UI/UX Action Plan — Captain Maid Phase 1

**Date**: 2026-07-12 4:20 PM GMT+7  
**Status**: 🎯 Ready to Execute  
**Deadline**: Phase 1 EOD Today  
**Focus**: UI Polish Only (No Thai copy yet)

---

## 🏁 START HERE

**You have 4-8 hours to complete Phase 1 UI work.**

### Before You Start
1. ✅ New architecture: **Section-based components** (not monolithic)
2. ✅ Docs ready: Read these files first
   ```
   /captain-maid/CLAUDE.md (5 min read)
   /captain-maid/docs/ARCHITECTURE-TRANSFORMATION.md (10 min read)
   /captain-maid/docs/captain-maid-redesign-brief.md (detailed reference)
   ```
3. ✅ Local setup: `npm run dev` to start dev server
4. ✅ Branch: Already on `main` (fresh section-based setup)

---

## 📝 Task Breakdown (IN ORDER)

### **TASK 1: Hero Section Polish** ⭐ P0
**Time**: 45 minutes  
**File**: `/components/sections/HeroSection.tsx`  
**Impact**: Homepage hero (most visible)

#### Checklist:
- [ ] Open `HeroSection.tsx` and review current code
- [ ] Verify mascot image path: `/images/heroes/captain-maid-hero.png` exists
- [ ] Check gradient colors match design (blue #0066CC → #00AAFF)
- [ ] Test on local dev server (npm run dev)
- [ ] Mobile view (360px): Character centered, readable CTA
- [ ] Desktop view (1920px): Character positioned nicely
- [ ] Verify animations smooth on real device (not DevTools)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] Save and test

**Success**: Hero looks professional, animations smooth, responsive across devices

---

### **TASK 2: Navigation Dropdown Styling** ⭐ P0
**Time**: 60 minutes  
**File**: `/components/NavigationEnhanced.tsx`  
**Impact**: Main navigation (top of page)

#### Checklist:
- [ ] Open navigation component
- [ ] Style dropdown background: white with shadow
- [ ] Add icons for product categories (use emoji or simple SVG)
- [ ] Verify all 7 product links visible: Floor, Bathroom, Kitchen, Glass, Disinfectant, Dishwasher, View All
- [ ] Desktop: Hover states should be visible
- [ ] Mobile: Hamburger menu functional (click to open/close)
- [ ] Language toggle button styled
- [ ] No horizontal scroll on mobile
- [ ] Test on real mobile device
- [ ] Save and test

**Success**: Navigation is clear, dropdown works, mobile hamburger doesn't overlap

---

### **TASK 3: Product Card Enhancements** 🟡 P1
**Time**: 60 minutes  
**Files**: `/components/sections/ProductsSection.tsx` + product cards  
**Impact**: Products listing page

#### Checklist:
- [ ] Add star rating display (★★★★★)
- [ ] Add "Add to Cart" button (can be placeholder)
- [ ] Show price (USD or THB, consistent)
- [ ] Add category badge/tag
- [ ] Image optimization: use next/image
- [ ] Hover zoom effect on images
- [ ] Mobile: Single column layout
- [ ] Desktop: 3-column grid
- [ ] Consistent spacing between cards
- [ ] Test on phone and desktop
- [ ] Save and test

**Success**: Product cards look polished, ratings visible, buttons work, responsive

---

### **TASK 4: Product Detail Page** 🟡 P1
**Time**: 90 minutes  
**Files**: `/app/[locale]/products/[id]/page.tsx` + create new component  
**Impact**: Individual product pages

#### Checklist:
- [ ] Add breadcrumb navigation (Home > Products > Name)
- [ ] Display large product image with zoom
- [ ] Show product specs (ingredients, usage, safety)
- [ ] Add quantity selector (1-10)
- [ ] "Add to Cart" button (placeholder OK)
- [ ] Display ratings + review count
- [ ] **NEW**: Add "Related Products" section (3-4 similar products)
- [ ] Mobile: Single column (image top, details below)
- [ ] Desktop: 2-column (image left, details right)
- [ ] Test on phone and desktop
- [ ] Save and test

**Success**: Product detail looks complete, related products show, mobile layout works

---

### **TASK 5: Mobile Responsiveness Audit** 🟡 P2
**Time**: 60 minutes  
**Device Required**: Real phone (iPhone or Android)  
**Scope**: All pages

#### Checklist:
- [ ] Test on real mobile device (not DevTools simulator)
- [ ] Hero section: Text readable, character visible
- [ ] Navigation: Hamburger works, no overlap
- [ ] Product cards: No horizontal scroll, stacked nicely
- [ ] Product detail: Images fit screen, text readable
- [ ] Footer: All links visible
- [ ] Buttons: All ≥44×44px touch target
- [ ] Animations: Smooth on real device (may be slower than desktop)
- [ ] Report any issues found
- [ ] Save screenshots of issues (if any)

**Success**: No horizontal scroll, buttons tappable, all content readable on 360px

---

### **TASK 6: Design System Consistency** 🟡 P2
**Time**: 45 minutes  
**Scope**: All components

#### Checklist:
- [ ] Check spacing: Margins and padding consistent
- [ ] Check colors: Match design tokens (blue, white, grays)
- [ ] Check typography: Font sizes, weights consistent
- [ ] Check button styles: All buttons match one design
- [ ] Check shadows: Consistent drop shadows
- [ ] Check hover states: All interactive elements have hover
- [ ] Report any inconsistencies
- [ ] Fix highest priority inconsistencies

**Success**: App feels cohesive, consistent design language throughout

---

### **TASK 7: Animations & Performance** 🟡 P2
**Time**: 45 minutes  
**Tool**: Chrome DevTools Lighthouse  
**Scope**: Performance profiling

#### Checklist:
- [ ] Run `npm run build` (verify no errors)
- [ ] Open Lighthouse (Chrome DevTools)
- [ ] Run performance audit
- [ ] Check metrics:
  - [ ] LCP (Largest Contentful Paint) < 3s
  - [ ] CLS (Cumulative Layout Shift) < 0.1
  - [ ] Lighthouse score > 85
- [ ] If animations cause lag, simplify or remove
- [ ] Report performance results
- [ ] Fix critical issues if time permits

**Success**: Performance metrics acceptable, no janky animations

---

### **TASK 8: Component Polish & Bug Fixes** 🟢 P3
**Time**: 60 minutes  
**Scope**: Anything missed

#### Checklist:
- [ ] Click through entire site (home → products → product detail → about → contact → blog → faq)
- [ ] Report any broken links
- [ ] Report any visual glitches
- [ ] Fix highest priority issues
- [ ] Verify no console errors (`npm run typecheck`)
- [ ] Verify no build warnings
- [ ] Clean up any debug code

**Success**: Site feels complete and polished

---

## ⏱️ Time Budget

| Task | Time | Status |
|------|------|--------|
| Task 1: Hero Polish | 45m | 🎯 Do First |
| Task 2: Nav Dropdowns | 60m | 🎯 Do Second |
| Task 3: Product Cards | 60m | 🎯 Do Third |
| Task 4: Product Detail | 90m | 🎯 Do Fourth |
| Task 5: Mobile Test | 60m | 🟡 If Time |
| Task 6: Design System | 45m | 🟡 If Time |
| Task 7: Performance | 45m | 🟡 If Time |
| Task 8: Polish | 60m | 🟡 If Time |
| **TOTAL** | **465m** | **7.75 hours** |

**Reality Check**: 
- You have ~4-8 hours remaining today
- Complete Tasks 1-4 (Core UI) first = 255 minutes (4.25 hours) ✅ DOABLE
- Tasks 5-8 (Polish) = 210 minutes (3.5 hours) if time permits ✅ NICE TO HAVE

**Priority**: Core UI (Tasks 1-4) MUST be done. Polish (Tasks 5-8) are bonus.

---

## 🔧 Development Workflow

### Each Task:
1. **Open file** in code editor
2. **Review current code** (5 min)
3. **Make changes** following checklist
4. **Test locally** with `npm run dev`
5. **Check responsive** (desktop + mobile)
6. **No console errors?** (`npm run typecheck`)
7. **Ready to commit?** Save changes

### Commit After Each Task:
```bash
git add .
git commit -m "feat(ui): [Task Name] — [Brief description]"
```

Example:
```bash
git commit -m "feat(ui): polish hero section — blue gradient, animations, mobile responsive"
```

---

## 🎯 Success Criteria (By EOD)

### Must Have (P0):
- ✅ Hero section polished
- ✅ Navigation dropdowns styled
- ✅ Product cards enhanced (ratings, buttons)
- ✅ Product detail page with related products
- ✅ No horizontal scroll on mobile
- ✅ No TypeScript errors
- ✅ All changes committed to git

### Nice to Have (P1-P2):
- ✅ Mobile tested on real device
- ✅ Design consistency reviewed
- ✅ Performance profiled
- ✅ Minor bug fixes

### Not Required (P3):
- Thai content (Khun-Ram will do this)
- Shopping cart functionality (Phase 2/3)
- Advanced animations (Phase 2)

---

## 📚 Quick Reference

### File Locations
```
Section Components:
  /components/sections/HeroSection.tsx
  /components/sections/ProductsSection.tsx
  /components/sections/TrustSection.tsx
  /components/sections/etc.

Layout Primitives:
  /components/layout/Container.tsx
  /components/layout/Section.tsx
  /components/layout/SectionHeader.tsx

Main Composer:
  /components/HomePage.tsx (orchestrates all sections)

Data:
  /data/products.ts (product listings)
  /data/solutions.ts (cleaning solutions)
  /data/faqs.ts (FAQ items)

Locales:
  /locales/th.json (Thai copy — DON'T EDIT YET)
  /locales/en.json (English copy)
```

### Key Commands
```bash
npm run dev          # Start local dev server (http://localhost:3000)
npm run build        # Build for production
npm run typecheck    # Check TypeScript errors
npm run lint         # Run ESLint
```

### Git Commands
```bash
git status           # See what changed
git add .            # Stage all changes
git commit -m "..."  # Commit with message
git log --oneline    # See recent commits
```

---

## ⚠️ Common Pitfalls

❌ **Don't**:
- Don't add Thai content (Khun-Ram will do this)
- Don't edit locales/th.json
- Don't implement shopping cart logic
- Don't refactor old code (focus on UI only)
- Don't overthink — keep it simple

✅ **Do**:
- Focus on UI/UX only
- Test on real devices
- Commit frequently
- Keep changes focused per task
- Ask for help if stuck (tag Zeus/Codex)

---

## 🚀 Ready?

1. Read CLAUDE.md (5 min)
2. Read ARCHITECTURE-TRANSFORMATION.md (10 min)
3. `npm run dev` (start dev server)
4. Click through the site (2 min — get familiar)
5. Start Task 1: Hero Section ⭐

**You have everything you need. Go design the golden path.** 🛤️

---

## 📝 Progress Tracker

As you complete each task, check off the box:

- [ ] Task 1: Hero Section — ✅ DONE at [TIME]
- [ ] Task 2: Navigation — ✅ DONE at [TIME]
- [ ] Task 3: Product Cards — ✅ DONE at [TIME]
- [ ] Task 4: Product Detail — ✅ DONE at [TIME]
- [ ] Task 5: Mobile Test — ⏳ at [TIME]
- [ ] Task 6: Design System — ⏳ at [TIME]
- [ ] Task 7: Performance — ⏳ at [TIME]
- [ ] Task 8: Polish — ⏳ at [TIME]

**Final Status**: [COMPLETE / PARTIAL / IN PROGRESS]  
**Completion Time**: [HH:MM]

---

**Captain Maid Phase 1 UI/UX Redesign**  
*Designed by Luxi Junior Oracle*  
*"The Golden Path" 🛤️*

---
