import { Show } from "@/datas/IShowsData";

// Jours de la semaine en français
const DAYS_FR = [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
];

// Mois en français
const MONTHS_FR = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
];

/**
 * Parse une date au format DD/MM/YYYY vers un objet Date
 */
export const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // month - 1 car les mois commencent à 0
};

/**
 * Génère une date ISO 8601 à partir de la date et de l'heure d'un spectacle
 */
export const getISODate = (show: Show): string => {
    const date = parseDate(show.date);
    
    // Parser l'heure (format "20h00" -> "20:00")
    const timeMatch = show.startingHour.match(/(\d{1,2})h(\d{2})/);
    if (timeMatch) {
        const [, hours, minutes] = timeMatch;
        date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }
    
    return date.toISOString();
};

/**
 * Génère l'affichage complet de la date (ex: "Samedi 04 octobre 2025")
 */
export const getFullDateDisplay = (dateString: string): string => {
    const date = parseDate(dateString);
    const dayName = DAYS_FR[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const monthName = MONTHS_FR[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} ${monthName} ${year}`;
};

/**
 * Génère l'affichage court de la date (ex: "Samedi 15 novembre")
 */
export const getShortDateDisplay = (dateString: string): string => {
    const date = parseDate(dateString);
    const dayName = DAYS_FR[date.getDay()];
    const day = date.getDate();
    const monthName = MONTHS_FR[date.getMonth()];
    
    return `${dayName} ${day} ${monthName}`;
};

/**
 * Vérifie si un spectacle est dans le futur
 */
export const isShowInFuture = (show: Show): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const showDate = parseDate(show.date);
    showDate.setHours(0, 0, 0, 0);
    
    return showDate >= today;
};

/**
 * Compare deux spectacles par date pour le tri
 */
export const compareShowsByDate = (a: Show, b: Show): number => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    
    // Ajouter l'heure pour un tri plus précis
    const timeMatchA = a.startingHour.match(/(\d{1,2})h(\d{2})/);
    const timeMatchB = b.startingHour.match(/(\d{1,2})h(\d{2})/);
    
    if (timeMatchA) {
        const [, hours, minutes] = timeMatchA;
        dateA.setHours(parseInt(hours), parseInt(minutes));
    }
    
    if (timeMatchB) {
        const [, hours, minutes] = timeMatchB;
        dateB.setHours(parseInt(hours), parseInt(minutes));
    }
    
    return dateA.getTime() - dateB.getTime();
};