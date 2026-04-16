"use client";
import { useState } from "react";

// ─── EV GENERATIONS SECTION ─────────────────────────────────────────
export function EVGenerations() {
    const skills = [
        { label: "Eco Friendly Charging", percent: 85 },
        { label: "Energy Storage Systems", percent: 90 },
        { label: "EV Unique Services", percent: 78 },
    ];

    return (
        <section className="bg-white/20 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-3xl overflow-hidden p-8 sm:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                        {/* LEFT - Text + Image */}
                        <div className="relative">
                            {/* Label */}
                            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">
                                Our EV Life
                            </p>

                            {/* Heading */}
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                                Create An Ultimate World Of{" "}
                                <span className="text-green-400">EV</span>
                                <br />
                                <span className="text-green-400">Generations</span>
                            </h2>

                            {/* CTA */}
                            <a
                                href="#"
                                className="inline-block px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-semibold text-sm rounded-md transition-all duration-200 no-underline mb-8"
                            >
                                LEARN MORE
                            </a>

                            {/* Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                                <img
                                    src="https://images.unsplash.com/photo-1619913387719-a43ee8859d9c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGV2JTIwY2hhcmdpbmclMjBzdGF0aW9ufGVufDB8fDB8fHwy"
                                    alt="EV Charging Station"
                                    className="w-full h-56 sm:h-64 object-cover"
                                />
                                {/* Green play button */}
                                <div className="absolute bottom-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-400 transition-colors">
                                    <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Small green info card */}
                            <div className="absolute -bottom-4 right-0 sm:-right-4 bg-green-500 rounded-xl p-4 max-w-[180px] shadow-xl shadow-green-900/40">
                                <p className="text-black text-xs font-semibold leading-relaxed">
                                    EV-VoltGO provides reliable, high-speed charging infrastructure designed to power the next generation of electric mobility.
                                </p>
                                <a href="#" className="text-black text-xs font-bold underline mt-2 block">
                                    Learn More
                                </a>
                            </div>
                        </div>

                        {/* RIGHT - Description + Progress Bars */}
                        <div className="pt-6 lg:pt-0">
                            {/* Description */}
                            <p className="text-green-100/70 text-sm leading-relaxed mb-4">
                                EV-VoltGO is building a next-generation EV charging ecosystem focused on speed, reliability, and accessibility.
                                Our smart charging infrastructure ensures seamless energy delivery for urban drivers, highway travelers, and commercial fleets.
                            </p>
                            <p className="text-green-100/70 text-sm leading-relaxed mb-8">
                                With advanced technology, real-time monitoring, and sustainable energy integration, we are enabling a cleaner and more efficient future for electric mobility.
                            </p>

                            {/* Progress Bars */}
                            <div className="space-y-6">
                                {skills.map((skill) => (
                                    <div key={skill.label}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white text-sm font-semibold">{skill.label}</span>
                                            <span className="text-green-400 text-sm font-bold">{skill.percent}%</span>
                                        </div>
                                        <div className="w-full bg-green-900/40 rounded-full h-2.5">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full relative"
                                                style={{ width: `${skill.percent}%` }}
                                            >
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full border-2 border-green-900 shadow-md shadow-green-500/50"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}


// ─── TESTIMONIALS SECTION ────────────────────────────────────────────
export function Testimonials() {
    const testimonials = [
        {
            name: "Amy Hawkins",
            role: "EV Owner",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
            stars: 5,
        },
        {
            name: "James Carter",
            role: "Fleet Manager",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.",
            stars: 5,
        },
        {
            name: "Sara Patel",
            role: "Business Owner",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
            text: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate.",
            stars: 5,
        },
    ];

    const [active, setActive] = useState(0);

    return (
        <section className="bg-green-50 py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT - Heading */}
                    <div>
                        <p className="text-green-500 text-xs font-bold uppercase tracking-widest mb-3">
                            Client Reviews
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Read Clients Story Of{" "}
                            <span className="text-green-500">Electronic Invention</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <a
                            href="#"
                            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold text-sm rounded-md transition-all duration-200 shadow-md shadow-green-500/20 no-underline"
                        >
                            SEE ALL REVIEWS
                        </a>
                    </div>

                    {/* RIGHT - Testimonial Card */}
                    <div>
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-gray-200/60 relative">

                            {/* Quote icon */}
                            <div className="absolute top-4 right-4 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonials[active].stars)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Review text */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                {testimonials[active].text}
                            </p>

                            {/* Reviewer */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={testimonials[active].avatar}
                                    alt={testimonials[active].name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
                                />
                                <div>
                                    <p className="text-gray-900 font-bold text-sm">{testimonials[active].name}</p>
                                    <p className="text-gray-400 text-xs">{testimonials[active].role}</p>
                                </div>
                            </div>

                            {/* Dots navigation */}
                            <div className="flex gap-2 mt-6">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-green-500" : "w-2 bg-gray-200"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Bottom note */}
                        <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                            <span className="text-green-500 font-semibold">★ Excellent</span> — Based on 500+ customer reviews from Google and Trustpilot. Rated highly across major platforms.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}