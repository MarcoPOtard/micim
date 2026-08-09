import { defineField, defineType } from "sanity";

export const homePage = defineType({
    name: "homePage",
    title: "Page d'accueil",
    type: "document",
    fields: [
        defineField({
            name: "heroBackgroundImage",
            title: "Image de fond (hero)",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "slides",
            title: "Diapositives du slider",
            type: "array",
            of: [{ type: "slide" }],
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare: () => ({ title: "Page d'accueil" }),
    },
});
