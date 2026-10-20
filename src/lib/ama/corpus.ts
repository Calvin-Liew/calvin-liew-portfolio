import { aboutData } from '@/data/about';
import { education } from '@/data/education';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';
import blogPosts from './blog.generated.json';

/** Flattens any nested data into "key: value" lines, skipping image paths and empty values. */
function flatten(value: unknown, prefix = ''): string[] {
  if (value === null || value === undefined || value === '') return [];
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    const text = String(value);
    if (/\.(png|jpe?g|webp|gif|svg|pdf)$/i.test(text)) return [];
    return [prefix ? `${prefix}: ${text}` : text];
  }
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) return [`${prefix}: ${value.join(', ')}`];
    return value.flatMap((item) => flatten(item, prefix));
  }
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, v]) =>
      flatten(v, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

function section(title: string, lines: string[]): string {
  return `## ${title}\n${lines.join('\n')}`;
}

/**
 * Everything the agent may answer from: the site's own data files and blog posts.
 * Built once per server instance; identical text on every request keeps the prompt cache warm.
 */
export const corpus: string = [
  section('About', flatten(aboutData)),
  section('Education', flatten(education)),
  ...experiences.map((e) => section(`Experience: ${e.title} at ${e.company}`, flatten(e))),
  ...projects.map((p) =>
    section(`Project: ${p.title} (page: /projects/${p.id})`, flatten({ ...p, image: undefined })),
  ),
  ...(blogPosts as { slug: string; title: string; date: string; content: string }[]).map((b) =>
    section(`Blog post: ${b.title} (page: /blog/${b.slug}, ${b.date})`, [b.content]),
  ),
].join('\n\n');
