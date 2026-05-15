export default function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Calvin Liew',
    url: 'https://calvinliew.space',
    image: 'https://calvinliew.space/opengraph-image',
    jobTitle: 'AI Workflows Product Analyst',
    description:
      'AI Workflows Product Analyst at Sanofi building AI agents, RAG pipelines, and enterprise data products. Specializes in agentic AI systems, product strategy, and data-driven workflows.',
    worksFor: {
      '@type': 'Organization',
      name: 'Sanofi',
      url: 'https://www.sanofi.com',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Toronto',
      url: 'https://www.utoronto.ca',
    },
    knowsAbout: [
      'AI Agents',
      'Retrieval-Augmented Generation',
      'Agentic AI Systems',
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
      'LLM Integration',
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
