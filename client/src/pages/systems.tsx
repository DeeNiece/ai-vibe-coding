// ── AI Sprint · Vibe Coding & IOP ────
// File: systems.tsx | Repo: ai-vibe-coding
// Last updated: May 2026
//
// Dark/light mode fully supported – uses useTheme() hook (same pattern as settings.tsx).
// Displays systemsSummaryL1/L2, metricsToTrack, and portfolioTargets from curriculum.ts —
// all of which are vibe-coding specific (no accounting content).

import { useState } from "react";
import Nav from "@/components/nav";
import { useTheme } from "@/components/theme-provider";
import { systemsSummaryL1, systemsSummaryL2, metricsToTrack, portfolioTargets } from "@/data/curriculum";
import { Layers, BarChart2, CheckCircle2, Settings, TrendingUp, Target } from "lucide-react";

const L1_COLOR = "#0d7c8a"; // Teal  — Foundation (Crafter)
const L2_COLOR = "#e8820c"; // Orange — Professional (Composer)

export default function SystemsPage() {
  const [activeLevel, setActiveLevel] = useState<"1" | "2">("1");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const systemsSummary = activeLevel === "1" ? systemsSummaryL1 : systemsSummaryL2;
  const THEME        = activeLevel === "1" ? L1_COLOR : L2_COLOR;
  const THEME_ALPHA  = activeLevel === "1" ? "rgba(13,124,138,0.05)"  : "rgba(232,130,12,0.05)";
  const THEME_BORDER = activeLevel === "1" ? "rgba(13,124,138,0.15)"  : "rgba(232,130,12,0.15)";

  // ── Dark/light mode tokens ───────────────────────────────────────────────────
  const headingColor = isDark ? "#e2e8f0" : "#1a202c";
  const mutedColor   = isDark ? "#94a3b8" : "#4a5568";
  const cardBg       = isDark ? "rgba(22, 23, 30, 0.4)" : "#ffffff";
  const cardBorder   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const sectionBg    = isDark ? "rgba(0,0,0,0.2)" : "#f4f6fb";
  const pageBg       = isDark ? "transparent" : "#f4f6fb";

  const levelLabel = activeLevel === "1"
    ? "Level 1 · Foundation (Crafter)"
    : "Level 2 · Professional (Composer)";

  return (
    <div className="page-wrap" style={{ background: pageBg, minHeight: "100vh", transition: "background 0.3s" }}>
      <Nav />
      <div className="inner-page">

        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="inner-page-header" style={{
          textAlign: "center", padding: "3rem 1.5rem",
          background: THEME_ALPHA,
          border: `1px solid ${THEME_BORDER}`,
          borderRadius: "24px", marginBottom: "3rem",
        }}>
          <span className="inner-page-badge" style={{ background: THEME, color: "white", fontWeight: 800 }}>
            {levelLabel}
          </span>
          <h1 className="inner-page-title" style={{ fontSize: "2.5rem", marginTop: "1rem", color: headingColor }}>
            Build Systems
          </h1>
          <p className="inner-page-desc" style={{ maxWidth: "600px", margin: "1rem auto 0", color: mutedColor }}>
            The core systems, SOPs, and workflows you build and master in the{" "}
            {activeLevel === "1" ? "Foundation (Crafter)" : "Professional (Composer)"} track —
            your personal vibe coding operating system.
          </p>

          {/* Level switcher */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {(["1", "2"] as const).map((lvl) => {
              const color  = lvl === "1" ? L1_COLOR : L2_COLOR;
              const label  = lvl === "1" ? "Level 1 · Foundation" : "Level 2 · Professional";
              const active = activeLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "8px 20px", borderRadius: "50px", cursor: "pointer",
                    border: `1.5px solid ${active ? color : (isDark ? "#334155" : "#e2e8f0")}`,
                    background: active ? `${color}1a` : "transparent",
                    color: active ? color : mutedColor,
                    fontWeight: 700, fontSize: "0.85rem", transition: "all 0.2s",
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Weekly Systems Grid ───────────────────────────────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: 10, color: THEME, marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: 700 }}>
            <TrendingUp size={20} /> Systems Built — Week by Week
          </h2>
          <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {systemsSummary.map((ws, i) => (
              <div key={i} style={{
                background: cardBg, border: `1px solid ${cardBorder}`,
                borderRadius: "20px", padding: "1.5rem",
                boxShadow: isDark ? "none" : "0 2px 12px rgba(0,0,0,0.05)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                  <span style={{
                    fontSize: "0.68rem", fontWeight: 900, letterSpacing: "1.5px",
                    textTransform: "uppercase", color: THEME,
                    background: `${THEME}14`, border: `1px solid ${THEME}33`,
                    borderRadius: 100, padding: "3px 10px",
                  }}>
                    Week {ws.week}
                  </span>
                </div>
                <h3 style={{ color: headingColor, fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.4 }}>
                  {ws.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {ws.systems.map((s, j) => (
                    <li key={j} style={{
                      display: "flex", alignItems: "flex-start", gap: "10px",
                      fontSize: "0.83rem", color: mutedColor, marginBottom: "10px", lineHeight: 1.5,
                    }}>
                      <CheckCircle2 size={13} style={{ color: THEME, flexShrink: 0, marginTop: 2 }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Metrics to Track ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{
            padding: "2rem", background: sectionBg,
            border: `1px solid ${cardBorder}`, borderRadius: "24px",
          }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: 10, color: THEME, fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              <BarChart2 size={20} /> Metrics to Track
            </h2>
            <p style={{ color: mutedColor, fontSize: "0.88rem", marginBottom: "1.5rem" }}>
              Measure your growth as a vibe coder — these KPIs tell you whether you're improving, not just shipping.
            </p>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              {metricsToTrack.map((m, i) => (
                <div key={i} style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                  padding: "1.25rem", borderRadius: "12px",
                  border: `1px solid ${cardBorder}`,
                  boxShadow: isDark ? "none" : "0 1px 6px rgba(0,0,0,0.04)",
                }}>
                  <h4 style={{
                    fontSize: "0.88rem", color: headingColor,
                    marginBottom: "0.5rem", fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <Settings size={13} style={{ color: THEME, flexShrink: 0 }} /> {m.metric}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: mutedColor, lineHeight: 1.6, margin: 0 }}>{m.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfolio Targets ─────────────────────────────────────────────── */}
        <section>
          <h2 style={{ display: "flex", alignItems: "center", gap: 10, color: THEME, fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            <Layers size={20} /> Portfolio Pieces You'll Build
          </h2>
          <p style={{ color: mutedColor, fontSize: "0.88rem", marginBottom: "1.25rem" }}>
            Every deliverable is a real, working, shareable artifact — not an exercise.
          </p>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {portfolioTargets.filter((p) => p.level === parseInt(activeLevel)).map((p, i) => (
              <div key={i} style={{
                padding: "1rem 1.25rem", background: cardBg,
                borderRadius: "12px", borderLeft: `3px solid ${THEME}`,
                border: `1px solid ${cardBorder}`,
                borderLeftColor: THEME,
                display: "flex", alignItems: "flex-start", gap: 12,
                boxShadow: isDark ? "none" : "0 1px 6px rgba(0,0,0,0.04)",
              }}>
                <Target size={15} style={{ color: THEME, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <strong style={{ color: headingColor, fontSize: "0.9rem" }}>{p.title}</strong>
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 700, color: THEME,
                      background: `${THEME}14`, border: `1px solid ${THEME}33`,
                      borderRadius: 100, padding: "2px 8px",
                    }}>
                      Week {p.week}
                    </span>
                  </div>
                  <p style={{ color: mutedColor, fontSize: "0.82rem", margin: "4px 0 0", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}