import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface SpotifyTrack {
  song: string;
  artist: string;
  coverUrl?: string;
  duration?: string;
  songUrl?: string;
}

interface SpotifyContextType {
  isPlaying: boolean;
  progress: number;
  elapsed: string;
  totalDuration: string;
  togglePlay: () => void;
  seek: (pct: number) => void;
  track: SpotifyTrack;
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const DEFAULT_TRACK: SpotifyTrack = {
  song: "Tum Prem Ho",
  artist: "Mohit Lalwani",
  coverUrl: "/tum-prem-ho-cover.jpg.png",
  songUrl: "/tum-prem-ho.mp3.mp3",
  duration: "3:42"
};

export const SpotifyProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState(DEFAULT_TRACK.duration || '0:00');

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(DEFAULT_TRACK.songUrl);
      audioRef.current.preload = "metadata";
    }

    const audio = audioRef.current;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setElapsed(formatTime(audio.currentTime));
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setTotalDuration(formatTime(audio.duration));
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setElapsed('0:00');
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (pct: number) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    audio.currentTime = pct * audio.duration;
  };

  return (
    <SpotifyContext.Provider value={{
      isPlaying,
      progress,
      elapsed,
      totalDuration,
      togglePlay,
      seek,
      track: DEFAULT_TRACK
    }}>
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error('useSpotify must be used within a SpotifyProvider');
  }
  return context;
};
