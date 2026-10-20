// Packs blog posts into a JSON file the "ask me" API route can import.
// Runs before `next dev` and `next build` so the serverless function never reads the filesystem.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const blogDir = path.join(root, 'src/content/blog');
const outFile = path.join(root, 'src/lib/ama/blog.generated.json');

const posts = fs.existsSync(blogDir)
  ? fs
      .readdirSync(blogDir)
      .filter((name) => /\.mdx?$/.test(name))
      .map((name) => {
        const { data, content } = matter(fs.readFileSync(path.join(blogDir, name), 'utf8'));
        return {
          slug: name.replace(/\.mdx?$/, ''),
          title: String(data.title ?? ''),
          date: String(data.date ?? ''),
          content: content.trim(),
        };
      })
      .filter((post) => post.title && !/coming soon/i.test(post.title))
  : [];

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(posts, null, 2) + '\n');
console.log(`ama corpus: ${posts.length} blog posts -> ${path.relative(root, outFile)}`);
