/**
 * Captain Maid Design System - Design Tokens
 * 
 * This file exports all design tokens for the Captain Maid brand.
 * Use these tokens to maintain consistency across components and sections.
 */

/**
 * Core Color Tokens
 * All colors defined in the Captain Maid brand palette
 */
export const CAPTAIN_COLORS = {
  /** Primary brand aqua color - main CTA, highlights, logo background */
  primary: '#02A6E3',
  
  /** Soft blue surface color - large background surfaces, hero wash */
  accent: '#90D0F0',
  
  /** Pale card blue - product cards, soft panels */
  light: '#B0D0F0',
  
  /** Hover state and deeper emphasis */
  dark: '#1070B0',
  
  /** Deep navy - main headings, navigation text, important content */
  text: '#001360',
  
  /** Muted gray-blue - supporting copy, helper text, metadata */
  muted: '#506090',
  
  /** Pure white - button text, clean contrast, negative space */
  white: '#FFFFFF',
  
  /** Subtle border color for cards and sections */
  border: '#D9EAF6',
  
  /** Soft pale background for sections and cards */
  soft: '#EAF6FD',
  
  /** Semantic error color for validation and alerts */
  error: '#E53E3E',
  
  /** Semantic success color for confirmations */
  success: '#38A169',
  
  /** Semantic warning color for cautions */
  warning: '#ECC94B',
  
  /** Semantic info color for informational messages */
  info: '#3182CE',
} as const;

/**
 * Typography Tokens
 * Font families and type scales for consistent typography
 */
export const CAPTAIN_TYPOGRAPHY = {
  // Font Families
  fontFamily: {
    /** Poppins - for headings and strong emphasis */
    heading: '"Poppins", "Noto Sans Thai", sans-serif',
    
    /** Montserrat - for body text and labels */
    body: '"Montserrat", "Noto Sans Thai", sans-serif',
    
    /** Monotype Corsiva - decorative accent only */
    accent: '"Monotype Corsiva", cursive',
  },

  // Font Sizes (Type Scale)
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },

  // Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    snug: 1.3,
    normal: 1.4,
    relaxed: 1.5,
    loose: 1.6,
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.5px',
    normal: '0px',
    wide: '0.5px',
  },
} as const;

/**
 * Spacing Scale Tokens
 * Consistent spacing values for margins, padding, and gaps
 */
export const CAPTAIN_SPACING = {
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space8: '32px',
  space10: '40px',
  space12: '48px',
  space16: '64px',
  space20: '80px',
} as const;

/**
 * Border Radius Tokens
 * Rounded corners for cards, buttons, and other components
 */
export const CAPTAIN_RADIUS = {
  /** Small radius - 10px - subtle rounding */
  sm: '10px',
  
  /** Medium radius - 16px - standard rounding for cards */
  md: '16px',
  
  /** Large radius - 24px - prominent cards and sections */
  lg: '24px',
  
  /** Extra large radius - 32px - hero sections and large elements */
  xl: '32px',
  
  /** Pill shape - 999px - buttons and badges */
  pill: '999px',
} as const;

/**
 * Shadow Tokens
 * Soft, subtle shadows for depth and elevation
 */
export const CAPTAIN_SHADOWS = {
  /** Brand shadow - primary shadow throughout the design system */
  brand: '0 10px 30px rgba(0, 19, 96, 0.12)',
  
  /** Brand hover shadow - elevated state for interactive elements */
  brandHover: '0 14px 34px rgba(0, 19, 96, 0.14)',
  
  /** Soft shadow - very subtle elevation */
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  
  /** Medium shadow - standard elevation */
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  
  /** Large shadow - prominent elevation */
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
} as const;

/**
 * Transition Tokens
 * Smooth animation timings for micro-interactions
 */
export const CAPTAIN_TRANSITIONS = {
  /** Quick transition - 180ms */
  fast: '180ms ease',
  
  /** Standard transition - 200ms */
  standard: '200ms ease',
  
  /** Slower transition - 300ms */
  slow: '300ms ease',
  
  /** Very slow transition - 400ms */
  slower: '400ms ease',
  
  // Easing Functions
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

/**
 * Container and Layout Tokens
 * Standard measurements for layout consistency
 */
export const CAPTAIN_LAYOUT = {
  containerMaxWidth: '1200px',
  
  /** Standard container padding on mobile */
  containerPaddingMobile: '20px',
  
  /** Standard container padding on tablet */
  containerPaddingTablet: '32px',
  
  /** Standard container padding on desktop */
  containerPaddingDesktop: '48px',

  // Breakpoints
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    large: '1280px',
  },
} as const;

/**
 * Gradient Tokens
 * Pre-defined gradients for consistent visual effects
 */
export const CAPTAIN_GRADIENTS = {
  /** Primary hero gradient - soft to bright aqua */
  hero: 'linear-gradient(135deg, #EAF6FD 0%, #90D0F0 40%, #02A6E3 100%)',
  
  /** Dark gradient - for CTA sections */
  dark: 'linear-gradient(135deg, #001360 0%, #1070B0 55%, #02A6E3 100%)',
  
  /** Soft gradient - for subtle backgrounds */
  soft: 'linear-gradient(180deg, #FFFFFF 0%, #EAF6FD 100%)',
} as const;

/**
 * Semantic Token Mappings
 * Semantic use of colors for various contexts
 */
export const CAPTAIN_SEMANTIC = {
  background: CAPTAIN_COLORS.white,
  foreground: CAPTAIN_COLORS.text,
  
  surface: CAPTAIN_COLORS.accent,
  surfaceSoft: CAPTAIN_COLORS.soft,
  surfaceCard: CAPTAIN_COLORS.light,
  
  primary: CAPTAIN_COLORS.primary,
  primaryHover: CAPTAIN_COLORS.dark,
  primaryForeground: CAPTAIN_COLORS.white,
  
  secondary: CAPTAIN_COLORS.white,
  secondaryForeground: CAPTAIN_COLORS.text,
  
  muted: CAPTAIN_COLORS.muted,
  border: CAPTAIN_COLORS.border,
  
  error: CAPTAIN_COLORS.error,
  success: CAPTAIN_COLORS.success,
  warning: CAPTAIN_COLORS.warning,
  info: CAPTAIN_COLORS.info,
} as const;

/**
 * Complete Design System Export
 * All tokens organized by category
 */
export const CAPTAIN_DESIGN_SYSTEM = {
  colors: CAPTAIN_COLORS,
  typography: CAPTAIN_TYPOGRAPHY,
  spacing: CAPTAIN_SPACING,
  radius: CAPTAIN_RADIUS,
  shadows: CAPTAIN_SHADOWS,
  transitions: CAPTAIN_TRANSITIONS,
  layout: CAPTAIN_LAYOUT,
  gradients: CAPTAIN_GRADIENTS,
  semantic: CAPTAIN_SEMANTIC,
} as const;

// Type exports for TypeScript usage
export type CaptainColor = typeof CAPTAIN_COLORS;
export type CaptainTypography = typeof CAPTAIN_TYPOGRAPHY;
export type CaptainSpacing = typeof CAPTAIN_SPACING;
export type CaptainRadius = typeof CAPTAIN_RADIUS;
export type CaptainShadows = typeof CAPTAIN_SHADOWS;
export type CaptainTransitions = typeof CAPTAIN_TRANSITIONS;
export type CaptainLayout = typeof CAPTAIN_LAYOUT;
export type CaptainGradients = typeof CAPTAIN_GRADIENTS;
export type CaptainSemantic = typeof CAPTAIN_SEMANTIC;
export type CaptainDesignSystem = typeof CAPTAIN_DESIGN_SYSTEM;
