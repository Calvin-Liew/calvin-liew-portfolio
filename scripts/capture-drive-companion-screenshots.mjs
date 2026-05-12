/**
 * Capture screenshots of the redesigned Drive Companion prototype for the
 * portfolio case study. Loads localhost:5173 (the Vite dev server in the
 * drive-companion repo), clicks each use case, and saves a fresh PNG.
 *
 * Outputs go to public/projects/drive-companion/ inside the portfolio repo
 * so the case study page can reference them as local images.
 *
 * Run with the drive-companion dev server already running:
 *   1) cd ../drive-companion && npm run dev
 *   2) node scripts/capture-drive-companion-screenshots.mjs
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(
  __dirname,
  '..',
  'public',
  'projects',
  'drive-companion'
);
mkdirSync(outDir, { recursive: true });

const URL = 'http://localhost:5173/';

// Use case cards on the dashboard — click each to capture its active state
const USE_CASES = [
  { file: '01-syllabus-to-schedule.png', title: 'Syllabus-to-Schedule Pack', persona: 'student' },
  { file: '02-smart-reading.png',       title: 'Smart Reading Pack',         persona: 'student' },
  { file: '03-concept-maps.png',        title: 'Living Concept Maps',         persona: 'student' },
  { file: '04-meeting-chief.png',        title: 'AI Meeting Chief of Staff',   persona: 'professional' },
  { file: '05-executive-briefs.png',     title: 'Executive Briefs',            persona: 'professional' },
  { file: '06-work-rhythm.png',          title: 'Work Rhythm Optimiser',       persona: 'professional' },
];

async function setPersona(page, persona) {
  // Persona toggle buttons say "Student" or "Studio"/"Drive"... actually the
  // toggle text from earlier is "Student" / "Studio" — re-check via the live page.
  // The buttons are inside .persona-toggle button — try clicking by label.
  const label = persona === 'student' ? 'Student' : 'Studio';
  const altLabel = persona === 'student' ? 'Student' : 'Pro';
  try {
    const btn = await page.getByRole('button', { name: new RegExp(`^(${label}|${altLabel})$`) }).first();
    await btn.click({ timeout: 2000 });
    await page.waitForTimeout(500);
  } catch {
    // Persona toggle may already be set; ignore
  }
}

async function clickUseCase(page, title) {
  // Use case cards display the title inside an h4 or strong; click the card.
  const card = page
    .locator('.usecase-card', { hasText: title })
    .first();
  await card.click({ timeout: 4000 });
  await page.waitForTimeout(1200);
}

async function captureLanding(page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const file = join(outDir, '00-hero.png');
  await page.screenshot({ path: file });
  console.log('  saved', file);
}

async function captureUseCase(page, scene) {
  // Some use cases route away (/doc, /companion). Always start on / so the
  // .usecase-card buttons are present.
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForTimeout(1200);
  await setPersona(page, scene.persona);
  await clickUseCase(page, scene.title);
  // After clicking, the prototype may navigate to /doc or /companion.
  // Either way, give it time to render then capture the resulting page.
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const file = join(outDir, scene.file);
  await page.screenshot({ path: file });
  console.log('  saved', file);
}

(async () => {
  console.log('Output dir:', outDir);
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  console.log('Loading', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForTimeout(2000);

  console.log('Capturing landing/dashboard...');
  await captureLanding(page);

  console.log('Capturing use cases...');
  for (const scene of USE_CASES) {
    try {
      await captureUseCase(page, scene);
    } catch (err) {
      console.warn('  failed', scene.file, '-', err?.message || err);
    }
  }

  await browser.close();
  console.log('Done.');
})().catch((e) => { console.error(e); process.exit(1); });
