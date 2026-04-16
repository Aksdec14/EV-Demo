"use client";

// ─── SERVICES SECTION ───────────────────────────────────────────────
export function Services() {
    const services = [
        {
            title: "DC Fast Charging",
            desc: "Experience ultra-fast EV charging with our high-power DC chargers designed to minimize downtime and keep you moving efficiently.",
            img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80",
            badge: "01",
        },
        {
            title: "Fleet Charging Solutions",
            desc: "Smart charging infrastructure for EV fleets with real-time monitoring, energy optimization, and seamless management tools.",
            img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80",
            badge: "02",
        },
        {
            title: "Solar Integrated Charging",
            desc: "Sustainable EV charging powered by renewable energy sources, reducing carbon footprint and energy costs.",
            img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&q=80",
            badge: "03",
        },
        {
            title: "Smart Charging Network",
            desc: "Connected charging stations with mobile app integration, real-time availability, and secure payment systems.",
            img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
            badge: "04",
        },
    ];

    return (
        <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 py-16 sm:py-20 overflow-hidden">

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-2">
                        How We Work
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                        Professional{" "}
                        <span className="text-green-300">EV Charging</span>{" "}
                        Solution For You
                    </h2>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {services.map((service) => (
                        <div key={service.title} className="flex flex-col items-center text-center group">

                            {/* Circle Image */}
                            <div className="relative mb-4">
                                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-green-500/40 group-hover:border-green-300 transition-all duration-300 shadow-xl shadow-green-900/40">
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors duration-300 rounded-full"></div>
                                </div>
                                {/* Badge */}
                                <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-400 text-black text-xs font-extrabold rounded-full flex items-center justify-center shadow-lg">
                                    {service.badge}
                                </div>
                            </div>

                            {/* Text */}
                            <h3 className="text-white font-bold text-base sm:text-lg mb-2">{service.title}</h3>
                            <p className="text-green-200/70 text-xs sm:text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


// ─── MISSION SECTION ────────────────────────────────────────────────
export function Mission() {
    const points = [
        "Expand EV charging infrastructure across urban and highway networks.",
        "Deliver fast, reliable, and smart charging experiences for every user.",
        "Promote clean energy adoption and reduce carbon emissions.",
    ];

    const partners = [
        "Our Network", "Charging Partners", "Fleet Operators", "Energy Providers", "Technology Integrations"
    ];

    return (
        <>
            <section className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT - World Map */}
                        <div className="relative flex items-center justify-center">
                            {/* World Map using SVG dots pattern */}
                            <div className="relative w-full max-w-md">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80"
                                    alt="World Map"
                                    className="w-full object-contain opacity-20 grayscale"
                                />
                                {/* Green dot markers */}
                                {[
                                    { top: "30%", left: "22%" },
                                    { top: "25%", left: "45%" },
                                    { top: "35%", left: "55%" },
                                    { top: "40%", left: "70%" },
                                    { top: "55%", left: "60%" },
                                    { top: "50%", left: "30%" },
                                ].map((pos, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-400/50 animate-pulse"
                                        style={{ top: pos.top, left: pos.left }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT - Content */}
                        <div>
                            {/* Label */}
                            <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3">
                                Company Goal
                            </p>

                            {/* Heading */}
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                                <span className="text-green-500">Our Mission</span> Is To Charge
                                Your Electric Vehicle Properly
                            </h2>

                            {/* Description */}
                            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            {/* Bullet Points */}
                            <ul className="space-y-3 mb-8">
                                {points.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* PARTNERS BAR */}
            <div className="bg-gray-50 border-t border-gray-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        {partners.map((partner, i) => (
                            <span
                                key={i}
                                className={`text-sm font-bold tracking-widest uppercase transition-colors duration-200 cursor-pointer ${i === 0
                                    ? "text-green-500"
                                    : "text-gray-400 hover:text-gray-700"
                                    }`}
                            >
                                {partner}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}