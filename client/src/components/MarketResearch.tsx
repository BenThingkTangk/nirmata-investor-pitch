import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Download,
  TrendingUp,
  Shield,
  Zap,
  Brain,
  Globe,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  Layers,
  Users,
  DollarSign,
  Award,
  Clock,
  ChevronRight,
  Sparkles,
  BarChart3,
  Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// ─── ANIMATED COUNTER ───
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── CUSTOM TOOLTIP ───
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-black/90 backdrop-blur-md px-4 py-3 shadow-xl">
      <p className="text-sm font-medium text-white/70 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color || "#8587e3" }}>
          {entry.name}: {typeof entry.value === "number" ? `$${entry.value}B` : entry.value}
        </p>
      ))}
    </div>
  );
}

// ─── SECTION WRAPPER ───
function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-24 md:mb-32 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── DATA ───

const tamData = [
  { market: "Healthcare AI", val2024: 21.66, val2030: 110.61, cagr: 48.0, color: "#8587e3" },
  { market: "Enterprise AI", val2024: 18.22, val2030: 94.31, cagr: 38.9, color: "#00DDa0" },
  { market: "Agentic AI", val2024: 9.14, val2030: 139.19, cagr: 40.5, color: "#8587e3" },
  { market: "AI Browser", val2024: 4.5, val2030: 76.8, cagr: 32.8, color: "#6c6ebd" },
];

const vendorScores = [
  { vendor: "Atom", score: 25, isAtom: true },
  { vendor: "Kore.ai", score: 17, isAtom: false },
  { vendor: "IBM watsonx", score: 16, isAtom: false },
  { vendor: "Cognigy", score: 15, isAtom: false },
  { vendor: "Sierra", score: 13, isAtom: false },
  { vendor: "Google DFCX", score: 12, isAtom: false },
  { vendor: "Amazon Lex", score: 11, isAtom: false },
  { vendor: "Yellow.ai", score: 11, isAtom: false },
  { vendor: "Avaamo", score: 10, isAtom: false },
  { vendor: "LivePerson", score: 8, isAtom: false },
  { vendor: "Nuance", score: 8, isAtom: false },
];

const competitorMatrix = [
  { vendor: "Atom", ip: "full", deploy: "full", genui: "full", modelAgnostic: "full", postQuantum: "full", total: "25/25" },
  { vendor: "Kore.ai", ip: "partial", deploy: "partial", genui: "none", modelAgnostic: "full", postQuantum: "none", total: "17/25" },
  { vendor: "IBM watsonx", ip: "none", deploy: "partial", genui: "none", modelAgnostic: "partial", postQuantum: "none", total: "16/25" },
  { vendor: "Cognigy", ip: "none", deploy: "none", genui: "none", modelAgnostic: "partial", postQuantum: "none", total: "15/25" },
  { vendor: "Sierra", ip: "none", deploy: "none", genui: "none", modelAgnostic: "partial", postQuantum: "none", total: "13/25" },
  { vendor: "Google DFCX", ip: "none", deploy: "none", genui: "none", modelAgnostic: "none", postQuantum: "none", total: "12/25" },
  { vendor: "Amazon Lex", ip: "none", deploy: "none", genui: "none", modelAgnostic: "none", postQuantum: "none", total: "11/25" },
  { vendor: "Yellow.ai", ip: "none", deploy: "partial", genui: "none", modelAgnostic: "partial", postQuantum: "none", total: "11/25" },
  { vendor: "Avaamo", ip: "none", deploy: "partial", genui: "none", modelAgnostic: "partial", postQuantum: "none", total: "10/25" },
  { vendor: "LivePerson", ip: "none", deploy: "none", genui: "none", modelAgnostic: "none", postQuantum: "none", total: "8/25" },
  { vendor: "Nuance", ip: "none", deploy: "none", genui: "none", modelAgnostic: "none", postQuantum: "none", total: "8/25" },
];

const investmentStats = [
  { label: "AI VC Funding (2024)", value: 131.5, prefix: "$", suffix: "B", decimals: 1, sub: "52% YoY increase" },
  { label: "Share of All VC", value: 37, prefix: "", suffix: "%", decimals: 0, sub: "All-time high" },
  { label: "Q4 NA Startup Funding → AI", value: 62, prefix: "", suffix: "%", decimals: 0, sub: "North America" },
  { label: "Seed-Stage AI Premium", value: 42, prefix: "", suffix: "%", decimals: 0, sub: "Valuation premium" },
  { label: "Avg Series A AI Funding", value: 51.9, prefix: "$", suffix: "M", decimals: 1, sub: "Series A average" },
  { label: "Series B Median Valuation", value: 143, prefix: "$", suffix: "M", decimals: 0, sub: "AI startups" },
];

const macroConvergence = [
  {
    icon: Layers,
    title: "Enterprise AI Consolidation",
    year: "2026",
    desc: "CIOs reducing vendors from 10+ to 2-3. Platforms with full-stack capability win.",
  },
  {
    icon: Shield,
    title: "Regulatory Acceleration",
    year: "GDPR • HIPAA • EU AI Act",
    desc: "Data sovereignty is now mandatory. Deploy-anywhere architectures become table stakes.",
  },
  {
    icon: Brain,
    title: "LLM Commoditization",
    year: "Model-Agnostic Wins",
    desc: "Value shifting to orchestration layer. Vendor lock-in to a single model is a liability.",
  },
];

const tenReasons = [
  {
    num: "01",
    title: "Only Platform with 100% Capability Coverage",
    detail: "Atom scores 25/25 across all dimensions. The next closest competitor, Kore.ai, manages only 17/25. An 8-point lead in a 25-point scale is unprecedented in enterprise AI.",
  },
  {
    num: "02",
    title: "IP Ownership Moat",
    detail: "No competitor offers full IP ownership to the customer. Every deployment, every customization, every trained model — the customer owns it all. This is the ultimate enterprise selling point.",
  },
  {
    num: "03",
    title: "GenUI Is Unique",
    detail: "Generative UI — dynamic, AI-generated interfaces that adapt in real-time. No other enterprise AI vendor has this capability. It's not on their roadmap because they don't have the architecture.",
  },
  {
    num: "04",
    title: "Model-Agnostic = Future-Proof",
    detail: "Atom works with any LLM — OpenAI, Anthropic, Google, Meta, or custom models. As the model landscape shifts, Atom customers are never locked in.",
  },
  {
    num: "05",
    title: "Deploy Anywhere = Regulatory Compliance Ready",
    detail: "VPC, on-prem, edge, air-gapped, multi-cloud. When regulators mandate data sovereignty, Atom is already compliant. Competitors offering SaaS-only are structurally blocked.",
  },
  {
    num: "06",
    title: "Self-Funded = Capital Discipline + No Dilution",
    detail: "Built without VC burn. Every dollar has been efficient. New investment goes to growth, not paying down technical debt or supporting bloated teams.",
  },
  {
    num: "07",
    title: "Healthcare Expertise with Clinix AI",
    detail: "78% reduction in clinical documentation time. Healthcare AI market growing at 48% CAGR. Clinix AI targets 1,000+ providers, proving Atom's vertical depth.",
  },
  {
    num: "08",
    title: "AntimatterAI Ecosystem = Cross-Sell Flywheel",
    detail: "5 portfolio companies create built-in demand, production validation, reference architectures, and revenue synergies. Near-zero customer acquisition cost for initial deployments.",
  },
  {
    num: "09",
    title: "Akamai / Linode Edge Partnership",
    detail: "Edge deployment partnership with one of the world's largest CDN and cloud infrastructure providers. Instant global distribution and ultra-low latency AI inference.",
  },
  {
    num: "10",
    title: "Post-Quantum Cryptography Readiness",
    detail: "Atom is the only enterprise AI platform with post-quantum cryptography built in. As quantum computing advances, Atom-powered systems remain secure.",
  },
];

const gapAnalysis = [
  { gap: "Brand Recognition", issue: "Lower than Sierra/competitors", mitigation: "Strategic PR, conference presence, thought leadership", investment: "$2-5M/yr", severity: "amber" },
  { gap: "Revenue Disclosure", issue: "No public ARR metrics", mitigation: "Establish verifiable milestones, transparent reporting", investment: "—", severity: "amber" },
  { gap: "Analyst Coverage", issue: "No Gartner/Forrester coverage", mitigation: "Engage analysts, target MQ inclusion by H2 2027", investment: "—", severity: "amber" },
  { gap: "Team Scale", issue: "Leaner than Sierra's 359+", mitigation: "50-80 strategic hires in 12 months", investment: "—", severity: "amber" },
  { gap: "Funding Gap", issue: "Self-funded limits growth speed", mitigation: "$50-150M strategic investment round", investment: "$50-150M", severity: "red" },
  { gap: "Enterprise GTM", issue: "No dedicated sales force", mitigation: "VP Sales + 10-person BDR/AE team", investment: "—", severity: "red" },
  { gap: "Browser Maturity", issue: "Early access, not shipping yet", mitigation: "GA within 6-9 months of funding", investment: "—", severity: "amber" },
  { gap: "Geographic Footprint", issue: "Atlanta HQ, limited global presence", mitigation: "SF, London, Singapore expansion", investment: "—", severity: "amber" },
];

const gtmTimeline = [
  {
    phase: "Foundation",
    timeline: "Q1–Q2 2026",
    actions: ["Hire VP Sales", "Build BDR team", "Launch partner program"],
    milestones: "10 enterprise pipeline deals",
    icon: Target,
  },
  {
    phase: "Acceleration",
    timeline: "Q3–Q4 2026",
    actions: ["Gartner engagement", "Conference presence", "Analyst briefings"],
    milestones: "$5M+ ARR, 5 enterprise logos",
    icon: Zap,
  },
  {
    phase: "Scale",
    timeline: "H1 2027",
    actions: ["Atom Browser GA", "Geographic expansion", "Channel scaling"],
    milestones: "$15M+ ARR, analyst recognition",
    icon: Globe,
  },
];

const portfolioCompanies = [
  { name: "AntimatterAI", focus: "Core AI Platform", integration: "Powers all portfolio companies", icon: Brain },
  { name: "ClinixAI", focus: "Clinical Documentation", integration: "78% reduction in documentation time", icon: Users },
  { name: "MoleculeAI", focus: "Molecular Research", integration: "AI orchestration for molecular analysis", icon: Layers },
  { name: "Vidzee", focus: "AI Video & PropTech", integration: "Automated listing video creation at scale", icon: Sparkles },
  { name: "ATOM Browser", focus: "AI-Native Browser", integration: "Agent capabilities baked into browsing", icon: Globe },
  { name: "ATOM Lead Gen", focus: "AI Sales Development", integration: "Cold calls, emails, closes with AI", icon: Target },
];

const flywheelEffects = [
  "Demand Generation — near-zero CAC",
  "Product Validation — production stress-testing",
  "Reference Architecture — replicable templates",
  "Revenue Synergy — cross-sell network effect",
  "Data Flywheel — aggregate insights improve AI",
];

const keyMetrics = [
  { label: "Liquid Valuation", value: 10.5, prefix: "$", suffix: "B", decimals: 1 },
  { label: "Vendor Matrix Score", value: 25, prefix: "", suffix: "/25", decimals: 0 },
  { label: "Projects Delivered", value: 99, prefix: "", suffix: "+", decimals: 0 },
  { label: "Client Satisfaction", value: 99, prefix: "", suffix: "%+", decimals: 0 },
  { label: "Clinix AI Impact", value: 78, prefix: "", suffix: "%", decimals: 0 },
  { label: "Clinix AI Target", value: 1000, prefix: "", suffix: "+", decimals: 0 },
];

const enterpriseClients = ["Lowe's", "Cognizant", "Trimble", "E2open", "Toyota", "OWASP", "Injazat"];

const fullVendorMatrix = [
  "Customer Owns IP & Runtime",
  "VPC/On-Prem/Edge Deployment",
  "Hybrid Cloud Support",
  "Multi-Cloud Compatibility",
  "Air-Gapped Environment Support",
  "Multi-Agent Orchestration",
  "Voice Agent Support",
  "Workflow Automation Agents",
  "Security-Focused Agents",
  "Human-in-the-Loop Escalation",
  "RAG (Retrieval-Augmented Generation)",
  "Custom Knowledge Base Integration",
  "Real-Time Data Grounding",
  "Document Understanding / OCR",
  "Multi-Modal Input Support",
  "GenUI / Dynamic UI Generation",
  "Model-Agnostic Architecture",
  "BYO Model Support",
  "Conversational UX",
  "Omnichannel Deployment",
  "Analytics & Reporting Dashboard",
  "Conversation Quality Assurance",
  "A/B Testing for Agents",
  "Audit Logs & Compliance Reporting",
  "Post-Quantum Cryptography Readiness",
];

// ─── COMPONENT ───

export default function MarketResearch() {
  const [showFullMatrix, setShowFullMatrix] = useState(false);

  return (
    <section
      id="market-research"
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#8587e3]/[0.03] blur-[150px]" />
        <div className="absolute top-[60%] right-0 w-[600px] h-[600px] rounded-full bg-[#8587e3]/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════════
            1. SECTION HEADER
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge className="mb-6 bg-[#8587e3]/10 text-[#8587e3] border-[#8587e3]/30 text-sm px-4 py-1.5">
                <BarChart3 className="w-4 h-4 mr-2" />
                Investor Intelligence
              </Badge>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="gradient-text">MARKET RESEARCH</span>
                <br />
                <span className="text-white/90">&amp; INTELLIGENCE</span>
              </h2>
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10">
                Comprehensive market analysis validating the ATOM investment thesis
              </p>
              <a
                href="/antimatterai_market_research.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-[#8587e3]/40 bg-[#8587e3]/10 text-[#8587e3] font-semibold text-base hover:bg-[#8587e3]/20 hover:border-[#8587e3]/60 transition-all duration-300 glow-teal-strong"
              >
                <Download className="w-5 h-5" />
                Download Full Report
              </a>
            </motion.div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            2. TAM / SAM / SOM VISUALIZATION
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Total Addressable Market
            </h3>
            <p className="text-white/50 text-lg">Four converging markets → <span className="text-[#8587e3] font-semibold">$310B+ by 2030</span></p>
          </div>

          {/* Market bars */}
          <div className="grid gap-6 mb-16">
            {tamData.map((m, idx) => (
              <motion.div
                key={m.market}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="glass rounded-xl p-5 md:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-48 shrink-0">
                    <p className="text-white font-semibold text-base">{m.market}</p>
                    <p className="text-white/40 text-sm">${m.val2024}B → ${m.val2030}B</p>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-10 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(m.val2030 / 140) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${m.color}40, ${m.color})`,
                          boxShadow: `0 0 20px ${m.color}40`,
                        }}
                      />
                      {/* 2024 marker */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.0 + idx * 0.12 }}
                        className="absolute inset-y-0 flex items-center"
                        style={{ left: `${(m.val2024 / 140) * 100}%` }}
                      >
                        <div className="w-0.5 h-full bg-white/30" />
                      </motion.div>
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-white/30 text-xs">2024: ${m.val2024}B</span>
                      <span className="text-white/60 text-xs font-medium">2030: ${m.val2030}B</span>
                    </div>
                  </div>
                  <Badge className="shrink-0 bg-[#8587e3]/10 text-[#8587e3] border-[#8587e3]/30 font-mono text-sm">
                    {m.cagr}% CAGR
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TAM > SAM > SOM nested display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              {/* TAM ring */}
              <div className="rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/[0.03] p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/40 text-sm font-medium uppercase tracking-wider">TAM — Total Addressable Market</span>
                  <span className="font-display text-2xl md:text-3xl font-bold gradient-text">
                    <AnimatedCounter target={310} prefix="$" suffix="B+" decimals={0} />
                  </span>
                </div>
                {/* SAM ring */}
                <div className="rounded-xl border border-[#8587e3]/20 bg-[#8587e3]/[0.05] p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/40 text-sm font-medium uppercase tracking-wider">SAM — Serviceable Addressable</span>
                    <span className="font-display text-xl md:text-2xl font-bold text-[#8587e3]">
                      <AnimatedCounter target={4.2} prefix="~$" suffix="B" decimals={1} />
                    </span>
                  </div>
                  {/* SOM ring */}
                  <div className="rounded-lg border border-[#8587e3]/30 bg-[#8587e3]/[0.08] p-4 md:p-5 text-center glow-teal-strong">
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wider block mb-2">SOM — Serviceable Obtainable</span>
                    <span className="font-display text-2xl md:text-3xl font-bold text-[#8587e3]">
                      $42–84M
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ══════════════════════════════════════════════
            3. COMPETITIVE LANDSCAPE
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Competitive Landscape
            </h3>
            <p className="text-white/50 text-lg">25-Dimension Vendor Scoring Matrix</p>
          </div>

          {/* 8-point lead callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#8587e3]/30 bg-[#8587e3]/10">
              <Award className="w-5 h-5 text-[#8587e3]" />
              <span className="text-[#8587e3] font-semibold">8-point lead</span>
              <span className="text-white/50">over nearest competitor</span>
            </div>
          </motion.div>

          {/* Horizontal bar chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-xl p-4 md:p-8 mb-10"
          >
            <ResponsiveContainer width="100%" height={440}>
              <BarChart
                data={vendorScores}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis type="number" domain={[0, 25]} tick={{ fill: "#ffffff50", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="vendor"
                  tick={{ fill: "#ffffffcc", fontSize: 13 }}
                  axisLine={false}
                  tickLine={false}
                  width={110}
                />
                <Tooltip content={<VendorTooltip />} cursor={false} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={28}>
                  {vendorScores.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={entry.isAtom ? "#8587e3" : "#ffffff18"}
                      stroke={entry.isAtom ? "#8587e3" : "transparent"}
                      strokeWidth={entry.isAtom ? 1 : 0}
                      style={entry.isAtom ? { filter: "drop-shadow(0 0 8px #8587e380)" } : {}}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Competitor Matrix Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-white/70 font-semibold">Vendor</TableHead>
                    <TableHead className="text-white/70 font-semibold text-center">IP Ownership</TableHead>
                    <TableHead className="text-white/70 font-semibold text-center">Deployment</TableHead>
                    <TableHead className="text-white/70 font-semibold text-center">GenUI</TableHead>
                    <TableHead className="text-white/70 font-semibold text-center">Model-Agnostic</TableHead>
                    <TableHead className="text-white/70 font-semibold text-center">Post-Quantum</TableHead>
                    <TableHead className="text-white/70 font-semibold text-center">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competitorMatrix.map((row) => (
                    <TableRow
                      key={row.vendor}
                      className={
                        row.vendor === "Atom"
                          ? "border-[#8587e3]/20 bg-[#8587e3]/[0.05]"
                          : "border-white/5"
                      }
                    >
                      <TableCell className={`font-semibold ${row.vendor === "Atom" ? "text-[#8587e3]" : "text-white/80"}`}>
                        {row.vendor}
                      </TableCell>
                      {(["ip", "deploy", "genui", "modelAgnostic", "postQuantum"] as const).map((key) => (
                        <TableCell key={key} className="text-center">
                          <CapabilityBadge status={row[key]} />
                        </TableCell>
                      ))}
                      <TableCell className={`text-center font-mono font-bold ${row.vendor === "Atom" ? "text-[#8587e3]" : "text-white/60"}`}>
                        {row.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </Section>

        {/* ══════════════════════════════════════════════
            4. INVESTMENT CLIMATE & WHY NOW
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Investment Climate
            </h3>
            <p className="text-white/50 text-lg">Why now is the optimal entry point</p>
          </div>

          {/* Stat counters grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
            {investmentStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass rounded-xl p-5 md:p-6 text-center"
              >
                <p className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </p>
                <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Mega-cap spending callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-10 py-6 rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/[0.03]">
              <p className="text-white/40 text-sm uppercase tracking-wider mb-2">Tech Megacap Planned AI Spending</p>
              <p className="font-display text-4xl md:text-5xl font-bold gradient-text">
                <AnimatedCounter target={300} prefix="$" suffix="B+" decimals={0} />
              </p>
            </div>
          </motion.div>

          {/* Bill Gurley Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="glass rounded-2xl p-8 md:p-10 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-[#8587e3]/20" />
              <Quote className="absolute bottom-6 right-6 w-10 h-10 text-[#8587e3]/20 rotate-180" />
              <blockquote className="text-center">
                <p className="font-display text-xl md:text-2xl lg:text-3xl font-medium text-white/90 italic leading-relaxed mb-6">
                  "Institutional investors currently display no interest in ventures outside AI."
                </p>
                <footer className="flex items-center justify-center gap-3">
                  <div className="h-px w-8 bg-[#8587e3]/40" />
                  <span className="text-[#8587e3] font-semibold">Bill Gurley</span>
                  <span className="text-white/40">General Partner, Benchmark</span>
                  <div className="h-px w-8 bg-[#8587e3]/40" />
                </footer>
              </blockquote>
            </div>
          </motion.div>

          {/* Macro Convergence Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {macroConvergence.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="glass rounded-xl p-6 md:p-8 group hover:border-[#8587e3]/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#8587e3]/10 flex items-center justify-center mb-5 group-hover:bg-[#8587e3]/20 transition-colors">
                  <card.icon className="w-6 h-6 text-[#8587e3]" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-1">{card.title}</h4>
                <p className="text-[#8587e3]/70 text-sm font-medium mb-3">{card.year}</p>
                <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            5. 10 REASONS ATOM IS A BETTER BET
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              10 Reasons Atom Is a Better Bet
            </h3>
            <p className="text-white/50 text-lg">Why the investment thesis is structurally superior</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {tenReasons.map((reason, idx) => (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <AccordionItem
                  value={`reason-${reason.num}`}
                  className="glass rounded-xl border-white/5 px-5 md:px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[#8587e3] text-sm font-bold shrink-0">{reason.num}</span>
                      <span className="text-white font-semibold text-base">{reason.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 text-sm leading-relaxed pb-5">
                    {reason.detail}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </Section>

        {/* ══════════════════════════════════════════════
            6. HONEST GAP ANALYSIS
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Honest Gap Analysis
            </h3>
            <p className="text-white/50 text-lg">Transparency builds trust — here's what we're addressing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10">
            {gapAnalysis.map((gap, idx) => (
              <motion.div
                key={gap.gap}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="glass rounded-xl overflow-hidden group"
              >
                <div className="flex">
                  {/* Severity bar */}
                  <div
                    className={`w-1 shrink-0 ${
                      gap.severity === "red"
                        ? "bg-red-500/60"
                        : "bg-amber-500/60"
                    }`}
                  />
                  <div className="p-5 md:p-6 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="text-white font-semibold text-base mb-1">{gap.gap}</h4>
                        <p className="text-white/40 text-sm">{gap.issue}</p>
                      </div>
                      {gap.investment !== "—" && (
                        <Badge className="shrink-0 bg-red-500/10 text-red-400 border-red-500/20 text-xs">
                          {gap.investment}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-start gap-2 mt-3 pt-3 border-t border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#8587e3] mt-0.5 shrink-0" />
                      <p className="text-[#8587e3]/80 text-sm">{gap.mitigation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gap closure callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block glass rounded-xl px-8 py-5 border-[#8587e3]/20">
              <p className="text-white/50 text-sm mb-2">Total investment to close all gaps</p>
              <p className="font-display text-2xl md:text-3xl font-bold text-white">
                <span className="text-[#8587e3]">$50–150M</span>{" "}
                <span className="text-white/40 text-lg">over 18 months</span>{" "}
                <span className="text-white/60 text-lg">→ capture</span>{" "}
                <span className="gradient-text">$310B+ TAM</span>
              </p>
            </div>
          </motion.div>
        </Section>

        {/* ══════════════════════════════════════════════
            7. GTM EXECUTION TIMELINE
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              GTM Execution Timeline
            </h3>
            <p className="text-white/50 text-lg">18-month path to market leadership</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8587e3]/20 to-transparent -translate-y-1/2" />

            <div className="grid md:grid-cols-3 gap-6">
              {gtmTimeline.map((phase, idx) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative"
                >
                  {/* Phase node */}
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-full bg-[#8587e3]/10 border border-[#8587e3]/30 flex items-center justify-center relative z-10"
                      style={{ boxShadow: "0 0 20px rgba(133,135,227,0.15)" }}
                    >
                      <phase.icon className="w-6 h-6 text-[#8587e3]" />
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6 text-center">
                    <Badge className="mb-3 bg-[#8587e3]/10 text-[#8587e3] border-[#8587e3]/30 text-xs">
                      {phase.timeline}
                    </Badge>
                    <h4 className="text-white font-semibold text-xl mb-4">{phase.phase}</h4>
                    <ul className="space-y-2 mb-5">
                      {phase.actions.map((action) => (
                        <li key={action} className="text-white/50 text-sm flex items-center gap-2 justify-center">
                          <ChevronRight className="w-3 h-3 text-[#8587e3]" />
                          {action}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[#8587e3] text-sm font-semibold">{phase.milestones}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            8. NIRMATA HOLDINGS ECOSYSTEM
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              AntimatterAI Ecosystem
            </h3>
            <p className="text-white/50 text-lg">Integrated portfolio with built-in demand generation</p>
          </div>

          {/* Portfolio companies */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {portfolioCompanies.map((company, idx) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`glass rounded-xl p-6 ${
                  company.name === "AntimatterAI"
                    ? "border-[#8587e3]/20 bg-[#8587e3]/[0.03] sm:col-span-2 lg:col-span-1"
                    : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      company.name === "AntimatterAI"
                        ? "bg-[#8587e3]/15"
                        : "bg-[#8587e3]/10"
                    }`}
                  >
                    <company.icon
                      className={`w-5 h-5 ${
                        company.name === "AntimatterAI"
                          ? "text-[#8587e3]"
                          : "text-[#8587e3]"
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-base mb-1 ${
                      company.name === "AntimatterAI" ? "text-[#8587e3]" : "text-white"
                    }`}>
                      {company.name}
                    </h4>
                    <p className="text-white/40 text-sm mb-2">{company.focus}</p>
                    <p className="text-white/60 text-xs">{company.integration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Flywheel effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-xl p-6 md:p-8"
          >
            <h4 className="text-center text-white font-semibold text-lg mb-6">Flywheel Effects</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {flywheelEffects.map((effect, idx) => (
                <motion.div
                  key={effect}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#8587e3]/20 bg-[#8587e3]/[0.05]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#8587e3]" />
                  <span className="text-white/70 text-sm">{effect}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ══════════════════════════════════════════════
            9. KEY METRICS DASHBOARD
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Key Metrics
            </h3>
            <p className="text-white/50 text-lg">The numbers that matter</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {keyMetrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass rounded-xl p-6 text-center group hover:border-[#8587e3]/20 transition-colors duration-300"
              >
                <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter
                    target={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                  />
                </p>
                <p className="text-white/50 text-sm font-medium">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Self-funded + 24/7 cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl p-6 flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-xl bg-[#8587e3]/10 flex items-center justify-center shrink-0">
                <DollarSign className="w-7 h-7 text-[#8587e3]" />
              </div>
              <div>
                <p className="text-white font-semibold text-xl">Self-Funded</p>
                <p className="text-white/40 text-sm">Capital discipline, zero dilution to date</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-xl p-6 flex items-center gap-5"
            >
              <div className="w-14 h-14 rounded-xl bg-[#8587e3]/10 flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7 text-[#8587e3]" />
              </div>
              <div>
                <p className="text-white font-semibold text-xl">24/7 Support</p>
                <p className="text-white/40 text-sm">Enterprise-grade global support coverage</p>
              </div>
            </motion.div>
          </div>

          {/* Trusted enterprise clients */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-white/40 text-sm uppercase tracking-wider mb-4">Trusted by Enterprise</p>
            <div className="flex flex-wrap justify-center gap-3">
              {enterpriseClients.map((client) => (
                <span
                  key={client}
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-sm font-medium"
                >
                  {client}
                </span>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ══════════════════════════════════════════════
            10. FULL 25-DIMENSION VENDOR MATRIX
        ══════════════════════════════════════════════ */}
        <Section>
          <div className="text-center mb-10">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Full 25-Dimension Vendor Matrix
            </h3>
            <p className="text-white/50 text-lg mb-6">
              Complete capability assessment — Atom achieves{" "}
              <span className="text-[#8587e3] font-semibold">full support on all 25 dimensions</span>
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-8 py-4 rounded-xl border border-[#8587e3]/30 bg-[#8587e3]/[0.05] glow-teal-strong mb-8"
            >
              <p className="font-display text-3xl md:text-4xl font-bold gradient-text">
                <AnimatedCounter target={25} suffix=" of 25" decimals={0} />
              </p>
              <p className="text-white/40 text-sm mt-1">Capabilities — Full Support</p>
            </motion.div>
          </div>

          {/* Toggle show/hide */}
          <div className="text-center mb-6">
            <button
              onClick={() => setShowFullMatrix(!showFullMatrix)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-white/70 text-sm font-medium hover:bg-white/[0.06] hover:border-white/20 transition-all"
            >
              {showFullMatrix ? "Hide" : "Show"} Full Matrix
              <motion.div
                animate={{ rotate: showFullMatrix ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-4 h-4 rotate-90" />
              </motion.div>
            </button>
          </div>

          {/* Expandable matrix */}
          <motion.div
            initial={false}
            animate={{
              height: showFullMatrix ? "auto" : 0,
              opacity: showFullMatrix ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="glass rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-white/70 font-semibold w-10">#</TableHead>
                    <TableHead className="text-white/70 font-semibold">Capability</TableHead>
                    <TableHead className="text-white/70 font-semibold text-center">Atom Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fullVendorMatrix.map((cap, idx) => (
                    <TableRow key={idx} className="border-white/5">
                      <TableCell className="text-white/30 font-mono text-sm">{String(idx + 1).padStart(2, "0")}</TableCell>
                      <TableCell className="text-white/80 text-sm">{cap}</TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center gap-1.5 text-[#8587e3] text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Full Support
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        </Section>
      </div>
    </section>
  );
}

// ─── HELPER COMPONENTS ───

function CapabilityBadge({ status }: { status: string }) {
  switch (status) {
    case "full":
      return (
        <span className="inline-flex items-center gap-1 text-[#8587e3] text-sm">
          <CheckCircle2 className="w-4 h-4" />
        </span>
      );
    case "partial":
      return (
        <span className="text-amber-400/80 text-xs font-medium">Partial</span>
      );
    case "none":
    default:
      return (
        <span className="text-white/20 text-sm">✗</span>
      );
  }
}

function VendorTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { vendor: string; score: number; isAtom: boolean } }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/10 bg-black/90 backdrop-blur-md px-4 py-3 shadow-xl">
      <p className={`text-sm font-semibold ${d.isAtom ? "text-[#8587e3]" : "text-white"}`}>
        {d.vendor}
      </p>
      <p className="text-white/60 text-sm">
        Score: <span className="text-white font-medium">{d.score}/25</span>
      </p>
    </div>
  );
}
