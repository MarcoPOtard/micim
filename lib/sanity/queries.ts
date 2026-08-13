import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { client, hasSanityConfig } from "./client";
import { getTipaixShows } from "./tipaix";

// Même cadence de revalidation que le reste du site avant l'intégration
// Sanity (`export const revalidate = 21600` sur les pages accueil/agenda).
const REVALIDATE_SECONDS = 21600;

const seoProjection = `seo{
    metaTitle,
    metaDescription,
    "shareImageUrl": shareImage.asset->url
}`;

export interface Seo {
    metaTitle?: string;
    metaDescription?: string;
    shareImageUrl?: string;
}

export interface NavigationLink {
    label: string;
    href: string;
}

export interface SocialLink {
    platform: "instagram" | "facebook" | "youtube" | "other";
    url: string;
}

export interface SiteSettings {
    siteTitle?: string;
    titleTemplate?: string;
    defaultDescription?: string;
    defaultKeywords?: string[];
    defaultShareImageUrl?: string;
    navigationLinks: NavigationLink[];
    socialLinks: SocialLink[];
}

export interface Slide {
    title: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
}

export interface HomePage {
    heroBackgroundImage?: SanityImageSource;
    slides: Slide[];
    seo?: Seo;
}

export interface AssociationPage {
    body: PortableTextBlock[];
    seo?: Seo;
}

export interface SimplePage {
    seo?: Seo;
}

export interface Show {
    _id: string;
    title: string;
    team: "micim" | "tipaix";
    startDateTime: string;
    location?: string;
    city?: string;
    imageUrl?: string;
    imageWidth?: number;
    imageHeight?: number;
    posterUrl?: string;
    posterWidth?: number;
    posterHeight?: number;
    description: PortableTextBlock[];
    ticketLink?: string;
}

const showProjection = `{
    _id,
    title,
    team,
    startDateTime,
    location,
    city,
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    "posterUrl": poster.asset->url,
    "posterWidth": poster.asset->metadata.dimensions.width,
    "posterHeight": poster.asset->metadata.dimensions.height,
    description,
    ticketLink
}`;

async function safeFetch<T>(
    query: string,
    params: Record<string, unknown>,
    tags: string[]
): Promise<T | null> {
    if (!hasSanityConfig) return null;

    try {
        return await client.fetch<T>(query, params, {
            next: { revalidate: REVALIDATE_SECONDS, tags },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Sanity fetch failed for tags [${tags.join(", ")}]: ${message}`);
        return null;
    }
}

export function getSiteSettings() {
    return safeFetch<SiteSettings>(
        groq`*[_id == "siteSettings"][0]{
            siteTitle,
            titleTemplate,
            defaultDescription,
            defaultKeywords,
            "defaultShareImageUrl": defaultShareImage.asset->url,
            navigationLinks[]{label, href},
            socialLinks[]{platform, url}
        }`,
        {},
        ["siteSettings"]
    );
}

export function getHomePage() {
    return safeFetch<HomePage>(
        groq`*[_id == "homePage"][0]{
            heroBackgroundImage,
            slides[]{title, subtitle, description, ctaText, ctaLink},
            ${seoProjection}
        }`,
        {},
        ["homePage"]
    );
}

export function getAssociationPage() {
    return safeFetch<AssociationPage>(
        groq`*[_id == "associationPage"][0]{
            body,
            ${seoProjection}
        }`,
        {},
        ["associationPage"]
    );
}

export function getAgendaPage() {
    return safeFetch<SimplePage>(
        groq`*[_id == "agendaPage"][0]{ ${seoProjection} }`,
        {},
        ["agendaPage"]
    );
}

export function getContactPage() {
    return safeFetch<SimplePage>(
        groq`*[_id == "contactPage"][0]{ ${seoProjection} }`,
        {},
        ["contactPage"]
    );
}

export function getMentionsLegalesPage() {
    return safeFetch<SimplePage>(
        groq`*[_id == "mentionsLegalesPage"][0]{ ${seoProjection} }`,
        {},
        ["mentionsLegalesPage"]
    );
}

export async function getShows(): Promise<Show[]> {
    const [micimShows, tipaixShows] = await Promise.all([
        safeFetch<Show[]>(
            groq`*[_type == "show" && startDateTime >= now()] | order(startDateTime asc) ${showProjection}`,
            {},
            ["show"]
        ),
        getTipaixShows(),
    ]);

    const now = Date.now();
    return [...(micimShows ?? []), ...tipaixShows]
        .filter((show) => new Date(show.startDateTime).getTime() >= now)
        .sort(
            (a, b) =>
                new Date(a.startDateTime).getTime() -
                new Date(b.startDateTime).getTime()
        );
}

export function getShowById(id: string) {
    return safeFetch<Show | null>(
        groq`*[_type == "show" && _id == $id][0] ${showProjection}`,
        { id },
        ["show"]
    );
}
