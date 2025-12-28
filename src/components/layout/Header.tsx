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
    }, 200); // Match animation duration
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
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        mobileMenuOpen
          ? 'bg-background border-b border-cosmic-purple/30'
          : 'bg-background/80 backdrop-blur-md border-b border-border-light/30'
      }`}>
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
                className="touch-target-enhanced inline-flex items-center justify-center rounded-lg p-3 text-foreground hover:text-cosmic-purple hover:bg-cosmic-purple/10 hover:scale-110 transition-all duration-200"
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
      </header>

      {/* Full-screen overlay menu - MOVED OUTSIDE header to prevent parent transparency */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          style={{
            background: 'linear-gradient(135deg, rgb(5, 5, 15) 0%, rgb(15, 5, 30) 50%, rgb(10, 5, 20) 100%)'
          }}
          className={`fixed inset-0 z-[60] ${
            isClosing ? 'animate-menu-fade-out' : 'animate-menu-fade-in'
          }`}
        >
          <div className="w-full h-full flex flex-col justify-between p-8 md:p-12">
            {/* Header Row - Logo left, Close right */}
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-delayed">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cosmic-purple via-cosmic-cyan to-cosmic-purple bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(167,139,250,0.5)]">
                  Calvin Liew
                </span>
              </div>

              <button
                type="button"
                className="touch-target-enhanced inline-flex items-center justify-center rounded-full p-3 text-gray-400 hover:text-white hover:bg-cosmic-purple/20 hover:scale-110 hover:rotate-90 transition-all duration-300"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation - Left aligned, vertically centered */}
            <nav className="flex-1 flex items-center" aria-label="Mobile navigation">
              <div className="space-y-4 w-full max-w-md">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    style={{ animationDelay: `${150 + (index * 75)}ms` }}
                    className={`block px-6 py-3.5 rounded-lg text-xl md:text-2xl font-semibold transition-all duration-300 ease-out animate-fade-slide-in ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-cosmic-purple/25 to-cosmic-cyan/25 border-l-4 border-l-cosmic-purple shadow-[0_0_20px_rgba(167,139,250,0.3)]'
                        : 'text-gray-300 hover:text-white hover:bg-cosmic-purple/15 hover:pl-8 hover:shadow-[0_0_15px_rgba(167,139,250,0.2)]'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer - Left aligned */}
            <div className="space-y-5 animate-fade-in-delayed max-w-md" style={{ animationDelay: '450ms' }}>
              <Button
                href="/profile#contact"
                variant="gradient"
                size="md"
                className="w-full hover:shadow-[0_0_25px_rgba(167,139,250,0.6)] transition-shadow duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Button>

              <div>
                <p className="text-xs uppercase tracking-wider text-cosmic-purple/70 font-semibold mb-3">
                  Connect with me
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
