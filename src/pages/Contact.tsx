import { useState, useRef, useEffect } from 'react';
import { useGSAPScrollReveal } from '../hooks/useGSAPScrollReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTilt } from '../hooks/useTilt';
import { useMagneticHover } from '../hooks/useMagneticHover';
import GuestbookSection from '../components/Guestbook/GuestbookSection';
import SignatureWall from '../components/Guestbook/SignatureWall';
import type { SignatureEntry } from '../components/Guestbook/SignatureCard';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════ */

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);



/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

const SOCIALS = [
  {
    icon: <GithubIcon />,
    title: 'GitHub',
    desc: 'Open source projects & contributions',
    url: 'https://github.com/lakshyapandagre-ux',
    color: '#e4e4e7',
    bgColor: 'rgba(255, 255, 255, 0.06)',
    glowColor: 'rgba(255, 255, 255, 0.08)',
  },
  {
    icon: <LinkedInIcon />,
    title: 'LinkedIn',
    desc: 'Professional network & experience',
    url: 'https://www.linkedin.com/in/lakshya-pandagre-937a3b328/',
    color: '#60a5fa',
    bgColor: 'rgba(59, 130, 246, 0.08)',
    glowColor: 'rgba(59, 130, 246, 0.12)',
  },
  {
    icon: <EmailIcon />,
    title: 'Email',
    desc: 'Direct line — quick response guaranteed',
    url: 'mailto:lakshyapandagre@gmail.com',
    color: '#f87171',
    bgColor: 'rgba(248, 113, 113, 0.08)',
    glowColor: 'rgba(248, 113, 113, 0.12)',
  },
  {
    icon: <InstagramIcon />,
    title: 'Instagram',
    desc: 'Personal & creative side of things',
    url: 'https://instagram.com/lakshya.pandagre',
    color: '#e879f9',
    bgColor: 'rgba(232, 121, 249, 0.08)',
    glowColor: 'rgba(232, 121, 249, 0.12)',
  },
  {
    icon: <TwitterIcon />,
    title: 'Twitter / X',
    desc: 'Tech thoughts & dev updates',
    url: 'https://twitter.com/lakshyapandagre',
    color: '#9ca3af',
    bgColor: 'rgba(156, 163, 175, 0.06)',
    glowColor: 'rgba(156, 163, 175, 0.1)',
  },
];



const PARTICLES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: `${Math.random() * 20 + 15}s`,
  delay: `${Math.random() * -20}s`,
}));

/* ═══════════════════════════════════════════════════
   CONTACT PAGE COMPONENT
   ═══════════════════════════════════════════════════ */

function SocialCardNode({ s }: { s: typeof SOCIALS[0] }) {
  const { handleMove, handleLeave } = useTilt();

  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="ct-social-card"
      onMouseMove={handleMove as any}
      onMouseLeave={handleLeave as any}
      style={{
        '--card-glow': s.glowColor,
        '--card-accent': s.color,
      } as React.CSSProperties}
    >
      <div className="ct-social-icon" style={{ background: s.bgColor, color: s.color }}>
        {s.icon}
      </div>
      <div className="ct-social-info">
        <h4 className="ct-social-title">{s.title}</h4>
        <p className="ct-social-desc">{s.desc}</p>
      </div>
      <div className="ct-social-arrow">
        <ArrowUpRight />
      </div>
    </a>
  );
}

export default function Contact() {
  const pageRef = useGSAPScrollReveal<HTMLElement>({ stagger: 0.12 });

  /* ── Form state ── */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [newSignature, setNewSignature] = useState<SignatureEntry | null>(null);


  /* ── GSAP stagger refs ── */
  const socialCardsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroBtn1Ref = useMagneticHover<HTMLAnchorElement>();
  const heroBtn2Ref = useMagneticHover<HTMLAnchorElement>();
  const ctaBtn1Ref = useMagneticHover<HTMLAnchorElement>();
  const ctaBtn2Ref = useMagneticHover<HTMLAnchorElement>();

  useGSAP(() => {
    const timeout = setTimeout(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(heroRef.current.querySelectorAll('.ct-hero-anim'),
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: heroRef.current, start: 'top 85%', once: true }
          }
        );
      }

      // Social cards stagger
      if (socialCardsRef.current) {
        gsap.fromTo(socialCardsRef.current.querySelectorAll('.ct-social-card'),
          { opacity: 0, y: 40, scale: 0.97, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: socialCardsRef.current, start: 'top 80%', once: true }
          }
        );
      }

      // Form reveal
      if (formRef.current) {
        gsap.fromTo(formRef.current.querySelectorAll('.ct-form-anim'),
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%', once: true }
          }
        );
      }



      // Status block
      if (statusRef.current) {
        gsap.fromTo(statusRef.current,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: statusRef.current, start: 'top 85%', once: true }
          }
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.querySelectorAll('.ct-cta-anim'),
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%', once: true }
          }
        );
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, { scope: pageRef });

  /* ── Terminal typing effect ── */
  const [typedCmd, setTypedCmd] = useState('');
  const fullCmd = '$ whoami → lakshya-dev';
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTypedCmd(fullCmd.slice(0, i + 1));
      i++;
      if (i >= fullCmd.length) clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormStatus('sending');

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        setFormStatus('sent');
        setTimeout(() => {
          setFormStatus('idle');
          setName(''); setEmail(''); setMessage('');
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };



  return (
    <main ref={pageRef} className="ct-page">
      {/* ── Ambient Background ── */}
      <div className="ct-bg-layer">
        <div className="ct-bg-glow ct-bg-glow--blue" />
        <div className="ct-bg-glow ct-bg-glow--purple" />
        <div className="ct-bg-noise" />
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="ct-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 1: HERO CONTACT BLOCK
          ═══════════════════════════════════════════ */}
      <section className="ct-section ct-hero-section" ref={heroRef}>
        <div className="ct-container ct-hero-grid">
          <div className="ct-hero-left">
            <span className="ct-label ct-hero-anim">LET'S CONNECT</span>
            <h1 className="ct-hero-heading ct-hero-anim">
              Beyond<br />
              <span className="ct-gradient-text ct-italic">Code.</span>
            </h1>
            <p className="ct-hero-desc ct-hero-anim">
              I'm always open to new opportunities, collaborations, and conversations.
              Whether it's a project idea, internship, or just a hello — let's make it happen.
            </p>
            <div className="ct-hero-buttons ct-hero-anim">
              <a ref={heroBtn1Ref} href="mailto:lakshyapandagre@gmail.com" className="ct-btn ct-btn--primary">
                <span>Get in Touch</span>
                <ArrowUpRight />
              </a>
              <a ref={heroBtn2Ref} href="#ct-socials" className="ct-btn ct-btn--secondary">
                <span>Explore Links</span>
              </a>
            </div>
          </div>

          <div className="ct-hero-right ct-hero-anim">
            <div className="ct-profile-card">
              <div className="ct-profile-avatar">
                <span>L</span>
              </div>
              <h3 className="ct-profile-name">Lakshya Pandagre</h3>
              <p className="ct-profile-role">Full Stack Dev · ML Explorer</p>
              <div className="ct-profile-badge">
                <span className="ct-badge-dot" />
                Available for work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2: SOCIAL CARDS
          ═══════════════════════════════════════════ */}
      <section className="ct-section" id="ct-socials">
        <div className="ct-container">
          <div className="ct-section-header gsap-reveal">
            <span className="ct-label">EVERYWHERE</span>
            <h2 className="ct-section-heading">
              Find me <span className="ct-gradient-text">everywhere</span>
            </h2>
          </div>

          <div className="ct-social-grid" ref={socialCardsRef}>
            {SOCIALS.map((s) => (
              <SocialCardNode key={s.title} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3: CONTACT FORM
          ═══════════════════════════════════════════ */}
      <section className="ct-section" ref={formRef}>
        <div className="ct-container">
          <div className="ct-section-header ct-form-anim">
            <span className="ct-label">REACH OUT</span>
            <h2 className="ct-section-heading">
              Send a <span className="ct-gradient-text ct-italic">message</span>
            </h2>
          </div>

          <div className="ct-form-grid">
            {/* Form */}
            <div className="ct-form-card ct-form-anim">
              <form onSubmit={handleFormSubmit} className="ct-form">
                <div className="ct-input-group">
                  <label className="ct-input-label">// name</label>
                  <input
                    type="text"
                    className="ct-input"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="ct-input-group">
                  <label className="ct-input-label">// email</label>
                  <input
                    type="email"
                    className="ct-input"
                    placeholder="you@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="ct-input-group">
                  <label className="ct-input-label">// message</label>
                  <textarea
                    className="ct-input ct-textarea"
                    placeholder="Tell me about your project, idea, or just say hi..."
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="ct-submit-btn" disabled={formStatus !== 'idle'}>
                  {formStatus === 'sending' ? (
                    <span className="ct-submit-loading">Sending...</span>
                  ) : formStatus === 'sent' ? (
                    <span className="ct-submit-success">✓ Message Sent!</span>
                  ) : formStatus === 'error' ? (
                    <span className="ct-submit-error">Failed to send ✕</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowUpRight />
                    </>
                  )}
                </button>
                <p className="ct-form-note">// response within 24 hours · no spam, ever</p>
              </form>
            </div>

            {/* Code Preview */}
            <div className="ct-code-card ct-form-anim">
              <div className="ct-code-bar">
                <div className="ct-code-dots">
                  <span className="ct-dot ct-dot--red" />
                  <span className="ct-dot ct-dot--yellow" />
                  <span className="ct-dot ct-dot--green" />
                </div>
                <span className="ct-code-filename">contact.ts</span>
              </div>
              <div className="ct-code-body">
                <div className="ct-code-lines">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <span key={n} className="ct-code-ln">{n}</span>
                  ))}
                </div>
                <pre className="ct-code-content">
                  <span className="ct-ck">const</span> <span className="ct-cv">contact</span> <span className="ct-cp">=</span> {'{'}{'\n'}
                  {'  '}<span className="ct-cv">name</span><span className="ct-cp">:</span> <span className="ct-cs">"{name || '...'}"</span>,{'\n'}
                  {'  '}<span className="ct-cv">email</span><span className="ct-cp">:</span> <span className="ct-cs">"{email || '...'}"</span>,{'\n'}
                  {'  '}<span className="ct-cv">message</span><span className="ct-cp">:</span> <span className="ct-cs">"{message ? message.slice(0, 40) + (message.length > 40 ? '...' : '') : '...'}"</span>,{'\n'}
                  {'  '}<span className="ct-cv">status</span><span className="ct-cp">:</span> <span className="ct-ck">{formStatus === 'sent' ? '"delivered"' : formStatus === 'sending' ? '"sending"' : '"draft"'}</span>,{'\n'}
                  {'}'};{'\n'}
                  {'\n'}
                  <span className="ct-cc">// Submit to lakshya.dev API</span>{'\n'}
                  <span className="ct-ck">await</span> <span className="ct-cv">sendMessage</span>(contact);{'\n'}
                  <span className="ct-cc">// Response time: &lt; 24hrs</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4: GUESTBOOK & SIGNATURE WALL
          ═══════════════════════════════════════════ */}
      <section className="guestbook-section">
        <div className="section-label">
          <span className="label-dot" />
          GUESTBOOK
          <span className="label-dot" />
        </div>
        <GuestbookSection onNewSignature={setNewSignature} />
        <SignatureWall newEntry={newSignature} />
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6: LIVE STATUS
          ═══════════════════════════════════════════ */}
      <section className="ct-section">
        <div className="ct-container ct-center">
          <div className="ct-status-card" ref={statusRef}>
            <div className="ct-status-bar">
              <div className="ct-code-dots">
                <span className="ct-dot ct-dot--red" />
                <span className="ct-dot ct-dot--yellow" />
                <span className="ct-dot ct-dot--green" />
              </div>
              <span className="ct-status-bar-title">system_status.sh</span>
            </div>
            <div className="ct-status-body">
              <p className="ct-status-line ct-status-cmd">{typedCmd}<span className="ct-cursor-blink" /></p>
              <div className="ct-status-divider" />
              <p className="ct-status-line">
                <span className="ct-status-key">status</span>
                <span className="ct-status-sep">→</span>
                <span className="ct-status-val ct-status-val--green">available_for_work()</span>
              </p>
              <p className="ct-status-line">
                <span className="ct-status-key">stack</span>
                <span className="ct-status-sep">→</span>
                <span className="ct-status-val">React · TypeScript · Python · FastAPI</span>
              </p>
              <p className="ct-status-line">
                <span className="ct-status-key">focus</span>
                <span className="ct-status-sep">→</span>
                <span className="ct-status-val">Full Stack · ML · System Design</span>
              </p>
              <p className="ct-status-line">
                <span className="ct-status-key">response</span>
                <span className="ct-status-sep">→</span>
                <span className="ct-status-val ct-status-val--green">&lt; 24 hours</span>
              </p>
              <p className="ct-status-line">
                <span className="ct-status-key">location</span>
                <span className="ct-status-sep">→</span>
                <span className="ct-status-val">India 🇮🇳</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7: FINAL CTA + FOOTER
          ═══════════════════════════════════════════ */}
      <section className="ct-section ct-cta-section" ref={ctaRef}>
        <div className="ct-container ct-center">
          <h2 className="ct-cta-heading ct-cta-anim">
            Let's build something<br />
            <span className="ct-gradient-text ct-italic">remarkable.</span>
          </h2>
          <p className="ct-cta-desc ct-cta-anim">
            Got a project, idea, or opportunity? I'd love to hear about it.
          </p>
          <div className="ct-cta-buttons ct-cta-anim">
            <a ref={ctaBtn1Ref} href="mailto:lakshyapandagre@gmail.com" className="ct-btn ct-btn--primary">
              <span>Get in Touch</span>
              <ArrowUpRight />
            </a>
            <a ref={ctaBtn2Ref} href="/work" className="ct-btn ct-btn--secondary">
              <span>View Work</span>
            </a>
          </div>
        </div>

        <footer className="ct-footer ct-cta-anim">
          <p>Made with ❤️ by Lakshya Pandagre</p>
        </footer>
      </section>
    </main>
  );
}
