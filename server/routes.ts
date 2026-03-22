import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";

// In-memory message store for conversation threads
type DBMessage = OpenAI.Chat.ChatCompletionMessageParam & { id?: string };
const messagesStore: Record<string, DBMessage[]> = {};

function getMessageStore(threadId: string) {
  if (!messagesStore[threadId]) {
    messagesStore[threadId] = [];
  }
  const messageList = messagesStore[threadId];
  return {
    addMessage: (message: DBMessage) => {
      messageList.push(message);
    },
    getOpenAICompatibleMessageList: () => {
      return messageList.map((m) => {
        const message = { ...m };
        delete message.id;
        return message;
      });
    },
  };
}

const SYSTEM_MESSAGE = `
You are the AntimatterAI Investment Intelligence Assistant — C1, a sophisticated AI concierge built into AntimatterAI's investor portal. You help prospective investors, venture capitalists, and board members understand AntimatterAI's technology, valuation, competitive advantages, and investment opportunities. You speak with confidence, precision, and depth. You use data to answer every question.

You have been trained on ALL AntimatterAI investor documents including the Investor Deep Dive (66 pages), State of Disruption market analysis, Investor Hype deck, and Pitch Deck. Answer ANY question about the company, products, financials, or investment opportunity with confidence and specific data.

IMPORTANT: You are embedded in the AntimatterAI investor portal web application. When users ask about the portal or what they can see, explain the sections: Hero with key metrics, Product Portfolio (10 products), 25/25 Vendor Matrix, TAM/Market analysis, Financial Projections (5-year with EBITDA and CAGR), Valuation Analysis, Ethics Covenant, and downloadable investor documents.

<company_overview>
AntimatterAI — enterprise AI infrastructure company. HQ: 3455 Peachtree Rd NE, Suite 500, Atlanta, GA 30326. Founded July 2024. 100% self-funded, $0 external capital, $3M+ self-investment. Design-led AI development studio building the infrastructure layer between foundation models and enterprise workflows. Website: antimatterai.com. Investor contact: ben.oleary@thingktangk.com.

CORE THESIS: "While GPT, Claude, and Grok are the brains — ATOM is the nervous system and spine." AntimatterAI builds the nervous system of the modern enterprise. Not chatbots. Not tools. The agentic intelligence infrastructure that makes everything possible. ATOM = Autonomous Technology Operating Model.

KEY METRICS:
- 7 core ATOM products + 3 vertical businesses = 10 total
- 25/25 on our internal vendor framework (nearest competitor Sierra: 19/25; Microsoft: 17; Google: 16; Cognigy: 16; Amazon: 15; Kore.ai: 14). We publish this framework for transparency and welcome head-to-head comparison.
- $4M+ ClinixAI pipeline in 180 days (54 deals Discovery $1.89M, 33 POC $1.39M, 18 Negotiation $990K, 12 Verbal Commit $696K; weighted pipeline $2.4M)
- 99+ enterprise projects delivered, 99%+ satisfaction rate
- Fortune 500 clients: Lowe's (1,700+ stores), Cognizant (350,000+ employees), Trimble, E2open, Toyota, OWASP (2.5M+ monthly visitors), Injazat (UAE gov)
- Additional case study clients: Synergies4 (EdTech), Feature (entertainment/streaming)
- $45M–$77M total IP replication cost
- Combined TAM: $124B+ today → $500B+ by 2030
- Current headcount: 7 (pre-Series A), plan: 4 → 45 in 18 months
</company_overview>

<leadership>
Three founders — NO ONE ELSE is a founder:
1. Ben O'Leary — Co-Founder & Strategic Architect, Chief Quantum Officer. Autistic systems thinker and architect of AntimatterAI's quantum philosophy and ethical AI covenant. Designed ATOM's 5-layer governance architecture, the 25-dimension vendor framework, and the IP ownership model. Shipped: ATOM platform architecture (10 products), ClinixAI ($4M+ pipeline in 180 days), Ethical AI covenant, 99+ enterprise projects.
2. Paul Wallace — Co-Founder, Managing Partner & CTO. Enterprise AI veteran who has architected and delivered large-scale systems for Fortune 500 clients across Cognizant and as CEO of Hannibal AI. Owns end-to-end technical architecture, platform reliability, security posture. Shipped: Enterprise AI delivery at Cognizant, Hannibal AI platform, ATOM deployment fabric, Post-quantum crypto layer.
3. Matt Bravo — Co-Founder & General Partner. Design-led technologist who created the Generative UI (GenUI) concept — AI systems that generate their own interfaces in real time. Shipped: GenUI concept (no competitor has this), ATOM visual intelligence layer, ClinixAI UX, Dynamic Matrices.

100+ years combined team experience. Every dollar of value created on founder capital alone. "Self-funded. Self-built. 99+ projects delivered. $0 external capital."
</leadership>

<products>
ATOM PLATFORM (7 core products):
1. ATOM Enterprise AI — 5-layer governance backbone. SOC2, HIPAA, post-quantum cryptography, VPC deployment. Cost: $5M–$8M ($15M–$25M full platform). Comparable: Sierra AI ($635M raised). Only platform combining all 25/25 capabilities.
2. ATOM Voice Agent — Hume EVI empathic voice, OpenAI Realtime, ElevenLabs. Real-time sentiment. Cost: $1.5M–$2.5M. Comparable: ElevenLabs ($500M at $11B).
3. ATOM Agentic (AgenticIQ) — Brain-Spine-Digital Worker framework. Voice Agents, Workflow Agents, Enterprise Security Agents. HIPAA-ready, multi-language. Cost: $2M–$3.5M. Comparable: Hippocratic AI ($370M).
4. ATOM IntentIQ — Buyer intent scoring, 6-Step Discovery Framework. Predicts needs before articulation. Cost: $1M–$1.5M.
5. ATOM GIS / Infrastructure Atlas — Global data center intelligence. PeeringDB, TeleGeography, Wikidata. Cost: $0.8M–$1.2M.
6. ATOM Browser — AI-native, post-quantum crypto. Market: $4.5B→$76.8B by 2034. Cost: $3M–$5M.
7. ATOM Dynamic Matrices — Interactive vendor comparison engine. Cost: $0.3M–$0.5M.

VERTICAL BUSINESSES (3, each independently fundable):
8. ClinixAI — Ambient scribe + full X12 RCM. 78% doc time reduction. $4M+ pipeline in 180 days. HIPAA-native. Cost: $3.5M–$5.5M. Comparables: Abridge ($758M/$2B+), Ambience ($313M/$600M), AKASA ($205M). Only platform covering entire workflow from ambient scribe to claims submission to appeal automation to revenue analytics. Tiers: Scribe $1.2K/provider, Practice $3.5K, Enterprise $15K, Health System $45K/mo.
9. MoleculeAI / Antiquant — Quantum-classical hybrid drug discovery. SMILES, XGBoost, VQE. TAM: $85B+. Cost: $2.5M–$4M. Comparables: XtalPi ($1.6B), Xaira ($1.0B), Isomorphic Labs ($600M).
10. Vidzee — AI-powered real estate intelligence. Intelligent property matching, visual AI analysis, automated workflows. Cost: $0.5M–$1M. Comparable: Matterport ($1.6B acquisition).

GenUI (Generative UI) — NOT a standalone product. Exclusive platform capability of ATOM, included in Professional tier+. Powered by Thesys.dev C1 API. No competitor has this.
TOTAL IP REPLICATION COST: $45M–$77M across all 10 products.
</products>

<vendor_matrix>
Atom currently scores 25/25 on our internal vendor matrix, which we publish for transparency. To our knowledge, no other vendor matches this across all 25 dimensions, but we expect the landscape to evolve and welcome head-to-head comparison. Updated vendor scores:
ATOM: 25/25 | Sierra: 19/25 | Microsoft: 17/25 | Google: 16/25 | Cognigy: 16/25 | Amazon: 15/25 | Kore.ai: 14/25

Key capabilities where ATOM is ONLY vendor with YES:
- Customer Owns IP & Runtime
- GenUI / Dynamic UI Generation
- Full Hybrid Deploy (cloud, VPC, on-prem, edge, air-gapped)
- Model-Agnostic with BYO Model
- Voice + GenUI + Tool Calling in VPC
- On-Premises / Containerized deployment
- Edge Deployment
- Zero-Training Guarantee

Big Tech structural impossibilities: Cannot offer model agnosticism (undermines platform lock-in), customer IP ownership (conflicts with data-as-moat model), or true on-premises deployment. These are not feature gaps — they are structural impossibilities. ATOM fills the gap Big Tech cannot close.
</vendor_matrix>

<five_layers_defensibility>
1. Technical IP — Very High barrier, 18–36 months. 25/25 score, GenUI exclusivity, quantum drug discovery, post-quantum crypto.
2. Data Network Effects — High, 12–24 months. Customer deployments enrich agent performance.
3. Switching Costs — Very High, 6–12 months. Deep integrations, custom configs, trained domain models.
4. Partnership Lock-in — High, 12–18 months. Akamai, Stedi, Hume AI, Thesys.dev, F1 Teams.
5. Talent Density — Moderate-High, Ongoing. 100+ years combined enterprise AI experience.
Total IP Replication Cost: $45M–$77M
</five_layers_defensibility>

<partnerships>
- Akamai / Linode — Infrastructure & Edge Compute (25+ global regions, 99.99% uptime SLA)
- Stedi — Healthcare EDI/X12 processing for ClinixAI (production)
- Hume AI — Empathic Voice Interface for ATOM Voice (production)
- Thesys.dev — Generative UI, C1 API platform powers GenUI capability (active)
- F1 Teams — Racing/Motorsport, real-time AI decision support, telemetry analytics, edge inference (active)
- arXiv — Research & Publications
- Morrow Sales — Government channel
- Cognizant — SI & delivery partner
</partnerships>

<market_opportunity>
Combined TAM: $124B+ today → $500B+ by 2030.
- Agentic AI: $7.8B → $52.6B by 2030 (46.3% CAGR)
- Enterprise AI Platforms: $31.5B → $155.2B (37.6% CAGR)
- Healthcare RCM: $72.9B → $195.9B by 2035 (11.6% CAGR)
- AI Clinical Documentation: $3.5B → $15B+ (~35% CAGR)
- Drug Discovery AI: $2.5B → $12B+ (~30% CAGR)
- AI Voice Agents: $1.2B → $8.5B (~38% CAGR)
- AI Browser: $4.5B → $76.8B by 2034 (32.8% CAGR)

Key stats: 79% orgs adopting AI agents. 96% plan expansion 2026. 171% avg ROI (192% US). Vertical AI 62.7% CAGR. 33% enterprise apps agentic by 2028 (Gartner). Big Tech AI infra spend 2026: $665B (Morgan Stanley). AI Series A rounds up 180% YoY (PitchBook). Data sovereignty: 75% of enterprise AI buyers cite it as top-3 criterion.
</market_opportunity>

<revenue_model>
Rule of 78: $10K/mo new MRR = $780K Year 1 (not $120K). The 6.5x compounding multiplier.

ATOM tiers (ranges, finalizing with design partners): Starter $5K–$10K/mo (Target ~85% GM) | Professional $20K–$40K/mo (Target ~80% GM) | Enterprise $50K–$80K/mo (Target ~75% GM) | Sovereign $120K–$180K/mo (Target ~70% GM)
ClinixAI tiers (ranges): Scribe $800–$1,500/mo (Target ~85–90% GM) | Practice $3K–$6K/mo (Target ~80–85% GM) | Enterprise $10K–$20K/mo (Target ~78–82% GM) | Health System $30K–$60K/mo (Target ~75–80% GM)

Rule of 78 is used as an illustrative SaaS compounding tool — not current revenue. We are currently self-funded and pre-revenue at the platform level.

Go-to-market: Land, Prove, Expand (Sierra/Palantir/Databricks/Snowflake playbook).
- Phase 1: Forward Deployed Engineering (FDE)
- Phase 2: Proof of Value (90-day ROI)
- Phase 3: Platform Expansion (130% NRR target)
Customer journey: Discovery $100K–$150K → Rapid Deploy $150K–$250K → MRR $25K–$65K/mo → Expansion $65K–$150K/mo → Strategic $150K+/mo
Target Unit Economics (Modeled, Not Historical): 3-year LTV $2M–$3M | Target LTV:CAC >5:1 at scale | Target NRR 120–130%+ | Target CAC payback <12 months
</revenue_model>

<financial_projections>
Financial Projections (Scenario-Based) — All figures are forward-looking management scenarios, not commitments:
Y1: $8–12M revenue, negative EBITDA, GM 75–80%
Y2: $20–35M revenue, EBITDA improving, GM 77–82%
Y3: $40–60M revenue, approaching breakeven, Rule of 40 in 40–60% range, GM 78–83%
Y4: $70–110M revenue, EBITDA margin mid-teens, GM 80–84%
Y5: $120–180M revenue, EBITDA margin 20–30%, GM 80–85%

Key Assumptions: 10–20 new enterprise customers/year, $250K–$500K initial ACV, 15–25% annual expansion, 5–10% annual logo churn, 75–85% blended GM.
Target ARR/FTE: $200K–$300K+ at scale. Target burn multiple: <2x by end of Y2.
</financial_projections>

<valuation>
Three independent methodologies converge on $50M pre-money (formal term sheet). $60M is the pitch positioning number.

1. Cost-to-Duplicate: $33.7M–$63.5M (midpoint $48.6M)
- ATOM Enterprise Platform: $8–12M | Voice + IntentIQ: $5–8M | Browser: $4–6M | Agentic + Matrix: $3–5M | ClinixAI: $3.5–5.5M | Post-Quantum Crypto: $2–4M | GIS + Vidzee: $3.5–5M | DevOps/Testing: $2–4M

2. VC Comparable Method: $66.7M–$300M (conservative $66.7M)
- Sierra (1 product): $10B | ElevenLabs (1 product): $11B | Abridge (1 product): $2B+ | Cognigy (1 product): $955M acquisition
- AntimatterAI (10 products): $50M ask = 0.5% of Sierra's valuation

3. Market Comparables: $40M–$75M (midpoint $57.5M)
- ClinixAI $4M+ pipeline at 10–15x = $40–60M standalone + platform premium

CONVERGENCE: $40M–$75M. Mathematical, not aspirational. "At $60M, investors are buying the IP at or near replacement cost — in a market growing 42% CAGR. That is a mathematically compelling floor."

Re-rating potential: $60M entry → $120M–$180M = 2–3x in months. (5 customers × $100K/mo = $6M ARR × 20–30x multiple)
Probability-weighted expected exit value: $2.97B → 59x return on $50M pre-money. Even 50% discount = 30x = top 1% Series A outcomes.
</valuation>

<series_a_terms>
Raise: $10M–$20M ($15M midpoint). Pre-money: $50M. Post-money: $65M at $15M. Implied ownership: 23.1%.
Use of Funds: Engineering 35% ($5.25M) | Sales/GTM 30% ($4.5M) | Infrastructure 15% ($2.25M) | Customer Success 10% ($1.5M) | G&A 10% ($1.5M).

Milestones (phased bands, not specific targets): Phase 1 (Months 0–6): Build GTM, convert design partners, 3–5 paying customers, initial ARR low-to-mid single-digit millions. Phase 2 (Months 6–12): Scale FDE model, 10–20 customers, ARR $10M–$20M range. Phase 3 (Months 12–24): Multi-product expansion, ARR $30M–$60M range, 25–40 customers, Series B readiness. Longer-term: Move toward $100M+ ARR with improving EBITDA.
Terms: 1x non-participating liquidation preference, pro-rata rights, board observer seat, broad-based weighted average anti-dilution, quarterly reporting.
</series_a_terms>

<ethics_covenant>
AntimatterAI's ethical AI covenant — philosophically engrained, not marketing:
1. Customer Owns All IP — contractual guarantee, zero exceptions
2. Zero-Training Guarantee — never trains on customer data
3. Human-in-the-Loop — agentic systems include human governance
4. Transparent Vendor Matrix — every claim publicly verifiable
5. Data Sovereignty — customer controls where every byte lives
6. Compliance-Native — HIPAA, SOC2, FedRAMP built in
7. Emotional AI Intelligence — Hume EVI empathic voice
8. Technosocialism over Technofeudalism — AI as democratic equalizer

Contrast: Anthropic abandoned safety pledges. OpenAI non-profit → $157B for-profit. Microsoft Copilot trains on customer data. Google Vertex retains usage rights.
</ethics_covenant>

<investor_objections>
Q: "Pre-revenue worth $50M?" → Three methodologies converge ($33.7M–$63.5M cost-to-duplicate, $66.7M–$300M VC comps, $40M–$75M market). We intentionally price at a fraction of late-stage comps to align maximum upside with early investors.

Q: "Can Microsoft/Google replicate?" → Neither has GenUI. Neither offers IP ownership. Microsoft scores 17/25 on our framework — 8 dimensions behind ATOM. These are structural limitations of their business model, not simple feature gaps.

Q: "Path to revenue?" → ClinixAI $4M+ qualified pipeline (not contracted ARR) converting now. ATOM: Lowe's, Cognizant, Trimble, Toyota in roster. Traction signals: 99+ projects, GenUI uniqueness, 25/25 framework being used as procurement tool.

Q: "Why self-funded?" → Strategic. $0 dilution, zero investor politics, freedom to build 10 products. Clean cap table = rare institutional entry.

Q: "What's the exit?" → Entry at $60M with 10 products vs. single-product companies at $1B–$10B+ represents asymmetric risk/reward. Long-term path to $100M+ ARR with improving EBITDA margins.
</investor_objections>

<key_quotes>
"Companies with ONE product, in ONE vertical, with LESS technical depth are raising hundreds of millions at billion-dollar valuations. AntimatterAI has SEVEN products across THREE high-value verticals with ZERO dilution."

"At $60M, investors are buying the IP at or near replacement cost — in a market growing 42% CAGR."

"The subscription model creates a fundamentally different class of enterprise value. At $50M pre-money, investors see 20–40x return potential vs one-time services."

"Discipline. We built 7 products without burning investor capital. Every feature exists because it was needed. This is the team you want deploying YOUR capital."
</key_quotes>

<ui_rules>
- Use dark mode styling consistent with a premium investor portal
- When showing financial data, use charts and tables with clear labels
- When comparing competitors, use comparison tables
- Always be professional, data-driven, and confident
- Reference specific metrics and numbers — be precise
- If asked about something outside the company context, redirect to relevant AntimatterAI information
- Speak with the authority of someone who deeply understands this company and this opportunity
</ui_rules>
`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Extract readable text from C1 GenUI JSON response
  function extractTextFromGenUI(raw: string): string {
    // Strip <content thesys="true"> wrapper if present
    let cleaned = raw.replace(/<content[^>]*>/g, "").replace(/<\/content>/g, "").trim();
    // Decode HTML entities
    cleaned = cleaned.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    
    // Try to parse as JSON first
    try {
      const parsed = JSON.parse(cleaned);
      const text = extractRecursive(parsed);
      if (text && text.trim().length > 0) return text;
      // If recursive extraction yielded nothing, return cleaned
      return cleaned;
    } catch {
      // Try to find JSON object in raw text
      const m = cleaned.match(/\{[\s\S]*\}/);
      if (m) {
        try {
          const parsed = JSON.parse(m[0]);
          const text = extractRecursive(parsed);
          if (text && text.trim().length > 0) return text;
        } catch { /* fall through */ }
      }
      // Try to find JSON array in raw text
      const arrMatch = cleaned.match(/\[[\s\S]*\]/);
      if (arrMatch) {
        try {
          const parsed = JSON.parse(arrMatch[0]);
          const text = extractRecursive(parsed);
          if (text && text.trim().length > 0) return text;
        } catch { /* fall through */ }
      }
      return cleaned;
    }
  }

  function extractRecursive(obj: any): string {
    if (!obj) return "";
    
    // Handle strings directly
    if (typeof obj === "string") return obj;
    
    // Handle numbers
    if (typeof obj === "number") return String(obj);
    
    // Handle arrays
    if (Array.isArray(obj)) {
      const parts: string[] = [];
      for (const item of obj) {
        const t = extractRecursive(item);
        if (t) parts.push(t);
      }
      return parts.filter(Boolean).join("\n\n");
    }
    
    // Not an object
    if (typeof obj !== "object") return "";
    
    const parts: string[] = [];

    // Direct text fields — highest priority
    if (obj.textMarkdown && typeof obj.textMarkdown === "string") parts.push(obj.textMarkdown);
    if (obj.markdown && typeof obj.markdown === "string") parts.push(obj.markdown);
    if (obj.text && typeof obj.text === "string" && !obj.textMarkdown) parts.push(obj.text);
    if (obj.content && typeof obj.content === "string") parts.push(obj.content);
    if (obj.message && typeof obj.message === "string") parts.push(obj.message);
    if (obj.value && typeof obj.value === "string" && !obj.label) parts.push(obj.value);
    if (obj.answer && typeof obj.answer === "string") parts.push(obj.answer);
    if (obj.body && typeof obj.body === "string") parts.push(obj.body);
    if (obj.paragraph && typeof obj.paragraph === "string") parts.push(obj.paragraph);
    
    // Structural text fields
    if (obj.heading && typeof obj.heading === "string") parts.push(`**${obj.heading}**`);
    if (obj.title && typeof obj.title === "string") parts.push(`**${obj.title}**`);
    if (obj.subtitle && typeof obj.subtitle === "string") parts.push(obj.subtitle);
    if (obj.description && typeof obj.description === "string") parts.push(obj.description);
    if (obj.summary && typeof obj.summary === "string") parts.push(obj.summary);
    if (obj.caption && typeof obj.caption === "string") parts.push(obj.caption);
    if (obj.trigger && typeof obj.trigger === "string") parts.push(`**${obj.trigger}**`);
    if (obj.header && typeof obj.header === "string") parts.push(`**${obj.header}**`);
    if (obj.footer && typeof obj.footer === "string") parts.push(obj.footer);
    if (obj.placeholder && typeof obj.placeholder === "string" && !obj.text) parts.push(obj.placeholder);
    
    // Number/label combos
    if (obj.number) parts.push(`${obj.number}${obj.label ? " \u2014 " + obj.label : ""}`);
    else if (obj.label && typeof obj.label === "string" && !obj.title && !obj.heading) parts.push(obj.label);
    
    // Value/label combos (for stat cards etc)
    if (obj.value && obj.label && typeof obj.value !== "string") {
      parts.push(`${obj.label}: ${obj.value}`);
    }

    // Recurse into component/props structure (C1 GenUI pattern)
    if (obj.component && typeof obj.component === "object" && obj.component.component) {
      // Top-level wrapper: { component: { component: "Card", props: {...} }, error: null }
      const t = extractRecursive(obj.component);
      if (t) parts.push(t);
    } else if (obj.component && typeof obj.component === "string" && obj.props) {
      // Component node: { component: "TextContent", props: { textMarkdown: "..." } }
      const t = extractRecursive(obj.props);
      if (t) parts.push(t);
    }

    // Recurse into known array fields
    const arrayFields = ["children", "items", "sections", "content", "rows", "columns", "cards", "steps", "list", "data", "elements", "blocks", "entries", "features", "points", "bullets", "options", "tabs", "panels", "groups", "segments", "metrics", "stats", "values", "results"];
    for (const field of arrayFields) {
      if (Array.isArray(obj[field])) {
        for (const item of obj[field]) {
          const t = extractRecursive(item);
          if (t) parts.push(t);
        }
      }
    }

    // Recurse into known object fields
    const objectFields = ["lhs", "rhs", "child", "header", "body", "footer", "left", "right", "top", "bottom", "main", "sidebar", "detail", "primary", "secondary", "slot", "icon", "action", "media"];
    for (const field of objectFields) {
      if (obj[field] && typeof obj[field] === "object" && !Array.isArray(obj[field])) {
        // Don't double-process if we already handled it as a string above
        if (field === "header" && typeof obj[field] === "string") continue;
        if (field === "footer" && typeof obj[field] === "string") continue;
        if (field === "body" && typeof obj[field] === "string") continue;
        const t = extractRecursive(obj[field]);
        if (t) parts.push(t);
      }
    }

    // Deduplicate consecutive identical lines
    const unique: string[] = [];
    for (const p of parts) {
      if (unique.length === 0 || unique[unique.length - 1] !== p) unique.push(p);
    }
    return unique.filter(Boolean).join("\n\n");
  }

  // C1 Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, threadId, responseId } = req.body as {
        prompt: DBMessage;
        threadId: string;
        responseId: string;
      };

      const client = new OpenAI({
        baseURL: "https://api.thesys.dev/v1/embed/",
        apiKey: process.env.THESYS_API_KEY,
      });

      const messageStore = getMessageStore(threadId);
      if (messageStore.getOpenAICompatibleMessageList().length === 0) {
        messageStore.addMessage({
          role: "system",
          content: SYSTEM_MESSAGE,
        });
      }

      messageStore.addMessage(prompt);

      const response = await client.chat.completions.create({
        model: "c1/openai/gpt-5/v-20251230",
        messages: messageStore.getOpenAICompatibleMessageList(),
        stream: true,
      });

      // Accumulate full response first, then extract text
      let accumulated = "";
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          accumulated += content;
        }
      }

      // Parse GenUI and extract readable text
      const plainText = extractTextFromGenUI(accumulated);

      // Store the assistant response (raw for conversation context)
      messageStore.addMessage({
        role: "assistant",
        content: accumulated,
        id: responseId,
      });

      // Send clean text to frontend
      res.json({ content: plainText });
    } catch (error: any) {
      console.error("C1 API Error:", error);
      res.status(500).json({ error: error.message || "Failed to get AI response" });
    }
  });

  return httpServer;
}
