'use client'

interface StructuredDataProps {
  type: 'organization' | 'event' | 'webpage'
  data: Record<string, unknown>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    }

    switch (type) {
      case 'organization':
        return {
          ...baseData,
          '@type': 'TheaterGroup',
          name: 'MICIM',
          alternateName: 'La Malicieuse et Intenable Compagnie d\'Impro Musicale',
          description: 'Troupe de comédie musicale improvisée basée à Aix-en-Provence',
          url: 'https://micim.fr',
          logo: 'https://micim.fr/logo/logo-MICIM.png',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Aix-en-Provence',
            addressCountry: 'FR'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'micim@micim.fr',
            contactType: 'general'
          },
          sameAs: [
            // Ajoutez ici vos réseaux sociaux si vous en avez
          ]
        }
      
      case 'event':
        return {
          ...baseData,
          '@type': 'TheaterEvent',
          ...data
        }

      case 'webpage':
        return {
          ...baseData,
          '@type': 'WebPage',
          ...data
        }

      default:
        return baseData
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}