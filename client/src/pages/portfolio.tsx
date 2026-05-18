// ── AI Sprint · Architecture & Interior Design ──────────────────────────────
// File: portfolio.tsx | Repo: ai-archi
// Last updated: May 2026
//
// The end section (CTA + "What's Next?") is context-aware:
//   • Responds to activeLevel, pct (progress), and hasL2 (license)
//   • L1 in progress  → encourage, show what's coming in L2
//   • L1 complete     → celebrate, prompt L2 if not yet owned
//   • L2 in progress  → reinforce studio-level work
//   • L2 complete     → full completion celebration
// ─────────────────────────────────────────────────────────────────────────────
import Nav from "@/components/nav";
import { portfolioTargets, weekOverviewsL1, weekOverviewsL2 } from "@/data/curriculum";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/auth-provider";
import type { DayProgress } from "@shared/schema";
import { CheckCircle2, Target, Lock, ArrowRight, Layers, Trophy, Rocket, Star } from "lucide-react";
import { useLanguage } from "@/i18n";
import { useState } from "react";
import { Link } from "wouter";

const L1_COLOR = "#0d7c8a";
const L2_COLOR = "#8b5cf6";

export default function PortfolioPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeLevel, setActiveLevel] = useState<"1" | "2">("1");

  const THEME = activeLevel === "1" ? L1_COLOR : L2_COLOR;
  const weekOverviews = activeLevel === "1" ? weekOverviewsL1 : weekOverviewsL2;

  const licensed = user?.licensedLevels || [];
  const hasL1 = licensed.includes("1") || licensed.includes("bundle");
  const hasL2 = licensed.includes("2") || licensed.includes("bundle");
  const hasCurrentLevel = activeLevel === "1" ? hasL1 : hasL2;

  const { data: progressData = [] } = useQuery<DayProgress[]>({
    queryKey: ["/api/progress"],
  });

  const levelPrefix = `L${activeLevel}-`;
  const levelProgress = progressData.filter((p) =>
    String(p.dayNumber).startsWith(levelPrefix)
  );
  const completedCount = levelProgress.filter((p) => p.completed).length;
  const pct = Math.round((completedCount / 28) * 100);

  const levelTargets = portfolioTargets.filter((t) => t.level === Number(activeLevel));

  return (
    <div className="page-wrap">
      <Nav />
      <main className="inner-page">
        <div className="inner-page-header">
          <div className="inner-page-badge">Portfolio & Certifications</div>
          <h1 className="inner-page-title">Your Architecture & Interior Design Portfolio</h1>
          <p className="inner-page-sub">Track your progress and earn certifications as you complete each level</p>

          {/* Level switcher - 2 levels */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {(["1", "2"] as const).map((lvl) => {
              const color = lvl === "1" ? L1_COLOR : L2_COLOR;
              const label = lvl === "1" ? "Level 1 · Foundation" : "Level 2 · Professional";
              const licensed = lvl === "1" ? hasL1 : hasL2;
              const active = activeLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => licensed && setActiveLevel(lvl)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "8px 20px", borderRadius: "50px",
                    cursor: licensed ? "pointer" : "not-allowed",
                    border: `1.5px solid ${active ? color : "var(--color-border)"}`,
                    background: active ? `${color}1a` : "transparent",
                    color: active ? color : "var(--color-text-muted)",
                    fontWeight: 700, fontSize: "0.85rem",
                    opacity: licensed ? 1 : 0.5,
                  }}
                >
                  {!licensed && <Lock size={12} />}
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="portfolio-progress-bar">
          <div className="progress-header">
            <span>Your Progress — {activeLevel === "1" ? "Level 1 Foundation" : "Level 2 Professional"}</span>
            <span>{pct}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct}%`, background: THEME }} />
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: 4 }}>
            {completedCount} of 28 days complete
          </div>
        </div>

        {!hasCurrentLevel && (
          <div style={{ background: `${THEME}1a`, border: `1px solid ${THEME}44`, borderRadius: 12, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, marginBottom: "2rem" }}>
            <Lock size={16} style={{ color: THEME }} />
            <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}>
              {activeLevel === "1" ? "Level 1 Foundation" : "Level 2 Professional"} is not included in your current plan.
            </span>
            <Link href="/pricing" style={{ color: THEME, fontWeight: 700, fontSize: "0.9rem", textDecoration: "underline" }}>
              Upgrade →
            </Link>
          </div>
        )}

        {/* Targets by week */}
        {[1, 2, 3, 4].map((week) => {
          const weekTargets = levelTargets.filter((t) => t.week === week);
          if (weekTargets.length === 0) return null;
          const overview = weekOverviews[week - 1];
          const color = overview?.color || THEME;
          return (
            <div key={week} className="portfolio-week">
              <div className="portfolio-week-header">
                <span className="week-num" style={{ background: color }}>
                  Week {week}
                </span>
                <span className="portfolio-week-title">{overview?.title}</span>
              </div>
              <div className="portfolio-targets-grid">
                {weekTargets.map((target, i) => (
                  <div key={i} className="portfolio-target-card">
                    <div className="portfolio-target-icon" style={{ color }}>
                      <Target size={20} />
                    </div>
                    <div>
                      <div className="portfolio-target-title">{target.title}</div>
                      <div className="portfolio-target-desc">{target.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* ── Portfolio CTA ────────────────────────────────────────────────── */}
        <div className="portfolio-cta">
          <div className="portfolio-cta-icon"><CheckCircle2 size={28} /></div>
          <div className="portfolio-cta-title">Your Portfolio = Proof of Mastery</div>
          <p className="portfolio-cta-text">
            Every deliverable you complete is a real work product — concept visuals,
            prompt systems, and presentation-ready outputs you can show clients,
            employers, or add directly to your design portfolio.
          </p>
        </div>

        {/* ── Context-aware "What's Next?" ─────────────────────────────────── */}
        {activeLevel === "1" && pct < 100 && (
          /* L1 in progress — encourage + preview L2 */
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${L1_COLOR}33`, marginBottom: "2rem" }}>
            {/* Header strip */}
            <div style={{ background: `linear-gradient(135deg, ${L1_COLOR}22, ${L1_COLOR}0a)`, borderBottom: `1px solid ${L1_COLOR}22`, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${L1_COLOR}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Rocket size={20} style={{ color: L1_COLOR }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--color-text)" }}>
                  Keep building — you're {pct}% through Level 1
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                  {28 - completedCount} day{28 - completedCount !== 1 ? "s" : ""} remaining · Foundation track
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
                Finish Level 1 to earn your <strong style={{ color: "var(--color-text)" }}>Foundation Certificate</strong> and
                unlock Level 2 — where you'll build advanced prompt systems, multi-view
                consistency workflows, and a studio-ready presentation process.
              </div>

              {/* L2 preview pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {[
                  "Advanced prompt systems",
                  "Visual consistency across views",
                  "Studio workflow integration",
                  "Client-ready presentation sets",
                ].map((item) => (
                  <span key={item} style={{ fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: 100, background: `${L2_COLOR}14`, border: `1px solid ${L2_COLOR}33`, color: L2_COLOR }}>
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: L1_COLOR, color: "white", fontWeight: 700, fontSize: "0.9rem", padding: "10px 22px", borderRadius: 100, textDecoration: "none", boxShadow: `0 4px 14px ${L1_COLOR}44` }}
              >
                Continue Level 1 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {activeLevel === "1" && pct === 100 && (
          /* L1 complete — celebrate + prompt L2 */
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${L1_COLOR}44`, marginBottom: "2rem" }}>
            {/* Celebration strip */}
            <div style={{ background: `linear-gradient(135deg, ${L1_COLOR}33, ${L1_COLOR}11)`, borderBottom: `1px solid ${L1_COLOR}33`, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${L1_COLOR}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Trophy size={20} style={{ color: L1_COLOR }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--color-text)" }}>
                  Level 1 Complete — Foundation Certificate Earned
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                  28 days · All deliverables complete
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
                You've built a real AI design foundation — prompt skills, concept workflows,
                and a portfolio of work you can use. Level 2 takes you further: advanced
                visual systems, studio-level consistency, and professional presentation workflows.
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {hasL2 ? (
                  <button
                    onClick={() => setActiveLevel("2")}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: L2_COLOR, color: "white", fontWeight: 700, fontSize: "0.9rem", padding: "10px 22px", borderRadius: 100, border: "none", cursor: "pointer", boxShadow: `0 4px 14px ${L2_COLOR}44` }}
                  >
                    <Layers size={15} /> View Level 2 Portfolio
                  </button>
                ) : (
                  <Link
                    href="/pricing"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: L2_COLOR, color: "white", fontWeight: 700, fontSize: "0.9rem", padding: "10px 22px", borderRadius: 100, textDecoration: "none", boxShadow: `0 4px 14px ${L2_COLOR}44` }}
                  >
                    Unlock Level 2 <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {activeLevel === "2" && pct < 100 && (
          /* L2 in progress — reinforce studio work */
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${L2_COLOR}33`, marginBottom: "2rem" }}>
            <div style={{ background: `linear-gradient(135deg, ${L2_COLOR}22, ${L2_COLOR}0a)`, borderBottom: `1px solid ${L2_COLOR}22`, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${L2_COLOR}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Layers size={20} style={{ color: L2_COLOR }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--color-text)" }}>
                  Advanced track — {pct}% through Level 2
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                  {28 - completedCount} day{28 - completedCount !== 1 ? "s" : ""} remaining · Professional track
                </div>
              </div>
            </div>

            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
                You're building the workflows that separate good designers from great ones —
                consistent visual systems, client-ready outputs, and a repeatable studio process
                driven by AI. Your Professional Certificate is waiting at Day 28.
              </div>

              <Link
                href="/"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: L2_COLOR, color: "white", fontWeight: 700, fontSize: "0.9rem", padding: "10px 22px", borderRadius: 100, textDecoration: "none", boxShadow: `0 4px 14px ${L2_COLOR}44` }}
              >
                Continue Level 2 <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {activeLevel === "2" && pct === 100 && (
          /* L2 complete — full course celebration */
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${L2_COLOR}44`, marginBottom: "2rem" }}>
            <div style={{ background: `linear-gradient(135deg, ${L2_COLOR}33, ${L1_COLOR}22)`, borderBottom: `1px solid ${L2_COLOR}33`, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${L2_COLOR}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Star size={20} style={{ color: L2_COLOR }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--color-text)" }}>
                  Both Levels Complete — Full Course Mastery
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", marginTop: 2 }}>
                  Foundation + Professional · 56 days · 2 certificates earned
                </div>
              </div>
            </div>

            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: 20 }}>
                You've completed the full Architecture & Interior Design AI course.
                You have the prompt skills, visual systems, and studio workflow to use AI
                as a real professional tool — not just a novelty. Share your work, use your
                certificates, and keep building.
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { label: "Foundation Certificate", color: L1_COLOR },
                  { label: "Professional Certificate", color: L2_COLOR },
                ].map((cert) => (
                  <span key={cert.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: 100, background: `${cert.color}18`, border: `1px solid ${cert.color}44`, color: cert.color }}>
                    <CheckCircle2 size={12} /> {cert.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}