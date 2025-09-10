import { Show } from "@/datas/IShowsData";
import { showData } from "@/utils/dataProcessing";
import { getFullDateDisplay } from "@/utils/dateUtils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CgChevronRight } from "react-icons/cg";

export const metadata: Metadata = {
    title: "Agenda des spectacles",
    description: "Découvrez tous les prochains spectacles de comédie musicale improvisée de la troupe MICIM. Réservez vos places pour nos représentations à Aix-en-Provence.",
    keywords: ['agenda spectacles MICIM', 'prochaines représentations', 'spectacles Aix-en-Provence', 'réservation comédie musicale', 'calendrier événements'],
    openGraph: {
        title: "Agenda des spectacles MICIM - Prochaines représentations",
        description: "Ne manquez aucun de nos spectacles ! Consultez l'agenda complet de la troupe MICIM et réservez vos places.",
        images: ['/images/og-image.jpg'],
    }
};

export default async function Agenda() {
    const showsDatas:Show[] = await showData();
    // const shows = displayShows(showsDatas, 0);

    return (
        <>
            <div className="agenda-container">
                <h1>Nos futurs spectacles</h1>
                <p className="">
                    Vous trouverez, dans cette section, tous <strong>les spectacles à
                    venir de la troupe la Micim</strong>. N&lsquo;hésitez pas à revenir
                    ici pour voir les nouvelles représentations prévues.
                </p>
                <section className="agenda__section-container">
                    {showsDatas.map((show) => {
                        return (
                            <article
                                key={show.id}
                                className="agenda__show-container"
                            >
                                <Image
                                    src={show.image}
                                    alt={show.title}
                                    width={640}
                                    height={380}
                                    className="agenda__show-hero"
                                />
                                <span className="agenda__show-team" style={{backgroundImage: `url(/logo/picto-${show.team}-96x96.png)`}}></span>
                                <div>
                                    <Link
                                        className="agenda__show-content"
                                        href={`/agenda/${show.id}`}
                                    >
                                        <h3 className="agenda__show-title">
                                            {show.title}
                                        </h3>
                                        <p className="agenda__show-informations">
                                            {getFullDateDisplay(show.date)}, {show.startingHour}
                                        </p>
                                        <CgChevronRight className="agenda__show-more" />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
        </>
    );
}
