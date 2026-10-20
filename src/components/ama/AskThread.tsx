'use client';

import Link from 'next/link';
import type { Turn } from './askStore';

/** Renders the small subset of markdown the assistant uses: links, bold. No raw HTML. */
function Inline({ text }: { text: string }) {
  // Bold first, so a bolded link stays one piece and is rendered recursively below.
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          const [, label, href] = link;
          if (href.startsWith('/')) {
            return (
              <Link key={i} href={href} className="text-terracotta-deep underline underline-offset-2 hover:text-ink">
                {label}
              </Link>
            );
          }
          if (/^https:\/\//.test(href)) {
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-terracotta-deep underline underline-offset-2 hover:text-ink">
                {label}
              </a>
            );
          }
          return <span key={i}>{label}</span>;
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) {
          // Bold text may itself contain a link, e.g. **[SaaSScout](/projects/saas-scout)**.
          return (
            <strong key={i} className="font-semibold text-ink">
              <Inline text={bold[1]} />
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const BULLET = /^\s*[-*] /;
const NUMBERED = /^\s*\d+[.)] /;

/** Splits text into paragraphs and lists. A list can follow an intro line without a blank line between. */
function Answer({ text }: { text: string }) {
  const groups: { kind: 'p' | 'ul' | 'ol'; lines: string[] }[] = [];
  for (const line of text.split('\n')) {
    if (!line.trim()) {
      groups.push({ kind: 'p', lines: [] }); // blank line ends the current group
      continue;
    }
    const kind = BULLET.test(line) ? 'ul' : NUMBERED.test(line) ? 'ol' : 'p';
    const last = groups[groups.length - 1];
    if (last && last.kind === kind && (kind !== 'p' || last.lines.length > 0)) last.lines.push(line);
    else groups.push({ kind, lines: [line] });
  }
  return (
    <div className="space-y-2">
      {groups
        .filter((g) => g.lines.length > 0)
        .map((g, i) => {
          if (g.kind === 'p') {
            return (
              <p key={i}>
                <Inline text={g.lines.join('\n')} />
              </p>
            );
          }
          const List = g.kind;
          return (
            <List key={i} className={`${g.kind === 'ul' ? 'list-disc' : 'list-decimal'} space-y-1 pl-5`}>
              {g.lines.map((l, j) => (
                <li key={j}>
                  <Inline text={l.replace(g.kind === 'ul' ? BULLET : NUMBERED, '')} />
                </li>
              ))}
            </List>
          );
        })}
    </div>
  );
}

/** The conversation: visitor questions as ink bubbles, answers as plain text. */
export default function AskThread({ turns }: { turns: Turn[] }) {
  return (
    <>
      {turns.map((t, i) =>
        t.role === 'user' ? (
          <p key={i} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-ink px-3.5 py-2 text-sm text-paper">
            {t.content}
          </p>
        ) : (
          <div key={i} className="mr-4 text-sm leading-relaxed text-ink-soft">
            {t.content ? (
              <Answer text={t.content} />
            ) : (
              <span className="inline-flex items-center gap-1.5 text-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
                Thinking…
              </span>
            )}
          </div>
        ),
      )}
    </>
  );
}
