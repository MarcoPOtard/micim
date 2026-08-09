import Carousel from "@/components/Carousel";
import { getFullDateDisplay, getTimeDisplay } from "@/utils/dateUtils";
import Image from "next/image";
import Link from "next/link";
import { CgChevronRight } from "react-icons/cg";
import { Metadata } from "next";
import { getHomePage, getShows, Slide } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

const DEFAULT_SLIDES: Slide[] = [
    {
        title: "Bienvenue chez la MICIM",
        subtitle: "Qui sommes-nous ?",
        description:
            "La Micim est une troupe de Comédie Musicale Improvisée. Nous vous inventons, vous jouons, vous interpretons des comédies musicales pour votre plus grand plaisir.",
        ctaText: "Plus d'informations",
        ctaLink: "/troupe",
    },
    {
        title: "La TIPAIX",
        subtitle: "Section théâtre d'impro",
        description:
            "La Tipaix est la troupe de théâtre d'improvisation de l'association. Il y a des cours et des spectacles. Pour en savoir plus, allez donc faire un petit tour sur leur site internet ;)",
        ctaText: "Plus d'informations",
        ctaLink: "https://www.tipaix.com",
    },
];

const DEFAULT_HERO_BACKGROUND = "/images/troupe-micim.jpeg";

export async function generateMetadata(): Promise<Metadata> {
    const homePage = await getHomePage();

    return {
        title: homePage?.seo?.metaTitle ?? "Accueil",
        description:
            homePage?.seo?.metaDescription ??
            "MICIM est une troupe d'Aix-en-Provence qui met en scène des Comédies Musicales Improvisées. Ni vous, ni nous ne savons ce qu'il va se passer car tout est improvisé.",
        keywords: [
            "comédie musicale improvisée",
            "improvisation théâtrale",
            "spectacle Aix-en-Provence",
            "troupe MICIM",
            "théâtre musical",
        ],
        openGraph: {
            title: "MICIM - Troupe de Comédie Musicale Improvisée",
            description:
                "Découvrez nos spectacles uniques où tout est improvisé en direct. Comédie musicale improvisée à Aix-en-Provence.",
            images: [homePage?.seo?.shareImageUrl ?? "/images/og-image.jpg"],
        },
    };
}

// Revalidate the page every 6 hours
export const revalidate = 21600;

export default async function Home() {
    const [homePage, shows] = await Promise.all([getHomePage(), getShows()]);

    const slides = homePage?.slides?.length ? homePage.slides : DEFAULT_SLIDES;
    const heroBackgroundUrl = homePage?.heroBackgroundImage
        ? urlFor(homePage.heroBackgroundImage).width(1920).quality(80).auto("format").url()
        : DEFAULT_HERO_BACKGROUND;
    const micimShows = shows.filter((show) => show.team === "micim").slice(0, 2);

    return (
        <>
            <div className="home-page__hero-container">
                <div
                    className="home-page__hero-background"
                    style={{ backgroundImage: `url(${heroBackgroundUrl})` }}
                ></div>
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
                <Carousel slides={slides} />
            </div>

            <div className="home-page__next-time__container">
                <h2 className="home-page__next-time__title">
                    Nos futurs spectacles
                </h2>

                {micimShows.map((show) => (
                    <article
                        key={show._id}
                        className="home-page__show-container"
                    >
                        {show.imageUrl && (
                            <Image
                                src={show.imageUrl}
                                alt={show.title}
                                width={640}
                                height={380}
                                className="home-page__show-hero"
                            />
                        )}
                        <div>
                            <Link
                                className="home-page__show-content"
                                href={`/agenda/${show._id}`}
                            >
                                <h3 className="home-page__show-title">
                                    {show.title}
                                </h3>
                                <p className="home-page__show-informations">
                                    {getFullDateDisplay(show.startDateTime)}, {getTimeDisplay(show.startDateTime)}
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
