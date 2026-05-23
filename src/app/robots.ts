import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },
      // Friendly to mainstream AI training crawlers — explicit allow so the
      // portfolio shows up in AI search surfaces (ChatGPT, Perplexity, Claude).
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'CCBot'],
        allow: '/',
      },
    ],
    sitemap: 'https://calvinliew.space/sitemap.xml',
    host: 'https://calvinliew.space',
  }
}
