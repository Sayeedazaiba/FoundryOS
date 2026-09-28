import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AGENTS, AGENT_THOUGHTS, type AgentRole } from "@/lib/agents";

export const Route = createFileRoute("/war-room")({
  component: WarRoom,
  head: () => ({
    meta: [
      { title: "War Room — Foundry OS" },
      { name: "description", content: "Live multi-agent execution dashboard." },
    ],
  }),
});

interface Brief {
  idea: string;
  industry: string;
  budget: string;
  audience: string;
  goals: string;
  stack: string;
}

interface LogEntry {
  id: string;
  agent: AgentRole;
  text: string;
  ts: number;
}

const DEFAULT_BRIEF: Brief = {
  idea: "An AI co-pilot that runs operations for solo Shopify merchants.",
  industry: "SaaS",
  budget: "100000",
  audience: "Solo Shopify merchants doing $50k–$500k GMV",
  goals: "$1M ARR in 18 months, raise seed, ship MVP in 60 days",
  stack: "TypeScript / Postgres / Lovable AI",
};

function WarRoom() {
  const [brief, setBrief] = useState<Brief>(DEFAULT_BRIEF);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [progress, setProgress] = useState<Record<AgentRole, number>>({
    ceo: 0, cto: 0, market: 0, finance: 0, marketing: 0, product: 0,
  });
  const [tokens, setTokens] = useState(0);
  const [activeAgent, setActiveAgent] = useState<AgentRole>("ceo");
  const [completed, setCompleted] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem("foundry:brief");
    if (stored) {
      try { setBrief({ ...DEFAULT_BRIEF, ...JSON.parse(stored) }); } catch {}
    }
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const start = async () => {

  const newSessionId = crypto.randomUUID();

setSessionId(newSessionId);

  await fetch("http://127.0.0.1:8000/api/save-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: newSessionId,
      idea: brief.idea,
      industry: brief.industry,
      budget: brief.budget,
      audience: brief.audience,
      goals: brief.goals,
      stack: brief.stack,
    }),
  });

  setRunning(true);
  setCompleted(false);
  setLogs([]);
  setTokens(0);

  setProgress({
    ceo: 0,
    cto: 0,
    market: 0,
    finance: 0,
    marketing: 0,
    product: 0,
  });

    const order: AgentRole[] = ["ceo", "market", "cto", "finance", "marketing", "product"];
    let step = 0;

    const tick = () => {
      const agentIdx = Math.floor(step / 5);
      const lineIdx = step % 5;
      if (agentIdx >= order.length) {
        setRunning(false); setCompleted(true); return;
      }
      const agent = order[agentIdx];
      const line = AGENT_THOUGHTS[agent][lineIdx];
      setActiveAgent(agent);
      setLogs((l) => [...l, { id: `${step}-${Date.now()}`, agent, text: line, ts: Date.now() }]);
      setTokens((t) => t + Math.floor(120 + Math.random() * 280));
      setProgress((p) => ({
  ...p,
  [agent]: lineIdx === 4 ? 100 : 20 + lineIdx * 20,
}));
      step++;
      setTimeout(tick, 700 + Math.random() * 500);
    };
    setTimeout(tick, 400);
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <Topbar running={running} completed={completed} tokens={tokens} />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-6 grid grid-cols-12 gap-4">
        {/* Left: Brief + Agents */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <BriefPanel brief={brief} onStart={start} running={running} completed={completed} />
          <AgentList agents={AGENTS} progress={progress} activeAgent={activeAgent} running={running} />
        </aside>

        {/* Center: Live Feed + Workflow */}
        <main className="col-span-12 lg:col-span-6 space-y-4">
          <LiveFeed logs={logs} logRef={logRef} running={running} />
          <WorkflowGraph progress={progress} activeAgent={activeAgent} />
        </main>

        {/* Right: Reports */}
        <aside className="col-span-12 lg:col-span-3 space-y-4">
          <Telemetry tokens={tokens} logs={logs} running={running} />
          <FinanceChart />
          <Reports
  completed={completed}
  brief={brief}
  sessionId={sessionId}
/>
        </aside>
      </div>
    </div>
  );
}

function Topbar({ running, completed, tokens }: { running: boolean; completed: boolean; tokens: number }) {
  const status = running ? "EXECUTING" : completed ? "COMPLETE" : "STANDBY";
  const dot = running ? "bg-primary pulse-dot" : completed ? "bg-primary" : "bg-muted-foreground";
  return (
    <header className="relative z-10 border-b border-border/50 backdrop-blur-md bg-background/40">
      <div className="mx-auto max-w-[1600px] px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-mono-tech text-muted-foreground hover:text-foreground transition">
            ← <span className="font-display font-bold text-base text-foreground">FOUNDRY OS</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono-tech text-muted-foreground">
            <span className="text-primary">/</span> WAR ROOM
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono-tech">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            <span className="text-muted-foreground">STATUS:</span> <span className="text-foreground">{status}</span>
          </div>
          <div className="hidden md:block">
            <span className="text-muted-foreground">TOKENS:</span> <span className="text-primary">{tokens.toLocaleString()}</span>
          </div>
          <div className="hidden md:block">
            <span className="text-muted-foreground">UPTIME:</span> <span className="text-foreground">∞</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function BriefPanel({ brief, onStart, running, completed }: { brief: Brief; onStart: () => void; running: boolean; completed: boolean }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-[10px] font-mono-tech text-primary tracking-[0.3em] mb-3">/ BRIEF</div>
      <div className="text-sm leading-relaxed mb-4">{brief.idea}</div>
      <div className="space-y-2 text-xs font-mono-tech mb-5">
        <Row k="industry" v={brief.industry} />
        <Row k="budget" v={`$${Number(brief.budget).toLocaleString()}`} />
        <Row k="audience" v={brief.audience} />
        <Row k="goals" v={brief.goals} />
        <Row k="stack" v={brief.stack} />
      </div>
      <button
        onClick={onStart}
        disabled={running}
        className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold glow-mint hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {running ? "Agents working…" : completed ? "Re-run simulation" : "Start simulation ▸"}
      </button>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-muted-foreground uppercase shrink-0 w-16">{k}</span>
      <span className="text-foreground/90 truncate">{v}</span>
    </div>
  );
}

function AgentList({ agents, progress, activeAgent, running }: {
  agents: typeof AGENTS; progress: Record<AgentRole, number>; activeAgent: AgentRole; running: boolean;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-[10px] font-mono-tech text-primary tracking-[0.3em] mb-4">/ AGENTS</div>
      <div className="space-y-3">
        {agents.map((a) => {
          const p = progress[a.id];
          const isActive = running && activeAgent === a.id;
          const done = p >= 100;
          return (
            <div key={a.id} className={`relative rounded-lg p-3 transition ${isActive ? "bg-primary/10 border border-primary/30" : "border border-transparent"}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm ${done ? "bg-primary text-primary-foreground" : "glass-strong text-primary"}`}>
                  {a.glyph}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-sm leading-none">{a.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono-tech mt-1">{a.title}</div>
                </div>
                <div className="text-[10px] font-mono-tech text-muted-foreground">{Math.round(p)}%</div>
              </div>
              <div className="h-1 bg-background/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={false}
                  animate={{ width: `${p}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveFeed({ logs, logRef, running }: { logs: LogEntry[]; logRef: React.RefObject<HTMLDivElement | null>; running: boolean }) {
  return (
    <div className="glass rounded-2xl overflow-hidden relative">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${running ? "bg-primary pulse-dot" : "bg-muted-foreground"}`} />
          <span className="text-[10px] font-mono-tech text-primary tracking-[0.3em]">/ LIVE THOUGHT STREAM</span>
        </div>
        <span className="text-[10px] font-mono-tech text-muted-foreground">{logs.length} EVENTS</span>
      </div>
      <div ref={logRef} className="h-[420px] overflow-y-auto px-5 py-4 font-mono-tech text-xs space-y-2">
        {logs.length === 0 && (
          <div className="text-muted-foreground/60 italic h-full flex items-center justify-center">
            Awaiting orders. Press <span className="mx-1 px-2 py-0.5 rounded bg-primary/20 text-primary">Start simulation</span> to deploy agents.
          </div>
        )}
        <AnimatePresence initial={false}>
          {logs.map((log) => {
            const agent = AGENTS.find((a) => a.id === log.agent)!;
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 leading-relaxed"
              >
                <span className="text-muted-foreground/60 shrink-0">{new Date(log.ts).toLocaleTimeString([], { hour12: false })}</span>
                <span className="text-primary shrink-0 w-16">{agent.name}</span>
                <TypewriterText text={log.text} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="text-foreground/90">
      {displayed}
    </span>
  );
}
function WorkflowGraph({ progress, activeAgent }: { progress: Record<AgentRole, number>; activeAgent: AgentRole }) {
  const nodes = useMemo(() => [
    { id: "ceo" as AgentRole, x: 50, y: 12 },
    { id: "market" as AgentRole, x: 18, y: 45 },
    { id: "cto" as AgentRole, x: 82, y: 45 },
    { id: "finance" as AgentRole, x: 25, y: 82 },
    { id: "product" as AgentRole, x: 75, y: 82 },
    { id: "marketing" as AgentRole, x: 50, y: 95 },
  ], []);
  const edges: [AgentRole, AgentRole][] = [
    ["ceo", "market"], ["ceo", "cto"], ["ceo", "finance"],
    ["ceo", "product"], ["cto", "product"], ["market", "marketing"],
    ["product", "marketing"], ["finance", "marketing"],
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-[10px] font-mono-tech text-primary tracking-[0.3em] mb-3">/ EXECUTION GRAPH</div>
      <div className="relative aspect-[2/1] w-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {edges.map(([a, b], i) => {
            const na = nodes.find((n) => n.id === a)!;
            const nb = nodes.find((n) => n.id === b)!;
            const active = (activeAgent === a || activeAgent === b) && progress[a] > 0 && progress[b] > 0;
            return (
              <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={active ? "oklch(0.82 0.18 165)" : "oklch(0.95 0.05 165 / 0.15)"}
                strokeWidth={active ? 0.4 : 0.2}
                strokeDasharray={active ? "2 1" : "none"}
              />
            );
          })}
          {nodes.map((n) => {
            const p = progress[n.id];
            const active = activeAgent === n.id;
            return (
              <g key={n.id}>
                {active && <circle cx={n.x} cy={n.y} r="6" fill="oklch(0.82 0.18 165 / 0.2)" className="pulse-dot" />}
                <circle cx={n.x} cy={n.y} r="3.5"
                  fill={p >= 100 ? "oklch(0.82 0.18 165)" : p > 0 ? "oklch(0.40 0.10 165)" : "oklch(0.30 0.06 220)"}
                  stroke={active ? "oklch(0.88 0.20 160)" : "oklch(0.95 0.05 165 / 0.3)"}
                  strokeWidth="0.4"
                />
              </g>
            );
          })}
        </svg>
        {nodes.map((n) => {
          const agent = AGENTS.find((a) => a.id === n.id)!;
          return (
            <div key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono-tech text-foreground/80 pointer-events-none whitespace-nowrap"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: `translate(-50%, calc(-50% + 14px))` }}>
              {agent.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Telemetry({ tokens, logs, running }: { tokens: number; logs: LogEntry[]; running: boolean }) {
  const stats = [
    ["TOKENS", tokens.toLocaleString()],
    ["EVENTS", String(logs.length)],
    ["LATENCY", running ? "0.7s" : "—"],
    ["MEMORY", `${Math.min(100, logs.length * 3)}%`],
  ];
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-[10px] font-mono-tech text-primary tracking-[0.3em] mb-4">/ TELEMETRY</div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-lg bg-background/40 p-3">
            <div className="text-[10px] font-mono-tech text-muted-foreground">{k}</div>
            <div className="font-display text-xl font-bold text-gradient-mint mt-1">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function FinanceChart() {
  const data = [
    { month: "M1", revenue: 2000 },
    { month: "M2", revenue: 4500 },
    { month: "M3", revenue: 9000 },
    { month: "M4", revenue: 15000 },
    { month: "M5", revenue: 26000 },
    { month: "M6", revenue: 42000 },
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-[10px] font-mono-tech text-primary tracking-[0.3em] mb-4">
        / REVENUE FORECAST
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
function Reports({
  completed,
  brief,
  sessionId,
}: {
  completed: boolean;
  brief: Brief;
  sessionId: string;
}) {
  const reports = [
    "Business Plan",
    "Market Analysis",
    "Financial Model",
    "Tech Architecture",
    "Pitch Deck",
    "MVP Roadmap",
  ];

  const artifactMap: Record<string, string> = {
    "Business Plan": "business_plan",
    "Market Analysis": "market_analysis",
    "Financial Model": "financial_model",
    "Tech Architecture": "tech_architecture",
    "Pitch Deck": "pitch_deck",
    "MVP Roadmap": "mvp_roadmap",
  };

  const downloadArtifact = async (artifact: string) => {
  try {

    if (!sessionId) {
      alert("No session found.");
      return;
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/report/${sessionId}/${artifact}`
    );

      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `${artifact}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Unable to download report.");
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] font-mono-tech text-primary tracking-[0.3em]">
          / ARTIFACTS
        </div>

        <div
          className={`text-[10px] font-mono-tech ${
            completed ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {completed ? "READY" : "PENDING"}
        </div>
      </div>

      <div className="space-y-2">
        {reports.map((r) => (
          <div
            key={r}
            onClick={() => {
              if (!completed) return;

              downloadArtifact(artifactMap[r]);
            }}
            className={`flex items-center justify-between rounded-lg p-3 text-sm transition ${
              completed
                ? "bg-background/40 hover:bg-secondary/30 cursor-pointer"
                : "bg-background/20 opacity-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  completed ? "bg-primary" : "bg-muted-foreground"
                }`}
              />

              <span>{r}</span>
            </div>

            <span className="text-xs font-mono-tech text-muted-foreground">
              {completed ? "↓" : "—"}
            </span>
          </div>
        ))}
      </div>

      {completed && (
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
          <div className="text-[10px] font-mono-tech text-primary mb-1">
            SUCCESS PROBABILITY
          </div>

          <div className="font-display text-2xl font-bold text-gradient-mint">
            73%
          </div>

          <div className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
            {brief.industry} venture · {brief.audience.slice(0, 28)}…
          </div>
        </div>
      )}
    </div>
  );
}
      