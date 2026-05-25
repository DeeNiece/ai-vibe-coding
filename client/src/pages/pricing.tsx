// ── AI Sprint · Vibe Coding & IOP  ──────────────────────────────
// File: pricing.tsx | Repo: ai-vibe-coding
// Last updated: May 2026
//
// PRICING UPDATE: Single $69 price grants both levels (56 days total)
// USD_PRICES/PLANS removed — COURSE_PRICE_USD=69 is the only purchase option
//
// Course structure:
// - Level 1: Crafter (28 days) — vibe coding foundations, automations, shipping
// - Level 2: Composer (28 days) — production AI systems, agents, full-stack apps
// - Total: 56 days of curriculum, 8 weeks, 2 completion certificates
//
// ── THEME SYSTEM ─────────────────────────────────────────────────────────────
// Theme is read from useTheme() — the same React context the Nav uses.
// This guarantees zero-delay sync: the moment Nav toggles, this page
// re-renders instantly because they share the same context value.
//
// Dark  → near-black bg (#0d0d14)  + light text (#e8e6f4 / #9896b0)
// Light → white/light-gray bg      + dark text  (#111827 / #374151)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "@/components/theme-provider";
import Nav from "@/components/nav";
import {
  CheckCircle2, Lock, CreditCard, Wallet,
  Mail, Send, AlertCircle, UserCircle, RefreshCw,
  Brain, Bot, Rocket, Shield, Layers, Code2,
} from "lucide-react";

// ── Course pricing constants ─────────────────────────────────────────────────
const COURSE_PRICE_USD = 69;
const COURSE_ORIG_USD  = 80; // crossed-out original (L1 $35 + L2 $45)

const L1_COLOR = "#0d7c8a";  // Crafter track
const L2_COLOR = "#8b5cf6";  // Composer track

function formatPhp(amount: number) {
  return "₱" + amount.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ── Live USD→PHP exchange rate hook ──────────────────────────────────────────
function useUsdToPhp() {
  const [rate, setRate]             = useState<number | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  async function fetchRate() {
    setLoading(true);
    setError(false);
    try {
      const res  = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await res.json();
      if (data?.rates?.PHP) {
        setRate(Math.round(data.rates.PHP * 100) / 100);
        const now = new Date();
        setLastUpdated(
          now.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }) +
          " " +
          now.toLocaleDateString("en-PH", { month: "short", day: "numeric" })
        );
      } else { setError(true); }
    } catch { setError(true); }
    finally  { setLoading(false); }
  }

  useEffect(() => { fetchRate(); }, []);
  return { rate, loading, error, lastUpdated, refetch: fetchRate };
}

// ── Rate Badge ────────────────────────────────────────────────────────────────
function RateBadge({
  rate, loading, error, lastUpdated, refetch,
}: {
  rate: number | null; loading: boolean; error: boolean;
  lastUpdated: string; refetch: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const mutedColor  = isDark ? "#666" : "#6b7280";
  const accentColor = isDark ? "#444" : "#374151";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: mutedColor, flexWrap: "wrap", justifyContent: "center" }}>
      {loading ? (
        <span>Loading live USD→PHP rate…</span>
      ) : error ? (
        <>
          <span style={{ color: "#ef4444" }}>Rate unavailable</span>
          <button onClick={refetch} style={{ background: "none", border: "none", color: L1_COLOR, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <RefreshCw size={12} /> Retry
          </button>
        </>
      ) : (
        <>
          <span>1 USD = ₱{rate?.toFixed(2)}</span>
          <span style={{ color: accentColor }}>· Updated {lastUpdated}</span>
          <button onClick={refetch} style={{ background: "none", border: "none", color: L1_COLOR, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
            <RefreshCw size={12} />
          </button>
        </>
      )}
    </div>
  );
}

// ── Level Comparison Component ─────────────────────────────────────────────────
function LevelComparison() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const levels = [
    {
      name: "L1 · Crafter",
      icon: <Brain size={20} />,
      color: L1_COLOR,
      duration: "28 days",
      tagline: "From AI-aware to shipping real software",
      outcomes: [
        "Master the 3-part prompt structure (Goal, Constraints, Format)",
        "Build working automations — file processors, data extractors, schedulers",
        "Create shareable internal tools with Streamlit or v0 UI",
        "Debug AI-generated code with the paste-error → fix loop",
        "Package and document tools for non-technical users",
        "Graduate with 3 deployed scripts + Loom demo portfolio",
      ],
      whatYouBuild: [
        "Personal prompt library (10+ tested patterns)",
        "Data extraction pipeline (PDF → CSV → analysis)",
        "Scheduled automation (GitHub Actions cron job)",
        "Internal tool with UI and non-technical run guide",
        "Level 1 portfolio — 3 scripts, README, demo",
      ],
    },
    {
      name: "L2 · Composer",
      icon: <Bot size={20} />,
      color: L2_COLOR,
      duration: "28 days",
      tagline: "Production AI systems, agents, and full-stack apps",
      outcomes: [
        "Build full-stack AI apps with Vercel AI SDK + Claude streaming",
        "Design multi-agent pipelines that run autonomously",
        "Connect MCP servers for persistent memory and external tools",
        "Deploy with auth, rate limiting, evals, and CI/CD",
        "Use Claude Code as your agentic development environment",
        "Graduate with a shipped AI product used by real people",
      ],
      whatYouBuild: [
        "Full-stack AI MVP with live URL and authentication",
        "Autonomous agent running on schedule (3+ successful runs)",
        "Production app with eval suite (>80% pass rate)",
        "Cursor Rules file encoding your stack and conventions",
        "Capstone — shipped AI product with 3+ real users",
      ],
    },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: 24,
      maxWidth: 900,
      margin: "40px auto 0",
      padding: "0 20px",
    }}>
      {levels.map((level, idx) => (
        <div
          key={idx}
          style={{
            background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${level.color}40, ${level.color}15)`,
            padding: "20px 24px",
            borderBottom: `1px solid ${level.color}30`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ color: level.color }}>{level.icon}</div>
              <span style={{ fontWeight: 800, fontSize: "1.2rem", color: level.color }}>{level.name}</span>
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.7, marginBottom: 4, color: isDark ? "#ccc" : "#374151" }}>{level.duration}</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: isDark ? "#e8e6f4" : "#111827" }}>{level.tagline}</div>
          </div>

          {/* Outcomes */}
          <div style={{ padding: "20px 24px" }}>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: level.color }}>
              What you'll master
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
              {level.outcomes.map((outcome, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10, fontSize: "0.85rem", color: isDark ? "#ccc" : "#374151" }}>
                  <CheckCircle2 size={14} style={{ color: level.color, flexShrink: 0, marginTop: 2 }} />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>

            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: level.color }}>
              What you'll build
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {level.whatYouBuild.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10, fontSize: "0.85rem", color: isDark ? "#ccc" : "#374151" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: level.color, flexShrink: 0, marginTop: 6 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Contact Section ───────────────────────────────────────────────────────────
function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res  = await fetch("/api/contact", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setSubmitted(true); form.reset(); }
      else setError("Something went wrong. Please try emailing us directly.");
    } catch { setError("Network error. Please try emailing us directly."); }
    finally   { setSubmitting(false); }
  }

  const sectionBg   = isDark ? "#111"                    : "#f4f6fb";
  const cardBg      = isDark ? "rgba(255,255,255,0.03)"  : "#ffffff";
  const cardBorder  = isDark ? "rgba(255,255,255,0.08)"  : "rgba(0,0,0,0.08)";
  const headingClr  = isDark ? "inherit"                 : "#111827";
  const bodyClr     = isDark ? "#888"                    : "#4b5563";
  const labelClr    = isDark ? "#ccc"                    : "#374151";
  const inputBg     = isDark ? "rgba(0,0,0,0.3)"         : "#f9fafb";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)"   : "rgba(0,0,0,0.12)";
  const inputClr    = isDark ? "#ffffff"                 : "#111827";

  return (
    <section style={{ padding: "80px 20px", background: sectionBg, color: isDark ? "#e8e6f4" : "#111827" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: L1_COLOR, background: `${L1_COLOR}1a`, border: `1px solid ${L1_COLOR}33`, borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>
            <Mail size={12} /> Contact Support
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, color: headingClr, margin: "0 0 12px", lineHeight: 1.2 }}>
            Need help with the course? We're here.
          </h2>
          <p style={{ color: bodyClr, fontSize: "1rem", margin: 0 }}>
            Send us a message and we'll get back to you at{" "}
            <a href="mailto:support@aisprint.app" style={{ color: L1_COLOR, textDecoration: "underline", textUnderlineOffset: 3 }}>
              support@aisprint.app
            </a>
          </p>
        </div>

        {submitted ? (
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
            <CheckCircle2 size={48} color="#22c55e" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem", color: headingClr }}>Message sent!</h3>
            <p style={{ margin: 0, color: bodyClr }}>We'll get back to you within 24 hours.</p>
            <button
              onClick={() => setSubmitted(false)}
              style={{ marginTop: 20, background: "none", border: `1px solid ${isDark ? "#333" : "rgba(0,0,0,0.15)"}`, color: isDark ? "#888" : "#6b7280", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 18, boxShadow: isDark ? "none" : "0 10px 30px rgba(0,0,0,0.05)" }}
          >
            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "10px 14px", borderRadius: 8, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 8 }}>
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {[
              { icon: <UserCircle size={13} />, label: "Your Name",  name: "name",  type: "text",  ph: "Jane Doe" },
              { icon: <Mail size={13} />,       label: "Your Email", name: "email", type: "email", ph: "you@example.com" },
            ].map((f) => (
              <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: labelClr, display: "flex", alignItems: "center", gap: 6 }}>
                  {f.icon} {f.label}
                </label>
                <input
                  type={f.type} name={f.name} placeholder={f.ph} required
                  style={{ padding: "11px 14px", borderRadius: 8, border: `1px solid ${inputBorder}`, background: inputBg, color: inputClr, fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box" }}
                />
              </div>
            ))}

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, color: labelClr }}>Message</label>
              <textarea
                name="message" placeholder="Describe your issue or question…" required rows={5}
                style={{ padding: "11px 14px", borderRadius: 8, border: `1px solid ${inputBorder}`, background: inputBg, color: inputClr, fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
              />
            </div>

            <button
              type="submit" disabled={submitting}
              style={{ padding: "13px", borderRadius: 8, border: "none", background: submitting ? (isDark ? "#555" : "#9ca3af") : L1_COLOR, color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: submitting ? "none" : `0 4px 14px ${L1_COLOR}55` }}
            >
              <Send size={15} />
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Pricing Page ──────────────────────────────────────────────────────────────
export default function PricingPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState<string | null>(null);
  const [error,   setError]   = useState<string | null>(null);
  const { rate, loading: rateLoading, error: rateError, lastUpdated, refetch } = useUsdToPhp();

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) setLoading(null); };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const licensed = user?.licensedLevels || [];
  const ownsAll  = licensed.some(l => ["bundle", "1", "2"].includes(l));

  function livePhp(usd: number): string {
    if (!rate) return "…";
    return formatPhp(Math.round(usd * rate));
  }

  async function handlePurchase(planId: string, method: "stripe" | "paymongo") {
    if (!user) { window.location.href = "/#/auth"; return; }
    const key = `${method}-${planId}`;
    setLoading(key);
    setError(null);
    try {
      const endpoint = method === "stripe" ? "/api/stripe/checkout" : "/api/paymongo/checkout";
      const res  = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: planId }) });
      const data = await res.json();
      if (data.url) { setLoading(null); window.location.href = data.url; }
      else { setError(data.error || "Something went wrong. Please try again."); setLoading(null); }
    } catch { setError("Network error. Please try again."); setLoading(null); }
  }

  const pageBg       = isDark ? "#0d0d14"                : "#f4f6fb";
  const headingClr   = isDark ? "#e8e6f4"                : "#111827";
  const bodyClr      = isDark ? "#9896b0"                : "#374151";
  const mutedClr     = isDark ? "#666"                   : "#6b7280";
  const cardBg       = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBorder   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const cardShadow   = isDark ? "none"                   : "0 4px 24px rgba(0,0,0,0.08)";
  const cardTitleClr = isDark ? "#e8e6f4" : "#111827";
  const cardSubClr   = isDark ? "#888"    : "#6b7280";
  const priceClr     = isDark ? "#e8e6f4" : "#111827";
  const strikeClr    = isDark ? "#555"    : "#9ca3af";
  const phpMuted     = isDark ? "#aaa"    : "#6b7280";
  const phpSub       = isDark ? "#666"    : "#9ca3af";
  const featureClr   = isDark ? "#ccc"    : "#374151";
  const liveRateClr  = isDark ? "#555"    : "#9ca3af";
  const footerClr    = isDark ? "#555"    : "#9ca3af";

  return (
    <div
      style={{ background: pageBg, color: headingClr, minHeight: "100vh", transition: "background 0.3s, color 0.3s" }}
    >
      <Nav />

      <main style={{ padding: "0 0 40px" }}>

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", padding: "60px 20px 32px", maxWidth: 800, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, color: headingClr, lineHeight: 1.2, margin: "0 0 16px" }}>
            Master Vibe Coding &amp; IOP — Complete 56-Day Course
          </h1>
          <p style={{ color: bodyClr, fontSize: "1.05rem", lineHeight: 1.7, margin: "0 auto 20px", maxWidth: 650 }}>
            Two levels, one price. Start as a Crafter building real automations, graduate as a Composer 
            shipping production AI systems. 56 days of curriculum, 8 weeks, 2 completion certificates.
          </p>

          <RateBadge
            rate={rate} loading={rateLoading} error={rateError}
            lastUpdated={lastUpdated} refetch={refetch}
          />

          {ownsAll && (
            <div style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", padding: "10px 16px", borderRadius: "8px", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 10, border: "1px solid rgba(34,197,94,0.2)" }}>
              <CheckCircle2 size={16} /> You already own the full course — both levels unlocked
            </div>
          )}
        </div>

        {/* ── Bundle Card ──────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 720, margin: "0 auto 24px", borderRadius: 24, overflow: "hidden", background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>

          {/* Gradient badge strip */}
          <div style={{ background: `linear-gradient(135deg, ${L1_COLOR}, ${L2_COLOR})`, textAlign: "center", padding: "12px 20px", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", color: "white" }}>
            ⚡ Complete Bundle · Both Levels · Best Value
          </div>

          <div style={{ padding: "32px 36px" }}>

            {/* Card heading */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, color: cardTitleClr, marginBottom: 8 }}>
                Vibe Coding &amp; IOP — Crafter + Composer
              </div>
              <div style={{ fontSize: "0.9rem", color: cardSubClr }}>
                56 days · 2 levels · 8 weeks · From first prompt to production AI
              </div>
            </div>

            {/* Level pills */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <span style={{ padding: "6px 18px", borderRadius: 100, background: `${L1_COLOR}22`, border: `1px solid ${L1_COLOR}66`, color: L1_COLOR, fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <Brain size={14} /> L1 · Crafter — Foundations
              </span>
              <span style={{ padding: "6px 18px", borderRadius: 100, background: `${L2_COLOR}22`, border: `1px solid ${L2_COLOR}66`, color: L2_COLOR, fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <Bot size={14} /> L2 · Composer — Production
              </span>
            </div>

            {/* Price block */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: "4rem", fontWeight: 900, color: priceClr, lineHeight: 1 }}>
                  ${COURSE_PRICE_USD}
                </span>
                <span style={{ fontSize: "1.2rem", color: strikeClr, textDecoration: "line-through", marginLeft: 14 }}>
                  ${COURSE_ORIG_USD}
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", color: phpMuted, marginBottom: 6 }}>
                ≈ {livePhp(COURSE_PRICE_USD)}{" "}
                <span style={{ color: phpSub, fontSize: "0.75rem" }}>(live PHP rate)</span>
              </div>
              <div style={{ fontSize: "0.85rem", color: L1_COLOR, fontWeight: 700 }}>
                Save ${COURSE_ORIG_USD - COURSE_PRICE_USD} · {Math.round((1 - COURSE_PRICE_USD / COURSE_ORIG_USD) * 100)}% off · one-time · lifetime access
              </div>
            </div>

            {/* Feature list - updated for curriculum */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px" }}>
              {[
                { accent: L1_COLOR, text: "Level 1 — Crafter (28 days): prompting, building automations, shipping real tools" },
                { accent: L2_COLOR, text: "Level 2 — Composer (28 days): production AI systems, agents, full-stack apps" },
                { accent: "#14b8a6", text: "2 completion certificates — one for each level" },
                { accent: "#a78bfa", text: "15 min/day — designed for real professional schedules" },
                { accent: "#f59e0b", text: "Portfolio: 7+ shipped projects, live demos, GitHub repos" },
                { accent: L1_COLOR,  text: "Lifetime access · all future updates · no renewals" },
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, fontSize: "0.9rem", color: featureClr }}>
                  <CheckCircle2 size={16} style={{ color: item.accent, flexShrink: 0, marginTop: 2 }} />
                  {item.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {ownsAll ? (
              <div style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: "14px 20px", display: "flex", justifyContent: "center", alignItems: "center", gap: 10, fontWeight: 600 }}>
                <CheckCircle2 size={18} /> You own the full course — both levels unlocked
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420, margin: "0 auto" }}>
                <button
                  onClick={() => handlePurchase("bundle", "stripe")}
                  disabled={!!loading}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, fontSize: "1rem", padding: "14px 24px", borderRadius: 12, border: "none", background: L1_COLOR, color: "white", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: `0 4px 14px ${L1_COLOR}55` }}
                >
                  <CreditCard size={18} />
                  {loading === "stripe-bundle" ? "Redirecting…" : `Pay with Card · $${COURSE_PRICE_USD} USD`}
                </button>

                <button
                  onClick={() => handlePurchase("bundle", "paymongo")}
                  disabled={!!loading}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "#3b82f6", color: "white", fontSize: "1rem", padding: "14px 24px", borderRadius: 12, border: "none", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: "0 4px 14px rgba(59,130,246,0.4)" }}
                >
                  <Wallet size={18} />
                  {loading === "paymongo-bundle"
                    ? "Redirecting…"
                    : `GCash / PayMaya · ${rate ? formatPhp(Math.round(COURSE_PRICE_USD * rate)) : "..."}`}
                </button>

                <div style={{ fontSize: "0.75rem", color: liveRateClr, textAlign: "center" }}>
                  Live rate: 1 USD = {rate ? `₱${rate.toFixed(2)}` : "..."}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Level Comparison Section ─────────────────────────────────────── */}
        <LevelComparison />

        {/* Error */}
        {error && (
          <div style={{ maxWidth: 680, margin: "24px auto 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "12px 18px", color: "#ef4444", fontSize: "0.88rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Footer note */}
        <div style={{ textAlign: "center", padding: "48px 20px 60px", fontSize: "0.8rem", color: footerClr, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <Lock size={14} />
          Secure payments via Stripe &amp; PayMongo · Lifetime access · Email used at purchase is your account
          <span style={{ opacity: 0.5 }}>·</span>
          <span>Need team pricing? <a href="mailto:support@aisprint.app" style={{ color: L1_COLOR, textDecoration: "underline" }}>Contact sales</a></span>
        </div>
      </main>

      <ContactSection />
    </div>
  );
}