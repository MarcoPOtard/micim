// Les événements de la MICIM ont toujours lieu à Aix-en-Provence : on
// formate systématiquement dans ce fuseau, quel que soit le fuseau du
// serveur qui exécute le rendu.
const EVENT_TIME_ZONE = "Europe/Paris";

const capitalize = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Génère l'affichage complet de la date (ex: "Samedi 04 octobre 2025")
 */
export const getFullDateDisplay = (isoDateTime: string): string => {
    const date = new Date(isoDateTime);
    const formatted = new Intl.DateTimeFormat("fr-FR", {
        timeZone: EVENT_TIME_ZONE,
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);

    return capitalize(formatted);
};

/**
 * Génère l'affichage court de la date (ex: "Samedi 15 novembre")
 */
export const getShortDateDisplay = (isoDateTime: string): string => {
    const date = new Date(isoDateTime);
    const formatted = new Intl.DateTimeFormat("fr-FR", {
        timeZone: EVENT_TIME_ZONE,
        weekday: "long",
        day: "numeric",
        month: "long",
    }).format(date);

    return capitalize(formatted);
};

/**
 * Génère l'affichage de l'heure (ex: "20h00")
 */
export const getTimeDisplay = (isoDateTime: string): string => {
    const date = new Date(isoDateTime);
    const formatted = new Intl.DateTimeFormat("fr-FR", {
        timeZone: EVENT_TIME_ZONE,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);

    return formatted.replace(":", "h");
};
