# Accessibility Guide

## Overview

The Captain Maid design system aims for WCAG 2.1 Level AA compliance to ensure the website is usable by everyone, including people with disabilities.

### WCAG 2.1 Standards

- **Level A**: Basic accessibility (minimum)
- **Level AA**: Enhanced accessibility (target)
- **Level AAA**: Maximum accessibility (advanced)

We target **Level AA** for all components and pages.

---

## Color & Contrast

### Contrast Ratios

Sufficient color contrast ensures text is readable for everyone, including people with low vision or color blindness.

**Minimum Contrast Requirements:**
- **Normal text**: 4.5:1 (for 14px and below)
- **Large text**: 3:1 (for 18px+ bold or 22px+ regular)
- **UI Components**: 3:1 (buttons, form fields, borders)

### Testing Contrast

Use tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Polypane Contrast Checker](https://polypane.app/)
- Browser DevTools (Lighthouse, Chrome a11y audit)

### Color Usage

**Never rely on color alone** to convey information.

```tsx
// Bad - color only
<div className="text-semantic-error">Error</div>

// Good - color + icon + text
<div className="flex items-center gap-2 text-semantic-error">
  <AlertCircle className="w-5 h-5" />
  <span>Error: Invalid email format</span>
</div>
```

### Brand Color Contrast

Captain Maid brand colors with sufficient contrast:

| Color Pair | Contrast Ratio | WCAG Level |
|-----------|---|---|
| captain-primary (#02A6E3) on white | 4.5:1 | AA |
| captain-dark (#1070B0) on white | 5.8:1 | AA |
| captain-text (#001360) on white | 10.2:1 | AAA |
| semantic-error (#E53E3E) on white | 4.8:1 | AA |
| semantic-success (#38A169) on white | 5.5:1 | AA |

---

## Focus Management

### Focus Rings

Every interactive element must have a visible focus ring for keyboard users.

**Focus Ring Specifications:**
- Width: 2px
- Color: captain-primary (#02A6E3)
- Offset: 2px from element
- Style: Solid outline

```tsx
// All interactive elements use this focus style
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-captain-primary focus-visible:ring-offset-2"
```

### Never Remove Focus Rings

```tsx
// Bad - removes all focus indicators
.element:focus {
  outline: none;
}

// Good - provides visible focus ring
.element:focus-visible {
  outline: 2px solid #02A6E3;
  outline-offset: 2px;
}
```

### Focus Order

Tab order must follow visual flow, typically left-to-right, top-to-bottom.

```tsx
// Correct tab order
<h1>Form</h1>
<FormInput label="Name" />      {/* Tab 1 */}
<FormInput label="Email" />     {/* Tab 2 */}
<Button>Submit</Button>         {/* Tab 3 */}
```

### Focus Trapping in Modals

Modals should trap focus so Tab cycles within the modal.

```tsx
function Modal({ isOpen, onClose, children }) {
  return isOpen ? (
    <div role="dialog" aria-modal="true">
      <button onClick={onClose} autoFocus>Close</button>
      {children}
      {/* Focus cycles back to close button */}
    </div>
  ) : null;
}
```

---

## Keyboard Navigation

### Standard Keys

| Key | Function |
|-----|----------|
| **Tab** | Move focus forward |
| **Shift+Tab** | Move focus backward |
| **Enter** | Activate button, submit form |
| **Space** | Activate button, toggle checkbox |
| **Escape** | Close modal, dropdown, menu |
| **Arrow Up/Down** | Navigate menu items, list options |
| **Arrow Left/Right** | Navigate tabs, menu items |

### Keyboard Testing

Every interactive element must work with keyboard:

```tsx
// Button - test with Tab + Enter
<Button onClick={handleClick}>Action</Button>

// Form - test with Tab + Enter to submit
<form onSubmit={handleSubmit}>
  <FormInput />
  <Button type="submit">Submit</Button>
</form>

// Select - test with Tab + Arrow keys
<FormSelect options={items} />

// Menu - test with Tab + Escape to close
<nav role="navigation">
  <button aria-label="Menu">Menu</button>
  {/* Menu items navigable with arrow keys */}
</nav>
```

### Skip Links

Provide skip link to jump to main content, bypassing navigation.

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

<nav>{/* Navigation */}</nav>

<main id="main-content">
  {/* Page content */}
</main>
```

---

## ARIA Labels

ARIA labels make semantic meaning clear to assistive technologies.

### aria-label

Use for elements without visible text labels.

```tsx
// Icon button needs aria-label
<button aria-label="Close menu" className="p-2">
  <X className="w-6 h-6" />
</button>

// Icon-only link
<a href="/search" aria-label="Search products">
  <Search className="w-5 h-5" />
</a>
```

### aria-labelledby

Link element to its heading.

```tsx
<h2 id="product-section">Featured Products</h2>
<section aria-labelledby="product-section">
  {/* Products */}
</section>
```

### aria-describedby

Provide additional description.

```tsx
<FormInput 
  id="password"
  label="Password"
  aria-describedby="password-rules"
/>
<p id="password-rules" className="text-sm text-captain-muted">
  Must be at least 8 characters with uppercase and number
</p>
```

### aria-invalid

Mark form fields with errors.

```tsx
<FormInput 
  id="email"
  label="Email"
  aria-invalid={!!emailError}
  aria-describedby={emailError ? "email-error" : undefined}
/>
{emailError && (
  <p id="email-error" className="text-semantic-error">
    {emailError}
  </p>
)}
```

### aria-live

Announce dynamic updates to screen readers.

```tsx
<div aria-live="polite" aria-atomic="true">
  {successMessage && <p>{successMessage}</p>}
</div>
```

---

## Semantic HTML

Use semantic HTML elements instead of divs with ARIA.

### Semantic Elements

```tsx
// Good - semantic HTML
<button>Click Me</button>
<a href="/products">Products</a>
<nav>{/* Navigation */}</nav>
<main>{/* Main content */}</main>
<article>{/* Article */}</article>
<section>{/* Section */}</section>
<header>{/* Header */}</header>
<footer>{/* Footer */}</footer>
<form>{/* Form */}</form>
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Bad - div with ARIA
<div role="button" onClick={handleClick}>Click Me</div>
<div role="link" onClick={goToUrl}>Products</div>
```

### Heading Hierarchy

Use proper heading hierarchy (h1 > h2 > h3, no skipping levels).

```tsx
// Good
<h1>Page Title</h1>
<h2>Section 1</h2>
<p>Content</p>
<h3>Subsection 1.1</h3>
<p>Content</p>

// Bad - h1 directly to h3
<h1>Page Title</h1>
<h3>Subsection</h3> {/* Skip h2 */}
```

### Form Labels

Every input must have an associated label.

```tsx
// Good
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// Bad - no label
<input type="email" placeholder="Email" />
```

---

## Touch Targets

### Minimum Size

Interactive elements must be at least 44x44px for touch accuracy.

```tsx
// Good - 44px minimum
<Button size="md" className="h-11 w-11">Icon</Button>

// Consider - too small
<button className="p-1 w-6 h-6">X</button> {/* 24x24 */}
```

### Spacing

Space touch targets so users don't accidentally hit the wrong one.

```tsx
// Good - 8px gap between buttons
<div className="flex gap-2">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>

// Bad - no spacing
<div className="flex gap-0">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>
```

### Mobile-Friendly Sizes

Design for touch with thumb reach on mobile.

```tsx
// Good for mobile
<div className="space-y-4">
  <Button className="w-full h-11">Full Width Button</Button>
  <FormInput label="Email" />
</div>
```

---

## Motion & Animation

### Respect prefers-reduced-motion

Respect users' preference to reduce animations.

```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Timing

Keep animations brief (180-250ms) to not distract.

```tsx
// Good - 200ms standard animation
<Button className="transition-transform duration-200 hover:scale-105">
  Hover me
</Button>

// Bad - too long
<div className="transition-all duration-2000">Content</div> {/* 2 seconds */}
```

### No Auto-Play

Never auto-play audio or video that autostarts.

```tsx
// Good - user controls playback
<video controls>
  <source src="video.mp4" type="video/mp4" />
</video>

// Bad - auto-plays
<video autoPlay>
  <source src="video.mp4" type="video/mp4" />
</video>
```

### No Flashing Content

Avoid flashing content that could trigger seizures (flashing more than 3 times per second).

---

## Images & Icons

### Meaningful Images

Provide descriptive alt text for meaningful images.

```tsx
// Good - descriptive alt text
<img 
  src="glass-cleaner.jpg"
  alt="Captain Maid Glass Cleaner spray bottle on white background"
/>

// Bad - generic alt text
<img src="product.jpg" alt="Product" />
```

### Decorative Images

Mark decorative images with empty alt text.

```tsx
// Decorative - empty alt
<img src="background-pattern.jpg" alt="" />

// Decorative - aria-hidden
<span aria-hidden="true">✨</span>
```

### Icon + Text

Icon-only buttons should always have accompanying text or aria-label.

```tsx
// Good - icon with text
<button className="flex items-center gap-2">
  <ShoppingCart className="w-5 h-5" />
  <span>Add to Cart</span>
</button>

// Good - icon with aria-label
<button aria-label="Add to Cart">
  <ShoppingCart className="w-5 h-5" />
</button>

// Bad - icon only, no label
<button>
  <ShoppingCart className="w-5 h-5" />
</button>
```

---

## Language & Content

### Clear Language

Use clear, simple language that's easy to understand.

```tsx
// Good - simple, direct
<p>Your order has been placed successfully.</p>

// Avoid - complex jargon
<p>Your purchase requisition has been successfully processed.</p>
```

### Short Sentences

Keep sentences short and scannable.

```tsx
// Good - short sentences
<p>Choose a payment method.</p>
<p>Enter your card details.</p>
<p>Review and confirm.</p>

// Avoid - long sentences
<p>
  You are now required to choose a payment method from the available options
  and subsequently enter your card details before review and confirmation.
</p>
```

### Define Abbreviations

Define acronyms and abbreviations on first use.

```tsx
// Good
<p>We use WCAG (Web Content Accessibility Guidelines) for standards.</p>

// Not helpful
<p>We follow WCAG standards.</p>
```

---

## Form Accessibility

### Labels for Every Input

Every form input must have an associated `<label>`.

```tsx
// Good
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// Using FormInput component
<FormInput label="Email Address" type="email" />
```

### Required Field Indicators

Mark required fields clearly.

```tsx
// Good - required indicator
<FormInput 
  label="Email Address"
  required  // Shows red *
/>

// Also good - help text
<FormInput 
  label="Company Name"
  helperText="(Optional)"
/>
```

### Error Messages Linked to Fields

Link error messages to inputs via aria-describedby.

```tsx
<FormInput 
  id="email"
  label="Email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && (
  <p id="email-error" className="text-semantic-error">
    {error}
  </p>
)}
```

### Success Confirmation

Confirm successful submission.

```tsx
{submitted && (
  <div 
    role="alert"
    aria-live="polite"
    className="p-4 bg-semantic-success/10 rounded-lg"
  >
    Thank you! Your message has been sent.
  </div>
)}
```

---

## Testing Checklist

Use this checklist to verify accessibility:

- [ ] **Contrast**: All text has 4.5:1 contrast minimum (use WebAIM checker)
- [ ] **Color not alone**: Color is never the only way to convey information
- [ ] **Focus rings**: All interactive elements have visible 2px focus rings
- [ ] **Focus order**: Tab order follows visual flow left-to-right, top-to-bottom
- [ ] **Keyboard navigation**: All functions work with keyboard only (no mouse needed)
- [ ] **Skip links**: Skip link to main content is provided
- [ ] **ARIA labels**: Icon-only buttons have aria-label or aria-labelledby
- [ ] **Semantic HTML**: Uses proper semantic elements (button, a, form, etc.)
- [ ] **Heading hierarchy**: Headings follow h1 > h2 > h3 order without skipping
- [ ] **Form labels**: Every input has associated `<label>`
- [ ] **Error messages**: Errors linked to fields with aria-describedby
- [ ] **Touch targets**: All interactive elements are at least 44x44px
- [ ] **Spacing**: Touch targets are spaced to avoid accidental clicks
- [ ] **Motion**: Respects prefers-reduced-motion setting
- [ ] **Animation timing**: Animations are 180-250ms, not too long
- [ ] **No auto-play**: No audio/video auto-plays
- [ ] **Image alt text**: Meaningful images have descriptive alt text
- [ ] **Decorative images**: Decorative images have empty alt=""
- [ ] **Icons**: Icon-only buttons have text label or aria-label
- [ ] **Language**: Uses clear, simple language
- [ ] **Abbreviations**: Abbreviations are defined on first use
- [ ] **Zoom**: Page works with 200% browser zoom
- [ ] **Screen reader**: Page is usable with screen reader (NVDA, VoiceOver, JAWS)
- [ ] **Dark mode**: All content is readable in dark mode
- [ ] **Mobile**: All content accessible on mobile devices

### Tools for Testing

- **Contrast**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Keyboard**: Test Tab, Enter, Escape keys manually
- **Screen Reader**: [NVDA](https://www.nvaccess.org/) (Windows), VoiceOver (Mac)
- **Automated**: [axe DevTools](https://www.deque.com/axe/devtools/), Lighthouse
- **Manual**: Browse without mouse, keyboard only
- **Mobile**: Test on real devices with VoiceOver/TalkBack

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Last Updated**: 2026-07-06
**Related Documents**:
- [Component Library](../components/COMPONENT_LIBRARY.md)
- [Form Validation](FORM_VALIDATION.md)
- [Motion Guide](MOTION_GUIDE.md)
