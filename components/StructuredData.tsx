'use client'

interface EventData {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  locationName?: string;
  locationAddress?: string;
  city?: string;
  image?: string;
  url?: string;
  offers?: {
    url: string;
  };
}

interface StructuredDataProps {
  type: 'organization' | 'event' | 'webpage'
  data: Record<string, unknown> | EventData
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
        const eventData = data as EventData;
        return {
          ...baseData,
          '@type': 'TheaterEvent',
          name: eventData.name,
          description: eventData.description,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: eventData.locationName,
            address: {
              '@type': 'PostalAddress',
              streetAddress: eventData.locationAddress,
              addressLocality: eventData.city,
              addressCountry: 'FR'
            }
          },
          organizer: {
            '@type': 'TheaterGroup',
            name: 'MICIM',
            url: 'https://micim.fr'
          },
          performer: {
            '@type': 'TheaterGroup',
            name: 'MICIM',
            url: 'https://micim.fr'
          },
          image: eventData.image,
          url: eventData.url,
          offers: eventData.offers ? {
            '@type': 'Offer',
            url: eventData.offers.url,
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString()
          } : undefined
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