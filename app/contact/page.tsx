import { ContactForm } from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contactez-nous",
    description: "Vous avez des questions sur nos spectacles ou souhaitez nous rejoindre ? Contactez la troupe MICIM via notre formulaire de contact.",
    keywords: ['contact MICIM', 'formulaire contact', 'questions spectacles', 'rejoindre troupe', 'information comédie musicale'],
    openGraph: {
        title: "Contactez la troupe MICIM",
        description: "Une question, une envie de nous rejoindre ? N'hésitez pas à nous contacter !",
        images: ['/images/og-image.jpg'],
    }
};

export default function Contact() {
    return (
        <div className="pages-container">
            <h1>Contactez nous</h1>
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
