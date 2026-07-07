'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-500 shadow-md hover:shadow-lg active:scale-95',
        secondary:
          'bg-teal-100 text-teal-700 hover:bg-teal-200 focus:ring-teal-500 dark:bg-teal-900 dark:text-teal-100',
        ghost:
          'text-teal-700 hover:bg-teal-50 focus:ring-teal-500 dark:text-teal-400 dark:hover:bg-teal-900/30',
      },
      size: {
        sm: 'h-9 px-3 text-sm gap-2',
        md: 'h-10 px-4 text-base gap-2',
        lg: 'h-12 px-6 text-lg gap-2',
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
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      icon,
      iconPosition = 'right',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {loading ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            {children}
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
