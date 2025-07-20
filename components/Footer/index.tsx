import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer__container">
            <Link 
                href="/mentions-legales"
            >
                Mentions légales
            </Link>
        </footer>
    )
}

export default Footer;