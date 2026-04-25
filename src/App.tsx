import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from './components/ScrollToTop';
import './styles/global.css';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import AboutSection from './components/About/About';
import ProjectsSection from './components/Projects/ProjectsSection';
import TechStackSection from './components/TechStack/TechStack';
import InspirationSection from './components/Inspiration/Inspiration';
import ConnectSection from './components/Connect/ConnectSection';
import ClickSpark from './components/ui/ClickSpark';
import PortfolioAtmosphere from './components/portfolio/PortfolioAtmosphere';
import GlobalSpaceBg from './components/GlobalSpaceBg';
import CometLayer from './components/CometLayer';
import { useTheme } from './hooks/useTheme';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Work from './pages/Work';
import Lakshya from './pages/Lakshya';
import Contact from './pages/Contact';
import { SpotifyProvider } from './context/SpotifyContext';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  console.log("App.tsx: Rendering App component...");
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
              <Route path="/" element={
                <main className="page-content">
                  <HeroSection />
                  <ProjectsSection />
                  <TechStackSection />
                  <AboutSection />
                  <InspirationSection />
                  <ConnectSection />
                </main>
              } />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<Lakshya />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </ClickSpark>
      </SpotifyProvider>
    </ReactLenis>
  );
}
