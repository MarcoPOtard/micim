import { Show } from "@/datas/IShowsData";
import { showData } from "@/models/dataProcessing";
import Image from "next/image";
import Link from "next/link";

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
        console.log("Aucun évènement trouvé avec cette id");
        return;
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
                    dangerouslySetInnerHTML={{ __html: show.description }}
                />
                {show.link ? (
                    <Link className="show-cta" href={show.link} target="_blank">
                        Acheter votre billet
                    </Link>
                ) : (
                    <button className="show-cta" disabled={true} title="Pas encore disponnible">
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
