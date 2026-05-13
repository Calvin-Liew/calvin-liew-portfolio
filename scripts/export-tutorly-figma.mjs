/**
 * Export every top-level frame from the Tutorly Figma file as 2x PNG.
 *
 * Usage:
 *   1. Generate a personal access token at
 *      https://www.figma.com/settings -> Personal access tokens.
 *      Permissions: "File content" -> Read-only.
 *   2. Put the token in .env.local at the repo root as:
 *        FIGMA_TOKEN=figd_xxxxxxxxxxxx
 *   3. Run:  node scripts/export-tutorly-figma.mjs
 *   4. Revoke the token at the same settings page when you're done.
 *
 * The script writes PNGs to public/projects/tutorly/ with safe filenames
 * derived from each frame's name. Files are scaled 2x for retina sharpness.
 */

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const outDir = join(repoRoot, 'public', 'projects', 'tutorly');
mkdirSync(outDir, { recursive: true });

// Load FIGMA_TOKEN from .env.local if present
function loadEnvLocal() {
  const envPath = join(repoRoot, '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, key, raw] = m;
    if (!process.env[key]) {
      process.env[key] = raw.replace(/^['"]|['"]$/g, '');
    }
  }
}
loadEnvLocal();

const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) {
  console.error(
    'FIGMA_TOKEN not set. Generate one at https://www.figma.com/settings and ' +
    'add FIGMA_TOKEN=figd_... to .env.local at the repo root.'
  );
  process.exit(1);
}

const FILE_KEY = 'ssRCJVnGktqLf6BZCVj1ph'; // Tutorly project
const HEADERS = { 'X-Figma-Token': TOKEN };

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'frame';
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} on ${url}\n${await res.text()}`);
  }
  return res.json();
}

async function fetchBinary(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} downloading ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

(async () => {
  console.log('Fetching file tree from Figma...');
  const file = await fetchJSON(`https://api.figma.com/v1/files/${FILE_KEY}`);

  // Collect every top-level FRAME on every page (canvas)
  const targets = [];
  for (const page of file.document.children) {
    if (page.type !== 'CANVAS') continue;
    for (const child of page.children ?? []) {
      if (child.type !== 'FRAME') continue;
      targets.push({
        id: child.id,
        name: child.name,
        page: page.name,
        slug: `${slug(page.name)}--${slug(child.name)}`,
      });
    }
  }

  console.log(`Found ${targets.length} top-level frames across ${file.document.children.length} pages.`);
  if (targets.length === 0) {
    console.error('No frames to export. Aborting.');
    process.exit(1);
  }

  // Figma's images endpoint accepts up to ~100 IDs per call; batch to be safe
  const BATCH = 50;
  const idToUrl = new Map();
  for (let i = 0; i < targets.length; i += BATCH) {
    const batch = targets.slice(i, i + BATCH);
    const ids = batch.map((t) => t.id).join(',');
    const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&scale=2&format=png`;
    console.log(`Requesting render URLs for batch ${i / BATCH + 1} (${batch.length} frames)...`);
    const { images, err } = await fetchJSON(url);
    if (err) throw new Error(`Figma render error: ${err}`);
    for (const [id, pngUrl] of Object.entries(images)) {
      if (pngUrl) idToUrl.set(id, pngUrl);
    }
  }

  console.log(`Got ${idToUrl.size} render URLs. Downloading...`);
  const manifest = [];
  let n = 0;
  for (const t of targets) {
    const url = idToUrl.get(t.id);
    if (!url) {
      console.warn(`  [skip] no render URL for ${t.page} / ${t.name}`);
      continue;
    }
    const filename = `${t.slug}.png`;
    const buf = await fetchBinary(url);
    writeFileSync(join(outDir, filename), buf);
    manifest.push({ page: t.page, name: t.name, file: filename });
    n += 1;
    if (n % 10 === 0) console.log(`  downloaded ${n}/${targets.length}`);
  }

  writeFileSync(
    join(outDir, '_manifest.json'),
    JSON.stringify(manifest, null, 2),
  );
  console.log(`Done. Wrote ${n} PNGs to public/projects/tutorly/`);
  console.log('A _manifest.json index was written alongside the PNGs.');
  console.log('Remember to revoke the Figma token at https://www.figma.com/settings.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
