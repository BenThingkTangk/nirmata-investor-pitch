import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain, HeartPulse, Atom, Video, Target, Globe, Shield, Cpu,
  ChevronDown, ArrowRight, Check, Zap, Lock, TrendingUp,
  BarChart3, Layers, Network, X, ExternalLink, Eye, Scale, Search,
  Play, Pause, DollarSign, Rocket, Crown, Quote, Building2,
  Download, Mic, Grid3X3, ChevronRight, Sparkles, MessageSquare,
  Users, MapPin, FileText, Mail, Calendar, Clock, Award
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from "recharts";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";
import TermSheet from "@/components/TermSheet";
import MarketResearch from "@/components/MarketResearch";

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */

const heroStats = [
  { value: 7, label: "Production Products", prefix: "", suffix: "" },
  { value: 49, label: "Cost to Duplicate", prefix: "$", suffix: "M" },
  { value: 25, label: "Vendor Score", prefix: "", suffix: "/25" },
  { value: 4, label: "Pipeline ARR", prefix: "$", suffix: "M+" },
];

/* ─── ATOM NERVOUS SYSTEM PRODUCTS ─── */
const nervousSystemNodes = [
  {
    name: "ATOM Voice",
    role: "Conversational Nervous System",
    metaphor: "The Ears",
    icon: Mic,
    color: "#00FFB2",
    description: "AI-powered voice agents that listen, understand, and respond with human-level nuance. Real-time sentiment analysis with emotional intelligence.",
    whyItMatters: "Voice is the primary enterprise interface. ATOM Voice handles complex multi-turn conversations across healthcare, finance, and customer service.",
    comparable: "Sierra AI — $4.5B valuation for conversational AI alone",
    url: "https://www.antimatterai.com/voice-agents",
  },
  {
    name: "ATOM Browser",
    role: "Cognitive Front Door",
    metaphor: "The Eyes",
    icon: Globe,
    color: "#00D4FF",
    description: "AI-native browser with built-in agentic capabilities. Not a browser with AI bolted on — AI that happens to render the web.",
    whyItMatters: "The browser is where work happens. ATOM Browser turns passive browsing into active intelligence gathering and task execution.",
    comparable: "Arc Browser — $550M valuation pre-revenue",
    url: "https://www.antimatterai.com/atom/search",
  },
  {
    name: "ATOM IntentIQ",
    role: "Intent & Signal Layer",
    metaphor: "The Intuition",
    icon: Search,
    color: "#7B61FF",
    description: "Real-time intent decoding engine. Understands not just what users say, but what they mean — predicting needs before they're articulated.",
    whyItMatters: "Intent is the gap between what customers ask and what they need. IntentIQ closes that gap with predictive signal analysis.",
    comparable: "Gong — $7.2B valuation for conversation intelligence",
    url: "https://www.antimatterai.com/atom-intentiq",
  },
  {
    name: "ATOM Enterprise",
    role: "Governance & Spine",
    metaphor: "The Spine",
    icon: Shield,
    color: "#00FFB2",
    description: "The governance backbone. SOC2, HIPAA, post-quantum cryptography, VPC deployment. The enterprise-grade infrastructure that makes everything else possible.",
    whyItMatters: "Enterprise AI without governance is a liability. ATOM Enterprise is the compliance and security layer that Fortune 500 CISOs require.",
    comparable: "Vanta — $2.45B valuation for compliance automation",
    url: "https://www.antimatterai.com/enterprise-ai",
  },
  {
    name: "ATOM Agentic",
    role: "Autonomous Worker Layer",
    metaphor: "The Hands",
    icon: Cpu,
    color: "#E040FB",
    description: "Autonomous AI workers that execute multi-step workflows without human intervention. Not chatbots — digital employees with agency.",
    whyItMatters: "The shift from tools to agents is the defining transition in enterprise AI. ATOM Agentic workers handle entire workflows end-to-end.",
    comparable: "Cognition (Devin) — $2B valuation for autonomous agents",
    url: "https://www.antimatterai.com/agentic-ai",
  },
  {
    name: "ATOM Matrix",
    role: "Knowledge & Context Field",
    metaphor: "The Memory",
    icon: Grid3X3,
    color: "#FFD700",
    description: "Dynamic knowledge matrices that provide persistent context across all ATOM products. The connective tissue of organizational intelligence.",
    whyItMatters: "AI without memory is stateless and limited. ATOM Matrix creates persistent, evolving knowledge graphs that make every interaction smarter.",
    comparable: "Glean — $4.6B valuation for enterprise knowledge",
    url: "https://www.antimatterai.com/enterprise-ai",
  },
  {
    name: "ATOM Lead Gen",
    role: "Dynamic Opportunity Engine",
    metaphor: "The Drive",
    icon: Target,
    color: "#FF6B35",
    description: "AI-powered sales development that cold calls, emails, qualifies, and closes with real-time sentiment analysis and dynamic objection handling.",
    whyItMatters: "Revenue generation is the proving ground. ATOM Lead Gen turns pipeline into revenue with autonomous multi-channel outreach.",
    comparable: "11x.ai — $350M valuation for AI SDR",
    url: "https://www.antimatterai.com/agentic-ai",
  },
  {
    name: "ATOM GIS",
    role: "Physical Space Intelligence",
    metaphor: "The Spatial Awareness",
    icon: MapPin,
    color: "#00FFB2",
    description: "AI-powered geospatial intelligence for data centers, real estate, and physical infrastructure optimization.",
    whyItMatters: "Digital intelligence needs physical world context. ATOM GIS bridges the gap between virtual AI and physical space optimization.",
    comparable: "Nearmap — $1.1B acquisition by Thoma Bravo",
    url: "https://www.antimatterai.com/data-center-map",
  },
];

/* ─── VALUATION METHODOLOGIES ─── */
const valuationMethodologies = [
  {
    name: "Cost-to-Duplicate",
    range: [25, 49],
    description: "What it would cost to rebuild: 7 production products, proprietary IP, 99+ enterprise projects, post-quantum cryptography stack, and 10+ years of accumulated know-how.",
    details: [
      { item: "ATOM Enterprise Platform", value: "$8-12M" },
      { item: "ATOM Voice + IntentIQ", value: "$5-8M" },
      { item: "ATOM Browser", value: "$4-6M" },
      { item: "ATOM Agentic + Matrix", value: "$3-5M" },
      { item: "ClinixAI Healthcare Stack", value: "$3-5M" },
      { item: "Post-Quantum Crypto Layer", value: "$2-4M" },
      { item: "GIS + Lead Gen + Vidzee", value: "$3-5M" },
      { item: "DevOps, Testing, Integration", value: "$2-4M" },
    ],
    color: "#00FFB2",
  },
  {
    name: "VC Comparable Method",
    range: [40, 75],
    description: "Based on comparable raises: Sierra ($4.5B, 1 product), Cognigy ($178M, 1 product), Kore.ai ($150M). AntimatterAI has 7 products with the only perfect vendor score.",
    details: [
      { item: "Sierra AI (1 product)", value: "$4.5B valuation" },
      { item: "Cognigy (1 product)", value: "$178M raised" },
      { item: "Kore.ai (1 product)", value: "$150M raised" },
      { item: "11x.ai (1 product)", value: "$350M valuation" },
      { item: "AntimatterAI (7 products)", value: "$40-75M ask" },
      { item: "Discount applied", value: "Pre-revenue stage" },
    ],
    color: "#7B61FF",
  },
  {
    name: "Market Multiple Method",
    range: [45, 75],
    description: "ClinixAI $4M+ pipeline at 10-15x forward revenue multiple, plus platform value of remaining 6 products and 3 vertical businesses.",
    details: [
      { item: "ClinixAI pipeline", value: "$4M+ ARR" },
      { item: "Forward multiple", value: "10-15x" },
      { item: "ClinixAI standalone value", value: "$40-60M" },
      { item: "Platform premium (6 products)", value: "Additional $15-30M" },
      { item: "Blended valuation", value: "$45-75M" },
    ],
    color: "#00D4FF",
  },
];

/* ─── 25/25 VENDOR MATRIX ─── */
const vendorMatrixCapabilities = [
  "IP Ownership",
  "Generative UI (GenUI)",
  "Hybrid Deployment",
  "Model-Agnostic",
  "Voice + GenUI + VPC",
  "Post-Quantum Crypto",
  "HIPAA + SOC2",
  "Agentic Workflows",
];

const vendorScores: Record<string, number[]> = {
  "ATOM":      [5, 5, 5, 5, 5, 5, 5, 5],
  "Kore.ai":   [2, 0, 3, 3, 2, 0, 3, 2],
  "Cognigy":   [2, 0, 2, 3, 2, 0, 3, 2],
  "Microsoft":  [1, 0, 2, 1, 1, 0, 4, 3],
  "Sierra":    [1, 0, 0, 2, 2, 0, 3, 3],
  "Google":    [1, 0, 1, 0, 2, 0, 4, 3],
};

const vendorTotals: Record<string, number> = {
  "ATOM": 25,
  "Kore.ai": 15,
  "Cognigy": 14,
  "Microsoft": 12,
  "Sierra": 11,
  "Google": 11,
};

/* ─── RADAR CHART DATA ─── */
const radarData = [
  { subject: "IP Ownership", ATOM: 100, Competitors: 30 },
  { subject: "GenUI", ATOM: 100, Competitors: 0 },
  { subject: "Hybrid Deploy", ATOM: 100, Competitors: 35 },
  { subject: "Model-Agnostic", ATOM: 100, Competitors: 40 },
  { subject: "Post-Quantum", ATOM: 100, Competitors: 0 },
];

/* ─── VERTICALS ─── */
const verticals = [
  {
    name: "ClinixAI",
    subtitle: "Healthcare RCM Command Center",
    tam: "$72.96B",
    pipeline: "$4M+",
    metric: "1,000+ providers",
    comps: [
      { name: "AKASA", valuation: "$205M" },
      { name: "Abridge", valuation: "$758M" },
      { name: "Ambience", valuation: "$313M" },
    ],
    quote: "ClinixAI alone could raise $30-50M as a standalone Series A",
    color: "#00FFB2",
    icon: HeartPulse,
  },
  {
    name: "MoleculeAI / Antiquant",
    subtitle: "Quantum Drug Discovery",
    tam: "$85B+",
    pipeline: "R&D stage",
    metric: "VQE + classical hybrid",
    comps: [
      { name: "XtalPi", valuation: "$1.6B" },
      { name: "Atomwise", valuation: "$218M" },
      { name: "Isomorphic Labs", valuation: "$600M" },
    ],
    quote: "Quantum advantage in drug discovery is a when, not if",
    color: "#7B61FF",
    icon: Atom,
  },
  {
    name: "Vidzee",
    subtitle: "AI Real Estate Intelligence",
    tam: "PropTech",
    pipeline: "Production deployed",
    metric: "Post-Series A growth",
    comps: [
      { name: "Matterport", valuation: "$1.6B" },
      { name: "Rex", valuation: "$45M" },
    ],
    quote: "Positioned for rapid scaling with platform infrastructure already built",
    color: "#00D4FF",
    icon: Video,
  },
];

/* ─── INVESTOR OBJECTIONS ─── */
const investorObjections = [
  {
    question: "You're pre-revenue — how can you be worth $40-75M?",
    answer: "Three independent methodologies converge on this range. The cost to duplicate our 7-product platform alone is $25-49M. Sierra raised at $4.5B with 1 product. We're asking for less than 1% of that with 7x the product breadth and the only perfect vendor matrix score in enterprise AI. ClinixAI has $4M+ in pipeline within 180 days.",
  },
  {
    question: "Sierra is at $10B — why aren't you?",
    answer: "Sierra has $4.5B in funding, 200+ employees, and Bret Taylor. We have 7 products, a 25/25 vendor score (Sierra scores 11/25), and zero dilution. At $50M pre-money, you're buying the most technically complete enterprise AI platform at 0.5% of Sierra's valuation. That's the asymmetric opportunity.",
  },
  {
    question: "Can Microsoft or Google just replicate this?",
    answer: "They've had billions and years. Neither has GenUI. Neither has full IP ownership transfer. Neither has post-quantum cryptography. Neither scores above 12/25 on our vendor matrix. Big tech builds tools. We built a nervous system. The architectural difference is fundamental, not incremental.",
  },
  {
    question: "What's the revenue path from here?",
    answer: "ClinixAI: $4M+ pipeline converting now (per-claim revenue model). ATOM Enterprise: Fortune 500 pipeline with Lowe's, Cognizant, Trimble, Toyota already in the client roster. ATOM Lead Gen: Self-funding through outbound revenue generation. Path to $10M+ ARR within 18 months of funding.",
  },
  {
    question: "Why self-funded? Doesn't that limit scale?",
    answer: "Self-funding was strategic, not accidental. It gave us $0 dilution, zero investor politics, and the freedom to build 7 products without quarterly pressure. The clean cap table IS the advantage. Every institutional investor gets a rare opportunity: ground-floor entry into a mature technology platform.",
  },
  {
    question: "What's the competitive moat, really?",
    answer: "Four layers: (1) 25/25 vendor score — 10+ points ahead of any competitor. (2) GenUI is world-exclusive — no one else has it or has it on their roadmap. (3) Post-quantum cryptography — regulatory tailwinds will make this mandatory. (4) 99+ enterprise projects with 99%+ satisfaction — the deployment knowledge is unreplicable.",
  },
];

/* ─── INVESTMENT VEHICLES (V3 — 3 paths) ─── */
const investmentVehicles = [
  {
    id: "equity",
    name: "Equity (Series A Preferred)",
    tagline: "Standard VC Structure",
    description: "Traditional Series A preferred equity with board governance, pro-rata rights, and information rights. Clean cap table entry at $40-75M pre-money.",
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
    lockup: "Standard",
    color: "#00FFB2",
    scenarios: [
      { label: "Conservative (3x)", exit: "$150M", returnMultiple: "3x", irr: "25%" },
      { label: "Base Case (10x)", exit: "$500M", returnMultiple: "10x", irr: "58%" },
      { label: "Optimistic (50x)", exit: "$2.5B+", returnMultiple: "50x", irr: "120%+" },
    ],
  },
  {
    id: "revenue",
    name: "Revenue-Based Financing",
    tagline: "Cash Flow Aligned Returns",
    description: "Non-dilutive capital with returns tied to ClinixAI claims processing revenue. Monthly distributions from actual revenue — alignment without equity dilution.",
    minInvest: "$100K",
    features: [
      "Revenue share on ClinixAI claims",
      "Monthly distributions tied to revenue",
      "Cap at 1.5-3x return",
      "Non-dilutive — no equity conversion",
      "Real-time revenue dashboard access",
    ],
    riskLevel: "low",
    targetReturn: "1.5-3x",
    lockup: "18-24 months",
    color: "#FFD700",
    scenarios: [
      { label: "Conservative", exit: "$1.5M on $1M", returnMultiple: "1.5x", irr: "20%" },
      { label: "Base Case", exit: "$2.25M on $1M", returnMultiple: "2.25x", irr: "35%" },
      { label: "Optimistic", exit: "$3M on $1M", returnMultiple: "3x", irr: "50%" },
    ],
  },
  {
    id: "convertible",
    name: "Convertible Note",
    tagline: "Bridge to Value Crystallization",
    description: "Interest-bearing debt with equity upside. 8% annual interest, 20% conversion discount, and $75M valuation cap. Best of both worlds — downside protection with upside participation.",
    minInvest: "$150K",
    features: [
      "8% annual interest (simple)",
      "20% conversion discount to next round",
      "Valuation cap at $75M",
      "18-month maturity with auto-convert",
      "2x repayment premium on change of control",
    ],
    riskLevel: "low",
    targetReturn: "5-15x",
    lockup: "18 months",
    color: "#E040FB",
    scenarios: [
      { label: "Conservative (debt)", exit: "1.08x + interest", returnMultiple: "1.08x", irr: "8%" },
      { label: "Base Case (convert)", exit: "$500M round", returnMultiple: "8x", irr: "55%" },
      { label: "Optimistic (convert)", exit: "$2B+ round", returnMultiple: "25x", irr: "100%+" },
    ],
  },
];

/* ─── WHY NOW CARDS ─── */
const whyNowCards = [
  {
    title: "Enterprise AI Consolidation",
    description: "CIOs are reducing AI vendors from 10+ to 2-3. The platform that replaces 5 tools with 1 wins. ATOM is that platform.",
    icon: Layers,
    color: "#00FFB2",
  },
  {
    title: "Regulatory Acceleration",
    description: "GDPR, HIPAA, EU AI Act all favor deploy-anywhere, IP-owning platforms. Every regulation passed makes ATOM more valuable.",
    icon: Shield,
    color: "#7B61FF",
  },
  {
    title: "LLM Commoditization",
    description: "As foundation models commoditize, value shifts to orchestration and deployment. Model-agnostic architecture becomes the moat.",
    icon: Network,
    color: "#00D4FF",
  },
];

/* ══════════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ══════════════════════════════════════════════════════════════════ */

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl md:text-5xl font-bold gradient-text">
        {prefix}{count}{suffix}
      </div>
    </div>
  );
}

function Section({ children, id, className = "" }: { children: React.ReactNode; id: string; className?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 204, 143, ${p.opacity})`;
        ctx!.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(0, 204, 143, ${0.06 * (1 - dist / 100)})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ─── NAVBAR ─── */
function Navbar({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-glass py-3" : "py-5 bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group" data-testid="navbar-logo">
          <span className="font-display text-lg font-bold tracking-wider text-white group-hover:text-[#00FFB2] transition-colors">
            ANTIMATTER<span className="text-[#00FFB2]">AI</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Story", id: "story" },
            { label: "Platform", id: "platform" },
            { label: "Valuation", id: "valuation" },
            { label: "Competition", id: "competition" },
            { label: "Invest", id: "investment" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
              data-testid={`nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("investment")}
          className="px-5 py-2 text-sm font-semibold rounded-lg transition-all hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #00FFB2, #00cc8e)", color: "#0a0e14" }}
          data-testid="nav-invest-now"
        >
          Invest Now
        </button>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN HOME COMPONENT
   ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [expandedNode, setExpandedNode] = useState<number | null>(null);
  const [expandedMethod, setExpandedMethod] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);
  const [termSheetVehicle, setTermSheetVehicle] = useState<string | null>(null);
  const [showMarketResearch, setShowMarketResearch] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  const openTermSheet = useCallback((vehicleId: string) => {
    setTermSheetVehicle(vehicleId);
  }, []);

  const selectedTermSheetData = termSheetVehicle
    ? investmentVehicles.find((v) => v.id === termSheetVehicle)
    : null;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" onMouseMove={handleMouseMove}>
      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      {/* Cursor glow */}
      <div className="cursor-glow hidden md:block" style={{ left: cursorPos.x, top: cursorPos.y }} />

      <Navbar scrollTo={scrollTo} />

      {/* ════════════════════════════════════════════════════════════
         1. HERO
         ════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
        <ParticleCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FFB2]/20 bg-[#00FFB2]/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
            <span className="text-sm text-[#00FFB2] font-medium">Series A — $40M–$75M Pre-Money</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="gradient-text">The Nervous System</span>
            <br />
            <span className="text-white">That Powers AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Every AI brain needs a body. We built the nervous system.
          </motion.p>

          {/* Stats ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12"
          >
            {heroStats.map((stat, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollTo("story")}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:brightness-110 flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #00FFB2, #00cc8e)", color: "#0a0e14" }}
              data-testid="cta-explore-thesis"
            >
              Explore the Thesis
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.open("/antimatterai_valuation_v2.pdf", "_blank")}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
              data-testid="cta-download-valuation"
            >
              <Download className="w-4 h-4" />
              Download Valuation
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce-down" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
         2. THE QUANTUM AWAKENING
         ════════════════════════════════════════════════════════════ */}
      <Section id="story" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FFB2] font-semibold">The Vision</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-8">
              THE QUANTUM AWAKENING
            </h2>
          </motion.div>

          {/* Opening quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-l-2 border-[#00FFB2]/40 pl-6 mb-12"
          >
            <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed">
              "What if AI didn't just automate what we do… but became a conscious-seeming partner in reimagining what's possible?"
            </p>
          </motion.blockquote>

          <div className="space-y-6 text-gray-400 text-base md:text-lg leading-relaxed mb-12">
            <p>
              The enterprise AI market is drowning in tools that automate yesterday's workflows. Chatbots that follow scripts. Agents that execute commands. Software that does what it's told, nothing more.
            </p>
            <p>
              At AntimatterAI, we don't build better automation. We're architecting the era of <span className="text-white font-semibold">agentic consciousness</span> — systems that sense, understand, and resolve with genuine agency.
            </p>
            <p>
              Not artificial intelligence that mimics. Intelligence infrastructure that <span className="text-[#00FFB2]">awakens with purpose</span>.
            </p>
          </div>

          {/* Key concept card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 border border-[#7B61FF]/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-[#7B61FF]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#7B61FF] font-semibold">Core Thesis</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
              Cognitive Acceleration with Agency
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Systems that don't just learn — they awaken with purpose. ATOM is the nervous system and spine of the modern enterprise: sensing through voice, seeing through browsers, deciding through intent analysis, acting through autonomous agents. Everything we touch begins to think back.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         3. THE ATOM NERVOUS SYSTEM
         ════════════════════════════════════════════════════════════ */}
      <Section id="platform" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FFB2] font-semibold">The Platform</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              THE ATOM NERVOUS SYSTEM
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              8 interconnected products forming the most complete enterprise AI platform ever built. Click any node to explore.
            </p>
          </div>

          {/* Hub and spoke grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nervousSystemNodes.map((node, i) => {
              const NodeIcon = node.icon;
              const isExpanded = expandedNode === i;

              return (
                <motion.div
                  key={node.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`glass rounded-xl cursor-pointer transition-all duration-300 ${
                    isExpanded ? "md:col-span-2 lg:col-span-2 ring-1" : "hover:border-white/20"
                  }`}
                  style={isExpanded ? { borderColor: `${node.color}40` } : {}}
                  onClick={() => setExpandedNode(isExpanded ? null : i)}
                  data-testid={`node-${node.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${node.color}15` }}>
                        <NodeIcon className="w-5 h-5" style={{ color: node.color }} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-bold text-sm text-white">{node.name}</h4>
                        <p className="text-xs text-gray-500">{node.metaphor}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{node.role}</p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/5 space-y-4">
                            <p className="text-sm text-gray-300 leading-relaxed">{node.description}</p>
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Why It Matters</p>
                              <p className="text-sm text-gray-400">{node.whyItMatters}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                <span className="text-gray-400">Comp: </span>
                                <span style={{ color: node.color }}>{node.comparable}</span>
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(node.url, "_blank");
                                }}
                                className="text-xs flex items-center gap-1 hover:text-white transition-colors"
                                style={{ color: node.color }}
                              >
                                Explore <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Fortune 500 confidence bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 confidence-bar"
          >
            <span className="accent">99+</span><span>Enterprise Projects</span>
            <div className="divider" />
            <span className="accent">99%+</span><span>Client Satisfaction</span>
            <div className="divider" />
            <span>Clients include</span>
            {["Lowe's", "Cognizant", "Trimble", "Toyota", "E2open"].map((c) => (
              <span key={c} className="accent">{c}</span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         4. THE VALUATION THESIS
         ════════════════════════════════════════════════════════════ */}
      <Section id="valuation" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#7B61FF] font-semibold">The Math</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              THREE METHODOLOGIES. ONE CONCLUSION.
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              $40M–$75M pre-money. Mathematical, not aspirational.
            </p>
          </div>

          {/* Convergence visualization */}
          <div className="glass rounded-2xl p-6 md:p-10 mb-8">
            <div className="space-y-8">
              {valuationMethodologies.map((method, i) => {
                const isExpanded = expandedMethod === i;
                const minPct = ((method.range[0] - 10) / 80) * 100;
                const widthPct = ((method.range[1] - method.range[0]) / 80) * 100;

                return (
                  <motion.div
                    key={method.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => setExpandedMethod(isExpanded ? null : i)}
                      className="w-full text-left"
                      data-testid={`method-${method.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                          <span className="text-sm font-semibold text-white">{method.name}</span>
                        </div>
                        <span className="text-sm font-mono" style={{ color: method.color }}>
                          ${method.range[0]}M – ${method.range[1]}M
                        </span>
                      </div>

                      {/* Range bar */}
                      <div className="relative h-8 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute h-full rounded-full"
                          style={{
                            left: `${minPct}%`,
                            background: `linear-gradient(90deg, ${method.color}60, ${method.color})`,
                            boxShadow: `0 0 20px ${method.color}30`,
                          }}
                        />
                        {/* Convergence zone marker at 40-75 */}
                        <div
                          className="absolute h-full border-l border-r border-dashed border-white/20"
                          style={{
                            left: `${((40 - 10) / 80) * 100}%`,
                            width: `${((75 - 40) / 80) * 100}%`,
                          }}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-2">
                            <p className="text-sm text-gray-400 mb-4">{method.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {method.details.map((d, di) => (
                                <div key={di} className="flex justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                                  <span className="text-gray-500">{d.item}</span>
                                  <span className="font-mono" style={{ color: method.color }}>{d.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Scale labels */}
            <div className="flex justify-between mt-4 text-xs text-gray-600">
              <span>$10M</span>
              <span>$25M</span>
              <span>$40M</span>
              <span>$55M</span>
              <span>$70M</span>
              <span>$90M</span>
            </div>
          </div>

          {/* Sierra comparison callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-6 border border-[#00FFB2]/10"
          >
            <p className="text-sm md:text-base text-gray-300 text-center">
              At <span className="text-[#00FFB2] font-bold">$50M pre-money</span>, AntimatterAI is priced at{" "}
              <span className="text-white font-bold">0.5% of Sierra's valuation</span> — with comparable technical depth, the only perfect vendor score, and{" "}
              <span className="text-[#00FFB2] font-bold">zero dilution</span>.
            </p>
          </motion.div>

          <div className="text-center mt-8">
            <button
              onClick={() => window.open("/antimatterai_valuation_v2.pdf", "_blank")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#7B61FF]/30 text-[#7B61FF] text-sm font-semibold hover:bg-[#7B61FF]/10 transition-all"
              data-testid="btn-download-valuation"
            >
              <FileText className="w-4 h-4" />
              Download Full Valuation Analysis
            </button>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         5. THE 25/25 MATRIX
         ════════════════════════════════════════════════════════════ */}
      <Section id="competition" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FFB2] font-semibold">Competitive Dominance</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              THE ONLY PERFECT SCORE IN ENTERPRISE AI
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              25 dimensions. 6 vendors. One clear winner.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Interactive table */}
            <div className="glass rounded-2xl p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-2 text-xs text-gray-500 uppercase tracking-wider">Capability</th>
                    {Object.keys(vendorScores).map((vendor) => (
                      <th
                        key={vendor}
                        className={`py-3 px-2 text-xs uppercase tracking-wider text-center ${
                          vendor === "ATOM" ? "text-[#00FFB2]" : "text-gray-500"
                        }`}
                      >
                        {vendor}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vendorMatrixCapabilities.map((cap, ci) => (
                    <motion.tr
                      key={cap}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.03 }}
                      className="border-b border-white/5"
                    >
                      <td className="py-3 px-2 text-xs text-gray-400">{cap}</td>
                      {Object.entries(vendorScores).map(([vendor, scores]) => (
                        <td key={vendor} className="py-3 px-2 text-center">
                          <span
                            className={`inline-block w-7 h-7 rounded-md text-xs font-bold leading-7 ${
                              scores[ci] >= 4
                                ? "bg-[#00FFB2]/20 text-[#00FFB2]"
                                : scores[ci] >= 2
                                ? "bg-yellow-500/15 text-yellow-400"
                                : scores[ci] > 0
                                ? "bg-white/5 text-gray-500"
                                : "bg-red-500/10 text-red-400/60"
                            }`}
                          >
                            {scores[ci]}
                          </span>
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                  {/* Totals row */}
                  <tr className="border-t-2 border-white/10">
                    <td className="py-4 px-2 text-xs text-white font-bold uppercase">Total</td>
                    {Object.entries(vendorTotals).map(([vendor, total]) => (
                      <td key={vendor} className="py-4 px-2 text-center">
                        <span className={`text-sm font-bold font-mono ${vendor === "ATOM" ? "text-[#00FFB2]" : "text-gray-400"}`}>
                          {total}/25
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Radar chart */}
            <div className="glass rounded-2xl p-6 flex flex-col">
              <h3 className="font-display text-lg font-bold text-white mb-2">Capability Radar</h3>
              <p className="text-xs text-gray-500 mb-4">5 key dimensions — ATOM vs competitor average</p>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#888", fontSize: 10 }} />
                    <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                    <Radar name="ATOM" dataKey="ATOM" stroke="#00FFB2" fill="#00FFB2" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Competitors" dataKey="Competitors" stroke="#555" fill="#555" fillOpacity={0.05} strokeWidth={1} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00FFB2]" />
                  <span className="text-xs text-gray-400">ATOM (25/25)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <span className="text-xs text-gray-400">Competitor Avg</span>
                </div>
              </div>
            </div>
          </div>

          {/* GenUI callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass rounded-xl p-6 border border-[#00FFB2]/10 text-center"
          >
            <p className="text-sm md:text-base text-gray-300">
              <span className="text-[#00FFB2] font-bold">GenUI is a world-exclusive capability.</span>{" "}
              No other vendor offers dynamic UI generation from agentic reasoning. It's not on their roadmap.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         6. VERTICAL AI BUSINESSES
         ════════════════════════════════════════════════════════════ */}
      <Section id="verticals" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E040FB] font-semibold">Portfolio</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              THREE INDEPENDENTLY FUNDABLE COMPANIES.
              <br />
              <span className="gradient-text-purple">ONE PLATFORM.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {verticals.map((v, i) => {
              const VIcon = v.icon;
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${v.color}15` }}>
                      <VIcon className="w-5 h-5" style={{ color: v.color }} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white">{v.name}</h3>
                      <p className="text-xs text-gray-500">{v.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">TAM</span>
                      <span className="font-mono" style={{ color: v.color }}>{v.tam}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pipeline</span>
                      <span className="text-white font-semibold">{v.pipeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className="text-gray-300">{v.metric}</span>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Comparable Valuations</p>
                      {v.comps.map((comp) => (
                        <div key={comp.name} className="flex justify-between text-xs py-1">
                          <span className="text-gray-400">{comp.name}</span>
                          <span className="font-mono text-gray-300">{comp.valuation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs italic mt-4 pt-3 border-t border-white/5" style={{ color: v.color }}>
                    "{v.quote}"
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         7. INVESTOR OBJECTIONS HANDLER
         ════════════════════════════════════════════════════════════ */}
      <Section id="objections" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#FFD700] font-semibold">Due Diligence</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              EVERY TOUGH QUESTION, ANSWERED
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Data-driven responses to the questions every serious investor will ask.
            </p>
          </div>

          <div className="space-y-3">
            {investorObjections.map((obj, i) => {
              const isExpanded = expandedObjection === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedObjection(isExpanded ? null : i)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                    data-testid={`objection-${i}`}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#FFD700]/10">
                      <MessageSquare className="w-4 h-4 text-[#FFD700]" />
                    </div>
                    <span className="text-sm md:text-base text-white font-medium flex-1">{obj.question}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-[4.25rem]">
                          <p className="text-sm text-gray-400 leading-relaxed">{obj.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         8. THE ASYMMETRIC RETURN PATH — INVESTMENT SELECTOR
         ════════════════════════════════════════════════════════════ */}
      <Section id="investment" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00FFB2] font-semibold">Investment</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              DESIGN YOUR INVESTMENT
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Choose the structure that aligns with your thesis. We'll build the term sheet.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {investmentVehicles.map((vehicle, i) => {
              const isSelected = selectedVehicle === i;

              return (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
                    isSelected ? "ring-1" : "hover:border-white/20"
                  }`}
                  style={isSelected ? { borderColor: `${vehicle.color}40`, boxShadow: `0 0 30px ${vehicle.color}10` } : {}}
                  onClick={() => setSelectedVehicle(isSelected ? null : i)}
                  data-testid={`vehicle-${vehicle.id}`}
                >
                  {/* Top color bar */}
                  <div className="h-1" style={{ background: `linear-gradient(90deg, ${vehicle.color}, transparent)` }} />

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-white text-base">{vehicle.name}</h3>
                      <span className="text-xs font-mono px-2 py-1 rounded-md" style={{ color: vehicle.color, backgroundColor: `${vehicle.color}15` }}>
                        {vehicle.targetReturn}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">{vehicle.tagline}</p>
                    <p className="text-sm text-gray-400 mb-4">{vehicle.description}</p>

                    <div className="space-y-2 mb-4">
                      {vehicle.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs text-gray-400">
                          <Check className="w-3 h-3 shrink-0" style={{ color: vehicle.color }} />
                          {f}
                        </div>
                      ))}
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/5 space-y-4">
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Return Scenarios</p>
                            {vehicle.scenarios.map((s, si) => (
                              <div key={si} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                                <span className="text-xs text-gray-400">{s.label}</span>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs font-mono" style={{ color: vehicle.color }}>{s.returnMultiple}</span>
                                  <span className="text-xs text-gray-500">IRR {s.irr}</span>
                                </div>
                              </div>
                            ))}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openTermSheet(vehicle.id);
                              }}
                              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-110"
                              style={{
                                background: `linear-gradient(135deg, ${vehicle.color}, ${vehicle.color}cc)`,
                                color: "#0a0e14",
                              }}
                              data-testid={`btn-term-sheet-${vehicle.id}`}
                            >
                              Build My Term Sheet →
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         9. WHY NOW
         ════════════════════════════════════════════════════════════ */}
      <Section id="why-now" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#00D4FF] font-semibold">Timing</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              WHY 2026 IS THE PERFECT ENTRY POINT
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyNowCards.map((card, i) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${card.color}10` }}>
                    <CardIcon className="w-6 h-6" style={{ color: card.color }} />
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         10. THE COVENANT
         ════════════════════════════════════════════════════════════ */}
      <Section id="covenant" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8587e3] font-semibold">Our Covenant</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
            THE ETHICAL FRAMEWORK
          </h2>

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xl md:text-2xl text-gray-300 italic">
              "Agency is demonstrable. Consciousness is optional."
            </p>
            <p className="text-sm text-gray-500 mt-3">
              We're not building AI to replace humans. We're building intelligence systems to amplify human potential.
            </p>
          </motion.blockquote>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Elevation over Extraction", desc: "Every system we build should make humans more capable, not more dependent.", color: "#00FFB2" },
              { title: "Partnership over Automation", desc: "AI that works alongside people, not instead of them. Augmented intelligence, not artificial replacement.", color: "#7B61FF" },
              { title: "Meaning over Metrics", desc: "We optimize for outcomes that matter — healthcare access, scientific discovery, human flourishing.", color: "#00D4FF" },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 text-left"
              >
                <div className="w-8 h-0.5 rounded-full mb-4" style={{ backgroundColor: pillar.color }} />
                <h3 className="font-display font-bold text-white text-sm mb-2">{pillar.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         11. THE ASK
         ════════════════════════════════════════════════════════════ */}
      <Section id="ask" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-8">
            This Isn't a Startup Pitch.
            <br />
            <span className="gradient-text">This Is an Invitation.</span>
          </h2>

          {/* Stats flow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            {[
              "$0 raised",
              "→",
              "7 products",
              "→",
              "99+ projects",
              "→",
              "Fortune 500 clients",
              "→",
              "$40-75M ask",
            ].map((item, i) => (
              <span
                key={i}
                className={`text-sm md:text-base ${
                  item === "→" ? "text-[#00FFB2]" : "text-gray-300 font-semibold"
                }`}
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-lg md:text-xl text-gray-400 italic max-w-2xl mx-auto">
              "You're not here to forecast it. You're here to fabricate its gravity."
            </p>
          </motion.blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => window.open("mailto:invest@antimatterai.com?subject=Investment%20Inquiry%20-%20AntimatterAI%20Series%20A", "_blank")}
              className="px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:brightness-110 flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #00FFB2, #00cc8e)", color: "#0a0e14" }}
              data-testid="cta-schedule-meeting"
            >
              <Mail className="w-4 h-4" />
              Schedule a Meeting
            </button>
            <button
              onClick={() => window.open("/antimatterai_valuation_v2.pdf", "_blank")}
              className="px-8 py-4 rounded-xl font-semibold text-sm border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
              data-testid="cta-download-report"
            >
              <Download className="w-4 h-4" />
              Download Valuation Report
            </button>
          </div>

          <div className="text-sm text-gray-500">
            <p>invest@antimatterai.com</p>
            <p className="mt-1">AntimatterAI, Inc. • Atlanta, GA</p>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         12. DOCUMENTS & MARKET RESEARCH
         ════════════════════════════════════════════════════════════ */}
      <Section id="documents" className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold">Resources</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-4">
              Investor Documents
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <button
              onClick={() => window.open("/antimatterai_market_research.pdf", "_blank")}
              className="glass rounded-xl p-6 text-left hover:border-[#00FFB2]/30 transition-all group"
              data-testid="btn-market-research-pdf"
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-[#00FFB2]" />
                <span className="text-sm font-semibold text-white">Market Research Report</span>
              </div>
              <p className="text-xs text-gray-500">Comprehensive analysis of AntimatterAI's $600B+ addressable market across enterprise AI, healthcare, and quantum computing.</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-[#00FFB2] group-hover:gap-2 transition-all">
                <Download className="w-3 h-3" />
                Download PDF
              </div>
            </button>

            <button
              onClick={() => window.open("/antimatterai_valuation_v2.pdf", "_blank")}
              className="glass rounded-xl p-6 text-left hover:border-[#7B61FF]/30 transition-all group"
              data-testid="btn-valuation-pdf"
            >
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-[#7B61FF]" />
                <span className="text-sm font-semibold text-white">Valuation Analysis v2</span>
              </div>
              <p className="text-xs text-gray-500">Three-methodology convergence analysis, 25/25 vendor matrix, cost-to-duplicate breakdown, and comparable company analysis.</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-[#7B61FF] group-hover:gap-2 transition-all">
                <Download className="w-3 h-3" />
                Download PDF
              </div>
            </button>
          </div>

          {/* Market Research expandable */}
          <div className="text-center">
            <button
              onClick={() => setShowMarketResearch(!showMarketResearch)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold border border-[#00FFB2]/30 text-[#00FFB2] hover:bg-[#00FFB2]/10 hover:border-[#00FFB2]/50 hover:shadow-[0_0_30px_rgba(0,255,178,0.15)] transition-all duration-300"
              data-testid="btn-toggle-market-research"
            >
              <BarChart3 className="w-5 h-5" />
              {showMarketResearch ? "Hide" : "View"} Interactive Market Research
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showMarketResearch ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
            </button>
            {!showMarketResearch && (
              <p className="text-xs text-gray-600 mt-3">$600B+ TAM analysis across enterprise AI, healthcare, and quantum computing</p>
            )}
          </div>

          <AnimatePresence>
            {showMarketResearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden mt-10"
              >
                <MarketResearch />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════════
         FOOTER
         ════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-display text-sm font-bold tracking-wider text-gray-500">
              ANTIMATTER<span className="text-[#00FFB2]/50">AI</span>
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-2">
            © {new Date().getFullYear()} AntimatterAI, Inc. • Atlanta, GA • All rights reserved.
          </p>
          <p className="text-xs text-gray-700 mb-6">
            This presentation is for informational purposes only and does not constitute an offer to sell securities.
          </p>
          <PerplexityAttribution />
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════════
         TERM SHEET MODAL
         ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedTermSheetData && (
          <TermSheet
            vehicle={{
              id: selectedTermSheetData.id,
              name: selectedTermSheetData.name,
              tagline: selectedTermSheetData.tagline,
              description: selectedTermSheetData.description,
              minInvest: selectedTermSheetData.minInvest,
              features: selectedTermSheetData.features,
              riskLevel: selectedTermSheetData.riskLevel,
              targetReturn: selectedTermSheetData.targetReturn,
              lockup: selectedTermSheetData.lockup,
              color: selectedTermSheetData.color,
            }}
            onClose={() => setTermSheetVehicle(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
