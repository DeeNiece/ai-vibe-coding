// ── AI Sprint · Vibe Coding & IOP ────────────────────────────────────────────────
// File: landing.tsx | Repo: ai-vibe-coding
// Last updated: May 2026
// Hero: Cinematic full-bleed (Hero_Image_AI_Vibe_Coding.webp)
//       Image path: client/public/assets/Hero_Image_AI_Vibe_Coding.webp
// Dark mode: locked — toggle hidden, all light-mode CSS preserved & reversible
// Contact: /api/contact → Resend (RESEND_API_KEY in Railway env vars)
//
// ⚠️  RAILWAY REMINDER: Add RESEND_API_KEY to this service's environment variables

import { useState, useEffect, useRef } from "react";
import logoImg from "@assets/ai-sprint-logo.jpg";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/i18n";
import {
  Mail, Lock, UserCircle, ArrowRight, AlertCircle,
  Eye, EyeOff, X, Brain, BarChart2, Shield,
  BookOpen, Target, Layers, Send, CheckCircle2,
} from "lucide-react";

const L1_COLOR = "#0d7c8a";
const L2_COLOR = "#d97706";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

// ── Auth Modal ────────────────────────────────────────────────────
function AuthModal({ onClose, defaultLevel, defaultMode = "register", isDark = true }: { onClose: () => void; defaultLevel: "1" | "2"; defaultMode?: "login" | "register"; isDark?: boolean }) {
  const { login, register } = useAuth();
  const { t } = useLanguage();
  const THEME = defaultLevel === "2" ? L2_COLOR : L1_COLOR;

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
    setPurchaseUrl(null);
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
    <div className={`lp-modal-overlay${isDark ? " lp-root" : " lp-root lp-light"}`} onMouseDown={handleOverlayClick}>
      <div className="lp-modal-card">
        <button className="lp-modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>

        {/* Logo & tagline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <img src={logoImg} alt="AI Sprint" className="auth-logo-img" />
          <div className="auth-tagline">Learn AI Fast. Design Better Forever.</div>
        </div>

        <h1 className="auth-heading" style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem", textAlign: "center" }}>
          {mode === "login"
            ? `Welcome back to ${defaultLevel === "2" ? "Level 2 Advanced" : "Level 1 Basic"}`
            : t("auth.createAccount")
          }
        </h1>

        <p className="auth-subtext" style={{ marginBottom: "1.5rem", fontSize: "0.95rem", textAlign: "center" }}>
          {mode === "login"
            ? defaultLevel === "2"
              ? "Level 2 is for professionals ready to build full-stack AI apps, agents, and production systems. systems, and professional applications."
              : "Build the AI design skills that help you create concepts, prompts, and presentations faster."
            : t("auth.signupSubtext")
          }
        </p>

        {/* Error messages */}
        {error && (
          <div className="auth-error" style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {purchaseUrl && (
          <div className="auth-error" style={{ color: "#ef4444", display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <AlertCircle size={14} />
            <span>
              You may need a valid license for this level.{" "}
              <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 600, color: "#fca5a5" }}>
                View Pricing & Upgrades →
              </a>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {mode === "register" && (
            <div className="auth-field">
              <label htmlFor="modal-name" className="auth-label" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                <UserCircle size={14} /> {t("auth.nameLabel")}
              </label>
              <input
                id="modal-name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("auth.namePlaceholder")}
                required
                className="auth-input"
                style={{ width: "100%", padding: "12px", borderRadius: "8px", outline: "none" }}
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="modal-email" className="auth-label" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
              <Mail size={14} /> {t("auth.emailLabel")}
            </label>
            <input
              id="modal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="auth-input"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", outline: "none" }}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="modal-password" className="auth-label" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
              <Lock size={14} /> {t("auth.passwordLabel")}
            </label>
            <div className="auth-pw-wrap" style={{ position: "relative" }}>
              <input
                id="modal-password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="auth-input"
                style={{ width: "100%", padding: "12px", borderRadius: "8px", outline: "none" }}
              />
              <button
                type="button"
                className="pw-toggle auth-pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer" }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit"
            style={{ background: THEME, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px", boxShadow: `0 4px 14px ${THEME}66`, color: "white" }}
            disabled={loading}
          >
            {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create Account"}
            {!loading && <ArrowRight size={16} />}
          </button>

          <div className="auth-divider" style={{ position: "relative", margin: "25px 0" }}>
            <hr className="auth-divider-line" style={{ border: "none" }} />
            <span className="auth-divider-label" style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", padding: "0 15px", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "1px" }}>OR</span>
          </div>

          <a
            href="/api/auth/google"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", width: "100%", padding: "12px", borderRadius: "8px", background: "#f0f0f0", color: "#000", fontWeight: "bold", textDecoration: "none", transition: "transform 0.2s" }}
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
            {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
          </a>
        </form>

        <div className="auth-footer-text" style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.9rem" }}>
          {mode === "login" ? (
            <>
              <p>
                Don't have an account?{" "}
                <button onClick={() => { setMode("register"); setError(null); setPurchaseUrl(null); }} style={{ background: "none", border: "none", color: THEME, fontWeight: 700, cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                  Sign up
                </button>
              </p>
              <p style={{ marginTop: "1rem" }}>
                Having trouble?{" "}
                <a href="mailto:support@aisprint.app" style={{ textDecoration: "underline", color: "#aaa" }}>Contact Support</a>
              </p>
            </>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => { setMode("login"); setError(null); setPurchaseUrl(null); }} style={{ background: "none", border: "none", color: THEME, fontWeight: 700, cursor: "pointer", textDecoration: "underline", padding: 0 }}>
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Contact Section (unchanged, but label colors improved) ──────
function ContactSection({ theme }: { theme: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    fd.get("name")    as string,
          email:   fd.get("email")   as string,
          message: fd.get("message") as string,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) { setSubmitted(true); form.reset(); }
      else setError(json.error || "Something went wrong. Please email support@aisprint.app");
    } catch {
      setError("Network error. Please email support@aisprint.app directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="lp-contact-section" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: theme, background: `${theme}1a`, border: `1px solid ${theme}33`, borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>
            <Mail size={12} /> Contact Support
          </div>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, color: "inherit", margin: "0 0 12px", lineHeight: 1.2 }}>Need help with the course? We're here.</h2>
          <p style={{ color: "#888", fontSize: "1rem", margin: 0 }}>
            Send us a message and we'll get back to you at{" "}
            <a href="mailto:support@aisprint.app" style={{ color: theme, textDecoration: "underline", textUnderlineOffset: 3 }}>support@aisprint.app</a>
          </p>
        </div>
        {submitted ? (
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
            <CheckCircle2 size={48} color="#22c55e" style={{ margin: "0 auto 16px" }} />
            <h3 className="lp-contact-success-title" style={{ margin: "0 0 8px", fontSize: "1.2rem" }}>Message sent!</h3>
            <p className="lp-contact-success-text" style={{ margin: 0 }}>We'll get back to you within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} style={{ marginTop: 20, background: "none", border: "1px solid #333", color: "#888", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem" }}>Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="lp-contact-form" style={{ borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
            {/* contact sent via /api/contact → Resend */}
            {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "10px 14px", borderRadius: 8, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 8 }}><AlertCircle size={14} /> {error}</div>}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label className="lp-form-label" style={{ fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><UserCircle size={13} /> Your Name</label>
              <input type="text" name="name" placeholder="Jane Doe" required className="lp-contact-input" style={{ padding: "11px 14px", borderRadius: 8, fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label className="lp-form-label" style={{ fontSize: "0.8rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Mail size={13} /> Your Email</label>
              <input type="email" name="email" placeholder="you@example.com" required className="lp-contact-input" style={{ padding: "11px 14px", borderRadius: 8, fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label className="lp-form-label" style={{ fontSize: "0.8rem", fontWeight: 600 }}>Message</label>
              <textarea name="message" placeholder="Describe your issue or question..." required rows={5} className="lp-contact-input lp-contact-textarea" style={{ padding: "11px 14px", borderRadius: 8, fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }} />
            </div>
            <button type="submit" disabled={submitting} style={{ padding: "13px", borderRadius: 8, border: "none", background: submitting ? "#555" : theme, color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s", boxShadow: submitting ? "none" : `0 4px 14px ${theme}55` }}>
              <Send size={15} />
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
// ── Landing Page (unchanged except AuthModal integration) ────────
export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authLevel, setAuthLevel] = useState<"1" | "2">("1");
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const THEME = activeTab === "2" ? L2_COLOR : L1_COLOR;

  // ── Cursor glow ──────────────────────────────────────────────
  const cursorRef = useRef<HTMLDivElement>(null);

  // ── H1 scramble — re-fires on tab change ─────────────────────
  const H1s = {
    "1": "In 28 days, go from curious to confident with AI for vibe coding and IOP.",
    "2": "In 28 days, become the Composer who designs, deploys, and orchestrates production AI systems.",
  };
  const [scrambledH1, setScrambledH1] = useState(H1s["1"]);

  // ── Animated stat counters ────────────────────────────────────
  const [s28, setS28] = useState(0);
  const [s15, setS15] = useState(0);
  const [s2, setS2] = useState(0);
  const [s0, setS0] = useState(1);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsFired = useRef(false);

  // ── Ticker ────────────────────────────────────────────────────
  const TICKS: Record<"1"|"2", string[]> = {
    "1": [
      "Sarah shipped her first automation script · Day 7",
      "James completed his first vibe coding sprint · Crafter",
      "3 new professionals enrolled in the Crafter track today",
      "Emily built her first internal tool · Week 2",
      "Dee is on a 9-day streak · Crafter track",
    ],
    "2": [
      "Sarah deployed her first full-stack AI app · Composer",
      "James unlocked Agent Architect rank · Composer",
      "Professionals joined the Composer track this month",
      "Emily shipped her first autonomous agent · Week 3",
      "Dee is on a 14-day streak · Composer track",
    ],
  };
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  // ── Scroll reveal ─────────────────────────────────────────────
  const [revealCards, setRevealCards] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [revealTestimonials, setRevealTestimonials] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  // ── Theme from shared context — syncs instantly with Nav toggle ───────────
  const { theme: _themeRaw, toggle: _toggleTheme } = useTheme();
  // Dark mode locked — always dark, toggle hidden. All lp-light CSS preserved & reversible.
  const isDark = true;
  const toggleTheme = () => {}; // no-op — re-enable to restore toggle
  const testiScrollRef = useRef<HTMLDivElement>(null);

  function openAuth(level: "1" | "2", mode: "login" | "register" = "register") {
    setAuthLevel(level);
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
    const target = H1s[activeTab];
    let frame = 0;
    const total = 28;
    const iv = setInterval(() => {
      setScrambledH1(target.split("").map((char, i) => {
        if (char === " ") return " ";
        if (frame / total > i / target.length + 0.1) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      frame++;
      if (frame > total) { setScrambledH1(target); clearInterval(iv); }
    }, 40);
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
      run(setS2, 2, 600);
      run(setS0, 0, 400);
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

  // Scroll reveal — feature cards
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setRevealCards(true);
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [activeTab]);

  // Scroll reveal — testimonials
  useEffect(() => {
    const el = testimonialsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setRevealTestimonials(true);
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── AUTO-SCROLL testimonials: one card at a time ──
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    let paused = false;
    function advance() {
      const el = testiScrollRef.current;
      if (!el || paused) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.style.scrollBehavior = "auto"; el.scrollLeft = 0;
        requestAnimationFrame(() => { el.style.scrollBehavior = "smooth"; });
      } else { el.style.scrollBehavior = "smooth"; el.scrollLeft += el.clientWidth; }
    }
    const el = testiScrollRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.addEventListener("mouseenter", () => { paused = true; });
      el.addEventListener("mouseleave", () => { paused = false; });
      el.addEventListener("touchstart", () => { paused = true; }, { passive: true });
      el.addEventListener("touchend", () => { setTimeout(() => { paused = false; }, 1500); }, { passive: true });
    }
    timer = setInterval(advance, 3200);
    return () => { if (timer) clearInterval(timer); };
  }, []);

  return (
    <div className={`lp-root${isDark ? "" : " lp-light"}`} style={{ "--color-primary": THEME, background: isDark ? "#0d0d14" : "#f4f6fb", color: isDark ? "#e8e6f4" : "#1a1a2e", minHeight: "100vh" } as any}>

      {/* Cursor glow */}
      <div ref={cursorRef} style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(600px at var(--cx,50%) var(--cy,50%), ${THEME}12, transparent 70%)`,
        transition: "background 0.4s ease",
      }} />

      {/* Circuit grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(${THEME}06 1px,transparent 1px),linear-gradient(90deg,${THEME}06 1px,transparent 1px)`,
        backgroundSize: "36px 36px",
        maskImage: "linear-gradient(to bottom,rgba(0,0,0,.6) 0%,transparent 55%)",
        WebkitMaskImage: "linear-gradient(to bottom,rgba(0,0,0,.6) 0%,transparent 55%)",
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
        <span style={{ fontSize:"8px", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:`${THEME}99`, flexShrink:0, fontFamily:"monospace" }}>LIVE</span>
      </div>

      <style>{`
        @keyframes lpPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
        @keyframes lpHeroReveal { from{transform:scale(1.06);opacity:.7} to{transform:scale(1);opacity:1} }
        @keyframes lpRise { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        /* Portrait mobile — show ~1/5 of face on right */
        @media(max-width:768px) and (orientation:portrait){
          .lp-vibe-cin-bg{ background-position:55% center !important; }
        }
        /* Landscape mobile */
        @media(max-width:900px) and (orientation:landscape){
          .lp-vibe-cin-bg{ background-position:70% center !important; }
          .lp-vibe-cin-content{ padding:5rem 1.4rem 4rem !important; }
        }
        /* scramble target — reserve space to prevent layout shift */
        .lp-vibe-cin-h1 { display:block; min-height:0.97em; line-height:0.97; }
        .lp-reveal { opacity:0; transform:translateY(24px); transition:opacity .65s ease, transform .65s ease; }
        .lp-reveal.visible { opacity:1; transform:translateY(0); }
        [data-autoscroll]::-webkit-scrollbar { display: none; }

        /* ── DARK MODE base variables ── */
        .lp-root { --lp-body: #c8c6e0; --lp-muted: #9896b0; --lp-card-bg: rgba(255,255,255,.04); --lp-card-border: rgba(255,255,255,.09); --lp-tab-border: rgba(255,255,255,0.15); --lp-tab-inactive: rgba(255,255,255,0.5); }
        .lp-root p, .lp-root li { color: var(--lp-body); }

        /* ── Dark mode section backgrounds ── */
        .lp-root .lp-section { background: #0d0d14; }
        .lp-root .lp-contact-section { background: #111; }
        .lp-root .lp-testi-section { background: #0d0d14; }
        .lp-root .lp-human-section { background: #0d0d14; }

        /* ── Dark mode: Auth Modal ── */
        .lp-modal-card { background: rgba(16,17,28,0.96); color: #e8e6f4; }
        .auth-tagline { color: #bbb; }
        .auth-heading { color: #ffffff; }
        .auth-subtext { color: #aaa; }
        .auth-label { color: #ddd; }
        .auth-input { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); color: #fff; }
        .auth-input::placeholder { color: rgba(255,255,255,0.4); }
        .auth-pw-toggle { color: #aaa; }
        .auth-divider-line { border-top: 1px solid rgba(255,255,255,0.1); }
        .auth-divider-label { background: rgba(16,17,28,0.96); color: #999; }
        .auth-footer-text { color: #aaa; }
        .auth-footer-text a { color: #888; }

        /* ── Dark mode: Contact form ── */
        .lp-root .lp-contact-form { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); }
        .lp-root .lp-form-label { color: #ccc; }
        .lp-root .lp-contact-input { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; }

        /* ── LIGHT MODE ── */
        .lp-light { --lp-body: #374151; --lp-muted: #6b7280; --lp-card-bg: #ffffff; --lp-card-border: rgba(0,0,0,.08); --lp-tab-border: rgba(0,0,0,0.15); --lp-tab-inactive: #6b7280; }
        .lp-light section { background: #f4f6fb !important; }
        .lp-light .lp-dark-section { background: #ffffff !important; }
        .lp-light .lp-section { background: #f4f6fb !important; }
        .lp-light .lp-cta-section { background: var(--color-primary) !important; }
        .lp-light h1, .lp-light h2, .lp-light h3 { color: #111827 !important; }
        .lp-light p { color: #374151 !important; }
        .lp-light .lp-hero-sub { color: #4b5563 !important; }
        .lp-light .lp-hero-tagline { color: var(--color-primary) !important; }
        .lp-light .lp-nav { background: rgba(255,255,255,.95) !important; border-bottom: 1px solid rgba(0,0,0,.07); }
        .lp-light .lp-btn-ghost { color: #374151 !important; border-color: rgba(0,0,0,.15) !important; }
        .lp-light .lp-hero-module-card { background: #ffffff !important; border-color: rgba(0,0,0,.09) !important; color: #374151 !important; }
        .lp-light .lp-hero-h1 { color: #111827 !important; }
        .lp-light .lp-hero-outline { color: #374151 !important; border-color: rgba(0,0,0,.2) !important; }
        .lp-light .lp-why-card { background: #ffffff !important; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
        .lp-light .lp-card-title { color: #111827 !important; }
        .lp-light .lp-card-body { color: #4b5563 !important; }
        .lp-light .lp-two-col { background: #f4f6fb !important; }
        .lp-light .lp-col-block { background: #ffffff !important; border-color: rgba(0,0,0,.08) !important; box-shadow: 0 2px 12px rgba(0,0,0,.05); }
        .lp-light .lp-col-heading { color: #111827 !important; }
        .lp-light .lp-col-body { color: #4b5563 !important; }
        .lp-light .lp-check-item { color: #374151 !important; }
        .lp-light .lp-check-icon { color: var(--color-primary) !important; }
        .lp-light .lp-testi-section { background: #f4f6fb !important; border-top-color: rgba(0,0,0,.06) !important; }
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
        .lp-light .lp-form-label { color: #374151 !important; }
        .lp-light input:not([type="hidden"]), .lp-light textarea { background: #f9fafb !important; color: #111827 !important; border-color: rgba(0,0,0,.12) !important; }
        .lp-light .lp-ticker { background: rgba(255,255,255,.95) !important; border-color: rgba(0,0,0,.1) !important; }
        .lp-light .lp-ticker-text { color: #374151 !important; }
        .lp-light .lp-human-section { background: #ffffff !important; }
        .lp-light .lp-human-section h2 { color: #111827 !important; }
        .lp-light .lp-human-section p { color: #4b5563 !important; }
        .lp-light .lp-human-bullet { color: #374151 !important; }
        .lp-root:not(.lp-light) .lp-swipe-hint { color: #9896b0 !important; }
        .lp-light .lp-swipe-hint { color: #6b7280 !important; }

        /* Light mode: Auth Modal */
        .lp-light .lp-modal-card { background: #ffffff !important; color: #111827 !important; }
        .lp-light .auth-tagline { color: #6b7280 !important; }
        .lp-light .auth-heading { color: #111827 !important; }
        .lp-light .auth-subtext { color: #4b5563 !important; }
        .lp-light .auth-label { color: #374151 !important; }
        .lp-light .auth-input { background: #f9fafb !important; border: 1px solid rgba(0,0,0,0.14) !important; color: #111827 !important; }
        .lp-light .auth-input::placeholder { color: rgba(0,0,0,0.35) !important; }
        .lp-light .auth-pw-toggle { color: #6b7280 !important; }
        .lp-light .auth-divider-line { border-top: 1px solid rgba(0,0,0,0.1) !important; }
        .lp-light .auth-divider-label { background: #ffffff !important; color: #6b7280 !important; }
        .lp-light .auth-footer-text { color: #4b5563 !important; }
        .lp-light .auth-footer-text a { color: #6b7280 !important; }
        .lp-light .lp-modal-close { color: #6b7280 !important; }
        .lp-light .lp-modal-close:hover { color: #111827 !important; }

        /* Light mode: Contact form */
        .lp-light .lp-contact-form { background: #ffffff !important; border: 1px solid rgba(0,0,0,.08) !important; box-shadow: 0 10px 30px rgba(0,0,0,.05) !important; }
        .lp-light .lp-contact-input { background: #f9fafb !important; border: 1px solid rgba(0,0,0,.12) !important; color: #111827 !important; }
        .lp-contact-input::placeholder { color: rgba(255,255,255,0.4); }
        .lp-light .lp-contact-input::placeholder { color: rgba(17,17,17,0.4) !important; }
        .lp-light .lp-contact-input { box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
        .lp-contact-input:focus { border-color: var(--color-primary) !important; box-shadow: 0 0 0 3px rgba(0,0,0,0.08); }

        /* 7-day preview */
        .lp-light .lp-seven-day-section { background: #f4f6fb !important; }
        .lp-light .lp-seven-day-section h2 { color: #111827 !important; }
        .lp-light .lp-seven-day-section p { color: #6b7280 !important; }
        .lp-light .lp-day-card { background: #ffffff !important; border-color: rgba(0,0,0,.09) !important; box-shadow: 0 2px 8px rgba(0,0,0,.05); }
        .lp-light .lp-day-title { color: #111827 !important; }
        .lp-light .lp-day-hint { color: #9ca3af !important; }
        /* contact — granular selectors */
        .lp-light .lp-contact-title { color: #111827 !important; }
        .lp-light .lp-contact-subtext { color: #4b5563 !important; }
        .lp-light .lp-contact-success-title { color: #111827 !important; }
        .lp-light .lp-contact-success-text { color: #6b7280 !important; }

        .lp-light .lp-recommendation-text { color: #111827 !important; }
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
          transition: background .3s, border-color .3s; flex-shrink: 0;
        }
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

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultLevel={authLevel} defaultMode={authMode} isDark={isDark} />}

      {/* Nav */}
      <nav
  className="lp-nav"
  style={{
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  }}
>
  <div className="lp-nav-logo">
    <a
      href="https://aisprint.app"
      style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
    >
      <img src={logoImg} alt="AI Sprint" className="lp-nav-logo-img" />
    </a>
  </div>

  <div className="lp-nav-actions">
    {/* Dark mode locked — toggle hidden. Re-enable by uncommenting:
    <button
      className={`lp-theme-toggle${isDark ? "" : " light"}`}
      onClick={() => toggleTheme()}
      aria-label="Toggle dark/light mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="lp-theme-toggle-thumb" />
    </button> */}

    <button className="lp-btn-ghost" onClick={() => openAuth(activeTab, "login")}>
      Log In
    </button>

    <button
      className="lp-btn-primary"
      style={{ background: THEME }}
      onClick={() => openAuth(activeTab, "register")}
    >
      {activeTab === "2" ? "Start Composer Journey →" : "Start Crafter Journey →"}
    </button>
  </div>
</nav>

      {/* ── CINEMATIC HERO — full-bleed vibe coding image ────────────────────── */}
      <section style={{ position:"relative", width:"100%", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", zIndex:1, contain:"layout style" }}>

        {/* Background image — 55% portrait / 70% landscape keeps face visible */}
        <div className="lp-vibe-cin-bg" style={{
          position:"absolute", inset:0,
          backgroundImage:"url('/assets/Hero_Image_AI_Vibe_Coding.webp')",
          backgroundSize:"cover",
          backgroundPosition:"70% center",
          backgroundRepeat:"no-repeat",
          animation:"lpHeroReveal 1.4s cubic-bezier(.22,1,.36,1) forwards",
        }} />

        {/* Left gradient — text legibility */}
        <div style={{
          position:"absolute", inset:0, zIndex:1,
          background:"linear-gradient(105deg, rgba(13,13,20,.95) 0%, rgba(13,13,20,.85) 30%, rgba(13,13,20,.52) 56%, rgba(13,13,20,.15) 76%, transparent 100%)",
        }} />

        {/* Bottom vignette — blends into sections below */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:200, zIndex:1,
          background:"linear-gradient(to bottom, transparent, rgba(13,13,20,.97) 85%, #0d0d14 100%)",
        }} />

        {/* Content — left aligned */}
        <div className="lp-vibe-cin-content" style={{
          position:"relative", zIndex:2,
          maxWidth:620, padding:"10rem 2.5rem 7rem",
          display:"flex", flexDirection:"column",
        }}>

          {/* Level selector pills */}
          <div style={{ display:"flex", gap:8, marginBottom:"1.4rem", animation:"lpRise .7s ease both", flexWrap:"wrap" }}>
            {(["1","2"] as const).map(lvl => {
              const color = lvl === "1" ? L1_COLOR : L2_COLOR;
              const label = lvl === "1" ? "L1 · Crafter · Days 1–28" : "L2 · Composer · Days 29–56";
              return (
                <button key={lvl} onClick={() => setActiveTab(lvl)} style={{
                  fontSize:".72rem", fontWeight:700, color,
                  background: activeTab === lvl ? `${color}28` : `${color}12`,
                  border:`1px solid ${activeTab === lvl ? color : `${color}45`}`,
                  borderRadius:100, padding:"5px 14px", cursor:"pointer",
                  transition:"all .2s", border:"none",
                  boxShadow: activeTab === lvl ? `0 0 14px ${color}44` : "none",
                }}>{label}</button>
              );
            })}
          </div>

          {/* Eyebrow */}
          <p style={{ fontSize:"clamp(.72rem,1.5vw,.85rem)", color:"rgba(200,200,220,.65)", letterSpacing:"2px", textTransform:"uppercase", fontWeight:600, marginBottom:".8rem", marginTop:0, animation:"lpRise .75s .05s ease both" }}>
            Built for professionals who want to build real software with AI — no coding degree required.
          </p>

          {/* H1 — scrambled, reserves height */}
          <h1 className="lp-vibe-cin-h1" style={{
            fontFamily:"monospace", fontWeight:900,
            fontSize:"clamp(1.7rem,5vw,3.5rem)",
            lineHeight:.97, letterSpacing:"-.02em",
            color:"white", margin:"0 0 1rem",
          }}>{scrambledH1}</h1>

          {/* Tagline */}
          <p style={{ color:THEME, fontWeight:700, fontSize:".9rem", letterSpacing:".4px", margin:"0 0 .5rem", animation:"lpRise .85s .15s ease both" }}>
            {activeTab === "2" ? "Systems. Agents. Production-grade AI products." : "Prompting. Building. Shipping. Automating."}
          </p>

          {/* Sub */}
          <p style={{ color:"rgba(200,200,220,.75)", lineHeight:1.7, fontSize:".95rem", maxWidth:500, margin:"0 0 1.4rem", animation:"lpRise .9s .18s ease both" }}>
            {activeTab === "2"
              ? "Level 2 is for professionals who want to build full-stack AI apps, deploy autonomous agents, and ship production-grade AI systems."
              : "Level 1 builds the foundation for using AI in vibe coding and IOP, from prompt structure to concepts, visuals, and professional workflow."
            }
          </p>

          {/* Badge pill */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, color:THEME, background:`${THEME}1a`, border:`1px solid ${THEME}44`, borderRadius:100, padding:"5px 14px", fontSize:".7rem", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", width:"fit-content", margin:"0 0 1.6rem", animation:"lpRise .85s .12s ease both" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:THEME, boxShadow:`0 0 6px ${THEME}`, display:"inline-block", animation:"lpPulse 2s infinite" }} />
            {activeTab === "2" ? "⚡ Composer · Production AI Systems" : "🏛️ AI for Vibe Coding & IOP"}
          </div>

          {/* CTA row */}
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap", marginBottom:"1.8rem", animation:"lpRise 1s .25s ease both" }}>
            <button
              style={{ background:THEME, color:"#fff", border:"none", padding:".9rem 2.2rem", borderRadius:100, fontWeight:800, fontSize:".9rem", cursor:"pointer", boxShadow:`0 8px 28px ${THEME}55`, transition:"transform .2s, box-shadow .2s", letterSpacing:".5px", whiteSpace:"nowrap" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 14px 36px ${THEME}66`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform=""; (e.currentTarget as HTMLButtonElement).style.boxShadow=`0 8px 28px ${THEME}55`; }}
              onClick={() => openAuth(activeTab, "register")}
            >{activeTab === "2" ? "Start Composer Journey →" : "Start Crafter Journey →"}</button>
            {activeTab === "2" && (
              <button
                onClick={() => setActiveTab("1")}
                style={{ color:"rgba(200,200,220,.8)", background:"transparent", border:"1px solid rgba(255,255,255,.18)", borderRadius:100, padding:".75rem 1.6rem", fontSize:".82rem", fontWeight:600, cursor:"pointer", transition:"border-color .2s, color .2s", whiteSpace:"nowrap" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor=THEME; (e.currentTarget as HTMLButtonElement).style.color=THEME; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(255,255,255,.18)"; (e.currentTarget as HTMLButtonElement).style.color="rgba(200,200,220,.8)"; }}
              >Start with Crafter first</button>
            )}
          </div>

          {/* Stats strip */}
          <div ref={statsRef} style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:14, padding:".9rem 0", width:"fit-content", animation:"lpRise 1.1s .35s ease both" }}>
            {([{num:s28,label:"Days"},{num:s15,label:"Min/Day"},{num:s2,label:"Levels"},{num:s0,label:"Exp. Needed"}] as const).map((s,i,arr) => (
              <div key={i} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ textAlign:"center", padding:"0 1.3rem" }}>
                  <div style={{ fontFamily:"monospace", fontWeight:900, fontSize:"1.5rem", color:THEME, lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontSize:".6rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"rgba(200,200,220,.45)", marginTop:".25rem", fontWeight:600 }}>{s.label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width:1, height:32, background:"rgba(255,255,255,.1)" }} />}
              </div>
            ))}
          </div>

          {/* Urgency pill */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:".45rem", background:"rgba(249,115,22,.08)", border:"1px solid rgba(249,115,22,.25)", borderRadius:"100px", padding:".28rem 1rem", fontSize:".68rem", letterSpacing:"1.5px", textTransform:"uppercase", color:"#fb923c", fontWeight:700, marginTop:"1.2rem", width:"fit-content", animation:"lpRise 1.1s .4s ease both" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#f97316", display:"inline-block", animation:"lpPulse 2s infinite" }} />
            {activeTab === "1" ? "Professionals are shipping real automations in the Crafter track" : "Composer students are deploying production AI products"}
          </div>

        </div>
      </section>

      {/* Tech divider */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 24px 40px", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:`${THEME}25` }}/>
        <div style={{ display:"flex", gap:10, padding:"0 18px", flexWrap:"wrap", justifyContent:"center" }}>
          {["↔ 28 DAYS", `⚡ LEVEL 0${activeTab}`, "15 MIN/DAY"].map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:`${THEME}88` }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`${THEME}25` }}/>
      </div>

      {/* What you'll learn */}
      <section className="lp-section">
        <div className="lp-section-inner">
          <div className="lp-section-label" style={{ color: THEME }}>
            {activeTab === "2" ? "LEVEL 2 ADVANCED" : "LEVEL 1 BASIC"}
          </div>
          <h2 className="lp-section-h2">
            {activeTab === "2" ? "Build advanced design AI workflows" : "Build practical AI skills for design"}
          </h2>
          <p className="lp-section-sub">
            {activeTab === "2"
              ? "Level 2 is for designers ready to move beyond simple outputs and build repeatable systems for visual quality, storytelling, and studio workflow."
              : "Level 1 gives you the foundations for vibe coding and IOP without changing your role as the designer."
            }
          </p>

          <div className="lp-why-grid" ref={cardsRef}>
            {activeTab === "1" ? (
              <>
                <div className={`lp-why-card lp-reveal ${revealCards ? "visible" : ""}`} style={{ transition:"opacity .65s ease 0s, transform .65s ease 0s" }}>
                  <div className="lp-why-icon" style={{ color: THEME, background: `${THEME}1a` }}><BookOpen size={24} /></div>
                  <h3 className="lp-card-title">Design foundations</h3>
                  <p className="lp-card-body">Understand how AI is used in vibe coding and IOP, and learn the structure of an effective design prompt.</p>
                </div>
                <div className={`lp-why-card lp-reveal ${revealCards ? "visible" : ""}`} style={{ transition:"opacity .65s ease .12s, transform .65s ease .12s" }}>
                  <div className="lp-why-icon" style={{ color: THEME, background: `${THEME}1a` }}><Target size={24} /></div>
                  <h3 className="lp-card-title">Concept generation</h3>
                  <p className="lp-card-body">Generate room concepts, style variations, facade studies, and sketch-to-render visuals for faster idea exploration.</p>
                </div>
                <div className={`lp-why-card lp-reveal ${revealCards ? "visible" : ""}`} style={{ transition:"opacity .65s ease .24s, transform .65s ease .24s" }}>
                  <div className="lp-why-icon" style={{ color: THEME, background: `${THEME}1a` }}><Shield size={24} /></div>
                  <h3 className="lp-card-title">Professional workflow</h3>
                  <p className="lp-card-body">Use AI responsibly in presentations, drafting support, collaboration, and design review without losing human judgment.</p>
                </div>
              </>
            ) : (
              <>
                <div className={`lp-why-card lp-reveal ${revealCards ? "visible" : ""}`} style={{ transition:"opacity .65s ease 0s, transform .65s ease 0s" }}>
                  <div className="lp-why-icon" style={{ color: THEME, background: `${THEME}1a` }}><BarChart2 size={24} /></div>
                  <h3 className="lp-card-title">Prompt systems</h3>
                  <p className="lp-card-body">Build reusable prompt frameworks for consistency across multiple images, views, and project types.</p>
                </div>
                <div className={`lp-why-card lp-reveal ${revealCards ? "visible" : ""}`} style={{ transition:"opacity .65s ease .12s, transform .65s ease .12s" }}>
                  <div className="lp-why-icon" style={{ color: THEME, background: `${THEME}1a` }}><Shield size={24} /></div>
                  <h3 className="lp-card-title">Quality control</h3>
                  <p className="lp-card-body">Refine realism, fix distortions, and build a checklist for reviewing AI-generated code and automations.</p>
                </div>
                <div className={`lp-why-card lp-reveal ${revealCards ? "visible" : ""}`} style={{ transition:"opacity .65s ease .24s, transform .65s ease .24s" }}>
                  <div className="lp-why-icon" style={{ color: THEME, background: `${THEME}1a` }}><Layers size={24} /></div>
                  <h3 className="lp-card-title">Studio integration</h3>
                  <p className="lp-card-body">Connect AI outputs to presentations, CAD workflows, service packaging, and advanced design storytelling.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* What you'll build / who it's for */}
      <section className="lp-dark-section">
        <div className="lp-section-inner">
          <div className="lp-two-col">
            <div className="lp-col-block">
              <h3 className="lp-col-heading">What you'll build</h3>
              <ul className="lp-check-list">
                {activeTab === "1" ? (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Personal prompt library for vibe coding workflows</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> AI use checklist for ethical professional practice</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> AI-assisted workflow map for ideation, drafting, and presentation</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Concept sheet with prompt, image, and design notes</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Mini portfolio of AI-assisted design work</li>
                  </>
                ) : (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Reusable prompt framework for consistent outputs</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Visual quality checklist for realism and consistency</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Studio workflow map with AI touchpoints</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> AI-assisted service packaging and pricing framework</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Capstone automation suite or deployed AI product</li>
                  </>
                )}
              </ul>
            </div>
            <div className="lp-col-block">
              <h3 className="lp-col-heading">Who it's for</h3>
              <ul className="lp-check-list">
                {activeTab === "1" ? (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Professionals and creators starting with vibe coding</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Design students building practical workflow skills</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Creative professionals who want AI support without coding</li>
                  </>
                ) : (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Level 1 graduates or designers already comfortable with AI basics</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Professionals building higher-quality concept and presentation workflows</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color: THEME }}>✓</span> Studios and freelancers refining advanced AI-assisted design systems</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
            {/* Prerequisite callout for Level 2 */}
      {activeTab === "2" && (
        <section style={{ padding: "40px 20px", background: `${L1_COLOR}0d`, borderTop: `1px solid ${L1_COLOR}22`, borderBottom: `1px solid ${L1_COLOR}22` }}>
          <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${L1_COLOR}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <BookOpen size={20} color={L1_COLOR} />
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div className="lp-recommendation-text" style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>
                New to design AI? Start with Crafter first.
              </div>
              <div style={{ color: "#888", fontSize: "0.9rem" }}>
                Level 2 assumes you're already comfortable with AI basics, prompting, and concept generation. If you're still building your foundation, Level 1 is the best place to start.
              </div>
            </div>
            <button
              onClick={() => setActiveTab("1")}
              style={{ padding: "10px 22px", borderRadius: 8, border: `1px solid ${L1_COLOR}`, color: L1_COLOR, background: "transparent", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", flexShrink: 0 }}
            >
              Explore Level 1 →
            </button>
          </div>
        </section>
      )}

      <ContactSection theme={THEME} />

      {/* Testimonials */}
      <section className="lp-testi-section" style={{ padding:"60px 20px", borderTop:"1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:THEME, background:`${THEME}18`, border:`1px solid ${THEME}30`, borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
              Student Stories
            </div>
            <h2 style={{ fontSize:"clamp(1.5rem,3.5vw,2rem)", fontWeight:800, color:"inherit", margin:"0 0 10px" }}>Real results from designers</h2>
            <p style={{ color:"#888", fontSize:".95rem" }}>Professionals, developers, and creators building real AI workflow skills.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}
            ref={(el) => { (testimonialsRef as any).current = el; (testiScrollRef as any).current = el; }}>
            {[
              { text:"I used to spend hours trying to explain a concept before I even had something strong to show. After Level 1, I could generate room directions faster and walk into client conversations with much more confidence.", name:"Marcus L.", role:"Vibe Coder, London", initials:"ML", color:L1_COLOR, course:"Level 1 · Crafter", photo:"/assets/testimonials/face-g.png" },
              { text:"The workflow I built in Level 2 helped me keep style and materials consistent across multiple views. That alone changed how I prepare presentation visuals for clients.", name:"James W.", role:"Software Builder, Singapore", initials:"JW", color:L2_COLOR, course:"Level 2 · Composer", photo: null },
              { text:"15 minutes a day felt small at first, but by Week 4 I had concept images, a cleaner prompt system, and a mini portfolio piece I could actually use in my process.", name:"Priya M.", role:"Design Consultant, Toronto", initials:"PM", color:L1_COLOR, course:"Level 1 · Crafter", photo: null },
            ].map((t, i) => (
              <div key={i} className={`lp-testi-card lp-reveal ${revealTestimonials ? "visible" : ""}`} style={{
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.08)",
                borderRadius:16, padding:"1.4rem 1.5rem",
                display:"flex", flexDirection:"column", gap:"1rem",
                transition:`opacity .65s ease ${i*.15}s, transform .65s ease ${i*.15}s`,
                flex:"0 0 100%", minWidth:0,
              }}>
                <div style={{ fontSize:".78rem", fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:t.color, background:`${t.color}18`, border:`1px solid ${t.color}33`, borderRadius:100, padding:"3px 10px", width:"fit-content" }}>{t.course}</div>
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

      {/* ── HUMANIZING IMAGE SECTION ── */}
      <section className="lp-human-section" style={{ padding:"60px 20px", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:"820px", margin:"0 auto", display:"flex", flexDirection:"row", alignItems:"center", gap:"3rem", flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 260px", maxWidth:"100%" }}>
            <img src="/assets/testimonials/face-h.png" alt="Professional learning vibe coding and IOP"
              style={{ width:"100%", borderRadius:20, objectFit:"cover", objectPosition:"center top",
                boxShadow:"0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(13,124,138,.15)",
                border:`1px solid ${L1_COLOR}33` }} />
          </div>
          <div style={{ flex:1, minWidth:240 }}>
            <div style={{ fontSize:".7rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:THEME, marginBottom:"1rem" }}>✦ Who this is for</div>
            <h2 style={{ fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, color:"inherit", lineHeight:1.25, marginBottom:"1rem" }}>
              You don't need to code.<br/>You need a stronger design workflow.
            </h2>
            <p style={{ color:"var(--lp-body,#9896b0)", lineHeight:1.75, fontSize:".95rem", marginBottom:"1.25rem" }}>
              This course is for professionals, developers, and entrepreneurs who want to use AI to explore concepts faster, improve presentations, and build a more efficient workflow. No coding. No hype. Just practical AI skills for real design work.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:".6rem", marginBottom:"1.5rem" }}>
              {[
                "Perfect for professionals, developers, and entrepreneurs",
                "2 levels — build foundations first, then master advanced workflows",
                "15 minutes a day — designed for real creative schedules",
              ].map((item, i) => (
                <div key={i} style={{ display:"flex", gap:".65rem", alignItems:"flex-start" }}>
                  <span style={{ color:THEME, fontWeight:800, flexShrink:0, marginTop:2 }}>✓</span>
                  <span className="lp-human-bullet" style={{ color:"var(--lp-body,#c8c6e0)", fontSize:".9rem", lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => openAuth(activeTab, "register")}
              style={{ background:THEME, color:"white", border:"none", padding:".75rem 1.8rem",
                borderRadius:100, fontWeight:700, fontSize:".9rem", cursor:"pointer",
                boxShadow:`0 8px 24px ${THEME}44` }}>
              {activeTab === "2" ? "Start Composer Journey →" : "Start Crafter Journey →"}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA divider */}
      <div className="lp-join-banner" style={{ display:"flex", alignItems:"center", padding:"40px 24px 0" }}>
        <div style={{ flex:1, height:1, background:`${THEME}40`}}/>
        <div style={{ display:"flex", gap:10, padding:"0 18px" }}>
          {["START TODAY", `BEGIN LEVEL 0${activeTab}`].map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:THEME, opacity:.7 }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`${THEME}40`}}/>
      </div>

      {/* CTA */}
      <section className="lp-cta-section" style={{ background: THEME, paddingBottom:"60px" }}>
        <div className="lp-section-inner" style={{ textAlign: "center" }}>
          <h2 className="lp-cta-h2">
            {activeTab === "2" ? "Ready to build advanced AI design workflows?" : "Ready to build your AI design foundation?"}
          </h2>
          <p className="lp-cta-sub" style={{ color:"rgba(255,255,255,.9)", fontWeight:600, fontSize:"1.05rem" }}>
            {activeTab === "2"
              ? "Advance from prompt experimentation to consistent visuals, storytelling, and studio-ready workflow systems."
              : "Start building practical AI skills for vibe coding and IOP in just 15 minutes a day."
            }
          </p>
          <button className="lp-cta-btn" style={{ background: "#ffffff", color: THEME, fontWeight: "bold" }}
            onClick={() => openAuth(activeTab, "register")}>
            {activeTab === "2" ? "Start Composer Journey →" : "Start Crafter Journey →"}
          </button>
        </div>
      </section>
    </div>
  );
}