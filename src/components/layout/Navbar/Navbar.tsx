import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// ─── Props ────────────────────────────────────────────────────────────────────
interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/work' },
  { label: 'Lakshya', to: '/about', special: true },
  { label: 'Contact', to: '/contact' },
];

const SPRING = { type: 'spring' as const, stiffness: 340, damping: 36 };
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── NavLink sub-component ────────────────────────────────────────────────────
function NavLink({
  link,
  active,
  scrolled: _scrolled,
  compact,
  onClick,
}: {
  link: typeof NAV_LINKS[0];
  active: boolean;
  scrolled: boolean;
  compact?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: compact ? 11 : 12,
        fontWeight: active ? 500 : 400,
        letterSpacing: '-0.01em',
        padding: compact ? '4px 10px' : '5px 12px',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'font-size 0.35s ease, padding 0.35s ease',
        // Non-special color handled here; special gradient goes on inner span
        ...(!link.special
          ? {
            color: active
              ? '#F0F0F5'
              : hovered
                ? 'rgba(255,255,255,0.88)'
                : 'rgba(255,255,255,0.45)',
          }
          : {}),
      }}
    >
      {/* Active pill */}
      {active && (
        <motion.span
          layoutId="nb-pill"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.07)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 9999,
            zIndex: 0,
          }}
          transition={SPRING}
        />
      )}

      {/* Label — gradient applied directly here for special links so WebkitBackgroundClip works */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          ...(link.special
            ? {
              background: 'linear-gradient(90deg, #93C5FD, #C4B5FD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
            : {}),
        }}
      >
        {link.label}
      </span>

      {/* Hover underline (non-special links only) */}
      {!link.special && (
        <motion.span
          animate={{ scaleX: hovered && !active ? 1 : 0, opacity: hovered && !active ? 1 : 0 }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          style={{
            position: 'absolute',
            bottom: 2,
            left: 12,
            right: 12,
            height: '0.5px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 9999,
            transformOrigin: 'left',
            zIndex: 1,
          }}
        />
      )}

      {/* Special glow on hover */}
      {link.special && hovered && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: 9999,
            background: 'radial-gradient(ellipse, rgba(147,197,253,0.08), transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
    </motion.span>
  );

  return (
    <Link to={link.to} style={{ textDecoration: 'none' }} onClick={onClick}>
      {content}
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Navbar({ theme: _theme, onToggleTheme: _onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ── Responsive ────────────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Lock body scroll on mobile menu ──────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // ── Close mobile on outside click ────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const isActive = (to: string): boolean => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  const handleNavClick = (_to: string) => {
    setMobileOpen(false);
  };

  // ── Shared resume button styles ───────────────────────────────────────────
  const [resumeHovered, setResumeHovered] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <LayoutGroup>
      {/* ── Wrapper: full-width fixed strip ──────────────────────────────── */}
      <motion.nav
        ref={navRef as React.RefObject<HTMLElement>}
        animate={{
          height: scrolled ? 46 : 52,
          background: 'transparent',
          boxShadow: 'none',
          backdropFilter: 'none',
        }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          // Webkit blur fallback in style (typed separately)
          WebkitBackdropFilter: 'none',
          // Subtle gradient strip behind navbar (background strip)
          // outer gradient via ::before isn't possible with inline — done with pseudo child below
        }}
      >
        {/* Top shine line (always visible, fades with scroll) */}
        <motion.div
          animate={{ opacity: scrolled ? 0.4 : 0.7 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '0.5px',
            background: scrolled
              ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent 100%)'
              : 'transparent',
            pointerEvents: 'none',
          }}
        />


        {/* ── Inner container — max-width + padding ──────────────────────── */}
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          height: '100%',
          padding: '0 clamp(16px, 3vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}>

          {/* ================================================================
              DESKTOP LAYOUT
              ================================================================ */}
          {!isMobile && (
            <>
              {/* ── LEFT ZONE ────────────────────────────────────────────── */}
              <motion.div
                layout
                transition={SPRING}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  // At top: expand to push links to center; scrolled: natural width
                  flex: scrolled ? '0 0 auto' : '1 1 0',
                }}
              >
                {/* Avatar */}
                <motion.div
                  layout
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  transition={{ duration: 0.22, ease: EASE }}
                  style={{
                    position: 'relative',
                    width: scrolled ? 26 : 30,
                    height: scrolled ? 26 : 30,
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'width 0.4s ease, height 0.4s ease',
                  }}
                >
                  {/* Soft glow ring */}
                  <motion.div
                    animate={{
                      opacity: scrolled ? 0.5 : 0.65,
                      boxShadow: scrolled
                        ? '0 0 0 2px rgba(0,102,255,0.3), 0 0 10px rgba(0,102,255,0.15)'
                        : '0 0 0 2px rgba(0,102,255,0.4), 0 0 16px rgba(0,102,255,0.2)',
                    }}
                    whileHover={{
                      boxShadow: '0 0 0 2.5px rgba(0,102,255,0.6), 0 0 24px rgba(0,102,255,0.35)',
                      opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      inset: -2,
                      borderRadius: '50%',
                    }}
                  />
                  {/* Avatar */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: 'rgba(0,60,180,0.2)',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    <img
                      src="/avatar.png"
                      alt="Lakshya"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                </motion.div>

                {/* Name */}
                <motion.span
                  layout
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  onClick={() => navigate('/')}
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: scrolled ? 13 : 15,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #F0F0F5 0%, #9090A8 50%, #F0F0F5 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'nb-shimmer 5s ease infinite',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'font-size 0.35s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Lakshya
                </motion.span>
              </motion.div>

              {/* ── RIGHT ZONE — links pill + resume (together) ──────────── */}
              <motion.div
                layout
                transition={SPRING}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  flex: '1 1 0',
                  justifyContent: 'flex-end',
                }}
              >
                {/* Links pill */}
                <motion.div
                  animate={{
                    background: scrolled
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.03)',
                    borderColor: scrolled
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.05)',
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    border: '0.5px solid',
                    borderRadius: 9999,
                    padding: '3px 3px',
                    position: 'relative',
                  }}
                >
                  {NAV_LINKS.map(link => (
                    <NavLink
                      key={link.to}
                      link={link}
                      active={isActive(link.to)}
                      scrolled={scrolled}
                      compact={scrolled}
                      onClick={() => handleNavClick(link.to)}
                    />
                  ))}
                </motion.div>

                {/* Resume — inside the same right zone, directly after links pill */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onHoverStart={() => setResumeHovered(true)}
                  onHoverEnd={() => setResumeHovered(false)}
                  whileHover={{ y: -1.5 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    boxShadow: resumeHovered
                      ? '0 0 0 1px rgba(255,255,255,0.22), 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                      : '0 0 0 0.5px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.05)',
                    background: resumeHovered
                      ? 'rgba(255,255,255,0.07)'
                      : 'rgba(255,255,255,0.03)',
                  }}
                  transition={{ duration: 0.22 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 500,
                    fontSize: scrolled ? 11 : 12,
                    color: resumeHovered ? '#F0F0F5' : 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    padding: scrolled ? '5px 12px' : '6px 14px',
                    borderRadius: 9999,
                    transition: 'font-size 0.35s ease, padding 0.35s ease, color 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    animate={{
                      borderColor: resumeHovered
                        ? 'rgba(255,255,255,0.35)'
                        : 'rgba(255,255,255,0.18)',
                    }}
                    style={{
                      width: 14,
                      height: 14,
                      border: '0.5px solid',
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="8" height="8" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round"
                    >
                      <path d="M12 15V3M7 10l5 5 5-5M3 21h18" />
                    </svg>
                  </motion.div>
                  Resume
                </motion.a>
              </motion.div>
            </>
          )}

          {/* ================================================================
              MOBILE LAYOUT
              ================================================================ */}
          {isMobile && (
            <>
              {/* Avatar + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  style={{
                    position: 'relative',
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '50%',
                    boxShadow: '0 0 0 1.5px rgba(0,102,255,0.4), 0 0 12px rgba(0,102,255,0.2)',
                  }} />
                  <div style={{
                    width: '100%', height: '100%',
                    borderRadius: '50%', overflow: 'hidden',
                    background: 'rgba(0,60,180,0.2)', position: 'relative', zIndex: 1,
                  }}>
                    <img
                      src="/avatar.png"
                      alt="Lakshya"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                </motion.div>

                {/* Name */}
                <span
                  onClick={() => navigate('/')}
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: 14,
                    letterSpacing: '-0.03em',
                    background: 'linear-gradient(135deg, #F0F0F5 0%, #9090A8 50%, #F0F0F5 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'nb-shimmer 5s ease infinite',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  Lakshya
                </span>
              </div>

              {/* Spacer */}
              <div style={{ flex: 1 }} />

              {/* Hamburger */}
              <motion.button
                onClick={() => setMobileOpen(o => !o)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 4,
                  padding: '4px 0',
                  flexShrink: 0,
                }}
              >
                <motion.div
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ width: 18, height: 1.5, background: 'rgba(255,255,255,0.65)', borderRadius: 9999 }}
                />
                <motion.div
                  animate={{ opacity: mobileOpen ? 0 : 1, width: mobileOpen ? 18 : 12 }}
                  transition={{ duration: 0.22 }}
                  style={{ width: 12, height: 1.5, background: 'rgba(255,255,255,0.4)', borderRadius: 9999 }}
                />
                <motion.div
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                  transition={{ duration: 0.28 }}
                  style={{ width: 18, height: 1.5, background: 'rgba(255,255,255,0.65)', borderRadius: 9999 }}
                />
              </motion.button>

              {/* Mobile Dropdown */}
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      left: 16,
                      right: 16,
                      background: 'rgba(8,8,14,0.92)',
                      backdropFilter: 'none',
                      WebkitBackdropFilter: 'none',
                      border: '0.5px solid rgba(255,255,255,0.08)',
                      borderRadius: 14,
                      padding: '6px',
                      zIndex: 999,
                    }}
                  >
                    {NAV_LINKS.map((link, i) => (
                      <motion.div
                        key={link.to}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                        onClick={() => handleNavClick(link.to)}
                      >
                          <Link
                            to={link.to}
                            style={{
                              fontFamily: 'DM Sans, sans-serif',
                              fontSize: 14,
                              padding: '10px 12px',
                              borderRadius: 10,
                              display: 'block',
                              textDecoration: 'none',
                              color: isActive(link.to) ? '#F0F0F5' : 'rgba(255,255,255,0.6)',
                              background: isActive(link.to) ? 'rgba(255,255,255,0.06)' : 'transparent',
                              ...(link.special
                                ? {
                                  background: 'linear-gradient(90deg, #93C5FD, #C4B5FD)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  fontWeight: 500,
                                }
                                : {}),
                            }}
                          >
                            {link.label}
                          </Link>
                      </motion.div>
                    ))}

                    {/* Divider + Resume */}
                    <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.07)', margin: '4px 0' }} />
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 13,
                        padding: '9px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: 'rgba(255,255,255,0.5)',
                        textDecoration: 'none',
                        borderRadius: 9,
                      }}
                    >
                      <div style={{
                        width: 13, height: 13,
                        border: '0.5px solid rgba(255,255,255,0.2)',
                        borderRadius: 3,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 15V3M7 10l5 5 5-5M3 21h18" />
                        </svg>
                      </div>
                      Resume
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

        </div>
      </motion.nav>
    </LayoutGroup>
  );
}
