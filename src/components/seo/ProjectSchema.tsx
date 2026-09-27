import { Project } from '@/types';

interface ProjectSchemaProps {
  project: Project;
}

export default function ProjectSchema({ project }: ProjectSchemaProps) {
  const projectUrl = `https://calvinliew.space/projects/${project.id}`;

  // Combine tags (topic) + skills (technical) for richest keyword coverage
  const keywordList = [
    ...(project.tags ?? []),
    ...project.skills,
  ];

  const creativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: project.image ? `https://calvinliew.space${project.image}` : undefined,
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
    creator: {
      '@type': 'Person',
      name: 'Calvin Liew',
      url: 'https://calvinliew.space',
    },
    ...(project.updatedAt && { dateModified: project.updatedAt }),
    keywords: keywordList.join(', '),
    genre: project.category,
    ...(project.tags && project.tags.length > 0 && {
      about: project.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
    }),
    ...(project.organization && {
      producer: {
        '@type': 'Organization',
        name: project.organization,
      },
    }),
    ...(project.links?.find((l) => l.type === 'live') && {
      sameAs: project.links.find((l) => l.type === 'live')!.url,
    }),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://calvinliew.space',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: 'https://calvinliew.space/projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
