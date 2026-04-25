import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

// --- Types & Data ---
type Skill = { name: string; color: string; iconUrl: string };
const iconBase = 'https://cdn.simpleicons.org';
const SKILLS: Skill[] = [
  { name: 'React', color: '#61DAFB', iconUrl: `${iconBase}/react/61DAFB` },
  { name: 'Next.js', color: '#FFFFFF', iconUrl: `${iconBase}/nextdotjs/FFFFFF` },
  { name: 'TypeScript', color: '#3178C6', iconUrl: `${iconBase}/typescript/3178C6` },
  { name: 'JavaScript', color: '#F7DF1E', iconUrl: `${iconBase}/javascript/F7DF1E` },
  { name: 'Tailwind CSS', color: '#06B6D4', iconUrl: `${iconBase}/tailwindcss/06B6D4` },
  { name: 'Framer Motion', color: '#0055FF', iconUrl: `${iconBase}/framer/FFFFFF` },
  { name: 'Node.js', color: '#339933', iconUrl: `${iconBase}/nodedotjs/339933` },
  { name: 'Python', color: '#3776AB', iconUrl: `${iconBase}/python/3776AB` },
  { name: 'C++', color: '#00599C', iconUrl: `${iconBase}/cplusplus/00599C` },
  { name: 'PostgreSQL', color: '#4169E1', iconUrl: `${iconBase}/postgresql/4169E1` },
  { name: 'MongoDB', color: '#47A248', iconUrl: `${iconBase}/mongodb/47A248` },
  { name: 'Supabase', color: '#3ECF8E', iconUrl: `${iconBase}/supabase/3ECF8E` },
  { name: 'Docker', color: '#2496ED', iconUrl: `${iconBase}/docker/2496ED` },
  { name: 'Git', color: '#F05032', iconUrl: `${iconBase}/git/F05032` },
  { name: 'Figma', color: '#F24E1E', iconUrl: `${iconBase}/figma/F24E1E` },
  { name: 'Vercel', color: '#000000', iconUrl: `${iconBase}/vercel/FFFFFF` },
];

const PHILOSOPHY_BLOCKS = [
  {
    title: "Design Driven",
    text: "Every block of code serves the user experience. I build with motion, flow, and visual weight in mind. The browser is just a canvas, and CSS/WebGL are my brushes.",
    align: "left",
    visual: "grid"
  },
  {
    title: "Performant by Default",
    text: "Smooth animations mean nothing if the main thread is blocked. I architect minimal React layers, offload heavy composites to the GPU, and respect the hardware.",
    align: "right",
    visual: "pulse"
  },
  {
    title: "Zero Compromise",
    text: "Grid systems and static components are safe. But memorable web experiences demand asymmetry, non-linear progression, and a pulse. I don't build dashboards; I build worlds.",
    align: "left",
    visual: "minimal"
  }
];

export default function CinematicJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Spotlight / bubble effect for Skills
  const skillsRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!skillsRef.current) return;
    const rect = skillsRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };



  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyScrollY } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  });

  // Create progress line fill
  const progressHeight = useTransform(storyScrollY, [0.15, 0.85], ["0%", "100%"]);

  return (
    <div ref={containerRef} style={{ background: 'transparent', color: '#F0F0F5', overflow: 'hidden' }}>

      {/* =========================================
          SECTION 1: MY SKILLS
          ========================================= */}
      <section style={{
        padding: '80px 24px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#0066FF',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}>
              · SKILLS & EXPERTISE ·
            </span>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#F0F0F5',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              margin: '0 0 40px 0',
            }}>
              My Skills
            </h2>
          </motion.div>

          <div
            ref={skillsRef}
            onMouseMove={handleMouseMove}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              position: 'relative'
            }}>
            {SKILLS.map((skill, i) => {
              // Smooth, pronounced floating motion like bubbles
              const randomDuration = 4 + Math.random() * 3;
              const randomDelay = Math.random() * 2;
              const floatDist = 8 + Math.random() * 12;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ delay: i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      y: -5,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      boxShadow: `0 10px 30px -10px ${skill.color}60`
                    }}
                    animate={{
                      y: [-floatDist, floatDist],
                    }}
                    transition={{
                      y: {
                        duration: randomDuration,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: randomDelay
                      },
                      scale: { duration: 0.2 },
                      backgroundColor: { duration: 0.2 },
                      boxShadow: { duration: 0.3 },
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '9999px',
                      cursor: 'default',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      style={{
                        width: '16px',
                        height: '16px',
                        filter: `drop-shadow(0 0 6px ${skill.color}30)`
                      }}
                    />
                    <span style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(13px, 1.2vw, 15px)',
                      color: 'rgba(255,255,255,0.85)',
                      letterSpacing: '0.01em'
                    }}>
                      {skill.name}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: HOW I THINK & BUILD
          ========================================= */}
      <section
        ref={storyRef}
        style={{
          padding: isMobile ? '80px 24px' : '150px 0',
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
        {/* Background Depth Layer - Slow moving blobs */}
        {!isMobile && (
          <motion.div
            animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: '20%', left: '10%', width: '50vw', height: '50vw',
              background: 'radial-gradient(circle, rgba(0,102,255,0.03) 0%, transparent 60%)',
              filter: 'blur(100px)',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Header Parallax wrapper */}
        <motion.div
          style={{
            scale: useTransform(storyScrollY, [0.1, 0.3], [1, 0.9]),
            opacity: useTransform(storyScrollY, [0.1, 0.3], [1, 0.4]),
            marginBottom: isMobile ? '80px' : '150px',
            position: 'relative',
            zIndex: 10
          }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 100,
            color: '#0066FF',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            · THE STORY ·
          </span>
          <motion.h2
            initial={{ letterSpacing: '0.08em', opacity: 0, y: 30 }}
            whileInView={{ letterSpacing: '-0.04em', opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            animate={{ backgroundPosition: ["0% center", "-200% center"] }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(40px, 7vw, 90px)',
              lineHeight: 1.1,
              textAlign: 'center',
              margin: '0 auto',
              maxWidth: '900px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #8888A0 40%, #FFFFFF 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            How I Think & Build
          </motion.h2>
        </motion.div>

        {/* Narrative Scroll Panels */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: isMobile ? '40px' : '20px' }}>

          {/* Vertical Progress Indicator (Desktop only) */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '5%',
              bottom: '5%',
              width: '2px',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 0,
            }}>
              {/* Progress Fill */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%',
                  height: progressHeight,
                  background: 'linear-gradient(180deg, transparent, #0066FF, #00FF88)',
                  boxShadow: '0 0 15px #0066FF',
                  zIndex: 1
                }}
              />
            </div>
          )}

          {PHILOSOPHY_BLOCKS.map((block, i) => (
            <StoryBlock key={block.title} block={block} index={i} isMobile={isMobile} />
          ))}

        </div>
      </section>

      {/* =========================================
          SECTION 3: FINAL CTA
          ========================================= */}
      <section style={{
        minHeight: '80vh',
        padding: '120px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Abstract Floating Code Snippet Flair */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ delay: 0.8, duration: 1.5 }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#0066FF',
            opacity: 0.4,
            filter: 'blur(0.5px) drop-shadow(0 0 30px rgba(0,102,255,0.4))',
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <motion.div
            animate={{ y: [-15, 15], rotate: [-2, 2] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          >
            {`const idea = await build(passion);`}
            <br />
            {`requestAnimationFrame(render);`}
          </motion.div>
        </motion.div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          {/* Line 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(50px, 10vw, 120px)',
              color: '#F0F0F5',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              margin: '0 0 20px 0',
            }}>
              Have an idea?
            </h2>
          </motion.div>

          {/* Line 2 with Stagger and Gradient */}
          <StaggeredText
            text="Let's build something great together."
            className="cta-gradient-text"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(24px, 4vw, 50px)',
              background: 'linear-gradient(90deg, #F0F0F5, #8888A0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '60px' }}
          >
            <a href="mailto:hello@lakshya.dev" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 40px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '9999px',
              color: '#F0F0F5',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}>
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </motion.div>

          {/* Social Icons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginTop: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px'
            }}
          >
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  color: '#8888A0',
                  transition: 'all 0.3s ease',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#F0F0F5';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#8888A0';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// --- Helper Components ---

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: <EmailIcon />, href: 'mailto:lakshyapandagre@gmail.com', label: 'Email' },
  { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/lakshya-pandagre-937a3b328/', label: 'LinkedIn' },
  { icon: <GitHubIcon />, href: 'https://github.com/lakshyapandagre-ux', label: 'GitHub' },
  { icon: <XIcon />, href: 'https://x.com/Lakshya_ai', label: 'X (Twitter)' },
  { icon: <InstagramIcon />, href: 'https://instagram.com/lakshya.pandagre', label: 'Instagram' },
];

function StoryBlock({ block, isMobile }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"]
  });

  // Parallax effect on background
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Opacity: high when near center (0.3 to 0.7), dim when at edges
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Dot glowing mapped globally to this block's specific visibility
  const dotBg = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], ["#0A0A0F", "#0066FF", "#0066FF", "#0A0A0F"]);
  const dotBorder = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], ["rgba(255,255,255,0.2)", "#0066FF", "#0066FF", "rgba(255,255,255,0.2)"]);
  const dotShadow = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], ["0 0 0px transparent", "0 0 10px #0066FF", "0 0 10px #0066FF", "0 0 0px transparent"]);

  const xDirection = block.align === 'left' ? -40 : 40;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'center' : block.align === 'left' ? 'flex-end' : 'flex-start',
        position: 'relative',
        width: '100%',
        margin: isMobile ? '60px 0' : '20px 0',
        padding: isMobile ? 0 : block.align === 'left' ? '0 calc(50% + 40px) 0 20px' : '0 20px 0 calc(50% + 40px)',
        zIndex: 10
      }}
    >
      {/* Tracker Dot local to this block (Desktop only) */}
      {!isMobile && (
        <motion.div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: dotBg,
          borderColor: dotBorder,
          borderStyle: 'solid',
          borderWidth: '2px',
          boxShadow: dotShadow
        }} />
      )}

      <motion.div style={{ opacity, scale, width: '100%', maxWidth: '520px' }}>
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : xDirection, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            width: '100%',
            position: 'relative',
            padding: isMobile ? '32px 24px' : '48px',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Background Elements with Parallax Depth */}
          <motion.div style={{ position: 'absolute', inset: 0, y: bgY, zIndex: 0, opacity: 0.08, pointerEvents: 'none' }}>
            {block.visual === 'grid' && (
              <div style={{ width: '100%', height: '150%', backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'linear-gradient(to bottom, black 10%, transparent 90%)' }} />
            )}
            {block.visual === 'pulse' && (
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '20%', right: '10%', width: '200px', height: '200px', background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', filter: 'blur(40px)' }} />
            )}
            {block.visual === 'minimal' && (
              <motion.div animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,1) 50%, transparent 60%)', backgroundSize: '300% 300%' }} />
            )}
          </motion.div>

          <div style={{ position: 'relative', zIndex: 1, marginBottom: '20px' }}>
            {/* Heading Animation: Fade + Slide */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: '#F0F0F5',
                lineHeight: 1.2,
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
              <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', background: '#0066FF', boxShadow: '0 0 10px #0066FF' }} />
              {block.title}
            </motion.h3>
          </div>

          {/* Paragraph: Delayed fade / Line-by-line using stagger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
            }}
            whileHover={{ color: '#F0F0F5', textShadow: '0 0 8px rgba(255,255,255,0.2)', transition: { duration: 0.3 } }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              color: '#8888A0',
              lineHeight: 1.8,
              margin: 0,
              position: 'relative',
              zIndex: 1,
              transition: 'color 0.3s ease'
            }}
          >
            {(block.text.match(/[^.!?]+[.!?]+/g) || [block.text]).map((sentence: string, i: number) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                style={{ display: 'inline-block', marginRight: '6px' }}
              >
                {sentence.trim()}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StaggeredText({ text, className, style }: { text: string, className?: string, style?: React.CSSProperties }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: 'spring' as const, damping: 12, stiffness: 100 } },
  };

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', ...style }}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
