import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import ProjectShowcase from '../components/work/ProjectShowcase'
import CinematicJourney from '../components/work/CinematicJourney'
import { useTypewriter } from '../hooks/useTypewriter'
import { mindsetLines } from '../data/projects'

// ─── Entry Overlay ────────────────────────────────────────────────
const WorkEntryOverlay = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2.8,
        times: [0, 0.2, 0.75, 1],
        ease: 'easeInOut',
      }}
      onAnimationComplete={onComplete}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0A0A0F',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.span
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(64px, 12vw, 120px)',
          color: '#F0F0F5',
          letterSpacing: '-0.04em',
        }}
      >
        WORK
      </motion.span>
    </motion.div>
  )
}

// ─── Syntax-colored line (typewriter) ─────────────────────────────
const TypewriterLine = ({ text }: { text: string }) => {
  if (!text) return null

  const parts: ReactNode[] = []
  let remaining = text
  let key = 0

  const addSpan = (content: string, color: string) => {
    parts.push(
      <span key={key++} style={{ color }}>
        {content}
      </span>
    )
  }

  while (remaining.length > 0) {
    const comment = remaining.match(/^(\/\/.*)/)
    if (comment) {
      addSpan(comment[1], '#6272A4')
      remaining = remaining.slice(comment[1].length)
      continue
    }

    const space = remaining.match(/^(\s+)/)
    if (space) {
      addSpan(space[1], '#8888A0')
      remaining = remaining.slice(space[1].length)
      continue
    }

    const str = remaining.match(/^("(?:[^"\\]|\\.)*")/)
    if (str) {
      parts.push(
        <span
          key={key++}
          style={{
            color: '#D8DCE8',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          {str[1]}
        </span>
      )
      remaining = remaining.slice(str[1].length)
      continue
    }

    const kw = remaining.match(/^(const|let|true|false|null)(\b)/)
    if (kw) {
      addSpan(kw[1], '#FF79C6')
      remaining = remaining.slice(kw[1].length)
      continue
    }

    const keyMatch = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/)
    if (keyMatch) {
      addSpan(keyMatch[1], '#8BE9FD')
      addSpan(keyMatch[2], '#8888A0')
      remaining = remaining.slice(keyMatch[1].length + keyMatch[2].length)
      continue
    }

    const punct = remaining.match(/^([\[\]{}(),;=])/)
    if (punct) {
      addSpan(punct[1], '#8888A0')
      remaining = remaining.slice(1)
      continue
    }

    const ident = remaining.match(/^([a-zA-Z_][a-zA-Z0-9_]*)/)
    if (ident) {
      addSpan(ident[1], '#66D9EF')
      remaining = remaining.slice(ident[1].length)
      continue
    }

    addSpan(remaining[0], '#8888A0')
    remaining = remaining.slice(1)
  }

  return <>{parts}</>
}

// ─── Mindset card (typewriter) ───────────────────────────────────
const CodeCard = () => {
  const { displayedLines, currentLine, done } = useTypewriter(
    mindsetLines,
    30,
    380
  )
  const [cursorVisible, setCursorVisible] = useState(true)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: '#0D1117',
        border: hovered
          ? '1px solid rgba(255,255,255,0.14)'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,102,255,0.1), 0 0 48px rgba(0,102,255,0.08)'
          : '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,102,255,0.06), 0 0 36px rgba(0,102,255,0.05)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Soft top-edge highlight */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,102,255,0.45) 50%, transparent 100%)',
          opacity: hovered ? 1 : 0.75,
          pointerEvents: 'none',
        }}
      />

      {/* Tab bar */}
      <div
        style={{
          background: '#161B22',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#FF5F57',
          }}
        />
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#FEBC2E',
          }}
        />
        <div
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: '#28C840',
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: '#555568',
            marginLeft: '8px',
          }}
        >
          mindset.ts
        </span>
      </div>

      {/* Code body */}
      <div style={{ padding: '20px', display: 'flex', gap: '0' }}>
        {/* Line numbers */}
        <div
          style={{
            paddingRight: '14px',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            marginRight: '14px',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          {mindsetLines.map((_, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                lineHeight: '1.9',
                color: i <= currentLine ? '#3D4450' : 'transparent',
                textAlign: 'right',
                minWidth: '16px',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Typed lines */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {mindsetLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                lineHeight: '1.9',
                paddingLeft: `${line.indent}px`,
                minHeight: '22px',
              }}
            >
              {i < currentLine && <TypewriterLine text={line.text} />}
              {i === currentLine && (
                <>
                  <TypewriterLine text={displayedLines[i] || ''} />
                  {!done && (
                    <span
                      style={{
                        color: '#0066FF',
                        opacity: cursorVisible ? 1 : 0,
                        transition: 'opacity 0.1s',
                        fontWeight: 300,
                      }}
                    >
                      |
                    </span>
                  )}
                </>
              )}
              {i > currentLine && (
                <span style={{ opacity: 0, pointerEvents: 'none' }}>
                  {line.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            color: '#555568',
          }}
        >
          // craft · clarity
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#00FF88',
            }}
          />
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              color: '#00FF88',
            }}
          >
            intentional
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Work Content (Hero) ──────────────────────────────────────────
const WorkContent = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const textContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  }

  const textItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as any } },
    hover: {} // prevent inheriting hover if not needed
  }

  const cardEnter = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <main style={{ background: 'transparent', minHeight: '100vh' }}>
      <section
        style={{
          minHeight: isMobile ? 'auto' : '100vh',
          padding: isMobile
            ? '120px 24px 60px'
            : '100px clamp(24px, 6vw, 80px)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* LEFT — heading + subtitle */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          style={{
            zIndex: 1,
            flex: isMobile ? 'unset' : 1,
            textAlign: isMobile ? 'center' : 'left',
            maxWidth: isMobile ? '100%' : '520px',
            marginRight: isMobile ? 0 : '40px',
            cursor: 'default',
          }}
        >
          {/* Label */}
          <motion.span
            variants={textItem}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: '#0066FF',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            · SELECTED WORKS ·
          </motion.span>

          {/* Main heading */}
          <motion.h1
            variants={textItem}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(34px, 5vw, 68px)',
              color: '#ffffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              margin: '0 0 16px',
            }}
          >
            MY PROJECTS
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: { width: '72px', opacity: 1, transition: { duration: 0.6 } },
              hover: { 
                width: '110px', 
                boxShadow: '0 0 16px rgba(0, 102, 255, 0.7)', 
                background: 'linear-gradient(90deg, #3388FF, transparent)',
                transition: { duration: 0.3, ease: 'easeOut' as any }
              }
            }}
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, #0066FF, transparent)',
              borderRadius: '9999px',
              marginBottom: '18px',
              marginLeft: isMobile ? 'auto' : undefined,
              marginRight: isMobile ? 'auto' : undefined,
            }}
          />

          {/* Subtitle — Playfair Display italic */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as any } },
              hover: { color: '#A0A0B5', transition: { duration: 0.3 } }
            }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: '#8888A0',
              lineHeight: 1.7,
              maxWidth: '420px',
              margin: isMobile ? '0 auto' : 0,
              transition: 'color 0.3s ease'
            }}
          >
            Explore my portfolio of web applications,
            <br />
            tools, and experiments
          </motion.p>
        </motion.div>

        {/* RIGHT — Mindset card */}
        {!isMobile && (
          <motion.div 
            variants={cardEnter}
            initial="hidden"
            animate="visible"
            style={{
              width: 'clamp(280px, 32vw, 440px)',
              flexShrink: 0
            }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CodeCard />
            </motion.div>
          </motion.div>
        )}

        {/* Mobile — card stacked below */}
        {isMobile && (
          <motion.div 
            variants={cardEnter}
            initial="hidden"
            animate="visible"
            style={{ marginTop: '40px', width: '100%' }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CodeCard />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Project Showcase */}
      <ProjectShowcase />

      {/* Cinematic Scroll Journey (Skills, Story, CTA) */}
      <CinematicJourney />
    </main>
  )
}

// ─── Work Page (Root) ─────────────────────────────────────────────
const Work = () => {
  const hasSeen = sessionStorage.getItem('work-overlay-seen')
  const [overlayDone, setOverlayDone] = useState(!!hasSeen)
  const [showContent, setShowContent] = useState(!!hasSeen)

  const handleOverlayComplete = () => {
    sessionStorage.setItem('work-overlay-seen', 'true')
    setOverlayDone(true)
    setTimeout(() => setShowContent(true), 50)
  }

  return (
    <>
      {!overlayDone && (
        <WorkEntryOverlay onComplete={handleOverlayComplete} />
      )}
      {showContent && <WorkContent />}
    </>
  )
}

export default Work
