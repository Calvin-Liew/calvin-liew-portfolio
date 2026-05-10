'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Container from './Container';
import SocialLinks from '../ui/SocialLinks';
import Button from '../ui/Button';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
];

/* Logo mark — `calvin.` lowercase in Kalam with terracotta period */
function LogoMark({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'text-4xl md:text-5xl' : 'text-3xl';
  return (
    <span
      className={`inline-block leading-none ${sizeClass} ${className}`}
      style={{
        fontFamily: 'var(--font-kalam), cursive',
        fontWeight: 700,
        transform: 'rotate(-3deg)',
      }}
    >
      <span className="text-ink">calvin</span>
      <span className="text-terracotta">.</span>
    </span>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useLockBodyScroll(mobileMenuOpen);
  const menuRef = useFocusTrap(mobileMenuOpen);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Scroll-state shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu with animation
  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 200);
  };

  // ESC to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) closeMenu();
    };
    if (mobileMenuOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-paper border-b border-terracotta/30'
            : `bg-paper/85 backdrop-blur-md border-b ${
                scrolled ? 'border-border shadow-paper' : 'border-border/40'
              }`
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between py-4 sm:py-5" aria-label="Global">
            {/* Logo */}
            <div className="flex md:shrink-0">
              <Link
                href="/"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Home — Calvin Liew"
              >
                <LogoMark />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="touch-target-enhanced inline-flex items-center justify-center rounded-lg p-3 text-ink hover:text-terracotta hover:bg-terracotta-wash transition-all duration-200"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop nav — lowercase, letter-spaced, marker-highlight on active */}
            <div className="hidden md:flex md:flex-1 md:justify-center md:gap-x-9">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm lowercase tracking-[0.06em] transition-colors duration-200 ${
                      active
                        ? 'text-ink pointer-events-none'
                        : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    <span className={active ? 'marker-highlight font-medium' : ''}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA — Kalam handwritten `say hi →` */}
            <div className="hidden md:flex md:items-center md:ml-6 md:shrink-0">
              <Link
                href="/profile#contact"
                className="text-lg text-terracotta hover:text-terracotta-deep hover:translate-x-0.5 transition-all duration-200 inline-flex items-center"
                style={{
                  fontFamily: 'var(--font-kalam), cursive',
                  transform: 'rotate(-3deg)',
                }}
              >
                say hi&nbsp;→
              </Link>
            </div>
          </nav>
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          style={{
            background:
              'linear-gradient(135deg, var(--paper) 0%, var(--paper-deeper) 50%, var(--paper-edge) 100%)',
          }}
          className={`fixed inset-0 z-[60] ${
            isClosing ? 'animate-menu-fade-out' : 'animate-menu-fade-in'
          }`}
        >
          <div className="w-full h-full flex flex-col justify-between p-8 md:p-12">
            {/* Top row: logo + close */}
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-delayed">
                <LogoMark size="lg" />
              </div>
              <button
                type="button"
                className="touch-target-enhanced inline-flex items-center justify-center rounded-full p-3 text-ink-soft hover:text-terracotta hover:bg-terracotta-wash hover:rotate-90 transition-all duration-300"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Centered nav */}
            <nav className="flex-1 flex items-center" aria-label="Mobile navigation">
              <div className="space-y-3 w-full max-w-md">
                {navigation.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      style={{ animationDelay: `${150 + index * 75}ms` }}
                      className={`block px-4 py-3 lowercase tracking-[0.04em] font-display italic text-3xl md:text-4xl transition-all duration-300 ease-out animate-fade-slide-in ${
                        active ? 'text-ink' : 'text-ink-soft hover:text-ink hover:translate-x-2'
                      }`}
                    >
                      <span className={active ? 'marker-highlight' : ''}>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer: CTA + socials */}
            <div className="space-y-5 animate-fade-in-delayed max-w-md" style={{ animationDelay: '450ms' }}>
              <Button
                href="/profile#contact"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                say hi
              </Button>
              <div>
                <p
                  className="text-base text-terracotta mb-3 inline-block"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-3deg)',
                  }}
                >
                  let&apos;s connect
                </p>
                <SocialLinks variant="header" className="justify-start gap-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
