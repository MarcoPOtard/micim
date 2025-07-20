import { Show } from "@/datas/IShowsData";
import { showData } from "@/models/dataProcessing";
import Image from "next/image";
import Link from "next/link";
import { CgChevronRight } from "react-icons/cg";

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
                                    src={`/images/${show.image}`}
                                    alt={show.title}
                                    width={640}
                                    height={380}
                                    className="agenda__show-hero"
                                />
                                <div>
                                    <Link
                                        className="agenda__show-content"
                                        href={`/agenda/${show.id}`}
                                    >
                                        <h3 className="agenda__show-title">
                                            {show.title}
                                        </h3>
                                        <p className="agenda__show-informations">
                                            {show.date}, {show.startingHour}
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
