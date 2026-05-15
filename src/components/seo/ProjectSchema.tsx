import { Project } from '@/types';

interface ProjectSchemaProps {
  project: Project;
}

export default function ProjectSchema({ project }: ProjectSchemaProps) {
  const projectUrl = `https://calvinliew.space/projects/${project.id}`;

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
    },
    dateCreated: project.dates.split(/[-–—]/)[0].trim(),
    dateModified: project.dates.split(/[-–—]/).pop()?.trim() ?? project.dates,
    keywords: project.skills.join(', '),
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
