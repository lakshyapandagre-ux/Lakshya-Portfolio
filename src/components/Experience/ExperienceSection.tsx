import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../data/projects'

/* ─────────────────────────────────────────────
   EXPERIENCE & ACHIEVEMENTS SECTION
   ───────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  })
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px 0px' })

  const sections = [
    {
      category: "EDUCATION",
      content: (
        <div className="exp-card">
          <h3 className="exp-card-title">Chameli Devi Group of Institutions (CDGI)</h3>
          <div className="exp-card-subtitle">
            B.Tech — Computer Science (CSIT) <span className="exp-sep">•</span> 2024 — Present
          </div>
          <p className="exp-card-desc">
            Pursuing B.Tech in CSIT, focused on software development, AI/ML basics, and building real-world projects.
          </p>
        </div>
      )
    },
    {
      category: "COLLEGE CLUBS",
      content: (
        <div className="exp-card">
          <div className="exp-sub-item">
            <h3 className="exp-card-title">GDGOC CDGI — Operations & Management</h3>
            <div className="exp-card-subtitle">Sep 2025 — Present · Indore</div>
          </div>
          <div className="exp-sub-item">
            <h3 className="exp-card-title">Echelon Dev Society — Operations & Logistics</h3>
            <div className="exp-card-subtitle">Sep 2025 — Present</div>
          </div>
          <div className="exp-sub-item-inline">
            <h3 className="exp-card-title">AIML Club</h3><span className="exp-inline-role">— Member</span>
          </div>
          <div className="exp-sub-item-inline">
            <h3 className="exp-card-title">Cracked Community</h3><span className="exp-inline-role">— Discord Moderator</span>
          </div>
          <p className="exp-card-desc" style={{ marginTop: '24px' }}>
            Actively contributing to college tech communities, organizing events, managing operations, and engaging in AI/ML discussions. Supporting members and maintaining active developer communities.
          </p>
        </div>
      )
    },
    {
      category: "HACKATHONS",
      content: (
        <div className="exp-card">
          <h3 className="exp-card-title">Hackathon Participant</h3>
          <p className="exp-card-desc" style={{ marginTop: '12px' }}>
            Participated in multiple hackathons, solving real-world problems, building prototypes, and collaborating in fast-paced environments.
          </p>
        </div>
      )
    },
    {
      category: "PROJECTS",
      content: (
        <div className="exp-card">
          <h3 className="exp-card-title">Real-World Projects</h3>
          <p className="exp-card-desc" style={{ marginTop: '12px' }}>
            Built full-stack and AI-based applications focusing on performance, usability, and scalability.
          </p>
          
          <div className="exp-projects-grid">
            {projects.map((proj, idx) => (
              <motion.div 
                key={proj.id} 
                className="exp-mini-project"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="exp-mini-project-header">
                  <h4 className="exp-mini-project-title" style={{ color: proj.accentColor }}>{proj.name}</h4>
                  <div className="exp-mini-project-links">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" aria-label="Live Demo">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      </a>
                    )}
                  </div>
                </div>
                <p className="exp-mini-project-desc">{proj.tagline}</p>
                <div className="exp-mini-project-tech">
                  {proj.tech.slice(0, 3).map(tech => (
                    <span key={tech} className="exp-tech-tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      category: "CERTIFICATIONS",
      content: (
        <div className="exp-certs-grid">
          <div className="exp-mini-cert">
            <div className="exp-cert-header">
              <h4 className="exp-mini-cert-title">Red Hat Linux (RH104)</h4>
              <div className="exp-mini-cert-issuer">Red Hat · Jan 2026</div>
            </div>
            <div className="exp-mini-cert-tags">
              <span className="exp-cert-label">Skills:</span> Linux, Red Hat Linux
            </div>
            <a href="https://www.credly.com/badges/" target="_blank" rel="noreferrer" className="exp-cert-btn">
              View Credential ↗
            </a>
          </div>

          <div className="exp-mini-cert">
            <div className="exp-cert-header">
              <h4 className="exp-mini-cert-title">Oracle AI Foundations Associate</h4>
              <div className="exp-mini-cert-issuer">Oracle · Nov 2025</div>
            </div>
            <div className="exp-mini-cert-tags">
              <span className="exp-cert-label">Skills:</span> AI/ML, Cloud
            </div>
            <a href="https://catalog-education.oracle.com/" target="_blank" rel="noreferrer" className="exp-cert-btn">
              View Credential ↗
            </a>
          </div>

          <div className="exp-mini-cert">
            <div className="exp-cert-header">
              <h4 className="exp-mini-cert-title">IBM Data Science</h4>
              <div className="exp-mini-cert-issuer">IBM · Nov 2025</div>
            </div>
            <div className="exp-mini-cert-tags">
              <span className="exp-cert-label">Skills:</span> Python, Data Analysis
            </div>
            <a href="https://www.coursera.org/account/" target="_blank" rel="noreferrer" className="exp-cert-btn">
              View Credential ↗
            </a>
          </div>

          <div className="exp-mini-cert">
            <div className="exp-cert-header">
              <h4 className="exp-mini-cert-title">Google AI/ML Certification</h4>
              <div className="exp-mini-cert-issuer">Google · Nov 2025</div>
            </div>
            <div className="exp-mini-cert-tags">
              <span className="exp-cert-label">Skills:</span> Machine Learning
            </div>
            <a href="https://www.skills.google/public_profiles/" target="_blank" rel="noreferrer" className="exp-cert-btn">
              View Credential ↗
            </a>
          </div>

          <div className="exp-mini-cert">
            <div className="exp-cert-header">
              <h4 className="exp-mini-cert-title">Git Training</h4>
              <div className="exp-mini-cert-issuer">IIT Bombay · Jan 2026</div>
            </div>
            <div className="exp-mini-cert-tags">
              <span className="exp-cert-label">Skills:</span> Git, Version Control
            </div>
            <div style={{ height: '34px' }} /> {/* Spacer since no button */}
          </div>

          <div className="exp-mini-cert">
            <div className="exp-cert-header">
              <h4 className="exp-mini-cert-title">Generative AI for All</h4>
              <div className="exp-mini-cert-issuer">PhysicsWallah x Microsoft · Jan 2026</div>
            </div>
            <div className="exp-mini-cert-tags">
              <span className="exp-cert-label">Skills:</span> Generative AI
            </div>
            <div style={{ height: '34px' }} /> {/* Spacer since no button */}
          </div>
        </div>
      )
    }
  ]

  const renderCategory = (text: string) => {
    const words = text.split(' ')
    const lastWord = words.pop()
    return (
      <>
        {words.join(' ')} {words.length > 0 ? ' ' : ''}
        <span className="exp-heading-accent">{lastWord}</span>
      </>
    )
  }

  return (
    <>
      <section ref={sectionRef} className="exp-section">
        <div className="exp-container">
          
          {/* Header */}
          <motion.div 
            className="exp-header"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
          >
            <span className="exp-label">THE JOURNEY</span>
            <h2 className="exp-title">
              Experience that Builds <span className="exp-gradient">Impact</span>
            </h2>
          </motion.div>

          {/* Timeline Layout */}
          <div className="exp-timeline-layout">
            <div className="exp-timeline-track" />

            <div className="exp-nodes">
              {sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  className="exp-node-group"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={idx + 1}
                >
                  <div className="exp-section-heading">
                    <span className="exp-heading-dash">—</span>{' '}
                    <span className="exp-heading-text">{renderCategory(section.category)}</span>
                  </div>

                  <div className="exp-node-item">
                    <div className="exp-node-graphics">
                      <motion.div 
                        className="exp-node-dot"
                        initial={{ boxShadow: '0 0 0px rgba(168, 85, 247, 0)', background: '#0a0a0f' }}
                        whileInView={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.7)', background: '#A855F7' }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <div className="exp-node-content">
                      {section.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <style>{styles}</style>
    </>
  )
}

/* ─────────────────────────────────────────────
   STYLES
   ───────────────────────────────────────────── */
const styles = `
  .exp-section {
    width: 100%;
    padding: 120px 0 160px;
    background: transparent;
  }

  .exp-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* Header */
  .exp-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .exp-label {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .exp-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.2;
    margin: 0;
  }

  .exp-gradient {
    background: linear-gradient(135deg, #0066FF 0%, #A855F7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Timeline Layout System */
  .exp-timeline-layout {
    position: relative;
    display: flex;
  }

  .exp-timeline-track {
    position: absolute;
    left: 11px; /* perfectly bisects the 12px dot residing in 24px container */
    top: 0;  
    bottom: 0;  /* extends perfectly through the layout flow */
    width: 2px;
    background: linear-gradient(to bottom, #0066FF 0%, #A855F7 100%);
    box-shadow: 0 0 15px rgba(0, 102, 255, 0.5), 0 0 15px rgba(168, 85, 247, 0.5);
    opacity: 0.8;
    z-index: 0;
  }

  .exp-nodes {
    display: flex;
    flex-direction: column;
    gap: 64px; 
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .exp-node-group {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Space between heading and card */
  }

  /* Section Headings outside cards */
  .exp-section-heading {
    margin-left: 56px; /* align with card content (24px graphics + 32px gap) */
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .exp-heading-dash {
    color: #A855F7; /* subtle gradient accent or solid color */
    font-weight: 400;
  }

  .exp-heading-accent {
    background: linear-gradient(135deg, #ffffff 0%, #A855F7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .exp-node-item {
    display: flex;
    gap: 32px;
  }

  .exp-node-graphics {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 36px; /* vertically positions dot parallel to card title */
    width: 24px;
    flex-shrink: 0;
  }

  .exp-node-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #A855F7;
    position: relative;
    z-index: 2;
  }

  .exp-node-content {
    flex-grow: 1;
  }

  /* Core Card Layout */
  .exp-card {
    background: rgba(255, 255, 255, 0.015);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 32px 40px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .exp-card:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.025);
    box-shadow: 0 10px 30px -10px rgba(168, 85, 247, 0.15); /* Hover slight lift + glow */
  }

  .exp-card-category {
    display: none;
  }

  .exp-card-title {
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #FFFFFF;
    margin: 0 0 6px;
    line-height: 1.3;
  }

  .exp-inline-role {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.65);
  }

  .exp-sub-item-inline {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 8px;
  }

  .exp-sub-item-inline .exp-card-title {
    margin: 0;
  }

  .exp-sub-item {
    margin-bottom: 24px;
  }

  .exp-card-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .exp-sub-item .exp-card-subtitle {
    margin-bottom: 0px; 
  }

  .exp-sep {
    color: rgba(255, 255, 255, 0.2);
  }

  .exp-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.65);
    margin: 0;
  }

  /* Projects Integration Layout */
  .exp-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .exp-mini-project {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
  }

  .exp-mini-project:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .exp-mini-project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }

  .exp-mini-project-title {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }

  .exp-mini-project-links {
    display: flex;
    gap: 12px;
  }

  .exp-mini-project-links a {
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.2s;
  }

  .exp-mini-project-links a:hover {
    color: #FFFFFF;
  }

  .exp-mini-project-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
    margin: 0 0 16px 0;
  }

  .exp-mini-project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .exp-tech-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    color: rgba(255, 255, 255, 0.7);
  }

  /* Certifications Mini Cards System */
  .exp-certs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .exp-mini-cert {
    background: rgba(255, 255, 255, 0.015);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 28px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .exp-mini-cert:hover {
    transform: scale(1.02);
    border-color: rgba(168, 85, 247, 0.4);
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.1);
    background: rgba(255, 255, 255, 0.03);
  }

  .exp-cert-header {
    margin-bottom: 20px;
  }

  .exp-mini-cert-title {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #FFFFFF;
    margin: 0 0 6px;
    line-height: 1.3;
  }

  .exp-mini-cert-issuer {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  .exp-mini-cert-tags {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 24px;
  }
  
  .exp-cert-label {
    color: #A855F7;
    margin-right: 4px;
    font-weight: 500;
  }

  .exp-cert-btn {
    align-self: flex-start;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    padding: 8px 18px;
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .exp-cert-btn:hover {
    background: linear-gradient(135deg, rgba(0, 102, 255, 0.1), rgba(168, 85, 247, 0.1));
    border-color: rgba(168, 85, 247, 0.5);
    box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
    color: #FFFFFF;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .exp-node-item {
      gap: 16px;
    }
    .exp-card {
      padding: 24px;
    }
    .exp-node-graphics {
      width: 20px;
      padding-top: 24px;
    }
    .exp-timeline-track {
      left: 9px;
    }
    .exp-section-heading {
      margin-left: 36px;
      font-size: 16px;
    }
    .exp-projects-grid, .exp-certs-grid {
      grid-template-columns: 1fr;
    }
  }
`
