# Mobile Hero and Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the mobile hero composition and guarantee the mobile navigation drawer appears above page content.

**Architecture:** Keep hero behavior responsive through component utility classes plus scoped CSS media queries. Move the drawer outside the header stacking context while preserving the existing React state and navigation behavior.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, Node test runner

## Global Constraints

- Mobile copy uses the upper 30% text-safe area in an extra-tall 205vw / 115svh hero.
- Mobile artwork remains portrait and visible below the copy.
- Heading weight is 600 and outlines are reduced by exactly 30% from the current values.
- The drawer must render above the hero and fill the viewport below the header.

---

### Task 1: Lock responsive behavior with regression tests

**Files:**
- Modify: `tests/ui-regression.test.mjs`

**Interfaces:**
- Consumes: source text from `HeroSlider.tsx`, `Header.tsx`, and `globals.css`
- Produces: assertions for mobile layout and stacking behavior

- [ ] Add assertions for portrait mobile sizing, top-aligned copy, lower translucent gradient, weight 600, 30%-reduced strokes, and drawer sibling placement.
- [ ] Run `npm test` and confirm the new assertions fail for the missing behavior.

### Task 2: Implement mobile hero composition

**Files:**
- Modify: `components/home/HeroSlider.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing portrait slide assets and active slide content
- Produces: responsive hero composition using `hero-content-shell` and `hero-media-overlay`

- [ ] Set a portrait-aware mobile hero height and top-align the content shell.
- [ ] Add the mobile-only text-safe overlay and retain tablet/desktop treatments.
- [ ] Apply weight 600 and reduce strokes to 25.2px and `clamp(8.4px, 0.924vw, 16.8px)`.
- [ ] Run `npm test` and confirm hero assertions pass.

### Task 3: Repair mobile menu stacking

**Files:**
- Modify: `components/Header.tsx`

**Interfaces:**
- Consumes: `mobileOpen`, `scrolled`, `openMenu`, and existing navigation data
- Produces: a viewport-fixed sibling drawer at page-level z-index 60

- [ ] Return the header and drawer in a React fragment.
- [ ] Move the drawer markup after `</header>` and set its page-level stacking class to `z-[60]`.
- [ ] Run `npm test` and confirm drawer assertions pass.

### Task 4: Verify and commit

**Files:**
- Modify only files listed above plus this design and plan documentation.

**Interfaces:**
- Consumes: completed implementation
- Produces: verified commit on `main`

- [ ] Run `npm test`, `npm run type-check`, `npm run build`, and `git diff --check`.
- [ ] Commit with `fix: correct mobile hero and menu layering` and update remote `main` without force.
