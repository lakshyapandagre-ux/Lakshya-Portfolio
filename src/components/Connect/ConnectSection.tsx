import { useState } from 'react';
import { useGSAPScrollReveal } from '../../hooks/useGSAPScrollReveal';
import './Connect.css';

// ── Icons ──
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const ArrowRightUp = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
    </svg>
);

export default function ConnectSection() {
  const [cfName, setCfName] = useState('');
  const [cfEmail, setCfEmail] = useState('');
  const [cfMsg, setCfMsg] = useState('');
  const [cfStatus, setCfStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const containerRef = useGSAPScrollReveal<HTMLElement>({ stagger: 0.1 });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfName || !cfEmail || !cfMsg) return;
    setCfStatus('loading');
    setTimeout(() => {
      setCfStatus('success');
      setTimeout(() => {
        setCfStatus('idle');
        setCfName(''); setCfEmail(''); setCfMsg('');
      }, 3000);
    }, 1500);
  };

  return (
    <section ref={containerRef} className="new-connect-wrapper" id="connect">
      {/* ── Section 1: Hero Badge & Title ── */}
      <div className="new-connect-hero gsap-reveal">
        <div className="nc-badge-wrap">
          <div className="nc-line"></div>
          <span className="nc-badge-text">LET'S CONNECT</span>
          <div className="nc-line"></div>
        </div>

        <h1 className="nc-heading">
          Have an idea? Let's build <span className="nc-cursive">something great together.<br/></span>
        </h1>
        <p className="nc-subtitle">Whether it's a project, internship, freelance work, or just a chat — I'm always open to new opportunities.</p>
      </div>

      {/* ── 3 Column Box ── */}
      <div className="nc-box gsap-reveal">
        <div className="nc-box-content">
          
          {/* COL 1: Get in Touch */}
          <div className="nc-col nc-col-1">
            <div className="nc-title-wrap">
              <span className="nc-bar" style={{ backgroundColor: '#60a5fa' }}></span>
              <h3 className="nc-title">Get in Touch</h3>
            </div>
            <p className="nc-desc">Choose your preferred method to connect.</p>

            <div className="nc-social-list">
              <a href="mailto:lakshyapandagre@gmail.com" className="nc-social-card">
                <div className="nc-icon-box" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  <EmailIcon />
                </div>
                <div className="nc-social-info">
                  <span className="ncs-title">lakshyapandagre@gmail.com</span>
                  <span className="ncs-desc">Quick inquiries & questions</span>
                </div>
                <div className="nc-arrow"><ArrowRightUp /></div>
              </a>

              <a href="https://www.linkedin.com/in/lakshya-pandagre-937a3b328/" target="_blank" rel="noreferrer" className="nc-social-card">
                <div className="nc-icon-box" style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                  <LinkedInIcon />
                </div>
                <div className="nc-social-info">
                  <span className="ncs-title">lakshya-pandagre</span>
                  <span className="ncs-desc">Professional connect</span>
                </div>
                <div className="nc-arrow"><ArrowRightUp /></div>
              </a>

              <a href="https://github.com/lakshyapandagre-ux" target="_blank" rel="noreferrer" className="nc-social-card">
                <div className="nc-icon-box" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#e4e4e7' }}>
                  <GithubIcon />
                </div>
                <div className="nc-social-info">
                  <span className="ncs-title">lakshyapandagre-ux</span>
                  <span className="ncs-desc">Check my code</span>
                </div>
                <div className="nc-arrow"><ArrowRightUp /></div>
              </a>

              <a href="https://twitter.com/lakshyapandagre" target="_blank" rel="noreferrer" className="nc-social-card">
                <div className="nc-icon-box" style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' }}>
                  <TwitterIcon />
                </div>
                <div className="nc-social-info">
                  <span className="ncs-title">@Lakshya_ai</span>
                  <span className="ncs-desc">Follow for updates</span>
                </div>
                <div className="nc-arrow"><ArrowRightUp /></div>
              </a>

              <a href="https://instagram.com/lakshya.pandagre" target="_blank" rel="noreferrer" className="nc-social-card">
                <div className="nc-icon-box" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                  <InstagramIcon />
                </div>
                <div className="nc-social-info">
                  <span className="ncs-title">@lakshya.pandagre</span>
                  <span className="ncs-desc">Personal & creative</span>
                </div>
                <div className="nc-arrow"><ArrowRightUp /></div>
              </a>
            </div>
          </div>

          {/* COL 2: Quick Links */}
          <div className="nc-col nc-col-2">
            <div className="nc-title-wrap">
              <span className="nc-bar" style={{ backgroundColor: '#22c55e' }}></span>
              <h3 className="nc-title">Quick Links</h3>
            </div>
            
            <div className="nc-pill-grid">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="nc-pill">Home</button>
              <button onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="nc-pill">About</button>
              <button onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="nc-pill">Work</button>
              <button onClick={() => { document.getElementById('tech-stack')?.scrollIntoView({ behavior: 'smooth' }); }} className="nc-pill">Tech Stack</button>
              <button onClick={() => { document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' }); }} className="nc-pill">GuestBook</button>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="nc-pill">Resume ↓</a>
            </div>

            <div className="nc-spacer"></div>

            <div className="nc-afw-card">
              <div className="na-title"><span className="na-dot"></span> available_for_work()</div>
              <p className="na-desc">Response within 24 hours · Open to internships & freelance</p>
            </div>
          </div>

          {/* COL 3: Send Message (IDE Style) */}
          <div className="nc-col nc-col-3">
             <div className="nc-ide-bar">
                <div className="mac-dots">
                   <div className="mac-dot red"></div>
                   <div className="mac-dot yellow"></div>
                   <div className="mac-dot green"></div>
                </div>
                <div className="ide-tab">message.ts</div>
                <div className="ide-status">• unsaved</div>
             </div>
             
             <div className="nc-col-3-inner">
                <div className="nc-title-wrap">
                  <span className="nc-bar" style={{ backgroundColor: '#eab308' }}></span>
                  <h3 className="nc-title">Send a Message</h3>
                </div>
                <p className="nc-desc">Prefer to write? I'll get back within 24 hours.</p>

                <form className="nc-form" onSubmit={handleFormSubmit}>
                  <div className="nc-form-row">
                     <div className="nc-input-group">
                        <label className="nc-comment">// name</label>
                        <input className="nc-input" type="text" placeholder="Full Name" value={cfName} onChange={e => setCfName(e.target.value)} required />
                     </div>
                     <div className="nc-input-group">
                        <label className="nc-comment">// email</label>
                        <input className="nc-input" type="email" placeholder="your@email.com" value={cfEmail} onChange={e => setCfEmail(e.target.value)} required />
                     </div>
                  </div>
                  <div className="nc-input-group" style={{ marginTop: '4px' }}>
                     <label className="nc-comment">// message</label>
                     <textarea className="nc-input" placeholder="What's on your mind? Tell me about your project, idea, or just say hi..." rows={3} value={cfMsg} onChange={e => setCfMsg(e.target.value)} required></textarea>
                  </div>
                  
                  <button type="submit" className="nc-submit" disabled={cfStatus !== 'idle'}>
                     {cfStatus === 'loading' ? 'Sending...' : cfStatus === 'success' ? 'Message Sent!' : <>Send Message <ArrowRightUp /></>}
                  </button>

                  <div className="nc-form-footer">
                     <span className="nc-comment">// response within 24 hours · no spam, ever</span>
                  </div>
                </form>
             </div>
          </div>
        </div>

        {/* CONTAINER FOOTER */}
        <div className="nc-box-footer">
           <span className="nc-comment">// lakshya.dev</span>
           <span className="nc-comment">v1.0.0 · React + TypeScript</span>
        </div>
      </div>
    </section>
  );
}
