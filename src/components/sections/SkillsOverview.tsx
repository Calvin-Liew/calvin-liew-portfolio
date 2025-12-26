'use client';

import Container from '../layout/Container';
import Section from '../layout/Section';
import Badge from '../ui/Badge';
import { aboutData } from '@/data/about';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function SkillsOverview() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section>
      <Container>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Combining technical skills, design thinking, and business strategy to build impactful products.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          {aboutData.skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className="text-lg font-semibold text-foreground mb-4 border-b border-foreground/10 pb-2">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <Badge key={skill} variant="skill">{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
