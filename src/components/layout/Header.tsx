'use client';

import Link from 'next/link';
import { useState } from 'react';
import Container from './Container';
import SocialLinks from '../ui/SocialLinks';
import Button from '../ui/Button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Experience', href: '/experience' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border-light">
      <Container>
        <nav className="flex items-center justify-between py-5" aria-label="Global">
          {/* Logo/Name */}
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="text-base font-semibold text-foreground hover:text-secondary transition-colors"
              aria-label="Home"
            >
              Calvin Liew
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground hover:text-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-secondary hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-linear-to-r after:from-cosmic-purple after:to-cosmic-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <SocialLinks variant="header" />
            <Button
              href="mailto:calvin.liew@mail.utoronto.ca"
              variant="gradient"
              size="sm"
            >
              Get in Touch
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in-up border-t border-border-light mt-2 backdrop-blur-sm bg-background/95">
            <div className="space-y-1 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary hover:text-foreground hover:bg-cosmic-purple/5 rounded-md transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Social links in mobile menu */}
            <div className="mt-6 pt-6 border-t border-border-light">
              <p className="text-xs text-secondary mb-3 px-3">Connect</p>
              <SocialLinks variant="header" className="px-3" />
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
