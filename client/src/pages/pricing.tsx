// ── AI Sprint · Vibe Coding & IOP  ──────────────────────────────
// File: pricing.tsx | Repo: ai-vibe-coding
// Last updated: June 2026
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
  CheckCircle2, Lock, CreditCard,
  Mail, Send, AlertCircle, UserCircle,
  Brain, Bot, Rocket, Shield, Layers, Code2,
} from "lucide-react";

// ── Course pricing constants ─────────────────────────────────────────────────
const COURSE_PRICE_USD = 69;
const COURSE_ORIG_USD  = 80; // crossed-out original (L1 $35 + L2 $45)

const L1_COLOR = "#0d7c8a";  // Crafter track
const L2_COLOR = "#8b5cf6";  // Composer track

// ── Pricing Page ──────────────────────────────────────────────────────────────
export default function PricingPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [loading, setLoading] = useState<string | null>(null);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) setLoading(null); };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // ── Hide Nav when rendered inside iframe (e.g. pricing popout) ──────────
  useEffect(() => {
    if (window.self !== window.top) {
      document.documentElement.classList.add("in-iframe");
    }
  }, []);


  const licensed = user?.licensedLevels || [];
  const ownsAll  = licensed.some(l => ["bundle", "1", "2"].includes(l));

  async function handlePurchase(planId: string) {
    if (!user) { window.location.href = "/#/auth"; return; }
    setLoading(planId);
    setError(null);
    try {
      const endpoint = "/api/stripe/checkout";
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
      {/* Hide Nav inside iframe popout */}
      <style>{`
        html.in-iframe nav,
        html.in-iframe [class*="nav"],
        html.in-iframe header { display: none !important; }
        html.in-iframe main { padding-top: 0 !important; }
      `}</style>

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
                  onClick={() => handlePurchase("bundle")}
                  disabled={!!loading}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, fontSize: "1rem", padding: "14px 24px", borderRadius: 12, border: "none", background: L1_COLOR, color: "white", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: `0 4px 14px ${L1_COLOR}55` }}
                >
                  <CreditCard size={18} />
                  {loading === "bundle" ? "Redirecting…" : `Pay with Card · $${COURSE_PRICE_USD} USD`}
                </button>
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
          Secure payments via Stripe · Lifetime access · Email used at purchase is your account
          <span style={{ opacity: 0.5 }}>·</span>
          <span>Need team pricing? <a href="mailto:support@aisprint.app" style={{ color: L1_COLOR, textDecoration: "underline" }}>Contact sales</a></span>
        </div>
      </main>

      <ContactSection />
    </div>
  );
}