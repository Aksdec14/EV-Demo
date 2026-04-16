"use client";
import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function PartnerAuth() {
    const [mode, setMode] = useState<"signUp" | "signIn">("signUp");

    return (
        <section className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 py-12">

            {/* Brand */}
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                    </svg>
                </div>
                <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Partner Portal</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Welcome to <span className="text-green-400">EVdriveX</span>
                </h1>
                <p className="text-gray-400 text-sm">Sign in to access your partner dashboard</p>
            </div>

            {/* Toggle */}
            <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6 w-full max-w-sm">
                <button
                    onClick={() => setMode("signUp")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === "signUp" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"
                        }`}
                >
                    Sign Up
                </button>
                <button
                    onClick={() => setMode("signIn")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === "signIn" ? "bg-green-500 text-black" : "text-gray-400 hover:text-white"
                        }`}
                >
                    Sign In
                </button>
            </div>

            {/* Clerk Component */}
            <div className="w-full max-w-sm">
                {mode === "signUp" ? (
                    <SignUp
                        afterSignOutUrl="/partner/dashboard"
                        forceRedirectUrl="/partner/dashboard"
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "bg-gray-900 border border-gray-800 shadow-none rounded-2xl w-full",
                                headerTitle: "text-white",
                                headerSubtitle: "text-gray-400",
                                formButtonPrimary: "bg-green-500 hover:bg-green-400 text-black font-bold",
                                formFieldInput: "bg-gray-800 border-gray-700 text-white focus:border-green-500",
                                formFieldLabel: "text-gray-400 text-xs",
                                footerActionLink: "text-green-400 hover:text-green-300",
                                identityPreviewText: "text-white",
                                identityPreviewEditButton: "text-green-400",
                                dividerLine: "bg-gray-700",
                                dividerText: "text-gray-500",
                                socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                                socialButtonsBlockButtonText: "text-white",
                            },
                        }}
                    />
                ) : (
                    <SignIn
                        afterSignOutUrl="/partner/dashboard"
                        forceRedirectUrl="/partner/dashboard"
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "bg-gray-900 border border-gray-800 shadow-none rounded-2xl w-full",
                                headerTitle: "text-white",
                                headerSubtitle: "text-gray-400",
                                formButtonPrimary: "bg-green-500 hover:bg-green-400 text-black font-bold",
                                formFieldInput: "bg-gray-800 border-gray-700 text-white focus:border-green-500",
                                formFieldLabel: "text-gray-400 text-xs",
                                footerActionLink: "text-green-400 hover:text-green-300",
                                dividerLine: "bg-gray-700",
                                dividerText: "text-gray-500",
                                socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
                                socialButtonsBlockButtonText: "text-white",
                            },
                        }}
                    />
                )}
            </div>

            {/* Back to home */}
            <a
                href="/"
                className="mt-6 text-gray-500 hover:text-gray-300 text-sm transition-colors no-underline"
            >
                ← Back to Home
            </a>

        </section>
    );
}