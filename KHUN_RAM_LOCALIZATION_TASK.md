# Khun-Ram-Oracle: Thai Localization — 5-Slide Carousel

**Status**: 🟡 AWAITING LUXI REVIEW COMPLETION  
**Priority**: HIGH (final step before launch)  
**ETA**: After Luxi review (~30 min)  

---

## Task Summary

After Codex builds the carousel and Luxi approves the design, your mission: **translate all text to Thai and verify language switcher works correctly**.

The carousel already has English (`locales/en.json`). You will:
1. Add Thai versions to `locales/th.json`
2. Verify TH/EN switcher works on carousel
3. Ensure cultural tone is appropriate for Thai audience

---

## What to Translate

### Slide 1: Brand Hero

| English | Thai | Status |
|---------|------|--------|
| "Made for Easy Home Cleaning" | "ทำให้การทำความสะอาดบ้านง่ายขึ้น" | [ ] |
| "Better Living, Taken Care of by Captain Maid." | "ชีวิตที่ดีขึ้น ดูแลโดย Captain Maid" | [ ] |
| "Shop Now" | "ซื้อเลย" | [ ] |
| "Learn More" | "เรียนรู้เพิ่มเติม" | [ ] |

### Slide 2: Product Range

| English | Thai | Status |
|---------|------|--------|
| "Complete Cleaning Solutions for Every Corner of Your Home" | "วิธีทำความสะอาดอย่างสมบูรณ์สำหรับทุกมุมของบ้านคุณ" | [ ] |
| Kitchen | "ครัว" | [ ] |
| Bathroom | "ห้องน้ำ" | [ ] |
| Floor | "พื้น" | [ ] |
| Laundry | "ซักผ้า" | [ ] |
| Multi-purpose | "หลายประเทศ" | [ ] |

### Slide 3: Lifestyle

| English | Thai | Status |
|---------|------|--------|
| "Safe for Your Family Everyday Comfort" | "ปลอดภัยสำหรับครอบครัว ความสะดวกทุกวัน" | [ ] |
| "Safe for Kids" | "ปลอดภัยสำหรับเด็ก" | [ ] |
| "Safe for Pets" | "ปลอดภัยสำหรับสัตว์เลี้ยง" | [ ] |
| "Gentle & Effective" | "อ่อนโยน และมีประสิทธิภาพ" | [ ] |

### Slide 4: Technology

| English | Thai | Status |
|---------|------|--------|
| "Advanced Cleaning with Natural Power" | "การทำความสะอาดขั้นสูงด้วยพลังธรรมชาติ" | [ ] |
| "Natural Ingredients" | "ส่วนผสมธรรมชาติ" | [ ] |
| "Deep Cleaning Technology" | "เทคโนโลยีการทำความสะอาดอย่างลึกซึ้ง" | [ ] |
| "Surface Protection" | "ป้องกันพื้นผิว" | [ ] |

### Slide 5: Trust

| English | Thai | Status |
|---------|------|--------|
| "Trusted Quality You Can Count On" | "คุณภาพที่เชื่อถือได้ที่คุณสามารถไว้ใจได้" | [ ] |
| "Made in Thailand" | "ทำในประเทศไทย" | [ ] |
| "Quality Tested" | "ทดสอบคุณภาพ" | [ ] |
| "Eco Friendly" | "เป็นมิตรต่อสิ่งแวดล้อม" | [ ] |
| "Trusted Brand" | "แบรนด์ที่เชื่อถือได้" | [ ] |
| "Shop Now" | "ซื้อเลย" | [ ] |
| "Become Distributor" | "เป็นตัวแทนจำหน่าย" | [ ] |

---

## Translation Guidelines

### Tone & Voice
- **Warm, professional, trustworthy** — match English brand voice
- **Humble and respectful** — appropriate for Thai audience
- **Product safety is paramount** — emphasize naturally and clearly
- **Avoid hard-sell** — Thais respond better to gentle, helpful approach

### Language Specifics
- Use **ป้องกัน** (protect) not just **เพิ่ม** (add)
- Prefer **ธรรมชาติ** (natural) over **พืช** (plant-based only)
- **ครอบครัว** (family) resonates strongly
- **ปลอดภัย** (safe) should appear multiple times on lifestyle slide

### Numbers & Currency
- Format prices with **฿** (baht symbol)
- Use Thai number format (e.g., "1,234" = "1,234" in Thai, same as English)
- No need for Thai numerals unless brand guidelines specify

### Cultural Adaptation
- "Made in Thailand" is a **strong selling point** — emphasize with pride
- Family and pets are valued — tone should be warm on Slide 3
- Trust badges resonate — ensure quality/testing emphasis is clear
- Eco-friendly is growing concern — position as responsibility, not just feature

---

## Implementation Checklist

### 1. Update Locales Files

- [ ] Add all Slide 1-5 text to `locales/th.json`
- [ ] Keep English versions in `locales/en.json` intact
- [ ] Verify JSON syntax (no missing quotes, commas)
- [ ] Use consistent structure (group by slide if helpful)

### 2. Verify Language Switcher

- [ ] TH/EN toggle works on carousel page
- [ ] Switching languages updates all visible text
- [ ] URL changes locale (`/th/` ↔ `/en/`)
- [ ] Page refreshes correctly after language switch
- [ ] No console errors during switch

### 3. Quality Assurance

- [ ] **Read carousel in Thai** — does it flow naturally?
- [ ] **Font renders correctly** — no character issues
- [ ] **Text length** — does Thai translation fit button/space? (Thai is often longer)
- [ ] **No hardcoded English** — all text comes from locales
- [ ] **Buttons don't overflow** — especially "Become Distributor" (เป็นตัวแทนจำหน่าย is long)

### 4. Accessibility in Thai

- [ ] Alt text for images can be localized if needed
- [ ] ARIA labels support Thai
- [ ] Font supports Thai characters (usually does, but verify)
- [ ] Line height sufficient for Thai text (slightly taller than English)

---

## Common Translation Pitfalls (Avoid)

❌ Literal word-for-word translation  
✅ Natural Thai phrasing that sounds native

❌ Over-technical language  
✅ Clear, accessible Thai that homeowners understand

❌ Ignoring context (e.g., "Distributor" without "Become")  
✅ Complete phrases that make sense standalone

---

## File Locations

**Files to modify:**
- `/captain-maid/locales/th.json` — Add Thai translations here
- `/captain-maid/locales/en.json` — Reference (don't change)
- `/captain-maid/app/[locale]/page.tsx` — Verify it uses translation keys

**Verify these work after changes:**
- Language switcher (TH/EN toggle)
- Carousel displays Thai text
- No missing translation keys (console clear)

---

## Success Criteria

✅ **All 5 slides have Thai translations**  
✅ **Language switcher works (TH ↔ EN)**  
✅ **Thai text reads naturally** (not robotic)  
✅ **No text overflow** (buttons fit)  
✅ **Font renders correctly** (no character issues)  
✅ **Console clean** (no missing key warnings)  
✅ **URL changes locale** (`/th/` vs `/en/`)  

---

## Handoff Notes from Luxi

*[Will be filled in after Luxi review]*

If Luxi flagged any design-dependent issues (e.g., button width, text length), note them here:

- [ ] Button text fits (check "Become Distributor" in Thai)
- [ ] Headline length doesn't break layout
- [ ] Badge text readable at small size
- [ ] No unexpected line breaks

---

## Next Step

After Thai localization is complete:
1. Run `npm run build` to verify
2. Test on mobile (1080×1920) with Thai language
3. Pass to **Zeus** for final deployment prep

---

**Ready for Thai excellence!** ทำไทยให้สุดความสามารถ 🎯
