import { useEffect, useRef, memo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobalSpaceBg.css';

gsap.registerPlugin(ScrollTrigger);

// ── Types ────────────────────────────────────────────────────
interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
  color: string;
}

interface Comet {
  x: number;
  y: number;
  angle: number;
  speed: number;
  tailLength: number;
  width: number;
  life: number;
  decayRate: number;
  active: boolean;
}

// ── Helpers ──────────────────────────────────────────────────
function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickColor(): string {
  const r = Math.random();
  if (r < 0.80) return '255,255,255';
  if (r < 0.92) return '200,220,255';
  return '180,255,220';
}

function pickSize(): number {
  const r = Math.random();
  if (r < 0.50) return rand(0.4, 0.8);
  if (r < 0.85) return rand(0.9, 1.6);
  return rand(1.7, 2.8);
}

// ── Star generation with clustering ──────────────────────────
function generateStars(w: number, h: number, count: number): Star[] {
  const COLS = 8;
  const ROWS = 6;
  const cellW = w / COLS;
  const cellH = h / ROWS;

  const densityMap: number[] = [];
  let totalWeight = 0;
  for (let i = 0; i < COLS * ROWS; i++) {
    const r = Math.random();
    let weight: number;
    if (r < 0.30) weight = 0;
    else if (r < 0.45) weight = 2.5;
    else weight = 0.7 + Math.random() * 0.6;
    densityMap.push(weight);
    totalWeight += weight;
  }

  if (totalWeight === 0) {
    // Fallback: ensure at least some zones have stars
    densityMap[0] = 1;
    densityMap[Math.floor(COLS * ROWS / 2)] = 1;
    totalWeight = 2;
  }

  const stars: Star[] = [];
  for (let i = 0; i < COLS * ROWS; i++) {
    if (densityMap[i] === 0) continue;
    const zoneCount = Math.round((densityMap[i] / totalWeight) * count);
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const zoneX = col * cellW;
    const zoneY = row * cellH;

    for (let j = 0; j < zoneCount; j++) {
      stars.push({
        x: zoneX + Math.random() * cellW,
        y: zoneY + Math.random() * cellH,
        size: pickSize(),
        baseOpacity: rand(0.2, 0.9),
        twinkleSpeed: rand(0.0006, 0.003),
        twinkleOffset: rand(0, Math.PI * 2),
        depth: rand(0.1, 1.0),
        color: pickColor(),
      });
    }
  }
  return stars;
}

// ── Comet spawner ────────────────────────────────────────────
function spawnComet(w: number, h: number): Comet {
  const isMicro = Math.random() < 0.4;
  if (isMicro) {
    return {
      x: w * rand(0.6, 1.0),
      y: h * rand(0, 0.3),
      angle: rand(195, 240) * (Math.PI / 180),
      speed: rand(8, 14),
      tailLength: rand(25, 50),
      width: 0.5,
      life: 1.0,
      decayRate: rand(0.018, 0.028),
      active: true,
    };
  }
  return {
    x: w * rand(0.6, 1.0),
    y: h * rand(0, 0.3),
    angle: rand(195, 240) * (Math.PI / 180),
    speed: rand(5, 9),
    tailLength: rand(60, 130),
    width: rand(0.8, 1.6),
    life: 1.0,
    decayRate: rand(0.014, 0.022),
    active: true,
  };
}

// ── Component ────────────────────────────────────────────────
const GlobalSpaceBg = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const starsRef = useRef<Star[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const cometTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useGSAP(() => {
    gsap.to('.global-space-bg__canvas', {
      y: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });
  }, { scope: containerRef });

  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const lerpMouseRef = useRef({ x: 0.5, y: 0.5 });
  const mousePendingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let vw = 0;
    let vh = 0;
    const isLowPower = (navigator.hardwareConcurrency ?? 4) <= 2;
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

    // ── Resize ───────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      let count = 280;
      if (isMobile) count = 130;
      if (isLowPower) count = 80;
      starsRef.current = generateStars(vw, vh, count);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    // ── Mouse (throttled via rAF flag) ───────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      if (mousePendingRef.current) return;
      mousePendingRef.current = true;
      requestAnimationFrame(() => {
        targetMouseRef.current.x = e.clientX / window.innerWidth;
        targetMouseRef.current.y = e.clientY / window.innerHeight;
        mousePendingRef.current = false;
      });
    };

    if (!isMobile) {
      document.addEventListener('mousemove', onMouseMove, { passive: true });
    }

    // ── Comet scheduler ──────────────────────────────────────
    const maxComets = isLowPower ? 1 : 3;

    const scheduleComet = () => {
      const delay = cometsRef.current.length === 0
        ? 2000
        : rand(2500, 7000);

      cometTimerRef.current = setTimeout(() => {
        const active = cometsRef.current.filter(c => c.active);
        if (active.length < maxComets) {
          cometsRef.current.push(spawnComet(vw, vh));
        }
        scheduleComet();
      }, delay);
    };

    scheduleComet();

    // ── Render loop ──────────────────────────────────────────
    const draw = () => {
      if (!ctx) return;
      const now = performance.now();
      ctx.clearRect(0, 0, vw, vh);

      // Smooth mouse lerp
      const lm = lerpMouseRef.current;
      const tm = targetMouseRef.current;
      lm.x += (tm.x - lm.x) * 0.035;
      lm.y += (tm.y - lm.y) * 0.035;

      // ── Stars ──────────────────────────────────────────────
      const stars = starsRef.current;
      const doParallax = !isMobile && !isLowPower;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.25 + 0.75 * Math.abs(
          Math.sin(now * s.twinkleSpeed + s.twinkleOffset)
        );
        const opacity = s.baseOpacity * twinkle;

        let drawX = s.x;
        let drawY = s.y;
        if (doParallax) {
          drawX += (lm.x - 0.5) * s.depth * 14;
          drawY += (lm.y - 0.5) * s.depth * 8;
        }

        ctx.globalAlpha = opacity;
        ctx.fillStyle = `rgba(${s.color},1)`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Comets ─────────────────────────────────────────────
      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const c = cometsRef.current[i];
        if (!c.active) {
          cometsRef.current.splice(i, 1);
          continue;
        }

        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;
        c.life -= c.decayRate;

        if (c.life <= 0 || c.x < -50 || c.y > vh + 50) {
          c.active = false;
          cometsRef.current.splice(i, 1);
          continue;
        }

        const tailX = c.x - Math.cos(c.angle) * c.tailLength;
        const tailY = c.y - Math.sin(c.angle) * c.tailLength;

        const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.6, `rgba(220,235,255,${c.life * 0.3})`);
        grad.addColorStop(1, `rgba(255,255,255,${c.life * 0.9})`);

        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = c.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();

        // Tiny glow at head
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.width * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${c.life * 0.7})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animRef.current);
      if (cometTimerRef.current) clearTimeout(cometTimerRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="global-space-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="global-space-bg__canvas" />
      <div className="global-space-bg__vignette" />
    </div>
  );
});

GlobalSpaceBg.displayName = 'GlobalSpaceBg';
export default GlobalSpaceBg;
