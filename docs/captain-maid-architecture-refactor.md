# Captain Maid 2.0 — Frontend Architecture, Rendering, Data and Performance Blueprint

## Background & Motivation
The Captain Maid 2.0 Next.js application is currently in a transitional state. While the visual output is excellent, the underlying architecture contains several risks that impact long-term maintainability, data integrity, and performance:

1. **Data Integrity Risk (Dual Data Sources):** The existence of both `lib/products.ts` and `data/products.ts` creates a high risk of desync between listing pages and detail pages. A Canonical Data Model is required.
2. **Monolithic Component Architecture:** `CaptainMaidLandingPage.tsx` acts as a monolithic Client Component. While Next.js still SSRs this, the approach increases the JavaScript bundle, hydration overhead, and prevents the use of Server-only data fetching and caching for mostly static content.
3. **i18n Fragmentation:** The `next-intl` setup is bypassed by hardcoded `COPY` objects, hindering systematic translations and SEO metadata management.
4. **Post-hydration Image Swap & Art Direction:** The carousel relies on `useEffect` and `window.innerWidth` to swap images. This is an Art Direction problem (different crops for different devices), not just resolution switching. The current JS approach causes inefficient loading, delays LCP, and can cause visual flashes.

## Core Architectural Philosophy
> **"Single Source of Truth for Products, Unified i18n System, Section-Based Server Architecture, and Interactive Leaf Client Components."**

---

## Execution Roadmap & Safety Gates

### Phase 0: Baseline, Inventory and Safety Gate
**Objective:** Establish a ground truth before any code modification to prevent regressions.
- **Tasks:**
  - Capture visual screenshots across all 3 breakpoints (Mobile: 390×844, Tablet: 1024×1366, Desktop: 1440×900 and 1920×1080) in Chrome and Safari.
  - Record Lighthouse lab metrics: LCP, CLS, TBT (Total Blocking Time), Speed Index, and First Contentful Paint. Separately capture field data (INP) from PageSpeed Insights or Chrome UX Report if available; new sites may not have INP data yet.
  - Capture JS Bundle size via `@next/bundle-analyzer` and identify top contributors.
  - Create a route and metadata inventory (Titles, Descriptions, current SEO tags, structured data).
  - Verify no broken links and audit all external redirects/marketplace buttons.
  - **Functional baseline**: Document carousel autoplay, language switching, product linking, contact form, mobile menu, analytics events, and form submission behavior.
- **Exit Gate:** Complete documentation of current production behavior and metrics (visual, performance, functional, and SEO). Backup/Branch is secured. Functional tests capture baseline behavior.

### Phase 1: Canonical Data Model
**Objective:** Eliminate data redundancy and prevent data drift.
- **Tasks:**
  - Design a unified `Product` canonical schema (supporting locales, SKUs, variants, SEO fields) with schema validation (e.g., Zod):
    ```ts
    const ProductSchema = z.object({
      id: z.string().min(1),
      slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
      sku: z.string().optional(),
      name: LocalizedTextSchema,
      description: LocalizedTextSchema,
      price: z.number().positive(),
      images: z.array(ProductImageSchema).min(1),
      status: z.enum(["draft", "active", "archived"]),
    });
    ```
  - Map and merge data from `lib/products.ts` and `data/products.ts` into the new schema.
  - Create migration adapters if necessary and update both Catalog and PDP components to consume the single source.
  - Prepare the schema structure to seamlessly migrate to Supabase in the future.
- **Exit Gate:** Product count, slugs, imagery, and details match exactly across all routes without regressions. All canonical product records pass schema validation; duplicate IDs, SKUs, and slugs are rejected at build and runtime.

### Phase 2: i18n & Metadata
**Objective:** Centralize language strings and SEO with structured data support.
- **Tasks:**
  - Extract `COPY` from the monolith into standard `locales/en.json` and `th.json` under namespaces (`home`, `products`, `metadata`, etc.).
  - Implement dynamic localized metadata generation via `getTranslations` across all routes.
  - Implement `canonical` and `hreflang` tags for multi-language routes.
  - Add structured data (JSON-LD): Organization schema, Product schema, BreadcrumbList, WebSite schema, and FAQPage (where content matches Search Engine guidelines).
  - Include Open Graph and Twitter Card meta tags for social sharing.
  - Generate locale-aware XML sitemap with `lastmod` and `changefreq`.
- **Exit Gate:** No missing translation keys in TH/EN. Metadata is perfectly localized and accurate for every route. Structured data validates against schema.org. Sitemap includes all indexable routes with correct locale variants.

### Phase 3: Rendering Boundary Refactor
**Objective:** Maximize Server Components and minimize Client JS.
- **Tasks:**
  - Convert `app/[locale]/page.tsx` and its sections (`HomePage.tsx`, `HeroSection`, `TrustSection`, etc.) to Server Components.
  - Extract purely interactive elements (Carousel controls, Mobile Menu, Filters) into isolated Client Leaf Components.
  - Retain the old monolithic `CaptainMaidLandingPage.tsx` as a temporary reference until visual, functional, localization, and analytics parity checks pass; archive only after new architecture is promoted successfully.
- **Exit Gate:** No material visual regressions are detected across agreed reference breakpoints (Mobile, Tablet, Desktop) and browsers (Chrome, Safari). Functional baseline behavior verified (carousel, navigation, language switching, links, forms). Client JS bundle size is measurably reduced compared to Phase 0 baseline.

### Phase 4: Image & Core Web Vitals
**Objective:** Optimize loading efficiency and fix Art Direction.
- **Tasks:**
  - Refactor responsive carousel images using `<picture>` tags for true Art Direction (not CSS `display: none`), removing the `useEffect` window-width listener. Ensure browser loads only the source matching the media query; use intrinsic dimensions or aspect-ratio CSS to prevent layout shifts.
  - Apply `priority` ONLY to the first (LCP) slide with deterministic source. Set others to `loading="lazy"`.
  - Audit all `<img>` tags; upgrade content/heavy images to `next/image` with:
    - Proper `width`/`height` OR `fill` with `sizes` attribute
    - Accurate `sizes` value based on rendered layout (e.g., `sizes="(max-width: 768px) 100vw, 1200px"` for container-constrained images; use `100vw` only when image genuinely spans viewport)
    - Leave small icons/SVGs as `<img>` where optimization overhead isn't justified
  - Add `decoding="async"` to non-critical images to prevent paint blocking.
- **Exit Gate:** Lab metrics (LCP, CLS, TBT) must be measurably better than Phase 0 baseline. Specifically: LCP < 2.5s on mobile lab profile, CLS < 0.1, no layout shifts from image loading or carousel transitions. Carousel image loading verified to match media queries (DevTools Network tab proof).

### Phase 5: Accessibility & CRO
**Objective:** Improve conformance toward WCAG 2.2 AA through automated and manual testing, and optimize user conversion.
- **Tasks:**
  - **Carousel accessibility:**
    - Provide Pause/Play button if slides auto-advance; pause on hover/focus.
    - Announce current slide via `aria-live="polite"` (e.g., "Slide 2 of 5").
    - Do not change context suddenly while user is reading; wait for explicit navigation.
    - Support swipe without breaking vertical scrolling; tablet users should not accidentally scroll left/right.
    - Tab order should skip hidden slides (use `aria-hidden="true"` or manage `tabindex="-1"` for off-screen items).
    - Ensure directional buttons are clearly labeled and keyboard accessible (arrow keys or Tab+Enter).
  - Add proper `aria-label` to all interactive controls (carousel buttons, menu toggles, language switcher).
  - Ensure full keyboard navigation support: Tab traversal, Enter/Space for activation, Escape for close, arrow keys for carousel/menus. Verify focus states are visible and have sufficient contrast.
  - Add support for `prefers-reduced-motion: reduce` by pausing animations and transitions for users who opt in.
  - Verify touch targets are at least 44×44px (WCAG 2.5.5 pointer target size).
  - Audit heading hierarchy (H1 → H2 → H3); ensure no skipped levels.
  - Check color contrast (4.5:1 for text, 3:1 for UI components); test with `prefers-color-scheme: dark`.
- **Exit Gate:** Zero critical automated violations (Axe, Lighthouse). Manual verification completed for keyboard navigation, focus order, screen-reader labels (using NVDA or JAWS), motion tolerance, carousel behavior, and color contrast across light and dark themes. Lighthouse accessibility score ≥ 90.

### Phase 6: CMS / Admin Readiness (Future-Proofing)
**Objective:** Prepare the codebase and architecture for safe Supabase backend integration with admin/editor workflows.
- **Tasks:**
  - Structure the Canonical Data Model to map 1:1 with planned Supabase DB schemas, including draft/published state.
  - Design Row-Level Security (RLS) policies: admin (full CRUD), editor (create/edit drafts, request publish), viewer (read published only).
  - Plan audit trail: log who changed what and when; ensure data immutability for published versions.
  - Define image ownership and deletion policy: orphaned images (not referenced by any product) should be cleaned up after 30 days.
  - Choose upload method: server-mediated (Supabase Signed URLs) or direct client upload (Vercel Blob, with bucket policies).
  - Plan cache tags and on-demand revalidation: when product is updated, invalidate product card, detail page, and listing cache.
  - Define graceful fallback: if Supabase or Blob storage is down, serve stale data or maintenance page (do not show raw errors).
  - Plan migration and seed strategy: backfill products from flat files → Supabase, including locale-specific alt text and metadata.
  - Ensure draft/published separation prevents accidental publication: admins must explicitly publish, unpublish should archive rather than delete.
  - Outline revision history (optional but recommended): store past versions for rollback or audit.
---

## Key Performance Indicators & Success Metrics

All targets below are **baseline-relative**, meaning they are measured against Phase 0 baseline and apply to the production homepage once all phases are complete.

### Performance Targets
- **Lighthouse LCP**: < 2.5 seconds on mobile (lab, throttled 4G)
- **Lighthouse CLS**: < 0.1 (no layout shifts from image loading, carousel, or ads)
- **Lighthouse TBT**: Minimize Total Blocking Time; improvement over Phase 0 baseline
- **Client-side JS**: Must not increase over Phase 0; ideally 20–30% reduction via Server Components + code splitting
- **Bundle size**: No growth in main app bundle; lazy-loaded sections use dynamic imports

### Data & SEO Targets
- **Product data consistency**: 100% match of product count, slugs, and details across routes (Catalog = PDP = Structured Data)
- **Translation completeness**: 0 missing keys in locales/th.json or locales/en.json
- **Structured data validation**: 0 validation errors for Organization, Product, and BreadcrumbList schemas
- **Broken links**: 0 internal broken links, 0 broken external marketplace links

### Accessibility Targets
- **Automated violations**: Zero critical or serious (Axe, Lighthouse)
- **Lighthouse accessibility score**: ≥ 90
- **Keyboard navigability**: All interactive elements reachable and usable via Tab + Enter/Space
- **Focus visibility**: All focusable elements have visible focus indicators (minimum 3:1 contrast)

### Functional Targets
- **Carousel**: Auto-play works, pause/play button functional, arrow keys navigate, hidden slides are not tabbable
- **Language switching**: URL updates, all content switches, selected language persists (cookie/session)
- **Mobile menu**: Opens/closes, no scroll lock issues, focus management works
- **Form submissions**: Validation shows errors, successful submit shows confirmation

### Deployment Targets
- **Test coverage**: E2E tests for critical flows pass on both desktop and mobile viewports
- **Visual regression**: Zero unexpected visual changes across approved breakpoints
- **Preview validation**: Approver manually verifies preview before production promotion
- **Production monitoring**: Alerts configured for LCP > 3s, CLS > 0.25, error rate > 1%, zero traffic

---

## Proof Artifacts for Each Phase

Each phase's Exit Gate should be accompanied by proof artifacts:

| Phase | Proof Artifact |
|-------|---|
| 0 | Screenshots (3 breakpoints × 2 browsers), Lighthouse report PDF, bundle analysis HTML, route/metadata spreadsheet, broken link report |
| 1 | JSON schema file, validation test results, product count/slug/detail comparison table (before & after) |
| 2 | Locale files with no missing keys (validation output), metadata tags in HTML source (3 sample routes × 2 locales), structured data validation report |
| 3 | Visual regression snapshots (approved), git diff showing removed JS imports, client bundle size comparison (Phase 0 vs Phase 3) |
| 4 | Lighthouse report (Phase 4 vs Phase 0), DevTools Network waterfall (showing <picture> source matching), image load verification (only selected source loads) |
| 5 | Axe scan report (0 violations), keyboard navigation video/checklist, color contrast report, Lighthouse accessibility score screenshot |
| 6 | DB schema diagram, RLS policy code review, image upload flow diagram, fallback error page mockup, migration plan document |
| 7 | E2E test report (pass/fail), visual regression approval notes, TypeScript/ESLint run output, production monitoring dashboard screenshot, rollback procedure checklist |

### Phase 7: Testing, Deployment and Observability
**Objective:** Ensure changes can be released safely, monitored in production, and rolled back if needed.
- **Tasks:**
  - Add Playwright E2E test coverage for critical user flows:
    - Carousel navigation and autoplay (play/pause, swipe on mobile, keyboard arrow keys)
    - Language switching (verify content updates, URL changes, cookies persist)
    - Product browsing (list → detail, related products, breadcrumbs)
    - Mobile menu on small viewports
    - Contact form submission and error states
    - External marketplace button links (do not test external site, but verify click navigates correctly)
  - Add visual regression snapshots (Percy or similar) for agreed breakpoints:
    - Mobile (390×844), Tablet (1024×1366), Desktop (1440×900)
    - Light and dark themes
    - Critical pages: homepage, product list, product detail, 404
  - Run production builds with:
    - Zero TypeScript errors (`tsc --noEmit`)
    - Zero ESLint errors (`eslint . --max-warnings 0`)
    - Bundle analysis (flag if JS/CSS grows beyond Phase 0 baseline)
    - Broken link check (internal and external resources)
  - Validate preview deployments (Vercel preview URL) before promoting to production:
    - Manual smoke test on preview
    - E2E tests pass on preview
    - Visual regression snapshots reviewed and approved
  - Define rollback procedures:
    - Vercel allows one-click rollback to previous deployment
    - Document decision criteria (e.g., critical bug, Core Web Vitals regression >10%)
    - Keep last 3 successful deployments available for quick rollback
  - Set up production monitoring:
    - Real User Monitoring (RUM): track Core Web Vitals (LCP, CLS, INP) via Vercel Analytics or similar
    - Error tracking: capture JavaScript errors and 5xx server responses
    - Broken routes: monitor 404s and redirect chains
    - Failed assets: flag missing images, stylesheets, scripts
    - Custom events: track language switches, carousel interactions, form submissions
- **Exit Gate:** All automated checks pass (TypeScript, ESLint, E2E, visual regression). Preview deployment approved. Rollback procedures verified. Production monitoring dashboards live and configured with alerts for critical issues (zero traffic, Core Web Vitals >baseline, error rate >1%). First production deployment released with monitoring active.