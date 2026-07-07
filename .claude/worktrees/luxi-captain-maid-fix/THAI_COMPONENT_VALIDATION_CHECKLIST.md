# Thai Component Validation Checklist
**Project**: Captain Maid  
**Phase**: Phase 1 MVP (3-day sprint)  
**Lead**: Luxi (Design)  
**Coordinator**: Khun-Ram (Translation)

---

## Overview

This checklist tracks Thai text rendering across all components in Phase 1. Each component will be tested with actual Thai translations from Khun-Ram before deployment.

**Test Environment**:
- Local dev: `npm run dev`
- Test page: `http://localhost:3000/th/test-thai-typography` (all locales work)
- Browser: Chrome/Safari/Firefox (latest)
- Viewports: 320px, 768px, 1024px, 1920px

---

## Phase 1 Components (MVP Scope)

### 1. Navigation Component ✓ Ready for Testing
**File**: `components/Navigation.tsx`  
**Thai Content**: Navigation items from `locales/th.json`

#### Test Cases
- [ ] **Nav Item Rendering**: "เกี่ยวกับเรา" (7 chars) displays without overflow
  - Checkpoint: No text truncation, proper character spacing
  - Viewports: 320px, 768px, 1024px
  - Expected: Wraps gracefully at 320px, inline at 768px+

- [ ] **Font Display**: Verify "Montserrat → Noto Sans Thai" fallback
  - Checkpoint: Thai characters render (not mojibake/boxes)
  - Tool: DevTools Font tab (should show "Noto Sans Thai")
  - Expected: Font stack shows Montserrat for Latin, Noto Sans Thai for Thai

- [ ] **Color Contrast**: Text on background (#001360 on white)
  - Checkpoint: Easy to read, meets WCAG AA (7:1+)
  - Expected: Contrast ratio ≥7:1

- [ ] **Dark Mode**: Navigation text readable in dark mode
  - Checkpoint: Toggle dark mode in browser devtools
  - Expected: Text switches to #E0E8F0, remains readable

#### Sign-Off
- [ ] Luxi: Visual approval ✓
- [ ] Khun-Ram: Translation accuracy ✓
- [ ] Status: PASS / FAIL / NEEDS_REVISION

---

### 2. Hero Section ✓ Ready for Testing
**File**: `components/HeroEnhanced.tsx` or `HeroEnhancedV2.tsx`  
**Thai Content**: 
- Title: "ทำให้การทำความสะอาดบ้านง่ายขึ้น" (20 chars)
- Subtitle: "ผลิตภัณฑ์ทำความสะอาดพรีเมียมที่ทำจากส่วนผสมธรรมชาติ..." (60+ chars)
- CTAs: "ซื้อเลย" (4 chars), "เรียนรู้เพิ่มเติม" (9 chars)

#### Test Cases
- [ ] **Headline Wrapping**: Title breaks at natural word boundaries (20 chars)
  - Checkpoint: No orphaned single Thai character on last line
  - Viewports: 320px (expect 2–3 lines), 1024px (expect 1–2 lines)
  - Expected: Balanced line lengths

- [ ] **Line Height**: Headline uses line-height 1.2–1.3
  - Checkpoint: Thai diacriticals don't overlap
  - Tool: DevTools computed styles → line-height
  - Expected: ~54px × 1.2 = 65px minimum, no collisions

- [ ] **Subtitle Readability**: Body text line-height ≥1.6
  - Checkpoint: Long subtitle (60+ chars) wraps with generous spacing
  - Expected: Each line has space between (not cramped)

- [ ] **CTA Button Sizing**: Buttons accommodate Thai text
  - Checkpoint: "ซื้อเลย" fits in standard button (44px height)
  - Expected: No text overflow, centered, readable

- [ ] **Gradient Overlay**: Background gradient readable under Thai text
  - Checkpoint: Gradient (#02A6E3 → #EAF6FD) doesn't make text hard to read
  - Expected: Text contrast ≥5:1 on gradient

#### Sign-Off
- [ ] Luxi: Layout & sizing approved ✓
- [ ] Khun-Ram: Translation & spacing verified ✓
- [ ] Status: PASS / FAIL / NEEDS_REVISION

---

### 3. Product Card Component ✓ Ready for Testing
**File**: `components/ProductCard.tsx`  
**Thai Content**:
- Title: "น้ำยาทำความสะอาดกระจก" (18 chars)
- Description: "ทำให้กระจกสะอาดวาววับและปราศจากจุดน้ำ" (25 chars)
- Status: "มีสินค้า" (4 chars)

#### Test Cases
- [ ] **Card Title Wrapping**: 18-char title wraps properly in constrained width
  - Checkpoint: Max 2 lines, no orphaned characters
  - Expected: ~16 chars per line at 300px card width

- [ ] **Card Height Consistency**: Thai and English cards same height
  - Checkpoint: Measure card height (English vs Thai)
  - Expected: Difference <5px (Thai may be slightly taller due to width)

- [ ] **Description Text**: Multi-line description (2–3 lines)
  - Checkpoint: Text breaks at word boundaries
  - Expected: No overflow, readable spacing

- [ ] **Stock Badge**: Small text "มีสินค้า" in badge
  - Checkpoint: 12px text readable in badge
  - Expected: Clear, not cut off

- [ ] **Price Display**: Numbers (฿1,299) with Thai currency symbol
  - Checkpoint: ฿ symbol renders correctly, price formatting
  - Expected: "฿" displays (not placeholder)

- [ ] **Responsive Stacking**: 3–4 cards per row on desktop, 1–2 on mobile
  - Checkpoint: Cards scale proportionally
  - Expected: No overflow at 320px, full grid at 1024px

#### Sign-Off
- [ ] Luxi: Card layout approved ✓
- [ ] Khun-Ram: Product naming verified ✓
- [ ] Status: PASS / FAIL / NEEDS_REVISION

---

### 4. FAQ Section ✓ Ready for Testing
**File**: `components/FAQ.tsx`  
**Thai Content**: 4–6 Q&A pairs
- Longest Q: "สินค้าของคุณปลอดภัยสำหรับผิวระคายเคืองหรือไม่" (22 chars)
- Sample A: "ใช่ สินค้าของเรา..." (100+ chars)

#### Test Cases
- [ ] **Question Text Wrapping**: Questions wrap to 2–3 lines naturally
  - Checkpoint: No orphaned Thai characters
  - Expected: Balanced line lengths (15–18 chars/line)

- [ ] **Answer Readability**: Answers use line-height ≥1.6
  - Checkpoint: Long answer text (100+ chars) is comfortable to read
  - Expected: Generous spacing between lines

- [ ] **Accordion Interaction**: Expand/collapse smooth
  - Checkpoint: Click to expand—animation smooth, text appears
  - Expected: No layout shift, animation ≤300ms

- [ ] **Icon Alignment**: Icon (chevron, +) aligns with Thai question
  - Checkpoint: Icon doesn't overlap text, centered vertically
  - Expected: Icon at same baseline as first line of question

#### Sign-Off
- [ ] Luxi: Accordion layout approved ✓
- [ ] Khun-Ram: Q&A content verified ✓
- [ ] Status: PASS / FAIL / NEEDS_REVISION

---

### 5. Footer Component ✓ Ready for Testing
**File**: `components/Footer.tsx`  
**Thai Content**:
- Links: "เกี่ยวกับเรา", "นโยบายความเป็นส่วนตัว", etc.
- Copyright: "© 2026 Captain Maid สงวนลิขสิทธิ์"
- Newsletter: "ได้รับข้อเสนอพิเศษและเคล็ดลับการทำความสะอาดส่งมายังกล่องจดหมายของคุณ" (40+ chars)

#### Test Cases
- [ ] **Column Layout**: Links wrap correctly in 3–4 column grid
  - Checkpoint: No link overflow, responsive at 320px/768px/1024px
  - Expected: 1 col at 320px, 2–3 cols at 768px, 4 cols at 1024px

- [ ] **Long Link Text**: "นโยบายความเป็นส่วนตัว" (16 chars) fits in column
  - Checkpoint: No text wrapping within link, clickable area intact
  - Expected: Link fits single line or wraps gracefully

- [ ] **Newsletter Text**: 40+ char description wraps properly
  - Checkpoint: Text stays in container, readable
  - Expected: 2–3 lines, good spacing

- [ ] **Copyright Symbol**: © (copyright symbol) displays correctly
  - Checkpoint: © renders (not placeholder)
  - Expected: Standard copyright symbol

- [ ] **Dark Mode Footer**: All text readable on dark background
  - Checkpoint: Toggle dark mode
  - Expected: Text color switches to light (#E0E8F0)

#### Sign-Off
- [ ] Luxi: Footer layout approved ✓
- [ ] Khun-Ram: Link & content verified ✓
- [ ] Status: PASS / FAIL / NEEDS_REVISION

---

### 6. Metadata (SEO) ✓ Ready for Testing
**File**: `app/[locale]/layout.tsx`  
**Thai Content**:
- Page title: "Captain Maid - ผลิตภัณฑ์ทำความสะอาดพรีเมียม"
- Meta description: (Khun-Ram to provide)

#### Test Cases
- [ ] **HTML Lang Attribute**: Page lang="th" (not lang="en")
  - Checkpoint: Right-click > Inspect → `<html lang="th">`
  - Expected: lang="th" for Thai pages

- [ ] **Browser Title**: Thai characters display in browser tab
  - Checkpoint: Tab title shows Thai text (not mojibake)
  - Expected: "Captain Maid - ผลิตภัณฑ์..."

- [ ] **Meta Description**: Thai description renders correctly in search result
  - Checkpoint: DevTools → Meta description tag
  - Expected: No encoding issues

#### Sign-Off
- [ ] Luxi: Metadata approved ✓
- [ ] Khun-Ram: Thai SEO content verified ✓
- [ ] Status: PASS / FAIL / NEEDS_REVISION

---

## Testing Procedure

### Pre-Testing
1. **Run Dev Server**: `npm run dev`
2. **Access Test Page**: `http://localhost:3000/th/test-thai-typography`
3. **Screenshot Setup**: Open DevTools → Device Toolbar for responsive testing
4. **Browser Console**: Check for any font loading warnings

### During Testing
1. **For Each Component**:
   - Load component at 3 viewports (320px, 768px, 1024px)
   - Take screenshots (if visual regression needed)
   - Check DevTools Fonts tab (verify Noto Sans Thai loaded)
   - Check contrast using [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - Toggle dark mode (Settings → Appearance → Dark)

2. **For Each Checkbox**:
   - Mark ☑ PASS if rendering matches expectation
   - Mark ✗ FAIL and note issue if not matching
   - Take screenshot of failures

### Post-Testing
- Collect screenshots & notes
- File any FAIL issues as rendering problems
- Report PASS summary to Tham
- Schedule sign-off review

---

## Testing Timeline (Phase 1)

| Date | Task | Owner | Status |
|------|------|-------|--------|
| Day 1 | Khun-Ram delivers Phase 1 translations | Khun-Ram | 🔄 PENDING |
| Day 1 PM | Luxi tests components with Thai content | Luxi | 🔄 PENDING |
| Day 2 | Edge cases & dark mode testing | Luxi | 🔄 PENDING |
| Day 2 PM | Collect findings, file issues | Luxi | 🔄 PENDING |
| Day 3 | Final sign-off review | Luxi + Khun-Ram | 🔄 PENDING |

---

## Issue Tracking

### If FAIL is Marked
1. **Describe Issue**: Screenshot + brief description
2. **Severity**: Critical (blocks deployment) / Medium (needs fix) / Low (nice-to-have)
3. **Example Issue**:
   - **Component**: Product Card
   - **Issue**: Thai title text overflows at 320px
   - **Expected**: Title wraps to 2 lines
   - **Screenshot**: [attach]
   - **Action**: Reduce font-size or increase card width

---

## Sign-Off

**Luxi (Design Lead)**: _______________  
**Date**: _____________  
**Status**: ☑ All tests PASS / ✗ Issues filed

**Khun-Ram (Translation Lead)**: _______________  
**Date**: _____________  
**Status**: ☑ Content verified / ✗ Revisions needed

**Tham (Orchestrator)**: _______________  
**Date**: _____________  
**Approval**: ☑ Ready for Phase 2 / ✗ Revise

---

## Reference Links

- **Typography Test Component**: `components/ThaiTypographyTest.tsx`
- **Test Page**: `app/[locale]/test-thai-typography/page.tsx`
- **Design Tokens**: `lib/design-tokens.ts`
- **Thai Locales**: `locales/th.json`
- **Tailwind Config**: `tailwind.config.ts`
- **Global CSS**: `app/globals.css`

---

**Document Status**: ✅ READY FOR PHASE 1  
**Version**: 1.0  
**Last Updated**: 2026-07-07
