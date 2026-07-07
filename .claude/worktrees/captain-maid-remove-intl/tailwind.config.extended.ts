import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Extended Color Palette
      colors: {
        // Primary Brand Colors (Teal)
        teal: {
          50: '#f0fffe',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },

        // Emerald Green (Success/CTA)
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },

        // Neutral Colors
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716f',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },

        // Semantic Colors
        success: {
          light: '#6ee7b7',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        warning: {
          light: '#fcd34d',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        info: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1d4ed8',
        },

        // Captain Maid Brand
        captain: {
          dark: '#0f766e',
          light: '#ffffff',
          accent: '#14b8a6',
          success: '#10b981',
        },
      },

      // Extended Typography
      fontSize: {
        // Headings
        'h1': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        // Labels
        'label': ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        'label-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },

      // Extended Spacing
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      // Extended Border Radius
      borderRadius: {
        'xs': '0.375rem',
        'sm': '0.5rem',
        'base': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
      },

      // Extended Shadows
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'elevation': '0 25px 50px -12px rgba(15, 118, 110, 0.15)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'none': 'none',
      },

      // Extended Animations
      animation: {
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'bounce-slow': 'bounceSlow 2s infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-pulse': 'scalePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // Keyframes for animations
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },

      // Extended Transition
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      // Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },

      // Gradient Angle
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // Container
      maxWidth: {
        'container': '1200px',
      },
    },
  },

  // Plugins for additional utilities
  plugins: [
    // Custom focus-visible plugin
    function ({ addUtilities }: any) {
      addUtilities({
        '.focus-visible-outline': {
          '@apply focus:outline-2 focus:outline-offset-2 focus:outline-teal-600': {},
        },
        '.transition-smooth': {
          '@apply transition-all duration-300 ease-out': {},
        },
        '.text-gradient': {
          '@apply bg-gradient-to-r bg-clip-text text-transparent': {},
        },
        '.shadow-elevated': {
          '@apply shadow-2xl dark:shadow-2xl dark:shadow-black/50': {},
        },
      });
    },
  ],

  // Dark mode configuration
  darkMode: 'class',
};

export default config;
