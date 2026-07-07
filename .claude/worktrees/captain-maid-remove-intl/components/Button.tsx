'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-teal-600 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 shadow-md hover:shadow-lg',
    secondary: 'bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:border-neutral-700',
    ghost: 'bg-transparent text-teal-700 border border-teal-700 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-950',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-3',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="animate-spin mr-2">⏳</span>
          Loading...
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
