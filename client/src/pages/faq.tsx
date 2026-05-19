// ── AI Sprint · Vibe Coding & IOP ────
// File: faq.tsx | Repo: ai-vibe-coding
// Last updated: May 2026
//
// Dark/light mode fully supported – uses useTheme() hook for conditional styling.
// Color tokens follow AI Skills settings.tsx pattern:
//   textColor / textMuted / bgCard / borderColor / inputBg / inputBorder
//
// ── THEME SYSTEM ──────────────────────────────────────────────────────────────────────────────
// isDark is sourced from useTheme() — the same React context Nav uses — so the
// toggle in Nav propagates instantly to this page with zero delay.
//
// Dark  → near-black bg (#0a0a0c / rgba(22,23,30))  + light text (#e8e6f4 / #aaa)
// Light → white/light-gray bg (#f4f6fb / #ffffff)   + dark text  (#111827 / #374151)
//
// ALL previously hardcoded dark-only colors ("white", "rgba(0,0,0,0.3)",
// "rgba(22,23,30,0.4)", "#aaa", "#888", "#555") are now driven by isDark tokens.
//
// ── TESTIMONIALS ──────────────────────────────────────────────────────────────────────────────
// Curated static testimonials displayed above the live community reviews section.
// These are always shown and do not require API data.
// ─────────────────────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Nav from "@/components/nav";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/i18n";
import {
  ChevronDown, ChevronUp, HelpCircle, Key, MessageSquare,
  Shield, CreditCard, Globe, Mail, CheckCircle2, X,
  Star, Send, AlertCircle, UserCircle,
} from "lucide-react";

// ── Brand accent ──────────────────────────────────────────────────────────────
const ACCENT = "#0d7c8a";

// ── Curated static testimonials ───────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Marcus L.", role: "Product Manager, London",
    level: "Level 1 · Foundation", levelColor: ACCENT, initials: "ML",
    photo: "/assets/testimonials/face-g.png", rating: 5,
    text: "I used to spend hours trying to explain a concept before I even had something strong to show. After Level 1, I could generate room directions faster and walk into client conversations with much more confidence.",
  },
  {
    name: "James W.", role: "Software Builder, Singapore",
    level: "Level 2 · Professional", levelColor: "#8b5cf6", initials: "JW",
    photo: null, rating: 5,
    text: "The workflow I built in Level 2 helped me keep style and materials consistent across multiple views. That alone changed how I prepare presentation visuals for clients.",
  },
  {
    name: "Priya M.", role: "Design Consultant, Toronto",
    level: "Level 1 · Foundation", levelColor: ACCENT, initials: "PM",
    photo: null, rating: 5,
    text: "15 minutes a day felt small at first, but by Week 4 I had concept images, a cleaner prompt system, and a mini portfolio piece I could actually use in my process.",
  },
  {
    name: "Sofia R.", role: "Marketing Manager, Madrid",
    level: "Level 1 · Foundation", levelColor: ACCENT, initials: "SR",
    photo: null, rating: 5,
    text: "As a student this gave me a real edge. I submitted AI-assisted concept visuals for my final review and my tutors were genuinely impressed by the clarity of my design direction.",
  },
  {
    name: "David K.", role: "Entrepreneur, Sydney",
    level: "Level 2 · Professional", levelColor: "#8b5cf6", initials: "DK",
    photo: null, rating: 5,
    text: "Level 2 pushed me to think about AI as a systematic tool, not just a one-off trick. My whole presentation pipeline is faster and more consistent now.",
  },
];

// ── FAQSection ────────────────────────────────────────────────────────────────
interface FAQItem { q: string; a: string; }

function FAQSection({
  title, icon, items, accent, isDark,
}: {
  title: string; icon: React.ReactNode; items: FAQItem[];
  accent?: string; isDark: boolean;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isRealTalk  = !!accent;
  const accentColor = accent || ACCENT;

  const itemBg = (open: boolean) => isDark
    ? (isRealTalk ? `${ACCENT}08` : "rgba(22,23,30,0.4)")
    : (open ? "#ffffff" : isRealTalk ? `${ACCENT}05` : "#ffffff");
  const itemBorderClr = (open: boolean) => isDark
    ? (open ? `${accentColor}44` : isRealTalk ? "rgba(13,124,138,.18)" : "rgba(255,255,255,0.08)")
    : (open ? `${accentColor}55` : isRealTalk ? "rgba(13,124,138,.20)" : "rgba(0,0,0,0.09)");
  const questionClr = isDark ? "#e8e6f4" : "#111827";
  const answerClr   = isDark ? (isRealTalk ? "#ccc" : "#aaa") : "#374151";
  const chevronMuted = isDark ? "#666" : "#9ca3af";

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      {isRealTalk && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${ACCENT}12`, border: `1px solid ${ACCENT}33`, borderRadius: 100, padding: "4px 14px", marginBottom: "1rem", fontSize: ".7rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: accentColor }}>
          ✦ The questions most people are actually thinking
        </div>
      )}
      <h2 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: isDark ? "#e8e6f4" : "#111827" }}>
        {icon} {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: itemBg(openIdx === i), border: `1px solid ${itemBorderClr(openIdx === i)}`, borderRadius: 12, overflow: "hidden", transition: "border-color .2s, background .2s", boxShadow: (!isDark && openIdx === i) ? "0 2px 12px rgba(0,0,0,0.06)" : "none" }}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem", background: "none", border: "none", color: questionClr, fontWeight: 600, cursor: "pointer", textAlign: "left", fontSize: isRealTalk ? "1rem" : "0.95rem" }}
            >
              <span>{item.q}</span>
              {openIdx === i
                ? <ChevronUp size={16} color={accentColor} />
                : <ChevronDown size={16} color={chevronMuted} />}
            </button>
            {openIdx === i && (
              <div style={{ padding: "0 1.25rem 1.25rem", color: answerClr, fontSize: "0.95rem", lineHeight: "1.7" }}>
                {item.a.split("\n").map((line, j) =>
                  line.trim() ? <p key={j} style={{ margin: "0 0 0.6rem 0" }}>{line}</p> : null
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ContactSupportForm ────────────────────────────────────────────────────────
function ContactSupportForm({ isDark }: { isDark: boolean }) {
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

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
      else setError("Something went wrong. Please email us directly at support@aisprint.app");
    } catch { setError("Network error. Please email us directly at support@aisprint.app"); }
    finally   { setSubmitting(false); }
  }

  const cardBg      = isDark ? "rgba(22,23,30,0.4)"     : "#ffffff";
  const cardBorder  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";
  const cardShadow  = isDark ? "none"                   : "0 4px 20px rgba(0,0,0,0.06)";
  const labelClr    = isDark ? "#aaa"                   : "#374151";
  const inputBg     = isDark ? "rgba(0,0,0,0.3)"        : "#f9fafb";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.12)";
  const inputClr    = isDark ? "#ffffff"                : "#111827";
  const headingClr  = isDark ? "#e8e6f4"                : "#111827";
  const bodyClr     = isDark ? "#888"                   : "#4b5563";

  if (submitted) {
    return (
      <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
        <CheckCircle2 size={48} color="#22c55e" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ color: headingClr, margin: "0 0 8px", fontSize: "1.2rem" }}>Message sent!</h3>
        <p style={{ color: bodyClr, margin: 0 }}>We'll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} style={{ marginTop: 20, background: "none", border: `1px solid ${isDark ? "#333" : "rgba(0,0,0,0.15)"}`, color: isDark ? "#888" : "#6b7280", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem" }}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 18, boxShadow: cardShadow }}>
      <input type="hidden" name="access_key" value="9354c53d-f37d-4c31-845b-88286c03d1d4" />
      <input type="hidden" name="to"         value="support@aisprint.app" />
      <input type="hidden" name="subject"    value="AI Sprint Vibe Coding & IOP Support Request" />
      <input type="hidden" name="from_name"  value="AI Sprint FAQ Page" />

      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "10px 14px", borderRadius: 8, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 8 }}>
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {[
          { icon: <UserCircle size={13} />, label: "Your Name",  name: "name",  type: "text",  ph: "Jane Doe" },
          { icon: <Mail size={13} />,       label: "Your Email", name: "email", type: "email", ph: "you@example.com" },
        ].map((f) => (
          <div key={f.name} style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: labelClr, display: "flex", alignItems: "center", gap: 6 }}>
              {f.icon} {f.label}
            </label>
            <input type={f.type} name={f.name} placeholder={f.ph} required
              style={{ padding: "11px 14px", borderRadius: 8, border: `1px solid ${inputBorder}`, background: inputBg, color: inputClr, fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: "0.8rem", fontWeight: 600, color: labelClr }}>Message</label>
        <textarea name="message" placeholder="Describe your issue or question…" required rows={5}
          style={{ padding: "11px 14px", borderRadius: 8, border: `1px solid ${inputBorder}`, background: inputBg, color: inputClr, fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }} />
      </div>

      <button type="submit" disabled={submitting}
        style={{ padding: "13px", borderRadius: 8, border: "none", background: submitting ? (isDark ? "#555" : "#9ca3af") : ACCENT, color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: submitting ? "none" : `0 4px 14px ${ACCENT}44` }}>
        <Send size={15} />
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

// ── StarRow helper ────────────────────────────────────────────────────────────
function StarRow({ rating, size = 14, mutedColor = "#9ca3af" }: { rating: number; size?: number; mutedColor?: string }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size} fill={s <= rating ? "#f59e0b" : "transparent"} color={s <= rating ? "#f59e0b" : mutedColor} />
      ))}
    </div>
  );
}

// ── FAQ Page ──────────────────────────────────────────────────────────────────
export default function FAQPage() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [reviewStatus, setReviewStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [rating, setRating] = useState(5);

  const { data: liveReviews = [] } = useQuery<{ id: number; name: string; review: string; rating: number; createdAt: string }[]>({
    queryKey: ["/api/reviews"],
  });

  // ── Page design tokens ──────────────────────────────────────────────────────
  const pageBg       = isDark ? "radial-gradient(circle at 50% 0%, rgba(13,124,138,0.05) 0%, #0a0a0c 100%)" : "#f4f6fb";
  const headingClr   = isDark ? "#e8e6f4"                : "#111827";
  const bodyClr      = isDark ? "#aaa"                   : "#4b5563";
  const mutedClr     = isDark ? "#888"                   : "#6b7280";
  const dividerClr   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";
  const cardBg       = isDark ? "rgba(22,23,30,0.4)"     : "#ffffff";
  const cardBorder   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)";
  const cardShadow   = isDark ? "none"                   : "0 2px 12px rgba(0,0,0,0.06)";
  const labelClr     = isDark ? "#aaa"                   : "#374151";
  const inputBg      = isDark ? "rgba(0,0,0,0.3)"        : "#f9fafb";
  const inputBorder  = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.12)";
  const inputClr     = isDark ? "#ffffff"                : "#111827";
  const starMuted    = isDark ? "#555"                   : "#d1d5db";
  const reviewTextClr = isDark ? "#ddd"                  : "#374151";
  const reviewNameClr = isDark ? "#888"                  : "#6b7280";
  const emptyClr     = isDark ? "#666"                   : "#9ca3af";

  const sections = [
    { title: t("faq.realTalk"),       icon: <MessageSquare size={18} color={ACCENT} />, accent: ACCENT,
      items: [ { q: t("faq.rt1"), a: t("faq.rt1a") }, { q: t("faq.rt2"), a: t("faq.rt2a") }, { q: t("faq.rt3"), a: t("faq.rt3a") }, { q: t("faq.rt4"), a: t("faq.rt4a") }, { q: t("faq.rt5"), a: t("faq.rt5a") }, { q: t("faq.rt6"), a: t("faq.rt6a") } ] },
    { title: t("faq.gettingStarted"), icon: <HelpCircle size={18} color={ACCENT} />,
      items: [ { q: t("faq.q1"), a: t("faq.a1") }, { q: t("faq.q2"), a: t("faq.a2") }, { q: t("faq.q3"), a: t("faq.a3") } ] },
    { title: t("faq.aiCoach"),        icon: <MessageSquare size={18} color={ACCENT} />,
      items: [ { q: t("faq.q4"), a: t("faq.a4") }, { q: t("faq.q_promptlab"), a: t("faq.a_promptlab") }, { q: t("faq.q5"), a: t("faq.a5") }, { q: t("faq.q6"), a: t("faq.a6") } ] },
    { title: t("faq.apiSetup"),       icon: <Key size={18} color={ACCENT} />,
      items: [ { q: t("faq.q7"), a: t("faq.a7") }, { q: t("faq.q8"), a: t("faq.a8") }, { q: t("faq.q9"), a: t("faq.a9") }, { q: t("faq.q10"), a: t("faq.a10") }, { q: t("faq.q11"), a: t("faq.a11") } ] },
    { title: t("faq.costs"),          icon: <CreditCard size={18} color={ACCENT} />,
      items: [ { q: t("faq.q12"), a: t("faq.a12") }, { q: t("faq.q13"), a: t("faq.a13") }, { q: t("faq.q14"), a: t("faq.a14") } ] },
    { title: t("faq.privacy"),        icon: <Shield size={18} color={ACCENT} />,
      items: [ { q: t("faq.q15"), a: t("faq.a15") }, { q: t("faq.q16"), a: t("faq.a16") }, { q: t("faq.q17"), a: t("faq.a17") } ] },
    { title: t("faq.regional"),       icon: <Globe size={18} color={ACCENT} />,
      items: [ { q: t("faq.q18"), a: t("faq.a18") }, { q: t("faq.q19"), a: t("faq.a19") } ] },
  ];

  const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReviewStatus("submitting");
    const form    = event.currentTarget;
    const name    = (form.elements.namedItem("name")    as HTMLInputElement).value.trim();
    const email   = (form.elements.namedItem("email")   as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    try {
      const res  = await fetch("/api/reviews/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, review: message, rating }) });
      const json = await res.json();
      if (res.ok && json.ok) { setReviewStatus("success"); form.reset(); setRating(5); setTimeout(() => setReviewStatus("idle"), 4000); }
      else { setReviewStatus("error"); setTimeout(() => setReviewStatus("idle"), 4000); }
    } catch { setReviewStatus("error"); setTimeout(() => setReviewStatus("idle"), 4000); }
  };

  return (
    <div style={{ background: pageBg, minHeight: "100vh", color: headingClr, transition: "background 0.3s, color 0.3s" }}>
      <Nav />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <header style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "50%", background: `${ACCENT}18`, color: ACCENT, marginBottom: "1.5rem" }}>
            <HelpCircle size={32} />
          </div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: headingClr, marginBottom: "1rem" }}>
            {t("faq.title")}
          </h1>
          <p style={{ color: bodyClr, fontSize: "1.1rem" }}>{t("faq.desc")}</p>
        </header>

        {/* ── FAQ Sections ────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: "4rem" }}>
          {sections.map((s, i) => (
            <FAQSection key={i} title={s.title} icon={s.icon} items={s.items} accent={(s as any).accent} isDark={isDark} />
          ))}
        </div>

        <hr style={{ border: "none", borderTop: `1px solid ${dividerClr}`, margin: "4rem 0" }} />

        {/* ── Contact Support ─────────────────────────────────────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 6, display: "flex", alignItems: "center", gap: 8, color: headingClr }}>
            <Mail size={20} color={ACCENT} /> Contact Support
          </h2>
          <p style={{ color: mutedClr, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            We'll get back to you at{" "}
            <a href="mailto:support@aisprint.app" style={{ color: ACCENT, textDecoration: "underline", textUnderlineOffset: 3 }}>
              support@aisprint.app
            </a>
          </p>
          <ContactSupportForm isDark={isDark} />
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${dividerClr}`, margin: "4rem 0" }} />

        {/* ── Curated Testimonials ────────────────────────────────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: ACCENT, background: `${ACCENT}18`, border: `1px solid ${ACCENT}30`, borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>
              Student Stories
            </div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, color: headingClr, margin: "0 0 10px" }}>
              Real results from designers
            </h2>
            <p style={{ color: mutedClr, fontSize: ".95rem" }}>
              Professionals and creators sharing their experience.
            </p>
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: 16, padding: "1.4rem 1.5rem", boxShadow: cardShadow, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {/* Level pill */}
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: t.levelColor, background: `${t.levelColor}18`, border: `1px solid ${t.levelColor}33`, borderRadius: 100, padding: "3px 10px", width: "fit-content" }}>
                  {t.level}
                </div>
                {/* Stars */}
                <StarRow rating={t.rating} mutedColor={isDark ? "#555" : "#d1d5db"} />
                {/* Quote */}
                <p style={{ color: isDark ? "#ddd" : "#374151", fontSize: ".9rem", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>
                  "{t.text}"
                </p>
                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: ".7rem", marginTop: "auto" }}>
                  {t.photo
                    ? <img src={t.photo} alt={t.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${t.levelColor}33` }} />
                    : <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${t.levelColor}22`, color: t.levelColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: ".75rem", flexShrink: 0 }}>{t.initials}</div>
                  }
                  <div>
                    <div style={{ fontSize: ".82rem", fontWeight: 700, color: headingClr }}>{t.name}</div>
                    <div style={{ fontSize: ".72rem", color: mutedClr }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: "none", borderTop: `1px solid ${dividerClr}`, margin: "4rem 0" }} />

        {/* ── Submit Review Form ──────────────────────────────────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 8, color: headingClr }}>
            <Star size={20} color={ACCENT} /> Submit a Review
          </h2>
          <form onSubmit={handleReviewSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", background: cardBg, border: `1px solid ${cardBorder}`, padding: "2.5rem", borderRadius: 16, boxShadow: cardShadow }}>

            {/* Name + Email */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[
                { label: "Your Name",  name: "name",  type: "text",  ph: "Jane Doe" },
                { label: "Your Email", name: "email", type: "email", ph: "you@example.com" },
              ].map((f) => (
                <div key={f.name} style={{ flex: "1 1 180px" }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem", color: labelClr }}>{f.label}</label>
                  <input type={f.type} name={f.name} placeholder={f.ph} required
                    style={{ width: "100%", padding: "0.75rem 1rem", background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, color: inputClr, boxSizing: "border-box", outline: "none", fontSize: "0.95rem" }} />
                </div>
              ))}
            </div>

            {/* Star rating picker */}
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.75rem", color: labelClr }}>Rating</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                    <Star size={24} fill={star <= rating ? "#f59e0b" : "transparent"} color={star <= rating ? "#f59e0b" : starMuted} />
                  </button>
                ))}
              </div>
            </div>

            {/* Review textarea */}
            <div>
              <label style={{ display: "block", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.5rem", color: labelClr }}>Your Review</label>
              <textarea name="message" required rows={3} placeholder="How is your experience with the course?"
                style={{ width: "100%", padding: "0.75rem 1rem", background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, color: inputClr, resize: "vertical", boxSizing: "border-box", outline: "none", fontFamily: "inherit", lineHeight: 1.5, fontSize: "0.95rem" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <button type="submit" disabled={reviewStatus === "submitting"}
                style={{ background: reviewStatus === "submitting" ? (isDark ? "#444" : "#9ca3af") : ACCENT, color: "white", border: "none", padding: "0.75rem 2.5rem", borderRadius: 8, fontWeight: 700, fontSize: "0.95rem", cursor: reviewStatus === "submitting" ? "not-allowed" : "pointer", boxShadow: reviewStatus === "submitting" ? "none" : `0 4px 14px ${ACCENT}44` }}>
                {reviewStatus === "submitting" ? "Submitting…" : "Post Review"}
              </button>
              {reviewStatus === "success" && <p style={{ color: "#22c55e", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, margin: 0 }}><CheckCircle2 size={16} /> Review submitted — thank you!</p>}
              {reviewStatus === "error"   && <p style={{ color: "#ef4444", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6, margin: 0 }}><X size={16} /> Something went wrong. Please try again.</p>}
            </div>
          </form>
        </section>

        {/* ── Live Community Reviews ──────────────────────────────────────────── */}
        <section>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", color: headingClr }}>
            Community Reviews
          </h3>
          {liveReviews.length === 0 ? (
            <p style={{ color: emptyClr, fontSize: "0.9rem" }}>No reviews yet. Be the first to share your experience!</p>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {liveReviews.map((r) => (
                <div key={r.id} style={{ padding: "1.5rem", background: cardBg, borderRadius: 12, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
                  <StarRow rating={r.rating} mutedColor={isDark ? "#555" : "#d1d5db"} />
                  <p style={{ color: reviewTextClr, fontSize: "0.95rem", lineHeight: 1.5, margin: "0.5rem 0", fontStyle: "italic" }}>"{r.review}"</p>
                  <div style={{ fontSize: "0.8rem", color: reviewNameClr }}>— {r.name}</div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}