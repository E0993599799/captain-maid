
# Captain Maid Theme, UX/UI และ Frontend Architecture Implementation Plan

> เอกสารนี้เป็น implementation plan เท่านั้น ห้ามแก้ source, ติดตั้ง package, refactor, commit, deploy หรือเปลี่ยน configuration จนกว่าจะได้รับอนุมัติ

**เป้าหมาย:** เปลี่ยน Captain Maid ให้เป็นเว็บไซต์ household cleaning ที่ premium, สะอาด, เป็นมิตร, น่าเชื่อถือ และ conversion-focused โดยรักษา brand identity ของ Captain Maid รองรับภาษาไทย/อังกฤษทุกหน้าหลัก และเชื่อม CMS อย่างปลอดภัย

**สถาปัตยกรรมเป้าหมาย:** Captain Maid เป็น frontend ที่เป็นเจ้าของ brand tokens, component rendering, responsive behavior และ conversion journey ของตัวเอง ใช้ cms-arigeo เป็น shared content backend ผ่าน typed adapter ที่กรอง site=captain-maid อย่างเข้มงวด ไม่ใช้ visual identity หรือ components ของ arigeo-project

**Tech stack ที่ยืนยัน:** Next.js 15.x, React 19, TypeScript, Tailwind CSS 3.4, next-intl dependency, lucide-react, Next Image, Payload CMS REST/GraphQL, Supabase/Postgres และ Vercel

## Global Constraints

- แผนนี้เป็น plan only; ห้าม implement ระหว่าง phase นี้
- ต้องรักษา modified/untracked files ที่มีอยู่ก่อนเริ่มงาน
- shared infrastructure ใช้ร่วมกันได้ แต่ brand tokens, typography, content presentation และ visual language ต้องแยก
- คง CMS_SITE_SLUG=captain-maid และ site-scoped filtering เป็น boundary
- ห้ามเพิ่ม custom checkout, payment, inventory หรือ cart จริง; architecture ระบุว่าเป็น shopping gateway ไป external channels
- claims ด้าน safety, efficacy, ingredients, 5 FREE, เด็ก/สัตว์เลี้ยง และ essential oils ต้องผ่าน Product/Regulatory/Legal
- ค่าที่เสนอใหม่ระบุ PROPOSED; ค่าที่ตรวจได้จริงระบุ VERIFIED
- ทุก work package ต้องมี testable acceptance evidence และ rollback

## 1. Executive Summary

Captain Maid มีทิศทางแบรนด์ชัดจาก Captain_Maid_design.png: โลโก้กัปตัน, น้ำเงิน/ฟ้า, ภาพบ้านสว่าง, rounded cards, trust strip, category/solution discovery, product cards, trust banner, testimonial, newsletter และ navy footer แต่ implementation ปัจจุบันยังเป็นหลายชุดที่ไม่เชื่อมกัน

ประเด็นที่ต้องแก้ก่อน polish:

1. app/[locale]/page.tsx redirect ไป / ทำให้ locale URL ไม่ได้เป็น localized page และ Header เปลี่ยนภาษาเพียง local state
2. routes ใช้ hardcoded data จาก lib/captain-products.ts และ lib/blog.ts; CMS client/adapter ยังไม่ถูกใช้โดยหน้าใช้งานจริง
3. legacy components/data ใน components/*.tsx และ lib/products.ts ปะปนกับชุดใหม่ใน components/home/* และ components/products/*
4. contact/newsletter/search/cart/account บางส่วนเป็น visual-only หรือ placeholder
5. CMS-ADAPTER-SETUP.md, cms-arigeo/ARCHITECTURE.md, types/cms.ts และ Payload schema มี field/status/access mismatch

ข้อเสนอคือ Direction A — Trusted Blue Homecare System: รักษา blue-led Captain Maid identity, เพิ่ม warm neutral, ใช้ bilingual typography, ทำ room/category/problem discovery เป็นแกน และใช้ constrained CMS blocks เพื่อไม่ให้ editor ทำ layout แตก

## 2. Verified Project Context

### Captain Maid

- ตำแหน่ง: /mnt/d/01 Main Work/Boots/Agentic AI/mission-control/captain-maid
- branch main tracking origin/main
- worktree มี modified และ untracked files จำนวนมาก; ห้าม overwrite
- package.json มี Next ^15.0.0, React ^19.0.0, next-intl ^3.0.0, Tailwind ^3.4.0 และ TypeScript ^5.3.0
- middleware.ts รองรับ en/th, default th และ matcher / กับ /(en|th)/:path*
- app/layout.tsx โหลด Poppins และ Noto_Sans_Thai, วาง Header/Footer แบบ global
- tailwind.config.ts มีสี captain ชุดหนึ่ง; globals.css/components มี #0079c1/#002d5f อีกชุดหนึ่ง
- ไม่พบ tests, test runner config หรือ message files ใน source inventory
- package-lock.json ถูกลบ; logs พูดถึง lockfiles หลายระดับ จึงต้องยืนยัน package manager ก่อน implementation

### Shared CMS

- cms-arigeo ใช้ Payload CMS ^3.75.0, Postgres, Vercel Blob, localized fields th/en และมี collections Products, ProductCategories, Solutions, Media, Pages, Posts, Faqs, Banners, Testimonials, Navigation, SiteSettings, Enquiries
- access ปัจจุบันใน cms-arigeo/src/payload/access.ts ใช้ authenticatedRead/admin/site scope
- Products.ts ใช้ contentStatus, keyBenefits, suitableFor, safetyRemark, claimsSupport, images, relatedProducts และ SEO
- types/cms.ts/adapter.ts ใช้ชื่ออื่น เช่น status, shortDescription, benefits, claims และ format ราคาเป็น USD
- SiteContent.ts ใช้ site/menuKey/localized fields แต่ตัวอย่างใน CMS-ADAPTER-SETUP.md ไม่ตรงทุกจุด

### Arigeo

- arigeo-project เป็น corporate frontend identity white/red/black ตาม Arigeo_Brief.md
- architecture ระบุ shared CMS, site scope, แยก Vercel projects และไม่ทำ custom ecommerce
- ห้าม copy Arigeo visual identity มาใช้ Captain Maid; ใช้ได้เฉพาะ infrastructure patterns ที่ contract ตรงกัน

## 3. Source and Evidence Map

| Source | Verified evidence | Planning consequence |
| --- | --- | --- |
| captain_maid.md | product dropdown, cleaning problems, 5-slide hero, bilingual product detail | IA, hero, product schema |
| Captain_Maid_design.png | 748x2103 reference: blue header, TH/EN, 5-dot hero, trust strip, category cards, solutions, products, trust/story/testimonial/newsletter/footer | visual acceptance |
| app/layout.tsx | fonts, root metadata, global shell | locale/SEO/font work |
| middleware.ts + app/[locale]/page.tsx | locale matcher exists but page redirects to root | Critical localization fix |
| globals.css + tailwind.config.ts | conflicting token sets | token consolidation |
| components/Header.tsx | hardcoded nav, hover menu, local lang, visual-only search/account/cart | navigation audit |
| components/Footer.tsx | placeholder social/contact, newsletter no submit, legal links to faq | footer/form/legal work |
| components/home/HeroSlider.tsx | 5 local images, 4.5s autoplay, fixed Thai copy | hero/CMS/motion work |
| components/home/* | reference-like composition but hardcoded data | home loaders/view models |
| components/products/* + lib/captain-products.ts | client tabs, local product data, local detail language, fake cart CTA | product architecture |
| app/about, app/blog, app/faq, app/contact | hardcoded copy, placeholders and unsupported-looking claims | CMS/claims/state work |
| lib/cms/client.ts, adapter.ts, types/cms.ts | client/adapter/fallback/cache helpers exist but routes do not consume them | contract integration |
| cms-arigeo/src/payload/collections/* | actual schema and field names | schema reconciliation |
| cms-arigeo/ARCHITECTURE.md | shared backend, ISR, site scope, no custom ecommerce | boundaries |
| arigeo-project/Arigeo_Brief.md | separate corporate brand language | non-coupling |
| PHASE0_BASELINE_BUILD.log/build-direct.log | historical, different source snapshots; img warnings and a TypeScript failure | rerun current baseline |
| git status/log | dirty main branch and recent fixes | preserve worktree and use scoped commits later |

## 4. Current UX/UI Audit

Issue counts: Critical 3, High 8, Medium 12, Low 6.

| Area | Current problem | Evidence | User impact | Severity | Recommended direction | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- |
| Localization | locale page redirects to /; Header language is local state | middleware.ts, app/[locale]/page.tsx, Header.tsx | wrong URL/copy/metadata and non-shareable state | Critical | canonical locale routes, locale-aware links/metadata | /th and /en have correct copy/lang/canonical |
| CMS rendering | visible pages use local constants; CMS adapter disconnected | app/page.tsx, home components, lib/cms/* | editors cannot publish changes | Critical | server loaders and adapter view models | connected/unavailable states pass |
| Content contract | frontend types/docs disagree with Payload schema/status/access | types/cms.ts, CMS-ADAPTER-SETUP.md, Products.ts | empty cards/runtime failures | Critical | versioned contract and fixtures | fields/status/site asserted |
| Navigation | menu omits solution routes; children point to /blog; hover-only | Header.tsx, captain_maid.md | discovery fails; keyboard blocked | High | constrained CMS menu, click/focus/Escape | links resolve and aria/focus pass |
| Hero | fixed Thai copy, no per-slide content/pause/safe-area, mixed asset orientations | HeroSlider.tsx, public/images/hero-* | unreadable mobile/English hero | High | CMS hero model, responsive assets, pause | 375/768/1440 readable screenshots |
| Product filter | state only; URL only initial; Filter control dead | products/page.tsx, ProductsGrid.tsx | back/share/filter indexing fail | High | URL query as source of truth | refresh/back/share preserve filters |
| Product conversion | Add to Cart implies ecommerce but no cart exists | FeaturedProducts.tsx, ProductDetail.tsx, architecture | users expect unavailable checkout | High | external Where to buy from approved offers | approved URL works or unavailable state |
| Product detail | local language state, arbitrary related products, ungated claims | ProductDetail.tsx, captain-products.md | wrong language/claims/weak discovery | High | locale route, structured approved sections | locale/claims/related tests |
| Duplicate sources | legacy/current component and data trees coexist | components/*.tsx, home/*, lib/products.ts | edits may hit unused path | High | import audit and one active source | dependency report |
| Forms | no handler/validation/consent/status | contact/page.tsx, Footer.tsx, cms/client.ts | leads may be silently lost | High | Enquiries/form API plus status states | network/success/error/CMS-down proof |
| Accessibility | labels, menus, carousel and FAQ incomplete | Header, contact, faq, HeroSlider | keyboard/screen-reader failure | High | landmarks, labels, focus, live regions | axe/manual/screen-reader pass |
| Mobile menu | no dialog semantics/focus trap/scroll lock/restore | Header.tsx | drawer loses context | High | accessible MobileNavigation | mobile keyboard/Escape/back pass |
| Visual tokens | #003DA5 and #0079c1 conflict; arbitrary spacing/radius | tailwind.config.ts, globals.css | assembled/inconsistent theme | Medium | one semantic token layer | raw color audit |
| Typography | Poppins/Noto loaded but serif maps to sans; Thai wrapping untested | layout.tsx, tailwind.config.ts | hierarchy/overflow issues | Medium | bilingual specimen and rem type scale | 200% text pass |
| Layout rhythm | varied padding/radius/grid choices | home components | less calm/premium | Medium | container/section/card variants | visual diff |
| Images | mixed img/next/image, focal points/remote host unverified | Footer, products, next.config.js | LCP/CLS/crop risks | Medium | OptimizedImage and approved patterns | image/LCP/CLS audit |
| States | no route loading/error/not-found/CMS empty UI | app inventory, adapter | blank/crash on failures | Medium | loading/error/not-found/states | timeout/404/empty screenshots |
| Blog | hardcoded English duplicate and emoji/gradient placeholders | blog routes, lib/blog.ts | poor freshness/localization/SEO | Medium | CMS Posts and safe rich text | article in both locales |
| About | hardcoded timeline/emoji/unverified proof | about/page.tsx, BrandStory.tsx | trust risk | Medium | approved CMS story/proof blocks | editor update proof |
| Footer/legal | placeholder values/# links; legal points to FAQ | Footer.tsx, contact/page.tsx | support/legal inaccessible | Medium | SiteSettings and legal routes | every link valid |
| SEO | placeholder metadataBase/root canonical/no verified sitemap | layout.tsx, route metadata | duplicate/weak search | Medium | localized metadata/hreflang/schema | snapshots |
| Data format | adapter USD while UI THB | adapter.ts, types/cms.ts, ProductOffers.ts | wrong price/currency | Medium | offer currency-aware formatting | THB/mismatch test |
| Dark mode | enabled but incomplete and not in reference journey | tailwind.config.ts, ThemeProvider.tsx | accidental contrast/brand drift | Medium | light-only public launch | no accidental dark surface |
| Claims freshness | inconsistent product names and pending wording | captain_maid.md | wrong SKU/SEO/legal copy | Medium | editorial/claims approval gate | approved-only render |
| Motion | transition-all, zooms, hide-on-scroll, autoplay | globals.css, Header, home | noisy/inaccessible | Low | explicit properties and reduced-motion | motion audit |
| Header visibility | hides on scroll without stable reveal | Header.tsx | navigation feels unstable | Low | compact sticky or predictable reveal | scroll/focus test |
| Icons | Lucide, emoji and glyph icons mixed | components, about/contact | inconsistent visual language | Low | controlled icon set | icon inventory |
| Mixed copy | English UI/Thai body and spelling variants | Header, Footer, data, brief | inconsistent locale/SEO | Low | glossary and locale completeness | no unintended mixed UI |
| Build hygiene | logs/snapshots/lockfile uncertainty | git status, build logs | stale proof may be false | Low | current-HEAD baseline | fresh log |

## 5. Design Reference Analysis

### VERIFIED

- reference is a 748x2103 visual composite, not a formal token spec
- light header has mascot logo, compact nav, TH/EN, utility icons and blue Shop Now
- bright lifestyle hero has left text safe area, two CTAs, products/mascot and five dots
- pale-blue four-item trust strip
- rounded room/product cards, View All card, dark solution overlays
- white product cards with blue CTA and yellow stars
- navy trust/story/footer, family imagery, testimonials, articles and newsletter

### UNVERIFIED

Exact hex, font, timings, breakpoints, contrast, CMS fields, real cart/prices/reviews, approval of statistics/claims, and whether the mockup is final.

## 6. Three Design Directions

### A — Trusted Blue Homecare System (recommended)

Feeling clean, trustworthy and gentle but effective. Navy/blue anchor, pale-blue trust surface, warm off-white, yellow only for highlights. Bilingual sans, reference-led 12-column desktop, bright Thai-home lifestyle plus packshots, constrained rounded cards, short purposeful motion. Strongest trust/discovery/conversion/CMS maintainability and closest to reference. Risk: conservative and dependent on token/claims approval.

### B — Fresh Family Editorial

Warmer cream/sky/yellow palette, rounded bilingual type, larger story/testimonial blocks and family rituals. Strong reassurance and approachability. Risk: product comparison/discovery slows and brand may become too lifestyle-led. Compatible if navy/blue reference structure remains.

### C — Clean Science Performance

Navy/blue/white, modular product grid, specification rows, proof panels and precise motion. Strongest product comparison and evidence. Risk: too clinical for household warmth. Use only as product-detail sub-pattern.

## 7. Recommended Direction

เลือก A เพราะรักษา visible brand equity, ตรง reference, รองรับ TH/EN, ใช้ constrained CMS blocks และสร้าง discovery → product detail → external buy โดยไม่ทำให้ผู้ใช้เข้าใจผิดว่าเป็น ecommerce. ยืม C สำหรับ product proof และ B สำหรับ story imagery. เกณฑ์คือ trust, discovery, conversion, maintainability, accessibility, responsive behavior และ site separation ไม่ใช่ความสวยอย่างเดียว

## 8. Captain Maid Design System

ค่าที่ final ต้องอนุมัติ; code ปัจจุบันยืนยันเพียง blue-led identity, navy footer/overlay, pale-blue surface และ yellow accent

### Proposed tokens

| Token | Value | Usage |
| --- | --- | --- |
| --cm-brand-navy | #002D5F | heading/footer/overlay |
| --cm-brand-blue | #0079C1 | CTA/link/active |
| --cm-brand-blue-strong | #003DA5 | optional legacy alignment; select one primary |
| --cm-surface-blue | #E6F3FA | trust/soft cards |
| --cm-surface-warm | #FAF8F4 | page background |
| --cm-accent-yellow | #FFB81C | stars/small highlight |
| --cm-text-primary | #152238 | text |
| --cm-text-muted | #5F6B7A | secondary text |
| --cm-success | #2D7A3E | verified/success |
| --cm-error | #B42318 | error |

Test all semantic pairs for WCAG AA; yellow is never body text on white.

### Type/layout

Candidate existing pair is Poppins + Noto Sans Thai pending specimen/licensing. Proposed display clamp(2.25rem,5vw,4.75rem), headings 1.5–3rem, body 1–1.125rem, line-height 1.05–1.8, rem units and no fixed-height Thai headings. Container 1200–1280px; spacing 4/8/12/16/24/32/48/64/96/128px; 4-column mobile, 8 tablet, 12 desktop; breakpoints <640, 640–1023, >=1024, >=1280. Radius 12px base, 20px feature, pill only for pills. Ratios hero 16:9 desktop/4:5 mobile, category 4:3, product 1:1, article 4:3.

### States/components

Button primary/outline/quiet with hover, pressed scale ~.97, focus, disabled and pending. ProductCard has image, category, localized name, size, approved benefit and optional Where to buy. FormControl has associated label, descriptions/errors and 44px target. Badges are category/verified/5 FREE only when approved. Loading/Empty/Error reserve layout, explain issue and provide retry/next action.

### Dark-mode decision

Light-only public launch is recommended: reference is light, existing dark mode is incomplete, and dark increases image/contrast QA. Keep semantic capability but no public toggle without a confirmed requirement.

## 9. Information Architecture

Home; Products with six categories and View All; Solutions by room/problem; About Us; Cleaning Tips/Blog; Support with FAQ/Contact; TH/EN; Where to buy when offer exists. Search/account/cart must not appear as active features until behavior is verified.

## 10. Route-by-Route Plan

| Route | Purpose/content | CMS/fixed | Acceptance |
| --- | --- | --- | --- |
| / | legacy entry | frontend locale detection | canonical /th or /en, no loop |
| /[locale] | homepage: hero, trust, categories, solutions, products, story, articles, newsletter | CMS blocks; layout/tokens fixed | TH/EN, responsive, schema, states |
| /[locale]/products | listing, URL filters, count, grid, empty | Products/Categories/Solutions CMS | shareable filter, ItemList |
| /[locale]/products/[slug] | image/info, usage, benefits, suitable, safety, offers, related | Product/ProductOffers/Media CMS | locale, Product schema, 404 |
| /[locale]/categories/[category-slug] | category intro and products | ProductCategories | canonical, empty |
| /[locale]/solutions | room/problem hub | Solutions CMS | keyboard filter |
| /[locale]/solutions/room/[room-slug] | room education and products | Solutions + Products | Breadcrumb, claims gate |
| /[locale]/solutions/problem/[problem-slug] | problem education and products | Solutions + Products | general advice disclosure |
| /[locale]/about | approved story/proof/values | Pages/blocks/SiteSettings | Organization schema |
| /[locale]/blog | featured/categories/cards | Posts CMS | Article/CollectionPage |
| /[locale]/blog/[article-slug] | rich article/related products | Posts/Media/Products | Article schema, 404 |
| /[locale]/faq | topic FAQ/accordion/contact CTA | Faqs CMS | accessible disclosure, valid FAQ schema |
| /[locale]/contact | methods, consent form, response state | Enquiries/SiteSettings | validation, success/error |
| /[locale]/privacy, /terms | localized legal | Pages/legal owner | valid links |
| CMS preview | signed draft preview | preview secret/draft | private, exit path |

## 11. Component-by-Component Plan

- app/layout.tsx: locale-aware shell, html lang, metadataBase from approved env, fonts and light policy
- app/[locale]/page.tsx: real localized homepage instead of redirect
- Header.tsx: thin orchestrator for DesktopNavigation, MobileNavigation and LanguageSwitcher; remove fake actions
- Footer.tsx: FooterColumns, NewsletterForm and SocialLinks from SiteSettings
- globals.css/tailwind.config.ts: one semantic token layer, focus, motion and container utilities
- HeroSlider.tsx becomes HeroCarousel with locale content, responsive image, safe area, pause/play, dots and reduced motion
- home components become one data-driven path; no duplicate category map
- new ProductCard.tsx is shared by homepage/listing/related; ProductFilters uses URL params; WhereToBuyButtons handles external offers
- ProductDetail.tsx renders structured approved sections and deterministic related IDs
- new RichTextRenderer.tsx safely renders Payload rich text
- new UI primitives: Button, LinkButton, Badge, SectionHeading, IconButton
- new states: Skeleton, EmptyState, ErrorState, CmsFallbackNotice, NotFoundState
- new forms: ContactForm, NewsletterForm, FieldError, FormStatus
- new lib/locale/routes.ts, lib/content/loaders.ts, fallbacks.ts, claims.ts, lib/seo/metadata.ts
- lib/cms/client.ts reconciles query/auth/status/site/locale; adapter.ts maps actual Payload fields, removes critical any and formats THB offers; types/cms.ts aligns with actual schema

## 12. Responsive Strategy

Mobile-first. Use portrait hero assets on mobile; per-slide safe areas; accessible drawer with focus trap/body lock/Escape/back/focus restore; cards 1 mobile, 2 tablet, 3–4 desktop; no hover-only CTA; product detail image then info; filters become labeled drawer/scroll row; active filters remain in URL. Test widths 320, 375, 414, 768, 1024 and 1440, both languages, 200% zoom and large text. No clipping or horizontal scroll.

## 13. Accessibility Strategy

Semantic header/nav/main/footer and one meaningful h1. Every icon button has a name and visible focus. Menus use disclosure, aria-expanded/controls, Escape and focus return. Carousel has role description, slide labels, pause control and reduced-motion equivalent. Forms have associated labels, aria-invalid/describedby, inline errors and live result. FAQ is native details/summary or fully accessible accordion. Targets are at least 44px; contrast/focus meet WCAG 2.2 AA. CMS alt is localized; decorative images use empty alt. Support reduced-motion, reduced-transparency and more-contrast preferences.

## 14. Motion Strategy

Animate only for spatial consistency, state, explanation or feedback. Press 100–160ms, dropdown 150–250ms, drawer 200–400ms, UI generally under 300ms. Use transform/opacity/color, never transition-all; origin-aware popovers; hero cross-fade and pause; no autoplay under reduced motion; hover zoom only on hover-capable devices; no looping decorative motion or task-blocking animation.

## 15. CMS Responsibility Matrix

| Responsibility | Captain Maid frontend | Shared CMS | Arigeo frontend |
| --- | --- | --- | --- |
| Brand tokens | owns Captain Maid tokens/components | no arbitrary classes/tokens | owns Arigeo tokens |
| Page structure | constrained block registry/rendering | stores approved block data/order | own rendering |
| Copy | renders locale/fallback | editable TH/EN published copy site=captain-maid | permitted projection |
| Product data | discovery/detail/presentation/external CTA | canonical products/categories/offers/media | summary projection |
| Images/media | aspect/crop/focal/alt rendering | upload/rights/alt/storage/publish | separate presentation |
| Navigation | behavior/validation/accessibility | localized site/menu items | separate behavior |
| SEO | URL/canonical/schema | localized SEO/OG source | separate rendering |
| Locale content | route/lang/hreflang/fallback | localized fields/default | own routing |
| Component rendering | exclusive Captain Maid | never arbitrary code | exclusive Arigeo |
| Publishing | preview/cache/revalidation/fallback | editors/publishers/revisions | own preview/cache |

Rules: every query includes site=captain-maid; relationships are checked for leakage; editors cannot change classes/tokens; claims require approved state; failure order is ISR cache → verified fixture → honest unavailable state.

## 16. SEO and Performance Plan

SEO: localized canonical/hreflang; metadata from CMS with validated fallback; remove Vercel placeholder metadataBase; Product schema only for verified data; Article/Breadcrumb/FAQ/Organization schema only when rendered; sitemap.ts for published locale routes; robots.ts blocks preview/private paths; decide id versus slug canonical strategy.

Performance: next/image with sizes/dimensions/blur, priority only for LCP hero, approved CMS remote patterns, preload first slide only, lazy-load remaining media, server components for data, client components only for carousel/filters/drawer/forms, measure LCP/CLS/INP and mobile JS.

## 17. Ordered Implementation Roadmap

### WP1 — Repository and baseline verification

Objective: tie evidence to current HEAD and package manager. Files: none in production. Dependencies: none; CMS none; risk High. Record status/commit, inspect lockfiles, run current typecheck/lint/build with installed deps only, map routes/screenshots, never clean/reset. Proof: current-commit log and desktop/mobile route baseline. Acceptance: no user change overwritten. Rollback: no source mutation.

### WP2 — Design-token foundation

Files: app/globals.css, tailwind.config.ts, app/layout.tsx; optional styles/tokens.css. Dependencies: Direction A/token approval. CMS: none. Risk Medium. Resolve blue conflict; add semantic states/focus/reduced motion/light aliases; remove raw literals incrementally. Proof: contrast matrix/type specimen/token search. Acceptance: one token layer and no critical contrast failure. Rollback: aliases for old utilities.

### WP3 — Global layout and typography

Files: app/layout.tsx, middleware.ts, next.config.js, globals.css. New: app/[locale]/layout.tsx, lib/locale/config.ts, lib/seo/metadata.ts. Dependencies: WP2; CMS SiteSettings/SEO. Risk High. Establish canonical locale, locale-aware links, root aliases, html lang and hreflang. Proof: route/metadata snapshots at /th and /en. Acceptance: no loop, correct copy/lang/canonical. Rollback: compatibility entry.

### WP4 — Header/navigation/mobile

Files: Header.tsx, LanguageToggle.tsx, Footer.tsx. New: components/navigation/*. Dependencies: WP3/CMS Navigation. CMS impact: Navigation. Risk High. Build constrained menu, click/focus/Escape disclosure, route-aware switcher, remove fake actions, fix footer/legal. Proof: keyboard/focus/external-link audit and open-drawer screenshots. Acceptance: every action resolves/accessibly exposes state. Rollback: old wrapper retained until verified.

### WP5 — Homepage/hero

Files: app/page.tsx, components/home/*. New: HeroCarousel, TrustStrip, CategoryGrid, SolutionGrid, lib/content/home.ts. Dependencies: WP2–4 and Pages/Banners/blocks. CMS impact: high. Risk High. Use server view model, responsive assets, safe areas, reference order and states. Proof: connected/fallback, keyboard/reduced motion, TH/EN screenshots. Acceptance: readable hero, valid CTA, no shift. Rollback: static fixture loader.

### WP6 — Product system

Files: products routes, ProductsGrid.tsx, ProductDetail.tsx, local fallback data. New: localized products routes, ProductCard, ProductFilters, WhereToBuyButtons, lib/content/products.ts. Dependencies: WP3 and CMS contract. CMS: Products/Categories/Solutions/ProductOffers/Media. Risk High. Choose slug strategy, map actual fields, URL filters, approved sections, external offers, deterministic related IDs. Proof: fixture/locale/404/empty/offer/schema and screenshots. Acceptance: no fake checkout; price/claim traceable. Rollback: legacy aliases/fixtures.

### WP7 — Supporting pages

Files: about/blog/faq/contact routes and current content components. New: locale templates, RichTextRenderer, ContactForm, FaqAccordion, privacy/terms. Dependencies: WP3 and Posts/Faqs/Pages/Enquiries. Risk High. Remove placeholders, localize, render safe rich text, add form states and gated schema. Proof: article/FAQ/form/legal screenshots. Acceptance: no dead form or placeholder contact. Rollback: explicit fixtures.

### WP8 — CMS contract/fallback

Files: lib/cms/client.ts, adapter.ts, types/cms.ts, next.config.js. New: contracts.ts, fixtures.ts, loaders.ts, tests. Dependencies: actual Payload confirmation. CMS: contract only; no CMS schema mutation. Risk Critical. Reconcile access/query/status/contentStatus, remove critical any, map offers/currency/media/cache, assert site isolation. Proof: timeout/5xx/empty/missing-image/preview tests. Acceptance: honest stable fallback and no leakage. Rollback: static mode.

### WP9 — Responsive refinement

Files: approved route/component CSS/TSX. Dependencies: WP4–8; CMS none; risk Medium. Run width/text/image/focus/overflow matrix, 200% zoom and large text. Proof: 375/768/1024/1440 screenshots. Acceptance: no clipping/horizontal scroll. Rollback: component CSS revert.

### WP10 — Accessibility refinement

Files: header, hero, filters, forms, FAQ, globals. Dependencies: WP4–9; risk High. Run keyboard, landmarks, labels, focus, live regions, contrast and reduced motion. Proof: axe/pa11y equivalent, keyboard, screen-reader checklist. Acceptance: no critical finding and pointer-free core task. Rollback: additive semantic changes.

### WP11 — Motion refinement

Files: globals.css, header/menu/carousel/card components, Tailwind config. Dependencies: WP10; risk Medium. Replace transition-all, set curves/durations, pause carousel, test interruption. Proof: normal/reduced-motion recording/property audit. Acceptance: motion never blocks task. Rollback: disable motion layer.

### WP12 — SEO/performance

Files: layout, metadata, next.config.js, image components, sitemap.ts, robots.ts. Dependencies: WP3, WP5–8; risk High. Localized schema, LCP image, approved remote domain, sitemap/robots, remove placeholder host. Proof: Lighthouse/trace/metadata/schema/image audit. Acceptance: budgets agreed and evidence fresh. Rollback: independent metadata/image revert.

### WP13 — Regression testing

Files: test config/tests. New: tests/routes, tests/components, tests/cms and chosen browser config. Dependencies: WP1–12; risk Medium. Verify install, type, lint, unit, build, route smoke, visual, a11y and performance. Acceptance: green or approved exceptions; no production mutation.

### WP14 — Visual QA/deployment readiness

Files: none unless QA defects; deployment only after approval. Dependencies: all WPs and content/legal approval. Proof: reference comparison, final screenshots, site-scope smoke, git diff. Acceptance: DoD complete and explicit deploy approval. Rollback: last-known-good release and CMS flag/cache restore.

## 18. File-Level Change Map

Existing likely changes: app/layout.tsx, app/page.tsx, app/[locale]/page.tsx, app/globals.css, middleware.ts, next.config.js, tailwind.config.ts, Header.tsx, Footer.tsx, LanguageToggle.tsx, components/home/*.tsx, components/products/*.tsx, current about/blog/faq/contact routes, lib/cms/client.ts, lib/cms/adapter.ts, types/cms.ts, and local data only after import audit.

New likely files: app/[locale]/layout.tsx, localized products/solutions/legal routes, sitemap.ts, robots.ts, components/navigation/*, components/ui/*, components/states/*, components/forms/*, RichTextRenderer.tsx, lib/content/*, lib/locale/*, lib/seo/*, tests/*.

Do not modify arigeo-project visual components/assets, cms-arigeo schema/config during frontend-only work, unrelated governance files, or user artifacts.

## 19. Testing and Proof Matrix

| Proof | Required evidence |
| --- | --- |
| Clean dependency verification | approved package manager/lockfile log tied to commit |
| Type/lint/unit/build | zero errors; fresh current-HEAD logs |
| Route smoke | all implemented and approved launch routes with status/heading/CTA |
| Screenshots | 1440 desktop, 768/1024 tablet, 375/414 mobile; core routes and reference comparison |
| Thai/English | no clipping or unintended mixed UI |
| Keyboard/screen reader | nav, carousel, filters, product CTA, FAQ, form; landmarks/headings/names/live state |
| WCAG | automated plus sampled AA contrast/focus report |
| Reduced motion | no autoplay/moving UI that blocks understanding |
| Broken image | fallback state with no layout collapse |
| CMS connected | TH/EN published site-scoped fixture/staging data |
| CMS unavailable | timeout/5xx/empty cache/fallback/error proof |
| Preview | signed private draft and exit proof |
| Performance | Lighthouse/equivalent LCP/CLS/INP evidence |
| Arigeo isolation | query scope and Arigeo smoke route show no leakage |

## 20. Risks, Dependencies and Rollback

| Risk | Mitigation | Rollback |
| --- | --- | --- |
| CMS docs/schema mismatch | contract workshop and fixtures first | static fixture loader |
| CMS auth/CORS unclear | verify staging/token before enable | disable CMS loader |
| Dirty worktree | baseline status; no reset/clean | revert only implementation commit |
| Locale migration | redirect matrix and smoke tests | restore aliases |
| Claims/regulatory | owner approval and claims gate | hide unapproved block |
| External offers | validate channel/URL/unavailable state | remove CTA |
| Duplicate sources | import graph and one-source decision | leave old source |
| Image host | confirm domain/CORS and fallback | local approved media |
| No tests | add contract/route/a11y/visual gates | revert test-only changes |
| Shared CMS/Arigeo | frontend-only contract first | no schema mutation |
| Historical logs | current HEAD only | ignore stale proof |

## 21. Definition of Done

- Direction A/tokens approved; all claims/prices/contacts/legal/statistics approved
- TH/EN canonical routes render with correct URL, html lang, metadata and fallback
- homepage matches approved reference intent at desktop/tablet/mobile without Arigeo identity
- header, mobile menu, carousel, filters, cards, forms and FAQ are keyboard/screen-reader usable
- no fake cart/account/search; approved external buy CTA works or shows unavailable
- product/blog/about/FAQ/contact are CMS-editable within constrained fields
- site filtering, preview/publish/revalidation and CMS failure states proven
- typecheck, lint, unit, build, route smoke, screenshots, accessibility, motion and performance evidence complete
- git diff contains only approved Captain Maid work; Arigeo/shared infrastructure unchanged unless separately approved
- rollback release or last-known-good deployment is available

## 22. Open Questions and Unverified Items

1. UNVERIFIED: official blue token, #003DA5 versus #0079c1
2. UNVERIFIED: official spelling Captain Maid/Captainmaid
3. UNVERIFIED: reference image final approval status
4. UNVERIFIED: final product names/scents/SKU sizes; Floral Passion versus Floral Passionate
5. UNVERIFIED: Product/Regulatory/Legal approval for all safety/efficacy/ingredient/5 FREE/child/pet claims
6. UNVERIFIED: CMS public read/auth/CORS contract
7. UNVERIFIED: status contract draft/published versus contentStatus values
8. UNVERIFIED: generated Payload types and localized rich-text/upload response shape
9. UNVERIFIED: live ProductOffers channels/URLs
10. UNVERIFIED: real versus placeholder prices/reviews/stats
11. UNVERIFIED: scope of search/account/cart/newsletter/analytics
12. UNVERIFIED: production domains, metadataBase, OG image and sitemap host
13. UNVERIFIED: authoritative lockfile/package manager
14. UNVERIFIED: first-launch scope for categories/solutions/privacy/terms
15. UNVERIFIED: content owner/translation/claims/asset approval SLA
16. UNVERIFIED: analytics event names and consent

## สรุปสถานะการวางแผน

- Plan file path: /mnt/d/01 Main Work/Boots/Agentic AI/mission-control/captain-maid/CAPTAIN_MAID_THEME_UX_UI_PLAN.md
- Number of files inspected: 309 files inventoried across Captain Maid, cms-arigeo and arigeo-project; 40 Captain Maid app/component/lib/type files plus mandatory documents and relevant CMS/Arigeo evidence read in detail
- Routes identified: 10 implemented route files (/ , /[locale], /about, /blog, /blog/[slug], /contact, /faq, /products, /products/[id]) plus planned categories, solutions, legal and CMS preview routes
- Critical/High/Medium/Low issue counts: 3 / 8 / 12 / 6
- Recommended design direction: Direction A — Trusted Blue Homecare System
- Main architectural risks: CMS schema/access mismatch, locale migration, dirty worktree, unsupported claims, duplicate sources, external buy-channel contract, site-boundary leakage
- Confirmation that no source code was modified: Yes; only this plan file was created
- Git status before and after planning: before main...origin/main with pre-existing modified/untracked files; after same pre-existing status plus this plan file

