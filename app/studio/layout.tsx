import { NextStudioLayout } from "next-sanity/studio";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body>
                <NextStudioLayout>{children}</NextStudioLayout>
            </body>
        </html>
    );
}
