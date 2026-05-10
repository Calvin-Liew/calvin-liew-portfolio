'use client';

import { useEffect, useRef, useState } from 'react';

interface MarkerHighlightProps {
  children: React.ReactNode;
  className?: string;
  /** Use the soft yellow highlighter instead of terracotta. */
  yellow?: boolean;
  /** Animation delay in ms (after entering viewport). */
  delay?: number;
}

/**
 * MarkerHighlight — wraps inline text with a marker-highlight wash that
 * animates from 0 → full width when the element scrolls into view.
 * Respects prefers-reduced-motion (renders fully highlighted, no animation).
 */
export default function MarkerHighlight({
  children,
  className = '',
  yellow = false,
  delay = 0,
}: MarkerHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced motion: show fully highlighted immediately
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const colorRgb = yellow
    ? '254, 240, 138'
    : 'var(--terracotta-soft-rgb)';
  const opacity = yellow ? '0.78' : '0.7';

  return (
    <span
      ref={ref}
      className={`relative inline ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, transparent 58%, rgba(${colorRgb}, ${opacity}) 58%, rgba(${colorRgb}, ${opacity}) 96%, transparent 96%)`,
        backgroundSize: isVisible ? '100% 100%' : '0% 100%',
        backgroundRepeat: 'no-repeat',
        padding: '0 0.12em',
        transition: `background-size 900ms cubic-bezier(0.7, 0, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </span>
  );
}
