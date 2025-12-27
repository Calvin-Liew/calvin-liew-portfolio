'use client';

import Link from 'next/link';
import Container from '../layout/Container';
import Section from '../layout/Section';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import MetaBadge from '../ui/MetaBadge';
import Button from '../ui/Button';
import AnimatedBackground from '../ui/AnimatedBackground';
import { BookOpen, Building2, Calendar } from 'lucide-react';
import { projects } from '@/data/projects';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { abbreviateCourseCode } from '@/utils/abbreviateCourseCode';

export default function FeaturedProjects() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section background="surface" className="relative overflow-hidden">
      {/* Animated Background Layer */}
      <AnimatedBackground />

      <Container className="relative z-10">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            A selection of my recent work in product management, design, and data analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full relative">
                {/* Floating category badge - top right */}
                <Badge variant="category" className="absolute top-4 right-4 z-10">
                  {project.category}
                </Badge>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {project.courseCode && (() => {
                      const { code, fullName } = abbreviateCourseCode(project.courseCode);
                      return (
                        <MetaBadge
                          icon={BookOpen}
                          text={code}
                          title={fullName}
                          variant="compact"
                        />
                      );
                    })()}
                    <MetaBadge
                      icon={Building2}
                      text={project.organization}
                      variant="compact"
                    />
                    <MetaBadge
                      icon={Calendar}
                      text={project.dates}
                      variant="compact"
                    />
                  </div>
                </div>
                <p className="text-secondary line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
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

        <div className="text-center">
          <Button href="/projects" variant="secondary">
            View All Projects
          </Button>
        </div>
      </Container>
    </Section>
  );
}
