import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { AGENTS } from "@/lib/agents";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Foundry OS — Run an autonomous AI startup" },
      { name: "description", content: "Multi-agent OS that simulates a complete AI-powered startup. Drop in an idea, get a business plan, pitch deck, financial model, architecture, and MVP scope." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundFx />
      <Nav />
      <Hero />
      <AgentRoster />
      <Intake />
      <Capabilities />
      <Footer />
    </div>
  );
}

function BackgroundFx() {
  return (
    <>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.18 165 / 0.18), transparent 60%)" }} />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.16 195 / 0.12), transparent 60%)" }} />
    </>
  );
}

function Nav() {
  return (
    <header className="relative z-10 mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg glass-strong flex items-center justify-center text-primary font-bold">◆</div>
        <div>
          <div className="font-display font-bold text-lg leading-none">FOUNDRY OS</div>
          <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">v2026.01</div>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#agents" className="hover:text-foreground transition">Agents</a>
        <a href="#intake" className="hover:text-foreground transition">Launch</a>
        <a href="#capabilities" className="hover:text-foreground transition">Capabilities</a>
        <Link to="/war-room" className="hover:text-foreground transition">War Room</Link>
      </nav>
      <Link to="/war-room"
        className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold glow-mint hover:opacity-90 transition">
        Open War Room →
      </Link>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-mono-tech text-muted-foreground mb-8"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
        SYSTEM ONLINE · 6 AGENTS READY · 0 ACTIVE WORKFLOWS
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6"
      >
        Run an entire <br />
        <span className="text-gradient-mint">AI startup</span> by yourself.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10"
      >
        Foundry OS spins up six autonomous agents — CEO, CTO, Market, Finance, Marketing, Product — that
        debate, plan, and ship a complete business plan, pitch deck, and MVP architecture while you watch.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex items-center justify-center gap-3"
      >
        <a href="#intake"
          className="rounded-xl bg-primary text-primary-foreground px-6 py-3.5 text-sm font-semibold glow-mint hover:opacity-90 transition">
          Launch a startup →
        </a>
        <Link to="/war-room"
          className="rounded-xl glass px-6 py-3.5 text-sm font-semibold hover:bg-secondary/40 transition">
          See the War Room
        </Link>
      </motion.div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px glass rounded-2xl overflow-hidden max-w-4xl mx-auto">
        {[
          ["6", "Autonomous Agents"],
          ["12", "Generated Artifacts"],
          ["3 min", "Avg. Simulation"],
          ["∞", "Iterations"],
        ].map(([k, v]) => (
          <div key={v} className="bg-background/40 px-6 py-6">
            <div className="font-display text-3xl font-bold text-gradient-mint">{k}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AgentRoster() {
  return (
    <section id="agents" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="text-xs font-mono-tech text-primary uppercase tracking-[0.3em] mb-3">/ Roster</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Six agents.<br />One company.</h2>
        </div>
        <p className="hidden md:block max-w-sm text-muted-foreground text-sm">
          Each agent has a distinct role, memory, and opinion. They argue, defer, and ship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AGENTS.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass rounded-2xl p-6 hover:bg-secondary/30 transition group"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="h-12 w-12 rounded-xl glass-strong flex items-center justify-center text-2xl text-primary group-hover:scale-110 transition">{a.glyph}</div>
              <span className="text-[10px] font-mono-tech text-muted-foreground uppercase tracking-widest">{a.id}.agent</span>
            </div>
            <div className="font-display font-bold text-2xl">{a.name}</div>
            <div className="text-xs text-primary uppercase tracking-wider mt-1 mb-3">{a.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{a.mission}</p>
            <div className="flex flex-wrap gap-1.5">
              {a.outputs.map((o) => (
                <span key={o} className="text-[10px] font-mono-tech px-2 py-1 rounded-md bg-background/50 border border-border text-muted-foreground">{o}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Intake() {
  const navigate = Route.useNavigate();
  const [form, setForm] = useState({
    idea: "",
    industry: "SaaS",
    budget: "100000",
    audience: "",
    goals: "",
    stack: "TypeScript / Postgres / Lovable AI",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("foundry:brief", JSON.stringify(form));
    }
    navigate({ to: "/war-room" });
  };

  return (
    <section id="intake" className="relative z-10 mx-auto max-w-5xl px-6 py-24">
      <div className="text-center mb-12">
        <div className="text-xs font-mono-tech text-primary uppercase tracking-[0.3em] mb-3">/ Intake</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold">Brief the company.</h2>
        <p className="text-muted-foreground mt-3">Six lines. Then watch six agents go to work.</p>
      </div>

      <form onSubmit={submit} className="glass-strong rounded-3xl p-8 md:p-10 space-y-6">
        <Field label="Startup idea" hint="One sentence — what does it do?">
          <textarea required value={form.idea} onChange={(e) => setForm({ ...form, idea: e.target.value })}
            placeholder="e.g. An AI co-pilot that runs operations for solo Shopify merchants."
            rows={2}
            className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </Field>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Industry">
            <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
              className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              {["SaaS", "Fintech", "Health", "Climate", "Devtools", "Consumer", "Marketplace", "AI Infra"].map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Budget (USD)">
            <input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm font-mono-tech focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </Field>
        </div>

        <Field label="Target audience">
          <input value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}
            placeholder="e.g. Solo Shopify merchants doing $50k–$500k GMV"
            className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </Field>

        <Field label="Goals" hint="Comma-separated: revenue, fundraising, users, etc.">
          <input value={form.goals} onChange={(e) => setForm({ ...form, goals: e.target.value })}
            placeholder="$1M ARR in 18 months, raise seed, ship MVP in 60 days"
            className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </Field>

        <Field label="Preferred stack">
          <input value={form.stack} onChange={(e) => setForm({ ...form, stack: e.target.value })}
            className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-sm font-mono-tech focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </Field>

        <button type="submit"
          className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-4 font-semibold glow-mint hover:opacity-90 transition flex items-center justify-center gap-2">
          Deploy agents to War Room <span>→</span>
        </button>
      </form>
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-mono-tech uppercase tracking-wider text-muted-foreground">{label}</span>
        {hint && <span className="text-[10px] text-muted-foreground/70">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function Capabilities() {
  const items = [
    ["Persistent Memory", "Vector store + episodic logs. Agents remember every decision."],
    ["Debate Mode", "Agents disagree on purpose. CEO arbitrates, you watch."],
    ["Live War Room", "Streaming thoughts, task graph, token meter, execution timeline."],
    ["Pitch Generator", "Investor-grade deck with TAM/SAM/SOM, traction, ask."],
    ["Architecture Synth", "System diagrams, ER models, deployment topology."],
    ["MVP Scaffolder", "Folder tree, README, CI/CD — ready to clone."],
  ];
  return (
    <section id="capabilities" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
      <div className="text-xs font-mono-tech text-primary uppercase tracking-[0.3em] mb-3">/ Capabilities</div>
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 max-w-2xl">An operating system, not a chatbot.</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px glass rounded-2xl overflow-hidden">
        {items.map(([t, d]) => (
          <div key={t} className="bg-background/40 p-8 hover:bg-secondary/30 transition">
            <div className="text-primary font-mono-tech text-xs mb-3">▸ {t.toUpperCase()}</div>
            <p className="text-foreground/90">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono-tech">
        <div>FOUNDRY OS · AUTONOMOUS STARTUP RUNTIME</div>
        <div>BUILT FOR THE 2026 AGENTIC ERA · v0.1.0-preview</div>
      </div>
    </footer>
  );
}

