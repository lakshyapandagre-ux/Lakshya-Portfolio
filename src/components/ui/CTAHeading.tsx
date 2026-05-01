import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface CTAHeadingProps {
  codeComment: string
  lines: string[]
  accentLineIndex?: number
  subtitle?: string
}

const CTAHeading = ({ codeComment, lines, accentLineIndex, subtitle }: CTAHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Default accent to last line
  const accentIdx = accentLineIndex ?? lines.length - 1

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Code comment */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: '#555568',
          letterSpacing: '0.12em',
          display: 'block',
          marginBottom: '24px',
        }}
      >
        // {codeComment}
      </motion.span>

      {/* Staggered heading lines */}
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.2 + i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: i === accentIdx ? '#0066FF' : '#F0F0F5',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              display: 'block',
            }}
          >
            {line}
          </span>
        </motion.div>
      ))}

      {/* Animated underline */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: '60px' } : {}}
        transition={{ duration: 0.6, delay: 0.2 + lines.length * 0.15 }}
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, #0066FF, transparent)',
          borderRadius: '9999px',
          margin: '24px auto 0',
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 + lines.length * 0.15 }}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            color: '#8888A0',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '20px auto 0',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export default CTAHeading
