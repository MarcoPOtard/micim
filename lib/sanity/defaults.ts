import type { NavigationLink, SocialLink } from "./queries";

// Utilisées tant que le singleton "Réglages du site" n'a pas encore été
// rempli dans le Studio (ou que Sanity n'est pas configuré) : le site garde
// le même menu et les mêmes réseaux sociaux qu'avant l'intégration du CMS.
export const DEFAULT_NAVIGATION_LINKS: NavigationLink[] = [
    { label: "Agenda", href: "/agenda" },
    { label: "Stages", href: "/stages" },
    { label: "La Micim", href: "/association" },
    { label: "La Tipaix", href: "https://www.tipaix.fr" },
    { label: "Contact", href: "/contact" },
];

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    { platform: "instagram", url: "https://www.instagram.com/micim_impro/" },
    {
        platform: "facebook",
        url: "https://www.facebook.com/people/MICIM/61581278897594/",
    },
    {
        platform: "youtube",
        url: "https://www.youtube.com/channel/UCnIxNBC2hsiGnN5M3Rd9ZsA",
    },
];
