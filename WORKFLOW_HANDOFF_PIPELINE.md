# Captain Maid 5-Slide Carousel — Multi-Oracle Handoff Pipeline

**Initiated**: 2026-07-11 23:00 GMT+7  
**Coordinated by**: Zeus  
**Status**: 🔄 PHASE 2: MONITORING CODEX  

---

## Three-Oracle Workflow

```
┌─────────────────────────────────────────────────────────┐
│ CODEX: Build Premium Landing Page (5-Slide Carousel)   │
│ Status: IN PROGRESS                                     │
│ Tasks: Asset audit → Carousel build → SEO → Validate    │
│ ETA: ~45 min from start (22:58 JST + 45m = ~23:43)     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼ (When carousel builds ✅)
┌─────────────────────────────────────────────────────────┐
│ LUXI: UI/UX Design Review (Premium Polish)             │
│ Status: READY (task file created)                       │
│ Tasks: Check design → Verify responsive → Approve       │
│ ETA: ~20 min (concurrent review, not sequential)       │
│ File: LUXI_UI_REVIEW_TASK.md                           │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼ (When Luxi approves ✅)
┌─────────────────────────────────────────────────────────┐
│ KHUN-RAM: Thai Localization (Language Adaptation)      │
│ Status: READY (task file created)                       │
│ Tasks: Translate all text → Verify switcher → QA       │
│ ETA: ~30 min (5 slides, trust badges, CTAs)            │
│ File: KHUN_RAM_LOCALIZATION_TASK.md                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼ (When localization done ✅)
┌─────────────────────────────────────────────────────────┐
│ ZEUS: Final Deployment (Build → Vercel → Live)         │
│ Status: WAITING                                         │
│ Tasks: Verify build → Test browsers → Deploy           │
│ ETA: ~15 min                                            │
└─────────────────────────────────────────────────────────┘
```

---

## Timeline Estimate

| Phase | Owner | Duration | Start | Finish | Status |
|-------|-------|----------|-------|--------|--------|
| Codex Build | Codex | 45 min | 22:58 | ~23:43 | 🔄 IN PROGRESS |
| Luxi Review | Luxi | 20 min | ~23:43 | ~00:03 | 📋 READY |
| Khun-Ram Thai | Khun-Ram | 30 min | ~00:03 | ~00:33 | 📋 READY |
| Zeus Deploy | Zeus | 15 min | ~00:33 | ~00:48 | ⏳ WAITING |
| **TOTAL** | **All** | **~2 hours** | 22:58 | ~00:48 | 🚀 ON TRACK |

---

## Phase 1: CODEX BUILD (Current)

**File**: `.hermes/plans/2026-07-11_225706-captain-maid-premium-landing.md`

**Tasks**:
1. ✅ Plan created
2. ✅ Assets uploaded (18 images)
3. 🔄 Audit homepage & assets
4. 🔄 Build carousel component
5. ⏳ Add SEO metadata
6. ⏳ Validate & polish

**Monitoring**:
- Next check: Every 15 minutes
- Trigger Luxi when: `HeroCarousel.tsx` exists + `page.tsx` updated + builds without errors
- Blockers to watch: Image paths, responsive breakpoints, animation performance

---

## Phase 2: LUXI REVIEW (Ready to Start)

**File**: `LUXI_UI_REVIEW_TASK.md`

**What Luxi Will Do**:
1. Review 5-slide carousel design
2. Check: Premium aesthetic (Apple/Stripe/Dyson style)
3. Verify: Responsive layouts (desktop/tablet/mobile)
4. Test: Animations, buttons, color palette
5. Verify: Accessibility (score >95)
6. Provide feedback & suggestions

**Success Criteria**:
- ✅ All design checklist items pass
- ✅ No high-priority blockers
- ✅ Ready for Thai localization

**Trigger**: When Codex carousel builds successfully

---

## Phase 3: KHUN-RAM LOCALIZATION (Ready to Start)

**File**: `KHUN_RAM_LOCALIZATION_TASK.md`

**What Khun-Ram Will Do**:
1. Translate all 5 slides to Thai
2. Update `locales/th.json` with Thai text
3. Verify language switcher works (TH/EN)
4. Test text fits in buttons/spaces
5. QA: Cultural tone appropriate
6. Ensure no missing translations

**What's Being Localized**:
- Slide 1: Brand Hero (2 headlines + 2 CTAs)
- Slide 2: Product Range (6 categories)
- Slide 3: Lifestyle (4 trust messages)
- Slide 4: Technology (3 features)
- Slide 5: Trust (5 badges + 2 CTAs)

**Success Criteria**:
- ✅ All text translated naturally (not literal)
- ✅ Language switcher works
- ✅ Thai text fits all layouts
- ✅ No console errors
- ✅ Builds without warnings

**Trigger**: When Luxi review completes

---

## Phase 4: ZEUS DEPLOYMENT (Waiting)

**What Zeus Will Do**:
1. Verify final build: `npm run build`
2. Test in browser: desktop/tablet/mobile
3. Verify: All 5 slides load correctly
4. Verify: TH/EN switcher works
5. Check: Performance (Lighthouse >95)
6. Deploy to Vercel
7. Verify live URL works

**Success Criteria**:
- ✅ Build successful (zero errors)
- ✅ All pages responsive
- ✅ Language switcher functional
- ✅ Live on Vercel
- ✅ Performance verified

**Trigger**: When Khun-Ram localization complete

---

## Monitoring Schedule

| Time | Check | Owner | Action |
|------|-------|-------|--------|
| ~23:15 | Codex progress | Zeus | Status update |
| ~23:30 | Codex progress | Zeus | Status update |
| ~23:45 | **Codex done?** | Zeus | → Trigger Luxi if ✅ |
| ~00:05 | Luxi progress | Luxi | Self-report |
| ~00:15 | **Luxi done?** | Luxi | → Trigger Khun-Ram if ✅ |
| ~00:35 | **Khun-Ram done?** | Khun-Ram | → Trigger Zeus if ✅ |
| ~00:50 | **ALL DONE?** | Zeus | → Go live if ✅ |

---

## Communication Points

### When Codex Finishes
**Zeus → Luxi**:
```
Carousel build complete! 🎉
Review checklist: LUXI_UI_REVIEW_TASK.md
Assets: 18 high-quality images (Slides 1-5)
Build status: ✅ No errors
Your mission: Approve design or suggest refinements
Estimated time: ~20 min
```

### When Luxi Finishes
**Zeus → Khun-Ram**:
```
Design approved! ✅
Thai localization ready: KHUN_RAM_LOCALIZATION_TASK.md
All 5 slides need Thai translations
Locales: /captain-maid/locales/th.json
Language switcher: Already wired (needs your text)
Your mission: Translate + verify switcher works
Estimated time: ~30 min
```

### When Khun-Ram Finishes
**Zeus → Deployment**:
```
Thai localization complete! ✅
TH/EN switcher: Working
All text: Translated and fitted
Ready for deployment
Final check: npm run build
```

---

## Risk Mitigation

| Risk | Mitigation | Owner |
|------|-----------|-------|
| Codex carousel doesn't build | Codex troubleshoots; Zeus validates | Codex |
| Design doesn't match brief | Luxi requests refinements | Luxi |
| Thai text overflows buttons | Khun-Ram adjusts translation | Khun-Ram |
| Build fails at deployment | Zeus fixes and redeploys | Zeus |
| Performance below target | Zeus optimizes images/CSS | Zeus |

---

## Success Definition

**CAROUSEL COMPLETE** when:
1. ✅ Codex: 5-slide carousel builds, responsive, assets loaded
2. ✅ Luxi: Design approved, animations smooth, accessibility >95
3. ✅ Khun-Ram: Thai translations complete, switcher works, no overflows
4. ✅ Zeus: Deployed to Vercel, live URL verified, Lighthouse >95

---

## Files in This Workflow

- `LUXI_UI_REVIEW_TASK.md` — Detailed UI review checklist
- `KHUN_RAM_LOCALIZATION_TASK.md` — Thai translation task
- `.hermes/plans/2026-07-11_225706-captain-maid-premium-landing.md` — Codex plan
- This file — Pipeline overview & monitoring

---

## Next Action

**NOW**: Monitoring Codex build (check every 15 minutes)  
**WHEN CODEX DONE**: Trigger Luxi UI review  
**WHEN LUXI DONE**: Trigger Khun-Ram localization  
**WHEN ALL DONE**: Zeus final deployment  

**Estimated completion**: ~00:48 GMT+7 (2 hours from start)

---

**Philosophy**: Low-investment orchestration, high-output quality.  
**Status**: 🚀 ON TRACK
