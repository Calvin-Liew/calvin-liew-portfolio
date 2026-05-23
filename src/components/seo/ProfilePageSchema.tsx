import { Experience, Education } from '@/types';

interface ProfilePageSchemaProps {
  experiences: Experience[];
  education: Education;
}

/**
 * ProfilePage + Person schema for /profile route.
 * Includes hasOccupation for current role and alumniOf for education.
 */
export default function ProfilePageSchema({
  experiences,
  education,
}: ProfilePageSchemaProps) {
  const currentRole = experiences.find((e) => e.dates.includes('Present'));

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Calvin Liew',
    givenName: 'Calvin',
    familyName: 'Liew',
    url: 'https://calvinliew.space',
    image: 'https://calvinliew.space/opengraph-image',
    jobTitle: 'AI Workflows Product Analyst',
    description:
      'AI Workflows Product Analyst at Sanofi building AI agents, RAG pipelines, and enterprise data products.',
    email: 'mailto:calvin.liew@mail.utoronto.ca',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Sanofi',
      url: 'https://www.sanofi.com',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education.institution,
      url: 'https://www.utoronto.ca',
    },
    hasOccupation: currentRole
      ? {
          '@type': 'Occupation',
          name: currentRole.title,
          occupationLocation: {
            '@type': 'City',
            name: 'Toronto',
          },
          skills: currentRole.skills.join(', '),
        }
      : undefined,
    knowsAbout: [
      'AI Agents',
      'Agentic AI Systems',
      'Retrieval-Augmented Generation',
      'RAG',
      'LLM Orchestration',
      'Product Management',
      'Product Strategy',
      'Data Analysis',
      'UX Design',
      'Snowflake',
      'FastAPI',
      'React',
      'TypeScript',
      'Python',
      'Enterprise Data Workflows',
      'Procurement Analytics',
      'Vector Search',
      'Chroma',
      'Prompt Engineering',
    ],
    sameAs: [
      'https://www.linkedin.com/in/calvin-liew-/',
      'https://github.com/Calvin-Liew',
    ],
  };

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: person,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calvinliew.space' },
      { '@type': 'ListItem', position: 2, name: 'Profile', item: 'https://calvinliew.space/profile' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
