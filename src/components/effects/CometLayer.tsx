import { useEffect, useRef } from 'react'

interface Comet {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  maxOpacity: number
  width: number
  state: 'fadein' | 'active' | 'fadeout' | 'dead'
  fadeSpeed: number
}

const CometLayer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnComet = (): Comet => {
      const isMobile = window.innerWidth < 768
      const lengthMultiplier = isMobile ? 0.6 : 1
      const speedMultiplier = isMobile ? 0.7 : 1

      const fromTop = Math.random() > 0.5
      const x = fromTop
        ? Math.random() * canvas.width
        : Math.random() * (canvas.width * 0.3)
      const y = fromTop
        ? Math.random() * (canvas.height * 0.3)
        : Math.random() * canvas.height

      const angleDeg = 25 + Math.random() * 20
      const angle = (angleDeg * Math.PI) / 180

      return {
        x,
        y,
        length: (80 + Math.random() * 100) * lengthMultiplier,
        speed: (3 + Math.random() * 3) * speedMultiplier,
        angle,
        opacity: 0,
        maxOpacity: 0.3 + Math.random() * 0.3,
        width: 1 + Math.random(),
        state: 'fadein',
        fadeSpeed: 0.01 + Math.random() * 0.02,
      }
    }

    const drawComet = (comet: Comet) => {
      const tailX = comet.x - Math.cos(comet.angle) * comet.length
      const tailY = comet.y - Math.sin(comet.angle) * comet.length

      const gradient = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y)
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
      gradient.addColorStop(0.6, `rgba(200, 180, 255, ${comet.opacity * 0.3})`)
      gradient.addColorStop(1, `rgba(255, 255, 255, ${comet.opacity})`)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(comet.x, comet.y)
      ctx.strokeStyle = gradient
      ctx.lineWidth = comet.width
      ctx.lineCap = 'round'
      ctx.stroke()

      const headGlow = ctx.createRadialGradient(
        comet.x, comet.y, 0,
        comet.x, comet.y, comet.width * 3
      )
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`)
      headGlow.addColorStop(1, `rgba(180, 150, 255, 0)`)

      ctx.beginPath()
      ctx.arc(comet.x, comet.y, comet.width * 3, 0, Math.PI * 2)
      ctx.fillStyle = headGlow
      ctx.fill()
    }

    let comets: Comet[] = []
    let animFrameId: number
    let lastSpawnTime = 0
    let nextSpawnDelay = 2000 + Math.random() * 4000

    // Staggered initial spawns
    const t0 = setTimeout(() => comets.push(spawnComet()), 0)
    const t1 = setTimeout(() => comets.push(spawnComet()), 1500 + Math.random() * 1000)
    const t2 = setTimeout(() => comets.push(spawnComet()), 3500 + Math.random() * 1500)

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isMobile = window.innerWidth < 768
      const maxComets = isMobile ? 2 : 3

      // Update state and draw each comet
      for (const comet of comets) {
        // Move
        comet.x += Math.cos(comet.angle) * comet.speed
        comet.y += Math.sin(comet.angle) * comet.speed

        // Update opacity/state
        if (comet.state === 'fadein') {
          comet.opacity += comet.fadeSpeed
          if (comet.opacity >= comet.maxOpacity) {
            comet.opacity = comet.maxOpacity
            comet.state = 'active'
          }
        } else if (comet.state === 'active') {
          const offscreen =
            comet.x > canvas.width + 50 ||
            comet.y > canvas.height + 50
          if (offscreen) comet.state = 'fadeout'
        } else if (comet.state === 'fadeout') {
          comet.opacity -= comet.fadeSpeed * 2
          if (comet.opacity <= 0) comet.state = 'dead'
        }

        if (comet.state !== 'dead') {
          drawComet(comet)
        }
      }

      // Remove dead comets
      comets = comets.filter(c => c.state !== 'dead')

      // Spawn new comet if under limit and delay has passed
      if (
        comets.length < maxComets &&
        timestamp - lastSpawnTime > nextSpawnDelay
      ) {
        comets.push(spawnComet())
        lastSpawnTime = timestamp
        nextSpawnDelay = 2000 + Math.random() * 4000
      }

      animFrameId = requestAnimationFrame(animate)
    }

    animFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameId)
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

export default CometLayer
