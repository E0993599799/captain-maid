# Form Validation Guide

## Form Validation Strategy

The Captain Maid form validation system follows modern UX practices that balance real-time feedback with preventing input frustration.

### Validation Timing

**Real-Time Validation (On Blur)**
Validates when user leaves a field, providing feedback after they've finished typing.

```tsx
<FormInput 
  label="Email"
  type="email"
  onBlur={(e) => {
    if (!isValidEmail(e.target.value)) {
      setError('Invalid email format');
    }
  }}
/>
```

**Field-Level Error States**
Shows error message below the field with visual indicators.

```tsx
<FormInput 
  label="Email"
  error="Please enter a valid email address"
/>
```

**Form-Level Validation on Submit**
Validates all fields when user clicks submit button.

```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate all fields
  const errors = validateForm(formData);
  
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  
  // Submit valid form
  await submitForm(formData);
};
```

### Error Message UX Patterns

**Specific Messages**
Tell users exactly what's wrong.

```tsx
// Good
error="Email must be in format: name@example.com"
error="Password must be at least 8 characters"

// Avoid
error="Invalid"
error="Error"
```

**Actionable Guidance**
Help users fix the problem.

```tsx
// Good
error="Enter 10-digit phone number (555) 123-4567"
error="Password needs uppercase letter, number, and symbol"

// Avoid
error="Invalid input"
error="Try again"
```

---

## Required Field Indicators

### Visual Indicators

#### Red Asterisk (*)
Shows which fields are mandatory.

```tsx
<FormInput 
  label="Email Address"
  required
  // Renders: "Email Address *" with * in red
/>
```

#### Optional Badge
For mostly-required forms, label optional fields instead.

```tsx
<FormInput 
  label="Company Name"
  // Optional element added if most fields are required
/>
```

#### Validation Hints
Provide format guidance above the input.

```tsx
<div>
  <label className="text-label text-captain-text">
    Phone Number
    <span className="text-semantic-error">*</span>
  </label>
  <p className="text-body-sm text-captain-muted mb-2">
    Format: (555) 123-4567
  </p>
  <FormInput 
    type="tel"
    placeholder="(555) 123-4567"
  />
</div>
```

---

## Input States

### Empty / Placeholder

Default state with placeholder text guiding input.

```tsx
<FormInput 
  label="Search products..."
  placeholder="Type product name or category"
/>
```

**Styling**:
- Border: captain-border (light gray-blue)
- Text: captain-muted (secondary gray)
- Background: white
- Focus ring: 2px captain-primary/30

### Filled / Valid

User has entered valid data.

```tsx
<FormInput 
  label="Email"
  value="user@example.com"
  // Visual feedback: green checkmark or border-success
/>
```

### Error / Invalid

User has entered invalid data.

```tsx
<FormInput 
  label="Email"
  value="invalid"
  error="Invalid email format"
/>
```

**Styling**:
- Border: 2px semantic-error (red)
- Error text: semantic-error
- Focus ring: semantic-error/30
- Background: white (no tint)

### Disabled / Readonly

Field is not editable, grayed out.

```tsx
<FormInput 
  label="Confirmation Number"
  value="CM-2024-001234"
  disabled
/>
```

**Styling**:
- Background: captain-soft (very light blue)
- Text: captain-muted
- Border: captain-border
- Cursor: not-allowed

### Loading (Autocomplete)

Showing loading spinner while fetching suggestions.

```tsx
<FormInput 
  label="Search Cities"
  isLoading={true}
  // Spinner appears on right side
/>
```

---

## Error Messages

### Message Placement

Error messages appear directly below the input field.

```tsx
<FormInput 
  label="Password"
  error="Password must be at least 8 characters"
/>
// Error renders as <p> below input
```

### Message Timing

Show errors:
1. After user leaves field (blur event)
2. On form submission
3. When user re-enters field after error

Clear errors:
1. When user starts editing after error
2. After successful submission

### Message Specificity

**Specific Errors** (Good)
```tsx
errors = {
  email: "Email must be in format: name@example.com",
  password: "Password must contain uppercase, number, and symbol",
  terms: "You must accept terms and conditions"
}
```

**Generic Errors** (Avoid)
```tsx
errors = {
  email: "Invalid",
  password: "Invalid",
  terms: "Invalid"
}
```

---

## Success States

### Visual Indicators

Green checkmark or success badge shows completed field.

```tsx
<FormInput 
  label="Email Verified"
  value="user@example.com"
  disabled
/>
<p className="text-semantic-success text-sm mt-2">
  ✓ Email verified
</p>
```

### Success Toast

Brief notification confirms successful submission.

```tsx
// Show 2-second success message
showToast({
  type: 'success',
  message: 'Order placed successfully!',
  duration: 2000
});
```

### Cleared on Edit

Success state is cleared when user edits the field again.

```tsx
const [showSuccess, setShowSuccess] = useState(true);

const handleChange = () => {
  setShowSuccess(false); // Clear success indicator
};
```

---

## Form Group Styling

### Section Headings

Group related fields with clear section headings.

```tsx
<form>
  {/* Section 1 */}
  <h3 className="text-h4 mb-6">Contact Information</h3>
  <FormInput label="Full Name" required />
  <FormInput label="Email" type="email" required />
  
  {/* Section 2 */}
  <h3 className="text-h4 mb-6 mt-8">Shipping Address</h3>
  <FormInput label="Street Address" required />
  <FormInput label="City" required />
</form>
```

### Related Fields Grouped

Visually group related fields with spacing.

```tsx
<div className="grid grid-cols-2 gap-4">
  <FormInput label="First Name" required />
  <FormInput label="Last Name" required />
</div>

<div className="grid grid-cols-3 gap-4">
  <FormInput label="Month" placeholder="MM" required />
  <FormInput label="Year" placeholder="YYYY" required />
  <FormInput label="CVV" type="password" required />
</div>
```

### Consistent Spacing

Use 24px spacing between form groups.

```tsx
<form className="space-y-6">
  <FormInput label="Email" />
  {/* 24px gap */}
  <FormInput label="Password" />
  {/* 24px gap */}
  <Button>Submit</Button>
</form>
```

---

## Mobile Form UX

### Full-Width Inputs

All form inputs are full-width on mobile.

```tsx
<FormInput 
  label="Email"
  className="w-full"
/>
```

### Native Keyboards

Use correct input types to trigger native keyboards.

```tsx
// Email keyboard (@ symbol visible)
<FormInput type="email" />

// Phone keyboard (numbers + * # visible)
<FormInput type="tel" />

// URL keyboard (/ .com visible)
<FormInput type="url" />

// Number keyboard
<FormInput type="number" />
```

### Avoid Covering Inputs

Position fixed elements to not cover inputs when keyboard appears.

```css
/* Don't use fixed positioning for form content */
.form-container {
  position: relative; /* Allow keyboard to push content up */
}
```

### Touch-Friendly Sizes

Ensure minimum 44px height for touch targets.

```tsx
<FormInput 
  label="Email"
  // Input has h-11 (44px) by default
/>
```

---

## Examples

### Login Form

```tsx
import { useState } from 'react';
import { FormInput, Button } from '@/components';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const newErrors = {};
    if (!email.includes('@')) {
      newErrors.email = 'Email must be valid';
    }
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setErrors({ submit: 'Login failed. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput 
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />

      <FormInput 
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />

      {errors.submit && (
        <p className="text-semantic-error text-sm">{errors.submit}</p>
      )}

      <Button 
        variant="primary" 
        size="md" 
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  );
}
```

### Product Order Form

```tsx
import { useState } from 'react';
import { FormInput, FormSelect, Button } from '@/components';

export function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    quantity: 1,
    address: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user edits
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.product) newErrors.product = 'Please select a product';
    if (formData.quantity < 1) newErrors.quantity = 'Quantity must be at least 1';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit order
    await submitOrder(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-h2">Place Your Order</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          label="Full Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          required
        />

        <FormInput 
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <FormSelect
        label="Product"
        options={[
          { value: 'glass-cleaner', label: 'Glass Cleaner Spray' },
          { value: 'floor-cleaner', label: 'Floor Cleaner' },
          { value: 'disinfectant', label: 'Disinfectant Wipes' },
        ]}
        value={formData.product}
        onChange={(e) => handleChange('product', e.target.value)}
        error={errors.product}
        required
      />

      <FormInput 
        label="Quantity"
        type="number"
        min="1"
        value={formData.quantity}
        onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
        error={errors.quantity}
        required
      />

      <FormInput 
        label="Shipping Address"
        value={formData.address}
        onChange={(e) => handleChange('address', e.target.value)}
        placeholder="Street address, city, state, zip"
        required
      />

      <Button 
        variant="primary" 
        size="lg" 
        type="submit"
        className="w-full"
      >
        Complete Order
      </Button>
    </form>
  );
}
```

### Contact Form

```tsx
import { useState } from 'react';
import { FormInput, Button } from '@/components';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submit failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-semantic-success/10 rounded-lg">
        <p className="text-semantic-success font-semibold">
          Thank you! We received your message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput 
        label="Your Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
      />

      <FormInput 
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        required
      />

      <FormInput 
        label="Subject"
        value={formData.subject}
        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
        required
      />

      <div>
        <label className="text-label font-semibold text-captain-text mb-2">
          Message
        </label>
        <textarea 
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full p-4 rounded-lg border-2 border-captain-border"
          rows={6}
          required
        />
      </div>

      <Button 
        variant="primary" 
        size="lg" 
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        Send Message
      </Button>
    </form>
  );
}
```

---

## Testing Checklist

Use this checklist to test all form states and scenarios:

- [ ] **Empty states**: Form displays correctly with all fields empty
- [ ] **Filled states**: All data is captured correctly when user enters text
- [ ] **Required indicators**: Required fields show `*` symbol
- [ ] **Error messages**: Error messages display below each invalid field
- [ ] **Error styling**: Error fields have red border and red error text
- [ ] **Success states**: Successful submission shows confirmation message
- [ ] **Disabled states**: Disabled fields are grayed out and not editable
- [ ] **Focus rings**: Focus rings are visible on all inputs (2px captain-primary)
- [ ] **Keyboard navigation**: Tab moves between fields in correct order
- [ ] **Mobile keyboard**: Type="email" shows email keyboard, type="tel" shows phone keyboard
- [ ] **Mobile layout**: Form inputs are full-width on mobile
- [ ] **Touch targets**: All inputs are at least 44px tall for mobile
- [ ] **Validation timing**: Error messages appear on blur, not while typing
- [ ] **Clear errors**: Errors clear when user starts editing
- [ ] **Dark mode**: All form states are readable in dark mode
- [ ] **Loading state**: Loading spinner appears during submission
- [ ] **Accessibility**: Form can be used with keyboard only
- [ ] **Screen reader**: Screen reader announces errors and labels
- [ ] **Password fields**: Password input type masks text
- [ ] **Number fields**: Number inputs accept only numeric input

---

**Last Updated**: 2026-07-06
**Related Documents**: 
- [Component Library](../components/COMPONENT_LIBRARY.md)
- [Accessibility Guide](ACCESSIBILITY.md)
