import { Show } from "@/datas/IShowsData";
import { showData } from "@/utils/dataProcessing";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { notFound } from "next/navigation";
import { getImageDimensions } from "@/utils/imageUtils";
import { StructuredData } from "@/components/StructuredData";
import { generateEventStructuredData } from "@/utils/eventUtils";

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

        // Nettoyer la description HTML pour la meta description
        const cleanDescription = show.description 
            ? show.description.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim()
            : "Spectacle de comédie musicale improvisée par la troupe MICIM";
        
        const truncatedDescription = cleanDescription.length > 160 
            ? cleanDescription.substring(0, 157) + "..."
            : cleanDescription;

        const showUrl = `https://micim.fr/agenda/${showId}`;
        const imageUrl = show.image ? `https://micim.fr${show.image}` : 'https://micim.fr/images/og-image.jpg';

        return {
            title: show.title,
            description: truncatedDescription,
            keywords: [
                show.title,
                'MICIM',
                'comédie musicale improvisée',
                'spectacle',
                show.city || 'Aix-en-Provence',
                'théâtre',
                'improvisation',
                'événement'
            ],
            authors: [{ name: 'MICIM' }],
            creator: 'MICIM',
            publisher: 'MICIM',
            openGraph: {
                type: 'article',
                locale: 'fr_FR',
                url: showUrl,
                siteName: 'MICIM',
                title: `${show.title} - MICIM`,
                description: truncatedDescription,
                images: [{
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: show.title,
                    type: 'image/jpeg'
                }],
                publishedTime: new Date().toISOString(),
                section: 'Spectacles'
            },
            twitter: {
                card: 'summary_large_image',
                title: `${show.title} - MICIM`,
                description: truncatedDescription,
                images: [imageUrl],
                creator: '@micim'
            },
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
            alternates: {
                canonical: showUrl
            }
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

    const heroDimensions = getImageDimensions(show.image);
    const posterDimensions = getImageDimensions(show.poster);
    const eventData = generateEventStructuredData(show);

    return (
        <>
            <StructuredData type="event" data={eventData} />
            <div className="show-container">
            <Image
                src={show.image}
                alt={show.title}
                width={heroDimensions.width}
                height={heroDimensions.height}
                className="show-hero"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                style={{
                    width: '100%',
                    height: 'auto',
                }}
            />
            <Image
                src={show.poster}
                alt={show.title}
                width={posterDimensions.width}
                height={posterDimensions.height}
                className="show-poster"
                sizes="(max-width: 1024px) 0px, 50%"
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
                {show.link && (
                    <Link className="button-secondary" href={show.link} target="_blank" rel="noopener noreferrer">
                        Acheter votre billet
                    </Link>
                )}
                <h3>Heure & Lieux</h3>
                <p className="show-informations">
                    {show.date}, {show.startingHour}
                    <br />
                    {show.location}
                </p>
            </div>
        </div>
        </>
    );
}
