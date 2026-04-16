"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = "evvoltgo@gmail.com";

type Sheet = "Partners" | "Revenue" | "Sessions";

interface FormState {
    [key: string]: string;
}

interface FieldConfig {
    name: string;
    label: string;
    placeholder: string;
    type: string;
    options?: string[];
}

interface SheetConfig {
    fields: FieldConfig[];
    icon: string;
    description: string;
}

const SHEETS_CONFIG: Record<Sheet, SheetConfig> = {
    Partners: {
        icon: "🤝",
        description: "Register a new EV charging station partner",
        fields: [
            { name: "partner_id", label: "Partner ID", placeholder: "P003", type: "text" },
            { name: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
            { name: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
            { name: "phone", label: "Phone Number", placeholder: "9876543210", type: "text" },
            { name: "address", label: "Address", placeholder: "Mumbai, Maharashtra", type: "text" },
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
    },
    Revenue: {
        icon: "💰",
        description: "Log monthly revenue data for a partner",
        fields: [
            { name: "revenue_id", label: "Revenue ID", placeholder: "R003", type: "text" },
            { name: "partner_id", label: "Partner ID", placeholder: "P001", type: "text" },
            { name: "month", label: "Month", placeholder: "April", type: "text" },
            { name: "year", label: "Year", placeholder: "2026", type: "number" },
            { name: "total_sessions", label: "Total Sessions", placeholder: "120", type: "number" },
            { name: "total_revenue", label: "Total Revenue (₹)", placeholder: "15000", type: "number" },
            { name: "partner_60", label: "Partner Share 60% (₹)", placeholder: "9000", type: "number" },
            { name: "company_40", label: "Company Share 40% (₹)", placeholder: "6000", type: "number" },
            { name: "fixed_income", label: "Fixed Income (₹)", placeholder: "5000", type: "number" },
            { name: "total_paid", label: "Total Paid (₹)", placeholder: "14000", type: "number" },
        ],
    },
    Sessions: {
        icon: "⚡",
        description: "Record an EV charging session",
        fields: [
            { name: "session_id", label: "Session ID", placeholder: "S003", type: "text" },
            { name: "partner_id", label: "Partner ID", placeholder: "P001", type: "text" },
            { name: "date", label: "Date", placeholder: "", type: "date" },
            { name: "user_name", label: "User Name", placeholder: "Priya", type: "text" },
            { name: "duration_mins", label: "Duration (mins)", placeholder: "45", type: "number" },
            { name: "amount", label: "Amount (₹)", placeholder: "120", type: "number" },
        ],
    },
};

export default function AdminPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [activeSheet, setActiveSheet] = useState<Sheet>("Partners");
    const [form, setForm] = useState<FormState>({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const isAdmin = userEmail === ADMIN_EMAIL;

    useEffect(() => {
        if (isLoaded && !isSignedIn) router.push("/");
        if (isLoaded && isSignedIn && !isAdmin) router.push("/");
    }, [isLoaded, isSignedIn, isAdmin, router]);

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
            showToast(`Row added to ${activeSheet} successfully!`, "success");
            setForm({});
        } catch {
            showToast("Something went wrong. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    // Loading / auth state
    if (!isLoaded || !isSignedIn || !isAdmin) {
        return (
            <div style={{
                minHeight: "100vh", display: "flex", alignItems: "center",
                justifyContent: "center", background: "#f8fafc"
            }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{
                        width: 48, height: 48, border: "3px solid #e2e8f0",
                        borderTop: "3px solid #16a34a", borderRadius: "50%",
                        animation: "spin 0.8s linear infinite", margin: "0 auto 16px"
                    }} />
                    <p style={{ color: "#64748b", fontFamily: "sans-serif", fontSize: 14 }}>Verifying access...</p>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const config = SHEETS_CONFIG[activeSheet];
    const sheets = Object.keys(SHEETS_CONFIG) as Sheet[];

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f8fafc",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .admin-input {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 14px;
                    font-family: 'Inter', sans-serif;
                    color: #1e293b;
                    background: #ffffff;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .admin-input:focus {
                    border-color: #16a34a;
                    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
                }
                .admin-input::placeholder { color: #94a3b8; }
                select.admin-input option { background: white; color: #1e293b; }

                .sheet-tab {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border-radius: 8px;
                    border: 1.5px solid #e2e8f0;
                    background: white;
                    color: #64748b;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.15s;
                    font-family: 'Inter', sans-serif;
                }
                .sheet-tab:hover { border-color: #16a34a; color: #16a34a; background: #f0fdf4; }
                .sheet-tab.active {
                    background: #16a34a;
                    border-color: #16a34a;
                    color: white;
                }

                .submit-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 28px;
                    background: #16a34a;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: 'Inter', sans-serif;
                    transition: background 0.2s, transform 0.1s;
                    letter-spacing: 0.01em;
                }
                .submit-btn:hover { background: #15803d; transform: translateY(-1px); }
                .submit-btn:disabled { background: #86efac; cursor: not-allowed; transform: none; }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px;
                }
                @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr; } }

                .field-label {
                    display: block;
                    font-size: 12px;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 6px;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                }

                .toast {
                    position: fixed;
                    bottom: 28px;
                    right: 28px;
                    padding: 14px 20px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 500;
                    font-family: 'Inter', sans-serif;
                    z-index: 999;
                    animation: toastIn 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
                    max-width: 340px;
                }
                .toast.success { background: #f0fdf4; border: 1.5px solid #86efac; color: #15803d; }
                .toast.error { background: #fff1f2; border: 1.5px solid #fda4af; color: #be123c; }
                @keyframes toastIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .stat-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    background: #f0fdf4;
                    border: 1px solid #bbf7d0;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #16a34a;
                }
            `}</style>

            {/* Top Nav */}
            <nav style={{
                background: "white",
                borderBottom: "1px solid #e2e8f0",
                padding: "0 32px",
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                        width: 36, height: 36, background: "#16a34a",
                        borderRadius: 8, display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: 18
                    }}>⚡</div>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                            EV-VoltGO
                        </div>
                        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, letterSpacing: "0.05em" }}>
                            ADMIN PANEL
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="stat-badge">
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }}></span>
                        Admin Access
                    </span>
                    <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: "#f0fdf4", border: "2px solid #86efac",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 700, color: "#16a34a"
                    }}>
                        {user?.firstName?.[0] || "A"}
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            <div style={{
                background: "white",
                borderBottom: "1px solid #e2e8f0",
                padding: "28px 32px"
            }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#16a34a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                                Google Sheets Manager
                            </div>
                            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: 6 }}>
                                Data Entry Dashboard
                            </h1>
                            <p style={{ color: "#64748b", fontSize: 14 }}>
                                Append rows directly to your EV-VoltGO partner spreadsheet
                            </p>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {sheets.map((s) => (
                                <button
                                    key={s}
                                    className={`sheet-tab ${activeSheet === s ? "active" : ""}`}
                                    onClick={() => setActiveSheet(s)}
                                >
                                    <span>{SHEETS_CONFIG[s].icon}</span>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 32px" }}>

                {/* Form Card */}
                <div style={{
                    background: "white",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
                }}>
                    {/* Card Header */}
                    <div style={{
                        padding: "20px 28px",
                        borderBottom: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        background: "#fafafa"
                    }}>
                        <div style={{
                            width: 42, height: 42, background: "#f0fdf4",
                            border: "1.5px solid #bbf7d0", borderRadius: 10,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 20
                        }}>
                            {config.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                                Add to <span style={{ color: "#16a34a" }}>{activeSheet}</span> Sheet
                            </div>
                            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
                                {config.description}
                            </div>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div style={{ padding: "28px" }}>
                        <div className="form-grid">
                            {config.fields.map((field) => (
                                <div
                                    key={field.name}
                                    style={
                                        field.name === "address" || field.name === "station_location"
                                            ? { gridColumn: "1 / -1" }
                                            : {}
                                    }
                                >
                                    <label className="field-label" htmlFor={field.name}>
                                        {field.label}
                                    </label>
                                    {field.type === "select" ? (
                                        <select
                                            id={field.name}
                                            className="admin-input"
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
                                            className="admin-input"
                                            placeholder={field.placeholder}
                                            value={form[field.name] || ""}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div style={{ height: 1, background: "#f1f5f9", margin: "24px 0" }} />

                        {/* Actions */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                            <p style={{ fontSize: 12, color: "#94a3b8" }}>
                                All fields are required before submitting
                            </p>
                            <div style={{ display: "flex", gap: 10 }}>
                                <button
                                    onClick={() => setForm({})}
                                    style={{
                                        padding: "11px 20px",
                                        background: "white",
                                        border: "1.5px solid #e2e8f0",
                                        borderRadius: 8,
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: "#64748b",
                                        cursor: "pointer",
                                        fontFamily: "Inter, sans-serif",
                                        transition: "border-color 0.15s",
                                    }}
                                >
                                    Clear
                                </button>
                                <button
                                    className="submit-btn"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span style={{
                                                width: 14, height: 14,
                                                border: "2px solid rgba(255,255,255,0.3)",
                                                borderTop: "2px solid white",
                                                borderRadius: "50%",
                                                animation: "spin 0.7s linear infinite",
                                                display: "inline-block"
                                            }} />
                                            Saving...
                                        </>
                                    ) : (
                                        <>+ Add to {activeSheet}</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 20 }}>
                    {sheets.map((s) => (
                        <div
                            key={s}
                            onClick={() => setActiveSheet(s)}
                            style={{
                                background: "white",
                                border: `1.5px solid ${activeSheet === s ? "#86efac" : "#e2e8f0"}`,
                                borderRadius: 10,
                                padding: "16px 20px",
                                cursor: "pointer",
                                transition: "all 0.15s",
                            }}
                        >
                            <div style={{ fontSize: 20, marginBottom: 8 }}>{SHEETS_CONFIG[s].icon}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{s}</div>
                            <div style={{ fontSize: 11, color: "#94a3b8" }}>{SHEETS_CONFIG[s].fields.length} fields</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`toast ${toast.type}`}>
                    <span>{toast.type === "success" ? "✓" : "✕"}</span>
                    {toast.msg}
                </div>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}