import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Calvin Liew — AI Workflows Product Analyst',
    short_name: 'Calvin Liew',
    description: 'AI Workflows Product Analyst at Sanofi building AI agents, RAG pipelines, and enterprise data products.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F4EE',
    theme_color: '#C2410C',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
