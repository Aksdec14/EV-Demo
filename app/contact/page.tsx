"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
    const [open, setOpen] = useState<number | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const faqs = [
        {
            q: "How do I find EV charging stations near me?",
            a: "Use the EV-VoltGO app or website to locate the nearest charging station in real time across 10+ cities.",
        },
        {
            q: "How fast are EV-VoltGO charging stations?",
            a: "Our fast chargers deliver up to 150 kW DC, giving most EVs an 80% charge in under 30 minutes.",
        },
        {
            q: "Can businesses partner with EV-VoltGO?",
            a: "Absolutely! We offer flexible B2B partnership models for malls, hotels, offices, and fuel stations.",
        },
    ];

    const features = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
            ),
            title: "Technological Innovation",
            desc: "Cutting-edge EV charging hardware and software designed for reliability, speed, and seamless user experience across every station.",
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                </svg>
            ),
            title: "Creativity Designs",
            desc: "Thoughtfully designed stations that blend into urban and commercial spaces, making EV charging intuitive and visually appealing.",
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
            title: "Custom Support",
            desc: "Our dedicated support team is available 24/7 to assist drivers, fleet managers, and business partners with any queries.",
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                </svg>
            ),
            title: "Project Management",
            desc: "End-to-end deployment and management of EV charging infrastructure for businesses, townships, and commercial complexes.",
        },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // 🔑 Replace with your key
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: "New EV-VoltGO Contact Enquiry",
                }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <>
            <Header />
            <div className="bg-white font-sans">

                {/* ── HERO + FORM ─────────────────────────────────────────── */}
                <section className="relative min-h-[520px] flex items-center overflow-hidden">

                    {/* Background image with dark overlay */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&auto=format&fit=crop&q=80"
                            alt="EV Charging background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/65" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT — Hero Text */}
                        <div>
                            <p className="text-green-400 text-[11px] font-bold uppercase tracking-widest mb-3">
                                We Power EV Mobility
                            </p>
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
                                We Provide <span className="text-green-400">Fast & Reliable</span>{" "}
                                EV Charging Solutions
                            </h1>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-8">
                                We care to deliver and craft adaptive EV charging networks and
                                solutions for our customers to achieve seamless electric mobility.
                                We always take attention to every detail within our work.
                            </p>
                            <div className="flex items-center gap-5 flex-wrap">
                                <button className="bg-green-500 hover:bg-green-400 text-white px-7 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-green-900/40">
                                    Let's Start
                                </button>
                                <p className="text-gray-400 text-xs">
                                    We Hope To Listen<br />From You Soon
                                </p>
                            </div>
                        </div>

                        {/* RIGHT — Floating Form Card */}
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full ml-auto">

                            {/* Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                                Get Started Today
                            </h3>
                            <p className="text-gray-400 text-xs text-center mb-6">
                                Everything you need to grow your business.<br />Order our services today!
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-3">

                                {/* Name */}
                                <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 gap-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.8} className="w-4 h-4 shrink-0">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        required
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 gap-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.8} className="w-4 h-4 shrink-0">
                                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="flex items-center border border-gray-200 rounded-md px-3 py-2.5 gap-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.8} className="w-4 h-4 shrink-0">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.1 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        className="w-full text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-semibold text-sm transition-all hover:scale-[1.02] disabled:opacity-60"
                                >
                                    {status === "sending" ? "Sending…" : "Submit"}
                                </button>

                                {status === "success" && (
                                    <p className="text-green-600 text-xs text-center font-medium">
                                        ✅ Message sent! We'll get back to you soon.
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-red-500 text-xs text-center font-medium">
                                        ❌ Something went wrong. Please try again.
                                    </p>
                                )}
                            </form>

                        </div>
                    </div>
                </section>


                {/* ── TAGLINE SECTION ─────────────────────────────────────── */}
                <section className="py-16 px-6 text-center max-w-3xl mx-auto">
                    <p className="text-gray-500 text-lg leading-relaxed">
                        We Always Take Attention to Every Details Within Work. We Care to
                        Deliver and Craft{" "}
                        <strong className="text-gray-900">Adaptive Services</strong> and
                        Solutions to Our Customers to Achieve and{" "}
                        <strong className="text-gray-900">Satisfy Their Needs.</strong>
                    </p>
                </section>


                {/* ── FEATURES GRID ───────────────────────────────────────── */}
                <section className="pb-20 px-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
                        {features.map((f, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                                    {f.icon}
                                </div>
                                <h4 className="font-bold text-gray-800 mb-2 text-sm">{f.title}</h4>
                                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/* ── FAQ SECTION ─────────────────────────────────────────── */}
                <section className="py-20 px-6 bg-white text-center">
                    <p className="text-green-500 text-[11px] font-bold uppercase tracking-widest mb-2">FAQ</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">
                        You've got questions, we've got{" "}
                        <span className="text-green-500">answers</span>
                    </h2>
                    <div className="max-w-2xl mx-auto space-y-3 text-left">
                        {faqs.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setOpen(open === i ? null : i)}
                                className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-800 text-sm">{item.q}</p>
                                    <span className="text-green-500 text-xl font-light ml-3">
                                        {open === i ? "−" : "+"}
                                    </span>
                                </div>
                                {open === i && (
                                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">{item.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
}