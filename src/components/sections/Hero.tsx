'use client';

import { useEffect, useState } from 'react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';
import { HandUnderline, HandArrow } from '../ui/HandDrawn';
import MarkerHighlight from '../ui/MarkerHighlight';

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollable = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.scrollY;
          const progress = scrollable > 0 ? (scrolled / scrollable) * 100 : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden -mt-20 sm:-mt-24 pt-28 sm:pt-32 pb-20">
      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow — handwritten greeting */}
          <p
            className="text-2xl sm:text-3xl text-terracotta mb-1 inline-block animate-fade-in-up"
            style={{ fontFamily: 'var(--font-kalam), cursive', transform: 'rotate(-3deg)' }}
          >
            hi, i&apos;m &mdash;
          </p>

          {/* Name — asymmetric, mixed-typography */}
          <div className="relative mb-10 animate-fade-in-up animation-delay-200">
            <h1 className="leading-[0.9] mb-0">
              <span
                className="block text-7xl sm:text-8xl lg:text-[10rem] text-ink"
                style={{
                  fontFamily: 'var(--font-kalam), cursive',
                  fontWeight: 700,
                  transform: 'rotate(-1.5deg)',
                  marginLeft: '-0.5rem',
                }}
              >
                Calvin
              </span>
              <span className="block font-display italic text-6xl sm:text-7xl lg:text-9xl text-ink -mt-2 sm:-mt-4 ml-12 sm:ml-24 lg:ml-40">
                Liew<span className="text-terracotta not-italic">.</span>
              </span>
            </h1>
            <HandUnderline
              className="absolute bottom-1 left-12 sm:left-24 lg:left-40 w-[55%] sm:w-[44%] lg:w-[36%] h-3"
              animate
            />
          </div>

          {/* Two-column: blurb + CTAs left, currently card right */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">
            {/* LEFT: subhead, paragraph, CTAs, socials */}
            <div className="max-w-xl animate-fade-in-up animation-delay-400">
              <p className="text-xl sm:text-2xl text-ink-soft leading-snug mb-6 text-balance">
                I ship products at the intersection of{' '}
                <MarkerHighlight className="font-medium text-ink" delay={400}>
                  AI agents, data, and product strategy
                </MarkerHighlight>
                .
              </p>

              <p className="text-base text-muted leading-relaxed mb-8 max-w-lg text-pretty">
                Right now I&apos;m leading <span className="text-ink font-medium">SupRM Intelligence</span> at Sanofi &mdash; an AI agent that turns scattered supplier data into real-time risk, performance, and QBR insight for 30+ stakeholders.
              </p>

              {/* "start here" annotation */}
              <div className="hidden sm:block mb-2 ml-4" aria-hidden>
                <span
                  className="text-base text-terracotta inline-block whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-5deg)',
                  }}
                >
                  start here ↓
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button href="/projects" variant="primary" size="lg">
                  View my work
                </Button>
                <Button href="/profile#contact" variant="secondary" size="lg">
                  Get in touch
                </Button>
              </div>

              <div className="mt-10">
                <SocialLinks className="justify-start" />
              </div>
            </div>

            {/* RIGHT: "currently" card — taped paper note, slight tilt, no live indicator */}
            <aside className="relative w-full lg:w-[320px] animate-fade-in-up animation-delay-600">
              <div className="relative bg-paper-deeper border border-border rounded-2xl shadow-paper p-6 tilt-r-half">
                {/* Tape detail at top */}
                <div
                  className="absolute -top-3 left-1/2 w-20 h-5 rounded-sm shadow-sm"
                  style={{
                    background: 'rgba(254, 215, 170, 0.85)',
                    transform: 'translate(-50%, 0) rotate(-3deg)',
                  }}
                  aria-hidden
                />

                {/* "currently" Kalam label */}
                <div className="mb-4">
                  <span
                    className="text-base text-ink-soft inline-block"
                    style={{
                      fontFamily: 'var(--font-kalam), cursive',
                      transform: 'rotate(-2deg)',
                    }}
                  >
                    currently
                  </span>
                </div>

                {/* Role + company */}
                <p className="text-base text-ink leading-snug mb-1 font-medium">
                  AI Workflows Product Analyst
                </p>
                <p className="text-sm text-ink-soft mb-4">
                  at <span className="font-medium text-ink">Sanofi</span>
                </p>

                <div className="h-px bg-border mb-4" />

                {/* Handwritten note */}
                <p
                  className="text-base text-terracotta leading-snug"
                  style={{ fontFamily: 'var(--font-kalam), cursive' }}
                >
                  shipping SupRM Intelligence &mdash; an AI agent for supplier relationships.
                </p>

                {/* "On my mind" footer */}
                <div className="mt-5 pt-3 border-t border-border/60">
                  <p className="text-xs uppercase tracking-wider text-muted mb-1">
                    On my mind
                  </p>
                  <p className="text-sm text-ink-soft">
                    Where AI agents fit inside enterprise workflows.
                  </p>
                </div>
              </div>

              {/* "what i'm up to" annotation pointing at the card */}
              <div
                aria-hidden
                className="hidden lg:flex absolute -left-20 top-8 flex-col items-end pointer-events-none"
              >
                <span
                  className="text-sm text-terracotta whitespace-nowrap mb-1"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-6deg)',
                  }}
                >
                  what i&apos;m up to
                </span>
                <HandArrow
                  className="w-14 h-10 -mr-4"
                  direction="down-right"
                />
              </div>
            </aside>
          </div>
        </div>
      </Container>

      {/* Subtle scroll indicator at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-70">
        <div className="relative w-0.5 h-12 bg-border-strong/60 rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-terracotta transition-all duration-300 ease-out"
            style={{ height: `${Math.min(scrollProgress * 3, 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
