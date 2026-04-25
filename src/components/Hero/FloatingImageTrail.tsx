import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FloatingImageTrail.css';

const DEFAULT_IMAGES = [
  '/hover-images/hover1.jpg',
  '/hover-images/hover2.jpg',
  '/hover-images/hover3.jpg',
  '/hover-images/hover4.jpg',
  '/hover-images/hover5.jpg',
  '/hover-images/hover6.jpg',
  '/hover-images/hover7.jpg',
  '/hover-images/hover8.jpg',
  '/hover-images/hover9.jpg',
  '/hover-images/hover10.jpg',
  '/hover-images/hover11.jpg',
  '/hover-images/hover12.jpg',
  '/hover-images/hover13.jpg',
];

interface FloatingImageTrailProps {
  images?: string[];
  minDistance?: number;
}

export default function FloatingImageTrail({ 
  images = DEFAULT_IMAGES, 
  minDistance: propMinDistance 
}: FloatingImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastTime = 0;
    let imageIndex = 0;
    let lastX = 0;
    let lastY = 0;
    
    // Use prop minDistance or default to 60
    const minDistance = propMinDistance || 60; 
    const minTime = 80;     // At most every 80ms

    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is over the container's parent section
      if (!containerRef.current?.parentElement) return;
      const rect = containerRef.current.parentElement.getBoundingClientRect();
      
      const isOverSection = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (!isOverSection) return;

      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (now - lastTime > minTime && distance > minDistance) {
        lastTime = now;
        lastX = e.clientX;
        lastY = e.clientY;
        spawnImage(e.clientX, e.clientY);
      }
    };

    const spawnImage = (x: number, y: number) => {
      if (!containerRef.current) return;

      // Ensure we don't exceed the image limit
      if (containerRef.current.children.length > 6) {
        const oldest = containerRef.current.firstChild as HTMLElement;
        if (oldest) {
          gsap.killTweensOf(oldest);
          oldest.remove();
        }
      }

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'floating-trail-card';

      const imgPath = images[imageIndex];
      imageIndex = (imageIndex + 1) % images.length;

      const img = document.createElement('img');
      img.src = imgPath;
      imgWrapper.appendChild(img);

      containerRef.current.appendChild(imgWrapper);

      // Randomize starting variations for organic feel
      const rotation = gsap.utils.random(-8, 8);
      const offsetX = gsap.utils.random(-15, 15);
      const offsetY = gsap.utils.random(-15, 15);

      // Image dims are approx 160x220 -> centered Offset is -80, -110
      const startX = x - 80 + offsetX;
      const startY = y - 110 + offsetY + 40; // Start slightly lower

      // Set initial state
      gsap.set(imgWrapper, {
        x: startX,
        y: startY,
        scale: 0.5,
        opacity: 0,
        rotation: rotation - 8,
      });

      // 1. Continuous float upwards and rotation drift
      gsap.to(imgWrapper, {
        y: startY - 140, // Move up by 140px total across lifespan
        rotation: rotation + gsap.utils.random(-15, 15),
        duration: 2.5,
        ease: 'power1.out',
      });

      // 2. Entry Scale & Opacity Pop
      gsap.to(imgWrapper, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.5)',
        onComplete: () => {
          // 3. Exit Animation
          gsap.to(imgWrapper, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'power2.inOut',
            delay: 0.5, // Hold fully visible briefly
            onComplete: () => {
              if (imgWrapper.parentNode) {
                gsap.killTweensOf(imgWrapper);
                imgWrapper.remove();
              }
            },
          });
        },
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [images, propMinDistance]);

  return <div ref={containerRef} className="floating-trail-container" />;
}
