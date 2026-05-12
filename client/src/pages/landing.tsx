/* ==========================================================================
   Landing Page — Part 1
   Project: AI Sprint · Vibe Coding
   Notes: Imports, level theme config, and AuthModal component
   ========================================================================== */

import { useState, useEffect, useRef } from "react";
import logoImg from "@/ai-sprint-logo.png";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/i18n";
import bannerVideo from "@/assets/Challenge-Badge Trim_small.mp4";
import {
  Mail, Lock, UserCircle, ArrowRight, AlertCircle,
  Eye, EyeOff, X, Send, CheckCircle2,
} from "lucide-react";

const THEME_COLOR = "#0d7c8a";
const L2_COLOR = "#e8820c";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const LEVEL_THEMES = {
  "1": {
    color: THEME_COLOR,
    name: "Basic",
    label: "Basic · Foundation",
    annotation: "AI-VIBE-BASIC",
    days: "28 DAYS",
    tagline: "Learn the core vibe coding workflow for building real tools with AI.",
    heroHeadline: "In 28 days, go from AI-curious to shipping your own vibe-coded tools.",
    heroSub: "Built for beginners and builders who want to ship real projects with AI — without needing a computer science degree.",
    urgency: "423 builders joined the Basic vibe coding track this month",
    cta: "Start the Basic Track →",
    dividerMarks: ["↔ 28 DAYS", "🎯 BASIC TRACK", "15 MIN/DAY"],
    sectionLabel: "AI SPRINT · VIBE CODING · BASIC TRACK",
    sectionH2: "The practical way to start building software with AI in 2026",
  },
  "2": {
    color: L2_COLOR,
    name: "Advanced",
    label: "Advanced · Builder",
    annotation: "AI-VIBE-ADVANCED",
    days: "28 DAYS",
    tagline: "Level up from quick scripts to production-grade AI-powered apps.",
    heroHeadline: "In 28 days, start shipping vibe-coded apps people can actually use.",
    heroSub: "Level 2 is for builders ready to move beyond demos — deployments, databases, and real users on real projects.",
    urgency: "187 builders joined the Advanced vibe coding track this month",
    cta: "Start the Advanced Track →",
    dividerMarks: ["↔ 28 DAYS", "🚀 ADVANCED TRACK", "30 MIN/DAY"],
    sectionLabel: "AI SPRINT · VIBE CODING · ADVANCED TRACK",
    sectionH2: "Build AI-powered apps that feel like real products, not experiments",
  },
};

function AuthModal({ onClose, defaultMode = "register" }: { onClose: () => void; defaultMode?: "login" | "register" }) {
  const { login, register } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purchaseUrl, setPurchaseUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let err: string | null = null;

    if (mode === "login") {
      const res = await login(email, password);
      if (res) {
        err = res.message || String(res);
        if ("purchaseUrl" in res && res.purchaseUrl) setPurchaseUrl(res.purchaseUrl);
      } else { onClose(); return; }
    } else {
      if (!displayName.trim()) {
        setError(t("auth.nameRequired"));
        setLoading(false);
        return;
      }
      const res = await register(email, password, displayName);
      if (res) {
        err = res.message || String(res);
        if ("purchaseUrl" in res && res.purchaseUrl) setPurchaseUrl(res.purchaseUrl);
      } else { onClose(); return; }
    }

    if (err) setError(err);
    setLoading(false);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="lp-modal-overlay" onMouseDown={handleOverlayClick}>
      <div className="lp-modal-card">
        <button className="lp-modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div
          className="auth-logo"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          <img src={logoImg} alt="AI Sprint" className="auth-logo-img" />
          <div className="auth-tagline" style={{ color: "#ddd" }}>
            Build real software. Vibe code with AI. Ship faster.
          </div>
        </div>

        <h1
          className="auth-heading"
          style={{
            color: "white",
            fontSize: "1.75rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          {mode === "login"
            ? "Welcome back to AI Sprint · Vibe Coding"
            : t("auth.createAccount")}
        </h1>

        <p
          className="auth-subtext"
          style={{
            color: "#ccc",
            marginBottom: "1.5rem",
            fontSize: "0.95rem",
            textAlign: "center",
          }}
        >
          {mode === "login" ? t("auth.loginSubtext") : t("auth.signupSubtext")}
        </p>

        {/* ...rest of your AuthModal JSX unchanged... */}
      </div>
    </div>
  );
}

// ── Contact Support Section — AI Sprint · Vibe Coding ──
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setError("Something went wrong. Please try emailing us directly.");
      }
    } catch {
      setError("Network error. Please try emailing us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#111",
      }}
      className="lp-contact-section"
    >
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#0d7c8a",
              background: "rgba(13, 124, 138, 0.1)",
              border: "1px solid rgba(13, 124, 138, 0.2)",
              borderRadius: 20,
              padding: "5px 14px",
              marginBottom: 16,
            }}
          >
            <Mail size={12} /> Contact Support
          </div>
          <h2
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 800,
              color: "white",
              margin: "0 0 12px",
              lineHeight: 1.2,
            }}
          >
            Need help with AI Sprint?
          </h2>
          <p style={{ color: "#888", fontSize: "1rem", margin: 0 }}>
            Send us a message and we’ll get back to you at{" "}
            <a
              href="mailto:support@aisprint.app"
              style={{ color: "#0d7c8a", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              support@aisprint.app
            </a>
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              borderRadius: 16,
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <CheckCircle2 size={48} color="#22c55e" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ color: "white", margin: "0 0 8px", fontSize: "1.2rem" }}>
              Message sent!
            </h3>
            <p style={{ color: "#888", margin: 0 }}>
              We’ll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                marginTop: 20,
                background: "none",
                border: "1px solid #333",
                color: "#888",
                padding: "8px 20px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="lp-contact-form"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <input type="hidden" name="access_key" value="9354c53d-f37d-4c31-845b-88286c03d1d4" />
            <input type="hidden" name="to" value="support@aisprint.app" />
            <input type="hidden" name="subject" value="AI Sprint Vibe Coding Support Request" />
            <input type="hidden" name="from_name" value="AI Sprint Vibe Coding Landing Page" />

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#ef4444",
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: "0.875rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="contact-name"
                className="lp-form-label"
                style={{ fontSize: "0.8rem", fontWeight: 600, color: "#ddd", display: "flex", alignItems: "center", gap: 6 }}
              >
                <UserCircle size={13} /> Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                required
                style={{
                  padding: "11px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.3)",
                  color: "white",
                  fontSize: "0.95rem",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="contact-email"
                className="lp-form-label"
                style={{ fontSize: "0.8rem", fontWeight: 600, color: "#ddd", display: "flex", alignItems: "center", gap: 6 }}
              >
                <Mail size={13} /> Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                style={{
                  padding: "11px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.3)",
                  color: "white",
                  fontSize: "0.95rem",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                htmlFor="contact-message"
                className="lp-form-label"
                style={{ fontSize: "0.8rem", fontWeight: 600, color: "#ddd" }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us what you need help with…"
                required
                rows={5}
                style={{
                  padding: "11px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.3)",
                  color: "white",
                  fontSize: "0.95rem",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  resize: "vertical",
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "13px",
                borderRadius: 8,
                border: "none",
                background: submitting ? "#555" : "#0d7c8a",
                color: "white",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: submitting ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background 0.2s",
                boxShadow: submitting ? "none" : "0 4px 14px rgba(13, 124, 138, 0.35)",
              }}
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

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const [isDark, setIsDark] = useState(true);
  const themeData = LEVEL_THEMES[activeTab];
  const THEME = themeData.color;

  // ── Cursor glow ──────────────────────────────────────────────
  const cursorRef = useRef<HTMLDivElement>(null);

  // ── H1 scramble — re-fires on tab change ─────────────────────
  const [scrambledH1, setScrambledH1] = useState(LEVEL_THEMES["1"].heroHeadline);

  // ── Animated stat counters ────────────────────────────────────
  const [s28, setS28] = useState(0);
  const [s15, setS15] = useState(0);
  const [sEnrolled, setSEnrolled] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsFired = useRef(false);

  // ── Ticker ────────────────────────────────────────────────────
  const TICKS: Record<"1"|"2", string[]> = {
    "1": [
      "⚡ Sarah shipped her first working tool with AI · Day 16",
      "🏆 Daniel unlocked Builder mode · Level 1",
      "✅ Priya finished her prompt library and shipped a working mini app · Day 26",
      "🛠️ Marcus built an internal workflow tool in Week 2",
      "✨ 423 builders joined the Level 1 track this month",
      "🔥 Yuki is on a 10-day build streak · Level 1",
    ],
    "2": [
      "🚀 Sarah deployed her first live AI-powered app",
      "🏆 Daniel unlocked Engineer mode · Level 2",
      "✅ Priya shipped her first production-ready workflow · Week 4",
      "🧩 Marcus connected his app to a real database and API",
      "✨ 187 builders joined the Level 2 track this month",
      "🔥 Yuki is on a 14-day shipping streak · Level 2",
    ],
  };
            {/* Hero */}
      <section className="lp-hero" style={{ position: "relative", zIndex: 1, paddingBottom: "2rem" }}>

        {/* Badge video */}
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center", padding: "0 20px" }}>
          <video autoPlay loop muted playsInline style={{
            width: "100%", maxWidth: "680px", borderRadius: "16px",
            boxShadow: `0 20px 40px rgba(13,124,138,.25)`,
            border: `1px solid rgba(13,124,138,.3)`,
          }}>
            <source src={bannerVideo} type="video/mp4" />
          </video>
        </div>

        <div className="lp-hero-badge" style={{ color: THEME_COLOR, background: "rgba(13,124,138,.1)", borderColor: "rgba(13,124,138,.2)" }}>
          ⚡ Vibe Coding · AI · 28 Days
        </div>

        {/* Identity block */}
        <div style={{
          margin: "1.2rem auto 0", padding: "22px 28px 20px",
          background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.07)",
          borderRadius: "16px", maxWidth: "680px", textAlign: "center", position: "relative",
        }}>
          <div style={{ position:"absolute", top:9, left:14, fontSize:13, fontFamily:"monospace", color:`${THEME}cc`, letterSpacing:"1.5px" }}>
            MODULE No. {themeData.annotation}
          </div>
          <div style={{ position:"absolute", top:9, right:14, fontSize:13, fontFamily:"monospace", color:`${THEME}cc`, letterSpacing:"1.5px" }}>
            {themeData.days}
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: "clamp(1.3rem,4vw,1.9rem)", fontWeight: 900, color: "white", letterSpacing: ".04em", textTransform: "uppercase", lineHeight: 1.2, marginBottom: ".5rem" }}>
              Mastering Vibe Coding with AI
            </div>
            <div style={{ fontSize: ".8rem", color: "#555", letterSpacing: ".06em", marginBottom: ".75rem", fontFamily: "monospace" }}>
              28-DAY CHALLENGE · 15 MIN/DAY · 2 LEVELS
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setActiveTab("1")} style={{
                fontSize: ".82rem", fontWeight: 700, color: THEME_COLOR,
                background: activeTab === "1" ? `${THEME_COLOR}25` : `${THEME_COLOR}12`,
                border: `1px solid ${activeTab === "1" ? THEME_COLOR : `${THEME_COLOR}25`}`,
                borderRadius: 100, padding: "3px 12px", cursor: "pointer", transition: "all 0.2s",
              }}>Builder · Days 1–28</button>
              <button onClick={() => setActiveTab("2")} style={{
                fontSize: ".82rem", fontWeight: 700, color: L2_COLOR,
                background: activeTab === "2" ? `${L2_COLOR}25` : `${L2_COLOR}12`,
                border: `1px solid ${activeTab === "2" ? L2_COLOR : `${L2_COLOR}25`}`,
                borderRadius: 100, padding: "3px 12px", cursor: "pointer", transition: "all 0.2s",
              }}>Engineer · Days 1–28</button>
            </div>
          </div>
        </div>

        {/* Scrambled H1 */}
        <h1 className="lp-hero-h1" style={{ fontFamily: "monospace", letterSpacing: "-.01em" }}>{scrambledH1}</h1>
        <p className="lp-hero-tagline" style={{ color: THEME }}>{themeData.tagline}</p>
        <p className="lp-hero-sub">{themeData.heroSub}</p>

        {/* Level tab buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", margin: "1.5rem 0 1rem", flexWrap: "wrap" }}>
          {(["1", "2"] as const).map((lvl) => {
            const color = LEVEL_THEMES[lvl].color;
            const active = activeTab === lvl;
            return (
              <button key={lvl} onClick={() => setActiveTab(lvl)} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 22px", borderRadius: 100, cursor: "pointer",
                border: `1.5px solid ${active ? color : "rgba(255,255,255,.15)"}`,
                background: active ? `${color}1a` : "transparent",
                color: active ? color : "rgba(255,255,255,.5)",
                fontWeight: 700, fontSize: ".88rem", transition: "all 0.2s",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                {LEVEL_THEMES[lvl].label}
              </button>
            );
          })}
        </div>

        <div className="lp-hero-actions">
          <button className="lp-hero-cta" style={{ background: THEME }} onClick={() => openAuth("register")}>
            {themeData.cta}
          </button>
          {activeTab === "2" && (
            <button className="lp-hero-outline" onClick={() => setActiveTab("1")}>
              Start with Builder first
            </button>
          )}
        </div>

        {/* Urgency pill */}
        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0 0" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: ".45rem",
            background: "rgba(249,115,22,.08)", border: "1px solid rgba(249,115,22,.25)",
            borderRadius: "100px", padding: ".28rem 1rem",
            fontSize: ".72rem", letterSpacing: "1.5px", textTransform: "uppercase",
            color: "#fb923c", fontWeight: 700,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block", animation: "lpPulse 2s infinite" }} />
            {themeData.urgency}
          </div>
        </div>

        {/* Animated stats */}
        <div className="lp-stats" ref={statsRef}>
          <div className="lp-stat"><span className="lp-stat-num">{s28}</span><span className="lp-stat-label">Days</span></div>
          <div className="lp-stat-divider" />
          <div className="lp-stat"><span className="lp-stat-num">{s15}</span><span className="lp-stat-label">Min/Day</span></div>
          <div className="lp-stat-divider" />
          <div className="lp-stat"><span className="lp-stat-num">{sEnrolled}</span><span className="lp-stat-label">Enrolled</span></div>
          <div className="lp-stat-divider" />
          <div className="lp-stat"><span className="lp-stat-num">2</span><span className="lp-stat-label">Levels</span></div>
        </div>
      </section>

      {/* Technical divider 1 */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 24px 40px", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:`${THEME}25` }} />
        <div style={{ display:"flex", gap:10, padding:"0 18px", flexWrap:"wrap", justifyContent:"center" }}>
          {themeData.dividerMarks.map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:`${THEME}99` }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`${THEME}25` }} />
      </div>

      {/* Hero visual cards — builder deliverables */}
      <section style={{ padding:"0 1.5rem 3.5rem", background:"transparent", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ maxWidth:400, width:"100%" }}>
          <div ref={deliverablesScrollRef} data-autoscroll="1" style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}>

            {/* Card 1 — Prompt Library */}
            <div className="lp-deliverable-card c1" style={{ borderRadius:14, overflow:"hidden", borderStyle:"solid", borderWidth:"1px", display:"flex", flexDirection:"column", flex:"0 0 100%", minWidth:0 }}>
              <svg width="100%" height="168" viewBox="0 0 220 168" aria-label="AI builder prompt library deliverable">
                <rect className="svg-bg" width="220" height="168"/>
                <text x="12" y="18" fill="#0d7c8a" fontSize="7" fontFamily="monospace" opacity=".8" letterSpacing="1">BUILDER PROMPT LIBRARY · v1.0</text>
                <line x1="12" y1="22" x2="208" y2="22" stroke="#0a2030" strokeWidth=".5"/>
                {[
                  { y:36, label:"01 · Landing page generator", cat:"MARKETING" },
                  { y:54, label:"02 · Lead capture workflow", cat:"AUTOMATION" },
                  { y:72, label:"03 · Admin dashboard prompt", cat:"DASHBOARD" },
                  { y:90, label:"04 · Client portal scaffolding", cat:"PORTAL" },
                  { y:108, label:"05 · Bug fixing assistant", cat:"DEBUG" },
                  { y:126, label:"06 · App polish checklist", cat:"SHIP" },
                ].map((r,i) => (
                  <g key={i}>
                    <rect x="12" y={r.y-11} width="196" height="14" rx="2" fill={i%2===0 ? "rgba(13,124,138,.06)" : "transparent"}/>
                    <text x="18" y={r.y} fill="#c8c6d8" fontSize="7.5" fontFamily="monospace">{r.label}</text>
                    <rect x="158" y={r.y-10} width="46" height="12" rx="2" fill="rgba(13,124,138,.15)"/>
                    <text x="181" y={r.y} fill="#0d7c8a" fontSize="6" fontFamily="monospace" textAnchor="middle">{r.cat}</text>
                  </g>
                ))}
                <text x="12" y="155" fill="#0d7c8a" fontSize="6" fontFamily="monospace" opacity=".5">AI SPRINT · DAY 26</text>
                <circle cx="206" cy="151" r="4" fill="none" stroke="#0d7c8a" strokeWidth=".6" opacity=".5">
                  <animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", padding:"2px 8px", borderRadius:99, marginBottom:8, background:"rgba(13,124,138,.15)", color:"#0d7c8a" }}>Builder · Week 4</div>
                <div className="lp-hero-card-title" style={{ fontSize:".82rem", fontWeight:700, color:"white", marginBottom:".2rem" }}>AI builder prompt library</div>
                <div className="lp-hero-card-sub" style={{ fontSize:".7rem", color:"#5a587a", letterSpacing:".4px" }}>Day 26 · Your reusable build system</div>
              </div>
            </div>

            {/* Card 2 — Workflow Tool */}
            <div className="lp-deliverable-card c2" style={{ borderRadius:14, overflow:"hidden", borderStyle:"solid", borderWidth:"1px", display:"flex", flexDirection:"column", flex:"0 0 100%", minWidth:0 }}>
              <svg width="100%" height="168" viewBox="0 0 220 168" aria-label="AI workflow builder deliverable">
                <rect className="svg-bg" width="220" height="168"/>
                <text x="110" y="16" textAnchor="middle" fill="#0d7c8a" fontSize="7" fontFamily="monospace" opacity=".7" letterSpacing="1">WORKFLOW BUILDER · LIVE TOOL</text>
                <line x1="12" y1="20" x2="208" y2="20" stroke="#0a2030" strokeWidth=".5"/>
                <rect x="12" y="26" width="196" height="12" rx="2" fill="rgba(13,124,138,.12)"/>
                <text x="18" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">STEP</text>
                <text x="65" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">ACTION</text>
                <text x="162" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">STATE</text>
                <text x="196" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">✓</text>
                {[
                  { date:"01", desc:"Collect form input", amt:"READY", match:true },
                  { date:"02", desc:"Generate AI response", amt:"READY", match:true },
                  { date:"03", desc:"Validate output", amt:"CHECK", match:false },
                  { date:"04", desc:"Save to database", amt:"READY", match:true },
                  { date:"05", desc:"Send result email", amt:"READY", match:true },
                ].map((r,i) => (
                  <g key={i}>
                    <rect x="12" y={42+i*16} width="196" height="14" rx="1" fill={!r.match ? "rgba(239,68,68,.08)" : "transparent"}/>
                    <text x="18" y={52+i*16} fill={r.match ? "#c8c6d8" : "#f87171"} fontSize="6.5" fontFamily="monospace">{r.date}</text>
                    <text x="65" y={52+i*16} fill={r.match ? "#c8c6d8" : "#f87171"} fontSize="6.5" fontFamily="monospace">{r.desc}</text>
                    <text x="162" y={52+i*16} fill={r.match ? "#c8c6d8" : "#f87171"} fontSize="6.5" fontFamily="monospace">{r.amt}</text>
                    <text x="196" y={52+i*16} fill={r.match ? "#10b981" : "#ef4444"} fontSize="9" fontFamily="monospace">{r.match ? "✓" : "!"}</text>
                  </g>
                ))}
                <line x1="12" y1="124" x2="208" y2="124" stroke="#0a2030" strokeWidth=".5"/>
                <rect x="12" y="128" width="196" height="16" rx="3" fill="rgba(13,124,138,.06)" stroke="rgba(13,124,138,.2)" strokeWidth=".4"/>
                <text x="18" y="139" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace">1 output needs review · validation layer recommended</text>
                <text x="12" y="160" fill="#0d7c8a" fontSize="6" fontFamily="monospace" opacity=".5">AI SPRINT · DAY 10</text>
              </svg>
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", padding:"2px 8px", borderRadius:99, marginBottom:8, background:"rgba(13,124,138,.15)", color:"#0d7c8a" }}>Builder · Week 2</div>
                <div className="lp-hero-card-title" style={{ fontSize:".82rem", fontWeight:700, color:"white", marginBottom:".2rem" }}>Workflow automation tool</div>
                <div className="lp-hero-card-sub" style={{ fontSize:".7rem", color:"#5a587a", letterSpacing:".4px" }}>Day 10 · AI logic and validation</div>
              </div>
            </div>

            {/* Card 3 — Shipping Checklist */}
            <div className="lp-deliverable-card c3" style={{ borderRadius:14, overflow:"hidden", borderStyle:"solid", borderWidth:"1px", display:"flex", flexDirection:"column", flex:"0 0 100%", minWidth:0 }}>
              <svg width="100%" height="168" viewBox="0 0 220 168" aria-label="App shipping checklist">
                <rect className="svg-bg" width="220" height="168"/>
                <text x="12" y="18" fill="#e8820c" fontSize="7" fontFamily="monospace" opacity=".8" letterSpacing="1">APP SHIPPING CHECKLIST · v2.0</text>
                <line x1="12" y1="22" x2="208" y2="22" stroke="#2a1200" strokeWidth=".5"/>
                {[
                  { item:"Core UI completed", done:true },
                  { item:"Prompt flow tested", done:true },
                  { item:"Database connected", done:true },
                  { item:"Error states handled", done:true },
                  { item:"Polish and QA pass", done:false },
                  { item:"Deploy to production", done:false },
                ].map((r,i) => (
                  <g key={i}>
                    <rect x="12" y={30+i*18} width="196" height="16" rx="3" fill={r.done ? "rgba(16,185,129,.06)" : "rgba(255,255,255,.02)"} stroke={r.done ? "rgba(16,185,129,.15)" : "rgba(255,255,255,.04)"} strokeWidth=".4"/>
                    <rect x="18" y={33+i*18} width="10" height="10" rx="2" fill={r.done ? "#10b981" : "transparent"} stroke={r.done ? "#10b981" : "#555"} strokeWidth=".8"/>
                    {r.done && <text x="23" y={42+i*18} textAnchor="middle" fill="white" fontSize="7">✓</text>}
                    <text x="36" y={42+i*18} fill={r.done ? "#c8c6d8" : "#888"} fontSize="7.5" fontFamily="monospace" opacity={r.done ? 1 : .7}>{r.item}</text>
                    {r.done && <text x="198" y={42+i*18} fill="#10b981" fontSize="6" fontFamily="monospace" textAnchor="end">DONE</text>}
                  </g>
                ))}
                <rect x="12" y="142" width="196" height="14" rx="3" fill="rgba(232,130,12,.08)" stroke="rgba(232,130,12,.2)" strokeWidth=".5"/>
                <text x="18" y="152" fill="#e8820c" fontSize="6.5" fontFamily="monospace">4/6 complete · Est. ship time: 3 hours</text>
                <text x="12" y="162" fill="#e8820c" fontSize="6" fontFamily="monospace" opacity=".5">AI SPRINT · DAY 16</text>
              </svg>
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", padding:"2px 8px", borderRadius:99, marginBottom:8, background:"rgba(232,130,12,.15)", color:"#e8820c" }}>Engineer · Week 1</div>
                <div className="lp-hero-card-title" style={{ fontSize:".82rem", fontWeight:700, color:"white", marginBottom:".2rem" }}>App shipping checklist</div>
                <div className="lp-hero-card-sub" style={{ fontSize:".7rem", color:"#5a587a", letterSpacing:".4px" }}>Day 16 · From working to launch-ready</div>
              </div>
            </div>

          </div>{/* end scroll */}
          </div>{/* end maxWidth 400 */}
        </div>{/* end maxWidth 900 */}
        <p className="lp-swipe-hint" style={{ textAlign:"center", fontSize:".65rem", color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:".8rem" }}>
          Sample deliverables — built by AI-powered builders in 15 minutes/day
        </p>
      </section>

      {/* What's included */}
      <section className="lp-section" style={{ background: "#0d0d14" }}>
        <div className="lp-section-inner">
          <div className="lp-section-label" style={{ color: THEME }}>{themeData.sectionLabel}</div>
          <h2 className="lp-section-h2">{themeData.sectionH2}</h2>
          <p className="lp-section-sub">
            {activeTab === "1"
              ? "A structured, practical path to building useful tools with AI — without the overwhelm."
              : "Level 2 builds on your foundation so you can architect, refine, and ship AI-powered apps with more confidence."}
          </p>
          <div className="lp-why-grid" ref={cardsRef}>
            {(activeTab === "1" ? [
              { icon: "⏱", color: THEME_COLOR, bg: "rgba(13,124,138,.1)", title: "15 minutes a day", body: "Each lesson is designed to be short, practical, and immediately usable in real build sessions.", delay: "0s" },
              { icon: "🛠", color: "#2f6fa8", bg: "rgba(47,111,168,.1)", title: "Real build workflows", body: "Learn how to use AI for landing pages, tools, dashboards, automations, and polished product flows.", delay: ".12s" },
              { icon: "🚀", color: L2_COLOR, bg: "rgba(232,130,12,.1)", title: "Ship real projects", body: "Leave with reusable prompts, working build systems, and projects you can actually keep improving.", delay: ".24s" },
            ] : [
              { icon: "🧠", color: L2_COLOR, bg: "rgba(232,130,12,.1)", title: "Production thinking", body: "Learn how to move beyond demos and make better decisions around structure, QA, and app reliability.", delay: "0s" },
              { icon: "🏗️", color: "#7c3aed", bg: "rgba(124,58,237,.1)", title: "System design for builders", body: "Understand how AI apps fit together — UI, logic, databases, prompts, validations, and deployment.", delay: ".12s" },
              { icon: "💼", color: "#2f6fa8", bg: "rgba(47,111,168,.1)", title: "Client and product-ready output", body: "Build projects that feel usable, credible, and polished enough for clients, teams, or your own startup ideas.", delay: ".24s" },
            ]).map((c, i) => (
              <div key={i} className="lp-why-card lp-reveal visible"
                style={{ transition: `opacity .65s ease ${c.delay}, transform .65s ease ${c.delay}` }}>
                <div className="lp-why-icon" style={{ color: c.color, background: c.bg, fontSize: "1.4rem", width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:12, marginBottom:"1rem" }}>{c.icon}</div>
                <h3 className="lp-card-title">{c.title}</h3>
                <p className="lp-card-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical divider 2 */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 24px 0", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:"rgba(13,124,138,.15)" }} />
        <div style={{ display:"flex", gap:10, padding:"0 18px" }}>
          {["REF: COURSE OUTCOMES", "SECTION B"].map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:"rgba(13,124,138,.55)" }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:"rgba(13,124,138,.15)" }} />
      </div>

      {/* What you'll learn + Who it's for */}
      <section className="lp-dark-section">
        <div className="lp-section-inner">
          <div className="lp-two-col">
            <div className="lp-col-block">
              <h3 className="lp-col-heading">What you'll learn</h3>
              <ul className="lp-check-list">
                {(activeTab === "1"
                  ? ["Prompting for real build tasks","Using AI to create pages, tools, and workflows","Debugging and improving AI-generated output","Project structure for faster shipping","Build a personal prompt library for repeatable results"]
                  : ["Production-minded AI app workflows","App architecture and system thinking","Better validation, QA, and iteration loops","Deployment-ready build habits","How to turn working prototypes into usable products"]
                ).map((item,i) => (
                  <li key={i} className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="lp-col-block">
              <h3 className="lp-col-heading">Who it's for</h3>
              <ul className="lp-check-list">
                {(activeTab === "1"
                  ? ["No computer science background required","Perfect for beginners, creators, freelancers, and founders","Ideal starting point before the Engineer track"]
                  : ["Builder track graduates","People ready to ship more polished and reliable apps","Freelancers, indie builders, and product-minded creators"]
                ).map((item,i) => (
                  <li key={i} className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum preview — Days 1–7 */}
      <section className="lp-seven-day-section" style={{ padding:"60px 20px", background:"#111", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:THEME_COLOR, background:`rgba(13,124,138,.1)`, border:`1px solid rgba(13,124,138,.2)`, borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
              What You’ll Learn
            </div>
            <h2 style={{ fontSize:"clamp(1.5rem,3.5vw,2rem)", fontWeight:800, color:"white", margin:"0 0 10px" }}>Your first 7 days, previewed</h2>
            <p style={{ color:"#888", fontSize:".92rem" }}>Every lesson is 15 minutes. Every day gets you closer to building real software with AI.</p>
          </div>
          <div ref={sevenDayScrollRef} style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}>
            {(activeTab === "1" ? [
              { day:1, title:"What Vibe Coding Really Is", cat:"Foundations", color:THEME_COLOR },
              { day:2, title:"How to Talk to AI Like a Builder", cat:"Foundations", color:THEME_COLOR },
              { day:3, title:"From Idea to First Working Screen", cat:"Foundations", color:THEME_COLOR },
              { day:4, title:"The Modern AI Build Stack", cat:"Foundations", color:"#2f6fa8" },
              { day:5, title:"Your First Real Build Prompt", cat:"Apply", color:"#2f6fa8" },
              { day:6, title:"Common AI Output Mistakes — and What to Fix", cat:"QA", color:"#2f8c5c" },
              { day:7, title:"Mini-Project: Ship a Simple Working Tool", cat:"Sprint 🏆", color:L2_COLOR },
            ] : [
              { day:1, title:"Advanced Prompting for Better App Output", cat:"Advanced", color:L2_COLOR },
              { day:2, title:"Structuring AI Apps Beyond the Demo", cat:"Architecture", color:L2_COLOR },
              { day:3, title:"Validation, Guardrails, and Better UX", cat:"Quality", color:"#7c3aed" },
              { day:4, title:"Connecting UI, Logic, and Data", cat:"Systems", color:"#2f6fa8" },
              { day:5, title:"From Prototype to Production Flow", cat:"Shipping", color:"#2f6fa8" },
              { day:6, title:"Deployment and Iteration Loops", cat:"Ops", color:"#2f8c5c" },
              { day:7, title:"Mini-Project: Launch an AI-Powered App", cat:"Sprint 🏆", color:L2_COLOR },
            ]).map((d) => (
              <div key={d.day} className="lp-day-card" style={{
                display:"flex", alignItems:"center", gap:"1rem",
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
                borderRadius:12, padding:".85rem 1.2rem",
                flex:"0 0 100%", minWidth:0,
              }}>
                <div style={{ width:34, height:34, borderRadius:"50%", border:`2px solid ${d.color}`, color:d.color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:".72rem", flexShrink:0, fontFamily:"monospace" }}>{d.day}</div>
                <div className="lp-day-title" style={{ flex:1, fontWeight:600, color:"white", fontSize:".88rem" }}>{d.title}</div>
                <div style={{ fontSize:".65rem", fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:d.color, background:`${d.color}18`, borderRadius:100, padding:"3px 10px", whiteSpace:"nowrap" }}>{d.cat}</div>
              </div>
            ))}
          </div>
          <p className="lp-swipe-hint lp-day-hint" style={{ textAlign:"center", fontSize:".65rem", color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:".5rem" }}>← swipe all 7 days →</p>
          <div style={{ textAlign:"center", marginTop:24 }}>
            <button onClick={() => openAuth("register")} style={{ background:"transparent", border:`1px solid ${THEME}80`, color:THEME, padding:"10px 28px", borderRadius:100, fontWeight:700, fontSize:".88rem", cursor:"pointer" }}>
              See all 28 days — start today →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="lp-testi-section" style={{ padding:"60px 20px", background:"#0d0d14", borderTop:"1px solid rgba(255,255,255,.06)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:THEME_COLOR, background:`rgba(13,124,138,.1)`, border:`1px solid rgba(13,124,138,.2)`, borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
              Student Stories
            </div>
            <h2 style={{ fontSize:"clamp(1.5rem,3.5vw,2rem)", fontWeight:800, color:"inherit", margin:"0 0 10px" }}>Real results from builders</h2>
            <p style={{ color:"#888", fontSize:".95rem" }}>People who went from AI-curious to shipping with confidence.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}
            ref={(el) => { (testimonialsRef as any).current = el; (testiScrollRef as any).current = el; }}>
            {[
              { text:"I used to get stuck at the blank-page stage every time I had a product idea. After the sprint, I built and shipped a working internal tool in a weekend. That had never happened before.", name:"Daniel M.", role:"Operations Lead, Sydney", initials:"DM", color:THEME_COLOR, photo:"/assets/testimonials/face-e.png" },
              { text:"I came in with zero technical confidence. By the second week I had a landing page, a lead form, and a simple workflow running. It finally felt like I could build instead of just watch tutorials.", name:"Sarah K.", role:"Freelancer, London", initials:"SK", color:"#2f6fa8", photo: null },
              { text:"The biggest shift was learning how to turn messy AI output into something usable. That one skill alone changed how I work with AI every day.", name:"Yuki S.", role:"Indie Builder, Tokyo", initials:"YS", color:L2_COLOR, photo:"/assets/testimonials/face-f.png" },
            ].map((t, i) => (
              <div key={i} className={`lp-testi-card lp-reveal ${revealTestimonials ? "visible" : ""}`} style={{
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.08)",
                borderRadius:16, padding:"1.4rem 1.5rem",
                display:"flex", flexDirection:"column", gap:"1rem",
                transition:`opacity .65s ease ${i*.15}s, transform .65s ease ${i*.15}s`,
                flex: "0 0 100%", minWidth: 0,
              }}>
                <div style={{ fontSize:".78rem", fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:t.color, background:`${t.color}18`, border:`1px solid ${t.color}33`, borderRadius:100, padding:"3px 10px", width:"fit-content" }}>Vibe Coding · {activeTab === "1" ? "Builder" : "Engineer"}</div>
                <div className="lp-testi-text" style={{ color:"#ddd", fontSize:".88rem", lineHeight:1.7, fontStyle:"italic" }}>"{t.text}"</div>
                <div style={{ display:"flex", alignItems:"center", gap:".7rem", marginTop:"auto" }}>
                  {t.photo
                    ? <img src={t.photo} alt={t.name} style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:`2px solid ${t.color}33` }} />
                    : <div style={{ width:36, height:36, borderRadius:"50%", background:`${t.color}22`, color:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:".78rem", flexShrink:0 }}>{t.initials}</div>
                  }
                  <div>
                    <div className="lp-testi-name" style={{ fontSize:".82rem", fontWeight:700, color:"inherit" }}>{t.name}</div>
                    <div className="lp-testi-role" style={{ fontSize:".72rem", color:"#666" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="lp-swipe-hint" style={{ textAlign:"center", fontSize:".65rem", color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:".5rem" }}>← swipe for more →</p>
        </div>
      </section>

      <ContactSection />

      {/* ── HUMANIZING IMAGE SECTION ── */}
      <section className="lp-human-section" style={{ padding:"60px 20px", background:"#0d0d14", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:"820px", margin:"0 auto", display:"flex", flexDirection:"row", alignItems:"center", gap:"3rem", flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 260px", maxWidth:"100%" }}>
            <img src="/assets/testimonials/face-e.png" alt="Builder using AI to create software"
              style={{ width:"100%", borderRadius:20, objectFit:"cover", objectPosition:"center top",
                boxShadow:"0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(13,124,138,.15)",
                border:"1px solid rgba(13,124,138,.2)" }} />
          </div>
          <div style={{ flex:1, minWidth:240 }}>
            <div style={{ fontSize:".7rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:THEME_COLOR, marginBottom:"1rem" }}>✦ Who this is for</div>
            <h2 style={{ fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, color:"inherit", lineHeight:1.25, marginBottom:"1rem" }}>
              You don’t need to be a traditional developer.<br/>You need to become a confident builder.
            </h2>
            <p style={{ color:"var(--lp-body,#9896b0)", lineHeight:1.75, fontSize:".95rem", marginBottom:"1.25rem" }}>
              AI Sprint Vibe Coding is built for people who want to turn ideas into working software faster — with AI as a creative and technical partner, not a magic shortcut.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:".6rem", marginBottom:"1.5rem" }}>
              {[
                "Perfect for creators, freelancers, founders, and curious beginners",
                "Built around real outputs — landing pages, tools, workflows, and MVPs",
                "15 minutes a day — enough to build steady momentum without burnout",
              ].map((item, i) => (
                <div key={i} style={{ display:"flex", gap:".65rem", alignItems:"flex-start" }}>
                  <span style={{ color:THEME_COLOR, fontWeight:800, flexShrink:0, marginTop:2 }}>✓</span>
                  <span className="lp-human-bullet" style={{ color:"var(--lp-body,#c8c6e0)", fontSize:".9rem", lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => openAuth("register")}
              style={{ background:THEME_COLOR, color:"white", border:"none", padding:".75rem 1.8rem",
                borderRadius:100, fontWeight:700, fontSize:".9rem", cursor:"pointer",
                boxShadow:`0 8px 24px rgba(13,124,138,.3)` }}>
              {themeData.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA divider */}
      <div className="lp-join-banner" style={{ display:"flex", alignItems:"center", padding:"40px 24px 0", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:`rgba(13,124,138,.35)` }}/>
        <div style={{ display:"flex", gap:10, padding:"0 18px" }}>
          {["START TODAY", activeTab === "1" ? "START BUILDER TRACK" : "START ENGINEER TRACK"].map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:THEME_COLOR, opacity:.7 }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`rgba(13,124,138,.35)` }}/>
      </div>

      {/* Final CTA */}
      <section id="lp-cta" className="lp-cta-section" style={{ background: THEME, paddingBottom: "60px" }}>
        <div className="lp-section-inner" style={{ textAlign: "center" }}>
          <h2 className="lp-cta-h2">
            {activeTab === "1" ? "Ready to become an AI-powered builder?" : "Ready to ship more polished AI apps?"}
          </h2>
          <p className="lp-cta-sub" style={{ color:"rgba(255,255,255,.9)", fontWeight:600, fontSize:"1.05rem" }}>
            {activeTab === "1"
              ? "Join 423 builders learning how to create useful software with AI — 15 minutes a day, 28 days, no fluff."
              : "Join 187 builders learning how to turn prototypes into more polished, reliable, launch-ready apps."}
          </p>
          <button className="lp-cta-btn" style={{ background:"#ffffff", color:THEME, fontWeight:"bold" }} onClick={() => openAuth("register")}>
            {themeData.cta}
          </button>
        </div>
      </section>
