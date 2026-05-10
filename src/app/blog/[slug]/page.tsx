import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import ReadingProgress from '@/components/blog/ReadingProgress';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(input: string) {
  return new Date(input)
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLowerCase();
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section>
      <ReadingProgress />
      <Container>
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-base text-terracotta hover:text-terracotta-deep hover:-translate-x-1 transition-all duration-200 mb-10"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            &larr; back to blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-ink mb-6 leading-[1.05]">
              {post.title}
              <span className="text-terracotta not-italic">.</span>
            </h1>

            {/* Meta line */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-6">
              <time
                className="text-base text-terracotta inline-block"
                style={{
                  fontFamily: 'var(--font-kalam), cursive',
                  transform: 'rotate(-1.5deg)',
                }}
                dateTime={post.date}
              >
                {formatDate(post.date)}
              </time>
              {post.readTime && (
                <span
                  className="text-base text-terracotta inline-block"
                  style={{
                    fontFamily: 'var(--font-kalam), cursive',
                    transform: 'rotate(-1deg)',
                  }}
                >
                  {post.readTime}
                </span>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}
          </header>

          {/* Hand-drawn divider before body */}
          <div className="mb-10" aria-hidden>
            <svg
              viewBox="0 0 800 8"
              preserveAspectRatio="none"
              className="w-full h-2"
              fill="none"
            >
              <path
                d="M 4 4 Q 200 1, 400 4 T 796 3"
                stroke="var(--border-strong)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Prose body */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-ink prose-headings:tracking-tight prose-headings:font-semibold
              prose-h2:italic prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-ink-soft prose-p:leading-[1.75] prose-p:mb-7 prose-p:text-lg
              prose-a:text-terracotta prose-a:no-underline prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:underline hover:prose-a:text-terracotta-deep prose-a:transition-colors
              prose-strong:text-ink prose-strong:font-semibold
              prose-em:text-ink-soft
              prose-ul:my-7 prose-ul:space-y-2 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-7 prose-ol:space-y-2 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-ink-soft prose-li:leading-[1.75] prose-li:text-lg prose-li:marker:text-terracotta
              prose-code:text-ink prose-code:bg-paper-deeper prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-base prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-paper-deeper prose-pre:border prose-pre:border-border prose-pre:my-7 prose-pre:rounded-lg
              prose-blockquote:border-l-4 prose-blockquote:border-l-terracotta prose-blockquote:bg-terracotta-wash/40 prose-blockquote:not-italic prose-blockquote:text-ink prose-blockquote:font-display prose-blockquote:font-normal prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:my-7 prose-blockquote:rounded-r-lg
              prose-hr:border-border prose-hr:my-10
              prose-img:rounded-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Container>
    </Section>
  );
}
