'use client';

import { useSyncExternalStore } from 'react';

/**
 * One conversation shared by every place the assistant appears (the hero and the side panel),
 * so a question asked in the hero carries on in the panel on other pages.
 */
export type Turn = { role: 'user' | 'assistant'; content: string };

type State = {
  turns: Turn[];
  busy: boolean;
  /** True while the hero's inline assistant is on screen; the floating launcher hides then. */
  inlineVisible: boolean;
};

const SERVER_STATE: State = { turns: [], busy: false, inlineVisible: false };
let state: State = SERVER_STATE;
const listeners = new Set<() => void>();

function update(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAskStore(): State {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}

export function setInlineVisible(inlineVisible: boolean) {
  if (state.inlineVisible !== inlineVisible) update({ inlineVisible });
}

export function resetConversation() {
  if (!state.busy) update({ turns: [] });
}

const UNAVAILABLE = 'Sorry, the assistant is unavailable right now.';

export async function ask(question: string) {
  const q = question.trim();
  if (!q || state.busy) return;
  const history = state.turns;
  update({ turns: [...history, { role: 'user', content: q }, { role: 'assistant', content: '' }], busy: true });
  const write = (content: string) =>
    update({ turns: [...state.turns.slice(0, -1), { role: 'assistant', content }] });
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q, history }),
    });
    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({}));
      write(data.error ?? UNAVAILABLE);
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
    write(UNAVAILABLE);
  } finally {
    update({ busy: false });
  }
}

/** Suggested questions: short chip label, full question sent to the assistant. */
export const SUGGESTIONS = [
  { label: 'Work at Sanofi', question: 'What did Calvin build at Sanofi?' },
  { label: 'RAG & AI agents', question: 'Has Calvin worked with RAG or AI agents?' },
  { label: 'Self-taught agent', question: 'What was the self-taught support agent project?' },
  { label: 'Design work', question: 'What design work has Calvin done?' },
];
