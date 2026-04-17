import { useMemo } from 'react';
import './Projects.css';

export default function ParticlesBackground() {
  // Generate 18 random dots on mount that stay constant across re-renders
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage x
      y: Math.random() * 100, // percentage y
      size: Math.random() * 2 + 1, // 1–3px
      duration: Math.random() * 3 + 2, // 2–5s pulse
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="projects__particles-bg">
      {particles.map((p) => (
        <div
          key={p.id}
          className="projects__particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
