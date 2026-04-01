import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain, Zap, TrendingUp, Globe, Shield, Cpu, DollarSign,
  Activity, Layers, ChevronRight, Users, Building2, Crown,
  Lock, Eye, Rocket, Target, Code, CheckCircle2, Heart,
  BarChart3, Network, Briefcase, Star, ArrowRight, Factory,
  Sparkles, Check
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  ScatterChart, Scatter, CartesianGrid, ZAxis
} from "recharts";

/* ══════════════════════════════════════════════════════════════════
   LOCAL HELPERS (self-contained — not imported from home.tsx)
   ══════════════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#8587e3]" />
      <span className="text-[#8587e3] text-xs font-semibold tracking-[0.2em] uppercase font-['Plus_Jakarta_Sans']">{children}</span>
      <div className="w-6 h-px bg-[#8587e3]" />
    </div>
  );
}

function RevealDiv({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedStat({ value, prefix = "", suffix = "", label, source, color = "#8587e3" }: {
  value: number; prefix?: string; suffix?: string; label: string; source?: string; color?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 2000, inView);
  return (
    <div ref={ref} className="p-5 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm text-center hover:border-opacity-40 transition-all group"
      style={{ borderColor: `${color}15` }}>
      <div className="text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans'] mb-1 transition-transform group-hover:scale-105" style={{ color }}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-white/70 text-sm font-['Plus_Jakarta_Sans'] font-semibold mb-1">{label}</div>
      {source && <div className="text-white/30 text-xs font-['Plus_Jakarta_Sans']">{source}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */

const SPEND_DATA = [
  { year: "2025", services: 0.72, infra: 0.52, software: 0.32, cyber: 0.12, other: 0.08 },
  { year: "2026", services: 1.02, infra: 0.76, software: 0.45, cyber: 0.18, other: 0.12 },
  { year: "2027", services: 1.35, infra: 1.00, software: 0.60, cyber: 0.24, other: 0.15 },
];

const SPEND_COLORS: Record<string, string> = {
  services: "#8587e3",
  infra: "#8587e3",
  software: "#00D4FF",
  cyber: "#FFD700",
  other: "#A855F7",
};

const SPEND_LABELS: Record<string, string> = {
  services: "AI Services",
  infra: "AI Infrastructure",
  software: "AI Software",
  cyber: "AI Cybersecurity",
  other: "Other",
};

const UNICORN_DATA = [
  { name: "Harvey", products: 1, valuation: 11, color: "#8587e3" },
  { name: "Sierra", products: 1, valuation: 10, color: "#8587e3" },
  { name: "Cognition", products: 1, valuation: 10.2, color: "#8587e3" },
  { name: "Glean", products: 2, valuation: 7.25, color: "#8587e3" },
  { name: "Cohere", products: 2, valuation: 5.5, color: "#8587e3" },
  { name: "Abridge", products: 1, valuation: 5.3, color: "#FF6B9D" },
  { name: "Writer", products: 1, valuation: 1.9, color: "#8587e3" },
  { name: "Distyl", products: 1, valuation: 1.8, color: "#8587e3" },
  { name: "Cognigy", products: 1, valuation: 0.955, color: "#8587e3" },
  { name: "Hebbia", products: 1, valuation: 0.7, color: "#8587e3" },
  { name: "AntimatterAI", products: 10, valuation: 0.06, color: "#8587e3" },
];

const ARR_SPEED = [
  { name: "Manus", months: 8, color: "#8587e3" },
  { name: "Lovable", months: 8, color: "#8587e3" },
  { name: "Cursor", months: 12, color: "#8587e3" },
  { name: "ChatGPT", months: 12, color: "#8587e3" },
  { name: "Sierra", months: 21, color: "#00D4FF" },
  { name: "Traditional SaaS", months: 96, color: "#FF6B9D" },
];

const FIVE_FORCES = [
  { icon: Cpu, title: "Agentic AI Inflection", stat: "33% by 2028", desc: "Up from <1% in 2024. The biggest shift in enterprise AI since cloud migration.", color: "#8587e3" },
  { icon: Heart, title: "Healthcare Regulatory Tailwind", stat: "CMS 2026", desc: "CMS mandating automation creates a forcing function for ClinixAI adoption.", color: "#FF6B9D" },
  { icon: DollarSign, title: "Capital Market Flood", stat: "$2.52T", desc: "Global AI spend — capital is flowing at unprecedented scale into AI infrastructure.", color: "#FFD700" },
  { icon: Shield, title: "Data Sovereignty Wave", stat: "75% Top-3", desc: "Data sovereignty is now a top-3 buying criterion. EU AI Act 2026 enforcement.", color: "#8587e3" },
  { icon: Sparkles, title: "GenUI Category Creation", stat: "Only Vendor", desc: "ATOM is the only platform with Generative UI. The category doesn't exist without us.", color: "#00D4FF" },
];

const COMPETITORS = [
  { name: "Sierra", weakness: "Single-product CX, no on-prem, no GenUI", valuation: "$10B", products: 1, color: "#8587e3" },
  { name: "Beam AI", weakness: "Multi-tenant SaaS focus, limited compliance", valuation: "~$200M", products: 2, color: "#A855F7" },
  { name: "LangChain", weakness: "Developer tool, no governance layer, no enterprise deploy", valuation: "~$300M", products: 1, color: "#FFD700" },
  { name: "AutoGen", weakness: "Azure-first, limited compliance, no VPC/air-gap", valuation: "Open-source", products: 1, color: "#00D4FF" },
];

const CLIENTS = [
  { name: "Lowe's", status: "Production", detail: "Multi-agent supply chain, 1,700+ stores", color: "#8587e3" },
  { name: "Cognizant", status: "Production", detail: "AI ops for 350,000+ employees", color: "#8587e3" },
  { name: "Trimble", status: "Production", detail: "Construction & engineering AI", color: "#8587e3" },
  { name: "E2open", status: "Production", detail: "Fortune 100 supply chain logistics", color: "#8587e3" },
  { name: "Toyota", status: "Enterprise", detail: "Manufacturing process intelligence", color: "#8587e3" },
  { name: "OWASP", status: "Technical", detail: "AI security standards, 2.5M+ monthly visitors", color: "#00D4FF" },
  { name: "Injazat", status: "Enterprise", detail: "UAE government digital transformation", color: "#8587e3" },
];

/* ══════════════════════════════════════════════════════════════════
   CUSTOM TOOLTIP
   ══════════════════════════════════════════════════════════════════ */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-black/90 backdrop-blur-md p-3 shadow-2xl">
      <p className="text-white/80 text-xs font-bold font-['Plus_Jakarta_Sans'] mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs font-['Plus_Jakarta_Sans']">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.fill || p.color }} />
          <span className="text-white/50">{SPEND_LABELS[p.dataKey] || p.name || p.dataKey}:</span>
          <span className="text-white font-bold">${(p.value as number).toFixed(2)}T</span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 1: DISRUPTION AT A GLANCE
   ══════════════════════════════════════════════════════════════════ */

function HeroStats() {
  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>The Disruption at a Glance</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          The Numbers That <span className="text-[#8587e3]">Rewrote Reality</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          Six data points. One undeniable conclusion.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <AnimatedStat value={2.52} prefix="$" suffix="T" label="Global AI Spend 2026" source="Gartner" color="#8587e3" />
        <AnimatedStat value={44} suffix="%" label="YoY AI Spending Growth" source="Gartner" color="#8587e3" />
        <AnimatedStat value={665} prefix="$" suffix="B" label="Big Tech AI Infra Spend 2026" source="Morgan Stanley" color="#00D4FF" />
        <AnimatedStat value={64} suffix="%" label="Organizations in Active AI Use" source="McKinsey" color="#FFD700" />
        <AnimatedStat value={180} suffix="%" label="YoY Growth in AI Series A" source="PitchBook" color="#FF6B9D" />
        <AnimatedStat value={76} prefix="$" suffix="B+" label="US AI Startup Mega-Rounds 2025" source="Crunchbase" color="#A855F7" />
      </div>

      <RevealDiv delay={0.3}>
        <div className="text-center p-6 rounded-2xl border border-[#8587e3]/15 bg-[#8587e3]/3">
          <p className="text-white/60 text-lg font-['Plus_Jakarta_Sans'] italic">
            "The question is not whether AI will transform everything. <span className="text-[#8587e3] font-bold not-italic">It already has.</span>"
          </p>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 2: THE $2.52 TRILLION WAVE
   ══════════════════════════════════════════════════════════════════ */

function SpendWave() {
  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>The $2.52 Trillion Wave</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          Global AI <span className="text-[#8587e3]">Spending Surge</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          $1.76T → $2.53T → $3.34T — three years of exponential growth across every segment
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/2 p-6 mb-6">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={SPEND_DATA} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "Plus Jakarta Sans" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}T`} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="services" stackId="a" fill="#8587e3" radius={[0, 0, 0, 0]} name="AI Services" />
            <Bar dataKey="infra" stackId="a" fill="#8587e3" name="AI Infrastructure" />
            <Bar dataKey="software" stackId="a" fill="#00D4FF" name="AI Software" />
            <Bar dataKey="cyber" stackId="a" fill="#FFD700" name="AI Cybersecurity" />
            <Bar dataKey="other" stackId="a" fill="#A855F7" radius={[4, 4, 0, 0]} name="Other" />
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {Object.entries(SPEND_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: SPEND_COLORS[key] }} />
              <span className="text-white/50 text-xs font-['Plus_Jakarta_Sans']">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <RevealDiv delay={0.2}>
        <div className="p-5 rounded-xl border border-[#8587e3]/20 bg-[#8587e3]/4">
          <p className="text-[#8587e3] text-sm font-bold font-['Plus_Jakarta_Sans'] mb-1">Where AntimatterAI Plays</p>
          <p className="text-white/60 text-sm font-['Plus_Jakarta_Sans']">
            AntimatterAI operates across <span className="text-white font-semibold">3 of the 5 fastest-growing segments</span> — AI Services, AI Software, and AI Cybersecurity — positioning the platform at the intersection of maximum capital deployment.
          </p>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 3: AGENTIC AI EXPLOSION
   ══════════════════════════════════════════════════════════════════ */

function AgenticExplosion() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const timeline = [
    { year: "2024", pct: "<1%", width: "3%", color: "#8587e3" },
    { year: "2026", pct: "~15%", width: "30%", color: "#00D4FF" },
    { year: "2028", pct: "33%", width: "66%", color: "#8587e3" },
  ];

  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>The Agentic AI Explosion</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          From &lt;1% to <span className="text-[#8587e3]">33%</span> in 4 Years
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          Agentic AI enterprise software interactions — Gartner
        </p>
      </div>

      {/* Visual Timeline */}
      <div ref={ref} className="mb-12 space-y-4">
        {timeline.map((t, i) => (
          <RevealDiv key={t.year} delay={i * 0.15}>
            <div className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-white/50 text-sm font-bold font-['Plus_Jakarta_Sans']">{t.year}</span>
              </div>
              <div className="flex-1 h-10 bg-white/5 rounded-lg overflow-hidden relative">
                <motion.div
                  className="h-full rounded-lg flex items-center justify-end pr-3"
                  style={{ backgroundColor: t.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: t.width } : {}}
                  transition={{ duration: 1.2, delay: i * 0.3, ease: "easeOut" }}
                >
                  <span className="text-black font-bold text-sm font-['Plus_Jakarta_Sans']">{t.pct}</span>
                </motion.div>
              </div>
            </div>
          </RevealDiv>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { value: "48.5%", label: "CAGR Multi-Agent Systems", color: "#8587e3" },
          { value: "62.7%", label: "CAGR Vertical AI Agents", color: "#8587e3" },
          { value: "$35-45B", label: "Agentic AI Spend by 2030", color: "#00D4FF" },
          { value: "79%", label: "Companies Adopting AI Agents", color: "#FFD700" },
        ].map((s, i) => (
          <RevealDiv key={s.label} delay={i * 0.08}>
            <div className="p-5 rounded-xl border border-white/10 bg-white/3 text-center hover:border-opacity-40 transition-all"
              style={{ borderColor: `${s.color}20` }}>
              <div className="text-2xl md:text-3xl font-bold font-['Plus_Jakarta_Sans'] mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-white/50 text-xs font-['Plus_Jakarta_Sans']">{s.label}</div>
            </div>
          </RevealDiv>
        ))}
      </div>

      <RevealDiv delay={0.3}>
        <div className="p-5 rounded-xl border border-[#8587e3]/20 bg-[#8587e3]/4">
          <p className="text-[#8587e3] text-sm font-bold font-['Plus_Jakarta_Sans'] mb-1">Native, Not Retrofitted</p>
          <p className="text-white/60 text-sm font-['Plus_Jakarta_Sans']">
            ATOM was built from the ground up as an agentic framework. Not retrofitted. Not rebranded. <span className="text-white font-semibold">Native.</span>
          </p>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 4: UNICORN LANDSCAPE BUBBLE CHART
   ══════════════════════════════════════════════════════════════════ */

function UnicornLandscape() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="rounded-xl border border-white/10 bg-black/90 backdrop-blur-md p-3 shadow-2xl">
        <p className="font-bold font-['Plus_Jakarta_Sans'] text-sm mb-1" style={{ color: d.color }}>{d.name}</p>
        <p className="text-white/60 text-xs font-['Plus_Jakarta_Sans']">{d.products} product{d.products > 1 ? "s" : ""}</p>
        <p className="text-white/60 text-xs font-['Plus_Jakarta_Sans']">${d.valuation}B valuation</p>
      </div>
    );
  };

  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>The Unicorn Landscape</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          Valuation vs. Product <span className="text-[#8587e3]">Breadth</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          Every company above has fewer products and more funding.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/2 p-6 mb-6">
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              type="number"
              dataKey="products"
              name="Products"
              domain={[0, 12]}
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              label={{ value: "Product Breadth", position: "insideBottom", offset: -5, fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="valuation"
              name="Valuation"
              domain={[0, 12]}
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}B`}
              label={{ value: "Valuation ($B)", angle: -90, position: "insideLeft", offset: 10, fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
            />
            <ZAxis type="number" range={[120, 400]} dataKey="valuation" />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.1)" }} />
            <Scatter data={UNICORN_DATA}>
              {UNICORN_DATA.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={entry.color}
                  fillOpacity={entry.name === "AntimatterAI" ? 1 : 0.6}
                  stroke={entry.name === "AntimatterAI" ? "#8587e3" : "transparent"}
                  strokeWidth={entry.name === "AntimatterAI" ? 3 : 0}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* "YOU ARE HERE" label */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="w-4 h-4 rounded-full bg-[#8587e3] border-2 border-[#8587e3]/50 animate-pulse" />
          <span className="text-[#8587e3] text-sm font-bold font-['Plus_Jakarta_Sans'] tracking-wider">
            YOU ARE HERE — 11 Products, $60M Ask
          </span>
        </div>
      </div>

      <RevealDiv delay={0.2}>
        <div className="p-5 rounded-xl border border-[#8587e3]/20 bg-[#8587e3]/4">
          <p className="text-[#8587e3] text-sm font-bold font-['Plus_Jakarta_Sans'] mb-1">The Asymmetry</p>
          <p className="text-white/60 text-sm font-['Plus_Jakarta_Sans']">
            Every company in the chart above has fewer products and has raised significantly more capital. AntimatterAI's 11-product portfolio at a $60M ask represents maximum product breadth at minimum valuation entry.
          </p>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 5: NERVOUS SYSTEM ANALOGY
   ══════════════════════════════════════════════════════════════════ */

function NervousSystemAnalogy() {
  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>The Nervous System</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          Brains Need a <span className="text-[#8587e3]">Spine</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          If Grok, ChatGPT, and Claude are the brains — ATOM is the nervous system every serious deployment runs on.
        </p>
      </div>

      {/* Brain → Spine → Body visual */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: Brain, title: "The Brains", subtitle: "GPT · Claude · Grok · Gemini",
            desc: "Powerful language models. Monetize tokens and seats. Cloud-only SaaS APIs.",
            color: "#8587e3", border: "border-[#8587e3]/20", bg: "bg-[#8587e3]/4",
          },
          {
            icon: Network, title: "The Nervous System", subtitle: "ATOM Platform",
            desc: "Connects brain to body. Deploys into VPC, on-prem, edge, air-gap. Guarantees zero-training + IP ownership.",
            color: "#8587e3", border: "border-[#8587e3]/30", bg: "bg-[#8587e3]/5",
          },
          {
            icon: Building2, title: "The Body", subtitle: "Enterprise Operations",
            desc: "Production systems. Regulated environments. Real business data. Fortune 500 workflows.",
            color: "#00D4FF", border: "border-[#00D4FF]/20", bg: "bg-[#00D4FF]/4",
          },
        ].map((item, i) => (
          <RevealDiv key={item.title} delay={i * 0.15}>
            <div className={`relative p-7 rounded-2xl border ${item.border} ${item.bg} h-full transition-all hover:scale-[1.02]`}>
              {i < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={18} style={{ color: item.color }} className="opacity-40" />
                </div>
              )}
              <item.icon size={28} style={{ color: item.color }} className="mb-4" />
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-lg mb-1">{item.title}</h4>
              <p className="text-xs font-semibold font-['Plus_Jakarta_Sans'] mb-3" style={{ color: item.color }}>{item.subtitle}</p>
              <p className="text-white/55 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed">{item.desc}</p>
            </div>
          </RevealDiv>
        ))}
      </div>

      {/* Key differentiators */}
      <RevealDiv delay={0.3}>
        <div className="rounded-2xl border border-white/10 bg-white/2 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-white/2">
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-sm">Model Companies vs. ATOM</h4>
          </div>
          {[
            { model: "Monetize tokens/seats", atom: "Monetize deployed digital workers" },
            { model: "SaaS APIs only", atom: "Ships into VPC / on-prem / edge / air-gap" },
            { model: "Train on your data", atom: "Zero-training guarantee + IP ownership" },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-2 gap-4 px-6 py-3.5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8587e3] mt-1.5 flex-shrink-0" />
                <span className="text-white/50 text-sm font-['Plus_Jakarta_Sans']">{row.model}</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={14} className="text-[#8587e3] mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm font-['Plus_Jakarta_Sans'] font-semibold">{row.atom}</span>
              </div>
            </div>
          ))}
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 6: CLINIXAI PIPELINE VELOCITY
   ══════════════════════════════════════════════════════════════════ */

function ClinixPipeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const metrics = [
    { label: "Time to $1M Pipeline", clinix: "90 days", top: "6–9 mo", industry: "12–18 mo", clinixPct: 15, topPct: 45, industryPct: 90 },
    { label: "Time to $4M Pipeline", clinix: "180 days", top: "12–18 mo", industry: "24–36 mo", clinixPct: 20, topPct: 55, industryPct: 95 },
    { label: "Demo → POC Rate", clinix: "62%", top: "40–50%", industry: "25–30%", clinixPct: 62, topPct: 45, industryPct: 28 },
    { label: "Sales Cycle Length", clinix: "45 days", top: "60–75 days", industry: "90–120 days", clinixPct: 20, topPct: 40, industryPct: 70 },
  ];

  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>ClinixAI: Disrupting Healthcare</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          Pipeline Velocity: <span className="text-[#FF6B9D]">3–5x Faster</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          ClinixAI is outperforming top-quartile health-tech across every go-to-market metric.
        </p>
      </div>

      <div ref={ref} className="space-y-6 mb-8">
        {metrics.map((m, idx) => (
          <RevealDiv key={m.label} delay={idx * 0.1}>
            <div className="p-5 rounded-xl border border-white/10 bg-white/2">
              <div className="text-white/70 text-sm font-bold font-['Plus_Jakarta_Sans'] mb-3">{m.label}</div>
              <div className="space-y-2">
                {/* ClinixAI */}
                <div className="flex items-center gap-3">
                  <span className="w-20 text-xs text-[#FF6B9D] font-bold font-['Plus_Jakarta_Sans'] text-right">ClinixAI</span>
                  <div className="flex-1 h-7 bg-white/5 rounded-md overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-md bg-gradient-to-r from-[#FF6B9D] to-[#FF6B9D]/60 flex items-center justify-end pr-2"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${m.clinixPct}%` } : {}}
                      transition={{ duration: 1, delay: idx * 0.15, ease: "easeOut" }}
                    >
                      <span className="text-black text-xs font-bold font-['Plus_Jakarta_Sans']">{m.clinix}</span>
                    </motion.div>
                  </div>
                </div>
                {/* Top Quartile */}
                <div className="flex items-center gap-3">
                  <span className="w-20 text-xs text-white/40 font-['Plus_Jakarta_Sans'] text-right">Top Quartile</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-md overflow-hidden">
                    <motion.div
                      className="h-full rounded-md bg-white/15"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${m.topPct}%` } : {}}
                      transition={{ duration: 1, delay: idx * 0.15 + 0.2, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-white/30 text-xs font-['Plus_Jakarta_Sans'] w-16">{m.top}</span>
                </div>
                {/* Industry */}
                <div className="flex items-center gap-3">
                  <span className="w-20 text-xs text-white/30 font-['Plus_Jakarta_Sans'] text-right">Industry Avg</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-md overflow-hidden">
                    <motion.div
                      className="h-full rounded-md bg-white/8"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${m.industryPct}%` } : {}}
                      transition={{ duration: 1, delay: idx * 0.15 + 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-white/20 text-xs font-['Plus_Jakarta_Sans'] w-16">{m.industry}</span>
                </div>
              </div>
            </div>
          </RevealDiv>
        ))}
      </div>

      <RevealDiv delay={0.4}>
        <div className="p-5 rounded-xl border border-[#FF6B9D]/20 bg-[#FF6B9D]/4 text-center">
          <p className="text-[#FF6B9D] font-bold font-['Plus_Jakarta_Sans'] text-lg">3–5x faster than top quartile across every metric</p>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 7: SPEED OF MONEY — MONTHS TO $100M ARR
   ══════════════════════════════════════════════════════════════════ */

function SpeedOfMoney() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>The New Speed of Money</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          Months to <span className="text-[#8587e3]">$100M ARR</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          AI companies are reaching $100M ARR in months, not years.
        </p>
      </div>

      <div ref={ref} className="space-y-3 mb-8">
        {ARR_SPEED.map((company, i) => (
          <RevealDiv key={company.name} delay={i * 0.08}>
            <div className="flex items-center gap-4">
              <div className="w-32 text-right">
                <span className={`text-sm font-bold font-['Plus_Jakarta_Sans'] ${company.name === "Traditional SaaS" ? "text-[#FF6B9D]" : "text-white/70"}`}>
                  {company.name}
                </span>
              </div>
              <div className="flex-1 h-9 bg-white/5 rounded-lg overflow-hidden relative">
                <motion.div
                  className="h-full rounded-lg flex items-center px-3"
                  style={{ backgroundColor: company.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${Math.min((company.months / 96) * 100, 100)}%` } : {}}
                  transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
                >
                  <span className="text-black text-xs font-bold font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                    {company.months < 96 ? `${company.months} mo` : "7–10 years"}
                  </span>
                </motion.div>
              </div>
            </div>
          </RevealDiv>
        ))}
      </div>

      <RevealDiv delay={0.4}>
        <div className="p-5 rounded-xl border border-[#8587e3]/20 bg-[#8587e3]/4">
          <p className="text-[#8587e3] text-sm font-bold font-['Plus_Jakarta_Sans']">AI Revenue Acceleration</p>
          <p className="text-white/60 text-sm font-['Plus_Jakarta_Sans'] mt-1">
            The AI revenue acceleration curve has broken every historical precedent. Companies are reaching $100M ARR in 8–21 months vs. the traditional 7–10 year timeline.
          </p>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 8: FIVE FORCES CONVERGING
   ══════════════════════════════════════════════════════════════════ */

function FiveForces() {
  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>Five Forces Converging</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          All Favoring <span className="text-[#8587e3]">AntimatterAI</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          Five macro forces are converging simultaneously — and ATOM sits at the intersection of all of them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {FIVE_FORCES.map((force, i) => (
          <RevealDiv key={force.title} delay={i * 0.1}>
            <div className="relative p-6 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm h-full hover:border-opacity-40 transition-all group"
              style={{ borderColor: `${force.color}20` }}>
              {/* Number badge */}
              <div className="absolute -top-3 left-5 px-2.5 py-0.5 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans']"
                style={{ backgroundColor: force.color, color: "#000" }}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mt-2 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${force.color}15`, border: `1px solid ${force.color}30` }}>
                <force.icon size={20} style={{ color: force.color }} />
              </div>

              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-base mb-1">{force.title}</h4>
              <div className="text-xs font-bold font-['Plus_Jakarta_Sans'] mb-3" style={{ color: force.color }}>{force.stat}</div>
              <p className="text-white/50 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed">{force.desc}</p>
            </div>
          </RevealDiv>
        ))}
      </div>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 9: COMPETITIVE POSITION
   ══════════════════════════════════════════════════════════════════ */

function CompetitivePosition() {
  return (
    <RevealDiv className="mb-24">
      <div className="text-center mb-12">
        <SectionLabel>Competitive Position</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          ATOM's <span className="text-[#8587e3]">Structural Edge</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          Security-forward, trust-centric, and infrastructure-neutral — a unique position in enterprise AI.
        </p>
      </div>

      {/* Key differentiators */}
      <RevealDiv delay={0.1} className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Lock, text: "End-to-end encryption with decentralized trust fabric", color: "#8587e3" },
            { icon: Shield, text: "Fine-grained policy binding — agents can't violate data permissions", color: "#8587e3" },
            { icon: Eye, text: "Autonomous privacy-preserving reasoning (unique differentiator)", color: "#00D4FF" },
            { icon: Globe, text: "Neutral, infra-centric deployment for regulated AI agents", color: "#FFD700" },
          ].map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/2"
              style={{ borderColor: `${d.color}15` }}>
              <d.icon size={18} style={{ color: d.color }} className="mt-0.5 flex-shrink-0" />
              <span className="text-white/70 text-sm font-['Plus_Jakarta_Sans']">{d.text}</span>
            </div>
          ))}
        </div>
      </RevealDiv>

      {/* Competitor comparison */}
      <RevealDiv delay={0.2}>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 bg-white/2">
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-sm">Competitors in the "Nervous System" Space</h4>
          </div>
          {COMPETITORS.map((comp, i) => (
            <div key={comp.name} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
              <div className="col-span-2">
                <span className="text-white/80 text-sm font-bold font-['Plus_Jakarta_Sans']">{comp.name}</span>
              </div>
              <div className="col-span-1 text-center">
                <span className="text-xs font-['Plus_Jakarta_Sans'] px-2 py-0.5 rounded-full border" style={{ borderColor: `${comp.color}40`, color: comp.color }}>
                  {comp.products}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-white/40 text-xs font-['Plus_Jakarta_Sans']">{comp.valuation}</span>
              </div>
              <div className="col-span-7">
                <span className="text-white/50 text-xs font-['Plus_Jakarta_Sans']">{comp.weakness}</span>
              </div>
            </div>
          ))}
          {/* ATOM row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#8587e3]/5 border-t border-[#8587e3]/20">
            <div className="col-span-2">
              <span className="text-[#8587e3] text-sm font-bold font-['Plus_Jakarta_Sans']">AntimatterAI</span>
            </div>
            <div className="col-span-1 text-center">
              <span className="text-xs font-['Plus_Jakarta_Sans'] px-2 py-0.5 rounded-full border border-[#8587e3]/40 text-[#8587e3] font-bold">10</span>
            </div>
            <div className="col-span-2">
              <span className="text-[#8587e3] text-xs font-bold font-['Plus_Jakarta_Sans']">$60M ask</span>
            </div>
            <div className="col-span-7">
              <span className="text-[#8587e3]/70 text-xs font-['Plus_Jakarta_Sans']">Full-stack platform: GenUI + governance + deploy-anywhere + agentic + compliance-native</span>
            </div>
          </div>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 10: FORTUNE 500 CLIENTS
   ══════════════════════════════════════════════════════════════════ */

function EnterpriseClients() {
  return (
    <RevealDiv className="mb-12">
      <div className="text-center mb-12">
        <SectionLabel>Production Deployments</SectionLabel>
        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-4xl md:text-5xl mb-4">
          Fortune 500 Clients. <span className="text-[#8587e3]">Real Data.</span>
        </h3>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Plus_Jakarta_Sans']">
          These are not pilots. These are production systems processing real business data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {CLIENTS.map((client, i) => (
          <RevealDiv key={client.name} delay={i * 0.08}>
            <div className="p-5 rounded-xl border border-white/10 bg-white/3 hover:border-opacity-40 transition-all h-full"
              style={{ borderColor: `${client.color}20` }}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-base">{client.name}</h4>
                <span className="text-[10px] font-['Plus_Jakarta_Sans'] font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: `${client.color}40`,
                    color: client.color,
                    backgroundColor: `${client.color}10`,
                  }}>
                  {client.status}
                </span>
              </div>
              <p className="text-white/50 text-sm font-['Plus_Jakarta_Sans'] leading-relaxed">{client.detail}</p>
            </div>
          </RevealDiv>
        ))}
      </div>

      {/* Closing callout */}
      <RevealDiv delay={0.4}>
        <div className="text-center p-8 rounded-2xl border border-[#8587e3]/20 bg-gradient-to-br from-[#8587e3]/5 to-[#8587e3]/5">
          <p className="text-white/40 text-sm font-['Plus_Jakarta_Sans'] uppercase tracking-widest mb-3">From the Research</p>
          <p className="font-['Plus_Jakarta_Sans'] font-bold text-white text-xl md:text-2xl leading-snug max-w-3xl mx-auto">
            "If Grok, ChatGPT, and Claude are rapidly becoming the default <span className="text-[#8587e3]">brains</span>,
            AntimatterAI is positioned to become the default <span className="text-[#8587e3]">nervous system</span> that every serious deployment runs on."
          </p>
        </div>
      </RevealDiv>
    </RevealDiv>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════ */

export default function StateOfDisruption() {
  return (
    <div id="disruption" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#8587e3]/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#8587e3]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Main Section Header */}
        <RevealDiv className="text-center mb-24">
          <SectionLabel>State of Disruption</SectionLabel>
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-white text-5xl md:text-6xl lg:text-7xl mb-6">
            The <span className="text-[#8587e3]">Disruption</span> Report
          </h2>
          <p className="text-white/50 text-lg max-w-3xl mx-auto font-['Plus_Jakarta_Sans'] mb-6">
            An interactive deep dive into the macro forces, market data, and competitive landscape
            that make this the defining moment for enterprise AI infrastructure.
          </p>
          <a
            href="/antimatterai_state_of_disruption.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#8587e3]/30 text-[#8587e3] text-sm font-semibold hover:bg-[#8587e3]/10 transition-all font-['Plus_Jakarta_Sans']"
          >
            <BarChart3 size={16} />
            Download Full PDF Report
            <ArrowRight size={14} />
          </a>
        </RevealDiv>

        {/* All 10 Sections */}
        <HeroStats />
        <SpendWave />
        <AgenticExplosion />
        <UnicornLandscape />
        <NervousSystemAnalogy />
        <ClinixPipeline />
        <SpeedOfMoney />
        <FiveForces />
        <CompetitivePosition />
        <EnterpriseClients />
      </div>
    </div>
  );
}
