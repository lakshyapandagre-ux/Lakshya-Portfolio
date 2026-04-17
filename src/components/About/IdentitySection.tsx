import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IDENTITY = [
  {
    word: 'COMMIT',
    title: 'Consistency & Discipline',
    desc: 'Shipping regularly, improving daily, focusing on long-term growth.',
  },
  {
    word: 'BUILD',
    title: 'Full Stack Development',
    desc: 'Fast, scalable web applications from frontend to backend.',
  },
  {
    word: 'DESIGN',
    title: 'UI/UX Thinking',
    desc: 'Clean, intuitive interfaces with strong visual hierarchy.',
  },
  {
    word: 'SCALE',
    title: 'System Architecture',
    desc: 'Robust solutions that handle growth and complexity gracefully.',
  },
  {
    word: 'SHIP',
    title: 'Execution & Delivery',
    desc: 'Ideas into production-ready software, efficiently and reliably.',
  },
]

export default function IdentitySection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IDENTITY.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  const current = IDENTITY[index]

  return (
    <section className="id-section">
      <div className="id-content">
        {/* Word */}
        <div className="id-word-col">
          <AnimatePresence mode="wait">
            <motion.h2
              key={current.word}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="id-word"
            >
              {current.word}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="id-divider" />

        {/* Context */}
        <div className="id-context-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
            >
              <h3 className="id-title">{current.title}</h3>
              <p className="id-desc">{current.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Step dots */}
      <div className="id-dots">
        {IDENTITY.map((_, i) => (
          <span
            key={i}
            className={`id-dot ${i === index ? 'id-dot-active' : ''}`}
          />
        ))}
      </div>

      <style>{styles}</style>
    </section>
  )
}

const styles = `
  .id-section {
    width: 100%;
    padding: 80px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: transparent;
  }

  .id-content {
    display: flex;
    align-items: center;
    gap: clamp(24px, 4vw, 48px);
    max-width: 900px;
    width: 100%;
    padding: 0 32px;
  }

  /* Word */
  .id-word-col {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 0;
    flex: 1;
    height: 72px;
    overflow: hidden;
  }

  .id-word {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 5.5vw, 64px);
    letter-spacing: 0.18em;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    line-height: 1;
    margin: 0;
    margin-right: -0.18em;
    white-space: nowrap;
  }

  /* Divider */
  .id-divider {
    width: 1px;
    height: 48px;
    background: rgba(255, 255, 255, 0.12);
    flex-shrink: 0;
  }

  /* Context panel */
  .id-context-col {
    flex: 1;
    max-width: 280px;
    min-height: 64px;
    display: flex;
    align-items: center;
  }

  .id-title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    margin: 0 0 6px;
    letter-spacing: 0.01em;
  }

  .id-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.55;
    margin: 0;
  }

  /* Step dots */
  .id-dots {
    display: flex;
    gap: 8px;
    margin-top: 40px;
  }

  .id-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    transition: all 0.35s ease;
  }

  .id-dot-active {
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.15);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .id-content {
      flex-direction: column;
      text-align: center;
      gap: 20px;
    }

    .id-word-col {
      justify-content: center;
      height: 48px;
    }

    .id-word {
      font-size: clamp(28px, 8vw, 40px);
    }

    .id-divider {
      width: 32px;
      height: 1px;
    }

    .id-context-col {
      max-width: 260px;
      justify-content: center;
    }
  }
`
