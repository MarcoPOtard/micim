import Link from "next/link";
import SocialNetwork from "../SocialNetwork";
import type { SocialLink } from "@/lib/sanity/queries";

const Footer = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
    return (
        <footer className="footer__container">
            <SocialNetwork links={socialLinks} />
            <Link
                href="/mentions-legales"
            >
                Mentions légales
            </Link>
        </footer>
    )
}

export default Footer;
