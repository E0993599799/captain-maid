# Phase 1 Sync: Luxi (Design) ↔ Khun-Ram (Translation)
**Date**: 2026-07-07  
**Timeline**: 3-day sprint (Day 1–3)  
**Purpose**: Align on deliverables, constraints, and communication before translation starts

---

## Section 1: Deliverables Clarity

### Luxi → Khun-Ram: "What exactly do you need to translate?"

**Component 1: Navigation** (8–10 items)
```
Existing en.json keys (DO NOT CHANGE KEYS):
├─ nav.shop: "SHOP"
├─ nav.essentials: "ESSENTIALS"
├─ nav.bestSellers: "BEST SELLERS"
├─ nav.about: "ABOUT US"
├─ nav.blog: "BLOG"
├─ nav.contact: "CONTACT"
├─ nav.help: "Help"
└─ nav.freeDelivery: "FREE Delivery on all orders!"

Thai th.json already has these — verify/refine only if better phrasing.
Longest item: "เกี่ยวกับเรา" (7 Thai chars, ~75px at 16px font)
Design constraint: Must fit in nav bar at 768px tablet width
```

**Component 2: Hero Section** (4 items)
```
hero.title: "Make Home Cleaning Easier"
hero.subtitle: "Premium cleaning products made from natural ingredients..."
hero.cta1: "Shop Now"
hero.cta2: "Learn More"

Thai versions exist in th.json:
├─ title: "ทำให้การทำความสะอาดบ้านง่ายขึ้น" (20 Thai chars)
├─ subtitle: "ผลิตภัณฑ์ทำความสะอาดพรีเมียม..." (60+ chars)
├─ cta1: "ซื้อเลย" (4 chars)
└─ cta2: "เรียนรู้เพิ่มเติม" (9 chars)

⚠️ Design constraints:
• h1 line-height: 1.2 (tight) — very long titles may wrap awkwardly
• Button height: 44px — test if CTA text fits with padding
• Subtitle wraps at ~60 chars — multi-line expected
```

**Component 3: Products** (6 items, ~3–4 products shown)
```
products.title: "Featured Products"
products.subtitle: "Discover our complete line..."
products.viewAll: "View All Products"
products.moreDetail: "More Detail"
products.inStock: "In Stock"
products.outOfStock: "Out of Stock"

⚠️ Design constraints:
• Product card width: ~300px at tablet
• Title max 2 lines (18–20 Thai chars = ~1 line at card width)
• Description: 2–3 lines expected
• Badge: 12px text in badge (check readability)

Example product names (reference only):
├─ "น้ำยาทำความสะอาดกระจก" (18 chars) ← test this for wrapping
├─ "น้ำยาทำความสะอาดห้องน้ำ" (18 chars)
└─ "น้ำยาทำความสะอาดห้องครัว" (18 chars)
```

**Component 4: FAQ** (4–6 Q&A pairs — NEW)
```
No existing th.json entries for FAQ.
Khun-Ram: Create 4–6 question-answer pairs.

Design constraints:
• Questions: 15–25 Thai chars (test at 36px, h3 size)
• Answers: 50–150 Thai chars (test at 16px body size)
• Layout: Accordion (expand/collapse)
• Icon alignment: Chevron must align with first line

Example Q (reference):
Q: "สินค้าของคุณปลอดภัยสำหรับผิวระคายเคืองหรือไม่" (22 chars)
A: "ใช่ สินค้าของเรา..." (100+ chars expected)

⚠️ Luxi needs to test:
• Chevron alignment with wrapped question text
• Multi-line answer spacing (line-height 1.6)
```

**Component 5: Footer** (15+ items, mostly existing)
```
Existing th.json complete (65+ entries).
Khun-Ram: Verify all are accurate, no changes needed unless better phrasing.

Design constraints:
• Layout: 4-column grid at desktop, 1–2 col at mobile
• Longest item: "นโยบายความเป็นส่วนตัว" (16 chars) ← verify fits single line
• Newsletter text: 40+ chars (wraps 2–3 lines at full width)
• Copyright: "© 2026 Captain Maid สงวนลิขสิทธิ์" ← verify © symbol renders
```

**Component 6: Metadata/SEO** (2 items — NEW)
```
Page title (Thai):
• English: "Captain Maid - Premium Home Cleaning Products"
• Thai: Create equivalent (Khun-Ram)
• Constraint: Keep <60 chars for Google SERP display

Meta description (Thai):
• English: "Quality home cleaning products made from natural ingredients."
• Thai: Create equivalent (Khun-Ram)
• Constraint: Keep 150–160 chars for SERP display

Note: These appear in browser tab + search results, not on page.
```

---

### Khun-Ram → Luxi: "Do I have design constraints I should know?"

**Font Size Assumptions**
- Navigation item: 14px (compact)
- Hero headline: 54px (very large — test wrapping)
- Hero subtitle: 16px body (generous line-height 1.6)
- Product title: 24px (medium)
- Product desc: 14px (small, but readable)
- FAQ question: 36px (h3 size)
- FAQ answer: 16px body
- Footer: 14px (small)

**Thai Text Width Reference**
- 1 Thai char ≈ 15–20px at base font-size (vs 8–12px for Latin)
- Example: "ซื้อเลย" (4 chars) = ~75px at 16px font
- Example: "นโยบายความเป็นส่วนตัว" (16 chars) = ~240px at 14px font

**Line Height Implications**
- 1.2 line-height (headlines): Thai diacriticals may crowd
- 1.6 line-height (body): Thai readable, comfortable
- Test assumption: Does Thai line-height 1.2 in h1 look cramped?

**Mobile Viewport Constraints**
- 320px: Very narrow (6–8 Thai chars per line in text)
- 768px: Comfortable (12–15 Thai chars per line)
- 1024px: Full width (20+ Thai chars per line)

**Questions for Khun-Ram**:
1. Do you foresee any Thai phrases that are longer than expected?
2. Any product names with special characters (๑ ๒ ๓ etc.)?
3. FAQ answers — should they be concise or detailed?

---

## Section 2: Content Structure & Format

### How Khun-Ram Should Deliver Content

**Format**: Provide translations as either:
- **Option A**: Updated `locales/th.json` file (easiest for Luxi to test)
- **Option B**: Markdown list with key-value pairs
- **Option C**: Direct message/Slack with each component

**Recommendation**: Option A (updated th.json)
- Luxi can run dev server immediately
- Exact format expected by app
- No manual transcription needed

**Delivery Timeline**:
- Day 1 Morning: Khun-Ram confirms which format works best
- Day 1 EOD: All 6 components delivered
- Day 2 Morning: Luxi tests with actual content

**JSON Key Preservation**:
⚠️ CRITICAL: Do not rename or reorganize keys. Example:
```json
// ✅ CORRECT:
{
  "nav": {
    "shop": "ร้านค้า"
  }
}

// ✗ WRONG:
{
  "navigation": {
    "shop_th": "ร้านค้า"
  }
}
```

---

### How Luxi Will Test & Provide Feedback

**Day 2 Testing Process**:
1. Luxi receives Khun-Ram's th.json
2. Luxi updates local file → `npm run dev`
3. Luxi navigates to `/th` (Thai locale)
4. Luxi tests each component at 3 viewports (320px, 768px, 1024px)
5. Luxi uses THAI_COMPONENT_VALIDATION_CHECKLIST.md for systematic testing

**Feedback Format** (if issues):
```
Component: [Navigation / Hero / Products / FAQ / Footer / Metadata]
Issue: [Overflow / Contrast / Wrapping / Other]
Viewport: [320px / 768px / 1024px / All]
Description: "Text overflows button at 320px"
Screenshot: [attached]
Recommended Action: [Shorten text / Increase width / Adjust font-size / N/A]
```

**Expected Feedback Turnaround**:
- Day 2 Morning: Luxi begins testing
- Day 2 EOD: Luxi reports findings (PASS / FAIL / NEEDS_REVISION)

---

## Section 3: Edge Cases & Assumptions

### Khun-Ram → Luxi: "What if...?"

**Q1: What if a Thai phrase is longer than the English equivalent?**
- A: Document it. Luxi will test wrapping. If it overflows, Luxi will flag for adjustment.
- Example: "ซื้อเลยก่อนหมดสต็อก" (much longer than "Shop Now") might not fit button.
- Khun-Ram should use concise phrasing when possible.

**Q2: Can I use special Thai characters or symbols?**
- A: Yes, but document them. Example: ฿ (Thai Baht), ๑–๙ (Thai numerals), etc.
- Luxi will verify they render correctly.

**Q3: What about currency/pricing display?**
- A: Not in Phase 1 scope. Phase 1 is UI text only (navigation, headings, labels).
- Pricing is Phase 2 (checkout flow).

**Q4: Should product names match English exactly (translation) or can I create new names?**
- A: Thai product names should reflect English intent, but can be culturally optimized.
- Examples:
  - "Glass Cleaner" → "น้ำยาทำความสะอาดกระจก" (literal) or "สเปรย์เช็ดกระจกใส" (cultural)
  - Khun-Ram: Choose based on Thai market naming convention.

**Q5: FAQ questions—should I cover specific products or general care?**
- A: General care for Phase 1 MVP (keeps scope narrow).
- Phase 2 can add product-specific FAQs.
- Suggested topics: Safety, ingredients, usage, eco-friendliness, returns.

---

### Luxi → Khun-Ram: "What if...?"

**Q1: What if Thai text overflows a button?**
- A: Luxi will flag in feedback. Khun-Ram can shorten text or Luxi can adjust button width.
- Example: "ชำระเงินอย่างปลอดภัยโดยใช้บัตรเครดิต" (too long for button).
- Shorter version: "ชำระเงินปลอดภัย" (fits better).

**Q2: What if contrast fails on dark mode?**
- A: Unlikely (CSS variables handle dark mode), but if it happens, Luxi will adjust color tokens.

**Q3: What if line-height 1.2 makes Thai h1 text crowd?**
- A: Luxi will increase to 1.3 or 1.4 for that component only.
- This is NOT a blocker—just a design refinement.

**Q4: Can I test dark mode while testing?**
- A: Yes! DevTools Settings → Appearance → toggle Dark Mode.
- Thai text should remain readable in dark mode.

---

## Section 4: Communication Protocol (Day 1–3)

### Daily Standup (EOD, 5-min format)

**Khun-Ram's Daily Report to Tham** (template):
```
Day 1 EOD Report:
• Progress: [X/6 components complete]
• Deliverables: [Thai strings ready for Luxi]
• Blockers: [None / Design clarification needed / Escalate]
• Status: [On track / At risk / Complete]
```

**Luxi's Daily Report to Tham** (template):
```
Day 2 EOD Report:
• Testing: [X/6 components tested]
• Results: [Y passed, Z need revision]
• Blockers: [None / Awaiting content clarity / Escalate]
• Status: [On track / At risk / Complete]
```

### If Blocked (Escalation Protocol)

**Khun-Ram Blocked** (design question):
1. Ask Luxi directly (Slack / message)
2. Luxi responds within 5 min
3. If no response after 5 min → escalate to Tham

**Luxi Blocked** (content clarity):
1. Ask Khun-Ram directly
2. Khun-Ram responds within 5 min
3. If no response after 5 min → escalate to Tham

**Example Blocked Scenario**:
```
Khun-Ram: "Can hero subtitle be 2 lines instead of 3?"
Luxi: "Yes, prefer 2 lines. Shorter phrasing = better design."
Khun-Ram: "Got it, revising."
→ Resolved in <5 min, no escalation needed
```

---

## Section 5: Test Infrastructure Walkthrough

### Luxi Testing Day 2 — How to Use Tools

**1. Run Dev Server**
```bash
cd captain-maid
npm run dev
# Server starts on http://localhost:3000
```

**2. Navigate to Thai Locale**
```
http://localhost:3000/th
# (or specific component: /th/test-thai-typography for reference)
```

**3. Test Each Component**
Use THAI_COMPONENT_VALIDATION_CHECKLIST.md (print it):
- Navigate to component
- Check each test case from checklist
- Mark ✓ PASS or ✗ FAIL
- Take screenshots if FAIL

**4. Verify Font Rendering**
```
DevTools → Sources → Fonts tab
# Should show "Noto Sans Thai" loaded (not just Poppins/Montserrat)
```

**5. Test Dark Mode**
```
DevTools → Settings → Appearance → Dark mode toggle
# Text should remain readable (light color on dark bg)
```

**6. Test Responsive (3 viewports)**
```
DevTools → Device Toolbar → Select device or set custom:
• 320px (mobile)
• 768px (tablet)
• 1024px (desktop)
# Test each component at all 3 sizes
```

---

## Section 6: Success Criteria & Sign-Off

### Phase 1 Complete When All 3 Conditions Met

**Condition 1: Khun-Ram Translation Sign-Off**
```
"I have verified that all Thai translations are:
 ✓ Grammatically correct
 ✓ Culturally appropriate
 ✓ Match the English intent
 ✓ Follow terminology conventions (from th.json)
"

Khun-Ram signature: _______________
Date: _____________
```

**Condition 2: Luxi Design Sign-Off**
```
"I have tested all 6 components with Thai content and verified:
 ✓ All components pass validation checklist
 ✓ No overflow issues at 320px / 768px / 1024px
 ✓ Contrast meets WCAG standards
 ✓ Dark mode rendering is acceptable
 ✓ Font rendering is correct (Noto Sans Thai)
"

Luxi signature: _______________
Date: _____________
```

**Condition 3: Tham Final Approval**
```
"Both leads have signed off. Phase 1 MVP is:
 ✓ Ready for Phase 2 (deployment prep)
"

Tham signature: _______________
Date: _____________
```

---

## Section 7: Quick Reference Checklist

### Khun-Ram's To-Do (Day 1)

- [ ] Read: `LUXI_DESIGN_VALIDATION_SUMMARY.md` (context)
- [ ] Reference: `locales/th.json` (existing translations)
- [ ] Translate/verify 6 components:
  - [ ] Navigation (8–10 items)
  - [ ] Hero (4 items)
  - [ ] Products (6 items)
  - [ ] FAQ (4–6 Q&A pairs — NEW)
  - [ ] Footer (15+ items)
  - [ ] Metadata (2 items — NEW)
- [ ] Deliver: Updated `locales/th.json` (or Option B/C format)
- [ ] Report: EOD status to Tham
- [ ] Sign: Translation sign-off (Day 3)

### Luxi's To-Do (Day 2)

- [ ] Receive: Khun-Ram's th.json
- [ ] Setup: Local dev server (`npm run dev`)
- [ ] Test: Each component at 320px / 768px / 1024px
- [ ] Reference: `THAI_COMPONENT_VALIDATION_CHECKLIST.md`
- [ ] Verify: Dark mode rendering
- [ ] File: Issues (if any) with component + viewport + screenshot
- [ ] Report: EOD findings to Tham
- [ ] Sign: Design sign-off (Day 3)

### Tham's To-Do (Day 3)

- [ ] Review: Both sign-offs
- [ ] Approve: Phase 1 complete, proceed to Phase 2
- [ ] Notify: Team (deployment prep begins)

---

## Section 8: Questions Before We Start

**Luxi → Khun-Ram**:
1. Any concerns about the 6 components in scope?
2. Do you have existing FAQ content from English, or should you create from scratch?
3. Preferred delivery format: Updated th.json or markdown list?

**Khun-Ram → Luxi**:
1. Any design decisions I should know about before translating?
2. Should product names be literal translations or culturally localized?
3. What's your turnaround time for feedback if issues arise?

**Both → Tham** (if unclear):
1. Is Phase 1 scope locked, or can we adjust based on testing?
2. What happens if we find blocking design issues on Day 2?
3. Escalation SLA if both leads are blocked—who's the tiebreaker?

---

## Final Status

**Prepared for Phase 1 Execution**: ✅ YES  
**Both Leads Ready**: ⏳ Awaiting confirmation  
**Timeline**: 3 days (Day 1–3, starting 2026-07-07)  
**Next Action**: Khun-Ram confirms delivery format + starts translation work

---

**Document Status**: Ready for Phase 1 Sync  
**Version**: 1.0  
**Created**: 2026-07-07
