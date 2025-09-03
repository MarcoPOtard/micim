import { Metadata } from "next";

export const metadata: Metadata = {
    title: "La troupe MICIM",
    description:
        "Découvrez la troupe MICIM, passionnée de théâtre d'improvisation et de comédie musicale. Chaque spectacle est unique, créé en direct sans script ni partitions.",
    keywords: [
        "troupe MICIM",
        "comédie musicale improvisée",
        "théâtre improvisation",
        "spectacle unique",
        "troupe amateur Aix",
    ],
    openGraph: {
        title: "La troupe MICIM - Comédie Musicale Improvisée",
        description:
            "Une troupe amateur passionnée qui crée des comédies musicales entièrement improvisées. Chaque spectacle est une expérience unique !",
        images: ["/images/og-image.jpg"],
    },
};

export default function Troupe() {
    return (
        <div className="pages-container">
            <h1>La troupe</h1>

            <h2>La troupe de Comédie Musicale Improvisée</h2>
            <p>
                La <strong>Micim</strong> est une troupe amateur passionnée de
                théâtre d&lsquo;impro et de musique. Elle vous propose des{" "}
                <strong>comédies musicales improvisées</strong>
            </p>
            <p>
                Chaque spectacle est une création unique, née de
                l&lsquo;instant, où les voix, les corps, les instruments et les
                émotions s&lsquo;unissent pour inventer sur scène des histoires
                drôles, touchantes ou déjantées... en chantant,
                évidemment&nbsp;!
            </p>
            <p>
                Sans script, sans partitions, mais avec beaucoup
                d&lsquo;énergie, et grace à vos idées, car c&lsquo;est vous qui
                nous donnerez les éléments pour que les artistes de la Micim
                relèvent le défi de monter{" "}
                <strong>
                    une comédie musicale type Broadway totalement improvisée
                </strong>
                .
            </p>
            <p>
                Une expérience ludique, surprenante, et toujours pleine de
                folie&nbsp;!
                <br />
                Venez et revenez nous voir : vous ne verrez{" "}
                <strong>jamais deux fois le même spectacle</strong>.
            </p>
        </div>
    );
}
