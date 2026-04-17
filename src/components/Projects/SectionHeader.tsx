import { useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { useInView } from '../../hooks/useInView';
import { SplitText } from '../SplitText';
import FlipText from '../ui/FlipText';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import './Projects.css';

interface SectionHeaderProps {
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
}

export default function SectionHeader({ scrollTargetRef }: SectionHeaderProps) {
  const _scrollTargetRef = scrollTargetRef ?? { current: null };
  const { ref: inViewLabelRef, inView } = useInView(0.15);
  const [isMobile, setIsMobile] = useState(false);
  const magneticRef = useMagneticHover(0.2);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: _scrollTargetRef,
    offset: ['start end', 'start 0.25'],
  });

  const x = useTransform(scrollYProgress, [0, 1], isMobile ? ['0px', '0px'] : ['0px', '-120px']);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.7, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const paddingLeft = isMobile ? '24px' : 'clamp(60px, 8vw, 120px)';
  const paddingRight = isMobile ? '24px' : undefined;

  return (
    <div
      ref={inViewLabelRef}
      className="projects__header-block"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        textAlign: isMobile ? 'center' : 'left',
        marginBottom: '40px',
        position: 'relative',
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
      }}
    >
      <motion.div
        style={{
          x,
          opacity,
          scale,
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '100%',
          textAlign: isMobile ? 'center' : 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#d8d8e4ff',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textAlign: isMobile ? 'center' : 'left',
            marginBottom: '16px',
          }}
        >
          · SELECTED WORKS ·
        </div>

        <FlipText className="featured-heading" inView={inView}>
          Featured Projects
        </FlipText>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '60px' }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, #0066FF, transparent)',
            borderRadius: '9999px',
            margin: '10px 0',
            alignSelf: isMobile ? 'center' : 'flex-start',
          }}
        />

        <SplitText
          text="A selection of my recent works"
          tag="p"
          className="featured-subtitle"
          delay={30}
          duration={0.8}
          ease="power2.out"
          splitType="words"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="-80px"
          textAlign={isMobile ? 'center' : 'left'}
        />

        <div ref={magneticRef as React.RefObject<HTMLDivElement>} style={{ display: 'inline-flex' }}>
          <a
            href="https://github.com/lakshyapandagre-ux?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="projects__see-all-btn"
          >
            <span className="pulse-dot" />
            See All
            <span className="arrow">→</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
