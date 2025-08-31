import { ContactForm } from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contactez la MICIM",
    description:
        "La MICIM est aussi une associtation, retrouver ici les informations la concernant",
};

export default function Contact() {
    return (
        <div className="pages-container">
            <h1>Contactez nous</h1>
            <p>
                Vous souhaitez avoir des informations, vous avez des questions
                ou vous souhaitez juste nous dire comment nous sommes géniaux ?
                <br />
                N&lsquo;hésitez pas, notre formulaire est là pour vous !
            </p>
            <ContactForm />
        </div>
    );
}
