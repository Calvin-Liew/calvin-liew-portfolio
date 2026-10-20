'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { HandUnderline } from '../ui/HandDrawn';
import HeroAsk from '../ama/HeroAsk';

/** Thin progress line at the bottom of the hero. Kept separate so scrolling only re-renders this. */
function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-60" aria-hidden>
      <div className="relative w-0.5 h-12 bg-border-strong/60 rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 bg-ink-soft transition-all duration-300 ease-out"
          style={{ height: `${Math.min(scrollProgress * 3, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden -mt-20 sm:-mt-24 pt-28 sm:pt-32 pb-28">
      {/* A soft pool of light behind the name */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl sm:h-[42rem] sm:w-[42rem]"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-paper/80 px-3.5 py-1.5 text-sm text-ink-soft backdrop-blur transition-colors hover:border-ink/30 hover:text-ink animate-fade-in-up"
          >
            AI Workflows Product Analyst <span className="text-muted">·</span> Sanofi
          </Link>

          <h1 className="mt-7 flex flex-wrap items-baseline justify-center gap-x-5 leading-[0.95] animate-fade-in-up animation-delay-200">
            <span className="inline-block -rotate-[1.5deg] font-hand text-7xl font-bold text-ink sm:text-8xl lg:text-[9rem]">
              Calvin
            </span>
            {/* Underline anchored to this span so it tracks "Liew." at every breakpoint */}
            <span className="relative inline-block font-display text-7xl italic text-ink sm:text-8xl lg:text-[8.5rem]">
              Liew<span className="not-italic text-terracotta">.</span>
              <HandUnderline className="absolute -bottom-1 left-0 h-2.5 w-full sm:-bottom-2 sm:h-3" animate />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-xl leading-snug text-ink-soft sm:text-2xl animate-fade-in-up animation-delay-400">
            I turn business needs into <span className="font-medium text-ink">useful AI products</span>.
          </p>

          <div className="mt-10 animate-fade-in-up animation-delay-600">
            <HeroAsk />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 animate-fade-in-up animation-delay-800">
            <Button href="/projects" variant="primary" size="lg">
              View my work
            </Button>
            <Button href="/profile#contact" variant="secondary" size="lg">
              Get in touch
            </Button>
          </div>
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
