import { defineField, defineType } from "sanity";

export const slide = defineType({
    name: "slide",
    title: "Diapositive",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "subtitle",
            title: "Sous-titre",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "ctaText",
            title: "Texte du bouton",
            type: "string",
        }),
        defineField({
            name: "ctaLink",
            title: "Lien du bouton",
            type: "string",
            description: "Lien interne (/agenda) ou externe (https://...).",
        }),
    ],
    preview: {
        select: { title: "title", subtitle: "subtitle" },
    },
});
