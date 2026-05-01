import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '../../../data/projects'

interface ProjectInfoProps {
  project: Project
  align: 'left' | 'right'
}

const techMap: Record<string, { color: string; slug: string }> = {
  React: { color: '#61DAFB', slug: 'react' },
  TypeScript: { color: '#3178C6', slug: 'typescript' },
  JavaScript: { color: '#F7DF1E', slug: 'javascript' },
  Supabase: { color: '#3ECF8E', slug: 'supabase' },
  'Tailwind CSS': { color: '#06B6D4', slug: 'tailwindcss' },
  'Node.js': { color: '#339933', slug: 'nodedotjs' },
  'Next.js': { color: '#FFFFFF', slug: 'nextdotjs' },
  Python: { color: '#3776AB', slug: 'python' },
  'Three.js': { color: '#FFFFFF', slug: 'threedotjs' },
  'Framer Motion': { color: '#0055FF', slug: 'framer' },
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        textAlign: 'left',
      }}
    >
      {/* Project number */}
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '11px',
          color: project.accentColor,
          letterSpacing: '0.12em',
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {project.number} / 03
      </span>

      {/* Project name */}
      <h2
        style={{
          fontFamily: 'Syne',
          fontWeight: 800,
          fontSize: 'clamp(32px, 4vw, 52px)',
          color: '#F0F0F5',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          margin: '0 0 8px',
        }}
      >
        {project.name}
      </h2>

      {/* Tagline */}
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '11px',
          color: '#F0F0F5',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '20px',
        }}
      >
        {project.tagline}
      </span>

      {/* Divider */}
      <div
        style={{
          width: '48px',
          height: '1.5px',
          background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
          borderRadius: '9999px',
          marginBottom: '20px',
        }}
      />

      {/* CODE BLOCK — overview */}
      <motion.div
        whileHover="hover"
        variants={{
          hover: {
            y: -6,
            scale: 1.01,
            boxShadow: `0 20px 40px -10px ${project.accentColor}30, inset 0 0 20px rgba(255,255,255,0.02)`,
            borderColor: `${project.accentColor}50`,
            transition: { duration: 0.3, ease: 'easeOut' }
          }
        }}
        style={{
          background: 'rgba(13, 17, 23, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
      >
        {/* Mini tab bar */}
        <div
          style={{
            background: '#161B22',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#28C840' }} />
          <span
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '9px',
              color: '#555568',
              marginLeft: '8px',
            }}
          >
            {project.name.toLowerCase()}.overview.ts
          </span>
        </div>

        <div style={{ padding: '14px 16px' }}>
          {/* // project_overview */}
          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '10px',
                color: '#555568',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              // project_overview
            </span>
            <p
              style={{
                fontFamily: 'DM Sans',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* // features */}
          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '10px',
                color: '#555568',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              // features
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {project.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '10px',
                      color: project.accentColor,
                      flexShrink: 0,
                    }}
                  >
                    ▸
                  </span>
                  <span
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* // tech_stack */}
          <div>
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '10px',
                color: '#555568',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              // tech_stack
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tech.map((t) => {
                const techObj = techMap[t] || { color: '#0066FF', slug: 'code' };
                return (
                  <motion.span
                    key={t}
                    whileHover={{
                      scale: 1.05,
                      borderColor: techObj.color + '80',
                      boxShadow: `0 0 16px ${techObj.color}40`,
                      backgroundColor: 'rgba(255,255,255,0.08)'
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.85)',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      cursor: 'default',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${techObj.slug}/${techObj.color.replace('#', '')}`}
                      alt={t}
                      style={{
                        width: '12px',
                        height: '12px',
                        filter: `drop-shadow(0 0 4px ${techObj.color}40)`
                      }}
                    />
                    {t}
                  </motion.span>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Buttons row */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <motion.button
          whileHover="hover"
          initial="initial"
          onClick={() => navigate(project.caseStudyRoute)}
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 500,
            fontSize: '13px',
            color: '#F0F0F5',
            background: project.accentColor,
            border: 'none',
            borderRadius: '9999px',
            padding: '9px 22px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9'
            e.currentTarget.style.boxShadow = `0 4px 15px ${project.accentColor}50`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Know More
          <motion.span variants={{ initial: { x: 0, y: 0 }, hover: { x: 3, y: -3 } }}>
            ↗
          </motion.span>
        </motion.button>

        <motion.a
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 15px rgba(255,255,255,0.15)`,
            borderColor: 'rgba(255,255,255,0.3)',
            backgroundColor: 'rgba(255,255,255,0.05)'
          }}
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 500,
            fontSize: '13px',
            color: '#F0F0F5',
            background: 'transparent',
            border: '0.5px solid rgba(255,255,255,0.12)',
            borderRadius: '9999px',
            padding: '9px 18px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          Live ↗
        </motion.a>

        <motion.a
          whileHover={{
            scale: 1.05,
            boxShadow: `0 0 15px rgba(255,255,255,0.15)`,
            borderColor: 'rgba(255,255,255,0.3)',
            backgroundColor: 'rgba(255,255,255,0.05)'
          }}
          href={project.githubUrl || 'https://github.com/lakshyapandagre-ux'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 500,
            fontSize: '13px',
            color: '#F0F0F5',
            background: 'transparent',
            border: '0.5px solid rgba(255,255,255,0.12)',
            borderRadius: '9999px',
            padding: '9px 18px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
          </svg>
          Repo
        </motion.a>
      </div>
    </div>
  )
}

export default ProjectInfo
