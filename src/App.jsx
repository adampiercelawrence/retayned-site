import React, { useState, useEffect, useRef } from "react";

// ═══ Shared palette ═══
const C = {
  primary: "#33543E", primaryDark: "#274230", primaryDeep: "#1C3224",
  primaryLight: "#558B68", primarySoft: "#E6EFE9", primaryGhost: "#F3F8F5",
  bg: "#FAFAF7", card: "#FFFFFF", surface: "#EEEFEB",
  surfaceWarm: "#F2EEE8", surfaceWarmEdge: "#E0DACB",
  surfaceCool: "#EBEDF0", surfaceCoolEdge: "#D1D5DB",
  text: "#1E261F", textSec: "#4A4F4A", textMuted: "#8A8F8A",
  border: "#D8DFD8", borderLight: "#E8ECE6",
  sidebar: "#1E261F", sidebarAccent: "#558B68",
  heroGrad: "linear-gradient(135deg, #1E261F, #2A382C)",
  danger: "#C4432B", dangerBg: "#FAE8E4",
  warning: "#B88B15", warningBg: "#FBF2DC",
  success: "#2D8659", successBg: "#E2F3EB",
  btn: "#5B21B6", btnHover: "#4C1D95",
  btnSoft: "rgba(91,33,182,0.06)", btnLight: "#C4A5F0",
  cardShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  raiGrad: "linear-gradient(145deg, #1E261F 0%, #33543E 55%, #558B68 100%)",
};


const HEADSHOT = "/AdamLawrence.jpg";

const inputStyle = { width: "100%", padding: "14px 16px", border: "2px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", background: C.card, boxSizing: "border-box", outline: "none" };

// ═══ Reveal on Scroll ═══

// ═══ Swipe Drawer ═══
function SwipeDrawer({ open, setOpen, children }) {
  const startX = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);
  const drawerRef = useRef(null);
  const DRAWER_W = 280;
  const EDGE_ZONE = 30;

  // Touch on overlay or edge of screen
  const handleTouchStart = (e) => {
    const x = e.touches[0].clientX;
    if (open) {
      startX.current = x;
      dragging.current = true;
    }
  };

  const handleTouchMove = (e) => {
    if (!dragging.current) return;
    currentX.current = e.touches[0].clientX;
    const diff = startX.current - currentX.current;
    if (diff > 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateX(${-diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = startX.current - currentX.current;
    if (diff > 80) {
      setOpen(false);
    }
    if (drawerRef.current) {
      drawerRef.current.style.transform = "";
    }
  };

  // Edge swipe to open
  useEffect(() => {
    const onTouchStart = (e) => {
      const x = e.touches[0].clientX;
      if (!open && x < EDGE_ZONE) {
        startX.current = x;
        dragging.current = true;
      }
    };
    const onTouchMove = (e) => {
      if (!dragging.current || open) return;
      currentX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      if (!dragging.current || open) return;
      dragging.current = false;
      const diff = currentX.current - startX.current;
      if (diff > 60) {
        setOpen(true);
      }
    };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [open, setOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 150,
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Drawer */}
      <div
        ref={drawerRef}
        onClick={e => e.stopPropagation()}
        style={{
          position: "fixed", top: 0, left: 0, width: DRAWER_W, height: "100%",
          background: C.card, zIndex: 200,
          boxShadow: open ? "4px 0 24px rgba(0,0,0,.1)" : "none",
          transform: open ? "translateX(0)" : `translateX(-${DRAWER_W}px)`,
          transition: "transform 0.3s ease",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}

// ═══ Nav icon set (inline SVG, no asset loading) ═══
const NAV_ICONS = {
  today: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect x="5" y="7" width="22" height="20" rx="2" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><path d="M5 9 Q5 7 7 7 L25 7 Q27 7 27 9 L27 12 L5 12 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="1.6" strokeLinejoin="round"/><line x1="11" y1="4" x2="11" y2="9" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/><line x1="21" y1="4" x2="21" y2="9" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/><circle cx="16" cy="20" r="5" fill="none" stroke="#558B68" strokeWidth="1.6"/><line x1="13" y1="20" x2="19" y2="20" stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/><line x1="13" y1="23" x2="17" y2="23" stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/></svg>,
  "retention-score": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><path d="M5 22 Q5 8 16 8 Q27 8 27 22" fill="none" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/><path d="M16 8 Q27 8 27 22" fill="none" stroke="#558B68" strokeWidth="2.2" strokeLinecap="round"/><line x1="5" y1="22" x2="7" y2="20.5" stroke="#2F2F31" strokeWidth="1.2" strokeLinecap="round"/><line x1="9" y1="13" x2="10.5" y2="14.5" stroke="#2F2F31" strokeWidth="1.2" strokeLinecap="round"/><line x1="16" y1="8" x2="16" y2="10" stroke="#2F2F31" strokeWidth="1.2" strokeLinecap="round"/><line x1="23" y1="13" x2="21.5" y2="14.5" stroke="#2F2F31" strokeWidth="1.2" strokeLinecap="round"/><line x1="27" y1="22" x2="25" y2="20.5" stroke="#2F2F31" strokeWidth="1.2" strokeLinecap="round"/><line x1="16" y1="22" x2="22" y2="13" stroke="#2F2F31" strokeWidth="1.8" strokeLinecap="round"/><circle cx="16" cy="22" r="2" fill="#558B68" stroke="#2F2F31" strokeWidth="1.4"/></svg>,
  "health-checks": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect x="6" y="7" width="20" height="22" rx="2" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><rect x="12" y="4" width="8" height="5" rx="1" fill="#558B68" stroke="#2F2F31" strokeWidth="1.4"/><path d="M16 23 C 12 20.5, 9 18.5, 9 15.5 C 9 13.8, 10.4 12.5, 12 12.5 C 13.2 12.5, 14.4 13.2, 16 14.5 C 17.6 13.2, 18.8 12.5, 20 12.5 C 21.6 12.5, 23 13.8, 23 15.5 C 23 18.5, 20 20.5, 16 23 Z" fill="none" stroke="#558B68" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 18 L12 18 L13.5 15.5 L15 20.5 L17 16 L19 18 L23 18" fill="none" stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "talk-to-rai": <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><path d="M5 9 Q5 6 8 6 L24 6 Q27 6 27 9 L27 19 Q27 22 24 22 L14 22 L9 27 L10 22 Q5 22 5 19 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="1.6" strokeLinejoin="round"/><line x1="16" y1="6" x2="16" y2="2" stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round"/><circle cx="16" cy="1.6" r="1.4" fill="#558B68" stroke="#2F2F31" strokeWidth="1.2"/><ellipse cx="13" cy="13" rx="2.2" ry="2.6" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.2"/><circle cx="13" cy="13" r="1.2" fill="#2F2F31"/><ellipse cx="20" cy="13" rx="2.2" ry="2.6" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.2"/><circle cx="20" cy="13" r="1.2" fill="#2F2F31"/><path d="M12 18 Q16 20 20 18" fill="none" stroke="#FCFCFE" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  rolodex: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect x="3" y="22" width="26" height="4" rx="1" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><circle cx="6" cy="14" r="2" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.4"/><circle cx="26" cy="14" r="2" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.4"/><line x1="6" y1="14" x2="26" y2="14" stroke="#2F2F31" strokeWidth="1.4"/><path d="M9 14 Q12 4 16 7 Q20 10 23 14 L20 14 L20 22 L12 22 L12 14 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="1.6" strokeLinejoin="round"/><line x1="14" y1="16" x2="20" y2="16" stroke="#FCFCFE" strokeWidth="1.2" strokeLinecap="round"/><line x1="14" y1="19" x2="18" y2="19" stroke="#FCFCFE" strokeWidth="1.2" strokeLinecap="round"/><rect x="5" y="16" width="5" height="6" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.4"/></svg>,
  referrals: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><circle cx="6" cy="16" r="3.5" fill="#558B68" stroke="#2F2F31" strokeWidth="1.6"/><path d="M9.5 16 Q15 16 18 8" fill="none" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/><path d="M9.5 16 Q15 16 18 24" fill="none" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/><path d="M14 8 L18 7 L17 11" fill="none" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 24 L18 25 L17 21" fill="none" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="6" r="3" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><circle cx="26" cy="14" r="3" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><circle cx="22" cy="26" r="3" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><path d="M9.5 16 Q18 16 23 14" fill="none" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  freelancers: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="25" rx="9" ry="2" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.4"/><path d="M8 14 L9.5 23 Q10 25 12 25 L20 25 Q22 25 22.5 23 L24 14 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="1.6" strokeLinejoin="round"/><ellipse cx="16" cy="14" rx="8" ry="1.6" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.4"/><path d="M24 16 Q28 17 27 21 Q26 23 23 22.5" fill="none" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/><path d="M14 11 Q12 8 14 6 Q16 4 15 2" fill="none" stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round"/><path d="M19 11 L20 9 L21 12 L22 8 L23 11" fill="none" stroke="#558B68" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  agencies: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><path d="M19 5 Q26 5 26 11 Q26 16 21 17 L19 20 L19 17 Q14 16 14 11 Q14 5 19 5 Z" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6" strokeLinejoin="round"/><path d="M11 11 Q18 11 18 17 Q18 22 13 23 L11 26 L11 23 Q6 22 6 17 Q6 11 11 11 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="9" cy="17" r="1" fill="#FCFCFE"/><circle cx="12" cy="17" r="1" fill="#FCFCFE"/><circle cx="15" cy="17" r="1" fill="#FCFCFE"/></svg>,
  enterprise: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect x="4" y="14" width="11" height="14" rx="1" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><line x1="9.5" y1="14" x2="9.5" y2="28" stroke="#2F2F31" strokeWidth="1"/><line x1="4" y1="20" x2="15" y2="20" stroke="#2F2F31" strokeWidth="1" opacity="0.6"/><rect x="14" y="10" width="9" height="18" rx="1" fill="#558B68" stroke="#2F2F31" strokeWidth="1.6"/><line x1="14" y1="18" x2="23" y2="18" stroke="#FCFCFE" strokeWidth="1" opacity="0.7"/><line x1="18.5" y1="10" x2="18.5" y2="28" stroke="#FCFCFE" strokeWidth="1" opacity="0.7"/><rect x="22" y="16" width="7" height="12" rx="1" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/><line x1="22" y1="22" x2="29" y2="22" stroke="#2F2F31" strokeWidth="1" opacity="0.6"/><line x1="25.5" y1="16" x2="25.5" y2="11" stroke="#2F2F31" strokeWidth="1.4"/><path d="M25.5 11 L29 12 L25.5 13.5 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
};

function NavIcon({ name, size = 20 }) {
  const icon = NAV_ICONS[name];
  if (!icon) return null;
  return <span style={{ width: size, height: size, display: "inline-flex" }}>{React.cloneElement(icon, { width: size, height: size })}</span>;
}

// ═══ Nav ═══
function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobilePlatformExpanded, setMobilePlatformExpanded] = useState(false);
  const [mobileSolutionsExpanded, setMobileSolutionsExpanded] = useState(false);
  const platformTimer = useRef(null);
  const solutionsTimer = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPlatform = () => {
    if (platformTimer.current) { clearTimeout(platformTimer.current); platformTimer.current = null; }
    setSolutionsOpen(false);
    setPlatformOpen(true);
  };
  const closePlatform = () => {
    platformTimer.current = setTimeout(() => setPlatformOpen(false), 150);
  };
  const openSolutions = () => {
    if (solutionsTimer.current) { clearTimeout(solutionsTimer.current); solutionsTimer.current = null; }
    setPlatformOpen(false);
    setSolutionsOpen(true);
  };
  const closeSolutions = () => {
    solutionsTimer.current = setTimeout(() => setSolutionsOpen(false), 150);
  };

  const features = [
    { id: "feature-today", label: "Today", desc: "One page. Every priority.", icon: "today" },
    { id: "feature-scoring", label: "Retention Score", desc: "1–99, based on 12 dimensions.", icon: "retention-score" },
    { id: "feature-health", label: "Health Checks", desc: "Five questions. Two minutes.", icon: "health-checks" },
    { id: "feature-rai", label: "Talk to Rai", desc: "AI advisor for your book.", icon: "talk-to-rai" },
    { id: "feature-rolodex", label: "Rolodex", desc: "Forward-looking pipeline.", icon: "rolodex" },
    { id: "feature-referrals", label: "Referrals", desc: "Who's ready, with data.", icon: "referrals" },
  ];
  const solutions = [
    { id: "freelancers", label: "Freelancers", desc: "For the one person holding every relationship.", icon: "freelancers" },
    { id: "agencies", label: "Agencies", desc: "For the team sharing the book.", icon: "agencies" },
    { id: "enterprise", label: "Enterprise", desc: "Account management as a service.", icon: "enterprise" },
  ];

  const topLinks = [
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "blog", label: "Resources" },
  ];

  const platformActive = ["platform", "feature-today", "feature-scoring", "feature-health", "feature-rai", "feature-rolodex", "feature-referrals"].includes(page);
  const solutionsActive = ["freelancers", "agencies", "enterprise"].includes(page);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "rgba(242, 238, 232, 0.85)" : "#F2EEE8", WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none", backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent", boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.02), 0 8px 24px -12px rgba(0,0,0,0.08)" : "none", transition: "box-shadow 0.25s, border-color 0.25s, background 0.25s" }}>
        <div className="r-nav-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", maxWidth: 1600, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="r-mobile-only" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center", zIndex: 110 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2.5" strokeLinecap="round">
                {open ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="17" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
              </svg>
            </button>
            <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => { setPage("home"); setOpen(false); }}>
              <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary, fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: C.primary, marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
            </div>
          </div>
          <div className="r-desktop-nav" style={{ display: "none", alignItems: "baseline", gap: 28, position: "relative" }}>
            {/* Platform dropdown */}
            <div onMouseEnter={openPlatform} onMouseLeave={closePlatform} style={{ position: "relative" }}>
              <span
                onClick={() => setPage("platform")}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setPage("platform")}
                style={{
                  fontSize: 15,
                  fontWeight: platformActive ? 700 : 600,
                  color: platformActive ? C.primary : C.text,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  borderBottom: platformActive ? "2px solid " + C.btn : "2px solid transparent",
                  paddingBottom: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Platform
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, transform: platformOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
              {platformOpen && (
                <div
                  onMouseEnter={openPlatform}
                  onMouseLeave={closePlatform}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: "-14px",
                    background: C.card,
                    border: "1px solid " + C.border,
                    borderRadius: 16,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)",
                    padding: 16,
                    minWidth: 360,
                    zIndex: 100,
                    animation: "megaFadeIn 0.2s ease",
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, padding: "0 10px 10px", marginBottom: 4, borderBottom: "1px solid " + C.borderLight }}>Features</div>
                  {features.map((f, i) => (
                    <div
                      key={i}
                      onClick={() => { setPage(f.id); setPlatformOpen(false); }}
                      className="r-mega-row"
                      style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 10, borderRadius: 8, cursor: "pointer" }}
                    >
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: C.primarySoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><NavIcon name={f.icon} size={20} /></span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{f.label}</span>
                        <span style={{ fontSize: 11.5, color: C.textSec, lineHeight: 1.4 }}>{f.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions dropdown */}
            <div onMouseEnter={openSolutions} onMouseLeave={closeSolutions} style={{ position: "relative" }}>
              <span
                role="button"
                tabIndex={0}
                style={{
                  fontSize: 15,
                  fontWeight: solutionsActive ? 700 : 600,
                  color: solutionsActive ? C.primary : C.text,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  borderBottom: solutionsActive ? "2px solid " + C.btn : "2px solid transparent",
                  paddingBottom: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Solutions
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, transform: solutionsOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
              {solutionsOpen && (
                <div
                  onMouseEnter={openSolutions}
                  onMouseLeave={closeSolutions}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: "-14px",
                    background: C.card,
                    border: "1px solid " + C.border,
                    borderRadius: 16,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)",
                    padding: 16,
                    minWidth: 360,
                    zIndex: 100,
                    animation: "megaFadeIn 0.2s ease",
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, padding: "0 10px 10px", marginBottom: 4, borderBottom: "1px solid " + C.borderLight }}>For who</div>
                  {solutions.map((a, i) => (
                    <div
                      key={i}
                      onClick={() => { setPage(a.id); setSolutionsOpen(false); }}
                      className="r-mega-row"
                      style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 10, borderRadius: 8, cursor: "pointer" }}
                    >
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: C.primarySoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><NavIcon name={a.icon} size={20} /></span>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{a.label}</span>
                        <span style={{ fontSize: 11.5, color: C.textSec, lineHeight: 1.4 }}>{a.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Other top-level links */}
            {topLinks.map(l => (
              <span key={l.id} onClick={() => setPage(l.id)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(l.id)} style={{ fontSize: 15, fontWeight: page === l.id ? 700 : 600, color: page === l.id ? C.primary : C.text, cursor: "pointer", letterSpacing: "-0.01em", borderBottom: page === l.id ? "2px solid " + C.btn : "2px solid transparent", paddingBottom: 2, transition: "border-color 0.2s" }}>{l.label}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span className="r-desktop-nav" onClick={() => setPage("login")} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage("login")} style={{ fontSize: 14, fontWeight: 600, color: C.textSec, cursor: "pointer" }}>Log In</span>
          <button className="cta-btn" onClick={() => { setPage("signup"); setOpen(false); }} style={{ padding: "10px 22px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Start Free Trial
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile drawer with expandable Platform group */}
      <SwipeDrawer open={open} setOpen={setOpen}>
        <div style={{ padding: "24px 24px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 32, cursor: "pointer" }} onClick={() => { setPage("home"); setOpen(false); }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary, fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: C.primary, marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
          </div>

          {/* Platform: label navigates, chevron expands */}
          <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid " + C.borderLight }}>
            <button
              onClick={() => { setPage("platform"); setOpen(false); setMobilePlatformExpanded(false); }}
              style={{
                flex: 1, textAlign: "left", padding: "14px 0",
                background: "none", border: "none",
                fontSize: 17, fontWeight: platformActive ? 700 : 500,
                color: platformActive ? C.primary : C.text,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Platform
            </button>
            <button
              onClick={() => setMobilePlatformExpanded(!mobilePlatformExpanded)}
              aria-label={mobilePlatformExpanded ? "Collapse Platform" : "Expand Platform"}
              style={{
                width: 44, display: "flex", alignItems: "center", justifyContent: "flex-end",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={platformActive ? C.primary : C.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, transform: mobilePlatformExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          {mobilePlatformExpanded && (
            <div style={{ paddingLeft: 8, paddingTop: 10, paddingBottom: 10 }}>
              {features.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setPage(f.id); setOpen(false); setMobilePlatformExpanded(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    width: "100%", textAlign: "left", padding: "10px 0",
                    background: "none", border: "none",
                    fontSize: 15, fontWeight: page === f.id ? 700 : 500,
                    color: page === f.id ? C.primary : C.text,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  <span style={{ width: 28, height: 28, borderRadius: 6, background: C.primarySoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <NavIcon name={f.icon} size={18} />
                  </span>
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {/* Solutions expandable group */}
          <button
            onClick={() => setMobileSolutionsExpanded(!mobileSolutionsExpanded)}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              width: "100%", textAlign: "left", padding: "14px 0",
              background: "none", border: "none",
              borderBottom: "1px solid " + C.borderLight,
              fontSize: 17, fontWeight: solutionsActive ? 700 : 500,
              color: solutionsActive ? C.primary : C.text,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Solutions
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, transform: mobileSolutionsExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {mobileSolutionsExpanded && (
            <div style={{ paddingLeft: 8, paddingTop: 10, paddingBottom: 10 }}>
              {solutions.map(a => (
                <button
                  key={a.id}
                  onClick={() => { setPage(a.id); setOpen(false); setMobileSolutionsExpanded(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    width: "100%", textAlign: "left", padding: "10px 0",
                    background: "none", border: "none",
                    fontSize: 15, fontWeight: page === a.id ? 700 : 500,
                    color: page === a.id ? C.primary : C.text,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  <span style={{ width: 28, height: 28, borderRadius: 6, background: C.primarySoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <NavIcon name={a.icon} size={18} />
                  </span>
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {/* Other top-level links */}
          {topLinks.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left", padding: "14px 0",
              background: "none", border: "none",
              borderBottom: "1px solid " + C.borderLight,
              fontSize: 17, fontWeight: page === l.id ? 700 : 500,
              color: page === l.id ? C.primary : C.text,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {l.label}
            </button>
          ))}

          {/* Log In */}
          <button onClick={() => { setPage("login"); setOpen(false); }} style={{
            display: "block", width: "100%", textAlign: "left", padding: "14px 0",
            background: "none", border: "none",
            borderBottom: "1px solid " + C.borderLight,
            fontSize: 17, fontWeight: page === "login" ? 700 : 500,
            color: page === "login" ? C.primary : C.text,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Log In
          </button>

          <button className="cta-btn" onClick={() => { setPage("signup"); setOpen(false); }} style={{
            width: "100%", padding: "14px 20px", background: C.btn, color: "#fff",
            border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", marginTop: 24,
          }}>
            Try Free Now
          </button>
          <div style={{ marginTop: 24, fontSize: 12, color: C.textMuted }}>There's no "i" in Retayned.</div>
        </div>
      </SwipeDrawer>
    </>
  );
}

// ═══ Footer ═══
function Footer({ setPage }) {
  return (
    <footer className="v2-footer r-full-bleed">
      <div className="v2-footer-inner">
        <div className="v2-footer-brand">
          <div className="v2-footer-wordmark" onClick={() => setPage("home")} role="button" tabIndex={0}>Retayned.</div>
          <p className="v2-footer-tag">The CRM that prevents churn. Built for the freelancers, agencies, and teams who take client relationships personally.</p>
        </div>
        <div className="v2-footer-col">
          <h5>Product</h5>
          <a onClick={() => setPage("platform")}>Platform</a>
          <a onClick={() => setPage("feature-today")}>Today</a>
          <a onClick={() => setPage("feature-scoring")}>Retention Score</a>
          <a onClick={() => setPage("feature-health")}>Health Checks</a>
          <a onClick={() => setPage("feature-rai")}>Talk to Rai</a>
          <a onClick={() => setPage("feature-rolodex")}>Rolodex</a>
          <a onClick={() => setPage("feature-referrals")}>Referrals</a>
        </div>
        <div className="v2-footer-col">
          <h5>Who it's for</h5>
          <a onClick={() => setPage("freelancers")}>Freelancers</a>
          <a onClick={() => setPage("agencies")}>Agencies</a>
          <a onClick={() => setPage("enterprise")}>Enterprise</a>
          <a onClick={() => setPage("pricing")}>Pricing</a>
        </div>
        <div className="v2-footer-col">
          <h5>Company</h5>
          <a onClick={() => setPage("about")}>About</a>
          <a onClick={() => setPage("blog")}>Blog</a>
          <a onClick={() => setPage("contact")}>Contact</a>
          <a onClick={() => setPage("faq")}>FAQ</a>
        </div>
        <div className="v2-footer-col">
          <h5>Legal</h5>
          <a onClick={() => setPage("privacy")}>Privacy</a>
          <a onClick={() => setPage("terms")}>Terms</a>
        </div>
      </div>
      <div className="v2-footer-citation">
        <sup>1</sup> Reichheld, F. & Schefter, P. "The Economics of E-Loyalty." Harvard Business School / Bain & Company.
      </div>
      <div className="v2-footer-bottom">
        <div>© {new Date().getFullYear()} Maniac Digital, LLC · Retayned</div>
        <div>Built in Washington, DC · There's no "i" in Retayned.</div>
      </div>
    </footer>
  );
}

// Inline footer for pages ending in the 4-stop gradient — renders inside the gradient wrapper
// so the gradient flows seamlessly through it (no hard cut from gradient to solid).
// ═══ HERO INTERACTIVE DEMO ═══
function V2TodayFeed() {
  // Breakpoint-aware row heights — same architecture as desktop+mobile reference files.
  const [bp, setBp] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    if (window.innerWidth <= 420) return "small";
    if (window.innerWidth <= 760) return "mobile";
    return "desktop";
  });
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setBp(w <= 420 ? "small" : w <= 760 ? "mobile" : "desktop");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const ROW_H = bp === "small" ? 124 : bp === "mobile" ? 116 : 92;
  const GAP = bp === "small" ? 10 : 12;
  const STEP = ROW_H + GAP;

  // 4-task pool with kind-based color tokens
  const pool = useRef([
    { id: "hollis",    kind: "deepen",    title: "Hollis & Lee just hit one year — send handwritten note", meta: "Tenure: 12 mo · LTV: $144k · Health: 91", score: 91 },
    { id: "baxter",    kind: "nurture",   title: "Baxter Firm renewal in 21 days — confirm scope",          meta: "LTV: $50k · Renewal probability: 94%",     score: 87 },
    { id: "pinebrook", kind: "nurture",   title: "Pinebrook contract expires in 10 days — align pricing",   meta: "LTV: $38k · Renewal probability: 71%",     score: 76 },
    { id: "meridian",  kind: "urgent",    title: "Meridian Co. hasn't opened emails in 14 days",            meta: "Revenue at risk: $96k/yr · Last touch: 18 days ago", score: 42 },
  ]).current;

  const raiLines = {
    meridian:  "Meridian just dropped to a 42 — worst score in your book. I'm pulling it up to second so you don't miss it.",
    pinebrook: "Pinebrook renewal probability slipped this morning. Bumping it above Baxter — it needs you first.",
    baxter:    "Baxter Firm just confirmed scope on their renewal call. Pinebrook can wait — putting Baxter back ahead.",
    hollis:    "Hollis & Lee are stable at 91. They\'re not urgent today — dropping them so the at-risk accounts surface.",
  };

  const INITIAL = ["hollis","baxter","pinebrook","meridian"];

  const [order, setOrder] = useState(INITIAL);
  const [selectingId, setSelectingId] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [raiText, setRaiText] = useState("");
  const [raiCaret, setRaiCaret] = useState(true);
  const [raiVisible, setRaiVisible] = useState(true);

  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    const sleep = (ms) => new Promise((r, rej) => {
      const t = setTimeout(() => cancelled.current ? rej() : r(), ms);
      return () => clearTimeout(t);
    });

    async function typeLine(text) {
      // fade out current, fade in new
      setRaiVisible(false);
      await sleep(280);
      setRaiText("");
      setRaiCaret(true);
      setRaiVisible(true);
      for (let i = 0; i < text.length; i++) {
        setRaiText(text.slice(0, i + 1));
        const ch = text[i];
        await sleep(ch === " " ? 14 : (16 + Math.random() * 22));
      }
      await sleep(1800);
      setRaiCaret(false);
    }

    async function moveTask(id, toIdx) {
      setThinking(true);
      await sleep(550);
      setSelectingId(id);
      await sleep(650);
      setOrder(prev => {
        const fromIdx = prev.indexOf(id);
        if (fromIdx < 0 || fromIdx === toIdx) return prev;
        const next = [...prev];
        next.splice(fromIdx, 1);
        next.splice(toIdx, 0, id);
        return next;
      });
      await sleep(780);
      setSelectingId(null);
      setThinking(false);
    }

    async function step(id, toIdx) {
      const typing = typeLine(raiLines[id]);
      await moveTask(id, toIdx);
      await typing;
      await sleep(900);
    }

    async function resetOrder() {
      setOrder(INITIAL);
    }

    async function choreography() {
      try {
        await sleep(1400);
        // eslint-disable-next-line no-constant-condition
        while (true) {
          await step("meridian", 1);
          await step("pinebrook", 2);
          await step("baxter", 2);
          await step("hollis", 3);
          await sleep(1600);
          await resetOrder();
          await sleep(1200);
        }
      } catch (e) {
        // cancelled — exit cleanly
      }
    }

    choreography();
    return () => { cancelled.current = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="v2tf-root">
      <div className="v2tf-body">
        <div className="v2tf-head">
          <div>
            <h3 className="v2tf-h">Today</h3>
            <div className="v2tf-sub">{order.length} tasks · sorted by Rai</div>
          </div>
          <div className={"v2tf-ranking" + (thinking ? " thinking" : "")}>Rai is ranking</div>
        </div>

        <div className="v2tf-list-wrap">
          <div
            className="v2tf-list"
            style={{ height: `${order.length * ROW_H + (order.length - 1) * GAP}px` }}
          >
            {pool.map(t => {
              const idx = order.indexOf(t.id);
              const visible = idx >= 0;
              const selecting = selectingId === t.id;
              return (
                <div
                  key={t.id}
                  className={"v2tf-task" + (selecting ? " selecting" : "") + (visible ? "" : " leaving")}
                  style={{
                    height: `${ROW_H}px`,
                    transform: `translateY(${(visible ? idx : 0) * STEP}px)`,
                  }}
                >
                  <div className="v2tf-row1">
                    <div className={"v2tf-label v2tf-label-" + t.kind}>{t.kind}</div>
                    <div className={"v2tf-score v2tf-score-" + t.kind}>{t.score}</div>
                  </div>
                  <div className="v2tf-title">{t.title}</div>
                  <div className="v2tf-meta">{t.meta}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="v2tf-rai">
          <div className="v2tf-avatar" aria-label="Rai">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="#5c3dbf" />
              <path d="M50 18 L57 43 L82 50 L57 57 L50 82 L43 57 L18 50 L43 43 Z" fill="#ffffff" />
            </svg>
          </div>
          <div className="v2tf-msg">
            <span className={"v2tf-msg-line" + (raiVisible ? " show" : "")}>
              <b>Rai:</b> <span className="v2tf-msg-body">{raiText}</span>
              {raiCaret && <span className="v2tf-caret" />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── JS-smooth-scroll wordmark tapestry ───
function V2ScrollBand({ items, direction = "left", speed = 35 }) {
  // items: array of { className, label, colorClass }
  // direction: "left" means content moves left (so track translates to negative X)
  // speed: pixels per second
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for layout, then capture width of one copy (half of total since we duplicate)
    const measure = () => track.scrollWidth / 2;
    let halfWidth = measure();

    const tick = (ts) => {
      if (lastTimeRef.current == null) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = ts;
      const delta = speed * dt * (direction === "left" ? -1 : 1);
      offsetRef.current += delta;
      // Wrap — keep offset in [-halfWidth, 0] for left, or [0, halfWidth] for right
      if (direction === "left") {
        if (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
      } else {
        if (offsetRef.current >= 0) offsetRef.current -= halfWidth;
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    // Initial offset for right direction — start at -halfWidth so content is "ahead"
    if (direction === "right") {
      offsetRef.current = -halfWidth;
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }

    // Start animation
    rafRef.current = requestAnimationFrame(tick);

    // Re-measure on window resize
    const onResize = () => {
      halfWidth = measure();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [direction, speed]);

  return (
    <div className="v2-scroll-band">
      <div className="v2-scroll-track" ref={trackRef}>
        {items.map((it, i) => (
          <span key={"a" + i} className={it.className}>{it.label}</span>
        ))}
        {items.map((it, i) => (
          <span key={"b" + i} className={it.className}>{it.label}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Audience illustrations (freelancers / agencies / enterprise) ───
const AUDIENCE_SVG = {
  freelancers: "<g stroke=\"#2F2F31\" stroke-linejoin=\"round\" stroke-linecap=\"round\"> <path d=\"M230 90 L410 190 L230 290 L50 190 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\" opacity=\"0.6\"></path> <path d=\"M230 90 L410 190 L230 290 L50 190 Z\" fill=\"none\" stroke-width=\"1\" stroke-dasharray=\"3 4\" opacity=\"0.35\"></path> <path d=\"M150 180 L330 180 L390 210 L210 210 Z\" fill=\"#FCFCFE\" stroke-width=\"2\"></path> <path d=\"M210 210 L390 210 L390 218 L210 218 Z\" fill=\"#FCFCFE\" stroke-width=\"2\"></path> <path d=\"M210 210 L210 218 L150 188 L150 180 Z\" fill=\"#FCFCFE\" stroke-width=\"2\"></path> <path d=\"M220 215 L220 268 M378 215 L378 268 M222 215 L180 250\" fill=\"none\" stroke-width=\"2\"></path> <path d=\"M238 188 L326 188 L342 196 L254 196 Z\" fill=\"#FCFCFE\" stroke-width=\"1.8\"></path> <path d=\"M238 188 L254 196 L254 156 L238 148 Z\" fill=\"#558B68\" stroke-width=\"1.8\"></path> <path d=\"M238 148 L326 148 L342 156 L254 156 Z\" fill=\"#558B68\" stroke-width=\"1.8\"></path> <path d=\"M326 148 L342 156 L342 196 L326 188 Z\" fill=\"#558B68\" stroke-width=\"1.8\"></path> <path d=\"M248 154 L330 154 L330 185 L248 185 Z\" fill=\"#FCFCFE\" stroke-width=\"1.2\"></path> <g stroke=\"#2F2F31\" stroke-width=\"1.2\" opacity=\"0.7\"> <line x1=\"254\" y1=\"162\" x2=\"308\" y2=\"162\"></line> <line x1=\"254\" y1=\"170\" x2=\"298\" y2=\"170\"></line> <line x1=\"254\" y1=\"178\" x2=\"312\" y2=\"178\"></line> </g> <g> <ellipse cx=\"180\" cy=\"188\" rx=\"12\" ry=\"5\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></ellipse> <path d=\"M168 188 L170 200 Q180 204 190 200 L192 188\" fill=\"#558B68\" stroke-width=\"1.6\"></path> <path d=\"M192 190 Q200 190 200 196 Q200 202 192 202\" fill=\"none\" stroke-width=\"1.6\"></path> <path d=\"M178 184 Q176 176 182 172\" fill=\"none\" stroke-width=\"1.4\"></path> <path d=\"M186 184 Q184 176 190 172\" fill=\"none\" stroke-width=\"1.4\"></path> </g> <g transform=\"translate(340 170)\"> <path d=\"M-6 8 L18 8 L14 24 L-2 24 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <path d=\"M6 8 Q-6 -10 4 -18 Q14 -8 6 8\" fill=\"#558B68\" stroke-width=\"1.6\"></path> <path d=\"M10 6 Q20 -6 26 4 Q18 12 10 6\" fill=\"#558B68\" stroke-width=\"1.6\"></path> </g> <g transform=\"translate(300 188)\"> <path d=\"M0 0 L-10 -16 L4 -34\" fill=\"none\" stroke-width=\"2\"></path> <path d=\"M-2 -34 L12 -34 L6 -24 L-8 -24 Z\" fill=\"#558B68\" stroke-width=\"1.6\"></path> <ellipse cx=\"0\" cy=\"0\" rx=\"8\" ry=\"3\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></ellipse> </g> <path d=\"M210 222 L210 180 L240 194 L240 236 Z\" fill=\"#FCFCFE\" stroke-width=\"2\"></path> </g>",
  agencies: "<g stroke=\"#2F2F31\" stroke-linejoin=\"round\" stroke-linecap=\"round\"> <path d=\"M230 70 L430 180 L230 290 L30 180 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\" opacity=\"0.45\"></path> <path d=\"M70 90 L230 6 L230 130 L70 214 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\" opacity=\"0.55\"></path> <path d=\"M118 90 L230 30 L230 110 L118 170 Z\" fill=\"#FCFCFE\" stroke-width=\"2\"></path> <path d=\"M118 90 L230 30 L240 34 L128 94 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\"></path> <g> <path d=\"M138 100 L168 84 L168 100 L138 116 Z\" fill=\"#558B68\" stroke-width=\"1.4\"></path> <path d=\"M178 80 L208 64 L208 80 L178 96 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\"></path> <path d=\"M138 132 L168 116 L168 132 L138 148 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\"></path> <path d=\"M178 112 L208 96 L208 112 L178 128 Z\" fill=\"#558B68\" stroke-width=\"1.4\"></path> </g> <path d=\"M118 170 L230 110 L240 114 L128 174 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\"></path> <path d=\"M230 124 L370 194 L230 264 L90 194 Z\" fill=\"#FCFCFE\" stroke-width=\"2\"></path> <line x1=\"160\" y1=\"159\" x2=\"300\" y2=\"229\" stroke-width=\"1\" opacity=\"0.4\"></line> <line x1=\"300\" y1=\"159\" x2=\"160\" y2=\"229\" stroke-width=\"1\" opacity=\"0.4\"></line> <path d=\"M370 194 L370 206 L230 276 L230 264 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <path d=\"M230 264 L230 276 L90 206 L90 194 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <line x1=\"100\" y1=\"200\" x2=\"100\" y2=\"252\" stroke-width=\"1.6\"></line> <line x1=\"360\" y1=\"200\" x2=\"360\" y2=\"252\" stroke-width=\"1.6\"></line> <line x1=\"230\" y1=\"270\" x2=\"230\" y2=\"318\" stroke-width=\"1.6\"></line> <line x1=\"230\" y1=\"130\" x2=\"230\" y2=\"178\" stroke-width=\"1.4\" opacity=\"0.5\"></line> <g transform=\"translate(168 162)\"> <path d=\"M0 0 L26 13 L26 -13 L0 -26 Z\" fill=\"#558B68\" stroke-width=\"1.6\"></path> <path d=\"M3 -3 L23 7 L23 -10 L3 -20 Z\" fill=\"#FCFCFE\" stroke-width=\"1\"></path> <path d=\"M13 6 L13 14 L20 18\" fill=\"none\" stroke-width=\"1.4\"></path> <ellipse cx=\"14\" cy=\"20\" rx=\"6\" ry=\"2\" fill=\"#FCFCFE\" stroke-width=\"1.2\"></ellipse> </g> <g transform=\"translate(292 162)\"> <path d=\"M0 0 L-26 13 L-26 -13 L0 -26 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <path d=\"M-3 -3 L-23 7 L-23 -10 L-3 -20 Z\" fill=\"#558B68\" stroke-width=\"1\"></path> <path d=\"M-13 6 L-13 14 L-20 18\" fill=\"none\" stroke-width=\"1.4\"></path> <ellipse cx=\"-14\" cy=\"20\" rx=\"6\" ry=\"2\" fill=\"#FCFCFE\" stroke-width=\"1.2\"></ellipse> </g> <g transform=\"translate(150 218)\"> <path d=\"M0 0 L36 18 L52 10 L16 -8 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\"></path> <path d=\"M16 -8 L52 10 L52 -8 L16 -26 Z\" fill=\"#558B68\" stroke-width=\"1.4\"></path> <path d=\"M19 -10 L49 5 L49 -8 L19 -23 Z\" fill=\"#FCFCFE\" stroke-width=\"1\"></path> </g> <g transform=\"translate(258 218)\"> <path d=\"M0 0 L-36 18 L-52 10 L-16 -8 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\"></path> <path d=\"M-16 -8 L-52 10 L-52 -8 L-16 -26 Z\" fill=\"#FCFCFE\" stroke-width=\"1.4\"></path> <path d=\"M-19 -10 L-49 5 L-49 -8 L-19 -23 Z\" fill=\"#558B68\" stroke-width=\"1\"></path> </g> <g transform=\"translate(230 195)\"> <ellipse cx=\"0\" cy=\"0\" rx=\"9\" ry=\"4\" fill=\"#558B68\" stroke-width=\"1.4\"></ellipse> <path d=\"M-9 0 L-7 8 Q0 12 7 8 L9 0\" fill=\"#558B68\" stroke-width=\"1.4\"></path> <path d=\"M-3 -4 Q-5 -12 -1 -16\" fill=\"none\" stroke-width=\"1.2\"></path> <path d=\"M3 -4 Q1 -12 5 -16\" fill=\"none\" stroke-width=\"1.2\"></path> </g> <g transform=\"translate(120 160)\"> <path d=\"M0 0 L24 12 L24 -22 L0 -34 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <line x1=\"2\" y1=\"14\" x2=\"2\" y2=\"40\" stroke-width=\"1.4\"></line> <line x1=\"22\" y1=\"24\" x2=\"22\" y2=\"50\" stroke-width=\"1.4\"></line> </g> <g transform=\"translate(316 160)\"> <path d=\"M0 0 L24 -12 L24 -46 L0 -34 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <line x1=\"2\" y1=\"14\" x2=\"2\" y2=\"40\" stroke-width=\"1.4\"></line> <line x1=\"22\" y1=\"2\" x2=\"22\" y2=\"28\" stroke-width=\"1.4\"></line> </g> <g transform=\"translate(120 232)\"> <path d=\"M0 0 L24 12 L24 -22 L0 -34 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <line x1=\"2\" y1=\"14\" x2=\"2\" y2=\"40\" stroke-width=\"1.4\"></line> <line x1=\"22\" y1=\"24\" x2=\"22\" y2=\"50\" stroke-width=\"1.4\"></line> </g> <g transform=\"translate(316 232)\"> <path d=\"M0 0 L24 -12 L24 -46 L0 -34 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <line x1=\"2\" y1=\"14\" x2=\"2\" y2=\"40\" stroke-width=\"1.4\"></line> <line x1=\"22\" y1=\"2\" x2=\"22\" y2=\"28\" stroke-width=\"1.4\"></line> </g> <g transform=\"translate(60 244)\"> <path d=\"M-8 10 L14 10 L10 28 L-4 28 Z\" fill=\"#FCFCFE\" stroke-width=\"1.6\"></path> <path d=\"M3 10 Q-8 -8 0 -18 Q12 -8 3 10\" fill=\"#558B68\" stroke-width=\"1.6\"></path> <path d=\"M8 8 Q22 -2 26 6 Q14 14 8 8\" fill=\"#558B68\" stroke-width=\"1.4\"></path> </g> </g>",
  enterprise: "<g stroke=\"#2F2F31\" stroke-linejoin=\"round\" stroke-linecap=\"round\"> <ellipse cx=\"230\" cy=\"316\" rx=\"180\" ry=\"14\" fill=\"#2F2F31\" opacity=\"0.10\" stroke=\"none\"></ellipse> <path d=\"M230 310 L420 220 L420 234 L230 324 L40 234 L40 220 Z\" fill=\"#EAE0CE\" stroke-width=\"1.6\"></path> <path d=\"M230 70 L370 130 L230 190 L90 130 Z\" fill=\"#F2E8D6\" stroke-width=\"2\"></path> <path d=\"M90 130 L230 70 L230 190 L230 310 L90 250 Z\" fill=\"#E6DBC6\" stroke-width=\"2\"></path> <path d=\"M230 70 L370 130 L370 250 L230 310 L230 190 Z\" fill=\"#558B68\" stroke-width=\"2\"></path> <line x1=\"230\" y1=\"190\" x2=\"230\" y2=\"310\" stroke-width=\"2\"></line> <g stroke-width=\"1.2\" opacity=\"0.85\"> <line x1=\"90\" y1=\"160\" x2=\"230\" y2=\"220\"></line> <line x1=\"90\" y1=\"190\" x2=\"230\" y2=\"250\"></line> <line x1=\"90\" y1=\"220\" x2=\"230\" y2=\"280\"></line> <line x1=\"230\" y1=\"220\" x2=\"370\" y2=\"160\"></line> <line x1=\"230\" y1=\"250\" x2=\"370\" y2=\"190\"></line> <line x1=\"230\" y1=\"280\" x2=\"370\" y2=\"220\"></line> </g> <g stroke-width=\"1.2\" fill=\"#FCFCFE\"> <path d=\"M104 144 L132 132 L132 152 L104 164 Z\"></path> <path d=\"M148 124 L176 112 L176 132 L148 144 Z\" fill=\"#558B68\"></path> <path d=\"M192 104 L220 92 L220 112 L192 124 Z\"></path> <path d=\"M104 174 L132 162 L132 182 L104 194 Z\" fill=\"#558B68\"></path> <path d=\"M148 154 L176 142 L176 162 L148 174 Z\"></path> <path d=\"M192 134 L220 122 L220 142 L192 154 Z\" fill=\"#558B68\"></path> <path d=\"M104 204 L132 192 L132 212 L104 224 Z\"></path> <path d=\"M148 184 L176 172 L176 192 L148 204 Z\" fill=\"#558B68\"></path> <path d=\"M192 164 L220 152 L220 172 L192 184 Z\"></path> <path d=\"M104 234 L132 222 L132 254 L104 266 Z\"></path> <path d=\"M148 214 L176 202 L176 232 L148 244 Z\"></path> <line x1=\"162\" y1=\"208\" x2=\"162\" y2=\"238\" stroke-width=\"1\"></line> <path d=\"M192 194 L220 182 L220 212 L192 224 Z\" fill=\"#558B68\"></path> </g> <g stroke-width=\"1.2\" fill=\"#FCFCFE\"> <path d=\"M250 144 L278 156 L278 136 L250 124 Z\"></path> <path d=\"M294 168 L322 180 L322 160 L294 148 Z\" fill=\"#558B68\"></path> <path d=\"M338 192 L366 204 L366 184 L338 172 Z\"></path> <path d=\"M250 174 L278 186 L278 166 L250 154 Z\" fill=\"#558B68\"></path> <path d=\"M294 198 L322 210 L322 190 L294 178 Z\"></path> <path d=\"M338 222 L366 234 L366 214 L338 202 Z\" fill=\"#558B68\"></path> <path d=\"M250 204 L278 216 L278 196 L250 184 Z\"></path> <path d=\"M294 228 L322 240 L322 220 L294 208 Z\" fill=\"#558B68\"></path> <path d=\"M338 252 L366 264 L366 244 L338 232 Z\"></path> <path d=\"M250 234 L278 246 L278 216 L250 204 Z\"></path> <path d=\"M294 258 L322 270 L322 240 L294 228 Z\"></path> <path d=\"M338 282 L366 294 L366 264 L338 252 Z\" fill=\"#558B68\"></path> </g> <line x1=\"230\" y1=\"70\" x2=\"230\" y2=\"34\" stroke-width=\"2\"></line> <circle cx=\"230\" cy=\"30\" r=\"3\" fill=\"#558B68\" stroke-width=\"1.4\"></circle> <g fill=\"none\" stroke-width=\"1.4\"> <path d=\"M222 30 Q230 18 238 30\"></path> <path d=\"M216 30 Q230 10 244 30\" opacity=\"0.6\"></path> </g> <g transform=\"translate(70 280)\"> <path d=\"M0 0 Q-9 -16 0 -26 Q9 -16 0 0 Z\" fill=\"#558B68\" stroke-width=\"1.4\"></path> <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"10\" stroke-width=\"1.4\"></line> </g> <g transform=\"translate(390 280)\"> <path d=\"M0 0 Q-9 -16 0 -26 Q9 -16 0 0 Z\" fill=\"#558B68\" stroke-width=\"1.4\"></path> <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"10\" stroke-width=\"1.4\"></line> </g> <g transform=\"translate(120 296)\"> <path d=\"M0 0 Q-7 -12 0 -20 Q7 -12 0 0 Z\" fill=\"#558B68\" stroke-width=\"1.4\"></path> <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"8\" stroke-width=\"1.4\"></line> </g> <g transform=\"translate(340 296)\"> <path d=\"M0 0 Q-7 -12 0 -20 Q7 -12 0 0 Z\" fill=\"#558B68\" stroke-width=\"1.4\"></path> <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"8\" stroke-width=\"1.4\"></line> </g> </g>",
};

function AudienceIllustration({ tab }) {
  const inner = AUDIENCE_SVG[tab] || AUDIENCE_SVG.freelancers;
  return (
    <svg
      viewBox="0 0 460 340"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}


// ─── Main HomeV2 component ───
function HomeV2({ setPage }) {
  const [audienceTab, setAudienceTab] = useState("freelancers");
  const [activeTab, setActiveTab] = useState(1);
  const [expandedText, setExpandedText] = useState(false);

  // Spaceship scroll-trigger: add .animate when Final CTA enters viewport
  const finalCtaRef = useRef(null);
  useEffect(() => {
    const el = finalCtaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("v2-final-animate");
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const homeTabs = [
    { id: "today", label: "Today", icon: "◉", headline: "One page. Every priority.", sub: "Your Today tab knows which clients need you most — right now. Tasks are sorted by an invisible priority engine that weighs relationship health against business value. Green clients surface first. At-risk clients with high revenue jump the line." },
    { id: "scoring", label: "Retention Score", icon: "◎", headline: "A number that means something.", sub: "12 dimensions. 20 combination signals. Health check modifiers. Every client gets a Retention Score from 1–99 that tells you exactly where the relationship stands — not where you hope it is." },
    { id: "health", label: "Health Checks", icon: "♡", headline: "Five questions. Two minutes. The truth.", sub: "Regular check-ins that detect drift before it becomes damage. Your answers blend directly into the Retention Score — bad news moves the number immediately. No lengthy forms. No busywork. Just the signal." },
    { id: "rai", label: "Talk to Rai", icon: "✦", headline: "She writes the words you need when it matters most.", sub: "Rai is an AI advisor calibrated to your specific relationships. When you don't know what to say — the opening line, the tone, whether to call or email — Rai gives you the script." },
    { id: "rolodex", label: "Rolodex", icon: "⟐", headline: "Your pipeline is forward-looking.", sub: "Former clients aren't dead relationships — they're future revenue. The Rolodex tracks who left, how it ended, and whether they'd come back. One-off projects become re-engagement opportunities." },
    { id: "referrals", label: "Referrals", icon: "⟡", headline: "Your best clients send you their friends.", sub: "Retayned tracks referral readiness based on loyalty, trust, and relationship depth. When a client is ready to refer, the system knows before you do." },
  ];
  const ht = homeTabs[activeTab];

  const dimensions = [
    { className: "v2-dim v2-dim-serif-italic", label: "Grace" },
    { className: "v2-dim v2-dim-heavy-caps", label: "TRUST" },
    { className: "v2-dim v2-dim-spaced-lower", label: "communication" },
    { className: "v2-dim v2-dim-serif", label: "Loyalty" },
    { className: "v2-dim v2-dim-small-caps", label: "BUDGET RISK" },
    { className: "v2-dim v2-dim-serif-italic-lg", label: "Depth" },
    { className: "v2-dim v2-dim-small-caps", label: "STRESS" },
    { className: "v2-dim v2-dim-serif-italic", label: "Expectations" },
    { className: "v2-dim v2-dim-spaced-lower", label: "FUNGIBILITY" },
    { className: "v2-dim v2-dim-serif-italic-lg", label: "tone" },
    { className: "v2-dim v2-dim-heavy-caps", label: "AUTHORITY" },
    { className: "v2-dim v2-dim-small-caps", label: "REPORTING" },
  ];

  const combinations = [
    { className: "v2-wm v2-wm-pos v2-wm-bulletproof", label: "Bulletproof" },
    { className: "v2-wm v2-wm-neg v2-wm-icewall", label: "Ice Wall" },
    { className: "v2-wm v2-wm-pos v2-wm-lockedvault", label: "LOCKED VAULT" },
    { className: "v2-wm v2-wm-neg v2-wm-ontheclock", label: "On the Clock" },
    { className: "v2-wm v2-wm-pos v2-wm-cornerstone", label: "Cornerstone" },
    { className: "v2-wm v2-wm-neg v2-wm-silentexit", label: "Silent Exit" },
    { className: "v2-wm v2-wm-pos v2-wm-decisionexpress", label: "DECISION EXPRESS" },
    { className: "v2-wm v2-wm-neg v2-wm-noroom", label: "NO ROOM TO OPERATE" },
    { className: "v2-wm v2-wm-pos v2-wm-truepartner", label: "True Partner" },
    { className: "v2-wm v2-wm-neg v2-wm-tickingbomb", label: "TICKING TIME BOMB" },
    { className: "v2-wm v2-wm-pos v2-wm-smoothop", label: "Smooth Operator" },
    { className: "v2-wm v2-wm-neg v2-wm-onefoot", label: "One Foot Out" },
    { className: "v2-wm v2-wm-pos v2-wm-allinvestor", label: "All-in Investor" },
    { className: "v2-wm v2-wm-neg v2-wm-powderkeg", label: "POWDER KEG" },
    { className: "v2-wm v2-wm-pos v2-wm-openbook", label: "Open Book" },
    { className: "v2-wm v2-wm-neg v2-wm-nickeldime", label: "Nickel and Dime" },
    { className: "v2-wm v2-wm-pos v2-wm-resilient", label: "RESILIENT UNDER FIRE" },
    { className: "v2-wm v2-wm-neg v2-wm-noanchor", label: "No Anchor" },
    { className: "v2-wm v2-wm-pos v2-wm-lowmaint", label: "Low Maintenance Loyalty" },
    { className: "v2-wm v2-wm-neg v2-wm-bottleneck", label: "BOTTLENECK DOOM" },
  ];

  const audiencePanels = {
    freelancers: {
      h: "The CRM that catches what you miss.",
      p: "You're a team of one. You can't be on every Slack thread, every email, every hint of drift. Retayned watches the whole book while you focus on the work.",
      cta: "See the platform",
      ctaTarget: "freelancers",
    },
    agencies: {
      h: "Your team's memory, on one system.",
      p: "When an account manager leaves, they take 40 client relationships with them. Retayned holds the institutional knowledge — so your team doesn't have to.",
      cta: "See for agencies",
      ctaTarget: "agencies",
    },
    enterprise: {
      h: "Account management as a service.",
      p: "Your top 50 accounts get a human account manager. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface.",
      cta: "See Enterprise",
      ctaTarget: "enterprise",
    },
  };
  const panel = audiencePanels[audienceTab];

  return (
    <div className="v2-root">
      {/* ══════ HERO ══════ */}
      <section className="v2-hero r-full-bleed">
        <div className="v2-hero-inner">
          <div className="v2-trust-pill">
            <span className="v2-trust-dot" />
            For freelancers, agencies, large orgs and mobsters
          </div>
          <h1 className="v2-hero-h1">
            The CRM that{" "}
            <span className="v2-strike-wrap">
              <span className="v2-strike">predicts</span>
              <span className="v2-caveat">prevents</span>
            </span>{" "}churn.
          </h1>
          <p className="v2-hero-sub">Stop losing clients you should have kept.</p>
          <p className="v2-hero-desc">Most CRMs track deals. Retayned tracks relationship health — providing client-specific solutions to keep and grow the business you've earned.</p>
          <div className="v2-hero-cta-row">
            <button className="v2-btn-primary-lg cta-btn" onClick={() => setPage("signup")}>Start Free Trial</button>
          </div>
          <p className="v2-hero-fine">14-day free trial. Cancel anytime.</p>

          <div className="v2-hero-device">
            <div className="v2-hero-device-inner">
              <V2TodayFeed />
            </div>
          </div>
        </div>
      </section>

      {/* curve: hero (beige) → stats (cream) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: "#F2EEE8" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,20 Q 720,140 0,30 Z" fill={C.bg} /></svg>
      </div>

      {/* ══════ MEET RAI ══════ */}
      <section className="v2-section-rai r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-section-head">
            <div className="v2-eyebrow">How it works</div>
            <h2 className="v2-section-h2">Meet <span style={{ color: C.btn }}>Rai</span>. She pays attention to every client, every day.</h2>
            <p className="v2-section-sub">When something shifts, she catches it — and tells you what to do about it.</p>
          </div>
          <div className="v2-rai-steps">
            {[
              {
                num: "01",
                h: <>She sees it.</>,
                p: "Cross-referencing activity logs, health checks, score trends, combination signals — continuously, across your entire book.",
                bg: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20360%20300%22%3E%0A%20%20%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2814%2022%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%2220%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2214%22%20cy%3D%2214%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2220%22%20cy%3D%2218%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2226%22%20cy%3D%2210%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2230%22%20cy%3D%228%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C22%2012%2C18%2020%2C14%2028%2C10%2032%2C6%22%20fill%3D%22none%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2856%2014%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%0A%20%20%20%20%3Cpath%20d%3D%22M4%206%20Q4%204%206%204%20L18%204%20Q20%204%2020%206%20L20%2012%20Q20%2014%2018%2014%20L10%2014%20L6%2017%20L7%2014%20Q4%2014%204%2012%20Z%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%228%22%20x2%3D%2217%22%20y2%3D%228%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%2211%22%20x2%3D%2214%22%20y2%3D%2211%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%0A%20%20%20%20%3Cpath%20d%3D%22M16%2017%20Q16%2015%2018%2015%20L30%2015%20Q32%2015%2032%2017%20L32%2023%20Q32%2025%2030%2025%20L22%2025%20L19%2028%20L20%2025%20Q16%2025%2016%2023%20Z%22%20fill%3D%22%232F2F31%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%2219%22%20y1%3D%2219%22%20x2%3D%2229%22%20y2%3D%2219%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2219%22%20y1%3D%2222%22%20x2%3D%2227%22%20y2%3D%2222%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2816%2058%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2222%22%20x2%3D%226%22%20y2%3D%2216%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2222%22%20x2%3D%2212%22%20y2%3D%2210%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2222%22%20x2%3D%2218%22%20y2%3D%2214%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2224%22%20y1%3D%2222%22%20x2%3D%2224%22%20y2%3D%228%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2230%22%20y1%3D%2222%22%20x2%3D%2230%22%20y2%3D%2212%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28264%2010%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C16%2010%2C18%2016%2C12%2022%2C14%2028%2C6%2032%2C10%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28308%2024%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpath%20d%3D%22M4%205%20Q4%203%206%203%20L20%203%20Q22%203%2022%205%20L22%2011%20Q22%2013%2020%2013%20L10%2013%20L6%2016%20L7%2013%20Q4%2013%204%2011%20Z%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%227%22%20x2%3D%2219%22%20y2%3D%227%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%2210%22%20x2%3D%2216%22%20y2%3D%2210%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cpath%20d%3D%22M14%2016%20Q14%2014%2016%2014%20L30%2014%20Q32%2014%2032%2016%20L32%2022%20Q32%2024%2030%2024%20L20%2024%20L17%2027%20L18%2024%20Q14%2024%2014%2022%20Z%22%20fill%3D%22%232F2F31%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%2217%22%20y1%3D%2218%22%20x2%3D%2229%22%20y2%3D%2218%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2217%22%20y1%3D%2221%22%20x2%3D%2225%22%20y2%3D%2221%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28306%2062%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C22%2010%2C18%2016%2C14%2022%2C16%2028%2C10%2032%2C6%22%20fill%3D%22none%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%226%22%20r%3D%222%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2812%20212%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C12%2010%2C10%2016%2C16%2022%2C14%2028%2C22%2032%2C20%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2814%20250%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%2210%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2214%22%20cy%3D%2218%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2214%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2220%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%228%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28304%20222%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2222%22%20x2%3D%226%22%20y2%3D%2210%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2222%22%20x2%3D%2212%22%20y2%3D%2216%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2222%22%20x2%3D%2218%22%20y2%3D%228%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2224%22%20y1%3D%2222%22%20x2%3D%2224%22%20y2%3D%2214%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2230%22%20y1%3D%2222%22%20x2%3D%2230%22%20y2%3D%226%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28308%20260%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C20%2010%2C14%2016%2C8%2022%2C12%2028%2C10%2032%2C4%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20fill%3D%22%232F2F31%22%20opacity%3D%220.18%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%22118%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2296%22%20cy%3D%2296%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22104%22%20cy%3D%22152%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2272%22%20cy%3D%22172%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22266%22%20cy%3D%22108%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22284%22%20cy%3D%22146%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22272%22%20cy%3D%22186%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22252%22%20cy%3D%22130%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%20opacity%3D%220.4%22%20stroke-dasharray%3D%222%203%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M50%2034%20L146%20118%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M56%2072%20L146%20128%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M52%2086%20L146%20160%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M300%2030%20L214%20118%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M324%2090%20L214%20128%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M48%20232%20L146%20180%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M48%20264%20L146%20190%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M322%20240%20L214%20180%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M326%20280%20L214%20184%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28106%20102%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%223%22%20y%3D%225%22%20width%3D%22150%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.10%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22150%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.2%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2214%22%20x2%3D%2270%22%20y2%3D%2214%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2221%22%20x2%3D%2252%22%20y2%3D%2221%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.3%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.7%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22104%22%20y%3D%228%22%20width%3D%2234%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22112%22%20cy%3D%2215%22%20r%3D%222%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Cline%20x1%3D%22118%22%20y1%3D%2215%22%20x2%3D%22132%22%20y2%3D%2215%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%0A%20%20%20%20%3Crect%20x%3D%2212%22%20y%3D%2232%22%20width%3D%22126%22%20height%3D%2264%22%20rx%3D%224%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.8%22%20opacity%3D%220.25%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2248%22%20x2%3D%22138%22%20y2%3D%2248%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2264%22%20x2%3D%22138%22%20y2%3D%2264%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2280%22%20x2%3D%22138%22%20y2%3D%2280%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2240%22%20y1%3D%2232%22%20x2%3D%2240%22%20y2%3D%2296%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2272%22%20y1%3D%2232%22%20x2%3D%2272%22%20y2%3D%2296%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22104%22%20y1%3D%2232%22%20x2%3D%22104%22%20y2%3D%2296%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%20%20%3Cg%20fill%3D%22%232F2F31%22%20opacity%3D%220.45%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2282%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2274%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2238%22%20cy%3D%2278%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2246%22%20cy%3D%2270%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2254%22%20cy%3D%2266%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2262%22%20cy%3D%2272%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2270%22%20cy%3D%2260%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2278%22%20cy%3D%2258%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2286%22%20cy%3D%2252%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2294%22%20cy%3D%2254%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22102%22%20cy%3D%2246%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22110%22%20cy%3D%2248%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22118%22%20cy%3D%2242%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22126%22%20cy%3D%2238%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2234%22%20cy%3D%2288%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2258%22%20cy%3D%2280%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2282%22%20cy%3D%2266%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22106%22%20cy%3D%2258%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22122%22%20cy%3D%2252%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%20%20%3Cpolyline%20points%3D%2218%2C84%2034%2C78%2052%2C70%2070%2C62%2088%2C54%20106%2C46%20124%2C40%20134%2C36%22%20fill%3D%22none%22%20stroke%3D%22%23558B68%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22124%22%20cy%3D%2240%22%20r%3D%224.8%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%3E%3C/circle%3E%0A%20%20%20%20%3Cline%20x1%3D%22124%22%20y1%3D%2240%22%20x2%3D%22124%22%20y2%3D%2228%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22124%22%20cy%3D%2226%22%20r%3D%222.2%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%3E%3C/circle%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%22102%22%20x2%3D%2290%22%20y2%3D%22102%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.3%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2296%22%20y1%3D%22102%22%20x2%3D%22138%22%20y2%3D%22102%22%20stroke%3D%22%23558B68%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28250%20160%29%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2214%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%3E%3C/circle%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%2C-8%20L2%2C-2%20L8%2C0%20L2%2C2%20L0%2C8%20L-2%2C2%20L-8%2C0%20L-2%2C-2%20Z%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22none%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%3C/svg%3E")`,
              },
              {
                num: "02",
                h: <>She calls it out.</>,
                p: "Every morning, before your first coffee, Rai flags a few items she thinks are worth your time. Tasks worth accomplishing.",
                bg: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20360%20300%22%3E%0A%20%20%0A%0A%20%20%0A%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M150%2058%20Q144%2044%20154%2034%20Q162%2024%20154%2012%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M178%2054%20Q172%2038%20182%2028%20Q188%2020%20182%208%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M204%2060%20Q198%2046%20208%2036%20Q216%2026%20208%2014%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28110%2070%29%22%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%20d%3D%22M130%2050%20Q170%2050%20170%2090%20Q170%20130%20130%20130%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20d%3D%22M130%2062%20Q158%2062%20158%2090%20Q158%20118%20130%20118%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%20d%3D%22M6%2044%20Q4%2038%2012%2038%20L134%2038%20Q142%2038%20140%2044%20L132%20174%20Q130%20184%20120%20184%20L26%20184%20Q16%20184%2014%20174%20Z%22%3E%3C/path%3E%0A%20%20%20%20%3Cellipse%20cx%3D%2273%22%20cy%3D%2245%22%20rx%3D%2262%22%20ry%3D%229%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/ellipse%3E%0A%20%20%20%20%3Cellipse%20cx%3D%2273%22%20cy%3D%2245%22%20rx%3D%2254%22%20ry%3D%226%22%20fill%3D%22%233F434B%22%20opacity%3D%220.9%22%3E%3C/ellipse%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40%2042%20Q52%2038%2070%2039%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.8%22%3E%3C/path%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20opacity%3D%220.35%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22118%22%20y1%3D%2270%22%20x2%3D%22122%22%20y2%3D%22164%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22124%22%20y1%3D%2270%22%20x2%3D%22127%22%20y2%3D%22160%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22112%22%20y1%3D%2272%22%20x2%3D%22115%22%20y2%3D%22166%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28220%20130%29%20rotate%2810%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2292%22%20height%3D%22140%22%20rx%3D%2212%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2280%22%20height%3D%22118%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%2236%22%20y%3D%226%22%20width%3D%2220%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%232F2F31%22%3E%3C/rect%3E%0A%0A%20%20%20%20%0A%20%20%20%20%3Cg%20transform%3D%22translate%2810%2022%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23558B68%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.8%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%224%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%224%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2220%22%20y1%3D%228%22%20x2%3D%2258%22%20y2%3D%228%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2220%22%20y1%3D%2214%22%20x2%3D%2248%22%20y2%3D%2214%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.85%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2226%22%20x2%3D%2266%22%20y2%3D%2226%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2232%22%20x2%3D%2258%22%20y2%3D%2232%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2238%22%20x2%3D%2242%22%20y2%3D%2238%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%0A%20%20%20%20%3Cg%20transform%3D%22translate%2810%2074%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2222%22%20rx%3D%225%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%229%22%20cy%3D%2211%22%20r%3D%223%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%229%22%20x2%3D%2258%22%20y2%3D%229%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2215%22%20x2%3D%2244%22%20y2%3D%2215%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%20%20%3Cg%20transform%3D%22translate%2810%20102%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2222%22%20rx%3D%225%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%229%22%20cy%3D%2211%22%20r%3D%223%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%229%22%20x2%3D%2254%22%20y2%3D%229%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2215%22%20x2%3D%2240%22%20y2%3D%2215%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2292%22%20y1%3D%2230%22%20x2%3D%2292%22%20y2%3D%2248%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M232%20108%20L228%20100%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M246%20102%20L244%2092%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M260%20100%20L262%2090%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M274%20104%20L280%2096%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20transform%3D%22translate%28300%20100%29%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2210%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%3E%3C/circle%3E%0A%20%20%20%20%3Cline%20x1%3D%220%22%20y1%3D%22-4%22%20x2%3D%220%22%20y2%3D%222%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%226%22%20r%3D%221.4%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%3C/svg%3E")`,
              },
              {
                num: "03",
                h: <>She ranks it.</>,
                p: "Rai weighs and carefully selects the best spots for the tasks she's assigned. Your highest-value move is next up.",
                bg: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20360%20300%22%3E%0A%20%20%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2850%20220%29%20rotate%28-3%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22240%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2222%22%20r%3D%2212%22%20fill%3D%22%23FAF0E4%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2222%22%20y%3D%2227%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E4%3C/text%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2216%22%20x2%3D%22160%22%20y2%3D%2216%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2226%22%20x2%3D%22120%22%20y2%3D%2226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2212%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.6%22%3E%3C/rect%3E%0A%20%20%20%20%3Cline%20x1%3D%22180%22%20y1%3D%2230%22%20x2%3D%22212%22%20y2%3D%2230%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2856%20170%29%20rotate%28-1%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22240%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2222%22%20r%3D%2212%22%20fill%3D%22%23FAF0E4%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2222%22%20y%3D%2227%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E3%3C/text%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2216%22%20x2%3D%22168%22%20y2%3D%2216%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2226%22%20x2%3D%22132%22%20y2%3D%2226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2222%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.6%22%3E%3C/rect%3E%0A%20%20%20%20%3Cline%20x1%3D%22180%22%20y1%3D%2230%22%20x2%3D%22212%22%20y2%3D%2230%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2852%20120%29%20rotate%28-2%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22240%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2222%22%20r%3D%2212%22%20fill%3D%22%23FAF0E4%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2222%22%20y%3D%2227%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E1%3C/text%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2216%22%20x2%3D%22172%22%20y2%3D%2216%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2226%22%20x2%3D%22140%22%20y2%3D%2226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2232%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.65%22%3E%3C/rect%3E%0A%20%20%20%20%3Cline%20x1%3D%22180%22%20y1%3D%2230%22%20x2%3D%22212%22%20y2%3D%2230%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2848%2038%29%20rotate%28-2%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%223%22%20y%3D%225%22%20width%3D%22264%22%20height%3D%2258%22%20rx%3D%228%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.12%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22264%22%20height%3D%2258%22%20rx%3D%228%22%20fill%3D%22%23558B68%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22264%22%20height%3D%2258%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.4%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%0A%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2229%22%20r%3D%2216%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2229%22%20r%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2228%22%20y%3D%2235%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2220%22%20font-weight%3D%22700%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E2%3C/text%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2254%22%20y1%3D%2220%22%20x2%3D%22176%22%20y2%3D%2220%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%222.6%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2254%22%20y1%3D%2232%22%20x2%3D%22148%22%20y2%3D%2232%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.9%22%3E%3C/line%3E%0A%0A%20%20%20%20%3Crect%20x%3D%22190%22%20y%3D%2220%22%20width%3D%2260%22%20height%3D%228%22%20rx%3D%224%22%20fill%3D%22%23FCFCFE%22%20opacity%3D%220.55%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22190%22%20y%3D%2220%22%20width%3D%2260%22%20height%3D%228%22%20rx%3D%224%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22192%22%20y%3D%2222%22%20width%3D%2250%22%20height%3D%224%22%20rx%3D%222%22%20fill%3D%22%23FCFCFE%22%3E%3C/rect%3E%0A%0A%20%20%20%20%3Cg%20transform%3D%22translate%28190%2036%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2260%22%20height%3D%2212%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2260%22%20height%3D%2212%22%20rx%3D%226%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%228%22%20y1%3D%226%22%20x2%3D%2252%22%20y2%3D%226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%0A%20%20%20%20%3Cg%20transform%3D%22translate%28252%20-6%29%20rotate%2815%29%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M0%20-8%20L2.4%20-2.4%20L8%20-2%20L3.6%202%20L5%208%20L0%204.6%20L-5%208%20L-3.6%202%20L-8%20-2%20L-2.4%20-2.4%20Z%22%20fill%3D%22%23FCFCFE%22%3E%3C/path%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M0%20-8%20L2.4%20-2.4%20L8%20-2%20L3.6%202%20L5%208%20L0%204.6%20L-5%208%20L-3.6%202%20L-8%20-2%20L-2.4%20-2.4%20Z%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linejoin%3D%22round%22%3E%3C/path%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%20opacity%3D%220.9%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M320%20180%20Q332%20140%20320%2096%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M316%20100%20L320%2092%20L326%2098%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20transform%3D%22translate%28322%20226%29%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2212%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%224%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%220%22%20y1%3D%22-12%22%20x2%3D%220%22%20y2%3D%22-16%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%220%22%20y1%3D%2212%22%20x2%3D%220%22%20y2%3D%2216%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22-12%22%20y1%3D%220%22%20x2%3D%22-16%22%20y2%3D%220%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%220%22%20x2%3D%2216%22%20y2%3D%220%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22-8.5%22%20y1%3D%22-8.5%22%20x2%3D%22-11.3%22%20y2%3D%22-11.3%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%228.5%22%20y1%3D%228.5%22%20x2%3D%2211.3%22%20y2%3D%2211.3%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22-8.5%22%20y1%3D%228.5%22%20x2%3D%22-11.3%22%20y2%3D%2211.3%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%228.5%22%20y1%3D%22-8.5%22%20x2%3D%2211.3%22%20y2%3D%22-11.3%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%3C/svg%3E")`,
              },
            ].map((s, i) => (
              <div key={i} className="v2-rai-step">
                <div className="v2-rai-step-illustration" style={{ backgroundImage: s.bg }} />
                <div className="v2-rai-step-content">
                  <h3 className="v2-rai-step-h">{s.h}</h3>
                  <p className="v2-rai-step-p">{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* curve: rai (cream) → platform (warm) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: C.bg }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,30 C 1080,-20 360,140 0,25 Z" fill="#EAE4D6" /></svg>
      </div>

      {/* ══════ PLATFORM ══════ */}
      <section className="v2-section-platform r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-platform-grid">
            <div>
              <div className="v2-eyebrow">The platform</div>
              <h2 className="v2-section-h2">CRMs track deals. Retayned tracks relationships.</h2>
              <p className="v2-section-sub">Your pipeline is forward-looking. Your clients aren't in it. They're the business you've already earned — and most CRMs treat them like they're already safe.</p>
              <div className="v2-bullets">
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>12-dimension retention scoring</strong> that measures relationship health, not transaction volume.</div></div>
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>Health checks that blend into the score</strong> — five questions, two minutes, and the truth moves the number immediately.</div></div>
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>Rai writes the words you need</strong> when it matters most — calibrated to your specific relationships.</div></div>
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>Your Rolodex is future revenue</strong> — former clients become re-engagement opportunities, not dead weight.</div></div>
              </div>
            </div>
            <div className="v2-platform-portfolio">
              {/* Header */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 3, letterSpacing: "0.03em" }}>Your portfolio</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>Clients</span>
                </div>
                <div style={{ fontSize: 11, color: C.textMuted }}>
                  <span style={{ color: C.text, fontWeight: 600 }}>14 active</span> · <span style={{ color: C.primary, fontWeight: 700 }}>$58.2k</span>/mo · <span style={{ color: C.primary, fontWeight: 700 }}>71</span> avg
                </div>
              </div>

              {/* Two-column layout: left sidebar + main table */}
              <div className="v2-platform-portfolio-grid">

                {/* Left sidebar — portfolio summary + recent movement */}
                <div className="v2-port-sidebar">
                  <div className="v2-port-card">
                    <div className="v2-port-card-label">PORTFOLIO</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: "50%",
                        border: "3px solid " + C.primary,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 900, color: C.primary,
                      }}>71</div>
                      <div style={{ fontSize: 11, lineHeight: 1.55, flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textMuted }}>Clients</span><span style={{ fontWeight: 700 }}>14</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textMuted }}>MRR</span><span style={{ fontWeight: 700 }}>$58.2k</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textMuted }}>Avg</span><span style={{ fontWeight: 700 }}>71</span></div>
                      </div>
                    </div>
                    <div style={{ display: "flex", height: 3, borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
                      <div style={{ flex: 5, background: C.success }} />
                      <div style={{ flex: 4, background: C.primaryLight }} />
                      <div style={{ flex: 4, background: "#B88B15" }} />
                      <div style={{ flex: 1, background: C.danger }} />
                    </div>
                    <div style={{ fontSize: 10.5, lineHeight: 1.7 }}>
                      <div><span style={{ color: C.success, marginRight: 4 }}>●</span><strong>5</strong> <span style={{ color: C.textMuted }}>Thriving</span></div>
                      <div><span style={{ color: C.primaryLight, marginRight: 4 }}>●</span><strong>4</strong> <span style={{ color: C.textMuted }}>Healthy</span></div>
                      <div><span style={{ color: "#B88B15", marginRight: 4 }}>●</span><strong>4</strong> <span style={{ color: C.textMuted }}>Watch</span></div>
                      <div><span style={{ color: C.danger, marginRight: 4 }}>●</span><strong>1</strong> <span style={{ color: C.textMuted }}>At risk</span></div>
                    </div>
                  </div>

                  <div className="v2-port-card">
                    <div className="v2-port-card-label" style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>RECENT MOVEMENT</span><span style={{ color: C.textMuted }}>7d</span>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.success, marginBottom: 6, letterSpacing: "0.06em" }}>CLIMBING</div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: C.primaryLight }}>NR</span><span style={{ flex: 1, fontSize: 11 }}>Northvane Retail</span><span style={{ fontSize: 10, color: C.success, fontWeight: 700 }}>+5</span></div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: C.primary }}>HP</span><span style={{ flex: 1, fontSize: 11 }}>Harbor Pines</span><span style={{ fontSize: 10, color: C.success, fontWeight: 700 }}>+3</span></div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.danger, marginTop: 10, marginBottom: 6, letterSpacing: "0.06em" }}>SLIPPING</div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: "#B88B15" }}>EC</span><span style={{ flex: 1, fontSize: 11 }}>Ellis & Co.</span><span style={{ fontSize: 10, color: C.danger, fontWeight: 700 }}>−4</span></div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: "#92A596" }}>BQ</span><span style={{ flex: 1, fontSize: 11 }}>Birchwood Quarry</span><span style={{ fontSize: 10, color: C.danger, fontWeight: 700 }}>−3</span></div>
                  </div>
                </div>

                {/* Main table */}
                <div className="v2-port-table-wrap">
                  <div className="v2-port-controls">
                    <div style={{ display: "flex", gap: 4, fontSize: 10, alignItems: "center" }}>
                      <span style={{ color: C.textMuted, letterSpacing: "0.08em" }}>SORT</span>
                      <span className="v2-port-pill v2-port-pill-active">Priority</span>
                      <span className="v2-port-pill">Revenue</span>
                      <span className="v2-port-pill">Trend</span>
                      <span className="v2-port-pill">Renewal</span>
                    </div>
                  </div>
                  <div style={{ padding: "8px 14px", fontSize: 10, color: C.textMuted, borderBottom: "1px solid " + C.borderLight, display: "flex", justifyContent: "space-between" }}>
                    <span>14 clients</span><span>Sort: <strong style={{ color: C.text }}>Priority</strong></span>
                  </div>

                  {/* Column headers */}
                  <div className="v2-port-row v2-port-row-header">
                    <div style={{ flex: "2 1 0", minWidth: 0 }}>CLIENT</div>
                    <div className="v2-port-col-num">HEALTH</div>
                    <div className="v2-port-col-num">REVENUE</div>
                    <div className="v2-port-col-num">12-WK</div>
                    <div className="v2-port-col-num">CADENCE</div>
                    <div className="v2-port-col-num">RENEWS</div>
                  </div>

                  {/* Client rows */}
                  {[
                    { i: "HM", name: "Harlow Media", industry: "Financial Services", score: 88, scoreColor: C.success, delta: "−3", revenue: "$5.8k", trend: "down", trendPct: "−6%", trendColor: C.danger, cadence: "12d silent", cadenceColor: "o", renews: "4mo" },
                    { i: "VC", name: "Vantage Collective", industry: "Ecommerce", score: 87, scoreColor: C.success, delta: "−2", revenue: "$9.2k", trend: "down", trendPct: "−6%", trendColor: C.danger, cadence: "18d cadence", cadenceColor: "●", renews: "5mo" },
                    { i: "OR", name: "Orchard Ridge", industry: "Ecommerce", score: 79, scoreColor: C.primaryLight, delta: "−2", revenue: "$8.7k", trend: "down", trendPct: "−7%", trendColor: C.danger, cadence: "10d cadence", cadenceColor: "●", renews: "6mo" },
                    { i: "NR", name: "Northvane Retail", industry: "Ecommerce", score: 92, scoreColor: C.success, delta: "+2", revenue: "$4.3k", trend: "up", trendPct: "+8%", trendColor: C.success, cadence: "10d cadence", cadenceColor: "●", renews: "1mo" },
                    { i: "LG", name: "Lantern Group", industry: "Legal Services", score: 72, scoreColor: "#B88B15", delta: "+4", revenue: "$5.5k", trend: "up", trendPct: "+10%", trendColor: C.success, cadence: "19d cadence", cadenceColor: "●", renews: "2mo" },
                    { i: "EC", name: "Ellis & Co.", industry: "Ecommerce", score: 78, scoreColor: C.primaryLight, delta: "−4", revenue: "$4.1k", trend: "down", trendPct: "−6%", trendColor: C.danger, cadence: "On rhythm", cadenceColor: "●●", renews: "3mo" },
                    { i: "SG", name: "Sidegate", industry: "Ecommerce", score: 84, scoreColor: C.success, delta: "+3", revenue: "$1.2k", trend: "up", trendPct: "+9%", trendColor: C.success, cadence: "17d cadence", cadenceColor: "●", renews: "5mo" },
                  ].map((r, idx) => (
                    <div key={idx} className="v2-port-row">
                      <div style={{ flex: "2 1 0", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <span className="v2-port-avatar" style={{ background: r.scoreColor }}>{r.i}</span>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                          <div style={{ fontSize: 10, color: C.textMuted }}>{r.industry}</div>
                        </div>
                      </div>
                      <div className="v2-port-col-num">
                        <span style={{ fontSize: 13, fontWeight: 900, color: r.scoreColor }}>{r.score}</span>
                        <span style={{ fontSize: 9, color: C.textMuted, marginLeft: 4 }}>{r.delta}</span>
                      </div>
                      <div className="v2-port-col-num"><span style={{ fontSize: 11, fontWeight: 600 }}>{r.revenue}</span><span style={{ fontSize: 9, color: C.textMuted, display: "block" }}>/mo</span></div>
                      <div className="v2-port-col-num">
                        <svg width="34" height="12" viewBox="0 0 34 12" style={{ display: "block", margin: "0 auto" }}>
                          <polyline points={r.trend === "up" ? "0,10 8,7 16,6 24,4 34,2" : "0,2 8,4 16,6 24,8 34,10"} fill="none" stroke={r.trendColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 9, color: r.trendColor, fontWeight: 700 }}>{r.trendPct}</span>
                      </div>
                      <div className="v2-port-col-num"><span style={{ fontSize: 10, color: r.cadenceColor === "o" ? "#B88B15" : C.primaryLight, marginRight: 3 }}>{r.cadenceColor}</span><span style={{ fontSize: 10 }}>{r.cadence}</span></div>
                      <div className="v2-port-col-num" style={{ fontSize: 10 }}>{r.renews}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* curve: platform (warm) → combos (cream) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: "#EAE4D6" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,30 Q 720,-30 0,25 Z" fill={C.bg} /></svg>
      </div>

      {/* ══════ COMBOS — flowing wordmark tapestry ══════ */}
      <section className="v2-section-combos r-full-bleed">
        <div className="v2-combos-head">
          <div className="v2-eyebrow">The math behind the magic</div>
          <h2 className="v2-combos-h2">A scoring engine built on years of client research.</h2>
          <p className="v2-combos-p">Twelve dimensions. Twenty combinations. Every pattern.</p>
        </div>
        <V2ScrollBand items={dimensions} direction="left" speed={64} />
        <div className="v2-become">
          <span className="v2-become-rule" />
          <span className="v2-become-word">Become</span>
          <span className="v2-become-rule" />
        </div>
        <V2ScrollBand items={combinations} direction="right" speed={72} />
      </section>

      {/* ════ FEATURE TABS (preserved from old Home — to evaluate / decide) ════ */}
        {/* ══════════════ FEATURE TABS ══════════════ */}


      {/* curve: combos (cream) → audience (warm) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: C.bg }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,30 C 1100,140 340,-30 0,35 Z" fill="#EAE4D6" /></svg>
      </div>

      {/* ══════ AUDIENCE TABS ══════ */}
      <section className="v2-section-audience r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-section-head" style={{ textAlign: "center", margin: "0 auto 56px", maxWidth: 820 }}>
            <div className="v2-eyebrow">Built for the way you work</div>
            <h2 className="v2-section-h2">Retayned is shaped to your book.</h2>
          </div>
          <div className="v2-audience-tabs-wrap">
            <div className="v2-audience-tabs">
              {[
                { k: "freelancers", l: "Freelancers" },
                { k: "agencies", l: "Agencies" },
                { k: "enterprise", l: "Enterprise" },
              ].map((t) => (
                <button
                  key={t.k}
                  className={"v2-audience-tab" + (audienceTab === t.k ? " v2-audience-tab-active" : "")}
                  onClick={() => setAudienceTab(t.k)}
                >
                  {t.l}
                </button>
              ))}
            </div>
          </div>
          <div className="v2-audience-content">
            <div>
              <h3 className="v2-audience-h">{panel.h}</h3>
              <p className="v2-audience-p">{panel.p}</p>
              <div className="v2-hero-cta-row">
                <button className="v2-btn-primary-lg cta-btn" onClick={() => setPage("signup")}>Start Free Trial</button>
              </div>
            </div>
            <div className="v2-audience-demo">
              <AudienceIllustration tab={audienceTab} />
            </div>
          </div>
        </div>
      </section>

      {/* curve: audience (warm) → enterprise (deep green) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: "#EAE4D6" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,25 Q 720,140 0,20 Z" fill={C.primaryDeep} /></svg>
      </div>

      {/* ══════ ENTERPRISE ══════ */}
      <section className="v2-section-enterprise r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-section-head" style={{ textAlign: "center", margin: "0 auto 32px", maxWidth: 880 }}>
            <div className="v2-eyebrow v2-eyebrow-enterprise">Retayned Enterprise · Early access</div>
            <h2 className="v2-section-h2 v2-h2-enterprise">Two surfaces,<br /><span className="v2-accent-ent">one brain.</span></h2>
            <p className="v2-section-sub v2-sub-enterprise" style={{ margin: "0 auto" }}>Your top 50 accounts get a human account manager. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface — with the same retention intelligence powering both.</p>
          </div>

          {/* CTA moved above the dashboard */}
          <div className="v2-enterprise-cta-row" style={{ marginTop: 0, marginBottom: 48 }}>
            <button className="v2-btn-enterprise cta-btn" onClick={() => setPage("contact")}>Let's Talk</button>
          </div>

          {/* 3 tiles first */}
          <div className="v2-enterprise-grid">
            <div className="v2-enterprise-card">
              <div className="v2-enterprise-label">Managed agent</div>
              <h4 className="v2-enterprise-h">Rai as autonomous service</h4>
              <p className="v2-enterprise-p">Daily sweeps across your entire book. Twelve-dimension scoring. Archetype detection. Prioritized task lists delivered to whoever owns the relationship.</p>
            </div>
            <div className="v2-enterprise-card">
              <div className="v2-enterprise-label">Multi-seat app</div>
              <h4 className="v2-enterprise-h">Your team, one view</h4>
              <p className="v2-enterprise-p">Unlimited seats. Role-based permissions. Full handoff history per client. When an account manager leaves, their knowledge stays.</p>
            </div>
            <div className="v2-enterprise-card">
              <div className="v2-enterprise-label">MCP + REST API</div>
              <h4 className="v2-enterprise-h">Plug into your stack</h4>
              <p className="v2-enterprise-p">Give your internal agents the same retention intelligence. Connect to Salesforce, HubSpot, or your homegrown CRM.</p>
            </div>
          </div>

          {/* RaiS Live view dashboard below */}
          <div className="r-ent-dashboard" style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 28,
            position: "relative",
            overflow: "hidden",
            marginTop: 48,
            maxWidth: 1400,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }} />

            {/* Dashboard header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 24, paddingBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "rgba(85,139,104,0.2)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primaryLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>RaiS · Live view</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Portfolio: 1,247 clients · Last sweep: 08:04</div>
                </div>
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 11px", borderRadius: 100,
                background: "rgba(45,134,89,0.15)",
                fontSize: 11, fontWeight: 600, color: "#7EC29A",
              }}>
                <span className="r-ent-blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#7EC29A" }} />
                Running
              </div>
            </div>

            {/* Log output */}
            <div style={{
              background: "rgba(0,0,0,0.25)",
              borderRadius: 10,
              padding: "14px 16px",
              fontFamily: "'SF Mono', Menlo, Monaco, monospace",
              fontSize: 11.5,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              overflow: "hidden",
            }}>
              {[
                { time: "08:04", lvl: "SWEEP", lvlColor: C.primaryLight, msg: "Scored 1,247 clients. Δ avg score: −0.4. Flagged 38 at-risk." },
                { time: "08:04", lvl: "ALERT", lvlColor: "#E89580", msg: "Foxglove Partners entered \"Velocity decay\" archetype. Confidence: 0.87." },
                { time: "08:05", lvl: "TASK ", lvlColor: "#7EC29A", msg: "Generated 92 tasks. 28 outreach emails drafted and queued for review." },
                { time: "08:05", lvl: "SYNC ", lvlColor: C.primaryLight, msg: "Dispatched to Slack (42), CRM (50). Next sweep: 08:04 tomorrow." },
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 44 }}>{line.time}</span>
                  <span style={{ color: line.lvlColor, fontWeight: 700, minWidth: 50 }}>{line.lvl}</span>
                  <span style={{ flex: 1 }}>{line.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* curve: enterprise (deep green) → final (beige) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: C.primaryDeep }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,25 C 1080,-30 360,140 0,20 Z" fill="#F2EEE8" /></svg>
      </div>

      {/* ══════ TESTIMONIALS + STATS (7-cell mixed grid) ══════ */}
      <section className="r-full-bleed" style={{
        background: "#F2EEE8",
        padding: "112px 48px",
      }}>
        <div style={{ maxWidth: 880, margin: "0 auto 56px", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.02 }}>
            What folks are saying.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1320, margin: "0 auto" }} className="v2-testimonials-grid">

          {/* Cell 1 — stat: 90% */}
          <div className="v2-mix-cell v2-mix-stat">
            <div className="v2-mix-stat-num">90%</div>
            <div className="v2-mix-stat-label">Of churn is predictable</div>
          </div>

          {/* Cell 2 — testimonial */}
          <div className="v2-mix-cell v2-mix-testimonial">
            <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
              {Array(5).fill(0).map((_, j) => <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>)}
            </div>
            <p className="v2-mix-quote">"I used to lose 2-3 clients a year and just accept it as cost of doing business. Retayned showed me an actual pattern. It was the same signs every time and we just ignored them. Not anymore!"</p>
            <div className="v2-mix-footer">
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>MK</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Agency Owner</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>50+ Clients</div>
              </div>
            </div>
          </div>

          {/* Cell 3 — stat: 25x */}
          <div className="v2-mix-cell v2-mix-stat">
            <div className="v2-mix-stat-num">25x</div>
            <div className="v2-mix-stat-label">Cheaper to retain than acquire</div>
          </div>



          {/* Row 2 (spans 3) — 5% increase headline */}
          <div className="v2-mix-cell v2-mix-stat v2-mix-stat-wide" style={{ gridColumn: "span 3" }}>
            <div className="v2-mix-stat-headline">
              A 5% increase in retention can boost profits by 95%.<sup style={{ fontSize: "0.4em", color: C.textMuted, verticalAlign: "super" }}>¹</sup>
            </div>
          </div>

          {/* Cell 4 — stat: 1+ */}
          <div className="v2-mix-cell v2-mix-stat">
            <div className="v2-mix-stat-num">1+</div>
            <div className="v2-mix-stat-label">Saved client pays for itself</div>
          </div>

          {/* Cell 5 — testimonial (Freelancer JR) */}
          <div className="v2-mix-cell v2-mix-testimonial">
            <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
              {Array(5).fill(0).map((_, j) => <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>)}
            </div>
            <p className="v2-mix-quote">"It gave me the exact words to say to a client I was about to lose. I had the conversation that afternoon. They're still with me 8 months later. I'm still with Retayned."</p>
            <div className="v2-mix-footer">
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.btn, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>JR</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Freelancer</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>1-5 Clients</div>
              </div>
            </div>
          </div>

          {/* Cell 6 — testimonial */}
          <div className="v2-mix-cell v2-mix-testimonial">
            <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
              {Array(5).fill(0).map((_, j) => <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>)}
            </div>
            <p className="v2-mix-quote">"The health check questions are uncomfortable in the best way. They force you to admit what you already know but haven't said out loud. It's something we thought we'd use for crises and it's turned into our daily operations hub."</p>
            <div className="v2-mix-footer">
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#92A596", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Consultant</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: C.primarySoft, color: C.primary, textTransform: "uppercase", letterSpacing: ".04em" }}>From our beta</span>
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>10-50 Clients</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="v2-section-final v2-final-animated r-full-bleed" ref={finalCtaRef}>
        {/* Spaceship animation layer */}
        <div className="v2-ship-wrapper" aria-hidden="true">
          <svg className="v2-ship-svg" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid meet">
            {/* Dashed trail: bottom-left corner → upper right edge */}
            <path className="v2-ship-trail"
              d="M80 340 Q320 320 560 280 Q800 240 1040 180 Q1200 140 1340 100"
              fill="none" stroke="#558B68" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="4 10" />
            {/* Start dot */}
            <circle cx="80" cy="340" r="4" fill="#558B68" stroke="#2F2F31" strokeWidth="1.4" />
            {/* Spaceship — positioned at the right edge */}
            <g className="v2-ship-body" transform="translate(1360 90) rotate(-14) scale(1.6)">
              <path d="M-38 6 Q-54 0 -38 -6 Q-30 0 -38 6 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M-32 3 Q-44 0 -32 -3 Q-26 0 -32 3 Z" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1"/>
              <ellipse cx="0" cy="6" rx="34" ry="10" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M-28 10 Q0 18 28 10" fill="none" stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="-18" cy="11" r="2" fill="#558B68" stroke="#2F2F31" strokeWidth="1"/>
              <circle cx="0" cy="12" r="2" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1"/>
              <circle cx="18" cy="11" r="2" fill="#558B68" stroke="#2F2F31" strokeWidth="1"/>
              <path d="M-16 -2 Q-16 -18 0 -20 Q16 -18 16 -2 Z" fill="#558B68" stroke="#2F2F31" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M-10 -6 Q-12 -14 -2 -16" fill="none" stroke="#FCFCFE" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
              <ellipse cx="0" cy="-2" rx="16" ry="3" fill="none" stroke="#2F2F31" strokeWidth="1.4"/>
              <ellipse cx="0" cy="-9" rx="9" ry="8" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.6"/>
              <ellipse cx="0" cy="-9" rx="5" ry="5.6" fill="#2F2F31"/>
              <circle cx="-1.6" cy="-11" r="1.4" fill="#FCFCFE"/>
              <circle cx="1.8" cy="-7.6" r="0.7" fill="#FCFCFE"/>
              <path d="M0 -17 Q-2 -21 1 -24" fill="none" stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="1.4" cy="-25" r="1.8" fill="#558B68" stroke="#2F2F31" strokeWidth="1.2"/>
              <circle cx="6" cy="-7" r="0.8" fill="#2F2F31" opacity="0.5"/>
              <path d="M4 -4 Q6 -2 8 -4" fill="none" stroke="#2F2F31" strokeWidth="1.2" strokeLinecap="round"/>
              <g transform="translate(11 -6) rotate(20)">
                <path d="M0 0 L0 -7" stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="0" cy="-8.5" r="2.2" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.4"/>
              </g>
              <g stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.8">
                <line x1="-40" y1="-10" x2="-48" y2="-14"/>
                <line x1="-36" y1="-16" x2="-44" y2="-22"/>
              </g>
            </g>
          </svg>
        </div>

        <h3 className="v2-final-h v2-final-h-small">
          You work too hard to get new clients.<br />Keep them Retayned.
        </h3>
        <p className="v2-final-sub">See the signal. Get the script. Keep the client.</p>
        <div className="v2-hero-cta-row" style={{ justifyContent: "center" }}>
          <button className="v2-btn-primary-lg cta-btn" onClick={() => setPage("signup")}>Start Free Trial</button>
        </div>
        <p className="v2-final-fine">14-day free trial. Cancel anytime.</p>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}


// ═══ HOME ═══
// ═══ PRICING — ported from final/pricing.html ═══
function ROICalculator() {
  const [clients, setClients] = useState(20);
  const [avgValue, setAvgValue] = useState(2500);
  const [savedRate, setSavedRate] = useState(15);
  const baseFee = 19.99;
  const perClient = 1.0;
  const monthlyCost = baseFee + clients * perClient;
  const clientsSaved = clients * (savedRate / 100);
  const revenueSaved = clientsSaved * avgValue;
  const roi = monthlyCost > 0 ? Math.round(revenueSaved / monthlyCost) : 0;

  const labelStyle = { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, color: C.textSec };
  const valueStyle = { fontWeight: 900, fontSize: 22, marginTop: 4, color: C.text, letterSpacing: "-0.02em" };

  const Slider = ({ label, value, set, min, max, step, prefix = "", suffix = "" }) => (
    <div>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{prefix}{value.toLocaleString()}{suffix}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        style={{ width: "100%", marginTop: 10, accentColor: C.btn }}
      />
    </div>
  );

  return (
    <div style={{ background: C.card, border: "1px solid " + C.borderLight, borderRadius: 18, padding: "32px 36px", boxShadow: "0 12px 40px rgba(28,50,36,0.06), 0 2px 6px rgba(28,50,36,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span style={{ display: "inline-block", padding: "4px 12px", background: C.primarySoft, color: C.primary, borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>ROI Calculator</span>
        <span style={{ fontSize: 12, color: C.textMuted }}>Move the sliders →</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 20 }} className="pricing-roi-grid">
        <Slider label="Active clients" value={clients} set={setClients} min={5} max={100} step={1} />
        <Slider label="Avg client value / mo" value={avgValue} set={setAvgValue} min={250} max={10000} step={50} prefix="$" />
        <Slider label="Churn prevented" value={savedRate} set={setSavedRate} min={1} max={50} step={1} suffix="%" />
      </div>

      <div style={{ marginTop: 28, padding: "22px 24px", background: C.primaryGhost, borderRadius: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="pricing-roi-result">
        <div>
          <div style={labelStyle}>Retayned cost / mo</div>
          <div style={valueStyle}>${monthlyCost.toFixed(2)}</div>
        </div>
        <div>
          <div style={labelStyle}>Revenue saved / mo</div>
          <div style={{ ...valueStyle, color: C.success }}>${Math.round(revenueSaved).toLocaleString()}</div>
        </div>
        <div>
          <div style={labelStyle}>Return on Retayned</div>
          <div style={{ ...valueStyle, color: C.btn, fontSize: 26 }}>{roi.toLocaleString()}×</div>
        </div>
      </div>
    </div>
  );
}

function Pricing({ setPage }) {
  const features = [
    "Today (prioritized tasks, ranked by impact)",
    "Retention Score (1–99 · 12 dimensions)",
    "Health Checks (monthly cadence, scored drift)",
    "Talk to Rai · unlimited, calibrated scripts",
    "Rolodex of former clients, ready to re-engage",
    "Referrals · readiness scoring, right-time asks",
    "Unlimited team seats · no per-seat fees",
    "Daily exports + CSV",
  ];

  const addons = [
    { name: "Managed Rai sweeps", sub: "Daily autonomous triage across your book.", price: "+$2", unit: "/client/mo" },
    { name: "Salesforce / HubSpot sync", sub: "Two-way connector with field mapping.", price: "+$49", unit: "/mo" },
    { name: "Custom playbooks", sub: "White-glove archetype training for your book.", price: "$499", unit: "one-time" },
  ];

  const enterpriseCards = [
    { eyebrow: "Managed Agent", title: "Rai as autonomous service.", body: "Daily sweeps across your entire book. Twelve-dimension scoring. Archetype detection. Prioritized task lists delivered to whoever owns the relationship." },
    { eyebrow: "Multi-seat App", title: "Your team, one view.", body: "Unlimited seats. Role-based permissions. Full handoff history per client. When an account manager leaves, their knowledge stays." },
    { eyebrow: "MCP + REST API", title: "Plug into your stack.", body: "Give your internal agents the same retention intelligence. Connect to Salesforce, HubSpot, or your homegrown CRM." },
    { eyebrow: "White-glove", title: "Onboarding + dedicated CS.", body: "A real person who knows your book. SOC 2, SAML, audit log. Quarterly business reviews. Custom playbook training." },
  ];

  return (
    <div className="pricing-page">
      <RetPageStyles />
      <style>{`
        @media (max-width: 760px) {
          .pricing-roi-grid { grid-template-columns: 1fr !important; }
          .pricing-roi-result { grid-template-columns: 1fr !important; }
          .pricing-ent-grid { grid-template-columns: 1fr !important; }
          .pricing-addons-grid { grid-template-columns: 1fr !important; }
          .pricing-ent-cta { flex-direction: column; align-items: stretch !important; }
          .pricing-price-num { font-size: 88px !important; }
        }
      `}</style>

      {/* ─── HERO (forest dark) ─── */}
      <section className="r-full-bleed" style={{ background: C.primaryDeep, color: "#fff", padding: "72px 48px 96px", textAlign: "center" }}>
        <div className="ret-eyebrow ret-eyebrow-light">Pricing</div>
        <h1 className="ret-h1" style={{ color: "#fff", maxWidth: 980, margin: "16px auto 0" }}>
          Solve your business's most consequential problem for <span className="ret-strike-wrap"><span className="ret-strike">the cost of</span><span className="ret-caveat" style={{ color: C.primaryLight }}>less than</span></span> a Netflix subscription.
        </h1>

        <div style={{ marginTop: 44, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
          <span className="pricing-price-num" style={{ fontSize: 124, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "#fff" }}>
            $19<span style={{ fontSize: 64 }}>.99</span>
          </span>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}>/mo · + $1 per client</span>
        </div>

        <button className="cta-btn" onClick={() => setPage("signup")} style={{ marginTop: 32, padding: "16px 36px", fontSize: 16, fontWeight: 700, background: C.btn, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>14-day free trial. Cancel anytime. No card.</div>

        {/* Mixed-typography vocab row */}
        <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", alignItems: "baseline", fontSize: 22 }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, color: "#fff" }}>One Plan</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: "1.15em", color: C.primaryLight }}>No tiers</span>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: C.warning, fontSize: 18 }}>NO SEAT FEES</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: "1.15em", color: "#fff" }}>Cancel any time</span>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, color: C.primaryLight }}>Every feature</span>
        </div>

        {/* Feature pills (subtle, under vocab row) */}
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", maxWidth: 880, marginLeft: "auto", marginRight: "auto" }}>
          {[
            "Today",
            "Retention Score",
            "Health Checks",
            "Talk to Rai",
            "Rolodex",
            "Referrals",
          ].map(f => (
            <span key={f} style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "7px 14px", borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 12.5, fontWeight: 600,
              color: "rgba(255,255,255,0.78)",
              letterSpacing: "0.01em",
            }}>
              <span style={{ color: C.primaryLight, fontWeight: 800, fontSize: 11 }}>✓</span>
              {f}
            </span>
          ))}
        </div>
      </section>

      <RetCurve from={C.primaryDeep} to="#F2EEE8" variant="leftCrest" />

      {/* ─── ROI CALCULATOR ─── */}
      <section className="ret-section r-full-bleed" style={{ background: "#F2EEE8", paddingTop: 80 }}>
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Run the math</div>
            <h2 className="ret-h2" style={{ maxWidth: 720, margin: "12px auto 0" }}>
              Saving just ONE client makes Retayned free for a decade.
            </h2>
            <p style={{ marginTop: 14, fontSize: 17, color: C.textSec, lineHeight: 1.5 }}>Move the sliders to your reality.</p>
          </div>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <ROICalculator />
          </div>

          {/* Reference receipt */}
          <div style={{ maxWidth: 580, margin: "56px auto 0" }}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: C.textSec }}>Reference receipt</span>
            </div>
            <div className="ret-card" style={{ padding: "28px 32px" }}>
              {[
                ["You charge", "$2,500 / mo"],
                ["Retayned base", "$19.99"],
                ["Per-client fee (×1)", "$1.00"],
                ["—", "—"],
                ["Net per saved client", "$2,479.01"],
                ["One save covers", "125 months"],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 5 ? "1px dashed " + C.borderLight : "none", fontSize: 14.5, fontWeight: i >= 4 ? 800 : 500, color: i >= 4 ? C.text : C.textSec }}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RetCurve from="#F2EEE8" to={C.bg} variant="rightRise" />

      {/* ─── À LA CARTE ─── */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="ret-section-head">
              <div className="ret-eyebrow">À la carte</div>
              <h2 className="ret-h2" style={{ marginTop: 12, fontSize: "clamp(24px, 3.5vw, 36px)" }}>Optional add-ons. Most never need them.</h2>
            </div>
            <div className="pricing-addons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {addons.map(a => (
                <div key={a.name} className="ret-card" style={{ padding: "24px 26px" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: C.text }}>{a.name}</div>
                  <div style={{ fontSize: 13.5, color: C.textSec, marginTop: 6, lineHeight: 1.55 }}>{a.sub}</div>
                  <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontWeight: 900, fontSize: 24, color: C.btn, letterSpacing: "-0.02em" }}>{a.price}</span>
                    <span style={{ fontSize: 12.5, color: C.textSec }}>{a.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to={C.primaryDeep} variant="leftRise" />

      {/* ─── ENTERPRISE ─── */}
      <section className="r-full-bleed" style={{ background: C.primaryDeep, color: "#fff", padding: "88px 48px" }}>
        <div className="ret-section-inner" style={{ maxWidth: 1100 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="ret-eyebrow ret-eyebrow-light">Retayned Enterprise · Early Access</div>
            <h2 className="ret-h2" style={{ marginTop: 14, color: "#fff", maxWidth: 720, margin: "14px auto 0" }}>
              Relationship intelligence, <span style={{ fontFamily: "'Caveat', cursive", color: C.primaryLight, fontWeight: 700, fontSize: "1.1em" }}>scaled.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: 620, margin: "16px auto 0", fontSize: 15.5, lineHeight: 1.6 }}>
              For teams and agents managing your book. Multi-seat plumbing, manager dashboards, agent API.
            </p>
          </div>

          {/* What enterprise includes */}
          <div className="pricing-ent-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, marginTop: 8 }}>
            {enterpriseCards.map(c => (
              <div key={c.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "26px 28px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 800, color: C.primaryLight }}>{c.eyebrow}</div>
                <div style={{ fontWeight: 800, fontSize: 19, marginTop: 10, color: "#fff", letterSpacing: "-0.01em" }}>{c.title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 10, lineHeight: 1.6 }}>{c.body}</div>
              </div>
            ))}
          </div>

          {/* Live console mock */}
          <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 24px", marginTop: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 13, color: C.primaryLight, fontWeight: 600 }}>● RaiS · Live view <span style={{ color: "rgba(255,255,255,0.4)", marginLeft: 10, fontWeight: 400 }}>Points to 1,247 clients · Last sweep 09:04</span></span>
              <span style={{ fontSize: 11, color: C.primaryLight, background: "rgba(85,139,104,0.12)", padding: "3px 10px", borderRadius: 999, fontWeight: 700 }}>● Running</span>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 12.5, color: "#D4DBD2", lineHeight: 1.7 }}>
              <div><span style={{ color: "#9FB29D" }}>09:04</span> <span style={{ color: C.warning }}>SWEEP</span>  Scored 1,247 clients. Δ avg score: −0.4. Flagged 38 at-risk.</div>
              <div><span style={{ color: "#9FB29D" }}>09:04</span> <span style={{ color: C.danger }}>ALERT</span>  Foxglove Partners entered "velocity decay" archetype. Confidence: 0.87.</div>
              <div><span style={{ color: "#9FB29D" }}>09:15</span> <span style={{ color: C.primaryLight }}>TASK</span>   Generated 62 tasks. 28 outreach emails drafted and queued for review.</div>
              <div><span style={{ color: "#9FB29D" }}>09:15</span> <span style={{ color: C.primaryLight }}>SYNC</span>   Dispatched to Slack (#42), CRM (58). Next sweep: 09:04 tomorrow.</div>
            </div>
          </div>

          {/* CTA */}
          <div className="pricing-ent-cta" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36, padding: "26px 30px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, gap: 18 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 19, color: "#fff" }}>Ready to talk?</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 6, lineHeight: 1.55 }}>30-minute call with Adam. Bring your book size, your stack, and one tough account.</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="mailto:adam@retayned.com" className="cta-btn" style={{ padding: "14px 22px", fontSize: 15, fontWeight: 700, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>adam@retayned.com</a>
              <button className="cta-btn" onClick={() => setPage("contact")} style={{ padding: "14px 22px", fontSize: 15, fontWeight: 700, background: C.btn, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "inherit" }}>Request Early Access</button>
            </div>
          </div>
        </div>
      </section>

      <RetCurve from={C.primaryDeep} to="#F2EEE8" variant="rightCrest" />

      {/* ─── FINAL CALLBACK ─── */}
      <section className="ret-section r-full-bleed" style={{ background: "#F2EEE8", textAlign: "center", padding: "72px 48px" }}>
        <div className="ret-section-inner" style={{ maxWidth: 880 }}>
          <h3 style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 800, color: C.text, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
            Saving just <span style={{ color: C.btn }}>ONE</span> relationship for even just <span style={{ color: C.btn }}>ONE</span> month could pay for Retayned for a <span style={{ color: C.btn }}>DECADE</span>.
          </h3>
          <button className="cta-btn" onClick={() => setPage("signup")} style={{ marginTop: 24, padding: "16px 36px", fontSize: 16, fontWeight: 700, background: C.btn, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
          <div style={{ fontSize: 13, color: C.textSec, marginTop: 12 }}>14-day free trial. Cancel anytime.</div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ═══ ABOUT — ported from final/about.html ═══
function About({ setPage }) {
  const values = [
    { n: "01", t: "Vague positivity is a churn signal.", b: "When clients go quiet, the silence is the warning. We name it out loud." },
    { n: "02", t: "The script has to be yours.", b: "No template carries a relationship. Rai writes scripts in your voice, not ours." },
    { n: "03", t: "A 5% lift in retention beats every growth hack.", b: "Run the math. We do, every time we ship a feature." },
    { n: "04", t: "Tools should be cheap. Relationships are not.", b: "$19.99/mo is a deliberate price." },
  ];

  const timeline = [
    { y: "2014", label: "First retained client.", sub: "A DTC brand. Still with us today." },
    { y: "2018", label: "The pattern emerges.", sub: "We rarely lose accounts. We start to wonder why." },
    { y: "2022", label: "A founder moment.", sub: "\"You're in the client retention business.\"" },
    { y: "2025", label: "Retayned ships.", sub: "The system, externalized for everyone else." },
  ];

  return (
    <div className="about-page">
      <RetPageStyles />
      <style>{`
        @media (max-width: 760px) {
          .about-vocab { font-size: 22px !important; gap: 18px !important; }
          .about-founder-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .about-timeline { grid-template-columns: 1fr 1fr !important; gap: 32px 16px !important; }
          .about-timeline-line { display: none !important; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="ret-section r-full-bleed" style={{ background: "#F2EEE8", paddingBottom: 24, textAlign: "center" }}>
        <div className="ret-section-inner" style={{ maxWidth: 880 }}>
          <div className="ret-eyebrow">About Retayned</div>
          <h1 className="ret-h1" style={{ marginTop: 16, maxWidth: 880, marginInline: "auto" }}>
            We didn't set out to build a CRM. We set out to keep the clients <span style={{ fontFamily: "'Caveat', cursive", color: C.btn, fontWeight: 700, fontSize: "1.05em" }}>nobody else does.</span>
          </h1>
        </div>
      </section>

      {/* Mixed-typography vocab row */}
      <section className="r-full-bleed" style={{ background: "#F2EEE8", padding: "16px 48px 56px" }}>
        <div className="about-vocab" style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", alignItems: "baseline", fontSize: 30 }}>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, color: C.primary }}>Loyalty</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontStyle: "italic", color: C.btn, fontWeight: 700, fontSize: "1.15em" }}>Tenure</span>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, textTransform: "uppercase", color: C.danger, letterSpacing: "0.05em", fontSize: "0.85em" }}>SIGNAL</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, color: C.warning, fontSize: "1.15em" }}>Words</span>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, color: C.success }}>Trust</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontStyle: "italic", color: C.primaryLight, fontWeight: 700, fontSize: "1.15em" }}>Receipts</span>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, color: C.primary }}>Repeat</span>
        </div>
      </section>

      <RetCurve from="#F2EEE8" to={C.primaryDeep} variant="leftRise" />

      {/* ─── MANIFESTO ON DARK ─── */}
      <section className="r-full-bleed" style={{ background: C.primaryDeep, color: "#fff", padding: "88px 48px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="ret-eyebrow ret-eyebrow-light">Our manifesto</div>
          <div style={{ marginTop: 32, fontSize: "clamp(19px, 2.4vw, 24px)", lineHeight: 1.55, color: "#E8EFE8", fontWeight: 400 }}>
            <p>Most CRMs are built around the deal. The signed contract. The closed-won.</p>
            <p style={{ marginTop: 22 }}>
              We think the deal is the <em style={{ color: C.primaryLight, fontStyle: "italic" }}>least</em> interesting moment in a client relationship. The interesting moments are the <strong style={{ fontWeight: 800, color: "#fff" }}>quiet</strong> ones — the email that was a little colder than usual, the follow-up that went two days longer than normal, the tone that shifted between week six and week seven.
            </p>
            <p style={{ marginTop: 22 }}>
              Those are the moments that decide whether a client renews. And those are the moments every other CRM <em style={{ color: C.danger, fontStyle: "italic" }}>misses</em>.
            </p>
            <p style={{ marginTop: 28, fontWeight: 900, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.25, color: "#fff", letterSpacing: "-0.02em" }}>
              Retayned doesn't track deals. It tracks the small things that decide them.
            </p>
          </div>
        </div>
      </section>

      <RetCurve from={C.primaryDeep} to={C.bg} variant="rightCrest" />

      {/* ─── FOUNDER + VALUES ─── */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner" style={{ maxWidth: 1100 }}>
          <div className="about-founder-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "start" }}>
            {/* Founder card */}
            <div className="ret-card" style={{ padding: "36px 32px" }}>
              <div className="ret-eyebrow">Founder</div>
              <div style={{ display: "flex", gap: 18, marginTop: 18, alignItems: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: 16, overflow: "hidden", background: C.primarySoft, flexShrink: 0 }}>
                  <img src="/AdamLawrence.jpg" alt="Adam Lawrence" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 19, color: C.text }}>Adam Lawrence</div>
                  <div style={{ fontSize: 13, color: C.textSec, marginTop: 2 }}>Founder. Wrote the manual. Picks up the phone.</div>
                </div>
              </div>
              <p style={{ fontSize: 14.5, color: C.textSec, marginTop: 22, lineHeight: 1.6 }}>
                Ten years of paid social. Ran campaigns for agencies, DTC brands, and enterprises. Kept the clients other people lost. Eventually figured out why — and then turned it into the system you're looking at.
              </p>
              <div style={{ marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={{ display: "inline-block", padding: "5px 12px", background: C.primarySoft, color: C.primary, borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em" }}>Washington, DC</span>
                <span style={{ display: "inline-block", padding: "5px 12px", background: "#EFE9FB", color: C.btn, borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em" }}>Talk to me directly</span>
                <a href="mailto:adam@retayned.com" style={{ display: "inline-block", padding: "5px 12px", background: C.primarySoft, color: C.primary, borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", textDecoration: "none" }}>adam@retayned.com</a>
              </div>
            </div>

            {/* Values list */}
            <div>
              <div className="ret-eyebrow">What we believe</div>
              <div style={{ marginTop: 22 }}>
                {values.map(v => (
                  <div key={v.n} style={{ padding: "16px 0", borderBottom: "1px solid " + C.borderLight }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                      <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: C.btn, fontWeight: 800, letterSpacing: "0.05em" }}>{v.n}</span>
                      <strong style={{ fontSize: 15.5, color: C.text, letterSpacing: "-0.01em" }}>{v.t}</strong>
                    </div>
                    <div style={{ fontSize: 13.5, color: C.textSec, marginLeft: 28, marginTop: 6, lineHeight: 1.55 }}>{v.b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="leftCrest" />

      {/* ─── TIMELINE ─── */}
      <section className="ret-section r-full-bleed" style={{ background: "#F2EEE8", paddingBottom: 96 }}>
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">The Timeline</div>
            <h2 className="ret-h2" style={{ marginTop: 12 }}>
              How we got here, in <span style={{ fontFamily: "'Caveat', cursive", color: C.btn, fontWeight: 700, fontSize: "1.05em" }}>four moments.</span>
            </h2>
          </div>

          <div className="about-timeline" style={{ maxWidth: 1000, margin: "44px auto 0", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", position: "relative" }}>
            <div className="about-timeline-line" style={{ position: "absolute", top: 14, left: "6%", right: "6%", height: 1, background: C.borderLight }} />
            {timeline.map(m => (
              <div key={m.y} style={{ textAlign: "center", position: "relative", padding: "0 14px" }}>
                <div style={{ width: 14, height: 14, borderRadius: 999, background: C.btn, margin: "8px auto 0", border: "3px solid #F2EEE8" }} />
                <div style={{ fontWeight: 900, fontSize: 15, marginTop: 16, color: C.btn, letterSpacing: "0.04em" }}>{m.y}</div>
                <div style={{ fontSize: 14.5, fontWeight: 800, marginTop: 8, color: C.text, letterSpacing: "-0.01em" }}>{m.label}</div>
                <div style={{ fontSize: 13, color: C.textSec, marginTop: 8, lineHeight: 1.55 }}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 64 }}>
            <p style={{ fontWeight: 800, fontSize: "clamp(18px, 2.3vw, 22px)", color: C.text, letterSpacing: "-0.01em" }}>
              Built for the way you already work — when nobody was looking.
            </p>
            <button className="cta-btn" onClick={() => setPage("signup")} style={{ marginTop: 18, padding: "16px 36px", fontSize: 16, fontWeight: 700, background: C.btn, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
            <div style={{ fontSize: 13, color: C.textSec, marginTop: 10 }}>14-day free trial. Cancel anytime.</div>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

// ═══ RESOURCES (was Blog) — ported from final/resources.html ═══
const RESOURCES_POSTS = [
  { tag: "DIAGNOSTICS", read: "4 min read", title: "The signal you keep missing: vague positivity.", sub: "\"Looks good.\" \"All good on our end.\" \"No notes.\" When engaged clients go quiet, the silence is the warning." },
  { tag: "PLAYBOOK", read: "5 min read", title: "How to handle the new stakeholder without burning your champion.", sub: "Your main contact's new boss wants to review all vendor relationships. Mike says don't worry. Here's the move that keeps both relationships intact." },
  { tag: "FRAMEWORK", read: "8 min read", title: "Twelve dimensions, twenty combinations: how to actually score a client relationship.", sub: "Most retention scoring is a wrapped-up NPS. Here's a richer framework that captures how clients actually behave before they leave." },
  { tag: "DIAGNOSTICS", read: "3 min read", title: "The cancelled-meeting math.", sub: "A meeting moved once is a calendar problem. Twice is a relationship problem. Three times is a renewal problem." },
  { tag: "PLAYBOOK", read: "6 min read", title: "Saying \"I noticed something\" without sounding paranoid.", sub: "The exact opening line we've used for ten years to surface concerns before they harden." },
  { tag: "CASE STUDY", read: "5 min read", title: "Saved at month 11: how Pinebrook's renewal got back on track in 14 days.", sub: "A real save, with the dashboards, the script, and the timeline." },
];

const RESOURCES_TOOLS = [
  { kind: "ASSESSMENT", dur: "60 sec", title: "Retention Health Check", sub: "Think of one client. Answer five questions honestly. Get a retention score and know what to do next." },
  { kind: "CALCULATOR", dur: "30 sec", title: "The Retention Calculator", sub: "See what client churn is actually costing you. The number is always bigger than you think." },
  { kind: "ASSESSMENT", dur: "2 min", title: "Grade Your Client Relationship", sub: "Score one client across 12 relationship dimensions. See where the cracks are." },
  { kind: "SIMULATOR", dur: "4 min", title: "The Hard Conversation Simulator", sub: "Five scenarios. Three approaches each. See how your instincts play out." },
];

const RESOURCES_GUIDES = [
  { name: "The 12 Retention Dimensions", sub: "A complete cheat sheet for what to watch.", kind: "PDF · 14 pages" },
  { name: "The Quiet-Client Script Pack", sub: "Ten openers for the awkward check-in.", kind: "PDF · 6 pages" },
  { name: "Renewal Pre-Mortem Template", sub: "A 60-day playbook for at-risk accounts.", kind: "NOTION · template" },
  { name: "Health Check Question Bank", sub: "The exact 47 questions Rai chooses from.", kind: "PDF · 8 pages" },
];

const RESOURCES_WEBINARS = [
  { date: "JUN 12", dur: "45 min", title: "Reading client tone in writing.", sub: "A live teardown of three real client emails — what we'd notice, what we'd say next.", kind: "On demand" },
  { date: "MAY 28", dur: "30 min", title: "When to bring up renewal (and when not to).", sub: "Adam walks through the timing model.", kind: "On demand" },
  { date: "JUL 18", dur: "60 min", title: "Office hours: bring one client, leave with a plan.", sub: "Live, with five operators per session.", kind: "Upcoming" },
];

function MiniTag({ color = "primary", children }) {
  const map = {
    primary: { bg: C.primarySoft, fg: C.primary },
    btn: { bg: "#EFE9FB", fg: C.btn },
    warning: { bg: "#F4E5C2", fg: "#8B6A1B" },
    danger: { bg: "#F2D6CE", fg: "#8E2A18" },
  };
  const c = map[color] || map.primary;
  return (
    <span style={{ display: "inline-block", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 800, padding: "4px 10px", borderRadius: 999, background: c.bg, color: c.fg }}>{children}</span>
  );
}

function Blog({ setPage }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Articles", "Tools", "Guides", "Webinars"];
  const featured = RESOURCES_POSTS[0];
  const sideFeatured = RESOURCES_POSTS.slice(1, 3);

  return (
    <div className="resources-page">
      <RetPageStyles />
      <style>{`
        @media (max-width: 900px) {
          .res-featured-grid { grid-template-columns: 1fr !important; }
          .res-library-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .res-library-grid { grid-template-columns: 1fr !important; }
          .res-filter-row { flex-direction: column; align-items: flex-start !important; gap: 16px !important; }
          .res-newsletter-row { flex-direction: column; gap: 10px !important; }
          .res-newsletter-input { width: 100% !important; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section className="ret-section r-full-bleed" style={{ background: "#F2EEE8", textAlign: "center", paddingBottom: 32 }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div className="ret-eyebrow">Resources</div>
            <h1 className="ret-h1" style={{ marginTop: 16 }}>
              Field notes from the <span style={{ fontFamily: "'Caveat', cursive", color: C.btn, fontWeight: 700, fontSize: "1.05em" }}>retention business.</span>
            </h1>
            <p style={{ marginTop: 18, fontSize: 17, color: C.textSec, lineHeight: 1.55 }}>Articles, tools, guides, and webinars. Free. No sign-up required.</p>
          </div>

          {/* Featured row */}
          <div className="res-featured-grid" style={{ maxWidth: 1100, margin: "44px auto 0", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, textAlign: "left" }}>
            <div className="ret-card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 280, background: "linear-gradient(135deg, " + C.primarySoft + ", #EFE9FB)", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "'Caveat', cursive", fontSize: 72, color: C.btn, textAlign: "center", lineHeight: 0.9, fontWeight: 700 }}>
                    the<br/><span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 900, color: C.primary, letterSpacing: "-0.04em", fontSize: 64 }}>SIGNAL</span>
                  </div>
                </div>
                <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
                  <MiniTag color="btn">Featured</MiniTag>
                  <MiniTag color="primary">{featured.tag}</MiniTag>
                </div>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ fontSize: 11, color: C.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>{featured.read} · Adam Lawrence</div>
                <h3 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.2, marginTop: 8, color: C.text, letterSpacing: "-0.02em" }}>{featured.title}</h3>
                <p style={{ fontSize: 14, color: C.textSec, marginTop: 10, lineHeight: 1.6 }}>{featured.sub}</p>
                <span style={{ color: C.btn, fontSize: 13.5, fontWeight: 800, marginTop: 14, display: "inline-block", cursor: "pointer" }}>Read post →</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {sideFeatured.map(p => (
                <div key={p.title} className="ret-card" style={{ padding: "22px 24px", flex: 1 }}>
                  <MiniTag color="primary">{p.tag}</MiniTag>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 8, fontWeight: 600, letterSpacing: "0.05em" }}>{p.read}</div>
                  <h4 style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.25, marginTop: 8, color: C.text, letterSpacing: "-0.01em" }}>{p.title}</h4>
                  <p style={{ fontSize: 13, color: C.textSec, marginTop: 6, lineHeight: 1.55 }}>{p.sub}</p>
                  <span style={{ color: C.btn, fontSize: 13, fontWeight: 800, marginTop: 10, display: "inline-block", cursor: "pointer" }}>Read →</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RetCurve from="#F2EEE8" to={C.bg} variant="rightCrest" />

      {/* ─── LIBRARY + FILTER ─── */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner">
          <div className="res-filter-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 14 }}>
            <h2 className="ret-h2" style={{ fontSize: "clamp(28px, 4vw, 42px)", margin: 0 }}>The library.</h2>
            <div style={{ display: "inline-flex", background: C.card, padding: 5, borderRadius: 999, border: "1px solid " + C.borderLight, flexWrap: "wrap" }}>
              {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700,
                  background: filter === f ? C.text : "transparent",
                  color: filter === f ? "#fff" : C.textSec,
                  border: "none", cursor: "pointer", fontFamily: "inherit",
                  transition: "all 0.15s ease",
                }}>{f}</button>
              ))}
            </div>
          </div>

          <div className="res-library-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {(filter === "All" || filter === "Tools") && RESOURCES_TOOLS.map(t => (
              <div key={t.title} className="ret-card" style={{ padding: "24px 26px", background: "#EFE9FB" }}>
                <MiniTag color="btn">{t.kind}</MiniTag>
                <h4 style={{ fontSize: 17, fontWeight: 800, marginTop: 14, color: C.text, letterSpacing: "-0.01em" }}>{t.title}</h4>
                <p style={{ fontSize: 13.5, color: C.textSec, marginTop: 6, lineHeight: 1.55 }}>{t.sub}</p>
                <span style={{ color: C.btn, fontSize: 13.5, fontWeight: 800, marginTop: 12, display: "inline-block", cursor: "pointer" }}>Start interactive →</span>
              </div>
            ))}
            {(filter === "All" || filter === "Articles") && RESOURCES_POSTS.slice(3, 6).map(p => (
              <div key={p.title} className="ret-card" style={{ padding: "24px 26px" }}>
                <MiniTag color="primary">{p.tag}</MiniTag>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 8, fontWeight: 600, letterSpacing: "0.05em" }}>{p.read}</div>
                <h4 style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2, marginTop: 8, color: C.text, letterSpacing: "-0.01em" }}>{p.title}</h4>
                <p style={{ fontSize: 13.5, color: C.textSec, marginTop: 6, lineHeight: 1.55 }}>{p.sub}</p>
                <span style={{ color: C.btn, fontSize: 13.5, fontWeight: 800, marginTop: 10, display: "inline-block", cursor: "pointer" }}>Read →</span>
              </div>
            ))}
            {(filter === "All" || filter === "Guides") && RESOURCES_GUIDES.map(g => (
              <div key={g.name} className="ret-card" style={{ padding: "24px 26px" }}>
                <MiniTag color="warning">{g.kind.split(" ")[0]}</MiniTag>
                <h4 style={{ fontSize: 17, fontWeight: 800, marginTop: 14, color: C.text, letterSpacing: "-0.01em" }}>{g.name}</h4>
                <p style={{ fontSize: 13.5, color: C.textSec, marginTop: 6, lineHeight: 1.55 }}>{g.sub}</p>
                <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 8, fontWeight: 600 }}>{g.kind}</div>
                <span style={{ color: C.btn, fontSize: 13.5, fontWeight: 800, marginTop: 12, display: "inline-block", cursor: "pointer" }}>↓ Download</span>
              </div>
            ))}
            {(filter === "All" || filter === "Webinars") && RESOURCES_WEBINARS.map(w => (
              <div key={w.title} className="ret-card" style={{ padding: "24px 26px", background: C.primaryDeep, color: "#fff", border: "1px solid " + C.primaryDeep }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 800, color: C.primaryLight }}>WEBINAR</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>{w.dur}</span>
                </div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11.5, color: C.primaryLight, marginTop: 10, fontWeight: 600 }}>{w.date} · {w.kind}</div>
                <h4 style={{ fontSize: 17, fontWeight: 800, marginTop: 10, color: "#fff", letterSpacing: "-0.01em" }}>{w.title}</h4>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", marginTop: 6, lineHeight: 1.55 }}>{w.sub}</p>
                <span style={{ color: C.primaryLight, fontSize: 13.5, fontWeight: 800, marginTop: 12, display: "inline-block", cursor: "pointer" }}>{w.kind === "Upcoming" ? "Reserve a seat →" : "Watch →"}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="leftCrest" />

      {/* ─── NEWSLETTER ─── */}
      <section className="ret-section r-full-bleed" style={{ background: "#F2EEE8", textAlign: "center", paddingBottom: 88 }}>
        <div className="ret-section-inner" style={{ maxWidth: 760 }}>
          <div className="ret-eyebrow">Stay in the loop</div>
          <h3 className="ret-h2" style={{ marginTop: 14, fontSize: "clamp(24px, 3.5vw, 36px)" }}>Get notified when we publish.</h3>
          <div className="res-newsletter-row" style={{ marginTop: 22, display: "inline-flex", gap: 8, alignItems: "center", background: C.card, padding: 6, borderRadius: 999, border: "1px solid " + C.borderLight, maxWidth: "100%" }}>
            <input
              type="email"
              placeholder="you@agency.com"
              className="res-newsletter-input"
              style={{ background: "transparent", border: "none", outline: "none", padding: "10px 18px", width: 280, fontSize: 14.5, color: C.text, fontFamily: "inherit" }}
            />
            <button className="cta-btn" style={{ padding: "10px 22px", fontSize: 14, fontWeight: 700, background: C.btn, color: "#fff", border: "none", borderRadius: 999, cursor: "pointer", fontFamily: "inherit" }}>Subscribe</button>
          </div>
          <div style={{ fontSize: 12.5, color: C.textSec, marginTop: 12 }}>One email a month. Unsubscribe with one click.</div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════
// SHARED PAGE PRIMITIVES — used by all non-home pages
// ═══════════════════════════════════════════════════════════════

// Reusable eyebrow pill, H2, sub, CTA row, section wrapper, curve.
// Everything renders at the site's standard clamp() sizes and uses C constants.

function RetPageStyles() {
  return (
    <style>{`
      .ret-hero { background: #F2EEE8; padding: 56px 48px 72px; position: relative; overflow: hidden; }
      .ret-hero-inner { max-width: 1100px; margin: 0 auto; text-align: center; }
      .ret-hero-left { max-width: 1100px; margin: 0 auto; text-align: left; }
      .ret-eyebrow {
        font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em;
        color: ${C.primary}; background: ${C.primarySoft};
        display: inline-block; padding: 6px 14px; border-radius: 100px;
        margin-bottom: 20px;
      }
      .ret-eyebrow-purple { color: ${C.btn}; background: #EDE4F8; }
      .ret-eyebrow-light { color: ${C.primaryLight}; background: rgba(255,255,255,0.08); }
      .ret-h1 {
        font-size: clamp(38px, 6vw, 76px); font-weight: 900;
        letter-spacing: -0.045em; line-height: 1.08;
        margin: 0 auto 20px; color: ${C.text};
      }
      .ret-h1-left { margin-left: 0; margin-right: 0; max-width: 820px; }
      .ret-strike-wrap { position: relative; display: inline-block; margin: 0 0 0 0.15em; padding-top: 0.2em; }
      .ret-strike { color: ${C.textMuted}; position: relative; }
      .ret-strike::after {
        content: ''; position: absolute; left: -3%; top: 53%;
        height: 0.07em; width: 106%; background: ${C.danger};
        border-radius: 2px; transform: rotate(-1deg);
      }
      .ret-caveat {
        font-family: 'Caveat', cursive; font-weight: 700; color: ${C.primary};
        position: absolute; top: -0.2em; left: 50%;
        transform: translateX(-50%) rotate(-2deg);
        font-size: 0.78em; white-space: nowrap; line-height: 1;
      }
      .ret-sub {
        font-size: clamp(17px, 1.6vw, 19px); color: ${C.textSec};
        max-width: 680px; margin: 0 auto; line-height: 1.55;
      }
      .ret-sub-left { margin-left: 0; margin-right: 0; }
      .ret-hero-fine { font-size: 13.5px; color: ${C.textMuted}; margin-top: 16px; }
      .ret-cta-row { display: flex; gap: 12px; justify-content: center; align-items: center; flex-wrap: wrap; margin-top: 28px; }
      .ret-cta-row-left { justify-content: flex-start; }

      .ret-btn-primary, .ret-btn-secondary, .ret-btn-onDark, .ret-btn-onDark-outline {
        display: inline-flex; align-items: center; justify-content: center;
        height: 52px; padding: 0 28px;
        border-radius: 12px;
        font-size: 16px; font-weight: 700;
        cursor: pointer; font-family: inherit;
        box-sizing: border-box;
        line-height: 1;
        border: 2px solid ${C.btn};
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      .ret-btn-primary { background: ${C.btn}; color: #fff; }
      .ret-btn-primary:hover { background: ${C.btnHover}; border-color: ${C.btnHover}; transform: translateY(-1px); }
      .ret-btn-secondary { background: transparent; color: ${C.btn}; }
      .ret-btn-secondary:hover { background: ${C.btnSoft}; }
      .ret-btn-onDark { background: #fff; color: ${C.btn}; border-color: #fff; }
      .ret-btn-onDark:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
      .ret-btn-onDark-outline { background: transparent; color: #fff; border-color: rgba(255,255,255,0.4); }
      .ret-btn-onDark-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.6); }

      .ret-section { padding: 112px 48px; }
      .ret-section-inner { max-width: 1100px; margin: 0 auto; }
      .ret-section-head { text-align: center; max-width: 820px; margin: 0 auto 56px; }
      .ret-bg-cream { background: #F2EEE8; }
      .ret-bg-light { background: ${C.bg}; }
      .ret-bg-beige { background: #EAE4D6; }
      .ret-bg-deep { background: ${C.primaryDeep}; color: #fff; }
      .ret-bg-deep .ret-h2 { color: #fff; }
      .ret-bg-deep .ret-sub { color: rgba(255,255,255,0.72); }

      .ret-h2 {
        font-size: clamp(32px, 4.5vw, 56px); font-weight: 900;
        letter-spacing: -0.035em; line-height: 1.05;
        color: ${C.text}; margin: 0 0 18px;
      }
      .ret-h3 {
        font-size: clamp(22px, 2.4vw, 28px); font-weight: 800;
        letter-spacing: -0.025em; line-height: 1.2;
        color: ${C.text}; margin: 0 0 12px;
      }

      .ret-card {
        background: #fff; border-radius: 16px; padding: 28px 26px;
        box-shadow: 0 4px 16px rgba(60,40,10,0.04);
        border: 1px solid ${C.borderLight};
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .ret-card-hover:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(60,40,10,0.08); }
      .ret-card-deep { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px 26px; }

      .ret-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
      .ret-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }

      .ret-curve { display: block; width: 100vw; height: 140px; margin: 0 0 -1px; padding: 0; line-height: 0; }
      .ret-curve svg { display: block; width: 100%; height: calc(100% + 1px); }

      /* Prose block for legal / long-form */
      .ret-prose { font-size: 16px; line-height: 1.75; color: ${C.text}; }
      .ret-prose p { margin: 0 0 18px; }
      .ret-prose h3 { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; color: ${C.text}; margin: 32px 0 12px; }
      .ret-prose strong { font-weight: 700; }

      @media (max-width: 760px) {
        .ret-hero { padding: 48px 24px 56px; }
        .ret-section { padding: 72px 24px; }
        .ret-section-head { margin-bottom: 36px; }
        .ret-curve { height: 80px; }
      }
    `}</style>
  );
}

// Curve: top color = current section bg, bottom color = next section bg
const RET_CURVE_PATHS = {
  // gentle dip in the middle, low-amplitude S
  default: "M 0,100 L 1440,100 L 1440,25 Q 720,140 0,20 Z",
  // wave that crests on the right
  rightCrest: "M 0,100 L 1440,100 L 1440,30 C 1080,-20 360,140 0,25 Z",
  // wave that crests on the left
  leftCrest: "M 0,100 L 1440,100 L 1440,30 C 1100,140 340,-30 0,35 Z",
  // shallow-arc dome
  dome: "M 0,100 L 1440,100 L 1440,25 C 1080,-30 360,140 0,20 Z",
  // gentle right-side rise
  rightRise: "M 0,100 L 1440,100 L 1440,15 C 1080,80 360,40 0,55 Z",
  // gentle left-side rise
  leftRise: "M 0,100 L 1440,100 L 1440,55 C 1080,40 360,80 0,15 Z",
};

// ─── Solutions page graphics (inline SVG, no external files) ───
function FreelancerNetworkGraphic() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 340" style={{ display: "block", width: "100%", height: "auto", maxWidth: 460, margin: "0 auto" }}>
      <g stroke="#2F2F31" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.85">
        <line x1="230" y1="170" x2="86" y2="86" />
        <line x1="230" y1="170" x2="380" y2="70" />
        <line x1="230" y1="170" x2="410" y2="180" />
        <line x1="230" y1="170" x2="360" y2="280" />
        <line x1="230" y1="170" x2="110" y2="270" />
        <line x1="230" y1="170" x2="60" y2="200" />
        <line x1="230" y1="170" x2="250" y2="54" />
      </g>
      <g>
        <circle cx="86" cy="86" r="16" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2" />
        <circle cx="380" cy="70" r="18" fill="#558B68" stroke="#2F2F31" strokeWidth="2" />
        <circle cx="410" cy="180" r="14" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2" />
        <circle cx="360" cy="280" r="16" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2" />
        <circle cx="110" cy="270" r="18" fill="#558B68" stroke="#2F2F31" strokeWidth="2" />
        <circle cx="60" cy="200" r="14" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2" />
        <circle cx="250" cy="54" r="14" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2" />
      </g>
      <circle cx="230" cy="170" r="30" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2.6" />
      <circle cx="230" cy="170" r="22" fill="#558B68" stroke="#2F2F31" strokeWidth="2" />
      <circle cx="230" cy="170" r="4" fill="#FCFCFE" />
      <ellipse cx="230" cy="170" rx="160" ry="110" fill="none" stroke="#2F2F31" strokeWidth="1" strokeDasharray="2 5" opacity="0.3" />
    </svg>
  );
}

function AgencyNetworkGraphic() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 340" style={{ display: "block", width: "100%", height: "auto", maxWidth: 460, margin: "0 auto" }}>
      <g fill="#558B68" opacity="0.12">
        <ellipse cx="90" cy="90" rx="62" ry="46" />
        <ellipse cx="380" cy="86" rx="58" ry="44" />
        <ellipse cx="94" cy="258" rx="58" ry="40" />
        <ellipse cx="378" cy="262" rx="60" ry="42" />
      </g>
      <g stroke="#2F2F31" strokeWidth="1.4" strokeLinecap="round" opacity="0.8">
        <line x1="230" y1="170" x2="90" y2="90" />
        <line x1="230" y1="170" x2="380" y2="86" />
        <line x1="230" y1="170" x2="94" y2="258" />
        <line x1="230" y1="170" x2="378" y2="262" />
      </g>
      <g stroke="#2F2F31" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" fill="none">
        <path d="M60 72 L92 90 L120 68 L92 90 L80 120 L92 90 L128 100" />
        <path d="M350 60 L380 86 L414 72 L380 86 L420 108 L380 86 L346 110" />
        <path d="M62 232 L94 258 L124 236 L94 258 L130 286 L94 258 L62 288" />
        <path d="M346 234 L378 262 L416 244 L378 262 L414 288 L378 262 L342 290" />
      </g>
      <g fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.4">
        <circle cx="60" cy="72" r="6" /><circle cx="120" cy="68" r="6" />
        <circle cx="80" cy="120" r="6" fill="#558B68" /><circle cx="128" cy="100" r="6" />
        <circle cx="52" cy="104" r="5" /><circle cx="108" cy="126" r="5" />
        <circle cx="92" cy="90" r="8" />
        <circle cx="350" cy="60" r="6" /><circle cx="414" cy="72" r="6" fill="#558B68" />
        <circle cx="420" cy="108" r="6" /><circle cx="346" cy="110" r="6" />
        <circle cx="342" cy="80" r="5" /><circle cx="400" cy="54" r="5" />
        <circle cx="380" cy="86" r="8" />
        <circle cx="62" cy="232" r="6" /><circle cx="124" cy="236" r="6" />
        <circle cx="130" cy="286" r="6" fill="#558B68" /><circle cx="62" cy="288" r="6" />
        <circle cx="54" cy="262" r="5" /><circle cx="108" cy="212" r="5" />
        <circle cx="94" cy="258" r="8" />
        <circle cx="346" cy="234" r="6" fill="#558B68" /><circle cx="416" cy="244" r="6" />
        <circle cx="414" cy="288" r="6" /><circle cx="342" cy="290" r="6" />
        <circle cx="400" cy="216" r="5" /><circle cx="422" cy="214" r="5" />
        <circle cx="378" cy="262" r="8" />
      </g>
      <circle cx="230" cy="170" r="30" fill="#FCFCFE" stroke="#2F2F31" strokeWidth="2.6" />
      <circle cx="230" cy="170" r="22" fill="#558B68" stroke="#2F2F31" strokeWidth="2" />
      <g stroke="#FCFCFE" strokeWidth="2" strokeLinecap="round">
        <line x1="222" y1="170" x2="238" y2="170" />
        <line x1="230" y1="162" x2="230" y2="178" />
      </g>
    </svg>
  );
}

function EnterpriseNetworkGraphic() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 340" style={{ display: "block", width: "100%", height: "auto", maxWidth: 540, margin: "0 auto" }}>
      <g fill="#558B68" opacity="0.10">
        <circle cx="88" cy="92" r="58" /><circle cx="230" cy="70" r="54" /><circle cx="370" cy="92" r="58" />
        <circle cx="88" cy="260" r="58" /><circle cx="230" cy="278" r="54" /><circle cx="370" cy="260" r="58" />
      </g>
      <g stroke="#2F2F31" strokeWidth="1" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M88 92 L230 70 L370 92 L370 260 L230 278 L88 260 Z" />
        <path d="M88 92 L370 260 M370 92 L88 260 M230 70 L230 278" />
        <path d="M88 92 L230 278 M370 92 L230 278 M88 260 L370 92" />
      </g>
      <g stroke="#2F2F31" strokeWidth="0.7" strokeLinecap="round" opacity="0.55" fill="none">
        <g>
          <line x1="88" y1="92" x2="50" y2="58" /><line x1="88" y1="92" x2="80" y2="46" />
          <line x1="88" y1="92" x2="124" y2="52" /><line x1="88" y1="92" x2="140" y2="86" />
          <line x1="88" y1="92" x2="132" y2="122" /><line x1="88" y1="92" x2="96" y2="138" />
          <line x1="88" y1="92" x2="52" y2="134" /><line x1="88" y1="92" x2="38" y2="100" />
          <line x1="88" y1="92" x2="42" y2="78" />
        </g>
        <g>
          <line x1="230" y1="70" x2="194" y2="32" /><line x1="230" y1="70" x2="232" y2="22" />
          <line x1="230" y1="70" x2="268" y2="32" /><line x1="230" y1="70" x2="284" y2="66" />
          <line x1="230" y1="70" x2="274" y2="102" /><line x1="230" y1="70" x2="230" y2="116" />
          <line x1="230" y1="70" x2="188" y2="102" /><line x1="230" y1="70" x2="178" y2="74" />
        </g>
        <g>
          <line x1="370" y1="92" x2="336" y2="56" /><line x1="370" y1="92" x2="370" y2="42" />
          <line x1="370" y1="92" x2="414" y2="56" /><line x1="370" y1="92" x2="424" y2="92" />
          <line x1="370" y1="92" x2="418" y2="128" /><line x1="370" y1="92" x2="378" y2="138" />
          <line x1="370" y1="92" x2="326" y2="128" /><line x1="370" y1="92" x2="320" y2="98" />
          <line x1="370" y1="92" x2="344" y2="132" />
        </g>
        <g>
          <line x1="88" y1="260" x2="50" y2="224" /><line x1="88" y1="260" x2="80" y2="212" />
          <line x1="88" y1="260" x2="126" y2="220" /><line x1="88" y1="260" x2="142" y2="256" />
          <line x1="88" y1="260" x2="132" y2="292" /><line x1="88" y1="260" x2="92" y2="306" />
          <line x1="88" y1="260" x2="52" y2="302" /><line x1="88" y1="260" x2="38" y2="270" />
          <line x1="88" y1="260" x2="44" y2="244" />
        </g>
        <g>
          <line x1="230" y1="278" x2="194" y2="238" /><line x1="230" y1="278" x2="232" y2="228" />
          <line x1="230" y1="278" x2="270" y2="240" /><line x1="230" y1="278" x2="284" y2="274" />
          <line x1="230" y1="278" x2="274" y2="310" /><line x1="230" y1="278" x2="228" y2="322" />
          <line x1="230" y1="278" x2="186" y2="310" /><line x1="230" y1="278" x2="176" y2="280" />
        </g>
        <g>
          <line x1="370" y1="260" x2="336" y2="224" /><line x1="370" y1="260" x2="370" y2="210" />
          <line x1="370" y1="260" x2="414" y2="224" /><line x1="370" y1="260" x2="424" y2="258" />
          <line x1="370" y1="260" x2="418" y2="298" /><line x1="370" y1="260" x2="378" y2="310" />
          <line x1="370" y1="260" x2="326" y2="300" /><line x1="370" y1="260" x2="318" y2="266" />
        </g>
      </g>
      <g fill="#FCFCFE" stroke="#2F2F31" strokeWidth="1.1">
        <circle cx="50" cy="58" r="4" /><circle cx="80" cy="46" r="4" /><circle cx="124" cy="52" r="4" />
        <circle cx="140" cy="86" r="4" fill="#558B68" /><circle cx="132" cy="122" r="4" /><circle cx="96" cy="138" r="4" />
        <circle cx="52" cy="134" r="4" /><circle cx="38" cy="100" r="4" fill="#558B68" /><circle cx="42" cy="78" r="4" />
        <circle cx="194" cy="32" r="4" /><circle cx="232" cy="22" r="4" fill="#558B68" /><circle cx="268" cy="32" r="4" />
        <circle cx="284" cy="66" r="4" /><circle cx="274" cy="102" r="4" /><circle cx="230" cy="116" r="4" />
        <circle cx="188" cy="102" r="4" fill="#558B68" /><circle cx="178" cy="74" r="4" />
        <circle cx="336" cy="56" r="4" /><circle cx="370" cy="42" r="4" /><circle cx="414" cy="56" r="4" fill="#558B68" />
        <circle cx="424" cy="92" r="4" /><circle cx="418" cy="128" r="4" /><circle cx="378" cy="138" r="4" />
        <circle cx="326" cy="128" r="4" /><circle cx="320" cy="98" r="4" /><circle cx="344" cy="132" r="4" fill="#558B68" />
        <circle cx="50" cy="224" r="4" fill="#558B68" /><circle cx="80" cy="212" r="4" /><circle cx="126" cy="220" r="4" />
        <circle cx="142" cy="256" r="4" /><circle cx="132" cy="292" r="4" /><circle cx="92" cy="306" r="4" />
        <circle cx="52" cy="302" r="4" /><circle cx="38" cy="270" r="4" /><circle cx="44" cy="244" r="4" fill="#558B68" />
        <circle cx="194" cy="238" r="4" /><circle cx="232" cy="228" r="4" /><circle cx="270" cy="240" r="4" fill="#558B68" />
        <circle cx="284" cy="274" r="4" /><circle cx="274" cy="310" r="4" /><circle cx="228" cy="322" r="4" />
        <circle cx="186" cy="310" r="4" fill="#558B68" /><circle cx="176" cy="280" r="4" />
        <circle cx="336" cy="224" r="4" /><circle cx="370" cy="210" r="4" fill="#558B68" /><circle cx="414" cy="224" r="4" />
        <circle cx="424" cy="258" r="4" /><circle cx="418" cy="298" r="4" /><circle cx="378" cy="310" r="4" />
        <circle cx="326" cy="300" r="4" /><circle cx="318" cy="266" r="4" fill="#558B68" />
        <circle cx="158" cy="148" r="3" /><circle cx="158" cy="204" r="3" />
        <circle cx="302" cy="148" r="3" /><circle cx="302" cy="204" r="3" />
        <circle cx="152" cy="176" r="3" /><circle cx="308" cy="176" r="3" />
        <circle cx="230" cy="170" r="3" /><circle cx="200" cy="170" r="3" /><circle cx="260" cy="170" r="3" />
        <circle cx="100" cy="176" r="3" /><circle cx="360" cy="176" r="3" />
      </g>
      <g fill="#558B68" stroke="#2F2F31" strokeWidth="1.8">
        <circle cx="88" cy="92" r="10" /><circle cx="230" cy="70" r="10" /><circle cx="370" cy="92" r="10" />
        <circle cx="88" cy="260" r="10" /><circle cx="230" cy="278" r="10" /><circle cx="370" cy="260" r="10" />
      </g>
    </svg>
  );
}

function RetCurve({ from, to, variant = "default" }) {
  const d = RET_CURVE_PATHS[variant] || RET_CURVE_PATHS.default;
  return (
    <div className="ret-curve r-full-bleed r-no-pad" style={{ background: from }}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d={d} fill={to} /></svg>
    </div>
  );
}

function RetHero({ eyebrow, h1, sub, primaryCta = "Start Free Trial", primaryAction, secondaryCta, secondaryAction, fine = "14-day free trial. Cancel anytime.", setPage, eyebrowStyle }) {
  return (
    <section className="ret-hero r-full-bleed">
      <div className="ret-hero-inner">
        {eyebrow && <div className={"ret-eyebrow" + (eyebrowStyle === "purple" ? " ret-eyebrow-purple" : "")}>{eyebrow}</div>}
        <h1 className="ret-h1">{h1}</h1>
        {sub && <p className="ret-sub">{sub}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="ret-cta-row">
            {primaryCta && <button className="ret-btn-primary" onClick={() => primaryAction && setPage(primaryAction)}>{primaryCta}</button>}
            {secondaryCta && <button className="ret-btn-secondary" onClick={() => secondaryAction && setPage(secondaryAction)}>{secondaryCta}</button>}
          </div>
        )}
        {fine && <p className="ret-hero-fine">{fine}</p>}
      </div>
    </section>
  );
}

function RetFinalCTA({ h2, sub, setPage, primaryCta = "Start Free Trial", primaryAction = "signup" }) {
  return (
    <section className="ret-section ret-bg-cream r-full-bleed" style={{ textAlign: "center" }}>
      <div className="ret-section-inner">
        <h2 className="ret-h2">{h2}</h2>
        {sub && <p className="ret-sub" style={{ margin: "0 auto 28px" }}>{sub}</p>}
        <div className="ret-cta-row">
          <button className="ret-btn-primary" onClick={() => setPage(primaryAction)}>{primaryCta}</button>
        </div>
        <p className="ret-hero-fine">14-day free trial. Cancel anytime.</p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════
function Contact({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <section className="r-full-bleed" style={{ background: "#F2EEE8", minHeight: "calc(100vh - 80px)", padding: "60px 20px 80px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 16px", color: C.text }}>Get in Touch</h1>
            <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.55, maxWidth: 520, margin: "0 auto" }}>
              Questions, feedback, partnerships, or just want to talk retention.
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: 18, padding: "36px 36px 32px", boxShadow: "0 1px 3px rgba(30,38,31,0.04)", marginBottom: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>Email</label>
                <input
                  type="email"
                  placeholder="you@agency.com"
                  style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>Message</label>
                <textarea
                  placeholder="What's on your mind?"
                  rows={5}
                  style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff", resize: "vertical", minHeight: 120 }}
                />
              </div>
              <button className="ret-btn-primary" style={{ width: "100%", marginTop: 4 }}>Send Message</button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Email", value: "hello@retayned.com" },
              { label: "Based in", value: "Washington, DC" },
              { label: "Response time", value: "Usually within a few hours" },
            ].map(item => (
              <div key={item.label} style={{ background: "#fff", borderRadius: 14, padding: "18px 22px", boxShadow: "0 1px 3px rgba(30,38,31,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14.5, color: C.textSec }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════
function Login({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <section className="r-full-bleed" style={{ background: "#F2EEE8", minHeight: "calc(100vh - 80px)", padding: "40px 20px 80px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span
              onClick={() => setPage("home")}
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: C.primary,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Retayned.
            </span>
          </div>

          <div style={{ background: "#fff", borderRadius: 18, padding: "40px 40px 32px", boxShadow: "0 1px 3px rgba(30,38,31,0.04)" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 6px", color: C.text }}>Welcome back.</h2>
            <p style={{ fontSize: 15, color: C.textSec, margin: "0 0 28px" }}>Sign in to your account.</p>

            <button
              type="button"
              style={{
                width: "100%",
                padding: "13px 16px",
                border: "1.5px solid " + C.borderLight,
                borderRadius: 12,
                background: "#fff",
                fontSize: 15,
                fontWeight: 600,
                color: C.text,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
              <div style={{ flex: 1, height: 1, background: C.borderLight }} />
              <span style={{ fontSize: 13, color: C.textMuted }}>or</span>
              <div style={{ flex: 1, height: 1, background: C.borderLight }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="email"
                placeholder="Email"
                style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff" }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff" }}
              />
              <button className="ret-btn-primary" style={{ width: "100%", marginTop: 4 }}>Sign In</button>
            </div>

            <p style={{ fontSize: 14, color: C.textSec, textAlign: "left", marginTop: 22 }}>
              Don't have an account? <span onClick={() => setPage("signup")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Start free trial</span>
            </p>
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SIGNUP
// ═══════════════════════════════════════════════════════════════
function Signup({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <section className="r-full-bleed" style={{ background: "#F2EEE8", minHeight: "calc(100vh - 80px)", padding: "40px 20px 80px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span
              onClick={() => setPage("home")}
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: C.primary,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Retayned.
            </span>
          </div>

          <div style={{ background: "#fff", borderRadius: 18, padding: "40px 40px 32px", boxShadow: "0 1px 3px rgba(30,38,31,0.04)" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 6px", color: C.text }}>Start your free trial.</h2>
            <p style={{ fontSize: 15, color: C.textSec, margin: "0 0 28px" }}>14-day free trial. Cancel anytime.</p>

            <button
              type="button"
              style={{
                width: "100%",
                padding: "13px 16px",
                border: "1.5px solid " + C.borderLight,
                borderRadius: 12,
                background: "#fff",
                fontSize: 15,
                fontWeight: 600,
                color: C.text,
                fontFamily: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
              <div style={{ flex: 1, height: 1, background: C.borderLight }} />
              <span style={{ fontSize: 13, color: C.textMuted }}>or</span>
              <div style={{ flex: 1, height: 1, background: C.borderLight }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                type="text"
                placeholder="Full name"
                style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff" }}
              />
              <input
                type="email"
                placeholder="Email"
                style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff" }}
              />
              <input
                type="password"
                placeholder="Password"
                style={{ width: "100%", padding: "14px 16px", border: "1.5px solid " + C.borderLight, borderRadius: 12, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#fff" }}
              />
              <button className="ret-btn-primary" style={{ width: "100%", marginTop: 4 }}>Start Free Trial</button>
            </div>

            <p style={{ fontSize: 14, color: C.textSec, textAlign: "left", marginTop: 22 }}>
              Already have an account? <span onClick={() => setPage("login")} style={{ color: C.text, fontWeight: 700, cursor: "pointer" }}>Sign in</span>
            </p>
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAQ — one component, used as a page AND embedded elsewhere
// ═══════════════════════════════════════════════════════════════
const FAQ_DATA = [
  {
    label: "About Retayned",
    questions: [
      { q: "What is Retayned?", a: "Retayned is a new client relationship management platform built for agencies, freelancers, consultants, stylists, coaches...anyone who manages ongoing client relationships. It combines AI-powered retention scoring with communication signal tracking and 10+ years of proprietary client retention data and expertise. Retayned doesn't just tell you which clients need attention — it gives you the exact action steps and script to turn a potential loss into lifelong business." },
      { q: "How is this different from a CRM?", a: "Traditional CRMs track deals and contacts. Retayned tracks the health of relationships. It profiles how each client communicates, monitors engagement velocity across your channels, and uses AI to predict churn well before it happens. A CRM tells you who your clients are. Retayned tells you how your clients are feeling and what to do to make things better." },
      { q: "What does the AI actually do?", a: "Rai ingests several inputs — relationship profiles, health checks, velocity signals, deliverable tracking, billing, and more — then generates personalized action points. It tells you who to talk to today, what the real problem is, and gives you an opening to delight your clients." },
      { q: "Who is this built for?", a: "Anyone who manages one or more ongoing client relationships. Agency owners, freelancers, consultants, stylists, coaches, account managers. If losing a client changes your month, quarter, or year, Retayned is for you." },
    ],
  },
  {
    label: "Pricing & Plans",
    questions: [
      { q: "What does it cost?", a: "It couldn't be simpler. $19.99/mo plus $1 per client. One plan, every feature, no tiers. Whether you have 3 clients or 300, you get the full platform — unlimited Rai chats, dynamic scoring, health checks, integrations, team members, everything. Enterprise pricing is available for teams building AI agents. Every plan includes a 14-day free trial." },
    ],
  },
  {
    label: "Getting Started",
    questions: [
      { q: "Do I need to connect my email or Slack?", a: "Nope. The core platform — profiles, health checks, AI coaching, and deliverable tracking — works without any integrations. Channel connections unlock additional velocity detection and automated signals, but you can start without them and add integrations when you're ready." },
      { q: "How long does setup take?", a: "Minutes. Add your clients, score their relationship profiles, and you're in. The AI starts generating insights immediately. Connect every channel take a few clicks each when you're ready for them." },
      { q: "Is my client data safe?", a: "Yes. We access communication metadata (timestamps, response frequency) — not message content. Your data is encrypted in transit and at rest, hosted on secure US infrastructure. We don't sell your data or use it to train AI models. You own everything you put in." },
    ],
  },
];

function FAQ({ dark = false }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {FAQ_DATA.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: dark ? "rgba(255,255,255,0.6)" : C.primary }}>{group.label}</span>
          </div>
          {group.questions.map((item, qi) => {
            const key = `${gi}-${qi}`;
            const isOpen = open === key;
            return (
              <div key={key} onClick={() => setOpen(isOpen ? null : key)} style={{
                cursor: "pointer",
                borderBottom: "1px solid " + (dark ? "rgba(255,255,255,0.12)" : C.borderLight),
                padding: "22px 4px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", color: dark ? "#fff" : C.text, lineHeight: 1.3, margin: 0 }}>{item.q}</h3>
                  <span style={{ fontSize: 22, fontWeight: 400, color: dark ? "rgba(255,255,255,0.5)" : C.textMuted, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", lineHeight: 1, flexShrink: 0, marginTop: 2 }}>+</span>
                </div>
                {isOpen && (
                  <p style={{ fontSize: 15, color: dark ? "rgba(255,255,255,0.72)" : C.textSec, lineHeight: 1.65, marginTop: 14 }}>{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function FAQPage({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Common questions"
        h1="Frequently asked."
        sub="The answers to what people ask us most."
        primaryCta={null}
        secondaryCta={null}
        fine={null}
        setPage={setPage}
      />
      <section className="ret-section ret-bg-cream r-full-bleed" style={{ paddingTop: 0 }}>
        <div className="ret-section-inner" style={{ maxWidth: 1100 }}>
          <FAQ />
        </div>
      </section>
      <RetFinalCTA
        h2="Still have questions?"
        sub="Email us directly — we respond within a business day."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRIVACY
// ═══════════════════════════════════════════════════════════════
function Privacy({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Legal"
        h1="Privacy Policy."
        sub="Last updated: April 2026."
        primaryCta={null}
        secondaryCta={null}
        fine={null}
        setPage={setPage}
      />
      <section className="ret-section ret-bg-cream r-full-bleed" style={{ paddingTop: 0 }}>
        <div className="ret-section-inner" style={{ maxWidth: 1100 }}>
          <div className="ret-card" style={{ padding: "44px 40px" }}>
            <div className="ret-prose">
              <p>Retayned, operated by Maniac Digital, LLC ("Retayned," "we," "our," "us"), is committed to protecting the privacy of our users and the clients they manage through the Service. This Privacy Policy describes how we collect, use, store, and share information when you use the Retayned platform, website (retayned.com), and related services (collectively, the "Service").</p>
              <p>Retayned is designed for freelancers, consultants, and agencies to manage their relationships with their own clients. Because of this, the Service involves two distinct categories of people: (1) <strong>Users</strong> — the account holders who subscribe to Retayned, and (2) <strong>Clients</strong> — the third parties whose information Users enter into the Service. This policy explains how we handle data about both.</p>

              <h3>1. Roles and Responsibilities</h3>
              <p><strong>You are the controller of your Client Data.</strong> When you enter information about your clients into the Service, you act as the data controller for that information under applicable privacy laws (including GDPR, UK GDPR, and CCPA). Retayned acts as your data processor and processes Client Data solely on your behalf and according to your instructions as set out in these terms and our Data Processing Addendum.</p>
              <p><strong>This means you are responsible for:</strong> having a lawful basis to collect and process your clients' information (typically legitimate interest for B2B client management, but this is your determination to make); providing any notices your clients are entitled to under applicable law; obtaining any consents required in your jurisdiction; and responding to requests from your clients to access, correct, or delete information about them.</p>
              <p><strong>We will support you</strong> by providing tools to export, edit, and delete Client Data, and by routing any direct requests we receive from your clients to you for response. A Data Processing Addendum is available on request at privacy@retayned.com.</p>

              <h3>2. Information We Collect</h3>
              <p><strong>Account Information.</strong> When you register, we collect your name, email address, company name, and billing information. If you sign up via Google OAuth, we receive your name and email from Google. We do not store your Google password.</p>
              <p><strong>Client Data.</strong> You enter information about your clients into the Service, including names, contact information, relationship profiles, health check responses, revenue and billing records, notes, logged touchpoints, and other client-related data ("Client Data"). You control what Client Data you provide.</p>
              <p><strong>AI-Generated Data.</strong> The Service produces derived data about your clients, including retention scores, profile scores, archetype classifications, suggested daily actions, and conversation history with the Rai advisor ("AI-Generated Data"). This data is stored in association with the relevant client record.</p>
              <p><strong>Integration Data (if and when enabled).</strong> Retayned may, in future versions of the Service or if you choose to connect them, offer integrations with third-party platforms such as Gmail, Google Calendar, or Slack. If you connect such an integration, we will access only the metadata necessary to calculate communication signals (timestamps, sender/recipient identifiers, meeting frequency, response latency). We would not read, store, or process the content of your emails, messages, or meeting transcripts. Integrations are opt-in and can be disconnected at any time. No integrations are enabled by default.</p>
              <p><strong>Usage Data.</strong> We automatically collect information about how you interact with the Service, including pages viewed, features used, session duration, device type, browser type, IP address, and referring URLs.</p>
              <p><strong>Cookies and Tracking.</strong> We use essential cookies to maintain your session and preferences, and analytics tools to understand usage patterns. We do not use third-party advertising cookies. You may disable non-essential cookies through your browser settings.</p>

              <h3>3. How We Use Your Information</h3>
              <p>We use the information we collect to: provide, operate, and maintain the Service; generate retention scores, health assessments, and AI-powered recommendations through Rai; process payments and manage your subscription; send transactional communications (account confirmations, billing notices, security alerts); respond to support requests; and comply with legal obligations.</p>
              <p>We do not sell, rent, or lease your personal information or Client Data to third parties. We do not use your Client Data for advertising purposes.</p>

              <h3>4. How Rai and AI Features Work</h3>
              <p><strong>What Rai does.</strong> Rai is Retayned's AI advisor. When you interact with Rai or when the Daily Sweep runs, Client Data relevant to the request — relationship profiles, scores, recent notes, revenue data, and recent Rai conversation history — is sent to a third-party AI provider (currently Anthropic's Claude API) to generate recommendations, suggestions, and responses.</p>
              <p><strong>Data minimization.</strong> We send only the Client Data necessary to generate a relevant response. We do not send your full account, your billing details, your credentials, or data about clients other than those relevant to the request.</p>
              <p><strong>Zero retention at the AI provider.</strong> Our AI provider is contractually prohibited from retaining your Client Data beyond the duration of the API request and from using it for model training. We rely on Anthropic's zero-retention posture for API traffic.</p>
              <p><strong>Rai conversations.</strong> When you chat with Rai about a specific client, the conversation is stored in Retayned so Rai can maintain context across sessions. Conversations are capped at a rolling window (currently 20 messages per client) and are stored against that client record. Individual messages are automatically purged 180 days after they are sent, on a rolling per-message basis, so Rai's context reflects only recent relationship history. You can delete a Rai conversation at any time from the client profile. Deleting a client deletes all associated Rai conversations and AI-Generated Data within 30 days.</p>
              <p><strong>Daily Sweep outputs.</strong> Rai generates suggested tasks for your clients on a scheduled basis. These suggestions, along with whether you promoted or dismissed them, are stored as history to improve suggestion quality for you over time and to avoid repeating completed suggestions. This history is treated as Client Data and is deleted when the associated client is deleted.</p>
              <p><strong>AI Outputs are not professional advice.</strong> Retention scores, suggestions, scripts, and Rai responses are informational. They do not constitute legal, financial, or business advice, and you should exercise your own judgment before acting on them.</p>

              <h3>5. Use of Aggregated Data</h3>
              <p>We may use aggregated, de-identified patterns derived from Service usage to improve the Service — including refining scoring weights, archetype definitions, and suggestion quality. Aggregated data of this kind is stripped of identifiers that would allow it to be linked back to you, your clients, or any specific account, and is used in the aggregate only.</p>
              <p>We do not use your Client Data, your Rai conversations, or your AI-Generated Data to train, fine-tune, or improve any third-party AI or machine learning models. Our AI API providers are contractually prohibited from doing so.</p>

              <h3>6. Data Sharing and Third Parties</h3>
              <p>We share information only in the following circumstances: with service providers who help us operate the Service, subject to contractual obligations to protect your data; with your consent or at your direction; to comply with applicable law, regulation, legal process, or governmental request; to protect the rights, safety, or property of Retayned, our users, or the public; and in connection with a merger, acquisition, or sale of assets, in which case you will be notified of any change in data practices.</p>
              <p><strong>Categories of service providers we use:</strong> cloud hosting and infrastructure, payment processing, AI API providers, authentication, email delivery, and privacy-respecting analytics. All service providers are bound by data processing agreements that prohibit them from using your data for their own purposes. A current list of sub-processors is available on request at privacy@retayned.com.</p>

              <h3>7. Data Security</h3>
              <p>We implement industry-standard security measures to protect your data, including: encryption of data in transit (TLS 1.2+) and at rest (AES-256); secure authentication with password hashing and optional OAuth; row-level access controls in our database limiting access between accounts; administrative access controls limiting employee access to production data; regular security reviews of our infrastructure and dependencies; and secure API communication with all third-party providers.</p>
              <p>No method of transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
              <p><strong>Breach notification.</strong> In the event of a data breach affecting your personal information or Client Data, we will notify affected Users without undue delay and, where required by applicable law, within the statutory timeframe (typically 72 hours under GDPR). Our notice will describe the nature of the breach, the categories and approximate number of records affected, likely consequences, and the steps we are taking to address it.</p>

              <h3>8. Data Retention and Deletion</h3>
              <p><strong>Active accounts.</strong> We retain Account Information, Client Data, and AI-Generated Data for as long as your account is active.</p>
              <p><strong>Account cancellation.</strong> If you cancel your subscription, your data will be retained in an inactive state for 30 days to allow for reactivation, after which it will be permanently deleted within 90 days.</p>
              <p><strong>Deleting a client.</strong> When you delete a client from your portfolio, all associated Client Data, AI-Generated Data, Rai conversations, and suggestion history for that client will be deleted within 30 days. Backups may retain deleted data for an additional period not to exceed 60 days, after which it is purged from backup media.</p>
              <p><strong>Rai conversation messages.</strong> Individual Rai conversation messages are automatically deleted 180 days after they are sent, on a rolling per-message basis, regardless of whether the associated client is still in your portfolio.</p>
              <p><strong>Immediate deletion.</strong> You may request immediate deletion of your account and all associated data at any time by contacting privacy@retayned.com.</p>
              <p><strong>Legal retention.</strong> Certain data may be retained as required by law (for example, billing records for tax purposes) even after account deletion.</p>
              <p><strong>Aggregated data.</strong> Aggregated, de-identified data that cannot be used to identify you or your clients may be retained indefinitely for product improvement purposes.</p>

              <h3>9. Your Rights</h3>
              <p>Depending on your jurisdiction, you may have the right to: access, correct, or delete your personal information; export your data in a portable format; restrict or object to certain processing; withdraw consent where processing is based on consent; and lodge a complaint with a supervisory authority.</p>
              <p>To exercise any of these rights regarding information about <strong>you</strong> (as a User), contact us at privacy@retayned.com. We will respond within 30 days.</p>
              <p><strong>Requests from your clients.</strong> If you are a third-party client (not a User) and you believe a Retayned User has entered information about you into the Service, please contact that User directly — they are the controller of information about you and are responsible for responding to your request. If you are unable to identify or reach the relevant User, you may contact us at privacy@retayned.com and we will make reasonable efforts to route your request to the appropriate User. We do not independently access, modify, or delete client records without instruction from the controlling User, except where required by law.</p>

              <h3>10. International Data Transfers</h3>
              <p>Retayned is based in Washington, DC, United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States. By using the Service, you consent to the transfer of your information to the United States, where data protection laws may differ from those in your jurisdiction. For transfers from the EEA, UK, or Switzerland, we rely on Standard Contractual Clauses or equivalent safeguards as set out in our Data Processing Addendum.</p>

              <h3>11. Children's Privacy</h3>
              <p>The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.</p>

              <h3>12. Enterprise and API Access</h3>
              <p>Retayned offers an Enterprise product with additional access surfaces, including a managed agent API. Enterprise customers are governed by a separate agreement that may include additional or modified data processing terms. The practices described in this policy apply to the self-serve Service unless superseded by an Enterprise agreement.</p>

              <h3>13. Changes to This Policy</h3>
              <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Service and updating the "Last updated" date, and, for material changes, by email or in-app notice. Your continued use of the Service after any changes constitutes acceptance of the updated policy.</p>

              <h3>14. Contact Us</h3>
              <p>If you have questions about this Privacy Policy or our data practices, contact us at:</p>
              <p><strong>privacy@retayned.com</strong><br />Maniac Digital, LLC<br />Washington, DC, United States</p>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// TERMS
// ═══════════════════════════════════════════════════════════════
function Terms({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Legal"
        h1="Terms of Service."
        sub="Last updated: April 2026."
        primaryCta={null}
        secondaryCta={null}
        fine={null}
        setPage={setPage}
      />
      <section className="ret-section ret-bg-cream r-full-bleed" style={{ paddingTop: 0 }}>
        <div className="ret-section-inner" style={{ maxWidth: 1100 }}>
          <div className="ret-card" style={{ padding: "44px 40px" }}>
            <div className="ret-prose">
              <p>These Terms of Service ("Terms") govern your access to and use of the Retayned platform, website, and related services (collectively, the "Service") provided by Maniac Digital, LLC ("Retayned," "we," "our," "us"). By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>

              <h3>1. Eligibility and Account</h3>
              <p>You must be at least 18 years old and have the legal authority to enter into these Terms. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
              <p>You agree to provide accurate, current, and complete information during registration and to keep your account information updated.</p>

              <h3>2. The Service</h3>
              <p>Retayned provides client relationship management tools including AI-powered retention scoring, communication signal analysis, health check assessments, suggested daily actions, a client relationship advisor ("Rai"), and related features. The Service is designed to help you manage and strengthen relationships with your own clients. We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</p>
              <p>The Service may, in future versions or at your election, offer integrations with third-party platforms. Your use of any such integration is also subject to the terms and privacy policies of those third-party providers.</p>

              <h3>3. Your Data and Your Responsibilities</h3>
              <p><strong>Ownership.</strong> You retain full ownership of all data you enter into the Service, including client information, relationship profiles, health check responses, billing records, notes, and any other content you provide ("Your Data"). We do not claim any intellectual property rights over Your Data.</p>
              <p><strong>License to Us.</strong> You grant Retayned a limited, non-exclusive, worldwide license to use, process, and store Your Data solely for the purpose of providing the Service to you and, in de-identified and aggregated form only, for improving the Service. This license terminates when you delete Your Data or your account.</p>
              <p><strong>You are the data controller.</strong> You are the data controller for any information you enter about your clients, and Retayned acts as your data processor. You represent and warrant that:</p>
              <ul>
                <li>You have a lawful basis under applicable privacy laws (including GDPR, UK GDPR, CCPA, and any other applicable regime) to enter your clients' information into the Service and to permit its processing as described in these Terms and the Privacy Policy;</li>
                <li>You have provided any notices and obtained any consents required of you in your jurisdiction;</li>
                <li>Entering your clients' information into the Service does not violate any confidentiality agreement, non-disclosure agreement, contract with your clients, or other legal obligation;</li>
                <li>You will respond in a timely manner to any request we route to you from one of your clients exercising rights under applicable privacy law.</li>
              </ul>
              <p><strong>Data Portability and Deletion.</strong> You may export Your Data at any time while your account is active. You may delete individual client records, Rai conversations, or your entire account at any time. Retention and deletion timelines are described in the Privacy Policy. A Data Processing Addendum is available on request at privacy@retayned.com.</p>
              <p><strong>Indemnification for your representations.</strong> You agree to indemnify Retayned for any claim, regulatory action, or loss arising from your breach of the representations in this Section 3, including claims brought by your clients or by privacy regulators in connection with your processing of your clients' data.</p>

              <h3>4. AI-Powered Features</h3>
              <p><strong>Rai and AI Outputs.</strong> The Service includes AI-powered features, including the Rai advisor, retention scoring, archetype classification, Daily Sweep suggestions, and conversation scripts. These features are powered by third-party AI models accessed via API. AI-generated recommendations, scores, scripts, and suggestions ("AI Outputs") are provided for informational purposes only and do not constitute professional advice of any kind — including legal, financial, tax, or business advice.</p>
              <p><strong>No Guarantees.</strong> AI Outputs are generated based on the data you provide and may not be accurate, complete, or appropriate for your specific situation. You are solely responsible for evaluating and acting on AI Outputs. Retayned does not guarantee any specific business outcome, client retention rate, revenue result, or other outcome from using the Service or following AI Outputs.</p>
              <p><strong>No Training on Your Data.</strong> We do not use Your Data to train, fine-tune, or improve any third-party AI or machine learning models. Your Data is processed in real-time through the API to generate responses and is not retained by our AI providers beyond the duration of the API request, in accordance with their data processing agreements.</p>
              <p><strong>Aggregated, de-identified improvement.</strong> We reserve the right to use aggregated, de-identified patterns derived from Service usage to improve our own scoring logic, archetype library, and suggestion quality. This aggregated data cannot be used to identify you, your clients, or any specific account. This activity is not "model training" of any third-party AI model.</p>
              <p><strong>Rai Conversations.</strong> Rai may store recent conversation history against a client record so it can maintain context across sessions. You can delete these conversations at any time. We do not use the content of Rai conversations for any purpose other than providing the Service to you and, in de-identified and aggregated form, improving the Service as described above.</p>
              <p><strong>Human Oversight.</strong> You acknowledge that all actions taken based on AI Outputs are your own decisions. You should exercise your own professional judgment before acting on any recommendation provided by the Service, including before sending communications to clients, changing pricing, or terminating a client relationship.</p>

              <h3>5. Payment and Billing</h3>
              <p><strong>Subscription Plans.</strong> The Service is offered on a subscription basis. Current pricing is displayed on our pricing page. Prices are subject to change with 30 days' notice. Subscription fees are non-refundable except as described below.</p>
              <p><strong>Metered pricing.</strong> Retayned pricing includes a flat base fee plus a usage-based per-client fee. Usage is measured by the number of active client records in your portfolio during the billing period, and charges are calculated and billed in accordance with the pricing page in effect at the start of each billing period.</p>
              <p><strong>Free Trial.</strong> We may offer a free trial period. At the end of the trial, your subscription will begin automatically unless you cancel before the trial ends. We will notify you before charging.</p>
              <p><strong>Billing.</strong> Fees are billed on a recurring basis (monthly or annual, depending on your plan) through Stripe. You authorize us to charge your payment method on file for all applicable fees, including metered usage.</p>
              <p><strong>Cancellation.</strong> You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. You will retain access to the Service until then. We do not provide prorated refunds for partial billing periods.</p>
              <p><strong>Refunds.</strong> If you are dissatisfied with the Service, you may request a refund within 14 days of your first paid subscription charge. Refund requests after 14 days are handled at our discretion.</p>

              <h3>6. Acceptable Use</h3>
              <p>You agree not to: use the Service for any unlawful purpose or in violation of any applicable law; upload or transmit malicious code, viruses, or harmful data; attempt to gain unauthorized access to the Service, other accounts, or our systems; interfere with or disrupt the Service or its infrastructure; resell, sublicense, or redistribute the Service without our written consent; use the Service to store or process data you do not have a lawful basis to process; enter special-category personal data (including health, biometric, or racial/ethnic data) about your clients unless you have a specific lawful basis and have notified us in advance; use automated tools (bots, scrapers) to access the Service except through our published APIs; or use the Service to harass, abuse, or harm any person, including by using AI Outputs to manipulate or coerce a client.</p>
              <p>We reserve the right to suspend or terminate your account for violations of these terms, with notice where practicable.</p>

              <h3>7. Intellectual Property</h3>
              <p>The Service, including its design, code, features, documentation, branding, archetype library, scoring methodology, and all related intellectual property, is owned by Maniac Digital, LLC. You may not copy, modify, distribute, or create derivative works based on the Service without our written permission.</p>
              <p>The Retayned name, logo, "Rai," and related marks are trademarks of Maniac Digital, LLC. You may not use our trademarks without prior written consent.</p>

              <h3>8. Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, Retayned and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of revenue, lost profits, loss of clients, loss of data, or business interruption, arising out of or related to your use of the Service — whether based on warranty, contract, tort, or any other legal theory, even if we have been advised of the possibility of such damages.</p>
              <p>Our total aggregate liability for all claims arising out of or related to the Service shall not exceed the greater of (a) the total amount you paid to us in the twelve (12) months preceding the claim, or (b) one hundred U.S. dollars ($100).</p>
              <p>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.</p>

              <h3>9. Disclaimer of Warranties</h3>
              <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or secure; that AI Outputs will be accurate, reliable, or suitable for your needs; that any defects will be corrected; or that the Service will meet your specific requirements or expectations.</p>

              <h3>10. Indemnification</h3>
              <p>You agree to indemnify, defend, and hold harmless Retayned and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to: your use of the Service; Your Data or your violation of any third party's rights (including claims brought by your clients); your violation of the representations in Section 3; your violation of these Terms; or any actions you take based on AI Outputs.</p>

              <h3>11. Enterprise Product</h3>
              <p>Retayned offers a separate Enterprise product with additional access surfaces, including a managed agent API. Use of the Enterprise product is governed by a separate agreement that may supersede or supplement these Terms. These Terms govern the self-serve Service unless an Enterprise agreement is in effect.</p>

              <h3>12. Termination</h3>
              <p>Either party may terminate these Terms at any time. You may terminate by canceling your subscription and deleting your account. We may terminate or suspend your access to the Service immediately, without prior notice, for conduct that we determine violates these Terms, is harmful to other users or the Service, or is otherwise objectionable.</p>
              <p>Upon termination, your right to use the Service ceases immediately. Sections that by their nature should survive termination — including ownership, your representations in Section 3, warranty disclaimers, indemnification, and limitation of liability — shall survive.</p>

              <h3>13. Dispute Resolution</h3>
              <p>These Terms are governed by the laws of the District of Columbia, United States, without regard to conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration administered in Washington, DC, except that either party may seek injunctive relief in any court of competent jurisdiction. You agree to resolve disputes on an individual basis and waive any right to participate in a class action.</p>

              <h3>14. Changes to These Terms</h3>
              <p>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on the Service, sending an email to your registered address, or through an in-app notification. Your continued use of the Service after changes take effect constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service.</p>

              <h3>15. General Provisions</h3>
              <p><strong>Entire Agreement.</strong> These Terms, together with the Privacy Policy and any applicable Data Processing Addendum or Enterprise agreement, constitute the entire agreement between you and Retayned regarding the Service.</p>
              <p><strong>Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
              <p><strong>Waiver.</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.</p>
              <p><strong>Assignment.</strong> You may not assign your rights under these Terms without our consent. We may assign our rights at any time without notice.</p>

              <h3>16. Contact Us</h3>
              <p>If you have questions about these Terms, contact us at:</p>
              <p><strong>legal@retayned.com</strong><br />Maniac Digital, LLC<br />Washington, DC, United States</p>
            </div>
          </div>
        </div>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PLATFORM — one page linking to all six feature pages
// ═══════════════════════════════════════════════════════════════
const PLATFORM_FEATURES = [
  { id: "feature-today", label: "Today", headline: "One page. Every priority.", sub: "Your Today tab knows which clients need you most — right now. Tasks are sorted by an invisible priority engine that weighs relationship health against business value." },
  { id: "feature-scoring", label: "Retention Score", headline: "A number that means something.", sub: "12 dimensions. 20 combination signals. Health check modifiers. Every client gets a Retention Score from 1–99 that tells you exactly where the relationship stands." },
  { id: "feature-health", label: "Health Checks", headline: "Five questions. Two minutes. The truth.", sub: "Regular check-ins that detect drift before it becomes damage. Your answers blend directly into the Retention Score — bad news moves the number immediately." },
  { id: "feature-rai", label: "Talk to Rai", headline: "She writes the words you need when it matters most.", sub: "Rai is an AI advisor calibrated to your specific relationships. When you don't know what to say, Rai gives you the script." },
  { id: "feature-rolodex", label: "Rolodex", headline: "Your pipeline is forward-looking.", sub: "Former clients aren't dead relationships — they're future revenue. The Rolodex tracks who left, how it ended, and whether they'd come back." },
  { id: "feature-referrals", label: "Referrals", headline: "Your best clients send you their friends.", sub: "Retayned tracks referral readiness based on loyalty, trust, and relationship depth. When a client is ready to refer, the system knows before you do." },
];

function Platform({ setPage }) {
  const [activeFeat, setActiveFeat] = useState(0);

  // 12 dimensions used across the scoring engine
  const dims = [
    { name: "Trust", weight: "15%" },
    { name: "Loyalty", weight: "15%" },
    { name: "Expectations", weight: "15%" },
    { name: "Grace", weight: "15%" },
    { name: "Communication", weight: "5%" },
    { name: "Responsiveness", weight: "5%" },
    { name: "Tone", weight: "5%" },
    { name: "Sentiment", weight: "5%" },
    { name: "Engagement", weight: "5%" },
    { name: "Alignment", weight: "5%" },
    { name: "Stability", weight: "5%" },
    { name: "Depth", weight: "5%" },
  ];

  // Combination signal examples
  const combos = [
    { t: "Silent Satisfaction", d: "High trust + low communication — content but pulling away." },
    { t: "Delegation Drift", d: "Handoffs increasing + engagement dropping — champion is distancing." },
    { t: "Transactional Freeze", d: "Grace low + responsiveness normal — work continues, warmth is gone." },
    { t: "Budget Bloom", d: "Alignment rising + depth rising — expansion window is open." },
    { t: "Vague Positivity", d: "Tone neutral + engagement dropping — the \"looks good\" slow fade." },
    { t: "Champion Shift", d: "Depth dropping + new stakeholder — relationship has to be rebuilt." },
  ];

  const pf = PLATFORM_FEATURES[activeFeat];

  return (
    <div>
      <RetPageStyles />
      <style>{`
        .plat-tabs-wrap { display: flex; justify-content: center; width: 100%; }
        .plat-tabs {
          display: inline-flex; gap: 4px; padding: 5px;
          background: #F5ECD8; border-radius: 100px;
          box-shadow: inset 0 0 0 1px rgba(28, 50, 36, 0.04);
          max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch;
        }
        .plat-tab {
          padding: 8px 18px; border-radius: 100px; border: none;
          font-family: inherit; font-size: 13.5px; font-weight: 600;
          color: ${C.textSec}; background: transparent; cursor: pointer;
          transition: all 0.2s ease; white-space: nowrap; flex: 0 0 auto;
        }
        .plat-tab:hover { color: ${C.text}; }
        .plat-tab-active {
          background: #FAFAF7; color: ${C.text}; font-weight: 700;
          box-shadow: 0 2px 8px rgba(28, 50, 36, 0.08);
        }

        .plat-feat-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center; margin-top: 48px;
        }
        .plat-feat-body h3 {
          font-size: clamp(26px, 3vw, 38px); font-weight: 900;
          letter-spacing: -0.03em; line-height: 1.1;
          color: ${C.text}; margin: 12px 0 16px;
        }
        .plat-feat-body p {
          font-size: 16px; color: ${C.textSec}; line-height: 1.65;
          margin: 0 0 24px;
        }
        .plat-feat-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: ${C.btn};
        }

        .plat-mockup {
          background: #fff; border-radius: 20px; padding: 22px;
          box-shadow: 0 20px 60px rgba(60,40,10,0.10), 0 4px 12px rgba(60,40,10,0.04);
          border: 1px solid ${C.borderLight};
          min-height: 320px;
        }

        .plat-combo-card {
          background: #fff; border-radius: 14px; padding: 20px 22px;
          border: 1px solid ${C.borderLight};
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .plat-combo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(60,40,10,0.08);
        }

        .plat-dims-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }
        .plat-dim-chip {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px; background: #fff; border-radius: 10px;
          border: 1px solid ${C.borderLight}; font-size: 13px;
        }
        .plat-dim-name { color: ${C.text}; font-weight: 600; }
        .plat-dim-weight { color: ${C.primary}; font-weight: 700; font-variant-numeric: tabular-nums; }

        /* Two surfaces section */
        .plat-surfaces {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
          max-width: 900px; margin: 0 auto;
        }

        @media (max-width: 900px) {
          .plat-feat-grid { grid-template-columns: 1fr; gap: 32px; }
          .plat-surfaces { grid-template-columns: 1fr; }
        }
      `}</style>

      <RetHero
        eyebrow="The Platform"
        h1={<>Your clients won't know Retayned exists. <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: C.primary }}>They'll just stay.</span></>}
        sub="Relationship intelligence, health monitoring, and pipeline management in one system. Our AI isn't just smart — it's emotionally intelligent."
        primaryCta="Start Free Trial"
        primaryAction="signup"
        secondaryCta="See pricing"
        secondaryAction="pricing"
        setPage={setPage}
      />

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="rightCrest" />

      {/* Interactive feature explorer */}
      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Six features, one system</div>
            <h2 className="ret-h2">Everything you need to keep a client.</h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>Built to work together from the moment you sign in. Click through to explore each one.</p>
          </div>

          <div className="plat-tabs-wrap">
            <div className="plat-tabs">
              {PLATFORM_FEATURES.map((f, i) => (
                <button
                  key={f.id}
                  className={"plat-tab" + (i === activeFeat ? " plat-tab-active" : "")}
                  onClick={() => setActiveFeat(i)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="plat-feat-grid">
            <div className="plat-feat-body">
              <div className="plat-feat-label">{pf.label}</div>
              <h3>{pf.headline}</h3>
              <p>{pf.sub}</p>
              <div className="ret-cta-row ret-cta-row-left" style={{ marginTop: 0, justifyContent: "flex-start" }}>
                <button className="ret-btn-primary" onClick={() => setPage(pf.id)}>Learn more</button>
              </div>
            </div>
            <div className="plat-mockup">
              {pf.id === "feature-today" && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, textTransform: "uppercase", marginBottom: 14 }}>Today · 5 tasks</div>
                  {[
                    { cat: "URGENT", title: "Sarah K — Response time doubled this week", score: 42, color: C.danger, bg: C.dangerBg },
                    { cat: "DEEPEN", title: "Marcus L — Referral readiness spiking", score: 87, color: C.primary, bg: C.primarySoft },
                    { cat: "NURTURE", title: "Priya M — Competitor mention on call", score: 68, color: C.warning, bg: C.warningBg },
                    { cat: "PROACTIVE", title: "James R — Strong Q3, right moment to ask", score: 91, color: C.btn, bg: "#EDE4F8" },
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#FAFAF7", borderRadius: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", padding: "4px 7px", borderRadius: 4, background: t.bg, color: t.color, minWidth: 64, textAlign: "center" }}>{t.cat}</span>
                      <span style={{ fontSize: 13, color: C.text, fontWeight: 600, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: t.color, background: t.bg, padding: "4px 8px", borderRadius: 5 }}>{t.score}</span>
                    </div>
                  ))}
                </div>
              )}
              {pf.id === "feature-scoring" && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, textTransform: "uppercase", marginBottom: 14 }}>Retention Score · Sarah K</div>
                  <div style={{ textAlign: "center", padding: "24px 0", marginBottom: 18, background: C.dangerBg, borderRadius: 14 }}>
                    <div style={{ fontSize: 72, fontWeight: 900, color: C.danger, letterSpacing: "-0.04em", lineHeight: 1 }}>42</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.danger, marginTop: 4, letterSpacing: "-0.01em" }}>At Risk</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: C.textMuted, textTransform: "uppercase", marginBottom: 10 }}>Signals detected</div>
                  {[
                    { s: "Silent Satisfaction", v: "-8" },
                    { s: "Delegation Drift", v: "-6" },
                    { s: "Vague Positivity", v: "-4" },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#FAFAF7", borderRadius: 8, marginBottom: 6, fontSize: 13 }}>
                      <span style={{ color: C.text, fontWeight: 600 }}>{c.s}</span>
                      <span style={{ color: C.danger, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{c.v}</span>
                    </div>
                  ))}
                </div>
              )}
              {pf.id === "feature-health" && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, textTransform: "uppercase", marginBottom: 14 }}>Health Check · James R · 1 of 5</div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
                    {[1,0,0,0,0].map((v,i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: v ? C.primary : C.borderLight }} />)}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 16, lineHeight: 1.3, letterSpacing: "-0.015em" }}>Has this client's communication pattern changed recently?</div>
                  {[
                    "Same as always — no shift in how we talk",
                    "Slightly different but could be nothing",
                    "Noticeably different from normal",
                    "Something has clearly changed",
                  ].map((o,i) => (
                    <div key={i} style={{ padding: "11px 14px", background: i===0?C.primarySoft:"#FAFAF7", border: "1.5px solid "+(i===0?C.primary:C.borderLight), borderRadius: 10, marginBottom: 6, fontSize: 13, color: i===0?C.primary:C.textSec, fontWeight: i===0?600:500 }}>{o}</div>
                  ))}
                </div>
              )}
              {pf.id === "feature-rai" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.btn, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>R</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Rai</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>Advising on Sarah K</div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px", background: "#FAFAF7", borderLeft: "3px solid "+C.btn, borderRadius: 6, marginBottom: 12, fontSize: 13.5, color: C.text, lineHeight: 1.6 }}>
                    Sarah's a Direct-Communication archetype. Don't soften this. Try:
                  </div>
                  <div style={{ padding: "14px 16px", background: "#fff", border: "1px solid "+C.borderLight, borderRadius: 10, fontSize: 13.5, color: C.text, lineHeight: 1.7, fontStyle: "italic" }}>
                    "Sarah — I want to name something I've noticed. Your response rhythm with us has shifted over the last three weeks. Rather than guess, I'd rather ask directly: is there something about the work that isn't landing?"
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button style={{ padding: "8px 14px", fontSize: 12, fontWeight: 700, background: C.btn, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Send as-is</button>
                    <button style={{ padding: "8px 14px", fontSize: 12, fontWeight: 700, background: "transparent", color: C.btn, border: "1.5px solid "+C.btn, borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Edit first</button>
                  </div>
                </div>
              )}
              {pf.id === "feature-rolodex" && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, textTransform: "uppercase", marginBottom: 14 }}>Rolodex · 14 former clients</div>
                  {[
                    { name: "Dana Ortiz", endedMonth: "8 mo ago", status: "Window open", statusColor: C.success, note: "New Head of Growth at previous company" },
                    { name: "Amit Shah", endedMonth: "1 yr ago", status: "Watching", statusColor: C.warning, note: "Quiet since ending — no change yet" },
                    { name: "Jen Kwak", endedMonth: "3 mo ago", status: "Not yet", statusColor: C.textMuted, note: "Ended on strong note — too soon" },
                  ].map((c, i) => (
                    <div key={i} style={{ padding: "12px 14px", background: "#FAFAF7", borderRadius: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{c.name}</span>
                        <span style={{ fontSize: 11, color: c.statusColor, fontWeight: 700 }}>{c.status}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 4 }}>Ended {c.endedMonth}</div>
                      <div style={{ fontSize: 12, color: C.textSec, fontStyle: "italic", lineHeight: 1.5 }}>{c.note}</div>
                    </div>
                  ))}
                </div>
              )}
              {pf.id === "feature-referrals" && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, textTransform: "uppercase", marginBottom: 14 }}>Referral readiness · Top 3</div>
                  {[
                    { name: "Marcus L", readiness: 92, loyalty: 95, trust: 90, depth: 91 },
                    { name: "Elena P", readiness: 88, loyalty: 90, trust: 85, depth: 89 },
                    { name: "Tomás R", readiness: 84, loyalty: 88, trust: 82, depth: 82 },
                  ].map((c, i) => (
                    <div key={i} style={{ padding: "14px 16px", background: "#FAFAF7", borderRadius: 10, marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{c.name}</span>
                        <span style={{ fontSize: 14, fontWeight: 900, color: C.primary, letterSpacing: "-0.02em" }}>{c.readiness}</span>
                      </div>
                      <div style={{ display: "flex", gap: 14, fontSize: 11, color: C.textMuted }}>
                        <span>Loyalty <strong style={{ color: C.text, fontWeight: 700 }}>{c.loyalty}</strong></span>
                        <span>Trust <strong style={{ color: C.text, fontWeight: 700 }}>{c.trust}</strong></span>
                        <span>Depth <strong style={{ color: C.text, fontWeight: 700 }}>{c.depth}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to={C.bg} variant="leftCrest" />

      {/* Combination signals — the math */}
      <section className="ret-section ret-bg-light r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">The math behind the magic</div>
            <h2 className="ret-h2">A scoring engine built on years of client research.</h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>Twelve dimensions. Twenty combinations. Every pattern.</p>
          </div>

          {/* 12 dimensions */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>12 dimensions · weighted</div>
            <div className="plat-dims-grid">
              {dims.map(d => (
                <div key={d.name} className="plat-dim-chip">
                  <span className="plat-dim-name">{d.name}</span>
                  <span className="plat-dim-weight">{d.weight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6 of 20 combination signals */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: C.textMuted, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>20 combination signals · 6 shown</div>
            <div className="ret-grid-3">
              {combos.map((c, i) => (
                <div key={i} className="plat-combo-card">
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>Signal · {String(i+1).padStart(2, '0')}</div>
                  <h4 style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: "0 0 8px", letterSpacing: "-0.015em" }}>{c.t}</h4>
                  <p style={{ fontSize: 13.5, color: C.textSec, lineHeight: 1.55, margin: 0 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#EAE4D6" variant="dome" />

      {/* Two surfaces narrative */}
      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">How it ships</div>
            <h2 className="ret-h2">Two surfaces, one brain.</h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>The same scoring engine powers a multi-seat app for humans and a clean API for agents. Your team works from the same graph as your automation.</p>
          </div>

          <div className="plat-surfaces">
            <div className="ret-card">
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>For your team</div>
              <h3 className="ret-h3">A multi-seat app for account managers.</h3>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, margin: 0 }}>Every client scored, ranked, and triaged daily. Health Checks run automatically. Rai surfaces the conversations that need a human, and drafts the ones that don't.</p>
            </div>
            <div className="ret-card">
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>For your agents</div>
              <h3 className="ret-h3">MCP tools and REST endpoints.</h3>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, margin: 0 }}>Point your agent stack at Retayned and every client in your book is instantly available with full relationship context. Agents handle the 80%. Humans handle the 20% that matters most.</p>
            </div>
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to="#F2EEE8" variant="default" />

      {/* Feature grid */}
      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Explore by feature</div>
            <h2 className="ret-h2">Every piece of the system.</h2>
          </div>
          <div className="ret-grid-2">
            {PLATFORM_FEATURES.map(f => (
              <div key={f.id} className="ret-card ret-card-hover" style={{ cursor: "pointer" }} onClick={() => setPage(f.id)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <h3 className="ret-h3">{f.headline}</h3>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.6, marginBottom: 14 }}>{f.sub}</p>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.btn }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetFinalCTA
        h2="Every feature, every relationship."
        sub="One plan. $19.99/month plus $1 per active client."
        setPage={setPage}
      />

      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AUDIENCE PAGES — shared template
// ═══════════════════════════════════════════════════════════════
function AudiencePage({ data, setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow={data.eyebrow}
        h1={data.h1}
        sub={data.heroSub}
        primaryCta={data.primaryCta || "Start Free Trial"}
        primaryAction={data.primaryAction || "signup"}
        secondaryCta={data.secondaryCta}
        secondaryAction={data.secondaryAction}
        fine={data.fine}
        setPage={setPage}
      />
      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="dome" />
      {data.graphic && (
        <section className="ret-section ret-bg-beige r-full-bleed" style={{ paddingBottom: 56 }}>
          <div className="ret-section-inner" style={{ textAlign: "center" }}>
            {data.graphic}
          </div>
        </section>
      )}
      <RetCurve from="#EAE4D6" to={C.bg} variant="rightCrest" />
      <section className="ret-section ret-bg-light r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">{data.realityEyebrow}</div>
            <h2 className="ret-h2">{data.realityH2}</h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>{data.realitySub}</p>
          </div>
          <div className="ret-grid-3">
            {data.cards.map((card, i) => (
              <div key={i} className="ret-card ret-card-hover">
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{card.cat}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{card.q}</h3>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{card.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RetCurve from={C.bg} to="#F2EEE8" variant="default" />
      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner" style={{ maxWidth: 640, textAlign: "center" }}>
          <div className="ret-eyebrow">One plan. Every feature.</div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 8, marginTop: 8 }}>
            <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: "-0.04em", color: C.text, lineHeight: 1 }}>$19.99</span>
            <span style={{ fontSize: 17, color: C.textMuted, fontWeight: 600 }}>/mo</span>
          </div>
          <div style={{ fontSize: 16, color: C.textSec, marginBottom: 20 }}>+ <span style={{ fontWeight: 700, color: C.text }}>$1 per client</span></div>
          <p style={{ fontSize: 15, color: C.textSec, marginBottom: 28, lineHeight: 1.5, maxWidth: 460, margin: "0 auto 28px" }}>Solve your business's most consequential problem for less than a Netflix subscription.</p>
          <div className="ret-cta-row">
            <button className="ret-btn-primary" onClick={() => setPage("signup")}>Start Free Trial</button>
          </div>
          <p className="ret-hero-fine">14-day free trial. Cancel anytime.</p>
        </div>
      </section>
      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="leftCrest" />
      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <h2 className="ret-h2">{data.featuresH2}</h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>{data.featuresSub}</p>
          </div>
          <div className="ret-grid-3">
            {data.features.map((f, i) => (
              <div key={i} className="ret-card">
                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <RetCurve from="#EAE4D6" to="#F2EEE8" variant="rightCrest" />
      <RetFinalCTA
        h2={data.finalH2}
        sub={data.finalSub}
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

function Freelancers({ setPage }) {
  const data = {
    eyebrow: "For freelancers & consultants",
    h1: <>The CRM that spots <span className="ret-strike-wrap"><span className="ret-strike">what you miss</span><span className="ret-caveat">everything</span></span>.</>,
    heroSub: "You're a team of one. You can't be on every Slack thread, every email, every hint of drift. Retayned watches the whole book while you focus on the work.",
    fine: "$19.99/mo + $1 per client · 14-day free trial · Cancel anytime",
    secondaryCta: "See the platform",
    secondaryAction: "platform",
    graphic: <FreelancerNetworkGraphic />,
    realityEyebrow: "The freelancer reality",
    realityH2: "You carry 30 clients in your head.",
    realitySub: "You remember Rachel's daughter just started kindergarten. You remember James hates phone calls before 11. By Thursday, you've been in 14 Zooms, written 3 proposals, and three of those details have gone missing. You're not forgetting because you don't care. You're forgetting because no brain can hold 30 relationships at that fidelity.",
    cards: [
      { cat: "Velocity", q: "You can't remember the last time you talked to half your book.", a: "Retayned tracks velocity automatically. When a relationship cools, you'll know." },
      { cat: "Drift", q: "The client you lost last month — you could have seen it coming.", a: "Retention Score weighs 12 dimensions plus 20 combination signals. You'll see drift before it's damage." },
      { cat: "Overhead", q: "You don't have time for a \"CRM system.\"", a: "Retayned isn't a system to feed. It tells you what to do. You do it." },
      { cat: "Scripts", q: "You know what to say — but not when, or how, or to who.", a: "Talk to Rai. She reads the relationship and writes the opening line." },
      { cat: "Outreach", q: "You send the same 'just checking in' email to everyone.", a: "Rai writes a different opening for each relationship — based on how they actually communicate." },
      { cat: "Churn", q: "You don't know who's going to renew until they don't.", a: "Retention Score tells you where every client stands, updated weekly. Surprise churn becomes expected drift." },
    ],
    featuresH2: "Built for a solo practice.",
    featuresSub: "Everything Retayned does, minus the team stuff you don't need yet.",
    features: [
      { label: "Today", desc: "One screen tells you which client needs you most." },
      { label: "Retention Score", desc: "A number from 1–99 that tells you where every relationship stands." },
      { label: "Health Checks", desc: "Five questions, two minutes. Catch drift before it's a crisis." },
      { label: "Talk to Rai", desc: "AI advisor. The exact words to say, when you need them." },
      { label: "Rolodex", desc: "Former clients aren't dead. They're re-engagement opportunities." },
      { label: "Referrals", desc: "Know who's ready to refer before they know it themselves." },
    ],
    finalH2: "The clients you lose are savable. Start saving them.",
    finalSub: "See the signal. Get the script. Keep the client.",
  };
  return <AudiencePage data={data} setPage={setPage} />;
}

function Agencies({ setPage }) {
  const data = {
    eyebrow: "For agencies · 50+ clients · Teams",
    h1: <>Your team's memory, <span className="ret-strike-wrap"><span className="ret-strike">in their heads</span><span className="ret-caveat">on one system</span></span>.</>,
    heroSub: "When an account manager leaves, they take 40 client relationships with them. Retayned holds the institutional knowledge — so your team doesn't have to.",
    fine: "$19.99/mo + $1 per client · Unlimited team members · No per-seat fees",
    secondaryCta: "Talk to us about teams",
    secondaryAction: "contact",
    graphic: <AgencyNetworkGraphic />,
    realityEyebrow: "The agency reality",
    realityH2: "Your best account manager handles 20 clients.",
    realitySub: "She remembers which ones are going through a re-org. Which ones just had a new baby. Which ones hate Zoom. Which ones had a bad Q3 and are watching spend like a hawk. Then she leaves. All of that goes with her.",
    cards: [
      { cat: "Access", q: "Shared book", a: "Every team member sees every client. Every score, every signal, every archetype. Always current." },
      { cat: "Handoff", q: "Handoff-ready", a: "New AM takes over 30 accounts on Monday. They know every relationship by Wednesday." },
      { cat: "Voice", q: "Communication style", a: "Rai knows how each client prefers to be approached. Your team doesn't have to re-learn 40 relationships." },
      { cat: "Network", q: "Relationship web", a: "Every stakeholder mapped — not just your primary contact. When the decision-maker changes, you don't start over." },
      { cat: "Trail", q: "Decision trail", a: "Every commitment, scope change, and promise logged against the account. New AMs inherit what was agreed." },
      { cat: "Billing", q: "No per-seat fees", a: "Unlimited team members on the single plan. Add anyone in the agency — no IT approvals." },
    ],
    featuresH2: "Everything scales with your book.",
    featuresSub: "Same features as the self-serve plan. Priced per client — pay for what you cover.",
    features: [
      { label: "Today (team view)", desc: "Filter by AM, by vertical, by account tier. Everyone sees their own priorities." },
      { label: "Portfolio scoring", desc: "Every client scored nightly. Trend lines, drift alerts, archetype tracking." },
      { label: "Health Checks", desc: "Team-wide cadence. See which accounts are overdue across the whole book." },
      { label: "Talk to Rai", desc: "Your whole team shares Rai's knowledge of every client relationship." },
      { label: "Shared Rolodex", desc: "Former clients aren't one AM's problem. Re-engagement becomes a team motion." },
      { label: "Referrals", desc: "See referral readiness across the book. Know which clients to ask, and when." },
    ],
    finalH2: "Your AMs are smart. Give them a system worth their time.",
    finalSub: "Start free. Add your team. Scale with your book.",
  };
  return <AudiencePage data={data} setPage={setPage} />;
}

function Enterprise({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Retayned Enterprise · Early access"
        eyebrowStyle="purple"
        h1="AMaaS: Account management as a service."
        sub="Your top 50 accounts get a human account manager who knows them by name. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface — with the same retention intelligence powering both."
        primaryCta="Request Early Access"
        primaryAction="contact"
        secondaryCta={null}
        fine="Onboarding 3 partners per quarter · Custom pricing based on portfolio size"
        setPage={setPage}
      />
      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="leftCrest" />
      <section className="ret-section ret-bg-beige r-full-bleed" style={{ paddingBottom: 56 }}>
        <div className="ret-section-inner" style={{ textAlign: "center" }}>
          <EnterpriseNetworkGraphic />
        </div>
      </section>
      <RetCurve from="#EAE4D6" to={C.bg} variant="rightCrest" />
      <section className="ret-section ret-bg-light r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow ret-eyebrow-purple">The architecture</div>
            <h2 className="ret-h2">Two surfaces, one brain.</h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>The same scoring engine, archetype detection, and action layer — surfaced to your team through an app, and to your agents through an API. Both work from the same graph.</p>
          </div>
          <div className="ret-grid-2" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="ret-card">
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>For your team</div>
              <h3 className="ret-h3">A multi-seat app built for account managers.</h3>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, margin: 0 }}>Every client scored, ranked, and triaged daily. Health Checks run automatically. Rai surfaces the conversations that need a human, and drafts the ones that don't. Manager dashboards roll up retention risk across your entire book.</p>
            </div>
            <div className="ret-card">
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12 }}>For your agents</div>
              <h3 className="ret-h3">The same intelligence, exposed as MCP tools and REST endpoints.</h3>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, margin: 0 }}>Point your agent stack at Retayned and every client in your book is instantly available with full relationship context. Agents handle the 80%. Humans handle the 20% that matters most. Both work from the same graph.</p>
            </div>
          </div>
        </div>
      </section>
      <RetCurve from={C.bg} to={C.primaryDeep} variant="rightCrest" />
      <section className="ret-section ret-bg-deep r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow ret-eyebrow-light">RaiS · Live view</div>
            <h2 className="ret-h2">Every client. Scored, flagged, and acted on <span style={{ color: C.primaryLight }}>— automatically.</span></h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>Retayned connects to your stack overnight, scores your entire portfolio by morning, and delivers prioritized tasks — including pre-drafted outreach — to your team or your agents.</p>
          </div>
          <div className="ret-grid-3" style={{ maxWidth: 920, margin: "0 auto" }}>
            {[
              { label: "Scored today", val: "1,247", sub: "All current" },
              { label: "At-risk flagged", val: "38", sub: "+4 from yesterday" },
              { label: "Tasks generated", val: "92", sub: "28 emails ready to send" },
              { label: "Archetypes active", val: "9", sub: "Velocity decay trending" },
              { label: "Onboarding", val: "3", sub: "Partners per quarter" },
              { label: "Response time", val: "<4h", sub: "For urgent flags" },
            ].map(m => (
              <div key={m.label} className="ret-card-deep">
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>{m.label}</div>
                <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.035em", color: "#fff", marginBottom: 4 }}>{m.val}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div className="ret-cta-row" style={{ marginTop: 48 }}>
            <button className="ret-btn-onDark" onClick={() => setPage("contact")}>Request Early Access</button>
          </div>
        </div>
      </section>
      <RetCurve from={C.primaryDeep} to="#F2EEE8" variant="dome" />
      <RetFinalCTA
        h2="Your AMs are smart. Give them a system worth their time."
        sub="Start free. Add your team. Scale with your book."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FEATURE PAGES — one template, six data definitions
// ═══════════════════════════════════════════════════════════════
function FeatureToday({ setPage }) {
  const otherFeatures = PLATFORM_FEATURES.filter(f => f.id !== "feature-today").slice(0, 3);
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Today"
        h1="Your highest-value move is always first."
        sub="Today tells you who needs you most — right now. Tasks are sorted by an invisible priority engine that weighs relationship health against business value."
        primaryCta="Start Free Trial"
        primaryAction="signup"
        secondaryCta="See all features"
        secondaryAction="platform"
        setPage={setPage}
      />

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="default" />
      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">How it works</div>
            <h2 className="ret-h2">The priority engine, in three moves.</h2>
            <p className="ret-sub" style={{ margin: "0 auto" }}>Today isn't a to-do list. It's a ranked ladder of what to do next — calculated every night, updated every morning.</p>
          </div>
          <div className="ret-grid-3">
            {[
              { h: "Score the relationships", p: "Every client's Retention Score updates overnight based on Health Checks, velocity, billing patterns, and 20 combination signals." },
              { h: "Weigh by impact", p: "A task for a $200/mo client at-risk doesn't outrank an $8,000/mo green client who's ready to refer. Priority factors in revenue, tenure, and upside." },
              { h: "Surface the one action", p: "You open Retayned in the morning and see the move that matters most. Not fifty tasks. The one task that will save or grow the most revenue today." },
            ].map((s, i) => (
              <div key={i} className="ret-card">
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>Step {i + 1}</div>
                <h3 className="ret-h3">{s.h}</h3>
                <p style={{ fontSize: 14.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to={C.bg} variant="dome" />
      <section className="ret-section ret-bg-light r-full-bleed" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="ret-section-inner" style={{ maxWidth: 720 }}>
          <div style={{ background: C.card, borderRadius: 20, border: "1px solid " + C.borderLight, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid " + C.borderLight }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Tuesday · October 14</div>
                <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>Your Today</div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 100, background: C.primarySoft, fontSize: 11, fontWeight: 700, color: C.primary }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.primary }} />5 priorities
              </div>
            </div>
            {[
              { rank: 1, text: "Call Rachel at Broadleaf", meta: "Score dropped 78 → 65 · 11 days since contact", score: 65, scoreColor: C.danger, highlight: true },
              { rank: 2, text: "Complete Foxglove Health Check", meta: "12 days overdue · Last drift: moderate", score: 42, scoreColor: C.danger },
              { rank: 3, text: "Review Slack for client messages", meta: "3 channels with unread · mixed priority", score: null },
              { rank: 4, text: "Review Oakline Q1 numbers", meta: "Upcoming QBR in 6 days", score: 73, scoreColor: C.warning },
              { rank: 5, text: "Plan Northvane anniversary", meta: "Referral-ready · loyalty score 91", score: 91, scoreColor: C.success },
            ].map((t, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px",
                borderBottom: i < 4 ? "1px solid " + C.borderLight : "none",
                background: t.highlight ? C.primarySoft + "40" : "transparent",
                borderRadius: t.highlight ? 10 : 0,
                margin: t.highlight ? "0 -14px" : "0",
              }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, border: "1.5px solid " + C.borderLight, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.textMuted }}>{t.rank}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text, marginBottom: 3 }}>{t.text}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>{t.meta}</div>
                </div>
                {t.score !== null && (
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.scoreColor + "18", border: "1.5px solid " + t.scoreColor + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: t.scoreColor, flexShrink: 0 }}>{t.score}</div>
                )}
              </div>
            ))}
            <div style={{ marginTop: 16, padding: "12px 14px", background: C.primarySoft, borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" strokeLinejoin="round" fill="none"/></svg>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>Rai's note</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55 }}>Broadleaf dropped into "No Room to Operate." Don't email. Call. Lead with the specific concern — her silence is the answer.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="leftRise" />
      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner" style={{ maxWidth: 720, textAlign: "center" }}>
          <h2 className="ret-h2">Every other CRM makes you decide.</h2>
          <p className="ret-sub" style={{ margin: "0 auto" }}>Most systems show you tasks in the order they were created, or by due date, or alphabetically. That's not help. That's filing.<br /><br />Today ranks by <strong style={{ color: C.text }}>what moves your book forward</strong>. The rules are invisible. The result is one screen that tells you exactly where to start.</p>
        </div>
      </section>

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="rightRise" />
      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Related features</div>
            <h2 className="ret-h2">Better together.</h2>
          </div>
          <div className="ret-grid-3">
            {otherFeatures.map(f => (
              <div key={f.id} className="ret-card ret-card-hover" style={{ cursor: "pointer" }} onClick={() => setPage(f.id)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{f.headline}</h3>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{f.sub}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: C.btn }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to="#F2EEE8" variant="leftRise" />
      <RetFinalCTA
        h2="Know what to do first. Every single day."
        sub="Start free. See your first prioritized Today in 60 seconds."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

function FeatureScoring({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Retention Score"
        h1="A number that means something."
        sub="Every client gets a score from 1–99. It tells you exactly where the relationship stands — not where you hope it is."
        primaryCta="Start Free Trial"
        primaryAction="signup"
        secondaryCta="See all features"
        secondaryAction="platform"
        setPage={setPage}
      />

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="rightRise" />

      {/* How the score is built */}
      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">How it works</div>
            <h2 className="ret-h2">How the score is built.</h2>
            <p className="ret-sub" style={{ maxWidth: 700, marginTop: 12 }}>
              The Retention Score isn't a gut feeling. It's the blended output of four weighted inputs, updated every time new information lands.
            </p>
          </div>
          <div className="ret-grid-2">
            {[
              { h: "12 weighted dimensions", p: "Trust, loyalty, expectations, grace — and eight more. Each client is scored on all twelve. The four big ones carry 15% weight; the other eight carry 5%." },
              { h: "20 combination signals", p: "When specific pairs of low dimensions show up together — like low trust plus low grace — a combination fires. \"No Room to Operate.\" \"Ice Wall.\" \"Silent Exit.\" Patterns no single metric catches." },
              { h: "Health Check modifier", p: "Your regular check-ins blend in at 80/20. Bad news from a Health Check moves the score immediately." },
              { h: "Profile context", p: "Revenue concentration, LTV, and tenure act as a multiplier on the Today page's sort — so the score you see reflects business impact, not just relationship state." },
            ].map((s, i) => (
              <div key={i} className="ret-card">
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>0{i + 1}</div>
                <h3 className="ret-h3">{s.h}</h3>
                <p style={{ fontSize: 14.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to={C.bg} variant="leftRise" />

      {/* Mockup: Broadleaf score card */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 720, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", marginBottom: 28 }}>
              <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                <div style={{ width: 130, height: 130, borderRadius: "50%", background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", border: "4px solid #92400E20", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#92400E", fontFamily: "inherit", lineHeight: 1 }}>67</span>
                  <div style={{ position: "absolute", bottom: -10, background: "#fff", padding: "3px 10px", border: "1px solid #92400E30", borderRadius: 100, fontSize: 10, fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: ".08em" }}>At risk</div>
                </div>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em" }}>Broadleaf Media</div>
                <div style={{ fontSize: 13.5, color: C.textMuted, marginTop: 3 }}>Rachel Chen · Account Lead · 14 months</div>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12.5, color: C.danger, fontWeight: 700 }}>↓ Dropped 11 points in 2 weeks</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Core dimensions</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[["Trust", 6, C.warning], ["Loyalty", 7, C.primaryLight], ["Expectations", 7, C.primaryLight], ["Grace", 5, C.warning]].map(([name, val, color]) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: C.bg, borderRadius: 8, fontSize: 13.5 }}>
                  <span style={{ color: C.textSec, fontWeight: 600 }}>{name}</span>
                  <span style={{ fontWeight: 800, color, fontFamily: "inherit" }}>{val}/10</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Active combinations</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <div style={{ padding: "8px 14px", background: C.danger + "15", borderRadius: 8, fontSize: 12.5, color: C.danger, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.danger }} />
                No Room to Operate
              </div>
              <div style={{ padding: "8px 14px", background: C.warning + "15", borderRadius: 8, fontSize: 12.5, color: C.warning, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.warning }} />
                Ice Wall
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Score bands */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg, paddingTop: 0 }}>
        <div className="ret-section-inner">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
            <h2 className="ret-h2" style={{ marginBottom: 10 }}>Five bands. One truth per client.</h2>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65 }}>Scores aren't abstract. They map to action.</p>
          </div>
          <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { band: "90–99", label: "Thriving", desc: "Don't upsell them. Don't ask for referrals. Leave the relationship alone and let it compound.", bg: C.success + "15", fg: C.success },
              { band: "75–89", label: "Healthy", desc: "Stable. Maintain cadence. Watch for drift without over-correcting.", bg: C.primarySoft, fg: C.primary },
              { band: "55–74", label: "At risk", desc: "The most actionable band. Still salvageable. Move fast.", bg: C.warning + "15", fg: C.warning },
              { band: "30–54", label: "Critical", desc: "Something already broke. Call — don't email. Use Rai's scripts.", bg: C.danger + "12", fg: C.danger },
              { band: "1–29", label: "Exiting", desc: "A \"pause\" is almost always an exit. Plan the offboard. Protect the referral.", bg: "#6B7280" + "15", fg: "#6B7280" },
            ].map(b => (
              <div key={b.band} style={{ display: "flex", gap: 18, alignItems: "center", padding: "16px 20px", background: b.bg, borderRadius: 12 }}>
                <div style={{ flex: "0 0 80px" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: b.fg, fontFamily: "inherit" }}>{b.band}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: b.fg, textTransform: "uppercase", letterSpacing: ".08em" }}>{b.label}</div>
                </div>
                <div style={{ flex: 1, fontSize: 14, color: C.text, lineHeight: 1.55 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="rightRise" />

      {/* Related features */}
      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Related features</div>
            <h2 className="ret-h2">Better together.</h2>
          </div>
          <div className="ret-grid-3">
            {PLATFORM_FEATURES.filter(f => f.id !== "feature-scoring").slice(0, 3).map(f => (
              <div key={f.id} className="ret-card ret-card-hover" style={{ cursor: "pointer" }} onClick={() => setPage(f.id)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{f.headline}</h3>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{f.sub}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: C.btn }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetFinalCTA
        h2="Know exactly where every relationship stands."
        sub="Start free. Your first client is scored in minutes."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

function FeatureHealth({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Health Checks"
        h1="Five questions. Two minutes. The truth."
        sub="Regular check-ins that detect drift before it becomes damage. Your answers blend into the Retention Score immediately — bad news moves the number on impact."
        primaryCta="Start Free Trial"
        primaryAction="signup"
        secondaryCta="See all features"
        secondaryAction="platform"
        setPage={setPage}
      />

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="leftRise" />

      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">How it works</div>
            <h2 className="ret-h2">Why Health Checks work when surveys don't.</h2>
            <p className="ret-sub" style={{ maxWidth: 700, marginTop: 12 }}>
              Traditional NPS asks the client. Health Checks ask you — because you see things they'll never admit in a survey.
            </p>
          </div>
          <div className="ret-grid-3">
            {[
              { h: "Five questions, built for honesty", p: "Not \"how is the relationship?\" — that's too abstract to answer honestly. We ask about specific observable changes: tone, cadence, signals of stress, things that have shifted since baseline." },
              { h: "Cadence that matches reality", p: "Monthly for your critical accounts. Quarterly for your stable ones. Yearly for your thriving. You don't get pinged on a schedule that makes you lie to clear the queue." },
              { h: "Answers blend at 80/20", p: "The Health Check score is 20% of the Retention Score. Not dominant — but enough that one bad check moves the number immediately. Drift shows up in real time." },
            ].map((s, i) => (
              <div key={i} className="ret-card">
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>0{i + 1}</div>
                <h3 className="ret-h3">{s.h}</h3>
                <p style={{ fontSize: 14.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to={C.bg} variant="rightRise" />

      {/* Mockup: Health Check question 2 of 5 */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 520, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Health Check</div>
                <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em" }}>Broadleaf Media</div>
              </div>
              <div style={{ fontSize: 11.5, color: C.textMuted, fontWeight: 600 }}>2 of 5</div>
            </div>

            <div style={{ display: "flex", gap: 5, marginBottom: 20 }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= 2 ? C.primary : C.borderLight }} />)}
            </div>

            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>Has anything changed with how they communicate with you?</p>
            <div style={{ fontSize: 12.5, color: C.textMuted, marginBottom: 14, lineHeight: 1.5 }}>Think response times, channel preference, tone, who's in the thread. Compare against the last 2–3 months.</div>

            {[
              { text: "Nothing — same as always", selected: false },
              { text: "Something minor, could be nothing", selected: false },
              { text: "Noticeably different from before", selected: true },
              { text: "Something has clearly changed", selected: false },
            ].map((opt, i) => (
              <div key={i} style={{
                padding: "13px 16px", borderRadius: 10, marginBottom: 6,
                background: opt.selected ? C.primarySoft : C.bg,
                border: "1.5px solid " + (opt.selected ? C.primary : C.borderLight),
                fontSize: 14, color: opt.selected ? C.primary : C.textSec,
                fontWeight: opt.selected ? 600 : 400,
              }}>
                {opt.text}
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
              <span style={{ fontSize: 12, color: C.textMuted }}>← Back</span>
              <div style={{ padding: "10px 22px", background: C.primary, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 13.5 }}>Next</div>
            </div>
          </div>
        </div>
      </section>

      {/* Honesty section */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg, paddingTop: 0 }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 className="ret-h2" style={{ marginBottom: 14 }}>When the answer is honest, the system works.</h2>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.75 }}>
              A two-minute Health Check that moves the Retention Score tonight is worth more than a 20-question quarterly review you filled out to get it off your plate.
              <br /><br />
              We designed the questions to be answerable in the elevator. <strong style={{ color: C.text }}>The honesty is the whole product.</strong>
            </p>
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="leftRise" />

      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Related features</div>
            <h2 className="ret-h2">Better together.</h2>
          </div>
          <div className="ret-grid-3">
            {PLATFORM_FEATURES.filter(f => f.id !== "feature-health").slice(0, 3).map(f => (
              <div key={f.id} className="ret-card ret-card-hover" style={{ cursor: "pointer" }} onClick={() => setPage(f.id)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{f.headline}</h3>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{f.sub}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: C.btn }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetFinalCTA
        h2="Catch drift before it's damage. Two minutes at a time."
        sub="Start free. Your first Health Check goes live in minutes."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

function FeatureRai({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Talk to Rai"
        h1="She writes the words you need when it matters most."
        sub="Rai is an AI advisor calibrated to your specific relationships. When you don't know what to say — the opening line, the tone, whether to call or email — Rai gives you the script."
        primaryCta="Start Free Trial"
        primaryAction="signup"
        secondaryCta="See all features"
        secondaryAction="platform"
        setPage={setPage}
      />

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="rightRise" />

      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">How it works</div>
            <h2 className="ret-h2">Rai isn't a chatbot. She's a practitioner.</h2>
            <p className="ret-sub" style={{ maxWidth: 700, marginTop: 12 }}>
              Built from hundreds of real client-retention scenarios, Rai reads the relationship before she writes a word.
            </p>
          </div>
          <div className="ret-grid-3">
            {[
              { h: "She reads the score first", p: "Every time you Talk to Rai about a client, she pulls the current Retention Score, the active combinations, the last Health Check, the velocity trend — then writes." },
              { h: "She writes like a senior advisor", p: "Warm, steady tone. Specific, not vague. \"Call her — not email\" rather than \"consider reaching out.\" Rai tells you exactly what to do and exactly what to say." },
              { h: "She adapts to the client", p: "Your blunt client gets a blunt script. Your formal client gets a formal one. Rai knows each relationship's communication style — she doesn't talk to Rachel the way she talks to Jordan." },
            ].map((s, i) => (
              <div key={i} className="ret-card">
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>0{i + 1}</div>
                <h3 className="ret-h3">{s.h}</h3>
                <p style={{ fontSize: 14.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to={C.bg} variant="leftRise" />

      {/* Chat mockup */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 620, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid " + C.borderLight }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, " + C.primary + ", " + C.primaryLight + ")", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800 }}>✦</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800 }}>Rai</div>
                <div style={{ fontSize: 11.5, color: C.textMuted }}>Senior retention advisor</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ alignSelf: "flex-end", maxWidth: "80%", padding: "12px 16px", background: C.primary, color: "#fff", borderRadius: "16px 16px 4px 16px", fontSize: 13.5, lineHeight: 1.55 }}>
                Rachel at Broadleaf has been different lately. What should I do?
              </div>

              <div style={{ alignSelf: "flex-start", maxWidth: "92%", padding: "14px 16px", background: C.bg, borderRadius: "16px 16px 16px 4px", fontSize: 13.5, lineHeight: 1.65, border: "1px solid " + C.borderLight }}>
                <div style={{ fontWeight: 800, color: C.primary, marginBottom: 6, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
                  <span>✦</span> Rai
                </div>
                Rachel's score dropped from 78 to 67 over two check-ins. "No Room to Operate" just triggered. This isn't performance — it's relationship.<br /><br />
                <strong style={{ color: C.text }}>Call her. Not email.</strong> Open with something specific: <em>"I've noticed things have felt different the last few weeks. I wanted to check in before we did our next review — what's on your mind?"</em>
              </div>

              <div style={{ alignSelf: "flex-start", maxWidth: "82%", padding: "10px 14px", background: C.primarySoft, borderRadius: "14px 14px 14px 4px", fontSize: 12.5, color: C.primary, fontStyle: "italic", border: "1px solid " + C.primarySoft }}>
                I've flagged a profile re-evaluation for Broadleaf. Want me to queue that up after the call?
              </div>

              <div style={{ alignSelf: "flex-end", maxWidth: "70%", padding: "10px 14px", background: C.primary + "15", color: C.primary, borderRadius: "14px 14px 4px 14px", fontSize: 12.5, fontWeight: 600 }}>
                Yes, queue it.
              </div>
            </div>

            <div style={{ marginTop: 20, padding: "11px 14px", background: C.surface, borderRadius: 10, fontSize: 12.5, color: C.textMuted }}>
              Ask Rai anything about your book...
            </div>
          </div>
        </div>
      </section>

      {/* What you ask her */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg, paddingTop: 0 }}>
        <div className="ret-section-inner">
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
            <h2 className="ret-h2" style={{ marginBottom: 10 }}>What you ask her.</h2>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65 }}>Real questions, real situations.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, maxWidth: 1000, margin: "0 auto" }}>
            {[
              "\"Should I bring up the rate increase with Maplewood now or wait?\"",
              "\"Foxglove went quiet for three weeks. What do I say to re-open without being weird?\"",
              "\"Is Northvane ready to ask for a referral? How do I ask?\"",
              "\"Our point of contact at Oakline just got promoted. Do I congratulate her or pivot to the new AM?\"",
            ].map((q, i) => (
              <div key={i} style={{ padding: "18px 20px", background: C.card, border: "1px solid " + C.borderLight, borderRadius: 12, fontSize: 14, color: C.text, lineHeight: 1.55, fontStyle: "italic" }}>
                {q}
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="rightRise" />

      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Related features</div>
            <h2 className="ret-h2">Better together.</h2>
          </div>
          <div className="ret-grid-3">
            {PLATFORM_FEATURES.filter(f => f.id !== "feature-rai").slice(0, 3).map(f => (
              <div key={f.id} className="ret-card ret-card-hover" style={{ cursor: "pointer" }} onClick={() => setPage(f.id)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{f.headline}</h3>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{f.sub}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: C.btn }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetFinalCTA
        h2="Stop drafting hard emails alone. Rai is on the other side."
        sub="Start free. Talk to Rai about your first real client in minutes."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

function FeatureRolodex({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Rolodex"
        h1="Former clients aren't dead. They're future revenue."
        sub="The Rolodex tracks who left, how it ended, and whether they'd come back. One-off projects become re-engagement opportunities. Your pipeline is forward-looking."
        primaryCta="Start Free Trial"
        primaryAction="signup"
        secondaryCta="See all features"
        secondaryAction="platform"
        setPage={setPage}
      />

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="default" />

      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">How it works</div>
            <h2 className="ret-h2">Every CRM has a graveyard. Rolodex has a garden.</h2>
            <p className="ret-sub" style={{ maxWidth: 700, marginTop: 12 }}>
              Most tools archive old clients. We track them, score them for return-readiness, and surface them when the timing's right.
            </p>
          </div>
          <div className="ret-grid-3">
            {[
              { h: "Every exit gets recorded", p: "When a client offboards, you note the context — budget cut, scope done, pivoted away, never replied. The Rolodex remembers why they left, not just that they did." },
              { h: "Return-readiness is scored", p: "Based on how the relationship ended, how much time has passed, and signals we pick up (LinkedIn moves, funding events, public news), each former client gets a readiness score for re-engagement." },
              { h: "The right moment surfaces the right name", p: "Someone leaves their old job and starts a new one? They pop up. You wrap a great win with Client A that could fit Client B's old pain? Rolodex flags it. You don't forget them — the system reminds you." },
            ].map((s, i) => (
              <div key={i} className="ret-card">
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>0{i + 1}</div>
                <h3 className="ret-h3">{s.h}</h3>
                <p style={{ fontSize: 14.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to={C.bg} variant="dome" />

      {/* Rolodex mockup */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 720, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid " + C.borderLight }}>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Rolodex</div>
                <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>12 former clients</div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 100, background: C.primarySoft, fontSize: 11, fontWeight: 700, color: C.primary }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.primary }} />3 ready now
              </div>
            </div>

            {[
              { name: "Maplewood Agency", type: "Former", months: "14 months together", reason: "Budget cut Q3 2024", tags: ["Would refer", "Would come back"], readiness: 88, signal: "Just raised Series A" },
              { name: "Clearpoint Digital", type: "One-off", months: "Site audit, Feb 2024", reason: "Project-scoped", tags: ["Would refer"], readiness: 74, signal: "Expanded team 3x" },
              { name: "Harlow & Associates", type: "Former", months: "8 months together", reason: "Internal hire", tags: ["Would come back"], readiness: 82, signal: "Their hire just left" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "16px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 14.5 }}>{r.name}</span>
                      <span style={{ fontSize: 11.5, color: C.textMuted }}>{r.type} · {r.months}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: C.textMuted, marginBottom: 6 }}>Ended: {r.reason}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {r.tags.map(t => (
                        <span key={t} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 9px", borderRadius: 5, background: C.primarySoft, color: C.primary }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.success + "15", border: "1.5px solid " + C.success + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: C.success }}>{r.readiness}</div>
                    <div style={{ fontSize: 9.5, color: C.textMuted, marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>ready</div>
                  </div>
                </div>
                <div style={{ padding: "8px 12px", background: C.primarySoft + "60", borderRadius: 8, fontSize: 12.5, color: C.primary }}>
                  <strong>Signal:</strong> {r.signal}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, fontSize: 13, color: C.btn, fontWeight: 700, textAlign: "center" }}>3 re-engagement opportunities this week</div>
          </div>
        </div>
      </section>

      {/* Reframe */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg, paddingTop: 0 }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 className="ret-h2" style={{ marginBottom: 14 }}>The easiest new client is an old one.</h2>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.75 }}>
              Getting a new client costs 5–7x more than keeping one. Getting back an old one who liked you? Cheaper still.
              <br /><br />
              Most consultants lose touch within 6 months of an engagement ending. By 12 months, the relationship is effectively cold. <strong style={{ color: C.text }}>Rolodex keeps them warm without making you a stalker.</strong>
            </p>
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="default" />

      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Related features</div>
            <h2 className="ret-h2">Better together.</h2>
          </div>
          <div className="ret-grid-3">
            {PLATFORM_FEATURES.filter(f => f.id !== "feature-rolodex").slice(0, 3).map(f => (
              <div key={f.id} className="ret-card ret-card-hover" style={{ cursor: "pointer" }} onClick={() => setPage(f.id)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{f.headline}</h3>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{f.sub}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: C.btn }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetFinalCTA
        h2="Stop letting old wins die. Turn them into next quarter."
        sub="Start free. Add your first former client to the Rolodex in 30 seconds."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

function FeatureReferrals({ setPage }) {
  return (
    <div>
      <RetPageStyles />
      <RetHero
        eyebrow="Referrals"
        h1="Your best clients send you their friends."
        sub="Retayned tracks referral readiness based on loyalty, trust, and relationship depth. When a client is ready to refer, the system knows before you do."
        primaryCta="Start Free Trial"
        primaryAction="signup"
        secondaryCta="See all features"
        secondaryAction="platform"
        setPage={setPage}
      />

      <RetCurve from="#F2EEE8" to="#EAE4D6" variant="leftCrest" />

      <section className="ret-section ret-bg-beige r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">How it works</div>
            <h2 className="ret-h2">Why asking for referrals backfires 80% of the time.</h2>
            <p className="ret-sub" style={{ maxWidth: 700, marginTop: 12 }}>
              Most consultants ask everyone, or no one. Both are wrong. Readiness is a state — and it's measurable.
            </p>
          </div>
          <div className="ret-grid-3">
            {[
              { h: "Readiness is a combination", p: "High loyalty + high trust + deep relationship + recent positive moment = referral-ready. We score every client against this profile continuously." },
              { h: "Timing is the entire game", p: "Ask too early and you look needy. Ask too late and the moment's gone. Referrals has a narrow window after a clear win — and we flag it for you." },
              { h: "The right client, the right ask", p: "Rai doesn't just tell you who's ready — she tells you how to ask. The script for a formal client is different from the script for a casual one. You get both." },
            ].map((s, i) => (
              <div key={i} className="ret-card">
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>0{i + 1}</div>
                <h3 className="ret-h3">{s.h}</h3>
                <p style={{ fontSize: 14.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetCurve from="#EAE4D6" to={C.bg} variant="rightCrest" />

      {/* Mockup: Referral Intelligence */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 720, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>Referral Intelligence · Last 90 days</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 22 }}>
              {[["Asked", "7"], ["Converted", "4"], ["Revenue added", "$18.4k"]].map(([label, val]) => (
                <div key={label} style={{ background: C.bg, borderRadius: 11, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: C.primary, fontFamily: "inherit", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 10.5, color: C.textMuted, marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 12, color: C.text }}>Ready to refer this week</div>
            {[
              { name: "Northvane Studios", contact: "Sarah Chen", readiness: 94, note: "Just wrapped their anniversary retainer renewal." },
              { name: "Oakline Outdoors", contact: "James Park", readiness: 86, note: "Loyalty score hit 95 after Q1 campaign success." },
              { name: "Cedarwood Strategy", contact: "Alex Rivera", readiness: 79, note: "Asked twice about 'people like us.'" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                    <span style={{ fontSize: 11.5, color: C.textMuted }}>· {r.contact}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: C.textSec, lineHeight: 1.45 }}>{r.note}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <div style={{ width: 62, height: 6, borderRadius: 3, background: C.borderLight, overflow: "hidden" }}>
                    <div style={{ width: r.readiness + "%", height: "100%", background: "linear-gradient(90deg, " + C.primaryLight + ", " + C.success + ")" }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.success, minWidth: 30 }}>{r.readiness}</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 18, padding: "12px 14px", background: C.primarySoft, borderRadius: 10, fontSize: 13, color: C.text, lineHeight: 1.55 }}>
              <strong style={{ color: C.primary }}>Rai says:</strong> Sarah at Northvane is textbook ready. Ask in-person at Thursday's sync — not by email. Frame it as "people like you."
            </div>
          </div>
        </div>
      </section>

      {/* Don't ask thriving clients */}
      <section className="ret-section r-full-bleed" style={{ background: C.bg, paddingTop: 0 }}>
        <div className="ret-section-inner">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 className="ret-h2" style={{ marginBottom: 14 }}>One rule most consultants get wrong.</h2>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.75 }}>
              Thriving clients (90+ score) — don't ask them for referrals unless they offer. The best clients will send you people organically. Asking disrupts the relationship.
              <br /><br />
              <strong style={{ color: C.text }}>The sweet spot is healthy clients (75–89) coming off a clear win.</strong> They're invested enough to vouch, not so enmeshed that asking feels like transactional debt. Retayned flags them specifically.
            </p>
          </div>
        </div>
      </section>

      <RetCurve from={C.bg} to="#F2EEE8" variant="leftCrest" />

      <section className="ret-section ret-bg-cream r-full-bleed">
        <div className="ret-section-inner">
          <div className="ret-section-head">
            <div className="ret-eyebrow">Related features</div>
            <h2 className="ret-h2">Better together.</h2>
          </div>
          <div className="ret-grid-3">
            {PLATFORM_FEATURES.filter(f => f.id !== "feature-referrals").slice(0, 3).map(f => (
              <div key={f.id} className="ret-card ret-card-hover" style={{ cursor: "pointer" }} onClick={() => setPage(f.id)}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 10 }}>{f.label}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8, lineHeight: 1.3, letterSpacing: "-0.015em" }}>{f.headline}</h3>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{f.sub}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: C.btn }}>Learn more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RetFinalCTA
        h2="The right ask. At the exact right moment."
        sub="Start free. See who's ready to refer in your book right now."
        setPage={setPage}
      />
      <Footer setPage={setPage} />
    </div>
  );
}

// ═══ MAIN APP ═══
export default function RetaynedSite() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Manrope', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Caveat:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #33543E; color: #fff; }
        .cta-btn { transition: all 0.2s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(91,33,182,0.25); }
        .cta-btn:active { transform: translateY(0); }
        @keyframes megaFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .r-mega-row { transition: background 0.15s ease; }
        .r-mega-row:hover { background: ${C.primarySoft}; }
        .ch-pill { transition: all 0.15s ease; }
        .ch-pill:active { transform: scale(0.97); }
        input:focus, textarea:focus { border-color: #5B21B6 !important; outline: none; box-shadow: 0 0 0 3px rgba(91,33,182,0.1); }
        ::-webkit-scrollbar { width: 0; }
        @keyframes flyAway { 0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:1}20%{transform:translateY(-4px) translateX(2px) rotate(-1deg);opacity:1}40%{transform:translateY(-14px) translateX(8px) rotate(-3deg);opacity:.9}60%{transform:translateY(-30px) translateX(18px) rotate(-7deg);opacity:.6}80%{transform:translateY(-50px) translateX(32px) rotate(-12deg);opacity:.3}100%{transform:translateY(-75px) translateX(50px) rotate(-16deg);opacity:0} }
        .fly-away { display: inline-block; animation: flyAway 2.5s ease-out forwards; }
        .r-wrap { max-width: 100%; margin: 0 auto; padding: 0; }
        .r-mobile-only { display: flex; }
        .r-desktop-nav { display: none !important; }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 8px; border-radius: 4px; background: #E8ECE6; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #5B21B6; cursor: pointer; box-shadow: 0 2px 8px rgba(91,33,182,0.3); }
        input[type=range]::-moz-range-thumb { width: 28px; height: 28px; border-radius: 50%; background: #5B21B6; cursor: pointer; border: none; }
        .r-full-bleed { width: 100vw; position: relative; left: 50%; transform: translateX(-50%); padding-left: 20px; padding-right: 20px; }
        .r-no-pad { padding-left: 0 !important; padding-right: 0 !important; }
        
        @media (min-width: 768px) {
          section { padding-left: 40px !important; padding-right: 40px !important; }
          .r-nav-inner { padding-left: 40px !important; padding-right: 40px !important; }
          .r-wrap { max-width: 100%; }
          .r-mobile-only { display: none !important; }
          .r-desktop-nav { display: flex !important; }
          .r-full-bleed { padding-left: 40px; padding-right: 40px; }

        }
        @media (min-width: 1024px) {
          section { padding-left: 60px !important; padding-right: 60px !important; }
          .r-nav-inner { padding-left: 60px !important; padding-right: 60px !important; }
          .r-full-bleed { padding-left: 60px; padding-right: 60px; }
        }
        @media (min-width: 1280px) {
          section { padding-left: 80px !important; padding-right: 80px !important; }
          .r-nav-inner { padding-left: 80px !important; padding-right: 80px !important; }
          .r-wrap { max-width: 100%; margin: 0 auto; }
          .r-full-bleed { padding-left: 80px; padding-right: 80px; }
        }

        /* ═══════════════════════════════════════════════════ */
        /* V2 — Marketing homepage                             */
        /* ═══════════════════════════════════════════════════ */
        .v2-root { }
        .v2-final-h-small { font-size: clamp(28px, 3.5vw, 48px) !important; line-height: 1.05 !important; letter-spacing: -0.03em !important; font-weight: 900 !important; }

        /* ═══ Final CTA spaceship animation ═══ */
        .v2-section-final { position: relative; overflow: hidden; }
        .v2-section-final > *:not(.v2-ship-wrapper) { position: relative; z-index: 2; }
        .v2-ship-wrapper {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .v2-ship-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }
        /* Resting state: trail hidden, ship hidden and offset */
        .v2-ship-trail {
          stroke-dasharray: 1800;
          stroke-dashoffset: 1800;
        }
        .v2-ship-body {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        /* Animated state (added by IntersectionObserver) */
        .v2-final-animate .v2-ship-trail {
          animation: shipTrailDraw 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .v2-final-animate .v2-ship-body {
          animation: shipBodyFadeIn 0.8s ease-out 1.8s forwards;
        }
        @keyframes shipTrailDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes shipBodyFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        /* ═══ Platform portfolio dashboard (right column) ═══ */
        .v2-platform-portfolio {
          background: ${C.card};
          border: 8px solid #F5ECD8;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);
          font-size: 12px;
        }
        .v2-platform-portfolio-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 12px;
          align-items: start;
        }
        .v2-port-sidebar {
          display: flex; flex-direction: column; gap: 10px;
        }
        .v2-port-card {
          background: ${C.bg};
          border: 1px solid ${C.borderLight};
          border-radius: 10px;
          padding: 12px;
        }
        .v2-port-card-label {
          font-size: 9px; font-weight: 700;
          color: ${C.textMuted};
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .v2-port-movement-item {
          display: flex; align-items: center; gap: 8px;
          padding: 3px 0;
        }
        .v2-port-avatar {
          width: 22px; height: 22px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 8.5px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }
        .v2-port-table-wrap {
          background: #fff;
          border: 1px solid ${C.borderLight};
          border-radius: 10px;
          overflow: hidden;
          min-width: 0;
        }
        .v2-port-controls {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px;
          border-bottom: 1px solid ${C.borderLight};
        }
        .v2-port-pill {
          padding: 3px 9px; border-radius: 5px;
          font-size: 10px; color: ${C.textSec};
        }
        .v2-port-pill-active {
          background: ${C.text}; color: #fff; font-weight: 700;
        }
        .v2-port-row {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 14px;
          border-bottom: 1px solid ${C.borderLight};
        }
        .v2-port-row:last-child { border-bottom: none; }
        .v2-port-row-header {
          background: ${C.bg};
          font-size: 9px; font-weight: 700;
          color: ${C.textMuted};
          letter-spacing: 0.08em;
        }
        .v2-port-col-num {
          flex: 1 1 0;
          text-align: right;
          min-width: 0;
        }
        @media (max-width: 1100px) {
          .v2-platform-portfolio-grid { grid-template-columns: 1fr; }
          .v2-port-sidebar { flex-direction: row; }
          .v2-port-sidebar > * { flex: 1; }
        }

        /* ═══ 7-cell mixed testimonials/stats grid ═══ */
        .v2-mix-cell {
          background: #EAE4D6;
          border: 1px solid rgba(28,50,36,0.06);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
        }
        .v2-mix-testimonial {
          display: flex; flex-direction: column;
        }
        .v2-mix-quote {
          font-size: 16px; color: ${C.text};
          line-height: 1.65; margin-bottom: 24;
          font-style: italic; flex: 1; margin-bottom: 24px;
        }
        .v2-mix-footer {
          border-top: 1px solid rgba(28,50,36,0.08);
          padding-top: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .v2-mix-stat {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          min-height: 220px;
          background: #FAFAF7 !important;
        }
        .v2-mix-stat-num {
          font-size: clamp(56px, 7vw, 96px);
          font-weight: 900; color: ${C.primary};
          letter-spacing: -0.045em; line-height: 1;
          margin-bottom: 14px;
        }
        .v2-mix-stat-label {
          font-size: 13px; font-weight: 600;
          color: ${C.textMuted};
          text-transform: uppercase; letter-spacing: 0.06em;
          max-width: 220px;
        }
        .v2-mix-stat-wide {
          min-height: 160px;
          padding: 48px 32px;
          background: linear-gradient(135deg, #D7E6D9 0%, ${C.primarySoft} 60%, #FAFAF7 100%) !important;
          border: 1px solid rgba(51, 84, 62, 0.08) !important;
        }
        .v2-mix-stat-headline {
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.05; color: ${C.text};
          max-width: 1000px; margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .v2-testimonials-grid { grid-template-columns: 1fr !important; }
          .v2-mix-stat-wide { grid-column: span 1 !important; }
        }

        /* Fonts: Caveat + DM Serif Display are loaded in hero via @import */
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        /* ═══ HERO ═══ */
        .v2-hero {
          background: #F2EEE8;
          position: relative;
          padding: 56px 48px 60px;
          overflow: hidden;
        }
        .v2-hero-inner { max-width: 1320px; margin: 0 auto; }
        @keyframes subtleBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .v2-trust-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: clamp(6px, 0.4vw, 7px) clamp(14px, 1vw, 16px); border-radius: 100px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(216,223,216,0.8);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          font-size: clamp(13px, 0.95vw, 14.5px); font-weight: 600;
          color: ${C.text};
          margin-bottom: clamp(8px, 0.5vw, 10px);
          animation: subtleBob 4s ease-in-out infinite;
        }
        .v2-trust-dot { width: 6px; height: 6px; border-radius: 50%; background: ${C.success}; }
        .v2-hero-h1 {
          font-size: clamp(40px, 7.5vw, 104px);
          font-weight: 900; letter-spacing: -0.045em;
          line-height: 0.98;
          margin-bottom: 24px;
          color: ${C.text};
        }
        @media (min-width: 768px) {
          .v2-hero-h1 { margin-top: -16px; }
        }
        .v2-strike-wrap { position: relative; display: inline-block; margin: 0 0.15em; padding-top: 0.5em; }
        .v2-strike { color: ${C.textMuted}; position: relative; }
        .v2-strike::after {
          content: ''; position: absolute;
          left: -3%; top: 53%; height: 0.07em; width: 106%;
          background: ${C.danger}; border-radius: 2px;
          transform: rotate(-1deg) scaleX(0);
          transform-origin: left center;
          animation: v2StrikeDraw 0.55s cubic-bezier(0.65, 0, 0.35, 1) 0.9s forwards;
        }
        @keyframes v2StrikeDraw {
          0%   { transform: rotate(-1deg) scaleX(0); }
          100% { transform: rotate(-1deg) scaleX(1); }
        }
        .v2-caveat {
          font-family: 'Caveat', cursive;
          font-weight: 700; color: ${C.primary};
          position: absolute; top: -0.2em; left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          font-size: 0.78em; white-space: nowrap;
          line-height: 1;
          opacity: 0;
          animation: v2CaveatIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.5s forwards;
        }
        @keyframes v2CaveatIn {
          0%   { opacity: 0; transform: translateX(-50%) rotate(-2deg) translateY(6px) scale(0.9); }
          100% { opacity: 1; transform: translateX(-50%) rotate(-2deg) translateY(0) scale(1); }
        }
        .v2-hero-sub {
          font-size: clamp(17px, 2vw, 24px);
          font-weight: 600; color: ${C.text};
          max-width: 760px; margin-bottom: 14px; line-height: 1.35;
        }
        .v2-hero-desc {
          font-size: clamp(15px, 1.5vw, 19px);
          color: ${C.textSec};
          max-width: 620px; line-height: 1.6; margin-bottom: 32px;
        }
        .v2-hero-cta-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .v2-btn-primary-lg, .v2-btn-secondary-lg {
          display: inline-flex; align-items: center; justify-content: center;
          height: 52px; padding: 0 28px;
          border-radius: 12px;
          font-size: 16px; font-weight: 700;
          cursor: pointer; font-family: inherit;
          box-sizing: border-box;
          line-height: 1;
          border: 2px solid ${C.btn};
          white-space: nowrap;
        }
        .v2-btn-primary-lg { background: ${C.btn}; color: #fff; }
        .v2-btn-primary-lg:hover { background: ${C.btnHover}; border-color: ${C.btnHover}; }
        .v2-hero-fine { margin-top: 16px; font-size: clamp(13px, 1vw, 15px); color: ${C.textMuted}; }

        /* Hero device — beige on beige */
        .v2-hero-device {
          background: #EAE4D6;
          border-radius: 24px;
          padding: 32px;
          max-width: 1100px; margin: 56px auto 0;
          position: relative;
        }
        .v2-hero-device-inner {
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
          overflow: hidden;
        }

        @keyframes v2-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        /* ═══ Today feed v4 (v2tf-*) — hero animated task list ═══
           Architecture matches reference mobile/desktop files exactly:
           - Cards absolute-positioned, transform: translateY()
           - Fixed --row-h per breakpoint, --gap between cards
           - DOM is stacked: row1 (label + score) → title → meta
        */
        .v2tf-root {
          background: #fff;
          font-family: inherit;
          color: #1a1614;
          border-radius: 18px;
          overflow: hidden;
        }
        .v2tf-body {
          padding: 28px 32px 30px;
        }
        .v2tf-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding-bottom: 18px;
          border-bottom: 1px solid #f1ecde;
          margin-bottom: 18px;
        }
        .v2tf-h {
          margin: 0 0 4px;
          font-size: 28px; font-weight: 700;
          letter-spacing: -0.02em;
          color: #1a1614;
        }
        .v2tf-sub {
          font-size: 13px;
          color: #8a8278;
        }
        .v2tf-ranking {
          display: inline-flex; align-items: center; gap: 8px;
          background: #ddd2f0;
          color: #4a3a82;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 13px; font-weight: 500;
          white-space: nowrap;
        }
        .v2tf-ranking::before {
          content: '';
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #7b66c7;
          box-shadow: 0 0 0 0 rgba(123,102,199,0.5);
          animation: v2tf-pulse 1.8s ease-out infinite;
        }
        @keyframes v2tf-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(123,102,199,0.55); }
          70%  { box-shadow: 0 0 0 8px rgba(123,102,199,0); }
          100% { box-shadow: 0 0 0 0 rgba(123,102,199,0); }
        }
        .v2tf-ranking.thinking::before { animation: v2tf-pulse 0.8s ease-out infinite; }

        .v2tf-list-wrap { position: relative; }
        .v2tf-list {
          position: relative; display: block;
          transition: height 500ms cubic-bezier(.6,.05,.2,1);
        }

        .v2tf-task {
          position: absolute;
          left: 0; right: 0;
          background: #fff;
          border: 1px solid #ebe4d4;
          border-radius: 14px;
          padding: 12px 16px;
          overflow: hidden;
          transition:
            transform 700ms cubic-bezier(.6,.05,.2,1),
            opacity 420ms ease,
            box-shadow 400ms ease,
            border-color 400ms ease,
            background 400ms ease;
          will-change: transform, opacity;
        }
        .v2tf-task.selecting {
          background: #f4ecd6;
          border-color: #ddd1ac;
          box-shadow:
            inset 0 0 0 1px rgba(180, 150, 70, 0.18),
            0 6px 18px -10px rgba(80, 60, 20, 0.18);
        }
        .v2tf-task.leaving {
          opacity: 0;
          pointer-events: none;
        }

        .v2tf-row1 {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 6px;
        }
        .v2tf-label {
          flex: 0 0 auto;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.08em;
          padding: 5px 9px;
          border-radius: 5px;
          text-transform: uppercase;
        }
        .v2tf-label-deepen    { background: #e7efe2; color: #3f5a39; }
        .v2tf-label-urgent    { background: #f9dcd4; color: #a04432; }
        .v2tf-label-nurture   { background: #f1e2bf; color: #7a5a1b; }
        .v2tf-label-proactive { background: #e3dcf2; color: #534392; }

        .v2tf-score {
          margin-left: auto;
          flex: 0 0 auto;
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 40px;
          padding: 5px 10px;
          border-radius: 6px;
          font-weight: 600; font-size: 12.5px;
          font-variant-numeric: tabular-nums;
          transition: background 400ms ease, color 400ms ease, transform 400ms ease;
        }
        .v2tf-score-deepen    { background: #dbe8d3; color: #3f5a39; }
        .v2tf-score-urgent    { background: #f5c6ba; color: #a04432; }
        .v2tf-score-nurture   { background: #ecd59e; color: #7a5a1b; }
        .v2tf-score-proactive { background: #dcd3ee; color: #534392; }

        .v2tf-title {
          font-size: 14.5px; font-weight: 600;
          color: #1a1614;
          letter-spacing: -0.005em;
          line-height: 1.3;
          margin-bottom: 3px;
          text-wrap: pretty;
        }
        .v2tf-meta {
          font-size: 12px;
          color: #8a8278;
          line-height: 1.35;
        }

        .v2tf-rai {
          margin-top: 22px;
          background: #e7dff5;
          color: #3e2f72;
          border-radius: 12px;
          padding: 14px 18px;
          display: flex; align-items: center; gap: 14px;
          font-size: 14px;
          min-height: 56px;
          overflow: hidden;
        }
        .v2tf-avatar {
          flex: 0 0 auto;
          width: 36px; height: 36px;
          border-radius: 50%;
          overflow: hidden;
        }
        .v2tf-avatar svg { width: 100%; height: 100%; display: block; }
        .v2tf-msg {
          flex: 1;
          position: relative;
          min-height: 20px;
        }
        .v2tf-msg b { font-weight: 600; color: #2c1f5c; }
        .v2tf-msg-line {
          display: block;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 450ms ease, transform 450ms ease;
        }
        .v2tf-msg-line.show { opacity: 1; transform: translateY(0); }
        .v2tf-caret {
          display: inline-block;
          width: 2px; height: 14px;
          background: #3e2f72;
          vertical-align: middle;
          margin-left: 2px;
          animation: v2tf-blink 1s steps(2) infinite;
        }
        @keyframes v2tf-blink { 50% { opacity: 0; } }

        /* Mobile: taller card to fit 2-line title + meta. Same architecture, different sizing. */
        @media (max-width: 760px) {
          .v2tf-body { padding: 20px 18px 22px; }
          .v2tf-head { flex-direction: column; align-items: flex-start; gap: 10px; padding-bottom: 14px; margin-bottom: 14px; }
          .v2tf-h { font-size: 24px; }
          .v2tf-sub { font-size: 12px; }
          .v2tf-ranking { font-size: 12px; padding: 7px 12px; }
          .v2tf-task { padding: 12px 14px; border-radius: 14px; }
          .v2tf-row1 { margin-bottom: 8px; }
          .v2tf-label { font-size: 9.5px; padding: 4px 8px; }
          .v2tf-score { min-width: 38px; font-size: 12px; padding: 4px 9px; }
          .v2tf-title { font-size: 14px; line-height: 1.3; margin-bottom: 4px; }
          .v2tf-meta { font-size: 11.5px; }
          .v2tf-rai { padding: 12px 14px; gap: 10px; font-size: 12.5px; }
          .v2tf-avatar { width: 30px; height: 30px; }
        }
        @media (max-width: 420px) {
          .v2tf-body { padding: 16px 12px 18px; }
          .v2tf-h { font-size: 22px; }
          .v2tf-task { padding: 11px 12px; }
          .v2tf-title { font-size: 13.5px; }
          .v2tf-meta { font-size: 11px; }
          .v2tf-msg { font-size: 12px; }
        }


        /* ═══ CURVES ═══ */
        .v2-curve { display: block; width: 100vw; height: 140px; margin-top: 0; margin-bottom: -1px; padding: 0; line-height: 0; position: relative; z-index: 1; }
        .v2-curve svg { display: block; width: 100%; height: calc(100% + 1px); }

        /* ═══ SECTION SHARED ═══ */
        .v2-section-inner { max-width: 1400px; margin: 0 auto; }
        .v2-section-head { margin-bottom: 56px; }
        .v2-eyebrow {
          display: inline-block;
          font-size: 12px; font-weight: 700;
          color: ${C.primary};
          text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 20px;
          padding: 6px 14px;
          background: ${C.primarySoft};
          border-radius: 6px;
        }
        .v2-section-h2 {
          font-size: clamp(32px, 5vw, 72px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.02; margin-bottom: 20px;
          color: ${C.text};
        }
        .v2-section-sub {
          font-size: clamp(16px, 1.8vw, 18px);
          color: ${C.textSec};
          line-height: 1.6;
        }

        /* ═══ MEET RAI ═══ */
        .v2-section-rai { background: ${C.bg}; padding: 96px 48px; }
        .v2-rai-steps {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          max-width: 1400px; margin: 0 auto;
        }
        .v2-rai-step {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .v2-rai-step-illustration {
          width: 50%;
          aspect-ratio: 360 / 300;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin: 0 auto 48px;
        }
        .v2-rai-step-content {
          padding: 0 8px;
        }
        .v2-rai-step-h {
          font-size: 22px; font-weight: 800;
          letter-spacing: -0.02em; margin-bottom: 10px;
          color: ${C.text};
        }
        .v2-rai-step-p {
          font-size: 14px; color: ${C.textSec}; line-height: 1.65;
        }
        /* Legacy step classes — removed */

        /* ═══ PLATFORM ═══ */
        .v2-section-platform { background: #EAE4D6; padding: 112px 48px; }
        .v2-platform-grid {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px;
          align-items: center;
          max-width: 1400px; margin: 0 auto;
        }
        .v2-bullets { margin-top: 28px; }
        .v2-bullet {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 0;
          border-top: 1px solid rgba(216, 223, 216, 0.6);
          font-size: 15px; line-height: 1.5;
          color: ${C.text};
        }
        .v2-bullet:last-child { border-bottom: 1px solid rgba(216, 223, 216, 0.6); }
        .v2-check {
          flex-shrink: 0; width: 22px; height: 22px;
          background: ${C.primary}; color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 900; margin-top: 2px;
        }

        /* ═══ COMBOS ═══ */
        .v2-section-combos { background: ${C.bg}; padding: 112px 48px; }
        .v2-combos-head { max-width: 960px; margin: 0 auto 72px; text-align: center; }
        .v2-combos-h2 {
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.02; margin: 14px 0 16px;
          color: ${C.text};
        }
        .v2-combos-p {
          font-size: 18px; color: ${C.textSec}; line-height: 1.6;
        }
        .v2-scroll-band {
          overflow: hidden; padding: 32px 0; position: relative;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, black 10%, black 90%, transparent 100%);
        }
        .v2-scroll-track {
          display: flex; gap: 72px; align-items: baseline;
          white-space: nowrap; width: max-content;
          padding: 8px 0;
          will-change: transform;
          color: ${C.textSec};
        }
        .v2-become {
          display: flex; align-items: center; justify-content: center;
          gap: 18px; padding: 40px 0; max-width: 960px; margin: 0 auto;
        }
        .v2-become-rule { flex: 1; height: 1px; background: ${C.border}; max-width: 360px; }
        .v2-become-word {
          font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          color: ${C.textMuted}; white-space: nowrap;
        }

        /* Wordmark typography */
        .v2-wm-pos { color: rgba(45,134,89,0.9); }
        .v2-wm-neg { color: rgba(196,67,43,0.88); }
        .v2-wm-bulletproof { font-size: 42px; font-weight: 800; letter-spacing: -0.02em; }
        .v2-wm-icewall { font-size: 38px; font-weight: 300; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-lockedvault { font-size: 28px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
        .v2-wm-ontheclock { font-size: 36px; font-weight: 800; letter-spacing: -0.02em; }
        .v2-wm-cornerstone { font-size: 40px; font-weight: 400; font-family: 'DM Serif Display', serif; }
        .v2-wm-silentexit { font-size: 38px; font-weight: 400; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-decisionexpress { font-size: 26px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
        .v2-wm-noroom {
          font-size: 36px; font-weight: 900; letter-spacing: -0.04em;
          font-family: 'Arial Narrow', 'Helvetica Neue Condensed', Impact, sans-serif;
          transform: scaleX(0.78); transform-origin: center;
        }
        .v2-wm-truepartner { font-size: 38px; font-weight: 700; font-family: 'DM Serif Display', serif; }
        .v2-wm-tickingbomb { font-size: 28px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
        .v2-wm-smoothop { font-size: 40px; font-weight: 300; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-onefoot { font-size: 38px; font-weight: 700; }
        .v2-wm-allinvestor { font-size: 34px; font-weight: 800; letter-spacing: -0.01em; }
        .v2-wm-powderkeg { font-size: 28px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
        .v2-wm-openbook { font-size: 40px; font-weight: 400; font-family: 'DM Serif Display', serif; }
        .v2-wm-nickeldime { font-size: 34px; font-weight: 400; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-resilient { font-size: 26px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .v2-wm-noanchor { font-size: 36px; font-weight: 300; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-lowmaint { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
        .v2-wm-bottleneck { font-size: 28px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }

        .v2-dim-serif { font-size: 46px; font-weight: 400; letter-spacing: -0.02em; font-family: 'DM Serif Display', serif; }
        .v2-dim-serif-italic { font-size: 46px; font-weight: 400; font-style: italic; font-family: 'DM Serif Display', serif; }
        .v2-dim-serif-italic-lg { font-size: 50px; font-weight: 400; font-style: italic; font-family: 'DM Serif Display', serif; }
        .v2-dim-heavy-caps { font-size: 40px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
        .v2-dim-spaced-lower { font-size: 24px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; }
        .v2-dim-small-caps { font-size: 22px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }

        /* ═══ AUDIENCE ═══ */
        .v2-section-audience { background: #EAE4D6; padding: 112px 48px; }
        .v2-audience-tabs {
          display: inline-flex; gap: 4px; justify-content: center;
          margin: 0 auto 48px;
          padding: 5px;
          background: #F5ECD8;
          border-radius: 100px;
          box-shadow: inset 0 0 0 1px rgba(28, 50, 36, 0.04);
        }
        .v2-audience-tabs-wrap {
          display: flex; justify-content: center; width: 100%;
        }
        .v2-audience-tab {
          padding: 8px 22px; border-radius: 100px;
          font-size: 13.5px; font-weight: 600;
          color: ${C.textSec};
          border: none;
          background: transparent; cursor: pointer; font-family: inherit;
          transition: all 0.2s ease;
        }
        .v2-audience-tab:hover { color: ${C.text}; }
        .v2-audience-tab-active {
          background: #FAFAF7;
          color: ${C.text};
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(28, 50, 36, 0.08);
        }
        .v2-audience-tab-active:hover { color: ${C.text}; background: #FAFAF7; }
        .v2-audience-content {
          background: #F5ECD8;
          border-radius: 24px;
          padding: 56px 48px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center;
          max-width: 1280px; margin: 0 auto;
          box-shadow: 0 24px 48px rgba(28, 50, 36, 0.06);
        }
        .v2-audience-h {
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.05; margin-bottom: 18px;
          color: ${C.text};
        }
        .v2-audience-p {
          font-size: 16px; color: ${C.textSec}; line-height: 1.6;
          margin-bottom: 24px;
        }
        .v2-audience-demo {
          background: transparent; border-radius: 0; padding: 0;
          box-shadow: none;
        }

        /* ═══ ENTERPRISE ═══ */
        .v2-section-enterprise {
          background: ${C.primaryDeep};
          color: #fff;
          padding: 112px 48px;
        }
        .v2-eyebrow-enterprise {
          background: rgba(255,255,255,0.08) !important;
          color: rgba(255,255,255,0.75) !important;
        }
        .v2-h2-enterprise { color: #fff !important; }
        .v2-accent-ent { color: ${C.primaryLight}; }
        .v2-sub-enterprise { color: rgba(255,255,255,0.7) !important; }
        .v2-enterprise-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          margin: 48px auto 0;
          max-width: 1400px;
        }
        .v2-enterprise-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 28px;
        }
        .v2-enterprise-label {
          font-size: 10px; font-weight: 700;
          color: ${C.primaryLight};
          text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 16px;
        }
        .v2-enterprise-h {
          font-size: 20px; font-weight: 800;
          margin-bottom: 8px; letter-spacing: -0.02em;
          color: #fff;
        }
        .v2-enterprise-p {
          font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.6;
        }
        .v2-enterprise-cta-row {
          display: flex; gap: 14px; justify-content: center; margin-top: 48px;
        }
        .v2-btn-enterprise {
          background: #fff; color: ${C.primaryDeep};
          padding: 14px 32px; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          border: none; font-family: inherit;
        }
        .v2-btn-enterprise:hover { background: ${C.primarySoft}; }

        /* ═══ FINAL CTA ═══ */
        .v2-section-final {
          background: #F2EEE8;
          padding: 112px 48px 140px;
          text-align: center;
        }
        .v2-final-h {
          font-size: clamp(36px, 6vw, 80px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.02; max-width: 1000px; margin: 0 auto 20px;
          color: ${C.text};
        }
        .v2-final-sub {
          font-size: 17px; color: ${C.textSec}; line-height: 1.6;
          max-width: 620px; margin: 0 auto 32px;
        }
        .v2-final-fine { font-size: 13px; color: ${C.textMuted}; margin-top: 18px; }

        /* ═══ FOOTER ═══ */
        .v2-footer { background: ${C.primaryDeep}; color: #fff; padding: 72px 48px 36px; }
        .v2-footer-inner {
          max-width: 1320px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .v2-footer-wordmark {
          font-size: 26px; font-weight: 900;
          letter-spacing: -0.04em; color: #fff;
          margin-bottom: 14px; cursor: pointer;
        }
        .v2-footer-tag {
          font-size: 13px; color: rgba(255,255,255,0.5);
          line-height: 1.6; max-width: 280px;
        }
        .v2-footer-col h5 {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.5); margin: 0 0 14px;
        }
        .v2-footer-col a {
          display: block; font-size: 13px; color: rgba(255,255,255,0.85);
          margin-bottom: 9px; cursor: pointer; text-decoration: none;
        }
        .v2-footer-col a:hover { color: #fff; }
        .v2-footer-bottom {
          max-width: 1320px; margin: 40px auto 0;
          padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 12px; color: rgba(255,255,255,0.4);
          display: flex; justify-content: space-between;
          flex-wrap: wrap; gap: 8px;
        }
        .v2-footer-citation {
          max-width: 1320px; margin: 32px auto 0;
          font-size: 11px; color: rgba(255,255,255,0.32);
          line-height: 1.5;
        }
        .v2-footer-citation sup { font-size: 9px; }

        /* ═══ V2 RESPONSIVE ═══ */
        @media (max-width: 1024px) {
          .v2-hero { padding: 56px 24px 48px; }
          .v2-hero-device { padding: 20px 16px 0; margin-top: 40px; }
          .v2-section-rai, .v2-section-platform, .v2-section-audience, .v2-section-combos { padding: 72px 24px; }
          .v2-section-enterprise, .v2-section-final { padding: 72px 24px; }
          .v2-platform-grid { grid-template-columns: 1fr; gap: 40px; }
          .v2-rai-steps { grid-template-columns: 1fr; gap: 16px; }
          .v2-audience-content { grid-template-columns: 1fr; padding: 40px 32px; gap: 32px; }
          .v2-enterprise-grid { grid-template-columns: 1fr; gap: 14px; }
          .v2-footer { padding: 56px 24px 32px; }
          .v2-footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 640px) {
          .v2-hero { padding: 40px 20px 40px; }
          .v2-hero-device { padding: 16px 12px 0; margin-top: 32px; border-radius: 18px; }
          .v2-section-rai, .v2-section-platform, .v2-section-audience, .v2-section-combos { padding: 64px 20px; }
          .v2-section-enterprise, .v2-section-final { padding: 64px 20px; }
          .v2-section-head { margin-bottom: 40px; }
          .v2-audience-content { padding: 32px 24px; gap: 24px; border-radius: 18px; }
          .v2-enterprise-card { padding: 22px; }
          .v2-footer { padding: 48px 20px 28px; }
          .v2-footer-inner { grid-template-columns: 1fr; gap: 28px; }
          .v2-curve { height: 80px; }
          .v2-port-row-header > div:nth-child(5),
          .v2-port-row:not(.v2-port-row-header) > div:nth-child(5) { display: none !important; }
        }
      `}</style>

      <Nav page={page} setPage={setPage} />
      <div style={{ overflowX: "hidden" }}>
      <div className="r-wrap">
        {page === "home" && <HomeV2 setPage={setPage} />}
        {page === "platform" && <Platform setPage={setPage} />}
        {page === "freelancers" && <Freelancers setPage={setPage} />}
        {page === "agencies" && <Agencies setPage={setPage} />}
        {page === "enterprise" && <Enterprise setPage={setPage} />}
        {page === "feature-today" && <FeatureToday setPage={setPage} />}
        {page === "feature-scoring" && <FeatureScoring setPage={setPage} />}
        {page === "feature-health" && <FeatureHealth setPage={setPage} />}
        {page === "feature-rai" && <FeatureRai setPage={setPage} />}
        {page === "feature-rolodex" && <FeatureRolodex setPage={setPage} />}
        {page === "feature-referrals" && <FeatureReferrals setPage={setPage} />}
        {page === "pricing" && <Pricing setPage={setPage} />}
        {page === "about" && <About setPage={setPage} />}
        {page === "faq" && <FAQPage setPage={setPage} />}
        {page === "blog" && <Blog setPage={setPage} />}
        {page === "contact" && <Contact setPage={setPage} />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "signup" && <Signup setPage={setPage} />}
        {page === "privacy" && <Privacy setPage={setPage} />}
        {page === "terms" && <Terms setPage={setPage} />}
      </div>
      </div>
    </div>
  );
}
