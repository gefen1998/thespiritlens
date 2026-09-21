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
        viewBox="0 0 600 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g fill={color}>
          {/* ================= RIGHT WING (4 Splayed Feathers) ================= */}
          {/* Feather 1 - Topmost outer swoop */}
          <path d="M 370,220 C 410,188 480,118 555,22 C 540,82 490,165 398,242 C 384,236 374,228 370,220 Z" />
          {/* Feather 2 - Second feather */}
          <path d="M 374,244 C 420,218 495,160 562,102 C 540,152 482,222 392,268 C 382,258 376,250 374,244 Z" />
          {/* Feather 3 - Third feather */}
          <path d="M 378,270 C 425,250 490,205 550,162 C 522,205 458,265 385,292 C 380,282 378,275 378,270 Z" />
          {/* Feather 4 - Bottom feather */}
          <path d="M 380,294 C 430,282 490,250 535,222 C 498,265 432,318 368,332 C 372,316 376,304 380,294 Z" />

          {/* ================= LEFT WING (Symmetrical 4 Feathers) ================= */}
          {/* Feather 1 - Topmost outer swoop */}
          <path d="M 230,220 C 190,188 120,118 45,22 C 60,82 110,165 202,242 C 216,236 226,228 230,220 Z" />
          {/* Feather 2 - Second feather */}
          <path d="M 226,244 C 180,218 105,160 38,102 C 60,152 118,222 208,268 C 218,258 224,250 226,244 Z" />
          {/* Feather 3 - Third feather */}
          <path d="M 222,270 C 175,250 110,205 50,162 C 78,205 142,265 215,292 C 220,282 222,275 222,270 Z" />
          {/* Feather 4 - Bottom feather */}
          <path d="M 220,294 C 170,282 110,250 65,222 C 102,265 168,318 232,332 C 228,316 224,304 220,294 Z" />

          {/* ================= CENTRAL EYE (עדשת הרוח) ================= */}
          {/* Upper Eye Lid */}
          <path d="M 212,235 C 240,185 360,185 388,235 C 345,200 255,200 212,235 Z" />
          {/* Lower Eye Lid */}
          <path d="M 212,235 C 240,285 360,285 388,235 C 345,270 255,270 212,235 Z" />

          {/* Under-Eye Curved Arc Accent */}
          <path d="M 205,245 C 240,305 360,305 395,245 C 362,322 238,322 205,245 Z" />
          {/* Lower Center Tail Tips */}
          <path d="M 270,308 C 265,340 255,360 248,375 C 255,362 268,338 274,310 Z" />
          <path d="M 330,308 C 335,340 345,360 352,375 C 345,362 332,338 326,310 Z" />

          {/* Iris Outer Ring */}
          <circle cx="300" cy="235" r="32" stroke={color} strokeWidth="6" fill="none" />
          {/* Iris Inner Pupil */}
          <circle cx="300" cy="235" r="20" fill={color} />
          {/* Pupil Light Reflection Highlight */}
          <circle cx="293" cy="228" r="5" fill="#FFFFFF" fillOpacity="0.9" />
        </g>
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
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g fill={color}>
          {/* Single Wing with 4 feathers swooping gracefully upwards */}
          {/* Feather 1 - Main long feather */}
          <path d="M 20,260 C 50,210 110,130 240,10 C 220,80 150,180 45,275 C 32,270 24,264 20,260 Z" />
          {/* Feather 2 */}
          <path d="M 28,272 C 65,235 130,165 248,95 C 222,145 152,230 52,282 C 40,278 32,274 28,272 Z" />
          {/* Feather 3 */}
          <path d="M 36,282 C 75,255 140,200 252,150 C 218,198 145,260 62,288 C 50,285 42,283 36,282 Z" />
          {/* Feather 4 */}
          <path d="M 46,288 C 88,272 150,230 245,195 C 200,238 128,285 70,292 C 58,290 50,289 46,288 Z" />
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