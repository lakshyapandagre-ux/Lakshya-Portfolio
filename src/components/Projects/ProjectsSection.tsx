import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAPScrollReveal } from '../../hooks/useGSAPScrollReveal';
import SectionHeader from './SectionHeader';
import ProjectsGrid from './ProjectsGrid';
import ProjectCard from './ProjectCard';
import PopupContent from './PopupContent';
import { type Project } from '../../types/Project';
import './Projects.css';

const PROJECTS: Project[] = [
  {
    id: 1,
    number: '01',
    title: 'EduConnect',
    category: 'EDUCATION PLATFORM',
    description: 'Connecting students and educators through seamless real-time collaboration.',
    longDescription: 'A collaborative education platform connecting students and teachers with real-time features, smart tools, and seamless experiences built for modern learning.',
    bullets: [
      'Real-time collaboration with live updates via Supabase',
      'Role-based access for students, teachers, and admins',
      'Responsive UI with smooth animations and clean design',
    ],
    tags: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    codeUrl: 'https://github.com/lakshyapandagre-ux/EduConnect-codepanda',
    liveUrl: 'https://educonnectcodepanda.vercel.app/',
    gradientBg: 'linear-gradient(135deg, #0a1628, #003399)',
    isPlaceholder: false,
    featured: true,
    status: 'deployed',
    imageUrl: '/edu-connect.jpg.png',
    imageUrl2: '/edu-connect2.jpg.png',
    preview: {
      type: 'browser-mockup',
      bgColor: '#0a1628',
      gridColor: '#0066FF',
      displayTitle: 'EduConnect'
    }
  },
  {
    id: 2,
    number: '02',
    title: 'ResQ',
    category: 'CIVIC TECH PLATFORM',
    description: 'Helping cities resolve public issues faster with real-time citizen reporting.',
    longDescription: 'A smart civic platform for reporting and resolving city-level issues with real-time tracking, authority dashboards, and automated workflows.',
    bullets: [
      'Real-time issue tracking with live status updates',
      'Authority dashboard for managing and resolving complaints',
      'Location-based reporting with interactive maps',
    ],
    tags: ['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    codeUrl: 'https://github.com/lakshyapandagre-ux/ResQ---Team-MindForge',
    liveUrl: 'https://res-q-team-mind-forge.vercel.app/',
    gradientBg: 'linear-gradient(135deg, #1a0505, #660000)',
    isPlaceholder: false,
    featured: false,
    status: 'deployed',
    imageUrl: '/res-q1.jpg.png',
    imageUrl2: '/res-q2.jpg.png',
    preview: {
      type: 'browser-mockup',
      bgColor: '#1a0505',
      gridColor: '#8B0000',
      displayTitle: 'ResQ'
    }
  },
  {
    id: 3,
    number: '03',
    title: 'AudioSnap',
    category: 'AUDIO INTELLIGENCE',
    description: 'Snap any audio — get instant transcription, speaker detection, and AI-powered summaries in seconds.',
    longDescription: 'Snap any audio — get instant transcription, speaker detection, and AI-powered summaries in seconds.',
    bullets: [
      'Real-time audio transcription with high accuracy',
      'Speaker diarization — detects who said what',
      'AI-generated summaries and key point extraction',
      'Export transcripts as PDF, TXT, or SRT',
    ],
    tags: ['React', 'TypeScript', 'Python', 'FastAPI'],
    codeUrl: 'https://github.com/lakshyapandagre-ux/AudioSnap-.git',
    liveUrl: 'https://audio-snap-muoe.vercel.app/',
    gradientBg: 'linear-gradient(135deg, #0A0A1A 0%, #1A0A2E 100%)',
    isPlaceholder: false,
    featured: false,
    accentColor: '#7C3AED',
    status: 'deployed',
    imageUrl: '/audio-snap.jpg.png',
    preview: {
      type: 'waveform',
      bgColor: '#0A0A1A',
      gridColor: 'rgba(124,58,237,0.07)',
      displayTitle: 'AudioSnap'
    }
  }
];

const TOTAL_PROJECTS = PROJECTS.filter(p => !p.isPlaceholder).length;

export default function ProjectsSection() {
  const containerRef = useGSAPScrollReveal<HTMLElement>({ stagger: 0.15 });

  /* ── hover state ── */
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const showRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* ── mobile detection ── */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseEnter = useCallback((projectId: number, isPlaceholder: boolean) => {
    if (isPlaceholder || isMobile) return;
    clearTimeout(hideRef.current);
    showRef.current = setTimeout(() => {
      setHoveredProjectId(projectId);
    }, 60);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(showRef.current);
    hideRef.current = setTimeout(() => {
      setHoveredProjectId(null);
    }, 120);
  }, []);

  const handleClose = useCallback(() => {
    setHoveredProjectId(null);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  return (
    <section id="work" className="projects" ref={containerRef}>

      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
        }}
      />
      <div
        style={{
          position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(0,102,255,0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0
        }}
      />

      <div className="projects__inner">
        <div className="projects__header-wrapper gsap-reveal">
          <SectionHeader />
        </div>

        <ProjectsGrid>
          {PROJECTS.map((project, index) => {
            return (
              <div 
                key={project.id} 
                style={{ position: 'relative', pointerEvents: 'auto' }}
                onMouseEnter={() => handleMouseEnter(project.id, !!project.isPlaceholder)}
                onMouseLeave={handleMouseLeave}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  totalProjects={TOTAL_PROJECTS}
                />

                <AnimatePresence>
                  {hoveredProjectId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "calc(-50% + 15px)" }}
                      animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                      exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "calc(-50% + 15px)" }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="popup"
                      style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        zIndex: 9999,
                        pointerEvents: 'auto',
                        width: 'min(820px, 90vw)',
                        // Optional backdrop drop shadow
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
                      }}
                    >
                      <PopupContent
                        project={project}
                        onClose={handleClose}
                        contentVisible={true}
                        totalProjects={TOTAL_PROJECTS}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </ProjectsGrid>
      </div>
    </section>
  );
}
