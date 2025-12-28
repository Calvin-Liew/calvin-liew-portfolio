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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useLockBodyScroll(mobileMenuOpen);

  // Focus trap for accessibility
  const menuRef = useFocusTrap(mobileMenuOpen);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Close menu with animation
  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/10 border-b border-cosmic-purple/20">
      <Container>
        <nav className="flex items-center justify-between py-5" aria-label="Global">
          {/* Logo/Name */}
          <div className="flex md:shrink-0">
            <Link
              href="/"
              className="text-2xl font-semibold text-white hover:scale-105 transition-all duration-300 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
              aria-label="Home"
            >
              Calvin Liew
            </Link>
          </div>

          {/* Mobile menu button - shown below md breakpoint (768px) */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="touch-target-enhanced inline-flex items-center justify-center rounded-lg p-3 text-foreground hover:text-cosmic-purple hover:bg-cosmic-purple/10 transition-all duration-200"
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

          {/* Desktop navigation - shown at md breakpoint (768px) and above */}
          <div className="hidden md:flex md:flex-1 md:justify-center md:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`text-base font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-300 ${
                  isActive(item.href)
                    ? 'text-cosmic-purple pointer-events-none after:w-full after:bg-gradient-to-r after:from-cosmic-purple after:to-cosmic-cyan'
                    : 'text-secondary hover:text-foreground after:w-0 after:bg-gradient-to-r after:from-cosmic-purple after:to-cosmic-cyan hover:after:w-full'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:ml-8 md:shrink-0">
            <Button
              href="/profile#contact"
              variant="gradient"
              size="sm"
            >
              Get in Touch
            </Button>
          </div>
        </nav>
      </Container>

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 mobile-menu-backdrop ${
            isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'
          }`}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Side menu - slides in from right */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className={`fixed inset-y-0 right-0 z-50 w-[280px] sm:w-[320px] bg-surface border-l border-border-light shadow-2xl flex flex-col ${
            isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'
          }`}
        >
          {/* Header - Fixed height */}
          <div className="flex items-center justify-between p-6 border-b border-border-light flex-shrink-0">
            <span className="text-lg font-semibold text-foreground">Menu</span>
            <button
              type="button"
              className="touch-target-enhanced inline-flex items-center justify-center rounded-lg p-2 text-secondary hover:text-cosmic-purple hover:bg-cosmic-purple/10 transition-all duration-200"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation - Flexible, scrollable */}
          <nav className="flex-1 overflow-y-auto p-6" aria-label="Mobile navigation">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-cosmic-purple/20 text-cosmic-purple border border-cosmic-purple/30'
                      : 'text-foreground hover:bg-cosmic-purple/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer - Fixed height */}
          <div className="flex-shrink-0 border-t border-border-light">
            <div className="p-6">
              <Button
                href="/profile#contact"
                variant="gradient"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Button>
            </div>
            <div className="px-6 pb-6">
              <p className="text-sm text-secondary mb-3">Connect</p>
              <SocialLinks variant="header" className="justify-start gap-3" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
