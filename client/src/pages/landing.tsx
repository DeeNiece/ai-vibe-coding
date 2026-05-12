// ── AI Sprint · Vibe Coding ────────────────────────────────────────────────
// File: landing.tsx  |  Repo: ai-vibe-coding
// Last updated: May 2026

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
    name: "Builder",
    label: "Level 1 · Builder",
    annotation: "AI-VIBE-BUILDER",
    days: "28 DAYS",
    tagline: "Learn to build real software with AI — even if you do not come from a coding background.",
    heroHeadline: "In 28 days, become the person who can build working tools with AI.",
    heroSub: "Built for operators, freelancers, founders, and curious professionals who want to turn ideas into automations, scripts, and internal tools with AI.",
    urgency: "423 builders enrolled in Level 1 this month",
    cta: "Start Level 1 →",
    dividerMarks: ["↔ 28 DAYS", "⚡ LEVEL 1 · BUILDER", "15 MIN/DAY"],
    sectionLabel: "VIBE CODING · LEVEL 1",
    sectionH2: "The practical way to build software with AI in 2026",
  },
  "2": {
    color: L2_COLOR,
    name: "Engineer",
    label: "Level 2 · Engineer",
    annotation: "AI-VIBE-ENGINEER",
    days: "28 DAYS",
    tagline: "Go from working local tools to deployed, tested, production-ready software with AI.",
    heroHeadline: "In 28 days, become the person who ships production-ready AI-built tools.",
    heroSub: "Level 2 is for builders ready to move beyond local scripts — deployment, databases, APIs, testing, monitoring, and agent-ready systems.",
    urgency: "187 engineers enrolled in Level 2 this month",
    cta: "Start Level 2 →",
    dividerMarks: ["↔ 28 DAYS", "🚀 LEVEL 2 · ENGINEER", "15 MIN/DAY"],
    sectionLabel: "VIBE CODING · LEVEL 2",
    sectionH2: "Build and ship software with AI like a modern product engineer",
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
            Build Software. Use AI. Ship Faster.
          </div>
        </div>

        <h1 className="auth-heading" style={{ color: "white", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem", textAlign: "center" }}>
          {mode === "login" ? "Welcome Back to Vibe Coding" : t("auth.createAccount")}
        </h1>

        <p className="auth-subtext" style={{ color: "#ccc", marginBottom: "1.5rem", fontSize: "0.95rem", textAlign: "center" }}>
          {mode === "login" ? t("auth.loginSubtext") : t("auth.signupSubtext")}
        </p>

        {error && (
          <div className="auth-error" style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        {purchaseUrl && (
          <div className="auth-error" style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <AlertCircle size={14} />
            <span>You may need a valid license. <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 600, color: "#fca5a5" }}>View Pricing →</a></span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {mode === "register" && (
            <div className="auth-field">
              <label htmlFor="modal-name" style={{ color: "white", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                <UserCircle size={14} /> {t("auth.nameLabel")}
              </label>
              <input
                id="modal-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("auth.namePlaceholder")}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="modal-email" style={{ color: "white", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
              <Mail size={14} /> {t("auth.emailLabel")}
            </label>
            <input
              id="modal-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="modal-password" style={{ color: "white", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
              <Lock size={14} /> {t("auth.passwordLabel")}
            </label>
            <div className="auth-pw-wrap" style={{ position: "relative" }}>
              <input
                id="modal-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  mode === "register"
                    ? t("auth.passwordPlaceholder")
                    : t("auth.loginPasswordPlaceholder")
                }
                required
                minLength={mode === "register" ? 6 : 1}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  outline: "none",
                }}
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label="Toggle password visibility"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px",
              background: "#3ab8c8",
              color: "#000",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "10px",
              boxShadow: "0 4px 14px rgba(58, 184, 200, 0.4)",
            }}
          >
            {loading
              ? t("auth.pleaseWait")
              : mode === "login"
              ? t("auth.login")
              : t("auth.createAccountBtn")}
            {!loading && <ArrowRight size={16} />}
          </button>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <div style={{ position: "relative", margin: "20px 0" }}>
              <hr style={{ border: "none", borderTop: "1px solid #444" }} />
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(22, 23, 30, 0.8)",
                  backdropFilter: "blur(10px)",
                  padding: "0 10px",
                  fontSize: "0.75rem",
                  color: "#ccc",
                  fontWeight: 600,
                }}
              >
                OR
              </span>
            </div>

            <a
              href="/api/auth/google"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                background: "#f0f0f0",
                color: "#000",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                width="20"
                alt="Google"
              />
              {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
            </a>
          </div>
        </form>

        <div className="auth-switch" style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.85rem", color: "#ccc" }}>
          {mode === "login" ? (
            <>
              <p>
                {t("auth.noAccount")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError(null);
                    setPurchaseUrl(null);
                  }}
                  style={{ background: "none", border: "none", color: "#3ab8c8", fontWeight: 700, cursor: "pointer", textDecoration: "underline", padding: 0 }}
                >
                  {t("auth.signup")}
                </button>
              </p>

              <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "#aaa" }}>
                Having trouble logging in?{" "}
                <a
                  href="mailto:support@aisprint.app"
                  style={{ textDecoration: "underline", textUnderlineOffset: "2px", color: "#ccc" }}
                >
                  Contact Support
                </a>
              </p>
            </>
          ) : (
            <p>
              {t("auth.hasAccount")}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                  setPurchaseUrl(null);
                }}
                style={{ background: "none", border: "none", color: "#3ab8c8", fontWeight: 700, cursor: "pointer", textDecoration: "underline", padding: 0 }}
              >
                {t("auth.login")}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Contact Support Section (unchanged, but labels made lighter) ──
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
            Need help? We're here.
          </h2>
          <p style={{ color: "#888", fontSize: "1rem", margin: 0 }}>
            Send us a message and we'll get back to you at{" "}
            <a
              href="mailto:support@aisprint.app"
              style={{ color: "#0d7c8a", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              [support@aisprint.app](mailto:support@aisprint.app)
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
              We'll get back to you within 24 hours.
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
            <input type="hidden" name="subject" value="Vibe Coding Sprint Support Request" />
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
                placeholder="Describe your issue or question…"
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
      "⚡ Sarah shipped her first working automation · Day 16",
      "🏆 Daniel unlocked Builder rank · Level 1",
      "✅ Priya finished her prompt library · Day 26",
      "🛠️ Marcus built an internal tool for his team · Week 2",
      "✨ 423 builders enrolled in Level 1 this month",
      "🔥 Yuki is on a 10-day streak · Level 1",
    ],
    "2": [
      "🚀 Sarah deployed her first live app to the internet",
      "🏆 Daniel unlocked Engineer rank · Level 2",
      "✅ Priya built her first full-stack tool · Week 6",
      "🧪 Marcus added tests and monitoring to production",
      "✨ 187 builders enrolled in Level 2 this month",
      "🔥 Yuki is on a 14-day streak · Level 2",
    ],
  };
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  // ── Scroll reveal ─────────────────────────────────────────────
  const [revealCards, setRevealCards] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [revealTestimonials, setRevealTestimonials] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll refs
  const deliverablesScrollRef = useRef<HTMLDivElement>(null);
  const sevenDayScrollRef = useRef<HTMLDivElement>(null);
  const testiScrollRef = useRef<HTMLDivElement>(null);

  function openAuth(mode: "login" | "register" = "register") {
    setAuthMode(mode);
    setShowAuth(true);
  }

  // Cursor glow
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.setProperty("--cx", `${e.clientX}px`);
      el.style.setProperty("--cy", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // H1 scramble — re-fires on tab change
  useEffect(() => {
    const target = LEVEL_THEMES[activeTab].heroHeadline;
    let frame = 0;
    const total = 30;
    const iv = setInterval(() => {
      setScrambledH1(target.split("").map((char, i) => {
        if (char === " ") return " ";
        if (frame / total > i / target.length + 0.1) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      frame++;
      if (frame > total) { setScrambledH1(target); clearInterval(iv); }
    }, 45);
    return () => clearInterval(iv);
  }, [activeTab]);

  // Stat counters
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || statsFired.current) return;
      statsFired.current = true;
      const run = (setter: (v: number) => void, target: number, dur: number) => {
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          setter(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };
      run(setS28, 28, 1000);
      run(setS15, 15, 800);
      run(setSEnrolled, 423, 1200);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Ticker — resets on tab change
  useEffect(() => {
    setTickerIdx(0);
    const iv = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => { setTickerIdx(i => (i + 1) % TICKS[activeTab].length); setTickerVisible(true); }, 350);
    }, 4000);
    return () => clearInterval(iv);
  }, [activeTab]);

  // Scroll reveal — fires once, stays visible across tab changes
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setRevealCards(true);
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [activeTab]);

  // Testimonials reveal
  useEffect(() => {
    const el = testimonialsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setRevealTestimonials(true);
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── AUTO-SCROLL: one card at a time, smooth, works on mobile ──
  useEffect(() => {
    function makeCardScroller(getEl: () => HTMLDivElement | null, intervalMs: number) {
      let timer: ReturnType<typeof setInterval> | null = null;
      let paused = false;
      function advance() {
        const el = getEl();
        if (!el || paused) return;
        const step = el.clientWidth;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        if (atEnd) {
          el.style.scrollBehavior = "auto";
          el.scrollLeft = 0;
          requestAnimationFrame(() => { el.style.scrollBehavior = "smooth"; });
        } else {
          el.style.scrollBehavior = "smooth";
          el.scrollLeft += step;
        }
      }
      function start() { if (timer) return; timer = setInterval(advance, intervalMs); }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      const el = getEl();
      if (el) {
        el.style.scrollBehavior = "smooth";
        el.addEventListener("mouseenter", () => { paused = true; });
        el.addEventListener("mouseleave", () => { paused = false; });
        el.addEventListener("touchstart", () => { paused = true; }, { passive: true });
        el.addEventListener("touchend", () => { setTimeout(() => { paused = false; }, 1500); }, { passive: true });
      }
      start();
      return stop;
    }
    const cleanups = [
      makeCardScroller(() => deliverablesScrollRef.current, 2800),
      makeCardScroller(() => sevenDayScrollRef.current,     2600),
      makeCardScroller(() => testiScrollRef.current,        3200),
    ];
    return () => cleanups.forEach(c => c?.());
  }, []);

  return (
    <div className={`lp-root${isDark ? "" : " lp-light"}`} style={{
      background: isDark ? "#0d0d14" : "#f4f6fb",
      color: isDark ? "#e8e6f4" : "#1a1a2e",
      minHeight: "100vh",
    } as any}>

      {/* Cursor glow — teal */}
      <div ref={cursorRef} style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(600px at var(--cx,50%) var(--cy,50%), rgba(13,124,138,.07), transparent 70%)",
      }} />

      {/* Builder grid background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(13,124,138,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(13,124,138,.03) 1px,transparent 1px)`,
        backgroundSize: "100% 28px, 80px 28px",
        maskImage: "linear-gradient(to bottom,rgba(0,0,0,.55) 0%,transparent 55%)",
        WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,.55) 0%,transparent 55%)",
      }} />

      {/* Live ticker pill */}
      <div className="lp-ticker" style={{
        position:"fixed", bottom:16, left:"50%", transform:"translateX(-50%)",
        zIndex:50, maxWidth:360, width:"calc(100% - 40px)",
        background:"rgba(13,15,26,.92)", border:"1px solid rgba(255,255,255,.1)",
        borderRadius:100, padding:"7px 16px",
        display:"flex", alignItems:"center", gap:10,
        backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" as any,
        boxShadow:"0 4px 24px rgba(0,0,0,.4)",
        opacity: tickerVisible ? 1 : 0, transition:"opacity 0.35s ease" }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:THEME, boxShadow:`0 0 8px ${THEME}`, flexShrink:0, animation:"lpPulse 2s infinite" }}/>
        <span className="lp-ticker-text" style={{ fontSize:".75rem", color:"#aaa", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", flex:1 }}>{TICKS[activeTab][tickerIdx]}</span>
        <span style={{ fontSize:"8px", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:`${THEME_COLOR}99`, flexShrink:0, fontFamily:"monospace" }}>LIVE</span>
      </div>

      <style>{`
        @keyframes lpPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
        .lp-reveal { opacity:0; transform:translateY(24px); transition:opacity .65s ease, transform .65s ease; }
        .lp-reveal.visible { opacity:1; transform:translateY(0); }
        [data-autoscroll]::-webkit-scrollbar { display: none; }

        /* ── DARK MODE ── */
        .lp-root { --lp-body: #c8c6e0; --lp-muted: #9896b0; --lp-card-bg: rgba(255,255,255,.04); --lp-card-border: rgba(255,255,255,.09); }
        .lp-root p, .lp-root li { color: var(--lp-body); }

        /* ── LIGHT MODE ── */
        .lp-light { --lp-body: #374151; --lp-muted: #6b7280; --lp-card-bg: #ffffff; --lp-card-border: rgba(0,0,0,.08); }
        .lp-light section { background: #f4f6fb !important; }
        .lp-light .lp-dark-section { background: #ffffff !important; }
        .lp-light .lp-section { background: #f4f6fb !important; }
        .lp-light .lp-cta-section { background: ${THEME_COLOR} !important; }
        .lp-light h1, .lp-light h2, .lp-light h3 { color: #111827 !important; }
        .lp-light p { color: #374151 !important; }
        .lp-light .lp-hero-sub { color: #4b5563 !important; }
        .lp-light .lp-hero-tagline { color: ${THEME_COLOR} !important; }
        .lp-light .lp-nav { background: rgba(255,255,255,.95) !important; border-bottom: 1px solid rgba(0,0,0,.07); }
        .lp-light .lp-btn-ghost { color: #374151 !important; border-color: rgba(0,0,0,.15) !important; }
        .lp-light .lp-hero-module-card { background: #ffffff !important; border-color: rgba(0,0,0,.09) !important; color: #374151 !important; }
        .lp-light .lp-hero-h1 { color: #111827 !important; }
        .lp-light .lp-hero-outline { color: #374151 !important; border-color: rgba(0,0,0,.2) !important; }
        .lp-light .lp-why-card { background: #ffffff !important; border-color: rgba(13,124,138,.15) !important; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
        .lp-light .lp-card-title { color: #111827 !important; }
        .lp-light .lp-card-body { color: #4b5563 !important; }
        .lp-light .lp-two-col { background: #f4f6fb !important; }
        .lp-light .lp-col-block { background: #ffffff !important; border-color: rgba(0,0,0,.08) !important; box-shadow: 0 2px 12px rgba(0,0,0,.05); }
        .lp-light .lp-col-heading { color: #111827 !important; }
        .lp-light .lp-col-body { color: #4b5563 !important; }
        .lp-light .lp-check-item { color: #374151 !important; }
        .lp-light .lp-check-icon { color: ${THEME_COLOR} !important; }
        .lp-light .lp-seven-day-section { background: #f4f6fb !important; }
        .lp-light .lp-seven-day-section h2 { color: #111827 !important; }
        .lp-light .lp-seven-day-section p { color: #6b7280 !important; }
        .lp-light .lp-day-card { background: #ffffff !important; border-color: rgba(0,0,0,.09) !important; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
        .lp-light .lp-day-title { color: #111827 !important; }
        .lp-light .lp-day-hint { color: #9ca3af !important; }
        .lp-light .lp-testi-section { background: #f4f6fb !important; }
        .lp-light .lp-testi-section h2 { color: #111827 !important; }
        .lp-light .lp-testi-section p { color: #6b7280 !important; }
        .lp-light .lp-testi-card { background: #ffffff !important; border-color: rgba(0,0,0,.08) !important; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
        .lp-light .lp-testi-text { color: #374151 !important; }
        .lp-light .lp-testi-name { color: #111827 !important; }
        .lp-light .lp-testi-role { color: #9ca3af !important; }
        .lp-light .lp-join-banner { color: #111827 !important; }
        .lp-light .lp-join-banner span { color: #374151 !important; }
        .lp-light .lp-contact-section { background: #f4f6fb !important; }
        .lp-light .lp-contact-section h2 { color: #111827 !important; }
        .lp-light .lp-contact-section p { color: #4b5563 !important; }
        .lp-light .lp-contact-form { background: #ffffff !important; border-color: rgba(0,0,0,.08) !important; }
        .lp-light .lp-form-label { color: #374151 !important; }
        .lp-light input, .lp-light textarea { background: #f9fafb !important; color: #111827 !important; border-color: rgba(0,0,0,.12) !important; }
        .lp-light .lp-ticker { background: rgba(255,255,255,.95) !important; border-color: rgba(0,0,0,.1) !important; }
        .lp-light .lp-ticker-text { color: #374151 !important; }
        .lp-light .lp-human-section { background: #ffffff !important; }
        .lp-light .lp-human-section h2 { color: #111827 !important; }
        .lp-light .lp-human-section p { color: #4b5563 !important; }
        .lp-light .lp-human-bullet { color: #374151 !important; }
        .lp-root:not(.lp-light) .lp-swipe-hint { color: #9896b0 !important; }
        .lp-light .lp-swipe-hint { color: #374151 !important; }

        /* deliverable cards */
        .lp-root:not(.lp-light) .lp-deliverable-card { background: #0d0f1a !important; box-shadow: none !important; }
        .lp-root:not(.lp-light) .lp-deliverable-card.c1 { border-color: rgba(13,124,138,0.20) !important; }
        .lp-root:not(.lp-light) .lp-deliverable-card.c2 { border-color: rgba(13,124,138,0.22) !important; }
        .lp-root:not(.lp-light) .lp-deliverable-card.c3 { border-color: rgba(232,130,12,0.18) !important; }
        .lp-root:not(.lp-light) .lp-hero-card-title { color: #e8e6f4 !important; }
        .lp-root:not(.lp-light) .lp-hero-card-sub { color: #9896b0 !important; }
        .lp-root:not(.lp-light) .svg-bg { fill: #050810 !important; }
        .lp-root:not(.lp-light) .svg-inner-bg { fill: #070d18 !important; }
        .lp-root:not(.lp-light) .svg-text { fill: #c8c6d8 !important; }
        .lp-light .lp-deliverable-card { background: #ffffff !important; box-shadow: 0 4px 12px rgba(0,0,0,.05) !important; }
        .lp-light .lp-deliverable-card.c1 { border-color: rgba(13,124,138,0.20) !important; }
        .lp-light .lp-deliverable-card.c2 { border-color: rgba(13,124,138,0.22) !important; }
        .lp-light .lp-deliverable-card.c3 { border-color: rgba(232,130,12,0.18) !important; }
        .lp-light .lp-hero-card-title { color: #111827 !important; }
        .lp-light .lp-hero-card-sub { color: #6b7280 !important; }
        .lp-light .svg-bg { fill: #f4f6fb !important; }
        .lp-light .svg-inner-bg { fill: #ffffff !important; }
        .lp-light .svg-text { fill: #374151 !important; }

        /* ── HERO STATS ── */
        .lp-light .lp-stats { background: rgba(0,0,0,.04) !important; border: 1px solid rgba(0,0,0,.08) !important; backdrop-filter: none !important; }
        .lp-light .lp-stats .lp-stat-num { color: #111827 !important; text-shadow: none !important; }
        .lp-light .lp-stats .lp-stat-label { color: #6b7280 !important; }
        .lp-light .lp-stats .lp-stat-divider { background: rgba(0,0,0,.15) !important; }
        .lp-light .lp-stats .lp-stat { color: #111827 !important; }

        /* ── THEME TOGGLE BUTTON ── */
        .lp-theme-toggle {
          width: 42px; height: 22px; border-radius: 100px;
          border: 1px solid rgba(13,124,138,.4);
          background: rgba(13,124,138,.12);
          cursor: pointer; position: relative;
          display: flex; align-items: center; padding: 0 2px;
          transition: background .3s, border-color .3s;
          flex-shrink: 0;
        }
        .lp-theme-toggle:hover { border-color: ${THEME_COLOR}; }
        .lp-theme-toggle-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: linear-gradient(135deg, #00857a, #00c9b1);
          transition: transform .3s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 2px 5px rgba(0,0,0,.25);
        }
        .lp-theme-toggle.light .lp-theme-toggle-thumb {
          transform: translateX(20px);
          background: linear-gradient(135deg, #f97316, #fdba74);
        }
      `}</style>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultMode={authMode} />}
      {/* Nav */}
      <nav className="lp-nav" style={{ position:"relative", zIndex:10 }}>
        <div className="lp-nav-logo">
          <a href="https://aisprint.app" style={{ display:"flex", alignItems:"center", textDecoration:"none" }}>
            <img src={logoImg} alt="AI Sprint" className="lp-nav-logo-img"/>
          </a>
        </div>
        <div className="lp-nav-actions">
          <button
            className={`lp-theme-toggle${isDark ? "" : " light"}`}
            onClick={() => setIsDark(d => !d)}
            aria-label="Toggle dark/light mode"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="lp-theme-toggle-thumb" />
          </button>
          <button className="lp-btn-ghost" onClick={() => openAuth("login")}>Log In</button>
          <button className="lp-btn-primary" style={{ background: THEME_COLOR }} onClick={() => openAuth("register")}>
            Start Building →
          </button>
        </div>
      </nav>

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
              Build Software with AI
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

        {/* Level tab buttons — same as Architecture */}
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
              Start with Level 1 first
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

      {/* Vibe coding divider 1 */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 24px 40px", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:`${THEME}25` }} />
        <div style={{ display:"flex", gap:10, padding:"0 18px", flexWrap:"wrap", justifyContent:"center" }}>
          {themeData.dividerMarks.map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:`${THEME}99` }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`${THEME}25` }} />
      </div>

      {/* Hero visual cards — vibe coding aesthetic */}
      <section style={{ padding:"0 1.5rem 3.5rem", background:"transparent", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center" }}>
          <div style={{ maxWidth:400, width:"100%" }}>
          <div ref={deliverablesScrollRef} data-autoscroll="1" style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}>

            {/* Card 1 — Prompt Library */}
            <div className="lp-deliverable-card c1" style={{ borderRadius:14, overflow:"hidden", borderStyle:"solid", borderWidth:"1px", display:"flex", flexDirection:"column", flex:"0 0 100%", minWidth:0 }}>
              <svg width="100%" height="168" viewBox="0 0 220 168" aria-label="Vibe coding prompt library deliverable">
                <rect className="svg-bg" width="220" height="168"/>
                <text x="12" y="18" fill="#0d7c8a" fontSize="7" fontFamily="monospace" opacity=".8" letterSpacing="1">VIBE PROMPT LIBRARY · v1.0</text>
                <line x1="12" y1="22" x2="208" y2="22" stroke="#0a2030" strokeWidth=".5"/>
                {[
                  { y:36, label:"01 · File renamer automation", cat:"SCRIPT" },
                  { y:54, label:"02 · CSV cleaner workflow", cat:"DATA" },
                  { y:72, label:"03 · FastAPI hello endpoint", cat:"API" },
                  { y:90, label:"04 · Weather anywhere tool", cat:"API" },
                  { y:108, label:"05 · Streamlit UI starter", cat:"APP" },
                  { y:126, label:"06 · Refactor prompt pattern", cat:"CLEANUP" },
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
                <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", padding:"2px 8px", borderRadius:99, marginBottom:8, background:"rgba(13,124,138,.15)", color:"#0d7c8a" }}>Level 1 · Week 4</div>
                <div className="lp-hero-card-title" style={{ fontSize:".82rem", fontWeight:700, color:"white", marginBottom:".2rem" }}>Vibe coding prompt library</div>
                <div className="lp-hero-card-sub" style={{ fontSize:".7rem", color:"#5a587a", letterSpacing:".4px" }}>Day 26 · Your reusable build system</div>
              </div>
            </div>

            {/* Card 2 — Internal Tool */}
            <div className="lp-deliverable-card c2" style={{ borderRadius:14, overflow:"hidden", borderStyle:"solid", borderWidth:"1px", display:"flex", flexDirection:"column", flex:"0 0 100%", minWidth:0 }}>
              <svg width="100%" height="168" viewBox="0 0 220 168" aria-label="Internal tool workflow">
                <rect className="svg-bg" width="220" height="168"/>
                <text x="110" y="16" textAnchor="middle" fill="#0d7c8a" fontSize="7" fontFamily="monospace" opacity=".7" letterSpacing="1">INTERNAL TOOL · WORKFLOW</text>
                <line x1="12" y1="20" x2="208" y2="20" stroke="#0a2030" strokeWidth=".5"/>
                <rect x="12" y="26" width="196" height="12" rx="2" fill="rgba(13,124,138,.12)"/>
                <text x="18" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">STEP</text>
                <text x="65" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">ACTION</text>
                <text x="162" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">STATUS</text>
                <text x="196" y="35" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace" opacity=".8">✓</text>
                {[
                  { date:"01", desc:"Upload CSV", amt:"Done", match:true },
                  { date:"02", desc:"Clean rows", amt:"Done", match:true },
                  { date:"03", desc:"Run summary", amt:"Flagged", match:false },
                  { date:"04", desc:"Export output", amt:"Done", match:true },
                  { date:"05", desc:"Share result", amt:"Done", match:true },
                ].map((r,i) => (
                  <g key={i}>
                    <rect x="12" y={42+i*16} width="196" height="14" rx="1" fill={!r.match ? "rgba(239,68,68,.08)" : "transparent"}/>
                    <text x="18" y={52+i*16} fill={r.match ? "#c8c6d8" : "#f87171"} fontSize="6.5" fontFamily="monospace">{r.date}</text>
                    <text x="65" y={52+i*16} fill={r.match ? "#c8c6d8" : "#f87171"} fontSize="6.5" fontFamily="monospace">{r.desc}</text>
                    <text x="162" y={52+i*16} fill={r.match ? "#c8c6d8" : "#f87171"} fontSize="6.5" fontFamily="monospace">{r.amt}</text>
                    <text x="196" y={52+i*16} fill={r.match ? "#10b981" : "#ef4444"} fontSize="9" fontFamily="monospace">{r.match ? "✓" : "?"}</text>
                  </g>
                ))}
                <line x1="12" y1="124" x2="208" y2="124" stroke="#0a2030" strokeWidth=".5"/>
                <rect x="12" y="128" width="196" height="16" rx="3" fill="rgba(13,124,138,.06)" stroke="rgba(13,124,138,.2)" strokeWidth=".4"/>
                <text x="18" y="139" fill="#0d7c8a" fontSize="6.5" fontFamily="monospace">AI flagged 1 issue · review output before shipping</text>
                <text x="12" y="160" fill="#0d7c8a" fontSize="6" fontFamily="monospace" opacity=".5">AI SPRINT · DAY 14</text>
              </svg>
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", padding:"2px 8px", borderRadius:99, marginBottom:8, background:"rgba(13,124,138,.15)", color:"#0d7c8a" }}>Level 1 · Week 2</div>
                <div className="lp-hero-card-title" style={{ fontSize:".82rem", fontWeight:700, color:"white", marginBottom:".2rem" }}>Internal team tool</div>
                <div className="lp-hero-card-sub" style={{ fontSize:".7rem", color:"#5a587a", letterSpacing:".4px" }}>Day 14 · Build something useful</div>
              </div>
            </div>

            {/* Card 3 — Production Tool */}
            <div className="lp-deliverable-card c3" style={{ borderRadius:14, overflow:"hidden", borderStyle:"solid", borderWidth:"1px", display:"flex", flexDirection:"column", flex:"0 0 100%", minWidth:0 }}>
              <svg width="100%" height="168" viewBox="0 0 220 168" aria-label="Production tool checklist">
                <rect className="svg-bg" width="220" height="168"/>
                <text x="12" y="18" fill="#e8820c" fontSize="7" fontFamily="monospace" opacity=".8" letterSpacing="1">PRODUCTION TOOL · RELEASE CHECKLIST</text>
                <line x1="12" y1="22" x2="208" y2="22" stroke="#2a1200" strokeWidth=".5"/>
                {[
                  { item:"Deploy app to Railway", done:true },
                  { item:"Add authentication", done:true },
                  { item:"Connect database", done:true },
                  { item:"Write tests", done:true },
                  { item:"Add monitoring", done:false },
                  { item:"Agent-ready docs", done:false },
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
                <text x="18" y="152" fill="#e8820c" fontSize="6.5" fontFamily="monospace">4/6 complete · ready for final polish</text>
                <text x="12" y="162" fill="#e8820c" fontSize="6" fontFamily="monospace" opacity=".5">AI SPRINT · LEVEL 2</text>
              </svg>
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", padding:"2px 8px", borderRadius:99, marginBottom:8, background:"rgba(232,130,12,.15)", color:"#e8820c" }}>Level 2 · Production</div>
                <div className="lp-hero-card-title" style={{ fontSize:".82rem", fontWeight:700, color:"white", marginBottom:".2rem" }}>Production-ready tool</div>
                <div className="lp-hero-card-sub" style={{ fontSize:".7rem", color:"#5a587a", letterSpacing:".4px" }}>Deploy, test, monitor</div>
              </div>
            </div>

          </div>{/* end scroll */}
          </div>{/* end maxWidth 400 */}
        </div>{/* end maxWidth 900 */}
        <p className="lp-swipe-hint" style={{ textAlign:"center", fontSize:".65rem", color:"#555", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:".8rem" }}>
          Sample deliverables — built in 15 minutes/day
        </p>
      </section>

      {/* What's included */}
      <section className="lp-section" style={{ background: "#0d0d14" }}>
        <div className="lp-section-inner">
          <div className="lp-section-label" style={{ color: THEME }}>{themeData.sectionLabel}</div>
          <h2 className="lp-section-h2">{themeData.sectionH2}</h2>
          <p className="lp-section-sub">
            {activeTab === "1"
              ? "A structured, practical path to building real tools with AI — without needing a traditional coding background."
              : "Level 2 builds on your foundation to help you ship deployed, tested, and production-ready software with AI."}
          </p>
          <div className="lp-why-grid" ref={cardsRef}>
            {(activeTab === "1" ? [
              { icon: "⏱", color: THEME_COLOR, bg: "rgba(13,124,138,.1)", title: "15 minutes a day", body: "Each lesson is focused: concept, walkthrough, and one practical build task.", delay: "0s" },
              { icon: "🛠️", color: "#2f6fa8", bg: "rgba(47,111,168,.1)", title: "Real tools, not theory", body: "Build scripts, automations, APIs, and internal tools you can actually use.", delay: ".12s" },
              { icon: "🏆", color: L2_COLOR, bg: "rgba(232,130,12,.1)", title: "Build your prompt system", body: "Leave with reusable prompts, workflows, and a personal AI building process.", delay: ".24s" },
            ] : [
              { icon: "🚀", color: L2_COLOR, bg: "rgba(232,130,12,.1)", title: "Production mindset", body: "Deploy your apps, manage secrets, and make your tools usable beyond your own machine.", delay: "0s" },
              { icon: "🗄️", color: "#7c3aed", bg: "rgba(124,58,237,.1)", title: "Full-stack systems", body: "Work with databases, APIs, frontends, and integrations using AI as your coding partner.", delay: ".12s" },
              { icon: "🧪", color: "#2f6fa8", bg: "rgba(47,111,168,.1)", title: "Reliable shipping", body: "Add testing, monitoring, and agent-ready structure to the tools you build.", delay: ".24s" },
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

      {/* Divider 2 */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 24px 0", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:"rgba(13,124,138,.15)" }} />
        <div style={{ display:"flex", gap:10, padding:"0 18px" }}>
          {["REF: BUILD OUTCOMES", "SECTION B"].map((m,i) => (
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
                  ? ["Prompt AI to generate working scripts","Build automations, APIs, and internal tools","Turn scripts into simple apps with UI","Debug and refactor AI-generated code","Create your own reusable prompt library"]
                  : ["Deploy apps to the cloud","Work with databases and APIs","Build full-stack tools with AI","Add tests, CI, and monitoring","Make tools agent-ready and production-ready"]
                ).map((item,i) => (
                  <li key={i} className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> {item}</li>
                ))}
              </ul>
            </div>
            <div className="lp-col-block">
              <h3 className="lp-col-heading">Who it's for</h3>
              <ul className="lp-check-list">
                {(activeTab === "1"
                  ? ["No traditional coding background required","Perfect for operators, freelancers, and curious builders","Ideal starting point before Level 2"]
                  : ["Level 1 builders ready to go further","Founders, makers, and technical operators","Anyone who wants to ship production-ready tools with AI"]
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
              What You'll Learn
            </div>
            <h2 style={{ fontSize:"clamp(1.5rem,3.5vw,2rem)", fontWeight:800, color:"white", margin:"0 0 10px" }}>Your first 7 days, previewed</h2>
            <p style={{ color:"#888", fontSize:".92rem" }}>Every lesson is 15 minutes. Every day builds your vibe coding toolkit.</p>
          </div>
          <div ref={sevenDayScrollRef} style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}>
            {(activeTab === "1" ? [
              { day:1, title:"What Is Vibe Coding? AI as Partner, Not Search", cat:"Learn", color:THEME_COLOR },
              { day:2, title:"Your First Working Script From One Prompt", cat:"Apply", color:THEME_COLOR },
              { day:3, title:"Reading AI Code You Didn't Write", cat:"Learn", color:THEME_COLOR },
              { day:4, title:"The 3-Part Vibe Prompt", cat:"Learn", color:"#2f6fa8" },
              { day:5, title:"Set Up Your Sandbox: Replit, VS Code, or Cursor", cat:"Apply", color:"#2f6fa8" },
              { day:6, title:"The AI Made a Bug — Now What?", cat:"Apply", color:"#2f8c5c" },
              { day:7, title:"Sprint: Build a Working Automation", cat:"Sprint 🏆", color:L2_COLOR },
            ] : [
              { day:1, title:"From Local to Cloud: Why Deploy?", cat:"Learn", color:L2_COLOR },
              { day:2, title:"Your First Deployment: Railway or Render", cat:"Deploy", color:L2_COLOR },
              { day:3, title:"Secrets Management in Production", cat:"Secure", color:"#7c3aed" },
              { day:4, title:"Version Control with AI Assistance", cat:"Learn", color:"#2f6fa8" },
              { day:5, title:"GitHub as Portfolio", cat:"Deploy", color:"#2f6fa8" },
              { day:6, title:"Adding Authentication to Your Apps", cat:"Secure", color:"#2f8c5c" },
              { day:7, title:"Sprint: Deploy a Live, Shareable Tool", cat:"Sprint 🏆", color:L2_COLOR },
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
            <h2 style={{ fontSize:"clamp(1.5rem,3.5vw,2rem)", fontWeight:800, color:"inherit", margin:"0 0 10px" }}>Real results from builders using AI</h2>
            <p style={{ color:"#888", fontSize:".95rem" }}>People who went from AI-curious to shipping real tools.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}
            ref={(el) => { (testimonialsRef as any).current = el; (testiScrollRef as any).current = el; }}>
            {[
              { text:"I had never really built software before. By the end of the sprint, I had a working internal tool my team actually uses every week. That changed how I see myself.", name:"Daniel M.", role:"Operations Lead, Sydney", initials:"DM", color:THEME_COLOR, photo:"/assets/testimonials/face-e.png" },
              { text:"I came in skeptical. I thought AI coding was hype. By Day 14 I had built two working automations and finally understood how to direct AI instead of just asking random questions.", name:"Sarah K.", role:"Freelancer, London", initials:"SK", color:"#2f6fa8", photo: null },
              { text:"Level 2 was the shift for me. Deployment, testing, and monitoring made me stop thinking in scripts and start thinking in products.", name:"Yuki S.", role:"Startup Operator, Tokyo", initials:"YS", color:L2_COLOR, photo:"/assets/testimonials/face-f.png" },
            ].map((t, i) => (
              <div key={i} className={`lp-testi-card lp-reveal ${revealTestimonials ? "visible" : ""}`} style={{
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.08)",
                borderRadius:16, padding:"1.4rem 1.5rem",
                display:"flex", flexDirection:"column", gap:"1rem",
                transition:`opacity .65s ease ${i*.15}s, transform .65s ease ${i*.15}s`,
                flex: "0 0 100%", minWidth: 0,
              }}>
                <div style={{ fontSize:".78rem", fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:t.color, background:`${t.color}18`, border:`1px solid ${t.color}33`, borderRadius:100, padding:"3px 10px", width:"fit-content" }}>Vibe Coding · {activeTab === "1" ? "Level 1" : "Level 2"}</div>
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
              You do not need to be an engineer.<br/>You need to learn how to build with AI.
            </h2>
            <p style={{ color:"var(--lp-body,#9896b0)", lineHeight:1.75, fontSize:".95rem", marginBottom:"1.25rem" }}>
              AI Sprint Vibe Coding is built for people who want to turn ideas into working tools, automations, and apps with AI — fast.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:".6rem", marginBottom:"1.5rem" }}>
              {[
                "Perfect for operators, freelancers, founders, and curious builders",
                "Built around real outputs — scripts, apps, APIs, and internal tools",
                "15 minutes a day — enough to build momentum fast",
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
          {["START TODAY", activeTab === "1" ? "START LEVEL 1" : "START LEVEL 2"].map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:THEME_COLOR, opacity:.7 }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`rgba(13,124,138,.35)` }}/>
      </div>

      {/* Final CTA */}
      <section id="lp-cta" className="lp-cta-section" style={{ background: THEME, paddingBottom: "60px" }}>
        <div className="lp-section-inner" style={{ textAlign: "center" }}>
          <h2 className="lp-cta-h2">
            {activeTab === "1" ? "Ready to build your first real tools with AI?" : "Ready to ship production-ready software with AI?"}
          </h2>
          <p className="lp-cta-sub" style={{ color:"rgba(255,255,255,.9)", fontWeight:600, fontSize:"1.05rem" }}>
            {activeTab === "1"
              ? "Join 423 builders learning to create automations, scripts, and apps with AI — 15 minutes a day, 28 days, no fluff."
              : "Join 187 builders learning to deploy, test, and ship production-ready tools with AI."}
          </p>
          <button className="lp-cta-btn" style={{ background:"#ffffff", color:THEME, fontWeight:"bold" }} onClick={() => openAuth("register")}>
            {themeData.cta}
          </button>
        </div>
      </section>

    </div>
  );
}
