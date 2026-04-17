import type { TypewriterLine } from '../hooks/useTypewriter'

export interface Project {
  id: string
  number: string
  name: string
  accentColor: string
  tagline: string
  description: string
  features: string[]
  tech: string[]
  caseStudyRoute: string
  liveUrl: string
  videoUrl: string
  githubUrl?: string
}

/** Work hero card — philosophy / mindset (typewriter, line-by-line) */
export const mindsetLines: TypewriterLine[] = [
  { text: 'const mindset = {', indent: 0, type: 'normal' },
  {
    text: '  belief: "Great products are built with clarity, not complexity.",',
    indent: 12,
    type: 'key-value',
  },
  {
    text: '  focus: "Solve real problems, not just write code.",',
    indent: 12,
    type: 'key-value',
  },
  {
    text: '  approach: "Think → Design → Build → Refine",',
    indent: 12,
    type: 'key-value',
  },
  {
    text: '  principle: "Every detail matters."',
    indent: 12,
    type: 'key-value',
  },
  { text: '}', indent: 0, type: 'normal' },
]

export const projects: Project[] = [
  {
    id: 'educonnect',
    number: '01',
    name: 'EduConnect',
    accentColor: '#0066FF',
    tagline: 'Collaborative learning platform',
    description:
      'A collaborative education platform for live classes, scheduling, and progress tracking.',
    features: [
      'Real-time collaboration',
      'Live class scheduling',
      'Progress tracking dashboard',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Supabase'],
    caseStudyRoute: '/work/educonnect',
    liveUrl: 'https://example.com',
    videoUrl: '/videos/educonnect.mp4',
    githubUrl: 'https://github.com/lakshyapandagre-ux/educonnect',
  },
  {
    id: 'portfolio',
    number: '02',
    name: 'Portfolio OS',
    accentColor: '#00FF88',
    tagline: 'Interactive developer portfolio',
    description:
      'A cinematic portfolio experience with 3D scenes, smooth scroll, and case studies.',
    features: ['3D hero scene', 'Lenis smooth scroll', 'Case study routes'],
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    caseStudyRoute: '/work/portfolio',
    liveUrl: 'https://lakshya.dev',
    videoUrl: '/videos/portfolio.mp4',
    githubUrl: 'https://github.com/lakshyapandagre-ux/portfolio',
  },
]
