import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import MetaBadge from '@/components/ui/MetaBadge';
import Button from '@/components/ui/Button';
import { BookOpen, Building2, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';
import CaseStudyViewer from '@/components/projects/CaseStudyViewer';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.description.substring(0, 160),
  };
}

// Reusable section heading: Fraunces italic with terracotta period
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display italic text-3xl sm:text-4xl text-ink mb-6 leading-tight">
      {children}
      <span className="text-terracotta not-italic">.</span>
    </h2>
  );
}

// Subtle hand-drawn divider between sections
function SectionDivider() {
  return (
    <div aria-hidden className="my-12">
      <svg viewBox="0 0 800 8" preserveAspectRatio="none" className="w-full h-2">
        <path
          d="M 4 4 Q 200 1, 400 4 T 796 3"
          stroke="var(--border-strong)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center text-base text-terracotta hover:text-terracotta-deep hover:-translate-x-1 transition-all duration-200 mb-10"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            &larr; back to projects
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="mb-4">
              <Badge variant="category">{project.category}</Badge>
            </div>

            <h1 className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-ink mb-6 leading-[1.05]">
              {project.title}
              <span className="text-terracotta not-italic">.</span>
            </h1>

            {/* Meta line */}
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

            {/* Lead description */}
            <p className="text-lg sm:text-xl text-ink-soft leading-relaxed">
              {project.description}
            </p>
          </header>

          {/* Project links */}
          {project.links && project.links.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-3">
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
                    <ExternalLink className="w-4 h-4" />
                    {link.label || link.type}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Skills */}
          <section className="mb-12">
            <h2 className="text-sm uppercase tracking-wider text-muted mb-4">
              Skills used
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {project.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </section>

          {/* Extended content */}
          {project.extendedContent && (
            <>
              {/* Overview */}
              {project.extendedContent.overview && (
                <>
                  <SectionDivider />
                  <section>
                    <SectionHeading>
                      {project.extendedContent.overview.title}
                    </SectionHeading>
                    <p className="text-lg text-ink-soft leading-relaxed">
                      {project.extendedContent.overview.content}
                    </p>
                  </section>
                </>
              )}

              {/* Motivation */}
              {project.extendedContent.motivation && (
                <>
                  <SectionDivider />
                  <section>
                    <SectionHeading>
                      {project.extendedContent.motivation.title}
                    </SectionHeading>
                    <p className="text-lg text-ink-soft leading-relaxed">
                      {project.extendedContent.motivation.content}
                    </p>
                  </section>
                </>
              )}

              {/* Datasets */}
              {project.extendedContent.datasets &&
                project.extendedContent.datasets.length > 0 && (
                  <>
                    <SectionDivider />
                    <section>
                      <SectionHeading>Datasets</SectionHeading>
                      <div className="space-y-4">
                        {project.extendedContent.datasets.map(
                          (dataset, index) => (
                            <div
                              key={index}
                              className="bg-paper-deeper border border-border rounded-xl p-5 shadow-paper"
                            >
                              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                                <h3 className="font-mono text-sm text-ink font-semibold">
                                  {dataset.name}
                                </h3>
                                <span
                                  className="text-sm text-terracotta inline-block"
                                  style={{
                                    fontFamily: 'var(--font-kalam), cursive',
                                    transform: 'rotate(-2deg)',
                                  }}
                                >
                                  {dataset.records}
                                </span>
                              </div>
                              <p className="text-sm text-ink-soft leading-relaxed">
                                {dataset.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Methodology */}
              {project.extendedContent.methodology && (
                <>
                  <SectionDivider />
                  <section>
                    <SectionHeading>
                      {project.extendedContent.methodology.title}
                    </SectionHeading>
                    <ol className="space-y-6">
                      {project.extendedContent.methodology.steps.map(
                        (step, index) => (
                          <li key={index} className="flex gap-4">
                            <div
                              aria-hidden
                              className="flex-shrink-0 w-9 h-9 rounded-full bg-terracotta text-paper flex items-center justify-center text-base font-display font-semibold"
                            >
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display text-lg text-ink mb-1 leading-snug">
                                {step.phase}
                              </h3>
                              <p className="text-base text-ink-soft leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </li>
                        )
                      )}
                    </ol>
                  </section>
                </>
              )}

              {/* Key findings */}
              {project.extendedContent.keyFindings &&
                project.extendedContent.keyFindings.length > 0 && (
                  <>
                    <SectionDivider />
                    <section>
                      <SectionHeading>Key findings</SectionHeading>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.extendedContent.keyFindings.map(
                          (finding, index) => (
                            <div
                              key={index}
                              className="bg-paper-deeper border border-border rounded-xl p-5 shadow-paper"
                            >
                              <h3 className="font-display text-lg text-ink mb-2 leading-snug">
                                {finding.title}
                              </h3>
                              <p className="text-sm text-ink-soft leading-relaxed">
                                {finding.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Features */}
              {project.extendedContent.features &&
                project.extendedContent.features.length > 0 && (
                  <>
                    <SectionDivider />
                    <section>
                      <SectionHeading>Key features</SectionHeading>
                      <div className="space-y-4">
                        {project.extendedContent.features.map(
                          (feature, index) => (
                            <div
                              key={index}
                              className="bg-paper-deeper border border-border rounded-xl p-5 shadow-paper"
                            >
                              <h3 className="font-display text-lg text-ink mb-2 leading-snug">
                                {feature.title}
                              </h3>
                              <p className="text-base text-ink-soft leading-relaxed mb-3">
                                {feature.description}
                              </p>
                              <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2
                                  className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5"
                                  aria-hidden
                                />
                                <span className="text-terracotta-deep font-medium">
                                  {feature.insight}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Visualizations */}
              {project.extendedContent.visualizations &&
                project.extendedContent.visualizations.length > 0 && (
                  <>
                    <SectionDivider />
                    <section>
                      <SectionHeading>Visualizations</SectionHeading>
                      <div className="space-y-4">
                        {project.extendedContent.visualizations.map(
                          (viz, index) => (
                            <div
                              key={index}
                              className="bg-paper-deeper border border-border rounded-xl p-5 shadow-paper"
                            >
                              <h3 className="font-display text-lg text-ink mb-2 leading-snug">
                                {viz.title}
                              </h3>
                              <p className="text-base text-ink-soft leading-relaxed mb-3">
                                {viz.description}
                              </p>
                              <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2
                                  className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5"
                                  aria-hidden
                                />
                                <span className="text-terracotta-deep font-medium">
                                  {viz.insight}
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Tools */}
              {project.extendedContent.tools &&
                project.extendedContent.tools.length > 0 && (
                  <>
                    <SectionDivider />
                    <section>
                      <SectionHeading>Tools &amp; technologies</SectionHeading>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {project.extendedContent.tools.map((tool, index) => (
                          <div
                            key={index}
                            className="bg-paper-deeper border border-border rounded-xl p-5 shadow-paper flex flex-col"
                          >
                            <h3 className="font-display text-base text-ink mb-2">
                              {tool.name}
                            </h3>
                            <p className="text-sm text-ink-soft leading-relaxed">
                              {tool.purpose}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}

              {/* Impact */}
              {project.extendedContent.impact && (
                <>
                  <SectionDivider />
                  <section className="bg-terracotta-wash border border-terracotta/30 rounded-2xl p-6 sm:p-8 shadow-paper">
                    <SectionHeading>
                      {project.extendedContent.impact.title}
                    </SectionHeading>
                    <div className="text-base sm:text-lg text-ink-soft leading-relaxed space-y-4">
                      {project.extendedContent.impact.content
                        .split('\n\n')
                        .map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                  </section>
                </>
              )}
            </>
          )}

          {/* Case study viewer */}
          {project.caseStudy && (
            <>
              <SectionDivider />
              <CaseStudyViewer
                fileName={project.caseStudy.fileName}
                title={
                  project.caseStudy.title || `${project.title} Case Study`
                }
                projectTitle={project.title}
                fileSize={project.caseStudy.fileSize}
              />
            </>
          )}
        </article>
      </Container>
    </Section>
  );
}
