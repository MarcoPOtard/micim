/**
 * Script de migration one-shot : importe le contenu actuellement codé en
 * dur (datas/showsData.json, datas/sliderData.json, réglages du site) dans
 * le projet Sanity.
 *
 * Usage : npm run migrate:sanity
 * Nécessite NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET et
 * SANITY_API_WRITE_TOKEN dans .env.local.
 *
 * Idempotent : chaque document est créé avec un _id déterministe et
 * remplacé (createOrReplace) si le script est relancé.
 */
import { createClient, type SanityClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";

import showsDataJson from "../datas/showsData.json";
import sliderDataJson from "../datas/sliderData.json";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-09";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
    console.error(
        "Variables manquantes : NEXT_PUBLIC_SANITY_PROJECT_ID et SANITY_API_WRITE_TOKEN doivent être définies dans .env.local."
    );
    process.exit(1);
}

const client: SanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
});

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const uploadedAssets = new Map<string, string>(); // chemin public -> assetId

async function uploadImage(publicPath: string): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
    if (!publicPath) return undefined;

    const cached = uploadedAssets.get(publicPath);
    if (cached) {
        return { _type: "image", asset: { _type: "reference", _ref: cached } };
    }

    const absolutePath = path.join(PUBLIC_DIR, publicPath);
    let buffer: Buffer;
    try {
        buffer = await readFile(absolutePath);
    } catch {
        console.warn(`  ! Image introuvable, ignorée : ${publicPath}`);
        return undefined;
    }

    const asset = await client.assets.upload("image", buffer, {
        filename: path.basename(publicPath),
    });
    uploadedAssets.set(publicPath, asset._id);
    console.log(`  + Image uploadée : ${publicPath}`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// "DD/MM/YYYY" + "20h00" -> ISO 8601 (Europe/Paris)
function toISODateTime(dateString: string, startingHour: string): string {
    const [day, month, year] = dateString.split("/").map(Number);
    const timeMatch = startingHour.match(/(\d{1,2})h(\d{2})/);
    const hours = timeMatch ? Number(timeMatch[1]) : 20;
    const minutes = timeMatch ? Number(timeMatch[2]) : 0;

    // Construit l'heure murale Europe/Paris en calculant l'offset via Intl,
    // pour rester correct été (UTC+2) comme hiver (UTC+1).
    const naiveUtc = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    const parisOffsetMinutes = getParisOffsetMinutes(naiveUtc);
    return new Date(naiveUtc.getTime() - parisOffsetMinutes * 60_000).toISOString();
}

function getParisOffsetMinutes(date: Date): number {
    const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Paris",
        timeZoneName: "shortOffset",
    }).formatToParts(date);
    const offsetPart = formatted.find((part) => part.type === "timeZoneName")?.value ?? "GMT+1";
    const match = offsetPart.match(/GMT([+-]\d+)/);
    return match ? Number(match[1]) * 60 : 60;
}

// HTML simple (avec <br />) -> blocs Portable Text
function htmlDescriptionToPortableText(html: string) {
    const decoded = html
        .replace(/&lsquo;|&rsquo;/g, "'")
        .replace(/&amp;/g, "&");

    return decoded
        .split(/<br\s*\/?>/gi)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((text) => ({
            _type: "block",
            style: "normal",
            children: [{ _type: "span", text }],
        }));
}

interface RawShow {
    id: string;
    team: "micim" | "tipaix";
    title: string;
    date: string;
    location: string;
    city: string;
    startingHour: string;
    image: string;
    poster: string;
    description: string;
    link?: string;
}

interface RawSlide {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

async function migrateShows() {
    console.log("\n== Spectacles ==");
    const rawShows = showsDataJson.shows as RawShow[];

    for (const [index, rawShow] of rawShows.entries()) {
        // Index plutôt que rawShow.id : le JSON source contient un doublon
        // d'id ("9" utilisé deux fois), un _id déterministe basé sur
        // l'index évite toute collision.
        const showId = `show-${index + 1}`;

        const [image, poster] = await Promise.all([
            uploadImage(rawShow.image),
            uploadImage(rawShow.poster),
        ]);

        await client.createOrReplace({
            _id: showId,
            _type: "show",
            title: rawShow.title,
            team: rawShow.team,
            startDateTime: toISODateTime(rawShow.date, rawShow.startingHour),
            location: rawShow.location,
            city: rawShow.city,
            image,
            poster,
            description: htmlDescriptionToPortableText(rawShow.description),
            ticketLink: rawShow.link,
        });
        console.log(`  + ${showId} : ${rawShow.title} (${rawShow.date})`);
    }
}

async function migrateHomePage() {
    console.log("\n== Page d'accueil ==");
    const heroBackgroundImage = await uploadImage("/images/troupe-micim.jpeg");
    const slides = (sliderDataJson.sliders as RawSlide[]).map((slide) => ({
        _type: "slide",
        _key: slide.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        ctaText: slide.ctaText,
        ctaLink: slide.ctaLink,
    }));

    await client.createOrReplace({
        _id: "homePage",
        _type: "homePage",
        heroBackgroundImage,
        slides,
    });
    console.log("  + homePage");
}

async function migrateSiteSettings() {
    console.log("\n== Réglages du site ==");
    await client.createOrReplace({
        _id: "siteSettings",
        _type: "siteSettings",
        siteTitle: "MICIM",
        titleTemplate: "%s | MICIM",
        defaultDescription:
            "MICIM est une troupe de comédie musicale improvisée basée à Aix-en-Provence. Découvrez nos spectacles uniques où tout est improvisé en direct.",
        defaultKeywords: [
            "comédie musicale",
            "improvisation",
            "théâtre",
            "Aix-en-Provence",
            "spectacle",
            "troupe",
            "MICIM",
        ],
        navigationLinks: [
            { _type: "navigationLink", _key: "agenda", label: "Agenda", href: "/agenda" },
            { _type: "navigationLink", _key: "association", label: "La Micim", href: "/association" },
            { _type: "navigationLink", _key: "tipaix", label: "La Tipaix", href: "https://www.tipaix.fr" },
            { _type: "navigationLink", _key: "contact", label: "Contact", href: "/contact" },
        ],
        socialLinks: [
            { _type: "socialLink", _key: "instagram", platform: "instagram", url: "https://www.instagram.com/micim_impro/" },
            { _type: "socialLink", _key: "facebook", platform: "facebook", url: "https://www.facebook.com/people/MICIM/61581278897594/" },
            { _type: "socialLink", _key: "youtube", platform: "youtube", url: "https://www.youtube.com/channel/UCnIxNBC2hsiGnN5M3Rd9ZsA" },
        ],
    });
    console.log("  + siteSettings");
}

// Texte brut (sans gras/italique/liens) de la page association : à
// remettre en forme dans Studio après migration.
async function migrateAssociationPage() {
    console.log("\n== Page \"La Micim\" ==");

    const paragraphs: { style: "normal" | "h2"; text: string }[] = [
        { style: "h2", text: "Rencontre des 2 fous" },
        {
            style: "normal",
            text: "Il était une fois, dans une contrée juste à côté de chez vous, un saltimbanque, improvisateur de théâtre, fou et talentueux, que nous nommerons Séboune. Séboune rencontra un troubadour multi-instrumentiste assez fou pour être capable de le suivre dans ses idées les plus délirantes, nous le nommerons Marco. Suite à cette rencontre, Séboune proposa à Marco de monter une troupe pour faire de la comédie musicale improvisée. Ni une ni deux, Marco approuva cette idée de « génie ». Les deux aventuriers étaient fiers de leur idée, mais il était encore un peu trop tôt pour pouvoir la mettre en application.",
        },
        { style: "h2", text: "Naissance de la Tipaix" },
        {
            style: "normal",
            text: "En attendant de pouvoir mettre en œuvre cette mirifique idée, Séboune décida d'assouvir une envie. L'envie de partager au plus grand nombre l'art de l'improvisation théâtrale, et en particulier aux jeunes. Il décida donc de mettre en place la Tipaix. La Tipaix, une troupe d'improvisation pour les jeunes, dont l'objectif est des plus simples : réussir à donner à des jeunes, le goût, l'envie, la possibilité, la liberté de pouvoir s'exprimer, s'amuser, se construire grâce à ce noble art qu'est le théâtre d'improvisation. Mais je m'égare, revenons en à la comédie musicale improvisée tout de même.",
        },
        { style: "h2", text: "L'apprentissage" },
        {
            style: "normal",
            text: "Alors que les deux aventuriers étaient à la recherche d'une solution pour faire avancer leur projet, que dis-je leur projet, leur idée folle, ils eurent vent qu'un stage de comédie musicale improvisée allait avoir lieu en cet été 2024. Celui-ci se déroulait à l'improcamp (improcamp.com), lieu très sympathique, ayant une programmation de formation autour de l'improvisation théâtrale absolument géniale. C'est grace à cet endroit qu'ils purent suivre cette formation. À la tête de cette formation de comédie musicale improvisée se trouve un fameux barde connu et reconnu par ses pairs, nous le nommerons Antoine Lefort (antoinelefort.fr), un maître dans cette discipline. Ce fut une régalade. Nos 2 aventuriers ont chanté, improvisé, joué, appris tant de choses. Une parenthèse inoubliable qui leur donna les clés qui leur manquaient et la motivation pour enfin mettre en route ce projet délirant qu'est la comédie musicale improvisée.",
        },
        { style: "h2", text: "Et la MICIM fut" },
        {
            style: "normal",
            text: "Et ainsi naquit la MICIM : La Malicieuse et Intenable Compagnie d'Impro Musicale. Nos deux troubadours s'entourèrent d'autres fous, prêts à se lancer dans cette drôle d'aventure. Des comédiens et comédiennes improvisateurs talentueux.ses qui ont chacun.e leurs histoires, leur vécu, leurs expériences, leurs grains de folie, parce qu'il faut le reconnaître, il faut être un peu timbré pour monter sur scène et improviser une comédie musicale entière à partir de rien.",
        },
        { style: "h2", text: "Le voyage" },
        {
            style: "normal",
            text: "Durant toute cette première année, ils travaillèrent d'arrache-pied, sans s'arrêter, jusqu'à l'épuisement. Puis Marco dut prendre la route pour aller dans une contrée lointaine afin de retrouver notre barde Antoine Lefort pour faire un autre stage. Cette fois, le thème était le musicien au sein de la comédie musicale improvisée. Ce stage eut lieu au sein d'une école spécialisée dans la comédie musicale improvisée : IMPRO LALA (improlala.com). Et là encore, il en ressortit avec pleins de techniques, pleins d'informations, pleins de courage, plein d'envie, plein d'idées, plein de motivation pour accompagner les comédiennes et les comédiens dans cette aventure.",
        },
        { style: "h2", text: "Et c'est ainsi" },
        {
            style: "normal",
            text: "Enfin, en cette nouvelle année, la Micim accueille de nouveaux.elles comédiens.ennes et musiciens afin de surprendre et de proposer des comédies musicales improvisées encore meilleures, plus déjantées, plus drôles, plus dramatiques, plus surprenantes, plus folles !!! Ouais enfin mieux quoi !",
        },
        {
            style: "normal",
            text: "Voilà, vous savez tout. Enfin presque tout...",
        },
        {
            style: "normal",
            text: "Le reste de l'histoire se passe sur scène, c'est pour cela que vous n'avez plus d'autre choix que de venir voir la Micim lors d'une de ses prochaines représentations que vous retrouverez dans notre agenda.",
        },
        { style: "normal", text: "Chers amis.es lecteurs.rices, à bientôt" },
    ];

    await client.createOrReplace({
        _id: "associationPage",
        _type: "associationPage",
        body: paragraphs.map((p) => ({
            _type: "block",
            style: p.style,
            children: [{ _type: "span", text: p.text }],
        })),
    });
    console.log("  + associationPage (texte brut, à mettre en forme dans Studio)");
}

async function main() {
    console.log(`Migration vers le projet Sanity ${projectId} (dataset "${dataset}")`);

    await migrateSiteSettings();
    await migrateHomePage();
    await migrateAssociationPage();
    await migrateShows();

    console.log("\nMigration terminée.");
}

main().catch((error) => {
    console.error("\nLa migration a échoué :", error);
    process.exit(1);
});
