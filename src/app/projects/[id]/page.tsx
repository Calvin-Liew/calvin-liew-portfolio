import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import MetaBadge from '@/components/ui/MetaBadge';
import Button from '@/components/ui/Button';
import { BookOpen, Building2, Calendar, CheckCircle2, ExternalLink } from 'lucide-react';
import CaseStudyViewer from '@/components/projects/CaseStudyViewer';
import ProjectSchema from '@/components/seo/ProjectSchema';
import { projects } from '@/data/projects';

/** Trim to `max` chars without cutting mid-word */
function seoTrunc(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.substring(0, max);
  return cut.substring(0, cut.lastIndexOf(' ')) + '…';
}

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

  const desc = seoTrunc(project.description, 155);
  const ogDesc = seoTrunc(project.description, 200);
  const projectUrl = `https://calvinliew.space/projects/${id}`;
  const ogImage = project.image
    ? {
        url: project.image,           // resolved against metadataBase
        width: 1440,
        height: 900,
        alt: `${project.title} — project preview`,
      }
    : undefined;

  return {
    title: project.title,
    description: desc,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      type: 'article',
      title: project.title,
      description: ogDesc,
      url: projectUrl,
      images: ogImage ? [ogImage] : undefined,
      tags: project.skills,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: ogDesc,
      images: ogImage ? [ogImage.url] : undefined,
    },
  };
}

// Editorial section heading: "chapter 03 — " Kalam eyebrow + Fraunces italic title with terracotta period
function ChapterHeading({
  number,
  children,
  eyebrow,
}: {
  number?: string;
  children: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-8">
      {(eyebrow || number) && (
        <p
          className="text-base sm:text-lg text-terracotta mb-2 inline-block"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            transform: 'rotate(-2deg)',
          }}
        >
          {eyebrow ?? `chapter ${number} —`}
        </p>
      )}
      <h2 className="font-display italic text-3xl sm:text-4xl text-ink leading-tight">
        {children}
        <span className="text-terracotta not-italic">.</span>
      </h2>
    </div>
  );
}

// Subtle hand-drawn divider — used between chapters with extra breathing room
function ChapterDivider() {
  return (
    <div aria-hidden className="my-16">
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

  // Track chapter numbering so each section gets a "chapter NN —" eyebrow
  let chapter = 0;
  const nextChapter = () => String(++chapter).padStart(2, '0');

  return (
    <Section>
      <Container>
        <article className="max-w-4xl mx-auto">
          {/* Structured data — CreativeWork + BreadcrumbList */}
          <ProjectSchema project={project} />

          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center text-base text-terracotta hover:text-terracotta-deep hover:-translate-x-1 transition-all duration-200 mb-12"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            &larr; back to projects
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="mb-5">
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

            {/* Lead description with drop cap on first letter */}
            <p className="text-lg sm:text-xl text-ink-soft leading-relaxed first-letter:font-display first-letter:italic first-letter:text-terracotta first-letter:text-6xl sm:first-letter:text-7xl first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.85]">
              {project.description}
            </p>
          </header>

          {/* Hero image */}
          {project.image && (
            <figure className="mb-14 relative overflow-hidden rounded-xl border border-border bg-paper-deeper shadow-paper">
              <Image
                src={project.image}
                alt={`${project.title} — hero image`}
                width={1600}
                height={900}
                sizes="(max-width: 768px) 100vw, 896px"
                className="w-full h-auto"
                priority
              />
            </figure>
          )}

          {/* Project links */}
          {project.links && project.links.length > 0 && (
            <div className="mb-14 flex flex-wrap gap-3">
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

          {/* Stats strip */}
          {project.extendedContent?.stats &&
            project.extendedContent.stats.length > 0 && (
              <section className="mb-14">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 py-8 px-6 sm:px-10 bg-paper-deeper border border-border rounded-2xl shadow-paper">
                  {project.extendedContent.stats.map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <p className="font-display italic text-3xl sm:text-4xl lg:text-5xl text-terracotta leading-none mb-2">
                        {stat.value}
                      </p>
                      <p
                        className="text-sm sm:text-base text-ink-soft inline-block"
                        style={{
                          fontFamily: 'var(--font-kalam), cursive',
                          transform: 'rotate(-1deg)',
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* Skills */}
          <section className="mb-2">
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
                  <ChapterDivider />
                  <section>
                    <ChapterHeading number={nextChapter()}>
                      {project.extendedContent.overview.title}
                    </ChapterHeading>
                    <p className="text-lg text-ink-soft leading-relaxed">
                      {project.extendedContent.overview.content}
                    </p>
                  </section>
                </>
              )}

              {/* Motivation */}
              {project.extendedContent.motivation && (
                <>
                  <ChapterDivider />
                  <section>
                    <ChapterHeading number={nextChapter()}>
                      {project.extendedContent.motivation.title}
                    </ChapterHeading>
                    <p className="text-lg text-ink-soft leading-relaxed">
                      {project.extendedContent.motivation.content}
                    </p>
                  </section>
                </>
              )}

              {/* Literature review — cited studies grounding the project */}
              {project.extendedContent.literatureReview &&
                project.extendedContent.literatureReview.studies.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        {project.extendedContent.literatureReview.title ?? 'Literature review'}
                      </ChapterHeading>
                      {project.extendedContent.literatureReview.intro && (
                        <p className="text-base sm:text-lg text-ink-soft mb-10 max-w-2xl leading-relaxed">
                          {project.extendedContent.literatureReview.intro}
                        </p>
                      )}
                      <ol className="space-y-6">
                        {project.extendedContent.literatureReview.studies.map((study, index) => (
                          <li
                            key={index}
                            className="bg-paper-deeper border border-border rounded-xl p-5 sm:p-6 shadow-paper grid grid-cols-[auto_1fr] gap-4 sm:gap-6"
                          >
                            <span className="font-display italic text-3xl sm:text-4xl text-terracotta leading-none pt-1">
                              {String(index + 1).padStart(2, '0')}
                              <span className="not-italic">.</span>
                            </span>
                            <div>
                              <p className="font-display text-base sm:text-lg text-ink mb-1">
                                {study.citation}
                                {study.venue && (
                                  <span className="text-ink-soft font-normal italic">
                                    {' '}&middot; {study.venue}
                                  </span>
                                )}
                              </p>
                              <p className="text-sm sm:text-base text-ink-soft leading-relaxed mb-3">
                                {study.finding}
                              </p>
                              <p className="text-sm sm:text-base text-terracotta-deep font-medium leading-relaxed">
                                <span
                                  className="text-terracotta inline-block mr-2"
                                  style={{
                                    fontFamily: 'var(--font-kalam), cursive',
                                    transform: 'rotate(-2deg)',
                                  }}
                                >
                                  applied &mdash;
                                </span>
                                {study.application}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </>
                )}

              {/* Pull quote — magazine-style breakout */}
              {project.extendedContent.pullQuote && (
                <aside className="my-16">
                  <blockquote className="relative border-l-4 border-terracotta pl-6 sm:pl-10 py-2">
                    <p className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-ink leading-snug">
                      &ldquo;{project.extendedContent.pullQuote}&rdquo;
                    </p>
                  </blockquote>
                </aside>
              )}

              {/* Product decisions — strategic calls + reasoning */}
              {project.extendedContent.decisions &&
                project.extendedContent.decisions.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        Product decisions
                      </ChapterHeading>
                      <p className="text-base sm:text-lg text-ink-soft mb-10 max-w-2xl">
                        The strategic calls behind the prototype and the
                        reasoning each one rests on.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {project.extendedContent.decisions.map(
                          (item, index) => (
                            <article
                              key={index}
                              className="bg-paper-deeper border border-border rounded-xl p-6 shadow-paper flex flex-col"
                            >
                              {item.framework && (
                                <p
                                  className="text-sm text-terracotta mb-3 inline-block"
                                  style={{
                                    fontFamily:
                                      'var(--font-kalam), cursive',
                                    transform: 'rotate(-1deg)',
                                  }}
                                >
                                  {item.framework} &mdash;
                                </p>
                              )}
                              <h3 className="font-display italic text-xl sm:text-2xl text-ink mb-3 leading-snug">
                                {item.decision}
                                <span className="text-terracotta not-italic">
                                  .
                                </span>
                              </h3>
                              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                                {item.reasoning}
                              </p>
                            </article>
                          )
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Before / after — visual delta on the same UI surfaces */}
              {project.extendedContent.beforeAfter &&
                project.extendedContent.beforeAfter.pairs.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        {project.extendedContent.beforeAfter.title ??
                          'Before and after'}
                      </ChapterHeading>
                      {project.extendedContent.beforeAfter.intro && (
                        <p className="text-base sm:text-lg text-ink-soft mb-12 max-w-2xl">
                          {project.extendedContent.beforeAfter.intro}
                        </p>
                      )}
                      <div className="space-y-14">
                        {project.extendedContent.beforeAfter.pairs.map(
                          (pair, index) => (
                            <article key={index}>
                              <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
                                <h3 className="font-display italic text-xl sm:text-2xl text-ink leading-tight">
                                  {pair.label}
                                  <span className="text-terracotta not-italic">
                                    .
                                  </span>
                                </h3>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Before */}
                                <figure className="m-0">
                                  <div className="relative overflow-hidden rounded-xl border border-border bg-paper-deeper shadow-paper">
                                    <Image
                                      src={pair.before}
                                      alt={`${pair.label} — before`}
                                      width={1600}
                                      height={1200}
                                      sizes="(max-width: 768px) 100vw, 440px"
                                      className="w-full h-auto"
                                    />
                                  </div>
                                  <figcaption
                                    className="mt-3 text-sm text-terracotta inline-block"
                                    style={{
                                      fontFamily:
                                        'var(--font-kalam), cursive',
                                      transform: 'rotate(-2deg)',
                                    }}
                                  >
                                    before &mdash;
                                  </figcaption>
                                </figure>
                                {/* After */}
                                <figure className="m-0">
                                  <div className="relative overflow-hidden rounded-xl border border-border bg-paper-deeper shadow-paper">
                                    <Image
                                      src={pair.after}
                                      alt={`${pair.label} — after`}
                                      width={1600}
                                      height={1200}
                                      sizes="(max-width: 768px) 100vw, 440px"
                                      className="w-full h-auto"
                                    />
                                  </div>
                                  <figcaption
                                    className="mt-3 text-sm text-terracotta inline-block"
                                    style={{
                                      fontFamily:
                                        'var(--font-kalam), cursive',
                                      transform: 'rotate(-2deg)',
                                    }}
                                  >
                                    after &mdash;
                                  </figcaption>
                                </figure>
                              </div>
                              {pair.note && (
                                <p className="text-base text-ink-soft leading-relaxed mt-5 max-w-3xl">
                                  {pair.note}
                                </p>
                              )}
                            </article>
                          )
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Design system — palette, type ramp, components */}
              {project.extendedContent.designSystem &&
                (() => {
                  const ds = project.extendedContent.designSystem;
                  const palette = ds.palette ?? [];
                  const type = ds.type ?? [];
                  const components = ds.components ?? [];
                  if (palette.length === 0 && type.length === 0 && components.length === 0) return null;
                  return (
                    <>
                      <ChapterDivider />
                      <section>
                        <ChapterHeading number={nextChapter()}>
                          {ds.title ?? 'Design system'}
                        </ChapterHeading>
                        {ds.intro && (
                          <p className="text-base sm:text-lg text-ink-soft mb-10 max-w-2xl leading-relaxed">
                            {ds.intro}
                          </p>
                        )}

                        {/* Palette */}
                        {palette.length > 0 && (
                          <div className="mb-12">
                            <p
                              className="text-base text-terracotta mb-4 inline-block"
                              style={{
                                fontFamily: 'var(--font-kalam), cursive',
                                transform: 'rotate(-2deg)',
                              }}
                            >
                              palette &mdash;
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                              {palette.map((c, i) => (
                                <div
                                  key={i}
                                  className="bg-paper-deeper border border-border rounded-xl overflow-hidden shadow-paper flex flex-col"
                                >
                                  <div
                                    className="h-24 w-full"
                                    style={{ backgroundColor: c.hex }}
                                    aria-hidden
                                  />
                                  <div className="p-4">
                                    <p className="font-display text-base text-ink leading-tight">
                                      {c.name}
                                    </p>
                                    <p className="text-xs text-ink-soft/80 font-mono mt-0.5">
                                      {c.hex.toUpperCase()}
                                    </p>
                                    <p className="text-xs text-ink-soft leading-relaxed mt-2">
                                      {c.role}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Typography */}
                        {type.length > 0 && (
                          <div className="mb-12">
                            <p
                              className="text-base text-terracotta mb-4 inline-block"
                              style={{
                                fontFamily: 'var(--font-kalam), cursive',
                                transform: 'rotate(-2deg)',
                              }}
                            >
                              typography &mdash;
                            </p>
                            <div className="space-y-4">
                              {type.map((t, i) => (
                                <div
                                  key={i}
                                  className="bg-paper-deeper border border-border rounded-xl p-5 shadow-paper grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-8 items-baseline"
                                >
                                  <div>
                                    <p className="font-display text-base text-ink mb-1">
                                      {t.name}
                                    </p>
                                    <p className="text-xs text-ink-soft/80 font-mono leading-relaxed">
                                      {t.spec}
                                    </p>
                                  </div>
                                  {t.example && (
                                    <p
                                      className={
                                        t.exampleClass ??
                                        'text-2xl text-ink font-display'
                                      }
                                    >
                                      {t.example}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Components */}
                        {components.length > 0 && (
                          <div>
                            <p
                              className="text-base text-terracotta mb-4 inline-block"
                              style={{
                                fontFamily: 'var(--font-kalam), cursive',
                                transform: 'rotate(-2deg)',
                              }}
                            >
                              components &mdash;
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {components.map((cm, i) => (
                                <div
                                  key={i}
                                  className="bg-paper-deeper border border-border rounded-xl p-5 shadow-paper"
                                >
                                  <h3 className="font-display text-base text-ink mb-2">
                                    {cm.name}
                                  </h3>
                                  <p className="text-sm text-ink-soft leading-relaxed">
                                    {cm.purpose}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </section>
                    </>
                  );
                })()}

              {/* Datasets */}
              {project.extendedContent.datasets &&
                project.extendedContent.datasets.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        Datasets
                      </ChapterHeading>
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

              {/* Methodology — wraps a visual pipeline section + numbered deep-dive steps */}
              {project.extendedContent.methodology && (
                <>
                  <ChapterDivider />
                  <section>
                    <ChapterHeading number={nextChapter()}>
                      {project.extendedContent.methodology.title}
                    </ChapterHeading>

                    {/* Visual pipeline pieces — flow diagram + source files + sample JSON */}
                    {project.extendedContent.pythonPipeline && (
                      <div className="mb-14 space-y-12">
                        {/* Flow diagram — vertical chain of paper-deeper boxes with terracotta arrows */}
                        {project.extendedContent.pythonPipeline.flow &&
                          project.extendedContent.pythonPipeline.flow.length >
                            0 && (
                            <div>
                              <p
                                className="text-base text-terracotta mb-5 inline-block"
                                style={{
                                  fontFamily: 'var(--font-kalam), cursive',
                                  transform: 'rotate(-2deg)',
                                }}
                              >
                                how the data flows &mdash;
                              </p>
                              <div className="space-y-3 max-w-xl">
                                {project.extendedContent.pythonPipeline.flow.map(
                                  (stage, i, arr) => (
                                    <div key={i}>
                                      <div className="bg-paper-deeper border border-border rounded-lg shadow-paper px-4 py-3">
                                        <p className="font-display text-base text-ink leading-snug">
                                          {stage.label}
                                        </p>
                                        {stage.detail && (
                                          <p className="text-sm text-muted mt-0.5">
                                            {stage.detail}
                                          </p>
                                        )}
                                      </div>
                                      {i < arr.length - 1 && (
                                        <div
                                          aria-hidden
                                          className="flex justify-center py-1"
                                        >
                                          <svg
                                            viewBox="0 0 24 24"
                                            className="w-5 h-5 text-terracotta"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M12 5 V19" />
                                            <path d="M6 14 L12 19 L18 14" />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Two-column: source files + sample JSON */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Source files */}
                          {project.extendedContent.pythonPipeline.sourceFiles &&
                            project.extendedContent.pythonPipeline.sourceFiles
                              .length > 0 && (
                              <div className="bg-paper-deeper border border-border rounded-xl shadow-paper p-6">
                                <p
                                  className="text-base text-terracotta mb-4 inline-block"
                                  style={{
                                    fontFamily: 'var(--font-kalam), cursive',
                                    transform: 'rotate(-2deg)',
                                  }}
                                >
                                  python source files &mdash;
                                </p>
                                <ul className="space-y-4">
                                  {project.extendedContent.pythonPipeline.sourceFiles.map(
                                    (file, i) => (
                                      <li key={i}>
                                        <p className="font-mono text-sm text-ink mb-1">
                                          {file.name}
                                        </p>
                                        <p className="text-sm text-ink-soft leading-relaxed">
                                          {file.purpose}
                                        </p>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Sample JSON — paper-deeper card with terracotta left rule for "code on paper" feel */}
                          {project.extendedContent.pythonPipeline.sampleJson && (
                            <div className="bg-paper-deeper border border-border rounded-xl shadow-paper p-6 overflow-hidden relative">
                              <span
                                aria-hidden
                                className="absolute left-0 top-6 bottom-6 w-1 bg-terracotta/60 rounded-r"
                              />
                              {project.extendedContent.pythonPipeline
                                .sampleJsonCaption && (
                                <p
                                  className="text-base text-terracotta mb-4 inline-block"
                                  style={{
                                    fontFamily: 'var(--font-kalam), cursive',
                                    transform: 'rotate(-2deg)',
                                  }}
                                >
                                  {
                                    project.extendedContent.pythonPipeline
                                      .sampleJsonCaption
                                  }
                                </p>
                              )}
                              <pre className="font-mono text-xs sm:text-sm text-ink-soft leading-relaxed overflow-x-auto whitespace-pre pl-2">
                                {
                                  project.extendedContent.pythonPipeline
                                    .sampleJson
                                }
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step-by-step deep dive */}
                    <p
                      className="text-base text-terracotta mb-5 inline-block"
                      style={{
                        fontFamily: 'var(--font-kalam), cursive',
                        transform: 'rotate(-2deg)',
                      }}
                    >
                      the deep dive &mdash;
                    </p>
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

              {/* Key findings — stat-led cards */}
              {project.extendedContent.keyFindings &&
                project.extendedContent.keyFindings.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        Key findings
                      </ChapterHeading>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {project.extendedContent.keyFindings.map(
                          (finding, index) => (
                            <div
                              key={index}
                              className="bg-paper-deeper border border-border rounded-xl p-6 shadow-paper"
                            >
                              {finding.stat && (
                                <p className="font-display italic text-4xl sm:text-5xl text-terracotta leading-none mb-3">
                                  {finding.stat}
                                </p>
                              )}
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

              {/* Usability results — task-by-task quantitative data */}
              {project.extendedContent.usabilityResults &&
                project.extendedContent.usabilityResults.tasks.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        {project.extendedContent.usabilityResults.title ?? 'Usability results'}
                      </ChapterHeading>
                      <div className="mb-10 max-w-2xl">
                        {project.extendedContent.usabilityResults.sampleSize && (
                          <p
                            className="text-base text-terracotta mb-2 inline-block"
                            style={{
                              fontFamily: 'var(--font-kalam), cursive',
                              transform: 'rotate(-1deg)',
                            }}
                          >
                            n = {project.extendedContent.usabilityResults.sampleSize} &mdash;
                          </p>
                        )}
                        {project.extendedContent.usabilityResults.intro && (
                          <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
                            {project.extendedContent.usabilityResults.intro}
                          </p>
                        )}
                      </div>
                      <div className="space-y-8">
                        {project.extendedContent.usabilityResults.tasks.map((block, blockIdx) => (
                          <article
                            key={blockIdx}
                            className="bg-paper-deeper border border-border rounded-xl p-6 sm:p-7 shadow-paper"
                          >
                            <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                              <span className="font-display italic text-4xl sm:text-5xl text-terracotta leading-none">
                                {block.number}
                                <span className="not-italic">.</span>
                              </span>
                              <h3 className="font-display italic text-xl sm:text-2xl text-ink leading-tight">
                                {block.task}
                                <span className="text-terracotta not-italic">.</span>
                              </h3>
                            </div>
                            {block.context && (
                              <p className="text-sm text-ink-soft italic mb-5 pl-1 border-l-2 border-border pl-3">
                                {block.context}
                              </p>
                            )}
                            <ul className="space-y-3">
                              {block.results.map((r, i) => (
                                <li
                                  key={i}
                                  className="grid grid-cols-[auto_1fr] gap-4 items-baseline"
                                >
                                  <span className="font-display italic text-xl sm:text-2xl text-terracotta leading-none tabular-nums min-w-[5rem]">
                                    {r.metric}
                                  </span>
                                  <span className="text-sm sm:text-base text-ink-soft leading-relaxed">
                                    {r.statement}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </section>
                  </>
                )}

              {/* Features — same alternating magazine spread as visualizations
                  when images are provided; falls back to a simple card otherwise */}
              {project.extendedContent.features &&
                project.extendedContent.features.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        Key features
                      </ChapterHeading>
                      <p className="text-base sm:text-lg text-ink-soft mb-12 max-w-2xl">
                        The signature product moments. Each one is a complete
                        scenario the prototype demonstrates end to end.
                      </p>

                      <div className="space-y-16 sm:space-y-24">
                        {project.extendedContent.features.map(
                          (feature, index) => {
                            const sceneNum = String(index + 1).padStart(
                              2,
                              '0'
                            );
                            const imageFirst = index % 2 === 0;

                            // No image → simpler card layout so older projects
                            // without imagery still render correctly.
                            if (!feature.image) {
                              return (
                                <article
                                  key={index}
                                  className="bg-paper-deeper border border-border rounded-xl p-6 shadow-paper"
                                >
                                  <p
                                    className="text-base text-terracotta mb-2 inline-block"
                                    style={{
                                      fontFamily:
                                        'var(--font-kalam), cursive',
                                      transform: 'rotate(-2deg)',
                                    }}
                                  >
                                    feature {sceneNum} &mdash;
                                  </p>
                                  <h3 className="font-display italic text-xl sm:text-2xl text-ink mb-3 leading-snug">
                                    {feature.title}
                                    <span className="text-terracotta not-italic">
                                      .
                                    </span>
                                  </h3>
                                  <p className="text-base text-ink-soft leading-relaxed mb-4">
                                    {feature.description}
                                  </p>
                                  <div className="flex items-start gap-2 text-sm pt-3 border-t border-border/60">
                                    <CheckCircle2
                                      className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5"
                                      aria-hidden
                                    />
                                    <span className="text-terracotta-deep font-medium leading-relaxed">
                                      {feature.insight}
                                    </span>
                                  </div>
                                </article>
                              );
                            }

                            return (
                              <article
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
                              >
                                {/* Image */}
                                <div
                                  className={`md:col-span-7 ${
                                    imageFirst
                                      ? 'md:order-1'
                                      : 'md:order-2'
                                  }`}
                                >
                                  {feature.phoneFrame ? (
                                    <div className="flex justify-center">
                                      <div className="relative w-full max-w-[280px] sm:max-w-[300px] overflow-hidden rounded-[2rem] border-4 border-ink/80 bg-paper-deeper shadow-paper">
                                        <Image
                                          src={feature.image}
                                          alt={`${feature.title} — screenshot`}
                                          width={800}
                                          height={1730}
                                          sizes="(max-width: 768px) 280px, 300px"
                                          className="w-full h-auto"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-paper-deeper shadow-paper">
                                      <Image
                                        src={feature.image}
                                        alt={`${feature.title} — screenshot`}
                                        width={1600}
                                        height={1200}
                                        sizes="(max-width: 768px) 100vw, 520px"
                                        className="w-full h-auto"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* Text */}
                                <div
                                  className={`md:col-span-5 ${
                                    imageFirst ? 'md:order-2' : 'md:order-1'
                                  }`}
                                >
                                  <p
                                    className="text-base sm:text-lg text-terracotta mb-2 inline-block"
                                    style={{
                                      fontFamily:
                                        'var(--font-kalam), cursive',
                                      transform: 'rotate(-2deg)',
                                    }}
                                  >
                                    feature {sceneNum} &mdash;
                                  </p>
                                  <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                                    <span className="font-display italic text-5xl sm:text-6xl text-terracotta leading-none">
                                      {sceneNum}
                                      <span className="not-italic">.</span>
                                    </span>
                                    <h3 className="font-display italic text-2xl sm:text-3xl text-ink leading-tight">
                                      {feature.title}
                                      <span className="text-terracotta not-italic">
                                        .
                                      </span>
                                    </h3>
                                  </div>
                                  <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-5">
                                    {feature.description}
                                  </p>
                                  <div className="flex items-start gap-2 text-sm pt-3 border-t border-border/60">
                                    <CheckCircle2
                                      className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5"
                                      aria-hidden
                                    />
                                    <span className="text-terracotta-deep font-medium leading-relaxed">
                                      {feature.insight}
                                    </span>
                                  </div>
                                </div>
                              </article>
                            );
                          }
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Visualizations — alternating magazine spread, no card chrome,
                  big numbered scenes, image left/right alternates each scene */}
              {project.extendedContent.visualizations &&
                project.extendedContent.visualizations.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        Visualizations
                      </ChapterHeading>
                      <p className="text-base sm:text-lg text-ink-soft mb-12 max-w-2xl">
                        Nine D3.js scenes wrap a scrollytelling narrative.
                        Each one is built directly from the AI-extracted CSVs.
                      </p>

                      <div className="space-y-16 sm:space-y-24">
                        {project.extendedContent.visualizations.map(
                          (viz, index) => {
                            const sceneNum = String(index + 1).padStart(
                              2,
                              '0'
                            );
                            const imageFirst = index % 2 === 0;
                            return (
                              <article
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
                              >
                                {/* Image — col-span-7 on md+, alternates side */}
                                {viz.image && (
                                  <div
                                    className={`md:col-span-7 ${
                                      imageFirst
                                        ? 'md:order-1'
                                        : 'md:order-2'
                                    }`}
                                  >
                                    {viz.phoneFrame ? (
                                      <div className="flex justify-center">
                                        <div className="relative w-full max-w-[280px] sm:max-w-[300px] overflow-hidden rounded-[2rem] border-4 border-ink/80 bg-paper-deeper shadow-paper">
                                          <Image
                                            src={viz.image}
                                            alt={`${viz.title} — screenshot`}
                                            width={800}
                                            height={1730}
                                            sizes="(max-width: 768px) 280px, 300px"
                                            className="w-full h-auto"
                                          />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-paper-deeper shadow-paper">
                                        <Image
                                          src={viz.image}
                                          alt={`${viz.title} — screenshot`}
                                          width={1600}
                                          height={1200}
                                          sizes="(max-width: 768px) 100vw, 520px"
                                          className="w-full h-auto"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Text — col-span-5, alternates side */}
                                <div
                                  className={`md:col-span-5 ${
                                    imageFirst ? 'md:order-2' : 'md:order-1'
                                  }`}
                                >
                                  <p
                                    className="text-base sm:text-lg text-terracotta mb-2 inline-block"
                                    style={{
                                      fontFamily:
                                        'var(--font-kalam), cursive',
                                      transform: 'rotate(-2deg)',
                                    }}
                                  >
                                    scene {sceneNum} &mdash;
                                  </p>
                                  <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                                    <span className="font-display italic text-5xl sm:text-6xl text-terracotta leading-none">
                                      {sceneNum}
                                      <span className="not-italic">.</span>
                                    </span>
                                    <h3 className="font-display italic text-2xl sm:text-3xl text-ink leading-tight">
                                      {viz.title}
                                      <span className="text-terracotta not-italic">
                                        .
                                      </span>
                                    </h3>
                                  </div>
                                  <p className="text-base sm:text-lg text-ink-soft leading-relaxed mb-5">
                                    {viz.description}
                                  </p>
                                  <div className="flex items-start gap-2 text-sm pt-3 border-t border-border/60">
                                    <CheckCircle2
                                      className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5"
                                      aria-hidden
                                    />
                                    <span className="text-terracotta-deep font-medium leading-relaxed">
                                      {viz.insight}
                                    </span>
                                  </div>
                                </div>
                              </article>
                            );
                          }
                        )}
                      </div>
                    </section>
                  </>
                )}

              {/* Figma embed — interactive prototype iframe */}
              {project.extendedContent.figmaEmbed &&
                (() => {
                  const fe = project.extendedContent.figmaEmbed;
                  const embedSrc = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(fe.url)}`;
                  const height = Math.max(fe.height ?? 720, 400);
                  return (
                    <>
                      <ChapterDivider />
                      <section>
                        <ChapterHeading number={nextChapter()}>
                          {fe.title ?? 'Try the prototype'}
                        </ChapterHeading>
                        {fe.intro && (
                          <p className="text-base sm:text-lg text-ink-soft mb-8 max-w-2xl leading-relaxed">
                            {fe.intro}
                          </p>
                        )}
                        <div className="relative w-full overflow-hidden rounded-xl border border-border bg-paper-deeper shadow-paper">
                          <iframe
                            src={embedSrc}
                            title={`${project.title} — interactive Figma prototype`}
                            className="block w-full"
                            style={{ height: `${height}px` }}
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                        <p className="mt-3 text-xs text-ink-soft/70">
                          Hosted by Figma. If the embed shows a sign-in prompt, the file is private —
                          open the link below to view in a new tab.
                        </p>
                      </section>
                    </>
                  );
                })()}

              {/* Tools */}
              {project.extendedContent.tools &&
                project.extendedContent.tools.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        Tools &amp; technologies
                      </ChapterHeading>
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
                  <ChapterDivider />
                  <section className="bg-terracotta-wash border border-terracotta/30 rounded-2xl p-6 sm:p-10 shadow-paper">
                    <ChapterHeading number={nextChapter()}>
                      {project.extendedContent.impact.title}
                    </ChapterHeading>
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

              {/* Limitations — honest caveats */}
              {project.extendedContent.limitations &&
                project.extendedContent.limitations.items.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        {project.extendedContent.limitations.title ??
                          'Known limitations'}
                      </ChapterHeading>
                      <p
                        className="text-base text-terracotta mb-6 inline-block"
                        style={{
                          fontFamily: 'var(--font-kalam), cursive',
                          transform: 'rotate(-1deg)',
                        }}
                      >
                        the honest caveats &mdash;
                      </p>
                      <ul className="space-y-3">
                        {project.extendedContent.limitations.items.map(
                          (item, index) => (
                            <li
                              key={index}
                              className="flex gap-3 text-base text-ink-soft leading-relaxed"
                            >
                              <span
                                aria-hidden
                                className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-terracotta"
                              />
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </section>
                  </>
                )}

              {/* References — formal citation list */}
              {project.extendedContent.references &&
                project.extendedContent.references.entries.length > 0 && (
                  <>
                    <ChapterDivider />
                    <section>
                      <ChapterHeading number={nextChapter()}>
                        {project.extendedContent.references.title ?? 'References'}
                      </ChapterHeading>
                      {project.extendedContent.references.intro && (
                        <p className="text-base text-ink-soft mb-6 max-w-2xl leading-relaxed">
                          {project.extendedContent.references.intro}
                        </p>
                      )}
                      <ol className="space-y-4">
                        {project.extendedContent.references.entries.map((ref, index) => (
                          <li
                            key={index}
                            className="grid grid-cols-[auto_1fr] gap-4 text-sm sm:text-base text-ink-soft leading-relaxed"
                          >
                            <span className="font-display italic text-terracotta tabular-nums">
                              [{index + 1}]
                            </span>
                            <span>
                              {ref.citation}
                              {ref.url && (
                                <>
                                  {' '}
                                  <a
                                    href={ref.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-terracotta-deep underline decoration-dotted underline-offset-2 hover:decoration-solid break-all"
                                  >
                                    {ref.url}
                                  </a>
                                </>
                              )}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </section>
                  </>
                )}
            </>
          )}

          {/* Case study viewer */}
          {project.caseStudy && (
            <>
              <ChapterDivider />
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

          {/* Footer back link */}
          <div className="mt-20 pt-10 border-t border-border">
            <Link
              href="/projects"
              className="inline-flex items-center text-base text-terracotta hover:text-terracotta-deep hover:-translate-x-1 transition-all duration-200"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-2deg)',
              }}
            >
              &larr; back to all projects
            </Link>
          </div>
        </article>
      </Container>
    </Section>
  );
}
