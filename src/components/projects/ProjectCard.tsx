import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group">
      <Card className="h-full flex flex-col">
        <div className="mb-4">
          <Badge variant="category" className="mb-3">
            {project.category}
          </Badge>
          <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2 group-hover:bg-linear-to-r group-hover:from-cosmic-purple group-hover:to-cosmic-cyan group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-secondary mb-3">
            {project.organization} • {project.dates}
          </p>
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
            <div className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all group-hover:text-cosmic-purple">
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
