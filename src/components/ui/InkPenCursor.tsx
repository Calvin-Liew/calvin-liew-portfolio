'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * InkPenCursor — replaces the default cursor with a small fountain-pen tip
 * on desktop. Position is updated via direct DOM transform (translate3d) so
 * tracking stays buttery-smooth and doesn't force React re-renders.
 *
 * Disabled when:
 *   - the pointing device is coarse (touch screens / mobile)
 *   - the user prefers reduced motion
 */
export default function InkPenCursor() {
  const [enabled, setEnabled] = useState(false);
  const penRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);

  // Decide whether to enable on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fineCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(fineCursor && !reducedMotion);
  }, []);

  // Toggle a body class so global CSS hides the native cursor
  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add('ink-cursor-active');
    return () => document.body.classList.remove('ink-cursor-active');
  }, [enabled]);

  // Mouse tracking — direct DOM manipulation, no React state for position
  useEffect(() => {
    if (!enabled) return;
    const pen = penRef.current;
    if (!pen) return;

    const updateTransform = (x: number, y: number) => {
      // Offset by -2,-2 to align pen tip with actual cursor position
      const scale = hoveringRef.current ? 1.25 : 1;
      pen.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0) scale(${scale})`;
    };

    const handleMove = (e: MouseEvent) => {
      updateTransform(e.clientX, e.clientY);

      // Hover detection — only flip when the value actually changes
      const el = e.target as HTMLElement | null;
      const isInteractive = !!el?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor-hover]'
      );
      if (isInteractive !== hoveringRef.current) {
        hoveringRef.current = isInteractive;
        // Re-apply transform with new scale
        updateTransform(e.clientX, e.clientY);
      }
    };

    const handleEnter = () => {
      pen.style.opacity = '1';
    };

    const handleLeave = () => {
      pen.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={penRef}
      aria-hidden
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        opacity: 1,
        transition: 'opacity 200ms ease-out',
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pen body — slim ink tip pointing up-left */}
        <path
          d="M 3 3 L 17 17 L 14 20 L 1 7 Z"
          fill="var(--ink)"
          stroke="var(--ink)"
          strokeLinejoin="round"
          strokeWidth="0.6"
        />
        {/* Pen split (nib detail) */}
        <line
          x1="2"
          y1="5"
          x2="15"
          y2="18"
          stroke="var(--paper)"
          strokeWidth="0.5"
          opacity="0.7"
        />
        {/* Small ink dot at the tip */}
        <circle cx="2" cy="2.5" r="1" fill="var(--terracotta)" />
      </svg>
    </div>
  );
}
