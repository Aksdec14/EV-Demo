"use client";

import { useState, useEffect, useRef } from "react";
import ContactSection from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";

/* ── types ───────────────────────────────────────────── */
type Service = {
    title: string;
    desc: string;
    detail: string;
    img: string;
    tag: string;
    icon: string;
    badge?: string;
};

/* ── data ────────────────────────────────────────────── */
const services: Service[] = [
    {
        title: "EV Charging Stations",
        desc: "Fast and reliable EV charging infrastructure across cities.",
        detail:
            "Our DC fast chargers deliver up to 150 kW, giving your EV an 80% charge in under 30 minutes. Available across 25+ cities with real-time availability tracking.",
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
        tag: "Infrastructure",
        icon: "⚡",
        badge: "Most Popular",
    },
    {
        title: "Fleet Charging",
        desc: "Smart solutions for managing EV fleets efficiently.",
        detail:
            "Centralised fleet dashboard with scheduling, energy analytics, and per-vehicle billing. Perfect for logistics, cabs, and corporate fleets.",
        img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
        tag: "Fleet",
        icon: "🚗",
    },
    {
        title: "Energy Management",
        desc: "Optimize energy usage with smart monitoring systems.",
        detail:
            "AI-driven load balancing, solar integration, and real-time energy dashboards to cut costs and maximise green energy usage.",
        img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600&q=80",
        tag: "Technology",
        icon: "🔋",
    },
    {
        title: "Installation Services",
        desc: "Professional EV charger setup at your location.",
        detail:
            "End-to-end site survey, civil work, electrical setup, and certified charger installation within 72 hours of approval.",
        img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80",
        tag: "Infrastructure",
        icon: "🔧",
    },
    {
        title: "Maintenance & Support",
        desc: "24/7 support and maintenance for uninterrupted service.",
        detail:
            "Proactive remote diagnostics, on-site technicians within 4 hours, and a 99.5% uptime SLA backed by our nationwide service network.",
        img: "https://images.unsplash.com/photo-1581091215367-59ab6b0a61b6?w=600&q=80",
        tag: "Support",
        icon: "🛠",
        badge: "24 / 7",
    },
    {
        title: "Partner Program",
        desc: "Earn by hosting EV charging stations at your property.",
        detail:
            "Zero capex model — we install, maintain, and manage. You earn a revenue share on every kWh charged at your property.",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        tag: "Fleet",
        icon: "🤝",
    },
];

const ALL_TAGS = ["All", "Infrastructure", "Fleet", "Technology", "Support"];

const stats = [
    { value: 25, suffix: "+", label: "Cities Covered" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 150, suffix: "+", label: "Charging Stations" },
    { value: 24, suffix: "/7", label: "Support" },
];

/* ── animated counter hook ───────────────────────────── */
function useCounter(target: number, active: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!active) return;
        let start = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 30);
        return () => clearInterval(timer);
    }, [active, target]);
    return count;
}

/* ── stat item ───────────────────────────────────────── */
function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
    const count = useCounter(value, active);
    return (
        <div className="text-center group">
            <h3 className="text-4xl font-extrabold tracking-tight text-white">
                {count}<span className="text-green-300">{suffix}</span>
            </h3>
            <p className="text-sm text-green-100 mt-1">{label}</p>
        </div>
    );
}

/* ── service modal ────────────────────────────────────── */
function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ animation: "fadeIn .2s ease" }}
        >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* card */}
            <div
                className="relative bg-white rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl"
                style={{ animation: "slideUp .25s ease" }}
            >
                {/* image */}
                <div className="relative h-52 overflow-hidden">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {service.tag}
                    </span>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition"
                    >
                        ✕
                    </button>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="text-2xl">{service.icon}</span>
                        <h2 className="text-xl font-bold text-white">{service.title}</h2>
                    </div>
                </div>

                {/* body */}
                <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.detail}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                        >
                            Close
                        </button>
                        <a
                            href="/contact"
                            className="flex-1 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold text-center transition"
                        >
                            Get Started →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── service card ─────────────────────────────────────── */
function ServiceCard({ service, index, onClick }: { service: Service; index: number; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity .5s ease ${index * 80}ms, transform .5s ease ${index * 80}ms`,
                boxShadow: hovered ? "0 20px 40px rgba(34,197,94,.18)" : "0 2px 12px rgba(0,0,0,.06)",
            }}
        >
            {/* image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform .5s ease" }}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                    style={{ opacity: hovered ? 1 : 0.5, transition: "opacity .3s" }}
                />
                {/* tag pill */}
                <span className="absolute top-3 left-3 bg-white/90 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {service.tag}
                </span>
                {/* badge */}
                {service.badge && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {service.badge}
                    </span>
                )}
                {/* icon */}
                <span
                    className="absolute bottom-3 left-3 text-2xl"
                    style={{ transform: hovered ? "scale(1.2)" : "scale(1)", transition: "transform .3s" }}
                >
                    {service.icon}
                </span>
            </div>

            {/* body */}
            <div className="bg-white p-5">
                <h3 className="font-bold text-gray-900 mb-1.5 text-base">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                    <span
                        className="text-green-500 text-xs font-semibold"
                        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)", transition: "all .3s" }}
                    >
                        Learn more
                    </span>
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                        style={{
                            background: hovered ? "#16a34a" : "#22c55e",
                            transform: hovered ? "scale(1.1) rotate(45deg)" : "scale(1) rotate(0deg)",
                            transition: "all .3s",
                        }}
                    >
                        →
                    </div>
                </div>
            </div>

            {/* bottom green line */}
            <div
                className="absolute bottom-0 left-0 h-0.5 bg-green-500"
                style={{ width: hovered ? "100%" : "0%", transition: "width .4s ease" }}
            />
        </div>
    );
}

/* ── page ─────────────────────────────────────────────── */
export default function ServicesPage() {
    const [activeTag, setActiveTag] = useState("All");
    const [selected, setSelected] = useState<Service | null>(null);
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    const filtered = activeTag === "All" ? services : services.filter((s) => s.tag === activeTag);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes heroPan { 0%,100% { transform: scale(1.05) translateX(0) } 50% { transform: scale(1.1) translateX(-1%) } }
        @keyframes pulse-green { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.4) } 50% { box-shadow: 0 0 0 8px rgba(34,197,94,0) } }
      `}</style>

            <Header />

            <div className="bg-gray-50 min-h-screen">

                {/* ── HERO ───────────────────────────────────────── */}
                <section className="relative h-[300px] flex items-center justify-center text-white overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80"
                        alt="EV Charging"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ animation: "heroPan 12s ease-in-out infinite" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/70" />

                    <div className="relative text-center" style={{ animation: "slideUp .6s ease" }}>
                        <p className="text-green-400 text-[11px] uppercase tracking-[0.25em] font-bold mb-3">
                            EV-VoltGO
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 leading-tight">
                            EV Charging <span className="text-green-400">Services</span>
                        </h1>
                        <p className="text-gray-300 text-sm">Home &rsaquo; Services</p>
                    </div>

                    {/* floating stat pills */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 flex-wrap justify-center">
                        {["⚡ 150+ Stations", "🌍 25+ Cities", "⭐ 98% Satisfaction"].map((t) => (
                            <span key={t} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                                {t}
                            </span>
                        ))}
                    </div>
                </section>

                {/* ── SECTION HEADER ────────────────────────────── */}
                <section className="text-center py-14 px-6">
                    <p className="text-green-500 text-[11px] font-bold uppercase tracking-widest mb-2">Our Services</p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        Smart EV Charging <span className="text-green-500">Solutions</span>
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                        Explore our complete EV ecosystem designed to provide fast, reliable, and scalable charging solutions.
                    </p>

                    {/* ── FILTER TABS ─────────────────────────────── */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {ALL_TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                                style={{
                                    background: activeTag === tag ? "#22c55e" : "white",
                                    color: activeTag === tag ? "white" : "#6b7280",
                                    border: activeTag === tag ? "2px solid #22c55e" : "2px solid #e5e7eb",
                                    transform: activeTag === tag ? "scale(1.05)" : "scale(1)",
                                    boxShadow: activeTag === tag ? "0 4px 14px rgba(34,197,94,.35)" : "none",
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── SERVICES GRID ─────────────────────────────── */}
                <section className="max-w-6xl mx-auto px-6 pb-16">
                    <div
                        key={activeTag}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        style={{ animation: "fadeIn .3s ease" }}
                    >
                        {filtered.map((s, i) => (
                            <ServiceCard key={s.title} service={s} index={i} onClick={() => setSelected(s)} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <p className="text-center text-gray-400 py-20 text-sm">No services found for this category.</p>
                    )}
                </section>

                {/* ── STATS ─────────────────────────────────────── */}
                <section className="max-w-6xl mx-auto px-6 pb-20" ref={statsRef}>
                    <div className="bg-gradient-to-r from-green-700 to-green-500 text-white rounded-2xl p-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center relative overflow-hidden">
                        {/* decorative circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
                        {stats.map((s, i) => (
                            <StatItem key={i} {...s} active={statsVisible} />
                        ))}
                    </div>
                </section>

                {/* ── CTA STRIP ─────────────────────────────────── */}
                <section className="bg-white border-t border-gray-100 py-14 px-6 text-center">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                        Ready to electrify your space?
                    </h3>
                    <p className="text-gray-500 text-sm mb-7 max-w-md mx-auto">
                        Book a free consultation and our team will design the right EV charging solution for you.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-green-200"
                        style={{ animation: "pulse-green 2.5s infinite" }}
                    >
                        Book Free Consultation ⚡
                    </a>
                </section>

            </div>

            {/* ── MODAL ─────────────────────────────────────────── */}
            {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}

            <ContactSection />
            <Footer />
        </>
    );
}