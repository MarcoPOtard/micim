import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-09";

// Tant que le projet Sanity n'est pas configuré (variables d'environnement
// absentes), le site continue de fonctionner avec les valeurs par défaut de
// chaque page plutôt que de planter au build ou au runtime.
export const hasSanityConfig = Boolean(projectId);

export const client = createClient({
    projectId: projectId || "not-configured",
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
});
