import type { Metadata } from "next";
import "../styles/globals.scss";
import { Lato } from "next/font/google";
import { Limelight } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    title: "MICIM",
    description: "Troupe de Comédie Musicale Improvisée",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className={`${lato.className} ${limelight.variable}`}>
            <body className="">
                <div className="main__container">
                    <Header />
                    <main className="main-page__container">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
