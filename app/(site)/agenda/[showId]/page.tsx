import { getFullDateDisplay, getTimeDisplay } from "@/utils/dateUtils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { generateEventStructuredData } from "@/utils/eventUtils";
import { getShowById } from "@/lib/sanity/queries";
import { portableTextToPlainText } from "@/lib/sanity/portableText";

type Props = {
    params: Promise<{ showId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { showId } = await params;

    const show = await getShowById(showId);

    if (!show) {
        return { title: "Show not found" };
    }

    // Nettoyer la description pour la meta description
    const cleanDescription = show.description?.length
        ? portableTextToPlainText(show.description)
        : "Spectacle de comédie musicale improvisée par la troupe MICIM";

    const truncatedDescription = cleanDescription.length > 160
        ? cleanDescription.substring(0, 157) + "..."
        : cleanDescription;

    const showUrl = `https://micim.fr/agenda/${showId}`;
    const imageUrl = show.imageUrl ?? 'https://micim.fr/images/og-image.jpg';

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
            }],
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
}

export default async function ShowDetails({ params }: Props) {
    const { showId } = await params;
    const show = await getShowById(showId);

    if (!show) {
        notFound();
    }

    const eventData = generateEventStructuredData(show);

    const optsLink: { className?: string; target?: string } = {
        className: "button-secondary",
        target: "_blank"
    };

    if (show.ticketLink === "#") {
        optsLink.className += " btn-disabled";
        optsLink.target = "";
    }

    return (
        <>
            <StructuredData type="event" data={eventData} />
            <div className="show-container">
            {show.imageUrl && (
                <Image
                    src={show.imageUrl}
                    alt={show.title}
                    width={show.imageWidth ?? 1200}
                    height={show.imageHeight ?? 900}
                    className="show-hero"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px"
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
            )}
            {show.posterUrl && (
                <Image
                    src={show.posterUrl}
                    alt={show.title}
                    width={show.posterWidth ?? 900}
                    height={show.posterHeight ?? 1200}
                    className="show-poster"
                    sizes="(max-width: 1024px) 0px, 50%"
                />
            )}

            <div className="show-content">
                <h1>{show.title}</h1>
                <p className="show-short-informations">
                    {getFullDateDisplay(show.startDateTime)} | {show.city}
                </p>
                <div className="show-description">
                    <PortableText value={show.description} />
                </div>
                {(show.ticketLink) && (
                    <Link
                        href={show.ticketLink}
                        {...optsLink}
                        rel="noopener noreferrer">
                        Acheter votre billet
                    </Link>
                )}
                <h3>Heure & Lieux</h3>
                <p className="show-informations">
                    {getFullDateDisplay(show.startDateTime)}, {getTimeDisplay(show.startDateTime)}
                    <br />
                    {show.location}
                </p>
            </div>
        </div>
        </>
    );
}
