import type { Show } from "@/lib/sanity/queries";
import { portableTextToPlainText } from "@/lib/sanity/portableText";

// Génère les données structurées pour un événement spectacle
export const generateEventStructuredData = (show: Show) => {
    const startDateTime = show.startDateTime;
    const endDateTime = new Date(new Date(startDateTime).getTime() + 2 * 60 * 60 * 1000).toISOString(); // +2h par défaut

    const cleanDescription = show.description?.length
        ? portableTextToPlainText(show.description)
        : `Spectacle de comédie musicale improvisée : ${show.title}`;

    return {
        name: show.title,
        description: cleanDescription,
        startDate: startDateTime,
        endDate: endDateTime,
        locationName: show.city || 'Lieu à préciser',
        locationAddress: show.location || '',
        city: show.city || 'Aix-en-Provence',
        image: show.imageUrl || 'https://micim.fr/images/og-image.jpg',
        url: `https://micim.fr/agenda/${show._id}`,
        offers: show.ticketLink && show.ticketLink !== '#' ? {
            url: show.ticketLink
        } : undefined
    };
};
