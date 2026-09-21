import React from "react";

/**
 * SpiritWings - Accurate SVG implementation of "כנפי הרוח" / "עדשת הרוח"
 * strictly styled after the central brand symbol reference.
 */

export function SpiritWingsWatermark({ className = "", color = "#BFA88F", opacity = 0.14 }) {
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
          <path d="M 175 190 C 150 160 120 110 80 40 C 90 90 110 145 155 195 Z" />
          <path d="M 185 205 C 160 175 130 130 95 80 C 108 125 128 170 168 210 Z" />
          <path d="M 195 218 C 172 190 145 150 115 115 C 128 150 145 190 180 222 Z" />
          <path d="M 205 228 C 185 205 160 170 135 145 C 148 175 165 205 192 232 Z" />
          <path d="M 215 238 C 198 218 175 190 155 175 C 168 198 185 222 208 240 Z" />
        </g>

        {/* Right Wing - 5 symmetrically mirrored feathers */}
        <g stroke={color} strokeWidth="3" fill={color} fillOpacity="0.45" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 325 190 C 350 160 380 110 420 40 C 410 90 390 145 345 195 Z" />
          <path d="M 315 205 C 340 175 370 130 405 80 C 392 125 372 170 332 210 Z" />
          <path d="M 305 218 C 328 190 355 150 385 115 C 372 150 355 190 320 222 Z" />
          <path d="M 295 228 C 315 205 340 170 365 145 C 352 175 335 205 308 232 Z" />
          <path d="M 285 238 C 302 218 325 190 345 175 C 332 198 315 222 292 240 Z" />
        </g>

        {/* Center Eye / Lens (עדשת הרוח) */}
        <g stroke={color} strokeWidth="3.5" fill="none">
          <path d="M 205 205 C 225 180 275 180 295 205" strokeLinecap="round" />
          <path d="M 205 205 C 225 230 275 230 295 205" strokeLinecap="round" />
          <circle cx="250" cy="205" r="18" strokeWidth="2.5" />
        </g>
        <circle cx="250" cy="205" r="7" fill={color} />
      </svg>
    </div>
  );
}

/**
 * Single Wing Motif for containers ("לכתוב ישר", "לפנות מקום")
 * Renders exactly one authentic wing (4 splayed feathers) in the corner.
 */
export function CornerWingMotif({ className = "", color = "currentColor", opacity = 0.14 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="70 30 155 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Single wing — same 5 curved feathers as the brand watermark */}
        <g stroke={color} strokeWidth="3" fill={color} fillOpacity="0.45" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 175 190 C 150 160 120 110 80 40 C 90 90 110 145 155 195 Z" />
          <path d="M 185 205 C 160 175 130 130 95 80 C 108 125 128 170 168 210 Z" />
          <path d="M 195 218 C 172 190 145 150 115 115 C 128 150 145 190 180 222 Z" />
          <path d="M 205 228 C 185 205 160 170 135 145 C 148 175 165 205 192 232 Z" />
          <path d="M 215 238 C 198 218 175 190 155 175 C 168 198 185 222 208 240 Z" />
        </g>
      </svg>
    </div>
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
        {/* Left Wing Mini Feathers */}
        <path d="M 28 26 C 22 22 14 14 4 2 C 7 10 13 19 24 28 Z" />
        <path d="M 27 29 C 21 25 13 18 5 10 C 9 16 16 24 24 31 Z" opacity="0.85" />
        <path d="M 26 32 C 21 28 14 22 7 16 C 11 21 18 28 24 33 Z" opacity="0.7" />

        {/* Right Wing Mini Feathers */}
        <path d="M 44 26 C 50 22 58 14 68 2 C 65 10 59 19 48 28 Z" />
        <path d="M 45 29 C 51 25 59 18 67 10 C 63 16 56 24 48 31 Z" opacity="0.85" />
        <path d="M 46 32 C 51 28 58 22 65 16 C 61 21 54 28 48 33 Z" opacity="0.7" />

        {/* Eye */}
        <path d="M 26 27 C 30 20 42 20 46 27 C 42 34 30 34 26 27 Z" stroke={color} strokeWidth="1.8" fill="none" />
        <circle cx="36" cy="27" r="3" fill={color} />
      </g>
    </svg>
  );
}