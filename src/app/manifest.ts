import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Calvin Liew Portfolio',
    short_name: 'Calvin Liew',
    description: 'Product Analyst & Designer specializing in UX, data visualization, and AI-powered solutions',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
