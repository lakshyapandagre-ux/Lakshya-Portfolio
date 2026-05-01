import { type ReactNode } from 'react';
import './Projects.css';

interface ProjectsGridProps {
  children: ReactNode;
}

export default function ProjectsGrid({ children }: ProjectsGridProps) {
  return (
    <div className="projects__grid">
      {children}
    </div>
  );
}
