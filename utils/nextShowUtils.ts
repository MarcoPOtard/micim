import { Show } from "@/datas/IShowsData";

// Parse une date au format "04/10/2025" vers un objet Date
const parseShortDate = (shortDate: string): Date => {
    const [day, month, year] = shortDate.split('/').map(Number);
    return new Date(year, month - 1, day); // month - 1 car les mois commencent à 0
};

// Récupère le prochain spectacle basé sur la date actuelle
export const getNextShow = (shows: Show[]): Show | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset l'heure pour comparer uniquement les dates
    
    // Filtrer les spectacles futurs et les trier par date
    const futureShows = shows
        .filter(show => {
            const showDate = parseShortDate(show.shortDate);
            return showDate >= today;
        })
        .sort((a, b) => {
            const dateA = parseShortDate(a.shortDate);
            const dateB = parseShortDate(b.shortDate);
            return dateA.getTime() - dateB.getTime();
        });
    
    return futureShows.length > 0 ? futureShows[0] : null;
};

// Génère les données du slider avec le prochain spectacle
export const generateSliderDataWithNextShow = (shows: Show[]) => {
    const nextShow = getNextShow(shows);
    
    // Slider statique de base (sans le prochain spectacle codé en dur)
    const baseSliders = [
        {
            "title": "Bienvenue chez la MICIM",
            "subtitle": "Qui sommes-nous ?",
            "description": "La Micim est une troupe de Comédie Musicale Improvisée. Nous vous inventons, vous jouons, vous interpretons des comédies musicales pour votre plus grand plaisir.",
            "ctaText": "Plus d'informations",
            "ctaLink": "/troupe"
        },
        {
            "title": "La TIPAIX",
            "subtitle": "Section théâtre d'impro",
            "description": "La Tipaix est la troupe de théâtre d'improvisation de l'association. Il y a des cours et des spectacles. Pour en savoir plus, allez donc faire un petit tour sur leur site internet ;)",
            "ctaText": "Plus d'informations",
            "ctaLink": "https://www.tipaix.com"
        }
    ];
    
    // Si on a un prochain spectacle, l'insérer en 2ème position
    if (nextShow) {
        const nextShowSlider = {
            "title": "Le prochain spectacle",
            "subtitle": nextShow.title,
            "description": `${nextShow.date} à ${nextShow.startingHour} <br />${nextShow.description}`,
            "ctaText": "Plus d'informations",
            "ctaLink": `/agenda/${nextShow.id}`
        };
        
        // Insérer le prochain spectacle en 2ème position
        baseSliders.splice(1, 0, nextShowSlider);
    }
    
    return {
        sliders: baseSliders
    };
};