import React from "react";

/**
 * SpiritWings - Brand SVG motif of "כנפי הרוח" / "עדשת הרוח".
 * Modeled gracefully after the book's core visual identity.
 */

export function SpiritWingsWatermark({ className = "", color = "#BFA88F", opacity = 0.12 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Left Wing - 5 gracefully curved feathers */}
        <g stroke={color} strokeWidth="3" fill={color} fillOpacity="0.45" strokeLinecap="round" strokeLinejoin="round">
          {/* Feather 1 - top outer */}
          <path d="M 175 190 C 150 160 120 110 80 40 C 90 90 110 145 155 195 Z" />
          {/* Feather 2 */}
          <path d="M 185 205 C 160 175 130 130 95 80 C 108 125 128 170 168 210 Z" />
          {/* Feather 3 */}
          <path d="M 195 218 C 172 190 145 150 115 115 C 128 150 145 190 180 222 Z" />
          {/* Feather 4 */}
          <path d="M 205 228 C 185 205 160 170 135 145 C 148 175 165 205 192 232 Z" />
          {/* Feather 5 - lowest */}
          <path d="M 215 238 C 198 218 175 190 155 175 C 168 198 185 222 208 240 Z" />
        </g>

        {/* Right Wing - 5 symmetrically mirrored feathers */}
        <g stroke={color} strokeWidth="3" fill={color} fillOpacity="0.45" strokeLinecap="round" strokeLinejoin="round">
          {/* Feather 1 - top outer */}
          <path d="M 325 190 C 350 160 380 110 420 40 C 410 90 390 145 345 195 Z" />
          {/* Feather 2 */}
          <path d="M 315 205 C 340 175 370 130 405 80 C 392 125 372 170 332 210 Z" />
          {/* Feather 3 */}
          <path d="M 305 218 C 328 190 355 150 385 115 C 372 150 355 190 320 222 Z" />
          {/* Feather 4 */}
          <path d="M 295 228 C 315 205 340 170 365 145 C 352 175 335 205 308 232 Z" />
          {/* Feather 5 - lowest */}
          <path d="M 285 238 C 302 218 325 190 345 175 C 332 198 315 222 292 240 Z" />
        </g>

        {/* Center Eye / Lens (עדשת הרוח) */}
        <g stroke={color} strokeWidth="3.5" fill="none">
          {/* Upper lid arc */}
          <path d="M 205 205 C 225 180 275 180 295 205" strokeLinecap="round" />
          {/* Lower lid arc */}
          <path d="M 205 205 C 225 230 275 230 295 205" strokeLinecap="round" />

          {/* Iris Outer Ring */}
          <circle cx="250" cy="205" r="18" strokeWidth="2.5" />
          {/* Iris Inner Glow Circle */}
          <circle cx="250" cy="205" r="12" fill={color} fillOpacity="0.4" strokeWidth="1.5" />
          {/* Pupil Light Reflection */}
          <circle cx="246" cy="201" r="3" fill="#FFFFFF" fillOpacity="0.9" stroke="none" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Corner Wing Motif for cards ("לכתוב ישר", "לפנות מקום")
 */
export function CornerWingMotif({ className = "", color = "currentColor", opacity = 0.14 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M 12 125 C 25 95 48 55 90 20 C 78 50 62 82 35 115 Z"
          fill={color}
        />
        <path
          d="M 22 132 C 38 105 60 72 105 40 C 90 70 72 100 48 126 Z"
          fill={color}
        />
        <path
          d="M 36 137 C 52 115 75 88 120 62 C 102 90 85 116 62 135 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/**
 * Small branded mark (e.g. for header badges, delicate branding)
 */
export function SpiritBrandMark({ size = 28, color = "#B08A3C", className = "" }) {
  return (
    <svg
      width={size}
      height={(size * 22) / 32}
      viewBox="0 0 64 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Left wing mini feathers */}
      <path d="M 22 28 C 17 22 11 14 5 4 C 8 12 11 20 19 28 Z" fill={color} />
      <path d="M 24 30 C 19 25 14 18 9 10 C 12 17 15 24 22 31 Z" fill={color} opacity="0.85" />
      <path d="M 26 33 C 22 28 17 22 13 16 C 15 22 18 28 24 33 Z" fill={color} opacity="0.7" />

      {/* Right wing mini feathers */}
      <path d="M 42 28 C 47 22 53 14 59 4 C 56 12 53 20 45 28 Z" fill={color} />
      <path d="M 40 30 C 45 25 50 18 55 10 C 52 17 49 24 42 31 Z" fill={color} opacity="0.85" />
      <path d="M 38 33 C 42 28 47 22 51 16 C 49 22 46 28 40 33 Z" fill={color} opacity="0.7" />

      {/* Central eye */}
      <path d="M 26 30 C 29 25 35 25 38 30 C 35 34 29 34 26 30 Z" stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx="32" cy="29.5" r="2.5" fill={color} />
    </svg>
  );
}