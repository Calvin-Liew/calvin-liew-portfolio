'use client';

import Container from '../layout/Container';
import Section from '../layout/Section';
import ContactCard from '../ui/ContactCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function QuickContact() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section background="surface" id="contact" className="relative overflow-hidden">
      <Container className="relative z-10">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <ContactCard />
        </div>
      </Container>
    </Section>
  );
}
