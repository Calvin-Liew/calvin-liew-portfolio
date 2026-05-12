import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'projects', 'night-shift');
mkdirSync(outDir, { recursive: true });

const URL = 'https://calvin-liew.github.io/a4-sleep-analytics/';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: join(outDir, '00-hero.png'), fullPage: false });
  console.log('saved 00-hero.png');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
