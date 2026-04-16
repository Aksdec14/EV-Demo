"use client";
import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function PartnerAuth() {
    const [mode, setMode] = useState<"signUp" | "signIn">("signUp");

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">

            {/* ================= LEFT ================= */}
            <div className="relative w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen">

                {/* Background */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12 text-white">

                    {/* Top */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-base sm:text-lg font-bold">
                            ⚡ EV-<span className="text-green-400">VoltGO</span>
                        </div>

                        <div className="hidden sm:flex text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20">
                            ● Now Accepting
                        </div>
                    </div>

                    {/* Middle */}
                    <div className="mt-6 sm:mt-10">
                        <p className="text-green-400 uppercase tracking-widest text-[10px] sm:text-xs mb-2">
                            Become a Partner
                        </p>

                        <h1 className="font-extrabold leading-tight text-3xl sm:text-4xl lg:text-6xl">
                            POWER <br />
                            THE FUTURE <br />
                            <span className="text-green-400">WITH VOLTGO</span>
                        </h1>

                        <p className="mt-3 sm:mt-4 text-white/70 text-xs sm:text-sm max-w-md">
                            Join EV-VoltGO's partner network and bring next-gen EV charging
                            to your location. Zero upfront cost. Maximum revenue.
                        </p>

                        {/* Stats */}
                        <div className="mt-5 sm:mt-6 grid grid-cols-3 rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur text-center">
                            <div className="p-3 sm:p-4">
                                <p className="text-sm sm:text-xl font-bold">2.4K+</p>
                                <p className="text-[10px] sm:text-xs text-white/60">Partners</p>
                            </div>

                            <div className="p-3 sm:p-4 border-x border-white/20">
                                <p className="text-sm sm:text-xl font-bold">₹18L</p>
                                <p className="text-[10px] sm:text-xs text-white/60">Revenue</p>
                            </div>

                            <div className="p-3 sm:p-4">
                                <p className="text-sm sm:text-xl font-bold">48H</p>
                                <p className="text-[10px] sm:text-xs text-white/60">Onboarding</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom perks */}
                    <div className="hidden sm:block text-xs text-white/60 space-y-1">

                    </div>
                </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-3 sm:px-6 lg:px-12 py-6 sm:py-10">

                <div className="w-full max-w-sm sm:max-w-md mx-auto">

                    {/* Header */}
                    <div className="text-center mb-5 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            {mode === "signUp" ? "Create Account" : "Welcome Back"}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {mode === "signUp"
                                ? "Start your VoltGO journey"
                                : "Login to dashboard"}
                        </p>
                    </div>

                    {/* Toggle */}
                    <div className="flex bg-gray-200 rounded-lg p-1 mb-5 sm:mb-6 w-full overflow-hidden">
                        <button
                            onClick={() => setMode("signUp")}
                            className={`flex-1 py-2 text-xs sm:text-sm rounded-md font-medium transition ${mode === "signUp"
                                ? "bg-green-600 text-white shadow"
                                : "text-gray-600"
                                }`}
                        >
                            Create
                        </button>

                        <button
                            onClick={() => setMode("signIn")}
                            className={`flex-1 py-2 text-xs sm:text-sm rounded-md font-medium transition ${mode === "signIn"
                                ? "bg-green-600 text-white shadow"
                                : "text-gray-600"
                                }`}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Card */}
                    <div className="bg-white p-3 sm:p-6 rounded-2xl shadow-md border w-full overflow-hidden">

                        {mode === "signUp" ? (
                            <SignUp
                                routing="hash"
                                forceRedirectUrl="/partner/dashboard"
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "shadow-none border-none p-0 w-full",
                                        header: "hidden",
                                        formButtonPrimary:
                                            "bg-green-600 hover:bg-green-500 text-white rounded-lg",
                                        formFieldInput:
                                            "border rounded-lg focus:ring-2 focus:ring-green-500 w-full",
                                    },
                                }}
                            />
                        ) : (
                            <SignIn
                                routing="hash"
                                forceRedirectUrl="/partner/dashboard"
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "shadow-none border-none p-0 w-full",
                                        header: "hidden",
                                        formButtonPrimary:
                                            "bg-green-600 hover:bg-green-500 text-white rounded-lg",
                                        formFieldInput:
                                            "border rounded-lg focus:ring-2 focus:ring-green-500 w-full",
                                    },
                                }}
                            />
                        )}
                    </div>

                    {/* Back */}
                    <p className="text-center mt-4 text-xs sm:text-sm text-gray-400">
                        ← Back to Home
                    </p>
                </div>
            </div>
        </div>
    );
}