"use client";
import { useState, useEffect } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isSignedIn } = useUser();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projects" },
        { label: "Blogs", href: "/blogs" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header className="w-full">

            {/* TOP BAR */}
            <div className="bg-gray-950 border-b border-green-900/40 py-2 px-4 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-400">

                    {/* Left - Contact Info */}
                    <div className="flex items-center gap-6">
                        <a href="mailto:info@evdrivex.com" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            info@evdrivex.com
                        </a>
                        <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +91 98765 43210
                        </a>
                        <span className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Open Hours: 9:00 - 18:30
                        </span>
                    </div>

                    {/* Right - Social Icons */}
                    <div className="flex items-center gap-2">
                        {["f", "in", "tw", "yt"].map((s) => (
                            <a
                                key={s}
                                href="#"
                                className="w-6 h-6 rounded-full border border-green-900/50 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all text-xs font-bold uppercase"
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* MAIN NAVBAR */}
            <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg shadow-green-900/10" : ""} bg-gray-900/95 backdrop-blur-md border-b border-green-900/30`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    {/* LOGO */}
                    <a href="/" className="flex items-center gap-2.5 no-underline">
                        <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                            </svg>
                        </div>
                        <span className="text-white text-xl font-bold tracking-wide">
                            EV<span className="text-green-400">driveX</span>
                        </span>
                    </a>

                    {/* DESKTOP NAV LINKS */}
                    <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-green-400 rounded-md hover:bg-green-400/10 transition-all duration-200 no-underline block"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* RIGHT SIDE - Auth + CTA */}
                    <div className="hidden lg:flex items-center gap-3">

                        {/* Search Icon */}
                        <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-md transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Clerk Auth */}
                        {isSignedIn ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <>
                                <SignInButton mode="modal">
                                    <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-green-400 hover:bg-green-400/10 rounded-md transition-all border border-gray-700 hover:border-green-500">
                                        Login
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="px-4 py-2 text-sm font-semibold bg-green-500 hover:bg-green-400 text-black rounded-md transition-all shadow-md shadow-green-500/20">
                                        Get a Quote
                                    </button>
                                </SignUpButton>
                            </>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="lg:hidden w-9 h-9 flex items-center justify-center text-gray-300 hover:text-green-400 rounded-md hover:bg-green-400/10 transition-all"
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
                    <div className="lg:hidden bg-gray-900 border-t border-green-900/30 px-4 py-4">
                        <ul className="flex flex-col gap-1 list-none mb-4 p-0">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-green-400 hover:bg-green-400/10 rounded-md transition-all no-underline"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-2 pt-3 border-t border-green-900/30">
                            {isSignedIn ? (
                                <UserButton afterSignOutUrl="/" />
                            ) : (
                                <>
                                    <SignInButton mode="modal">
                                        <button className="w-full py-2.5 text-sm font-medium text-gray-300 border border-gray-700 hover:border-green-500 hover:text-green-400 rounded-md transition-all">
                                            Login
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="w-full py-2.5 text-sm font-semibold bg-green-500 hover:bg-green-400 text-black rounded-md transition-all">
                                            Get a Quote
                                        </button>
                                    </SignUpButton>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}