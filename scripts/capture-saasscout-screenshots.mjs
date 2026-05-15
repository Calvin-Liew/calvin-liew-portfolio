import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'projects', 'saas-scout');
mkdirSync(outDir, { recursive: true });

const SITE = 'https://saas-intelligence-copilot-calvi.netlify.app';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(SITE, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(3000);

  // Above-the-fold landing
  await page.screenshot({
    path: join(outDir, '03-app-landing.png'),
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('saved 03-app-landing.png');

  // Try clicking "Run analysis" to populate a result
  const runBtn = page.locator('button:has-text("Run analysis")').first();
  if (await runBtn.count()) {
    await runBtn.click();
    // Wait for results to populate
    await page.waitForTimeout(15_000);
    await page.screenshot({
      path: join(outDir, '04-results.png'),
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log('saved 04-results.png');

    // Scroll down to see evidence + recommendation memo
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(800);
    await page.screenshot({
      path: join(outDir, '05-recommendation.png'),
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log('saved 05-recommendation.png');

    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(800);
    await page.screenshot({
      path: join(outDir, '06-evidence-detail.png'),
      fullPage: false,
      clip: { x: 0, y: 0, width: 1440, height: 900 },
    });
    console.log('saved 06-evidence-detail.png');
  } else {
    console.log('Run analysis button not found, skipping result captures');
  }

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
