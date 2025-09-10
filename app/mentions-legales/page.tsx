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
                Contact : micim@micim.fr
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

            <h2>
                Politique de confidentialité et protection des données
                personnelles
            </h2>

            <h3>Responsable de traitement</h3>
            <p>
                Le responsable de traitement des données personnelles collectées
                sur ce site est l&apos;association MICIM, représentée par
                Sébastien Chombart et Marc Potard.
                <br />
                Contact : micim@micim.fr
            </p>

            <h3>Données collectées via le formulaire de contact</h3>
            <p>
                Lorsque vous utilisez notre formulaire de contact, nous
                collectons les données personnelles suivantes :
            </p>
            <ul>
                <li>Prénom et nom</li>
                <li>Adresse e-mail</li>
                <li>Message</li>
                <li>Consentement à l'inscription newsletter (optionnel)</li>
            </ul>

            <h3>Base légale et finalité du traitement</h3>
            <p>
                Le traitement de vos données personnelles est basé sur votre
                consentement explicite, donné lors de la soumission du
                formulaire de contact.
                <br />
                Les données sont utilisées pour :
            </p>
            <ul>
                <li>Répondre à votre demande et assurer le suivi de nos échanges</li>
                <li>Vous envoyer notre newsletter si vous avez donné votre consentement (information sur nos spectacles et actualités)</li>
            </ul>

            <h3>Durée de conservation</h3>
            <p>
                Vos données personnelles sont conservées selon les finalités suivantes :
            </p>
            <ul>
                <li><strong>Contact :</strong> 1 an maximum à compter de votre dernier contact</li>
                <li><strong>Newsletter :</strong> Jusqu'à votre désinscription ou 3 ans d'inactivité maximum</li>
            </ul>
            <p>
                Passé ces délais, vos données sont automatiquement supprimées de nos systèmes.
            </p>

            <h3>Destinataires des données</h3>
            <p>
                Vos données personnelles sont uniquement accessibles aux membres
                responsables de l&apos;association MICIM chargés de traiter
                votre demande.
                <br />
                Aucune donnée n&apos;est transmise à des tiers ou à des
                partenaires commerciaux.
            </p>

            <h3>Newsletter et désinscription</h3>
            <p>
                Si vous vous êtes inscrit(e) à notre newsletter, vous pouvez vous désinscrire à tout moment :
            </p>
            <ul>
                <li>En cliquant sur le lien de désinscription présent dans chaque email</li>
                <li>En nous contactant directement à l'adresse : micim@micim.fr</li>
            </ul>
            <p>
                Votre désinscription sera effective immédiatement et vos données seront supprimées de notre liste de diffusion.
            </p>

            <h3>Vos droits</h3>
            <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD), vous disposez des droits suivants :
            </p>
            <ul>
                <li>
                    <strong>Droit d&apos;accès :</strong> vous pouvez demander
                    l&apos;accès aux données personnelles que nous détenons sur
                    vous
                </li>
                <li>
                    <strong>Droit de rectification :</strong> vous pouvez
                    demander la correction de données inexactes
                </li>
                <li>
                    <strong>Droit d&apos;effacement :</strong> vous pouvez
                    demander la suppression de vos données
                </li>
                <li>
                    <strong>Droit d&apos;opposition :</strong> vous pouvez vous
                    opposer au traitement de vos données
                </li>
                <li>
                    <strong>Droit à la portabilité :</strong> vous pouvez
                    demander à recevoir vos données dans un format structuré
                </li>
                <li>
                    <strong>Droit de retrait du consentement :</strong> vous
                    pouvez retirer votre consentement à tout moment (notamment pour la newsletter)
                </li>
            </ul>
            <p>
                Pour exercer ces droits, contactez-nous à l&apos;adresse :
                micim@micim.fr
                <br />
                Nous nous engageons à répondre à votre demande dans un délai
                d&apos;un mois.
            </p>

            <h3>Réclamation</h3>
            <p>
                En cas de litige, vous avez le droit d&apos;introduire une
                réclamation auprès de la Commission Nationale de
                l&apos;Informatique et des Libertés (CNIL) :
                <br />
                CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07
                <br />
                Téléphone : 01 53 73 22 22 - Site web :{" "}
                <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    className="link"
                    rel="noopener noreferrer"
                >
                    www.cnil.fr
                </a>
            </p>

            <h3>Cookies et technologies de suivi</h3>
            <p>
                Ce site n&apos;utilise aucun cookie de suivi ou de profilage
                publicitaire.
                <br />
                Seuls des cookies techniques nécessaires au bon fonctionnement
                du site peuvent être utilisés.
            </p>

            <hr />
            <p>
                Site réalisé par{" "}
                <a
                    href="https://www.marcpotard.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                >
                    Marc Potard
                </a>
            </p>
        </div>
    );
};

export default LegalNotices;
