# Captain Maid Component Library

## Overview

The Captain Maid component library provides a set of reusable, accessible, and consistent UI components built with React, TypeScript, and Tailwind CSS. These components implement the Captain Maid design system and follow modern web standards.

### Principles

- **Consistency**: Every component follows the Captain Maid design language
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- **Reusability**: Props-based configuration for flexibility
- **Performance**: Optimized rendering with no unnecessary re-renders
- **Type Safety**: Full TypeScript support with proper prop interfaces

### How to Use

```tsx
// Import components from the components directory
import { Button, FormInput, Card } from '@/components';

// Use components with props
<Button variant="primary" size="md">
  Click Me
</Button>
```

---

## Colors & Palette

The Captain Maid color palette is built around the brand's aqua primary color with supporting blues and semantic colors for status indication.

### Brand Colors

| Color | Hex Value | Usage |
|-------|-----------|-------|
| **Captain Primary** | `#02A6E3` | Buttons, links, primary actions, focus rings |
| **Captain Dark** | `#1070B0` | Hover states, deeper interactions |
| **Captain Accent** | `#90D0F0` | Secondary surfaces, backgrounds |
| **Captain Light** | `#B0D0F0` | Card backgrounds, light surfaces |
| **Captain Soft** | `#EAF6FD` | Subtle backgrounds, disabled states |
| **Captain Text** | `#001360` | Primary text, headings |
| **Captain Muted** | `#506090` | Secondary text, helper text |
| **Captain Border** | `#D9EAF6` | Subtle borders, dividers |
| **Captain White** | `#FFFFFF` | White highlights, contrast |

### Semantic Colors

| Color | Hex Value | Usage |
|-------|-----------|-------|
| **Error/Danger** | `#E53E3E` | Error messages, validation, destructive actions |
| **Success** | `#38A169` | Success messages, confirmations |
| **Warning** | `#ECC94B` | Warning messages, cautions |
| **Info** | `#3182CE` | Informational messages, hints |

### Usage Examples

```css
/* Primary button background */
.bg-captain-primary { /* #02A6E3 */ }

/* Error text */
.text-semantic-error { /* #E53E3E */ }

/* Light background for sections */
.bg-captain-light { /* #B0D0F0 */ }
```

---

## Typography

Captain Maid uses a two-font system for optimal readability and hierarchy.

### Font Stack

- **Headings**: Poppins, Noto Sans Thai, sans-serif
- **Body**: Montserrat, Noto Sans Thai, sans-serif
- **Accent**: Monotype Corsiva, cursive (limited use)

### Font Sizes & Styles

| Size | Pixels | Line Height | Weight | Usage |
|------|--------|-------------|--------|-------|
| **H1** | 54px | 1.2 | 700 | Page titles, major sections |
| **H2** | 42px | 1.3 | 700 | Section headings |
| **H3** | 36px | 1.3 | 700 | Subsection titles |
| **H4** | 24px | 1.4 | 700 | Feature titles, card headings |
| **H5** | 20px | 1.4 | 700 | Small headings, labels |
| **H6** | 18px | 1.5 | 700 | Micro labels |
| **Body** | 16px | 1.6 | 400 | Paragraph text, default |
| **Body Small** | 14px | 1.5 | 400 | Secondary text, captions |
| **Label** | 12px | 1.5 | 600 | Form labels, badges |

### Usage Examples

```tsx
// Using Tailwind text utilities
<h1 className="text-h1">Welcome to Captain Maid</h1>
<p className="text-body">Regular paragraph text.</p>
<span className="text-body-sm">Small secondary text.</span>
<label className="text-label">Form Label *</label>
```

---

## Spacing & Layout

### 8px Grid System

All spacing follows an 8px base unit for consistency and alignment.

| Token | Pixels | CSS Class |
|-------|--------|-----------|
| space-1 | 4px | `p-1`, `m-1`, `gap-1` |
| space-2 | 8px | `p-2`, `m-2`, `gap-2` |
| space-3 | 12px | `p-3`, `m-3`, `gap-3` |
| space-4 | 16px | `p-4`, `m-4`, `gap-4` |
| space-5 | 20px | `p-5`, `m-5`, `gap-5` |
| space-6 | 24px | `p-6`, `m-6`, `gap-6` |
| space-8 | 32px | `p-8`, `m-8`, `gap-8` |
| space-10 | 40px | `p-10`, `m-10`, `gap-10` |
| space-12 | 48px | `p-12`, `m-12`, `gap-12` |
| space-16 | 64px | `p-16`, `m-16`, `gap-16` |
| space-20 | 80px | `p-20`, `m-20`, `gap-20` |

### Responsive Breakpoints

Use Tailwind's responsive prefixes for mobile-first design:

```tsx
// Mobile first: base styles apply to mobile
<div className="p-4 md:p-6 lg:p-8 xl:p-10">
  Responsive padding: 16px mobile, 24px tablet+, 32px desktop+, 40px xl+
</div>
```

**Tailwind Breakpoints:**
- `sm`: 640px (tablets)
- `md`: 768px (tablets+)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large desktops)
- `2xl`: 1536px (extra large)

### Container Max-Width

```tsx
// Standard page container
<div className="max-w-7xl mx-auto px-4 md:px-8">
  {/* Content limited to 1280px with responsive padding */}
</div>
```

---

## Button Component

The Button component is the primary interaction element for calls-to-action and form submissions.

### Variants

#### Primary
Default button for main actions. Aqua background with white text.

```tsx
<Button variant="primary">Shop Now</Button>
<Button variant="primary" size="lg">Learn More</Button>
```

**When to use**: Main calls-to-action, primary form submissions, shop buttons

#### Secondary
Light blue background for secondary actions.

```tsx
<Button variant="secondary">View Details</Button>
<Button variant="secondary" size="md">Learn More</Button>
```

**When to use**: Secondary actions, back buttons, alternative options

#### Ghost
Transparent with text-only appearance, minimal visual weight.

```tsx
<Button variant="ghost">Skip</Button>
<Button variant="ghost">Cancel</Button>
```

**When to use**: Tertiary actions, cancel buttons, less important options

#### Danger
Red background for destructive actions requiring confirmation.

```tsx
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>
```

**When to use**: Delete operations, destructive actions, confirmations

### Sizes

| Size | Height | CSS Class | Usage |
|------|--------|-----------|-------|
| **XS** | 32px | `size="xs"` | Inline actions, tooltips |
| **SM** | 36px | `size="sm"` | Small secondary buttons |
| **MD** | 44px | `size="md"` | Default, most common |
| **LG** | 52px | `size="lg"` | Primary CTAs, feature buttons |
| **XL** | 60px | `size="xl"` | Large hero buttons, hero sections |

### States

#### Default
```tsx
<Button variant="primary" size="md">
  Click Me
</Button>
```

#### Hover
Automatically applied on hover. Primary buttons darken and lift shadow.

```tsx
// Styling is automatic, no prop needed
<Button variant="primary">Hover me</Button>
```

#### Active
Button shrinks slightly when clicked.

```tsx
// Styling is automatic via active:scale-95
<Button variant="primary">Click me</Button>
```

#### Disabled
Reduced opacity, not interactive.

```tsx
<Button variant="primary" disabled>
  Disabled Button
</Button>
```

#### Loading
Shows spinner, prevents interaction.

```tsx
const [loading, setLoading] = useState(false);

<Button 
  variant="primary" 
  isLoading={loading}
>
  {loading ? 'Saving...' : 'Save'}
</Button>
```

#### Success
Used after successful action completion.

```tsx
<Button variant="primary" disabled className="bg-semantic-success">
  ✓ Saved Successfully
</Button>
```

### Usage Examples

```tsx
// Basic button
<Button variant="primary" size="md">
  Shop Now
</Button>

// With icon
import { ShoppingCart } from 'lucide-react';

<Button 
  variant="primary" 
  size="lg"
  icon={<ShoppingCart className="w-5 h-5" />}
  iconPosition="left"
>
  Add to Cart
</Button>

// Loading state
<Button 
  variant="primary"
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Submit
</Button>

// Form button
<Button 
  variant="primary" 
  type="submit"
  disabled={!isFormValid}
>
  Complete Purchase
</Button>
```

---

## FormInput Component

Text input for collecting user data with validation support.

### Required Props

```tsx
<FormInput
  label="Email Address"
  type="email"
  required
/>
```

### Optional Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `label` | string | undefined | Form field label |
| `type` | string | "text" | Input type (text, email, tel, etc.) |
| `placeholder` | string | undefined | Placeholder text |
| `required` | boolean | false | Shows required indicator (*) |
| `error` | string | undefined | Error message to display |
| `helperText` | string | undefined | Helper text below input |
| `disabled` | boolean | false | Disables the input |
| `value` | string | undefined | Controlled value |
| `onChange` | function | undefined | Change handler |

### Validation States

#### Default (Empty)
```tsx
<FormInput 
  label="Full Name"
  placeholder="Enter your name"
/>
```

#### Valid (Filled)
```tsx
<FormInput 
  label="Email"
  type="email"
  value="user@example.com"
/>
```

#### Error
```tsx
<FormInput 
  label="Email"
  type="email"
  error="Please enter a valid email address"
/>
```

#### Success
```tsx
<FormInput 
  label="Email"
  type="email"
  value="confirmed@example.com"
  disabled
/>
// Follow with success message
<p className="text-semantic-success mt-2">✓ Email confirmed</p>
```

### Usage Examples

```tsx
// Simple email input
<FormInput 
  label="Email Address"
  type="email"
  required
  placeholder="you@example.com"
/>

// With validation and helper text
<FormInput 
  label="Phone Number"
  type="tel"
  helperText="Format: (XXX) XXX-XXXX"
  placeholder="(555) 123-4567"
/>

// With error state
<FormInput 
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

// Required field indicator
<FormInput 
  label="Company Name"
  required
  placeholder="Your company"
/>
```

---

## FormSelect Component

Dropdown select for choosing from predefined options.

### Required Props

```tsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<FormSelect
  label="Choose an option"
  options={options}
/>
```

### Optional Props

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `label` | string | undefined | Select label |
| `options` | array | [] | Array of {value, label} objects |
| `value` | string | undefined | Selected value (controlled) |
| `onChange` | function | undefined | Change handler |
| `error` | string | undefined | Error message |
| `required` | boolean | false | Required indicator |
| `disabled` | boolean | false | Disabled state |
| `placeholder` | string | "Select..." | Placeholder text |

### Controlled vs Uncontrolled

#### Uncontrolled (Simple)
```tsx
<FormSelect 
  label="Product Type"
  options={[
    { value: 'liquid', label: 'Liquid Cleaners' },
    { value: 'powder', label: 'Powder Cleaners' },
    { value: 'wipes', label: 'Wipes' },
  ]}
/>
```

#### Controlled (Form Integration)
```tsx
const [productType, setProductType] = useState('liquid');

<FormSelect 
  label="Product Type"
  value={productType}
  onChange={(e) => setProductType(e.target.value)}
  options={[
    { value: 'liquid', label: 'Liquid Cleaners' },
    { value: 'powder', label: 'Powder Cleaners' },
    { value: 'wipes', label: 'Wipes' },
  ]}
/>
```

### Error Handling

```tsx
<FormSelect 
  label="Category"
  options={categories}
  error="Please select a category"
/>
```

---

## Card Component

Container for grouping related content with consistent styling.

### Variants

#### Light (Default)
White or light background card.

```tsx
<Card>
  <h3 className="text-h4">Card Title</h3>
  <p className="text-body">Card content goes here.</p>
</Card>
```

#### Subtle
Soft blue background (captain-soft).

```tsx
<Card variant="subtle">
  <h3 className="text-h4">Subtle Card</h3>
  <p className="text-body">Light blue background.</p>
</Card>
```

### Hover Effects

Cards lift and increase shadow on hover.

```tsx
<Card className="hover:shadow-lg transition-shadow duration-200">
  <div>Hover me</div>
</Card>
```

### Use Cases

#### Product Card
```tsx
<Card>
  <img src="product.jpg" alt="Product" className="w-full rounded-md mb-4" />
  <h3 className="text-h5 mb-2">Product Name</h3>
  <p className="text-body text-captain-muted mb-4">$29.99</p>
  <Button variant="primary" size="md" className="w-full">
    View Details
  </Button>
</Card>
```

#### Feature Card
```tsx
<Card className="text-center">
  <div className="text-4xl mb-4">🧼</div>
  <h3 className="text-h4 mb-2">Eco-Friendly</h3>
  <p className="text-body text-captain-muted">
    Made from sustainable ingredients.
  </p>
</Card>
```

---

## Badge Component

Small label element for status, tags, or categories.

### Color Variants

| Variant | Background | Text | Usage |
|---------|-----------|------|-------|
| `default` | captain-light | captain-text | General status |
| `success` | semantic-success | white | Success states |
| `error` | semantic-error | white | Error/alert states |
| `warning` | semantic-warning | black | Warning states |
| `info` | semantic-info | white | Informational |

### Size Variants

| Size | Padding | Font Size | Usage |
|------|---------|-----------|-------|
| `sm` | 4px 12px | 12px | Inline badges |
| `md` | 6px 16px | 14px | Default badges |
| `lg` | 8px 20px | 16px | Prominent badges |

### Usage Examples

```tsx
// Status badges
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="error" size="sm">Inactive</Badge>

// Product tags
<div className="flex gap-2">
  <Badge variant="info">Eco-Friendly</Badge>
  <Badge variant="info">Organic</Badge>
</div>

// Filter tags with remove
<div className="flex items-center gap-2">
  <Badge variant="default">Liquid Cleaner</Badge>
  <button className="ml-1">✕</button>
</div>
```

---

## Navigation Component

Main navigation header with responsive mobile drawer.

### Structure

#### Top Utility Bar
Language selector and user account links.

#### Main Navigation
Logo, menu items, and primary CTA button.

#### Mobile Drawer
Collapsible menu for mobile devices.

### Active States

Current page is indicated with primary color and underline.

```tsx
// Navigation automatically marks current page as active
<NavigationEnhanced />

// Current page link styling:
// className="text-captain-primary border-b-2 border-captain-primary"
```

### Usage Example

```tsx
// Import and use in layout
import { NavigationEnhanced } from '@/components';

export default function RootLayout({ children }) {
  return (
    <>
      <NavigationEnhanced />
      <main>{children}</main>
    </>
  );
}
```

---

## Hero Component

Large banner section for page headers and key messaging.

### Structure

- **Eyebrow**: Small label (optional)
- **Headline**: Main H1 heading
- **Supporting Copy**: Descriptive paragraph
- **CTA Button**: Primary action

### Example

```tsx
<HeroEnhanced
  eyebrow="Welcome to"
  headline="Captain Maid Premium Cleaning"
  description="Professional-grade cleaning solutions for your home."
  ctaText="Shop Now"
  ctaUrl="/shop"
  backgroundImage="/hero-bg.jpg"
/>
```

### Features

- Gradient background overlay
- Responsive layout (full-width mobile, centered desktop)
- Optimized images with next/image
- Accessibility support

---

## Footer Component

Page footer with links, information, and social media.

### Column Structure

Footer typically includes:
- **About**: Company info
- **Products**: Product links
- **Support**: Help and FAQs
- **Contact**: Contact information
- **Social**: Social media links

### Link Styling

Links use primary color with hover effects.

```tsx
<a href="#" className="text-captain-primary hover:text-captain-dark">
  Link Text
</a>
```

### Usage Example

```tsx
import { Footer } from '@/components';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
```

---

## Accessibility

All components follow WCAG 2.1 AA standards.

### Focus Rings

All interactive elements have visible focus rings.

```tsx
// 2px captain-primary focus ring
className="focus-visible:ring-2 focus-visible:ring-captain-primary"
```

### ARIA Labels

Icon-only buttons require ARIA labels:

```tsx
<button aria-label="Close menu" className="p-2">
  <X className="w-6 h-6" />
</button>
```

### Semantic HTML

Components use proper semantic elements:

```tsx
// Buttons use <button> not <div>
<button>Action</button>

// Forms use <label for="id">
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Navigation uses <nav>
<nav><a href="#">Link</a></nav>
```

### Keyboard Navigation

- **Tab**: Move focus forward
- **Shift+Tab**: Move focus backward
- **Enter**: Activate buttons/links
- **Escape**: Close modals
- **Arrow Keys**: Navigate menus/lists

### Screen Reader Support

All images have descriptive alt text:

```tsx
<img 
  src="product.jpg" 
  alt="Captain Maid Glass Cleaner bottle on white background"
/>
```

---

## Animation

Components use consistent, purposeful animations.

### Transition Timing

- **Fast**: 180ms for simple state changes
- **Standard**: 200ms for most interactions
- **Slow**: 250ms for complex animations

### Motion Examples

```tsx
// Fade in
<div className="opacity-0 animate-fade-in">Content</div>

// Slide up
<div className="translate-y-5 animate-slide-up">Content</div>

// Scale
<div className="scale-95 animate-scale">Content</div>

// Button hover
<Button className="hover:scale-105 transition-transform duration-200">
  Hover me
</Button>
```

### Respects Reduced Motion

Animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Dark Mode

All components support dark mode via the `dark:` Tailwind prefix.

### Testing Dark Mode

1. Open browser DevTools
2. Toggle "Prefer color scheme: dark"
3. Verify all components are readable

### Implementation

```tsx
// Components automatically adapt to dark mode
// via dark: Tailwind classes
<div className="bg-white dark:bg-gray-900">
  Content adapts to dark mode
</div>
```

---

## Best Practices

### Do's

- Use semantic HTML elements
- Provide proper ARIA labels for accessibility
- Test components on mobile devices
- Use Tailwind utilities for consistency
- Follow the color palette
- Use the spacing grid (8px units)
- Keyboard navigation should work
- Load images responsively

### Don'ts

- Don't use generic `<div>` for buttons
- Don't rely on color alone for meaning
- Don't disable focus rings
- Don't use inline styles
- Don't skip alt text on images
- Don't ignore mobile responsiveness
- Don't mix spacing units
- Don't over-animate

### Common Patterns

#### Form with Validation

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  if (!email.includes('@')) {
    setError('Invalid email');
    return;
  }
  // Submit form
};

<form onSubmit={handleSubmit}>
  <FormInput 
    label="Email"
    type="email"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      setError(''); // Clear error on edit
    }}
    error={error}
  />
  <Button variant="primary" type="submit">
    Submit
  </Button>
</form>
```

#### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Product 1</Card>
  <Card>Product 2</Card>
  <Card>Product 3</Card>
</div>
```

#### Loading State

```tsx
const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);
  await fetch('/api/action');
  setLoading(false);
};

<Button 
  isLoading={loading} 
  onClick={handleClick}
>
  Action
</Button>
```

### Performance Considerations

- Use React.memo for components that don't change often
- Implement lazy loading for images
- Use next/image for automatic optimization
- Avoid unnecessary re-renders with proper dependencies
- Code-split large features

---

## Component Index

Quick reference to all components:

- [Button](#button-component) - Interactive action element
- [FormInput](#forminput-component) - Text input field
- [FormSelect](#formselect-component) - Dropdown select
- [Card](#card-component) - Content container
- [Badge](#badge-component) - Status label
- [Navigation](#navigation-component) - Header navigation
- [Hero](#hero-component) - Page banner
- [Footer](#footer-component) - Page footer

---

## Related Documentation

For more information, see:

- [Form Validation Guide](../docs/FORM_VALIDATION.md) - Form patterns and validation
- [Accessibility Guide](../docs/ACCESSIBILITY.md) - WCAG compliance details
- [Motion Guide](../docs/MOTION_GUIDE.md) - Animation principles and timing

---

**Last Updated**: 2026-07-06
**Maintained By**: Captain Maid Design System Team
