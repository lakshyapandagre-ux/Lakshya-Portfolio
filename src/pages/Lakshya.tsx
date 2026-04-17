import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IdentitySection from '../components/About/IdentitySection'
import AboutProfile from '../components/About/AboutProfile'
import ExperienceSection from '../components/Experience/ExperienceSection'
import ClosingSection from '../components/Closing/ClosingSection'
import FloatingImageTrail from '../components/Hero/FloatingImageTrail'

/* ─────────────────────────────────────────────
   LAKSHYA HERO — Minimal, typography-driven
   Route: /about
   ───────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1] as const

const PHRASES = [
  { text: 'deliver real ', highlight: 'results.' },
  { text: 'solve real ', highlight: 'problems.' },
  { text: 'build scalable ', highlight: 'systems.' },
  { text: 'ship fast, iterate ', highlight: 'faster.' },
]

export default function Lakshya() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // State for rotating text
  const [phraseIndex, setPhraseIndex] = useState(0)

  // State for copy email
  const [copied, setCopied] = useState(false)

  // ── Subtle parallax on mouse move ──
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = ((e.clientX - cx) / cx) * 3 // max 3px shift
    const dy = ((e.clientY - cy) / cy) * 3
    setMousePos({ x: dx, y: dy })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // ── Rotating phrase timer ──
  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % PHRASES.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lakshyapandagre@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <section
        ref={containerRef}
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <FloatingImageTrail />

        {/* ── Background: oversized "LAKSHYA" ghost text ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(200px, 30vw, 400px)',
            color: 'rgba(255,255,255,0.015)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            zIndex: 0,
          }}
        >
          LAKSHYA
        </div>

        {/* ── Subtle radial glow behind center ── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '600px',
            background:
              'radial-gradient(ellipse at center, rgba(0,102,255,0.03) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── Top-left system label ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          style={{
            position: 'absolute',
            top: '24px',
            left: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 2,
          }}
        >
          <span className="lk-system-dot" />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
            }}
          >
            LAKSHYA / PORTFOLIO
          </span>
        </motion.div>

        {/* ── Main center content with parallax ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1000px',
            width: '100%',
            textAlign: 'center',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.3s ease-out',
            padding: '0 24px',
          }}
        >
          {/* A. Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(10px, 1.2vw, 13px)',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              margin: '0 0 16px',
            }}
          >
            I BUILD DIGITAL PRODUCTS THAT
          </motion.p>

          {/* B. Main name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0, ease }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(60px, 12vw, 160px)',
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              margin: '0 0 20px',
              textAlign: 'center',
            }}
          >
            LAKSHYA
          </motion.h1>

          {/* C. Emphasis line (Rotating) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              margin: '0 0 48px',
              lineHeight: 1.4,
              height: '40px', // Fixed height to prevent layout shift
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phraseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  cursor: 'default',
                  whiteSpace: 'nowrap',
                  color: '#FFFFFF',
                  transition: 'all 0.25s ease',
                }}
              >
                {PHRASES[phraseIndex].text}
                <span style={{ color: '#0066FF', transition: 'all 0.25s ease' }}>
                  {PHRASES[phraseIndex].highlight}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── CTA Row ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
            className="lk-cta-row"
          >
            <a
              href="https://github.com/Lakshya-Pandagre"
              target="_blank"
              rel="noopener noreferrer"
              className="lk-github-btn"
              title="GitHub Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>

            <button onClick={handleCopyEmail} className="lk-email-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lk-copy-icon"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>lakshyapandagre@gmail.com</span>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="lk-copied-tooltip"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* ── Bottom-right: Role ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '32px',
            textAlign: 'right',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            lineHeight: 1.7,
            zIndex: 2,
          }}
        >
          FULL STACK DEVELOPER
          <br />
          AI EXPLORER
        </motion.div>

        {/* ── Center-bottom: Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9, ease }}
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.12em',
            zIndex: 2,
          }}
        >
          <span>scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            }}
            style={{ fontSize: '14px', lineHeight: 1 }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      <IdentitySection />
      <AboutProfile />
      <ExperienceSection />
      <ClosingSection />

      <style>{styles}</style>
    </>
  )
}

/* ─────────────────────────────────────────────
   Styles
   ───────────────────────────────────────────── */
const styles = `
  /* System dot with slow pulse */
  .lk-system-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00FF88;
    flex-shrink: 0;
    animation: lk-dot-pulse 3s ease-in-out infinite;
  }

  @keyframes lk-dot-pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(0,255,136,0.4); }
    50% { opacity: 0.6; box-shadow: 0 0 8px 2px rgba(0,255,136,0.15); }
  }

  /* CTA Row Layout */
  .lk-cta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    margin-top: 10px;
  }

  /* GitHub Button */
  .lk-github-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.25s ease;
    cursor: pointer;
  }

  .lk-github-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    transform: translateY(-2px) scale(1.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  /* Email Button */
  .lk-email-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    background: transparent;
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
  }

  /* SVG Copy Icon */
  .lk-copy-icon {
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.25s ease;
  }

  .lk-email-btn:hover {
    color: #0066FF;
  }

  .lk-email-btn:hover .lk-copy-icon {
    color: #0066FF;
  }

  /* Copied Tooltip */
  .lk-copied-tooltip {
    position: absolute;
    top: -24px;
    right: -10px;
    color: #00FF88;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    pointer-events: none;
    letter-spacing: 0.1em;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .lk-cta-row {
      flex-direction: column;
      gap: 16px;
    }
  }
`
