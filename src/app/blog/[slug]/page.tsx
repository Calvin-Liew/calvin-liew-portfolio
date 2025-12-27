import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import Badge from '@/components/ui/Badge';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Link
          href="/blog"
          className="inline-flex items-center text-cosmic-purple hover:text-cosmic-cyan font-medium mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-secondary mb-6">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}
          </header>

          <div
            className="prose prose-lg max-w-none
                       prose-headings:text-primary prose-headings:font-bold prose-headings:tracking-tight
                       prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                       prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:border-border-light prose-h2:pb-3
                       prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-10
                       prose-p:text-secondary prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-lg
                       prose-a:text-cosmic-purple prose-a:no-underline prose-a:font-medium hover:prose-a:text-cosmic-cyan prose-a:transition-colors
                       prose-strong:text-primary prose-strong:font-semibold
                       prose-ul:my-8 prose-ul:space-y-3
                       prose-ol:my-8 prose-ol:space-y-3
                       prose-li:text-secondary prose-li:leading-[1.8] prose-li:text-lg
                       prose-code:text-cosmic-purple prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                       prose-pre:bg-surface prose-pre:border prose-pre:border-border-light prose-pre:my-8
                       prose-blockquote:border-l-cosmic-purple prose-blockquote:bg-surface prose-blockquote:italic prose-blockquote:my-8
                       prose-hr:border-border-light prose-hr:my-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Container>
    </Section>
  );
}
