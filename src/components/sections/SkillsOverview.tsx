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

// Sticker sheet: deterministic tilt + tone + shape per index, so it looks hand-placed
// but renders identically on server and client.
const stickerTilts = [-2, 1.5, -1, 2.5, -2.5, 1, 0.5, -1.5, 2];
const stickerTones = [
  'bg-white border-border-strong text-ink-soft',
  'bg-terracotta-wash border-terracotta-soft text-terracotta-deep',
  'bg-[#fef3a0] border-[#f1df6a] text-ink',
  'bg-white border-border-strong text-ink-soft',
  'bg-ink border-ink text-paper',
];

export default function SkillsOverview() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <Section>
      <Container>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-14 transition-all duration-1000 ${
            isVisible ? '' : 'reveal-hidden'
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
            From understanding the problem to defining requirements, testing the
            solution, and learning from users.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
            isVisible ? '' : 'reveal-hidden'
          }`}
        >
          {aboutData.skills.map((skillGroup, groupIndex) => {
            const meta = categoryMeta[skillGroup.category] || {
              label: skillGroup.category.toLowerCase(),
              doodle: 'sparkle' as DoodleName,
            };
            return (
              <div
                key={skillGroup.category}
                className="texture-grid relative bg-paper-deeper border border-border rounded-xl p-5 shadow-paper transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className="tape -top-2.5 left-6 w-16!"
                  style={{
                    background: groupIndex % 2 ? 'rgba(254, 240, 138, 0.8)' : 'rgba(254, 215, 170, 0.85)',
                    transform: `rotate(${groupIndex % 2 ? 3 : -4}deg)`,
                  }}
                />
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

                <ul className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <li
                      key={skill}
                      className={`sticker border px-3 py-1 text-sm shadow-sm ${
                        i % 3 === 1 ? 'rounded-full' : 'rounded-md'
                      } ${stickerTones[(i + groupIndex) % stickerTones.length]}`}
                      style={{
                        ['--tilt' as string]: `${stickerTilts[(i + groupIndex * 2) % stickerTilts.length]}deg`,
                      } as React.CSSProperties}
                    >
                      {skill}
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
