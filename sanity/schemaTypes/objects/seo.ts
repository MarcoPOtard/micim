import { defineField, defineType } from "sanity";

export const seo = defineType({
    name: "seo",
    title: "Référencement (SEO)",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Titre (balise <title>)",
            type: "string",
            description: "Laisser vide pour utiliser le titre par défaut du site.",
        }),
        defineField({
            name: "metaDescription",
            title: "Description",
            type: "text",
            rows: 3,
            description:
                "Environ 150-160 caractères, affichée dans les résultats de recherche Google.",
        }),
        defineField({
            name: "shareImage",
            title: "Image de partage (réseaux sociaux)",
            type: "image",
            description: "Laisser vide pour utiliser l'image de partage par défaut du site.",
        }),
    ],
});
