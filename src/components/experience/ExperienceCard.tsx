import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card hover={false}>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-primary mb-2">
          {experience.title}
        </h3>
        <div className="text-lg text-secondary font-medium mb-1">
          {experience.company}
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-secondary">
          <span>{experience.location}</span>
          <span>•</span>
          <span>{experience.dates}</span>
          {experience.type && (
            <>
              <span>•</span>
              <span>{experience.type}</span>
            </>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {experience.description.map((item, index) => (
          <li key={index} className="flex gap-3 text-secondary">
            <span className="text-accent mt-1.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {experience.skills.slice(0, 8).map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
        {experience.skills.length > 8 && (
          <Badge>+{experience.skills.length - 8} more</Badge>
        )}
      </div>
    </Card>
  );
}
