import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Step 1: Reset Lenis internal scroll state
    lenis.scrollTo(0, { immediate: true, force: true });

    // Step 2: Reset native browser scroll (all fallbacks)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Step 3: Refresh ScrollTrigger after 1 frame so new page DOM is ready
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;
