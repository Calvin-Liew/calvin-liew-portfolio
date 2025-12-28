export default function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Calvin Liew',
    url: 'https://calvinliew.space',
    jobTitle: 'Product Analyst & Designer',
    description: 'Product Analyst and Designer specializing in UX, data visualization, and AI-powered solutions',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Toronto',
    },
    sameAs: [
      'https://www.linkedin.com/in/calvin-liew',
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
