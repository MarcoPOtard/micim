"use client";

import { useSyncExternalStore } from "react";
import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

const emptySubscribe = () => () => {};

// Sanity Studio ne doit jamais être rendu côté serveur : Turbopack ne
// supporte pas encore l'équivalent `next/dynamic(..., { ssr: false })` que
// `next-sanity` utilise en interne (limitation documentée dans son propre
// code source), ce qui casse le rendu serveur avec une erreur de hook
// React. `useSyncExternalStore` permet de savoir si on est bien monté côté
// client sans déclencher de setState dans un effet.
function useIsClient() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

export default function StudioPage() {
    const isClient = useIsClient();

    if (!isClient) {
        return null;
    }

    return <NextStudio config={config} />;
}
