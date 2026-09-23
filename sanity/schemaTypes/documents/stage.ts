import { defineField, defineType } from "sanity";

export const stage = defineType({
    name: "stage",
    title: "Stage",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titre",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "URL du stage",
            description:
                "Utilisée dans l'adresse de la page du stage (ex. /stages/mon-titre). Générée à partir du titre via le bouton \"Generate\", puis modifiable.",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
                slugify: (input: string) =>
                    input
                        .normalize("NFD")
                        .replace(/[̀-ͯ]/g, "")
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "")
                        .slice(0, 96),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "date",
            options: { dateFormat: "DD/MM/YYYY" },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "startTime",
            title: "Heure de début",
            description: "Format 24h, ex. 08:30",
            type: "string",
            validation: (rule) =>
                rule
                    .required()
                    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "heure (HH:mm)" }),
        }),
        defineField({
            name: "endTime",
            title: "Heure de fin",
            description: "Format 24h, ex. 12:30",
            type: "string",
            validation: (rule) =>
                rule
                    .required()
                    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "heure (HH:mm)" }),
        }),
        defineField({
            name: "image",
            title: "Image (page stages et page du stage)",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required(),
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
            title: "Lien d'inscription",
            type: "string",
            description: "URL complète, ou laisser vide si pas encore disponible.",
        }),
    ],
    orderings: [
        {
            title: "Date (croissant)",
            name: "startDateTimeAsc",
            by: [
                { field: "date", direction: "asc" },
                { field: "startTime", direction: "asc" },
            ],
        },
    ],
    preview: {
        select: { title: "title", date: "date", startTime: "startTime", media: "image" },
        prepare: ({ title, date, startTime, media }) => ({
            title,
            subtitle: date
                ? [new Date(date).toLocaleDateString("fr-FR"), startTime]
                      .filter(Boolean)
                      .join(" ")
                : undefined,
            media,
        }),
    },
});
