import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { aboutData } from '@/data/about';
import { education } from '@/data/education';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';
import { Project } from '@/types';

// Plain-text views of the site for AI crawlers and assistants (llmstxt.org).

const BASE_URL = 'https://calvinliew.space';
const postsDirectory = path.join(process.cwd(), 'src/content/blog');

interface RawPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
}

function getRawPosts(): RawPost[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, f), 'utf8'));
      if (data.draft) return null;
      return {
        slug: f.replace(/\.md$/, ''),
        title: data.title || '',
        date: String(data.date || ''),
        excerpt: data.excerpt || '',
        body: content.trim(),
      };
    })
    .filter((p): p is RawPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function header(): string[] {
  const links = aboutData.socialLinks
    .filter((l) => !l.url.startsWith('mailto:'))
    .map((l) => `${l.platform}: ${l.url}`)
    .join(' · ');
  return [
    `# ${aboutData.name}`,
    '',
    `> ${aboutData.name} is an ${aboutData.title} at Sanofi in Toronto. ${aboutData.tagline}.`,
    '',
    aboutData.introduction,
    '',
    `Email: ${aboutData.email} · ${links}`,
    '',
  ];
}

function projectLine(p: Project): string {
  return `- [${p.title}](${BASE_URL}/projects/${p.id}): ${p.organization}, ${p.dates}. ${p.description}`;
}

/** Short index: who Calvin is and a link to every page. */
export function buildLlmsTxt(): string {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const lines = [
    ...header(),
    `The full text of every case study, the profile and blog posts is in one file: ${BASE_URL}/llms-full.txt`,
    '',
    '## Pages',
    '',
    `- [Home](${BASE_URL}/): overview and featured work`,
    `- [Profile](${BASE_URL}/profile): about, experience, education, skills and resume`,
    `- [Projects](${BASE_URL}/projects): all case studies`,
    `- [Blog](${BASE_URL}/blog): writing`,
    `- [Resume (PDF)](${BASE_URL}/resume/resume.pdf)`,
    '',
    '## Featured projects',
    '',
    ...featured.map(projectLine),
    '',
    '## Experience',
    '',
    ...experiences.map((e) => `- ${e.title}, ${e.company} (${e.dates})`),
    '',
    '## Education',
    '',
    `- ${education.degree}, ${education.field}, ${education.institution} (${education.dates})`,
    '',
    '## Optional',
    '',
    ...others.map(projectLine),
    ...getRawPosts().map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.excerpt}`),
    '',
  ];
  return lines.join('\n');
}

function projectMarkdown(p: Project): string {
  const out: string[] = [
    `## ${p.title}`,
    '',
    `URL: ${BASE_URL}/projects/${p.id}`,
    `Organization: ${p.organization}${p.courseCode ? ` (${p.courseCode})` : ''} · Dates: ${p.dates} · Category: ${p.category}`,
    `Skills: ${p.skills.join(', ')}`,
  ];
  if (p.links?.length) out.push(`Links: ${p.links.map((l) => `${l.label ?? l.type}: ${l.url}`).join(' · ')}`);
  out.push('', p.description, '');

  const c = p.extendedContent;
  if (!c) return out.join('\n');
  const section = (title: string, body: string[]) => {
    if (body.length) out.push(`### ${title}`, '', ...body, '');
  };

  section('Key numbers', (c.stats ?? []).map((s) => `- ${s.value}: ${s.label}`));
  section('Team', (c.team ?? []).map((t) => `- ${t.name}, ${t.role}`));
  for (const s of [c.overview, c.motivation]) if (s) section(s.title, [s.content]);
  section('Datasets', (c.datasets ?? []).map((d) => `- ${d.name} (${d.records}): ${d.description}`));
  if (c.methodology) section(c.methodology.title, c.methodology.steps.map((s) => `- ${s.phase}: ${s.description}`));
  section(
    'Decisions',
    (c.decisions ?? []).map((d) => `- **${d.decision}.** ${d.reasoning}${d.framework ? ` (${d.framework})` : ''}`),
  );
  section(
    'Key findings',
    (c.keyFindings ?? []).map((k) => `- **${k.stat ? `${k.stat}, ` : ''}${k.title}.** ${k.description}`),
  );
  section(
    'Features',
    [...(c.features ?? []), ...(c.visualizations ?? [])].map(
      (f) => `- **${f.title}.** ${f.description}${f.insight ? ` ${f.insight}` : ''}`,
    ),
  );
  if (c.usabilityResults) {
    section(
      c.usabilityResults.title ?? 'Usability results',
      c.usabilityResults.tasks.flatMap((t) => [
        `- ${t.task}: ${t.results.map((r) => `${r.metric} ${r.statement}`).join(' ')}`,
      ]),
    );
  }
  section('Tools', (c.tools ?? []).map((t) => `- ${t.name}: ${t.purpose}`));
  if (c.impact) section(c.impact.title, [c.impact.content]);
  if (c.limitations) section(c.limitations.title ?? 'Limitations', c.limitations.items.map((i) => `- ${i}`));
  if (c.references) section(c.references.title ?? 'References', c.references.entries.map((r) => `- ${r.citation}${r.url ? ` ${r.url}` : ''}`));
  return out.join('\n');
}

/** Everything in one document, for assistants that want the full context. */
export function buildLlmsFullTxt(): string {
  const lines = [
    ...header(),
    '# Experience',
    '',
    ...experiences.flatMap((e) => [
      `## ${e.title}, ${e.company}`,
      '',
      `${e.dates} · ${e.location}${e.type ? ` · ${e.type}` : ''}`,
      '',
      ...e.description.map((d) => `- ${d}`),
      '',
      `Skills: ${e.skills.join(', ')}`,
      '',
    ]),
    '# Education',
    '',
    `${education.degree}, ${education.field}, ${education.institution} (${education.dates})${education.gpa ? `. GPA ${education.gpa}` : ''}.`,
    '',
    ...(education.honors ?? []).map((h) => `- ${h}`),
    '',
    '# Skills',
    '',
    ...aboutData.skills.map((s) => `- ${s.category}: ${s.items.join(', ')}`),
    '',
    '# Projects',
    '',
    ...projects.map(projectMarkdown),
    '# Blog',
    '',
    ...getRawPosts().flatMap((p) => [`## ${p.title}`, '', `URL: ${BASE_URL}/blog/${p.slug} · ${p.date}`, '', p.body, '']),
  ];
  return lines.join('\n');
}
