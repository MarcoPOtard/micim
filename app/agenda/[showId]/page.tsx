import { Show } from "@/datas/IShowsData";
import { showData } from "@/utils/dataProcessing";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ showId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    try {
        // read route params
        const { showId } = await params;

        const baseUrl =
            process.env.VERCEL_URL !== undefined
                ? `https://${process.env.VERCEL_URL}`
                : "http://localhost:3000";

        const res = await fetch(`${baseUrl}/api/shows/${showId}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`❌ Failed to fetch show ${showId}:`, res.statusText);
            return { title: "Show not found" };
        }

        const show = await res.json();

        return {
            title: show.title || "Show Details",
            description: show.description ? show.description.substring(0, 160) : "Détails du spectacle MICIM",
        };
    } catch (error) {
        console.error("Error in generateMetadata:", error);
        return { 
            title: "Show not found",
            description: "Le spectacle demandé n'a pas pu être trouvé."
        };
    }
}

export default async function ShowDetails({
    params,
}: {
    params: Promise<{ showId: string }>;
}) {
    const showId = (await params).showId;
    const showsDatas = await showData();
    const show: Show | undefined = showsDatas.find(
        (show) => show.id === showId
    );

    if (!show) {
        notFound();
    }

    return (
        <div className="show-container">
            <Image
                src={`/images/${show.image}`}
                alt={show.title}
                width={640}
                height={380}
                className="show-hero"
            />
            <Image
                src={`/images/${show.poster}`}
                alt={show.title}
                width={432}
                height={600}
                className="show-poster"
            />

            <div className="show-content">
                <h1>{show?.title}</h1>
                <p className="show-short-informations">
                    {show.date} | {show.city}
                </p>
                <p
                    className="show-description"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(show.description) }}
                />
                {show.link ? (
                    <Link className="button-secondary" href={show.link} target="_blank">
                        Acheter votre billet
                    </Link>
                ) : (
                    <button
                        className="button-secondary"
                        disabled={true}
                        title="Pas encore disponnible"
                    >
                        Acheter votre billet
                    </button>
                )}
                <h3>Heure & Lieux</h3>
                <p className="show-informations">
                    {show.date}, {show.startingHour}
                    <br />
                    {show.location}
                </p>
            </div>
        </div>
    );
}
