import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain, HeartPulse, Atom, Video, Target, Globe, Shield, Cpu,
  ChevronDown, ArrowRight, Check, Zap, Lock, TrendingUp,
  BarChart3, Layers, Network, X
} from "lucide-react";
import {
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { PerplexityAttribution } from "@/components/PerplexityAttribution";

/* ─── COMPANY DATA (hardcoded from company-data.json) ─── */

const heroStats = [
  { value: 8, label: "Live Products", prefix: "", suffix: "" },
  { value: 700, label: "Combined TAM", prefix: "$", suffix: "B" },
  { value: 100, label: "Self-Funded", prefix: "", suffix: "%" },
  { value: 100, label: "Compute Margin", prefix: "~", suffix: "%" },
];

const products = [
  { name: "AntimatterAI", type: "MRR", desc: "AI Design Studio — GenUI, UX, Agentic AI platform. ~100% margin. Per-user SaaS.", tam: "$50B+", cagr: "34.2%", icon: "brain" },
  { name: "ClinixAI", type: "MRR", desc: "AI Billing Agent — per-claim revenue, automated medical coding & RCM. $45.4B TAM.", tam: "$45.4B", cagr: "25.4%", icon: "heart-pulse" },
  { name: "MoleculeAI", type: "Acquisition", desc: "Quantum drug discovery — VQE, ADMET profiling. Built to sell to Big Pharma for 8-9 figures.", tam: "$160B", cagr: "23.2%", icon: "atom" },
  { name: "Vidzee", type: "Acquisition", desc: "AI video software for real estate — automates listing video creation at scale.", tam: "$185B", cagr: "16.4%", icon: "video" },
  { name: "ATOM Lead Gen", type: "MRR", desc: "AI SDR agent — cold calls, emails, closes with real-time sentiment analysis.", tam: "$37.5B", cagr: "28.3%", icon: "target" },
  { name: "ATOM Browser", type: "Hybrid", desc: "AI-native browser challenging Chrome — agent capabilities baked in.", tam: "$76.8B", cagr: "32.8%", icon: "globe" },
  { name: "Red Team ATOM", type: "MRR", desc: "Adversarial AI security testing. SOC2 compliant, post-quantum cryptography.", tam: "$15.2B", cagr: "36.7%", icon: "shield" },
  { name: "ATOM LLM", type: "Hybrid", desc: "Proprietary LLM trained on deployment data — moat deepens with every customer.", tam: "$199B", cagr: "43.8%", icon: "cpu" },
];

const investmentOptions = [
  { id: "tokenized", name: "Tokenized Equity", tagline: "Fractional, Liquid, Borderless", description: "Blockchain-secured digital equity tokens representing fractional ownership in Nirmata Holdings. Smart contracts automate distributions, enable 24/7 secondary trading, and provide real-time portfolio transparency.", minInvest: "$50K", features: ["24/7 Secondary Liquidity", "Smart Contract Distributions", "Real-Time Portfolio Dash", "Fractional Ownership Units", "Global Investor Access"], riskLevel: "moderate", targetReturn: "10-50x", lockup: "6 months", color: "#00FFB2" },
  { id: "tranche", name: "Milestone Tranches", tagline: "De-Risked, Milestone-Gated", description: "Capital deployed in structured phases tied to validated business milestones. Each tranche unlocks at progressively higher valuations, reducing downside risk while preserving maximum upside for early conviction.", minInvest: "$250K", features: ["3-Phase Deployment", "Valuation Step-Ups", "Milestone-Gated Releases", "Board Observer Rights", "Anti-Dilution Protection"], riskLevel: "low", targetReturn: "5-25x", lockup: "12-36 months", color: "#7B61FF" },
  { id: "safe", name: "SAFE + Warrant", tagline: "Speed, Simplicity, Upside", description: "Y Combinator-standard SAFE note with attached warrant coverage. Converts at next priced round with valuation cap protection. Warrant provides additional upside without dilution risk.", minInvest: "$100K", features: ["Valuation Cap Protection", "MFN Clause", "Pro-Rata Rights", "Warrant Coverage (20%)", "No Maturity / No Interest"], riskLevel: "moderate", targetReturn: "8-40x", lockup: "Until conversion", color: "#00D4FF" },
  { id: "spv", name: "SPV Co-Invest", tagline: "Institutional Grade, Portfolio Exposure", description: "Special Purpose Vehicle providing concentrated exposure to Nirmata's highest-growth portfolio companies. Quarterly NAV reporting, independent administration, and institutional-grade governance.", minInvest: "$500K", features: ["Portfolio Diversification", "Quarterly NAV Reports", "Independent Fund Admin", "Tax-Optimized Structure", "Co-Invest Rights"], riskLevel: "low", targetReturn: "6-20x", lockup: "24 months", color: "#FF6B35" },
  { id: "revenue", name: "Revenue-Based Financing", tagline: "Cash Flow Aligned Returns", description: "Non-dilutive capital with returns tied directly to Nirmata's monthly recurring revenue. Investors receive a percentage of MRR until a return cap is met — aligning incentives with real business performance.", minInvest: "$100K", features: ["Non-Dilutive", "Monthly Distributions", "Revenue-Linked Returns", "1.5-3x Return Cap", "No Board Seat Required"], riskLevel: "low", targetReturn: "1.5-3x", lockup: "18-24 months", color: "#FFD700" },
  { id: "convertible", name: "Convertible Note", tagline: "Debt Today, Equity Tomorrow", description: "Interest-bearing debt instrument that converts to preferred equity at the next qualified financing. Includes valuation cap and discount rate for early investor advantage.", minInvest: "$150K", features: ["8% Annual Interest", "20% Conversion Discount", "Valuation Cap", "Qualified Financing Trigger", "Maturity Extension Option"], riskLevel: "low", targetReturn: "5-15x", lockup: "18 months", color: "#E040FB" },
];

const exitPaths = [
  { name: "IPO", timeline: "2027-2028", potential: "$50B+" },
  { name: "Strategic Acquisition", timeline: "2026-2027", potential: "$15-25B" },
  { name: "Portfolio Exits", timeline: "2026-2028", potential: "$2-5B" },
  { name: "Secondary Sale", timeline: "Ongoing", potential: "Market" },
  { name: "SaaS Dividend Recap", timeline: "2027+", potential: "Recurring" },
];

const investorRights = ["Board Observer Seat", "Pro-Rata Rights", "Quarterly Reporting", "Anti-Dilution Protection", "Information Rights", "Major Investor Rights"];

const moats = [
  { title: "Demand-Driven", desc: "Every product came from a paying customer request" },
  { title: "~100% Compute Margin", desc: "Akamai Cloud partnership vs 40-60% industry standard" },
  { title: "Model Agnostic", desc: "Plugs into GPT-5, Claude, Grok, Llama, or custom LLMs" },
  { title: "100% Self-Funded", desc: "Zero VC dependency — choosing partners, not begging" },
  { title: "ATOM Stack", desc: "Eliminates 80% of build time — ships in days, not quarters" },
  { title: "Network Effect", desc: "Every deployment makes the ATOM LLM smarter" },
];

const useOfProceeds = [
  { name: "ATOM Platform & Sales", value: 40, color: "#00FFB2" },
  { name: "Antimatter Center", value: 25, color: "#7B61FF" },
  { name: "ClinixAI & Lead Gen GTM", value: 20, color: "#00D4FF" },
  { name: "LLM & Red Team", value: 15, color: "#FF6B35" },
];

const revenueData = [
  { name: "Monthly Recurring", value: 55, color: "#00FFB2" },
  { name: "Acquisition & Licensing", value: 25, color: "#7B61FF" },
  { name: "Platform + Compute", value: 20, color: "#00D4FF" },
];

const revenueDetails = [
  { label: "Monthly Recurring", pct: 55, color: "#00FFB2", items: ["AntimatterAI SaaS", "ClinixAI Per-Claim", "ATOM Lead Gen", "Red Team Contracts"] },
  { label: "Acquisition & Licensing", pct: 25, color: "#7B61FF", items: ["MoleculeAI → Big Pharma", "Vidzee → PropTech", "IP Licensing"] },
  { label: "Platform + Compute", pct: 20, color: "#00D4FF", items: ["Nervous System Licensing", "Per-User Compute", "ATOM LLM API", "Akamai ~100% Margin"] },
];

/* ─── ICON MAP ─── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, "heart-pulse": HeartPulse, atom: Atom, video: Video,
  target: Target, globe: Globe, shield: Shield, cpu: Cpu,
};

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
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

/* ─── SECTION WRAPPER WITH FADE-IN ─── */
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

/* ─── PARTICLE CANVAS BACKGROUND ─── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create 120 particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
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

        // Draw particle
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 204, 143, ${p.opacity})`;
        ctx!.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(0, 204, 143, ${0.08 * (1 - dist / 120)})`;
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

/* ─── TYPE BADGE COLORS ─── */
function TypeBadge({ type }: { type: string }) {
  const colors: Record<string, string> = {
    MRR: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Acquisition: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Hybrid: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[type] || "bg-gray-500/20 text-gray-400"}`}>
      {type}
    </span>
  );
}

/* ─── FORMAT CURRENCY ─── */
function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

/* ─── MAIN HOME PAGE ─── */
export default function Home() {
  const [expandedOption, setExpandedOption] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [investAmount, setInvestAmount] = useState(500000);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ROI chart data
  const roiChartData = [
    { year: "Year 0", value: investAmount },
    { year: "Year 1", value: investAmount * 1.8 },
    { year: "Year 2", value: investAmount * 3.2 },
    { year: "Year 3", value: investAmount * 5.5 },
    { year: "Year 4", value: investAmount * 7.8 },
    { year: "Year 5", value: investAmount * 10 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════ */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleCanvas />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,204,143,0.05)_0%,_transparent_70%)] z-[1]" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium" data-testid="badge-round">
              <Zap className="w-3.5 h-3.5" />
              Series A — $25M-$50M Strategic Growth Round
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text mb-6"
          >
            NIRMATA HOLDINGS
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-foreground/90 mb-3"
          >
            The Nervous System That Powers AI
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Every AI brain needs a body. We built the nervous system.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-12"
          >
            {heroStats.map((stat, i) => (
              <div key={i} data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              data-testid="button-explore-investment"
              onClick={() => scrollTo("investment")}
              className="px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:brightness-110 transition-all glow-teal"
            >
              Explore Investment
              <ArrowRight className="inline ml-2 w-4 h-4" />
            </button>
            <button
              data-testid="button-view-portfolio"
              onClick={() => scrollTo("portfolio")}
              className="px-8 py-3.5 border border-primary/40 text-primary rounded-lg font-semibold text-base hover:bg-primary/10 transition-all"
            >
              View Portfolio
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <button onClick={() => scrollTo("thesis")} className="text-muted-foreground hover:text-primary transition-colors" data-testid="button-scroll-down">
            <ChevronDown className="w-6 h-6 animate-bounce-down" />
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. THESIS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="thesis" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">The Thesis</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>

        <p className="font-display text-2xl md:text-4xl font-bold text-foreground mb-16 leading-tight max-w-4xl">
          Grok, Claude, ChatGPT are the brains.{" "}
          <span className="gradient-text">We built the nervous system.</span>
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Model Agnostic", desc: "Plugs into any LLM — GPT-5, Claude, Grok, Llama, or custom. No lock-in, infinite flexibility.", icon: Network },
            { title: "~100% Compute Margin", desc: "Akamai Cloud partnership delivers near-zero compute costs vs. 40-60% industry standard.", icon: Layers },
            { title: "Demand-Driven", desc: "Every single product originated from a paying customer request. Zero speculative builds.", icon: Target },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="glass glass-hover rounded-xl p-6 md:p-8 transition-all duration-300"
              data-testid={`card-thesis-${i}`}
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center py-6 border-t border-b border-primary/10">
          <p className="text-lg md:text-xl font-medium">
            <span className="text-primary font-bold">$10.5B</span> Liquid Valuation ·{" "}
            <span className="text-primary font-bold">100%</span> Self-Funded ·{" "}
            <span className="text-primary font-bold">8</span> Products ·{" "}
            <span className="text-primary font-bold">7</span> Markets
          </p>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          3. HYPE VIDEO SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="video" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-display text-2xl md:text-4xl font-bold mb-12 text-foreground">
            We Don't Build Tools.{" "}
            <span className="gradient-text">We Build Infrastructure.</span>
          </p>

          <div className="relative rounded-2xl overflow-hidden glow-teal-strong border border-primary/20">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Nirmata Holdings — Vision"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                data-testid="video-embed"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          4. PORTFOLIO / PRODUCTS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="portfolio" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">The Portfolio</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          8 Products. 7 Markets. <span className="gradient-text">$700B TAM.</span>
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {products.map((product, i) => {
            const Icon = iconMap[product.icon] || Cpu;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="glass glass-hover rounded-xl p-6 transition-all duration-300 group cursor-default"
                data-testid={`card-product-${product.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">{product.name}</h3>
                    </div>
                  </div>
                  <TypeBadge type={product.type} />
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.desc}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">TAM:</span>{" "}
                    <span className="text-primary font-semibold">{product.tam}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CAGR:</span>{" "}
                    <span className="text-foreground font-semibold">{product.cagr}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          5. ATOM ARCHITECTURE SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="atom" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">The ATOM Nervous System</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-16">
          One Core. <span className="gradient-text">Eight Extensions.</span>
        </p>

        <div className="relative flex flex-col items-center">
          {/* Architecture diagram */}
          <div className="relative w-full max-w-4xl mx-auto" style={{ minHeight: "400px" }}>
            {/* Center node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-28 h-28 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse-glow">
                <div className="text-center">
                  <Cpu className="w-6 h-6 text-primary mx-auto mb-1" />
                  <span className="font-display font-bold text-xs text-primary">ATOM CORE</span>
                </div>
              </div>
            </div>

            {/* SVG connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" fill="none">
              {/* Left connections */}
              <line x1="400" y1="200" x2="120" y2="60" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
              <line x1="400" y1="200" x2="80" y2="160" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
              <line x1="400" y1="200" x2="80" y2="260" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
              <line x1="400" y1="200" x2="120" y2="350" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
              {/* Right connections */}
              <line x1="400" y1="200" x2="680" y2="60" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
              <line x1="400" y1="200" x2="720" y2="160" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
              <line x1="400" y1="200" x2="720" y2="260" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
              <line x1="400" y1="200" x2="680" y2="350" stroke="hsl(168,100%,40%)" strokeWidth="1" strokeDasharray="6 4" className="animate-dash" opacity="0.4" />
            </svg>

            {/* Left nodes */}
            {[
              { name: "ATOM Voice", top: "5%", left: "5%", icon: Target },
              { name: "ATOM IntentIQ", top: "30%", left: "0%", icon: Brain },
              { name: "ATOM Atlas", top: "55%", left: "0%", icon: Globe },
              { name: "ATOM Lead Gen", top: "80%", left: "5%", icon: BarChart3 },
            ].map((node, i) => (
              <div key={`l-${i}`} className="absolute" style={{ top: node.top, left: node.left }}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <node.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold whitespace-nowrap">{node.name}</span>
                </div>
              </div>
            ))}

            {/* Right nodes */}
            {[
              { name: "ATOM Browser", top: "5%", right: "5%", icon: Globe },
              { name: "ATOM LLM", top: "30%", right: "0%", icon: Cpu },
              { name: "Red Team ATOM", top: "55%", right: "0%", icon: Shield },
              { name: "AI Design Studio", top: "80%", right: "5%", icon: Brain },
            ].map((node, i) => (
              <div key={`r-${i}`} className="absolute" style={{ top: node.top, right: node.right }}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <node.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold whitespace-nowrap">{node.name}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">
            Customers pick their brain — <span className="text-primary font-medium">we provide the nervous system + spine.</span>
          </p>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          6. INVESTMENT MATRIX SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="investment" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Investment Avenues</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <p className="font-display text-2xl md:text-3xl font-bold">
            Choose Your Path to{" "}
            <span className="gradient-text">Asymmetric Returns</span>
          </p>
          <button
            data-testid="button-toggle-comparison"
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 text-sm border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors text-primary font-medium self-start md:self-auto"
          >
            {showComparison ? "Card View" : "Compare All"}
          </button>
        </div>

        {/* Comparison Table View */}
        {showComparison ? (
          <div className="overflow-x-auto rounded-xl border border-primary/20">
            <table className="w-full text-sm" data-testid="table-comparison">
              <thead>
                <tr className="border-b border-primary/10">
                  <th className="text-left p-4 font-semibold text-muted-foreground">Vehicle</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Min. Investment</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Target Return</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Lockup</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground">Risk</th>
                </tr>
              </thead>
              <tbody>
                {investmentOptions.map((opt) => (
                  <tr key={opt.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                        <span className="font-semibold">{opt.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-primary font-medium">{opt.minInvest}</td>
                    <td className="p-4 font-medium">{opt.targetReturn}</td>
                    <td className="p-4 text-muted-foreground">{opt.lockup}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${opt.riskLevel === "low" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                        {opt.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Card Grid View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {investmentOptions.map((opt) => (
              <motion.div
                key={opt.id}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl overflow-hidden transition-all duration-300 cursor-pointer group"
                onClick={() => setExpandedOption(expandedOption === opt.id ? null : opt.id)}
                data-testid={`card-investment-${opt.id}`}
              >
                {/* Color header bar */}
                <div className="h-1" style={{ backgroundColor: opt.color }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.color }} />
                    <h3 className="font-display font-bold text-lg">{opt.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5">{opt.tagline}</p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Min. Investment</p>
                      <p className="font-bold text-primary">{opt.minInvest}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Target Return</p>
                      <p className="font-bold">{opt.targetReturn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Lockup</p>
                      <p className="font-medium text-sm">{opt.lockup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Risk</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${opt.riskLevel === "low" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                        {opt.riskLevel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {opt.features.slice(0, 3).map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                    {opt.features.length > 3 && (
                      <p className="text-xs text-primary mt-1">+{opt.features.length - 3} more features</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Expanded Detail Overlay */}
        {expandedOption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setExpandedOption(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-2xl max-w-lg w-full p-8 relative border border-primary/20"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-investment-detail"
            >
              {(() => {
                const opt = investmentOptions.find((o) => o.id === expandedOption);
                if (!opt) return null;
                return (
                  <>
                    <button
                      onClick={() => setExpandedOption(null)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="button-close-modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="h-1 rounded-full mb-6 -mx-8 -mt-8" style={{ backgroundColor: opt.color }} />
                    <h3 className="font-display text-2xl font-bold mb-1 mt-2">{opt.name}</h3>
                    <p className="text-primary text-sm mb-4">{opt.tagline}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{opt.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-primary/10">
                      <div>
                        <p className="text-xs text-muted-foreground">Min. Investment</p>
                        <p className="font-bold text-primary">{opt.minInvest}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Target Return</p>
                        <p className="font-bold">{opt.targetReturn}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lockup</p>
                        <p className="font-bold">{opt.lockup}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-8">
                      {opt.features.map((f, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <button
                      data-testid="button-request-term-sheet"
                      className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:brightness-110 transition-all glow-teal"
                    >
                      Request Term Sheet
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </Section>

      {/* ════════════════════════════════════════════════════
          7. ROI CALCULATOR SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="roi" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Model Your Returns</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          See Your <span className="gradient-text">Potential Upside</span>
        </p>

        {/* Slider */}
        <div className="glass rounded-xl p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm text-muted-foreground font-medium">Investment Amount</label>
            <span className="font-display text-2xl font-bold text-primary" data-testid="text-invest-amount">
              {formatCurrency(investAmount)}
            </span>
          </div>
          <input
            type="range"
            min={25000}
            max={5000000}
            step={25000}
            value={investAmount}
            onChange={(e) => setInvestAmount(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(168,100%,40%) ${((investAmount - 25000) / (5000000 - 25000)) * 100}%, hsl(220,15%,20%) ${((investAmount - 25000) / (5000000 - 25000)) * 100}%)`
            }}
            data-testid="slider-investment"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>$25K</span>
            <span>$5M</span>
          </div>
        </div>

        {/* Scenario Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Conservative", multiplier: 3, color: "#00D4FF" },
            { label: "Base Case", multiplier: 10, color: "#00FFB2" },
            { label: "Upside", multiplier: 50, color: "#7B61FF" },
          ].map((scenario) => (
            <div key={scenario.label} className="glass rounded-xl p-6 text-center" data-testid={`card-scenario-${scenario.label.toLowerCase().replace(/\s/g, "-")}`}>
              <p className="text-sm text-muted-foreground mb-2">{scenario.label}</p>
              <p className="font-display text-3xl font-bold mb-1" style={{ color: scenario.color }}>
                {formatCurrency(investAmount * scenario.multiplier)}
              </p>
              <p className="text-xs text-muted-foreground">{scenario.multiplier}x Return</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="glass rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-4">Base Case Projection (10x over 5 years)</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={roiChartData}>
              <defs>
                <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00FFB2" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00FFB2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,15%)" />
              <XAxis dataKey="year" stroke="hsl(0,0%,55%)" fontSize={12} />
              <YAxis stroke="hsl(0,0%,55%)" fontSize={12} tickFormatter={(v: number) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220,15%,8%)", border: "1px solid hsl(180,50%,15%)", borderRadius: "8px", color: "#fff" }}
                formatter={(value: number) => [formatCurrency(value), "Value"]}
              />
              <Area type="monotone" dataKey="value" stroke="#00FFB2" strokeWidth={2} fill="url(#roiGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          8. REVENUE ARCHITECTURE SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="revenue" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Revenue Architecture</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          Diversified Streams. <span className="gradient-text">Compounding Returns.</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Donut Chart */}
          <div className="flex justify-center">
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(220,15%,8%)", border: "1px solid hsl(180,50%,15%)", borderRadius: "8px", color: "#fff" }}
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue stream cards */}
          <div className="space-y-4">
            {revenueDetails.map((stream, i) => (
              <div key={i} className="glass rounded-xl p-5" data-testid={`card-revenue-${i}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stream.color }} />
                  <h4 className="font-semibold">{stream.label}</h4>
                  <span className="ml-auto font-display font-bold text-lg" style={{ color: stream.color }}>{stream.pct}%</span>
                </div>
                <ul className="space-y-1">
                  {stream.items.map((item, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          9. EXIT PATHS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="exits" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Exit Pathways</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-16">
          Multiple Paths to <span className="gradient-text">Liquidity</span>
        </p>

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />

          {exitPaths.map((exit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex items-start gap-6 md:gap-8 mb-10 last:mb-0"
              data-testid={`timeline-exit-${i}`}
            >
              {/* Node */}
              <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                <span className="font-display text-xs md:text-sm font-bold text-primary">{i + 1}</span>
              </div>

              <div className="pt-1 md:pt-3">
                <h4 className="font-display font-bold text-lg mb-1">{exit.name}</h4>
                <div className="flex gap-4 text-sm">
                  <span className="text-muted-foreground">{exit.timeline}</span>
                  <span className="text-primary font-semibold">{exit.potential}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          10. INVESTOR RIGHTS & TERMS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="rights" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Investor Protections</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          Your Rights. <span className="gradient-text">Your Protections.</span>
        </p>

        {/* Rights badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {investorRights.map((right, i) => (
            <div key={i} className="glass rounded-xl p-4 flex items-center gap-3" data-testid={`badge-right-${i}`}>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium">{right}</span>
            </div>
          ))}
        </div>

        {/* Use of Proceeds */}
        <h3 className="font-display font-bold text-xl mb-6">Use of Proceeds</h3>

        {/* Stacked bar */}
        <div className="mb-6">
          <div className="flex h-8 rounded-lg overflow-hidden">
            {useOfProceeds.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center text-xs font-bold transition-all"
                style={{ width: `${item.value}%`, backgroundColor: item.color, color: "#0a0e14" }}
              >
                {item.value}%
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {useOfProceeds.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          11. MOATS SECTION
          ════════════════════════════════════════════════════ */}
      <Section id="moats" className="py-24 md:py-32 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary font-semibold">Competitive Moats</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>
        <p className="font-display text-2xl md:text-3xl font-bold mb-12">
          The <span className="gradient-text">Unfair Advantages</span>
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {moats.map((moat, i) => {
            const icons = [Zap, TrendingUp, Network, Lock, Layers, Brain];
            const MoatIcon = icons[i] || Zap;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl p-6 border-l-2 border-l-primary transition-all duration-300"
                data-testid={`card-moat-${i}`}
              >
                <MoatIcon className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-display font-bold text-lg mb-2">{moat.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{moat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════
          12. FINAL CTA / CLOSER
          ════════════════════════════════════════════════════ */}
      <section id="cta" className="relative py-32 md:py-40 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,204,143,0.08)_0%,_transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            The Future of AI Infrastructure{" "}
            <span className="gradient-text">Starts Here</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join the builders who are constructing the nervous system for the next era of intelligence.
          </p>
          <button
            data-testid="button-invest-now"
            onClick={() => scrollTo("investment")}
            className="px-12 py-4 bg-primary text-primary-foreground rounded-xl font-display font-bold text-lg hover:brightness-110 transition-all glow-teal-strong"
          >
            Invest Now
          </button>
          <p className="mt-8 text-sm text-muted-foreground">
            <a href="mailto:invest@antimatterai.com" className="text-primary hover:underline">
              invest@antimatterai.com
            </a>
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════ */}
      <footer className="border-t border-primary/10 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>Nirmata Holdings, Inc. · Orlando, FL</p>
          <PerplexityAttribution />
        </div>
      </footer>
    </div>
  );
}
