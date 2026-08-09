import { defineField, defineType } from "sanity";

export const socialLink = defineType({
    name: "socialLink",
    title: "Réseau social",
    type: "object",
    fields: [
        defineField({
            name: "platform",
            title: "Plateforme",
            type: "string",
            options: {
                list: [
                    { title: "Instagram", value: "instagram" },
                    { title: "Facebook", value: "facebook" },
                    { title: "YouTube", value: "youtube" },
                    { title: "Autre", value: "other" },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "url",
            title: "URL",
            type: "url",
            validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
        }),
    ],
    preview: {
        select: { title: "platform", subtitle: "url" },
    },
});
