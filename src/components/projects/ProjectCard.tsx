import Link from 'next/link';
import Image from 'next/image';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import MetaBadge from '../ui/MetaBadge';
import { BookOpen, Building2, Calendar } from 'lucide-react';
import { Project } from '@/types';
import { abbreviateCourseCode } from '@/utils/abbreviateCourseCode';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group">
      <Card className="h-full flex flex-col relative overflow-hidden">
        {/* Hero Image */}
        {project.image && (
          <div className="relative w-full h-48 bg-surface-dark -m-6 mb-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Gradient overlay for better contrast */}
            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent" />

            {/* Date badge overlaid on image */}
            <time
              className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-sm border border-border-light text-xs text-secondary/90 flex items-center gap-1.5"
              dateTime={project.dates}
            >
              <Calendar className="w-3 h-3" aria-hidden="true" />
              <span>{project.dates}</span>
            </time>

            {/* Category badge overlaid on image - desktop only */}
            <Badge
              variant="category"
              className="absolute top-4 right-4 z-10 hidden sm:inline-flex backdrop-blur-sm"
              aria-label={`Category: ${project.category}`}
            >
              {project.category}
            </Badge>
          </div>
        )}

        {/* Content section */}
        <div className={`flex flex-col grow ${project.image ? 'pt-4' : ''}`}>
          {/* Date and category badges - only show if no image */}
          {!project.image && (
            <>
              <time
                className="absolute top-4 left-4 z-10 text-xs text-secondary/70 flex items-center gap-1.5"
                dateTime={project.dates}
              >
                <Calendar className="w-3 h-3" aria-hidden="true" />
                <span>{project.dates}</span>
              </time>

              <Badge
                variant="category"
                className="absolute top-4 right-4 z-10 hidden sm:inline-flex"
                aria-label={`Category: ${project.category}`}
              >
                {project.category}
              </Badge>
            </>
          )}

          <div className={`mb-4 ${!project.image ? 'pt-6' : ''}`}>
            <h3 className="text-2xl font-bold text-primary mb-2 line-clamp-3 sm:pr-28 group-hover:bg-linear-to-r group-hover:from-cosmic-purple group-hover:to-cosmic-cyan group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {project.title}
            </h3>

            {/* Category badge in body - mobile only */}
            <div className="sm:hidden mb-3">
              <Badge variant="category" aria-label={`Category: ${project.category}`}>
                {project.category}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
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
            </div>
          </div>

          <p className="text-secondary line-clamp-4 mb-4 grow">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="skill">{skill}</Badge>
              ))}
              {project.skills.length > 4 && (
                <Badge variant="skill">+{project.skills.length - 4} more</Badge>
              )}
            </div>

            {project.links && project.links.length > 0 && (
              <div className="text-cosmic-purple text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all group-hover:text-cosmic-cyan">
                View Project
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
