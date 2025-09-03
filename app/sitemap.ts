import { MetadataRoute } from 'next'
import { showData } from '@/utils/dataProcessing'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const shows = await showData()
  
  const showUrls = shows.map((show) => ({
    url: `https://micim.fr/agenda/${show.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://micim.fr',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://micim.fr/agenda',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://micim.fr/troupe',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://micim.fr/association',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://micim.fr/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...showUrls
  ]
}