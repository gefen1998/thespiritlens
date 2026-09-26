import React from "react";

export const WINGS_URL =
  "https://media.base44.com/images/public/6aa5ba6278746a9e6313ec62/b888de778_wings-mark.png";

// Paints the wings artwork in any color by using it as an alpha mask.
function wingsMask(position = "center", size = "contain") {
  const m = `url(${WINGS_URL}) ${position} / ${size} no-repeat`;
  return { WebkitMask: m, mask: m };
}

/**
 * Full "כנפי הרוח" mark — both wings from the brand artwork, with the lens/eye centered between them.
 */
export function SpiritWingsWatermark({ className = "", color = "#BFA88F", opacity = 0.14 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0" style={{ backgroundColor: color, opacity, ...wingsMask() }} />
        {/* Original "עדשת הרוח" eye */}
        <svg
          viewBox="0 0 200 110"
          fill="none"
          className="absolute left-1/2 top-[66%] -translate-x-1/2 -translate-y-1/2 w-[36%]"
          style={{ opacity: Math.min(opacity * 1.8, 0.3) }}
        >
          {/* Almond outline with pointed corners */}
          <path
            d="M 6 55 Q 100 -8 194 55 Q 100 118 6 55 Z"
            stroke={color}
            strokeWidth="4.5"
            strokeLinejoin="miter"
          />
          {/* Iris: thin outer ring + full pupil */}
          <circle cx="100" cy="55" r="33" stroke={color} strokeWidth="3" />
          <circle cx="100" cy="55" r="26" fill={color} />
        </svg>
      </div>
    </div>
  );
}

/**
 * Single wing (the left half of the brand artwork) for the home cards.
 */
export function CornerWingMotif({ className = "", color = "currentColor", opacity = 0.14 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
      style={{ opacity, backgroundColor: color, ...wingsMask("left center", "auto 100%") }}
    />
  );
}

/**
 * Small branded mark (e.g. header badge) with accurate wings & eye shape
 */
export function SpiritBrandMark({ size = 32, color = "#B08A3C", className = "" }) {
  return (
    <svg
      width={size}
      height={(size * 24) / 36}
      viewBox="0 0 72 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <g fill={color}>
        <path d="M 28 26 C 22 22 14 14 4 2 C 7 10 13 19 24 28 Z" />
        <path d="M 27 29 C 21 25 13 18 5 10 C 9 16 16 24 24 31 Z" opacity="0.85" />
        <path d="M 26 32 C 21 28 14 22 7 16 C 11 21 18 28 24 33 Z" opacity="0.7" />
        <path d="M 44 26 C 50 22 58 14 68 2 C 65 10 59 19 48 28 Z" />
        <path d="M 45 29 C 51 25 59 18 67 10 C 63 16 56 24 48 31 Z" opacity="0.85" />
        <path d="M 46 32 C 51 28 58 22 65 16 C 61 21 54 28 48 33 Z" opacity="0.7" />
        <path d="M 26 27 C 30 20 42 20 46 27 C 42 34 30 34 26 27 Z" stroke={color} strokeWidth="1.8" fill="none" />
        <circle cx="36" cy="27" r="3" fill={color} />
      </g>
    </svg>
  );
}