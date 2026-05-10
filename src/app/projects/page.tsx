import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ProjectsClient from '@/components/projects/ProjectsClient';
import MarkerHighlight from '@/components/ui/MarkerHighlight';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my product management, UI/UX design, and data analysis projects. From AI-driven solutions to user-centered design.',
};

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <div className="mb-12 max-w-4xl">
          <p
            className="text-2xl text-terracotta mb-2 inline-block"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-3deg)',
            }}
          >
            the work —
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl text-ink mb-5 leading-[1.05]">
            <span className="inline-flex items-baseline gap-3 flex-wrap">
              <span>
                Projects<span className="text-terracotta not-italic">.</span>
              </span>
              <span
                className="text-terracotta text-2xl inline-block not-italic font-normal"
                style={{
                  fontFamily: 'var(--font-kalam), cursive',
                  transform: 'rotate(-2deg)',
                }}
              >
                (everything I&apos;ve built)
              </span>
            </span>
          </h1>
          <p className="text-lg text-ink-soft max-w-3xl">
            A full collection of work across{' '}
            <MarkerHighlight className="font-medium text-ink">
              AI agents, product, and data
            </MarkerHighlight>
            . Filter by category or skill to dig in.
          </p>
        </div>

        <ProjectsClient projects={projects} />
      </Container>
    </Section>
  );
}
