import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from './components/layout/ScrollToTop';
import './styles/global.css';
import Navbar from './components/layout/Navbar/Navbar';
import Home from './pages/Home/Home';
import ClickSpark from './components/ui/ClickSpark';
import PortfolioAtmosphere from './components/effects/PortfolioAtmosphere';
import GlobalSpaceBg from './components/effects/GlobalSpaceBg';
import CometLayer from './components/effects/CometLayer';
import { useTheme } from './hooks/useTheme';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Work from './pages/Work/Work';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { SpotifyProvider } from './context/SpotifyContext';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <SpotifyProvider>
        <GlobalSpaceBg />
        <CometLayer />
        <PortfolioAtmosphere />
        <ClickSpark sparkColor='#fff' sparkSize={10} sparkRadius={20} sparkCount={8} duration={400}>
          <div className="relative z-[1] min-h-screen">
            <Navbar theme={theme} onToggleTheme={toggleTheme} />
            
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </ClickSpark>
      </SpotifyProvider>
    </ReactLenis>
  );
}
