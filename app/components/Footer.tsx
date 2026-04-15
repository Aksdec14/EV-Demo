"use client";

import React, { useState } from "react";
import Link from "next/link";

const footerLinks = {
    Services: [
        { label: "Fast Charging", href: "#" },
        { label: "Fleet Management", href: "#" },
        { label: "Renewable Energy", href: "#" },
        { label: "Quality Charge", href: "#" },
        { label: "Installation", href: "#" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "News", href: "#" },
    ],
    Resources: [
        { label: "Documentation", href: "#" },
        { label: "Projects", href: "#" },
        { label: "Press Conferences", href: "#" },
        { label: "Contact", href: "#" },
    ],
};

const socialLinks = [
    {
        label: "Twitter",
        href: "#",
        path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
    },
    {
        label: "Facebook",
        href: "#",
        path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    },
    {
        label: "LinkedIn",
        href: "#",
        path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    },
    {
        label: "YouTube",
        href: "#",
        path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z",
    },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="w-full bg-white relative overflow-hidden">

            {/* ── Decorative soft blobs ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-green-100/60 blur-3xl" />
                <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-green-50/80 blur-3xl" />
            </div>

            {/* ── Newsletter Band (solid green) ── */}
            <div className="relative z-10 bg-green-500">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">

                    {/* Left */}
                    <div className="text-center lg:text-left">
                        <p className="text-xs font-semibold tracking-widest text-green-100 uppercase mb-1.5">
                            Stay in the loop
                        </p>
                        <h3 className="text-white font-extrabold text-2xl sm:text-3xl leading-snug">
                            Join our newsletter to{" "}
                            <span className="text-green-950">keep up to date</span> with us!
                        </h3>
                    </div>

                    {/* Right — input */}
                    <div className="flex w-full lg:w-auto min-w-0 lg:min-w-[400px] shadow-xl shadow-green-700/20">
                        <div className="flex flex-1 items-center bg-white rounded-l-xl px-4 py-3 gap-2.5 focus-within:ring-2 focus-within:ring-green-300 transition-all duration-200">
                            <svg
                                className="w-4 h-4 text-green-500 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                placeholder="Enter your email address"
                                className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none w-full"
                            />
                        </div>
                        <button
                            onClick={handleSubscribe}
                            className={`shrink-0 px-6 py-3 text-sm font-bold rounded-r-xl transition-all duration-200 ${subscribed
                                    ? "bg-green-900 text-white"
                                    : "bg-gray-900 hover:bg-gray-800 active:scale-95 text-white"
                                }`}
                        >
                            {subscribed ? "✓ Done!" : "Subscribe →"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Main Body ── */}
            <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 py-16">
                <div className="flex flex-col lg:flex-row gap-14">

                    {/* ── Brand Column ── */}
                    <div className="lg:w-80 shrink-0">
                        {/* Logo */}
                        <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-400/30 group-hover:shadow-green-500/50 transition-all duration-300">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight">
                                <span className="text-gray-900">EV</span>
                                <span className="text-green-500">driveX</span>
                            </span>
                        </Link>

                        <p className="text-sm text-gray-500 leading-relaxed mb-8">
                            Accelerating the world's transition to sustainable energy with
                            reliable, smart EV charging solutions — for homes, fleets, and cities.
                        </p>

                        {/* Contact info */}
                        <div className="space-y-3 mb-8">
                            <a
                                href="mailto:info@evdrivex.com"
                                className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-600 transition-colors duration-200 group"
                            >
                                <span className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 group-hover:border-green-300 group-hover:bg-green-100 flex items-center justify-center transition-all duration-200 shrink-0">
                                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                info@evdrivex.com
                            </a>
                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-600 transition-colors duration-200 group"
                            >
                                <span className="w-8 h-8 rounded-lg bg-green-50 border border-green-100 group-hover:border-green-300 group-hover:bg-green-100 flex items-center justify-center transition-all duration-200 shrink-0">
                                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </span>
                                +91 98765 43210
                            </a>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-2.5">
                            {socialLinks.map(({ label, href, path }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 flex items-center justify-center text-gray-400 hover:text-green-500 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Link Columns ── */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:pt-2">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="w-1 h-4 rounded-full bg-green-500 inline-block shrink-0" />
                                    <h4 className="text-gray-900 font-bold text-xs uppercase tracking-widest">
                                        {category}
                                    </h4>
                                </div>
                                <ul className="space-y-3.5">
                                    {links.map(({ label, href }) => (
                                        <li key={label}>
                                            <Link
                                                href={href}
                                                className="group flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors duration-200"
                                            >
                                                <span className="w-0 group-hover:w-3 h-px bg-green-500 transition-all duration-200 shrink-0 overflow-hidden" />
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="relative z-10 border-t border-gray-100 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()}{" "}
                        <span className="text-gray-600 font-semibold">EVdriveX</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs text-gray-400 hover:text-green-500 transition-colors duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}