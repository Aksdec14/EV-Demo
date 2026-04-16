"use client";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex flex-col">

            {/* HERO BACKGROUND */}
            <div className="relative flex-1 flex items-center">

                {/* Background Image from Unsplash */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&q=80"
                        alt="EV Charging"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/80 to-gray-900/50"></div>
                    {/* Green tint at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950/60 to-transparent"></div>
                </div>

                {/* HERO CONTENT */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 w-full">
                    <div className="max-w-2xl">

                        {/* Top Label */}
                        <p className="text-green-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
                            India's Smart EV Charging Network — Fast, Reliable & Accessible
                        </p>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                            Charge Smarter. Drive{" "}
                            <span className="text-green-400">Further.</span>
                        </h1>

                        {/* Subtext - real content */}
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                            With ultra-fast DC charging stations across the country, we power your electric vehicle in minutes — not hours. Reliable uptime, transparent pricing, and a growing network built for India's EV revolution.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href="/partner/register"
                                className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold text-sm rounded-md transition-all duration-200 shadow-lg shadow-green-500/30 no-underline"
                            >
                                BECOME A PARTNER
                            </a>
                            <a
                                href="/contact"
                                className="px-6 py-3 border border-white/30 hover:border-green-400 text-white hover:text-green-400 font-semibold text-sm rounded-md transition-all duration-200 backdrop-blur-sm no-underline"
                            >
                                CONTACT US
                            </a>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-6 mt-10">
                            {[
                                { value: "500+", label: "Charging Stations" },
                                { value: "50K+", label: "Happy EV Drivers" },
                                { value: "99%", label: "Network Uptime" },
                            ].map((badge) => (
                                <div key={badge.label} className="flex items-center gap-2">
                                    <p className="text-green-400 font-extrabold text-xl">{badge.value}</p>
                                    <p className="text-gray-400 text-xs leading-tight">{badge.label}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* BOTTOM FEATURE CARDS */}
            <div className="relative z-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">

                        {/* Card 1 */}
                        <div className="flex items-start gap-4 p-6 sm:p-8 hover:bg-green-50 transition-colors duration-200 group">
                            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                                <svg className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-base mb-1">Ultra-Fast DC Charging</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Our high-power DC fast chargers deliver up to 150 kW, getting your EV from low battery to 80% in under 30 minutes.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex items-start gap-4 p-6 sm:p-8 hover:bg-green-50 transition-colors duration-200 group">
                            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                                <svg className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-base mb-1">Wide Station Network</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Find a charging point near you across metros, highways, malls, and residential areas — our network is growing every day.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex items-start gap-4 p-6 sm:p-8 hover:bg-green-50 transition-colors duration-200 group">
                            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                                <svg className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-base mb-1">Earn With Your Space</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Host an EV charging station at your property and earn 60% of all revenue generated, plus a guaranteed monthly fixed income.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}