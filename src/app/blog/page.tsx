import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import BlogClient from '@/components/blog/BlogClient';
import CollectionSchema from '@/components/seo/CollectionSchema';
import MarkerHighlight from '@/components/ui/MarkerHighlight';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notes on agentic AI, RAG pipelines, product strategy, and enterprise data from Calvin Liew — AI Workflows Product Analyst at Sanofi.',
  keywords: ['AI', 'RAG', 'AI Agents', 'LLM', 'Product Strategy', 'Knowledge Management', 'Enterprise AI', 'Calvin Liew blog'],
  alternates: {
    canonical: 'https://calvinliew.space/blog',
  },
  openGraph: {
    type: 'website',
    title: 'Blog — Calvin Liew',
    description: 'Notes on agentic AI, product strategy, and enterprise data.',
    url: 'https://calvinliew.space/blog',
    siteName: 'Calvin Liew Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Calvin Liew',
    description: 'Notes on agentic AI, product strategy, and enterprise data.',
    creator: '@calvinliew',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Section>
      <CollectionSchema
        pageName="Blog"
        pageUrl="https://calvinliew.space/blog"
        description="Notes on agentic AI, RAG pipelines, product strategy, and enterprise data from Calvin Liew."
        itemType="BlogPosting"
        items={posts.map((p) => ({
          name: p.title,
          url: `https://calvinliew.space/blog/${p.slug}`,
          description: p.excerpt,
          datePublished: p.date,
        }))}
      />
      <Container>
        <div className="mb-12 max-w-4xl">
          <p
            className="text-2xl text-terracotta mb-2 inline-block"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-3deg)',
            }}
          >
            recent thoughts &mdash;
          </p>
          <h1 className="font-display italic text-5xl sm:text-6xl text-ink mb-5 leading-[1.05]">
            <span className="inline-flex items-baseline gap-3 flex-wrap">
              <span>
                Blog<span className="text-terracotta not-italic">.</span>
              </span>
              <span
                className="text-terracotta text-2xl inline-block not-italic font-normal"
                style={{
                  fontFamily: 'var(--font-kalam), cursive',
                  transform: 'rotate(-2deg)',
                }}
              >
                (thinking out loud)
              </span>
            </span>
          </h1>
          <p className="text-lg text-ink-soft max-w-3xl">
            Notes on{' '}
            <MarkerHighlight className="font-medium text-ink">
              AI, product, and strategy
            </MarkerHighlight>
            . Updated whenever I have something worth saying.
          </p>
        </div>

        {posts.length > 0 ? (
          <BlogClient posts={posts} />
        ) : (
          <div className="text-center py-20">
            <p
              className="text-3xl text-ink-soft mb-3 inline-block"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-2deg)',
              }}
            >
              nothing here yet
            </p>
            <p className="text-base text-muted max-w-md mx-auto">
              Posts on product, design, and AI coming soon. Check back, or
              follow along on{' '}
              <a
                href="https://www.linkedin.com/in/calvin-liew-/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta hover:text-terracotta-deep underline underline-offset-4"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
