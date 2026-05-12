/**
 * Capture screenshots of the redesigned Music Pathways live site for the
 * portfolio case study. Loads https://calvin-liew-music-pathways.netlify.app/,
 * walks down the page, and captures section-aligned PNGs.
 *
 * Outputs to public/projects/music-pathways/ in the portfolio repo.
 *
 * Run: node scripts/capture-music-pathways-screenshots.mjs
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
  'music-pathways'
);
mkdirSync(outDir, { recursive: true });

const URL = 'https://calvin-liew-music-pathways.netlify.app/';

(async () => {
  console.log('Output dir:', outDir);
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  console.log('Loading', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60_000 });
  // Wait for any post-mount animations / data fetches
  await page.waitForTimeout(4000);

  // Inspect the page to find top-level sections
  const sections = await page.evaluate(() => {
    const all = Array.from(
      document.querySelectorAll(
        'section, [class*="hero"], [class*="banner"], [class*="explorer"], [class*="pathway"], [class*="tempo"], [class*="chatbot"], [class*="mascot"], main > div, main > section'
      )
    );
    return all
      .map((el, i) => ({
        i,
        tag: el.tagName,
        id: el.id || null,
        cls: el.className?.toString().slice(0, 80) || null,
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
        height: Math.round(el.getBoundingClientRect().height),
      }))
      .filter((s) => s.height > 200)
      .sort((a, b) => a.top - b.top);
  });
  console.log('Detected sections:', sections.length);
  console.dir(sections.slice(0, 12), { depth: null });

  // Capture: full page (one tall image), plus viewport-sized shots at
  // intelligent scroll positions
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: join(outDir, '00-hero.png'),
    fullPage: false,
  });
  console.log('  saved 00-hero.png');

  // Use the detected sections to take per-section screenshots if any exist
  const targets = [];
  if (sections.length > 0) {
    for (let i = 0; i < Math.min(sections.length, 6); i++) {
      const s = sections[i];
      targets.push({
        file: `0${i + 1}-section.png`,
        top: s.top,
      });
    }
  } else {
    // Fallback: scroll by viewport height and capture
    const totalH = await page.evaluate(
      () => document.documentElement.scrollHeight
    );
    let y = 0;
    let i = 1;
    while (y < totalH && i < 7) {
      targets.push({ file: `0${i}-section.png`, top: y });
      y += 800;
      i++;
    }
  }

  for (const t of targets) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.max(t.top - 80, 0));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: join(outDir, t.file), fullPage: false });
    console.log('  saved', t.file);
  }

  // Also save a full-page tall capture for reference
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: join(outDir, 'full-page.png'),
    fullPage: true,
  });
  console.log('  saved full-page.png');

  await browser.close();
  console.log('Done.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
