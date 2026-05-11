import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import ExperienceCard from '@/components/experience/ExperienceCard';
import Education from '@/components/sections/Education';
import ContactCard from '@/components/ui/ContactCard';
import Button from '@/components/ui/Button';
import MarkerHighlight from '@/components/ui/MarkerHighlight';
import { Doodle } from '@/components/ui/HandDrawn';
import { aboutData } from '@/data/about';
import { experiences } from '@/data/experience';

const professionalExperiences = experiences.filter(
  (e) => e.type !== 'Volunteer'
);
const volunteerExperiences = experiences.filter(
  (e) => e.type === 'Volunteer'
);

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'Calvin Liew - Product Analyst and Designer. Background, skills, and professional experience in product, design, data, and AI.',
};

const toolkitMeta: Record<
  string,
  { label: string; doodle: 'paperplane' | 'lightbulb' | 'pencil' | 'magnifier' | 'sparkle' }
> = {
  'AI & Data': { label: 'ai & data', doodle: 'sparkle' },
  'Product Management': { label: 'product', doodle: 'paperplane' },
  Technical: { label: 'technical', doodle: 'pencil' },
  Design: { label: 'design', doodle: 'lightbulb' },
};

export default function ProfilePage() {
  return (
    <Section>
      <Container>
        <article className="max-w-3xl mx-auto">
          {/* ─────────────────────────  Intro  ───────────────────────── */}
          <header className="mb-20">
            <p
              className="text-2xl text-terracotta mb-2 inline-block"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-3deg)',
              }}
            >
              i&apos;m —
            </p>
            <h1 className="font-display italic text-5xl sm:text-6xl text-ink mb-8 leading-[1.05]">
              About me<span className="text-terracotta not-italic">.</span>
            </h1>

            <div className="space-y-5 text-lg text-ink-soft leading-relaxed">
              <p>{aboutData.introduction}</p>

              <p>
                I believe the best AI products come from combining{' '}
                <MarkerHighlight className="font-medium text-ink">
                  agentic systems, strong product strategy, and clean data
                </MarkerHighlight>
                . At Sanofi I&apos;ve built automated supplier intelligence
                models on Snowflake + external APIs, shipped dashboards used
                by 30+ stakeholders for strategic sourcing, and led product
                development on AI agents that replace manual workflows with
                real-time insight.
              </p>

              <p>
                My background in Management Information Technology and Computer
                Science at the University of Toronto bridges business
                strategy, data engineering, and product thinking. Design and
                UX are part of the toolkit too. They make AI products feel
                as good to use as they are to demo.
              </p>
            </div>
          </header>

          {/* ─────────────────────────  Resume  ───────────────────────── */}
          <section className="mb-20">
            <h2 className="font-display italic text-3xl sm:text-4xl text-ink mb-3 leading-tight">
              <span className="inline-flex items-baseline gap-3 flex-wrap">
                <span>
                  Resume<span className="text-terracotta not-italic">.</span>
                </span>
                <span
                  className="text-terracotta text-xl inline-block not-italic font-normal"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-2deg)',
                  }}
                >
                  (the formal version)
                </span>
              </span>
            </h2>
            <p className="text-base text-ink-soft mb-6 max-w-xl">
              Want the one-page summary? Grab the PDF.
            </p>

            <div className="relative bg-paper-deeper border border-border rounded-xl p-6 sm:p-8 shadow-paper flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-shrink-0 self-start">
                <Doodle
                  name="pencil"
                  className="w-12 h-12 text-ink-soft"
                  color="currentColor"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-display text-xl text-ink mb-1">
                  Calvin Liew, Resume
                </h3>
                <p className="text-sm text-ink-soft mb-5">
                  My latest experience in product, design, and data, all in one
                  page.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Button
                    href="/resume/resume.pdf"
                    variant="primary"
                    size="md"
                  >
                    Download resume &rarr;
                  </Button>
                  <Link
                    href="/resume/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-terracotta hover:text-terracotta-deep hover:translate-x-1 transition-all duration-200 inline-flex items-center"
                    style={{
                      fontFamily: 'var(--font-kalam), cursive',
                      transform: 'rotate(-2deg)',
                    }}
                  >
                    or open in new tab &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ────────────────────────  My toolkit  ────────────────────── */}
          <section className="mb-20">
            <h2 className="font-display italic text-3xl sm:text-4xl text-ink mb-3 leading-tight">
              <span className="inline-flex items-baseline gap-3 flex-wrap">
                <span>
                  My toolkit<span className="text-terracotta not-italic">.</span>
                </span>
                <span
                  className="text-terracotta text-xl inline-block not-italic font-normal"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-2deg)',
                  }}
                >
                  (everything in the kit)
                </span>
              </span>
            </h2>
            <p className="text-base text-ink-soft mb-10 max-w-xl">
              The full inventory of skills I bring across product, design, and
              data work.
            </p>

            {/* Editorial typographic flow — no cards, distinct from homepage grid */}
            <div className="space-y-9">
              {aboutData.skills.map((group, i) => {
                const meta = toolkitMeta[group.category] || {
                  label: group.category.toLowerCase(),
                  doodle: 'lightbulb' as const,
                };
                const isLast = i === aboutData.skills.length - 1;
                return (
                  <div
                    key={group.category}
                    className={isLast ? '' : 'pb-9 border-b border-border'}
                  >
                    <h3
                      className="text-3xl mb-4 inline-block leading-none"
                      style={{
                        fontFamily: 'var(--font-kalam), cursive',
                        fontWeight: 700,
                        transform: 'rotate(-2deg)',
                      }}
                    >
                      <span className="text-ink">{meta.label}</span>
                      <span className="text-terracotta">.</span>
                    </h3>
                    <p className="text-lg text-ink-soft leading-loose">
                      {group.items.map((skill, idx) => (
                        <span key={skill}>
                          {idx > 0 && (
                            <span className="text-terracotta mx-2">·</span>
                          )}
                          {skill}
                        </span>
                      ))}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ────────────────────  Where I've been  ──────────────────── */}
          <section className="mb-20">
            <h2 className="font-display italic text-3xl sm:text-4xl text-ink mb-3 leading-tight">
              <span className="inline-flex items-baseline gap-3 flex-wrap">
                <span>
                  Where I&apos;ve been
                  <span className="text-terracotta not-italic">.</span>
                </span>
                <span
                  className="text-terracotta text-xl inline-block not-italic font-normal"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-2deg)',
                  }}
                >
                  (the work)
                </span>
              </span>
            </h2>
            <p className="text-base text-ink-soft mb-10 max-w-xl">
              A short journey through product, design, and data roles.
            </p>

            {/* Timeline wrapper — vertical line + each entry has its own dot */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-px bg-border-strong"
              />
              <div className="space-y-14">
                {professionalExperiences.map((experience) => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ────────────────────────  Volunteering  ──────────────────── */}
          {volunteerExperiences.length > 0 && (
            <section className="mb-20">
              <h2 className="font-display italic text-3xl sm:text-4xl text-ink mb-3 leading-tight">
                <span className="inline-flex items-baseline gap-3 flex-wrap">
                  <span>
                    Volunteering
                    <span className="text-terracotta not-italic">.</span>
                  </span>
                  <span
                    className="text-terracotta text-xl inline-block not-italic font-normal"
                    style={{
                      fontFamily: 'var(--font-kalam), cursive',
                      transform: 'rotate(-2deg)',
                    }}
                  >
                    (giving back)
                  </span>
                </span>
              </h2>
              <p className="text-base text-ink-soft mb-10 max-w-xl">
                Side work I do for communities I care about.
              </p>

              <div className="relative">
                <div
                  aria-hidden
                  className="absolute left-0 top-2 bottom-2 w-px bg-border-strong"
                />
                <div className="space-y-14">
                  {volunteerExperiences.map((experience) => (
                    <ExperienceCard
                      key={experience.id}
                      experience={experience}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ─────────────────────  Where I learned  ─────────────────── */}
          <section className="mb-20">
            <Education />
          </section>

          {/* ─────────────────────────  Contact  ──────────────────────── */}
          <section id="contact" className="mb-8 scroll-mt-24">
            <ContactCard />
          </section>
        </article>
      </Container>
    </Section>
  );
}
