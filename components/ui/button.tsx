'use client';

import React from 'react';

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-captain-primary text-white hover:bg-captain-dark',
  outline: 'border border-captain-border bg-white text-captain-text hover:bg-captain-soft',
  secondary: 'bg-captain-soft text-captain-text hover:bg-captain-accent',
  ghost: 'bg-transparent text-captain-text hover:bg-captain-soft',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  variant = 'default',
  size = 'md',
  asChild = false,
  className = '',
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'cursor-not-allowed opacity-50' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      className: [children.props.className, classes].filter(Boolean).join(' '),
      onClick: (event: React.MouseEvent) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        children.props.onClick?.(event);
        onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
      },
      'aria-disabled': disabled || undefined,
      ...props,
    });
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
