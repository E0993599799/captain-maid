# Luxi-Oracle: UI/UX Review — 5-Slide Premium Carousel

**Status**: 🟡 AWAITING CODEX COMPLETION  
**Priority**: HIGH (blocking → Khun-Ram localization)  
**ETA**: 15-30 minutes after Codex finishes  

---

## Task Summary

Codex will deliver a premium 5-slide hero carousel landing page. Your mission: **verify it matches the brief and suggest polish**.

**Do not build** — only review and suggest refinements.

---

## Review Checklist

### 1. Premium Design Alignment (Apple/Stripe/Dyson style)

- [ ] Hero section has **soft shadows** (not harsh)
- [ ] **White space** is generous (not crowded)
- [ ] **Large typography** for headlines (readable on mobile)
- [ ] **Smooth gradients** (no banding, no harsh color shifts)
- [ ] **Glassmorphism** used sparingly (buttons, badges)
- [ ] **Rounded corners** consistent (16-24px radius)
- [ ] Overall **"premium, friendly, professional"** feel

### 2. Color Palette Accuracy

Verify all colors match the spec:

| Color | Value | Usage | ✓ |
|-------|-------|-------|---|
| Primary Blue | #0A56C2 | Headlines, CTAs | [ ] |
| Dark Blue | #003C8F | Shadows, deep accents | [ ] |
| Light Blue | #DCEEFF | Backgrounds, highlights | [ ] |
| White | #FFFFFF | Text, cards, clean areas | [ ] |
| Accent Green | #72C341 | Trust badges, highlights | [ ] |

### 3. Responsive Layouts (3 Breakpoints)

Test each slide on:

#### Desktop (1920×1080)
- [ ] Hero split layout working (text left, mascot/product right)
- [ ] Typography readable at distance
- [ ] All CTA buttons visible and clickable
- [ ] No horizontal scroll

#### Tablet (1600×1200)
- [ ] Balanced layout (text and visuals aligned)
- [ ] Font sizes scaled appropriately
- [ ] Touch targets ≥44×44px

#### Mobile (1080×1920)
- [ ] **Stacked layout** (no side-by-side)
- [ ] **Mascot/products fully visible** (not cropped)
- [ ] **Large CTA buttons** (thumb-friendly)
- [ ] Text readable (min 16px)
- [ ] No horizontal scroll

### 4. Slide-Specific Review

#### Slide 1: Brand Hero
- [ ] Mascot positioned correctly (not cut off)
- [ ] "Made for Easy Home Cleaning" headline prominent
- [ ] Blue gradient background smooth
- [ ] CTA buttons ("Shop Now", "Learn More") styled consistently
- [ ] Subheading visible and clear

#### Slide 2: Product Range
- [ ] All major products visible in grid
- [ ] Category icons clear and recognizable
- [ ] White background clean
- [ ] Premium shelf presentation (not cluttered)
- [ ] Products not overlapping on mobile

#### Slide 3: Lifestyle
- [ ] Family scene warm and inviting
- [ ] Mother, child, dog all clearly visible
- [ ] Natural sunlight effect present
- [ ] Products positioned naturally (not floating awkwardly)
- [ ] Text overlay readable over image

#### Slide 4: Technology
- [ ] Abstract tech scene is elegant (not cheesy)
- [ ] Water splash, molecules, leaf visible
- [ ] Blue scientific background appropriate
- [ ] Captain Maid product visible (subtle)
- [ ] Premium CGI feel maintained

#### Slide 5: Trust
- [ ] Trust badges prominent ("Made in Thailand", "Quality Tested", "Eco Friendly", "Trusted Brand")
- [ ] Mascot visible (right side preferred)
- [ ] Products showcased
- [ ] CTA buttons ("Shop Now", "Become Distributor") clear
- [ ] Modern luxury house background sets tone

### 5. Animations & Interactions

- [ ] **Smooth fade** between slides (no jarring cuts)
- [ ] **Parallax effect** on hero text/image (if present)
- [ ] **Floating product** animations subtle (not distracting)
- [ ] **Glass reflections** on buttons/cards (if used)
- [ ] **Hover animations** smooth (button ripple, scale, etc.)
- [ ] **Scroll reveal** for below-fold sections
- [ ] Performance: animations <60ms lag on mobile

### 6. Buttons & CTAs

- [ ] Primary CTA button: **#0A56C2 background**, white text
- [ ] Secondary CTA button: light variant with outline
- [ ] Hover state obvious (color shift or shadow)
- [ ] Active state (pressed) clear
- [ ] Disabled state visible (if any)
- [ ] Text inside buttons clear (no truncation)
- [ ] Button size appropriate for touch

### 7. Accessibility

- [ ] All buttons have `aria-label` or readable text
- [ ] Images have alt text
- [ ] Color contrast >4.5:1 (WCAG AA)
- [ ] Focus states visible (keyboard navigation)
- [ ] No flashing/strobing animations
- [ ] Form inputs labeled (if any)
- [ ] Skip navigation present (if needed)

### 8. Performance & SEO Signals

- [ ] Images are optimized (WebP, AVIF with fallback)
- [ ] No duplicate meta tags visible
- [ ] Semantic HTML used (section, article, figure)
- [ ] Lazy loading on below-fold images
- [ ] No console errors (dev tools)
- [ ] No layout shift (CLS <0.1)

---

## Feedback Format

If you find issues, provide feedback as:

```markdown
### Issue: [Component/Slide]

**Problem**: [What's wrong]

**Current**: [Screenshot or description]

**Suggested Fix**: [Specific improvement]

**Priority**: High / Medium / Low

**Example**: [If helpful, show the change]
```

---

## Success Criteria

✅ **All checklist items checked**  
✅ **No high-priority blockers**  
✅ **Design matches brief (Apple/Stripe/Dyson aesthetic)**  
✅ **Responsive on all 3 breakpoints**  
✅ **Accessibility score >95**  

---

## Next Step

After review, pass findings to **Khun-Ram-Oracle** for Thai localization with note on any design-dependent changes (e.g., button text length affects layout).

---

**Questions?** Flag in comments. Ready when Codex finishes carousel! 🎯
