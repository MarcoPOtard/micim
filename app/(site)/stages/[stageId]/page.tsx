import { getFullDateDisplay, getTimeDisplay } from "@/utils/dateUtils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { generateEventStructuredData } from "@/utils/eventUtils";
import { getStageById } from "@/lib/sanity/queries";
import { portableTextToPlainText } from "@/lib/sanity/portableText";

type Props = {
    params: Promise<{ stageId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { stageId } = await params;

    const stage = await getStageById(stageId);

    if (!stage) {
        return { title: "Stage introuvable" };
    }

    // Nettoyer la description pour la meta description
    const cleanDescription = stage.description?.length
        ? portableTextToPlainText(stage.description)
        : "Stage d'improvisation théâtrale animé par la troupe MICIM";

    const truncatedDescription = cleanDescription.length > 160
        ? cleanDescription.substring(0, 157) + "..."
        : cleanDescription;

    const stageUrl = `https://micim.fr/stages/${stageId}`;
    const imageUrl = stage.imageUrl ?? 'https://micim.fr/images/og-image.jpg';

    return {
        title: stage.title,
        description: truncatedDescription,
        keywords: [
            stage.title,
            'MICIM',
            'stage improvisation',
            'atelier théâtre',
            'Aix-en-Provence',
            'improvisation',
        ],
        authors: [{ name: 'MICIM' }],
        creator: 'MICIM',
        publisher: 'MICIM',
        openGraph: {
            type: 'article',
            locale: 'fr_FR',
            url: stageUrl,
            siteName: 'MICIM',
            title: `${stage.title} - MICIM`,
            description: truncatedDescription,
            images: [{
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: stage.title,
            }],
            section: 'Stages'
        },
        twitter: {
            card: 'summary_large_image',
            title: `${stage.title} - MICIM`,
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
            canonical: stageUrl
        }
    };
}

export default async function StageDetails({ params }: Props) {
    const { stageId } = await params;
    const stage = await getStageById(stageId);

    if (!stage) {
        notFound();
    }

    const eventData = generateEventStructuredData(stage, {
        basePath: "stages",
        fallbackDescription: `Stage d'improvisation théâtrale : ${stage.title}`,
    });

    const optsLink: { className?: string; target?: string } = {
        className: "button-secondary",
        target: "_blank"
    };

    if (stage.ticketLink === "#") {
        optsLink.className += " btn-disabled";
        optsLink.target = "";
    }

    return (
        <>
            <StructuredData type="event" data={eventData} />
            <div className="stage-container">
            {stage.imageUrl && (
                <Image
                    src={stage.imageUrl}
                    alt={stage.title}
                    width={stage.imageWidth ?? 1200}
                    height={stage.imageHeight ?? 900}
                    className="stage-image"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
            )}

            <div className="stage-content">
                <h1>{stage.title}</h1>
                <p className="stage-short-informations">
                    {getFullDateDisplay(stage.startDateTime)}
                </p>
                <div className="stage-description">
                    <PortableText value={stage.description} />
                </div>
                {(stage.ticketLink) && (
                    <Link
                        href={stage.ticketLink}
                        {...optsLink}
                        rel="noopener noreferrer">
                        S&apos;inscrire au stage
                    </Link>
                )}
                <h3>Heure et lieu</h3>
                <p className="stage-informations">
                    {getFullDateDisplay(stage.startDateTime)}, {getTimeDisplay(stage.startDateTime)}
                    <br />
                    Salle sous la mairie annexe de Luynes
                   <br />
                    Place de la libération, 13080 Aix-en-Provence
                </p>
            </div>
        </div>
        </>
    );
}
