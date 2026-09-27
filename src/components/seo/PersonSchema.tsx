export default function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Calvin Liew',
    givenName: 'Calvin',
    familyName: 'Liew',
    url: 'https://calvinliew.space',
    image: 'https://calvinliew.space/opengraph-image',
    jobTitle: 'AI Workflows Product Analyst',
    description:
      'AI Workflows Product Analyst at Sanofi who built SupRM Intelligence, reaching 80 unique production users and 572 conversations in its first six months.',
    email: 'mailto:calvin.liew@mail.utoronto.ca',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    nationality: {
      '@type': 'Country',
      name: 'Canada',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Sanofi',
      url: 'https://www.sanofi.com',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Toronto',
      url: 'https://www.utoronto.ca',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI Workflows Product Analyst',
      occupationLocation: { '@type': 'City', name: 'Toronto' },
      skills:
        'AI Agent Development, LLM Orchestration, Snowflake, API Integration, Product Management',
    },
    knowsAbout: [
      'AI Agents',
      'Agentic AI Systems',
      'Retrieval-Augmented Generation',
      'RAG',
      'LLM Orchestration',
      'Prompt Engineering',
      'Vector Search',
      'Chroma',
      'Product Management',
      'Product Strategy',
      'Data Analysis',
      'UX Design',
      'Design Systems',
      'Snowflake',
      'FastAPI',
      'React',
      'TypeScript',
      'Python',
      'Enterprise Data Workflows',
      'Procurement Analytics',
      'Supplier Risk Management',
    ],
    sameAs: [
      'https://www.linkedin.com/in/calvin-liew-/',
      'https://github.com/Calvin-Liew',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
