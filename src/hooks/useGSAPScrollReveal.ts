import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  yOffset?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

export function useGSAPScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const {
    yOffset = 40,
    duration = 0.8,
    stagger = 0,
    delay = 0,
    once = true,
  } = options;

  const containerRef = useRef<T>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // By default act on either the container itself, or its direct GSAP elements 
    // if using stagger (like a list of items with the class 'gsap-reveal')
    const elements = containerRef.current.querySelectorAll('.gsap-reveal');
    const targets = elements.length > 0 ? Array.from(elements) : containerRef.current;

    gsap.fromTo(
      targets,
      {
        opacity: 0,
        y: yOffset,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        stagger: stagger,
        willChange: 'opacity, transform',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: once,
        },
      }
    );
  }, { scope: containerRef });

  return containerRef;
}
