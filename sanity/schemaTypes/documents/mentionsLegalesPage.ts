import { defineField, defineType } from "sanity";

export const mentionsLegalesPage = defineType({
    name: "mentionsLegalesPage",
    title: "Page Mentions légales",
    type: "document",
    fields: [
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare: () => ({ title: "Page Mentions légales" }),
    },
});
