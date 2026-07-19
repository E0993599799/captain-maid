import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        captain: {
          blue: 'var(--color-brand-blue)',
          'blue-dark': 'var(--color-brand-blue-dark)',
          'blue-light': 'var(--color-brand-blue-light)',
          cream: 'var(--color-surface-muted)',
          'cream-dark': '#16324F',
          light: 'var(--color-surface)',
          yellow: 'var(--color-brand-yellow)',
          'yellow-hover': '#D99A00',
          neutral: 'var(--color-text-muted)',
          'neutral-light': '#6D8191',
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          text: 'var(--color-text)',
          'text-light': 'var(--color-text-muted)',
          border: 'var(--color-border)',
          danger: 'var(--color-danger)',
        },
      },
      fontFamily: {
        // Roboto owns Latin glyphs; Thai naturally falls through to the
        // regular-only Noto Sans Thai face loaded by the root layout.
        serif: [
          'var(--font-english)',
          'var(--font-thai)',
          'Roboto',
          '"Noto Sans Thai"',
          'sans-serif',
        ],
        sans: [
          'var(--font-english)',
          'var(--font-thai)',
          'Roboto',
          '"Noto Sans Thai"',
          'sans-serif',
        ],
        mono: ['"Courier New"', 'monospace'],
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '3rem',
        xl: '4.5rem',
        '2xl': '6rem',
      },
      keyframes: {
        'header-slide-down': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'header-slide-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'header-slide-down': 'header-slide-down 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        'header-slide-up': 'header-slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
      maxWidth: {
        container: '1200px',
        prose: '65ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      borderRadius: {
        sm: '2px',
      },
    },
  },
  plugins: [
  ],
}

export default config
