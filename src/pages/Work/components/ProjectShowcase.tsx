import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../../../data/projects'
import ProjectCard from './ProjectCard'

const ProjectShowcase = () => {
  const btnRef = useRef<HTMLDivElement>(null)
  const btnInView = useInView(btnRef, { once: true })

  return (
    <section
      style={{
        padding: 'clamp(60px,8vw,100px) clamp(24px,6vw,80px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: 'clamp(48px, 6vw, 80px)',
        }}
      >
        <div
          style={{ width: '2px', height: '20px', background: '#0066FF', borderRadius: '1px' }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '11px',
            color: '#555568',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          // 03 projects · more coming soon
        </span>
      </motion.div>

      {/* Projects list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* See All Projects button */}
      <motion.div
        ref={btnRef}
        initial={{ opacity: 0, y: 16 }}
        animate={btnInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'clamp(48px,6vw,80px)',
        }}
      >
        <button
          style={{
            fontFamily: 'DM Sans',
            fontWeight: 500,
            fontSize: '14px',
            color: '#8888A0',
            background: 'rgba(255,255,255,0.03)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            padding: '12px 32px',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#F0F0F5'
            e.currentTarget.style.borderColor = 'rgba(0,102,255,0.3)'
            e.currentTarget.style.background = 'rgba(0,102,255,0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#8888A0'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
          }}
        >
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'inherit' }}>
            ▸
          </span>
          See All Projects
        </button>
      </motion.div>
    </section>
  )
}

export default ProjectShowcase
