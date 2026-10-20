'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, RotateCcw, Send, X } from 'lucide-react';
import { OPEN_EVENT } from './openAskMe';
import AskThread from './AskThread';
import { SUGGESTIONS, ask, resetConversation, useAskStore } from './askStore';

/** Floating launcher plus side panel. Shares its conversation with the hero's inline assistant. */
export default function AskMe() {
  const { turns, busy, inlineVisible } = useAskStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
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
  }, [turns, open]);

  // Other parts of the page can open the panel with openAskMe().
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    openerRef.current?.focus();
  };

  const submit = (question: string) => {
    if (!question.trim() || busy) return;
    setInput('');
    ask(question);
  };

  return (
    <>
      {/* Hidden while the hero's own assistant is on screen, so there is one obvious way in. */}
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Ask me anything: an AI assistant about Calvin's work"
        tabIndex={inlineVisible ? -1 : undefined}
        className={`fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border-2 border-ink/85 bg-paper p-3 font-hand text-lg text-ink shadow-[3px_3px_0_0_rgba(31,26,23,0.85)] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:bottom-5 sm:left-5 sm:px-4 sm:py-2.5 ${
          inlineVisible ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
        }`}
      >
        <MessageCircle aria-hidden="true" className="h-5 w-5 text-terracotta" />
        {/* Icon-only on phones, where a wide pill would cover the content. */}
        <span className="hidden sm:inline" aria-hidden="true">
          ask me anything
        </span>
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
              <div className="flex shrink-0 items-center gap-1">
                {turns.length > 0 && !busy && (
                  <button
                    type="button"
                    onClick={() => {
                      resetConversation();
                      inputRef.current?.focus();
                    }}
                    aria-label="Start a new conversation"
                    title="Start over"
                    className="rounded-md p-1.5 text-ink-soft hover:bg-paper-deeper focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                  >
                    <RotateCcw aria-hidden="true" className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close the assistant"
                  className="rounded-md p-1.5 text-ink-soft hover:bg-paper-deeper focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </header>

            <div ref={logRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4" aria-live="polite">
              {turns.length === 0 && (
                <div className="space-y-2">
                  <p className="font-hand text-lg text-terracotta-deep">try one of these →</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.question}
                      type="button"
                      onClick={() => submit(s.question)}
                      className="block w-full rounded-lg border border-border-strong bg-paper-deeper px-3 py-2 text-left text-sm text-ink-soft hover:border-ink/50 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                    >
                      {s.question}
                    </button>
                  ))}
                </div>
              )}
              <AskThread turns={turns} />
            </div>

            <form
              className="flex items-end gap-2 border-t border-border px-5 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
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
                    submit(input);
                  }
                }}
                placeholder="Ask about a project, skill or role…"
                className="flex-1 resize-none rounded-lg border border-border-strong bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-ink/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/10"
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
