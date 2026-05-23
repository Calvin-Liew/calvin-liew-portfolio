import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { getAllPosts } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://calvinliew.space'
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic project pages — featured projects get higher priority
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: project.featured ? 0.9 : 0.75,
  }))

  // Dynamic blog posts
  const posts = await getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Hosted papers (static HTML under /public/papers)
  const paperPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/papers/rag-organizational-memory.html`,
      lastModified: new Date('2026-04-06'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  return [...staticPages, ...projectPages, ...blogPages, ...paperPages]
}
