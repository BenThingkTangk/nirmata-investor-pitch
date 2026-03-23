import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Brain, HeartPulse, Atom, Video, Target, Globe, Shield, Cpu,
  ChevronDown, ArrowRight, Check, Zap, Lock, TrendingUp,
  BarChart3, Layers, Network, X, ExternalLink, Eye, Scale, Search,
  Play, Pause, DollarSign, Rocket, Crown, Quote, Building2,
  Download, Mic, Grid3X3, ChevronRight, Sparkles, MessageSquare,
  Users, MapPin, FileText, Mail, Calendar, Clock, Award,
  Hexagon, Star, Activity, Database, Code, Landmark, Pill,
  FlaskConical, Briefcase, LineChart, PieChart, Gauge, Trophy,
  CheckCircle2, XCircle, AlertCircle, Infinity, Heart, Lightbulb,
  BookOpen, Globe2, RefreshCw, Layers2, CircleDot, Wifi
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
  LineChart as ReLineChart, Line, AreaChart, Area, CartesianGrid,
  PieChart as RePieChart, Pie, Legend
} from "recharts";
import TermSheet from "@/components/TermSheet";
import MarketResearch from "@/components/MarketResearch";
import StateOfDisruption from "@/components/StateOfDisruption";
import C1Assistant from "@/components/C1Assistant";

/* ══════════════════════════════════════════════════════════════════
   UTILITY HOOKS
   ══════════════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration: number = 2000, inView: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
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
  }, [target, duration, inView]);
  return count;
}

/* ══════════════════════════════════════════════════════════════════
   QUANTUM PARTICLE CANVAS
   ══════════════════════════════════════════════════════════════════ */

function QuantumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number }[] = [];
    const PARTICLE_COUNT = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? "#00FFB2" : "#8587e3",
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
}

/* ══════════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ══════════════════════════════════════════════════════════════════ */

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-[#00FFB2]" />
      <span className="text-[#00FFB2] text-xs font-semibold tracking-[0.2em] uppercase font-['Satoshi']">{children}</span>
      <div className="w-6 h-px bg-[#00FFB2]" />
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

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */

const NAV_SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "quantum", label: "Vision" },
  { id: "company", label: "Company" },
  { id: "matrix", label: "25/25" },
  { id: "products", label: "Products" },
  { id: "moat", label: "Moat" },
  { id: "market", label: "Market" },
  { id: "gtm", label: "GTM" },
  { id: "revenue", label: "Revenue" },
  { id: "financials", label: "Financials" },
  { id: "valuation", label: "Valuation" },
  { id: "investment", label: "Investment" },
  { id: "disruption", label: "Disruption" },
  { id: "ethics", label: "Ethics" },
];

const PRODUCTS = [
  {
    name: "ATOM Enterprise AI",
    slug: "enterprise-ai",
    tagline: "The Governance Backbone",
    icon: Shield,
    color: "#00FFB2",
    maturity: "SHIPPING",
    description: "5-layer enterprise intelligence framework with SOC2, HIPAA, post-quantum cryptography, VPC deployment. The infrastructure Fortune 500 CISOs require.",
    cost: "$5M–$8M",
    comparable: "Sierra AI — $635M raised",
    url: "https://www.antimatterai.com/enterprise-ai",
  },
  {
    name: "ATOM Voice Agent",
    slug: "voice-agents",
    tagline: "Empathic Voice Intelligence",
    icon: Mic,
    color: "#8587e3",
    maturity: "SHIPPING",
    description: "Hume EVI empathic voice, OpenAI Realtime, ElevenLabs multi-provider. Real-time sentiment analysis with human-level nuance across enterprise workflows.",
    cost: "$1.5M–$2.5M",
    comparable: "ElevenLabs — $500M at $11B",
    url: "https://www.antimatterai.com/voice-agent-demo",
  },
  {
    name: "ATOM Agentic (AgenticIQ)",
    slug: "agentic-ai",
    tagline: "Autonomous Digital Workers",
    icon: Cpu,
    color: "#E040FB",
    maturity: "LIMITED BETA",
    description: "Brain-Spine-Digital Worker framework. HIPAA-ready autonomous agents executing multi-step enterprise workflows end-to-end without human intervention.",
    cost: "$2M–$3.5M",
    comparable: "Hippocratic AI — $370M raised",
    url: "https://www.antimatterai.com/agentic-ai",
  },
  {
    name: "ATOM IntentIQ",
    slug: "atom-intentiq",
    tagline: "6-Step Intent Discovery",
    icon: Search,
    color: "#7B61FF",
    maturity: "SHIPPING",
    description: "Buyer intent scoring and behavioral prediction. 6-Step Discovery Framework that understands what customers need before they articulate it.",
    cost: "$1M–$1.5M",
    comparable: "Gong — $7.2B valuation",
    url: "https://www.antimatterai.com/atom-intentiq",
  },
  {
    name: "ATOM GIS / Infrastructure Atlas",
    slug: "data-center-map",
    tagline: "Global Infrastructure Intelligence",
    icon: MapPin,
    color: "#00D4FF",
    maturity: "LIMITED BETA",
    description: "Global data center intelligence using PeeringDB, TeleGeography, Wikidata. Bridges virtual AI with physical space optimization.",
    cost: "$0.8M–$1.2M",
    comparable: "Nearmap — $1.1B acquisition",
    url: "https://www.antimatterai.com/data-center-map",
  },
  {
    name: "ATOM Browser",
    slug: "atom/search",
    tagline: "AI-Native Quantum Browser",
    icon: Globe,
    color: "#00D4FF",
    maturity: "R&D",
    description: "AI-native, quantum-forward browser with post-quantum cryptography. Not a browser with AI bolted on — AI that happens to render the web.",
    cost: "$3M–$5M",
    comparable: "Arc Browser — $550M pre-revenue",
    url: "",
    ctaLabel: "Get Early Access",
  },
  {
    name: "ATOM Dynamic Matrices",
    slug: "",
    tagline: "Interactive Vendor Intelligence",
    icon: Grid3X3,
    color: "#FFD700",
    maturity: "SHIPPING",
    description: "Dynamic interactive vendor comparison engine that powers transparent, verifiable competitive intelligence at enterprise scale.",
    cost: "$0.3M–$0.5M",
    comparable: "Gartner — Proprietary data moat",
    url: "https://www.antimatterai.com/resources/vendor-matrix",
  },
  {
    name: "ClinixAI Healthcare",
    slug: "clinix",
    tagline: "Ambient Scribe + Full RCM",
    icon: HeartPulse,
    color: "#FF6B9D",
    maturity: "SHIPPING",
    description: "78% documentation time reduction. Full X12 RCM claims processing. $4M+ pipeline in 180 days. HIPAA-native with ML denial prediction.",
    cost: "$3.5M–$5.5M",
    comparable: "Abridge — $758M raised; Ambience — $313M",
    url: "https://www.clinixagent.com",
  },
  {
    name: "MoleculeAI / Antiquant",
    slug: "molecule",
    tagline: "Quantum Drug Discovery",
    icon: FlaskConical,
    color: "#A855F7",
    maturity: "R&D",
    description: "Quantum-classical hybrid drug discovery using SMILES notation, XGBoost, and VQE. TAM: $85B+. Democratizing pharmaceutical R&D.",
    cost: "$2.5M–$4M",
    comparable: "XtalPi — $1.6B; Xaira — $1.0B",
    url: "https://antiquant.vercel.app/",
  },
  {
    name: "Vidzee",
    slug: "vidzee",
    tagline: "AI Real Estate Intelligence",
    icon: Video,
    color: "#F59E0B",
    maturity: "LIMITED BETA",
    description: "AI-powered real estate intelligence tool designed to facilitate fast property sales through intelligent matching, visual AI analysis, and automated workflows.",
    cost: "$0.5M–$1M",
    comparable: "Matterport — $1.6B acquisition",
    url: "https://vidzee.vercel.app/",
  },
];

const VENDOR_CAPS = [
  "Customer Owns IP",
  "Generative UI (GenUI)",
  "Full Hybrid Deploy",
  "Model-Agnostic BYO",
  "Voice+GenUI+Tool in VPC",
  "On-Prem Deploy",
  "Edge Deploy",
  "Zero-Training Guarantee",
];

type VendorStatus = "yes" | "no" | "partial";
const VENDOR_DATA: Record<string, VendorStatus[]> = {
  "ATOM":       ["yes","yes","yes","yes","yes","yes","yes","yes"],
  "Sierra":     ["no","no","no","partial","partial","no","no","no"],
  "Microsoft":  ["no","no","partial","no","partial","no","no","no"],
  "Google":     ["no","no","partial","no","partial","no","partial","no"],
  "Cognigy":    ["no","no","partial","partial","partial","no","no","no"],
  "Amazon":     ["no","no","partial","no","partial","no","partial","no"],
  "Kore.ai":    ["partial","no","partial","partial","partial","no","no","no"],
};

const VENDOR_SCORES: Record<string, number> = {
  "ATOM": 25, "Sierra": 19, "Microsoft": 17, "Google": 16, "Cognigy": 16, "Amazon": 15, "Kore.ai": 14,
};

const MOAT_LAYERS = [
  { name: "Technical IP", level: "Very High", time: "18–36 months", icon: Code, color: "#00FFB2", desc: "Full coverage on our 25-point enterprise framework, GenUI exclusivity, quantum drug discovery, post-quantum cryptography stack." },
  { name: "Data Network Effects", level: "High", time: "12–24 months", icon: Database, color: "#8587e3", desc: "Customer deployments enrich agent performance. More data → smarter agents → more customers." },
  { name: "Switching Costs", level: "Very High", time: "6–12 months", icon: Lock, color: "#00FFB2", desc: "Deep integrations, custom configurations, trained domain models, and workflow dependencies." },
  { name: "Partnership Lock-in", level: "High", time: "12–18 months", icon: Briefcase, color: "#8587e3", desc: "Akamai, Stedi, Hume AI, Thesys.dev (GenUI), arXiv (Research) exclusive channels." },
  { name: "Talent Density", level: "Moderate-High", time: "Ongoing", icon: Brain, color: "#00FFB2", desc: "100+ years combined enterprise AI experience. Knowledge that cannot be easily replicated." },
];

const TAM_MARKETS = [
  { name: "Agentic AI", now: 7.8, future: 52.6, cagr: "46.3%", product: "ATOM Enterprise + Agentic", color: "#00FFB2" },
  { name: "Enterprise AI Platforms", now: 31.5, future: 155.2, cagr: "37.6%", product: "ATOM Framework", color: "#8587e3" },
  { name: "Healthcare RCM", now: 72.9, future: 195.9, cagr: "11.6%", product: "ClinixAI", color: "#FF6B9D" },
  { name: "Drug Discovery AI", now: 2.5, future: 12.0, cagr: "~30%", product: "MoleculeAI", color: "#A855F7" },
  { name: "AI Voice Agents", now: 1.2, future: 8.5, cagr: "~38%", product: "ATOM Voice", color: "#7B61FF" },
  { name: "AI Browser", now: 4.5, future: 76.8, cagr: "32.8%", product: "ATOM Browser", color: "#00D4FF" },
];

const ATOM_TIERS = [
  { name: "Starter", price: "$5K–$10K/mo", gm: "Target ~85%", desc: "Mid-market, 3 agents, cloud", color: "#8587e3" },
  { name: "Professional", price: "$20K–$40K/mo", gm: "Target ~80%", desc: "Enterprise, 15 agents, VPC, GenUI", color: "#00FFB2" },
  { name: "Enterprise", price: "$50K–$80K/mo", gm: "Target ~75%", desc: "F500, unlimited agents, full hybrid, IP ownership", color: "#00D4FF" },
  { name: "Sovereign", price: "$120K–$180K/mo", gm: "Target ~70%", desc: "Defense/Gov, air-gapped, FedRAMP, quantum-ready", color: "#FFD700" },
];

const CLINIX_TIERS = [
  { name: "Scribe", price: "$800–$1,500/mo", gm: "Target ~85–90%", desc: "Solo/small practice, per provider", color: "#FF6B9D" },
  { name: "Practice", price: "$3K–$6K/mo", gm: "Target ~80–85%", desc: "Group practice, 5–20 providers", color: "#8587e3" },
  { name: "Enterprise", price: "$10K–$20K/mo", gm: "Target ~78–82%", desc: "Multi-location, full X12 RCM", color: "#00FFB2" },
  { name: "Health System", price: "$30K–$60K/mo", gm: "Target ~75–80%", desc: "Hospital system, ML denial prediction", color: "#A855F7" },
];

const FINANCIAL_PROJECTIONS = [
  { year: "Y1", revLow: 8, revHigh: 12, ebitdaNote: "Negative", gmRange: "75–80%" },
  { year: "Y2", revLow: 20, revHigh: 35, ebitdaNote: "Improving", gmRange: "77–82%" },
  { year: "Y3", revLow: 40, revHigh: 60, ebitdaNote: "~Breakeven", gmRange: "78–83%" },
  { year: "Y4", revLow: 70, revHigh: 110, ebitdaNote: "Mid-teens %", gmRange: "80–84%" },
  { year: "Y5", revLow: 120, revHigh: 180, ebitdaNote: "20–30%", gmRange: "80–85%" },
];

const RADAR_DATA = [
  { subject: "IP Ownership", ATOM: 100, Competitors: 20 },
  { subject: "GenUI", ATOM: 100, Competitors: 0 },
  { subject: "Hybrid Deploy", ATOM: 100, Competitors: 35 },
  { subject: "Model-Agnostic", ATOM: 100, Competitors: 40 },
  { subject: "Post-Quantum", ATOM: 100, Competitors: 0 },
  { subject: "HIPAA+SOC2", ATOM: 100, Competitors: 55 },
  { subject: "Agentic", ATOM: 100, Competitors: 45 },
];

const COMP_TABLE = [
  { company: "Sierra AI", raised: "$635M", valuation: "$10B", products: "1 product (CX)" },
  { company: "Harvey AI", raised: "$3B", valuation: "$3B (Series D 2025)", products: "1 product (legal AI)" },
  { company: "ElevenLabs", raised: "$500M", valuation: "$11B", products: "1 product (voice)" },
  { company: "Abridge", raised: "$758M", valuation: "$2B+", products: "1 product (clinical docs)" },
  { company: "Cognigy", raised: "$165M", valuation: "$955M", products: "1 product (conversational)" },
  { company: "AntimatterAI", raised: "$0", valuation: "$60M pitch", products: "10 products (full platform)" },
];

const FUNDS_ALLOCATION = [
  { name: "Engineering", value: 35, amount: "$5.25M", color: "#00FFB2" },
  { name: "Sales/GTM", value: 30, amount: "$4.50M", color: "#8587e3" },
  { name: "Infrastructure", value: 15, amount: "$2.25M", color: "#00D4FF" },
  { name: "Customer Success", value: 10, amount: "$1.50M", color: "#FFD700" },
  { name: "G&A/Reserve", value: 10, amount: "$1.50M", color: "#A855F7" },
];

const MILESTONES = [
  { month: "Phase 1: Months 0–6", target: "Build GTM, convert design partners, target 3–5 paying customers, initial ARR in low-to-mid single-digit millions", icon: Rocket, color: "#00FFB2" },
  { month: "Phase 2: Months 6–12", target: "Scale FDE model, 10–20 customers, ARR $10M–$20M range, analyst recognition", icon: TrendingUp, color: "#8587e3" },
  { month: "Phase 3: Months 12–24", target: "Multi-product expansion, ARR $30M–$60M range, 25–40 customers, Series B readiness", icon: Crown, color: "#00D4FF" },
  { month: "Longer-Term", target: "Move toward $100M+ ARR with improving EBITDA margins and expanding product portfolio", icon: Star, color: "#FFD700" },
];

const ETHICS_PILLARS = [
  { title: "Customer Owns All IP", desc: "Contractual guarantee. Your data, your models, your intellectual property. Zero ambiguity.", icon: Lock },
  { title: "Zero-Training Guarantee", desc: "We never train on customer data. Your competitive advantage stays competitive.", icon: Shield },
  { title: "Human-in-the-Loop", desc: "All agentic systems include human governance checkpoints. AI augments, never replaces judgment.", icon: Users },
  { title: "Transparent Vendor Matrix", desc: "Every claim is verifiable. We publish the 25-dimension framework for transparency and welcome head-to-head comparison.", icon: Eye },
  { title: "Data Sovereignty", desc: "Customer controls where data lives — cloud, VPC, on-prem, or air-gapped.", icon: Globe },
  { title: "Compliance-Native", desc: "HIPAA, SOC2, FedRAMP built into architecture. Not bolted on afterward.", icon: CheckCircle2 },
  { title: "Emotional AI Intelligence", desc: "Hume EVI empathic voice. AI that understands human emotional context.", icon: Heart },
  { title: "Technosocialism Over Feudalism", desc: "Technology as democratic equalizer. AI for everyone, not just the powerful.", icon: Lightbulb },
];

const GTM_PHASES = [
  {
    phase: "Phase 1",
    name: "Forward Deployed Engineering (FDE)",
    icon: Code,
    color: "#00FFB2",
    desc: "Embed directly with enterprise clients. Deep technical integration that creates immediate value and deep switching costs.",
    channels: ["Direct Enterprise — 60%", "Partner/SI — 25%", "Cloud Marketplace — 10%", "Community/PLG — 5%"],
  },
  {
    phase: "Phase 2",
    name: "Proof of Value (Palantir Model)",
    icon: Activity,
    color: "#8587e3",
    desc: "Outcome-based deployment. Measurable ROI within 90 days. Every POV becomes a reference customer and expansion anchor.",
    channels: ["Discovery → $100K–$150K", "Rapid Deploy → $150K–$250K", "MRR → $25K–$65K/mo"],
  },
  {
    phase: "Phase 3",
    name: "Platform Expansion & MRR",
    icon: Rocket,
    color: "#00D4FF",
    desc: "130% NRR target. Land on one product, expand to the full nervous system. Every enterprise customer becomes a multi-product account.",
    channels: ["Expansion → $65K–$150K/mo", "Strategic Partner → $150K+/mo", "Target NRR: 120–130%+"],
  },
];

const PARTNERS = [
  { name: "Akamai / Linode", role: "Infrastructure", icon: Globe },
  { name: "Stedi", role: "Healthcare EDI", icon: FileText },
  { name: "Hume AI", role: "Empathic Voice", icon: Mic },
  { name: "Thesys.dev", role: "GenUI Platform", icon: Sparkles },
  { name: "F1 Teams", role: "Motorsport AI", icon: Activity },
  { name: "arXiv", role: "Research & Publications", icon: BookOpen },
];

/* ══════════════════════════════════════════════════════════════════
   TYPING ANIMATION
   ══════════════════════════════════════════════════════════════════ */

function TypeWriter({ text, delay = 0, speed = 40 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      {!done && started && <span className="typing-cursor" />}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   STAT COUNTER COMPONENT
   ══════════════════════════════════════════════════════════════════ */

function StatCounter({ value, prefix = "", suffix = "", label }: { value: number; prefix?: string; suffix?: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, 2000, inView);
  const isDone = count === value && inView;

  return (
    <div ref={ref} className="text-center">
      <div className={`text-4xl md:text-5xl font-bold text-[#00FFB2] font-['Clash_Display'] transition-transform ${isDone ? 'counter-done-pulse' : ''}`}>
        {prefix}{count}{suffix}
      </div>
      <div className="text-xs text-white/50 mt-1.5 font-['Satoshi'] uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   VENDOR STATUS CELL
   ══════════════════════════════════════════════════════════════════ */

function VendorCell({ status, vendor }: { status: VendorStatus; vendor: string }) {
  if (vendor === "ATOM") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1 text-[#00FFB2] font-bold text-sm">
          <CheckCircle2 size={14} />Yes
        </span>
      </div>
    );
  }
  if (status === "yes") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1 text-green-400 text-sm">
          <CheckCircle2 size={14} />Yes
        </span>
      </div>
    );
  }
  if (status === "partial") {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1 text-yellow-400 text-sm">
          <AlertCircle size={14} />Partial
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex items-center gap-1 text-red-400 text-sm">
        <XCircle size={14} />No
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════════════ */

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

/* ══════════════════════════════════════════════════════════════════
   STICKY NAV
   ══════════════════════════════════════════════════════════════════ */

function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 navbar-glass"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => scrollTo("hero")}
              className="font-['Clash_Display'] font-bold text-white text-lg tracking-tight hover:text-[#00FFB2] transition-colors"
            >
              Antimatter<span className="text-[#00FFB2]">AI</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all font-['Satoshi'] tracking-wide ${
                    active === s.id
                      ? "text-[#00FFB2] bg-[#00FFB2]/10"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href="mailto:ben@antimatterai.com"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-[#00FFB2] text-black text-xs font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors font-['Satoshi']"
            >
              <Mail size={12} />
              Invest
            </a>

            {/* Mobile menu */}
            <button
              className="lg:hidden text-white/70 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Grid3X3 size={20} />}
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-white/10 bg-black/95 px-4 py-3 grid grid-cols-3 gap-2"
              >
                {NAV_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="text-white/70 hover:text-[#00FFB2] text-xs py-2 text-left transition-colors font-['Satoshi']"
                  >
                    {s.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 1: HERO
   ══════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div id="hero" ref={ref} className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Quantum particle background */}
      <QuantumCanvas />

      {/* Animated gradient mesh */}
      <div className="hero-gradient-mesh" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00FFB2]/5 via-transparent to-black/60" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" style={{ zIndex: 2 }} />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00FFB2]/5" style={{ zIndex: 2 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#8587e3]/3" style={{ zIndex: 2 }} />

      <motion.div
        style={{ y, zIndex: 3 }}
        className="relative text-center px-4 max-w-6xl mx-auto"
      >
        {/* Confidential badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#00FFB2]/30 bg-[#00FFB2]/5 text-[#00FFB2] text-xs font-semibold tracking-widest uppercase font-['Satoshi']"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-pulse" />
          Confidential — For Qualified Investors Only
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Clash_Display'] font-bold text-white leading-none mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Antimatter<span className="text-[#00FFB2]">AI</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/70 text-xl md:text-2xl font-['Satoshi'] mb-2"
        >
          <TypeWriter text="The Nervous System of Enterprise AI" delay={800} speed={45} />
        </motion.p>

        {/* Raise line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="text-[#8587e3] text-base md:text-lg font-['Satoshi'] font-semibold mb-10"
        >
          Series A &nbsp;·&nbsp; $10M–$20M Raise &nbsp;·&nbsp; $60M Pre-Money Valuation
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-10 px-6 md:px-12 py-8 rounded-2xl border border-[#00FFB2]/20 bg-black/50 backdrop-blur-md mb-10"
        >
          <StatCounter value={60} prefix="$" suffix="M" label="Valuation" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <StatCounter value={10} label="Products in Portfolio" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <StatCounter value={99} suffix="+" label="Projects Delivered" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <StatCounter value={25} suffix="/25" label="Vendor Score (Internal)" />
          <div className="w-px h-8 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#00FFB2] font-['Clash_Display']">$0</div>
            <div className="text-xs text-white/50 mt-1 font-['Satoshi'] uppercase tracking-widest">External Capital</div>
          </div>
        </motion.div>

        {/* Meta info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white/40 text-sm font-['Satoshi'] mb-10"
        >
          Self-Funded &nbsp;·&nbsp; Pre-Revenue &nbsp;·&nbsp; Atlanta, GA &nbsp;·&nbsp; March 2026
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById("investment")?.scrollIntoView({ behavior: "smooth" })}
            className="cta-glow-pulse inline-flex items-center gap-2 px-7 py-3.5 bg-[#00FFB2] text-black font-bold rounded-xl hover:bg-[#00FFB2]/90 transition-all transform hover:scale-105 font-['Satoshi']"
          >
            <Rocket size={16} />
            Review Term Sheet
          </button>
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="cta-glow-pulse-outline inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white rounded-xl hover:border-[#00FFB2]/50 hover:bg-[#00FFB2]/5 transition-all font-['Satoshi']"
          >
            <Layers size={16} />
            Explore Products
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span className="text-white/30 text-xs font-['Satoshi'] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-[#00FFB2] animate-bounce-down" size={20} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 2: QUANTUM AWAKENING
   ══════════════════════════════════════════════════════════════════ */

function QuantumSection() {
  return (
    <div id="quantum" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#8587e3]/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <RevealDiv className="text-center mb-16">
          <SectionLabel>The Founder's Vision</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Quantum <span className="text-[#00FFB2]">Awakening</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            AntimatterAI's founding philosophical foundation for the future of human-AI civilization
          </p>
        </RevealDiv>

        {/* Core mandate */}
        <RevealDiv delay={0.1} className="mb-12">
          <div className="relative p-8 md:p-10 rounded-2xl border border-[#00FFB2]/20 bg-gradient-to-br from-[#00FFB2]/5 to-transparent">
            <Quote className="absolute top-6 left-6 text-[#00FFB2]/20" size={40} />
            <blockquote className="text-white/80 text-lg font-['Satoshi'] leading-relaxed pl-8 md:pl-12 italic mb-4">
              "We see AI through a quantum lens — everything is interconnected and dynamic. Our mandate is simple: align AI with human values, preserve human agency, and ensure the benefits reach the many, not just the few."
            </blockquote>
            <div className="pl-8 md:pl-12">
              <div className="text-[#00FFB2] font-semibold font-['Satoshi']">AntimatterAI Founders</div>
            </div>
          </div>
        </RevealDiv>

        {/* Human+AI Symbiosis */}
        <RevealDiv delay={0.15} className="mb-12">
          <div className="p-6 rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/4">
            <div className="flex items-center gap-3 mb-3">
              <Brain size={20} className="text-[#00FFB2]" />
              <h3 className="font-['Clash_Display'] font-bold text-white text-lg">Human + AI Symbiosis</h3>
            </div>
            <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed">
              AI augments human creativity and judgment — it does not replace them. Every agentic system we build includes human governance checkpoints. The fusion of emotional intelligence and machine capability is what makes ATOM different from pure automation plays.
            </p>
          </div>
        </RevealDiv>

        {/* Technosocialism vs Technofeudalism */}
        <RevealDiv delay={0.2} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/3">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="text-red-400" size={20} />
                <span className="font-['Clash_Display'] font-bold text-red-400">Technofeudalism</span>
              </div>
              <p className="text-white/50 text-sm font-['Satoshi']">A few companies own the intelligence that runs civilization. Data becomes the new serfdom. AI amplifies inequality.</p>
            </div>
            <div className="p-6 rounded-xl border border-[#00FFB2]/20 bg-[#00FFB2]/3">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-[#00FFB2]" size={20} />
                <span className="font-['Clash_Display'] font-bold text-[#00FFB2]">Technosocialism</span>
              </div>
              <p className="text-white/50 text-sm font-['Satoshi']">Technology democratically empowers all individuals. Equitable access to AI, guided by transparency, ethics, and collective responsibility.</p>
            </div>
          </div>
        </RevealDiv>

        {/* Concrete implementations */}
        <RevealDiv delay={0.25}>
          <div className="p-6 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4">
            <h3 className="font-['Clash_Display'] font-bold text-white text-lg mb-4">How This Shows Up In Practice</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Lock, title: "Customer Owns 100% IP", desc: "Contractual guarantee in every agreement. No exceptions, no fine print." },
                { icon: Shield, title: "No Training on Customer Data", desc: "Zero-training guarantee. Your competitive advantage stays yours." },
                { icon: Users, title: "Human-in-the-Loop Governance", desc: "Every agentic system includes human oversight checkpoints by design." },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl border border-white/5 bg-white/2">
                  <item.icon size={18} className="text-[#00FFB2] mb-2" />
                  <div className="font-['Clash_Display'] font-bold text-white text-sm mb-1">{item.title}</div>
                  <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm font-['Satoshi'] mt-4 italic">
              This is not marketing language. It is encoded in our contracts, our architecture, and our product roadmap.
            </p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 3: COMPANY OVERVIEW
   ══════════════════════════════════════════════════════════════════ */

function CompanySection() {
  const team = [
    {
      name: "Ben O'Leary",
      role: "Co-Founder & Strategic Architect",
      subtitle: "Chief Quantum Officer",
      color: "#00FFB2",
      bg: "from-[#00FFB2]/10 to-transparent",
      initials: "BO",
      bio: "Autistic systems thinker and architect of AntimatterAI's quantum philosophy and ethical AI covenant. Designed ATOM's 5-layer governance architecture, the 25-dimension vendor framework, and the IP ownership model that differentiates every product. Leads product vision, covenant design, and long-horizon strategy.",
      shipped: ["ATOM platform architecture (10 products)", "ClinixAI ($4M+ pipeline in 180 days)", "Ethical AI covenant", "99+ enterprise projects"],
    },
    {
      name: "Paul Wallace",
      role: "Co-Founder, Managing Partner & CTO",
      subtitle: "ex-Cognizant · ex-Hannibal AI CEO",
      color: "#8587e3",
      bg: "from-[#8587e3]/10 to-transparent",
      initials: "PW",
      bio: "Enterprise AI veteran who has architected and delivered large-scale systems for Fortune 500 clients across Cognizant and as CEO of Hannibal AI. Owns end-to-end technical architecture, platform reliability, security posture, and execution of complex deployments in regulated environments.",
      shipped: ["Enterprise AI delivery at Cognizant", "Hannibal AI platform", "ATOM deployment fabric", "Post-quantum crypto layer"],
    },
    {
      name: "Matt Bravo",
      role: "Co-Founder & General Partner",
      subtitle: "Design & Technology · GenUI Creator",
      color: "#00D4FF",
      bg: "from-[#00D4FF]/10 to-transparent",
      initials: "MB",
      bio: "Design-led technologist who created the Generative UI (GenUI) concept — AI systems that generate their own interfaces in real time. Bridges enterprise UX, interaction design, and AI to turn complex agentic systems into intuitive, deployable products.",
      shipped: ["GenUI concept (no competitor has this)", "ATOM visual intelligence layer", "ClinixAI UX", "Dynamic Matrices"],
    },

  ];

  const clients = ["Lowe's", "Cognizant", "Trimble", "E2open", "Toyota", "OWASP", "Injazat"];

  const coreIdentity = [
    { label: "Founded", value: "July 2024" },
    { label: "Headquarters", value: "Atlanta, GA 30326" },
    { label: "Funding", value: "100% Self-Funded" },
    { label: "Projects Delivered", value: "99+" },
    { label: "Client Satisfaction", value: "99%+" },
    { label: "External Capital", value: "$0" },
    { label: "Vendor Score", value: "25/25 (Internal Framework)" },
    { label: "Products", value: "10 in Portfolio" },
  ];

  return (
    <div id="company" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>The Team</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Company <span className="text-[#00FFB2]">Overview</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            While GPT, Claude, and Grok are the brains — ATOM is the nervous system and spine.
          </p>
        </RevealDiv>

        {/* Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {team.map((member, i) => (
            <RevealDiv key={member.name} delay={i * 0.1}>
              <div className={`p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${member.bg} hover:border-opacity-50 transition-all h-full`}
                style={{ borderColor: `${member.color}20` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 font-bold text-lg font-['Clash_Display']"
                  style={{ backgroundColor: `${member.color}20`, color: member.color, border: `1px solid ${member.color}30` }}>
                  {member.initials}
                </div>
                <h3 className="font-['Clash_Display'] font-bold text-white text-lg mb-1">{member.name}</h3>
                <p className="text-sm font-semibold mb-1 font-['Satoshi']" style={{ color: member.color }}>{member.role}</p>
                <p className="text-white/40 text-xs mb-3 font-['Satoshi']">{member.subtitle}</p>
                <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed mb-3">{member.bio}</p>
                {(member as any).shipped && (
                  <div className="mt-2 mb-1">
                    <p className="text-xs font-bold font-['Satoshi'] mb-1.5" style={{ color: member.color }}>What {member.name.split(' ')[0]} shipped:</p>
                    <div className="space-y-1">
                      {((member as any).shipped as string[]).map((item: string) => (
                        <div key={item} className="flex items-start gap-1.5">
                          <Check size={10} className="mt-0.5 flex-shrink-0" style={{ color: member.color }} />
                          <span className="text-white/50 text-xs font-['Satoshi']">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Complementary Skills */}
        <RevealDiv delay={0.3} className="mb-12">
          <div className="p-6 rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/5">
            <h3 className="font-['Clash_Display'] font-bold text-white text-xl mb-4 text-center">Complementary Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Ben O'Leary", skill: "Vision / Architecture / Ethics", color: "#00FFB2" },
                { name: "Paul Wallace", skill: "Enterprise Delivery / Infra / Security", color: "#8587e3" },
                { name: "Matt Bravo", skill: "Design / UX / GenUI", color: "#00D4FF" },
              ].map((f) => (
                <div key={f.name} className="text-center p-4 rounded-xl border border-white/5 bg-white/2">
                  <div className="font-['Clash_Display'] font-bold text-white text-sm mb-1">{f.name}</div>
                  <div className="text-xs font-['Satoshi']" style={{ color: f.color }}>{f.skill}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Extended Team & Advisors */}
        <RevealDiv delay={0.35} className="mb-12">
          <h3 className="font-['Clash_Display'] font-bold text-white text-xl mb-4">Extended Team & Advisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Head of Engineering", desc: "Seasoned engineering leader to scale platform architecture and manage distributed team execution across ATOM and vertical products.", color: "#00FFB2" },
              { title: "Clinical / Healthcare Advisor", desc: "Physician or health system executive to guide ClinixAI product-market fit, clinical validation, and regulatory pathway.", color: "#FF6B9D" },
              { title: "Security / Compliance Advisor", desc: "Enterprise security specialist with SOC2/HIPAA/FedRAMP experience to strengthen compliance posture for regulated deployments.", color: "#8587e3" },
            ].map((a) => (
              <div key={a.title} className="p-5 rounded-xl border border-white/10 bg-white/3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${a.color}15`, border: `1px solid ${a.color}30` }}>
                  <Users size={18} style={{ color: a.color }} />
                </div>
                <div className="font-['Clash_Display'] font-bold text-white text-sm mb-1">{a.title}</div>
                <span className="text-[10px] font-['Satoshi'] font-semibold px-2 py-0.5 rounded-full border mb-2 inline-block" style={{ borderColor: `${a.color}40`, color: a.color }}>Recruiting</span>
                <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed mt-2">{a.desc}</p>
              </div>
            ))}
          </div>
        </RevealDiv>

        {/* Core Identity Table + Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <RevealDiv>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6">Core Identity</h3>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              {coreIdentity.map((item, i) => (
                <div key={item.label} className={`flex justify-between items-center px-6 py-3.5 ${i % 2 === 0 ? "bg-white/3" : "bg-transparent"}`}>
                  <span className="text-white/50 text-sm font-['Satoshi']">{item.label}</span>
                  <span className="text-[#00FFB2] font-semibold text-sm font-['Satoshi']">{item.value}</span>
                </div>
              ))}
            </div>
          </RevealDiv>

          <RevealDiv delay={0.15}>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6">Enterprise Clients</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
              {clients.map((client) => (
                <div key={client} className="flex items-center justify-center p-3 rounded-xl border border-white/10 bg-white/3 hover:border-[#00FFB2]/30 transition-all">
                  <span className="text-white/70 text-xs font-semibold font-['Satoshi'] text-center">{client}</span>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-xl border border-[#00FFB2]/20 bg-[#00FFB2]/5">
              <p className="text-[#00FFB2] font-bold text-sm font-['Satoshi'] mb-1">Fortune 500 Ready</p>
              <p className="text-white/60 text-sm font-['Satoshi']">99+ enterprise projects delivered with consistently high satisfaction. The deployment knowledge, referenceability, and trust we now encode directly into the ATOM platform.</p>
            </div>
          </RevealDiv>
        </div>

        {/* Positioning statement */}
        <RevealDiv>
          <div className="text-center p-8 md:p-12 rounded-2xl border border-[#00FFB2]/20 bg-gradient-to-br from-[#00FFB2]/5 to-[#8587e3]/5">
            <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-4">Core Positioning</p>
            <p className="font-['Clash_Display'] font-bold text-white text-2xl md:text-3xl leading-snug">
              "While GPT, Claude, and Grok are the <span className="text-[#8587e3]">brains</span> —
              <br />ATOM is the <span className="text-[#00FFB2]">nervous system</span> and spine."
            </p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 4: 25/25 VENDOR MATRIX
   ══════════════════════════════════════════════════════════════════ */

function VendorMatrixSection() {
  const vendors = Object.keys(VENDOR_DATA);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id="matrix" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-16">
          <SectionLabel>Competitive Intelligence</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            The <span className="text-[#00FFB2]">25/25</span> Framework
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Every critical enterprise AI capability, transparently scored. We developed a 25-dimension framework to evaluate enterprise AI platforms. Atom currently achieves full support across all 25 dimensions. We encourage enterprises to adapt or extend this framework to their own needs.
          </p>
        </RevealDiv>

        {/* Score cards */}
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 mb-12">
          {vendors.map((v, i) => (
            <RevealDiv key={v} delay={i * 0.07}>
              <div className={`p-4 rounded-xl text-center border ${v === "ATOM" ? "border-[#00FFB2]/40 bg-[#00FFB2]/8" : "border-white/10 bg-white/3"}`}>
                <div className={`text-3xl font-bold font-['Clash_Display'] mb-1 ${v === "ATOM" ? "text-[#00FFB2]" : "text-white/60"}`}>
                  {v === "ATOM" && inView ? (
                    <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}>
                      25
                    </motion.span>
                  ) : (
                    VENDOR_SCORES[v]
                  )}
                </div>
                <div className={`text-xs font-['Satoshi'] ${v === "ATOM" ? "text-[#00FFB2]/70" : "text-white/40"}`}>{v}</div>
                <div className={`text-xs font-['Satoshi'] ${v === "ATOM" ? "text-[#00FFB2]" : "text-white/30"}`}>/ 25</div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Matrix table */}
        <div ref={ref}>
        <RevealDiv delay={0.2}>
          <div className="rounded-2xl border border-white/10 overflow-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="text-left px-5 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Capability</th>
                  {vendors.map((v) => (
                    <th key={v} className={`text-center px-4 py-4 text-xs font-bold font-['Clash_Display'] ${v === "ATOM" ? "text-[#00FFB2]" : "text-white/50"}`}>
                      {v}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VENDOR_CAPS.map((cap, capIdx) => (
                  <motion.tr
                    key={cap}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: capIdx * 0.08 + 0.3 }}
                    className={`border-b border-white/5 ${capIdx % 2 === 0 ? "bg-transparent" : "bg-white/2"} hover:bg-white/4 transition-colors`}
                  >
                    <td className="px-5 py-3.5 text-white/70 text-sm font-['Satoshi']">{cap}</td>
                    {vendors.map((v) => (
                      <td key={v} className="px-4 py-3.5">
                        <VendorCell status={VENDOR_DATA[v][capIdx]} vendor={v} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealDiv>
        </div>

        {/* Radar chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
          <RevealDiv delay={0.1}>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6 text-center">Capability Radar</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.07)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Satoshi" }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="ATOM" dataKey="ATOM" stroke="#00FFB2" fill="#00FFB2" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Competitors (avg)" dataKey="Competitors" stroke="#8587e3" fill="#8587e3" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
                <Legend formatter={(v) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{v}</span>} />
              </RadarChart>
            </ResponsiveContainer>
          </RevealDiv>

          <RevealDiv delay={0.2}>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6 text-center">Score Comparison</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={vendors.map(v => ({ name: v, score: VENDOR_SCORES[v] }))} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 25]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {vendors.map((v) => (
                    <Cell key={v} fill={v === "ATOM" ? "#00FFB2" : "#8587e3"} fillOpacity={v === "ATOM" ? 1 : 0.5} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </RevealDiv>
        </div>

        {/* Link */}
        <RevealDiv delay={0.3} className="text-center mt-10">
          <a
            href="https://www.antimatterai.com/resources/vendor-matrix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00FFB2] text-sm font-semibold hover:gap-3 transition-all font-['Satoshi']"
          >
            View full vendor matrix at antimatterai.com <ExternalLink size={14} />
          </a>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 5: PRODUCT PORTFOLIO
   ══════════════════════════════════════════════════════════════════ */

function ProductsSection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div id="products" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Platform Architecture</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Product <span className="text-[#00FFB2]">Portfolio</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            10 products. 7 core ATOM + 3 verticals. One integrated nervous system. $45M–$77M total IP replication cost.
          </p>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <RevealDiv key={product.name} delay={i * 0.06}>
              <motion.div
                className="gradient-border-card h-full cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => {
                  if (product.url) {
                    window.open(product.url, "_blank", "noopener,noreferrer");
                  } else {
                    setSelected(selected === i ? null : i);
                  }
                }}
              >
                <div className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm h-full flex flex-col transition-all group-hover:border-opacity-50 product-glow-card"
                  style={{ borderColor: `${product.color}20`, ['--glow-color' as any]: `${product.color}20` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${product.color}15`, border: `1px solid ${product.color}30` }}>
                      <product.icon size={18} style={{ color: product.color }} />
                    </div>
                    <span className={`text-[10px] font-['Satoshi'] font-semibold px-2 py-0.5 rounded-full border ${
                      (product as any).maturity === "SHIPPING" ? "border-[#00FFB2]/30 text-[#00FFB2]/80 bg-[#00FFB2]/10" :
                      (product as any).maturity === "LIMITED BETA" ? "border-[#FFD700]/30 text-[#FFD700]/80 bg-[#FFD700]/10" :
                      "border-[#8587e3]/30 text-[#8587e3]/80 bg-[#8587e3]/10"
                    }`}>
                      {(product as any).maturity || "SHIPPING"}
                    </span>
                  </div>

                  <h3 className="font-['Clash_Display'] font-bold text-white text-sm mb-1 leading-tight">{product.name}</h3>
                  <p className="text-xs font-semibold mb-3 font-['Satoshi']" style={{ color: product.color }}>{product.tagline}</p>
                  <p className="text-white/55 text-xs font-['Satoshi'] leading-relaxed flex-1 mb-4">{product.description}</p>

                  <AnimatePresence>
                    {selected === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 pt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/40 text-xs font-['Satoshi']">Cost to duplicate</span>
                            <span className="text-xs font-bold font-['Satoshi']" style={{ color: product.color }}>{product.cost}</span>
                          </div>
                          <div className="text-xs text-white/40 font-['Satoshi'] leading-tight">{product.comparable}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span className="text-white/30 text-xs font-['Satoshi']">Duplicate: {product.cost}</span>
                    <ChevronRight size={12} className="text-white/20 group-hover:text-[#00FFB2] transition-colors" />
                  </div>
                </div>
              </motion.div>
            </RevealDiv>
          ))}
        </div>

        {/* Total */}
        <RevealDiv delay={0.3} className="mt-12 text-center">
          <div className="inline-flex flex-wrap gap-8 px-10 py-6 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00FFB2] font-['Clash_Display']">$45M–$77M</div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-['Satoshi'] mt-1">Total IP Replication Cost</div>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8587e3] font-['Clash_Display']">10</div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-['Satoshi'] mt-1">Products in Portfolio</div>
            </div>
            <div className="w-px bg-white/10 hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00D4FF] font-['Clash_Display']">7</div>
              <div className="text-white/40 text-xs uppercase tracking-widest font-['Satoshi'] mt-1">In Production Today</div>
            </div>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 6: FIVE LAYERS OF DEFENSIBILITY
   ══════════════════════════════════════════════════════════════════ */

function MoatSection() {
  return (
    <div id="moat" className="bg-black py-32 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#00FFB2]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Competitive Moat</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Five Layers of <span className="text-[#00FFB2]">Defensibility</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Not one moat. Five reinforcing layers that compound. Total IP replication: $45M–$77M.
          </p>
        </RevealDiv>

        {/* What We Built vs What We Wrap */}
        <RevealDiv delay={0.1} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4">
              <h3 className="font-['Clash_Display'] font-bold text-[#00FFB2] text-lg mb-4">Proprietary IP (We Built)</h3>
              <div className="space-y-2">
                {["GenUI engine — AI generates its own interfaces", "5-layer governance fabric (SOC2, HIPAA, FedRAMP)", "Deploy-anywhere runtime (cloud, VPC, on-prem, edge, air-gap)", "Agent orchestration spine (Brain-Spine-Worker)", "ClinixAI clinical stack (ambient scribe + full X12 RCM)", "Post-quantum cryptography layer"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="text-[#00FFB2] mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-white/70 text-sm font-['Satoshi']">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/4">
              <h3 className="font-['Clash_Display'] font-bold text-[#8587e3] text-lg mb-4">Ecosystem Leverage (We Wrap)</h3>
              <div className="space-y-2">
                {["Foundation models (GPT, Claude, Gemini, Llama — model-agnostic)", "Voice providers (Hume EVI, OpenAI Realtime, ElevenLabs)", "Cloud infrastructure (AWS, Azure, GCP, Akamai/Linode)"].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CircleDot className="text-[#8587e3] mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-white/60 text-sm font-['Satoshi']">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#00FFB2] text-sm font-bold font-['Satoshi'] mt-4">Being model-agnostic is the moat, not a weakness.</p>
            </div>
          </div>
        </RevealDiv>

        {/* Visual moat diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
          {MOAT_LAYERS.map((layer, i) => (
            <RevealDiv key={layer.name} delay={i * 0.1}>
              <div
                className="relative p-6 rounded-2xl border h-full flex flex-col transition-all hover:scale-105 cursor-default"
                style={{
                  borderColor: `${layer.color}${30 + i * 8}`,
                  background: `linear-gradient(135deg, ${layer.color}08, transparent)`,
                  marginTop: `${i * 8}px`,
                }}
              >
                {/* Layer number */}
                <div className="absolute -top-3 left-4 px-2 py-0.5 rounded-full text-xs font-bold font-['Satoshi']"
                  style={{ backgroundColor: layer.color, color: "#000" }}>
                  Layer {i + 1}
                </div>

                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 mt-2"
                  style={{ backgroundColor: `${layer.color}15`, border: `1px solid ${layer.color}30` }}>
                  <layer.icon size={18} style={{ color: layer.color }} />
                </div>

                <h3 className="font-['Clash_Display'] font-bold text-white text-sm mb-2">{layer.name}</h3>
                <p className="text-white/55 text-xs font-['Satoshi'] leading-relaxed flex-1 mb-4">{layer.desc}</p>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs font-['Satoshi']">Barrier</span>
                    <span className="text-xs font-semibold font-['Satoshi']" style={{ color: layer.color }}>{layer.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-xs font-['Satoshi']">Time to copy</span>
                    <span className="text-white/60 text-xs font-['Satoshi']">{layer.time}</span>
                  </div>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Total cost banner */}
        <RevealDiv delay={0.5}>
          <div className="p-8 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4 text-center">
            <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-2">Total IP Replication Cost</p>
            <p className="font-['Clash_Display'] font-bold text-[#00FFB2] text-5xl mb-2">$45M – $77M</p>
            <p className="text-white/50 text-sm font-['Satoshi']">Even a well-funded competitor would need 18–36 months and $45M+ to approximate what exists today.</p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 7: MARKET OPPORTUNITY
   ══════════════════════════════════════════════════════════════════ */

function MarketSection() {
  return (
    <div id="market" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Total Addressable Market</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Market <span className="text-[#00FFB2]">Opportunity</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            $124B+ combined TAM today, expanding to $500B+ by 2030. Multiple massive markets, one integrated platform.
          </p>
        </RevealDiv>

        {/* Key adoption stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "79%", label: "Orgs Adopting AI Agents" },
            { value: "96%", label: "Plan Expansion in 2026" },
            { value: "171%", label: "Average ROI from AI" },
            { value: "62.7%", label: "Vertical AI CAGR" },
          ].map((stat, i) => (
            <RevealDiv key={stat.label} delay={i * 0.1}>
              <div className="p-5 rounded-xl border border-[#00FFB2]/15 bg-[#00FFB2]/3 text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#00FFB2] font-['Clash_Display'] mb-1">{stat.value}</div>
                <div className="text-white/50 text-xs font-['Satoshi'] uppercase tracking-wider">{stat.label}</div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Why winnable now */}
        <RevealDiv delay={0.15} className="mb-16">
          <div className="p-6 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4">
            <h3 className="font-['Clash_Display'] font-bold text-white text-xl mb-4">Why These Markets Are Winnable Now</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { num: "01", title: "No dominant platform player", desc: "Enterprise AI remains fragmented. No single vendor owns the full-stack integration layer. The window for a platform play is open." },
                { num: "02", title: "AI structurally shifts margin and speed", desc: "AI is not incremental improvement — it fundamentally changes unit economics, enabling 10x faster deployment and dramatically lower marginal cost." },
                { num: "03", title: "Not winner-take-all yet", desc: "Enterprise AI competes on deployment flexibility, compliance, and trust — not network effects. Multiple large players can coexist, and differentiated platforms win specific verticals." },
              ].map((p) => (
                <div key={p.num} className="p-4 rounded-xl border border-white/5 bg-white/2">
                  <span className="text-[#00FFB2] font-bold text-xs font-['Satoshi']">{p.num}</span>
                  <div className="font-['Clash_Display'] font-bold text-white text-sm mt-1 mb-2">{p.title}</div>
                  <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Market cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {TAM_MARKETS.map((market, i) => (
            <RevealDiv key={market.name} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/2 hover:border-opacity-40 transition-all h-full"
                style={{ borderColor: `${market.color}20` }}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-['Clash_Display'] font-bold text-white text-base">{market.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full font-semibold font-['Satoshi']"
                    style={{ backgroundColor: `${market.color}20`, color: market.color }}>
                    {market.cagr} CAGR
                  </span>
                </div>
                <div className="flex items-end gap-3 mb-3">
                  <div>
                    <div className="text-white/40 text-xs font-['Satoshi'] mb-0.5">2025</div>
                    <div className="text-2xl font-bold font-['Clash_Display'] text-white/70">${market.now}B</div>
                  </div>
                  <ArrowRight className="text-[#00FFB2] mb-1" size={16} />
                  <div>
                    <div className="text-white/40 text-xs font-['Satoshi'] mb-0.5">2030</div>
                    <div className="text-2xl font-bold font-['Clash_Display']" style={{ color: market.color }}>${market.future}B</div>
                  </div>
                </div>
                {/* Growth bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: market.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((market.now / (market.now + market.future)) * 100 * 2, 85)}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-white/40 text-xs font-['Satoshi']">Product: {market.product}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Combined TAM visualization */}
        <RevealDiv delay={0.2}>
          <div className="p-8 md:p-12 rounded-2xl border border-[#00FFB2]/20 bg-gradient-to-br from-[#00FFB2]/5 to-[#8587e3]/5">
            <div className="text-center mb-8">
              <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-2">Combined TAM</p>
              <div className="font-['Clash_Display'] font-bold text-white">
                <span className="text-5xl text-[#00FFB2]">$124B+</span>
                <span className="text-3xl text-white/30 mx-4">→</span>
                <span className="text-5xl text-[#8587e3]">$500B+</span>
              </div>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-white/40 text-sm font-['Satoshi']">Today (2025)</span>
                <ArrowRight className="text-white/20" size={14} />
                <span className="text-white/40 text-sm font-['Satoshi']">By 2030</span>
              </div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #00FFB2, #8587e3)" }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
          </div>
        </RevealDiv>

        {/* Why not winner take all */}
        <RevealDiv delay={0.3} className="mt-12">
          <div className="p-6 rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/5">
            <h3 className="font-['Clash_Display'] font-bold text-white text-xl mb-3">Why Not Winner-Take-All?</h3>
            <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed">
              Enterprise AI does not exhibit the network effects that create winner-take-all dynamics in consumer platforms. Instead, it competes on deployment flexibility, regulatory compliance, and customer trust. This means multiple large players can coexist — and a differentiated, governance-first platform like ATOM can capture meaningful share without needing to defeat Big Tech head-on.
            </p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 8: GO-TO-MARKET
   ══════════════════════════════════════════════════════════════════ */

function GTMSection() {
  return (
    <div id="gtm" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Go-To-Market</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Land, Prove, <span className="text-[#00FFB2]">Expand</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            The Sierra / Palantir / Databricks / Snowflake playbook. FDE → Proof of Value → Platform Expansion.
          </p>
        </RevealDiv>

        {/* Three phases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {GTM_PHASES.map((phase, i) => (
            <RevealDiv key={phase.phase} delay={i * 0.15}>
              <div className="relative p-7 rounded-2xl border h-full transition-all hover:scale-105"
                style={{ borderColor: `${phase.color}25`, background: `linear-gradient(135deg, ${phase.color}06, transparent)` }}>
                <div className="absolute -top-3 left-5 px-3 py-0.5 rounded-full text-xs font-bold font-['Satoshi']"
                  style={{ backgroundColor: phase.color, color: "#000" }}>
                  {phase.phase}
                </div>

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mt-2"
                  style={{ backgroundColor: `${phase.color}15`, border: `1px solid ${phase.color}30` }}>
                  <phase.icon size={22} style={{ color: phase.color }} />
                </div>

                <h3 className="font-['Clash_Display'] font-bold text-white text-lg mb-3">{phase.name}</h3>
                <p className="text-white/55 text-sm font-['Satoshi'] leading-relaxed mb-5">{phase.desc}</p>

                <div className="space-y-2">
                  {phase.channels.map((ch) => (
                    <div key={ch} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: phase.color }} />
                      <span className="text-white/50 text-xs font-['Satoshi']">{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Traction Signals */}
        <RevealDiv delay={0.15} className="mb-16">
          <div className="p-6 rounded-2xl border border-[#FFD700]/20 bg-[#FFD700]/4">
            <h3 className="font-['Clash_Display'] font-bold text-white text-xl mb-4">Traction Signals <span className="text-white/40 text-sm font-['Satoshi'] font-normal">(Pre-Revenue, But Not Pre-Evidence)</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "99+ enterprise projects delivered across Fortune 500 clients",
                "ClinixAI $4M+ qualified pipeline built in just 180 days",
                "GenUI — unique capability no competitor has replicated",
                "25/25 vendor framework being used as a procurement evaluation tool",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 p-3 rounded-lg bg-white/3">
                  <Zap className="text-[#FFD700] mt-0.5 flex-shrink-0" size={14} />
                  <span className="text-white/70 text-sm font-['Satoshi']">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Customer journey */}
        <RevealDiv delay={0.2}>
          <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6">Enterprise Customer Journey</h3>
          <div className="overflow-x-auto">
            <div className="flex items-stretch gap-0 min-w-[700px]">
              {[
                { stage: "Discovery", rev: "$100K–$150K", color: "#8587e3" },
                { stage: "Rapid Deploy", rev: "$150K–$250K", color: "#00FFB2" },
                { stage: "MRR Begins", rev: "$25K–$65K/mo", color: "#00D4FF" },
                { stage: "Expansion", rev: "$65K–$150K/mo", color: "#FFD700" },
                { stage: "Strategic Partner", rev: "$150K+/mo", color: "#A855F7" },
              ].map((step, i, arr) => (
                <div key={step.stage} className="flex-1 relative">
                  <div className="p-4 rounded-none text-center" style={{ background: `${step.color}10`, borderTop: `2px solid ${step.color}` }}>
                    <div className="text-xs font-bold font-['Clash_Display'] mb-1" style={{ color: step.color }}>{step.stage}</div>
                    <div className="text-white/60 text-xs font-['Satoshi']">{step.rev}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <ChevronRight className="text-white/20" size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-6 flex-wrap">
            <div className="text-sm font-['Satoshi']"><span className="text-[#00FFB2] font-bold">Target 3-Year LTV:</span> <span className="text-white/60">$2M–$3M (modeled)</span></div>
            <div className="text-sm font-['Satoshi']"><span className="text-[#00FFB2] font-bold">Target LTV:CAC:</span> <span className="text-white/60">&gt;5:1 at scale</span></div>
            <div className="text-sm font-['Satoshi']"><span className="text-[#00FFB2] font-bold">Target NRR:</span> <span className="text-white/60">120–130%+</span></div>
          </div>
        </RevealDiv>

        {/* Partners */}
        <RevealDiv delay={0.3} className="mt-14">
          <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6">Partnership Ecosystem</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS.map((p, i) => (
              <div key={p.name} className="p-4 rounded-xl border border-white/10 bg-white/3 text-center hover:border-[#00FFB2]/30 transition-all">
                <p.icon className="mx-auto mb-2 text-[#00FFB2]/60" size={20} />
                <div className="text-white/80 text-sm font-bold font-['Satoshi']">{p.name}</div>
                <div className="text-white/40 text-xs font-['Satoshi']">{p.role}</div>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 9: REVENUE MODEL (Rule of 78)
   ══════════════════════════════════════════════════════════════════ */

function RevenueSection() {
  const [activeTier, setActiveTier] = useState(1);

  const rule78Data = [
    { month: "M1", cumulative: 8.5 },
    { month: "M3", cumulative: 76.5 },
    { month: "M6", cumulative: 306 },
    { month: "M9", cumulative: 688.5 },
    { month: "M12", cumulative: 1224 },
  ].map(d => ({ ...d, cumulative: d.cumulative / 100 }));

  return (
    <div id="revenue" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute left-0 top-1/3 w-96 h-96 bg-[#8587e3]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Revenue Architecture</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            The Rule of <span className="text-[#00FFB2]">78</span>
          </h2>
          <div className="max-w-2xl mx-auto mb-4">
            <div className="p-5 rounded-xl border border-[#00FFB2]/20 bg-[#00FFB2]/5 text-center">
              <p className="text-[#00FFB2] font-bold font-['Satoshi'] text-lg mb-1">$10K/mo new MRR = $780K Year 1</p>
              <p className="text-white/50 text-sm font-['Satoshi']">Not $120K. The 6.5x compounding multiplier that makes SaaS magical.</p>
            </div>
          </div>
          <p className="text-white/50 text-sm font-['Satoshi'] italic">Illustrating SaaS compounding — not current revenue. We are currently self-funded and pre-revenue at the platform level.</p>
        </RevealDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* ATOM Tiers */}
          <RevealDiv>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-2">ATOM Platform</h3>
            <p className="text-white/40 text-xs font-['Satoshi'] mb-5 italic">Pricing reflects intended tiers and target margin profile. We are currently finalizing ATOM pricing with design partners.</p>
            <div className="space-y-3">
              {ATOM_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  className="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all"
                  style={{
                    borderColor: activeTier === i ? `${tier.color}50` : "rgba(255,255,255,0.08)",
                    backgroundColor: activeTier === i ? `${tier.color}08` : "transparent",
                  }}
                  onClick={() => setActiveTier(i)}
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-['Clash_Display'] font-bold text-white text-sm">{tier.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-['Satoshi']"
                        style={{ backgroundColor: `${tier.color}20`, color: tier.color }}>
                        {tier.gm} GM
                      </span>
                    </div>
                    <p className="text-white/40 text-xs font-['Satoshi']">{tier.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold font-['Clash_Display']" style={{ color: tier.color }}>{tier.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealDiv>

          {/* ClinixAI Tiers */}
          <RevealDiv delay={0.15}>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-2">ClinixAI Healthcare</h3>
            <p className="text-white/40 text-xs font-['Satoshi'] mb-5 italic">ClinixAI pricing reflects target ranges for design partner discussions.</p>
            <div className="space-y-3">
              {CLINIX_TIERS.map((tier, i) => (
                <div key={tier.name} className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/2 transition-all hover:border-[#FF6B9D]/30">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-['Clash_Display'] font-bold text-white text-sm">{tier.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-['Satoshi']"
                        style={{ backgroundColor: `${tier.color}20`, color: tier.color }}>
                        {tier.gm} GM
                      </span>
                    </div>
                    <p className="text-white/40 text-xs font-['Satoshi']">{tier.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold font-['Clash_Display']" style={{ color: tier.color }}>{tier.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealDiv>
        </div>

        {/* Rule of 78 explainer */}
        <RevealDiv delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/4">
            <div>
              <h4 className="font-['Clash_Display'] font-bold text-white text-xl mb-3">Why Rule of 78?</h4>
              <p className="text-white/60 text-sm font-['Satoshi'] leading-relaxed mb-4">
                In SaaS, if you add $10K in new MRR every month for 12 months, you don't earn $120K — you earn $780K because each dollar compounds from the month it lands. The Rule of 78 is why SaaS businesses with consistent growth become exponentially valuable.
              </p>
              <div className="p-4 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/5 mb-3">
                <p className="text-[#FFD700] text-xs font-bold font-['Satoshi'] mb-1">Illustrative Example</p>
                <p className="text-white/50 text-xs font-['Satoshi']">$10K/mo new MRR × 12 months = $780K recognized revenue (not $120K)</p>
              </div>
              <p className="text-white/40 text-xs font-['Satoshi'] italic leading-relaxed">
                All Rule-of-78 examples are forward-looking management tools based on hypothetical MRR ramps. They are not commitments or depictions of current revenue performance.
              </p>
            </div>
            <div>
              <h4 className="font-['Clash_Display'] font-bold text-white text-xl mb-3 text-center">MRR Compounding Effect</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={[
                  { month: "M1", value: 8.5 },
                  { month: "M2", value: 25.5 },
                  { month: "M3", value: 51 },
                  { month: "M6", value: 153 },
                  { month: "M9", value: 306 },
                  { month: "M12", value: 510 },
                ]}>
                  <defs>
                    <linearGradient id="ruleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FFB2" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00FFB2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }} />
                  <Area type="monotone" dataKey="value" stroke="#00FFB2" strokeWidth={2} fill="url(#ruleGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 10: FINANCIAL PROJECTIONS
   ══════════════════════════════════════════════════════════════════ */

function FinancialsSection() {
  const unitEcon = [
    { label: "3-Year LTV (modeled)", value: "$2M–$3M", icon: DollarSign, color: "#00FFB2" },
    { label: "Target LTV:CAC", value: ">5:1", icon: TrendingUp, color: "#8587e3" },
    { label: "Target NRR", value: "120–130%+", icon: RefreshCw, color: "#00D4FF" },
    { label: "Target CAC Payback", value: "<12 mo", icon: Clock, color: "#FFD700" },
    { label: "Target ACV", value: "$250K–$500K", icon: Target, color: "#FF6B9D" },
    { label: "Target Logo Churn", value: "5–10%", icon: Activity, color: "#A855F7" },
  ];

  return (
    <div id="financials" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>5-Year Model</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Financial <span className="text-[#00FFB2]">Projections</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Scenario-based financial projections. All figures are forward-looking management scenarios, not commitments.
          </p>
        </RevealDiv>

        {/* Scenario Table */}
        <RevealDiv className="mb-12">
          <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6 text-center">5-Year Revenue Scenario Ranges</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="text-left px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Year</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Revenue Range</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">EBITDA Status</th>
                  <th className="text-right px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">GM Range</th>
                </tr>
              </thead>
              <tbody>
                {FINANCIAL_PROJECTIONS.map((row, i) => (
                  <tr key={row.year} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
                    <td className="px-6 py-4 font-bold text-sm font-['Clash_Display'] text-[#00FFB2]">{row.year}</td>
                    <td className="px-4 py-4 text-right text-white/70 text-sm font-['Satoshi']">${row.revLow}M – ${row.revHigh}M</td>
                    <td className="px-4 py-4 text-right text-sm font-['Satoshi']">
                      <span className={row.ebitdaNote === "Negative" ? "text-red-400" : row.ebitdaNote === "~Breakeven" ? "text-[#FFD700]" : "text-[#00FFB2]"}>{row.ebitdaNote}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-white/60 text-sm font-['Satoshi']">{row.gmRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/30 text-xs font-['Satoshi'] mt-3 italic">All projections are management scenarios based on assumed customer acquisition and expansion rates. Not commitments.</p>
        </RevealDiv>

        {/* Key Assumptions */}
        <RevealDiv delay={0.1} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4">
              <h3 className="font-['Clash_Display'] font-bold text-white text-lg mb-4">Key Assumptions</h3>
              <div className="space-y-2">
                {[
                  "10–20 new enterprise customers per year",
                  "Initial ACV of $250K–$500K",
                  "NRR of 120–130%+ through expansion",
                  "Gross margins improve with scale (75% → 85%)",
                  "EBITDA breakeven targeted by Year 3",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="text-[#00FFB2] mt-0.5 flex-shrink-0" size={14} />
                    <span className="text-white/60 text-sm font-['Satoshi']">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-[#8587e3]/20 bg-[#8587e3]/4">
              <h3 className="font-['Clash_Display'] font-bold text-white text-lg mb-4">Target Metrics</h3>
              <div className="space-y-2">
                {[
                  { label: "ARR / FTE at Scale", value: "$200K–$300K+", color: "#00FFB2" },
                  { label: "Burn Multiple", value: "<2x by Y2", color: "#8587e3" },
                  { label: "Logo Churn Target", value: "5–10%", color: "#00D4FF" },
                  { label: "CAC Payback", value: "<12 months", color: "#FFD700" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white/50 text-sm font-['Satoshi']">{item.label}</span>
                    <span className="font-bold text-sm font-['Satoshi']" style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealDiv>

        {/* Unit economics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {unitEcon.map((metric, i) => (
            <RevealDiv key={metric.label} delay={i * 0.07}>
              <div className="p-4 rounded-xl border border-white/10 bg-white/2 text-center hover:border-opacity-50 transition-all"
                style={{ borderColor: `${metric.color}20` }}>
                <metric.icon className="mx-auto mb-2" size={18} style={{ color: metric.color }} />
                <div className="text-xl font-bold font-['Clash_Display'] mb-1" style={{ color: metric.color }}>{metric.value}</div>
                <div className="text-white/40 text-xs font-['Satoshi'] uppercase tracking-wider">{metric.label}</div>
              </div>
            </RevealDiv>
          ))}
        </div>

        <RevealDiv delay={0.15} className="mb-4">
          <p className="text-white/30 text-xs font-['Satoshi'] italic text-center mt-4">Target Unit Economics (Modeled, Not Historical). Actual metrics will be reported once we have 12+ months of production cohort data.</p>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 11: VALUATION ANALYSIS
   ══════════════════════════════════════════════════════════════════ */

function ValuationSection() {
  const methodologies = [
    {
      name: "Cost-to-Duplicate",
      range: "$33.7M – $63.5M",
      midpoint: "$48.6M",
      color: "#00FFB2",
      icon: Layers,
      desc: "Direct cost to rebuild 10 production products, post-quantum crypto stack, 99+ enterprise deployments, and accumulated know-how.",
      items: [
        { label: "ATOM Enterprise Platform", value: "$8–12M" },
        { label: "ATOM Voice + IntentIQ", value: "$5–8M" },
        { label: "ATOM Browser", value: "$4–6M" },
        { label: "ATOM Agentic + Matrix", value: "$3–5M" },
        { label: "ClinixAI Healthcare Stack", value: "$3.5–5.5M" },
        { label: "Post-Quantum Crypto Layer", value: "$2–4M" },
        { label: "GIS + Lead Gen + Vidzee", value: "$3.5–5M" },
        { label: "DevOps, Testing, Integration", value: "$2–4M" },
      ],
    },
    {
      name: "VC Comparable Method",
      range: "$66.7M – $300M",
      midpoint: "$66.7M (conservative)",
      color: "#8587e3",
      icon: BarChart3,
      desc: "Based on comparable single-product raises. Sierra ($10B, 1 product), ElevenLabs ($11B, 1 product), Cognigy ($955M, 1 product). AntimatterAI has 10.",
      items: [
        { label: "Sierra AI (1 product)", value: "$10B valuation" },
        { label: "Cognigy (1 product)", value: "$178M raised" },
        { label: "Kore.ai (1 product)", value: "$150M raised" },
        { label: "ElevenLabs (1 product)", value: "$11B valuation" },
        { label: "AntimatterAI (10 products)", value: "$60M pitch" },
        { label: "Discount applied", value: "Pre-revenue" },
      ],
    },
    {
      name: "Market Comparables",
      range: "$40M – $75M",
      midpoint: "$57.5M",
      color: "#00D4FF",
      icon: Globe,
      desc: "ClinixAI $4M+ pipeline at 10–15x forward revenue multiple, plus platform value of remaining 6 products and 3 vertical businesses.",
      items: [
        { label: "ClinixAI pipeline", value: "$4M+ qualified pipeline" },
        { label: "Forward multiple", value: "10–15x" },
        { label: "ClinixAI standalone", value: "$40–60M" },
        { label: "Platform premium (6 products)", value: "+$15–30M" },
        { label: "Blended valuation", value: "$45–75M" },
      ],
    },
  ];

  return (
    <div id="valuation" className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Valuation Analysis</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Three Lenses. <span className="text-[#00FFB2]">One Reasonable Range.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            $40M–$75M convergence across multiple methods.
          </p>
        </RevealDiv>

        {/* Three methodology cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {methodologies.map((m, i) => (
            <RevealDiv key={m.name} delay={i * 0.15}>
              <div className="p-7 rounded-2xl border h-full flex flex-col"
                style={{ borderColor: `${m.color}25`, background: `linear-gradient(135deg, ${m.color}06, transparent)` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}30` }}>
                    <m.icon size={18} style={{ color: m.color }} />
                  </div>
                  <span className="font-['Clash_Display'] font-bold text-white text-sm">{m.name}</span>
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-bold font-['Clash_Display']" style={{ color: m.color }}>{m.range}</div>
                  <div className="text-white/40 text-xs font-['Satoshi']">Midpoint: {m.midpoint}</div>
                </div>
                <p className="text-white/55 text-sm font-['Satoshi'] leading-relaxed mb-5 flex-1">{m.desc}</p>
                <div className="space-y-1.5">
                  {m.items.map((item) => (
                    <div key={item.label} className="flex justify-between items-center text-xs">
                      <span className="text-white/40 font-['Satoshi']">{item.label}</span>
                      <span className="font-semibold font-['Satoshi']" style={{ color: m.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Convergence visualization */}
        <RevealDiv delay={0.3}>
          <div className="p-8 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4 text-center mb-12">
            <p className="text-white/40 text-sm font-['Satoshi'] uppercase tracking-widest mb-4">Convergence Zone</p>
            <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
              <span className="text-white/50 text-sm font-['Satoshi']">Cost-to-Duplicate</span>
              <div className="w-8 h-px bg-white/20" />
              <span className="text-white/50 text-sm font-['Satoshi']">VC Method</span>
              <div className="w-8 h-px bg-white/20" />
              <span className="text-white/50 text-sm font-['Satoshi']">Market Comps</span>
            </div>
            <div className="text-6xl font-bold font-['Clash_Display'] text-[#00FFB2] mb-2">$60M</div>
            <p className="text-white/50 text-sm font-['Satoshi']">Pitch valuation — $50M formal term sheet, $60M investor positioning. Three independent analyses converge on $40M–$75M.</p>
          </div>
        </RevealDiv>

        {/* Comparables table */}
        <RevealDiv delay={0.2}>
          <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6">Market Comparables</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/3">
                  <th className="text-left px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Company</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Capital Raised</th>
                  <th className="text-right px-4 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Valuation</th>
                  <th className="text-right px-6 py-4 text-white/50 text-xs font-semibold font-['Satoshi'] uppercase tracking-wider">Products</th>
                </tr>
              </thead>
              <tbody>
                {COMP_TABLE.map((row, i) => (
                  <tr key={row.company}
                    className={`border-b border-white/5 ${row.company === "AntimatterAI" ? "bg-[#00FFB2]/5" : i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
                    <td className={`px-6 py-4 font-bold text-sm font-['Satoshi'] ${row.company === "AntimatterAI" ? "text-[#00FFB2]" : "text-white/80"}`}>{row.company}</td>
                    <td className="px-4 py-4 text-right text-white/60 text-sm font-['Satoshi']">{row.raised}</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`text-sm font-bold font-['Satoshi'] ${row.company === "AntimatterAI" ? "text-[#00FFB2]" : "text-white/60"}`}>{row.valuation}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-white/50 text-sm font-['Satoshi']">{row.products}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 rounded-xl border border-[#00FFB2]/15 bg-[#00FFB2]/3">
            <p className="text-[#00FFB2] text-sm font-bold font-['Satoshi']">The asymmetric opportunity:</p>
            <p className="text-white/60 text-sm font-['Satoshi'] mt-1">We intentionally price at a fraction of late-stage comps to align maximum upside with early investors. Entry at $60M with 10 products in portfolio vs. single-product companies at $1B–$10B+ represents asymmetric risk/reward.</p>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TERM SHEET WRAPPER
   ══════════════════════════════════════════════════════════════════ */

const EQUITY_VEHICLE = {
  id: "equity",
  name: "Equity (Series A Preferred)",
  tagline: "Standard VC Structure",
  description: "Traditional Series A preferred equity with board governance, pro-rata rights, and information rights. Clean cap table entry at $50M pre-money.",
  minInvest: "$250K",
  features: [
    "1x non-participating liquidation preference",
    "Pro-rata rights in future rounds",
    "Information rights & quarterly reporting",
    "Board observer seat",
    "Broad-based weighted average anti-dilution",
  ],
  riskLevel: "moderate",
  targetReturn: "10-50x",
  lockup: "5-7 years",
  color: "#00FFB2",
};

function TermSheetWrapper() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {!open ? (
        <div className="p-6 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/4 text-center">
          <p className="text-white/60 text-sm font-['Satoshi'] mb-4">Series A Preferred Equity — $60M Pre-Money Valuation</p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FFB2] text-black font-bold rounded-xl hover:bg-[#00FFB2]/90 transition-all font-['Satoshi']"
          >
            <FileText size={16} />
            Open Interactive Term Sheet
          </button>
        </div>
      ) : (
        <TermSheet vehicle={EQUITY_VEHICLE} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 12: INVESTMENT OPPORTUNITY / TERM SHEET
   ══════════════════════════════════════════════════════════════════ */

function InvestmentSection() {
  return (
    <div id="investment" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00FFB2]/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Series A</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Investment <span className="text-[#00FFB2]">Opportunity</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            $10M–$20M Series A. $50M formal pre-money / $60M pitch valuation. Clean cap table.
          </p>
        </RevealDiv>

        {/* Term Sheet Component */}
        <RevealDiv className="mb-16">
          <TermSheetWrapper />
        </RevealDiv>

        {/* Use of Funds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <RevealDiv delay={0.1}>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6">Use of Funds ($15M midpoint)</h3>
            <div className="space-y-3 mb-6">
              {FUNDS_ALLOCATION.map((item, i) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm font-['Satoshi']">{item.name}</span>
                    <span className="font-bold text-sm font-['Satoshi']" style={{ color: item.color }}>{item.amount} ({item.value}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </RevealDiv>

          <RevealDiv delay={0.15}>
            <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-6">Funds Allocation</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RePieChart>
                <Pie
                  data={FUNDS_ALLOCATION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {FUNDS_ALLOCATION.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }}
                  formatter={(v: any, name: any, props: any) => [
                    `${v}% — ${props.payload.amount}`,
                    props.payload.name,
                  ]}
                />
                <Legend formatter={(v) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{v}</span>} />
              </RePieChart>
            </ResponsiveContainer>
          </RevealDiv>
        </div>

        {/* Milestone roadmap */}
        <RevealDiv delay={0.2}>
          <h3 className="font-['Clash_Display'] font-bold text-white text-2xl mb-8">Strategic Milestone Roadmap</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FFB2] via-[#8587e3] to-[#FF6B9D]" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <RevealDiv key={m.month} delay={i * 0.1}>
                  <div className="flex items-start gap-6 pl-4">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center z-10 mt-1 flex-shrink-0"
                      style={{ backgroundColor: m.color, border: `2px solid ${m.color}40` }}>
                      <div className="w-2 h-2 rounded-full bg-black" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest font-['Satoshi']">{m.month}</span>
                        <m.icon size={14} style={{ color: m.color }} />
                        <span className="font-['Satoshi'] font-bold text-white text-sm">{m.target}</span>
                      </div>
                    </div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Long-term vision */}
        <RevealDiv delay={0.4} className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-xl border border-[#00FFB2]/20 bg-[#00FFB2]/4 text-center">
              <Calendar className="mx-auto mb-3 text-[#00FFB2]" size={24} />
              <div className="text-2xl font-bold font-['Clash_Display'] text-[#00FFB2] mb-1">12–18 Months</div>
              <div className="text-white/60 text-sm font-['Satoshi']">Series B readiness with strong ARR traction</div>
            </div>
            <div className="p-6 rounded-xl border border-[#8587e3]/20 bg-[#8587e3]/4 text-center">
              <TrendingUp className="mx-auto mb-3 text-[#8587e3]" size={24} />
              <div className="text-2xl font-bold font-['Clash_Display'] text-[#8587e3] mb-1">Year 3–4</div>
              <div className="text-white/60 text-sm font-['Satoshi']">Path to $100M+ ARR</div>
            </div>
            <div className="p-6 rounded-xl border border-[#FFD700]/20 bg-[#FFD700]/4 text-center">
              <Crown className="mx-auto mb-3 text-[#FFD700]" size={24} />
              <div className="text-2xl font-bold font-['Clash_Display'] text-[#FFD700] mb-1">Long-Term</div>
              <div className="text-white/60 text-sm font-['Satoshi']">EBITDA-positive at scale with expanding margins</div>
            </div>
          </div>
        </RevealDiv>

        {/* Hiring plan */}
        <RevealDiv delay={0.3} className="mt-8">
          <div className="p-6 rounded-xl border border-white/10 bg-white/2 flex items-center gap-6 flex-wrap">
            <Users className="text-[#00FFB2] flex-shrink-0" size={24} />
            <div>
              <div className="text-[#00FFB2] font-bold font-['Satoshi']">Hiring Plan</div>
              <div className="text-white/50 text-sm font-['Satoshi']">4 → 45 people in 18 months. Engineering, Sales, Customer Success, and Infrastructure teams.</div>
            </div>
          </div>
        </RevealDiv>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 13: ETHICS & CLOSING
   ══════════════════════════════════════════════════════════════════ */

function EthicsSection() {
  return (
    <div id="ethics" className="bg-black py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 animate-cinematic-gradient opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 2 }}>
        <RevealDiv className="text-center mb-20">
          <SectionLabel>Ethical AI Covenant</SectionLabel>
          <h2 className="font-['Clash_Display'] font-bold text-white text-5xl md:text-6xl mb-6">
            Ethics & <span className="text-[#00FFB2]">Principles</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-['Satoshi']">
            Not a pledge. A covenant. Philosophically engrained. Contractually enforced. Architecturally implemented.
          </p>
        </RevealDiv>

        {/* Ethics vs competitors comparison */}
        <RevealDiv delay={0.1} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/3 ethics-glow-red">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="text-red-400" size={20} />
                <span className="font-['Clash_Display'] font-bold text-red-400 text-lg">Companies That Violated Pledges</span>
              </div>
              <div className="space-y-3">
                {[
                  "Anthropic — Abandoned original safety pledges to compete commercially",
                  "OpenAI — Non-profit mission replaced by $157B for-profit valuation",
                  "Microsoft Copilot — Trains on customer data without explicit consent",
                  "Google Vertex — No IP ownership transfer; Google retains usage rights",
                  "Salesforce Einstein — Customer data used to train shared models",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <p className="text-white/50 text-sm font-['Satoshi']">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-[#00FFB2]/20 bg-[#00FFB2]/3 ethics-glow-teal">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-[#00FFB2]" size={20} />
                <span className="font-['Clash_Display'] font-bold text-[#00FFB2] text-lg">AntimatterAI Covenant</span>
              </div>
              <div className="space-y-3">
                {[
                  "Customer owns 100% of IP — contractual guarantee, no exceptions",
                  "Zero-training guarantee — never trains on customer data, period",
                  "Human-in-the-loop governance for ALL agentic systems",
                  "Transparent vendor matrix — every claim is publicly verifiable",
                  "Data sovereignty — customer controls every byte, always",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check className="text-[#00FFB2] mt-0.5 flex-shrink-0" size={14} />
                    <p className="text-white/70 text-sm font-['Satoshi']">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealDiv>

        {/* 8 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {ETHICS_PILLARS.map((pillar, i) => (
            <RevealDiv key={pillar.title} delay={i * 0.07}>
              <div className="p-5 rounded-xl border border-[#00FFB2]/15 bg-[#00FFB2]/3 h-full">
                <pillar.icon className="text-[#00FFB2] mb-3" size={20} />
                <h4 className="font-['Clash_Display'] font-bold text-white text-sm mb-2">{pillar.title}</h4>
                <p className="text-white/50 text-xs font-['Satoshi'] leading-relaxed">{pillar.desc}</p>
              </div>
            </RevealDiv>
          ))}
        </div>

        {/* Quantum closing */}
        <RevealDiv delay={0.2} className="mb-16">
          <div className="relative p-8 md:p-12 rounded-2xl border border-[#8587e3]/30 bg-[#8587e3]/5">
            <Quote className="absolute top-6 left-6 text-[#8587e3]/20" size={48} />
            <blockquote className="text-white/70 text-lg font-['Satoshi'] leading-relaxed pl-8 md:pl-12 italic mb-6">
              "This quantum-inspired symbiosis of technology, emotion, and ethics is fundamental for humanity to adapt and keep pace with the exponential changes brought by human+AI collaboration, unlocking near-infinite possibilities by harmonizing human creativity and machine intelligence dynamically. Regarding technosocialism versus technofeudalism — technology should democratically empower all individuals with equitable access to resources, innovation, and governance guided by transparency, ethics, and collective responsibility."
            </blockquote>
            <div className="pl-8 md:pl-12">
              <div className="text-[#8587e3] font-semibold font-['Satoshi']">AntimatterAI Founders</div>
            </div>
          </div>
        </RevealDiv>

        {/* Final CTA */}
        <RevealDiv delay={0.3}>
          <div className="text-center p-10 md:p-16 rounded-3xl border border-[#00FFB2]/20 bg-gradient-to-br from-[#00FFB2]/5 to-[#8587e3]/5">
            <p className="text-[#00FFB2] text-sm font-semibold uppercase tracking-widest font-['Satoshi'] mb-4">The Opportunity</p>
            <h3 className="font-['Clash_Display'] font-bold text-white text-3xl md:text-5xl mb-4 leading-tight">
              Invest in the Nervous System<br />of <span className="text-[#00FFB2]">Enterprise AI</span>
            </h3>
            <p className="text-white/50 text-lg font-['Satoshi'] max-w-2xl mx-auto mb-8">
              Series A | $10M–$20M | $60M Pre-Money | 10 Products | 25/25 Score | $0 External Capital to Date
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <a
                href="mailto:ben@antimatterai.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#00FFB2] text-black font-bold rounded-xl hover:bg-[#00FFB2]/90 transition-all transform hover:scale-105 font-['Satoshi'] text-lg"
              >
                <Mail size={18} />
                Schedule Investor Meeting
              </a>
              <a
                href="/antimatterai_mega_document.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#00FFB2]/40 text-[#00FFB2] rounded-xl hover:bg-[#00FFB2]/10 transition-all font-['Satoshi']"
              >
                <Download size={16} />
                Investor Deep Dive (66 pages)
              </a>
            </div>

            {/* Document downloads */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Investor Deep Dive", file: "/antimatterai_mega_document.pdf" },
                { label: "State of Disruption", file: "/antimatterai_state_of_disruption.pdf" },
                { label: "Investor Hype Deck", file: "/antimatterai_investor_hype.pdf" },
                { label: "Pitch Deck (PPTX)", file: "/antimatterai_pitch_deck.pptx" },
              ].map((doc) => (
                <a
                  key={doc.label}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all text-sm font-['Satoshi']"
                >
                  <FileText size={14} />
                  {doc.label}
                </a>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Market Research Component */}
        <RevealDiv delay={0.4} className="mt-12">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={() => document.getElementById("market-research-section")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#8587e3] text-white font-bold rounded-xl hover:bg-[#8587e3]/90 transition-all transform hover:scale-105 font-['Satoshi'] text-lg"
            >
              <BarChart3 size={22} />
              View Interactive Market Research
              <ChevronRight size={18} />
            </button>
          </div>
        </RevealDiv>

        {/* Market Research Component */}
        <div id="market-research-section" className="mt-12">
          <RevealDiv delay={0.1}>
            <MarketResearch />
          </RevealDiv>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-['Clash_Display'] font-bold text-white text-2xl mb-3">
              Antimatter<span className="text-[#00FFB2]">AI</span>
            </div>
            <p className="text-white/40 text-sm font-['Satoshi'] max-w-xs leading-relaxed mb-5">
              The nervous system of enterprise AI. Building the quantum future of human-machine symbiosis.
            </p>
            <p className="text-white/20 text-xs font-['Satoshi']">
              CONFIDENTIAL — FOR QUALIFIED INVESTORS ONLY<br />
              © 2026 AntimatterAI. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest font-['Satoshi'] mb-4">Documents</h4>
            <div className="space-y-2">
              {[
                { label: "Investor Deep Dive", file: "/antimatterai_mega_document.pdf" },
                { label: "State of Disruption", file: "/antimatterai_state_of_disruption.pdf" },
                { label: "Investor Hype Deck", file: "/antimatterai_investor_hype.pdf" },
                { label: "Pitch Deck (PPTX)", file: "/antimatterai_pitch_deck.pptx" },
              ].map((doc) => (
                <a
                  key={doc.label}
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-[#00FFB2] text-sm transition-colors font-['Satoshi']"
                >
                  <Download size={12} />
                  {doc.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest font-['Satoshi'] mb-4">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:ben@antimatterai.com" className="flex items-center gap-2 text-white/50 hover:text-[#00FFB2] text-sm transition-colors font-['Satoshi']">
                <Mail size={12} />
                ben@antimatterai.com
              </a>
              <a href="https://www.antimatterai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-[#00FFB2] text-sm transition-colors font-['Satoshi']">
                <Globe size={12} />
                www.antimatterai.com
              </a>
              <div className="flex items-center gap-2 text-white/30 text-sm font-['Satoshi']">
                <MapPin size={12} />
                Atlanta, GA 30326
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-['Satoshi']">
            Self-Funded · Pre-Revenue · March 2026 · Series A $10M–$20M · $60M Pre-Money
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CURSOR GLOW
   ══════════════════════════════════════════════════════════════════ */

function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div
      className="cursor-glow pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN HOME COMPONENT
   ══════════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Global effects */}
      <ScrollProgress />
      <StickyNav />
      <CursorGlow />

      {/* All sections */}
      <HeroSection />
      <QuantumSection />
      <CompanySection />
      <VendorMatrixSection />
      <ProductsSection />
      <MoatSection />
      <MarketSection />
      <GTMSection />
      <RevenueSection />
      <FinancialsSection />
      <ValuationSection />
      <InvestmentSection />
      <StateOfDisruption />
      <EthicsSection />

      {/* Footer */}
      <Footer />

      {/* C1 AI Assistant (floating bottom-right) */}
      <C1Assistant />
    </div>
  );
}
