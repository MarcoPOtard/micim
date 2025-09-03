import { Show } from "@/datas/IShowsData";

// Convertit une date courte (DD/MM/YYYY) et une heure (HH:MM) en date ISO
export const createEventDateTime = (shortDate: string, startingHour: string): string => {
    const [day, month, year] = shortDate.split('/').map(Number);
    const [hour, minute] = startingHour.replace('h', ':').split(':').map(Number);
    
    const date = new Date(year, month - 1, day, hour, minute || 0);
    return date.toISOString();
};

// Génère les données structurées pour un événement spectacle
export const generateEventStructuredData = (show: Show) => {
    const startDateTime = createEventDateTime(show.shortDate, show.startingHour);
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