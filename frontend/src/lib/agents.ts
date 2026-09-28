export type AgentRole =
  | "ceo"
  | "cto"
  | "market"
  | "finance"
  | "marketing"
  | "product";

export interface Agent {
  id: AgentRole;
  name: string;
  title: string;
  glyph: string;
  mission: string;
  outputs: string[];
}

export const AGENTS: Agent[] = [
  {
    id: "ceo",
    name: "ATLAS",
    title: "CEO Agent",
    glyph: "◆",
    mission: "Translates vision into strategy, delegates tasks, mediates debates between agents.",
    outputs: ["Strategic North Star", "Task Graph", "Decision Log"],
  },
  {
    id: "cto",
    name: "VECTOR",
    title: "CTO Agent",
    glyph: "▲",
    mission: "Picks the stack, designs scalable architecture, flags security & tech debt.",
    outputs: ["System Architecture", "Stack Selection", "Security Brief"],
  },
  {
    id: "market",
    name: "ORACLE",
    title: "Market Research Agent",
    glyph: "◉",
    mission: "Maps competitors, finds market gaps, runs SWOT and trend forecasting.",
    outputs: ["Competitor Heatmap", "SWOT", "Trend Forecast"],
  },
  {
    id: "finance",
    name: "LEDGER",
    title: "Finance Agent",
    glyph: "✦",
    mission: "Models burn rate, forecasts revenue, valuates the company, picks pricing.",
    outputs: ["Burn Model", "Revenue Forecast", "Valuation Range"],
  },
  {
    id: "marketing",
    name: "ECHO",
    title: "Marketing Agent",
    glyph: "✺",
    mission: "Crafts the launch narrative, ad copy, SEO map, and channel plan.",
    outputs: ["Launch Plan", "Ad Variants", "SEO Map"],
  },
  {
    id: "product",
    name: "PRISM",
    title: "Product Manager Agent",
    glyph: "❖",
    mission: "Sequences the roadmap, scopes the MVP, writes user stories.",
    outputs: ["MVP Scope", "Roadmap", "User Stories"],
  },
];

export const AGENT_THOUGHTS: Record<AgentRole, string[]> = {
  ceo: [
    "Parsing vision: extracting verbs, audience, and ambition vector…",
    "Sequencing dependencies between Market, Finance, and CTO outputs.",
    "Delegating: ORACLE → competitive scan, LEDGER → 18-month burn model.",
    "Synthesizing strategic North Star: defensible niche + speed to revenue.",
    "Approving CTO stack proposal. Locking go-to-market window at T+90d.",
  ],
  cto: [
    "Evaluating stack: TanStack Start + Postgres + Lovable AI for orchestration.",
    "Modeling load: 10k DAU → ~120 RPS peak, async queue justified.",
    "Drafting service boundaries: ingestion / agent-runtime / persistence / API.",
    "Flagging risk: vendor lock-in on vector DB. Recommending portable schema.",
    "Architecture v1 finalized. Handoff to Developer agent.",
  ],
  market: [
    "Indexed 412 competitors across 9 adjacent categories.",
    "Identified 3 unserved wedges. Ranking by TAM × winnability.",
    "Top wedge: prosumer tier — willing to pay, underserved by enterprise tools.",
    "Trend signal: 41% YoY growth in agentic-workflow searches.",
    "SWOT compiled. Forwarded to CEO for strategic synthesis.",
  ],
  finance: [
    "Loading runway model. Inputs: budget, payroll curve, infra elasticity.",
    "Burn projection: $42k/mo by month 6 at planned hiring pace.",
    "Revenue scenarios: P10 $180k ARR, P50 $640k ARR, P90 $1.4M ARR.",
    "Pricing: tiered $29/$99/$299. Rejecting freemium — CAC payback too long.",
    "Valuation band locked: $4.8M–$7.2M pre-seed.",
  ],
  marketing: [
    "Drafting positioning: 'The OS for one-person companies.'",
    "Channel mix: 50% content/SEO, 30% community, 20% paid social.",
    "Generated 12 ad variants. A/B framework attached.",
    "Launch sequence: waitlist → ProductHunt → press → paid amplification.",
    "SEO map: 84 long-tail clusters, 6 pillar pages.",
  ],
  product: [
    "Reading market wedge + tech constraints. Compressing to MVP.",
    "MVP scope locked: 4 core flows, 12 user stories, 3-week build.",
    "Sprint 1: onboarding + first generation. Sprint 2: collaboration.",
    "Cut from MVP: team workspaces, integrations, mobile app.",
    "Roadmap published. Engineering can start.",
  ],
};