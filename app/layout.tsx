import type { Metadata } from "next";
import "../styles/globals.scss";
import { Lato } from "next/font/google";
import { Limelight } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

const lato = Lato({
    subsets: ["latin"],
    weight: ["300", "400", "900"],
});

const limelight = Limelight({
    subsets: ["latin"],
    variable: "--font-limelight",
    weight: "400",
});

export const metadata: Metadata = {
    title: {
        template: '%s | MICIM',
        default: 'MICIM - Troupe de Comédie Musicale Improvisée à Aix-en-Provence'
    },
    description: 'MICIM est une troupe de comédie musicale improvisée basée à Aix-en-Provence. Découvrez nos spectacles uniques où tout est improvisé en direct.',
    keywords: ['comédie musicale', 'improvisation', 'théâtre', 'Aix-en-Provence', 'spectacle', 'troupe', 'MICIM'],
    authors: [{ name: 'MICIM' }],
    creator: 'MICIM',
    publisher: 'MICIM',
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://micim.fr',
        siteName: 'MICIM',
        title: 'MICIM - Troupe de Comédie Musicale Improvisée',
        description: 'MICIM est une troupe de comédie musicale improvisée basée à Aix-en-Provence. Découvrez nos spectacles uniques où tout est improvisé en direct.',
        images: [{
            url: '/images/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'MICIM - Troupe de Comédie Musicale Improvisée'
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MICIM - Troupe de Comédie Musicale Improvisée',
        description: 'MICIM est une troupe de comédie musicale improvisée basée à Aix-en-Provence.',
        images: ['/images/og-image.jpg']
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
    verification: {
        google: 'your-google-verification-code'
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={`${lato.className} ${limelight.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#72377b" />

                <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="Micim" />


                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="">
                <StructuredData 
                    type="organization" 
                    data={{}}
                />
                <div className="main__container">
                    <Header />
                    <main className="main-page__container">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
