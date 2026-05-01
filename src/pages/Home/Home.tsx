import HeroSection from '../../components/sections/Hero/HeroSection';
import ProjectsSection from '../../components/sections/Projects/ProjectsSection';
import TechStackSection from '../../components/sections/TechStack/TechStack';
import AboutSection from '../../components/sections/About/About';
import InspirationSection from '../../components/sections/Inspiration/Inspiration';
import ConnectSection from '../../components/sections/Connect/ConnectSection';

export default function Home() {
  return (
    <main className="page-content">
      <HeroSection />
      <ProjectsSection />
      <TechStackSection />
      <AboutSection />
      <InspirationSection />
      <ConnectSection />
    </main>
  );
}
