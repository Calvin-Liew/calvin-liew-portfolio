'use client';

import { useEffect, useState } from 'react';

type Item = { id: string; label: string };

/** Reads the chapter headings on the page (marked with data-toc) once it has rendered. */
function useChapters() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-toc]')];
    const frame = requestAnimationFrame(() =>
      setItems(nodes.map((node) => ({ id: node.id, label: node.dataset.toc ?? '' }))),
    );
    // The active chapter is the last heading that has scrolled past the top third of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '0px 0px -65% 0px' },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return { items, active };
}

/**
 * "On this page" navigation for long project pages.
 * `rail`: sticky list in the left margin on wide screens. `inline`: collapsible list for narrower ones.
 */
export default function ProjectToc({ variant }: { variant: 'rail' | 'inline' }) {
  const { items, active } = useChapters();
  if (items.length < 3) return null;

  if (variant === 'rail') {
    return (
      <nav
        aria-label="On this page"
        className="absolute right-full top-0 mr-10 hidden h-full w-44 min-[1360px]:block"
      >
        <div className="sticky top-28">
          <p className="mb-3 font-hand text-base text-ink-soft">on this page</p>
          <ol className="space-y-1 border-l border-border">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  title={item.label}
                  className={`-ml-px line-clamp-2 border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
                    active === item.id
                      ? 'border-terracotta font-medium text-ink'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    );
  }

  return (
    <details className="group mt-10 rounded-xl border border-border bg-paper-deeper min-[1360px]:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-sm text-ink [&::-webkit-details-marker]:hidden">
        <span>
          <span className="font-medium">On this page</span>
          <span className="text-muted"> · {items.length} sections</span>
        </span>
        <span aria-hidden className="text-muted transition-transform group-open:rotate-180">
          &#9662;
        </span>
      </summary>
      <ol className="grid gap-x-8 gap-y-1.5 border-t border-border px-5 py-4 text-sm sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.id} className="flex gap-2">
            <span className="w-5 shrink-0 tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
            <a href={`#${item.id}`} className="text-ink-soft underline-offset-4 hover:text-ink hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
