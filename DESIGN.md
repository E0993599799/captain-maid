---
version: alpha
name: Captain Maid
description: Bright aqua cleaning brand for Thai households. Clean, trustworthy, product-led, mobile-first, and conversion-focused.
colors:
  primary: "#02A6E3"
  secondary: "#90D0F0"
  tertiary: "#1070B0"
  neutral: "#FFFFFF"
  surface: "#EAF6FD"
  surfaceCard: "#B0D0F0"
  text: "#001360"
  muted: "#506090"
  border: "#D9EAF6"
typography:
  h1:
    fontFamily: "Poppins, Noto Sans Thai, sans-serif"
    fontSize: 54px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Poppins, Noto Sans Thai, sans-serif"
    fontSize: 42px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Poppins, Noto Sans Thai, sans-serif"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body-md:
    fontFamily: "Montserrat, Noto Sans Thai, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"
  label:
    fontFamily: "Poppins, Noto Sans Thai, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.04em"
spacing:
  mobile: 20px
  tablet: 32px
  desktop: 48px
  sectionGap: 64px
rounded:
  sm: 10px
  md: 16px
  lg: 24px
  xl: 32px
  pill: 999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.pill}"
    padding: 12px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: 12px
  card-surface:
    backgroundColor: "{colors.surfaceCard}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: 24px
  section-soft:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: 32px
---

## Overview

Captain Maid should feel bright, clean, and easy to trust. Visual language: aqua base, deep navy text, soft blue surfaces, rounded cards, and low-friction CTAs. UI should scan fast on mobile and keep product access obvious.

## Colors

- Primary `#02A6E3`: main CTA, active nav, brand accents.
- Secondary `#90D0F0`: soft hero wash and calm surfaces.
- Tertiary `#1070B0`: hover and stronger emphasis.
- Neutral `#FFFFFF`: clean base and negative space.
- Surface `#EAF6FD`: section background and gentle panels.
- Surface card `#B0D0F0`: product cards and content blocks.
- Text `#001360`: headings and core copy.
- Muted `#506090`: secondary copy and meta text.
- Border `#D9EAF6`: light separation only.

## Typography

Poppins is for headings, nav, and button labels. Montserrat is for body copy and support text. Thai fallback must stay readable. Headings stay short, bold, and tight. Body stays calm and clear.

## Layout

Use max width 1200px. Keep generous side padding: 20px mobile, 32px tablet, 48px desktop. Sections should breathe; avoid dense walls of text. Product and solution blocks should read in one screen on mobile where possible.

## Shapes

Rounded corners are part of the brand. Use pill buttons, soft card corners, and larger rounded sections for a friendly household feel.

## Components

Primary buttons use aqua fill and navy text for accessible contrast. Secondary buttons stay white with navy text. Cards use pale blue surface and navy text. Soft sections use light blue backgrounds and clean spacing.

## Do's and Don'ts

Do:
- keep nav simple and product-led
- keep CTAs visible
- keep copy practical and benefit-first
- keep sections mobile-safe
- keep color usage consistent with tokens

Don't:
- use harsh shadows
- overload one screen with too many actions
- hide product access
- use decorative fonts in core UI
- drift away from blue-clean brand language
