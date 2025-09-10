import { Show } from "@/datas/IShowsData";
import { getISODate } from "@/utils/dateUtils";

// Génère les données structurées pour un événement spectacle
export const generateEventStructuredData = (show: Show) => {
    const startDateTime = getISODate(show);
    const endDateTime = new Date(new Date(startDateTime).getTime() + 2 * 60 * 60 * 1000).toISOString(); // +2h par défaut
    
    const cleanDescription = show.description 
        ? show.description.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
        : `Spectacle de comédie musicale improvisée : ${show.title}`;

    return {
        name: show.title,
        description: cleanDescription,
        startDate: startDateTime,
        endDate: endDateTime,
        locationName: show.city || 'Lieu à préciser',
        locationAddress: show.location || '',
        city: show.city || 'Aix-en-Provence',
        image: show.image ? `https://micim.fr${show.image}` : 'https://micim.fr/images/og-image.jpg',
        url: `https://micim.fr/agenda/${show.id}`,
        offers: show.link && show.link !== '#' ? {
            url: show.link
        } : undefined
    };
};