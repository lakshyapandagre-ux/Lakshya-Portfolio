import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    id: 1,
    emoji: '💻',
    gradient: 'linear-gradient(135deg, #0a1628, #003399)',
    rotation: -3,
    marginTop: 16,
    title: 'Responsive Web Development',
    description:
      'Craft responsive websites that deliver consistent, high-quality user experiences across all devices, from desktops to mobile.',
  },
  {
    id: 2,
    emoji: '🎨',
    gradient: 'linear-gradient(135deg, #1a0528, #6600CC)',
    rotation: 2,
    marginTop: 0,
    title: 'UI/UX Design Implementation',
    description:
      'Turn design concepts into functional interfaces that prioritize usability and accessibility, enhancing the user experience on every page.',
  },
  {
    id: 3,
    emoji: '🛒',
    gradient: 'linear-gradient(135deg, #0a2818, #006633)',
    rotation: -2,
    marginTop: 24,
    title: 'E-commerce Solutions',
    description:
      'Build robust, scalable e-commerce platforms optimized for conversions, ensuring smooth shopping experiences and secure transactions.',
  },
  {
    id: 4,
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, #1a1000, #664400)',
    rotation: 3,
    marginTop: 8,
    title: 'Performance Optimization',
    description:
      'Enhance website speed and performance through efficient code and best practices, improving SEO rankings and reducing bounce rates.',
  },
  {
    id: 5,
    emoji: '✨',
    gradient: 'linear-gradient(135deg, #1a0a00, #8B2200)',
    rotation: -1.5,
    marginTop: 20,
    title: 'Interactive and Dynamic Features',
    description:
      'Develop interactive features using modern animations and dynamic content, engaging users and setting your site apart.',
  },
]

const HScrollProgress = ({
  sectionRef,
  cardsRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>
  cardsRef: React.RefObject<HTMLDivElement | null>
}) => {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fillRef.current || !sectionRef.current || !cardsRef.current) return
    const distance = cardsRef.current.scrollWidth - window.innerWidth + 160

    const ctx = gsap.context(() => {
      gsap.to(fillRef.current, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [sectionRef, cardsRef])

  return (
    <div
      style={{
        padding: '8px 24px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderTop: '0.5px solid rgba(255,255,255,0.04)',
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '8px',
          color: '#555568',
        }}
      >
        scroll progress
      </span>
      <div
        style={{
          flex: 1,
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={fillRef}
          style={{
            width: '0%',
            height: '100%',
            background: '#0066FF',
            borderRadius: '9999px',
          }}
        />
      </div>
    </div>
  )
}

const HorizontalScroll = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    if (isMobile) return // skip all GSAP on mobile

    const cards = cardsRef.current
    const section = sectionRef.current
    if (!cards || !section) return

    // Total horizontal distance = cards total width minus viewport width
    const getDistance = () => cards.scrollWidth - window.innerWidth + 160

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      {/* Label */}
      <div
        style={{
          padding: '16px 24px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '10px',
            background: '#0066FF',
            borderRadius: '1px',
          }}
        />
        <span
          style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '9px',
            color: '#555568',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          // scroll to explore
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'JetBrains Mono',
            fontSize: '8px',
            color: '#0066FF',
          }}
        >
          ← cards move left
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          padding: '16px 24px 32px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? 'auto' : '380px',
        }}
      >
        {/* BIG BG WORD */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Syne',
            fontWeight: 800,
            fontSize: 'clamp(80px, 16vw, 160px)',
            color: 'rgba(255,255,255,0.025)',
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          SERVICES
        </div>

        {/* CARDS — this div gets x-translated by GSAP */}
        <div
          ref={cardsRef}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '20px',
            width: isMobile ? '100%' : 'max-content',
            position: 'relative',
            zIndex: 1,
            paddingLeft: isMobile ? 0 : '40px',
            paddingRight: isMobile ? 0 : '160px',
          }}
        >
          {CARDS.map((card) => (
            <div
              key={card.id}
              style={{
                width: isMobile ? '100%' : '280px',
                flexShrink: 0,
                background: '#111118',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                overflow: 'hidden',
                transform: isMobile ? 'none' : `rotate(${card.rotation}deg)`,
                marginTop: isMobile ? 0 : `${card.marginTop}px`,
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: '160px',
                  background: card.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1, opacity: 0.7 }}>
                  {card.emoji}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '20px' }}>
                <h3
                  style={{
                    fontFamily: 'Syne',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#F0F0F5',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                    marginBottom: '10px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'DM Sans',
                    fontSize: '12px',
                    color: '#8888A0',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll progress bar */}
      {!isMobile && <HScrollProgress sectionRef={sectionRef} cardsRef={cardsRef} />}
    </section>
  )
}

export default HorizontalScroll
