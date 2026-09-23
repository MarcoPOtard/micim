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

/**
 * Formate une heure "HH:mm" pour l'affichage (ex: "08:30" -> "8h30")
 */
const formatHourMinute = (time: string): string => {
    const [hours, minutes] = time.split(":");
    return `${parseInt(hours, 10)}h${minutes}`;
};

/**
 * Génère l'affichage combiné date + créneau horaire d'un stage
 * (ex: "Samedi 17 octobre 2026, de 8h30 à 12h30")
 */
export const getStageScheduleDisplay = (
    date: string,
    startTime: string,
    endTime: string
): string =>
    `${getFullDateDisplay(date)}, de ${formatHourMinute(startTime)} à ${formatHourMinute(endTime)}`;

/**
 * Construit un horodatage ISO 8601 (avec décalage horaire) à partir d'une
 * date ("YYYY-MM-DD") et d'une heure locale Europe/Paris ("HH:mm").
 */
export const buildParisDateTimeISO = (date: string, time: string): string => {
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    // Instant approximatif servant uniquement à déterminer le décalage
    // horaire (+01:00 ou +02:00) applicable à cette date à Paris.
    const approx = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const timeZoneName = new Intl.DateTimeFormat("en-US", {
        timeZone: EVENT_TIME_ZONE,
        timeZoneName: "shortOffset",
    })
        .formatToParts(approx)
        .find((part) => part.type === "timeZoneName")?.value ?? "GMT+1";

    const offsetHours = parseInt(timeZoneName.replace("GMT", ""), 10) || 0;
    const sign = offsetHours >= 0 ? "+" : "-";
    const offset = `${sign}${String(Math.abs(offsetHours)).padStart(2, "0")}:00`;

    return `${date}T${time}:00${offset}`;
};
