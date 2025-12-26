import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { education } from '@/data/education';

export default function Education() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Education</h2>
      <Card hover={false}>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-primary mb-2">
            {education.institution}
          </h3>
          <div className="text-lg text-secondary font-medium mb-1">
            {education.degree} - {education.field}
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-secondary mb-2">
            <span>{education.dates}</span>
            {education.gpa && (
              <>
                <span>•</span>
                <span className="font-medium">GPA: {education.gpa}</span>
              </>
            )}
          </div>
        </div>

        {education.honors && education.honors.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-primary mb-2">Honors & Recognition</h4>
            <ul className="space-y-1">
              {education.honors.map((honor, index) => (
                <li key={index} className="flex gap-2 text-secondary">
                  <span className="text-accent">•</span>
                  <span>{honor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {education.focusAreas && education.focusAreas.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-primary mb-2">Focus Areas</h4>
            <ul className="space-y-1">
              {education.focusAreas.map((area, index) => (
                <li key={index} className="flex gap-2 text-secondary">
                  <span className="text-accent">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {education.coursework && education.coursework.length > 0 && (
          <div>
            <h4 className="font-semibold text-primary mb-3">Relevant Coursework</h4>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <Badge key={course}>{course}</Badge>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
