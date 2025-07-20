import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions légales - MICIM",
    robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

const LegalNotices = () => {
    return (
        <div className="pages-container">
            <h1>Mentions légales</h1>

            <h2>Éditeur du site</h2>
            <p>
                Le présent site est édité par l’association MICIM (théâtre
                d’improvisation).
                <br />
                Association régie par la loi du 1er juillet 1901.
                <br />
                Contact : [ton email de contact]
            </p>

            <p>
                Conformément à l’article 6 III-2 de la loi n°2004-575 du 21 juin
                2004 pour la confiance dans l’économie numérique, l’éditeur du
                site est un particulier qui souhaite rester anonyme. Les
                coordonnées complètes peuvent être communiquées aux autorités
                compétentes sur demande.
            </p>

            <h2>Hébergeur du site</h2>
            <p>
                Vercel Inc.
                <br />
                340 S Lemon Ave #4133
                <br />
                Walnut, CA 91789
                <br />
                États‑Unis
                <br />
                https://vercel.com
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
                L’ensemble des contenus présents sur le site (textes, images,
                graphismes, logos…) sont la propriété de l’association MICIM ou
                de leurs auteurs respectifs.
                <br />
                Toute reproduction, diffusion ou utilisation sans autorisation
                préalable est interdite.
            </p>

            <h2>Données personnelles</h2>
            <p>
                Ce site ne collecte aucune donnée personnelle et n’utilise aucun
                cookie de suivi.
                <br />
                Pour toute question, vous pouvez nous contacter par e‑mail à
                l’adresse suivante : [ton email de contact].
            </p>
        </div>
    );
};

export default LegalNotices;
