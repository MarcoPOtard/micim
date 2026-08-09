import { getFullDateDisplay, getTimeDisplay } from "@/utils/dateUtils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CgChevronRight } from "react-icons/cg";
import { getAgendaPage, getShows } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
    const agendaPage = await getAgendaPage();

    return {
        title: agendaPage?.seo?.metaTitle ?? "Agenda des spectacles",
        description:
            agendaPage?.seo?.metaDescription ??
            "Découvrez tous les prochains spectacles de comédie musicale improvisée de la troupe MICIM. Réservez vos places pour nos représentations à Aix-en-Provence.",
        keywords: [
            "agenda spectacles MICIM",
            "prochaines représentations",
            "spectacles Aix-en-Provence",
            "réservation comédie musicale",
            "calendrier événements",
        ],
        openGraph: {
            title: "Agenda des spectacles MICIM - Prochaines représentations",
            description:
                "Ne manquez aucun de nos spectacles ! Consultez l'agenda complet de la troupe MICIM et réservez vos places.",
            images: [agendaPage?.seo?.shareImageUrl ?? "/images/og-image.jpg"],
        },
    };
}

// Revalidate the page every 6 hours
export const revalidate = 21600;

export default async function Agenda() {
    const showsDatas = await getShows();

    return (
        <>
            <div className="agenda-container">
                <h1>Nos futurs spectacles</h1>
                <p className="">
                    Vous trouverez, dans cette section, tous{" "}
                    <strong>
                        les spectacles à venir de la troupe la Micim
                    </strong>
                    . N&lsquo;hésitez pas à revenir ici pour voir les nouvelles
                    représentations prévues.
                </p>
                <section className="agenda__section-container">
                    {showsDatas.map((show) => {
                        return (
                            <article
                                key={show._id}
                                className="agenda__show-container"
                            >
                                {show.imageUrl && (
                                    <Image
                                        src={show.imageUrl}
                                        alt={show.title}
                                        width={640}
                                        height={380}
                                        className="agenda__show-hero"
                                    />
                                )}
                                <span
                                    className="agenda__show-team"
                                    style={{
                                        backgroundImage: `url(/logo/picto-${show.team}-96x96.png)`,
                                    }}
                                ></span>
                                <div>
                                    {show.team === "micim" ? (
                                        <Link
                                            className="agenda__show-content"
                                            href={`/agenda/${show._id}`}
                                        >
                                            <h3 className="agenda__show-title">
                                                {show.title}
                                            </h3>
                                            <p className="agenda__show-informations">
                                                {getFullDateDisplay(show.startDateTime)}, {getTimeDisplay(show.startDateTime)}
                                            </p>
                                            <CgChevronRight className="agenda__show-more" />
                                        </Link>
                                    ) : (
                                        <a
                                            className="agenda__show-content"
                                            href={`https://www.tipaix.fr/spectacles/${show.ticketLink}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <h3 className="agenda__show-title">
                                                {show.title}
                                            </h3>
                                            <p className="agenda__show-informations">
                                                {getFullDateDisplay(show.startDateTime)}, {getTimeDisplay(show.startDateTime)}
                                            </p>
                                            <CgChevronRight className="agenda__show-more" />
                                        </a>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
        </>
    );
}
