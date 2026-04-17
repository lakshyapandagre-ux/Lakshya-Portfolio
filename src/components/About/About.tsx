import React, { useEffect, useRef, useState, memo } from 'react';
import './About.css';

// --- TYPES ---
interface SpotifyTrack {
  song: string;
  artist: string;
  coverUrl?: string;
  progress: number;
  elapsed: string;
  duration: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// --- DATA ---
const SOCIALS: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/lakshyapandagre-ux',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    )
  },
  {
    name: 'X',
    href: 'https://x.com/Lakshya_ai',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lakshya-pandagre-937a3b328/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  }
];

const LAST_PLAYED: SpotifyTrack = {
  song: "Tum Prem Ho",
  artist: "Mohit Lalwani",
  progress: 65,
  elapsed: "2:24",
  duration: "3:42"
};

// --- HOOKS ---
const useInView = (ref: React.RefObject<HTMLElement | null>, threshold = 0.2) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
};

// --- COMPONENTS ---
const SpotifyWidget = memo(({ track }: { track: SpotifyTrack }) => (
  // Removed internal container background styling classes per request, pure widget elements.
  <div
    className="about__spotify-container anim-phase-6"
    style={{
      marginTop: '4px',
      gap: 0,
      maxWidth: '100%',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div className="about__spotify-top" style={{ gap: '7px', marginBottom: '14px' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1ED760" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.853.206c-2.336-1.426-5.275-1.748-8.733-.956a.625.625 0 11-.274-1.218c3.782-.866 7.02-.486 9.654 1.115a.623.623 0 01.206.853zm1.192-3.21c-.194.316-.607.417-.923.223-2.666-1.637-6.732-2.1-9.74-.15a.705.705 0 01-.96-.285.705.705 0 01.285-.96c3.55-2.26 8.04-1.737 11.116 1.147.316.195.417.608.222.923zm.116-3.354C14.67 7.965 8.51 7.765 4.965 8.84a.89.89 0 01-1.142-.58.892.892 0 01.58-1.142C8.528 5.865 15.352 6.096 18.98 8.24c.343.203.456.646.253.989a.893.893 0 01-.99.253z" />
      </svg>
      <span className="about__spotify-label">Last played</span>
    </div>

    <div className="about__spotify-bottom" style={{ gap: '14px', justifyContent: 'flex-start', width: '100%' }}>
      <div className="about__spotify-content" style={{ gap: '14px' }}>
        <div
          className="about__spotify-art"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #1a472a, #1ED760)',
            flexShrink: 0,
            boxShadow: 'none',
          }}
        />
        <div className="about__spotify-info">
          <div
            className="about__spotify-song"
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 500,
              fontSize: '15px',
              color: '#F0F0F5',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {track.song}
          </div>
          <div
            className="about__spotify-artist"
            style={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              fontSize: '13px',
              color: '#1ED760',
              margin: '2px 0 10px 0',
            }}
          >
            by {track.artist}
          </div>
          <div className="about__spotify-progress-wrapper">
            <div className="about__spotify-progress-bg">
              <div className="about__spotify-progress-fill" style={{ width: `${track.progress}%` }} />
            </div>
            <div className="about__spotify-times" style={{ marginTop: '5px' }}>
              <span>{track.elapsed}</span>
              <span>/</span>
              <span>{track.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        className="about__spotify-play"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#F0F0F5',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1ED760';
          e.currentTarget.style.color = '#000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.color = '#F0F0F5';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  </div>
));

const PFPPanel = memo(() => (
  <div className="about__pfp-panel anim-pfp-reveal">
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '140%', height: '140%',
        background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)',
        filter: 'blur(30px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
      <img src="/avatar.png" alt="Lakshya Minecraft Avatar" className="about__pfp-photo" style={{ position: 'relative', zIndex: 1 }} />
    </div>
    <h3 className="about__pfp-name">Lakshya Pandagre</h3>
    <div className="about__pfp-role">Full Stack Developer</div>

    <div className="about__pfp-badges">
      <div className="pfp-badge badge-available anim-pfp-badge" style={{ animationDelay: '680ms' }}>
        <span className="dot">◉</span>
        <span className="text">available_for_work</span>
        <span className="brackets">(TRUE)</span>
      </div>

      <div className="pfp-badge badge-location anim-pfp-badge" style={{ animationDelay: '760ms' }}>
        <span className="icon">📍</span>
        <span className="text">Indore, India</span>
      </div>

      <a href="https://instagram.com/lakshya.pandagre" target="_blank" rel="noopener noreferrer" className="pfp-badge badge-instagram anim-pfp-badge" style={{ animationDelay: '840ms' }}>
        <div className="badge-insta-left">
          <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span className="text">@ft_.lakshyaa</span>
        </div>
        <span className="arrow">↗</span>
      </a>

      <div className="pfp-badge badge-code anim-pfp-badge" style={{ animationDelay: '920ms' }}>
        <span className="kwd">const</span> <span className="text" style={{ color: '#F0F0F5' }}>me</span> <span className="punc">=</span> <span className="punc">{'{'}</span><br />
        &nbsp;&nbsp;<span className="key">role:</span> <span className="str">"Full Stack Dev"</span><span className="punc">,</span><br />
        &nbsp;&nbsp;<span className="key">status:</span> <span className="str">"building..."</span><span className="punc">,</span><br />
        &nbsp;&nbsp;<span className="key">coffee:</span> <span className="kwd">true</span><span className="punc">,</span><br />
        <span className="punc">{'}'}</span>
      </div>
    </div>
  </div>
));

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, 0.2);

  return (
    <section className={`about__section ${inView ? 'in-view' : ''}`} ref={sectionRef}>

      {/* Static Visual Geometric Layout Fillers */}
      <svg className="about__bg-shape about__bg-shape-triangle anim-phase-1" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,5 95,95 5,95" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>
      <svg className="about__bg-shape about__bg-shape-circle anim-phase-1" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      </svg>

      {/* Main Container - 1000px Editorial Constraints */}
      <div className="about__container">

        {/* Left-fixed PFP Panel */}
        <PFPPanel />

        {/* Flex: 1 Right Layout Content (Boxless) */}
        <div className="about__content anim-phase-2">

          {/* Boxless Top Title Row */}
          <div className="about__name-row">
            <div className="about__name-col">
              <h2 className="about__name">Lakshya Pandagre</h2>
              <div className="about__role-line" style={{ marginBottom: '20px' }}>
                19 · Full Stack Dev · Builder · ML Explorer
              </div>
            </div>

            <div className="about__top-right">
              <a href="https://github.com/lakshyapandagre-ux" target="_blank" rel="noopener noreferrer" className="about__github-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.396.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>18</span>
              </a>
              <div className="about__social-icons">
                {SOCIALS.map((social) => (
                  <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="about__social-icon" aria-label={social.name}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="about__separator sep-top anim-phase-3" />

          {/* Narrow Editorial Bio */}
          <div className="about__bio anim-phase-4" style={{ maxWidth: '100%', width: '100%' }}>
            <p
              className="about__bio-para1"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                color: '#e6e6e6ff',
                fontWeight: 600,
                lineHeight: 1.85,
                maxWidth: '100%',
                margin: '0 0 16px 0',
              }}
            >
              <span className="about__bio-bold">I build from zero.</span> Whether it's frontend, backend, full-stack applications, or <span className="about__bio-highlight">AI-powered experiences</span> — I work across the entire development lifecycle. From UI/UX to deployment, I care less about technology debates and more about delivering things people love using.
            </p>
            <p
              className="about__bio-para2"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                color: '#e9e9e9ff',
                fontWeight: 600,
                lineHeight: 1.85,
                maxWidth: '100%',
                margin: '0 0 20px 0',
              }}
            >
              Currently diving deep into <span className="about__bio-highlight">Machine Learning and AI</span> to build products that are not just functional, but intelligent.
            </p>
          </div>

          {/* Inline String Formatting */}
          <div className="about__inline-stats anim-phase-5">
            {[
              { value: '10+', label: 'Projects' },
              { value: '2+', label: 'Years' },
              { value: '∞', label: 'Always Building' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                <div className="about__stat-item">
                  <span className="about__stat-num">{stat.value}</span>
                  <span className="about__stat-label" style={stat.value === '∞' ? { color: '#F0F0F5', fontSize: '13px', fontWeight: 'bold' } : {}}>{stat.label}</span>
                </div>
                {i < 2 && <span className="about__stat-dot">·</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="about__currently-line anim-phase-5" style={{ marginBottom: '20px' }}>
            <span className="about__currently-arrow">▸ </span>
            <span>Currently building:</span>
            <span className="about__currently-highlight" style={{ marginLeft: '4px' }}>ML/AI projects + this portfolio</span>
            <span className="about__cursor">|</span>
          </div>

          <div className="about__separator sep-bot anim-phase-5" />

          {/* Spotify Base floats naked */}
          <SpotifyWidget track={LAST_PLAYED} />

        </div>
      </div>
    </section>
  );
}
