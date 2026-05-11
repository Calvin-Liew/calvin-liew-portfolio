/**
 * Capture fresh screenshots of the Anatomy of Fear live site.
 *
 * Loads https://calvin-liew.github.io/data-explorers-fear-analytics/,
 * scrolls each visualization into view, waits for D3 to render,
 * and captures a high-resolution screenshot of each section.
 *
 * Outputs land in public/projects/anatomy-of-fear/.
 *
 * Run with: node scripts/capture-fear-screenshots.mjs
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = join(__dirname, '..', 'public', 'projects', 'anatomy-of-fear');
mkdirSync(outDir, { recursive: true });

const SITE_URL = 'https://calvin-liew.github.io/data-explorers-fear-analytics/';

// Map output file name -> live-site section id
const SCENES = [
  { file: '01-blood-flow.png', selector: '#section-signals' },
  { file: '02-fear-journey.png', selector: '#section-fear-journey' },
  { file: '03-spikes.png', selector: '#section-peaks' },
  { file: '04-state-machine.png', selector: '#section-state-machine' },
  { file: '05-effectiveness.png', selector: '#section-effectiveness' },
  { file: '06-dripline.png', selector: '#section-drips' },
  { file: '07-rating-impact.png', selector: '#section-rating-impact' },
  { file: '08-radar.png', selector: '#section-balance' },
  { file: '09-movie-gallery.png', selector: '#section-movie-gallery' },
];

async function captureScene(page, { file, selector }) {
  const handle = await page.$(selector);
  if (!handle) {
    console.warn(`  ⚠ ${selector} not found, skipping`);
    return;
  }

  // Scroll into view and let any animations / lazy renders settle
  await handle.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);

  // Capture just the section element
  const out = join(outDir, file);
  await handle.screenshot({ path: out });
  console.log(`  ✓ ${file}`);
}

async function captureHero(page) {
  // Scroll to top, capture the intro section
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  const out = join(outDir, '00-hero.png');
  const intro = await page.$('#intro');
  if (intro) {
    await intro.screenshot({ path: out });
    console.log(`  ✓ 00-hero.png`);
  } else {
    await page.screenshot({ path: out, fullPage: false });
    console.log(`  ✓ 00-hero.png (viewport fallback)`);
  }
}

(async () => {
  console.log(`Output dir: ${outDir}`);
  console.log(`Launching Chromium...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2, // capture at 2x for sharp screenshots
  });
  const page = await context.newPage();

  console.log(`Loading ${SITE_URL}...`);
  await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 60_000 });

  // Wait long enough for D3 + scrollytelling JS to wire up
  await page.waitForTimeout(3000);

  console.log(`Capturing intro...`);
  await captureHero(page);

  console.log(`Capturing scenes...`);
  for (const scene of SCENES) {
    await captureScene(page, scene);
  }

  await browser.close();
  console.log(`\nDone. ${SCENES.length + 1} screenshots in ${outDir}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
