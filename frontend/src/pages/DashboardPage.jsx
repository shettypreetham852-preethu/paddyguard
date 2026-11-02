import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, Download, Filter, Search, ArrowUpRight, 
  Calendar, CheckCircle2, ShieldAlert, Sparkles, TrendingUp, 
  Activity, RefreshCw, Eye 
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useDetection } from '../context/DetectionContext';
import AnimatedCounter from '../components/AnimatedCounter';

const PIE_COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export default function DashboardPage() {
  const { history, isLoadingHistory } = useDetection();
  const [filterQuery, setFilterQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('All');

  // Filtered History
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch = 
        (item.disease_name && item.disease_name.toLowerCase().includes(filterQuery.toLowerCase())) ||
        (item.id && item.id.toLowerCase().includes(filterQuery.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(filterQuery.toLowerCase()));

      const matchesSeverity = 
        filterSeverity === 'All' || item.severity === filterSeverity;

      return matchesSearch && matchesSeverity;
    });
  }, [history, filterQuery, filterSeverity]);

  // Aggregate Disease Breakdown for Pie Chart
  const diseaseBreakdownData = useMemo(() => {
    const counts = {};
    history.forEach((h) => {
      const name = h.disease_name || 'Healthy';
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.keys(counts).map((name) => ({
      name,
      value: counts[name]
    }));
  }, [history]);

  // Monthly Detections Trend Data
  const monthlyScansData = useMemo(() => {
    return [
      { month: 'May', scans: 1420, healthy: 580 },
      { month: 'Jun', scans: 2150, healthy: 790 },
      { month: 'Jul', scans: 3480, healthy: 920 },
      { month: 'Aug', scans: 4120, healthy: 1100 },
      { month: 'Sep', scans: 3200, healthy: 1250 },
      { month: 'Oct', scans: 2600, healthy: 1400 }
    ];
  }, []);

  // Export CSV
  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = ["Scan ID", "Timestamp", "Disease", "Confidence (%)", "Severity", "Variety", "Area (Acres)", "Location", "Status"];
    const rows = history.map(row => [
      row.id,
      row.timestamp,
      `"${row.disease_name || ''}"`,
      row.confidence,
      row.severity,
      `"${row.variety || ''}"`,
      row.area_acres || 2.5,
      `"${row.location || ''}"`,
      `"${row.status || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `paddyguard_detection_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPI calculations
  const totalScans = history.length;
  const healthyScans = history.filter(h => h.disease_id === 'healthy' || h.severity === 'None').length;
  const healthyRatio = totalScans > 0 ? Math.round((healthyScans / totalScans) * 100) : 48;
  const highSeverityAlerts = history.filter(h => h.severity === 'High').length;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Title & Top Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Operations Intelligence
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white mt-1">
            Farm Monitoring & Scan Analytics
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Real-time disease distribution maps, chronological inspection logs, and data exports.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-glow-green transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-yellow-300" />
          <span>Export History (CSV)</span>
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        
        <div className="rounded-3xl glass-card p-5 sm:p-6 border border-slate-200/80 dark:border-forest-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Logged Scans
            </span>
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">
            <AnimatedCounter value={totalScans || 12} />
          </p>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
            <span>Synchronized with cloud</span>
          </p>
        </div>

        <div className="rounded-3xl glass-card p-5 sm:p-6 border border-slate-200/80 dark:border-forest-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Healthy Crop Ratio
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-heading text-emerald-600 dark:text-emerald-400">
            <AnimatedCounter value={healthyRatio} suffix="%" />
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Disease-free stand</p>
        </div>

        <div className="rounded-3xl glass-card p-5 sm:p-6 border border-slate-200/80 dark:border-forest-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              High Severity Alerts
            </span>
            <ShieldAlert className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-heading text-rose-600">
            <AnimatedCounter value={highSeverityAlerts || 3} />
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Requires immediate foliar spray</p>
        </div>

        <div className="rounded-3xl glass-card p-5 sm:p-6 border border-slate-200/80 dark:border-forest-900/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Average Projected Yield
            </span>
            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-heading text-yellow-600 dark:text-yellow-400">
            5.8 <span className="text-sm font-semibold text-slate-400">t/ha</span>
          </p>
          <p className="text-[11px] text-emerald-600 mt-1 font-semibold">+22% above baseline</p>
        </div>

      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* Monthly Scans Line Chart */}
        <div className="lg:col-span-7 rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Seasonal Disease Scouting Trends
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Monthly scans vs confirmed healthy leaves across Kharif cycle
            </p>
          </div>

          <div className="h-64 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyScansData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="scans" stroke="#22c55e" strokeWidth={3} name="Total Scans" />
                <Line type="monotone" dataKey="healthy" stroke="#facc15" strokeWidth={2} name="Healthy Stand" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disease Distribution Donut */}
        <div className="lg:col-span-5 rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
              Detected Pathogen Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Proportion of total scans per disease class
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={diseaseBreakdownData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {diseaseBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Detection History Table Card */}
      <div className="rounded-3xl glass-card p-6 sm:p-8 border border-slate-200/80 dark:border-forest-900/60 shadow-lg">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
              Inspection History Logs
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed chronological record of leaf diagnostics
            </p>
          </div>

          {/* Table Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search scans..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-slate-900 dark:text-white"
              />
            </div>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-forest-950/80 border border-slate-200 dark:border-forest-800 text-slate-700 dark:text-slate-300"
            >
              <option value="All">All Severities</option>
              <option value="High">High Severity</option>
              <option value="Medium">Medium Severity</option>
              <option value="Low">Low Severity</option>
              <option value="None">None (Healthy)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-forest-900/60 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-3 px-4">Specimen</th>
                <th className="py-3 px-4">Scan ID & Date</th>
                <th className="py-3 px-4">Diagnostic Result</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Plot / Location</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-forest-900/40">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-forest-950/40 transition-colors">
                  
                  {/* Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={item.thumbnail || '/samples/leaf_blast.jpg'}
                        alt="Leaf thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* ID & Date */}
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">
                      {item.id}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </td>

                  {/* Disease */}
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 dark:text-white block font-heading">
                      {item.disease_name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {item.variety || "IR 64"}
                    </span>
                  </td>

                  {/* Confidence */}
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {item.confidence}%
                    </span>
                  </td>

                  {/* Severity Badge */}
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      item.severity === 'High'
                        ? 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                        : item.severity === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        : item.severity === 'Low'
                        ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}>
                      {item.severity}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {item.location || "East Field Plot"}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <a
                      href={`/treatment?disease=${item.disease_id}&severity=${item.severity}`}
                      className="inline-flex items-center gap-1 font-bold text-forest-700 dark:text-emerald-400 hover:underline"
                    >
                      <span>Advice</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-xs">
            No inspection logs matching search.
          </div>
        )}

      </div>

    </div>
  );
}
