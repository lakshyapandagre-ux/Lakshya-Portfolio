import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

interface VideoFrameProps {
  videoUrl?: string
  images?: string[]
  projectName: string
  accentColor: string
}

const VideoFrame = ({ videoUrl, images, projectName, accentColor }: VideoFrameProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)

  // Slideshow logic
  useEffect(() => {
    if (!images || images.length === 0 || !isInView) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 1500) // 1.5 seconds per frame for a video-like feel

    return () => clearInterval(interval)
  }, [images, isInView])

  // Motion values for 3D tilt & spotlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const normX = useMotionValue(0)
  const normY = useMotionValue(0)

  // Springs for smooth physics
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const rotateX = useSpring(useTransform(normY, [-0.5, 0.5], [4, -4]), springConfig)
  const rotateY = useSpring(useTransform(normX, [-0.5, 0.5], [-4, 4]), springConfig)

  // Spotlight template
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${accentColor}1A, transparent 40%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
    normX.set((e.clientX - rect.left) / rect.width - 0.5)
    normY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    normX.set(0)
    normY.set(0)
  }

  // Intersection Observer — autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => { })
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0.4 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        perspective: 1200
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative'
        }}
      >
        {/* Outer glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '18px',
            background: `linear-gradient(135deg, ${accentColor}30, transparent, ${accentColor}15)`,
            zIndex: 0,
            transform: 'translateZ(-10px)'
          }}
        />

        {/* Browser window frame */}
        <motion.div
          whileHover="hover"
          style={{
            background: '#0D1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}15`,
            transition: 'box-shadow 0.3s ease'
          }}
        >
          {/* Spotlight Glow Effect inside container */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 20,
              background
            }}
          />
          {/* Browser tab bar */}
          <div
            style={{
              background: '#161B22',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />

            {/* Fake URL bar */}
            <div
              style={{
                marginLeft: '12px',
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '6px',
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#00FF88',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '10px',
                  color: '#555568',
                }}
              >
                {projectName.toLowerCase()}.vercel.app
              </span>
            </div>
          </div>

          {/* Video area */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              background: '#080808',
              overflow: 'hidden',
            }}
          >
            {/* Subtle gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5))', pointerEvents: 'none', zIndex: 1 }} />

            {/* Shimmer sweep */}
            <motion.div
              variants={{
                hover: { x: '200%', opacity: 0.15, transition: { duration: 1.2, ease: 'easeInOut' } },
                initial: { x: '-100%', opacity: 0 }
              }}
              initial="initial"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)',
                transform: 'skewX(-20deg)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />

            {images && images.length > 0 ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                {images.map((img, idx) => (
                  <motion.img
                    key={img}
                    src={img}
                    alt={`${projectName} screenshot ${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: idx === currentImageIndex ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    onLoad={() => idx === 0 && setIsLoaded(true)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ))}
              </div>
            ) : (
              <motion.video
                variants={{
                  hover: { scale: 1.03, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                onLoadedData={() => setIsLoaded(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              >
                <source src={videoUrl} type="video/mp4" />
              </motion.video>
            )}

            {/* Fallback — shows while video loads */}
            {!isLoaded && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, #0a0a0f, ${accentColor}10)`,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Syne',
                    fontWeight: 800,
                    fontSize: '32px',
                    color: 'rgba(255,255,255,0.1)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {projectName}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default VideoFrame
