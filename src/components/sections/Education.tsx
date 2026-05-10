import Badge from '../ui/Badge';
import { education } from '@/data/education';

// "Sep 2022 - Aug 2026" -> "sep 2022 → aug 2026"
function formatDates(input: string) {
  return input.toLowerCase().replace(/\s*[-–—]\s*/, ' → ');
}

export default function Education() {
  return (
    <div>
      <h2 className="font-display italic text-3xl sm:text-4xl text-ink mb-3 leading-tight">
        <span className="inline-flex items-baseline gap-3 flex-wrap">
          <span>
            Where I learned<span className="text-terracotta not-italic">.</span>
          </span>
          <span
            className="text-terracotta text-xl inline-block not-italic font-normal"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            (the schoolwork)
          </span>
        </span>
      </h2>

      <p className="text-base text-ink-soft mb-8 max-w-xl">
        Where my training in business, design, and computer science came from.
      </p>

      <article className="relative bg-paper-deeper border border-border rounded-xl p-6 sm:p-8 shadow-paper">
        {/* Date + GPA in Kalam at top */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
          <time
            className="text-base text-terracotta inline-block"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-1.5deg)',
            }}
          >
            {formatDates(education.dates)}
          </time>
          {education.gpa && (
            <span
              className="text-base text-terracotta inline-block"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-1deg)',
              }}
            >
              gpa: {education.gpa}
            </span>
          )}
        </div>

        {/* School in Fraunces */}
        <h3 className="font-display text-2xl text-ink mb-1 leading-tight">
          {education.institution}
        </h3>

        {/* Degree + field in Fraunces italic */}
        <div className="font-display italic text-lg text-ink-soft mb-6">
          {education.degree}
          <span className="text-terracotta not-italic"> · </span>
          {education.field}
        </div>

        {/* Honors */}
        {education.honors && education.honors.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm uppercase tracking-wider text-muted mb-3">
              Honors &amp; recognition
            </h4>
            <ul className="space-y-2">
              {education.honors.map((honor, index) => (
                <li
                  key={index}
                  className="flex gap-2.5 text-base text-ink-soft leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="mt-2 w-1 h-1 flex-shrink-0 rounded-full bg-terracotta"
                  />
                  <span>{honor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Focus areas */}
        {education.focusAreas && education.focusAreas.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm uppercase tracking-wider text-muted mb-3">
              Focus areas
            </h4>
            <ul className="space-y-2">
              {education.focusAreas.map((area, index) => (
                <li
                  key={index}
                  className="flex gap-2.5 text-base text-ink-soft leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="mt-2 w-1 h-1 flex-shrink-0 rounded-full bg-terracotta"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Coursework as paper tags */}
        {education.coursework && education.coursework.length > 0 && (
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted mb-3">
              Relevant coursework
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {education.coursework.map((course) => (
                <Badge key={course}>{course}</Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
