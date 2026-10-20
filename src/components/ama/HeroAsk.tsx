'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { SUGGESTIONS, ask, setInlineVisible, useAskStore } from './askStore';
import { openAskMe } from './openAskMe';

/**
 * The hero's ask box. Asking opens the chat panel, where the answer streams in,
 * so the hero itself stays clean.
 */
export default function HeroAsk() {
  const { turns, busy } = useAskStore();
  const [input, setInput] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  // Tell the floating launcher to step aside while this is on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInlineVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      setInlineVisible(false);
    };
  }, []);

  const submit = (question: string) => {
    if (!question.trim() || busy) return;
    setInput('');
    ask(question);
    openAskMe();
  };

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-2xl">
      <form
        className="flex items-center gap-2 rounded-2xl border-2 border-ink/85 bg-paper p-2 pl-4 text-left shadow-[4px_4px_0_0_rgba(31,26,23,0.85)] transition-transform focus-within:-translate-y-0.5"
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
      >
        <Sparkles aria-hidden="true" className="h-5 w-5 shrink-0 text-ink-soft" />
        <label htmlFor="hero-ask" className="sr-only">
          Ask an AI assistant about Calvin&apos;s work
        </label>
        <input
          id="hero-ask"
          type="text"
          maxLength={500}
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={turns.length ? 'Ask a follow-up…' : 'Ask me anything about my work…'}
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-ink placeholder:text-muted focus:outline-none sm:text-lg"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Ask"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-ink px-3.5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-30 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep sm:px-4"
        >
          <span className="hidden sm:inline">Ask</span>
          <ArrowUp aria-hidden="true" className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {turns.length > 0 && (
          <button
            type="button"
            onClick={openAskMe}
            className="rounded-full bg-ink px-3.5 py-1.5 text-sm text-paper transition-colors hover:bg-ink-soft focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep"
          >
            Back to your conversation
          </button>
        )}
        {SUGGESTIONS.map((s) => (
          <button
            key={s.question}
            type="button"
            onClick={() => submit(s.question)}
            className="rounded-full border border-border-strong/70 bg-paper/70 px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-ink/50 hover:text-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
