import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ProjectsClient from '@/components/projects/ProjectsClient';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my product management, UI/UX design, and data analysis projects. From AI-driven solutions to user-centered design.',
};

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Projects
          </h1>
          <p className="text-lg text-secondary max-w-3xl">
            A comprehensive collection of my work in product management, design, and data analysis.
            Filter by category to explore specific areas of expertise.
          </p>
        </div>

        <ProjectsClient projects={projects} />
      </Container>
    </Section>
  );
}
