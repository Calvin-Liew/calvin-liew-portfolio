'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '../layout/Container';
import Button from '../ui/Button';
import { Asterisk, HandUnderline, ScribbleCircle, SparkleStar } from '../ui/HandDrawn';
import HeroAsk from '../ama/HeroAsk';

/** Stroke-draw a path after `delay` ms. `both` fill keeps it hidden until its turn. */
function draw(length: number, delay: number, duration = 1.6): React.CSSProperties {
  return {
    ['--stroke-length' as string]: String(length),
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}s`,
    animationFillMode: 'both',
  };
}

/** Pencil sketches in the wide-screen margins that draw themselves in after the hero settles. */
function MarginSketches() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
      {/* Paper plane looping in from the left */}
      <svg
        viewBox="0 0 220 140"
        className="absolute left-[11%] top-[12%] w-56 h-36"
        fill="none"
        stroke="var(--sketch)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 8 132 C 40 104, 26 62, 68 70 C 108 78, 96 120, 74 110 C 54 100, 80 52, 128 46 C 162 42, 176 32, 188 24"
          strokeWidth="1.5"
          opacity="0.55"
          className="animate-draw-stroke"
          style={draw(330, 900, 2.2)}
        />
        <g transform="translate(184 2) scale(0.75)" strokeWidth="2.2">
          <path d="M 4 18 L 36 6 L 24 36 L 18 24 Z" className="animate-draw-stroke" style={draw(110, 2900, 0.9)} />
          <path d="M 18 24 L 36 6" className="animate-draw-stroke" style={draw(30, 3500, 0.4)} />
        </g>
      </svg>

      {/* Pencil hatching, like shading pressed in behind the stamp */}
      <svg
        viewBox="0 0 120 80"
        className="absolute right-[3.5%] 2xl:right-[7.5%] top-[49%] w-28 h-20"
        fill="none"
        stroke="var(--sketch)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.35"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <path
            key={i}
            d={`M ${8 + i * 12} 74 L ${30 + i * 12} ${8 + (i % 3) * 4}`}
            className="animate-draw-stroke"
            style={draw(75, 1400 + i * 90, 0.45)}
          />
        ))}
      </svg>
    </div>
  );
}

/** Faint coffee-cup ring: two roughened, uneven strokes. */
function CoffeeRing({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none">
      <defs>
        <filter id="coffee-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="9" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <g filter="url(#coffee-rough)" stroke="#8a5a32">
        <circle cx="100" cy="100" r="78" strokeWidth="5" opacity="0.5" strokeDasharray="300 18 110 9" />
        <circle cx="103" cy="98" r="73" strokeWidth="1.5" opacity="0.35" />
      </g>
    </svg>
  );
}

/** Handwritten nudge toward the ask box, drawn in once everything else has landed. */
function AskNudge() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[calc(50%+21rem+0.75rem)] -top-10 hidden w-48 xl:block"
    >
      <p
        className="font-hand text-lg leading-tight text-terracotta -rotate-[5deg] animate-fade-in-up"
        style={{ animationDelay: '1500ms' }}
      >
        go on, ask me anything!
      </p>
      <svg viewBox="0 0 80 60" className="ml-2 mt-1 w-16 h-12" fill="none" stroke="var(--terracotta)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M 60 4 Q 58 34, 12 46" className="animate-draw-stroke" style={draw(75, 1800, 0.7)} />
        <path d="M 12 46 L 24 36 M 12 46 L 25 53" className="animate-draw-stroke" style={draw(35, 2400, 0.35)} />
      </svg>
    </div>
  );
}

/** Rubber-stamp seal: roughened ink edges, slowly turning ring of words. */
function InkStamp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden fill="none">
      <defs>
        <filter id="stamp-rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" result="rough" />
          {/* Knock speckles out of the ink so it reads as pressed, not printed */}
          <feComponentTransfer in="noise" result="speckle">
            <feFuncA type="discrete" tableValues="1 1 1 1 0 1 1 1" />
          </feComponentTransfer>
          <feComposite in="rough" in2="speckle" operator="in" />
        </filter>
        <path id="stamp-ring" d="M 100,100 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
      </defs>
      <g filter="url(#stamp-rough)" stroke="var(--terracotta)" fill="var(--terracotta)">
        <circle cx="100" cy="100" r="94" strokeWidth="3.5" fill="none" />
        <circle cx="100" cy="100" r="87" strokeWidth="1.2" fill="none" />
        <circle cx="100" cy="100" r="50" strokeWidth="1.2" fill="none" />
        <g className="animate-spin-slow">
          <text
            stroke="none"
            fontSize="15"
            fontWeight="700"
            style={{ fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '0.2em' }}
          >
            <textPath href="#stamp-ring" textLength="430" lengthAdjust="spacing">
              AI ✦ PRODUCT ✦ DATA ✦ DESIGN ✦
            </textPath>
          </text>
        </g>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          stroke="none"
          fontSize="34"
          fontStyle="italic"
          style={{ fontFamily: 'var(--font-fraunces), serif' }}
        >
          C.L.
        </text>
      </g>
    </svg>
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

      <CoffeeRing className="pointer-events-none absolute -right-36 top-10 w-64 h-64 opacity-40 sm:w-80 sm:h-80 xl:right-auto xl:top-auto xl:left-[15%] xl:bottom-[3%] xl:w-72 xl:h-72" />

      {/* Desk clutter in the wide-screen margins: sticky note left, ink stamp right */}
      <MarginSketches />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        <SparkleStar className="absolute left-[18%] top-[40%] w-9 h-9 animate-float-soft" />
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

      <div className="absolute right-[5%] 2xl:right-[9%] top-[26%] z-10 hidden xl:block animate-fade-in-up animation-delay-800">
        <InkStamp className="w-52 h-52 rotate-[10deg] opacity-85 mix-blend-multiply" />
      </div>

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
            I turn business needs into{' '}
            <span className="relative inline-block font-medium text-ink">
              useful AI products
              <ScribbleCircle className="draw-late pointer-events-none absolute -left-8 -top-4 h-[calc(100%+2rem)] w-[calc(100%+4rem)]" strokeWidth={2} animate />
            </span>.
          </p>

          <div className="relative mt-10 animate-fade-in-up animation-delay-600">
            <HeroAsk />
            <AskNudge />
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
