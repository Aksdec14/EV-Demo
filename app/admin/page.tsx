"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = "evvoltgo@gmail.com";

type Sheet = "Partners" | "Revenue" | "Sessions";
type ActiveView = "dashboard" | "add-data";

interface FormState { [key: string]: string; }
interface FieldConfig {
    name: string; label: string; placeholder: string;
    type: string; options?: string[];
}
interface SheetConfig { fields: FieldConfig[]; icon: string; description: string; }

const SHEETS_CONFIG: Record<Sheet, SheetConfig> = {
    Partners: {
        icon: "🤝", description: "Register a new EV charging station partner",
        fields: [
            { name: "partner_id", label: "Partner ID", placeholder: "P003", type: "text" },
            { name: "name", label: "Full Name", placeholder: "John Doe", type: "text" },
            { name: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
            { name: "phone", label: "Phone Number", placeholder: "9876543210", type: "text" },
            { name: "address", label: "Address", placeholder: "Mumbai, Maharashtra", type: "text" },
            { name: "station_location", label: "Station Location (lat,lng)", placeholder: "19.0760,72.8777", type: "text" },
            { name: "status", label: "Status", placeholder: "", type: "select", options: ["active", "deactive"] },
            { name: "monthly_fixed", label: "Monthly Fixed (₹)", placeholder: "5000", type: "number" },
            { name: "join_date", label: "Join Date", placeholder: "", type: "date" },
        ],
    },
    Revenue: {
        icon: "💰", description: "Log monthly revenue data for a partner",
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
        icon: "⚡", description: "Record an EV charging session",
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

// ── MINI BAR CHART ────────────────────────────────────────────────────
function BarChart({ data, valueKey, labelKey, color = "#16a34a" }: {
    data: any[]; valueKey: string; labelKey: string; color?: string;
}) {
    if (!data || data.length === 0) return <p className="text-gray-400 text-sm text-center py-6">No data yet</p>;
    const max = Math.max(...data.map((d) => Number(d[valueKey]) || 0)) || 1;
    return (
        <div className="flex items-end gap-2 h-28 w-full">
            {data.slice(-8).map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="relative">
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                            ₹{Number(item[valueKey] || 0).toLocaleString()}
                        </div>
                    </div>
                    <div
                        className="w-full rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{
                            height: `${(Number(item[valueKey] || 0) / max) * 96}px`,
                            minHeight: "4px",
                            background: color,
                        }}
                    />
                    <span className="text-gray-500 text-xs truncate w-full text-center">
                        {String(item[labelKey] || "").slice(0, 3)}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default function AdminPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    const [activeView, setActiveView] = useState<ActiveView>("dashboard");
    const [activeSheet, setActiveSheet] = useState<Sheet>("Partners");
    const [form, setForm] = useState<FormState>({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

    // Data states
    const [partners, setPartners] = useState<any[]>([]);
    const [revenue, setRevenue] = useState<any[]>([]);
    const [sessions, setSessions] = useState<any[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const isAdmin = userEmail === ADMIN_EMAIL;

    useEffect(() => {
        if (isLoaded && !isSignedIn) router.push("/");
        if (isLoaded && isSignedIn && !isAdmin) router.push("/");
    }, [isLoaded, isSignedIn, isAdmin]);

    useEffect(() => {
        if (isAdmin) fetchAllData();
    }, [isAdmin]);

    useEffect(() => { setForm({}); }, [activeSheet]);

    const fetchAllData = async () => {
        setDataLoading(true);
        try {
            const [pRes, rRes, sRes] = await Promise.all([
                fetch("/api/sheets?sheet=Partners"),
                fetch("/api/sheets?sheet=Revenue"),
                fetch("/api/sheets?sheet=Sessions"),
            ]);
            const [p, r, s] = await Promise.all([pRes.json(), rRes.json(), sRes.json()]);
            if (p.data) setPartners(p.data);
            if (r.data) setRevenue(r.data);
            if (s.data) setSessions(s.data);
        } catch (e) { console.error(e); }
        setDataLoading(false);
    };

    const showToast = (msg: string, type: "success" | "error") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleSubmit = async () => {
        const config = SHEETS_CONFIG[activeSheet];
        const missing = config.fields.find((f) => f.type !== "select" && !form[f.name]);
        if (missing) { showToast(`Please fill in: ${missing.label}`, "error"); return; }
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
            fetchAllData();
        } catch { showToast("Something went wrong. Please try again.", "error"); }
        finally { setLoading(false); }
    };

    // Computed stats
    const totalRevenue = revenue.reduce((s, r) => s + Number(r.total_revenue || 0), 0);
    const totalCompanyEarnings = revenue.reduce((s, r) => s + Number(r.company_40 || 0), 0);
    const totalSessions = sessions.length;
    const activePartners = partners.filter((p) => p.status === "active").length;

    // Revenue by month for chart
    const revenueByMonth = revenue.reduce((acc: any[], r) => {
        const existing = acc.find((a) => a.month === r.month && a.year === r.year);
        if (existing) {
            existing.total_revenue += Number(r.total_revenue || 0);
            existing.company_40 += Number(r.company_40 || 0);
        } else {
            acc.push({ month: r.month, year: r.year, total_revenue: Number(r.total_revenue || 0), company_40: Number(r.company_40 || 0) });
        }
        return acc;
    }, []);

    if (!isLoaded || !isSignedIn || !isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: 3 }} />
                    <p className="text-gray-500 text-sm">Verifying access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* SIDEBAR + MAIN LAYOUT */}
            <div className="flex">

                {/* SIDEBAR */}
                <aside className="w-56 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 z-30 flex flex-col">
                    {/* Logo */}
                    <div className="px-5 py-5 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-base font-bold">⚡</div>
                            <div>
                                <p className="text-gray-900 font-bold text-sm leading-none">EV-VoltGO</p>
                                <p className="text-gray-400 text-xs mt-0.5">Admin Panel</p>
                            </div>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-3 py-4 space-y-1">
                        <button
                            onClick={() => setActiveView("dashboard")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeView === "dashboard" ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveView("add-data")}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeView === "add-data" ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Data
                        </button>

                        <div className="pt-3 pb-1">
                            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider px-3">Sheets</p>
                        </div>
                        {(Object.keys(SHEETS_CONFIG) as Sheet[]).map((s) => (
                            <button
                                key={s}
                                onClick={() => { setActiveSheet(s); setActiveView("add-data"); }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeView === "add-data" && activeSheet === s ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <span>{SHEETS_CONFIG[s].icon}</span>
                                {s}
                            </button>
                        ))}
                    </nav>

                    {/* User */}
                    <div className="px-4 py-4 border-t border-gray-100 flex items-center gap-2.5">
                        <UserButton />
                        <div className="min-w-0">
                            <p className="text-gray-800 text-xs font-semibold truncate">{user?.firstName}</p>
                            <p className="text-gray-400 text-xs truncate">Admin</p>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="ml-56 flex-1 min-h-screen">

                    {/* Top Bar */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
                        <div>
                            <h1 className="text-gray-900 font-bold text-lg">
                                {activeView === "dashboard" ? "Dashboard Overview" : "Add Data"}
                            </h1>
                            <p className="text-gray-400 text-xs mt-0.5">
                                {activeView === "dashboard" ? "Real-time stats from Google Sheets" : `Adding to ${activeSheet} sheet`}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-700 text-xs font-semibold">Live</span>
                            </div>
                            <button
                                onClick={fetchAllData}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                title="Refresh data"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">

                        {/* ── DASHBOARD VIEW ──────────────────────────────── */}
                        {activeView === "dashboard" && (
                            <div className="space-y-6">

                                {/* Stat Cards */}
                                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                                    {[
                                        { label: "Total Partners", value: partners.length, sub: `${activePartners} active`, icon: "🤝", color: "bg-blue-50 border-blue-100", text: "text-blue-600" },
                                        { label: "Total Revenue", value: `₹${(totalRevenue / 1000).toFixed(1)}k`, sub: "All time", icon: "📊", color: "bg-green-50 border-green-100", text: "text-green-600" },
                                        { label: "Company Earnings", value: `₹${(totalCompanyEarnings / 1000).toFixed(1)}k`, sub: "40% share", icon: "💰", color: "bg-yellow-50 border-yellow-100", text: "text-yellow-600" },
                                        { label: "Total Sessions", value: totalSessions, sub: "Charging logs", icon: "⚡", color: "bg-purple-50 border-purple-100", text: "text-purple-600" },
                                    ].map((stat) => (
                                        <div key={stat.label} className={`${stat.color} border rounded-xl p-5`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xl">{stat.icon}</span>
                                                <span className={`${stat.text} text-xs font-semibold bg-white px-2 py-0.5 rounded-full border`}>{stat.sub}</span>
                                            </div>
                                            <p className={`${stat.text} text-2xl font-extrabold`}>
                                                {dataLoading ? <span className="text-gray-300">—</span> : stat.value}
                                            </p>
                                            <p className="text-gray-600 text-xs font-medium mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Charts Row */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                                    {/* Revenue Chart */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-gray-900 font-bold text-sm">Monthly Revenue</h3>
                                                <p className="text-gray-400 text-xs mt-0.5">Total revenue generated per month</p>
                                            </div>
                                            <span className="text-green-600 font-bold text-sm">₹{(totalRevenue / 1000).toFixed(1)}k total</span>
                                        </div>
                                        <BarChart data={revenueByMonth} valueKey="total_revenue" labelKey="month" color="#16a34a" />
                                    </div>

                                    {/* Company Earnings Chart */}
                                    <div className="bg-white border border-gray-200 rounded-xl p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-gray-900 font-bold text-sm">Company Earnings (40%)</h3>
                                                <p className="text-gray-400 text-xs mt-0.5">Your share per month</p>
                                            </div>
                                            <span className="text-yellow-600 font-bold text-sm">₹{(totalCompanyEarnings / 1000).toFixed(1)}k total</span>
                                        </div>
                                        <BarChart data={revenueByMonth} valueKey="company_40" labelKey="month" color="#d97706" />
                                    </div>
                                </div>

                                {/* Partners Table */}
                                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-gray-900 font-bold text-sm">All Partners</h3>
                                            <p className="text-gray-400 text-xs mt-0.5">{partners.length} total partners</p>
                                        </div>
                                        <button
                                            onClick={() => setActiveView("add-data")}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold rounded-lg transition-all"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Partner
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-100 bg-gray-50">
                                                    {["ID", "Name", "Email", "Phone", "Location", "Monthly Fixed", "Status", "Joined"].map((h) => (
                                                        <th key={h} className="text-left text-gray-500 text-xs font-semibold px-4 py-3">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataLoading ? (
                                                    <tr><td colSpan={8} className="text-center text-gray-400 py-8 text-sm">Loading...</td></tr>
                                                ) : partners.length === 0 ? (
                                                    <tr><td colSpan={8} className="text-center text-gray-400 py-8 text-sm">No partners yet. Add your first partner!</td></tr>
                                                ) : (
                                                    partners.map((p, i) => (
                                                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                            <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.partner_id}</td>
                                                            <td className="px-4 py-3 text-gray-900 font-semibold">{p.name}</td>
                                                            <td className="px-4 py-3 text-gray-500 text-xs">{p.email}</td>
                                                            <td className="px-4 py-3 text-gray-500 text-xs">{p.phone}</td>
                                                            <td className="px-4 py-3 text-gray-500 text-xs max-w-32 truncate">{p.address}</td>
                                                            <td className="px-4 py-3 text-green-600 font-bold">₹{Number(p.monthly_fixed || 0).toLocaleString()}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.status === "active"
                                                                    ? "bg-green-50 text-green-700 border border-green-200"
                                                                    : "bg-red-50 text-red-600 border border-red-200"
                                                                    }`}>
                                                                    {p.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-3 text-gray-400 text-xs">{p.join_date}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Revenue Table */}
                                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="px-5 py-4 border-b border-gray-100">
                                        <h3 className="text-gray-900 font-bold text-sm">Revenue Records</h3>
                                        <p className="text-gray-400 text-xs mt-0.5">{revenue.length} monthly entries</p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-100 bg-gray-50">
                                                    {["Partner ID", "Month", "Year", "Sessions", "Total Revenue", "Partner 60%", "Company 40%", "Fixed", "Total Paid"].map((h) => (
                                                        <th key={h} className="text-left text-gray-500 text-xs font-semibold px-4 py-3">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataLoading ? (
                                                    <tr><td colSpan={9} className="text-center text-gray-400 py-8 text-sm">Loading...</td></tr>
                                                ) : revenue.length === 0 ? (
                                                    <tr><td colSpan={9} className="text-center text-gray-400 py-8 text-sm">No revenue data yet.</td></tr>
                                                ) : (
                                                    [...revenue].reverse().map((r, i) => (
                                                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                            <td className="px-4 py-3 text-gray-500 font-mono text-xs">{r.partner_id}</td>
                                                            <td className="px-4 py-3 text-gray-900 font-semibold">{r.month}</td>
                                                            <td className="px-4 py-3 text-gray-500">{r.year}</td>
                                                            <td className="px-4 py-3 text-blue-600 font-semibold">{r.total_sessions}</td>
                                                            <td className="px-4 py-3 text-gray-900">₹{Number(r.total_revenue || 0).toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-green-600 font-bold">₹{Number(r.partner_60 || 0).toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-yellow-600 font-bold">₹{Number(r.company_40 || 0).toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-gray-500">₹{Number(r.fixed_income || 0).toLocaleString()}</td>
                                                            <td className="px-4 py-3 text-green-700 font-bold">₹{Number(r.total_paid || 0).toLocaleString()}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* ── ADD DATA VIEW ───────────────────────────────── */}
                        {activeView === "add-data" && (
                            <div>
                                {/* Sheet Tabs */}
                                <div className="flex gap-2 mb-6">
                                    {(Object.keys(SHEETS_CONFIG) as Sheet[]).map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setActiveSheet(s)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${activeSheet === s
                                                ? "bg-green-600 border-green-600 text-white"
                                                : "bg-white border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600"
                                                }`}
                                        >
                                            <span>{SHEETS_CONFIG[s].icon}</span>
                                            {s}
                                        </button>
                                    ))}
                                </div>

                                {/* Form Card */}
                                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center text-lg">
                                            {SHEETS_CONFIG[activeSheet].icon}
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-bold text-sm">Add to <span className="text-green-600">{activeSheet}</span> Sheet</p>
                                            <p className="text-gray-400 text-xs mt-0.5">{SHEETS_CONFIG[activeSheet].description}</p>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {SHEETS_CONFIG[activeSheet].fields.map((field) => (
                                                <div
                                                    key={field.name}
                                                    className={field.name === "address" || field.name === "station_location" ? "sm:col-span-2" : ""}
                                                >
                                                    <label className="block text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1.5">
                                                        {field.label}
                                                    </label>
                                                    {field.type === "select" ? (
                                                        <select
                                                            className="w-full bg-white border border-gray-200 focus:border-green-500 text-gray-900 text-sm rounded-lg px-3 py-2.5 outline-none transition-colors focus:ring-2 focus:ring-green-500/10"
                                                            value={form[field.name] || ""}
                                                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                                                        >
                                                            <option value="">Select {field.label}</option>
                                                            {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            placeholder={field.placeholder}
                                                            className="w-full bg-white border border-gray-200 focus:border-green-500 text-gray-900 text-sm rounded-lg px-3 py-2.5 outline-none transition-colors focus:ring-2 focus:ring-green-500/10 placeholder-gray-400"
                                                            value={form[field.name] || ""}
                                                            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-gray-100 mt-6 pt-4 flex items-center justify-between">
                                            <p className="text-gray-400 text-xs">All fields are required before submitting</p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setForm({})}
                                                    className="px-4 py-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 text-sm font-medium rounded-lg transition-all"
                                                >
                                                    Clear
                                                </button>
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                    className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-300 text-white text-sm font-semibold rounded-lg transition-all"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                            </svg>
                                                            Saving...
                                                        </>
                                                    ) : `+ Add to ${activeSheet}`}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium shadow-lg z-50 border ${toast.type === "success"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-600"
                    }`}>
                    <span>{toast.type === "success" ? "✓" : "✕"}</span>
                    {toast.msg}
                </div>
            )}
        </div>
    );
}