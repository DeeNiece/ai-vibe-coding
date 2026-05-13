// ── AI Sprint · Vibe Coding ────────────────────────────────────────────────────
// File: landing.tsx | Repo: ai-vibe-coding
// Last updated: May 2026

import { useState, useEffect, useRef } from "react";
import logoImg from "@/ai-sprint-logo.png";
import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/i18n";
import bannerVideo from "@/assets/Challenge-Badge Trim_small.mp4";
import {
  Mail, Lock, UserCircle, ArrowRight, AlertCircle,
  Eye, EyeOff, X, Send, CheckCircle2, Terminal, Cpu, Rocket,
} from "lucide-react";

// ── Theme constants ────────────────────────────────────────────────────────────
const L1_COLOR = "#0d7c8a";   // teal  — Builder
const L2_COLOR = "#7c3aed";   // violet — Engineer
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

const LEVEL_THEMES = {
  "1": {
    color: L1_COLOR,
    name: "Builder",
    label: "Level 1 · Builder",
    annotation: "AI-VIBE-BUILDER",
    days: "28 DAYS",
    tagline: "Learn to build real software with AI — even if you have no coding background.",
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
    tagline: "Go from working local tools to deployed, production-ready AI apps and autonomous agents.",
    heroHeadline: "In 28 days, become the person who ships production-ready AI-built software.",
    heroSub: "Level 2 is for builders ready to move beyond local scripts — full-stack apps, agents, MCP, deployment, testing, and monitoring.",
    urgency: "187 engineers enrolled in Level 2 this month",
    cta: "Start Level 2 →",
    dividerMarks: ["↔ 28 DAYS", "🚀 LEVEL 2 · ENGINEER", "15 MIN/DAY"],
    sectionLabel: "VIBE CODING · LEVEL 2",
    sectionH2: "Build and ship AI software like a modern product engineer",
  },
};

// ── Auth Modal ─────────────────────────────────────────────────────────────────
function AuthModal({
  onClose,
  defaultLevel,
  defaultMode = "register",
}: {
  onClose: () => void;
  defaultLevel: "1" | "2";
  defaultMode?: "login" | "register";
}) {
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
      if (!displayName.trim()) { setError(t("auth.nameRequired")); setLoading(false); return; }
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
        <button className="lp-modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>

        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".5rem", marginBottom:"1.25rem" }}>
          <img src={logoImg} alt="AI Sprint" className="auth-logo-img" />
          <div className="auth-tagline" style={{ color:"#ddd" }}>Build Software. Use AI. Ship Faster.</div>
        </div>

        <h1 className="auth-heading" style={{ color:"white", fontSize:"1.75rem", fontWeight:800, marginBottom:".5rem", textAlign:"center" }}>
          {mode === "login"
            ? `Welcome back to ${defaultLevel === "2" ? "Level 2 · Engineer" : "Level 1 · Builder"}`
            : t("auth.createAccount")}
        </h1>
        <p className="auth-subtext" style={{ color:"#ccc", marginBottom:"1.5rem", fontSize:".95rem", textAlign:"center" }}>
          {mode === "login"
            ? defaultLevel === "2"
              ? "Continue building and shipping production-ready AI software."
              : "Continue your vibe coding journey — real tools, real code."
            : t("auth.signupSubtext")}
        </p>

        {error && (
          <div className="auth-error" style={{ color:"#ef4444", display:"flex", alignItems:"center", gap:"8px", marginBottom:"1rem" }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        {purchaseUrl && (
          <div className="auth-error" style={{ color:"#ef4444", display:"flex", alignItems:"center", gap:"8px", marginBottom:"1rem" }}>
            <AlertCircle size={14} />
            <span>You may need a valid license.{" "}
              <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"underline", fontWeight:600, color:"#fca5a5" }}>View Pricing →</a>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {mode === "register" && (
            <div className="auth-field">
              <label htmlFor="modal-name" style={{ color:"white", display:"flex", alignItems:"center", gap:"6px", fontSize:".85rem", fontWeight:600, marginBottom:"6px" }}>
                <UserCircle size={14} /> {t("auth.nameLabel")}
              </label>
              <input id="modal-name" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("auth.namePlaceholder")} required
                style={{ width:"100%", padding:"12px", borderRadius:"8px", background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.1)", color:"white", outline:"none" }} />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="modal-email" style={{ color:"white", display:"flex", alignItems:"center", gap:"6px", fontSize:".85rem", fontWeight:600, marginBottom:"6px" }}>
              <Mail size={14} /> {t("auth.emailLabel")}
            </label>
            <input id="modal-email" type="email" inputMode="email" autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")} required
              style={{ width:"100%", padding:"12px", borderRadius:"8px", background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.1)", color:"white", outline:"none" }} />
          </div>

          <div className="auth-field">
            <label htmlFor="modal-password" style={{ color:"white", display:"flex", alignItems:"center", gap:"6px", fontSize:".85rem", fontWeight:600, marginBottom:"6px" }}>
              <Lock size={14} /> {t("auth.passwordLabel")}
            </label>
            <div style={{ position:"relative" }}>
              <input id="modal-password" type={showPw ? "text" : "password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password" required minLength={mode === "register" ? 6 : 1}
                style={{ width:"100%", padding:"12px", borderRadius:"8px", background:"rgba(0,0,0,0.3)", border:"1px solid rgba(255,255,255,0.1)", color:"white", outline:"none" }} />
              <button type="button" onClick={() => setShowPw(s => !s)}
                style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#aaa", cursor:"pointer" }}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"12px",
              background: THEME, color:"#fff", fontWeight:800, textTransform:"uppercase", letterSpacing:".5px",
              border:"none", borderRadius:"8px", cursor: loading ? "not-allowed" : "pointer",
              marginTop:"10px", boxShadow:`0 4px 14px ${THEME}66` }}>
            {loading ? t("auth.pleaseWait") : mode === "login" ? t("auth.login") : t("auth.createAccountBtn")}
            {!loading && <ArrowRight size={16}/>}
          </button>

          <div style={{ position:"relative", margin:"20px 0" }}>
            <hr style={{ border:"none", borderTop:"1px solid #444" }}/>
            <span style={{ position:"absolute", top:"-10px", left:"50%", transform:"translateX(-50%)",
              background:"rgba(22,23,30,0.8)", backdropFilter:"blur(10px)", padding:"0 10px",
              fontSize:".75rem", color:"#ccc", fontWeight:600 }}>OR</span>
          </div>

          <a href="/api/auth/google"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px",
              width:"100%", padding:"12px", borderRadius:"8px", background:"#f0f0f0",
              color:"#000", fontWeight:"bold", textDecoration:"none" }}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" alt="Google"/>
            {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
          </a>
        </form>

        <div className="auth-switch" style={{ marginTop:"1.5rem", textAlign:"center", fontSize:".85rem", color:"#ccc" }}>
          {mode === "login" ? (
            <>
              <p>
                {t("auth.noAccount")}{" "}
                <button type="button" onClick={() => { setMode("register"); setError(null); setPurchaseUrl(null); }}
                  style={{ background:"none", border:"none", color: THEME, fontWeight:700, cursor:"pointer", textDecoration:"underline", padding:0 }}>
                  {t("auth.signup")}
                </button>
              </p>
              <p style={{ marginTop:".75rem", fontSize:".85rem", color:"#aaa" }}>
                Having trouble logging in?{" "}
                <a href="mailto:support@aisprint.app" style={{ textDecoration:"underline", textUnderlineOffset:"2px", color:"#ccc" }}>Contact Support</a>
              </p>
            </>
          ) : (
            <p>
              {t("auth.hasAccount")}{" "}
              <button type="button" onClick={() => { setMode("login"); setError(null); setPurchaseUrl(null); }}
                style={{ background:"none", border:"none", color: THEME, fontWeight:700, cursor:"pointer", textDecoration:"underline", padding:0 }}>
                {t("auth.login")}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Contact Section (theme-aware, from AI Strategy pattern) ───────────────────
function ContactSection({ theme }: { theme: string }) {
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
      const res = await fetch("https://api.web3forms.com/submit", { method:"POST", body:data });
      const json = await res.json();
      if (json.success) { setSubmitted(true); form.reset(); }
      else setError("Something went wrong. Please try emailing us directly.");
    } catch { setError("Network error. Please try emailing us directly."); }
    finally { setSubmitting(false); }
  }

  return (
    <section className="lp-contact-section" style={{ padding:"80px 20px", background:"#111" }}>
      <div style={{ maxWidth:560, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:".75rem", fontWeight:700,
            letterSpacing:".1em", textTransform:"uppercase", color:theme,
            background:`${theme}1a`, border:`1px solid ${theme}33`,
            borderRadius:20, padding:"5px 14px", marginBottom:16 }}>
            <Mail size={12}/> Contact Support
          </div>
          <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.2rem)", fontWeight:800, color:"inherit", margin:"0 0 12px", lineHeight:1.2 }}>
            Need help? We're here.
          </h2>
          <p style={{ color:"#888", fontSize:"1rem", margin:0 }}>
            Send us a message and we'll get back to you at{" "}
            <a href="mailto:support@aisprint.app" style={{ color:theme, textDecoration:"underline", textUnderlineOffset:3 }}>
              support@aisprint.app
            </a>
          </p>
        </div>
        {submitted ? (
          <div style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.2)", borderRadius:16, padding:"40px 32px", textAlign:"center" }}>
            <CheckCircle2 size={48} color="#22c55e" style={{ margin:"0 auto 16px" }}/>
            <h3 style={{ color:"white", margin:"0 0 8px", fontSize:"1.2rem" }}>Message sent!</h3>
            <p style={{ color:"#888", margin:0 }}>We'll get back to you within 24 hours.</p>
            <button onClick={() => setSubmitted(false)} style={{ marginTop:20, background:"none", border:"1px solid #333", color:"#888", padding:"8px 20px", borderRadius:8, cursor:"pointer", fontSize:".85rem" }}>
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"36px 32px", display:"flex", flexDirection:"column", gap:18 }}>
            <input type="hidden" name="access_key" value="9354c53d-f37d-4c31-845b-88286c03d1d4"/>
            <input type="hidden" name="subject" value="Vibe Coding Support Request"/>
            <input type="hidden" name="from_name" value="AI Sprint Vibe Coding Landing Page"/>
            {error && (
              <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", color:"#ef4444", padding:"10px 14px", borderRadius:8, fontSize:".875rem", display:"flex", alignItems:"center", gap:8 }}>
                <AlertCircle size={14}/> {error}
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label className="lp-form-label" style={{ fontSize:".8rem", fontWeight:600, color:"#ddd", display:"flex", alignItems:"center", gap:6 }}><UserCircle size={13}/> Your Name</label>
              <input type="text" name="name" placeholder="Jane Doe" required style={{ padding:"11px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(0,0,0,0.3)", color:"white", fontSize:".95rem", outline:"none", width:"100%", boxSizing:"border-box" as any }}/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label className="lp-form-label" style={{ fontSize:".8rem", fontWeight:600, color:"#ddd", display:"flex", alignItems:"center", gap:6 }}><Mail size={13}/> Your Email</label>
              <input type="email" name="email" placeholder="you@example.com" required style={{ padding:"11px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(0,0,0,0.3)", color:"white", fontSize:".95rem", outline:"none", width:"100%", boxSizing:"border-box" as any }}/>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label className="lp-form-label" style={{ fontSize:".8rem", fontWeight:600, color:"#ddd" }}>Message</label>
              <textarea name="message" placeholder="Describe your question…" required rows={5}
                style={{ padding:"11px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(0,0,0,0.3)", color:"white", fontSize:".95rem", outline:"none", width:"100%", boxSizing:"border-box" as any, resize:"vertical" as any, fontFamily:"inherit", lineHeight:1.5 }}/>
            </div>
            <button type="submit" disabled={submitting}
              style={{ padding:"13px", borderRadius:8, border:"none", background: submitting ? "#555" : theme,
                color:"white", fontWeight:700, fontSize:".95rem", cursor: submitting ? "not-allowed" : "pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                transition:"background 0.2s", boxShadow: submitting ? "none" : `0 4px 14px ${theme}55` }}>
              <Send size={15}/>
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Landing Page ───────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [authLevel, setAuthLevel] = useState<"1" | "2">("1");
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [activeTab, setActiveTab] = useState<"1" | "2">("1");
  const [isDark, setIsDark] = useState(true);
  const themeData = LEVEL_THEMES[activeTab];
  const THEME = themeData.color;

  // ── Refs ─────────────────────────────────────────────────────────
  const cursorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsFired = useRef(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const sevenDayScrollRef = useRef<HTMLDivElement>(null);
  const testiScrollRef = useRef<HTMLDivElement>(null);

  // ── H1 scramble — re-fires on tab change ─────────────────────────
  const [scrambledH1, setScrambledH1] = useState(LEVEL_THEMES["1"].heroHeadline);

  // ── Animated stat counters ────────────────────────────────────────
  const [s28, setS28] = useState(0);
  const [s15, setS15] = useState(0);
  const [sEnrolled, setSEnrolled] = useState(0);

  // ── Ticker ────────────────────────────────────────────────────────
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
      "🚀 Sarah deployed her first live app · Railway + Vercel",
      "🏆 Daniel unlocked Engineer rank · Level 2",
      "✅ Priya shipped her first autonomous agent · Week 6",
      "🧪 Marcus added evals and CI/CD to production",
      "✨ 187 builders enrolled in Level 2 this month",
      "🔥 Yuki is on a 14-day streak · Level 2",
    ],
  };
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  // ── Scroll reveal ─────────────────────────────────────────────────
  const [revealCards, setRevealCards] = useState(false);
  const [revealTestimonials, setRevealTestimonials] = useState(false);

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
    }, { threshold:0.5 });
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealCards(true); }, { threshold:0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [activeTab]);

  // Scroll reveal — testimonials
  useEffect(() => {
    const el = testimonialsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealTestimonials(true); }, { threshold:0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-scroll — 7-day preview
  useEffect(() => {
    let paused = false;
    const el = sevenDayScrollRef.current;
    if (!el) return;
    el.style.scrollBehavior = "smooth";
    el.addEventListener("mouseenter", () => { paused = true; });
    el.addEventListener("mouseleave", () => { paused = false; });
    el.addEventListener("touchstart", () => { paused = true; }, { passive:true });
    el.addEventListener("touchend", () => { setTimeout(() => { paused = false; }, 1500); }, { passive:true });
    const iv = setInterval(() => {
      if (paused) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) { el.style.scrollBehavior = "auto"; el.scrollLeft = 0; requestAnimationFrame(() => { el.style.scrollBehavior = "smooth"; }); }
      else { el.scrollLeft += el.clientWidth; }
    }, 2800);
    return () => clearInterval(iv);
  }, [activeTab]);

  // Auto-scroll — testimonials
  useEffect(() => {
    let paused = false;
    const el = testiScrollRef.current;
    if (!el) return;
    el.style.scrollBehavior = "smooth";
    el.addEventListener("mouseenter", () => { paused = true; });
    el.addEventListener("mouseleave", () => { paused = false; });
    el.addEventListener("touchstart", () => { paused = true; }, { passive:true });
    el.addEventListener("touchend", () => { setTimeout(() => { paused = false; }, 1500); }, { passive:true });
    const iv = setInterval(() => {
      if (paused) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) { el.style.scrollBehavior = "auto"; el.scrollLeft = 0; requestAnimationFrame(() => { el.style.scrollBehavior = "smooth"; }); }
      else { el.scrollLeft += el.clientWidth; }
    }, 3200);
    return () => clearInterval(iv);
  }, []);

  // ── 7-day preview data ────────────────────────────────────────────
  const SEVEN_DAYS: Record<"1"|"2", { day:number; title:string; cat:string; color:string }[]> = {
    "1": [
      { day:1, title:"What Is Vibe Coding? AI as Partner, Not Search", cat:"Learn", color:L1_COLOR },
      { day:2, title:"Your First Working Script — From One Prompt", cat:"Apply", color:L1_COLOR },
      { day:3, title:"Reading AI Code — You Don't Write, You Review", cat:"Learn", color:"#2f6fa8" },
      { day:4, title:"The 3-Part Vibe Prompt — Goal, Constraints, Format", cat:"Learn", color:"#2f6fa8" },
      { day:5, title:"Setting Up Your Sandbox — Cursor, VS Code, or Replit", cat:"Apply", color:"#7c3aed" },
      { day:6, title:"Error Handling — The AI Made a Bug, Now What?", cat:"Apply", color:"#7c3aed" },
      { day:7, title:"Sprint — Build a Working Automation", cat:"Sprint 🏆", color:"#f97316" },
    ],
    "2": [
      { day:1, title:"The 2026 AI App Stack — From Vibe to Production", cat:"Architecture", color:L2_COLOR },
      { day:2, title:"Calling Claude and GPT-4o via API — With Streaming", cat:"AI Integration", color:L2_COLOR },
      { day:3, title:"System Prompts — The Hidden Engine of Every AI Product", cat:"Architecture", color:"#a855f7" },
      { day:4, title:"RAG — Retrieval-Augmented Generation from Scratch", cat:"Architecture", color:"#a855f7" },
      { day:5, title:"Full-Stack App Skeleton — Next.js + FastAPI + Claude", cat:"AI Integration", color:"#f97316" },
      { day:6, title:"Context Management — Memory, History, and Token Budgets", cat:"Architecture", color:"#f97316" },
      { day:7, title:"Mini-Project: Working AI-Powered MVP", cat:"Sprint 🏆", color:"#f97316" },
    ],
  };

  // ── Why-cards data ────────────────────────────────────────────────
  const WHY_CARDS: Record<"1"|"2", { icon: React.ReactNode; color:string; bg:string; title:string; body:string }[]> = {
    "1": [
      { icon:<Terminal size={22}/>, color:L1_COLOR, bg:`${L1_COLOR}1a`, title:"No background needed", body:"Write your first working script on Day 2 — no CS degree, no coding history. Just a structured prompt." },
      { icon:<Cpu size={22}/>, color:"#7c3aed", bg:"rgba(124,58,237,.1)", title:"Build real things", body:"Scripts, APIs, dashboards, automations — every sprint produces something you can actually use or show." },
      { icon:<Rocket size={22}/>, color:"#f97316", bg:"rgba(249,115,22,.1)", title:"15 minutes a day", body:"One focused lesson per day. Enough to build serious momentum without disrupting your schedule." },
    ],
    "2": [
      { icon:<Terminal size={22}/>, color:L2_COLOR, bg:`${L2_COLOR}1a`, title:"Full-stack AI apps", body:"Build Next.js + FastAPI + Claude apps from scratch — streaming, auth, rate limiting, and all." },
      { icon:<Cpu size={22}/>, color:"#a855f7", bg:"rgba(168,85,247,.1)", title:"Agents and MCP", body:"Build autonomous agents with tool use, connect MCP servers, and deploy pipelines that run without you." },
      { icon:<Rocket size={22}/>, color:"#f97316", bg:"rgba(249,115,22,.1)", title:"Ship to production", body:"Evals, CI/CD, logging, monitoring — everything needed to go from working prototype to live product." },
    ],
  };

  return (
    <div className={`lp-root${isDark ? "" : " lp-light"}`}
      style={{ "--color-primary": THEME, background: isDark ? "#0d0d14" : "#f4f6fb", color: isDark ? "#e8e6f4" : "#1a1a2e", minHeight:"100vh" } as any}>

      {/* Cursor glow */}
      <div ref={cursorRef} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:`radial-gradient(600px at var(--cx,50%) var(--cy,50%), ${THEME}12, transparent 70%)`,
        transition:"background 0.4s ease" }}/>

      {/* Circuit grid */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        backgroundImage:`linear-gradient(${THEME}06 1px,transparent 1px),linear-gradient(90deg,${THEME}06 1px,transparent 1px)`,
        backgroundSize:"36px 36px",
        maskImage:"linear-gradient(to bottom,rgba(0,0,0,.6) 0%,transparent 55%)",
        WebkitMaskImage:"linear-gradient(to bottom,rgba(0,0,0,.6) 0%,transparent 55%)" as any }}/>

      {/* Live ticker pill */}
      <div className="lp-ticker" style={{ position:"fixed", bottom:16, left:"50%", transform:"translateX(-50%)",
        zIndex:50, maxWidth:380, width:"calc(100% - 40px)",
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
        .lp-reveal { opacity:0; transform:translateY(24px); }
        .lp-reveal.visible { opacity:1; transform:translateY(0); }
        [data-autoscroll]::-webkit-scrollbar { display:none; }

        /* ── DARK MODE ── */
        .lp-root { --lp-body:#c8c6e0; --lp-muted:#9896b0; --lp-card-bg:rgba(255,255,255,.04); --lp-card-border:rgba(255,255,255,.09); }
        .lp-root p, .lp-root li { color:var(--lp-body); }

        /* ── LIGHT MODE ── */
        .lp-light { --lp-body:#374151; --lp-muted:#6b7280; --lp-card-bg:#ffffff; --lp-card-border:rgba(0,0,0,.08); }
        .lp-light section { background:#f4f6fb !important; }
        .lp-light .lp-dark-section { background:#ffffff !important; }
        .lp-light .lp-section { background:#f4f6fb !important; }
        .lp-light .lp-cta-section { background:var(--color-primary) !important; }
        .lp-light h1, .lp-light h2, .lp-light h3 { color:#111827 !important; }
        .lp-light p { color:#374151 !important; }
        .lp-light .lp-hero-sub { color:#4b5563 !important; }
        .lp-light .lp-hero-tagline { color:var(--color-primary) !important; }
        .lp-light .lp-nav { background:rgba(255,255,255,.95) !important; border-bottom:1px solid rgba(0,0,0,.07); }
        .lp-light .lp-btn-ghost { color:#374151 !important; border-color:rgba(0,0,0,.15) !important; }
        .lp-light .lp-hero-h1 { color:#111827 !important; }
        .lp-light .lp-hero-outline { color:#374151 !important; border-color:rgba(0,0,0,.2) !important; }
        .lp-light .lp-why-card { background:#ffffff !important; box-shadow:0 2px 12px rgba(0,0,0,.06); }
        .lp-light .lp-card-title { color:#111827 !important; }
        .lp-light .lp-card-body { color:#4b5563 !important; }
        .lp-light .lp-two-col { background:#f4f6fb !important; }
        .lp-light .lp-col-block { background:#ffffff !important; border-color:rgba(0,0,0,.08) !important; box-shadow:0 2px 12px rgba(0,0,0,.05); }
        .lp-light .lp-col-heading { color:#111827 !important; }
        .lp-light .lp-col-body { color:#4b5563 !important; }
        .lp-light .lp-check-item { color:#374151 !important; }
        .lp-light .lp-check-icon { color:var(--color-primary) !important; }
        .lp-light .lp-testi-section { background:#f4f6fb !important; }
        .lp-light .lp-testi-card { background:#ffffff !important; border-color:rgba(0,0,0,.08) !important; box-shadow:0 2px 12px rgba(0,0,0,.06); }
        .lp-light .lp-testi-text { color:#374151 !important; }
        .lp-light .lp-testi-name { color:#111827 !important; }
        .lp-light .lp-testi-role { color:#9ca3af !important; }
        .lp-light .lp-contact-section { background:#f4f6fb !important; }
        .lp-light .lp-form-label { color:#374151 !important; }
        .lp-light input, .lp-light textarea { background:#f9fafb !important; color:#111827 !important; border-color:rgba(0,0,0,.12) !important; }
        .lp-light .lp-ticker { background:rgba(255,255,255,.95) !important; border-color:rgba(0,0,0,.1) !important; }
        .lp-light .lp-ticker-text { color:#374151 !important; }
        .lp-light .lp-human-section { background:#ffffff !important; }
        .lp-light .lp-stats { background:rgba(0,0,0,.04) !important; border:1px solid rgba(0,0,0,.08) !important; backdrop-filter:none !important; }
        .lp-light .lp-stats .lp-stat-num { color:#111827 !important; text-shadow:none !important; }
        .lp-light .lp-stats .lp-stat-label { color:#6b7280 !important; }
        .lp-light .lp-stats .lp-stat-divider { background:rgba(0,0,0,.15) !important; }
        .lp-root:not(.lp-light) .lp-swipe-hint { color:#9896b0 !important; }
        .lp-light .lp-swipe-hint { color:#374151 !important; }

        /* ── THEME TOGGLE ── */
        .lp-theme-toggle { width:42px; height:22px; border-radius:100px; border:1px solid rgba(13,124,138,.4); background:rgba(13,124,138,.12); cursor:pointer; position:relative; display:flex; align-items:center; padding:0 2px; transition:background .3s,border-color .3s; flex-shrink:0; }
        .lp-theme-toggle-thumb { width:16px; height:16px; border-radius:50%; background:linear-gradient(135deg,#00857a,#00c9b1); transition:transform .3s cubic-bezier(.22,1,.36,1); box-shadow:0 2px 5px rgba(0,0,0,.25); }
        .lp-theme-toggle.light .lp-theme-toggle-thumb { transform:translateX(20px); background:linear-gradient(135deg,#6d28d9,#a78bfa); }
      `}</style>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} defaultLevel={authLevel} defaultMode={authMode}/>}

      {/* ── STICKY NAV ─────────────────────────────────────────────────────── */}
      <nav className="lp-nav" style={{
        position:"sticky", top:0, zIndex:1000,
        backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" as any,
      }}>
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
            <div className="lp-theme-toggle-thumb"/>
          </button>
          <button className="lp-btn-ghost" onClick={() => openAuth(activeTab, "login")}>Log In</button>
          <button className="lp-btn-primary" style={{ background:THEME }} onClick={() => openAuth(activeTab, "register")}>
            {activeTab === "2" ? "Start Level 2 →" : "Start Level 1 →"}
          </button>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="lp-hero">
        <div className="lp-hero-badge" style={{ color:THEME, background:`${THEME}1a`, borderColor:`${THEME}44` }}>
          {activeTab === "2" ? "🚀 Full-Stack AI & Agents" : "⚡ Vibe Coding for Builders"}
        </div>

        {/* Course identity block */}
        <div style={{ margin:"1.2rem auto 0", padding:"22px 28px 20px",
          background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.07)",
          borderRadius:"16px", maxWidth:"680px", textAlign:"center", position:"relative" }}>
          <div style={{ position:"absolute", top:9, left:14, fontSize:13, fontFamily:"monospace", color:`${THEME}cc`, letterSpacing:"1.5px" }}>
            MODULE No. AI-VIBE-L0{activeTab}
          </div>
          <div style={{ position:"absolute", top:9, right:14, fontSize:13, fontFamily:"monospace", color:`${THEME}cc`, letterSpacing:"1.5px" }}>
            {activeTab === "1" ? "BUILDER · 28 DAYS" : "ENGINEER · 28 DAYS"}
          </div>
          <div style={{ marginTop:10 }}>
            <div style={{ fontSize:"clamp(1.3rem,4vw,1.9rem)", fontWeight:900, color:"inherit", letterSpacing:".04em", textTransform:"uppercase", lineHeight:1.2, marginBottom:".5rem" }}>
              Vibe Coding
            </div>
            <div style={{ fontSize:".8rem", color:"#555", letterSpacing:".06em", marginBottom:".75rem", fontFamily:"monospace" }}>
              56-DAY COURSE · 15 MIN/DAY · 2 LEVELS
            </div>
            <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={() => setActiveTab("1")} style={{ fontSize:".82rem", fontWeight:700, color:L1_COLOR,
                background: activeTab === "1" ? `${L1_COLOR}25` : `${L1_COLOR}12`,
                border:`1px solid ${activeTab === "1" ? L1_COLOR : `${L1_COLOR}25`}`,
                borderRadius:100, padding:"3px 12px", cursor:"pointer", transition:"all 0.2s" }}>
                L1 · Builder · Days 1–28
              </button>
              <button onClick={() => setActiveTab("2")} style={{ fontSize:".82rem", fontWeight:700, color:L2_COLOR,
                background: activeTab === "2" ? `${L2_COLOR}25` : `${L2_COLOR}12`,
                border:`1px solid ${activeTab === "2" ? L2_COLOR : `${L2_COLOR}25`}`,
                borderRadius:100, padding:"3px 12px", cursor:"pointer", transition:"all 0.2s" }}>
                L2 · Engineer · Days 29–56
              </button>
            </div>
          </div>
        </div>

        <h1 className="lp-hero-h1" style={{ fontFamily:"monospace", letterSpacing:"-.01em" }}>{scrambledH1}</h1>
        <p className="lp-hero-tagline" style={{ color:THEME }}>{themeData.tagline}</p>
        <p className="lp-hero-sub">{themeData.heroSub}</p>

        {/* Audience line */}
        <p style={{ fontSize:".88rem", color:"var(--color-text-muted,#888)", maxWidth:"520px", margin:"0 auto", lineHeight:1.6, textAlign:"center", fontStyle:"italic" }}>
          {activeTab === "2"
            ? "For Level 1 graduates and developers ready to build full-stack AI products and agents."
            : "Designed for operators, freelancers, founders, and curious professionals. No coding background required."}
        </p>

        {/* Level tabs */}
        <div style={{ display:"flex", gap:"12px", justifyContent:"center", margin:"2rem 0 1rem", flexWrap:"wrap" }}>
          {(["1","2"] as const).map((lvl) => {
            const color = lvl === "1" ? L1_COLOR : L2_COLOR;
            const label = lvl === "1" ? "Level 1 · Builder" : "Level 2 · Engineer";
            const active = activeTab === lvl;
            return (
              <button key={lvl} onClick={() => setActiveTab(lvl)} style={{
                display:"flex", alignItems:"center", gap:"8px",
                padding:"10px 24px", borderRadius:"50px", cursor:"pointer",
                border:`1.5px solid ${active ? color : "rgba(255,255,255,0.15)"}`,
                background: active ? `${color}1a` : "transparent",
                color: active ? color : "rgba(255,255,255,0.5)",
                fontWeight:700, fontSize:".9rem", transition:"all 0.2s",
              }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:color, flexShrink:0 }}/>
                {label}
              </button>
            );
          })}
        </div>

        <div className="lp-hero-actions">
          <button className="lp-hero-cta" style={{ background:THEME }} onClick={() => openAuth(activeTab, "register")}>
            {themeData.cta}
          </button>
          {activeTab === "2" && (
            <button className="lp-hero-outline" onClick={() => setActiveTab("1")}>
              Start with Level 1 first
            </button>
          )}
        </div>

        {/* Urgency pill */}
        <div style={{ display:"flex", justifyContent:"center", margin:"1rem 0 0" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:".45rem",
            background:"rgba(249,115,22,.08)", border:"1px solid rgba(249,115,22,.25)",
            borderRadius:"100px", padding:".28rem 1rem",
            fontSize:".72rem", letterSpacing:"1.5px", textTransform:"uppercase",
            color:"#fb923c", fontWeight:700 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#f97316", display:"inline-block", animation:"lpPulse 2s infinite" }}/>
            {themeData.urgency}
          </div>
        </div>

        {/* Banner video */}
        <div style={{ margin:"2.5rem auto 0", maxWidth:380, borderRadius:16, overflow:"hidden", border:`1px solid ${THEME}33`, boxShadow:`0 20px 60px rgba(0,0,0,.4)` }}>
          <video src={bannerVideo} autoPlay loop muted playsInline style={{ width:"100%", display:"block" }}/>
        </div>

        {/* Animated stats */}
        <div className="lp-stats" ref={statsRef}>
          <div className="lp-stat"><span className="lp-stat-num">{s28}</span><span className="lp-stat-label">Days</span></div>
          <div className="lp-stat-divider"/>
          <div className="lp-stat"><span className="lp-stat-num">{s15}</span><span className="lp-stat-label">Min/Day</span></div>
          <div className="lp-stat-divider"/>
          <div className="lp-stat"><span className="lp-stat-num">2</span><span className="lp-stat-label">Levels</span></div>
          <div className="lp-stat-divider"/>
          <div className="lp-stat"><span className="lp-stat-num">0</span><span className="lp-stat-label">Exp. Needed</span></div>
        </div>
      </section>

      {/* Tech divider */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 24px 40px", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:`${THEME}25` }}/>
        <div style={{ display:"flex", gap:10, padding:"0 18px", flexWrap:"wrap", justifyContent:"center" }}>
          {themeData.dividerMarks.map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:`${THEME}88` }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`${THEME}25` }}/>
      </div>

      {/* ── WHAT YOU'LL LEARN ─────────────────────────────────────────────────── */}
      <section className="lp-section" style={{ background:"#0d0d14" }}>
        <div className="lp-section-inner">
          <div className="lp-section-label" style={{ color:THEME }}>{themeData.sectionLabel}</div>
          <h2 className="lp-section-h2">{themeData.sectionH2}</h2>
          <p className="lp-section-sub">
            {activeTab === "2"
              ? "Level 2 is for builders ready to go beyond local scripts — full-stack apps, autonomous agents, production deployment, and real product thinking."
              : "Level 1 gives you everything you need to build real tools with AI — without a coding background, without jargon, without getting lost."}
          </p>
          <div className="lp-why-grid" ref={cardsRef} style={{ display:"flex", flexDirection:"row", overflowX:"auto", gap:"14px", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch" as any, paddingBottom:"8px" }}>
            {WHY_CARDS[activeTab].map((c, i) => (
              <div key={i} className={`lp-why-card lp-reveal ${revealCards ? "visible" : ""}`}
                style={{ transition:`opacity .65s ease ${i*.12}s, transform .65s ease ${i*.12}s`, flex:"0 0 78vw", maxWidth:300 }}>
                <div className="lp-why-icon" style={{ color:c.color, background:c.bg, fontSize:"1.4rem", width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:12, marginBottom:"1rem" }}>{c.icon}</div>
                <h3 className="lp-card-title">{c.title}</h3>
                <p className="lp-card-body">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="lp-swipe-hint" style={{ textAlign:"center", fontSize:".65rem", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:".5rem" }}>← swipe to explore →</p>
        </div>
      </section>

      {/* Module divider */}
      <div style={{ display:"flex", alignItems:"center", padding:"0 24px", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:`${THEME}15` }}/>
        <div style={{ display:"flex", gap:10, padding:"0 18px" }}>
          {["REF: COURSE OUTCOMES", `MODULE L0${activeTab}`].map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:`${THEME}55` }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`${THEME}15` }}/>
      </div>

      {/* ── WHAT YOU'LL BUILD / WHO IT'S FOR ─────────────────────────────────── */}
      <section className="lp-dark-section">
        <div className="lp-section-inner">
          <div className="lp-two-col">
            <div className="lp-col-block">
              <h3 className="lp-col-heading">What you'll build</h3>
              <ul className="lp-check-list">
                {activeTab === "1" ? (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Your first working automation — by Day 7</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Internal tool with a Streamlit UI your team can use</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Scheduled scripts that run hands-free with GitHub Actions</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Personal dashboard pulling from live data sources</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> 3-script portfolio suite with README and demo recording</li>
                  </>
                ) : (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Full-stack AI app with streaming Claude API — by Day 7</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Autonomous agent with tool use, running on a schedule</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Deployed app: Vercel + Railway, auth, rate limiting, evals</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> CI/CD pipeline — auto-test on PR, auto-deploy on push</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Capstone: shipped AI product with live URL and real users</li>
                  </>
                )}
              </ul>
            </div>
            <div className="lp-col-block">
              <h3 className="lp-col-heading">Who it's for</h3>
              <ul className="lp-check-list">
                {activeTab === "1" ? (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Operators, freelancers, and founders with ideas to build</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Professionals who want to automate their own workflows</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Anyone curious about AI who learns by doing, not watching</li>
                  </>
                ) : (
                  <>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Level 1 graduates ready to go from scripts to products</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Developers who want to master AI-native full-stack builds</li>
                    <li className="lp-check-item"><span className="lp-check-icon" style={{ color:THEME }}>✓</span> Founders and operators who want to ship their own AI tools</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisite callout for L2 (from AI Strategy pattern) */}
      {activeTab === "2" && (
        <section style={{ padding:"40px 20px", background:`${L1_COLOR}0d`, borderTop:`1px solid ${L1_COLOR}22`, borderBottom:`1px solid ${L1_COLOR}22` }}>
          <div style={{ maxWidth:680, margin:"0 auto", display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:`${L1_COLOR}22`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Terminal size={20} color={L1_COLOR}/>
            </div>
            <div style={{ flex:1, minWidth:240 }}>
              <div style={{ fontWeight:700, color:"white", fontSize:"1rem", marginBottom:4 }}>
                New to building with AI? Start with Level 1 first.
              </div>
              <div style={{ color:"#888", fontSize:".9rem" }}>
                Level 2 assumes you can write and run basic Python scripts. If you're starting from zero, Level 1 is your foundation.
              </div>
            </div>
            <button onClick={() => setActiveTab("1")}
              style={{ padding:"10px 22px", borderRadius:8, border:`1px solid ${L1_COLOR}`, color:L1_COLOR, background:"transparent", fontWeight:700, cursor:"pointer", fontSize:".9rem", flexShrink:0 }}>
              Explore Level 1 →
            </button>
          </div>
        </section>
      )}

      {/* ── 7-DAY PREVIEW ─────────────────────────────────────────────────────── */}
      <section className="lp-seven-day-section" style={{ padding:"60px 20px", background:"#111", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:760, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase",
              color:THEME, background:`${THEME}18`, border:`1px solid ${THEME}30`, borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
              What You'll Learn
            </div>
            <h2 style={{ fontSize:"clamp(1.5rem,3.5vw,2rem)", fontWeight:800, color:"inherit", margin:"0 0 10px" }}>
              Your first 7 days, previewed
            </h2>
            <p style={{ color:"#888", fontSize:".92rem" }}>Every lesson is 15 minutes. Every day builds on the last.</p>
          </div>
          <div ref={sevenDayScrollRef} data-autoscroll="1" style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}>
            {SEVEN_DAYS[activeTab].map((d) => (
              <div key={d.day} style={{ display:"flex", alignItems:"center", gap:"1rem",
                background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.07)",
                borderRadius:12, padding:".85rem 1.2rem", flex:"0 0 100%", minWidth:0 }}>
                <div style={{ width:34, height:34, borderRadius:"50%", border:`2px solid ${d.color}`, color:d.color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:".72rem", flexShrink:0, fontFamily:"monospace" }}>{d.day}</div>
                <div className="lp-day-title" style={{ flex:1, fontWeight:600, color:"white", fontSize:".88rem" }}>{d.title}</div>
                <div style={{ fontSize:".65rem", fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:d.color, background:`${d.color}18`, borderRadius:100, padding:"3px 10px", whiteSpace:"nowrap" }}>{d.cat}</div>
              </div>
            ))}
          </div>
          <p className="lp-swipe-hint" style={{ textAlign:"center", fontSize:".65rem", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:".5rem" }}>← swipe all 7 days →</p>
          <div style={{ textAlign:"center", marginTop:24 }}>
            <button onClick={() => openAuth(activeTab, "register")} style={{ background:"transparent", border:`1px solid ${THEME}80`, color:THEME, padding:"10px 28px", borderRadius:100, fontWeight:700, fontSize:".88rem", cursor:"pointer" }}>
              See all 28 days — start today →
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section className="lp-testi-section" style={{ padding:"60px 20px", background:"#0d0d14", borderTop:"1px solid rgba(255,255,255,.06)", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:".72rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase",
              color:THEME, background:`${THEME}18`, border:`1px solid ${THEME}30`, borderRadius:20, padding:"5px 14px", marginBottom:14 }}>
              Student Stories
            </div>
            <h2 style={{ fontSize:"clamp(1.5rem,3.5vw,2rem)", fontWeight:800, color:"inherit", margin:"0 0 10px" }}>Real results from builders using AI</h2>
            <p style={{ color:"#888", fontSize:".95rem" }}>People who went from AI-curious to shipping real tools.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"row", overflow:"hidden", scrollbarWidth:"none" as any }}
            ref={(el) => { (testimonialsRef as any).current = el; (testiScrollRef as any).current = el; }}>
            {[
              { text:"I had never really built software before. By the end of the sprint, I had a working internal tool my team actually uses every week. That changed how I see myself.", name:"Daniel M.", role:"Operations Lead, Sydney", initials:"DM", color:L1_COLOR, course:"Vibe Coding · Level 1", photo:"/assets/testimonials/face-e.png" },
              { text:"I came in skeptical. I thought AI coding was hype. By Day 14 I had built two working automations and finally understood how to direct AI instead of just asking random questions.", name:"Sarah K.", role:"Freelancer, London", initials:"SK", color:"#2f6fa8", course:"Vibe Coding · Level 1", photo:null },
              { text:"Level 2 was the shift for me. Deployment, testing, and monitoring made me stop thinking in scripts and start thinking in products. I shipped my first live app in Week 3.", name:"Yuki S.", role:"Startup Operator, Tokyo", initials:"YS", color:L2_COLOR, course:"Vibe Coding · Level 2", photo:"/assets/testimonials/face-f.png" },
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
                    ? <img src={t.photo} alt={t.name} style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", flexShrink:0, border:`2px solid ${t.color}33` }}/>
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
          <p className="lp-swipe-hint" style={{ textAlign:"center", fontSize:".65rem", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:".5rem" }}>← swipe for more →</p>
        </div>
      </section>

      <ContactSection theme={THEME}/>

      {/* ── HUMANIZING IMAGE SECTION ──────────────────────────────────────────── */}
      <section className="lp-human-section" style={{ padding:"60px 20px", background:"#0d0d14", position:"relative", zIndex:1 }}>
        <div style={{ maxWidth:"820px", margin:"0 auto", display:"flex", flexDirection:"row", alignItems:"center", gap:"3rem", flexWrap:"wrap" }}>
          <div style={{ flex:"0 0 260px", maxWidth:"100%" }}>
            <img src="/assets/testimonials/face-e.png" alt="Builder using AI to create software"
              style={{ width:"100%", borderRadius:20, objectFit:"cover", objectPosition:"center top",
                boxShadow:"0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(13,124,138,.15)",
                border:`1px solid ${THEME}33` }}/>
          </div>
          <div style={{ flex:1, minWidth:240 }}>
            <div style={{ fontSize:".7rem", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase", color:THEME, marginBottom:"1rem" }}>✦ Who this is for</div>
            <h2 style={{ fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, color:"inherit", lineHeight:1.25, marginBottom:"1rem" }}>
              You do not need to be an engineer.<br/>You need to learn how to build with AI.
            </h2>
            <p style={{ color:"var(--lp-body,#9896b0)", lineHeight:1.75, fontSize:".95rem", marginBottom:"1.25rem" }}>
              AI Sprint Vibe Coding is built for people who want to turn ideas into working tools, automations, and apps with AI — fast. No CS degree. No prior coding experience. Just 15 minutes a day and the willingness to build.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:".6rem", marginBottom:"1.5rem" }}>
              {[
                "Perfect for operators, freelancers, founders, and curious builders",
                "Built around real outputs — scripts, apps, APIs, and internal tools",
                "15 minutes a day — enough to build real momentum fast",
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
              {themeData.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA divider */}
      <div className="lp-join-banner" style={{ display:"flex", alignItems:"center", padding:"40px 24px 0", zIndex:1, position:"relative" }}>
        <div style={{ flex:1, height:1, background:`${THEME}40` }}/>
        <div style={{ display:"flex", gap:10, padding:"0 18px" }}>
          {["START TODAY", `BEGIN LEVEL 0${activeTab}`].map((m,i) => (
            <span key={i} style={{ fontFamily:"monospace", fontSize:"12px", letterSpacing:"2px", color:THEME, opacity:.7 }}>[ {m} ]</span>
          ))}
        </div>
        <div style={{ flex:1, height:1, background:`${THEME}40` }}/>
      </div>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section id="lp-cta" className="lp-cta-section" style={{ background:THEME, paddingBottom:"60px" }}>
        <div className="lp-section-inner" style={{ textAlign:"center" }}>
          <h2 className="lp-cta-h2">
            {activeTab === "1" ? "Ready to build your first real tools with AI?" : "Ready to ship production-ready software with AI?"}
          </h2>
          <p className="lp-cta-sub" style={{ color:"rgba(255,255,255,.9)", fontWeight:600, fontSize:"1.05rem" }}>
            {activeTab === "1"
              ? "Join 423 builders creating automations, scripts, and apps with AI — 15 minutes a day, 28 days, no fluff."
              : "Join 187 builders learning to deploy, test, and ship production-ready tools with AI."}
          </p>
          <button className="lp-cta-btn" style={{ background:"#ffffff", color:THEME, fontWeight:"bold" }} onClick={() => openAuth(activeTab, "register")}>
            {themeData.cta}
          </button>
        </div>
      </section>

    </div>
  );
}
