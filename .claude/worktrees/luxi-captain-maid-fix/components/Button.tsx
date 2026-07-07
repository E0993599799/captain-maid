'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';

/**
 * Button component with multiple size and style variants
 * Uses captain colors and follows design system specifications
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center font-heading font-semibold rounded-[24px] transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-captain-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95',
  {
    variants: {
      variant: {
        // Primary: aqua with white text, dark hover state
        primary:
          'bg-captain-primary text-white hover:bg-captain-dark shadow-brand hover:shadow-brand-hover',
        // Secondary: light blue with text, soft hover state
        secondary:
          'bg-captain-light text-captain-text hover:bg-captain-accent shadow-sm hover:shadow-md border border-captain-border',
        // Ghost: transparent, hover with soft background
        ghost:
          'text-captain-text hover:bg-captain-soft border border-transparent focus-visible:border-captain-primary',
        // Danger: red-based button for destructive actions
        danger:
          'bg-semantic-error text-white hover:bg-red-700 shadow-brand hover:shadow-brand-hover',
      },
      size: {
        // Extra small: 32px height
        xs: 'h-8 px-3 text-xs gap-1.5',
        // Small: 36px height
        sm: 'h-9 px-3 text-sm gap-2',
        // Medium: 44px height (standard)
        md: 'h-11 px-4 text-base gap-2',
        // Large: 52px height
        lg: 'h-13 px-6 text-lg gap-2',
        // Extra large: 60px height
        xl: 'h-15 px-8 text-xl gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner and disable button */
  isLoading?: boolean;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Icon position relative to children */
  iconPosition?: 'left' | 'right';
  /** Whether button is disabled */
  isDisabled?: boolean;
}

/**
 * Button component
 * @example
 * <Button size="md" variant="primary">Shop Now</Button>
 * <Button size="lg" variant="secondary" isLoading={loading}>Loading...</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      icon,
      iconPosition = 'right',
      children,
      disabled,
      isDisabled = false,
      ...props
    },
    ref
  ) => {
    const isButtonDisabled = disabled || isDisabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isButtonDisabled}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            {children && <span>{children}</span>}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
