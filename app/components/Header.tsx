"use client";
import { useState, useEffect } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header className="w-full">

            {/* MAIN NAVBAR */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-gray-100 ${scrolled ? "shadow-md shadow-gray-200/60" : ""}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    {/* LOGO */}
                    <a href="/" className="flex items-center gap-2.5 no-underline">
                        <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-md shadow-green-300/40">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                            </svg>
                        </div>
                        <span className="text-gray-900 text-xl font-bold tracking-wide">
                            EV<span className="text-green-500">VoltGO</span>
                        </span>
                    </a>

                    {/* DESKTOP NAV LINKS */}
                    <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-500 rounded-md hover:bg-green-50 transition-all duration-200 no-underline block"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* RIGHT SIDE - Become a Partner */}
                    <div className="hidden lg:flex items-center">
                        <a
                            href="/partner/register"
                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md transition-all duration-200 shadow-sm shadow-green-200 no-underline"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                            </svg>
                            Become a Partner
                        </a>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="lg:hidden w-9 h-9 flex items-center justify-center text-gray-600 hover:text-green-500 rounded-md hover:bg-green-50 transition-all"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* MOBILE MENU */}
                {menuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4">
                        <ul className="flex flex-col gap-1 list-none mb-4 p-0">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-md transition-all no-underline"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-3 border-t border-gray-100">
                            <a
                                href="/partner/register"
                                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold bg-green-500 hover:bg-green-600 text-white rounded-md transition-all no-underline"
                                onClick={() => setMenuOpen(false)}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                                </svg>
                                Become a Partner
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}