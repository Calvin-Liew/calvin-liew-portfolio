import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'projects', 'food-resq');
mkdirSync(outDir, { recursive: true });

const URL = 'https://devpost.com/software/food-resq-ai-recommended-recipes-to-reduce-food-waste';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1800 },
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(2500);

  // Try to dismiss any cookie or signup overlay
  try {
    await page
      .getByRole('button', { name: /accept|agree|got it/i })
      .first()
      .click({ timeout: 1500 });
  } catch {}

  // Full page screenshot first so we can see what Devpost serves
  await page.screenshot({ path: join(outDir, '00-page.png'), fullPage: true });

  // Collect every image on the page that looks like a product screenshot
  // (Devpost stores gallery images under daddymax.devpost.com / m.devpost.com / cdn)
  const imageUrls = await page.evaluate(() => {
    const srcs = new Set();
    document.querySelectorAll('img').forEach((img) => {
      const src = img.currentSrc || img.src;
      if (!src) return;
      // Filter out icons, avatars, devpost ui
      if (/avatars|icons|favicon|logo|sprite/i.test(src)) return;
      // Keep things from devpost CDN that look like uploads
      if (/devpost\.com|cloudinary|d112y698adiu2z|s3\.amazonaws/i.test(src)) {
        srcs.add(src);
      }
    });
    return Array.from(srcs);
  });

  console.log(`Found ${imageUrls.length} candidate gallery images`);
  const manifest = [];
  let n = 0;
  for (const url of imageUrls) {
    try {
      const res = await page.context().request.get(url);
      if (!res.ok()) continue;
      const buf = await res.body();
      // Skip if too small to be a screenshot (likely an icon)
      if (buf.length < 10_000) continue;
      n += 1;
      const ext = url.split('?')[0].split('.').pop().toLowerCase();
      const safeExt = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)
        ? ext
        : 'png';
      const filename = `gallery-${String(n).padStart(2, '0')}.${safeExt}`;
      writeFileSync(join(outDir, filename), buf);
      manifest.push({ filename, source: url, size: buf.length });
      console.log(`  saved ${filename} (${Math.round(buf.length / 1024)} KB) from ${url.slice(0, 80)}`);
    } catch (e) {
      console.warn(`  failed: ${url} → ${e.message}`);
    }
  }
  writeFileSync(join(outDir, '_manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. Saved ${n} candidate images.`);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
