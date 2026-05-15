'use client';

import Link from 'next/link';
import Container from '../layout/Container';
import Section from '../layout/Section';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { HandUnderline } from '../ui/HandDrawn';
import { projects } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { abbreviateCourseCode } from '@/utils/abbreviateCourseCode';

const corners: Array<'lightbulb' | 'magnifier' | 'sparkle'> = [
  'lightbulb',
  'magnifier',
  'sparkle',
];

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
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
            <Link key={project.id} href={`/projects/${project.id}`} className="block">
              <Card
                corner={corners[i % corners.length]}
                className="h-full flex flex-col"
              >
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

                {/* Description */}
                <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 mb-5 flex-grow overflow-hidden">
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
