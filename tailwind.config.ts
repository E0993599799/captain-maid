import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Color System — Captain Maid Brand Palette
      colors: {
        // Captain Maid Core Colors
        captain: {
          primary: '#02A6E3',    // main aqua / logo background
          accent: '#90D0F0',     // soft blue surface
          light: '#B0D0F0',      // pale card / section blue
          dark: '#1070B0',       // hover / deeper blue
          text: '#001360',       // deep navy text
          muted: '#506090',      // secondary text
          white: '#FFFFFF',      // white highlights
          border: '#D9EAF6',     // subtle borders
          soft: '#EAF6FD',       // soft background
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
