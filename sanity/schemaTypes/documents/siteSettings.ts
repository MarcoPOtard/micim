import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Réglages du site",
    type: "document",
    fields: [
        defineField({
            name: "siteTitle",
            title: "Nom du site",
            type: "string",
            initialValue: "MICIM",
        }),
        defineField({
            name: "titleTemplate",
            title: "Modèle de titre",
            type: "string",
            description:
                'Utiliser %s pour représenter le titre de chaque page, ex : "%s | MICIM".',
            initialValue: "%s | MICIM",
        }),
        defineField({
            name: "defaultDescription",
            title: "Description par défaut",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "defaultKeywords",
            title: "Mots-clés par défaut",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" },
        }),
        defineField({
            name: "defaultShareImage",
            title: "Image de partage par défaut",
            type: "image",
        }),
        defineField({
            name: "navigationLinks",
            title: "Menu de navigation",
            type: "array",
            of: [{ type: "navigationLink" }],
        }),
        defineField({
            name: "socialLinks",
            title: "Réseaux sociaux",
            type: "array",
            of: [{ type: "socialLink" }],
        }),
    ],
    preview: {
        prepare: () => ({ title: "Réglages du site" }),
    },
});
