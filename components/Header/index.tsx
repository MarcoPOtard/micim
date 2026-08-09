"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CgMenuRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import SocialNetwork from "../SocialNetwork";
import type { NavigationLink, SocialLink } from "@/lib/sanity/queries";

type HeaderProps = {
    navigationLinks: NavigationLink[];
    socialLinks: SocialLink[];
};

const Header = ({ navigationLinks, socialLinks }: HeaderProps) => {
    const [displayMenu, setDisplayMenu] = useState(false);

    // Handle escape key to close menu
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && displayMenu) {
                setDisplayMenu(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [displayMenu]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (displayMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [displayMenu]);

    return (
        <header className="header__container">
            <nav className="header__nav">
                <Link
                    onClick={() => setDisplayMenu(false)}
                    href="/"
                    className="header__nav-home"
                >
                    <Image
                        src="/logo/logo-MICIM.png"
                        alt="Logo MICIM"
                        width={70}
                        height={70}
                        className="header__nav-logo"
                        />
                </Link>
                <div className="header__menu-container">
                    <button
                        onClick={() => setDisplayMenu(!displayMenu)}
                        className="header__menu-button"
                        aria-expanded={displayMenu}
                        aria-controls="mobile-menu"
                        aria-label={displayMenu ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        {displayMenu ? (
                            <CgClose className="header__menu-icon" aria-hidden="true" />
                        ) : (
                            <CgMenuRight className="header__menu-icon" aria-hidden="true" />
                        )}
                    </button>
                    <div
                        id="mobile-menu"
                        data-menu-display={displayMenu}
                        className="header__menu-navigation-container"
                        role="menu"
                        aria-hidden={!displayMenu}
                    >
                        {navigationLinks.map((link) => {
                            const isExternal = link.href.startsWith("http");
                            return (
                                <Link
                                    key={link.href}
                                    className="header__menu-navigation__link"
                                    href={link.href}
                                    onClick={() => setDisplayMenu(false)}
                                    role="menuitem"
                                    {...(isExternal && {
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                    })}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <SocialNetwork links={socialLinks} />

                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
