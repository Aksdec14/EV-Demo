"use client";
import { useEffect, useState } from "react";
import { useUser, UserButton, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// ─── TYPES ──────────────────────────────────────────────────────────
type Partner = {
  partner_id: string;
  name: string;
  email: string;
  address: string;
  station_location: string;
  join_date: string;
  monthly_fixed: number;
  status: string;
};

type Revenue = {
  revenue_id: string;
  partner_id: string;
  month: string;
  year: string;
  total_sessions: number;
  total_revenue: number;
  partner_60: number;
  company_40: number;
  fixed_income: number;
  total_paid: number;
};

type Session = {
  session_id: string;
  partner_id: string;
  date: string;
  user_name: string;
  duration_mins: number;
  amount: number;
};

// ─── DONUT CHART ────────────────────────────────────────────────────
function DonutChart({ data }: { data: Revenue[] }) {
  const totalSessions = data.reduce((s, r) => s + Number(r.total_sessions || 0), 0);
  const totalRevenue = data.reduce((s, r) => s + Number(r.total_revenue || 0), 0);
  const totalEarned = data.reduce((s, r) => s + Number(r.partner_60 || 0), 0);
  const totalFixed = data.reduce((s, r) => s + Number(r.fixed_income || 0), 0);

  if (totalRevenue === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No data yet
      </div>
    );
  }

  const earned = (totalEarned / (totalRevenue + totalFixed)) * 100;
  const fixed = (totalFixed / (totalRevenue + totalFixed)) * 100;
  const company = 100 - earned - fixed;

  const segments = [
    { pct: earned, color: "#16a34a", label: "Your Share" },
    { pct: fixed, color: "#f59e0b", label: "Fixed Income" },
    { pct: company, color: "#e5e7eb", label: "Company Share" },
  ];

  let cumulative = 0;
  const r = 60;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {segments.map((seg, i) => {
            const offset = circumference - (seg.pct / 100) * circumference;
            const rotation = (cumulative / 100) * 360 - 90;
            cumulative += seg.pct;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(${rotation} ${cx} ${cy})`}
                strokeLinecap="butt"
              />
            );
          })}
          <text x="80" y="74" textAnchor="middle" className="text-xs" fill="#6b7280" fontSize="10">
            Total Sessions
          </text>
          <text x="80" y="92" textAnchor="middle" fill="#111827" fontSize="20" fontWeight="700">
            {totalSessions}
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        {[
          { color: "#16a34a", label: "Your 60% Share", value: `₹${totalEarned.toLocaleString()}` },
          { color: "#f59e0b", label: "Fixed Income", value: `₹${totalFixed.toLocaleString()}` },
          { color: "#e5e7eb", label: "Company Share", value: `₹${(totalRevenue - totalEarned).toLocaleString()}` },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color, border: item.color === "#e5e7eb" ? "1px solid #d1d5db" : "none" }} />
              <span className="text-gray-500 text-xs">{item.label}</span>
            </div>
            <span className="text-gray-800 text-xs font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MINI BAR CHART ─────────────────────────────────────────────────
function BarChart({ data }: { data: Revenue[] }) {
  if (!data || data.length === 0)
    return <p className="text-gray-400 text-sm text-center py-8">No revenue data yet</p>;
  const max = Math.max(...data.map((d) => Number(d.total_revenue) || 0)) || 1;
  return (
    <div className="flex items-end gap-2 h-28 w-full">
      {data.slice(-6).map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{
              height: `${(Number(item.total_revenue || 0) / max) * 96}px`,
              minHeight: "4px",
              background: i === data.slice(-6).length - 1 ? "#16a34a" : "#dcfce7",
            }}
          />
          <span className="text-gray-400 text-xs truncate w-full text-center">
            {String(item.month).slice(0, 3)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── PENDING SCREEN ─────────────────────────────────────────────────
function PendingScreen() {
  const timeline = [
    { label: "Submitted", done: true },
    { label: "Account Created", done: true },
    { label: "Under Review", done: false },
    { label: "Activated", done: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-gray-900 text-xl font-bold mb-2">Account Under Review</h2>
        <p className="text-gray-500 text-sm mb-8">
          Our team is reviewing your application. You will be notified once your partner account is activated — usually within 2–3 business days.
        </p>
        <div className="flex items-center justify-center gap-1 mb-8">
          {timeline.map((t, i) => (
            <div key={t.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${t.done ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400 border border-gray-200"}`}>
                  {t.done ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                  )}
                </div>
                <span className={`text-xs mt-1 font-semibold whitespace-nowrap ${t.done ? "text-green-600" : "text-gray-400"}`}>
                  {t.label}
                </span>
              </div>
              {i < timeline.length - 1 && (
                <div className={`w-6 h-0.5 mx-1 mb-4 ${t.done ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        <SignOutButton redirectUrl="/partner/register">
          <button className="w-full py-3 border border-gray-200 hover:border-red-300 text-gray-500 hover:text-red-500 font-semibold text-sm rounded-xl transition-all">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}

// ─── NAV ITEM ────────────────────────────────────────────────────────
function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${active
        ? "bg-green-50 text-green-700 border-l-4 border-green-600"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── MAIN DASHBOARD ─────────────────────────────────────────────────
export default function PartnerDashboard() {
  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  const [partner, setPartner] = useState<Partner | null>(null);
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const partnerId = user?.publicMetadata?.partner_id as string | undefined;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/partner/register");
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (partnerId) fetchAll();
    else setLoading(false);
  }, [partnerId]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, rRes, sRes] = await Promise.all([
        fetch(`/api/sheets?sheet=Partners&partner_id=${partnerId}`),
        fetch(`/api/sheets?sheet=Revenue&partner_id=${partnerId}`),
        fetch(`/api/sheets?sheet=Sessions&partner_id=${partnerId}`),
      ]);
      const [pData, rData, sData] = await Promise.all([pRes.json(), rRes.json(), sRes.json()]);
      if (pData.data?.[0]) setPartner(pData.data[0]);
      if (rData.data) setRevenue(rData.data);
      if (sData.data) setSessions(sData.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) return null;
  if (!partnerId) return <PendingScreen />;

  const totalRevenue = revenue.reduce((s, r) => s + Number(r.total_revenue || 0), 0);
  const totalEarned = revenue.reduce((s, r) => s + Number(r.partner_60 || 0), 0);
  const totalFixed = revenue.reduce((s, r) => s + Number(r.fixed_income || 0), 0);
  const totalSessions = revenue.reduce((s, r) => s + Number(r.total_sessions || 0), 0);
  const latest = revenue[revenue.length - 1] || {};
  const prev = revenue[revenue.length - 2];

  const sessionsDelta = prev
    ? (((Number(latest.total_sessions) - Number(prev.total_sessions)) / Number(prev.total_sessions || 1)) * 100).toFixed(1)
    : null;
  const revenueDelta = prev
    ? (((Number(latest.total_revenue) - Number(prev.total_revenue)) / Number(prev.total_revenue || 1)) * 100).toFixed(1)
    : null;
  const earningsDelta = prev
    ? (((Number(latest.partner_60) - Number(prev.partner_60)) / Number(prev.partner_60 || 1)) * 100).toFixed(1)
    : null;

  const navItems = [
    {
      id: "overview", label: "Overview",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" /><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" /><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" /><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" /></svg>
    },
    {
      id: "history", label: "Revenue History",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    {
      id: "sessions", label: "Charging Sessions",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    },
    {
      id: "profile", label: "Profile",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ── SIDEBAR ── */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10 shadow-sm">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
            <span className="text-gray-900 font-bold text-base tracking-tight">ChargeNet</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest px-4 mb-2">Main</p>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}

          <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest px-4 mt-4 mb-2 pt-2">Support</p>
          <NavItem
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" strokeWidth={2} /></svg>}
            label="Settings"
            active={false}
            onClick={() => { }}
          />
          <NavItem
            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label="Help"
            active={false}
            onClick={() => { }}
          />
        </nav>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 ml-56 flex flex-col min-h-screen">

        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-gray-900 text-xl font-bold">
              Hello, {partner?.name?.split(" ")[0] || user?.firstName}!
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full" placeholder="Search anything here..." />
            </div>

            {/* Station Active Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-700 text-xs font-semibold">Station Active</span>
            </div>

            {/* Bell */}
            <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors relative">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <UserButton />
          </div>
        </header>

        <div className="flex-1 p-6">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <div>
              {/* Filters Row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Last 30 days
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 text-sm font-semibold transition-colors shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Export PDF
                </button>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: "Monthly Sessions",
                    value: String(latest.total_sessions || 0),
                    unit: "sessions",
                    delta: sessionsDelta,
                    icon: (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Monthly Revenue",
                    value: `₹${Number(latest.total_revenue || 0).toLocaleString()}`,
                    unit: "",
                    delta: revenueDelta,
                    icon: (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Your Earnings",
                    value: `₹${Number(latest.partner_60 || 0).toLocaleString()}`,
                    unit: "",
                    delta: earningsDelta,
                    icon: (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                  },
                ].map((card) => (
                  <div key={card.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-gray-500 text-sm">{card.label}</p>
                      <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">{card.icon}</div>
                    </div>
                    <p className="text-gray-900 text-2xl font-bold mb-1">{card.value}</p>
                    {card.delta !== null && (
                      <div className={`flex items-center gap-1 text-xs font-semibold ${Number(card.delta) >= 0 ? "text-green-600" : "text-red-500"}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={Number(card.delta) >= 0 ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                        </svg>
                        {Math.abs(Number(card.delta))}% vs past month
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Donut Chart */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm">Earnings Breakdown</h3>
                      <p className="text-gray-400 text-xs mt-0.5">All time</p>
                    </div>
                    <button className="text-green-600 text-xs font-semibold hover:underline">more →</button>
                  </div>
                  <DonutChart data={revenue} />
                </div>

                {/* Recent Sessions */}
                <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 font-bold text-sm">Recent Sessions</h3>
                      <p className="text-gray-400 text-xs mt-0.5">Latest charging logs</p>
                    </div>
                    <button onClick={() => setActiveTab("sessions")} className="text-green-600 text-xs font-semibold hover:underline">more →</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {["Session ID", "Status", "Date", "Amount"].map((h) => (
                            <th key={h} className="text-left text-gray-400 text-xs font-semibold pb-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.length === 0 ? (
                          <tr><td colSpan={4} className="text-center text-gray-400 py-8 text-sm">No sessions yet</td></tr>
                        ) : (
                          [...sessions].reverse().slice(0, 6).map((row, i) => (
                            <tr key={i} className="border-b border-gray-50 last:border-0">
                              <td className="py-3 text-gray-800 font-mono text-xs">#{row.session_id}</td>
                              <td className="py-3">
                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Completed
                                </span>
                              </td>
                              <td className="py-3 text-gray-500 text-xs">{row.date}</td>
                              <td className="py-3 text-gray-900 font-bold text-xs">₹{Number(row.amount || 0).toLocaleString()}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Revenue Bar Chart */}
              <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm">Monthly Revenue Trend</h3>
                    <p className="text-gray-400 text-xs mt-0.5">Last 6 months</p>
                  </div>
                  <button onClick={() => setActiveTab("history")} className="text-green-600 text-xs font-semibold hover:underline">more →</button>
                </div>
                <BarChart data={revenue} />
              </div>
            </div>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === "history" && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 font-bold text-sm">Revenue History</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Month by month breakdown</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <span className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">All time</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      {["Month", "Year", "Sessions", "Total Revenue", "Your 60%", "Fixed", "Total Paid"].map((h) => (
                        <th key={h} className="text-left text-gray-400 text-xs font-semibold px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {revenue.length === 0 ? (
                      <tr><td colSpan={7} className="text-center text-gray-400 py-12 text-sm">No data yet</td></tr>
                    ) : (
                      [...revenue].reverse().map((row, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3.5 text-gray-900 font-semibold">{row.month}</td>
                          <td className="px-5 py-3.5 text-gray-500">{row.year}</td>
                          <td className="px-5 py-3.5">
                            <span className="text-blue-600 font-semibold">{row.total_sessions}</span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-800">₹{Number(row.total_revenue || 0).toLocaleString()}</td>
                          <td className="px-5 py-3.5">
                            <span className="text-green-600 font-bold">₹{Number(row.partner_60 || 0).toLocaleString()}</span>
                          </td>
                          <td className="px-5 py-3.5 text-amber-600">₹{Number(row.fixed_income || 0).toLocaleString()}</td>
                          <td className="px-5 py-3.5">
                            <span className="bg-green-50 text-green-700 font-bold text-xs px-2.5 py-1 rounded-full">
                              ₹{Number(row.total_paid || 0).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SESSIONS TAB ── */}
          {activeTab === "sessions" && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 font-bold text-sm">Charging Sessions</h3>
                  <p className="text-gray-400 text-xs mt-0.5">All charging logs at your station</p>
                </div>
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  {sessions.length} total
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      {["Session ID", "Status", "Date & Time", "User", "Duration", "Amount", "Info"].map((h) => (
                        <th key={h} className="text-left text-gray-400 text-xs font-semibold px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.length === 0 ? (
                      <tr><td colSpan={7} className="text-center text-gray-400 py-12 text-sm">No sessions yet</td></tr>
                    ) : (
                      [...sessions].reverse().map((row, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3.5 text-gray-600 font-mono text-xs">#{row.session_id}</td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Completed
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-500 text-xs">{row.date}</td>
                          <td className="px-5 py-3.5 text-gray-900 font-semibold">{row.user_name}</td>
                          <td className="px-5 py-3.5 text-blue-600 font-semibold">{row.duration_mins} mins</td>
                          <td className="px-5 py-3.5 text-green-600 font-bold">₹{Number(row.amount || 0).toLocaleString()}</td>
                          <td className="px-5 py-3.5">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PROFILE TAB ── */}
          {activeTab === "profile" && partner && (
            <div className="max-w-2xl">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
                <h3 className="text-gray-900 font-bold text-sm mb-4">Station Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Partner Name", value: partner.name },
                    { label: "Email", value: partner.email },
                    { label: "Station Address", value: partner.address },
                    { label: "Station Location", value: partner.station_location },
                    { label: "Partner Since", value: partner.join_date },
                    { label: "Monthly Fixed Income", value: `₹${Number(partner.monthly_fixed || 0).toLocaleString()}` },
                  ].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                      <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-gray-900 font-bold text-sm mb-4">Account Status</h3>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-700 font-semibold text-sm">Active Partner</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <SignOutButton redirectUrl="/partner/register">
                    <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold text-sm transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}