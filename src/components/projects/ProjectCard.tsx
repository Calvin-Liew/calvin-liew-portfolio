import Link from 'next/link';
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
      <Card className="h-full flex flex-col relative">
        {/* Floating category badge - top right */}
        <Badge variant="category" className="absolute top-4 right-4 z-10">
          {project.category}
        </Badge>

        {/* Floating date timestamp - top left */}
        <time
          className="absolute top-4 left-4 z-10 text-xs text-secondary/70 flex items-center gap-1.5"
          dateTime={project.dates}
        >
          <Calendar className="w-3 h-3" aria-hidden="true" />
          <span>{project.dates}</span>
        </time>

        <div className="mb-4 pt-6">
          <h3 className="text-2xl font-bold text-primary mb-2 line-clamp-3 pr-28 group-hover:bg-linear-to-r group-hover:from-cosmic-purple group-hover:to-cosmic-cyan group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.title}
          </h3>
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

        <p className="text-secondary line-clamp-4 mb-4 flex-grow">
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
      </Card>
    </Link>
  );
}
