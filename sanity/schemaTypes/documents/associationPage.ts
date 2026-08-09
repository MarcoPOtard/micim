import { defineField, defineType } from "sanity";

export const associationPage = defineType({
    name: "associationPage",
    title: "Page \"La Micim\"",
    type: "document",
    fields: [
        defineField({
            name: "body",
            title: "Contenu",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Titre", value: "h2" },
                    ],
                    lists: [],
                    marks: {
                        decorators: [
                            { title: "Gras", value: "strong" },
                            { title: "Italique", value: "em" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Lien",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                        validation: (rule) => rule.required(),
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Page "La Micim"' }),
    },
});
