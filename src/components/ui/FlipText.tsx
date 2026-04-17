import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

interface FlipTextProps {
  children: string;
  className?: string;
  inView?: boolean;
}

export default function FlipText({ children, className = '', inView = false }: FlipTextProps) {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (inView && !hasPlayed) setHasPlayed(true);
  }, [inView, hasPlayed]);

  const letters = useMemo(() => Array.from(children), [children]);

  return (
    <h2 className={`flip-text ${className}`}>
      {letters.map((letter, index) => {
        const isSpace = letter === ' ';
        return (
          <motion.span
            key={`${letter}-${index}`}
            className={`flip-text__char${isSpace ? ' is-space' : ''}`}
            initial={{ opacity: 0, rotateX: -90, y: 14 }}
            animate={{
              opacity: hasPlayed || isSpace ? 1 : 0,
              rotateX: hasPlayed || isSpace ? 0 : -90,
              y: hasPlayed || isSpace ? 0 : 14,
            }}
            transition={{
              duration: 0.46,
              ease: 'easeInOut',
              delay: hasPlayed && !isSpace ? index * 0.03 : 0,
            }}
          >
            {isSpace ? '\u00A0' : letter}
          </motion.span>
        );
      })}
    </h2>
  );
}
