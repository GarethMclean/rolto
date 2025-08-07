import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rolto.io'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  // Blog posts - simplified to avoid contentlayer issues
  const blogPosts = [
    {
      url: `${baseUrl}/blog/chatbot-lead-generation-stats`,
      lastModified: new Date('2025-07-08'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog/chatbots-increase-conversions`,
      lastModified: new Date('2025-08-05'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  return [...staticPages, ...blogPosts]
} 