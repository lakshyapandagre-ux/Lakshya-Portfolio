import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { Project } from '../../data/projects'
import ProjectInfo from './ProjectInfo'
import VideoFrame from './VideoFrame'

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yOffsetImage = useTransform(scrollYProgress, [0, 1], [-50, 50])

  // Alternate layout: even = info left, video right | odd = video left, info right
  const isEven = index % 2 === 0

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Subtle section number watermark */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: isEven ? '0' : 'auto',
          right: isEven ? 'auto' : '0',
          fontFamily: 'Syne',
          fontWeight: 800,
          fontSize: 'clamp(80px, 14vw, 160px)',
          color: 'rgba(255,255,255,0.018)',
          letterSpacing: '-0.05em',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {project.number}
      </div>

      {/* Main grid — 2 columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 4vw, 48px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="project-grid"
      >
        {/* First column */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30, y: 40 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          style={{ zIndex: isEven ? 1 : 10, y: isEven ? 0 : yOffsetImage }}
        >
          {isEven ? (
            <ProjectInfo project={project} align="left" />
          ) : (
            <VideoFrame
              videoUrl={project.videoUrl}
              projectName={project.name}
              accentColor={project.accentColor}
            />
          )}
        </motion.div>

        {/* Second column */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30, y: 40 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          style={{ zIndex: isEven ? 10 : 1, y: isEven ? yOffsetImage : 0 }}
        >
          {isEven ? (
            <VideoFrame
              videoUrl={project.videoUrl}
              projectName={project.name}
              accentColor={project.accentColor}
            />
          ) : (
            <ProjectInfo project={project} align="right" />
          )}
        </motion.div>
      </div>

      {/* Thin separator line below each project */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          marginTop: 'clamp(60px, 8vw, 100px)',
        }}
      />
    </div>
  )
}

export default ProjectCard
