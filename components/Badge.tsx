'use client';

import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size variant */
  size?: 'sm' | 'md';
  /** Color variant */
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

/**
 * Badge component for small labels and tags
 * Supports multiple color variants with border-radius-pill
 * @example
 * <Badge variant="primary" size="md">New</Badge>
 * <Badge variant="success">In Stock</Badge>
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className = '',
      size = 'md',
      variant = 'primary',
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs font-medium',
      md: 'px-3 py-1.5 text-sm font-semibold',
    };

    const variantClasses = {
      primary: 'bg-captain-primary text-white',
      success: 'bg-semantic-success text-white',
      warning: 'bg-semantic-warning text-captain-text',
      error: 'bg-semantic-error text-white',
      info: 'bg-semantic-info text-white',
    };

    return (
      <span
        ref={ref}
        className={`
          inline-flex
          items-center
          justify-center
          rounded-[999px]
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          transition-all duration-180
          ${className}
        `}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
