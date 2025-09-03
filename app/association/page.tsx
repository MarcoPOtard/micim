import { Metadata } from "next";

export const metadata: Metadata = {
    title: "L'association MICIM",
    description: "Découvrez l'association MICIM : La Malicieuse et Intenable Compagnie d'Impro Musicale. Notre vocation, nos ateliers et notre philosophie artistique.",
    keywords: ['association MICIM', 'compagnie improvisation musicale', 'ateliers théâtre', 'formation impro', 'association artistique'],
    openGraph: {
        title: "L'association MICIM - Compagnie d'Improvisation Musicale",
        description: "La MICIM réunit des passionnés de théâtre d'improvisation et de comédie musicale improvisée à Aix-en-Provence.",
        images: ['/images/og-image.jpg'],
    }
};

export default function Association() {
    return (
        <div className="pages-container">
            <h1>L&lsquo;asso</h1>

            <h2>
                La MICIM : La Malicieuse et Intenable Compagnie d&lsquo;Impro
                Musicale
            </h2>
            <p>
                La <strong>MICIM</strong> est une association artistique qui
                réunit des passionné·e·s de{" "}
                <strong>théâtre d&lsquo;improvisation</strong> et de{" "}
                <strong>comédie musicale improvisée</strong>.
                <br />
                Sa vocation&nbsp;: <strong>créer, monter et jouer</strong> des
                spectacles entièrement improvisés, où le théâtre rencontre la
                musique, le chant et le mouvement… dans la joie et
                l&lsquo;instant !
            </p>
            <p>
                Fondée sur l&lsquo;envie de mêler créativité collective, jeu
                scénique et expression musicale, la MICIM propose&nbsp;:
            </p>
            <ul>
                <li>
                    🎤 Des spectacles vivants et uniques, toujours improvisés,
                    jamais rejoués.
                </li>
                <li>
                    🎭 Des ateliers et formations pour découvrir ou approfondir
                    l&lsquo;art de l&lsquo;impro théâtrale et musicale.
                </li>
                <li>
                    🎶 Une ambiance conviviale, inclusive et exigeante où
                    chacun·e peut s&lsquo;exprimer et évoluer artistiquement
                </li>
            </ul>
            <p>
                Qu&lsquo;il s&lsquo;agisse de faire rire, d&lsquo;émouvoir ou de
                surprendre, la MICIM célèbre la{" "}
                <strong>liberté de créer ensemble</strong>, sans script, avec
                imagination et malice.
            </p>
        </div>
    );
}
