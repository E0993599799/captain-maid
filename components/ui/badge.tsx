import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-captain-primary text-white',
  secondary: 'bg-captain-soft text-captain-text',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-900',
  info: 'bg-sky-100 text-sky-900',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export function Badge({ variant = 'secondary', size = 'md', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-semibold',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}
