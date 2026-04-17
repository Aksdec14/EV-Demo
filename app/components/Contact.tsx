"use client";

import React, { useState } from "react";

const services = [
    "Fast Charging",
    "Fleet Management",
    "Renewable Energy",
    "Quality Charge",
    "Installation",
    "Maintenance",
];

const socialLinks = [
    {
        label: "Facebook",
        href: "#",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
    {
        label: "Twitter",
        href: "#",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
        ),
    },
    {
        label: "Pinterest",
        href: "#",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.21 1.23-5.21s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.57 2.25-.87 3.5-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.09-2.37 3.09-5.18 0-2.14-1.44-3.64-3.5-3.64-2.38 0-3.78 1.79-3.78 3.63 0 .72.28 1.49.62 1.91.07.08.08.16.06.24-.06.26-.2.83-.23.94-.04.15-.13.18-.3.11-1.12-.52-1.82-2.17-1.82-3.49 0-2.84 2.06-5.45 5.94-5.45 3.12 0 5.55 2.22 5.55 5.19 0 3.1-1.95 5.59-4.66 5.59-.91 0-1.77-.47-2.06-1.03l-.56 2.09c-.2.78-.75 1.76-1.12 2.36.85.26 1.74.4 2.67.4 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "#",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1" />
            </svg>
        ),
    },
    {
        label: "YouTube",
        href: "#",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
            </svg>
        ),
    },
];

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
                    ...formData,
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Message sent successfully!");
                setFormData({ name: "", email: "", phone: "", service: "", message: "" });
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch {
            alert("Network error. Please check your connection.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">

            {/* ── Main Content ── */}
            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* ── Left: Form ── */}
                    <div className="flex-1">
                        {/* Section label */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="block w-6 h-0.5 bg-green-600" />
                            <span className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
                                Contact Us
                            </span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 leading-tight">
                            Get Your Free Quote Today!
                        </h2>

                        <div className="space-y-5">
                            {/* Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                        Your Name <span className="text-green-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ex. John Doe"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                        Email <span className="text-green-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@gmail.com"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                        Phone <span className="text-green-600">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter Phone Number"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                        Service <span className="text-green-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition pr-10"
                                        >
                                            <option value="" disabled>
                                                Select Services
                                            </option>
                                            {services.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                    Your Message <span className="text-green-600">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Enter here.."
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm px-8 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                            >
                                Book a Services
                            </button>
                        </div>
                    </div>

                    {/* ── Right: Info Card ── */}
                    <div className="lg:w-80 xl:w-96">
                        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#0f766e" }}>
                            {/* Address */}
                            <div className="px-8 pt-8 pb-6 border-b border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Address</h3>
                                <p className="text-sm text-green-100 leading-relaxed">
                                    42, Nariman Point,
                                    <br />
                                    Mumbai, Maharashtra 400021
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="px-8 py-6 border-b border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Contact</h3>
                                <div className="space-y-1.5 text-sm text-green-100">
                                    <p>
                                        <span className="text-white/60">Phone : </span>+91 98765-43210
                                    </p>
                                    <p>
                                        <span className="text-white/60">Email : </span>
                                        example@gmail.com
                                    </p>
                                </div>
                            </div>

                            {/* Open Time */}
                            <div className="px-8 py-6 border-b border-white/10">
                                <h3 className="text-lg font-bold text-white mb-3">Open Time</h3>
                                <div className="space-y-1.5 text-sm text-green-100">
                                    <p>
                                        <span className="text-white/60">Monday – Friday : </span>
                                        10:00 – 20:00
                                    </p>
                                    <p>
                                        <span className="text-white/60">Saturday – Sunday : </span>
                                        11:00 – 18:00
                                    </p>
                                </div>
                            </div>

                            {/* Stay Connected */}
                            <div className="px-8 py-6">
                                <h3 className="text-lg font-bold text-white mb-4">
                                    Stay Connected
                                </h3>
                                <div className="flex items-center gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            aria-label={social.label}
                                            className="w-10 h-10 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center text-gray-900 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Map Section ── */}
            <div className="max-w-6xl mx-auto px-6 pb-16">
                <div className="rounded-2xl overflow-hidden h-72 shadow-sm border border-gray-200">
                    <iframe
                        title="Location Map"
                        className="w-full h-full"
                        loading="lazy"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=72.8100%2C18.9200%2C72.8500%2C18.9600&layer=mapnik&marker=18.9388%2C72.8354"
                        style={{ border: 0, filter: "grayscale(100%) contrast(1.05) brightness(1.05)" }}
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}