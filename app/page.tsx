import Carousel from "@/components/Carousel";
import { displayShows } from "@/models/dataProcessing";
import Image from "next/image";
import Link from "next/link";
import { CgChevronRight } from "react-icons/cg";
import { promises as fs } from "fs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'MICIM - Troupe de Comédie Musicale Improvisée',
    description: 'MICIM est une troupe d\'Aix-en-Provence qui met en scène des Comédies Musicales Improvisées. Ni vous, ni nous ne savons ce qu\'il va se passer car tout est improvisé.',
  }
  
export default async function Home() {
    const shows = await displayShows(2);
    const file = await fs.readFile(
        process.cwd() + "/datas/sliderData.json",
        "utf8"
    );
    const sliderData = JSON.parse(file);

    return (
        <>
            <div className="home-page__hero-container">
                <div className="home-page__hero-background"></div>
                <div className="home-page__hero-content">
                    <h1>
                        <Image
                            src="/logo/logo-MICIM.png"
                            alt="MICIM"
                            width={150}
                            height={150}
                        />
                    </h1>
                    <h2 className="limelight home-page__hero-subtitle">
                        Comédie Musicale Improvisée
                    </h2>
                </div>
            </div>

            <div className="home-page__carousel-container">
                <Carousel sliderData={sliderData} />
            </div>

            <div className="home-page__next-time__container">
                <h2 className="home-page__next-time__title">
                    Nos futurs spectacles
                </h2>

                {shows.map((show) => (
                    <article
                        key={show.id}
                        className="home-page__show-container"
                    >
                        <Image
                            src={`/images/${show.image}`}
                            alt={show.title}
                            width={640}
                            height={380}
                            className="home-page__show-hero"
                        />
                        <div>
                            <Link
                                className="home-page__show-content"
                                href={`/agenda/${show.id}`}
                            >
                                <h3 className="home-page__show-title">
                                    {show.title}
                                </h3>
                                <p className="home-page__show-informations">
                                    {show.date}, {show.startingHour}
                                </p>
                                <CgChevronRight className="home-page__show-more" />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}
