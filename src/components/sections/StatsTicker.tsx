import { Fragment } from 'react';
import { SparkleStar } from '../ui/HandDrawn';
import { projects } from '@/data/projects';

/* Hand-picked outcomes, referenced by project + stat index so the numbers
   always match the case studies. */
const picks: Array<[projectId: string, statIndex: number]> = [
  ['suprm-intelligence', 0],
  ['self-taught-telecom-agent', 0],
  ['license-patrol', 0],
  ['document-to-workflow-intake', 1],
  ['suprm-intelligence', 2],
  ['saas-scout', 1],
  ['ai-workflow-developer-tooling', 0],
  ['anatomy-of-fear', 1],
  ['self-taught-telecom-agent', 3],
];

const items = picks.flatMap(([id, i]) => {
  const project = projects.find((p) => p.id === id);
  const stat = project?.extendedContent?.stats?.[i];
  if (!project || !stat) return [];
  return [{ key: `${id}-${i}`, ...stat, project: project.title.split(':')[0] }];
});

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <Fragment key={item.key}>
          <li className="flex items-baseline gap-2.5 whitespace-nowrap px-6">
            <span className="font-display italic text-3xl text-terracotta-soft">{item.value}</span>
            <span className="text-sm text-paper/85">{item.label}</span>
            <span className="font-hand text-sm text-paper/50">({item.project})</span>
          </li>
          <li aria-hidden className="shrink-0">
            <SparkleStar className="w-4 h-4" color="var(--terracotta-soft)" />
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

/** A tilted ink band of real outcomes that scrolls between the hero and the work. */
export default function StatsTicker() {
  return (
    <section aria-label="Results by the numbers" className="relative z-10 overflow-hidden py-8 sm:py-10">
      <div className="ticker texture-grain -left-[5%] w-[110%] -rotate-[1.5deg] bg-ink py-4 shadow-xl">
        <div className="ticker-track flex w-max">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}
