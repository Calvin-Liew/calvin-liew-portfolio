'use client';

import Container from '../layout/Container';
import Section from '../layout/Section';
import Button from '../ui/Button';
import SocialLinks from '../ui/SocialLinks';
import AnimatedBackground from '../ui/AnimatedBackground';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function QuickContact() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section background="surface" id="contact" className="relative overflow-hidden">
      {/* Animated Background Layer */}
      <AnimatedBackground />

      <Container className="relative z-10">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-secondary mb-8">
            I'm always open to new opportunities, collaborations, or just a friendly chat about tech and design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              href="mailto:calvin.liew@mail.utoronto.ca"
              variant="gradient"
              size="lg"
            >
              Send me an Email
            </Button>
            <Button
              href="https://www.linkedin.com/in/calvin-liew-/"
              variant="secondary"
              size="lg"
            >
              Connect on LinkedIn
            </Button>
          </div>

          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-px bg-border-light flex-1 max-w-25" />
            <span className="text-sm text-secondary">or find me on</span>
            <div className="h-px bg-border-light flex-1 max-w-25" />
          </div>

          <SocialLinks className="justify-center" />
        </div>
      </Container>
    </Section>
  );
}
