'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './Container';
import SocialLinks from '../ui/SocialLinks';

const navigation = [
  { name: 'home', href: '/' },
  { name: 'profile', href: '/profile' },
  { name: 'projects', href: '/projects' },
  { name: 'blog', href: '/blog' },
];

export default function Footer() {
  const [colophonOpen, setColophonOpen] = useState(false);

  return (
    <footer className="relative bg-paper">
      {/* Hand-drawn divider sits flush at the top of the footer */}
      <div className="absolute -top-2 left-0 right-0" aria-hidden>
        <svg
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
          className="w-full h-3"
          fill="none"
        >
          <path
            d="M 4 6 Q 200 3, 400 6 T 800 5 Q 1000 7, 1196 5"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Container>
        <div className="pt-12 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo — clickable to expand colophon */}
            <button
              type="button"
              onClick={() => setColophonOpen((v) => !v)}
              className="hover:opacity-80 transition-opacity cursor-pointer"
              aria-label={colophonOpen ? 'Close colophon' : 'Show colophon'}
              aria-expanded={colophonOpen}
            >
              <span
                className="inline-block text-3xl leading-none"
                style={{
                  fontFamily: 'var(--font-kalam), cursive',
                  fontWeight: 700,
                  transform: 'rotate(-3deg)',
                }}
              >
                <span className="text-ink">calvin</span>
                <span className="text-terracotta">.</span>
              </span>
            </button>

            {/* Mini nav */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 lowercase tracking-[0.04em] text-sm">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Social */}
            <SocialLinks variant="footer" />
          </div>

          {/* Colophon — magazine-masthead style reveal */}
          {colophonOpen && (
            <div className="mt-10 pt-8 border-t border-border/60 animate-fade-in-up">
              <div className="max-w-3xl mx-auto">
                <p
                  className="text-base text-terracotta mb-4 inline-block"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-2deg)',
                  }}
                >
                  the colophon &mdash;
                </p>
                <h3 className="font-display italic text-2xl text-ink mb-6">
                  Notes from the workshop
                  <span className="text-terracotta not-italic">.</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted mb-2">
                      Type
                    </p>
                    <ul className="space-y-1 text-sm text-ink-soft">
                      <li>
                        <span className="font-display italic text-ink">Fraunces</span>{' '}
                        <span className="text-muted">— display</span>
                      </li>
                      <li>
                        <span className="text-ink">Inter</span>{' '}
                        <span className="text-muted">— body</span>
                      </li>
                      <li>
                        <span
                          style={{
                            fontFamily: 'var(--font-kalam), cursive',
                            color: 'var(--terracotta)',
                          }}
                        >
                          Kalam
                        </span>{' '}
                        <span className="text-muted">— annotations</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted mb-2">
                      Palette
                    </p>
                    <ul className="space-y-1 text-sm text-ink-soft">
                      <li className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="w-3 h-3 rounded-full border border-border-strong"
                          style={{ background: 'var(--paper)' }}
                        />
                        paper · #F8F4EE
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="w-3 h-3 rounded-full"
                          style={{ background: 'var(--ink)' }}
                        />
                        ink · #1F1A17
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="w-3 h-3 rounded-full"
                          style={{ background: 'var(--terracotta)' }}
                        />
                        terracotta · #C2410C
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted mb-2">
                      Stack
                    </p>
                    <ul className="space-y-1 text-sm text-ink-soft">
                      <li>Next.js + React</li>
                      <li>Tailwind CSS v4</li>
                      <li>Hand-drawn SVG kit</li>
                    </ul>
                  </div>
                </div>

                <p
                  className="text-base text-ink-soft inline-block"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-1deg)',
                  }}
                >
                  designed &amp; built by hand in toronto
                  <span className="text-terracotta">.</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
