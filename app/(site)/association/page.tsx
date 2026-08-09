import { Metadata } from "next";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { getAssociationPage } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
    const associationPage = await getAssociationPage();

    return {
        title: associationPage?.seo?.metaTitle ?? "L'association MICIM",
        description:
            associationPage?.seo?.metaDescription ??
            "Découvrez lassociation MICIM : La Malicieuse et Intenable Compagnie d'Impro Musicale. Notre vocation, nos ateliers et notre philosophie artistique.",
        keywords: [
            "association MICIM",
            "compagnie improvisation musicale",
            "ateliers théâtre",
            "formation impro",
            "association artistique",
        ],
        openGraph: {
            title: "L&apos;association MICIM - Compagnie d'Improvisation Musicale",
            description:
                "La MICIM réunit des passionnés de théâtre d'improvisation et de comédie musicale improvisée à Aix-en-Provence.",
            images: [associationPage?.seo?.shareImageUrl ?? "/images/og-image.jpg"],
        },
    };
}

const ptComponents: PortableTextComponents = {
    marks: {
        link: ({ children, value }) => {
            const href: string = value?.href ?? "#";
            const isExternal = href.startsWith("http");
            return (
                <Link
                    href={href}
                    className="link"
                    {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                    })}
                >
                    {children}
                </Link>
            );
        },
    },
};

export default async function Association() {
    const associationPage = await getAssociationPage();

    if (!associationPage?.body?.length) {
        return (
            <div className="pages-container">
                <h1>Il était une fois la Micim ?</h1>
                <p>
                    Le contenu de cette page n&apos;a pas encore été renseigné
                    dans le back-office. Retrouvez-nous en attendant dans
                    notre{" "}
                    <Link href="/agenda" className="link">
                        agenda
                    </Link>
                    .
                </p>
            </div>
        );
    }

    return (
        <div className="pages-container">
            <h1>Il était une fois la Micim ?</h1>
            <PortableText value={associationPage.body} components={ptComponents} />
        </div>
    );
}
