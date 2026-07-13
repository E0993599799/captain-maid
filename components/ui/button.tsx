import React from 'react';
import { colors } from '@/lib/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded transition-all duration-250';

  const variants = {
    primary: `bg-[${colors.primary.bright}] text-white hover:bg-[${colors.primary.mid}] hover:-translate-y-0.5 shadow-md hover:shadow-lg`,
    default: `bg-[${colors.primary.bright}] text-white hover:bg-[${colors.primary.mid}] hover:-translate-y-0.5 shadow-md hover:shadow-lg`,
    secondary: `border-2 border-[${colors.primary.bright}] text-[${colors.primary.bright}] hover:bg-[${colors.primary.bright}] hover:text-white`,
    outline: `border-2 border-[${colors.primary.bright}] text-[${colors.primary.bright}] hover:bg-[${colors.primary.bright}] hover:text-white`,
    ghost: `text-[${colors.secondary.bright}] hover:text-[${colors.primary.bright}]`,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
