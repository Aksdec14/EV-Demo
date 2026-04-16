"use client";

export default function About() {
    const stats = [
        { value: "20+", label: "Years Experience" },
        { value: "80+", label: "Service Stations" },
        { value: "15K+", label: "Positive Reviews" },
        { value: "20K+", label: "Happy Customers" },
    ];

    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Spare Part Management",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Fast DC Charging",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Warranty Extension",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            title: "Preventive Maintenance",
        },
    ];

    return (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT - Image + Stats */}
                    <div className="relative">

                        {/* Main Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1616361715039-11dde2199a21?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="EV Charging Station"
                                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover object-center"
                            />
                            {/* Green overlay tint */}
                            <div className="absolute inset-0 bg-green-900/10"></div>
                        </div>

                        {/* Stats Overlay Card */}
                        <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl shadow-2xl p-5 sm:p-6 grid grid-cols-2 gap-4 sm:gap-6 w-48 sm:w-56">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-green-500 font-extrabold text-xl sm:text-2xl leading-none">{stat.value}</p>
                                    <p className="text-gray-500 text-xs mt-1 leading-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT - Content */}
                    <div className="lg:pl-4 pt-8 lg:pt-0">

                        {/* Section Label */}
                        <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3">
                            About EV-VoltGO
                        </p>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Reliable Solutions For All Ev{" "}
                            <span className="text-green-500">Charging Programs!</span>
                        </h2>

                        {/* Description */}
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                            EV-VoltGO is committed to transforming the future of transportation by building a smart and reliable electric vehicle charging ecosystem.
                            We provide fast, accessible, and efficient EV charging solutions designed for modern drivers, businesses, and fleet operators.
                            Our goal is to simplify the EV experience through innovative technology, widespread charging infrastructure, and seamless user integration.
                            By promoting clean energy and sustainable mobility, EV-VoltGO is driving the shift toward a greener, smarter, and more connected world.
                        </p>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 group cursor-pointer"
                                >
                                    <div className="w-10 h-10 bg-green-100 group-hover:bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 text-green-500 group-hover:text-white">
                                        {feature.icon}
                                    </div>
                                    <p className="text-gray-800 font-semibold text-sm leading-tight">{feature.title}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a
                            href="/about"
                            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold text-sm rounded-md transition-all duration-200 shadow-md shadow-green-500/20 no-underline"
                        >
                            MORE ABOUT
                        </a>

                    </div>
                </div>
            </div>
        </section>
    );
}