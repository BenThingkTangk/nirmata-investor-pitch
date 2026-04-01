import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, FileText, Calendar, Download, TrendingUp,
  Shield, Brain, Target, Zap, Users, Building2, ChevronRight,
  CheckCircle2, Clock, DollarSign, BarChart3, Rocket
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, Tooltip
} from "recharts";

/* ─── TYPES ─── */
interface TermSheetProps {
  vehicle: {
    id: string;
    name: string;
    tagline: string;
    description: string;
    minInvest: string;
    features: string[];
    riskLevel: string;
    targetReturn: string;
    lockup: string;
    color: string;
  };
  onClose: () => void;
}

/* ─── ANIMATED COUNTER HOOK ─── */
function useCountUp(target: number, duration: number = 1500, inView: boolean = true) {
  const [value, setValue] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (!inView || ref.current) return;
    ref.current = true;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration, inView]);
  return value;
}

/* ─── VC SCORE DATA ─── */
const VC_DIMENSIONS = [
  {
    name: "Team",
    score: 8,
    weight: 25,
    icon: Users,
    detail: "3 complementary founders, 99+ shipped enterprise projects, 100+ years combined experience",
    color: "#8587e3",
  },
  {
    name: "Market & TAM",
    score: 9,
    weight: 20,
    icon: Target,
    detail: "$124B+ combined TAM today → $500B+ by 2030, 6 addressable markets",
    color: "#00D4FF",
  },
  {
    name: "Product & Moat",
    score: 9,
    weight: 20,
    icon: Shield,
    detail: "25/25 vendor framework, GenUI exclusivity, 11 products, $45-77M replication cost",
    color: "#8587e3",
  },
  {
    name: "Traction & PMF",
    score: 7,
    weight: 20,
    icon: TrendingUp,
    detail: "$4M+ ClinixAI qualified pipeline in 180 days, 99+ projects delivered, Fortune 500 clients",
    color: "#FFD700",
  },
  {
    name: "Economics",
    score: 7,
    weight: 10,
    icon: BarChart3,
    detail: "Target 75-85% GM, scenario-based $120-180M Y5, self-funded to date",
    color: "#FF6B9D",
  },
  {
    name: "Strategic Fit",
    score: 10,
    weight: 5,
    icon: Brain,
    detail: "Pure-play agentic AI infra, vertical SaaS (healthcare), timing at inflection",
    color: "#A855F7",
  },
];

const COMPOSITE_SCORE = VC_DIMENSIONS.reduce((sum, d) => sum + d.score * d.weight, 0) / 100;

const RADAR_DATA = VC_DIMENSIONS.map((d) => ({
  dimension: d.name,
  score: d.score,
  fullMark: 10,
}));

/* ─── INVESTMENT VEHICLES ─── */
const VEHICLES = [
  {
    id: "equity",
    label: "Series A Preferred",
    recommended: true,
    color: "#8587e3",
    terms: [
      { label: "Pre-Money Valuation", value: "$40M–$75M range" },
      { label: "Security", value: "Series A Preferred Stock" },
      { label: "Liquidation Preference", value: "1x non-participating" },
      { label: "Anti-Dilution", value: "Broad-based weighted average" },
      { label: "Pro-Rata Rights", value: "Right to participate in subsequent rounds" },
      { label: "Board Observer", value: "For investments $5M+" },
      { label: "Information Rights", value: "Monthly financials; quarterly board decks" },
      { label: "Protective Provisions", value: "Standard (debt, M&A, new equity approval)" },
    ],
  },
  {
    id: "convertible",
    label: "Convertible Note",
    recommended: false,
    color: "#00D4FF",
    terms: [
      { label: "Valuation Cap", value: "$75M" },
      { label: "Discount", value: "20% to next qualified financing" },
      { label: "Interest", value: "8% simple, 18-month maturity" },
      { label: "Auto-Convert", value: "At qualified financing ($5M+ raise)" },
      { label: "Change of Control", value: "2x repayment premium" },
      { label: "MFN Clause", value: "Most favorable terms of subsequent notes" },
      { label: "Extension", value: "Mutual 12-month option" },
      { label: "Information Rights", value: "Monthly reports; annual audited statements" },
    ],
  },
  {
    id: "revenue",
    label: "Revenue-Based (ClinixAI)",
    recommended: false,
    color: "#FFD700",
    terms: [
      { label: "Revenue Share", value: "5-8% of ClinixAI monthly revenue" },
      { label: "Return Cap", value: "1.5-3x invested capital" },
      { label: "Payment", value: "Monthly, within 15 business days" },
      { label: "Dilution", value: "Non-dilutive — pure revenue share" },
      { label: "Dashboard", value: "Real-time billing metrics access" },
      { label: "Audit Rights", value: "Annual third-party revenue verification" },
      { label: "Acceleration", value: "Full repayment on change of control at 1.0x" },
      { label: "Term", value: "18-24 months, then converts or terminates at cap" },
    ],
  },
];

/* ─── RETURN SCENARIOS ─── */
const RETURN_SCENARIOS = [
  { label: "Bear (IP Floor)", valuation: 60, multiple: "1.2x", color: "#FF6B9D" },
  { label: "Base (18mo)", valuation: 100, multiple: "2x", color: "#FFD700" },
  { label: "Bull (24mo)", valuation: 250, multiple: "5x+", color: "#00D4FF" },
  { label: "Moon (Series B)", valuation: 500, multiple: "10x+", color: "#8587e3" },
];

/* ─── FORTUNE 500 TRUST LOGOS ─── */
const TRUST_CLIENTS = ["Lowe's", "Cognizant", "Trimble", "E2open", "Toyota", "OWASP"];

/* ─── FORMAT MAILTO BODY ─── */
function buildMailtoBody(vehicleId: string, amount: number): string {
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];
  const ownership = ((amount / 50_000_000) * 100).toFixed(2);
  return [
    `TERM SHEET INTEREST — ANTIMATTERAI, INC.`,
    `Series A Strategic Growth Round`,
    ``,
    `--- INVESTMENT DETAILS ---`,
    `Vehicle: ${vehicle.label}`,
    `Amount: $${(amount / 1_000_000).toFixed(1)}M`,
    `Estimated Ownership: ${ownership}% (at $50M pre-money)`,
    ``,
    `--- VEHICLE TERMS ---`,
    ...vehicle.terms.map((t) => `${t.label}: ${t.value}`),
    ``,
    `--- RETURN SCENARIOS ---`,
    ...RETURN_SCENARIOS.map(
      (s) => `${s.label}: $${s.valuation}M valuation → ${s.multiple} return`
    ),
    ``,
    `--- GENERATED VIA ANTIMATTERAI INVESTOR PORTAL ---`,
    `Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
  ].join("\n");
}

/* ─── SCORE RING ─── */
function ScoreRing({ score, maxScore = 10, size = 56, strokeWidth = 4, color }: {
  score: number; maxScore?: number; size?: number; strokeWidth?: number; color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / maxScore) * circumference;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference - progress }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
}

/* ─── CUSTOM RADAR TOOLTIP ─── */
function CustomRadarTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { dimension: string; score: number } }> }) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  const dim = VC_DIMENSIONS.find((d) => d.name === data.dimension);
  return (
    <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-xl max-w-[220px]">
      <p className="text-white font-semibold text-sm">{data.dimension}</p>
      <p className="text-xs mt-1" style={{ color: dim?.color || "#8587e3" }}>
        {data.score}/10 · {dim?.weight}% weight
      </p>
      <p className="text-gray-400 text-xs mt-1">{dim?.detail}</p>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function TermSheet({ vehicle, onClose }: TermSheetProps) {
  const [activeVehicle, setActiveVehicle] = useState(vehicle.id || "equity");
  const [investAmount, setInvestAmount] = useState(2_000_000);
  const [sent, setSent] = useState(false);
  const [expandedDim, setExpandedDim] = useState<string | null>(null);
  const compositeAnimated = useCountUp(COMPOSITE_SCORE, 1800, true);

  const ownership = useMemo(() => ((investAmount / 50_000_000) * 100), [investAmount]);

  const returnScenarios = useMemo(
    () =>
      RETURN_SCENARIOS.map((s) => ({
        ...s,
        investorReturn: (investAmount * s.valuation) / 50,
        returnMultiple: s.valuation / 50,
      })),
    [investAmount]
  );

  const currentVehicle = VEHICLES.find((v) => v.id === activeVehicle) || VEHICLES[0];

  const handleExpress = useCallback(() => {
    const subject = encodeURIComponent(
      `Investment Interest — ${currentVehicle.label} — $${(investAmount / 1_000_000).toFixed(1)}M`
    );
    const body = encodeURIComponent(buildMailtoBody(activeVehicle, investAmount));
    window.open(`mailto:invest@antimatterai.com?subject=${subject}&body=${body}`, "_self");
    setSent(true);
  }, [activeVehicle, investAmount, currentVehicle]);

  const handleSchedule = useCallback(() => {
    const subject = encodeURIComponent("Meeting Request — AntimatterAI Investment Discussion");
    const body = encodeURIComponent(
      `I'd like to schedule a meeting to discuss investing in AntimatterAI.\n\nVehicle of interest: ${currentVehicle.label}\nTarget investment: $${(investAmount / 1_000_000).toFixed(1)}M\n\nPlease suggest available times.`
    );
    window.open(`mailto:invest@antimatterai.com?subject=${subject}&body=${body}`, "_self");
  }, [currentVehicle, investAmount]);

  const formatAmount = (val: number) => {
    if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
    return `$${(val / 1_000).toFixed(0)}K`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl mx-4 my-6 md:my-10 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, hsl(220,15%,8%) 0%, hsl(220,20%,3%) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top gradient bar ── */}
        <div className="h-1 bg-gradient-to-r from-[#8587e3] via-[#00D4FF] to-[#8587e3]" />

        {/* ── Header ── */}
        <div className="px-6 md:px-10 pt-8 pb-6 border-b border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-[#8587e3]" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8587e3] font-['Plus_Jakarta_Sans']">
                  Interactive Term Sheet
                </span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-white mb-1">
                AntimatterAI — Series A
              </h2>
              <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans']">Bloomberg-grade investment decision dashboard</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Company stats bar */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Company", value: "AntimatterAI, Inc." },
              { label: "Round", value: "Series A" },
              { label: "Pre-Money", value: "$40M–$75M", highlight: true },
              { label: "HQ", value: "Atlanta, GA" },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <p className="text-gray-500 text-xs font-['Plus_Jakarta_Sans'] mb-1">{s.label}</p>
                <p className={`text-sm font-semibold font-['Plus_Jakarta_Sans'] ${s.highlight ? "text-[#8587e3]" : "text-white"}`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-10 py-8 space-y-12">

          {/* ═══════════════════════════════════════════
              SECTION 1: VC SCORE DASHBOARD
          ═══════════════════════════════════════════ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-[#8587e3]" />
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white">VC Investment Score</h3>
              <span className="ml-auto text-sm text-gray-500 font-['Plus_Jakarta_Sans']">6-Dimension Institutional Framework</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
                <div className="w-full aspect-square max-w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis
                        dataKey="dimension"
                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Plus Jakarta Sans" }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 10]}
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#8587e3"
                        fill="#8587e3"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                      <Tooltip content={<CustomRadarTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-['Plus_Jakarta_Sans'] mb-1">Weighted Composite</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-4xl font-bold text-[#8587e3]">
                    {compositeAnimated.toFixed(1)}<span className="text-lg text-gray-500">/10</span>
                  </p>
                </div>
              </div>

              {/* Dimension Cards */}
              <div className="space-y-3">
                {VC_DIMENSIONS.map((dim) => {
                  const Icon = dim.icon;
                  const isExpanded = expandedDim === dim.name;
                  return (
                    <motion.button
                      key={dim.name}
                      onClick={() => setExpandedDim(isExpanded ? null : dim.name)}
                      className="w-full text-left p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${dim.color}15` }}>
                          <Icon className="w-5 h-5" style={{ color: dim.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white text-sm font-semibold font-['Plus_Jakarta_Sans']">{dim.name}</span>
                            <span className="text-xs font-['Plus_Jakarta_Sans']" style={{ color: dim.color }}>
                              {dim.score}/10 · {dim.weight}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: dim.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(dim.score / 10) * 100}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            />
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-gray-400 text-xs font-['Plus_Jakarta_Sans'] mt-3 pl-[52px] overflow-hidden"
                          >
                            {dim.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              SECTION 2: INVESTMENT SCENARIO SIMULATOR
          ═══════════════════════════════════════════ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-[#00D4FF]" />
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white">Investment Scenario Simulator</h3>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              {/* Slider */}
              <div className="mb-8">
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans']">Investment Amount</p>
                  <p className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-white">
                    {formatAmount(investAmount)}
                  </p>
                </div>
                <input
                  type="range"
                  min={250_000}
                  max={20_000_000}
                  step={250_000}
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00D4FF ${((investAmount - 250_000) / (20_000_000 - 250_000)) * 100}%, rgba(255,255,255,0.06) ${((investAmount - 250_000) / (20_000_000 - 250_000)) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-2 font-['Plus_Jakarta_Sans']">
                  <span>$250K</span>
                  <span>$5M</span>
                  <span>$10M</span>
                  <span>$20M</span>
                </div>
              </div>

              {/* Ownership */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
                  <p className="text-gray-500 text-xs font-['Plus_Jakarta_Sans'] mb-1">Ownership at $50M Pre-Money</p>
                  <p className="text-[#8587e3] font-['Plus_Jakarta_Sans'] text-2xl font-bold">
                    {ownership.toFixed(2)}%
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
                  <p className="text-gray-500 text-xs font-['Plus_Jakarta_Sans'] mb-1">Post-Money Valuation</p>
                  <p className="text-white font-['Plus_Jakarta_Sans'] text-2xl font-bold">
                    ${((50_000_000 + investAmount) / 1_000_000).toFixed(1)}M
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5 col-span-2 md:col-span-1">
                  <p className="text-gray-500 text-xs font-['Plus_Jakarta_Sans'] mb-1">Prior Dilution</p>
                  <p className="text-[#8587e3] font-['Plus_Jakarta_Sans'] text-2xl font-bold">$0</p>
                  <p className="text-gray-500 text-xs font-['Plus_Jakarta_Sans']">Clean cap table</p>
                </div>
              </div>

              {/* Return Scenarios */}
              <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans'] mb-4">Return Scenarios</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {returnScenarios.map((s) => (
                  <motion.div
                    key={s.label}
                    className="p-4 rounded-xl border border-white/5 relative overflow-hidden"
                    style={{ backgroundColor: `${s.color}08` }}
                    whileHover={{ scale: 1.03, borderColor: `${s.color}40` }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="absolute inset-0 opacity-5" style={{
                      background: `radial-gradient(circle at bottom right, ${s.color}, transparent 70%)`,
                    }} />
                    <p className="text-xs text-gray-500 font-['Plus_Jakarta_Sans'] mb-1 relative">{s.label}</p>
                    <p className="text-lg font-bold font-['Plus_Jakarta_Sans'] relative" style={{ color: s.color }}>
                      ${s.valuation}M
                    </p>
                    <p className="text-xs text-gray-400 font-['Plus_Jakarta_Sans'] mt-1 relative">
                      {s.returnMultiple.toFixed(1)}x → <span className="text-white font-semibold">
                        {formatAmount(s.investorReturn)}
                      </span>
                    </p>
                    {/* Animated bar */}
                    <div className="w-full h-1 rounded-full bg-white/5 mt-3 overflow-hidden relative">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((s.returnMultiple / 10) * 100, 100)}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              SECTION 3: THREE INVESTMENT VEHICLES (TABS)
          ═══════════════════════════════════════════ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-[#8587e3]" />
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white">Investment Vehicles</h3>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {VEHICLES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVehicle(v.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold font-['Plus_Jakarta_Sans'] transition-all whitespace-nowrap ${
                    activeVehicle === v.id
                      ? "text-black"
                      : "text-gray-400 bg-white/[0.03] border border-white/5 hover:border-white/10"
                  }`}
                  style={
                    activeVehicle === v.id
                      ? { backgroundColor: v.color }
                      : undefined
                  }
                >
                  {v.label}
                  {v.recommended && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeVehicle === v.id ? "bg-black/20 text-black" : "bg-[#8587e3]/10 text-[#8587e3]"
                    }`}>
                      Recommended
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Vehicle Terms Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVehicle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-xl border border-white/5"
                style={{ backgroundColor: `${currentVehicle.color}04` }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  {currentVehicle.terms.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: currentVehicle.color }} />
                      <div>
                        <p className="text-xs text-gray-500 font-['Plus_Jakarta_Sans']">{t.label}</p>
                        <p className="text-sm text-white font-['Plus_Jakarta_Sans'] font-medium">{t.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ═══════════════════════════════════════════
              SECTION 4: "WHY NOW" URGENCY
          ═══════════════════════════════════════════ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-[#FFD700]" />
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white">Why Now</h3>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              {/* Key statement */}
              <div className="text-center mb-8">
                <p className="text-white font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold mb-3">
                  Self-funded. Pre-revenue. Clean cap table. $0 prior dilution.
                </p>
                <p className="text-gray-400 text-sm font-['Plus_Jakarta_Sans'] max-w-2xl mx-auto">
                  The window to invest at pre-revenue pricing closes the moment the first contract signs.
                </p>
              </div>

              {/* Visual Timeline */}
              <div className="relative mb-8">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[15%] bg-gradient-to-r from-[#FFD700] to-[#8587e3] rounded-full" />
                </div>
                <div className="flex justify-between mt-3 text-xs font-['Plus_Jakarta_Sans']">
                  <span className="text-gray-500">Founded</span>
                  <div className="flex flex-col items-center -mt-7">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#FFD700] border-2 border-black"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[#FFD700] font-semibold mt-2">You Are Here</span>
                    <span className="text-gray-500">Pre-Revenue</span>
                  </div>
                  <span className="text-gray-500">First Contract</span>
                  <span className="text-gray-500">Series B</span>
                  <span className="text-gray-500">IPO</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Rocket, label: "$4M+ Pipeline", sub: "Converting now", color: "#8587e3" },
                  { icon: Clock, label: "90-Day Sprint", sub: "$1M pipeline velocity", color: "#00D4FF" },
                  { icon: Building2, label: "Fortune 500", sub: "Production clients", color: "#8587e3" },
                  { icon: Zap, label: "11 Products", sub: "Shipped & live", color: "#FFD700" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="p-4 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: item.color }} />
                      <p className="text-white text-sm font-semibold font-['Plus_Jakarta_Sans']">{item.label}</p>
                      <p className="text-gray-500 text-xs font-['Plus_Jakarta_Sans']">{item.sub}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              SECTION 5: INVESTOR ACTION ZONE
          ═══════════════════════════════════════════ */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-6 rounded-full bg-[#FF6B9D]" />
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-white">Take Action</h3>
            </div>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleExpress}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm font-['Plus_Jakarta_Sans'] transition-all hover:brightness-110 bg-gradient-to-r from-[#8587e3] via-[#4c4dac] to-[#696aac] text-white shadow-[0_0_10px_#696aac]"
                >
                  <Send className="w-4 h-4" />
                  {sent ? "Sent! — Check Your Email Client" : "Express Interest"}
                </button>
                <button
                  onClick={handleSchedule}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm font-['Plus_Jakarta_Sans'] transition-all border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/10"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Meeting
                </button>
              </div>

              {/* Download Documents */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { label: "Investor Deck", href: "/antimatterai_investor_deck.pdf" },
                  { label: "State of Disruption", href: "/antimatterai_state_of_disruption.pdf" },
                  { label: "ATOM Architecture", href: "/atom_technical_architecture.pdf" },
                  { label: "ClinixAI Overview", href: "/clinixai_overview.pdf" },
                ].map((doc) => (
                  <a
                    key={doc.label}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-gray-400 text-xs font-['Plus_Jakarta_Sans'] hover:text-white hover:border-white/10 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {doc.label}
                  </a>
                ))}
              </div>

              {/* Trust: Fortune 500 Clients */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-gray-500 text-xs font-['Plus_Jakarta_Sans'] uppercase tracking-wider mb-3">
                  Trusted by Fortune 500 — Production Systems
                </p>
                <div className="flex flex-wrap gap-3">
                  {TRUST_CLIENTS.map((name) => (
                    <div key={name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8587e3]" />
                      <span className="text-gray-300 text-xs font-['Plus_Jakarta_Sans'] font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-600 text-center font-['Plus_Jakarta_Sans']">
            All projections are forward-looking estimates. Investment involves risk. Contact{" "}
            <span className="text-[#8587e3]">invest@antimatterai.com</span> for complete offering documents.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
