import React, { useEffect, useState, memo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useGSAPScrollReveal } from '../../../hooks/useGSAPScrollReveal';
import { SplitText } from '../../ui/SplitText';
import './TechStack.css';

gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
interface BaseTech {
  name: string;
  color: string;
  iconUrl?: string;
}

type Tech = BaseTech & { iconUrl?: string };
type TechCategory = { id: string; label: string; icon: React.ReactNode; color: string; techs: Tech[] };
type MarqueeItem = Required<BaseTech>;

const iconBase = 'https://cdn.simpleicons.org';
const getIcon = (slug: string, color: string) => `${iconBase}/${slug}/${color.replace('#', '')}`;

// --- DATA ---
const MARQUEE_ROW_1: MarqueeItem[] = [
  { name: 'React', color: '#61DAFB', iconUrl: getIcon('react', '#61DAFB') },
  { name: 'JavaScript', color: '#F7DF1E', iconUrl: getIcon('javascript', '#F7DF1E') },
  { name: 'Python', color: '#3776AB', iconUrl: getIcon('python', '#3776AB') },
  { name: 'C', color: '#A8B9CC', iconUrl: getIcon('c', '#A8B9CC') },
  { name: 'C++', color: '#00599C', iconUrl: getIcon('cplusplus', '#00599C') },
  { name: 'HTML5', color: '#E34F26', iconUrl: getIcon('html5', '#E34F26') },
  { name: 'CSS3', color: '#1572B6', iconUrl: getIcon('css3', '#1572B6') },
  { name: 'Tailwind CSS', color: '#06B6D4', iconUrl: getIcon('tailwindcss', '#06B6D4') },
  { name: 'Bootstrap', color: '#7952B3', iconUrl: getIcon('bootstrap', '#7952B3') },
];

const MARQUEE_ROW_2: MarqueeItem[] = [
  { name: 'Flask', color: '#FFFFFF', iconUrl: getIcon('flask', '#FFFFFF') },
  { name: 'FastAPI', color: '#009688', iconUrl: getIcon('fastapi', '#009688') },
  { name: 'MySQL', color: '#4479A1', iconUrl: getIcon('mysql', '#4479A1') },
  { name: 'Supabase', color: '#3ECF8E', iconUrl: getIcon('supabase', '#3ECF8E') },
  { name: 'Firebase', color: '#FFCA28', iconUrl: getIcon('firebase', '#FFCA28') },
  { name: 'Git', color: '#F05032', iconUrl: getIcon('git', '#F05032') },
  { name: 'VS Code', color: '#007ACC', iconUrl: getIcon('visualstudiocode', '#007ACC') },
  { name: 'Cursor', color: '#FFFFFF', iconUrl: getIcon('cursor', '#FFFFFF') },
  { name: 'Claude', color: '#CC785C', iconUrl: getIcon('anthropic', '#CC785C') },
  { name: 'Antigravity', color: '#0066FF', iconUrl: getIcon('google-deepmind', '#0066FF') },
];

const CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    color: '#0066FF',
    techs: [
      { name: 'React', color: '#61DAFB', iconUrl: getIcon('react', '#61DAFB') },
      { name: 'JavaScript', color: '#F7DF1E', iconUrl: getIcon('javascript', '#F7DF1E') },
      { name: 'Tailwind CSS', color: '#06B6D4', iconUrl: getIcon('tailwindcss', '#06B6D4') },
      { name: 'Bootstrap', color: '#7952B3', iconUrl: getIcon('bootstrap', '#7952B3') },
      { name: 'HTML5', color: '#E34F26', iconUrl: getIcon('html5', '#E34F26') },
      { name: 'CSS3', color: '#1572B6', iconUrl: getIcon('css3', '#1572B6') },
    ]
  },
  {
    id: 'backend',
    label: 'Backend & DB',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    ),
    color: '#00FF88',
    techs: [
      { name: 'Python', color: '#3776AB', iconUrl: getIcon('python', '#3776AB') },
      { name: 'FastAPI', color: '#009688', iconUrl: getIcon('fastapi', '#009688') },
      { name: 'Flask', color: '#FFFFFF', iconUrl: getIcon('flask', '#FFFFFF') },
      { name: 'Supabase', color: '#3ECF8E', iconUrl: getIcon('supabase', '#3ECF8E') },
      { name: 'Firebase', color: '#FFCA28', iconUrl: getIcon('firebase', '#FFCA28') },
      { name: 'MySQL', color: '#4479A1', iconUrl: getIcon('mysql', '#4479A1') },
      { name: 'SQL', color: '#4479A1', iconUrl: getIcon('mysql', '#4479A1') },
    ]
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
    color: '#FFD700',
    techs: [
      { name: 'JavaScript', color: '#F7DF1E', iconUrl: getIcon('javascript', '#F7DF1E') },
      { name: 'Python', color: '#3776AB', iconUrl: getIcon('python', '#3776AB') },
      { name: 'C', color: '#A8B9CC', iconUrl: getIcon('c', '#A8B9CC') },
      { name: 'C++', color: '#00599C', iconUrl: getIcon('cplusplus', '#00599C') },
    ]
  },
  {
    id: 'tools',
    label: 'Tools & AI',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    color: '#FF6B6B',
    techs: [
      { name: 'Git', color: '#F05032', iconUrl: getIcon('git', '#F05032') },
      { name: 'GitHub', color: '#FFFFFF', iconUrl: getIcon('github', '#FFFFFF') },
      { name: 'VS Code', color: '#007ACC', iconUrl: getIcon('visualstudiocode', '#007ACC') },
      { name: 'Cursor', color: '#FFFFFF', iconUrl: getIcon('cursor', '#FFFFFF') },
      { name: 'Postman', color: '#FF6C37', iconUrl: getIcon('postman', '#FF6C37') },
      { name: 'Figma', color: '#F24E1E', iconUrl: getIcon('figma', '#F24E1E') },
      { name: 'ChatGPT', color: '#74AA9C', iconUrl: getIcon('openai', '#74AA9C') },
      { name: 'Claude', color: '#CC785C', iconUrl: getIcon('anthropic', '#CC785C') },
      { name: 'Antigravity', color: '#0066FF', iconUrl: getIcon('google-deepmind', '#0066FF') },
    ]
  }
];



// --- HOOKS ---
const useInView = (ref: React.RefObject<HTMLElement | null>) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

const useCountUp = (end: number, duration = 1500, inView: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
        return;
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return count;
};

// --- SYNTAX HIGHLIGHTING ---
const filenames = {
  frontend: 'frontend.ts',
  backend: 'backend.ts',
  languages: 'languages.ts',
  tools: 'tools.config.ts',
} as const;

const contentMap: Record<string, string> = {
  'frontend': `const frontend = {\n  frameworks: ["React", "Bootstrap"],\n  languages: ["JavaScript"],\n  styling: ["Tailwind CSS", "CSS3", "HTML5"],\n}`,
  'backend': `const backend = {\n  runtime: ["Python"],\n  databases: ["Supabase", "MySQL", "Firebase", "SQL"],\n  apis: ["FastAPI", "Flask"],\n}`,
  'languages': `const languages = [\n  "JavaScript",\n  "Python",\n  "C", "C++",\n]`,
  'tools': `const tools = {\n  devtools: ["Git", "GitHub", "VS Code", "Cursor"],\n  editing: ["Figma", "Postman"],\n  ai: ["ChatGPT", "Claude", "Antigravity"],\n}`,
}

const techDescriptions: Record<string, string> = {
  'React': 'UI library',
  'JavaScript': 'Core language',
  'Tailwind CSS': 'Utility CSS',
  'Bootstrap': 'CSS framework',
  'HTML5': 'Markup',
  'CSS3': 'Styling',
  'Python': 'Backend + ML',
  'Supabase': 'BaaS platform',
  'Firebase': 'BaaS platform',
  'FastAPI': 'Python API',
  'Flask': 'Web framework',
  'MySQL': 'SQL database',
  'SQL': 'Query language',
  'Git': 'Version control',
  'GitHub': 'Code hosting',
  'VS Code': 'Code editor',
  'Cursor': 'AI IDE',
  'Postman': 'API testing',
  'Figma': 'UI design',
  'ChatGPT': 'AI assistant',
  'Claude': 'AI assistant',
  'Antigravity': 'AI Agentic Assistant',
  'C': 'Systems lang',
  'C++': 'Systems lang',
}

const proficiencyMap: Record<string, number> = {
  frontend: 4,
  backend: 3,
  languages: 3,
  tools: 5,
}

type Token = { text: string; color: string }

const tokenize = (line: string): Token[] => {
  const tokens: Token[] = []
  let remaining = line

  const rules: { regex: RegExp; color: string }[] = [
    { regex: /^(const|let|var|export|default)\b/, color: '#FF79C6' },
    { regex: /^(frontend|backend|languages|tools)\b/, color: '#66D9EF' },
    { regex: /^(frameworks|languages|styling|runtime|databases|apis|devtools|testing|design|deploy|editing|ai)\b(?=\s*:)/, color: '#8BE9FD' },
    { regex: /^"[^"]*"/, color: '#F1FA8C' },
    { regex: /^'[^']*'/, color: '#F1FA8C' },
    { regex: /^[{}[\],]/, color: '#6272A4' },
    { regex: /^[=:]/, color: '#6272A4' },
    { regex: /^\s+/, color: 'transparent' },
    { regex: /^\w+/, color: '#F0F0F5' },
    { regex: /^./, color: '#F0F0F5' },
  ]

  while (remaining.length > 0) {
    let matched = false
    for (const rule of rules) {
      const match = remaining.match(rule.regex)
      if (match) {
        tokens.push({ text: match[0], color: rule.color })
        remaining = remaining.slice(match[0].length)
        matched = true
        break
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], color: '#F0F0F5' })
      remaining = remaining.slice(1)
    }
  }

  return tokens
}

const SyntaxLine = ({ line }: { line: string }) => {
  const parts = tokenize(line)
  return (
    <span>
      {parts.map((part, i) => (
        <span key={i} style={{ color: part.color }}>
          {part.text}
        </span>
      ))}
    </span>
  )
}

// --- COMPONENTS ---
const TechCard = memo(({ item }: { item: MarqueeItem }) => (
  <div
    className="ts__marquee-card"
    style={{ '--brand-color': item.color } as React.CSSProperties}
  >
    <img
      src={item.iconUrl}
      alt={item.name}
      width="26"
      height="26"
      loading="lazy"
      decoding="async"
      className="ts__marquee-icon"
    />
    <span className="ts__marquee-name">{item.name}</span>
  </div>
));

interface MarqueeRowProps {
  items: MarqueeItem[];
  direction: 'left' | 'right';
  speed: number;
}
const MarqueeRow = memo(({ items, direction, speed }: MarqueeRowProps) => {
  const [paused, setPaused] = useState(false);
  // Duplicate items 3x for seamless infinite loop
  const duplicated = [...items, ...items, ...items];

  return (
    <div
      className="marquee-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`marquee-track marquee-${direction}`}
        style={{ animationPlayState: paused ? 'paused' : 'running', animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, i) => (
          <TechCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
});

const CategoryCard = memo(({ category, idx }: { category: TechCategory, idx: number }) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  };

  const rawContent = contentMap[category.id] || '';
  const lines = rawContent.split('\n');
  const filename = filenames[category.id as keyof typeof filenames] || 'unknown.ts';

  return (
    <div
      className="code-card gsap-reveal"
      style={{ display: 'flex', flexDirection: 'column' }}
      onMouseMove={handleMouseMove}
    >
      <div style={{
        background: '#161B22',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />

        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#8888A0',
          marginLeft: '8px',
          letterSpacing: '0.05em',
        }}>
          {filename}
        </span>

        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: '#0066FF',
          marginLeft: 'auto',
        }}>
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      <div style={{
        padding: '12px 20px 0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: `${category.color}15`,
            border: `1px solid ${category.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: category.color,
          }}>
            {category.icon}
          </div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '15px',
            color: '#F0F0F5',
          }}>
            {category.label}
          </span>
        </div>

        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: category.color,
          background: `${category.color}12`,
          border: `1px solid ${category.color}25`,
          borderRadius: '9999px',
          padding: '3px 10px',
        }}>
          {category.techs.length} techs
        </span>
      </div>

      <div style={{
        padding: '20px 20px 20px 0',
        display: 'flex',
        gap: '0',
        flex: 1,
        minHeight: '148px',
      }}>
        <div style={{
          padding: '0 16px',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          minWidth: '44px',
          textAlign: 'right',
          userSelect: 'none',
        }}>
          {lines.map((_, i) => (
            <div key={i} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              lineHeight: '1.8',
              color: '#3D4450',
            }}>
              {i + 1}
            </div>
          ))}
        </div>

        <div style={{ padding: '0 0 0 16px', flex: 1 }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              lineHeight: '1.8',
              whiteSpace: 'pre',
            }}>
              <SyntaxLine line={line} />
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: '#3D4450',
        }}>
          // proficiency
        </span>
        {[1, 2, 3, 4, 5].map(dot => (
          <div key={dot} style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: dot <= (proficiencyMap[category.id] || 3)
              ? category.color
              : 'rgba(255,255,255,0.1)',
          }} />
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', margin: '0 16px' }} />

      <div style={{
        padding: '12px 16px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
      }}>
        {category.techs.map(tech => (
          <div key={tech.name} className="tech-chip-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: 'rgba(255,255,255,0.04)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              padding: '4px 8px',
              height: '24px',
            }}>
              {tech.iconUrl && (
                <img
                  src={tech.iconUrl}
                  width={12}
                  height={12}
                  alt={tech.name}
                  style={{ flexShrink: 0, display: 'block' }}
                  onError={e => {
                    const img = e.currentTarget;
                    img.style.display = 'none';
                    const dot = document.createElement('span');
                    dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${tech.color};display:inline-block;flex-shrink:0`;
                    img.parentElement?.insertBefore(dot, img);
                  }}
                />
              )}
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#7070A0',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}>
                {tech.name}
              </span>
            </div>

            <div className="chip-tooltip">
              <span style={{ color: '#F0F0F5', fontWeight: 500 }}>{tech.name}</span>
              <span style={{ color: '#8888A0' }}> — {techDescriptions[tech.name] || 'Technology'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const StatBlock = ({ count, label, index, inView }: { count: number, label: string, index: number, inView: boolean }) => (
  <div style={{ textAlign: 'center' }}>
    <span style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      fontSize: '36px',
      color: '#F0F0F5',
    }}>
      {count}
      <span style={{ color: '#0066FF' }}>+</span>
    </span>
    <div style={{
      width: inView ? '40px' : '0px',
      height: '2px',
      background: '#0066FF',
      margin: '4px auto 8px',
      transition: `width 0.6s ease ${index * 0.2}s`,
      borderRadius: '9999px',
    }} />
    <span style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px',
      color: '#8888A0',
    }}>
      {label}
    </span>
  </div>
);

const StatsBar = memo(({ inView }: { inView: boolean }) => {
  const compCount = useCountUp(20, 1200, inView);
  const projCount = useCountUp(4, 800, inView);
  const hrsCount = useCountUp(500, 2000, inView);

  return (
    <div className="ts__stats-bar gsap-reveal">
      <StatBlock count={compCount} label="Technologies" index={0} inView={inView} />
      <div className="ts__stat-divider" />
      <StatBlock count={projCount} label="Categories" index={1} inView={inView} />
      <div className="ts__stat-divider" />
      <StatBlock count={hrsCount} label="Commits on GitHub" index={2} inView={inView} />
    </div>
  );
});

interface TechStackProps {
  headingOverride?: string
  labelOverride?: string
  watermarkOverride?: string
}

export default function TechStackSection({ headingOverride, labelOverride, watermarkOverride }: TechStackProps = {}) {
  const heading = headingOverride ?? 'Tech Stack'
  const label = labelOverride ?? '· TOOLS & TECHNOLOGIES ·'
  const watermark = watermarkOverride ?? 'STACK'

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useGSAPScrollReveal<HTMLElement>({ stagger: 0.1 });
  const inView = useInView(sectionRef);

  useGSAP(() => {
    if (headerRef.current && cardsRef.current) {
      gsap.set(headerRef.current, { left: '50%', xPercent: -50, opacity: 0 });
      gsap.to(headerRef.current, {
        left: '0%',
        xPercent: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 95%',
          end: 'top 40%',
          scrub: 1.2,
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="tech-stack" className="ts__section" style={{
      background: 'transparent',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      padding: '80px 0 80px 0',
    }}>
      {/* Top Border */}
      <div className="ts__top-border" />

      {/* Part 2: Section Header (Moved Above Marquee) */}
      <div className="ts__inner" style={{ marginBottom: '32px' }}>
        <div
          ref={headerRef}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            position: 'relative',
          }}
        >
          {/* Watermark */}
          <div className="ts__header-watermark">{watermark}</div>
          {/* Vertical blue bar + heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '4px',
              height: '40px',
              background: '#0066FF',
              borderRadius: '2px',
              flexShrink: 0,
            }} />
            <div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: '#0066FF',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
              }}>
                {label}
              </span>

              <SplitText
                text={heading}
                tag="h2"
                className="tech-heading"
                delay={45}
                duration={1.0}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 50, rotateX: -30 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                threshold={0.15}
                rootMargin="-80px"
                textAlign="left"
              />

              <div style={{
                width: inView ? '60px' : '0px',
                height: '2px',
                background: 'linear-gradient(90deg, #0066FF, transparent)',
                marginTop: '12px',
                marginBottom: '8px',
                transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s',
                borderRadius: '9999px',
              }} />
            </div>
          </div>

        </div>
      </div>

      {/* Part 1: Infinite Marquee */}
      <div className="ts__marquee-wrapper gsap-reveal" style={{
        width: '100%',
        overflow: 'hidden',
        maxWidth: '100vw',
        marginBottom: '48px',
      }}>
        <MarqueeRow items={[...MARQUEE_ROW_1, ...MARQUEE_ROW_2]} direction="left" speed={45} />
      </div>

      {/* Inner Container for Grids and Stats */}
      <div className="ts__inner">
        {/* Above the 2x2 grid */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}>
          <div style={{
            width: '3px',
            height: '16px',
            background: '#0066FF',
            borderRadius: '2px',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#8888A0',
            letterSpacing: '0.08em',
          }}>
            // hover over any tech chip to see details
          </span>
        </div>

        {/* Part 3: Categorized Grid */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
            maxWidth: '1260px',
            margin: '0 auto',
            marginBottom: '64px',
            alignItems: 'stretch',
          }}
        >
          {CATEGORIES.map((cat, index) => (
            <CategoryCard key={cat.id} category={cat} idx={index} />
          ))}
        </div>

        {/* Part 4: Stats Bar */}
        <StatsBar inView={inView} />
      </div>
    </section>
  );
}
