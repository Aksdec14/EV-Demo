"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="bg-white">

                {/* ─── HERO SECTION ───────────────────────── */}
                <section className="relative bg-white overflow-hidden">

                    <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT CONTENT */}
                        <div className="z-10">

                            {/* Label */}
                            <p className="text-green-600 text-xs font-bold uppercase tracking-widest mb-3">
                                EV-VoltGO Platform
                            </p>

                            {/* Heading */}
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                                Empowering Your{" "}
                                <span className="text-green-500">EV Journey</span>
                            </h1>

                            {/* Description */}
                            <p className="text-gray-600 max-w-md mb-6">
                                EV-VoltGO delivers fast, reliable, and smart EV charging solutions
                                designed to power the future of mobility in India. From cities to highways,
                                we ensure seamless charging everywhere.
                            </p>

                            {/* CTA BUTTONS */}
                            <div className="flex gap-4 mb-8">
                                <button className="bg-green-500 px-6 py-3 rounded-md font-semibold text-white hover:bg-green-600 transition">
                                    Get Started
                                </button>

                                <button className="border border-green-500 px-6 py-3 rounded-md text-green-600 font-semibold hover:bg-green-500 hover:text-white transition">
                                    Explore Network
                                </button>
                            </div>

                            {/* STATS */}
                            <div className="flex flex-wrap gap-6">
                                {[
                                    { value: "500+", label: "Charging Points" },
                                    { value: "10+", label: "Cities" },
                                    { value: "99%", label: "Uptime" },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <p className="text-gray-900 font-extrabold text-xl">{item.value}</p>
                                        <p className="text-gray-500 text-xs">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80"
                                alt="EV Charging Station"
                                className="rounded-2xl shadow-xl object-cover w-full h-[420px]"
                            />

                            {/* LIGHT OVERLAY */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/70 to-transparent" />

                            {/* FLOATING CARD */}
                            <div className="absolute bottom-4 left-4 bg-white border border-green-100 rounded-xl p-4 text-gray-800 shadow-lg max-w-[220px]">
                                <p className="text-xs text-green-600 mb-1 font-semibold">Smart Charging</p>
                                <p className="text-sm font-semibold">
                                    Real-time monitoring & seamless EV charging experience.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* FEATURE STRIP */}
                    <div className="max-w-7xl mx-auto px-6 pb-10">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                            {[
                                "Fast DC Charging",
                                "Smart Monitoring",
                                "Fleet Solutions",
                                "24/7 Support",
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="bg-green-50 border border-green-100 rounded-lg p-4 text-center text-sm text-gray-700 hover:bg-green-500 hover:text-white transition"
                                >
                                    {feature}
                                </div>
                            ))}

                        </div>
                    </div>


                </section>


                {/* ─── JOURNEY SECTION ───────────────────────── */}
                <section className="py-16 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

                    {/* IMAGE */}
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
                            className="rounded-lg"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80"
                            className="rounded-lg mt-8"
                        />
                    </div>

                    {/* TEXT */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            A Journey Of Smart EV Innovation
                        </h2>

                        <p className="text-gray-600 mb-4">
                            EV-VoltGO was founded to solve one of the biggest challenges in electric mobility —
                            accessible and reliable charging infrastructure.
                        </p>

                        <p className="text-gray-600 mb-6">
                            We are building a smart network that connects EV users, businesses, and energy
                            systems into one seamless ecosystem.
                        </p>

                        {/* STATS */}
                        <div className="flex gap-8 mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-green-500">2+</h3>
                                <p className="text-sm text-gray-500">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-green-500">95%</h3>
                                <p className="text-sm text-gray-500">Client Satisfaction</p>
                            </div>
                        </div>

                        <button className="bg-green-500 px-5 py-2.5 rounded-md text-black font-semibold hover:bg-green-400">
                            About Us
                        </button>
                    </div>
                </section>


                {/* ─── FEATURES CARDS ───────────────────────── */}
                <section className="bg-gray-100 py-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">

                        <div className="grid md:grid-cols-3 gap-8 -mt-20">

                            {[
                                {
                                    title: "Fast Charging",
                                    desc: "Ultra-fast DC charging stations designed for modern EV users.",
                                },
                                {
                                    title: "Smart Monitoring",
                                    desc: "Track usage, availability, and performance in real-time.",
                                },
                                {
                                    title: "EV Planning",
                                    desc: "Plan your routes with optimized charging station access.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-xl shadow-lg p-6 relative">

                                    {/* NUMBER */}
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                                        {`0${i + 1}`}
                                    </div>

                                    <h3 className="font-bold text-lg mt-4 mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <button className="mt-10 bg-green-500 px-6 py-3 rounded-md text-black font-semibold hover:bg-green-400">
                            View All Services
                        </button>
                    </div>
                </section>


                {/* ─── LEGACY SECTION ───────────────────────── */}
                <section className="py-16 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

                    {/* TEXT */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            Building A Legacy Of Clean Energy
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Our mission is to accelerate EV adoption by delivering scalable, sustainable,
                            and intelligent charging solutions across India.
                        </p>

                        <div className="flex gap-6 mb-6 text-sm text-gray-600">
                            <span>Innovation</span>
                            <span>Integrity</span>
                            <span>Customer Focus</span>
                        </div>

                        <button className="bg-green-500 px-6 py-3 rounded-md text-black font-semibold hover:bg-green-400">
                            Contact Us
                        </button>
                    </div>

                    {/* IMAGE */}
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
}