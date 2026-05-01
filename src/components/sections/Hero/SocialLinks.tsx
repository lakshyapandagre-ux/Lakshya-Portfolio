import React, { memo } from 'react';

export type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
  color?: string;
  borderColor?: string;
};

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks = memo(({ links }: SocialLinksProps) => {
  return (
    <div className="hero__social-group">
      <div className="hero__open-to-tag">
        <span className="hero__open-dot">◉</span>  Open to internships & freelance projects
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginTop: '24px',
      }}>
        {links.map((s, i) => (
          <a
            key={i}
            className="hero-social-link"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: '#9999B0',
            }}
          >
            {s.icon}
            <span style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '9px',
              letterSpacing: '0.06em',
              color: 'inherit',
            }}>
              {s.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
});

export default SocialLinks;
