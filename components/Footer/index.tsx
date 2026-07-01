import Link from "next/link";
import SocialNetwork from "../SocialNetwork";

const Footer = () => {
    return (
        <footer className="footer__container">
            <SocialNetwork />
            <Link 
                href="/mentions-legales"
            >
                Mentions légales
            </Link>
        </footer>
    )
}

export default Footer;