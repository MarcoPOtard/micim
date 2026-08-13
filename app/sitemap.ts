import { MetadataRoute } from 'next'
import { getShows, getStages } from '@/lib/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [shows, stages] = await Promise.all([getShows(), getStages()])

  // Les spectacles de la Tipaix n'ont pas de page dédiée sur le site Micim
  // (ils renvoient vers tipaix.fr), donc on ne référence que les nôtres.
  const showUrls = shows
    .filter((show) => show.team === 'micim')
    .map((show) => ({
      url: `https://micim.fr/agenda/${show._id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  const stageUrls = stages.map((stage) => ({
    url: `https://micim.fr/stages/${stage._id}`,
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
      url: 'https://micim.fr/stages',
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
    ...showUrls,
    ...stageUrls
  ]
}