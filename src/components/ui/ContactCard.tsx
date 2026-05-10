'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from './Button';
import SocialLinks from './SocialLinks';

// Returns a casual handwritten greeting based on the user's local time.
// Returns null on initial render (SSR) so the greeting only appears after
// hydration — avoids any time-mismatch flash.
function useTimeGreeting(): string | null {
  const [greeting, setGreeting] = useState<string | null>(null);
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) setGreeting('good morning');
    else if (h >= 12 && h < 17) setGreeting('good afternoon');
    else if (h >= 17 && h < 21) setGreeting('good evening');
    else if (h >= 21 || h < 2) setGreeting('still up?');
    else setGreeting('nighthawk');
  }, []);
  return greeting;
}

/**
 * ContactCard — the "Drop me a line" taped paper note.
 * Used on the homepage QuickContact section and on the Profile page contact anchor.
 * Renders just the card; wrap it in a Section or div with id="contact" as needed.
 */
export default function ContactCard({ className = '' }: { className?: string }) {
  const greeting = useTimeGreeting();

  return (
    <div className={`relative bg-paper border border-border rounded-2xl shadow-paper p-8 sm:p-12 tilt-l-half max-w-2xl mx-auto ${className}`}>
      {/* Tape at top */}
      <div
        className="absolute -top-3 left-1/2 w-24 h-6 rounded-sm shadow-sm"
        style={{
          background: 'rgba(254, 215, 170, 0.85)',
          transform: 'translate(-50%, 0) rotate(-3deg)',
        }}
        aria-hidden
      />

      {/* Time-of-day handwritten greeting */}
      {greeting && (
        <p
          className="text-base text-terracotta mb-2 inline-block animate-fade-in-up"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            transform: 'rotate(-3deg)',
          }}
        >
          {greeting} &mdash;
        </p>
      )}

      <h2 className="font-display italic text-4xl sm:text-5xl text-ink mb-3 leading-tight">
        Drop me a line<span className="text-terracotta not-italic">.</span>
      </h2>

      <p
        className="text-lg text-terracotta mb-6 inline-block"
        style={{
          fontFamily: 'var(--font-kalam), cursive',
          transform: 'rotate(-1deg)',
        }}
      >
        always up for a chat about ai, product, or design
      </p>

      <p className="text-base text-ink-soft leading-relaxed mb-8">
        Hiring, collaborating, or just want to chat? I&apos;d love to hear
        from you.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10">
        <Button
          href="mailto:calvin.liew@mail.utoronto.ca"
          variant="primary"
          size="lg"
        >
          Send me a note &rarr;
        </Button>
        <Link
          href="https://www.linkedin.com/in/calvin-liew-/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-terracotta hover:text-terracotta-deep hover:translate-x-1 transition-all duration-200 inline-flex items-center"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            transform: 'rotate(-2deg)',
          }}
        >
          or find me on linkedin &rarr;
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-5" aria-hidden>
        <svg
          viewBox="0 0 200 4"
          preserveAspectRatio="none"
          className="flex-1 h-1"
        >
          <path
            d="M2 2 L 198 2"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xs text-muted uppercase tracking-wider">
          or find me on
        </span>
        <svg
          viewBox="0 0 200 4"
          preserveAspectRatio="none"
          className="flex-1 h-1"
        >
          <path
            d="M2 2 L 198 2"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <SocialLinks className="justify-center" />
    </div>
  );
}
