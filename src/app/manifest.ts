import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Calvin Liew — AI Workflows Product Analyst',
    short_name: 'Calvin Liew',
    description: 'Calvin Liew built SupRM Intelligence at Sanofi, reaching 80 unique production users and 572 conversations in its first six months.',
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
