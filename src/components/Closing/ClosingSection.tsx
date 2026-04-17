import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  })
};

export default function ClosingSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section 
      ref={ref}
      className="closing-section"
    >
      <div className="closing-background" />
      
      <div className="closing-container">
        {/* 1. Label */}
        <motion.div 
          custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="closing-label"
        >
          END OF JOURNEY
        </motion.div>

        {/* 2. Main Heading */}
        <motion.div 
          custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
        >
          <h2 className="closing-heading">
            Let's Build Something <span className="closing-gradient">Meaningful</span> Together
          </h2>
        </motion.div>

        {/* 3. Subtext */}
        <motion.div 
          custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
        >
          <p className="closing-subtext">
            I'm always open to collaborating on impactful ideas, innovative products, and real-world solutions.
          </p>
        </motion.div>

        {/* 4. Buttons */}
        <motion.div 
          custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="closing-buttons"
        >
          <a href="#projects" className="closing-btn closing-btn-primary">View Projects</a>
          <a href="#connect" className="closing-btn closing-btn-secondary">Contact Me</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="closing-btn closing-btn-outline">Download Resume</a>
        </motion.div>

        {/* 5. System Status Block */}
        <motion.div 
          custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="closing-status-block"
        >
          <div className="closing-status-line">
            <span className="closing-status-dot"></span> Status: Available for Opportunities
          </div>
          <div className="closing-status-line">
            <span className="closing-status-dot-dim"></span> Currently Learning: AI/ML & System Design
          </div>
          <div className="closing-status-line">
            <span className="closing-status-dot-dim"></span> Response Time: &lt; 24 hrs
            <span className="closing-cursor" />
          </div>
        </motion.div>

        <div className="closing-divider" />

        {/* 6. Social Links */}
        <motion.div 
          custom={5} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="closing-footer-area"
        >
          <div className="closing-socials">
            <a href="https://github.com/lakshyapandagre-ux" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href="https://www.linkedin.com/in/lakshya-pandagre-937a3b328/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="mailto:lakshyapandagre@gmail.com" aria-label="Email"><EmailIcon /></a>
          </div>

          {/* 7. Footer Line */}
          <div className="closing-copyright">
            Designed & Built by Lakshya Pandagre
          </div>

          <div className="closing-system-log">
            // End of System Logs
          </div>
        </motion.div>
      </div>

      <style>{styles}</style>
    </section>
  );
}

const styles = `
  .closing-section {
    position: relative;
    padding: 180px 24px 80px;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .closing-background {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at bottom, rgba(0, 255, 136, 0.05) 0%, rgba(0, 102, 255, 0.03) 30%, transparent 70%);
    z-index: 0;
    transition: opacity 0.5s ease;
    opacity: 0.6;
  }
  .closing-section:hover .closing-background {
    opacity: 1;
  }

  .closing-container {
    position: relative;
    z-index: 1;
    max-width: 800px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .closing-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    background: linear-gradient(90deg, #A855F7, #0066FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 24px;
    font-weight: 600;
  }

  .closing-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 6vw, 56px);
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.15;
    margin: 0 0 24px;
    letter-spacing: -0.02em;
  }

  .closing-gradient {
    background: linear-gradient(135deg, #0066FF 0%, #A855F7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .closing-subtext {
    font-family: 'Inter', sans-serif;
    font-size: clamp(16px, 2vw, 18px);
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    max-width: 580px;
    margin: 0 auto 56px;
  }

  .closing-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 80px;
  }

  .closing-btn {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    padding: 14px 32px;
    border-radius: 99px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .closing-btn:active {
    transform: scale(0.96);
  }

  .closing-btn-primary {
    background: rgba(168, 85, 247, 0.15);
    color: #FFFFFF;
    border: 1px solid rgba(168, 85, 247, 0.4);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.1);
  }
  .closing-btn-primary:hover {
    background: rgba(168, 85, 247, 0.25);
    border-color: rgba(168, 85, 247, 0.6);
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.25);
    transform: translateY(-2px);
  }

  .closing-btn-secondary {
    background: rgba(255, 255, 255, 0.03);
    color: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  .closing-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
  }

  .closing-btn-outline {
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  .closing-btn-outline:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  .closing-status-block {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 24px 32px;
    border-radius: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 80px;
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
    backdrop-filter: blur(12px);
  }

  .closing-status-line {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .closing-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00FF88;
    box-shadow: 0 0 10px #00FF88;
    position: relative;
  }
  .closing-status-dot::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1px solid rgba(0, 255, 136, 0.5);
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  .closing-status-dot-dim {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
  }

  .closing-cursor {
    display: inline-block;
    width: 6px;
    height: 14px;
    background: #A855F7;
    margin-left: 8px;
    animation: blink 1s step-end infinite;
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes ping {
    75%, 100% { transform: scale(1.8); opacity: 0; }
  }

  .closing-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    margin-bottom: 40px;
  }

  .closing-footer-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
  }

  .closing-socials {
    display: flex;
    gap: 16px;
  }

  .closing-socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
  }

  .closing-socials a:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .closing-copyright {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
  }

  .closing-system-log {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.25);
    margin-top: -4px;
  }

  @media (max-width: 640px) {
    .closing-buttons {
      flex-direction: column;
      width: 100%;
    }
    .closing-btn {
      width: 100%;
      box-sizing: border-box;
    }
    .closing-status-block {
      width: 100%;
      box-sizing: border-box;
      font-size: 12px;
      padding: 20px;
    }
  }
`;
