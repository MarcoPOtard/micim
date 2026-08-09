import type { Metadata, Viewport } from "next";
import "../../styles/globals.scss";
import { Lato } from "next/font/google";
import { Limelight } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { getSiteSettings } from "@/lib/sanity/queries";
import {
    DEFAULT_NAVIGATION_LINKS,
    DEFAULT_SOCIAL_LINKS,
} from "@/lib/sanity/defaults";

const lato = Lato({
    subsets: ["latin"],
    weight: ["300", "400", "900"],
});

const limelight = Limelight({
    subsets: ["latin"],
    variable: "--font-limelight",
    weight: "400",
});

const DEFAULT_TITLE =
    "MICIM - Troupe de Comédie Musicale Improvisée à Aix-en-Provence";
const DEFAULT_DESCRIPTION =
    "MICIM est une troupe de comédie musicale improvisée basée à Aix-en-Provence. Découvrez nos spectacles uniques où tout est improvisé en direct.";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    const titleTemplate = settings?.titleTemplate ?? "%s | MICIM";
    const defaultTitle = settings?.siteTitle
        ? `${settings.siteTitle} - Troupe de Comédie Musicale Improvisée à Aix-en-Provence`
        : DEFAULT_TITLE;
    const description = settings?.defaultDescription ?? DEFAULT_DESCRIPTION;
    const keywords = settings?.defaultKeywords ?? [
        "comédie musicale",
        "improvisation",
        "théâtre",
        "Aix-en-Provence",
        "spectacle",
        "troupe",
        "MICIM",
    ];
    const shareImage = settings?.defaultShareImageUrl ?? "/images/og-image.jpg";

    return {
        metadataBase: new URL("https://micim.fr"),
        title: {
            template: titleTemplate,
            default: defaultTitle,
        },
        description,
        keywords,
        authors: [{ name: "MICIM" }],
        creator: "MICIM",
        publisher: "MICIM",
        appleWebApp: {
            title: "Micim",
        },
        openGraph: {
            type: "website",
            locale: "fr_FR",
            url: "https://micim.fr",
            siteName: settings?.siteTitle ?? "MICIM",
            title: defaultTitle,
            description,
            images: [
                {
                    url: shareImage,
                    width: 1200,
                    height: 630,
                    alt: defaultTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: defaultTitle,
            description,
            images: [shareImage],
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#72377b",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getSiteSettings();
    const navigationLinks = settings?.navigationLinks?.length
        ? settings.navigationLinks
        : DEFAULT_NAVIGATION_LINKS;
    const socialLinks = settings?.socialLinks?.length
        ? settings.socialLinks
        : DEFAULT_SOCIAL_LINKS;

    return (
        <html lang="fr" className={`${lato.className} ${limelight.variable}`}>
            <body className="">
                <StructuredData
                    type="organization"
                    data={{}}
                />
                <div className="main__container">
                    <Header
                        navigationLinks={navigationLinks}
                        socialLinks={socialLinks}
                    />
                    <main className="main-page__container">{children}</main>
                    <Footer socialLinks={socialLinks} />
                </div>
            </body>
        </html>
    );
}
