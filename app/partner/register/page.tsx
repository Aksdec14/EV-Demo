"use client";
import { useState, ChangeEvent, MouseEvent } from "react";

type FormData = {
    name: string;
    email: string;
    phone: string;
    address: string;
    station_location: string;
    property_type: string;
    message: string;
};

type Status = "idle" | "loading" | "success" | "error";

const benefits: { icon: string; label: string }[] = [
    { icon: "💰", label: "60% Revenue Share" },
    { icon: "📅", label: "Monthly Fixed Pay" },
    { icon: "⚡", label: "Free Installation" },
];

const propertyTypes: string[] = [
    "Residential",
    "Commercial",
    "Parking Lot",
    "Mall/Shop",
    "Hotel",
    "Other",
];

const initialFormData: FormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
    station_location: "",
    property_type: "",
    message: "",
};

export default function PartnerRegister() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [status, setStatus] = useState<Status>("idle");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
                    subject: "New Partner Registration Request",
                    from_name: formData.name,
                    ...formData,
                }),
            });

            const data: { success: boolean } = await res.json();

            if (data.success) {
                setStatus("success");
                setFormData(initialFormData);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section className="min-h-screen bg-gray-950 py-16 px-4">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">
                        Join Us
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                        Become A <span className="text-green-400">Charging Partner</span>
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Install an EV charging station at your property and earn 60% of all
                        revenue generated. Plus a guaranteed monthly fixed income!
                    </p>
                </div>

                {/* Benefits Strip */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {benefits.map((b) => (
                        <div
                            key={b.label}
                            className="bg-green-900/20 border border-green-800/40 rounded-xl p-3 text-center"
                        >
                            <div className="text-2xl mb-1">{b.icon}</div>
                            <p className="text-green-400 text-xs font-semibold">{b.label}</p>
                        </div>
                    ))}
                </div>

                {/* Form */}
                {status === "success" ? (
                    <div className="bg-green-900/30 border border-green-500/40 rounded-2xl p-10 text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 className="text-white text-xl font-bold mb-2">
                            Application Submitted!
                        </h3>
                        <p className="text-gray-400 text-sm">
                            We have received your application. Our team will review and
                            contact you within 2-3 business days.
                        </p>
                    </div>
                ) : (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                        <div className="space-y-4">

                            {/* Name + Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Rahul Sharma"
                                        className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="rahul@gmail.com"
                                        className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-gray-600"
                                    />
                                </div>
                            </div>

                            {/* Phone + Property Type */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+91 98765 43210"
                                        className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                        Property Type *
                                    </label>
                                    <select
                                        name="property_type"
                                        value={formData.property_type}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors"
                                    >
                                        <option value="" disabled>Select type</option>
                                        {propertyTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                    Property Address *
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="123, MG Road, Mumbai, Maharashtra"
                                    className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-gray-600"
                                />
                            </div>

                            {/* Station Location */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                    Google Maps Link or Coordinates
                                </label>
                                <input
                                    type="text"
                                    name="station_location"
                                    value={formData.station_location}
                                    onChange={handleChange}
                                    placeholder="https://maps.google.com/... or 19.0760, 72.8777"
                                    className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-gray-600"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">
                                    Additional Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Tell us more about your property..."
                                    className="w-full bg-gray-800 border border-gray-700 focus:border-green-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors placeholder-gray-600 resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                onClick={handleSubmit}
                                disabled={status === "loading"}
                                className="w-full py-3.5 bg-green-500 hover:bg-green-400 disabled:bg-green-800 disabled:cursor-not-allowed text-black font-bold text-sm rounded-lg transition-all duration-200 shadow-lg shadow-green-500/20"
                            >
                                {status === "loading" ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : "SUBMIT APPLICATION"}
                            </button>

                            {status === "error" && (
                                <p className="text-red-400 text-xs text-center">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}