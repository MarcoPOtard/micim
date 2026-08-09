import { defineField, defineType } from "sanity";

export const contactPage = defineType({
    name: "contactPage",
    title: "Page Contact",
    type: "document",
    fields: [
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare: () => ({ title: "Page Contact" }),
    },
});
