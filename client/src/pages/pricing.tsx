// ── AI Sprint · Architecture & Interior Design ──────────────────────────────
// File: pricing.tsx | Repo: ai-archi
// Last updated: May 2026
//
// PRICING UPDATE: Single $69 price grants both levels (56 days total)
// USD_PRICES/PLANS removed — COURSE_PRICE_USD=69 is the only purchase option
//
// ── THEME SYSTEM ─────────────────────────────────────────────────────────────
// Theme is read from useTheme() — the same React context the Nav uses.
// This guarantees zero-delay sync: the moment Nav toggles, this page
// re-renders instantly because they share the same context value.
//
// Previously used useDarkMode() which polled localStorage — that caused
// a visible delay because:
//   • window "storage" event only fires in OTHER tabs, not the current one
//   • window "focus" event only fires when the window regains focus
// Both are async and unpredictable; React context is synchronous.
//
// Dark  → near-black bg (#0d0d14)  + light text (#e8e6f4 / #9896b0)
// Light → white/light-gray bg      + dark text  (#111827 / #374151)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "@/components/theme-provider";
import Nav from "@/components/nav";
import {// ── AI Sprint · Vibe Coding & IOP ──────────────────────────────
// File: pricing.tsx | Repo: ai-vibe-coding
// Last updated: May 2026
//
// PRICING UPDATE: Single $69 price grants both levels (56 days total)
// USD_PRICES/PLANS removed — COURSE_PRICE_USD=69 is the only purchase option
//
// ── THEME SYSTEM ─────────────────────────────────────────────────────────────
// Theme is read from useTheme() — the same React context the Nav uses.
// This guarantees zero-delay sync: the moment Nav toggles, this page
// re-renders instantly because they share the same context value.
//
// Previously used useDarkMode() which polled localStorage — that caused
// a visible delay because:
//   • window "storage" event only fires in OTHER tabs, not the current one
//   • window "focus" event only fires when the window regains focus
// Both are async and unpredictable; React context is synchronous.
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
} from "lucide-react";

// ── Course pricing constants ─────────────────────────────────────────────────
const COURSE_PRICE_USD = 69;
const COURSE_ORIG_USD  = 80; // crossed-out original (L1 $35 + L2 $45)

const L1_COLOR = "#0d7c8a";
const L2_COLOR = "#8b5cf6";

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
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setSubmitted(true); form.reset(); }
      else setError("Something went wrong. Please try emailing us directly.");
    } catch { setError("Network error. Please try emailing us directly."); }
    finally   { setSubmitting(false); }
  }

  // Section design tokens
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

        {/* Section label + heading */}
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

        {/* Success state */}
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
          /* Contact form */
          <form
            onSubmit={handleSubmit}
            style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 18, boxShadow: isDark ? "none" : "0 10px 30px rgba(0,0,0,0.05)" }}
          >
            <input type="hidden" name="access_key" value="9354c53d-f37d-4c31-845b-88286c03d1d4" />
            <input type="hidden" name="subject"    value="AI Sprint Vibe Coding & IOP Support Request" />
            <input type="hidden" name="from_name"  value="AI Sprint Vibe Coding & IOP Pricing Page" />

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "10px 14px", borderRadius: 8, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 8 }}>
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {/* Name + Email fields */}
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

            {/* Message field */}
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

  // Clear loading spinner when browser restores from bfcache
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

  // ── Design tokens (resolved from isDark) ─────────────────────────────────
  const pageBg       = isDark ? "#0d0d14"                : "#f4f6fb";
  const headingClr   = isDark ? "#e8e6f4"                : "#111827";
  const bodyClr      = isDark ? "#9896b0"                : "#374151";
  const mutedClr     = isDark ? "#666"                   : "#6b7280";
  const cardBg       = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBorder   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const cardShadow   = isDark ? "none"                   : "0 4px 24px rgba(0,0,0,0.08)";

  // Card inner tokens
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
        <div style={{ textAlign: "center", padding: "60px 20px 32px", maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, color: headingClr, lineHeight: 1.2, margin: "0 0 16px" }}>
            Master Vibe Coding &amp; IOP — Both Levels for ${COURSE_PRICE_USD}
          </h1>
          <p style={{ color: bodyClr, fontSize: "1rem", lineHeight: 1.7, margin: "0 auto 20px", maxWidth: 600 }}>
            One price. 56 days. Full mastery. Get Foundation (design principles, spatial planning,
            materials) and Professional (construction drawings, 3D rendering, real client projects)
            — the complete design transformation in a single purchase.
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
        <div style={{ maxWidth: 680, margin: "0 auto 24px", borderRadius: 20, overflow: "hidden", background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>

          {/* Gradient badge strip */}
          <div style={{ background: `linear-gradient(135deg, ${L1_COLOR}, ${L2_COLOR})`, textAlign: "center", padding: "10px 20px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.05em", color: "white" }}>
            ⚡ Both Levels · Best Value
          </div>

          <div style={{ padding: "28px 32px 32px" }}>

            {/* Card heading */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: cardTitleClr, marginBottom: 6 }}>
                Complete Vibe Coding &amp; IOP Course
              </div>
              <div style={{ fontSize: "0.9rem", color: cardSubClr }}>
                56 days · 2 levels · Foundation → Professional
              </div>
            </div>

            {/* Level pills */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
              <span style={{ padding: "6px 16px", borderRadius: 20, background: `${L1_COLOR}22`, border: `1px solid ${L1_COLOR}66`, color: "#14b8a6", fontSize: "0.82rem", fontWeight: 700 }}>
                L1 · Foundation
              </span>
              <span style={{ padding: "6px 16px", borderRadius: 20, background: `${L2_COLOR}22`, border: `1px solid ${L2_COLOR}66`, color: "#a78bfa", fontSize: "0.82rem", fontWeight: 700 }}>
                L2 · Professional
              </span>
            </div>

            {/* Price block */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: "3.5rem", fontWeight: 900, color: priceClr, lineHeight: 1 }}>
                  ${COURSE_PRICE_USD}
                </span>
                <span style={{ fontSize: "1.1rem", color: strikeClr, textDecoration: "line-through", marginLeft: 12 }}>
                  ${COURSE_ORIG_USD}
                </span>
              </div>
              <div style={{ fontSize: "0.82rem", color: phpMuted, marginBottom: 4 }}>
                ≈ {livePhp(COURSE_PRICE_USD)}{" "}
                <span style={{ color: phpSub, fontSize: "0.72rem" }}>(live rate)</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: L1_COLOR, fontWeight: 700 }}>
                Save ${COURSE_ORIG_USD - COURSE_PRICE_USD} · {Math.round((1 - COURSE_PRICE_USD / COURSE_ORIG_USD) * 100)}% off · one-time · no renewals
              </div>
            </div>

            {/* Feature list */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {[
                { accent: "#14b8a6", text: "Level 1 — 28 days: spatial planning, colour theory & material selection" },
                { accent: "#a78bfa", text: "Level 2 — 28 days: construction drawings, 3D rendering & client projects" },
                { accent: L1_COLOR,  text: "2 completion certificates — one per level" },
                { accent: L1_COLOR,  text: "Real portfolio pieces from day one" },
                { accent: L1_COLOR,  text: "Lifetime access · no renewals · no hidden fees" },
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: "0.88rem", color: featureClr }}>
                  <CheckCircle2 size={15} style={{ color: item.accent, flexShrink: 0, marginTop: 2 }} />
                  {item.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {ownsAll ? (
              <div style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, padding: "10px 16px", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, fontWeight: 600 }}>
                <CheckCircle2 size={16} /> You own the full course
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400, margin: "0 auto" }}>
                {/* Stripe */}
                <button
                  onClick={() => handlePurchase("bundle", "stripe")}
                  disabled={!!loading}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, fontSize: "1rem", padding: "14px 20px", borderRadius: 10, border: "none", background: L1_COLOR, color: "white", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: `0 4px 14px ${L1_COLOR}55` }}
                >
                  <CreditCard size={17} />
                  {loading === "stripe-bundle" ? "Redirecting…" : `Pay with Card · $${COURSE_PRICE_USD} USD`}
                </button>

                {/* PayMongo */}
                <button
                  onClick={() => handlePurchase("bundle", "paymongo")}
                  disabled={!!loading}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, background: "#3b82f6", color: "white", fontSize: "1rem", padding: "14px 20px", borderRadius: 10, border: "none", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: "0 4px 14px rgba(59,130,246,0.4)" }}
                >
                  <Wallet size={17} />
                  {loading === "paymongo-bundle"
                    ? "Redirecting…"
                    : `GCash / PayMaya · ${rate ? formatPhp(Math.round(COURSE_PRICE_USD * rate)) : "..."}`}
                </button>

                <div style={{ fontSize: "0.72rem", color: liveRateClr, textAlign: "center" }}>
                  Live rate: 1 USD = {rate ? `₱${rate.toFixed(2)}` : "..."}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ maxWidth: 680, margin: "0 auto 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "10px 16px", color: "#ef4444", fontSize: "0.88rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Footer note */}
        <div style={{ textAlign: "center", padding: "0 20px 48px", fontSize: "0.78rem", color: footerClr, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Lock size={14} />
          Secure payments via Stripe &amp; PayMongo · Email used at purchase is the only authorized account
        </div>
      </main>

      <ContactSection />
    </div>
  );
}
  CheckCircle2, Lock, CreditCard, Wallet,
  Mail, Send, AlertCircle, UserCircle, RefreshCw,
} from "lucide-react";

// ── Course pricing constants ─────────────────────────────────────────────────
const COURSE_PRICE_USD = 69;
const COURSE_ORIG_USD  = 80; // crossed-out original (L1 $35 + L2 $45)

const L1_COLOR = "#0d7c8a";
const L2_COLOR = "#8b5cf6";

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
      const res  = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setSubmitted(true); form.reset(); }
      else setError("Something went wrong. Please try emailing us directly.");
    } catch { setError("Network error. Please try emailing us directly."); }
    finally   { setSubmitting(false); }
  }

  // Section design tokens
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

        {/* Section label + heading */}
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

        {/* Success state */}
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
          /* Contact form */
          <form
            onSubmit={handleSubmit}
            style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 18, boxShadow: isDark ? "none" : "0 10px 30px rgba(0,0,0,0.05)" }}
          >
            <input type="hidden" name="access_key" value="9354c53d-f37d-4c31-845b-88286c03d1d4" />
            <input type="hidden" name="subject"    value="AI Sprint Architecture Course Support Request" />
            <input type="hidden" name="from_name"  value="AI Sprint Architecture Course Pricing Page" />

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "10px 14px", borderRadius: 8, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 8 }}>
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {/* Name + Email fields */}
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

            {/* Message field */}
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

  // Clear loading spinner when browser restores from bfcache
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

  // ── Design tokens (resolved from isDark) ─────────────────────────────────
  const pageBg       = isDark ? "#0d0d14"                : "#f4f6fb";
  const headingClr   = isDark ? "#e8e6f4"                : "#111827";
  const bodyClr      = isDark ? "#9896b0"                : "#374151";
  const mutedClr     = isDark ? "#666"                   : "#6b7280";
  const cardBg       = isDark ? "rgba(255,255,255,0.04)" : "#ffffff";
  const cardBorder   = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const cardShadow   = isDark ? "none"                   : "0 4px 24px rgba(0,0,0,0.08)";

  // Card inner tokens
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
        <div style={{ textAlign: "center", padding: "60px 20px 32px", maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, color: headingClr, lineHeight: 1.2, margin: "0 0 16px" }}>
            Master Architecture &amp; Interior Design — Both Levels for ${COURSE_PRICE_USD}
          </h1>
          <p style={{ color: bodyClr, fontSize: "1rem", lineHeight: 1.7, margin: "0 auto 20px", maxWidth: 600 }}>
            One price. 56 days. Full mastery. Get Foundation (design principles, spatial planning,
            materials) and Professional (construction drawings, 3D rendering, real client projects)
            — the complete design transformation in a single purchase.
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
        <div style={{ maxWidth: 680, margin: "0 auto 24px", borderRadius: 20, overflow: "hidden", background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>

          {/* Gradient badge strip */}
          <div style={{ background: `linear-gradient(135deg, ${L1_COLOR}, ${L2_COLOR})`, textAlign: "center", padding: "10px 20px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.05em", color: "white" }}>
            ⚡ Both Levels · Best Value
          </div>

          <div style={{ padding: "28px 32px 32px" }}>

            {/* Card heading */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: cardTitleClr, marginBottom: 6 }}>
                Complete Architecture &amp; Interior Design Course
              </div>
              <div style={{ fontSize: "0.9rem", color: cardSubClr }}>
                56 days · 2 levels · Foundation → Professional
              </div>
            </div>

            {/* Level pills */}
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
              <span style={{ padding: "6px 16px", borderRadius: 20, background: `${L1_COLOR}22`, border: `1px solid ${L1_COLOR}66`, color: "#14b8a6", fontSize: "0.82rem", fontWeight: 700 }}>
                L1 · Foundation
              </span>
              <span style={{ padding: "6px 16px", borderRadius: 20, background: `${L2_COLOR}22`, border: `1px solid ${L2_COLOR}66`, color: "#a78bfa", fontSize: "0.82rem", fontWeight: 700 }}>
                L2 · Professional
              </span>
            </div>

            {/* Price block */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: "3.5rem", fontWeight: 900, color: priceClr, lineHeight: 1 }}>
                  ${COURSE_PRICE_USD}
                </span>
                <span style={{ fontSize: "1.1rem", color: strikeClr, textDecoration: "line-through", marginLeft: 12 }}>
                  ${COURSE_ORIG_USD}
                </span>
              </div>
              <div style={{ fontSize: "0.82rem", color: phpMuted, marginBottom: 4 }}>
                ≈ {livePhp(COURSE_PRICE_USD)}{" "}
                <span style={{ color: phpSub, fontSize: "0.72rem" }}>(live rate)</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: L1_COLOR, fontWeight: 700 }}>
                Save ${COURSE_ORIG_USD - COURSE_PRICE_USD} · {Math.round((1 - COURSE_PRICE_USD / COURSE_ORIG_USD) * 100)}% off · one-time · no renewals
              </div>
            </div>

            {/* Feature list */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {[
                { accent: "#14b8a6", text: "Level 1 — 28 days: spatial planning, colour theory & material selection" },
                { accent: "#a78bfa", text: "Level 2 — 28 days: construction drawings, 3D rendering & client projects" },
                { accent: L1_COLOR,  text: "2 completion certificates — one per level" },
                { accent: L1_COLOR,  text: "Real portfolio pieces from day one" },
                { accent: L1_COLOR,  text: "Lifetime access · no renewals · no hidden fees" },
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: "0.88rem", color: featureClr }}>
                  <CheckCircle2 size={15} style={{ color: item.accent, flexShrink: 0, marginTop: 2 }} />
                  {item.text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {ownsAll ? (
              <div style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, padding: "10px 16px", display: "flex", justifyContent: "center", alignItems: "center", gap: 8, fontWeight: 600 }}>
                <CheckCircle2 size={16} /> You own the full course
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400, margin: "0 auto" }}>
                {/* Stripe */}
                <button
                  onClick={() => handlePurchase("bundle", "stripe")}
                  disabled={!!loading}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, fontSize: "1rem", padding: "14px 20px", borderRadius: 10, border: "none", background: L1_COLOR, color: "white", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: `0 4px 14px ${L1_COLOR}55` }}
                >
                  <CreditCard size={17} />
                  {loading === "stripe-bundle" ? "Redirecting…" : `Pay with Card · $${COURSE_PRICE_USD} USD`}
                </button>

                {/* PayMongo */}
                <button
                  onClick={() => handlePurchase("bundle", "paymongo")}
                  disabled={!!loading}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, background: "#3b82f6", color: "white", fontSize: "1rem", padding: "14px 20px", borderRadius: 10, border: "none", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: "0 4px 14px rgba(59,130,246,0.4)" }}
                >
                  <Wallet size={17} />
                  {loading === "paymongo-bundle"
                    ? "Redirecting…"
                    : `GCash / PayMaya · ${rate ? formatPhp(Math.round(COURSE_PRICE_USD * rate)) : "..."}`}
                </button>

                <div style={{ fontSize: "0.72rem", color: liveRateClr, textAlign: "center" }}>
                  Live rate: 1 USD = {rate ? `₱${rate.toFixed(2)}` : "..."}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ maxWidth: 680, margin: "0 auto 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "10px 16px", color: "#ef4444", fontSize: "0.88rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Footer note */}
        <div style={{ textAlign: "center", padding: "0 20px 48px", fontSize: "0.78rem", color: footerClr, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Lock size={14} />
          Secure payments via Stripe &amp; PayMongo · Email used at purchase is the only authorized account
        </div>
      </main>

      <ContactSection />
    </div>
  );
}