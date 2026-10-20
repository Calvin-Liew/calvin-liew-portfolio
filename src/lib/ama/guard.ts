import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';

/** The only model this endpoint will ever call: the cheapest Claude model. */
export const AMA_MODEL = 'claude-haiku-5-5';

/** USD per million tokens for AMA_MODEL. Cache reads are charged at the full input rate on purpose,
 *  so the cap errs on the safe side. */
const PRICE = { input: 0.1, cacheWrite: 0.125, cacheRead: 0.1, output: 0.5 };

/** Monthly spending cap in USD; override with AMA_MONTHLY_CAP_USD. */
export const MONTHLY_CAP_USD = Number(process.env.AMA_MONTHLY_CAP_USD ?? '5');

/** Per-visitor limit: this many questions per rolling window. */
const RATE_LIMIT = { questions: 10, windowMs: 10 * 60 * 1000 };

export interface Usage {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
}

export function usageCost(u: Usage): number {
  return (
    (u.input_tokens ?? 0) * PRICE.input +
    (u.cache_creation_input_tokens ?? 0) * PRICE.cacheWrite +
    (u.cache_read_input_tokens ?? 0) * PRICE.cacheRead +
    (u.output_tokens ?? 0) * PRICE.output
  ) / 1e6;
}

/** Worst case for one request: every input token billed as a cache write, plus max_tokens of output. */
export function worstCaseCost(inputChars: number, maxTokens: number): number {
  const inputTokens = Math.ceil(inputChars / 2); // deliberate over-estimate
  return (inputTokens * PRICE.cacheWrite + maxTokens * PRICE.output) / 1e6;
}

// ---------------------------------------------------------------- storage

interface KV {
  get(key: string): Promise<{ value: unknown; etag?: string } | null>;
  set(key: string, value: unknown, etag?: string): Promise<boolean>;
}

const memory = new Map<string, unknown>();
const memoryKV: KV = {
  async get(key) {
    return memory.has(key) ? { value: memory.get(key) } : null;
  },
  async set(key, value) {
    memory.set(key, value);
    return true;
  },
};

/** Netlify Blobs in production (shared across function instances); memory when running locally. */
function kv(): KV {
  try {
    const store = getStore({ name: 'ama', consistency: 'strong' });
    return {
      async get(key) {
        const hit = await store.getWithMetadata(key, { type: 'json' });
        return hit ? { value: hit.data, etag: hit.etag } : null;
      },
      async set(key, value, etag) {
        const res = await store.setJSON(key, value, etag ? { onlyIfMatch: etag } : { onlyIfNew: true });
        return res.modified;
      },
    };
  } catch {
    return memoryKV;
  }
}

/** Rejects if the storage call takes too long, so a visitor never waits on a stalled request. */
function withTimeout<T>(promise: Promise<T>, ms = 4000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`storage timed out after ${ms}ms`)), ms)),
  ]);
}

/** Read-modify-write with an etag check, retried on conflict. */
async function update<T>(key: string, fallback: T, change: (current: T) => T | null): Promise<T | null> {
  const store = kv();
  for (let attempt = 0; attempt < 5; attempt++) {
    const hit = await withTimeout(store.get(key));
    const current = (hit?.value as T | undefined) ?? fallback;
    const next = change(current);
    if (next === null) return null;
    if (await withTimeout(store.set(key, next, hit?.etag))) return next;
  }
  throw new Error('Could not update the usage counter; try again.');
}

// ---------------------------------------------------------------- guards

function monthKey(now = new Date()): string {
  return `spend-${now.toISOString().slice(0, 7)}`;
}

/** Hash the visitor's IP with a server-side salt so no raw address is ever stored. */
export function visitorId(ip: string): string {
  const salt = process.env.AMA_SALT ?? 'ama';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 24);
}

/** Returns false when this visitor has hit the per-window question limit. */
export async function allowVisitor(id: string, now = Date.now()): Promise<boolean> {
  const result = await update<number[]>(`rate-${id}`, [], (times) => {
    const recent = times.filter((t) => now - t < RATE_LIMIT.windowMs);
    return recent.length >= RATE_LIMIT.questions ? null : [...recent, now];
  });
  return result !== null;
}

/** Reserves the worst-case cost against this month's cap. Returns false if it would exceed it. */
export async function reserve(amount: number): Promise<boolean> {
  const result = await update<number>(monthKey(), 0, (spent) =>
    spent + amount > MONTHLY_CAP_USD ? null : spent + amount,
  );
  return result !== null;
}

/** Replaces a reservation with what the request actually cost. */
export async function settle(reserved: number, actual: number): Promise<void> {
  await update<number>(monthKey(), 0, (spent) => Math.max(0, spent - reserved + actual));
}
