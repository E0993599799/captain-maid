# Motion & Animation Guide

## Motion Philosophy

Motion in the Captain Maid design system serves a purpose: it guides user attention, provides feedback, and creates a cohesive experience. Every animation should feel natural and intentional.

### Principles

1. **Purposeful**: Motion has a clear reason (feedback, guidance, delight)
2. **Consistent**: Timing and easing are predictable
3. **Accessible**: Respects user preferences for reduced motion
4. **Fast**: Animations complete quickly (180-250ms)
5. **Smooth**: Uses appropriate easing functions

### When to Use Motion

- User interaction feedback (button press, hover)
- Content state changes (loading, error, success)
- Content transitions (page navigation, panel open/close)
- Attention direction (drawing focus to important elements)
- Delight moments (subtle animations that feel good)

### When NOT to Use Motion

- Page load (too slow, not interactive)
- Decorative (distracting, unprofessional)
- Constant loops (seizure risk, accessibility concern)
- Auto-playing content (users didn't request it)

---

## Timing Standards

Animation duration must follow these standards for consistency and accessibility.

### Timing Tiers

| Duration | Use Case | Examples |
|----------|----------|----------|
| **100ms** | Minimum interactive (too fast to notice) | Button press, click response |
| **180ms** | Fast transitions | Simple state changes, color shifts |
| **200ms** | Standard (default) | Most interactions, hover states |
| **250ms** | Slow transitions | Complex animations, entrance effects |
| **300-400ms** | Modal/overlay | Modals entering/exiting |
| **500ms+** | Never use | Too slow, feels laggy |

### Timing Examples

```tsx
// Fast - state change (180ms)
<Button className="transition-colors duration-180 hover:bg-captain-dark">
  Hover me
</Button>

// Standard - default animation (200ms)
<Card className="transition-shadow duration-200 hover:shadow-lg">
  Hover me
</Card>

// Slow - entrance animation (250ms)
<div className="animate-fade-in" style={{ animationDuration: '250ms' }}>
  Content
</div>

// Never - too slow
<div className="transition-all duration-1000"> {/* Don't do this */}
  Content
</div>
```

---

## Easing Functions

Easing controls the acceleration curve of animations. Different easing functions convey different feelings.

### Standard Easing Functions

#### ease-in-out (Default)
Smooth acceleration and deceleration. Most natural and versatile.

```css
transition: all 200ms ease-in-out;
```

**Best for**: General interactions, default choice

#### ease-out
Fast start, slow finish. Makes actions feel responsive.

```css
transition: all 200ms ease-out;
```

**Best for**: Content exiting, user interactions

#### ease-in
Slow start, fast finish. Makes content feel weighted.

```css
transition: all 200ms ease-in;
```

**Best for**: Content entering, loading states

#### cubic-bezier (Custom)
Material Design standard for precise control.

```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
```

**Best for**: Complex animations, precise control

### Easing Chart

```
ease-in-out: ╱‾‾╲
             ╱   ╲
ease-out:   ╱     ‾‾‾
           ╱         
ease-in:   ‾        ╲
            ‾‾‾‾╲   ╲
```

---

## Animation Patterns

### Fade In

Object appears by increasing opacity from 0 to 1.

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 200ms ease-in-out forwards;
}
```

**Use case**: New content appearing, modals opening

```tsx
<div className="opacity-0 animate-fade-in">
  Content fades in
</div>
```

### Fade Out

Object disappears by decreasing opacity.

```css
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.animate-fade-out {
  animation: fadeOut 200ms ease-in-out forwards;
}
```

**Use case**: Content leaving, modals closing

### Slide Up

Object moves up while fading in.

```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 300ms ease-out forwards;
}
```

**Use case**: Bottom sheets opening, success messages appearing

```tsx
<div className="translate-y-5 opacity-0 animate-slide-up">
  Message slides up
</div>
```

### Slide Down

Object moves down while fading in.

```css
@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-down {
  animation: slideDown 300ms ease-out forwards;
}
```

**Use case**: Dropdowns opening, headers appearing

### Scale (Zoom)

Object grows from small to full size.

```css
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale {
  animation: scaleIn 250ms ease-out forwards;
}
```

**Use case**: Modals/popovers opening, alerts appearing

```tsx
<div className="scale-95 opacity-0 animate-scale">
  Content scales up
</div>
```

### Bounce Hover

Subtle bounce effect on hover for interactive elements.

```css
@keyframes bounceHover {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.hover:animate-bounce {
  animation: bounceHover 600ms ease-in-out infinite;
}
```

**Use case**: Subtle interactive feedback

```tsx
<Button className="hover:animate-bounce-gentle">
  Bounce on hover
</Button>
```

### Accordion (Height Transition)

Content expands/collapses smoothly.

```css
.accordion-open {
  max-height: 500px; /* Must be larger than content */
  transition: max-height 300ms ease-out;
}

.accordion-closed {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease-in;
}
```

**Use case**: Expanding/collapsing sections, FAQ accordions

```tsx
<div className={expanded ? 'accordion-open' : 'accordion-closed'}>
  Hidden content
</div>
```

### Button Press

Button shrinks slightly when clicked for tactile feedback.

```tsx
<Button className="active:scale-95 transition-transform duration-100">
  Click me
</Button>
```

**Effect**: Button scales down to 95% on click, returns to 100%

---

## Component Motion

### Button Hover

Primary buttons lift and increase shadow.

```tsx
<Button 
  className="hover:shadow-brand-hover hover:translate-y-[-2px] transition-all duration-200"
>
  Shop Now
</Button>
```

**Effect**:
- Shadow increases
- Button lifts 2px
- Color deepens

### Card Hover

Cards lift and increase shadow on hover.

```tsx
<Card 
  className="hover:shadow-lg hover:translate-y-[-4px] transition-all duration-200"
>
  Product Card
</Card>
```

**Effect**:
- Shadow increases from `md` to `lg`
- Card lifts 4px
- Feels interactive

### Link Hover

Links change color without animation for simplicity.

```tsx
<a className="text-captain-primary hover:text-captain-dark">
  Link Text
</a>
```

**Effect**: Color changes instantly on hover

### Modal Enter/Exit

Modals fade in and scale up.

```tsx
// Enter animation
<div className="animate-fade-in animate-scale">
  Modal content
</div>

// Exit animation
<div className="opacity-0 scale-95">
  Modal closing
</div>
```

### Toast Enter/Exit

Success/error messages slide up and fade.

```tsx
// Enter
<div className="animate-slide-up animate-fade-in">
  Notification
</div>

// Exit
<div className="translate-y-5 opacity-0">
  Notification
</div>
```

### Loading Spinner

Spinner rotates continuously while loading.

```tsx
<div className="animate-spin">
  <Loader className="w-6 h-6" />
</div>
```

### Pulse Effect

Subtle pulsing for inactive/idle states.

```tsx
<div className="animate-pulse-subtle">
  Pulsing content
</div>
```

---

## CSS Examples

### Tailwind Transition Classes

Captain Maid uses Tailwind's built-in timing utilities:

```tsx
// Duration (milliseconds)
className="transition-all duration-180"   // 180ms
className="transition-all duration-200"   // 200ms (default)
className="transition-all duration-300"   // 300ms
className="transition-all duration-500"   // 500ms

// Easing
className="ease-in-out"        // smooth acceleration/deceleration
className="ease-out"           // fast start, slow end
className="ease-in"            // slow start, fast end
className="ease-linear"        // constant speed

// Property
className="transition-colors"  // animate color only
className="transition-transform" // animate position/scale only
className="transition-shadow"  // animate shadow only
className="transition-all"     // animate all properties
```

### Motion Utilities

```tsx
// Delay between animations
className="delay-100"  // 100ms
className="delay-200"  // 200ms
className="delay-300"  // 300ms

// Transform
className="hover:scale-105"        // Grow on hover
className="hover:translate-y-[-2px]" // Lift on hover
className="active:scale-95"        // Shrink on click
```

### Custom Animations

Use keyframes defined in tailwind.config.ts:

```tsx
// Fade in
<div className="opacity-0 animate-fade-in">Fades in</div>

// Slide up
<div className="translate-y-5 opacity-0 animate-slide-up">Slides up</div>

// Scale in
<div className="scale-95 opacity-0 animate-scale">Scales in</div>

// Bounce (gentle)
<div className="animate-bounce-gentle">Bounces gently</div>

// Pulse
<div className="animate-pulse-subtle">Pulses subtly</div>
```

### CSS-in-JS Example

```tsx
import styled from 'styled-components';

const AnimatedCard = styled.div`
  transition: all 200ms ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 34px rgba(0, 19, 96, 0.14);
  }
`;
```

---

## Animation Best Practices

### Staggered Animations

Animate items sequentially for visual interest.

```tsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in"
    style={{
      animationDelay: `${index * 100}ms`
    }}
  >
    {item}
  </div>
))}
```

### Coordination

Coordinate related animations for cohesion.

```tsx
// All elements use same timing
const ANIMATION_DURATION = 200;

<div className="transition-all duration-200">
  <Button className="transition-all duration-200">
    Coordinated animation
  </Button>
</div>
```

### Performance

Use `transform` and `opacity` for smooth 60fps animations.

```tsx
// Good - GPU accelerated
className="hover:scale-105 transition-transform"
className="opacity-0 transition-opacity"

// Avoid - causes layout recalculation
className="hover:width-full transition-width"
```

---

## Respects User Preferences

### prefers-reduced-motion

Disable animations for users who prefer reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### React Hook

Check user preference in React:

```tsx
function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReduced;
}

// Usage
function AnimatedComponent() {
  const prefersReduced = useReducedMotion();
  
  return (
    <div 
      className={prefersReduced ? '' : 'animate-fade-in'}
    >
      Content
    </div>
  );
}
```

---

## Motion Checklist

Use this checklist when implementing animations:

- [ ] **Timing**: All animations are 180-250ms (never >500ms)
- [ ] **Easing**: Uses appropriate easing (ease-in-out default)
- [ ] **Purpose**: Every animation has a clear reason
- [ ] **Consistency**: Timing matches other animations
- [ ] **Performance**: Uses transform/opacity (not width/height)
- [ ] **Accessible**: Respects prefers-reduced-motion
- [ ] **Not jarring**: Animations feel smooth and natural
- [ ] **Tested**: Animations work on mobile and slow devices
- [ ] **Feedback**: Users know action was received
- [ ] **Not distracting**: Animations don't overwhelm content

---

## Avoid

These animation patterns hurt UX and should never be used:

```tsx
// Avoid - bouncing animations feel unprofessional
className="animate-bounce"

// Avoid - multiple animations at once
<div className="animate-fade-in animate-slide-up animate-scale">
  Too many animations
</div>

// Avoid - long delays that feel broken
<div style={{ animationDelay: '2s' }}>
  Delayed animation
</div>

// Avoid - linear easing feels mechanical
className="transition-all duration-200 ease-linear"

// Avoid - infinite loops cause motion sickness
className="animate-spin-slow"

// Avoid - auto-playing animations user can't stop
<div className="animate-pulse-subtle animate-bounce-infinite">
  Can't stop this
</div>
```

---

## Resources

- [Tailwind Animation Docs](https://tailwindcss.com/docs/animation)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [Material Design Motion](https://material.io/design/motion/)
- [Prefers Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

**Last Updated**: 2026-07-06
**Related Documents**:
- [Component Library](../components/COMPONENT_LIBRARY.md)
- [Accessibility Guide](ACCESSIBILITY.md)
