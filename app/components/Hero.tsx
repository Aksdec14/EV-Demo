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
                            Convenient Solutions For Smart And Sustainable Electric Car Charging
                        </p>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                            Smarter Chargers For Your Electric Vehicle{" "}
                            <span className="text-green-400">BETTER</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href="#"
                                className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold text-sm rounded-md transition-all duration-200 shadow-lg shadow-green-500/30 no-underline"
                            >
                                GET STARTED
                            </a>
                            <a
                                href="#"
                                className="px-6 py-3 border border-white/30 hover:border-green-400 text-white hover:text-green-400 font-semibold text-sm rounded-md transition-all duration-200 backdrop-blur-sm no-underline"
                            >
                                CONTACT US
                            </a>
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
                                <h3 className="text-gray-900 font-bold text-base mb-1">Fast DC Charging</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Excepteur sint occaecat cupid atat non pro ident, decid cu non pro dent, aunt in culpa qui officia dese.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex items-start gap-4 p-6 sm:p-8 hover:bg-green-50 transition-colors duration-200 group">
                            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                                <svg className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-base mb-1">Save More Energy</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Excepteur sint occaecat cupid atat non pro ident, decid cu non pro dent, aunt in culpa qui officia dese.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex items-start gap-4 p-6 sm:p-8 hover:bg-green-50 transition-colors duration-200 group">
                            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                                <svg className="w-6 h-6 text-green-500 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-gray-900 font-bold text-base mb-1">Fast DC Charging</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Excepteur sint occaecat cupid atat non pro ident, decid cu non pro dent, aunt in culpa qui officia dese.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}