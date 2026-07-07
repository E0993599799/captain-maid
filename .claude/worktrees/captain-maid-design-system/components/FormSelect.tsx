'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Select label */
  label?: string;
  /** Array of options */
  options: SelectOption[];
  /** Error message to display */
  error?: string;
  /** Helper text below select */
  helperText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether field is required */
  required?: boolean;
}

/**
 * Form select (dropdown) component with 44px height
 * Features chevron icon inside and full design system styling
 * @example
 * <FormSelect
 *   label="Color"
 *   options={[{ value: 'red', label: 'Red' }]}
 *   required
 * />
 */
const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      className = '',
      label,
      options,
      error,
      helperText,
      placeholder,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-captain-text mb-2"
          >
            {label}
            {required && <span className="text-semantic-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={`
              w-full h-11 px-4 py-2.5 pr-10
              font-body text-base
              rounded-[16px]
              border-2 transition-all duration-180
              appearance-none
              ${
                error
                  ? 'border-semantic-error focus:border-semantic-error'
                  : 'border-captain-border focus:border-captain-primary'
              }
              ${disabled ? 'bg-captain-soft text-captain-muted cursor-not-allowed' : 'bg-white text-captain-text'}
              focus:outline-none focus:ring-2 focus:ring-offset-0
              ${error ? 'focus:ring-semantic-error/30' : 'focus:ring-captain-primary/30'}
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown
              size={20}
              className={`${error ? 'text-semantic-error' : 'text-captain-muted'}`}
            />
          </div>
        </div>

        {error && (
          <p className="mt-2 text-sm font-medium text-semantic-error">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-2 text-sm text-captain-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export { FormSelect };
