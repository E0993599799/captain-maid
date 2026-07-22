# Mobile Hero and Menu Design

## Goal

Make the mobile hero use its portrait artwork correctly, keep copy in the artwork's upper text-safe area, preserve the visible hero in a translucent lower region, and ensure the mobile navigation drawer always renders above page content.

## Design

- On screens below 768px, the hero uses an extra-tall portrait composition at approximately 205vw / 115svh with a viewport-safe minimum height.
- Mobile copy aligns to the top and occupies 30% of the hero. Copy remains centered and compact so the product artwork below stays unobstructed.
- The mobile overlay is transparent through the upper text-safe area, then becomes a restrained translucent navy gradient toward the bottom. Tablet and desktop retain their existing overlay behavior.
- Hero headings use weight 600. The current outline is reduced by 30%: light artwork uses 25.2px; dark artwork uses a responsive 8.4–16.8px stroke.
- The mobile drawer renders as a sibling of the fixed header, not a descendant. This removes the fixed-position containing block created by header backdrop filtering. The drawer uses a higher page-level stacking layer and fills the viewport below the current header height.

## Verification

- Regression tests assert the portrait mobile hero sizing, top-aligned copy, mobile gradient, semibold heading, reduced outline, and drawer placement/stacking.
- Run tests, TypeScript validation, and a production build.
