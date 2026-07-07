'use client';

import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text below input */
  helperText?: string;
  /** Whether field is required */
  required?: boolean;
  /** Input type */
  type?: string;
}

/**
 * Form input component with 44px height minimum
 * Supports error states, labels, and helper text
 * @example
 * <FormInput label="Email" type="email" required />
 * <FormInput label="Name" error="This field is required" />
 */
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className = '',
      label,
      error,
      helperText,
      required = false,
      type = 'text',
      placeholder,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-captain-text mb-2"
          >
            {label}
            {required && <span className="text-semantic-error ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full h-11 px-4 py-2.5
            font-body text-base
            rounded-[16px]
            border-2 transition-all duration-180
            ${
              error
                ? 'border-semantic-error focus:border-semantic-error'
                : 'border-captain-border focus:border-captain-primary'
            }
            ${disabled ? 'bg-captain-soft text-captain-muted cursor-not-allowed' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${error ? 'focus:ring-semantic-error/30' : 'focus:ring-captain-primary/30'}
            placeholder:text-captain-muted
            ${className}
          `}
          {...props}
        />

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

FormInput.displayName = 'FormInput';

export { FormInput };
