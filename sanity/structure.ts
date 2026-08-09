import type { StructureResolver } from "sanity/structure";

// Ces types n'existent qu'en un seul exemplaire : le document a un _id fixe
// (identique au nom du type) et n'apparaît pas dans le menu "Créer".
export const SINGLETON_TYPES = new Set([
    "siteSettings",
    "homePage",
    "associationPage",
    "agendaPage",
    "contactPage",
    "mentionsLegalesPage",
]);

const singletonListItem = (
    S: Parameters<StructureResolver>[0],
    typeName: string,
    title: string
) =>
    S.listItem()
        .title(title)
        .id(typeName)
        .child(S.document().schemaType(typeName).documentId(typeName));

export const structure: StructureResolver = (S) =>
    S.list()
        .title("Contenu du site")
        .items([
            singletonListItem(S, "siteSettings", "Réglages du site"),
            S.divider(),
            singletonListItem(S, "homePage", "Page d'accueil"),
            singletonListItem(S, "associationPage", 'Page "La Micim"'),
            singletonListItem(S, "agendaPage", "Page Agenda"),
            singletonListItem(S, "contactPage", "Page Contact"),
            singletonListItem(S, "mentionsLegalesPage", "Page Mentions légales"),
            S.divider(),
            S.listItem()
                .title("Spectacles")
                .id("show")
                .child(
                    S.documentTypeList("show")
                        .title("Spectacles")
                        .defaultOrdering([
                            { field: "startDateTime", direction: "asc" },
                        ])
                ),
        ]);
