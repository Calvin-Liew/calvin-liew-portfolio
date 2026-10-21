import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
      // Friendly to mainstream AI training crawlers — explicit allow so the
      // portfolio shows up in AI search surfaces (ChatGPT, Perplexity, Claude).
      {
        userAgent: [
          'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
          'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
          'PerplexityBot', 'Perplexity-User',
          'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent',
          'Amazonbot', 'DuckAssistBot', 'MistralAI-User', 'CCBot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://calvinliew.space/sitemap.xml',
  }
}
