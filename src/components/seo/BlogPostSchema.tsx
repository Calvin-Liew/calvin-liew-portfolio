import { BlogPost } from '@/types';

interface BlogPostSchemaProps {
  post: BlogPost;
}

export default function BlogPostSchema({ post }: BlogPostSchemaProps) {
  const postUrl = `https://calvinliew.space/blog/${post.slug}`;
  const ogImage = 'https://calvinliew.space/opengraph-image';

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Person',
      name: 'Calvin Liew',
      url: 'https://calvinliew.space',
      jobTitle: 'AI Workflows Product Analyst',
      sameAs: [
        'https://www.linkedin.com/in/calvin-liew-/',
        'https://github.com/Calvin-Liew',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Calvin Liew',
      url: 'https://calvinliew.space',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    ...(post.tags && post.tags.length > 0 && {
      keywords: post.tags.join(', '),
      about: post.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
    }),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calvinliew.space' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://calvinliew.space/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
