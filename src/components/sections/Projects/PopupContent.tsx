import React from 'react';
import { type Project } from '../../../types/Project';

interface PopupContentProps {
  project: Project;
  onClose: () => void;
  contentVisible: boolean;
  totalProjects: number;
}

const techColors: Record<string, string> = {
  'React':        '#61DAFB',
  'TypeScript':   '#3178C6',
  'JavaScript':   '#F7DF1E',
  'Supabase':     '#3ECF8E',
  'Tailwind CSS': '#06B6D4',
  'MySQL':        '#4479A1',
  'MongoDB':      '#4DB33D',
  'Node.js':      '#68A063',
  'Next.js':      '#FFFFFF',
  'Python':       '#F7C948',
  'FastAPI':      '#009688',
  'PostgreSQL':   '#4169E1',
  'OpenAI Whisper': '#412991',
};

/* ── Waveform Bars for AudioSnap preview ── */
const WaveformPreview: React.FC = () => (
  <div className="waveform-preview">
    <div className="waveform-preview__bars">
      {[0, 1, 2, 3, 4].map(i => (
        <div
          key={i}
          className="waveform-preview__bar"
          style={{
            animationDelay: `${i * 0.18}s`,
            background: '#7C3AED',
          }}
        />
      ))}
    </div>
    <span style={{
      fontFamily: 'Syne, sans-serif',
      fontWeight: 700,
      fontSize: '18px',
      color: 'rgba(124,58,237,0.6)',
      marginTop: '16px',
      letterSpacing: '-0.02em',
    }}>
      Processing audio...
    </span>
  </div>
);

const PopupContent: React.FC<PopupContentProps> = ({ project, onClose, contentVisible, totalProjects }) => {
  const isBuilding = project.status === 'building';
  const accent = project.accentColor || '#0066FF';

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '85vh',
    }}>

      {/* ── TAB BAR ── */}
      <div
        className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
        style={{
          background: '#161B22',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
          transitionDelay: '0ms',
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          color: '#555568',
          marginLeft: '10px',
        }}>
          {project.title.toLowerCase().replace(/ /g, '_')}.tsx
        </span>
        <button
          onClick={onClose}
          className="esc-btn"
          style={{
            marginLeft: 'auto',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: '#fff',
            background: '#FF5F57',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: '4px',
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
        >
          ESC
        </button>
      </div>

      {/* ── BODY — 45% left / 55% right ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        overflow: 'auto',
        flex: 1,
        position: 'relative',
        zIndex: 1,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
      }}>

        {/* ──────── LEFT PANEL ──────── */}
        <div style={{
          padding: '28px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}>

          {/* Breadcrumb */}
          <div
            className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
            style={{ transitionDelay: '0ms', marginBottom: '10px' }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: '#555568',
            }}>
              {project.number} / {String(totalProjects).padStart(2, '0')}
            </span>
          </div>

          {/* Title + Category */}
          <div
            className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
            style={{ transitionDelay: '40ms', marginBottom: '0' }}
          >
            <h3 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '28px',
              color: '#F0F0F5',
              letterSpacing: '-0.02em',
              margin: '0 0 6px 0',
            }}>
              {project.title}
            </h3>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: accent,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              {project.category}
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '14px 0' }} />

          {/* Description */}
          <div
            className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
            style={{ transitionDelay: '80ms', marginBottom: '14px' }}
          >
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#9090A8',
              lineHeight: 1.7,
              margin: 0,
            }}>
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Feature bullets */}
          <div
            className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
            style={{ transitionDelay: '120ms', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}
          >
            {project.bullets?.map((bullet, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
              }}>
                <span style={{
                  color: accent,
                  fontSize: '12px',
                  marginTop: '3px',
                  flexShrink: 0,
                }}>✦</span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13.5px',
                  color: '#C0C0D0',
                  lineHeight: 1.55,
                }}>
                  {bullet}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 0 14px 0' }} />

          {/* Tech stack */}
          <div
            className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
            style={{ transitionDelay: '160ms' }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              color: '#6272A4',
              display: 'block',
              marginBottom: '10px',
            }}>
              {'// TECH_STACK'}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="popup-tech-chip"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '11px',
                    color: '#B0B0C0',
                    cursor: 'default',
                    transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0,102,255,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0,102,255,0.3)';
                    e.currentTarget.style.color = '#6699FF';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#B0B0C0';
                  }}
                >
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: techColors[tag] || '#8888A0',
                    flexShrink: 0,
                  }} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Spacer to push buttons to bottom */}
          <div style={{ flex: 1, minHeight: '16px' }} />

          {/* Action buttons */}
          <div
            className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
            style={{ transitionDelay: '200ms', display: 'flex', gap: '10px', paddingTop: '16px' }}
          >
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-btn-code"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#C0C0D0',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ← Code
              </a>
            )}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="popup-btn-live"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                  background: '#0066FF',
                  border: '1px solid transparent',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  textDecoration: 'none',
                  transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ↗ Live Demo
              </a>
            ) : (
              <span
                className="popup-btn-live-disabled"
                title="Coming Soon"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                  background: '#0066FF',
                  border: '1px solid transparent',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  opacity: 0.4,
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ↗ Live Demo
              </span>
            )}
          </div>
        </div>

        {/* ──────── RIGHT PANEL ──────── */}
        <div
          className={`popup-child ${contentVisible ? 'popup-child--visible' : ''}`}
          style={{
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            transitionDelay: '120ms',
          }}
        >
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: '#6272A4',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '4px',
          }}>
            {'// PREVIEW'}
          </span>

          {/* Main preview */}
          <div style={{
            background: project.gradientBg || 'linear-gradient(135deg, #0a1628, #0066FF22)',
            borderRadius: '8px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={`${project.title} preview`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
                loading="lazy"
              />
            ) : isBuilding ? (
              <WaveformPreview />
            ) : (
              <span style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '28px',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '-0.03em',
              }}>
                {project.title}
              </span>
            )}
            {/* corner icon */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#fff',
            }}>↗</div>
          </div>

          {/* Bottom row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            flexShrink: 0,
          }}>
            {/* CODE CARD — VS Code style */}
            <div style={{
              background: '#0D1117',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              {/* Mini tab bar */}
              <div style={{
                background: '#161B22',
                borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FEBC2E' }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28C840' }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                  color: '#555568', marginLeft: '6px',
                }}>stack.ts</span>
              </div>

              {/* Code content */}
              <div style={{ padding: '10px 0', display: 'flex' }}>
                {/* Line numbers */}
                <div style={{
                  padding: '0 10px',
                  borderRight: '0.5px solid rgba(255,255,255,0.05)',
                  flexShrink: 0,
                }}>
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={n} style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                      lineHeight: '1.85', color: '#3D4450',
                      textAlign: 'right',
                    }}>{n}</div>
                  ))}
                </div>

                {/* Code */}
                <div style={{ padding: '0 10px' }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '1.85' }}>
                    <span style={{ color: '#FF79C6' }}>const </span>
                    <span style={{ color: '#66D9EF' }}>project</span>
                    <span style={{ color: '#8888A0' }}> = {'{'}</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '1.85', paddingLeft: '12px' }}>
                    <span style={{ color: '#8BE9FD' }}>name</span>
                    <span style={{ color: '#8888A0' }}>: </span>
                    <span style={{ color: '#F1FA8C' }}>"{project.title}"</span>
                    <span style={{ color: '#8888A0' }}>,</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '1.85', paddingLeft: '12px' }}>
                    <span style={{ color: '#8BE9FD' }}>stack</span>
                    <span style={{ color: '#8888A0' }}>: [</span>
                  </div>
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '1.85', paddingLeft: '24px' }}>
                      <span style={{ color: '#F1FA8C' }}>"{tag}"</span>
                      <span style={{ color: '#8888A0' }}>,</span>
                    </div>
                  ))}
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '1.85', paddingLeft: '12px' }}>
                    <span style={{ color: '#8888A0' }}>],</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '1.85' }}>
                    <span style={{ color: '#FF79C6' }}>{isBuilding ? 'building' : 'live'}</span>
                    <span style={{ color: '#8888A0' }}>: </span>
                    <span style={{ color: '#FF79C6' }}>true</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '1.85' }}>
                    <span style={{ color: '#8888A0' }}>{'}'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small screenshot */}
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              position: 'relative',
              background: project.gradientBg,
              minHeight: '80px',
            }}>
              {(project.imageUrl2 || project.imageUrl) && (
                <img
                  src={project.imageUrl2 || project.imageUrl}
                  alt={`${project.title} secondary`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '4px 8px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '8px',
                  color: 'rgba(255,255,255,0.4)',
                }}>Screenshot 2</span>
              </div>
              <div style={{
                position: 'absolute', bottom: '22px', right: '8px',
                width: '16px', height: '16px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                border: '0.5px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '8px', color: '#fff',
              }}>↗</div>
            </div>
          </div>

          {/* Status bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.05)',
            marginTop: 'auto',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#555568' }}>
              {isBuilding ? '// building locally' : '// live on vercel'}
            </span>
            {isBuilding ? (
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                color: accent,
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <span className="status-dot-spin" style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: accent, display: 'inline-block',
                }} />
                in progress
              </span>
            ) : (
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
                color: '#00FF88',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <span className="status-dot-pulse" style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: '#00FF88', display: 'inline-block',
                }} />
                deployed
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PopupContent;
