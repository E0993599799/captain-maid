# Captain Maid - Component Reference Guide

Quick reference for all new components in the design system overhaul.

---

## Button Component

### Basic Usage
```tsx
import Button from '@/components/Button';

<Button>Click Me</Button>
<Button variant="primary">Shop Now</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="ghost">More Info</Button>
```

### Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

### Examples
```tsx
// With icon
<Button icon={<ShoppingCart size={20} />}>
  Add to Cart
</Button>

// Loading state
<Button isLoading variant="primary">
  Processing...
</Button>

// Disabled
<Button disabled>Not Available</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Styling
- **Primary**: Green background, white text, hover darkens
- **Secondary**: Light background, dark text, border
- **Ghost**: Transparent, teal border, teal text

### Accessibility
- ✅ Keyboard accessible (Tab, Enter)
- ✅ Focus indicator visible
- ✅ Disabled state properly marked
- ✅ Icon buttons have aria-labels

---

## ProductCard Component

### Basic Usage
```tsx
import ProductCard from '@/components/ProductCard';

<ProductCard
  id={1}
  name="Glass Cleaner"
  price={5.99}
  emoji="🪟"
/>
```

### Full Props
```typescript
interface ProductCardProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  emoji?: string;
  rating?: number;  // 0-5
  reviews?: number;
  inStock?: boolean;
  badge?: string;
  onAddToCart?: () => void;
  featured?: boolean;
}
```

### Examples
```tsx
// With all details
<ProductCard
  id={1}
  name="Floor Cleaner Pro"
  description="Streak-free, family-safe"
  price={6.99}
  originalPrice={8.99}
  image="/products/floor.jpg"
  rating={5}
  reviews={42}
  inStock={true}
  badge="Best Seller"
  onAddToCart={() => addToCart(1)}
  featured={true}
/>

// Minimal version
<ProductCard
  id={2}
  name="All Purpose"
  price={4.99}
  emoji="🧼"
/>
```

### Features
- ✨ Hover lift animation
- ✨ Image zoom on hover
- ✨ Star rating display
- ✨ Price with discount
- ✨ "Added!" feedback
- ✨ Stock status
- ✨ Trust badge (free shipping)
- ✨ Category label

### Styling
- Card background: White (light) / Dark gray (dark)
- Border: Subtle gray
- Featured: Bold teal border
- Rating: Yellow stars
- Button: Green CTA

---

## NavigationEnhanced Component

### Basic Usage
```tsx
import NavigationEnhanced from '@/components/NavigationEnhanced';

export default function RootLayout({ children }) {
  return (
    <>
      <NavigationEnhanced />
      {children}
    </>
  );
}
```

### Features
- ✨ Sticky positioning
- ✨ Dark mode toggle
- ✨ Shopping cart badge
- ✨ Mobile hamburger menu
- ✨ Smooth scroll detection
- ✨ Hover underlines
- ✨ Animated mobile menu

### Navigation Links (Hardcoded)
- Products → `/#products`
- Blog → `/blog`
- About → `/#about`
- Contact → `/#contact`

### Styling
- Background: White (light) / Dark gray (dark)
- Text: Dark (light) / White (dark)
- Active links: Teal color
- Hover: Underline slides in
- Cart badge: Red circle with count

### Customization
To change links, edit the `navLinks` array in component:

```typescript
const navLinks = [
  { name: 'Products', href: '/#products' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];
```

---

## HeroEnhanced Component

### Basic Usage
```tsx
import HeroEnhanced from '@/components/HeroEnhanced';

export default function Home() {
  return (
    <>
      <HeroEnhanced />
      {/* Other sections */}
    </>
  );
}
```

### Features
- ✨ Animated gradient background
- ✨ Staggered text animations
- ✨ Feature checklist
- ✨ Social proof (avatars + rating)
- ✨ Dual CTAs (primary + secondary)
- ✨ Scroll indicator
- ✨ Floating emoji animations

### Customization
Edit these sections in component:

```typescript
// Heading
<span className="bg-gradient-to-r from-teal-600...">
  Your Custom Text
</span>

// Features List
{[
  'Your feature 1',
  'Your feature 2',
  'Your feature 3',
].map(feature => (...))}

// Button Text
<Button size="lg">Custom Text</Button>

// Social Proof Number
<p className="text-sm">Trusted by 50,000+ customers</p>
```

### Styling
- Background: Gradient teal/emerald
- Text: Bold, large, animated
- Feature checkmarks: Green check marks
- Avatars: Teal gradient circles
- Rating: Yellow stars
- CTA: Green button

### Animation Details
- Stagger: 200ms between items
- Duration: 300-800ms per element
- Easing: ease-out
- Scroll indicator: Bounces up/down

---

## Footer Component

### Basic Usage
```tsx
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
```

### Features
- ✨ Multi-column layout
- ✨ Brand section with socials
- ✨ Quick links (4 sections)
- ✨ Newsletter signup
- ✨ Contact information
- ✨ Trust badges
- ✨ Scroll-to-top button

### Link Sections (Customizable)
Edit the `footerLinks` array:

```typescript
{
  title: 'Products',
  links: [
    { name: 'All Products', href: '/products' },
    { name: 'New Arrivals', href: '/products?sort=new' },
    { name: 'Best Sellers', href: '/products?sort=popular' },
    { name: 'On Sale', href: '/products?filter=sale' },
  ],
},
```

### Social Links (Customizable)
Edit the `socialLinks` array:

```typescript
const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  // Add more...
];
```

### Newsletter Signup
Automatically captures email and shows success message.

```typescript
const handleSubscribe = (e: React.FormEvent) => {
  e.preventDefault();
  // API call here
  setSubscribeSuccess(true);
  setEmail('');
};
```

### Styling
- Background: Dark gray/black
- Text: White/light gray
- Links: Light with hover effect
- Buttons: Teal background
- Trust badges: Small boxes with emoji

### Contact Info (Customize)
Update the contact information array:

```typescript
{
  icon: MapPin,
  title: 'Address',
  content: '123 Clean Street, Bangkok, Thailand',
},
```

---

## BlogCard Component

### Basic Usage
```tsx
import BlogCard from '@/components/BlogCard';

<BlogCard
  id={1}
  title="How to Clean Glass Windows"
  excerpt="Learn the best techniques..."
  author="Jane Doe"
  publishedAt="2024-01-15"
/>
```

### Props
```typescript
interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  author: string;
  publishedAt: string;
  category?: string;  // Default: "Cleaning Tips"
  readTime?: number;  // Default: 5 minutes
  featured?: boolean;
}
```

### Examples
```tsx
// Regular post
<BlogCard
  id={1}
  title="Spring Cleaning Guide"
  excerpt="Tips for deep cleaning your home..."
  author="John Smith"
  publishedAt="2024-01-15"
  category="Guides"
  readTime={8}
/>

// Featured post (spans 2 columns on desktop)
<BlogCard
  id={2}
  title="The Science of Clean Homes"
  excerpt="Why professional cleaning matters..."
  author="Dr. Jane Doe"
  publishedAt="2024-01-10"
  image="/blog/science.jpg"
  readTime={10}
  featured={true}
/>
```

### Features
- ✨ Featured variant (spans 2 columns)
- ✨ Hover lift animation
- ✨ Image with hover zoom
- ✨ Meta information (date, author, read time)
- ✨ Category badge
- ✨ Excerpt preview
- ✨ "Read Article" CTA
- ✨ Arrow animation on hover

### Grid Layout
```tsx
// Proper grid setup
<div className="grid lg:grid-cols-3 gap-8">
  <BlogCard featured {...featuredPost} />
  {otherPosts.map(post => (
    <BlogCard key={post.id} {...post} />
  ))}
</div>
```

### Styling
- Card background: White (light) / Dark gray (dark)
- Border: Light gray
- Featured: Larger, spans 2 columns
- Image height: 200px (regular), 300px (featured)
- Category badge: Teal background
- Meta text: Gray, smaller font

---

## Common Patterns

### Creating a Product Grid
```tsx
import ProductCard from '@/components/ProductCard';

const ProductShowcase = ({ products }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-h2 font-bold mb-8 text-center">
        Featured Products
      </h2>
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
};
```

### Creating a Blog Section
```tsx
import BlogCard from '@/components/BlogCard';

const BlogShowcase = ({ posts }) => {
  const [featured, ...rest] = posts;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-h2 font-bold mb-8 text-center">
        Latest Articles
      </h2>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <BlogCard {...featured} featured />
        {rest.map(post => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};
```

### Creating a CTA Section
```tsx
import Button from '@/components/Button';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-h2 font-bold mb-4">
          Join Our Clean Home Community
        </h2>
        <p className="text-body-lg mb-8 opacity-90">
          Get exclusive offers and cleaning tips
        </p>
        <Button size="lg">
          Shop Now
        </Button>
      </div>
    </section>
  );
};
```

---

## Color Utilities

### Using Design System Colors

```typescript
// In Tailwind classes
className="bg-teal-700 text-white"
className="hover:bg-emerald-600"
className="border border-neutral-300"
className="dark:bg-neutral-800 dark:text-white"

// Direct color references
const colors = {
  primary: '#0F766E',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: '#78716F',
};
```

### Using Design Tokens

```typescript
// In lib/colors.ts (create this file)
export const COLORS = {
  primary: {
    dark: '#0F766E',
    light: '#14B8A6',
    darkest: '#0D5E56',
  },
  success: {
    light: '#6EE7B7',
    base: '#10B981',
    dark: '#059669',
  },
  neutral: {
    white: '#FFFFFF',
    gray: '#78716F',
    black: '#1C1917',
  },
};
```

---

## Animation Classes

### Pre-defined Animations

```typescript
// In Tailwind config
animate-slide-up     // Slides up with fade
animate-fade-in      // Simple fade in
animate-bounce-slow  // Gentle bouncing
animate-pulse-glow   // Pulsing opacity
animate-scale-pulse  // Scales up/down

// Usage
className="animate-fade-in"
className="animate-slide-up"
```

### Framer Motion Common Patterns

```typescript
// Fade in on scroll
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Hover lift
<motion.div whileHover={{ y: -8 }}>
  Card content
</motion.div>

// Stagger children
<motion.ul variants={containerVariants}>
  {items.map((item, i) => (
    <motion.li key={i} variants={itemVariants}>
      {item}
    </motion.li>
  ))}
</motion.ul>
```

---

## Dark Mode Implementation

### Using Dark Mode Classes

```typescript
// Light mode (default)
className="bg-white text-black"

// Dark mode override
className="bg-white dark:bg-neutral-900 text-black dark:text-white"

// Complete example
<div className="
  bg-neutral-50 dark:bg-neutral-900
  text-neutral-900 dark:text-white
  border border-neutral-200 dark:border-neutral-700
">
  Content
</div>
```

### Testing Dark Mode

```typescript
// Toggle for testing
const toggleDarkMode = () => {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', 
    html.classList.contains('dark') ? 'dark' : 'light'
  );
};
```

---

## Responsive Design

### Breakpoints
```
sm:  640px  (phones)
md:  768px  (tablets)
lg:  1024px (small laptops)
xl:  1280px (desktops)
2xl: 1536px (large screens)
```

### Mobile-First Pattern
```typescript
// Start with mobile, add layers for larger screens
className="
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
"
```

### Responsive Images
```typescript
<Image
  src="/product.jpg"
  alt="Product"
  width={400}
  height={300}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  responsive={true}
/>
```

---

## Accessibility Quick Checklist

### For Components
- [ ] Keyboard accessible (Tab key works)
- [ ] Focus indicators visible
- [ ] ARIA labels on icon buttons
- [ ] Semantic HTML (button not div)
- [ ] Proper heading hierarchy
- [ ] Form labels linked with htmlFor
- [ ] Error messages associated with inputs

### For Pages
- [ ] Color contrast > 4.5:1
- [ ] Alt text on all images
- [ ] Skip links for keyboard users
- [ ] Proper landmark roles (nav, main, footer)
- [ ] Works without JavaScript
- [ ] Respects prefers-reduced-motion

---

## Troubleshooting

### Colors Not Showing
```
Issue: Colors appear different than expected
Solution: 
1. Clear browser cache
2. Rebuild: npm run build
3. Check tailwind.config.ts extends colors
```

### Dark Mode Not Working
```
Issue: Dark mode toggle not working
Solution:
1. Check html has 'dark' class
2. Verify localStorage theme
3. Check dark: prefix in classes
```

### Animations Janky
```
Issue: Animations not smooth
Solution:
1. Add will-change: transform
2. Use GPU acceleration: transform3d
3. Check frame rate (target 60fps)
4. Reduce animation complexity
```

### Mobile Layout Broken
```
Issue: Layout breaks on mobile
Solution:
1. Use responsive classes (sm:, md:)
2. Check max-width containers
3. Ensure touch targets 48px+
4. Test with DevTools mobile view
```

---

## Best Practices

### DO
✅ Use Tailwind classes first  
✅ Keep components simple and focused  
✅ Document props and usage  
✅ Test on mobile first  
✅ Use semantic HTML  
✅ Implement proper ARIA labels  
✅ Optimize images  
✅ Test keyboard navigation  

### DON'T
❌ Mix inline styles with Tailwind  
❌ Create overly complex components  
❌ Ignore accessibility  
❌ Use placeholders without fallback  
❌ Create non-responsive designs  
❌ Skip dark mode testing  
❌ Ignore performance  
❌ Use auto-generated colors  

---

## Resources

- **Design System**: `/DESIGN_SYSTEM.md`
- **Implementation Guide**: `/IMPLEMENTATION_GUIDE.md`
- **UI Audit Report**: `/UI_AUDIT_REPORT.md`
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Next.js Docs**: https://nextjs.org/docs
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

**Last Updated**: 2026-07-05  
**Status**: Complete and Ready for Implementation

