import { useEffect, useState, memo } from 'react';

export type SkillBarProps = {
  label: string;
  percent: number;
  note?: string; // e.g. "→ Growing"
  delayMs?: number;
};

export const SkillBar = memo(({ label, percent, note, delayMs = 1000 }: SkillBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percent);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [percent, delayMs]);

  return (
    <div className="skill-bar-wrapper">
      <div className="skill-bar-label">{label}</div>
      <div className="skill-bar-track">
        <div 
          className="skill-bar-fill" 
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="skill-bar-percent">
        {percent}%
        {note && <span className="skill-bar-note"> {note}</span>}
      </div>
    </div>
  );
});

export default SkillBar;
