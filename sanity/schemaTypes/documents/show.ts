import { defineField, defineType } from "sanity";

export const show = defineType({
    name: "show",
    title: "Spectacle",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "team",
            title: "Troupe",
            type: "string",
            options: {
                list: [
                    { title: "MICIM", value: "micim" },
                    { title: "Tipaix", value: "tipaix" },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "startDateTime",
            title: "Date et heure",
            type: "datetime",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "location",
            title: "Adresse",
            type: "string",
        }),
        defineField({
            name: "city",
            title: "Ville",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Image (page agenda et accueil)",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "poster",
            title: "Affiche (page du spectacle)",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [{ title: "Normal", value: "normal" }],
                    lists: [],
                    marks: {
                        decorators: [
                            { title: "Gras", value: "strong" },
                            { title: "Italique", value: "em" },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: "ticketLink",
            title: "Lien de billetterie",
            type: "string",
            description: "URL complète, ou laisser vide si pas encore disponible.",
        }),
    ],
    orderings: [
        {
            title: "Date (croissant)",
            name: "startDateTimeAsc",
            by: [{ field: "startDateTime", direction: "asc" }],
        },
    ],
    preview: {
        select: { title: "title", subtitle: "startDateTime", media: "image" },
        prepare: ({ title, subtitle, media }) => ({
            title,
            subtitle: subtitle
                ? new Date(subtitle).toLocaleDateString("fr-FR")
                : undefined,
            media,
        }),
    },
});
