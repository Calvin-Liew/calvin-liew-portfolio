export default function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calvin Liew — AI Workflows Product Analyst',
    url: 'https://calvinliew.space',
    description:
      'Portfolio of Calvin Liew, AI Workflows Product Analyst at Sanofi. AI agents, RAG pipelines, product design, and data analysis.',
    author: {
      '@type': 'Person',
      name: 'Calvin Liew',
      url: 'https://calvinliew.space',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://calvinliew.space/projects',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
