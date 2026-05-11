'use client';

import Container from '../layout/Container';
import Section from '../layout/Section';
import { Doodle } from '../ui/HandDrawn';
import { aboutData } from '@/data/about';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type DoodleName =
  | 'lightbulb'
  | 'magnifier'
  | 'paperplane'
  | 'pencil'
  | 'sparkle'
  | 'coffee';

const categoryMeta: Record<
  string,
  { label: string; doodle: DoodleName }
> = {
  'AI & Data': { label: 'ai & data', doodle: 'sparkle' },
  'Product Management': { label: 'product', doodle: 'paperplane' },
  Technical: { label: 'technical', doodle: 'pencil' },
  Design: { label: 'design', doodle: 'lightbulb' },
};

export default function SkillsOverview() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section>
      <Container>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-14 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-display italic text-4xl sm:text-5xl text-ink mb-3 inline-flex items-baseline gap-3 flex-wrap">
            What I do
            <span
              className="text-terracotta text-2xl inline-block"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-2deg)',
              }}
            >
              (the toolkit)
            </span>
          </h2>
          <p className="text-base sm:text-lg text-ink-soft max-w-2xl">
            What I bring to AI product work. Designed to ladder from raw data
            &nbsp;&rarr;&nbsp; shipped agent.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {aboutData.skills.map((skillGroup) => {
            const meta = categoryMeta[skillGroup.category] || {
              label: skillGroup.category.toLowerCase(),
              doodle: 'sparkle' as DoodleName,
            };
            return (
              <div
                key={skillGroup.category}
                className="relative bg-paper-deeper border border-border rounded-xl p-5 shadow-paper transition-transform duration-300 hover:-translate-y-1"
              >
                <Doodle
                  name={meta.doodle}
                  className="absolute top-4 right-4 w-7 h-7 text-ink-soft"
                  color="currentColor"
                />

                <h3
                  className="text-2xl mb-4 inline-block leading-none"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    fontWeight: 700,
                    transform: 'rotate(-2deg)',
                  }}
                >
                  <span className="text-ink">{meta.label}</span>
                  <span className="text-terracotta">.</span>
                </h3>

                <ul className="space-y-1.5">
                  {skillGroup.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-sm text-ink-soft"
                    >
                      <span className="w-1 h-1 rounded-full bg-terracotta flex-shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
