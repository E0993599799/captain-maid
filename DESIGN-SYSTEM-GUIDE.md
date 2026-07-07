# Captain Maid: Web Visual Design System Guide

This document outlines the modern, conversion-focused design system for the Captain Maid brand, based on principles from Material Design 3, Nielsen Norman Group, and best practices from leading web design sources.

---

## 1. Design Mission & Principles

### Mission
Create beautiful, credible, conversion-focused web pages using the brand's real assets and business goal.

### Core Principles
- **Clarity First:** A clear visual hierarchy is more important than decoration.
- **Premium Spacing:** Use generous, consistent spacing to create a clean, uncluttered, and premium feel.
- **Focused Action:** Every section should have one, and only one, dominant Call-to-Action (CTA).
- **Authenticity:** Use real product imagery over generic mockups whenever possible.
- **Mobile-First:** Design layouts for mobile first, then progressively enhance for larger screens.
- **Meaningful Motion:** Animations must support the user experience (e.g., guide the eye, provide feedback), not distract from it.

---

## 2. Design Tokens (for CSS & Tailwind)

### Color Palette
- **Primary/Brand:** `#02a6e3` (Bright, clean blue from the logo)
- **Secondary/Accent:** `#90d0f0` (Lighter, airy blue for backgrounds/gradients)
- **Background:** `#ffffff` (Pure white for a clean, premium feel)
- **Text (Primary):** `#001360` (Deep navy blue from the logo text)
- **Text (Secondary):** `#506090` (Softer, muted blue-gray for subheadings)

### Typography
- **Font Family:** A clean, modern Sans-Serif font (e.g., "Inter", system-ui).
- **Scale:**
    - **H1 (Headline):** 36px - 48px, Bold (700)
    - **H2 (Section Title):** 28px - 36px, Bold (700)
    - **H3 (Card Title):** 20px - 24px, Semi-Bold (600)
    - **Body:** 16px - 18px, Regular (400)
    - **Small/Label:** 12px - 14px, Medium (500)

### Spacing System (8px Grid)
All margins, paddings, and gaps should use multiples of 8px.
- `space-1`: 8px
- `space-2`: 16px
- `space-3`: 24px
- `space-4`: 32px
- `space-6`: 48px
- `space-8`: 64px

### Border Radius
- **Small (e.g., tags):** 4px (`rounded-sm`)
- **Medium (e.g., buttons, inputs):** 8px (`rounded-lg`)
- **Large (e.g., cards):** 12px - 16px (`rounded-xl`)

### Shadow System (Elevation)
- **Low (e.g., card hover):** `shadow-md` (subtle, soft shadow)
- **Medium (e.g., modals, pop-ups):** `shadow-lg` (more pronounced shadow)

---

## 3. Layout & Section Patterns

- **Max Content Width:** Keep the main content within a maximum width of `1200px` (`max-w-7xl`) and centered on the page (`mx-auto`).
- **Section Rhythm:**
    - Each section must have a single, clear purpose (e.g., Features, Products, CTA).
    - Use generous vertical padding (`py-16` or `py-24`) to separate sections and create a breathable rhythm.
    - Alternate between "dense" sections (like a card grid) and "breathable" sections (like a single centered headline).
- **Hero Section:** Must contain these 5 elements:
    1.  **Headline:** A clear, benefit-oriented H1.
    2.  **Subheadline:** Supporting text that adds context.
    3.  **CTA:** A prominent primary button.
    4.  **Trust Cue:** Social proof like partner logos or a customer testimonial.
    5.  **Visual Anchor:** The main hero image.

---

## 4. Component Rules

### Buttons
- **Primary:** Solid background (`bg-primary`), white text. Used for the most important action in a section.
- **Secondary (Ghost):** Transparent background, colored border and text. Used for less important actions.
- **States:** All buttons must have clear `hover` (e.g., slight lift, color change) and `focus` (e.g., outline ring) states.
- **Size:** Minimum touch target of 44x44px on mobile.

### Cards
- **Style:** Clean design with a subtle border (`border`), a larger radius (`rounded-xl`), and a light box shadow on hover (`hover:shadow-md`).
- **Purpose:** Use card grids only when you need to present multiple, comparable items (e.g., products, features).

### Images
- **Authenticity:** Prioritize using real images from the project's assets folder (`/public/images`).
- **Performance:** All images should be optimized for the web and served using a component like Next.js's `<Image>`.
- **Alt Text:** Every image must have descriptive `alt` text for accessibility.

---

## 5. Motion & Responsiveness

### Motion Rules
- **Initial Load:** Gentle fade-in and/or slide-up animations to introduce the hero section.
- **On Scroll:** Staggered fade-in animations for elements like card grids as they enter the viewport.
- **Hover:** Interactions should be subtle (e.g., a slight "lift" effect via `transform: translateY(-4px)`).
- **Performance:** Respect `prefers-reduced-motion` to disable non-essential animations for users who prefer it.

### Mobile Responsive Rules
- **Layout:** Multi-column layouts must stack into a single, easy-to-read column on mobile.
- **Typography:** Font sizes for headlines should be reduced on smaller screens to prevent them from taking up too much space.
- **Touch Targets:** Ensure all interactive elements (buttons, links) are large enough to be easily tapped with a finger.

---

## 6. Accessibility Checklist (A11y)

- **[ ] Color Contrast:** All text must have a contrast ratio of at least 4.5:1 against its background.
- **[ ] Keyboard Navigation:** The entire site must be navigable using only the Tab key.
- **[ ] Focus States:** All interactive elements must have a clear and visible focus indicator.
- **[ ] Semantic HTML:** Use correct HTML5 tags (`<main>`, `<nav>`, `<section>`) to define the structure of the page.
- **[ ] Alt Text:** All meaningful images must have descriptive alt text.

---

## 7. Bad Patterns to Avoid

- **Crowded UI:** Do not cram elements together. Always prioritize generous spacing.
- **Inconsistent Styles:** Avoid using random colors, fonts, or spacing that don't conform to the design tokens.
- **Generic Placeholders:** Do not use placeholder images or "lorem ipsum" text when real content is available.
- **Distracting Animations:** Avoid animations that loop indefinitely or are purely decorative without serving a purpose.
- **Multiple Competing CTAs:** Each section should guide the user towards a single primary action.
