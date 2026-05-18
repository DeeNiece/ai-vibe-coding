// ── AI Sprint · Vibe Coding & IOP ──────────────────────────────
// File: nav.tsx | Repo: ai-vibe-coding
// Last updated: May 2026
//
// PRICING UPDATE: "Pricing & Upgrades" → "Pricing" · hasL1/L2 → hasAccess
//
// ── THEME PERSISTENCE ────────────────────────────────────────────────────────
// The desktop + mobile toggle buttons call handleToggle() instead of toggle()
// directly. handleToggle() calls the theme-provider's toggle(), then also:
//   1. Writes "ai-sprint-theme" = "light" | "dark" to localStorage so the
//      pricing page (and any other non-landing page) can read the preference.
//   2. Dispatches a "themechange" CustomEvent for same-tab real-time sync.
//   3. Toggles "lp-light" on <html> as a DOM-class fallback for observers.
// ─────────────────────────────────────────────────────────────────────────────

import { Link, useLocation } from "wouter";
import logoImg from "@assets/ai-sprint-logo.jpg";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/components/auth-provider";
import {
  Sun,
  Moon,
  Menu,
  X,
  LogOut,
  Settings,
  HelpCircle,
  Layers,
  Flame,
  KeyRound,
  CreditCard,
  User,
  ChevronDown,
  Wrench,
  FolderKanban,
  Terminal,
  LayoutDashboard,
  Rocket,
  BarChart2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n";
import { useQuery } from "@tanstack/react-query";
import type { DayProgress } from "@shared/schema";

// ── Level theme config (Vibe Coding & IOP) ─────────────────────────────
// Level 1 = Teal (Foundation), Level 2 = Orange (Advanced Studio)
const LEVEL_THEMES = {
  "1": { color: "#0d7c8a", label: "Level 1 · Foundation", pulse: "rgba(13,124,138,0.4)" },
  "2": { color: "#d97706", label: "Level 2 · Composer Studio", pulse: "rgba(217,119,6,0.4)" },
} as const;

// Determine active level — localStorage persists choice, URL path overrides on day routes
function useActiveLevel(): "1" | "2" {
  const [loc] = useLocation();
  if (loc.startsWith("/day/L2")) return "2";
  if (loc.startsWith("/day/L1")) return "1";
  try {
    return localStorage.getItem("vibe_level") === "2" ? "2" : "1";
  } catch {
    return "1";
  }
}

const LAUNCH_DATE = new Date("2026-04-15T00:00:00Z").getTime();

function getDaysPassed() {
  return Math.max(0, Math.floor((Date.now() - LAUNCH_DATE) / (1000 * 60 * 60 * 24)));
}

// Vibe Coding & IOP ticker copy
function getDynamicTicker(level: "1" | "2") {
  const days = getDaysPassed();
  const streak = Math.min(56, 3 + Math.floor(days / 5));
  if (level === "2") {
    return [
      `🚀 Sarah just finalised her advanced concept board!`,
      `🏆 Alex unlocked 'Vibe Coding Composer'!`,
      `💬 David left a 5-star review on Day 56!`,
      `🔥 Emily completed her client-ready presentation set!`,
      `📐 Dee_Niece is on a ${streak}-day studio streak!`,
    ];
  }
  return [
    `🔥 Sarah just finished her first space-planning exercise!`,
    `🏆 Alex unlocked 'Vibe Coding Crafter'!`,
    `💬 David left a 5-star review on Day 28!`,
    `🚀 Emily completed her first project storyboard!`,
    `📐 Dee_Niece is on a ${streak}-day studio streak!`,
  ];
}

export default function Nav() {
  const { theme: _themeRaw, toggle: _toggle } = useTheme();
  // Dark mode locked — always dark, toggle hidden. Light mode CSS preserved.
  const theme = "dark" as const;
  const toggle = _toggle; // kept for future use
  const { user, logout } = useAuth();

  // ── handleToggle — wraps theme-provider toggle with full persistence ────────
  // Calling toggle() alone only flips the in-memory theme-provider state.
  // handleToggle also persists to localStorage and fires events so the pricing
  // page (and any other page using useDarkMode()) stays in sync.
  function handleToggle() {
    toggle(); // flip the theme-provider state (dark ↔ light)
    const nextDark = theme !== "dark"; // theme hasn't flipped yet, so invert
    try {
      localStorage.setItem("ai-sprint-theme", nextDark ? "dark" : "light");
      window.dispatchEvent(new CustomEvent("themechange", { detail: { dark: nextDark } }));
      document.documentElement.classList.toggle("lp-light", !nextDark);
    } catch {}
  }
  const [loc] = useLocation();
  const { t } = useLanguage();
  const activeLevel = useActiveLevel();
  const THEME_COLOR = LEVEL_THEMES[activeLevel].color;
  const PULSE_COLOR = LEVEL_THEMES[activeLevel].pulse;

  function switchLevel(lvl: "1" | "2") {
    try {
      localStorage.setItem("vibe_level", lvl);
    } catch {}
    setLevelOpen(false);
    // Dispatch so home.tsx hears it immediately
    window.dispatchEvent(
      new StorageEvent("storage", { key: "vibe_level", newValue: lvl })
    );
  }

  const [levelOpen, setLevelOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: progressData = [] } = useQuery<DayProgress[]>({
    queryKey: ["/api/progress"],
    enabled: !!user,
  });

  const completedCount = progressData.filter((p) => p.completed).length;

  // Rank logic adapted to 56-day Vibe Coding & IOP program
  let rankTitle = "Crafter Explorer";
  let rankColor = "#a1a1aa";
  if (completedCount >= 56) {
    rankTitle = "Composer Elite";
    rankColor = THEME_COLOR;
  } else if (completedCount >= 28) {
    rankTitle = "Design Builder";
    rankColor = LEVEL_THEMES["2"].color;
  } else if (completedCount >= 14) {
    rankTitle = "Studio Planner";
    rankColor = "#fbbf24";
  } else if (completedCount >= 7) {
    rankTitle = "Space Creator";
    rankColor = LEVEL_THEMES["1"].color;
  }

  const tickerMessages = getDynamicTicker(activeLevel);
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % tickerMessages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [tickerMessages.length]);

  useEffect(() => {
    setBlueprintOpen(false);
    setCommandOpen(false);
    setLevelOpen(false);
    setUserMenuOpen(false);
    setMobileOpen(false);
  }, [loc]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const licensedLevels = user?.licensedLevels || [];
  // Single $69 price unlocks both levels
  const hasAccess = licensedLevels.includes("bundle") || licensedLevels.includes("1") || licensedLevels.includes("2");
  const hasL1 = hasAccess;
  const hasL2 = hasAccess;

  return (
    <>
      <style>{`
        @keyframes pulse-theme {
          0% { box-shadow: 0 0 0 0 ${PULSE_COLOR}; }
          70% { box-shadow: 0 0 0 10px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .pulse-icon-theme { animation: pulse-theme 2s infinite; border-radius: 50%; }
        .nav-dropdown {
          position: absolute; top: calc(100% + 10px); left: 0;
          background: var(--color-surface); border: 1px solid var(--color-border);
          border-radius: 12px; padding: 8px; min-width: 220px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.4); z-index: 100;
          display: flex; flex-direction: column; gap: 4px;
          backdrop-filter: blur(12px);
        }
        .dropdown-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          text-decoration: none; color: var(--color-text); border-radius: 8px;
          font-size: 0.85rem; font-weight: 500; transition: background 0.2s;
        }
        .dropdown-item:hover { background: rgba(13,124,138,0.1); color: ${THEME_COLOR}; }

        .mobile-menu-btn { display: none; }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .level-switcher { display: none !important; }
          .nav-user { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
        }

        .mobile-drawer-overlay {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.55); z-index: 200;
          backdrop-filter: blur(4px);
        }
        .mobile-drawer-overlay.open { display: block; }

        .mobile-drawer {
          position: fixed; top: 0; right: -100%;
          width: min(320px, 85vw); height: 100dvh;
          background: var(--color-surface);
          border-left: 1px solid var(--color-border);
          z-index: 201; display: flex; flex-direction: column;
          transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow-y: auto;
          box-shadow: -12px 0 40px rgba(0,0,0,0.3);
        }
        .mobile-drawer.open { right: 0; }

        .mobile-drawer-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--color-border);
          flex-shrink: 0;
        }
        .mobile-drawer-body {
          flex: 1; padding: 1rem 1.25rem;
          display: flex; flex-direction: column; gap: 0.25rem;
          overflow-y: auto;
        }
        .mobile-drawer-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid var(--color-border);
          display: flex; flex-direction: column; gap: 0.5rem;
          flex-shrink: 0;
        }
        .mobile-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0.75rem 0.875rem; border-radius: var(--radius-md);
          font-size: var(--text-sm); font-weight: 500;
          color: var(--color-text-muted); text-decoration: none;
          transition: all 0.15s; width: 100%;
          background: none; border: none; text-align: left; cursor: pointer;
        }
        .mobile-nav-item:hover { background: var(--color-surface-offset); color: var(--color-text); }
        .mobile-nav-item.active { background: rgba(13,124,138,0.1); color: ${THEME_COLOR}; font-weight: 600; }
        .mobile-section-label {
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--color-text-faint);
          padding: 0.75rem 0.875rem 0.25rem; margin-top: 0.5rem;
        }
        .mobile-divider { height: 1px; background: var(--color-border); margin: 0.5rem 0; }
        .mobile-rank-bar {
          display: flex; align-items: center; gap: 10px;
          padding: 0.75rem 0.875rem;
          background: var(--color-surface-offset);
          border-radius: var(--radius-md);
          margin-bottom: 0.5rem;
        }

        /* Level badge pills */
        .level-pill {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.7rem; font-weight: 700; padding: 3px 9px;
          border-radius: 20px; border: 1px solid;
        }
        .level-pill-l1 {
          color: #0d7c8a;
          background: rgba(13,124,138,0.1);
          border-color: rgba(13,124,138,0.3);
        }
        .level-pill-l2 {
          color: #d97706;
          background: rgba(217,119,6,0.1);
          border-color: rgba(217,119,6,0.3);
        }
      `}</style>

      <header className="nav-header">
        <div
          className="nav-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/" className="nav-logo">
            <img src={logoImg} alt="AI Sprint" className="nav-logo-img" />
            <div
              className="nav-logo-sub"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                fontWeight: 700,
              }}
            >
              Vibe Coding & IOP
            </div>
          </Link>

          <nav className="nav-links">
            <Link
              href="/"
              className={`nav-link ${loc === "/" ? "active" : ""}`}
            >
              {t("nav.journey")}
            </Link>

            {/* Code Blueprint dropdown (Vibe Coding) */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setBlueprintOpen(!blueprintOpen);
                  setCommandOpen(false);
                }}
                className={`nav-link ${
                  ["/systems", "/portfolio", "/toolkit"].includes(loc)
                    ? "active"
                    : ""
                }`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Rocket
                  size={16}
                  className="pulse-icon-theme"
                  style={{ color: THEME_COLOR }}
                />
                Code Blueprint
                <ChevronDown
                  size={14}
                  style={{
                    transform: blueprintOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </button>

              {blueprintOpen && (
                <div
                  className="nav-dropdown"
                  onMouseLeave={() => setBlueprintOpen(false)}
                >
                  <Link href="/systems" className="dropdown-item">
                    <Terminal size={16} style={{ color: THEME_COLOR }} /> Studio
                    Systems
                  </Link>
                  <Link href="/portfolio" className="dropdown-item">
                    <FolderKanban
                      size={16}
                      style={{ color: THEME_COLOR }}
                    />{" "}
                    Portfolio Projects
                  </Link>
                  <Link href="/toolkit" className="dropdown-item">
                    <Wrench size={16} style={{ color: THEME_COLOR }} /> Design
                    Toolkit
                  </Link>
                  <Link href="/services" className="dropdown-item">
                    <BarChart2 size={16} style={{ color: THEME_COLOR }} />{" "}
                    Service Offers
                  </Link>
                </div>
              )}
            </div>

            {/* Command Center dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => {
                  setCommandOpen(!commandOpen);
                  setBlueprintOpen(false);
                }}
                className={`nav-link ${
                  ["/settings", "/faq"].includes(loc) ? "active" : ""
                }`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <LayoutDashboard size={16} />
                Command Center
                <ChevronDown
                  size={14}
                  style={{
                    transform: commandOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </button>

              {commandOpen && (
                <div
                  className="nav-dropdown"
                  onMouseLeave={() => setCommandOpen(false)}
                >
                  <Link href="/settings" className="dropdown-item">
                    <Settings size={16} /> {t("nav.settings")}
                  </Link>
                  <Link href="/faq" className="dropdown-item">
                    <HelpCircle size={16} /> Help & FAQ
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="nav-controls">
            {/* Level switcher */}
            {user && (
              <div className="level-switcher">
                <button
                  className="level-switcher-btn"
                  onClick={() => {
                    setLevelOpen(!levelOpen);
                    setUserMenuOpen(false);
                  }}
                >
                  <Layers size={12} />
                  {activeLevel === "2" ? "Level 2" : "Level 1"} ▾
                </button>
                {levelOpen && (
                  <div
                    className="level-switcher-dropdown"
                    onMouseLeave={() => setLevelOpen(false)}
                  >
                    <button
                      className={`level-switcher-item ${
                        activeLevel === "1" ? "active" : ""
                      }`}
                      onClick={() => {
                        switchLevel("1");
                        if (hasL1) window.location.href = "/#/";
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: hasL1 ? "pointer" : "not-allowed",
                        width: "100%",
                        textAlign: "left",
                        opacity: hasL1 ? 1 : 0.5,
                      }}
                    >
                      <span
                        className="level-switcher-dot"
                        style={{ background: LEVEL_THEMES["1"].color }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <span>{LEVEL_THEMES["1"].label}</span>
                        {!hasL1 && (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              color: "var(--color-text-faint)",
                            }}
                          >
                            🔒 Not licensed
                          </span>
                        )}
                      </div>
                    </button>
                    <button
                      className={`level-switcher-item ${
                        activeLevel === "2" ? "active" : ""
                      }`}
                      onClick={() => {
                        switchLevel("2");
                        if (hasL2) window.location.href = "/#/";
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: hasL2 ? "pointer" : "not-allowed",
                        width: "100%",
                        textAlign: "left",
                        opacity: hasL2 ? 1 : 0.5,
                      }}
                    >
                      <span
                        className="level-switcher-dot"
                        style={{ background: LEVEL_THEMES["2"].color }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <span>{LEVEL_THEMES["2"].label}</span>
                        {!hasL2 && (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              color: "var(--color-text-faint)",
                            }}
                          >
                            🔒 Not licensed
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* User menu */}
            {user && (
              <div className="nav-user" style={{ position: "relative" }}>
                <button
                  className="level-switcher-btn"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setLevelOpen(false);
                  }}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "4px 10px",
                  }}
                >
                  <User size={14} />
                  <span
                    className="nav-user-name"
                    style={{ marginLeft: "4px" }}
                  >
                    {user.displayName}
                  </span>
                  <ChevronDown
                    size={12}
                    style={{ marginLeft: "4px", opacity: 0.5 }}
                  />
                </button>

                {userMenuOpen && (
                  <div
                    className="level-switcher-dropdown"
                    style={{ minWidth: "220px", padding: "12px", right: 0 }}
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "8px 4px",
                        borderBottom: "1px solid var(--color-divider)",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#ff6b6b",
                          fontWeight: 800,
                        }}
                      >
                        <Flame size={16} /> {completedCount}
                      </div>
                      <div
                        style={{
                          fontSize: "var(--text-xs)",
                          fontWeight: 700,
                          color: rankColor,
                        }}
                      >
                        {rankTitle}
                      </div>
                    </div>

                    <div
                      className="level-switcher-item"
                      style={{ cursor: "default", opacity: 0.8 }}
                    >
                      <CreditCard size={14} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10px",
                            textTransform: "uppercase",
                            color: "var(--color-text-faint)",
                          }}
                        >
                          Current Plan
                        </span>
                        <div style={{ display: "flex", gap: 4 }}>
                          {hasL1 && (
                            <span className="level-pill level-pill-l1">
                              L1 Foundation
                            </span>
                          )}
                          {hasL2 && (
                            <span className="level-pill level-pill-l2">
                              L2 Advanced Studio
                            </span>
                          )}
                          {!hasL1 && !hasL2 && (
                            <span
                              style={{
                                fontSize: "var(--text-sm)",
                                color: "var(--color-text-faint)",
                              }}
                            >
                              No active plan
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        height: "1px",
                        background: "var(--color-divider)",
                        margin: "8px 0",
                      }}
                    />

                    <Link
                      href="/settings/password"
                      className="level-switcher-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <KeyRound size={14} /> Reset Password
                    </Link>
                    <Link
                      href="/pricing"
                      className="level-switcher-item"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <CreditCard size={14} /> Pricing
                    </Link>

                    <div
                      style={{
                        height: "1px",
                        background: "var(--color-divider)",
                        margin: "8px 0",
                      }}
                    />

                    <button
                      onClick={logout}
                      className="level-switcher-item"
                      style={{
                        width: "100%",
                        color: "#dc2626",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                      }}
                    >
                      <LogOut size={14} /> {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Theme toggle hidden — dark mode locked
            <button onClick={handleToggle} className="icon-btn">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button> */}

            <button
              className="mobile-menu-btn icon-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="mobile-drawer-header">
          <Link
            href="/"
            className="nav-logo"
            onClick={() => setMobileOpen(false)}
          >
            <img src={logoImg} alt="AI Sprint" className="nav-logo-img" />
            <div
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
                fontWeight: 700,
              }}
            >
              Vibe Coding & IOP
            </div>
          </Link>
          <button
            className="icon-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          {user && (
            <div className="mobile-rank-bar">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "#ff6b6b",
                  fontWeight: 800,
                }}
              >
                <Flame size={16} /> {completedCount}
              </div>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  color: rankColor,
                }}
              >
                {rankTitle}
              </div>
            </div>
          )}

          <div className="mobile-section-label">Navigation</div>
          <Link
            href="/"
            className={`mobile-nav-item ${loc === "/" ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            <LayoutDashboard size={16} /> {t("nav.journey")}
          </Link>

          {user && (
            <>
              <div className="mobile-section-label">Switch Level</div>
              <a
                className={`mobile-nav-item ${
                  activeLevel === "1" ? "active" : ""
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  switchLevel("1");
                  if (hasL1) window.location.href = "/#/";
                  setMobileOpen(false);
                }}
                style={
                  activeLevel === "1"
                    ? { color: LEVEL_THEMES["1"].color }
                    : {}
                }
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: LEVEL_THEMES["1"].color,
                    flexShrink: 0,
                  }}
                />
                Level 1 · Foundation {!hasL1 && "🔒"}
              </a>
              <a
                className={`mobile-nav-item ${
                  activeLevel === "2" ? "active" : ""
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  switchLevel("2");
                  if (hasL2) window.location.href = "/#/";
                  setMobileOpen(false);
                }}
                style={
                  activeLevel === "2"
                    ? { color: LEVEL_THEMES["2"].color }
                    : {}
                }
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: LEVEL_THEMES["2"].color,
                    flexShrink: 0,
                  }}
                />
                Level 2 · Composer Studio {!hasL2 && "🔒"}
              </a>
            </>
          )}

          <div className="mobile-section-label">Code Blueprint</div>
          <Link
            href="/systems"
            className={`mobile-nav-item ${
              loc === "/systems" ? "active" : ""
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <Terminal size={16} style={{ color: THEME_COLOR }} /> Build Systems
          </Link>
          <Link
            href="/portfolio"
            className={`mobile-nav-item ${
              loc === "/portfolio" ? "active" : ""
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <FolderKanban size={16} style={{ color: THEME_COLOR }} /> Portfolio
            Projects
          </Link>
          <Link
            href="/toolkit"
            className={`mobile-nav-item ${
              loc === "/toolkit" ? "active" : ""
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <Wrench size={16} style={{ color: THEME_COLOR }} /> Vibe Toolkit
          </Link>
          <Link
            href="/services"
            className={`mobile-nav-item ${
              loc === "/services" ? "active" : ""
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <BarChart2 size={16} style={{ color: THEME_COLOR }} /> Service
            Offers
          </Link>

          <div className="mobile-section-label">Command Center</div>
          <Link
            href="/settings"
            className={`mobile-nav-item ${
              loc === "/settings" ? "active" : ""
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <Settings size={16} /> {t("nav.settings")}
          </Link>
          <Link
            href="/faq"
            className={`mobile-nav-item ${loc === "/faq" ? "active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            <HelpCircle size={16} /> Help & FAQ
          </Link>
        </div>

        {user && (
          <div
            className="mobile-drawer-footer"
            style={{ paddingBottom: "80px" }}
          >
            <Link
              href="/settings/password"
              className="mobile-nav-item"
              onClick={() => setMobileOpen(false)}
            >
              <KeyRound size={16} /> Reset Password
            </Link>
            <Link
              href="/pricing"
              className="mobile-nav-item"
              onClick={() => setMobileOpen(false)}
            >
              <CreditCard size={16} /> Pricing
            </Link>
            <div className="mobile-divider" />
            {/* Theme toggle hidden — dark mode locked
            <button onClick={handleToggle} className="mobile-nav-item">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button> */}
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="mobile-nav-item"
              style={{ color: "#dc2626" }}
            >
              <LogOut size={16} /> {t("nav.logout")}
            </button>
          </div>
        )}
      </div>

      {/* Activity ticker */}
      {user && !mobileOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "rgba(26, 27, 38, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "10px 15px",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "var(--shadow-md)",
            zIndex: 1000,
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              background: THEME_COLOR,
              borderRadius: "50%",
              boxShadow: `0 0 8px ${THEME_COLOR}`,
            }}
          />
          <span
            key={tickerIdx}
            style={{
              animation: "fadeIn 0.5s ease-in-out",
              color: "white",
            }}
          >
            {tickerMessages[tickerIdx]}
          </span>
        </div>
      )}
    </>
  );
}