import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description.substring(0, 160),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <Section>
      <Container>
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-accent hover:text-primary font-medium mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <div className="max-w-4xl">
          {/* Category Badge */}
          <Badge variant="category" className="mb-4">
            {project.category}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            {project.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-secondary mb-8">
            <span className="font-medium">{project.organization}</span>
            <span>•</span>
            <span>{project.dates}</span>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-10">
            <p className="text-lg text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-primary mb-4">Project Links</h2>
              <div className="flex flex-col gap-3">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-primary font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {link.label || link.type}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
