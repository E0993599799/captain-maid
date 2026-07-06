'use client';

import React from 'react';

interface SparkleProps {
  size?: number;
  delay?: number;
}

/**
 * Sparkle SVG component with animated opacity
 * Used for decorative hero background elements
 */
export const Sparkle = ({ size = 24, delay = 0 }: SparkleProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-sparkle"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <path
        d="M12 2L15.09 8.26H21.77L16.84 12.45L18.93 18.71L12 14.52L5.07 18.71L7.16 12.45L2.23 8.26H8.91L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
};
