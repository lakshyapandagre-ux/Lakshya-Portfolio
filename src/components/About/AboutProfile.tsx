import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────
   ABOUT PROFILE — Refined personal identity
   ───────────────────────────────────────────── */

const CODE_LINES = [
  { kw: '//', rest: ' Want to know more about me?', isComment: true },
  { empty: true },
  { kw: 'function ', func: 'exploreLakshya', rest: '() {' },
  { indent: 1, kw: 'return ', str: '"Let\'s connect and build something great."', rest: ';' },
  { rest: '}' }
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

// Default to available images / placeholders showcasing developer context
const IMAGES = [
  '/image.png',
  '/about1.jpg',
  '/about2.jpg',
  '/about3.jpg'
]

export default function AboutProfile() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  // Intersection observer for stagger on scroll
  // And auto-slider timer
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)

    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % IMAGES.length)
    }, 3000) // Change image every 3 seconds

    return () => {
      obs.disconnect()
      clearInterval(timer)
    }
  }, [])

  return (
    <section ref={sectionRef} className="ap-section">
      <div className="ap-container">

        {/* ── TOP GRID: TEXT & IMAGES ── */}
        <div className="ap-grid">
          {/* ── LEFT COLUMN ── */}
          <div className="ap-left">
            {/* Label */}
            <motion.div
              className="ap-label"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0}
            >
              A LITTLE ABOUT ME
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="ap-heading"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={1}
            >

            </motion.h2>
            <motion.div
              className="ap-subheading"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={1.5}
            >
              Hiee I'm <span className="ap-name-gradient">Lakshya</span>  .
            </motion.div>

            {/* Paragraph Content */}
            <motion.div
              className="ap-paragraphs"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={2}
            >
              <p>
                I'm a full-stack developer focused on building modern web applications with clean architecture and scalable systems. I enjoy working across the entire stack, from crafting user experiences to designing backend logic.
              </p>
              <p>
                Over time, I’ve explored AI-powered products and systems, integrating APIs, data pipelines, and intelligent workflows to solve real-world problems.
              </p>
              <p>
                I’m particularly interested in building tools that combine performance with usability — creating products that are not just functional, but meaningful.
              </p>
            </motion.div>

            {/* ── BOTTOM: CODE CARD ── */}
            <motion.div
              className="ap-code-section"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={3}
            >
              <div className="ap-code-card">
                <pre className="ap-code-pre">
                  {CODE_LINES.map((line, i) => (
                    <div key={i} style={{ paddingLeft: `${(line.indent || 0) * 20}px` }}>
                      {line.empty ? (
                        <span>&nbsp;</span>
                      ) : line.isComment ? (
                        <span className="ap-c-comment">{line.kw}{line.rest}</span>
                      ) : (
                        <>
                          {line.kw && <span className="ap-c-kw">{line.kw}</span>}
                          {line.func && <span className="ap-c-func">{line.func}</span>}
                          {line.str && <span className="ap-c-str">{line.str}</span>}
                          {line.rest && <span className="ap-c-punc">{line.rest}</span>}
                        </>
                      )}
                    </div>
                  ))}
                </pre>
              </div>
              <div className="ap-card-actions">
                <a href="#contact" className="ap-run-btn">
                  Run
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            className="ap-right"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ap-gallery">
              <div className="ap-main-img-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={IMAGES[activeImg]}
                    alt="Lakshya Pandagre"
                    className="ap-main-img"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </div>
              <div className="ap-thumbnails">
                {IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className={`ap-thumbnail ${activeImg === i ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`thumbnail-${i}`} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      <style>{styles}</style>
    </section>
  )
}

const styles = `
  .ap-section {
    width: 100%;
    padding: 120px 0 160px;
    background: transparent;
  }

  .ap-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 32px;
  }

  .ap-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 90px;
    align-items: center;
  }

  /* ─── LEFT: CONTENT ─── */
  .ap-left {
    display: flex;
    flex-direction: column;
  }

  .ap-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .ap-heading {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 4vw, 52px);
    color: #FFFFFF;
    line-height: 1.15;
    margin: 0 0 12px 0;
    letter-spacing: -0.01em;
  }

  .ap-subheading {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: clamp(24px, 2vw, 32px);
    color: #FFFFFF;
    margin: 0 0 24px 0;
  }

  .ap-name-gradient {
    background: linear-gradient(90deg, #0066FF, #7C3AED, #FF2E9F);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .ap-paragraphs {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ap-paragraphs p {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.72);
    margin: 0;
    max-width: 580px;
  }

  /* ─── RIGHT: IMAGE GALLERY ─── */
  .ap-right {
    display: flex;
    justify-content: flex-end;
  }

  .ap-gallery {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .ap-main-img-wrapper {
    width: 320px;
    border-radius: 18px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .ap-main-img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }

  .ap-thumbnails {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .ap-thumbnail {
    width: 54px;
    height: 54px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    opacity: 0.4;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .ap-thumbnail:hover {
    opacity: 0.8;
  }

  .ap-thumbnail.active {
    opacity: 1;
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateX(-2px);
  }

  .ap-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ─── BOTTOM: CODE CARD ─── */
  .ap-code-section {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .ap-code-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 24px;
    width: 100%;
    max-width: 540px;
  }

  .ap-card-actions {
    width: 100%;
    max-width: 540px;
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }

  .ap-code-pre {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    line-height: 1.7;
    margin: 0;
    white-space: pre-wrap;
  }

  /* Syntax Highlighting */
  .ap-c-comment { color: #6272A4; font-style: italic; }
  .ap-c-kw { color: #FF79C6; }
  .ap-c-func { color: #50FA7B; }
  .ap-c-str { color: #F1FA8C; }
  .ap-c-punc { color: #F8F8F2; }

  /* Button */
  .ap-run-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    padding: 8px 16px;
  }

  .ap-run-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 900px) {
    .ap-grid {
      grid-template-columns: 1fr;
      gap: 56px;
    }

    .ap-right {
      justify-content: center;
      order: -1; /* Image on top for mobile */
    }

    .ap-gallery {
      flex-direction: column;
    }

    .ap-thumbnails {
      flex-direction: row;
      justify-content: center;
    }

    .ap-main-img-wrapper {
      width: 100%;
      max-width: 320px;
    }
  }
`


