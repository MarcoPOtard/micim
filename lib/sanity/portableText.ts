import type { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

function isSpan(child: unknown): child is PortableTextSpan {
    return (
        typeof child === "object" &&
        child !== null &&
        (child as { _type?: string })._type === "span"
    );
}

// Concatène le texte brut d'un contenu Portable Text, pour les meta
// descriptions et les données structurées (JSON-LD) qui n'acceptent que
// du texte simple.
export function portableTextToPlainText(
    blocks: PortableTextBlock[] | undefined | null
): string {
    if (!blocks) return "";

    return blocks
        .map((block) => {
            if (block._type !== "block" || !Array.isArray(block.children)) {
                return "";
            }
            return block.children
                .filter(isSpan)
                .map((span) => span.text)
                .join("");
        })
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
}
