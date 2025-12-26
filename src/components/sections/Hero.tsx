'use client';

import { useEffect, useState } from 'react';
import Container from '../layout/Container';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';
import AnimatedBackground from '../ui/AnimatedBackground';

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Layer */}
      <AnimatedBackground />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting + Name */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight animate-fade-in-up gradient-text">
            Hey, I'm Calvin Liew.
          </h1>

          {/* Engaging description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-secondary font-normal leading-relaxed animate-fade-in-up animation-delay-200">
            I turn complex ideas into well-designed, scalable products.
            <br className="hidden sm:block" />
            Bridging strategy, technology, and user experience to create real impact.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up animation-delay-400">
            <Button
              href="/projects"
              variant="gradient"
              size="lg"
            >
              View My Work
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
            >
              Get in Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-8 animate-fade-in-up animation-delay-600">
            <SocialLinks className="justify-center" />
          </div>
        </div>
      </Container>

      {/* Progressive scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="relative w-0.5 h-16 sm:h-20 bg-border-light rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-cosmic-purple via-cosmic-blue to-cosmic-cyan transition-all duration-300 ease-out"
            style={{ height: `${Math.min(scrollProgress * 3, 100)}%` }}
          />
        </div>
        <svg
          className={`w-4 h-4 text-cosmic-purple transition-all duration-500 ${scrollProgress > 5 ? 'opacity-0' : 'opacity-100 animate-bounce'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
