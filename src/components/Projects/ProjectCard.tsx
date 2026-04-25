import { memo } from 'react';
import { type Project } from '../../types/Project';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { useTilt } from '../../hooks/useTilt';
import './Projects.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  totalProjects: number;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const TECH_ICON_MAP: Record<string, string> = {
  React: 'https://cdn.simpleicons.org/react/61DAFB',
  TypeScript: 'https://cdn.simpleicons.org/typescript/3178C6',
  Supabase: 'https://cdn.simpleicons.org/supabase/3ECF8E',
  'Tailwind CSS': 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  Python: 'https://cdn.simpleicons.org/python/3776AB',
  FastAPI: 'https://cdn.simpleicons.org/fastapi/009688',
};

const TECH_DOT_COLORS: Record<string, string> = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  Supabase: '#3ECF8E',
  'Tailwind CSS': '#06B6D4',
  Python: '#F7C948',
  FastAPI: '#009688',
  'Node.js': '#68A063',
  MongoDB: '#4DB33D',
};

const ProjectCard = memo(({ project, index: _index, totalProjects: _totalProjects, onMouseEnter, onMouseLeave, onMouseMove }: ProjectCardProps) => {
  const magneticRef = useMagneticHover(0.15);
  const { handleMove: handleTiltMove, handleLeave: handleTiltLeave } = useTilt();

  const handleInnerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleTiltMove(e);
    if (onMouseMove) onMouseMove(e);
  };

  const isBuilding = project.status === 'building';
  const accent = project.accentColor || '#0066FF';

  return (
    <div
      className="project-card-wrapper gsap-reveal"
      ref={magneticRef}
    >
      <div
        className={`project-card ${project.isPlaceholder ? 'project-card--placeholder' : ''}`}
        onMouseMove={handleInnerMouseMove}
        onMouseLeave={(e) => {
          handleTiltLeave(e);
          if (onMouseLeave) onMouseLeave(e);
        }}
        onMouseEnter={onMouseEnter}
        style={!project.isPlaceholder ? { cursor: 'pointer', opacity: 1 } : undefined}
      >

        {project.featured && (
          <div className="project-card__featured-badge">FEATURED</div>
        )}

        {/* Zone 1: Preview Banner */}
        <div className="project-card__preview border-separator">
          <div className="project-card__browser-bar">
            <span className="window-dot window-dot--red"></span>
            <span className="window-dot window-dot--yellow"></span>
            <span className="window-dot window-dot--green"></span>
          </div>
          <div
            className="project-card__preview-content"
            style={{
              backgroundColor: project.preview.bgColor,
              '--grid-color': project.preview.gridColor
            } as React.CSSProperties}
          >
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={`${project.title} preview`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
                loading="lazy"
                decoding="async"
              />
            ) : project.preview.type === 'waveform' ? (
              <>
                {/* Waveform icon top-right */}
                <svg
                  className="project-card__waveform-icon"
                  width="32" height="32" viewBox="0 0 32 32"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    opacity: 0.5,
                  }}
                >
                  <rect x="2" y="12" width="4" height="8" rx="2" fill={accent} opacity="0.6" />
                  <rect x="9" y="8" width="4" height="16" rx="2" fill={accent} opacity="0.8" />
                  <rect x="16" y="6" width="4" height="20" rx="2" fill={accent} />
                  <rect x="23" y="10" width="4" height="12" rx="2" fill={accent} opacity="0.7" />
                </svg>
                <h3 className="project-card__preview-title" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {project.preview.displayTitle}
                </h3>
              </>
            ) : project.isPlaceholder ? (
              <div className="project-card__placeholder-box">
                <svg width="68" height="68" viewBox="0 0 68 68" className="placeholder-svg">
                  <rect x="1" y="1" width="66" height="66" rx="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="8 8" className="placeholder-dash-rect" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="plus-icon">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            ) : (
              <h3 className="project-card__preview-title">{project.preview.displayTitle}</h3>
            )}
          </div>
          <div className="project-card__arrow-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </div>

        {/* Zone 2: Content */}
        <div className="project-card__content">
          <div className="project-card__number" style={accent !== '#0066FF' ? { color: accent } : undefined}>
            {project.number}
          </div>
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__description">{project.description}</p>
          <div className="project-card__meta">
            <div className="project-card__tags">
              {project.tags.length > 0 ? (
                project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="project-card__tag-pill">
                    {TECH_ICON_MAP[tag] ? (
                      <img
                        src={TECH_ICON_MAP[tag]}
                        alt={tag}
                        className="project-card__tag-icon"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: TECH_DOT_COLORS[tag] || '#888',
                        display: 'inline-block', flexShrink: 0,
                      }} />
                    )}
                    <span className="project-card__tag-label">{tag}</span>
                  </span>
                ))
              ) : (
                <span className="animated-ellipsis">in progress</span>
              )}
            </div>
            <div className="project-card__actions-row">
              {/* Status badge for building */}
              {isBuilding && (
                <span className="project-card__status-badge" style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: accent,
                  background: `${accent}1A`,
                  border: `1px solid ${accent}40`,
                  padding: '3px 10px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}>
                  building
                </span>
              )}
              <div className="project-card__actions">
                <a
                  href={project.codeUrl ? project.codeUrl : '#'}
                  target={project.codeUrl ? "_blank" : "_self"}
                  rel={project.codeUrl ? "noopener noreferrer" : ""}
                  className={`action-btn ${!project.codeUrl ? 'action-btn--disabled' : ''}`}
                  aria-label="Open GitHub repository"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a
                  href={project.liveUrl ? project.liveUrl : '#'}
                  target={project.liveUrl ? "_blank" : "_self"}
                  rel={project.liveUrl ? "noopener noreferrer" : ""}
                  className={`action-btn ${!project.liveUrl ? 'action-btn--disabled' : ''}`}
                  aria-label="Open live project"
                  title={!project.liveUrl ? 'Coming Soon' : undefined}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
