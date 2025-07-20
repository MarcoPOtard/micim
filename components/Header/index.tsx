"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";

const Header = () => {
    const [displayMenu, setDisplayMenu] = useState(false);

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
                        className="headers__menu-button"
                    >
                        {displayMenu ? (
                            <CgClose className="header__menu-icon" />
                        ) : (
                            <CgMenuRight className="header__menu-icon" />
                        )}
                    </button>
                    <div
                        data-menu-display={displayMenu}
                        className="header__menu-navigation-container"
                    >
                        <Link
                            className="header__menu-navigation__link"
                            href="/agenda"
                            onClick={() => setDisplayMenu(false)}
                        >
                            Agenda
                        </Link>
                        <Link
                            className="header__menu-navigation__link"
                            href="/association"
                            onClick={() => setDisplayMenu(false)}
                        >
                            L&lsquo;Asso
                        </Link>
                        <Link
                            className="header__menu-navigation__link"
                            href="/troupe"
                            onClick={() => setDisplayMenu(false)}
                        >
                            La troupe
                        </Link>
                        <Link
                            className="header__menu-navigation__link"
                            href="https://www.tipaix.fr"
                            onClick={() => setDisplayMenu(false)}
                            target="_blank"
                        >
                            La Tipaix
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
