import { ContactForm } from "@/components/ContactForm";
import SocialNetwork from "@/components/SocialNetwork";
import { Metadata } from "next";
import { getContactPage, getSiteSettings } from "@/lib/sanity/queries";
import { DEFAULT_SOCIAL_LINKS } from "@/lib/sanity/defaults";

export async function generateMetadata(): Promise<Metadata> {
    const contactPage = await getContactPage();

    return {
        title: contactPage?.seo?.metaTitle ?? "Contactez-nous",
        description:
            contactPage?.seo?.metaDescription ??
            "Vous avez des questions sur nos spectacles ou souhaitez nous rejoindre ? Contactez la troupe MICIM via notre formulaire de contact.",
        keywords: ['contact MICIM', 'formulaire contact', 'questions spectacles', 'rejoindre troupe', 'information comédie musicale'],
        openGraph: {
            title: "Contactez la troupe MICIM",
            description: "Une question, une envie de nous rejoindre ? N'hésitez pas à nous contacter !",
            images: [contactPage?.seo?.shareImageUrl ?? '/images/og-image.jpg'],
        }
    };
}

export default async function Contact() {
    const settings = await getSiteSettings();
    const socialLinks = settings?.socialLinks?.length
        ? settings.socialLinks
        : DEFAULT_SOCIAL_LINKS;

    return (
        <div className="pages-container">
            <h1>Contactez nous</h1>
            <div className="text-center">
                <p>
                    Retrouvez nous sur les réseaux sociaux :
                </p>
                <SocialNetwork links={socialLinks} />
            </div>
            <p>
                Vous souhaitez avoir des informations, vous avez des questions
                ou vous souhaitez juste nous dire comment nous sommes géniaux ?
                <br />
                N&lsquo;hésitez pas, notre formulaire est là pour vous ! Vous pouvez également vous inscrire à notre newsletter pour être informé(e) de nos prochains spectacles.
            </p>
            <ContactForm />
        </div>
    );
}
