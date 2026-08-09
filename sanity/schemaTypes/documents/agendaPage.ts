import { defineField, defineType } from "sanity";

export const agendaPage = defineType({
    name: "agendaPage",
    title: "Page Agenda",
    type: "document",
    fields: [
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        prepare: () => ({ title: "Page Agenda" }),
    },
});
