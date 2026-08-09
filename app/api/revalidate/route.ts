import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
    _type: string;
};

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody<WebhookPayload>(
            req,
            process.env.SANITY_REVALIDATE_SECRET
        );

        if (!isValidSignature) {
            return NextResponse.json(
                { message: "Invalid signature" },
                { status: 401 }
            );
        }

        if (!body?._type) {
            return NextResponse.json({ message: "Bad Request" }, { status: 400 });
        }

        // Un webhook a besoin d'une expiration immédiate, contrairement au
        // profil "max" (stale-while-revalidate) recommandé par défaut.
        revalidateTag(body._type, { expire: 0 });

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            type: body._type,
        });
    } catch (error) {
        console.error("Error revalidating Sanity webhook:", error);
        return NextResponse.json(
            { message: "Error revalidating" },
            { status: 500 }
        );
    }
}
