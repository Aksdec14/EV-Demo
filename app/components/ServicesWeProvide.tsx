"use client";

import { useState, useEffect } from "react";

type Service = {
    title: string;
    category: string;
    image: string;
    description: string;
};

const services: Service[] = [
    {
        title: "DC Fast Charging Network",
        category: "Infrastructure",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
        description:
            "High-speed DC chargers designed for rapid charging across cities and highways, ensuring minimal downtime for EV users.",
    },
    {
        title: "Fleet Charging Solutions",
        category: "Business",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80",
        description:
            "Smart infrastructure for EV fleets with centralized monitoring, scheduling, and optimized energy usage.",
    },
    {
        title: "Smart Energy Management",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=900&q=80",
        description:
            "AI-powered systems that balance load, reduce energy costs, and integrate renewable sources like solar power.",
    },
    {
        title: "EV Partner Ecosystem",
        category: "Growth",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
        description:
            "Partner with EV-VoltGO to install charging stations and generate recurring revenue with zero operational hassle.",
    },
];

export function ServicesWeProvide() {
    const [active, setActive] = useState(0);

    // AUTO SLIDE
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % services.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-gradient-to-br from-green-50 to-white py-16 sm:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2">
                        EV-VoltGO Services
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        Smart & Scalable{" "}
                        <span className="text-green-500">EV Infrastructure</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">
                        We provide end-to-end EV charging solutions designed for modern mobility,
                        businesses, and sustainable cities.
                    </p>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Building The Future Of Electric Mobility
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            EV-VoltGO is focused on accelerating EV adoption through reliable,
                            fast, and accessible charging solutions. Our platform integrates
                            advanced technology, clean energy, and scalable infrastructure.
                        </p>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            From individual users to enterprise fleets, we provide seamless
                            charging experiences that reduce downtime and enhance efficiency.
                        </p>

                        <button className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold text-sm rounded-md transition">
                            GET STARTED
                        </button>
                    </div>

                    {/* RIGHT - VERTICAL CARDS */}
                    <div className="relative h-[420px] sm:h-[460px]">

                        {services.map((service, i) => {
                            const isActive = i === active;

                            return (
                                <div
                                    key={i}
                                    className={`absolute w-full h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${isActive
                                            ? "opacity-100 scale-100 z-20"
                                            : "opacity-0 scale-95 z-10"
                                        }`}
                                >
                                    {/* IMAGE */}
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* OVERLAY */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                    {/* CONTENT */}
                                    <div className="absolute bottom-0 p-6 text-white">
                                        <span className="text-xs uppercase text-green-300 tracking-widest">
                                            {service.category}
                                        </span>

                                        <h3 className="text-xl sm:text-2xl font-bold mt-1">
                                            {service.title}
                                        </h3>

                                        <p className="text-sm text-gray-200 mt-2">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* DOTS */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                            {services.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={`h-2 rounded-full transition-all ${i === active
                                            ? "w-6 bg-green-400"
                                            : "w-2 bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}