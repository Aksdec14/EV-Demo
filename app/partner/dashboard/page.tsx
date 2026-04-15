"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

// ── Types ──────────────────────────────────────────────
type Partner = {
  name: string;
  address: string;
  join_date: string;
  monthly_fixed: string | number;
};

type RevenueRow = {
  month: string;
  year: string | number;
  total_revenue: string | number;
  partner_60: string | number;
  company_40: string | number;
  fixed_income: string | number;
  total_paid: string | number;
  total_sessions: string | number;
};

type SessionRow = {
  session_id: string;
  date: string;
  user_name: string;
  duration_mins: string | number;
  amount: string | number;
};

type Tab = "overview" | "history" | "sessions";

// ── Revenue Chart ──────────────────────────────────────
function RevenueChart({ data }: { data: RevenueRow[] }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map((d) => Number(d.total_revenue) || 0)) || 1;

  return (
    <div className="flex items-end gap-2 h-32 w-full">
      {data.slice(-6).map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-green-400 text-xs font-bold">
            ₹{((Number(item.partner_60) || 0) / 1000).toFixed(1)}k
          </span>
          <div
            className="w-full bg-green-500 rounded-t-md transition-all duration-500 hover:bg-green-400"
            style={{
              height: `${((Number(item.total_revenue) || 0) / max) * 100}px`,
              minHeight: "4px",
            }}
          />
          <span className="text-gray-500 text-xs truncate w-full text-center">
            {item.month?.toString().slice(0, 3)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────
export default function PartnerDashboard() {
  const { user, isLoaded } = useUser(); // ✅ isLoaded prevents premature renders
  const [partner, setPartner] = useState<Partner | null>(null);
  const [revenue, setRevenue] = useState<RevenueRow[]>([]);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const partnerId = user?.publicMetadata?.partner_id as string | undefined;

  useEffect(() => {
    // ✅ Wait for Clerk to finish loading before deciding anything
    if (!isLoaded) return;

    // ✅ If loaded but no partnerId, stop spinner immediately
    if (!partnerId) {
      setLoading(false);
      return;
    }

    fetchAll();
  }, [isLoaded, partnerId]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, rRes, sRes] = await Promise.all([
        fetch(`/api/sheets?sheet=Partners&partner_id=${partnerId}`),
        fetch(`/api/sheets?sheet=Revenue&partner_id=${partnerId}`),
        fetch(`/api/sheets?sheet=Sessions&partner_id=${partnerId}`),
      ]);

      const [pData, rData, sData] = await Promise.all([
        pRes.json(),
        rRes.json(),
        sRes.json(),
      ]);

      if (pData.data?.[0]) setPartner(pData.data[0]);
      if (rData.data) setRevenue(rData.data);
      if (sData.data) setSessions(sData.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false); // ✅ Always runs, even on error
    }
  };

  // ── Derived totals ─────────────────────────────────
  const totalRevenue = revenue.reduce((sum, r) => sum + Number(r.total_revenue || 0), 0);
  const totalEarned = revenue.reduce((sum, r) => sum + Number(r.partner_60 || 0), 0);
  const totalFixed = revenue.reduce((sum, r) => sum + Number(r.fixed_income || 0), 0);
  const totalSessions = revenue.reduce((sum, r) => sum + Number(r.total_sessions || 0), 0);
  const latestRevenue = revenue[revenue.length - 1] ?? ({} as RevenueRow);

  // ── Loading state ──────────────────────────────────
  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ── No partner ID ──────────────────────────────────
  if (!partnerId) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Account Pending Approval</h2>
          <p className="text-gray-400 text-sm">Your partner account is under review. We will notify you once approved.</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Revenue Generated", value: `₹${totalRevenue.toLocaleString()}`, sub: "All time", icon: "📊", color: "from-blue-900/30 to-blue-900/10 border-blue-800/30", textColor: "text-blue-400" },
    { label: "Your Total Earnings", value: `₹${totalEarned.toLocaleString()}`, sub: "60% share", icon: "💰", color: "from-green-900/30 to-green-900/10 border-green-800/30", textColor: "text-green-400" },
    { label: "Fixed Income Received", value: `₹${totalFixed.toLocaleString()}`, sub: "Guaranteed", icon: "📅", color: "from-yellow-900/30 to-yellow-900/10 border-yellow-800/30", textColor: "text-yellow-400" },
    { label: "Total Charging Sessions", value: totalSessions.toLocaleString(), sub: "All time", icon: "⚡", color: "from-purple-900/30 to-purple-900/10 border-purple-800/30", textColor: "text-purple-400" },
  ];

  const thisMonthRows = [
    { label: "Total Revenue Generated", value: `₹${Number(latestRevenue.total_revenue || 0).toLocaleString()}`, color: "text-white" },
    { label: "Your 60% Share", value: `₹${Number(latestRevenue.partner_60 || 0).toLocaleString()}`, color: "text-green-400" },
    { label: "Company 40% Share", value: `₹${Number(latestRevenue.company_40 || 0).toLocaleString()}`, color: "text-gray-400" },
    { label: "Fixed Income", value: `₹${Number(latestRevenue.fixed_income || 0).toLocaleString()}`, color: "text-yellow-400" },
    { label: "Total Paid To You", value: `₹${Number(latestRevenue.total_paid || 0).toLocaleString()}`, color: "text-green-300" },
    { label: "Charging Sessions", value: String(latestRevenue.total_sessions ?? 0), color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Top Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg">Partner Dashboard</h1>
            <p className="text-gray-400 text-xs mt-0.5">
              Welcome back, {partner?.name || user?.firstName}!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-green-900/30 border border-green-800/40 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">Station Active</span>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
              {(partner?.name || user?.firstName || "P")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Station Info Banner */}
        {partner && (
          <div className="bg-gradient-to-r from-green-900/40 to-gray-900 border border-green-800/30 rounded-2xl p-4 sm:p-5 mb-6 flex flex-wrap gap-4 items-center justify-between">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
                label: "Station Location",
                value: partner.address,
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
                label: "Partner Since",
                value: partner.join_date,
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
                label: "Monthly Fixed",
                value: `₹${Number(partner.monthly_fixed || 0).toLocaleString()}`,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-4 sm:p-5`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className={`${stat.textColor} text-xl sm:text-2xl font-extrabold`}>{stat.value}</p>
              <p className="text-gray-300 text-xs font-semibold mt-1">{stat.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-800">
          {(["overview", "history", "sessions"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-semibold capitalize transition-all ${activeTab === tab
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-500 hover:text-gray-300"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-1">Monthly Revenue Chart</h3>
              <p className="text-gray-500 text-xs mb-4">Your 60% share per month</p>
              <RevenueChart data={revenue} />
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">
                This Month — {latestRevenue.month} {latestRevenue.year}
              </h3>
              <div className="space-y-4">
                {thisMonthRows.map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <span className={`${item.color} font-bold text-sm`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-white font-bold text-sm">Revenue History</h3>
              <p className="text-gray-500 text-xs mt-0.5">Month by month breakdown</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    {["Month", "Year", "Sessions", "Total Revenue", "Your 60%", "Fixed", "Total Paid"].map((h) => (
                      <th key={h} className="text-left text-gray-500 text-xs font-semibold px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {revenue.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-gray-500 py-8 text-sm">No revenue data yet</td>
                    </tr>
                  ) : (
                    [...revenue].reverse().map((row, i) => (
                      <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-3 text-white font-semibold">{row.month}</td>
                        <td className="px-5 py-3 text-gray-400">{row.year}</td>
                        <td className="px-5 py-3 text-blue-400 font-semibold">{row.total_sessions}</td>
                        <td className="px-5 py-3 text-white">₹{Number(row.total_revenue || 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-green-400 font-bold">₹{Number(row.partner_60 || 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-yellow-400">₹{Number(row.fixed_income || 0).toLocaleString()}</td>
                        <td className="px-5 py-3 text-green-300 font-bold">₹{Number(row.total_paid || 0).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-800">
              <h3 className="text-white font-bold text-sm">Charging Sessions</h3>
              <p className="text-gray-500 text-xs mt-0.5">All charging logs at your station</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    {["Session ID", "Date", "User", "Duration", "Amount"].map((h) => (
                      <th key={h} className="text-left text-gray-500 text-xs font-semibold px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-8 text-sm">No sessions yet</td>
                    </tr>
                  ) : (
                    [...sessions].reverse().map((row, i) => (
                      <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-3 text-gray-400 font-mono text-xs">{row.session_id}</td>
                        <td className="px-5 py-3 text-white">{row.date}</td>
                        <td className="px-5 py-3 text-white font-semibold">{row.user_name}</td>
                        <td className="px-5 py-3 text-blue-400">{row.duration_mins} mins</td>
                        <td className="px-5 py-3 text-green-400 font-bold">₹{Number(row.amount || 0).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}