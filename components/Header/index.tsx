"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CgMenuRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";

const Header = () => {
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
                        <Link
                            className="header__menu-navigation__link"
                            href="/agenda"
                            onClick={() => setDisplayMenu(false)}
                            role="menuitem"
                        >
                            Agenda
                        </Link>
                        <Link
                            className="header__menu-navigation__link"
                            href="/association"
                            onClick={() => setDisplayMenu(false)}
                            role="menuitem"
                        >
                            La Micim
                        </Link>
                        <Link
                            className="header__menu-navigation__link"
                            href="https://www.tipaix.fr"
                            onClick={() => setDisplayMenu(false)}
                            target="_blank"
                            role="menuitem"
                            rel="noopener noreferrer"
                        >
                            La Tipaix
                        </Link>
                        <Link
                            className="header__menu-navigation__link"
                            href="/contact"
                            onClick={() => setDisplayMenu(false)}
                            role="menuitem"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
