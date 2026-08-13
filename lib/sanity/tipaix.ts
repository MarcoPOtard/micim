import { groq } from "next-sanity";

import { tipaixClient } from "./tipaixClient";
import type { Show } from "./queries";

const EVENT_TIME_ZONE = "Europe/Paris";

interface TipaixShow {
    _id: string;
    title: string;
    date: string; // "2027-01-08"
    time: string; // "19h30"
    address?: string;
    venue?: string;
    slug?: { current: string };
    imageUrl?: string;
    imageWidth?: number;
    imageHeight?: number;
}

const tipaixShowProjection = `{
    _id,
    title,
    date,
    time,
    address,
    venue,
    slug,
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height
}`;

// Convertit une date+heure murale exprimée à Paris (ex: "2027-01-08" /
// "19h30") en instant ISO correct, en tenant compte du décalage horaire
// (heure d'été/hiver) à cette date précise.
function parisWallTimeToIso(date: string, time: string): string {
    const [hour, minute] = time.replace("h", ":").split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);

    const naiveUtcMs = Date.UTC(year, month - 1, day, hour, minute || 0);
    const offsetMinutes = getTimeZoneOffsetMinutes(naiveUtcMs, EVENT_TIME_ZONE);

    return new Date(naiveUtcMs - offsetMinutes * 60_000).toISOString();
}

function getTimeZoneOffsetMinutes(utcMs: number, timeZone: string): number {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).formatToParts(new Date(utcMs));

    const get = (type: string) =>
        Number(parts.find((part) => part.type === type)?.value);

    const asUtc = Date.UTC(
        get("year"),
        get("month") - 1,
        get("day"),
        get("hour"),
        get("minute"),
        get("second")
    );

    return (asUtc - utcMs) / 60_000;
}

export async function getTipaixShows(): Promise<Show[]> {
    try {
        const shows = await tipaixClient.fetch<TipaixShow[]>(
            groq`*[_type == "show"] | order(date asc, time asc) ${tipaixShowProjection}`,
            {},
            { next: { revalidate: 21600, tags: ["tipaix-show"] } }
        );

        return shows.map(
            (show): Show => ({
                _id: `tipaix-${show._id}`,
                title: show.title,
                team: "tipaix",
                startDateTime: parisWallTimeToIso(show.date, show.time),
                location: show.venue,
                city: undefined,
                imageUrl: show.imageUrl,
                imageWidth: show.imageWidth,
                imageHeight: show.imageHeight,
                description: [],
                ticketLink: show.slug?.current,
            })
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Tipaix Sanity fetch failed: ${message}`);
        return [];
    }
}
