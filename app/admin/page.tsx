"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Sheet = "Partners" | "Revenue" | "Sessions";

interface FormState {
    [key: string]: string;
}

const SHEETS_CONFIG = {
    Partners: {
        fields: [
            { name: "partner_id", label: "Partner ID", placeholder: "P003", type: "text" },
            { name: "name", label: "Name", placeholder: "John Doe", type: "text" },
            { name: "email", label: "Email", placeholder: "john@example.com", type: "email" },
            { name: "phone", label: "Phone", placeholder: "9876543210", type: "text" },
            { name: "address", label: "Address", placeholder: "Mumbai", type: "text" },
            { name: "station_location", label: "Station Location (lat,lng)", placeholder: "19.0760,72.8777", type: "text" },
            {
                name: "status",
                label: "Status",
                placeholder: "",
                type: "select",
                options: ["active", "deactive"],
            },
            { name: "monthly_fixed", label: "Monthly Fixed (₹)", placeholder: "5000", type: "number" },
            { name: "join_date", label: "Join Date", placeholder: "", type: "date" },
        ],
        color: "#00C896",
        icon: "🤝",
    },
    Revenue: {
        fields: [
            { name: "revenue_id", label: "Revenue ID", placeholder: "R003", type: "text" },
            { name: "partner_id", label: "Partner ID", placeholder: "P001", type: "text" },
            { name: "month", label: "Month", placeholder: "April", type: "text" },
            { name: "year", label: "Year", placeholder: "2026", type: "number" },
            { name: "total_sessions", label: "Total Sessions", placeholder: "120", type: "number" },
            { name: "total_revenue", label: "Total Revenue (₹)", placeholder: "15000", type: "number" },
            { name: "partner_60", label: "Partner 60% (₹)", placeholder: "9000", type: "number" },
            { name: "company_40", label: "Company 40% (₹)", placeholder: "6000", type: "number" },
            { name: "fixed_income", label: "Fixed Income (₹)", placeholder: "5000", type: "number" },
            { name: "total_paid", label: "Total Paid (₹)", placeholder: "14000", type: "number" },
        ],
        color: "#FFB800",
        icon: "💰",
    },
    Sessions: {
        fields: [
            { name: "session_id", label: "Session ID", placeholder: "S003", type: "text" },
            { name: "partner_id", label: "Partner ID", placeholder: "P001", type: "text" },
            { name: "date", label: "Date", placeholder: "", type: "date" },
            { name: "user_name", label: "User Name", placeholder: "Priya", type: "text" },
            { name: "duration_mins", label: "Duration (mins)", placeholder: "45", type: "number" },
            { name: "amount", label: "Amount (₹)", placeholder: "120", type: "number" },
        ],
        color: "#4F8EF7",
        icon: "⚡",
    },
};

export default function AdminPage() {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();
    const [activeSheet, setActiveSheet] = useState<Sheet>("Partners");
    const [form, setForm] = useState<FormState>({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        if (isLoaded && !isSignedIn) router.push("/");
    }, [isLoaded, isSignedIn, router]);

    useEffect(() => {
        setForm({});
    }, [activeSheet]);

    const showToast = (msg: string, type: "success" | "error") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const config = SHEETS_CONFIG[activeSheet];
        const missing = config.fields.find((f) => !form[f.name] && f.type !== "select");
        if (missing) {
            showToast(`Please fill in: ${missing.label}`, "error");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/sheets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sheet: activeSheet, data: form }),
            });

            if (!res.ok) throw new Error("Failed");
            showToast(`✓ Row added to ${activeSheet} sheet!`, "success");
            setForm({});
        } catch {
            showToast("Something went wrong. Check API config.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A]">
                <div className="text-[#00C896] font-mono text-lg animate-pulse">Authenticating...</div>
            </div>
        );
    }

    const config = SHEETS_CONFIG[activeSheet];

    return (
        <div className="min-h-screen bg-[#0A0E1A] text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        input, select {
          background: #0D1221;
          border: 1px solid #1E2A40;
          color: white;
          border-radius: 8px;
          padding: 10px 14px;
          width: 100%;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          transition: border-color 0.2s;
          outline: none;
        }
        input:focus, select:focus { border-color: var(--accent); }
        input::placeholder { color: #3A4A60; }
        select option { background: #0D1221; }
        .tab-btn {
          padding: 10px 22px;
          border-radius: 8px;
          border: 1px solid #1E2A40;
          background: transparent;
          color: #5A6A80;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
          letter-spacing: 0.03em;
        }
        .tab-btn.active {
          color: white;
          border-color: var(--accent);
          background: rgba(255,255,255,0.04);
        }
        .tab-btn:hover:not(.active) { color: #8A9AB0; border-color: #2A3A50; }
        .submit-btn {
          background: var(--accent);
          color: #0A0E1A;
          border: none;
          padding: 13px 32px;
          border-radius: 8px;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          letter-spacing: 0.04em;
        }
        .submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 640px) { .grid-2 { grid-template-columns: 1fr; } }
        .toast {
          position: fixed;
          bottom: 32px;
          right: 32px;
          padding: 14px 22px;
          border-radius: 10px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          z-index: 999;
          animation: slideIn 0.3s ease;
          border: 1px solid;
        }
        .toast.success { background: #0D2A1F; border-color: #00C896; color: #00C896; }
        .toast.error { background: #2A0D0D; border-color: #FF5555; color: #FF5555; }
        @keyframes slideIn { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
        label { display: block; color: #5A7090; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
        .dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
      `}</style>

            <style>{`:root { --accent: ${config.color}; }`}</style>

            {/* Header */}
            <div style={{ borderBottom: "1px solid #1A2235" }} className="px-8 py-5 flex items-center justify-between">
                <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
                        EV-Volt <span style={{ color: config.color }}>Admin</span>
                    </div>
                    <div style={{ color: "#3A4A60", fontSize: 11, marginTop: 2, letterSpacing: "0.06em" }}>
                        GOOGLE SHEETS MANAGER
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#3A4A60", fontSize: 12 }}>
                    <span className="dot" style={{ background: "#00C896" }}></span>
                    Connected
                </div>
            </div>

            {/* Main */}
            <div className="px-8 py-8 max-w-3xl mx-auto">

                {/* Sheet Tabs */}
                <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
                    {(Object.keys(SHEETS_CONFIG) as Sheet[]).map((s) => (
                        <button
                            key={s}
                            className={`tab-btn ${activeSheet === s ? "active" : ""}`}
                            style={activeSheet === s ? { ["--accent" as string]: SHEETS_CONFIG[s].color } : {}}
                            onClick={() => setActiveSheet(s)}
                        >
                            {SHEETS_CONFIG[s].icon} {s}
                        </button>
                    ))}
                </div>

                {/* Form Card */}
                <div style={{ background: "#0D1221", border: "1px solid #1A2538", borderRadius: 14, padding: 32 }}>

                    <div style={{ marginBottom: 28 }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
                            Add to <span style={{ color: config.color }}>{activeSheet}</span>
                        </div>
                        <div style={{ color: "#3A4A60", fontSize: 12 }}>
                            Fill all fields to append a new row to the <strong style={{ color: "#5A6A80" }}>{activeSheet}</strong> sheet
                        </div>
                    </div>

                    <div className="grid-2">
                        {config.fields.map((field) => (
                            <div key={field.name} style={field.name === "address" || field.name === "station_location" ? { gridColumn: "1 / -1" } : {}}>
                                <label htmlFor={field.name}>{field.label}</label>
                                {field.type === "select" ? (
                                    <select
                                        id={field.name}
                                        value={form[field.name] || ""}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options?.map((o) => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        id={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={form[field.name] || ""}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-end" }}>
                        <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                            {loading ? "Saving..." : `+ Add to ${activeSheet}`}
                        </button>
                    </div>
                </div>

                {/* Footer hint */}
                <div style={{ marginTop: 20, color: "#2A3A50", fontSize: 11, textAlign: "center", letterSpacing: "0.04em" }}>
                    Data is appended directly to your Google Sheet via the API route
                </div>
            </div>

            {/* Toast */}
            {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
        </div>
    );
}