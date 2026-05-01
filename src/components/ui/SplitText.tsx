import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  tag?: React.ElementType;
  className?: string;
  delay?: number; // ms 
  duration?: number;
  ease?: string;
  splitType?: 'words' | 'chars';
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
}

export function SplitText({
  text,
  tag: Tag = 'div',
  className = '',
  delay = 0,
  duration = 1.0,
  ease = 'power3.out',
  splitType = 'words',
  from = { opacity: 0, y: 50 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'left'
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.split-element');
      
      gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top ${100 - (threshold * 100)}%`,
            toggleActions: "play none none none",
            // Since there is rootMargin in intersection APIs, roughly map it via start bounds or custom markers.
          },
          delay: delay / 1000,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [text, duration, ease, from, to, threshold, delay, splitType, rootMargin]);

  const splitContent = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, index) => (
        <span 
          key={index} 
          className="split-element split-char" 
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    } else {
      return text.split(' ').map((word, index) => (
        <span 
          key={index} 
          className="split-element split-word"
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </span>
      ));
    }
  };

  return (
    <Tag 
      ref={containerRef} 
      className={`split-parent ${className}`} 
      style={{ textAlign: textAlign as any }}
    >
      {splitContent()}
    </Tag>
  );
}
