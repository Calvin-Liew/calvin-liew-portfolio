'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '../layout/Container';
import Section from '../layout/Section';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Doodle, HandUnderline } from '../ui/HandDrawn';
import { projects } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { abbreviateCourseCode } from '@/utils/abbreviateCourseCode';
import type { Project } from '@/types';

const corners: Array<'lightbulb' | 'magnifier' | 'sparkle'> = [
  'lightbulb',
  'magnifier',
  'sparkle',
];

// Resting tilt per card, like photos pinned to a board
const tilts = ['-1deg', '0.8deg', '-0.6deg'];

/** Screenshot when the project has one; otherwise a notebook page with a standout number. */
function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-white">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  const stats = project.extendedContent?.stats;
  const stat = stats?.[2] ?? stats?.[0];
  return (
    <div
      className="relative flex aspect-[16/10] flex-col justify-end overflow-hidden rounded-lg border border-terracotta-soft bg-terracotta-wash p-5"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent 0 23px, rgba(194, 65, 12, 0.12) 23px 24px)',
      }}
    >
      <div className="absolute left-8 top-0 bottom-0 w-px bg-terracotta/30" aria-hidden />
      {stat ? (
        <div className="relative pl-6">
          <p className="font-display italic text-5xl text-terracotta leading-none mb-2 transition-transform duration-500 origin-left group-hover:scale-105">
            {stat.value}
          </p>
          <p className="font-hand text-base text-ink-soft leading-snug">{stat.label}</p>
        </div>
      ) : (
        <p className="relative pl-6 font-hand text-2xl text-ink">{project.title.split(':')[0]}</p>
      )}
    </div>
  );
}

// Reformat a date range string for display: lowercase + replace separators with arrow.
// "Sep 2025 - Dec 2025" -> "sep 2025 → dec 2025"
function formatDates(input: string) {
  return input.toLowerCase().replace(/\s*[-–—]\s*/, ' → ');
}

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section background="surface" className="relative overflow-hidden">
      <Container className="relative z-10">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-14 transition-all duration-1000 ${
            isVisible ? '' : 'reveal-hidden'
          }`}
        >
          <h2 className="font-display italic text-4xl sm:text-5xl text-ink mb-3 inline-flex items-baseline gap-3 flex-wrap">
            Featured projects
            <span
              className="text-terracotta text-2xl inline-block"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-2deg)',
              }}
            >
              (my favorites)
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-soft max-w-2xl">
            Recent work I&apos;m proud of, across AI agents, product, and data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {featuredProjects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="pinned-card block rounded-xl"
              style={{ ['--tilt' as string]: tilts[i % tilts.length] } as React.CSSProperties}
            >
              <Card
                tone="paper"
                hover={false}
                className="h-full flex flex-col p-4! hover:shadow-xl hover:border-ink/30"
              >
                <Cover project={project} />

                <div className="flex flex-1 flex-col px-2 pt-5 pb-2 relative">
                  <Doodle
                    name={corners[i % corners.length]}
                    className="absolute top-5 right-2 w-7 h-7 text-ink-soft group-hover:text-terracotta transition-colors duration-300"
                    color="currentColor"
                  />
                  {/* Date in Kalam */}
                  <time
                    className="text-base text-terracotta inline-block mb-3"
                    style={{
                      fontFamily: 'var(--font-kalam), cursive',
                      transform: 'rotate(-1.5deg)',
                    }}
                    dateTime={project.dates}
                  >
                    {formatDates(project.dates)}
                  </time>
  
                  {/* Category as marker-highlight */}
                  <div className="mb-4">
                    <Badge variant="category">{project.category}</Badge>
                  </div>
  
                  {/* Title — Fraunces italic, hand-drawn underline on hover */}
                  <h3 className="font-display italic text-xl sm:text-2xl text-ink mb-3 leading-snug relative line-clamp-2">
                    <span className="relative z-10">{project.title}</span>
                    <HandUnderline className="absolute -bottom-1 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </h3>
  
                  {/* Org / course code */}
                  <div className="text-sm text-muted mb-4 truncate">
                    <span>{project.organization}</span>
                    {project.courseCode &&
                      (() => {
                        const { code } = abbreviateCourseCode(project.courseCode);
                        return (
                          <>
                            {' '}
                            <span className="text-terracotta">·</span>{' '}
                            <span>{code}</span>
                          </>
                        );
                      })()}
                  </div>
  
                  {/* Two concrete outcomes from each case study */}
                  {project.extendedContent?.stats && (
                    <div className="grid grid-cols-2 gap-4 border-y border-border/70 py-3 mb-4">
                      {project.extendedContent.stats.slice(0, 2).map((stat) => (
                        <div key={stat.label} className="min-w-0">
                          <p className="font-display italic text-2xl text-terracotta leading-none mb-1">
                            {stat.value}
                          </p>
                          <p className="text-xs text-muted leading-snug">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
  
                  {/* Description */}
                  <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 mb-5 overflow-hidden">
                    {project.description}
                  </p>
  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                    {project.skills.length > 3 && (
                      <Badge>+{project.skills.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* "see them all →" Kalam link */}
        <div className="text-center">
          <Link
            href="/projects"
            className="text-lg text-terracotta hover:text-terracotta-deep hover:translate-x-1 transition-all duration-200 inline-flex items-center"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            see them all &rarr;
          </Link>
        </div>
      </Container>
    </Section>
  );
}
