'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { Asterisk, HandArrow, HandUnderline, SparkleStar } from '../ui/HandDrawn';
import HeroAsk from '../ama/HeroAsk';

const TAPE = 'rgba(254, 215, 170, 0.85)';

/** Taped polaroid of Calvin. Same white card + tape treatment as the About page. */
function Polaroid({ className = '', size }: { className?: string; size: 'sm' | 'lg' }) {
  const lg = size === 'lg';
  return (
    <figure
      className={`relative bg-white rounded-sm ${lg ? 'p-3 pb-1.5' : 'p-1.5 pb-0.5'} ${className}`}
      style={{
        boxShadow: '0 1px 2px rgba(31, 26, 23, 0.12), 0 14px 30px -8px rgba(31, 26, 23, 0.3)',
      }}
    >
      <div
        className={`absolute left-1/2 rounded-sm shadow-sm ${lg ? '-top-3.5 w-20 h-6' : '-top-2 w-10 h-3.5'}`}
        style={{ background: TAPE, transform: 'translate(-50%, 0) rotate(-4deg)' }}
        aria-hidden
      />
      <Image
        src="/profile/calvin-liew.jpg"
        alt="Calvin Liew"
        width={640}
        height={640}
        priority
        className={`object-cover ${lg ? 'w-52 h-52' : 'w-20 h-20'}`}
      />
      {lg && (
        <figcaption className="text-center text-lg text-terracotta leading-none py-2.5 font-hand">
          hi, that&apos;s me!
        </figcaption>
      )}
    </figure>
  );
}

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

      {/* Desk clutter in the wide-screen margins: sticky note left, polaroid right */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        <SparkleStar className="absolute left-[9%] top-[22%] w-9 h-9 animate-float-soft" />
        <Asterisk className="absolute right-[10%] bottom-[20%] w-7 h-7 animate-float-soft animation-delay-600" color="var(--sketch)" />
        <SparkleStar className="absolute right-[24%] top-[19%] w-5 h-5 animate-float-soft animation-delay-1000" color="var(--sketch)" />
      </div>

      <div className="absolute left-[5%] 2xl:left-[9%] top-[46%] z-10 hidden xl:block -rotate-[4deg]">
        <div className="animate-fade-in-up animation-delay-1000">
          <div
            className="relative w-52 px-5 pt-6 pb-5 font-hand text-ink leading-snug animate-paper-wobble"
            style={{
              background: 'linear-gradient(180deg, #fef3a0 0%, #fdeb7f 100%)',
              boxShadow: '0 1px 2px rgba(31, 26, 23, 0.1), 0 12px 22px -10px rgba(31, 26, 23, 0.35)',
            }}
          >
            <div
              className="absolute -top-3 left-1/2 w-16 h-5 rounded-sm"
              style={{ background: 'rgba(255, 255, 255, 0.55)', transform: 'translateX(-50%) rotate(3deg)' }}
              aria-hidden
            />
            <p className="text-sm text-terracotta-deep mb-1">currently —</p>
            <p className="text-lg">building AI agents people actually use at Sanofi</p>
            <p className="mt-3 text-sm text-ink-soft">UofT &apos;26 · High Distinction</p>
          </div>
        </div>
      </div>

      <div className="absolute right-[5%] 2xl:right-[9%] top-[24%] z-10 hidden xl:block animate-fade-in-up animation-delay-800">
        <Polaroid size="lg" className="rotate-[4deg] transition-transform duration-500 hover:rotate-[-1deg] hover:scale-[1.03]" />
        <HandArrow direction="down-left" className="absolute -left-20 top-[62%] w-20 h-20 -scale-y-100" animate />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Polaroid size="sm" className="mx-auto mb-6 w-fit -rotate-3 xl:hidden animate-fade-in-up" />
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
