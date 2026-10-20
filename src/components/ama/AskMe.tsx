'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type Turn = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'What did Calvin build at Sanofi?',
  'Has Calvin worked with RAG or AI agents?',
  'What was the self-taught support agent project?',
  'What design work has Calvin done?',
];

/** Renders the small subset of markdown the assistant uses: links, bold, bullet lines. No raw HTML. */
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
              <Link key={i} href={href} className="text-terracotta underline underline-offset-2 hover:text-terracotta-deep">
                {label}
              </Link>
            );
          }
          if (/^https:\/\//.test(href)) {
            return (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-terracotta underline underline-offset-2">
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
            <strong key={i}>
              <Inline text={bold[1]} />
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Answer({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\s*[-*] /.test(l))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {lines.map((l, j) => (
                <li key={j}>
                  <Inline text={l.replace(/^\s*[-*] /, '')} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            <Inline text={block} />
          </p>
        );
      })}
    </div>
  );
}

export default function AskMe() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [turns]);

  const close = () => {
    setOpen(false);
    openerRef.current?.focus();
  };

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const history = turns;
    setTurns([...history, { role: 'user', content: q }, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);
    const write = (content: string) =>
      setTurns((prev) => [...prev.slice(0, -1), { role: 'assistant', content }]);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, history }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        write(data.error ?? 'Sorry, the assistant is unavailable right now.');
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        write(text);
      }
    } catch {
      write('Sorry, the assistant is unavailable right now.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border-2 border-ink/85 bg-paper px-4 py-2.5 font-hand text-lg text-ink shadow-[3px_3px_0_0_rgba(31,26,23,0.85)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5 text-terracotta" />
        ask me anything
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink/30" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ama-title"
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col border-l-2 border-ink/85 bg-paper shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                <h2 id="ama-title" className="font-display text-2xl font-semibold text-ink">
                  Ask about Calvin&apos;s work
                </h2>
                <p className="mt-1 text-sm text-muted">
                  An AI assistant that answers from this site only. It can be wrong; check the linked pages.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close the assistant"
                className="rounded-md p-1.5 text-ink-soft hover:bg-paper-deeper focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </header>

            <div ref={logRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4" aria-live="polite">
              {turns.length === 0 && (
                <div className="space-y-2">
                  <p className="font-hand text-lg text-terracotta">try one of these →</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="block w-full rounded-lg border border-border-strong bg-paper-deeper px-3 py-2 text-left text-sm text-ink-soft hover:border-terracotta hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {turns.map((t, i) =>
                t.role === 'user' ? (
                  <p key={i} className="ml-8 rounded-lg bg-ink px-3 py-2 text-sm text-paper">
                    {t.content}
                  </p>
                ) : (
                  <div key={i} className="mr-4 text-sm leading-relaxed text-ink-soft">
                    {t.content ? <Answer text={t.content} /> : <span className="text-muted">Thinking…</span>}
                  </div>
                ),
              )}
            </div>

            <form
              className="flex items-end gap-2 border-t border-border px-5 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <label htmlFor="ama-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="ama-input"
                ref={inputRef}
                rows={2}
                maxLength={500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                placeholder="Ask about a project, skill or role…"
                className="flex-1 resize-none rounded-lg border border-border-strong bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/40"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send question"
                className="rounded-lg bg-ink p-2.5 text-paper hover:bg-ink-soft disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
