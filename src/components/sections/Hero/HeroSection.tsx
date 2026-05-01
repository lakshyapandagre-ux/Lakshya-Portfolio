import { useEffect, useState, memo } from 'react';
import './Hero.css';
import ProfilePhoto from './ProfilePhoto';
import SocialLinks, { type SocialLink } from './SocialLinks';
import { useGSAPScrollReveal } from '../../../hooks/useGSAPScrollReveal';


const ROTATING_WORDS = ["DEVELOPER", "DESIGNER", "BUILDER", "PROBLEM SOLVER", "LEARNER"];

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/lakshyapandagre-ux',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/lakshya-pandagre-937a3b328/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/Lakshya_ai',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:lakshyapandagre@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/lakshya.pandagre',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];



const SystemLabel = memo(() => {
  const [text, setText] = useState('');
  const fullText = "[ SYSTEM ONLINE ] ··· PORTFOLIO v2.0";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero__system-label gsap-reveal">
      {text}
      <span className="blink-fast">_</span>
    </div>
  );
});

const TypewriterText = memo(() => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = ROTATING_WORDS[wordIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        timeoutId = setTimeout(() => { }, 500);
      } else {
        timeoutId = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
      }
    } else {
      if (text === currentWord) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeoutId = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex]);

  return (
    <div className="hero__typewriter-container">
      <span className="hero__typewriter-prefix" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', color: '#888888' }}>HI, I'M A </span>
      <span className="hero__typewriter-word" style={{ color: '#0066FF', fontWeight: 700 }}>[{text}]</span>
      <span className="hero__typewriter-cursor">|</span>
    </div>
  );
});

const META_ROLES = [
  { left1: 'FULL STACK', left2: 'DEVELOPER', right1: 'SHIPPING', right2: 'REAL PRODUCTS' },
  { left1: 'UI/UX', left2: 'DESIGNER', right1: 'CRAFTING', right2: 'PIXEL PERFECT' },
  { left1: 'AI', left2: 'ENTHUSIAST', right1: 'BUILDING', right2: 'SMART SYSTEMS' },
];

const RotatingAvatarMeta = memo(() => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % META_ROLES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero__avatar-meta gsap-reveal" style={{ position: 'relative', height: '36px', width: '280px' }}>
      {META_ROLES.map((r, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 0.8s ease',
            pointerEvents: i === idx ? 'auto' : 'none',
          }}
        >
          <div className="hero__avatar-meta-text meta-aligned-right">
            <span className="meta-line1">{r.left1}</span>
            <span className="meta-line1">{r.left2}</span>
          </div>
          <div className="hero__avatar-meta-divider" />
          <div className="hero__avatar-meta-text meta-aligned-left">
            <span className="meta-line2">{r.right1}</span>
            <span className="meta-line2">{r.right2}</span>
          </div>
        </div>
      ))}
    </div>
  );
});

export default function HeroSection() {
  const [isBooted, setIsBooted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooted(true), 100);
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerRef = useGSAPScrollReveal<HTMLElement>({ stagger: 0.1, delay: 0.2 });

  return (
    <section id="home" ref={containerRef} className={`hero ${isBooted ? 'system-booted' : ''}`}>

      <div className="hero__bg-radial-left" />
      <div className="hero__bg-radial-right" />
      <div className="hero__grid-lines" />
      <div className="hero__bg-fx" />

      <div className="hero__inner">
        {/* Left Column: Profile Photo & Meta block */}
        <div className="hero__col-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
          <div className="gsap-reveal">
            <ProfilePhoto src="/avatar.png" />
          </div>

          {/* Rotating Meta block below avatar */}
          <RotatingAvatarMeta />
        </div>

        {/* Right Column: Text Content */}
        <div className="hero__col-right">
          {/* Element 1 - System Label */}
          <SystemLabel />

          {/* Element 2 - Typewriter */}
          <div className="gsap-reveal">
            <TypewriterText />
          </div>

          {/* Element 3 - Name (Static) */}
          <div className="hero__name-container gsap-reveal">
            <h1 className="hero__name">Lakshya</h1>
          </div>

          {/* Element 4 - Bio */}
          <div className="hero__bio gsap-reveal">
            <p>
              Always building{' '}
              <span className="highlight blue">web applications</span>
              {' '}and smart{' '}
              <span className="highlight yellow">AI systems</span>
              {' '}that actually make a difference. I focus on creating clean,
              fast, and user-friendly products using modern{' '}
              <span className="highlight green underline-draw">software engineering</span>
              {' '}practices and machine learning.{' '}
              <strong style={{ color: '#F0F0F5' }}><span className="highlight purple underline-draw">Always learning</span>, always building.</strong>
            </p>
          </div>

          {/* Element 5 - Stats Row */}
          <div className="hero__stats gsap-reveal">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginBottom: '20px',
            }}>
              <span><strong style={{ color: '#ffffffff' }}>Crafting</strong> <span style={{ color: '#8888A0', fontSize: '13px' }}>production-ready apps</span></span>
              <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
              <span><strong style={{ color: '#F0F0F5' }}>10+</strong> <span style={{ color: '#8888A0', fontSize: '13px' }}>Projects</span></span>
              <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
              <span><span style={{ color: '#F0F0F5' }}>∞</span> <span style={{ color: '#8888A0', fontSize: '13px' }}>Always Learning</span></span>
            </div>
          </div>

          {/* Element 6 - Social Icons */}
          <div className="hero__socials-container gsap-reveal">
            <SocialLinks links={SOCIAL_LINKS} />
          </div>
        </div>
      </div>

      <div className={`hero__scroll-indicator ${scrolled ? 'hidden' : ''}`}>
        <div className="hero__scroll-arrow">↓</div>
        scroll to explore
      </div>
    </section>
  );
}
