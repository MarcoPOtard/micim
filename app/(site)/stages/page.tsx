import { getFullDateDisplay, getTimeDisplay } from "@/utils/dateUtils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { CgChevronRight } from "react-icons/cg";
import { getStagesPage, getStages } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
    const stagesPage = await getStagesPage();

    return {
        title: stagesPage?.seo?.metaTitle ?? "Stages d'improvisation",
        description:
            stagesPage?.seo?.metaDescription ??
            "Découvrez tous les prochains stages d'improvisation théâtrale animés par la troupe MICIM à Aix-en-Provence.",
        keywords: [
            "stages improvisation MICIM",
            "ateliers théâtre improvisé",
            "stages Aix-en-Provence",
            "calendrier stages",
        ],
        openGraph: {
            title: "Stages MICIM - Prochains stages d'improvisation",
            description:
                "Ne manquez aucun de nos stages ! Consultez le calendrier complet des stages de la troupe MICIM.",
            images: [stagesPage?.seo?.shareImageUrl ?? "/images/og-image.jpg"],
        },
    };
}

// Revalidate the page every 6 hours
export const revalidate = 21600;

export default async function Stages() {
    const [stagesPage, stagesData] = await Promise.all([
        getStagesPage(),
        getStages(),
    ]);

    return (
        <>
            <div className="stages-container">
                <h1>Nos prochains stages</h1>
                {stagesPage?.intro?.length ? (
                    <PortableText value={stagesPage.intro} />
                ) : (
                    <p>
                        Vous trouverez, dans cette section, tous{" "}
                        <strong>
                            les stages à venir animés par la troupe la Micim
                        </strong>
                        . N&lsquo;hésitez pas à revenir ici pour voir les
                        nouvelles dates proposées.
                    </p>
                )}
                <section className="stages__section-container">
                    {stagesData.map((stage) => {
                        return (
                            <article
                                key={stage._id}
                                className="stages__stage-container"
                            >
                                {stage.imageUrl && (
                                    <Image
                                        src={stage.imageUrl}
                                        alt={stage.title}
                                        width={640}
                                        height={380}
                                        className="stages__stage-hero"
                                    />
                                )}
                                <Link
                                    className="stages__stage-content"
                                    href={`/stages/${stage._id}`}
                                >
                                    <h3 className="stages__stage-title">
                                        {stage.title}
                                    </h3>
                                    <p className="stages__stage-informations">
                                        {getFullDateDisplay(stage.startDateTime)}, {getTimeDisplay(stage.startDateTime)}
                                    </p>
                                    <CgChevronRight className="stages__stage-more" />
                                </Link>
                            </article>
                        );
                    })}
                </section>
            </div>
        </>
    );
}
