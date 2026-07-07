import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Color System — Captain Maid Brand Palette
      colors: {
        // Captain Maid Core Colors (Updated - Blue tone, improved contrast)
        captain: {
          primary: '#0066CC',    // vibrant captain blue (CTA, primary actions)
          accent: '#5B9FFF',     // bright sky blue (hover states, accents)
          light: '#E3F2FD',      // pale sky blue (card backgrounds, light surfaces)
          dark: '#003D99',       // deep navy blue (headings, footer, dark states)
          text: '#0A1E4D',       // dark blue text (excellent contrast on white)
          muted: '#5B7FA6',      // muted blue-gray (secondary text, hints)
          white: '#FFFFFF',      // white highlights
          border: '#B3D9FF',     // soft blue borders (subtle division lines)
          soft: '#F0F7FF',       // very soft blue background (light sections)
        },
        // New Captain Maid Brand Colors (UXCam-inspired)
        cm: {
          // Primary Colors
          'primary-blue': '#0057B8',      // Captain Blue (CTA, headline accent)
          'navy': '#063A78',               // Deep Navy (headings, footer)
          'fresh-green': '#21A85B',        // Fresh Green (nature, clean, eco)
          'mint': '#E8F8EF',               // Soft Mint (light bg)
          'sky-light': '#EAF5FF',          // Light Sky Blue (card backgrounds)
          'sparkle': '#FFD84D',            // Sparkle Yellow (badges, promotion)

          // Neutral
          'text-primary': '#102033',
          'text-secondary': '#506175',
          'border-soft': '#DCEAF5',
          'surface-light': '#F7FBFF',
          'white': '#FFFFFF',
        },
        // Semantic Colors
        semantic: {
          error: '#E53E3E',
          success: '#38A169',
          warning: '#ECC94B',
          info: '#3182CE',
        },
      },

      // Typography — Captain Maid Essentials
      fontFamily: {
        'heading': ['Poppins', 'Noto Sans Thai', 'sans-serif'],
        'body': ['Montserrat', 'Noto Sans Thai', 'sans-serif'],
        'accent': ['"Monotype Corsiva"', 'cursive'],
      },

      fontSize: {
        'h1': ['54px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['42px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
        'h4': ['24px', { lineHeight: '1.4', fontWeight: '700' }],
        'h5': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'h6': ['18px', { lineHeight: '1.5', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.5', fontWeight: '600' }],
      },

      // Height System - for buttons and form inputs
      height: {
        '11': '44px',  // md button height
        '13': '52px',  // lg button height
        '15': '60px',  // xl button height
      },

      // Spacing System
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '20px',
        'space-6': '24px',
        'space-8': '32px',
        'space-10': '40px',
        'space-12': '48px',
        'space-16': '64px',
        'space-20': '80px',
      },

      // Border Radius
      borderRadius: {
        'radius-sm': '10px',
        'radius-md': '16px',
        'radius-lg': '24px',
        'radius-xl': '32px',
        'radius-pill': '999px',
      },

      // Box Shadows — Captain Maid Soft Shadows
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'brand': '0 10px 30px rgba(0, 19, 96, 0.12)',
        'brand-hover': '0 14px 34px rgba(0, 19, 96, 0.14)',
      },

      // Animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'sparkle': 'sparkle 2.4s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
      },

      // Transitions
      transitionDuration: {
        '180': '180ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
      },

      // Backdrop
      backdropBlur: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
};

export default config;
