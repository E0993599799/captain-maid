# SKILL: Frontend Performance

## Mission
Ensure every page and component is fast, responsive, and visually stable to provide a production-ready user experience that meets or exceeds Core Web Vitals targets.

## Scope
This skill must be applied to every page/component change, especially landing pages, dashboards, forms, and media-heavy pages, before the work is considered complete.

## Source References Studied
- web.dev Core Web Vitals (LCP, INP, CLS)
- web.dev Performance Optimization Guides
- Google Lighthouse Documentation
- Next.js Performance & Optimization Docs (App Router)
- Vercel Performance & Speed Insights Docs

## Core Principles
- **Perception is reality:** A site that *feels* fast is fast. Prioritize user-perceived performance (LCP, INP) over raw numbers.
- **Don't block the paint:** The user must see meaningful content as quickly as possible. Anything that delays the initial render is a high-priority problem.
- **Stability is mandatory:** The layout must not shift after it becomes visible. Cumulative Layout Shift (CLS) is a critical quality issue.
- **Mobile first, for real:** Performance bottlenecks are most severe on mobile devices with slower networks and CPUs. All performance testing and optimization must be done from a mobile-first perspective.

## Implementation Rules (Next.js + Tailwind)

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** Target **< 2.5 seconds**. The element identified as the LCP must be prioritized above all others.
- **INP (Interaction to Next Paint):** Target **< 200 milliseconds**. All interactions (clicks, taps, typing) must feel instantaneous.
- **CLS (Cumulative Layout Shift):** Target **< 0.1**. The layout must be stable.

### Image Rules
1.  **Use `next/image`:** Use the `<Image>` component for all static or remote images. Do not use the native `<img>` tag unless there is a specific, documented reason.
2.  **Declare Size:** Always provide explicit `width` and `height` props to prevent layout shift. If the size is unknown, use `fill` and ensure the parent container has `position: relative` and a defined aspect ratio.
3.  **Prioritize LCP Image:** The single most important image "above the fold" (the LCP element) must have the `priority` prop set to `true`. All other images must not have this prop.
4.  **Lazy Load by Default:** All images except the LCP image are lazy-loaded by default. Do not change this unless necessary.
5.  **Compress Source Images:** Before adding an image to the repository, compress it using a tool like Squoosh or ImageOptim. Do not commit oversized source images.

### Font Rules
1.  **Use `next/font`:** Manage all fonts using `next/font/google` or `next/font/local` to enable automatic font optimization, including self-hosting and preloading.
2.  **Limit Variations:** Do not use more than 2 font families or more than 3-4 font weights per family.
3.  **Avoid Layout Shift:** `next/font` helps prevent CLS by providing a `size-adjust` fallback. Ensure this is working and no layout shift from font loading occurs.

### JavaScript & Component Rules
1.  **Server by Default:** All components must be React Server Components (RSCs) by default. Do not add `"use client"` unless absolutely necessary.
2.  **"use client" is a deliberate choice:** Only add `"use client"` if the component requires:
    - Event listeners (`onClick`, `onChange`, etc.)
    - State and lifecycle effects (`useState`, `useEffect`)
    - Browser-only APIs (`window`, `localStorage`)
3.  **Push Client Components Down:** Keep client components as small and as far down the component tree as possible (i.e., make them leaves). Wrap server components in client components, not the other way around.
4.  **Dynamic Import for Heavy Components:** For large, client-only components that are not needed on the initial page load (e.g., a complex chart library, a rich text editor), use `next/dynamic` to lazy-load them.
    ```javascript
    import dynamic from 'next/dynamic'
    const HeavyComponent = dynamic(() => import('../components/HeavyComponent'))
    ```
5.  **Analyze Bundles:** When performance issues are suspected, use `@next/bundle-analyzer` to inspect the JavaScript bundles and identify large or duplicate packages.

### Animation Rules
1.  **Prefer CSS Transitions:** Use `transform` and `opacity` for animations as they are hardware-accelerated and do not trigger layout recalculations.
2.  **Respect User Preferences:** Always wrap animations in a `@media (prefers-reduced-motion: reduce)` media query to disable them for users who have requested it.
3.  **Keep it Subtle:** Animations should be quick (typically `<300ms`) and meaningful (e.g., indicating a state change).

## Checklist (Pass/Fail)
- [ ] **LCP:** Is the LCP image/text visible in under 2.5s on a simulated mobile connection?
- [ ] **INP:** Do all buttons, inputs, and interactive elements respond in under 200ms?
- [ ] **CLS:** Is the CLS score below 0.1? (Check Lighthouse or Vercel Speed Insights).
- [ ] **Images:** Does every `<img>` tag use `next/image` with `width`, `height`, and `priority` set correctly?
- [ ] **Fonts:** Are all fonts loaded via `next/font`?
- [ ] **Client Components:** Is `"use client"` only used where absolutely necessary?
- [ ] **Lazy Loading:** Are heavy components that are not critical for the initial view loaded dynamically?

## Common AI Mistakes to Avoid
- **Adding `"use client"` to everything:** A common mistake is to make entire pages client components. This is incorrect. Keep components server-rendered by default.
- **Forgetting `next/image` `priority`:** Failing to set `priority` on the LCP image is a critical performance error.
- **Ignoring Image Compression:** Committing large, unoptimized images directly to the repo, assuming `next/image` will solve everything. It won't.
- **Using `<img>` instead of `<Image>`:** This leads to unoptimized images and layout shift.

## Quality Gate (Proof Required)
Before claiming "DONE," you must provide proof of performance.
- **Local:** Run `npm run build` and report the build summary.
- **Preview:** Run a Lighthouse report on a Vercel preview deployment and report the Performance score for mobile.
- **Production (If deployed):** Link to the Vercel Speed Insights dashboard for the relevant page.

## Output Contract
When you have completed this performance check, you must report:
- **Performance Score:** The mobile Lighthouse score. If not measured, you must state "Lighthouse score not measured."
- **Core Web Vitals:** The LCP, INP, and CLS scores/status.
- **LCP Element:** The HTML element identified as the Largest Contentful Paint.
- **Remaining Risks:** Any known performance risks that were not addressed.
- **Final Status:** `DONE` or `PARTIAL` (if some checks were skipped).
