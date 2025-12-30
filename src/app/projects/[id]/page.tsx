import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import MetaBadge from '@/components/ui/MetaBadge';
import Button from '@/components/ui/Button';
import { BookOpen, Building2, Calendar } from 'lucide-react';
import CaseStudyViewer from '@/components/projects/CaseStudyViewer';
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
        <div className="max-w-4xl mx-auto relative">
          {/* Floating category badge - top right */}
          <Badge variant="category" className="absolute top-0 right-0 hidden sm:block">
            {project.category}
          </Badge>

          {/* Back button */}
          <Link
            href="/projects"
            className="inline-flex items-center text-cosmic-purple hover:text-cosmic-cyan font-medium mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 pr-32">
            {project.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {project.courseCode && (
              <MetaBadge
                icon={BookOpen}
                text={project.courseCode}
                variant="emphasized"
                title={project.courseCode}
              />
            )}
            <MetaBadge icon={Building2} text={project.organization} />
            <MetaBadge icon={Calendar} text={project.dates} />
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-lg text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Links - Moved here for prominence */}
          {project.links && project.links.length > 0 && (
            <div className="mb-10">
              <div className="flex flex-wrap gap-3">
                {project.links.map((link, index) => {
                  const isPrimary = link.type === 'live' || index === 0;
                  return (
                    <Button
                      key={index}
                      href={link.url}
                      variant={isPrimary ? 'gradient' : 'secondary'}
                      size="md"
                      target="_blank"
                      className="gap-2"
                      ariaLabel={link.label || `View ${link.type}`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {link.label || link.type}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Skills & Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Extended Content Sections */}
          {project.extendedContent && (
            <div className="space-y-12">
              {/* Overview Section */}
              {project.extendedContent.overview && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-4">{project.extendedContent.overview.title}</h2>
                  <p className="text-secondary leading-relaxed">{project.extendedContent.overview.content}</p>
                </div>
              )}

              {/* Motivation Section */}
              {project.extendedContent.motivation && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-4">{project.extendedContent.motivation.title}</h2>
                  <p className="text-secondary leading-relaxed">{project.extendedContent.motivation.content}</p>
                </div>
              )}

              {/* Datasets Section */}
              {project.extendedContent.datasets && project.extendedContent.datasets.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-6">Datasets</h2>
                  <div className="space-y-4">
                    {project.extendedContent.datasets.map((dataset, index) => (
                      <div key={index} className="p-5 rounded-lg bg-gradient-to-br from-cosmic-purple/5 to-cosmic-cyan/5 border border-cosmic-purple/20">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-primary font-mono text-sm">{dataset.name}</h3>
                          <Badge variant="category" className="text-xs">{dataset.records}</Badge>
                        </div>
                        <p className="text-sm text-secondary leading-relaxed">{dataset.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Methodology Section */}
              {project.extendedContent.methodology && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-6">{project.extendedContent.methodology.title}</h2>
                  <div className="space-y-4">
                    {project.extendedContent.methodology.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-purple to-cosmic-cyan flex items-center justify-center text-white font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary mb-1">{step.phase}</h3>
                          <p className="text-sm text-secondary leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Findings Section */}
              {project.extendedContent.keyFindings && project.extendedContent.keyFindings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-6">Key Findings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.extendedContent.keyFindings.map((finding, index) => (
                      <div key={index} className="p-5 rounded-lg bg-gradient-to-br from-cosmic-purple/10 to-cosmic-cyan/10 border border-cosmic-purple/30">
                        <h3 className="font-semibold text-cosmic-purple mb-2">{finding.title}</h3>
                        <p className="text-sm text-secondary leading-relaxed">{finding.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features Section */}
              {project.extendedContent.features && project.extendedContent.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-6">Key Features</h2>
                  <div className="space-y-6">
                    {project.extendedContent.features.map((feature, index) => (
                      <div key={index} className="p-5 rounded-lg bg-gradient-to-br from-cosmic-purple/5 to-cosmic-cyan/5 border border-cosmic-purple/20">
                        {/* Feature Image */}
                        {feature.image && (
                          <div className="relative w-full mb-4 rounded-lg overflow-hidden bg-surface-dark border border-border-light">
                            <Image
                              src={feature.image}
                              alt={feature.imageAlt || feature.title}
                              width={1200}
                              height={675}
                              className="w-full h-auto object-contain"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />
                          </div>
                        )}

                        <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                        <p className="text-sm text-secondary leading-relaxed mb-2">{feature.description}</p>
                        <div className="flex items-start gap-2 text-xs">
                          <svg className="w-4 h-4 text-cosmic-purple flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-cosmic-purple font-medium">{feature.insight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visualizations Section */}
              {project.extendedContent.visualizations && project.extendedContent.visualizations.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-6">Visualizations Created</h2>
                  <div className="space-y-6">
                    {project.extendedContent.visualizations.map((viz, index) => (
                      <div key={index} className="p-5 rounded-lg bg-gradient-to-br from-cosmic-purple/5 to-cosmic-cyan/5 border border-cosmic-purple/20">
                        {/* Visualization Image */}
                        {viz.image && (
                          <div className="relative w-full mb-4 rounded-lg overflow-hidden bg-surface-dark border border-border-light">
                            <Image
                              src={viz.image}
                              alt={viz.imageAlt || viz.title}
                              width={1200}
                              height={675}
                              className="w-full h-auto object-contain"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />
                          </div>
                        )}

                        <h3 className="font-semibold text-primary mb-2">{viz.title}</h3>
                        <p className="text-sm text-secondary leading-relaxed mb-2">{viz.description}</p>
                        <div className="flex items-start gap-2 text-xs">
                          <svg className="w-4 h-4 text-cosmic-purple flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-cosmic-purple font-medium">{viz.insight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Section */}
              {project.extendedContent.tools && project.extendedContent.tools.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-6">Tools & Technologies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {project.extendedContent.tools.map((tool, index) => (
                      <div key={index} className="p-5 rounded-lg bg-gradient-to-br from-cosmic-purple/5 to-cosmic-cyan/5 border border-cosmic-purple/20 flex flex-col">
                        <h3 className="font-semibold text-primary mb-3 text-base">{tool.name}</h3>
                        <p className="text-sm text-secondary leading-relaxed">{tool.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Impact Section */}
              {project.extendedContent.impact && (
                <div className="p-6 rounded-lg bg-gradient-to-br from-cosmic-purple/10 to-cosmic-cyan/10 border border-cosmic-purple/30">
                  <h2 className="text-2xl font-semibold text-primary mb-4">{project.extendedContent.impact.title}</h2>
                  <div className="text-secondary leading-relaxed space-y-4">
                    {project.extendedContent.impact.content.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Case Study Section */}
          {project.caseStudy && (
            <div className="mt-12">
              <CaseStudyViewer
                fileName={project.caseStudy.fileName}
                title={project.caseStudy.title || `${project.title} Case Study`}
                projectTitle={project.title}
                fileSize={project.caseStudy.fileSize}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
