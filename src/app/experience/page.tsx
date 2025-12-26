import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ExperienceCard from '@/components/experience/ExperienceCard';
import Education from '@/components/sections/Education';
import { experiences } from '@/data/experience';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience in product management, design, and technology. Currently at Sanofi, previously at University of Toronto and The Marketing Group.',
};

export default function ExperiencePage() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Experience
          </h1>
          <p className="text-lg text-secondary max-w-3xl">
            My professional journey in product management, design, and technology.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        <Education />
      </Container>
    </Section>
  );
}
