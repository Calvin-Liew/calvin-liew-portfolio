'use client';

import { useEffect, useState } from 'react';

/**
 * ReadingProgress — a thin terracotta ink line at the top of the viewport
 * that fills from 0 → 100% as the reader scrolls through the article.
 * Lives in `position: fixed` at the very top, above the header.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      // Don't kick in until the article header has scrolled past the top of the viewport
      const startOffset = 80; // ignore first 80px of scroll
      const adjusted = Math.max(0, scrolled - startOffset);
      const adjustedScrollable = Math.max(1, scrollable - startOffset);
      const pct = Math.min(
        100,
        Math.max(0, (adjusted / adjustedScrollable) * 100)
      );
      setProgress(pct);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          compute();
          ticking = false;
        });
        ticking = true;
      }
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[55] h-[2px] pointer-events-none"
    >
      <div
        className="h-full bg-terracotta transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
