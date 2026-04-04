import { useState, useEffect, useRef } from "react";

// ═══ Shared palette ═══
const C = {
  primary: "#33543E", primaryDark: "#274230", primaryDeep: "#1C3224",
  primaryLight: "#558B68", primarySoft: "#E6EFE9", primaryGhost: "#F3F8F5",
  bg: "#F7F7F4", card: "#FFFFFF", surface: "#EEEFEB",
  text: "#1E261F", textSec: "#5A6E5E", textMuted: "#92A596",
  border: "#D8DFD8", borderLight: "#E8ECE6",
  sidebar: "#1E261F", sidebarAccent: "#558B68",
  heroGrad: "linear-gradient(135deg, #1E261F, #2A382C)",
  danger: "#C4432B", dangerBg: "#FAE8E4",
  warning: "#B88B15", warningBg: "#FBF2DC",
  success: "#2D8659", successBg: "#E2F3EB",
  btn: "#5B21B6", btnHover: "#4C1D95",
};


const HEADSHOT = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAGmASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDuKKKKszCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACijB9DR2z2oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiud8V64NOtjbQPi5lXlh/yzX1+ppPQaVyfWfEtlpRaPPnXA6op4X6nt9K4q/wDFWo3jN/pDRRk/6uL5OPr1NYrnzHJJY5qzFps8ygpEzKfaocjRRGLeOzENLJ8395yc/WpbfVru0YGCeVdp/hcjH4Z5qb+wbtyAIXyeM4/KnzeHrqBxuU4PtSuiuVl618banblWuBHdRZwcgKT+I716FZ3UV7aRXMDh4pFDAj+X1ryC5sLizYrJGQD2IqXTNVu9Ju0lt5GVRjdFn5XHoRVKRDiewUVU0zUINUskurYnY3BB6qfQ1bqzMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAryrxHdtfaxdSZygcovptHAFepSsUhkcdVUkfgK8fkfzHbPJPP4+tTIuJPpdust0isOMjivTbO2iWFAiAACuA0K2ee9RYgTz8xxwK9JhURoFHYVhLc6IbDhGo7CmvGrdQKkLGkz7UizPvLCG5TbKgb3xXKa7oEQheSFdrAZruHIIrG1ZgttIx6BTRtsFk1qc34GvTa6q9kTiK5UkKezj/ABGfyr0KvILC5a31q1mTl45VP15/wr188E10R2OSS1CiiiqICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCO4x9mlz/cI/SvI0RzMV2nfnBHfPpXrNyN3lp2LZNczqFjG3iiJlUYKeY/uQf8A9VYzlqdEKfu3L+k2celaei7MysNzkdSfSknvNXOWgtoETsJX5rQZXMXykK3qe1YF/ogvY1E1wxkDFi7DJPt6YrFPXU3cdNDU0++1KSUR3drEq/30b+lak0qwoXboBWZZRGEqqLsjUAAc9h1/Gk1C6cAAEdafMPlBtc07eYzdIj+jcVm+IJfM02T7O4cYzlTkGqV08rX80U+m21zagFhJs2Er6gnqfai3too0aS03fZJVztY9Dim9Cdzm/DtqbvxDZx548wMfovJ/lXrvWvPvh/aF9UubkqdsMe0H/aY/4A16DXQjjluFFFFUSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFe63DY6jJGaooFaVSUKyZO7I57Vqsu5SDVOZWWZS2Olc9SOtzrpTXLyk4X5RTGVUJJIFRySuI/kxu6Z9KiQMynad2epPeoNUSqjSc8gHpnvWbeoFucHoDirXkskglUfvMbc5PT0rPeKRZmMpZt/JyePw9KTRaZea2+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";

const inputStyle = { width: "100%", padding: "14px 16px", border: "2px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", background: C.card, boxSizing: "border-box", outline: "none" };

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

// ═══ Nav ═══
function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "platform", label: "Platform" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "blog", label: "Resources" },
    { id: "faq", label: "FAQs" },
    { id: "contact", label: "Contact" },
    { id: "login", label: "Log In" },
  ];
  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: C.bg, borderBottom: scrolled ? "1px solid " + C.border : "1px solid transparent", boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.2s, border-color 0.2s" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="r-mobile-only" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center", zIndex: 110 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2.5" strokeLinecap="round">
                {open ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="17" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
              </svg>
            </button>
            <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => { setPage("home"); setOpen(false); }}>
              <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
            </div>
          </div>
          <div className="r-desktop-nav" style={{ display: "none", alignItems: "baseline", gap: 28 }}>
            {links.filter(l => l.id !== "login").map(l => (
              <span key={l.id} onClick={() => setPage(l.id)} style={{ fontSize: 15, fontWeight: page === l.id ? 700 : 600, color: page === l.id ? C.primary : C.text, cursor: "pointer", letterSpacing: "-0.01em", borderBottom: page === l.id ? "2px solid " + C.btn : "2px solid transparent", paddingBottom: 2, transition: "border-color 0.2s" }}>{l.label}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="r-desktop-nav" onClick={() => setPage("demo")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 22px", background: "transparent", border: "1.5px solid " + C.border, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: C.text }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>GET A DEMO</span>
          </button>
          <button className="cta-btn" onClick={() => { setPage("signup"); setOpen(false); }} style={{ padding: "10px 22px", background: C.btn, color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Try Free Now
          </button>
        </div>
      </div>
      </nav>
      {/* Left drawer + swipe */}
      <SwipeDrawer open={open} setOpen={setOpen}>
        <div style={{ padding: "24px 24px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 32, cursor: "pointer" }} onClick={() => { setPage("home"); setOpen(false); }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
          </div>
          {links.map(l => (
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
          <button onClick={() => { setPage("demo"); setOpen(false); }} style={{
            width: "100%", padding: "14px 20px", background: "transparent", color: C.text,
            border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            Get a Demo
          </button>
          <button className="cta-btn" onClick={() => { setPage("signup"); setOpen(false); }} style={{
            width: "100%", padding: "14px 20px", background: C.btn, color: "#fff",
            border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", marginTop: 10,
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
    <footer style={{ borderTop: "1px solid " + C.border, padding: "24px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => setPage("home")}>
          <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
        </div>
        <div style={{ fontSize: 12, color: C.textMuted }}>There's no "i" in Retayned.</div>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
        {[["platform","Platform"],["pricing","Pricing"],["about","About"],["faq","FAQs"],["contact","Contact"],["privacy","Privacy"],["terms","Terms"]].map(([id, label]) => (
          <span key={id} onClick={() => setPage(id)} style={{ fontSize: 12, color: C.textMuted, cursor: "pointer" }}>{label}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 10, color: C.textMuted, lineHeight: 1.5 }}>
          <sup>1</sup> Reichheld, F. & Schefter, P. "The Economics of E-Loyalty." Harvard Business School / Bain & Company.
        </div>
        <div style={{ fontSize: 10, color: C.textMuted, whiteSpace: "nowrap" }}>© {new Date().getFullYear()} Maniac Digital, LLC</div>
      </div>
    </footer>
  );
}

// ═══ HOME ═══
function Home({ setPage }) {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [awayFlown, setAwayFlown] = useState(false);
  const [activeFeat, setActiveFeat] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const t2 = setTimeout(() => setAwayFlown(true), 3000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const features = [
    { icon: "👤", title: "Relationship Profile", short: "Profile", desc: "12 dimensions of every relationship creating a core archetype of each client. Not metrics — personality. Rai knows the shape of every relationship and calibrates recommendations around it.", angle: -90, color: "#2E6B60" },
    { icon: "🩺", title: "Health Checks", short: "Health", desc: "8 honest questions every month, plus performance, communication, and event tracking. This isn't 'how satisfied are they' — Rai detects drift from their baseline, not from some universal standard.", angle: -30, color: "#B88B15" },
    { icon: "💰", title: "Billing", short: "Billing", desc: "Track every invoice, line item, and add-on per client per month. Rai connects revenue data to relationship health — a client paying more but engaging less is a different risk than one doing both.", angle: 30, color: "#5B21B6" },
    { icon: "◉", title: "Today", short: "Today", desc: "Every task, every note, every client you thought about today. Including recurring and company-wide tasks. Rai notices which clients need a little more attention and which ones you're outright neglecting.", angle: 90, color: "#0D9488" },
    { icon: "📇", title: "Rolodex", short: "Rolodex", desc: "Past clients aren't dead leads — they're your warmest pipeline. Rai tracks when to reconnect, who might refer, and when to engage. Former clients and one-off contacts, prioritized and ready.", angle: 150, color: "#334155" },
    { icon: "🤝", title: "Referrals", short: "Referrals", desc: "Your best client has never been asked for a referral. Rai knows who's ready, who's referred before, and when the relationship is strong enough to ask. The cheapest new business you'll ever win.", angle: 210, color: "#C4432B" },
  ];
  const channels = ["✉️ Gmail", "📅 Calendar", "💬 Slack", "📁 Drive", "💳 Stripe", "🐝 HoneyBook", "📊 Meta Ads", "🛍️ Shopify", "📸 Instagram", "📒 QuickBooks", "🎥 Loom", "📌 Pinterest"];

  return (
    <>
      {/* HERO */}
      <section style={{ padding: "72px 20px 40px", textAlign: "center" }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 0.2s", marginBottom: 20 }}>
          <h1 className="r-hero-text" style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 1.08 }}>
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: C.textMuted, position: "relative" }}>
                Customer
                <span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: loaded ? "108%" : "0%", transition: "width 0.5s ease 0.7s", borderRadius: 2, transform: "rotate(-1deg)" }} />
              </span>
              <span style={{ position: "absolute", top: "-0.75em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.65em", fontWeight: 700, color: C.primary, opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease 1.2s", whiteSpace: "nowrap" }}>Client</span>
            </span>
            {" "}Relationship Management
          </h1>
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.6, color: C.textSec, maxWidth: 810, margin: "0 auto 28px", opacity: loaded ? 1 : 0, transition: "all 0.5s ease 0.4s" }}>
          <p style={{ marginBottom: 6, fontWeight: 600, color: C.text }}>The clients you lose are savable.</p>
          <p>Traditional CRMs track deals and contacts. Retayned tracks the health of relationships — giving you client-specific solutions to keep (and grow) the business you've earned.</p>        </div>
        <div style={{ opacity: loaded ? 1 : 0, transition: "all 0.5s ease 0.6s", maxWidth: 400, margin: "0 auto 12px" }}>
          <button className="cta-btn" onClick={() => setPage("signup")} style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Try Free Now</button>
        </div>
        <p style={{ fontSize: 12, color: C.textMuted, opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.8s" }}>The secret weapon of agencies, freelancers, law firms, consultants, stylists, coaches, mobsters, and more.</p>
      </section>

      {/* STATS */}
      <section style={{ padding: "0 20px 64px", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.9s" }}>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { label: "Of churn is predictable", num: "90%" },
            { label: "Cheaper to retain than acquire", num: "25x" },
            { label: "Saved client pays for itself", num: "1+" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div className="r-stats" style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #33543E, #558B68)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".03em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* APP PREVIEW */}
      <section style={{ padding: "0 16px 64px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 1s" }}>
        <div style={{ background: C.sidebar, borderRadius: 14, padding: 2, boxShadow: "0 16px 48px rgba(0,0,0,0.1)" }}>
          <div style={{ background: C.card, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid " + C.borderLight }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.danger }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.warning }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.success }} />
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "monospace" }}>app.retayned.com</span>
              <div style={{ flex: 1 }} />
            </div>
            <div style={{ padding: 16, background: C.bg }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.danger, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>🚨 Alert</div>
                <div style={{ background: "#FAE8E4", borderRadius: 8, border: "1px solid " + C.danger + "44", overflow: "hidden" }}>
                  <div style={{ padding: "10px 14px" }}>
                    <p style={{ fontSize: 14, color: C.danger, fontWeight: 700, lineHeight: 1.4 }}>Foxglove Partners: Email Tom today with a brief update on a net-new task.</p>
                    <p style={{ fontSize: 12, color: C.danger + "aa", fontWeight: 400, lineHeight: 1.4, marginTop: 4 }}>Tom may be pulling back, which he has done once before when he was dissatisfied. This is a great opportunity to protect the contract.</p>
                  </div>
                  <div style={{ display: "flex", borderTop: "1px solid " + C.danger + "22" }}>
                    <div style={{ flex: 1, padding: "7px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.danger, borderRight: "1px solid " + C.danger + "22" }}>Add to Today's Tasks</div>
                    <div style={{ flex: 1, padding: "7px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.textMuted }}>Dismiss</div>
                  </div>
                </div>
              </div>
              {[{ name: "Northvane Studios", ret: 91, tag: "Creative", contact: "Sarah Chen", months: 34 }, { name: "Ridgeline Supply", ret: 73, tag: "Ecommerce", contact: "Marcus Webb", months: 11 }, { name: "Copper & Sage", ret: 55, tag: "Wellness", contact: "Elena Moss", months: 6 }, { name: "Foxglove Partners", ret: 38, tag: "B2B", contact: "Tom Aldrich", months: 3 }].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + C.borderLight }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontWeight: 700, fontSize: 14 }}>{row.name}</span><span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: C.surface, color: C.textMuted }}>{row.tag}</span></div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{row.contact} · {row.months}mo</div>
                  </div>
                  <div style={{ width: 40, height: 4, background: C.borderLight, borderRadius: 2 }}><div style={{ height: "100%", width: row.ret + "%", background: row.ret >= 70 ? C.success : row.ret >= 45 ? C.warning : C.danger, borderRadius: 2 }} /></div>
                  <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: row.ret >= 70 ? C.success : row.ret >= 45 ? C.warning : C.danger, minWidth: 28, textAlign: "right" }}>{row.ret}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontSize: 10, color: C.textMuted, textAlign: "center", marginTop: 8 }}>Dramatization based on client input data.</p>
      </section>

      {/* STATEMENT */}
      <div className="r-full-bleed" style={{ background: C.primarySoft, padding: "48px 20px", marginBottom: 64, position: "relative", overflow: "visible" }}>
        {/* Left - professional people group */}
        <svg style={{ position: "absolute", left: 120, bottom: -14, width: 120, height: 90, opacity: 0.14 }} className="r-stat-graphic-left" viewBox="0 0 120 90" fill="none">
          {/* Person 1 - front */}
          <circle cx="40" cy="22" r="14" fill={C.primary} />
          <path d="M40,36 C28,36 20,44 18,56 L18,90 L62,90 L62,56 C60,44 52,36 40,36 Z" fill={C.primary} />
          {/* Person 2 - behind left */}
          <circle cx="16" cy="28" r="10" fill={C.primary} opacity="0.6" />
          <path d="M16,38 C8,38 2,44 0,52 L0,90 L32,90 L32,52 C30,44 24,38 16,38 Z" fill={C.primary} opacity="0.6" />
          {/* Person 3 - behind right */}
          <circle cx="68" cy="30" r="9" fill={C.primary} opacity="0.45" />
          <path d="M68,39 C60,39 56,44 54,50 L54,90 L82,90 L82,50 C80,44 76,39 68,39 Z" fill={C.primary} opacity="0.45" />
          {/* Person 4 - far back */}
          <circle cx="92" cy="34" r="7" fill={C.primary} opacity="0.3" />
          <path d="M92,41 C86,41 82,45 81,50 L81,90 L103,90 L103,50 C102,45 98,41 92,41 Z" fill={C.primary} opacity="0.3" />
          {/* Connecting arc */}
          <path d="M20,70 Q45,58 68,70" stroke={C.primary} strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.3" />
        </svg>
        {/* Left accent - small handshake */}
        <svg style={{ position: "absolute", left: 250, bottom: -8, width: 36, height: 36, opacity: 0.1 }} className="r-stat-accent-left" viewBox="0 0 36 36" fill="none">
          <path d="M4,20 L12,14 L18,18 L24,12 L32,18" stroke={C.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M12,14 L18,20 L24,14" stroke={C.primary} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>

        {/* Right - money / growth */}
        <svg style={{ position: "absolute", right: 120, top: -16, width: 120, height: 90, opacity: 0.14 }} className="r-stat-graphic-right" viewBox="0 0 120 90" fill="none">
          {/* Rising bar chart */}
          <rect x="8" y="62" width="14" height="28" rx="3" fill={C.primary} opacity="0.4" />
          <rect x="28" y="48" width="14" height="42" rx="3" fill={C.primary} opacity="0.55" />
          <rect x="48" y="34" width="14" height="56" rx="3" fill={C.primary} opacity="0.7" />
          <rect x="68" y="18" width="14" height="72" rx="3" fill={C.primary} opacity="0.85" />
          <rect x="88" y="4" width="14" height="86" rx="3" fill={C.primary} />
          {/* Upward trend line */}
          <path d="M15,58 Q35,46 55,30 T102,6" stroke={C.primary} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
          {/* Arrow tip */}
          <path d="M96,4 L104,2 L100,10" stroke={C.primary} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
        </svg>
        {/* Right accent - dollar */}
        <svg style={{ position: "absolute", right: 250, top: -6, width: 32, height: 32, opacity: 0.1 }} className="r-stat-accent-right" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke={C.primary} strokeWidth="2" fill="none" />
          <text x="16" y="22" fontSize="16" fontWeight="800" fill={C.primary} fontFamily="Outfit, sans-serif" textAnchor="middle">$</text>
        </svg>
        <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.25, textAlign: "center", margin: "0 auto", position: "relative", zIndex: 2 }}>
          A 5% increase in retention can{" "}<span style={{ color: C.btn }}>boost profits by 95%.</span><sup style={{ fontSize: "0.4em", color: C.textMuted, verticalAlign: "super", lineHeight: 0 }}>¹</sup>
        </h2>
      </div>

      {/* BRAIN */}
      <section style={{ padding: "16px 16px 12px" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 8 }}>How It Works</h2>
        <p style={{ fontSize: 16, color: C.textSec, textAlign: "center", maxWidth: 810, margin: "0 auto 24px" }}><span style={{ fontWeight: 700 }}>Rai pays attention to every client, every day.</span> She knows that Jessica shuts down under stress, Mark is blunt and data-driven, and Sarah's looking for a new job. When something shifts, Rai catches it — and tells you what to do about it.</p>
        <div style={{ position: "relative", width: "100%", maxWidth: 500, margin: "0 auto", aspectRatio: "1" }}>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="155" fill="none" stroke={C.border} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            {features.map((f, i) => {
              const rad = (f.angle * Math.PI) / 180;
              const nx = 200 + 155 * Math.cos(rad), ny = 200 + 155 * Math.sin(rad);
              const mx = 200 + 70 * Math.cos(rad) + (i % 2 === 0 ? 15 : -15), my = 200 + 70 * Math.sin(rad) + (i % 2 === 0 ? -10 : 10);
              return (<g key={i}><path d={`M200,200 Q${mx},${my} ${nx},${ny}`} stroke={C.primaryLight} strokeWidth={activeFeat === i ? "2" : "1.5"} fill="none" opacity={activeFeat === i ? "0.6" : "0.3"} style={{ transition: "all 0.3s" }} /><path d={`M200,${195 + (i % 3) * 5} Q${mx + 8},${my - 5} ${nx},${ny}`} stroke={C.primaryLight} strokeWidth="0.7" fill="none" opacity="0.12" /><circle cx={200 + 50 * Math.cos(rad) + (i % 2 === 0 ? 4 : -4)} cy={200 + 50 * Math.sin(rad)} r="2" fill={C.primaryLight} opacity="0.25" /></g>);
            })}
            {features.map((f, i) => {
              const rad = (f.angle * Math.PI) / 180;
              const nx = 200 + 155 * Math.cos(rad), ny = 200 + 155 * Math.sin(rad);
              const mx = 200 + 70 * Math.cos(rad) + (i % 2 === 0 ? 15 : -15), my = 200 + 70 * Math.sin(rad) + (i % 2 === 0 ? -10 : 10);
              return (<circle key={"p" + i} r="2.5" fill={C.primary} opacity="0.45"><animateMotion dur={3 + i * 0.6 + "s"} repeatCount="indefinite" path={`M200,200 Q${mx},${my} ${nx},${ny}`} /></circle>);
            })}
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2, filter: "drop-shadow(0 6px 24px rgba(30,38,31,0.3))" }}>
            <svg width="130" height="135" viewBox="0 0 130 135" fill="none">
              <path d="M65 18C52 18 40 22 34 28C28 34 26 42 27 48C22 52 20 58 21 64C20 70 23 77 29 82C33 88 42 94 54 96C58 97 62 97.5 65 97" fill={C.primaryDeep} stroke={C.primaryDark} strokeWidth="1.5" />
              <path d="M65 18C78 18 90 22 96 28C102 34 104 42 103 48C108 52 110 58 109 64C110 70 107 77 101 82C97 88 88 94 76 96C72 97 68 97.5 65 97" fill={C.primaryDeep} stroke={C.primaryDark} strokeWidth="1.5" />
              <path d="M65 20V95" stroke={C.primary} strokeWidth="1" opacity="0.35" />
              <path d="M32 42C40 46 52 44 62 39" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.35" />
              <path d="M25 58C36 54 48 57 62 54" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
              <path d="M30 72C38 68 50 70 62 68" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />
              <path d="M98 42C90 46 78 44 68 39" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.35" />
              <path d="M105 58C94 54 82 57 68 54" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
              <path d="M100 72C92 68 80 70 68 68" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />
              <circle cx="44" cy="48" r="5" fill={C.primaryLight} opacity="0.12" /><circle cx="82" cy="52" r="6" fill={C.primaryLight} opacity="0.1" /><circle cx="54" cy="68" r="4" fill={C.primaryLight} opacity="0.15" /><circle cx="78" cy="72" r="5" fill={C.primaryLight} opacity="0.12" /><circle cx="65" cy="44" r="4" fill={C.primaryLight} opacity="0.18" />
              <text x="65" y="118" textAnchor="middle" fill={C.primary} fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif" letterSpacing="0.06em">RAI</text>
            </svg>
          </div>
          {features.map((f, i) => {
            const rad = (f.angle * Math.PI) / 180;
            const x = 50 + (155 / 200) * 50 * Math.cos(rad), y = 50 + (155 / 200) * 50 * Math.sin(rad);
            const isA = activeFeat === i;
            return (<div key={i} onClick={() => setActiveFeat(isA ? null : i)} style={{ position: "absolute", left: `calc(${x}% - 28px)`, top: `calc(${y}% - 28px)`, width: 56, height: 56, borderRadius: "50%", background: isA ? C.primary : C.card, border: (isA ? "2.5px solid " + C.primary : "2px solid " + C.border), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: isA ? "0 4px 20px rgba(51,84,62,0.3)" : "0 2px 10px rgba(0,0,0,0.06)", zIndex: 3, cursor: "pointer", transition: "all 0.25s" }}><span style={{ fontSize: 17, lineHeight: 1 }}>{f.icon}</span><span style={{ fontSize: 7, fontWeight: 700, color: isA ? "rgba(255,255,255,.8)" : C.textMuted, marginTop: 2 }}>{f.short}</span></div>);
          })}
        </div>
        <div style={{ maxWidth: 500, margin: "12px auto 0", minHeight: 40, opacity: activeFeat !== null ? 1 : 0, transform: activeFeat !== null ? "translateY(0)" : "translateY(8px)", transition: "all 0.3s" }}>
          {activeFeat !== null ? (<div style={{ background: C.card, borderRadius: 14, padding: "22px", border: "2px solid " + C.primary, boxShadow: "0 4px 20px rgba(51,84,62,0.08)" }}><div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}><div style={{ width: 40, height: 40, borderRadius: 10, background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>{features[activeFeat].icon}</div><h3 style={{ fontSize: 18, fontWeight: 700 }}>{features[activeFeat].title}</h3></div><p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6 }}>{features[activeFeat].desc}</p></div>) : (<div style={{ textAlign: "center", padding: "8px 0" }}><p style={{ fontSize: 14, color: C.textMuted }}>Tap a node to explore</p></div>)}
        </div>
      </section>

      {/* CHANNELS */}
      {(() => {
        const plugRef = useRef(null);
        const [plugged, setPlugged] = useState(false);
        useEffect(() => {
          const el = plugRef.current;
          if (!el) return;
          const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setPlugged(true); obs.disconnect(); }
          }, { threshold: 0.5 });
          obs.observe(el);
          return () => obs.disconnect();
        }, []);
        return (
          <section ref={plugRef} style={{ paddingTop: 32, paddingBottom: 72, position: "relative", overflow: "visible" }}>
            <style>{`
              @keyframes cordLeft { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
              @keyframes cordRight { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }
              @keyframes sparkPop { 0% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1.3); } 100% { opacity: 0; transform: scale(0); } }
            `}</style>
            {/* Cord container */}
            <div style={{ position: "relative", height: 60, marginBottom: 12, width: "100vw", left: "50%", transform: "translateX(-50%)", overflow: "hidden" }}>
              {/* Left cord */}
              <svg style={{ position: "absolute", top: 0, left: 0, width: "calc(50% - 35px)", height: 60, animation: plugged ? "cordLeft 0.8s ease-out forwards" : "none", transform: plugged ? "translateX(0)" : "translateX(-100%)" }} viewBox="0 0 500 60" preserveAspectRatio="none">
                <path d="M0,30 Q100,30 150,20 T300,35 T420,25 T500,30" stroke={C.primary} strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
              {/* Right cord */}
              <svg style={{ position: "absolute", top: 0, right: 0, width: "calc(50% - 35px)", height: 60, animation: plugged ? "cordRight 0.8s ease-out forwards" : "none", transform: plugged ? "translateX(0)" : "translateX(100%)" }} viewBox="0 0 500 60" preserveAspectRatio="none">
                <path d="M500,30 Q400,30 350,40 T200,25 T80,35 T0,30" stroke={C.primaryLight} strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
              {/* Center plug + socket */}
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 60, opacity: plugged ? 1 : 0, transition: "opacity 0.2s ease 0.7s" }}>
                <svg width="120" height="60" viewBox="0 0 120 60">
                  {/* Left plug — body tapering from cord, two prongs extending right */}
                  <path d="M0,30 C6,30 10,22 14,18 L14,42 C10,38 6,30 0,30 Z" fill={C.primary} />
                  <rect x="14" y="16" width="18" height="28" rx="4" fill={C.primary} />
                  <rect x="32" y="22" width="12" height="4" rx="2" fill={C.primary} />
                  <rect x="32" y="34" width="12" height="4" rx="2" fill={C.primary} />
                  {/* Right socket — body tapering to cord, recessed slots */}
                  <path d="M120,30 C114,30 110,22 106,18 L106,42 C110,38 114,30 120,30 Z" fill={C.sidebar} />
                  <rect x="82" y="16" width="24" height="28" rx="4" fill={C.sidebar} />
                  <rect x="82" y="23" width="10" height="3" rx="1" fill={C.bg} opacity="0.3" />
                  <rect x="82" y="34" width="10" height="3" rx="1" fill={C.bg} opacity="0.3" />





                  {/* Spark lines between plug and socket */}
                  <line x1="54" y1="6" x2="58" y2="14" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="60" y1="2" x2="60" y2="11" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="66" y1="6" x2="62" y2="14" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="54" y1="54" x2="58" y2="46" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="60" y1="58" x2="60" y2="49" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="66" y1="54" x2="62" y2="46" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              {/* Spark */}
              {plugged && (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <div key={i} style={{ position: "absolute", width: 4 + Math.random() * 4, height: 4 + Math.random() * 4, borderRadius: "50%", background: i % 2 === 0 ? "#FFD700" : "#FFA500", boxShadow: `0 0 ${6 + i * 2}px ${i % 2 === 0 ? "#FFD700" : "#FFA500"}`, left: Math.cos(i * Math.PI / 4) * (12 + Math.random() * 10), top: Math.sin(i * Math.PI / 4) * (12 + Math.random() * 10), animation: `sparkPop 0.4s ease-out ${0.75 + i * 0.04}s forwards`, opacity: 0 }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ padding: "0 20px" }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 12 }}>Plugs Into Your Workflow</h2>
            </div>
            <div style={{ padding: "0 20px" }}>
              <p style={{ fontSize: 16, color: C.textSec, textAlign: "center", marginBottom: 24 }}>Integrations help the engine adapt and learn, supplying you with even more insight.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                {["✉️ Gmail", "📁 Meets", "📅 Calendar", "💬 Slack", "🎥 Zoom"].map((ch, i) => (
                  <div key={i} className="ch-pill" style={{ padding: "10px 14px", background: C.card, borderRadius: 10, border: "1px solid " + C.border, fontSize: 13, fontWeight: 500 }}>{ch}</div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* PHILOSOPHY */}
      <div className="r-full-bleed" style={{ background: C.heroGrad, padding: "56px 20px", marginBottom: 64 }}>
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "rgba(255,255,255,.3)", marginBottom: 16 }}>Retayned Wisdom</div>
          <blockquote style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.45, letterSpacing: "-0.02em", margin: 0, color: "#fff" }}>"The conversation you're avoiding is the one that saves the account."</blockquote>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.38)", marginTop: 16, lineHeight: 1.5 }}>Retayned doesn't help you avoid hard conversations. It just helps you have them.</p>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section style={{ padding: "0 20px 64px" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 8 }}>What the People Are Saying</h2>
        <p style={{ fontSize: 16, color: C.textSec, textAlign: "center", marginBottom: 24 }}>From our own Retayned business.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {[
            { quote: "I used to lose 2-3 clients a year and just accept it as cost of doing business. Retayned showed me an actual pattern. It was the same signs every time and we just ignored them. Not anymore!", name: "Agency Owner", role: "50+ Clients", stars: 5 },
            { quote: "It gave me the exact words to say to a client I was about to lose. I had the conversation that afternoon. They're still with me 8 months later. I'm still with Retayned.", name: "Solo Operator", role: "1-5 Clients", stars: 5 },
            { quote: "The health check questions are uncomfortable in the best way. They force you to admit what you already know but haven't said out loud. It's something we thought we'd use for crises and it's turned into our daily operations hub.", name: "Freelance Consultant", role: "10-50 Clients", stars: 5 },
          ].map((t, i) => (
            <div key={i} style={{ background: C.card, borderRadius: 14, padding: "24px 22px", border: "1px solid " + C.border, flex: "1 1 280px", minWidth: 280, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                {Array(t.stars).fill(0).map((_, j) => (
                  <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: 15, color: C.text, lineHeight: 1.6, marginBottom: 16, fontStyle: "italic", flex: 1 }}>"{t.quote}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{t.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <div className="r-full-bleed" style={{ background: C.primarySoft, padding: "48px 20px 64px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 24 }}>FAQs</h2>
          <FAQ fullBleed />
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="r-full-bleed" style={{ background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 50%, #1E261F 100%)", padding: "72px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12, color: "#fff" }}>You work too hard to get new clients. Keep them Retayned.</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,.6)", marginBottom: 24, lineHeight: 1.5 }}>See the signal. Make the changes. Keep the client.</p>
        <button className="cta-btn" onClick={() => setPage("signup")} style={{ padding: "14px 32px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Try Free Now</button>
      </div>
    </>
  );
}

// ═══ PRICING ═══
function Pricing({ setPage }) {
  const [annual, setAnnual] = useState(true);
  const tiers = [
    { name: "Starter", desc: "Solopreneurs and freelancers", monthly: 39, annual: 29, clients: "Up to 15 clients", hl: false, features: ["Client registry + profiles", "12-dimension relationship scoring", "Health check assessments", "AI Coach — unlimited", "Retention scoring engine", "3 channel integrations", "Email support"] },
    { name: "Growth", desc: "Agencies and teams", monthly: 99, annual: 79, clients: "Unlimited clients", hl: true, features: ["Everything in Starter, plus:", "Up to 5 team members", "Unlimited integrations", "Unlimited Rolodex", "Additional velocity detection", "Manager dashboard", "Priority support"] },
  ];
  return (
    <>
      <section style={{ padding: "48px 20px 24px", textAlign: "center" }}>
        <h1 className="r-hero-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.3, marginBottom: 12 }}>One client saved pays for{" "}
          <span style={{ position: "relative", display: "inline-block", marginTop: "0.3em" }}>
            <span style={{ color: C.textMuted }}>a year<span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} /></span>
            <span style={{ position: "absolute", top: "-0.55em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.7em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap" }}>years</span>
          </span>{" "}of Retayned.
        </h1>
        <p style={{ fontSize: 16, color: C.textSec, marginBottom: 24 }}>The math works. Still not convinced? Try it free for 14 days. 🤝</p>
        <div style={{ display: "inline-flex", gap: 12, padding: "4px 6px", background: C.surface, borderRadius: 10 }}>
          <button onClick={() => setAnnual(true)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", background: annual ? C.primary : "transparent", color: annual ? "#fff" : C.textMuted }}>Annual <span style={{ fontSize: 11, opacity: 0.8 }}>save 25%</span></button>
          <button onClick={() => setAnnual(false)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", background: !annual ? C.primary : "transparent", color: !annual ? "#fff" : C.textMuted }}>Monthly</button>
        </div>
      </section>
      <section style={{ padding: "24px 16px 48px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 1200, margin: "0 auto", justifyContent: "center" }}>
          {tiers.map((t, i) => (
            <div key={i} style={{ background: t.hl ? C.heroGrad : C.card, borderRadius: 16, padding: "28px 24px", border: t.hl ? "none" : "1.5px solid " + C.border, color: t.hl ? "#fff" : C.text, position: "relative", overflow: "hidden", flex: "1 1 280px", maxWidth: 340, minWidth: 280 }}>
              {t.hl && <div style={{ position: "absolute", top: 14, right: -28, background: "#fff", color: C.primary, fontSize: 10, fontWeight: 700, padding: "4px 32px", transform: "rotate(45deg)" }}>POPULAR</div>}
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: t.hl ? "rgba(255,255,255,.5)" : C.textMuted, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 14, color: t.hl ? "rgba(255,255,255,.65)" : C.textSec, marginBottom: 16 }}>{t.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.03em" }}>${annual ? t.annual : t.monthly}</span><span style={{ fontSize: 14, color: t.hl ? "rgba(255,255,255,.5)" : C.textMuted }}>/mo</span></div>
              <div style={{ marginBottom: 16 }} />
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: t.hl ? "rgba(255,255,255,.8)" : C.text }}>{t.clients}</div>
              <button className="cta-btn" style={{ width: "100%", padding: "13px 20px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 20, background: t.hl ? "#fff" : C.btn, color: t.hl ? C.btn : "#fff", border: "none" }}>Start Free Trial</button>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{t.features.map((f, j) => (<div key={j} style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.4 }}>{!(j === 0 && i > 0) && <span style={{ color: t.hl ? "rgba(255,255,255,.5)" : C.primaryLight }}>✓</span>}<span style={{ color: t.hl ? "rgba(255,255,255,.8)" : C.textSec, fontWeight: j === 0 && i > 0 ? 700 : 400 }}>{f}</span></div>))}</div>
            </div>
          ))}
          {/* Enterprise */}
          <div style={{ background: C.card, borderRadius: 16, border: "1.5px solid " + C.border, padding: "28px 24px", position: "relative", overflow: "hidden", flex: "1 1 280px", maxWidth: 340, minWidth: 280 }}>
            <div style={{ position: "absolute", top: 28, right: -36, background: C.danger, color: "#fff", fontSize: 9, fontWeight: 700, padding: "5px 44px", transform: "rotate(45deg)", letterSpacing: ".04em", textAlign: "center" }}>COMING SOON</div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.textMuted, marginBottom: 4 }}>Enterprise</div>
            <div style={{ fontSize: 14, color: C.textSec, marginBottom: 16 }}>Relationship intelligence for AI agents</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}><span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.03em" }}>Let's Talk</span></div>
            <div style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: C.text }}>API + integration layer</div>
            <button onClick={() => setPage("contact")} className="cta-btn" style={{ width: "100%", padding: "13px 20px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 20, background: C.btn, color: "#fff", border: "none" }}>Contact Us</button>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Client archetype classification API", "Response protocols", "Behavioral guardrails", "Multi-tenant data isolation", "Outcome-trained rec engine", "Custom archetype training", "Dedicated integration support"].map((f, j) => (
                <div key={j} style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.4 }}>
                  <span style={{ color: C.primaryLight }}>✓</span>
                  <span style={{ color: C.textSec }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: "48px 20px 64px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>You work too hard to get new clients. Keep them Retayned.</h2>
        <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.5 }}>See the signal. Make the changes. Keep the client.</p>
      </section>
    </>
  );
}

// ═══ ABOUT ═══
function About({ setPage }) {
  return (
    <>
      <section style={{ padding: "48px 20px 40px" }}>
        <h1 className="r-hero-text" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.25, marginBottom: 16 }}>
          Built by someone who's kept clients for{" "}
          <span style={{ position: "relative", display: "inline-block", marginTop: "0.3em" }}>
            <span style={{ color: C.textMuted }}>years<span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} /></span>
            <span style={{ position: "absolute", top: "-0.55em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.7em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap" }}>a decade+</span>
          </span>.
        </h1>
        <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65 }}>Retayned wasn't planned. We kept clients for 10+ years through COVID, work from home, digital transformation, fun AI, scary AI, and everything in between. We assumed what we were doing was normal. When we found out we were doing something genuinely special, we wanted to share it.</p>
      </section>

      {/* Founder */}
      <section style={{ padding: "0 20px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={HEADSHOT} alt="Adam Lawrence" style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover", objectPosition: "center 15%" }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>Adam Lawrence</div>
            <div style={{ fontSize: 13, color: C.textMuted }}>Founder</div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 20px 40px" }}>
        <div style={{ background: C.card, borderRadius: 14, padding: "28px 24px", border: "1px solid " + C.border }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.textMuted, marginBottom: 16 }}>The backstory</div>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.7 }}>
            <p style={{ marginBottom: 14 }}>Adam Lawrence spent most of his career running a paid social agency, managing campaigns and client relationships for agencies, DTC brands, and enterprise clients.</p>
            <p style={{ marginBottom: 14 }}>Over that time, one pattern became impossible to ignore: he rarely lost accounts. And even when he did, the client would often come back later or refer business.</p>
            <p style={{ marginBottom: 14 }}>At first, he wasn't sure why. So he dug in. Sure, the ad performance was great — but other agencies had comparable results. It wasn't pricing; he wasn't close to the cheapest option. He kept looking until one day he found the answer.</p>
            <p style={{ marginBottom: 14, padding: "16px 20px", background: C.primarySoft, borderRadius: 10, borderLeft: "3px solid " + C.primary }}><em>The Founder</em> moment: a potential client said: <strong>"You're not in the paid social business. You're in the client retention business."</strong></p>
            <p style={{ marginBottom: 14 }}>That hit different. Because it was true.</p>
            <p style={{ marginBottom: 14 }}>So we all got to work. We profiled how each client communicated — were they direct or did they hint? We tracked what they actually cared about versus what they said they cared about. We watched for the subtle signals — response times slowing, meetings getting cancelled, feedback shifts. And when those signals appeared, we didn't avoid the conversation. We had it early, with the right framing, and with words that acknowledged what was really going on.</p>
            <p style={{ marginBottom: 14, fontStyle: "italic" }}>We were doing retention engineering without knowing it had a name.</p>
            <p style={{ marginBottom: 14 }}>The problem was that it all lived in our heads. There was no system. No dashboard. No way to scale it beyond the accounts we personally touched. When we looked for a tool that did what we were doing instinctively, it didn't exist. The enterprise churn platforms cost $1,500+/month and takes months to learn. The freelancer CRMs were glorified invoicing tools wearing a "retention" hat. There was no such tool.</p>
            <p style={{ marginBottom: 14 }}>So we built it.</p>
            <p>Retayned does something almost every CRM doesn't: it looks 👀. It reads the signals, profiles the relationship, and gives simple, digestible notes to delight your clients. Together, we can move on from clients moving on.</p>
          </div>
        </div>
      </section>
      <section style={{ padding: "0 20px 40px" }}>
        <div style={{ background: C.heroGrad, borderRadius: 14, padding: "32px 24px", color: "#fff" }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.35)", marginBottom: 12 }}>Washington, DC</div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,.8)" }}>Based in the District, we're a small, focused team building a tool we want you to LOVE using. We want to help you turn client relationships into lifelong partnerships that matter and have real weight.</p>
        </div>
      </section>
    </>
  );
}

// ═══ LEARN ═══
function Blog() {
  const [activeModule, setActiveModule] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sliderVals, setSliderVals] = useState({});

  const reset = () => { setActiveModule(null); setStep(0); setAnswers({}); setEmail(""); setName(""); setSubmitted(false); setSliderVals({}); };

  useEffect(() => { if (activeModule) window.scrollTo(0, 0); }, [step, activeModule]);

  const modules = [
    { emoji: "🩺", id: "health", title: "Retention Health Check", desc: "Think of one client. Answer five questions honestly. Get a retention score and know what to do next.", time: "60 sec", tag: "Assessment" },
    { emoji: "💰", id: "calculator", title: "The Retention Calculator", desc: "See what client churn is actually costing you. The number is always bigger than you think.", time: "30 sec", tag: "Calculator" },
    { emoji: "👤", id: "profile", title: "Grade Your Client Relationship", desc: "Score one client across 12 relationship dimensions. See where the cracks are.", time: "2 min", tag: "Assessment" },
    { emoji: "🎭", id: "simulator", title: "The Hard Conversation Simulator", desc: "Five scenarios. Three approaches each. See how your instincts play out.", time: "4 min", tag: "Simulator" },
  ];

  // ── Health Check data ──
  const hcQuestions = [
    { q: "Has this client's communication pattern changed recently?", opts: [{ t: "Same as always — no shift in how we talk", s: 10 }, { t: "Slightly different but could be nothing", s: 8 }, { t: "Noticeably different from normal", s: 3 }, { t: "Something has clearly changed", s: 1 }] },
    { q: "When was your last meaningful conversation?", opts: [{ t: "This week — we're in a good rhythm", s: 10 }, { t: "Within 2 weeks — normal for us", s: 8 }, { t: "It's been a while — longer than usual", s: 4 }, { t: "It's been 84 years...", s: 1 }] },
    { q: "How honest is the feedback you're getting?", opts: [{ t: "Same as always — they engage the way they always have", s: 10 }, { t: "Slightly less engaged than normal", s: 8 }, { t: "Noticeably pulled back from how they used to be", s: 4 }, { t: "Little to no feedback at all — and that's new", s: 1 }] },
    { q: "Is there a conversation you've been putting off?", opts: [{ t: "No — we're aligned and I feel good about it", s: 10 }, { t: "Something small I should probably mention", s: 8 }, { t: "Something real that's been on my mind", s: 4 }, { t: "Yes — and the longer I wait the harder it gets", s: 1 }] },
    { q: "If they cancelled tomorrow, how would you feel?", opts: [{ t: "Surprised. Unexpected for sure.", s: 10 }, { t: "Surprised but I could see it if I'm honest", s: 6 }, { t: "Not that surprised", s: 3 }, { t: "I've had the thought myself", s: 1 }] },
  ];

  // ── Signals Quiz data ──
  const signalQuestions = [
    { msg: "\"Hey, just looping in my colleague Dana on this thread. She'll be taking point on a few things.\"", opts: ["Delegation — they trust you more", "New stakeholder — potential risk", "They're stepping back from the relationship", "Normal team expansion"], correct: 2, explain: "When your main contact starts handing off to someone else without context, it often means they're creating distance. The relationship is cooling before the contract does." },
    { msg: "\"All good on our end! Nothing to flag this week.\"", opts: ["Everything is fine", "They're too busy to engage", "They've stopped caring enough to give feedback", "They're being polite before bad news"], correct: 2, explain: "Vague positivity with no specifics is one of the most missed churn signals. Engaged clients give details. Disengaging clients give you 'all good.'" },
    { msg: "\"Can you send over a summary of everything we've done this quarter? Just want to have it for my files.\"", opts: ["Normal record-keeping", "Preparing a case to show their boss", "Building a handoff document", "Wants to appreciate your work"], correct: 2, explain: "When a client asks for a comprehensive summary unprompted, they may be preparing to transition. This is a handoff document in disguise." },
    { msg: "\"We're going to hold off on the new campaign for now. Let's revisit next month.\"", opts: ["Budget timing issue", "Lost confidence in the strategy", "Testing if they miss you", "Normal business pause"], correct: 1, explain: "Indefinite delays often mean the client has lost confidence but doesn't want confrontation. 'Next month' frequently becomes never. The conversation to have is now." },
    { msg: "\"I forwarded your last report to our CEO. She had some questions.\"", opts: ["Great — executive visibility", "Your work is being scrutinized", "The CEO is considering alternatives", "They want you to impress leadership"], correct: 1, explain: "Reports getting escalated to leadership without a heads-up often means your work is under review. It could be positive, but more often it means someone questioned the value." },
  ];

  // ── Simulator data ──
  const raiNudge = " The truth is, by the time response times have doubled and meetings are slipping, you're playing catch-up. The A play was having this conversation weeks ago when the first signal appeared. Want help spotting those earlier? Talk to Rai.";
  const simScenarios = [
    { title: "The New Stakeholder", setup: "Your main contact Mike just told you his new boss wants to \"review all vendor relationships.\" Mike says not to worry. What do you do?",
      opts: [
        { label: "Ask for an intro to Mike's new boss to set the tone directly", desc: "\"Mike, we'd really like to speak to your new boss to make sure he sees our value..\"", outcome: "If Mike is protective of the relationship, you just undermined your biggest advocate. If you are already providing value, the new boss will likely see it regardless. Rai can help diagnose situations like this.", score: "C" },
        { label: "Ask Mike how he'd like to handle it together", desc: "\"I trust your read on this. How do you want to play it — should I put something together for you, or would it help if I met them directly?\"", outcome: "You're respecting Mike's position while giving him options. He knows whether an intro helps or hurts.", score: "A" },
        { label: "Trust Mike and wait it out", desc: "He knows the internal dynamics better than you.", outcome: "This can work — if Mike has real influence and a strong relationship with the new boss. But you're betting your contract on someone else's political capital without knowing how much they have.", score: "B" },
      ]},
    { title: "The Vague Feedback Shift", setup: "Your client Ally used to give detailed, specific feedback on every deliverable. For the last three rounds, it's been \"looks good\" and nothing else. What do you do?",
      opts: [
        { label: "Send a longer-form review request or survey", desc: "A formal feedback form covering satisfaction, communication, and goals.", outcome: "Formality when the relationship has been informal signals that you know something is wrong. It also gives her an easy out — she'll check all the positive boxes and you'll learn nothing.", score: "C" },
        { label: "Enjoy the easy approval and move on", desc: "Less revision means more efficiency. Maybe she just trusts you now.", outcome: "Vague positivity is one of the most missed churn signals. Engaged clients give details. Disengaging clients say \"looks good.\"", score: "D" },
        { label: "Ask a specific question that forces a real answer", desc: "\"Ally, on the last campaign — was the creative direction what you had in mind, or would you have gone a different way?\"", outcome: "You're not asking, \"Is everything okay?\" — you're making it easy for her to give you something real without it feeling like a confrontation.", score: "A" },
      ]},
    { title: "The Budget Conversation", setup: "Your client James casually mentions they're \"tightening budgets across the board this quarter.\" He hasn't said anything about your contract specifically. What do you do?",
      opts: [
        { label: "Proactively propose a restructured package", desc: "\"James, I heard you on the budget pressure. Here's what I'd suggest if we need to adjust — these are the highest-impact pieces I'd protect.\"", outcome: "You're showing you listened, you're flexible, and you're strategic. Clients cut vendors who seem rigid first.", score: "A" },
        { label: "Wait to see if it affects you", desc: "He didn't mention your contract. No need to bring it up and plant ideas.", outcome: "You're hoping the problem doesn't find you. It usually does — and by then you've lost the chance to shape the conversation.", score: "C" },
        { label: "Ask directly if your contract is at risk", desc: "\"James, should I be worried about our engagement?\"", outcome: "Direct, but it puts him in an awkward position and frames you as a cost to defend rather than a partner solving a problem.", score: "C" },
      ]},
    { title: "The Competitor Mention", setup: "During a call, your client Priya casually says \"we've been getting pitched by a few other agencies lately.\" She laughs it off. What do you do?",
      opts: [
        { label: "Laugh it off too and change the subject", desc: "She brought it up casually, so it's probably nothing. Don't make it weird.", outcome: "She told you for a reason. Clients don't mention competitors by accident. This was either a test or a warning — either way, ignoring it is the worst response.", score: "D" },
        { label: "Immediately pitch new ideas to prove your value", desc: "Launch into everything new you've been thinking about to remind her why she hired you.", outcome: "Reactive and transparent. She'll see through it — and it signals insecurity rather than confidence.", score: "C" },
        { label: "Match her energy with confidence", desc: "\"Of course you are! You're a great client. I'd be worried if they weren't calling you.\"", outcome: "No panic, no defensiveness. You're reminding her she's valuable and you're not threatened. Confidence is the most underrated retention tool.", score: "A" },
      ]},
    { title: "The Slow Fade", setup: "Your client Sarah used to respond within hours. Now it takes days. Meetings keep getting rescheduled. The work quality hasn't changed. What do you do?",
      opts: [
        { label: "Name the pattern directly", desc: "\"Sarah, I've noticed our rhythm has shifted. I want to make sure I'm still delivering what matters most to you.\"", outcome: "This is the right instinct and it may still work." + raiNudge, score: "B" },
        { label: "Send a check-in email", desc: "\"Hey Sarah, just checking in — everything okay on your end?\"", outcome: "She'll say \"All good!\" and the fade continues. You've confirmed nothing and changed nothing." + raiNudge, score: "C" },
        { label: "Increase deliverables to prove value", desc: "Send an extra report, add a new initiative, work harder.", outcome: "More output doesn't fix a relationship problem. You're solving the wrong thing and burning resources." + raiNudge, score: "D" },
      ]},
  ];

  // ── Autopsy data ──
  const autopsyQuestions = [
    { q: "How did communication change in the last 3 months?", opts: ["Got quieter over time", "Shifted to someone else", "Became more formal/transactional", "Didn't change — it was sudden"] },
    { q: "What was the stated reason for leaving?", opts: ["Budget cuts", "Going in a different direction", "Hired in-house", "Performance concerns", "No real explanation given"] },
    { q: "Were there signs you ignored?", opts: ["Delayed responses", "Vague feedback", "Scope reduction", "Meetings cancelled", "I honestly didn't see any"] },
    { q: "How was the relationship at a personal level?", opts: ["Strictly business — always was", "Used to be warm, cooled off", "Warm until the end", "Never really connected"] },
    { q: "Did you have the hard conversation?", opts: ["Yes, early on", "Yes, but too late", "No — I avoided it", "There was no conversation to have"] },
    { q: "Would they refer you today?", opts: ["Definitely yes", "Probably yes", "Probably not", "Definitely not", "No idea"] },
  ];

  const autopsyPatterns = {
    "Silence Spiral": { match: (a) => a[0] === 0 && (a[2] === 0 || a[2] === 1) && a[4] !== 0, desc: "Communication faded gradually. The signals were there — you just didn't act on them. This is the most common and most preventable pattern." },
    "Expectation Gap": { match: (a) => a[1] === 3 && (a[3] === 0 || a[3] === 3), desc: "They expected something different than what they got. Not worse — different. This is a profiling problem, not a performance problem." },
    "Decision-Maker Shift": { match: (a) => a[0] === 1, desc: "Your champion left or lost influence. The new person didn't inherit the relationship. Without re-establishing trust with the new stakeholder, the contract follows the person, not the company." },
    "Avoidance Loop": { match: (a) => a[4] === 2, desc: "You knew something was wrong and didn't address it. The conversation you avoided was the one that could have saved the account." },
    "Sudden Exit": { match: (a) => a[0] === 3 && a[2] === 4, desc: "No visible warning signs. This usually means the decision happened above your contact's level, or the signals were in channels you weren't monitoring." },
  };

  // ── Profile dimensions ──
  const profileDims = [
    { key: "commFreq", name: "Communication Frequency", left: "Rarely", right: "Constantly" },
    { key: "commTone", name: "Communication Tone", left: "Reserved", right: "Direct" },
    { key: "trustLevel", name: "Trust Level", left: "Hands-on", right: "Delegated" },
    { key: "decisionSpeed", name: "Decision Speed", left: "Deliberate", right: "Immediate" },
    { key: "feedbackStyle", name: "Feedback Style", left: "Indirect", right: "Blunt" },
    { key: "metricFocus", name: "Metric Focus", left: "Gut feel", right: "Data-driven" },
    { key: "expectLevel", name: "Expectation Level", left: "Conservative", right: "Aggressive" },
    { key: "reportNeed", name: "Reporting Need", left: "Hands-off", right: "Everything" },
    { key: "stressResponse", name: "Stress Response", left: "Goes quiet", right: "Gets loud" },
    { key: "changeAppetite", name: "Change Appetite", left: "Stable", right: "Experimenting" },
    { key: "loyaltySignal", name: "Loyalty Signal", left: "Shopping around", right: "Locked in" },
    { key: "relationDepth", name: "Relationship Depth", left: "Business", right: "Personal" },
  ];

  // ── Shared email gate ──
  const EmailGate = ({ title }) => (
    <div style={{ background: C.heroGrad, borderRadius: 14, padding: "28px 24px", color: "#fff", textAlign: "center" }}>
      {!submitted ? (
        <>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{title || "Want help before your next tough convo?"}</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 16 }}>Start your 14-day free trial. Cancel anytime.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ width: "100%", padding: "12px 14px", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", boxSizing: "border-box" }} />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: "12px 14px", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", boxSizing: "border-box" }} />
            <button onClick={() => { if (email.includes("@")) setSubmitted(true); }} className="cta-btn" style={{ width: "100%", padding: "12px 20px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Try Free Now</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>You're in.</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>You're on the list. We'll be in touch soon.</p>
        </>
      )}
    </div>
  );

  const Opt = ({ text, selected, onClick }) => (
    <div onClick={onClick} style={{ padding: "12px 16px", borderRadius: 10, cursor: "pointer", background: selected ? C.primarySoft : C.bg, border: "1.5px solid " + (selected ? C.primary : C.borderLight), fontSize: 14, color: selected ? C.primary : C.textSec, fontWeight: selected ? 600 : 400, transition: "all 0.15s" }}>{text}</div>
  );

  const BackBtn = ({ onClick }) => <button onClick={onClick} style={{ padding: "8px 16px", background: C.surface, color: C.textSec, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>← Back</button>;
  const NextBtn = ({ onClick, disabled, label }) => <button onClick={onClick} style={{ padding: "8px 20px", background: disabled ? C.surface : C.btn, color: disabled ? C.textMuted : "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer", fontFamily: "inherit" }}>{label || "Next →"}</button>;

  // ── MODULE RENDERERS ──

  const renderHealth = () => {
    const total = hcQuestions.length;
    if (step < total) {
      const q = hcQuestions[step];
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{step + 1} of {total}</p>
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((o, i) => <Opt key={i} text={o.t} selected={answers[step] === i} onClick={() => { setAnswers({ ...answers, [step]: i }); setTimeout(() => setStep(step + 1), 300); }} />)}
          </div>
          {step > 0 && <div style={{ marginTop: 14 }}><BackBtn onClick={() => setStep(step - 1)} /></div>}
        </div>
      );
    }
    const score = Math.round(hcQuestions.reduce((a, q, i) => a + q.opts[answers[i]]?.s, 0) / 50 * 100);
    const label = score >= 90 ? "Thriving" : score >= 80 ? "Healthy" : score >= 70 ? "Check In" : score >= 60 ? "Attention Needed" : score >= 50 ? "Watch Closely" : score >= 40 ? "At Risk" : score >= 30 ? "Serious" : score >= 20 ? "Critical" : "Emergency";
    const color = score >= 70 ? C.success : score >= 50 ? C.warning : C.danger;
    const msg = score >= 90 ? "This relationship is strong. Keep showing up the way you have been. Great work!"
      : score >= 80 ? "Healthy. Nothing urgent that stands out, but don't coast — momentum is easier to keep than rebuild."
      : score >= 70 ? "Nothing alarming, but worth considering what you can do slightly differently to improve this engagement."
      : score >= 60 ? "Something is off. You seem to sense it. Think through what's changed and how you can address any new variables. We recommend reviewing with Rai."
      : score >= 50 ? "There's a pattern forming here. Multiple signals suggest this isn't a one-off rough patch. We recommend having an honest conversation soon. Speak with Rai."
      : score >= 40 ? "Several things need attention and they're compounding. The longer you wait, the harder each one gets to fix. Speak with Rai before this escalates."
      : score >= 30 ? "This client relationship has serious, overlapping problems. We strongly recommend building a retention gameplan with Rai today. Not this week — today."
      : score >= 20 ? "This relationship has deep fractures on multiple fronts. If there's a path back, it requires a direct, honest conversation immediately. Speak with Rai and prepare for either outcome."
      : "There's no way to sugarcoat this one. It's time to decide: is a last effort worth it, or is it time for the Rolodex? If things are ending, a graceful exit can still pave the way for referrals and future business.";
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 900, color, letterSpacing: "-0.04em" }}>{score}%</div>
          <div style={{ fontSize: 18, fontWeight: 700, color }}>{label}</div>
          <p style={{ fontSize: 14, color: C.textSec, marginTop: 8 }}>{msg}</p>
        </div>
        <EmailGate title="You know the score. Now get the fix." />
      </div>
    );
  };

  const renderSignals = () => {
    const total = signalQuestions.length;
    if (step < total) {
      const q = signalQuestions[step];
      const picked = answers[step];
      const revealed = picked !== undefined;
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>Message {step + 1} of {total}</p>
          <div style={{ background: C.surface, borderRadius: 10, padding: "16px 18px", marginBottom: 14, borderLeft: "3px solid " + C.primary }}>
            <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.5 }}>{q.msg}</p>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>What's the hidden signal?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((o, i) => (
              <div key={i} onClick={() => !revealed && setAnswers({ ...answers, [step]: i })} style={{ padding: "12px 16px", borderRadius: 10, cursor: revealed ? "default" : "pointer", background: revealed ? (i === q.correct ? C.primarySoft : picked === i ? "#FAE8E4" : C.bg) : C.bg, border: "1.5px solid " + (revealed ? (i === q.correct ? C.primary : picked === i ? C.danger : C.borderLight) : C.borderLight), fontSize: 14, color: revealed ? (i === q.correct ? C.primary : picked === i ? C.danger : C.textMuted) : C.textSec, fontWeight: revealed && i === q.correct ? 700 : 400 }}>
                {revealed && i === q.correct && "✓ "}{revealed && picked === i && i !== q.correct && "✗ "}{o}
              </div>
            ))}
          </div>
          {revealed && (
            <div style={{ background: C.heroGrad, borderRadius: 10, padding: "14px 16px", color: "#fff", marginTop: 14 }}>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,.75)" }}>{q.explain}</p>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            {step > 0 ? <BackBtn onClick={() => setStep(step - 1)} /> : <div />}
            {revealed && <NextBtn onClick={() => setStep(step + 1)} label={step < total - 1 ? "Next →" : "See Results →"} />}
          </div>
        </div>
      );
    }
    const correct = signalQuestions.filter((q, i) => answers[i] === q.correct).length;
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: correct >= 4 ? C.success : correct >= 2 ? C.warning : C.danger, letterSpacing: "-0.04em" }}>{correct}/{total}</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{correct >= 4 ? "Sharp instincts." : correct >= 2 ? "Room to sharpen." : "Most people miss these."}</div>
          <p style={{ fontSize: 14, color: C.textSec, marginTop: 8 }}>These are real signals from real client relationships. The ones you miss are the ones that cost you.</p>
        </div>
        <EmailGate />
      </div>
    );
  };

  const renderCalculator = () => {
    const clients = parseInt(answers.clients) || 0;
    const avgRev = parseInt(answers.avgRev) || 0;
    const churnPct = parseInt(answers.churnPct) || 0;
    const calculated = clients > 0 && avgRev > 0 && churnPct > 0;
    const annualLoss = Math.round(clients * (churnPct / 100) * avgRev * 12);
    const fivePctImprove = Math.round(annualLoss * 0.05 * 20);
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>How many active clients do you have?</label>
            <input type="number" value={answers.clients || ""} onChange={e => setAnswers({ ...answers, clients: e.target.value })} placeholder="e.g. 12" style={{ width: "100%", padding: "12px 14px", border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", background: C.bg, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Average monthly revenue per client ($)</label>
            <input type="number" value={answers.avgRev || ""} onChange={e => setAnswers({ ...answers, avgRev: e.target.value })} placeholder="e.g. 4000" style={{ width: "100%", padding: "12px 14px", border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", background: C.bg, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>What % of clients do you lose per year?</label>
            <input type="number" value={answers.churnPct || ""} onChange={e => setAnswers({ ...answers, churnPct: e.target.value })} placeholder="e.g. 20" style={{ width: "100%", padding: "12px 14px", border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", background: C.bg, boxSizing: "border-box" }} />
          </div>
        </div>
        {calculated && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: "#FAE8E4", borderRadius: 14, padding: "24px", border: "1px solid " + C.danger + "44", textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.danger, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>You're losing</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: C.danger, letterSpacing: "-0.03em" }}>${annualLoss.toLocaleString()}</div>
              <div style={{ fontSize: 14, color: C.danger }}>per year to client churn</div>
            </div>
            <div style={{ background: C.primarySoft, borderRadius: 14, padding: "24px", border: "1px solid " + C.primary + "44", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>A 5% retention improvement =</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: C.primary, letterSpacing: "-0.03em" }}>+${fivePctImprove.toLocaleString()}</div>
              <div style={{ fontSize: 14, color: C.primary }}>in profit impact (at 95% margin on retained revenue)</div>
            </div>
          </div>
        )}
        {calculated && <EmailGate title="Ready to reduce your churn?" />}
      </div>
    );
  };

  const renderProfile = () => {
    const total = profileDims.length;
    if (step < total) {
      const dim = profileDims[step];
      const val = sliderVals[dim.key];
      const hasVal = val !== undefined;
      return (
        <div>
          <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>{profileDims.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{step + 1} of {total}</p>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{dim.name}</p>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: hasVal ? C.primary : C.borderLight }}>{hasVal ? val : "—"}</span>
          </div>
          <div style={{ padding: "0 4px", marginBottom: 6 }}>
            <input type="range" min="0" max="10" value={hasVal ? val : 5} onChange={e => setSliderVals({ ...sliderVals, [dim.key]: parseInt(e.target.value) })} style={{ width: "100%", height: 6, appearance: "none", WebkitAppearance: "none", background: `linear-gradient(to right, ${C.border} 0%, ${C.primary} 100%)`, borderRadius: 3, outline: "none", cursor: "pointer" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 14 }}>
            <span>{dim.left}</span><span>{dim.right}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {step > 0 ? <BackBtn onClick={() => setStep(step - 1)} /> : <div />}
            <NextBtn onClick={() => hasVal && setStep(step + 1)} disabled={!hasVal} label={step < total - 1 ? "Next →" : "See Profile →"} />
          </div>
        </div>
      );
    }
    const loyalty = (sliderVals.loyaltySignal || 5) / 10;
    const trust = (sliderVals.trustLevel || 5) / 10;
    const baseline = Math.round((loyalty * 0.30 + trust * 0.20 + 0.50) * 100);
    const label = baseline >= 75 ? "Strong" : baseline >= 55 ? "Stable" : baseline >= 35 ? "Watch" : "At Risk";
    const color = baseline >= 75 ? C.success : baseline >= 55 ? C.warning : C.danger;
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 900, color, letterSpacing: "-0.04em" }}>{baseline}%</div>
          <div style={{ fontSize: 18, fontWeight: 700, color }}>{label}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 20 }}>
          {profileDims.map(d => (
            <div key={d.key} style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px", background: C.bg, borderRadius: 8, fontSize: 12 }}>
              <span style={{ color: C.textSec }}>{d.name}</span>
              <span style={{ fontWeight: 700, color: C.primary }}>{sliderVals[d.key]}</span>
            </div>
          ))}
        </div>
        <EmailGate title="Want to level up your client relationships?" />
      </div>
    );
  };

  const renderSimulator = () => {
    const total = simScenarios.length;
    if (step < total) {
      const s = simScenarios[step];
      const picked = answers[step];
      const revealed = picked !== undefined;
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>Scenario {step + 1} of {total}</p>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</p>
          <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.55, marginBottom: 16 }}>{s.setup}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {s.opts.map((o, i) => (
              <div key={i} onClick={() => !revealed && setAnswers({ ...answers, [step]: i })} style={{ padding: "14px 16px", borderRadius: 10, cursor: revealed ? "default" : "pointer", background: revealed && picked === i ? (o.score === "A" ? C.primarySoft : o.score === "B" ? "#FBF2DC" : "#FAE8E4") : C.bg, border: "1.5px solid " + (revealed && picked === i ? (o.score === "A" ? C.primary : o.score === "B" ? C.warning : C.danger) : C.borderLight) }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{o.label}</div>
                <div style={{ fontSize: 13, color: C.textSec, fontStyle: "italic" }}>{o.desc}</div>
                {revealed && picked === i && (
                  <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(0,0,0,0.03)", borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Grade: {o.score}</div>
                    <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{o.outcome}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            {step > 0 ? <BackBtn onClick={() => setStep(step - 1)} /> : <div />}
            {revealed && <NextBtn onClick={() => setStep(step + 1)} label={step < total - 1 ? "Next →" : "See Results →"} />}
          </div>
        </div>
      );
    }
    const grades = simScenarios.map((s, i) => s.opts[answers[i]]?.score || "?");
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            {grades.map((g, i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: 12, background: g === "A" ? C.primarySoft : g === "B" ? "#FBF2DC" : "#FAE8E4", border: "2px solid " + (g === "A" ? C.primary : g === "B" ? C.warning : C.danger), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: g === "A" ? C.primary : g === "B" ? C.warning : C.danger }}>{g}</div>
            ))}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{grades.filter(g => g === "A").length >= 3 ? "Strong conversational instincts." : "Most people avoid these conversations entirely."}</div>
          <p style={{ fontSize: 14, color: C.textSec, marginTop: 8 }}>The right words at the right time save accounts. The wrong ones — or no words at all — lose them.</p>
        </div>
        <EmailGate />
      </div>
    );
  };

  const renderAutopsy = () => {
    const total = autopsyQuestions.length;
    if (step < total) {
      const q = autopsyQuestions[step];
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{step + 1} of {total}</p>
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((o, i) => <Opt key={i} text={o} selected={answers[step] === i} onClick={() => { setAnswers({ ...answers, [step]: i }); setTimeout(() => setStep(step + 1), 300); }} />)}
          </div>
          {step > 0 && <div style={{ marginTop: 14 }}><BackBtn onClick={() => setStep(step - 1)} /></div>}
        </div>
      );
    }
    const ans = Array.from({ length: total }, (_, i) => answers[i] || 0);
    const matched = Object.entries(autopsyPatterns).find(([_, p]) => p.match(ans));
    const pattern = matched || ["Mixed Signals", { desc: "Your situation combines multiple patterns. This is common — most client losses aren't clean. The key is identifying which signal came first and working backward." }];
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🪦</div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>{pattern[0]}</div>
        </div>
        <div style={{ background: C.bg, borderRadius: 14, padding: "20px", marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: C.text, lineHeight: 1.6 }}>{pattern[1].desc}</p>
        </div>
        <EmailGate />
      </div>
    );
  };

  const renderers = { health: renderHealth, calculator: renderCalculator, profile: renderProfile, simulator: renderSimulator };

  return (
    <>
      <section style={{ padding: "48px 20px 40px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Resources</h1>
        <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32 }}>Interactive tools to sharpen your retention instincts. Free. No sign-up required.</p>

        {!activeModule ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {modules.map((m, i) => (
              <div key={i} onClick={() => { reset(); setActiveModule(m.id); window.scrollTo(0, 0); }} style={{ background: C.card, borderRadius: 14, padding: "24px 22px", border: "1.5px solid " + C.border, cursor: "pointer", flex: "1 1 280px", minWidth: 280 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{m.emoji}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", background: C.primarySoft, color: C.primary, borderRadius: 4 }}>{m.tag}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", background: C.surface, color: C.textMuted, borderRadius: 4 }}>{m.time}</span>
                  </div>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{m.title}</h2>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.55 }}>{m.desc}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: C.btn }}>Start →</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ }}>
            <button onClick={reset} style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: C.textMuted, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 }}>← Back to all tools</button>
            <div style={{ background: C.card, borderRadius: 14, padding: "28px 24px", border: "1.5px solid " + C.border }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 28 }}>{modules.find(m => m.id === activeModule)?.emoji}</span>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>{modules.find(m => m.id === activeModule)?.title}</h2>
              </div>
              {renderers[activeModule]?.()}
            </div>
          </div>
        )}
      </section>

      {/* Blog Posts */}
      <section style={{ padding: "0 20px 48px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>From the Blog</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {[
            { title: "Why your best clients leave without warning", desc: "It's not performance. It's the gap between what they expected and what they experienced.", tag: "Retention" },
            { title: "The 5 questions that predict client churn", desc: "Forget satisfaction surveys. These five questions force honesty — and the answers tell you everything.", tag: "Health Checks" },
            { title: "What 50 lost clients taught us about communication velocity", desc: "When response times double, cancellation follows within 8 weeks.", tag: "Signals" },
            { title: "How to have the conversation you're avoiding", desc: "The opening line matters more than you think. We break down the script.", tag: "AI Coach" },
          ].map((p, i) => (
            <div key={i} style={{ background: C.card, borderRadius: 14, padding: "24px 22px", border: "1px solid " + C.border, flex: "1 1 280px", minWidth: 280 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", background: C.primarySoft, color: C.primary, borderRadius: 4 }}>{p.tag}</span>
                <span style={{ fontSize: 11, color: C.textMuted, padding: "3px 0" }}>Coming soon</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.55 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <div className="r-full-bleed" style={{ background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 50%, #1E261F 100%)", padding: "48px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12, color: "#fff" }}>Get notified when we publish!</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
          <input style={{ width: "100%", padding: "12px 14px", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", boxSizing: "border-box" }} placeholder="you@agency.com" />
          <button className="cta-btn" style={{ width: "100%", padding: "12px 20px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Subscribe</button>
        </div>
      </div>
    </>
  );
}
// ═══ DEMO ═══
function Demo() {
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");
  return (
    <section style={{ padding: "48px 20px 48px", maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Get a demo</h1>
      <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32, lineHeight: 1.5 }}>Let us show you through the Retayned platform.</p>
      <div style={{ background: C.card, borderRadius: 16, padding: "28px 24px", border: "1px solid " + C.border }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label><input style={inputStyle} placeholder="Your name" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label><input style={inputStyle} placeholder="you@agency.com" type="email" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Preferred date</label><input type="date" value={demoDate} onChange={e => setDemoDate(e.target.value)} style={inputStyle} /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Preferred time</label><input type="time" value={demoTime} onChange={e => setDemoTime(e.target.value)} style={inputStyle} /></div>
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Book a Demo</button>
        </div>
      </div>
    </section>
  );
}
// ═══ CONTACT ═══
function Contact() {
  return (
    <section style={{ padding: "48px 20px 48px", maxWidth: 640, margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Get in Touch</h1>
      <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32, lineHeight: 1.5 }}>Questions, feedback, partnerships, or just want to talk retention.</p>
      <div style={{ background: C.card, borderRadius: 16, padding: "28px 24px", border: "1px solid " + C.border }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label><input style={inputStyle} placeholder="Your name" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label><input style={inputStyle} placeholder="you@agency.com" type="email" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Message</label><textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} placeholder="What's on your mind?" /></div>
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Send Message</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        {[["Email", "hello@retayned.com"], ["Based in", "Washington, DC"], ["Response time", "Usually within a few hours"]].map(([l, v], i) => (
          <div key={i} style={{ background: C.card, borderRadius: 12, padding: "16px 20px", border: "1px solid " + C.border }}><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{l}</div><div style={{ fontSize: 14, color: C.textSec }}>{v}</div></div>
        ))}
      </div>
    </section>
  );
}

// ═══ LOGIN ═══
function Login({ setPage }) {
  return (
    <div style={{ padding: "60px 20px 40px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", marginBottom: 32 }}>
        <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
        <span style={{ fontSize: 32, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
      </div>
      <div style={{ background: C.card, borderRadius: 16, padding: "32px 24px", border: "1px solid " + C.border }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Welcome back.</h1>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24 }}>Sign in to your account.</p>
        <button style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid " + C.border, background: C.card, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: C.text, marginBottom: 20 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><div style={{ flex: 1, height: 1, background: C.borderLight }} /><span style={{ fontSize: 12, color: C.textMuted }}>or</span><div style={{ flex: 1, height: 1, background: C.borderLight }} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input style={inputStyle} placeholder="Email" type="email" />
          <input style={inputStyle} placeholder="Password" type="password" />
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sign In</button>
        </div>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 16 }}>Don't have an account? <span onClick={() => setPage("signup")} style={{ color: C.primary, fontWeight: 600, cursor: "pointer" }}>Start free trial</span></p>
      </div>
    </div>
  );
}

// ═══ SIGNUP ═══
function Signup({ setPage }) {
  return (
    <div style={{ padding: "60px 20px 40px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", marginBottom: 32 }}>
        <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
        <span style={{ fontSize: 32, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
      </div>
      <div style={{ background: C.card, borderRadius: 16, padding: "32px 24px", border: "1px solid " + C.border }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Start your free trial.</h1>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24 }}>14 days free. No credit card required.</p>
        <button style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid " + C.border, background: C.card, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: C.text, marginBottom: 20 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Sign up with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><div style={{ flex: 1, height: 1, background: C.borderLight }} /><span style={{ fontSize: 12, color: C.textMuted }}>or</span><div style={{ flex: 1, height: 1, background: C.borderLight }} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input style={inputStyle} placeholder="Full name" />
          <input style={inputStyle} placeholder="Email" type="email" />
          <input style={inputStyle} placeholder="Password" type="password" />
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
        </div>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 16 }}>Already have an account? <span onClick={() => setPage("login")} style={{ color: C.primary, fontWeight: 600, cursor: "pointer" }}>Sign in</span></p>
      </div>
    </div>
  );
}

// ═══ FAQ Component (shared) ═══
const faqGroups = [
  {
    label: "About Retayned",
    questions: [
      { q: "What is Retayned?", a: "Retayned is a new client relationship management platform built for agencies, freelancers, consultants, stylists, coaches...anyone who manages ongoing client relationships. It combines AI-powered retention scoring with communication signal tracking and 10+ years of proprietary client retention data and expertise. Retayned doesn't just tell you which clients need attention — it gives you the exact action steps and script to turn a potential loss into lifelong business." },
      { q: "How is this different from a CRM?", a: "Traditional CRMs track deals and contacts. Retayned tracks the health of relationships. It profiles how each client communicates, monitors engagement velocity across your channels, and uses AI to predict churn well before it happens. A CRM tells you who your clients are. Retayned tells you how your clients are feeling and what to do to make things better." },
      { q: "What does the AI actually do?", a: "Retayned AI ingests several inputs — relationship profiles, health checks, velocity signals, deliverable tracking, billing, and more — then generates personalized action points. It tells you who to talk to today, what the real problem is, and gives you an opening to delight your clients." },
      { q: "Who is this built for?", a: "Anyone who manages one or more ongoing client relationships. Agency owners, freelancers, consultants, stylists, coaches, account managers. If losing a client changes your month, quarter, or year, Retayned is for you." },
    ]
  },
  {
    label: "Pricing & Plans",
    questions: [
      { q: "What does it cost?", a: "Plans start at $29/mo for Starter (up to 15 clients). Growth is $79/mo (unlimited clients, 5 team members). Enterprise pricing is custom to your specs. Every plan includes a 14-day free trial — cancel anytime." },
    ]
  },
  {
    label: "Getting Started",
    questions: [
      { q: "Do I need to connect my email or Slack?", a: "Nope. The core platform — profiles, health checks, AI coaching, and deliverable tracking — works without any integrations. Channel connections unlock additional velocity detection and automated signals, but you can start without them and add integrations when you're ready." },
      { q: "How long does setup take?", a: "Minutes. Add your clients, score their relationship profiles, and you're in. The AI starts generating insights immediately. Channel integrations take a few clicks each when you're ready for them." },
      { q: "Is my client data safe?", a: "Yes. We access communication metadata (timestamps, response frequency) — not message content. Your data is encrypted in transit and at rest, hosted on secure US infrastructure. We don't sell your data or use it to train AI models. You own everything you put in." },
    ]
  }
];

function FAQ({ fullBleed }) {
  const [openQ, setOpenQ] = useState(null);
  return (
    <div>
      {faqGroups.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.primary }}>{group.label}</span>
          </div>
          {group.questions.map((faq, qi) => {
            const key = `${gi}-${qi}`;
            const isOpen = openQ === key;
            return (
              <div key={key} onClick={() => setOpenQ(isOpen ? null : key)} style={{
                background: isOpen ? C.card : "transparent",
                borderTop: "1px solid " + (fullBleed ? C.border : C.borderLight),
                borderBottom: qi === group.questions.length - 1 ? "1px solid " + (fullBleed ? C.border : C.borderLight) : "none",
                cursor: "pointer",
                transition: "background 0.2s ease",
                marginLeft: fullBleed ? -20 : "calc(-50vw + 50%)",
                marginRight: fullBleed ? -20 : "calc(-50vw + 50%)",
                paddingLeft: fullBleed ? 20 : "calc(50vw - 50%)",
                paddingRight: fullBleed ? 20 : "calc(50vw - 50%)",
                paddingTop: 16,
                paddingBottom: 16,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: isOpen ? 10 : 0, transition: "margin 0.2s" }}>{faq.q}</h3>
                {isOpen && (
                  <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6 }}>{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ═══ FAQ Page ═══
function FAQPage({ setPage }) {
  return (
    <>
      <section style={{ padding: "48px 20px 48px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 8 }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32 }}>Everything you need to know about Retayned.</p>
        <FAQ />
      </section>
      <div className="r-full-bleed" style={{ background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 50%, #1E261F 100%)", padding: "48px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12, color: "#fff" }}>Still have questions?</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.6)", marginBottom: 20 }}>We'd love to hear from you.</p>
        <button onClick={() => setPage("contact")} className="cta-btn" style={{ padding: "12px 28px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Contact Us</button>
      </div>
    </>
  );
}

// ═══ PRIVACY ═══
function Privacy() {
  return (
    <section style={{ padding: "48px 20px 48px", margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 32 }}>Privacy Policy</h1>
      <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7 }}>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Last updated:</strong> March 2026</p>
        <p style={{ marginBottom: 12 }}>Retayned ("we," "our," "us") is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, and share information when you use the Retayned platform.</p>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Information we collect.</strong> We collect information you provide directly: account details (name, email, company), client data you enter into the platform, and health check responses. When you connect integrations (email, calendar, Slack), we access metadata (timestamps, response frequency) — we do not read message content.</p>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>How we use it.</strong> To provide the Retayned service: generating retention scores, powering Retayned AI, calculating communication velocity, and surfacing signals. We do not sell your data. We do not use your client data to train AI models.</p>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Data retention.</strong> Your data is stored as long as your account is active. If you cancel, your data is deleted within 90 days. You can request immediate deletion at any time.</p>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Security.</strong> Industry-standard encryption for data in transit and at rest. Hosted on secure cloud infrastructure in the United States.</p>
        <p><strong style={{ color: C.text }}>Contact.</strong> privacy@retayned.com</p>
      </div>
    </section>
  );
}

// ═══ TERMS ═══
function Terms() {
  return (
    <section style={{ padding: "48px 20px 48px", margin: "0 auto" }}>
      <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 32 }}>Terms of Service</h1>
      <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7 }}>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Last updated:</strong> March 2026</p>
        <p style={{ marginBottom: 12 }}>By using Retayned, you agree to these terms. Retayned provides client relationship mastery tools including retention scoring, AI-powered coaching, and communication signal analysis.</p>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Your data.</strong> You retain ownership of all data you enter into Retayned. We do not claim any rights to your client data, health check responses, or relationship profiles.</p>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Retayned AI.</strong> Retayned AI provides suggestions and scripts based on your client data. These are recommendations, not guarantees. You are responsible for your client relationships and communications.</p>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Payment.</strong> Paid plans are billed monthly or annually. Cancel anytime. Refunds within 14 days. Free trials require a credit card.</p>
        <p><strong style={{ color: C.text }}>Contact.</strong> legal@retayned.com</p>
      </div>
    </section>
  );
}

// ═══ PLATFORM ═══
function Platform({ setPage }) {
  const [activeF, setActiveF] = useState(null);
  const features = [
    { icon: "👤", title: "Relationship Profiles", desc: "12 dimensions of every relationship creating a core archetype of each client. Not metrics — personality. Rai knows the shape of every relationship and calibrates recommendations around it.", color: "#2E6B60" },
    { icon: "🩺", title: "Health Checks", desc: "8 honest questions every month, plus performance, communication, and event tracking. This isn't 'how satisfied are they' — Rai detects drift from their baseline, not from some universal standard.", color: "#B88B15" },
    { icon: "◉", title: "Today", desc: "Every task, every note, every client you thought about today. Including recurring and company-wide tasks. Rai notices which clients need a little more attention and which ones you're outright neglecting.", color: "#0D9488" },
    { icon: "💰", title: "Billing", desc: "Track every invoice, line item, and add-on per client per month. Rai connects revenue data to relationship health — a client paying more but engaging less is a different risk than one doing both.", color: "#5B21B6" },
    { icon: "📇", title: "Rolodex", desc: "Past clients aren't dead leads — they're your warmest pipeline. Rai tracks when to reconnect, who might refer, and when to engage. Former clients and one-off contacts, prioritized and ready.", color: "#334155" },
    { icon: "🤝", title: "Referrals", desc: "Your best client has never been asked for a referral. Rai knows who's ready, who's referred before, and when the relationship is strong enough to ask. The cheapest new business you'll ever win.", color: "#C4432B" },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "72px 20px 20px" }}>
        <h1 className="r-hero-text" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 12 }}>
          Your clients won't know Retayned exists. They'll just stay.
        </h1>
        <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.6 }}>
          Retayned is built on something no one else has: a proprietary retention engine trained on over a decade of real client relationships. Our AI isn't just smart, it's emotionally intelligent.
        </p>
      </section>

      {/* Retayned AI — app preview */}
      <section style={{ padding: "0 20px 48px" }}>
        <div style={{ background: C.sidebar, borderRadius: 14, padding: 2, boxShadow: "0 16px 48px rgba(0,0,0,0.1)" }}>
          <div style={{ background: C.card, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid " + C.borderLight }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.danger }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.warning }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.success }} />
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11, color: C.textMuted, fontFamily: "monospace" }}>app.retayned.com</span>
              <div style={{ flex: 1 }} />
            </div>
            <div style={{ padding: 16, background: C.bg }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.danger, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>🚨 Alert</div>
                <div style={{ background: "#FAE8E4", borderRadius: 8, border: "1px solid " + C.danger + "44", overflow: "hidden" }}>
                  <div style={{ padding: "10px 14px" }}>
                    <p style={{ fontSize: 14, color: C.danger, fontWeight: 700, lineHeight: 1.4 }}>Foxglove Partners: Email Tom today with a brief update on a net-new task.</p>
                    <p style={{ fontSize: 12, color: C.danger + "aa", fontWeight: 400, lineHeight: 1.4, marginTop: 4 }}>Tom may be pulling back, which he has done once before when he was dissatisfied. This is a great opportunity to protect the contract.</p>
                  </div>
                  <div style={{ display: "flex", borderTop: "1px solid " + C.danger + "22" }}>
                    <div style={{ flex: 1, padding: "7px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.danger, borderRight: "1px solid " + C.danger + "22" }}>Add to Today's Tasks</div>
                    <div style={{ flex: 1, padding: "7px", textAlign: "center", fontSize: 12, fontWeight: 600, color: C.textMuted }}>Dismiss</div>
                  </div>
                </div>
              </div>
              {[{ name: "Northvane Studios", ret: 91, tag: "Creative", contact: "Sarah Chen", months: 34 }, { name: "Ridgeline Supply", ret: 73, tag: "Ecommerce", contact: "Marcus Webb", months: 11 }, { name: "Copper & Sage", ret: 55, tag: "Wellness", contact: "Elena Moss", months: 6 }, { name: "Foxglove Partners", ret: 38, tag: "B2B", contact: "Tom Aldrich", months: 3 }].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid " + C.borderLight }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontWeight: 700, fontSize: 14 }}>{row.name}</span><span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: C.surface, color: C.textMuted }}>{row.tag}</span></div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{row.contact} · {row.months}mo</div>
                  </div>
                  <div style={{ width: 40, height: 4, background: C.borderLight, borderRadius: 2 }}><div style={{ height: "100%", width: row.ret + "%", background: row.ret >= 70 ? C.success : row.ret >= 45 ? C.warning : C.danger, borderRadius: 2 }} /></div>
                  <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: row.ret >= 70 ? C.success : row.ret >= 45 ? C.warning : C.danger, minWidth: 28, textAlign: "right" }}>{row.ret}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p style={{ fontSize: 10, color: C.textMuted, textAlign: "center", marginTop: 8 }}>Dramatization based on client input data.</p>
      </section>

      {/* STATEMENT */}
      <div className="r-full-bleed" style={{ background: C.primarySoft, padding: "48px 20px", marginBottom: 64, position: "relative", overflow: "visible" }}>
        {/* Left - professional people group */}
        <svg style={{ position: "absolute", left: 120, bottom: -14, width: 120, height: 90, opacity: 0.14 }} className="r-stat-graphic-left" viewBox="0 0 120 90" fill="none">
          <circle cx="40" cy="22" r="14" fill={C.primary} />
          <path d="M40,36 C28,36 20,44 18,56 L18,90 L62,90 L62,56 C60,44 52,36 40,36 Z" fill={C.primary} />
          <circle cx="16" cy="28" r="10" fill={C.primary} opacity="0.6" />
          <path d="M16,38 C8,38 2,44 0,52 L0,90 L32,90 L32,52 C30,44 24,38 16,38 Z" fill={C.primary} opacity="0.6" />
          <circle cx="68" cy="30" r="9" fill={C.primary} opacity="0.45" />
          <path d="M68,39 C60,39 56,44 54,50 L54,90 L82,90 L82,50 C80,44 76,39 68,39 Z" fill={C.primary} opacity="0.45" />
          <circle cx="92" cy="34" r="7" fill={C.primary} opacity="0.3" />
          <path d="M92,41 C86,41 82,45 81,50 L81,90 L103,90 L103,50 C102,45 98,41 92,41 Z" fill={C.primary} opacity="0.3" />
          <path d="M20,70 Q45,58 68,70" stroke={C.primary} strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.3" />
        </svg>
        <svg style={{ position: "absolute", left: 250, bottom: -8, width: 36, height: 36, opacity: 0.1 }} className="r-stat-accent-left" viewBox="0 0 36 36" fill="none">
          <path d="M4,20 L12,14 L18,18 L24,12 L32,18" stroke={C.primary} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M12,14 L18,20 L24,14" stroke={C.primary} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
        <svg style={{ position: "absolute", right: 120, top: -16, width: 120, height: 90, opacity: 0.14 }} className="r-stat-graphic-right" viewBox="0 0 120 90" fill="none">
          <rect x="8" y="62" width="14" height="28" rx="3" fill={C.primary} opacity="0.4" />
          <rect x="28" y="48" width="14" height="42" rx="3" fill={C.primary} opacity="0.55" />
          <rect x="48" y="34" width="14" height="56" rx="3" fill={C.primary} opacity="0.7" />
          <rect x="68" y="18" width="14" height="72" rx="3" fill={C.primary} opacity="0.85" />
          <rect x="88" y="4" width="14" height="86" rx="3" fill={C.primary} />
          <path d="M15,58 Q35,46 55,30 T102,6" stroke={C.primary} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
          <path d="M96,4 L104,2 L100,10" stroke={C.primary} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
        </svg>
        <svg style={{ position: "absolute", right: 250, top: -6, width: 32, height: 32, opacity: 0.1 }} className="r-stat-accent-right" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke={C.primary} strokeWidth="2" fill="none" />
          <text x="16" y="22" fontSize="16" fontWeight="800" fill={C.primary} fontFamily="Outfit, sans-serif" textAnchor="middle">$</text>
        </svg>
        <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.25, textAlign: "center", margin: "0 auto", position: "relative", zIndex: 2 }}>
          A 5% increase in retention can{" "}<span style={{ color: C.btn }}>boost profits by 95%.</span><sup style={{ fontSize: "0.4em", color: C.textMuted, verticalAlign: "super", lineHeight: 0 }}>¹</sup>
        </h2>
      </div>

      {/* Brain graphic */}
      <section style={{ padding: "0 16px 32px" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 8 }}>Emotionally Intelligent</h2>
        <p style={{ fontSize: 16, color: C.textSec, textAlign: "center", marginBottom: 16 }}>We built Rai to help strengthen working relationships, not replace them. You know your clients. She just makes sure you don't lose one by surprise.</p>
        <div style={{ position: "relative", width: "100%", maxWidth: 500, margin: "0 auto", aspectRatio: "1" }}>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="155" fill="none" stroke={C.border} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            {[[-90],[-30],[30],[90],[150],[210]].map(([angle], i) => {
              const rad = (angle * Math.PI) / 180;
              const nx = 200 + 155 * Math.cos(rad), ny = 200 + 155 * Math.sin(rad);
              const mx = 200 + 70 * Math.cos(rad) + (i % 2 === 0 ? 15 : -15), my = 200 + 70 * Math.sin(rad) + (i % 2 === 0 ? -10 : 10);
              return (<g key={i}><path d={`M200,200 Q${mx},${my} ${nx},${ny}`} stroke={C.primaryLight} strokeWidth="1.5" fill="none" opacity="0.3" /><path d={`M200,${195 + (i % 3) * 5} Q${mx + 8},${my - 5} ${nx},${ny}`} stroke={C.primaryLight} strokeWidth="0.7" fill="none" opacity="0.12" /><circle cx={200 + 50 * Math.cos(rad) + (i % 2 === 0 ? 4 : -4)} cy={200 + 50 * Math.sin(rad)} r="2" fill={C.primaryLight} opacity="0.25" /></g>);
            })}
            {[[-90],[-30],[30],[90],[150],[210]].map(([angle], i) => {
              const rad = (angle * Math.PI) / 180;
              const nx = 200 + 155 * Math.cos(rad), ny = 200 + 155 * Math.sin(rad);
              const mx = 200 + 70 * Math.cos(rad) + (i % 2 === 0 ? 15 : -15), my = 200 + 70 * Math.sin(rad) + (i % 2 === 0 ? -10 : 10);
              return (<circle key={"p" + i} r="2.5" fill={C.primary} opacity="0.45"><animateMotion dur={3 + i * 0.6 + "s"} repeatCount="indefinite" path={`M200,200 Q${mx},${my} ${nx},${ny}`} /></circle>);
            })}
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2, filter: "drop-shadow(0 6px 24px rgba(30,38,31,0.3))" }}>
            <svg width="130" height="135" viewBox="0 0 130 135" fill="none">
              <path d="M65 18C52 18 40 22 34 28C28 34 26 42 27 48C22 52 20 58 21 64C20 70 23 77 29 82C33 88 42 94 54 96C58 97 62 97.5 65 97" fill={C.primaryDeep} stroke={C.primaryDark} strokeWidth="1.5" />
              <path d="M65 18C78 18 90 22 96 28C102 34 104 42 103 48C108 52 110 58 109 64C110 70 107 77 101 82C97 88 88 94 76 96C72 97 68 97.5 65 97" fill={C.primaryDeep} stroke={C.primaryDark} strokeWidth="1.5" />
              <path d="M65 20V95" stroke={C.primary} strokeWidth="1" opacity="0.35" />
              <path d="M32 42C40 46 52 44 62 39" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.35" />
              <path d="M25 58C36 54 48 57 62 54" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
              <path d="M30 72C38 68 50 70 62 68" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />
              <path d="M98 42C90 46 78 44 68 39" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.35" />
              <path d="M105 58C94 54 82 57 68 54" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
              <path d="M100 72C92 68 80 70 68 68" stroke={C.primaryLight} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />
              <circle cx="44" cy="48" r="5" fill={C.primaryLight} opacity="0.12" /><circle cx="82" cy="52" r="6" fill={C.primaryLight} opacity="0.1" /><circle cx="54" cy="68" r="4" fill={C.primaryLight} opacity="0.15" /><circle cx="78" cy="72" r="5" fill={C.primaryLight} opacity="0.12" /><circle cx="65" cy="44" r="4" fill={C.primaryLight} opacity="0.18" />
              <text x="65" y="118" textAnchor="middle" fill={C.primary} fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif" letterSpacing="0.06em">RAI</text>
            </svg>
          </div>
          {[[-90,"👤","Profiles"],[-30,"🩺","Health"],[30,"💰","Billing"],[90,"◉","Today"],[150,"📇","Rolodex"],[210,"🤝","Referrals"]].map(([angle, icon, label], i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + (155 / 200) * 50 * Math.cos(rad), y = 50 + (155 / 200) * 50 * Math.sin(rad);
            return (<div key={i} style={{ position: "absolute", left: `calc(${x}% - 28px)`, top: `calc(${y}% - 28px)`, width: 56, height: 56, borderRadius: "50%", background: C.card, border: "2px solid " + C.border, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", zIndex: 3 }}><span style={{ fontSize: 17, color: C.primary, lineHeight: 1 }}>{icon}</span><span style={{ fontSize: 7, fontWeight: 700, color: C.textMuted, marginTop: 2 }}>{label}</span></div>);
          })}
        </div>
      </section>

      {/* 6 Inputs */}
      <section style={{ padding: "0 20px 12px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 4 }}>Six inputs. One brain.</h2>
        <p style={{ fontSize: 14, color: C.textSec, marginBottom: 20 }}>Rai connects the dots between what you know, what you haven't noticed yet, and what to do next to keep your clients fanatical about working with you.</p>
      </section>
      <section style={{ padding: "0 20px 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {features.map((f, i) => {
            const isOpen = activeF === i;
            return (
              <div key={i} onClick={() => setActiveF(isOpen ? null : i)} style={{
                background: C.card, borderRadius: 14, padding: "24px 22px",
                border: isOpen ? "2px solid " + C.primary : "1.5px solid " + C.border,
                cursor: "pointer", transition: "all 0.2s ease",
              }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: isOpen ? C.primary : C.primarySoft,
                    color: isOpen ? "#fff" : C.primary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 700, flexShrink: 0, transition: "all 0.2s ease",
                  }}>
                    {f.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700 }}>{f.title}</h3>
                    </div>
                    {isOpen && (
                      <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.65, marginTop: 10 }}>{f.desc}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrations — with plug animation */}
      {(() => {
        const plugRef2 = useRef(null);
        const [plugged2, setPlugged2] = useState(false);
        useEffect(() => {
          const el = plugRef2.current;
          if (!el) return;
          const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setPlugged2(true); obs.disconnect(); }
          }, { threshold: 0.5 });
          obs.observe(el);
          return () => obs.disconnect();
        }, []);
        return (
          <section ref={plugRef2} style={{ paddingTop: 48, paddingBottom: 80, position: "relative", overflow: "visible" }}>
            <style>{`
              @keyframes cordLeft2 { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
              @keyframes cordRight2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }
              @keyframes sparkPop2 { 0% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1.3); } 100% { opacity: 0; transform: scale(0); } }
            `}</style>
            {/* Cord container */}
            <div style={{ position: "relative", height: 60, marginBottom: 12, width: "100vw", left: "50%", transform: "translateX(-50%)", overflow: "hidden" }}>
              {/* Left cord */}
              <svg style={{ position: "absolute", top: 0, left: 0, width: "calc(50% - 35px)", height: 60, animation: plugged2 ? "cordLeft2 0.8s ease-out forwards" : "none", transform: plugged2 ? "translateX(0)" : "translateX(-100%)" }} viewBox="0 0 500 60" preserveAspectRatio="none">
                <path d="M0,30 Q100,30 150,20 T300,35 T420,25 T500,30" stroke={C.primary} strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
              {/* Right cord */}
              <svg style={{ position: "absolute", top: 0, right: 0, width: "calc(50% - 35px)", height: 60, animation: plugged2 ? "cordRight2 0.8s ease-out forwards" : "none", transform: plugged2 ? "translateX(0)" : "translateX(100%)" }} viewBox="0 0 500 60" preserveAspectRatio="none">
                <path d="M500,30 Q400,30 350,40 T200,25 T80,35 T0,30" stroke={C.primaryLight} strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
              {/* Center plug + socket */}
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 60, opacity: plugged2 ? 1 : 0, transition: "opacity 0.2s ease 0.7s" }}>
                <svg width="120" height="60" viewBox="0 0 120 60">
                  {/* Left plug — body tapering from cord, two prongs extending right */}
                  <path d="M0,30 C6,30 10,22 14,18 L14,42 C10,38 6,30 0,30 Z" fill={C.primary} />
                  <rect x="14" y="16" width="18" height="28" rx="4" fill={C.primary} />
                  <rect x="32" y="22" width="12" height="4" rx="2" fill={C.primary} />
                  <rect x="32" y="34" width="12" height="4" rx="2" fill={C.primary} />
                  {/* Right socket — body tapering to cord, recessed slots */}
                  <path d="M120,30 C114,30 110,22 106,18 L106,42 C110,38 114,30 120,30 Z" fill={C.sidebar} />
                  <rect x="82" y="16" width="24" height="28" rx="4" fill={C.sidebar} />
                  <rect x="82" y="23" width="10" height="3" rx="1" fill={C.bg} opacity="0.3" />
                  <rect x="82" y="34" width="10" height="3" rx="1" fill={C.bg} opacity="0.3" />





                  {/* Spark lines between plug and socket */}
                  <line x1="54" y1="6" x2="58" y2="14" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="60" y1="2" x2="60" y2="11" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="66" y1="6" x2="62" y2="14" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="54" y1="54" x2="58" y2="46" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="60" y1="58" x2="60" y2="49" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                  <line x1="66" y1="54" x2="62" y2="46" stroke={C.primary} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              {/* Spark */}
              {plugged2 && (
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <div key={i} style={{ position: "absolute", width: 4 + Math.random() * 4, height: 4 + Math.random() * 4, borderRadius: "50%", background: i % 2 === 0 ? "#FFD700" : "#FFA500", boxShadow: `0 0 ${6 + i * 2}px ${i % 2 === 0 ? "#FFD700" : "#FFA500"}`, left: Math.cos(i * Math.PI / 4) * (12 + Math.random() * 10), top: Math.sin(i * Math.PI / 4) * (12 + Math.random() * 10), animation: `sparkPop2 0.4s ease-out ${0.75 + i * 0.04}s forwards`, opacity: 0 }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ padding: "0 20px" }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 12 }}>Plugs Into Your Workflow</h2>
            </div>
            <div style={{ padding: "0 20px" }}>
              <p style={{ fontSize: 16, color: C.textSec, textAlign: "center", marginBottom: 24 }}>Integrations help the engine adapt and learn, supplying you with even more insight.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                {["✉️ Gmail", "📁 Meets", "📅 Calendar", "💬 Slack", "🎥 Zoom"].map((ch, i) => (
                  <div key={i} className="ch-pill" style={{ padding: "10px 14px", background: C.card, borderRadius: 10, border: "1px solid " + C.border, fontSize: 13, fontWeight: 500 }}>{ch}</div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* How they connect — full bleed */}
      <div className="r-full-bleed" style={{ background: C.heroGrad, padding: "56px 20px", marginBottom: 64 }}>
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: "#fff" }}>Everything feeds everything.</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.65 }}>
            <p>Every profile teaches Rai how a client thinks. Every health check tells her what's shifting. Every task you complete — or skip — is a signal. And it all compounds.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="r-full-bleed" style={{ background: C.primarySoft, padding: "48px 20px 64px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 24 }}>FAQs</h2>
          <FAQ fullBleed />
        </div>
      </div>

      {/* CTA — gradient full bleed */}
      <div className="r-full-bleed" style={{ background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 50%, #1E261F 100%)", padding: "72px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12, color: "#fff" }}>
          See the platform in action.
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.6)", marginBottom: 24 }}>14-day free trial. Cancel anytime.</p>
        <button className="cta-btn" onClick={() => setPage("signup")} style={{ padding: "14px 32px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Try Free Now
        </button>
      </div>
    </>
  );
}

// ═══ MAIN APP ═══
export default function RetaynedSite() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Outfit', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Caveat:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #33543E; color: #fff; }
        .cta-btn { transition: all 0.2s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(91,33,182,0.25); }
        .cta-btn:active { transform: translateY(0); }
        .ch-pill { transition: all 0.15s ease; }
        .ch-pill:active { transform: scale(0.97); }
        input:focus, textarea:focus { border-color: #5B21B6 !important; outline: none; box-shadow: 0 0 0 3px rgba(91,33,182,0.1); }
        ::-webkit-scrollbar { width: 0; }
        @keyframes flyAway { 0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:1}20%{transform:translateY(-4px) translateX(2px) rotate(-1deg);opacity:1}40%{transform:translateY(-14px) translateX(8px) rotate(-3deg);opacity:.9}60%{transform:translateY(-30px) translateX(18px) rotate(-7deg);opacity:.6}80%{transform:translateY(-50px) translateX(32px) rotate(-12deg);opacity:.3}100%{transform:translateY(-75px) translateX(50px) rotate(-16deg);opacity:0} }
        .fly-away { display: inline-block; animation: flyAway 2.5s ease-out forwards; }
        .r-wrap { max-width: 100%; margin: 0 auto; padding: 0; }
        .r-mobile-only { display: flex; }
        .r-desktop-nav { display: none !important; }
        .r-full-bleed { margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); padding-left: 20px; padding-right: 20px; }
        .r-no-pad { padding-left: 0 !important; padding-right: 0 !important; }
        .r-stat-graphic-left { width: 60px !important; height: 45px !important; left: 12px !important; bottom: -8px !important; opacity: 0.12 !important; }
        .r-stat-graphic-right { width: 60px !important; height: 45px !important; right: 12px !important; top: -10px !important; opacity: 0.12 !important; }
        .r-stat-accent-left, .r-stat-accent-right { display: none !important; }
        section { }
        @media (min-width: 768px) {
          section { padding-left: 40px !important; padding-right: 40px !important; }
          .r-wrap { max-width: 100%; }
          .r-mobile-only { display: none !important; }
          .r-desktop-nav { display: flex !important; }
          .r-full-bleed { padding-left: 40px; padding-right: 40px; }
          .r-stat-graphic-left { width: 120px !important; height: 90px !important; left: 120px !important; bottom: -14px !important; opacity: 0.14 !important; }
          .r-stat-graphic-right { width: 120px !important; height: 90px !important; right: 120px !important; top: -16px !important; opacity: 0.14 !important; }
          .r-stat-accent-left, .r-stat-accent-right { display: block !important; }
        }
        @media (min-width: 1024px) {
          section { padding-left: 60px !important; padding-right: 60px !important; }
          .r-hero-text { font-size: 52px !important; }
          .r-stats { font-size: 56px !important; }
          .r-hero-center { text-align: center !important; }
          .r-hero-center p { margin-left: auto; margin-right: auto; max-width: 700px; }
          .r-full-bleed { padding-left: 60px; padding-right: 60px; }
        }
        @media (min-width: 1280px) {
          section { padding-left: 80px !important; padding-right: 80px !important; }
          .r-wrap { max-width: 1400px; margin: 0 auto; }
          .r-hero-text { font-size: 60px !important; }
          .r-full-bleed { padding-left: 80px; padding-right: 80px; }
        }
      `}</style>

      <Nav page={page} setPage={setPage} />
      <div style={{ overflowX: "hidden" }}>
      <div className="r-wrap">
        {page === "home" && <Home setPage={setPage} />}
        {page === "platform" && <Platform setPage={setPage} />}
        {page === "pricing" && <Pricing setPage={setPage} />}
        {page === "about" && <About setPage={setPage} />}
        {page === "faq" && <FAQPage setPage={setPage} />}
        {page === "blog" && <Blog />}
        {page === "contact" && <Contact />}
        {page === "demo" && <Demo />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "signup" && <Signup setPage={setPage} />}
        {page === "privacy" && <Privacy />}
        {page === "terms" && <Terms />}
      </div>
      <Footer setPage={setPage} />
      </div>
    </div>
  );
}
