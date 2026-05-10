import Badge from '../ui/Badge';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

// "Sep 2025 - Present" -> "sep 2025 → present"
function formatDates(input: string) {
  return input.toLowerCase().replace(/\s*[-–—]\s*/, ' → ');
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="relative pl-10">
      {/* Timeline dot */}
      <span
        aria-hidden
        className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-terracotta ring-4 ring-paper"
      />

      {/* Date in Kalam */}
      <time
        className="text-base text-terracotta inline-block mb-2"
        style={{
          fontFamily: 'var(--font-kalam), cursive',
          transform: 'rotate(-1.5deg)',
        }}
        dateTime={experience.dates}
      >
        {formatDates(experience.dates)}
      </time>

      {/* Role title */}
      <h3 className="font-display text-2xl text-ink mb-1 leading-tight">
        {experience.title}
      </h3>

      {/* Company in Fraunces italic */}
      <div className="font-display italic text-lg text-ink-soft mb-2">
        {experience.company}
      </div>

      {/* Location · Type */}
      <div className="text-sm text-muted mb-5">
        <span>{experience.location}</span>
        {experience.type && (
          <>
            {' '}
            <span className="text-terracotta">·</span>{' '}
            <span>{experience.type}</span>
          </>
        )}
      </div>

      {/* Description bullets */}
      <ul className="space-y-2.5 mb-5">
        {experience.description.map((item, index) => (
          <li
            key={index}
            className="flex gap-2.5 text-base text-ink-soft leading-relaxed"
          >
            <span
              aria-hidden
              className="mt-2 w-1 h-1 flex-shrink-0 rounded-full bg-terracotta"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {experience.skills.slice(0, 8).map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
        {experience.skills.length > 8 && (
          <Badge>+{experience.skills.length - 8} more</Badge>
        )}
      </div>
    </article>
  );
}
