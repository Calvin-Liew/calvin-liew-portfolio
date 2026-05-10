import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import BlogCard from '@/components/blog/BlogCard';
import MarkerHighlight from '@/components/ui/MarkerHighlight';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts and insights on product management, design, and technology.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Section>
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
              product, design, and technology
            </MarkerHighlight>
            . Updated whenever I have something worth saying.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
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
