import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts and insights on product management, design, and technology.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Blog
          </h1>
          <p className="text-lg text-secondary max-w-3xl">
            Thoughts and insights on product management, design, technology, and the intersection of all three.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-secondary">
              Blog posts coming soon! Check back later for insights on product management, design, and technology.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
