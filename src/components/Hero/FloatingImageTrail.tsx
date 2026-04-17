import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FloatingImageTrail.css';

const IMAGES = [
  '/hover-images/hover1.jpg',
  '/hover-images/hover2.jpg',
  '/hover-images/hover3.jpg',
  '/hover-images/hover4.jpg',
  // '/hover-images/hover5.jpg',
  '/hover-images/hover6.jpg',
  '/hover-images/hover7.jpg',
  '/hover-images/hover8.jpg',
  '/hover-images/hover9.jpg',
  '/hover-images/hover10.jpg',
];
export default function FloatingImageTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastTime = 0;
    let imageIndex = 0;
    let lastX = 0;
    let lastY = 0;
    const minDistance = 60; // Spawn every 60px of movement
    const minTime = 80;     // At most every 80ms

    const handleMouseMove = (e: MouseEvent) => {
      // Only show trail when in Hero section (scrolled less than 1 viewport height)
      if (window.scrollY > window.innerHeight) return;

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

      const img = document.createElement('img');
      img.src = IMAGES[imageIndex];
      imgWrapper.appendChild(img);

      imageIndex = (imageIndex + 1) % IMAGES.length;

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
  }, []);

  return <div ref={containerRef} className="floating-trail-container" />;
}
