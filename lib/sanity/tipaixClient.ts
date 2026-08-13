import { createClient } from "next-sanity";

// Projet Sanity de la Tipaix, dont on ne fait que lire les spectacles pour
// les afficher dans l'agenda de la Micim. Le dataset est public en lecture,
// donc aucun token n'est nécessaire.
const projectId =
    process.env.NEXT_PUBLIC_TIPAIX_SANITY_PROJECT_ID || "r40iuo36";
const dataset = process.env.NEXT_PUBLIC_TIPAIX_SANITY_DATASET || "production";
const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-09";

export const tipaixClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
});
