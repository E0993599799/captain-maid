'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: 'light' | 'subtle';
  /** Whether the card is clickable */
  clickable?: boolean;
  /** Hover effect lift amount in pixels */
  hoverLift?: boolean;
}

/**
 * Card component with light blue surface and elevation effects
 * Uses captain-light (#B0D0F0) background with customizable variants
 * @example
 * <Card variant="light">
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = '',
      variant = 'light',
      clickable = false,
      hoverLift = true,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      light: 'bg-captain-light border border-captain-border',
      subtle: 'bg-captain-soft border border-captain-border',
    };

    return (
      <div
        ref={ref}
        className={`
          rounded-[24px]
          p-6
          shadow-brand
          transition-all duration-180
          ${variantClasses[variant]}
          ${
            clickable
              ? 'cursor-pointer hover:shadow-brand-hover'
              : ''
          }
          ${
            hoverLift
              ? 'hover:-translate-y-1'
              : ''
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
