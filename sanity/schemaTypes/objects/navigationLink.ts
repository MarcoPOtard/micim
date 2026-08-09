import { defineField, defineType } from "sanity";

export const navigationLink = defineType({
    name: "navigationLink",
    title: "Lien de menu",
    type: "object",
    fields: [
        defineField({
            name: "label",
            title: "Libellé",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "href",
            title: "Lien",
            type: "string",
            description: "Lien interne (/agenda) ou externe (https://...).",
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: "label", subtitle: "href" },
    },
});
