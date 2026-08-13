import { defineField, defineType } from "sanity";

export const stagesPage = defineType({
    name: "stagesPage",
    title: "Page Stages",
    type: "document",
    fields: [
        defineField({
            name: "intro",
            title: "Texte de présentation",
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
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare: () => ({ title: "Page Stages" }),
    },
});
