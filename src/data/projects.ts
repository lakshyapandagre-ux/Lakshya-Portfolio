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
  images?: string[]
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
    videoUrl: '',
    images: [
      '/edu-connect.jpg.png',
      '/edu-connect2.jpg.png',
      '/edu-connect3.jpg.png',
      '/edu-connect4.jpg.png',
      '/edu-connect5.jpg.png',
      '/edu-connect6.jpg.png',
      '/edu-connect7.jpg.png',
      '/edu-connect8.jpg.png',
      '/edu-connect9.jpg.png'
    ],
    githubUrl: 'https://github.com/lakshyapandagre-ux/educonnect',
  },
  {
    id: 'resq',
    number: '02',
    name: 'ResQ',
    accentColor: '#FF3333',
    tagline: 'Smart civic issue reporting platform',
    description:
      'A smart civic platform for reporting and resolving city-level issues with real-time tracking, authority dashboards, and automated workflows.',
    features: [
      'Real-time issue tracking with live status updates',
      'Authority dashboard for managing complaints',
      'Location-based reporting with interactive maps',
    ],
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    caseStudyRoute: '/work/resq',
    liveUrl: 'https://res-q-team-mind-forge.vercel.app/',
    videoUrl: '',
    images: [
      '/res-q1.jpg.png',
      '/res-q2.jpg.png',
      '/res-q3.jpg.png',
      '/res-q4.jpg.png',
      '/res-q5.jpg.png',
      '/res-q6.jpg.png',
      '/res-q7.jpg.png',
      '/res-q8.jpg.png',
      '/res-q9.jpg.png'
    ],
    githubUrl: 'https://github.com/lakshyapandagre-ux/ResQ---Team-MindForge',
  },
  {
    id: 'audiosnap',
    number: '03',
    name: 'AudioSnap',
    accentColor: '#7C3AED',
    tagline: 'AI-powered audio intelligence tool',
    description:
      'Snap any audio — get instant transcription, speaker detection, and AI-powered summaries in seconds.',
    features: [
      'Real-time audio transcription with high accuracy',
      'Speaker diarization — detects who said what',
      'AI-generated summaries and key point extraction',
    ],
    tech: ['React', 'TypeScript', 'Python', 'FastAPI'],
    caseStudyRoute: '/work/audiosnap',
    liveUrl: 'https://audio-snap-muoe.vercel.app/',
    videoUrl: '',
    images: ['/audio-snap.jpg.png', '/audio-snp3.jpg.png', '/audio-snp4.jpg.png'],
    githubUrl: 'https://github.com/lakshyapandagre-ux/AudioSnap-.git',
  },
]
