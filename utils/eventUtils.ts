import type { PortableTextBlock } from "@portabletext/types";
import { portableTextToPlainText } from "@/lib/sanity/portableText";

interface EventLike {
    _id: string;
    title: string;
    startDateTime: string;
    location?: string;
    city?: string;
    imageUrl?: string;
    description: PortableTextBlock[];
    ticketLink?: string;
}

// Génère les données structurées pour un événement (spectacle ou stage)
export const generateEventStructuredData = (
    item: EventLike,
    options?: { basePath?: "agenda" | "stages"; fallbackDescription?: string }
) => {
    const basePath = options?.basePath ?? "agenda";
    const startDateTime = item.startDateTime;
    const endDateTime = new Date(new Date(startDateTime).getTime() + 2 * 60 * 60 * 1000).toISOString(); // +2h par défaut

    const cleanDescription = item.description?.length
        ? portableTextToPlainText(item.description)
        : options?.fallbackDescription ?? item.title;

    return {
        name: item.title,
        description: cleanDescription,
        startDate: startDateTime,
        endDate: endDateTime,
        locationName: item.city || 'Lieu à préciser',
        locationAddress: item.location || '',
        city: item.city || 'Aix-en-Provence',
        image: item.imageUrl || 'https://micim.fr/images/og-image.jpg',
        url: `https://micim.fr/${basePath}/${item._id}`,
        offers: item.ticketLink && item.ticketLink !== '#' ? {
            url: item.ticketLink
        } : undefined
    };
};
