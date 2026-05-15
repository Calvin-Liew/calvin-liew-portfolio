import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { HandUnderline } from '../ui/HandDrawn';
import { Project } from '@/types';
import { abbreviateCourseCode } from '@/utils/abbreviateCourseCode';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const cornerCycle: Array<
  'lightbulb' | 'magnifier' | 'sparkle' | 'pencil' | 'paperplane' | 'coffee'
> = ['lightbulb', 'magnifier', 'sparkle', 'pencil', 'paperplane', 'coffee'];

// "Sep 2025 - Dec 2025" -> "sep 2025 → dec 2025"
function formatDates(input: string) {
  return input.toLowerCase().replace(/\s*[-–—]\s*/, ' → ');
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const corner = cornerCycle[index % cornerCycle.length];
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <Card corner={corner} className="h-full flex flex-col">
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
        <div className="text-sm text-muted mb-4">
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
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.slice(0, 4).map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge>+{project.skills.length - 4} more</Badge>
            )}
          </div>

          {/* "view project →" Kalam call-out */}
          <span
            className="text-base text-terracotta inline-flex items-center group-hover:translate-x-1 transition-transform duration-200"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            view project &rarr;
          </span>
        </div>
      </Card>
    </Link>
  );
}
