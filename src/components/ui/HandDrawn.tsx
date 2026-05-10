/**
 * HandDrawn — a small SVG kit of hand-drawn annotations and doodles.
 * Each component accepts className (sizing/positioning), color (default terracotta),
 * and animate (kicks off a stroke-draw animation on mount).
 */

import React from 'react';

type Common = {
  className?: string;
  color?: string;
  strokeWidth?: number;
  animate?: boolean;
  ariaHidden?: boolean;
};

const TERRACOTTA = 'var(--terracotta)';
const SKETCH = 'var(--sketch)';

/* ────────────────────────────────────────────────────────────────────
   Annotations — circles, arrows, underlines, highlights
   ──────────────────────────────────────────────────────────────────── */

export function ScribbleCircle({
  className = '',
  color = TERRACOTTA,
  strokeWidth = 2.4,
  animate = false,
  ariaHidden = true,
}: Common) {
  // Wonky double-pass oval. Two paths slightly offset so it reads "drawn twice."
  return (
    <svg
      viewBox="0 0 220 110"
      preserveAspectRatio="none"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
    >
      <path
        d="M 30 55 Q 26 18, 84 14 Q 162 9, 196 30 Q 218 60, 178 88 Q 102 100, 36 88 Q 14 76, 30 55 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={animate ? 'animate-draw-stroke' : ''}
        style={animate ? ({ ['--stroke-length' as string]: '650' }) as React.CSSProperties : undefined}
      />
      <path
        d="M 34 50 Q 30 22, 82 18 Q 158 12, 192 32 Q 210 58, 174 84 Q 102 96, 38 84 Q 18 72, 34 50 Z"
        stroke={color}
        strokeWidth={strokeWidth - 0.4}
        strokeLinecap="round"
        opacity={0.55}
        className={animate ? 'animate-draw-stroke animation-delay-200' : ''}
        style={animate ? ({ ['--stroke-length' as string]: '650' }) as React.CSSProperties : undefined}
      />
    </svg>
  );
}

export function HandArrow({
  className = '',
  color = TERRACOTTA,
  strokeWidth = 2.4,
  animate = false,
  ariaHidden = true,
  /** 'down-right' | 'down-left' | 'right' | 'down' */
  direction = 'down-right',
}: Common & { direction?: 'down-right' | 'down-left' | 'right' | 'down' }) {
  const paths: Record<string, string> = {
    'down-right':
      'M 6 8 Q 28 4, 50 22 Q 72 42, 90 70',
    'down-left':
      'M 90 8 Q 68 4, 46 22 Q 24 42, 10 70',
    right:
      'M 6 40 Q 30 28, 60 40 T 90 40',
    down:
      'M 50 6 Q 46 30, 50 60 T 50 90',
  };
  const heads: Record<string, string> = {
    'down-right': 'M 90 70 L 76 64 M 90 70 L 84 82',
    'down-left': 'M 10 70 L 24 64 M 10 70 L 16 82',
    right: 'M 90 40 L 80 34 M 90 40 L 80 46',
    down: 'M 50 90 L 44 80 M 50 90 L 56 80',
  };
  return (
    <svg
      viewBox="0 0 100 90"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
    >
      <path
        d={paths[direction]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={animate ? 'animate-draw-stroke' : ''}
        style={animate ? ({ ['--stroke-length' as string]: '180' }) as React.CSSProperties : undefined}
      />
      <path
        d={heads[direction]}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={animate ? 'animate-draw-stroke animation-delay-400' : ''}
        style={animate ? ({ ['--stroke-length' as string]: '50' }) as React.CSSProperties : undefined}
      />
    </svg>
  );
}

export function HandUnderline({
  className = '',
  color = TERRACOTTA,
  strokeWidth = 2.4,
  animate = false,
  ariaHidden = true,
}: Common) {
  return (
    <svg
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
    >
      <path
        d="M 3 6 Q 50 2, 100 6 T 197 4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={animate ? 'animate-draw-stroke' : ''}
        style={animate ? ({ ['--stroke-length' as string]: '210' }) as React.CSSProperties : undefined}
      />
    </svg>
  );
}

export function MarkerStreak({
  className = '',
  color = 'var(--terracotta-soft)',
  ariaHidden = true,
}: { className?: string; color?: string; ariaHidden?: boolean }) {
  // Used as a positioned background streak — taller, fills behind text
  return (
    <svg
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
      className={className}
      aria-hidden={ariaHidden}
    >
      <path
        d="M 4 22 Q 8 8, 30 12 Q 90 6, 160 14 Q 192 10, 196 22 Q 192 32, 160 30 Q 90 36, 30 32 Q 6 32, 4 22 Z"
        fill={color}
        opacity={0.85}
      />
    </svg>
  );
}

export function Asterisk({
  className = '',
  color = TERRACOTTA,
  strokeWidth = 2.2,
  ariaHidden = true,
}: Common) {
  return (
    <svg viewBox="0 0 30 30" className={className} aria-hidden={ariaHidden} fill="none">
      <path d="M 15 4 L 15 26 M 5 9 L 25 21 M 5 21 L 25 9 M 4 15 L 26 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function SparkleStar({
  className = '',
  color = TERRACOTTA,
  strokeWidth = 2,
  ariaHidden = true,
}: Common) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden={ariaHidden} fill="none">
      <path
        d="M 16 3 Q 17 13, 28 16 Q 17 19, 16 29 Q 15 19, 4 16 Q 15 13, 16 3 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Doodles — corner ornaments for cards
   ──────────────────────────────────────────────────────────────────── */

type DoodleName = 'lightbulb' | 'coffee' | 'magnifier' | 'pencil' | 'paperplane' | 'sparkle';

export function Doodle({
  name,
  className = '',
  color = SKETCH,
  strokeWidth = 1.8,
  ariaHidden = true,
}: { name: DoodleName } & Common) {
  const paths: Record<DoodleName, React.ReactNode> = {
    lightbulb: (
      <>
        <path d="M 20 10 Q 10 12, 12 24 Q 14 30, 18 32 L 22 32 Q 26 30, 28 24 Q 30 12, 20 10 Z" />
        <path d="M 17 35 L 23 35 M 18 38 L 22 38" />
        <path d="M 20 4 L 20 7 M 8 16 L 11 18 M 32 16 L 29 18 M 5 28 L 8 28 M 35 28 L 32 28" />
      </>
    ),
    coffee: (
      <>
        <path d="M 8 14 L 30 14 L 28 32 Q 27 34, 24 34 L 14 34 Q 11 34, 10 32 L 8 14 Z" />
        <path d="M 30 18 Q 36 18, 36 23 Q 36 28, 30 28" />
        <path d="M 14 6 Q 12 9, 14 11 M 19 6 Q 17 9, 19 11 M 24 6 Q 22 9, 24 11" />
      </>
    ),
    magnifier: (
      <>
        <circle cx="16" cy="16" r="9" />
        <path d="M 23 23 L 32 32" />
        <path d="M 12 13 Q 10 16, 12 19" />
      </>
    ),
    pencil: (
      <>
        <path d="M 6 32 L 26 12 L 32 18 L 12 38 L 4 40 L 6 32 Z" />
        <path d="M 22 14 L 28 20" />
        <path d="M 6 32 L 12 38" />
      </>
    ),
    paperplane: (
      <>
        <path d="M 4 18 L 36 6 L 24 36 L 18 24 L 4 18 Z" />
        <path d="M 18 24 L 36 6" />
      </>
    ),
    sparkle: (
      <>
        <path d="M 20 4 Q 21 16, 32 20 Q 21 24, 20 36 Q 19 24, 8 20 Q 19 16, 20 4 Z" />
        <path d="M 6 6 L 8 10 L 12 8 L 9 11 L 11 14" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Hand-drawn social icons — LinkedIn, GitHub, Email
   Single-color via stroke="currentColor" so they inherit text color.
   ──────────────────────────────────────────────────────────────────── */

type SocialIconProps = {
  className?: string;
  strokeWidth?: number;
  ariaHidden?: boolean;
};

export function HandLinkedIn({
  className = '',
  strokeWidth = 1.9,
  ariaHidden = true,
}: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rounded square badge — close to LinkedIn brand mark */}
      <path d="M 7 4 Q 4 4, 4 7 L 4 25 Q 4 28, 7 28 L 25 28 Q 28 28, 28 25 L 28 7 Q 28 4, 25 4 Z" />
      {/* "i" stem */}
      <line x1="10" y1="14" x2="10" y2="22" />
      {/* "i" dot — filled */}
      <circle cx="10" cy="10.5" r="1" fill="currentColor" stroke="none" />
      {/* "n" — vertical stem + arched curve into right stem */}
      <path d="M 15 22 L 15 14" />
      <path d="M 15 17 Q 15 13, 18.5 13 Q 22 13, 22 17 L 22 22" />
    </svg>
  );
}

export function HandGithub({
  className = '',
  strokeWidth = 1.9,
  ariaHidden = true,
}: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Octocat body — head + body silhouette with arms reaching down */}
      <path d="M 21 28 V 23.5 Q 21 21, 19.5 19.5 Q 25 19, 25 13.5 Q 25 11.5, 23.7 10 Q 24.1 8.4, 23.7 6.7 Q 23.7 6.7, 21.5 7.3 Q 19.7 6.6, 16 6.6 Q 12.3 6.6, 10.5 7.3 Q 8.3 6.7, 8.3 6.7 Q 7.9 8.4, 8.3 10 Q 7 11.5, 7 13.5 Q 7 19, 12.5 19.5 Q 11 21, 11 23.5 V 28" />
      {/* Tail — the bit that swoops out to the lower-left */}
      <path d="M 11 25.5 Q 8 26.5, 6.5 24 Q 5.5 22.5, 3.5 22.5" />
    </svg>
  );
}

export function HandMail({
  className = '',
  strokeWidth = 1.9,
  ariaHidden = true,
}: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden={ariaHidden}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Envelope outline — clean rounded rectangle */}
      <path d="M 5 7 L 27 7 Q 29 7, 29 9 L 29 23 Q 29 25, 27 25 L 5 25 Q 3 25, 3 23 L 3 9 Q 3 7, 5 7 Z" />
      {/* The flap fold — V from corners to centre */}
      <path d="M 4 9 L 16 17 L 28 9" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────
   Signature — "Calvin Liew" rendered with Kalam in terracotta,
   slightly slanted, with a hand-drawn flourish underline.
   ──────────────────────────────────────────────────────────────────── */

export function Signature({
  className = '',
  text = 'Calvin Liew',
  color = TERRACOTTA,
  size = 'md',
}: {
  className?: string;
  text?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes: Record<string, string> = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };
  return (
    <span
      className={`inline-block relative leading-none ${sizes[size]} ${className}`}
      style={{ fontFamily: 'var(--font-kalam), cursive', color, transform: 'rotate(-3deg)' }}
    >
      {text}
      <svg
        className="absolute left-0 right-0 -bottom-2 w-full h-3"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        aria-hidden
        fill="none"
      >
        <path
          d="M 4 8 Q 40 2, 90 7 Q 140 11, 196 5 Q 200 5, 198 9"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
