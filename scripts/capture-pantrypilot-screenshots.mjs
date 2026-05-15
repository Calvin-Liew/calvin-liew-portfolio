import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'projects', 'pantry-pilot');
mkdirSync(outDir, { recursive: true });

const SITE = 'https://pantry-pilot-demo.netlify.app';

async function shot(page, filename, clip) {
  await page.screenshot({
    path: join(outDir, filename),
    fullPage: false,
    clip: clip ?? { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log(`saved ${filename}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ── Desktop captures ──────────────────────────────────────────────────
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  // Dashboard / hero
  await page.goto(SITE, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(2000);
  await shot(page, '00-dashboard.png');

  // Try to navigate to Inventory
  const invLink = page.locator('a[href*="inventor"], nav >> text=Inventory, a >> text=Inventory').first();
  if (await invLink.count()) {
    await invLink.click();
    await page.waitForTimeout(1500);
    await shot(page, '01-inventory.png');
  } else {
    console.log('Inventory nav not found, trying /inventory directly');
    await page.goto(`${SITE}/inventory`, { waitUntil: 'networkidle', timeout: 30_000 });
    await page.waitForTimeout(1500);
    await shot(page, '01-inventory.png');
  }

  // Recipes
  await page.goto(`${SITE}/recipes`, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForTimeout(1500);
  await shot(page, '02-recipes.png');

  // Insights / analytics
  await page.goto(`${SITE}/insights`, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForTimeout(1500);
  await shot(page, '03-insights.png');

  // Grocery suggestions
  await page.goto(`${SITE}/groceries`, { waitUntil: 'networkidle', timeout: 30_000 });
  await page.waitForTimeout(1500);
  await shot(page, '04-groceries.png');

  await ctx.close();

  // ── Mobile capture (dashboard) ────────────────────────────────────────
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const mobile = await mobileCtx.newPage();
  await mobile.goto(SITE, { waitUntil: 'networkidle', timeout: 60_000 });
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({
    path: join(outDir, '05-mobile.png'),
    fullPage: false,
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log('saved 05-mobile.png');
  await mobileCtx.close();

  await browser.close();
  console.log('All done →', outDir);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
