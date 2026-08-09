import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure, SINGLETON_TYPES } from "./sanity/structure";

export default defineConfig({
    name: "default",
    title: "MICIM",

    projectId,
    dataset,
    basePath: "/studio",

    schema,

    plugins: [
        structureTool({ structure }),
        visionTool({ defaultApiVersion: apiVersion }),
    ],

    document: {
        // Empêche la création d'un second exemplaire d'un document singleton
        // depuis le menu global "Créer".
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === "global") {
                return prev.filter(
                    (template) => !SINGLETON_TYPES.has(template.templateId)
                );
            }
            return prev;
        },
        // Retire les actions "dupliquer" / "dépublier" / "supprimer" sur les
        // singletons : un seul exemplaire doit toujours exister.
        actions: (prev, { schemaType }) => {
            if (!SINGLETON_TYPES.has(schemaType)) {
                return prev;
            }
            return prev.filter(
                (action) =>
                    !["unpublish", "duplicate", "delete"].includes(
                        action.action ?? ""
                    )
            );
        },
    },
});
