export interface ProjectPreview {
  type: 'browser-mockup' | 'placeholder' | 'waveform';
  bgColor: string;
  gridColor: string;
  displayTitle: string;
}

export interface Project {
  id: number;
  number: string; // '01', '02', '03'
  title: string;
  category?: string;
  description: string;
  longDescription?: string;
  bullets?: string[];
  tags: string[];
  codeUrl?: string;
  liveUrl?: string | null;
  gradientBg?: string;
  preview: ProjectPreview;
  featured?: boolean;
  isPlaceholder?: boolean;
  accentColor?: string;
  status?: 'deployed' | 'building';
}
