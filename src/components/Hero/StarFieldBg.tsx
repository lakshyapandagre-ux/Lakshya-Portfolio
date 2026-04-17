import { useEffect, useRef, memo } from 'react';
import './StarFieldBg.css';

// ── Types ────────────────────────────────────────────────────
interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
  color: string; // "R,G,B"
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  life: number;
  decayRate: number;
  active: boolean;
}

// ── Helpers ──────────────────────────────────────────────────
function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pickColor(): string {
  const r = Math.random();
  if (r < 0.85) return '255,255,255';       // pure white
  if (r < 0.95) return '210,228,255';       // ice blue
  return '200,255,220';                      // mint
}

function pickSize(): number {
  const r = Math.random();
  if (r < 0.55) return rand(0.4, 0.9);     // dust — 55%
  if (r < 0.85) return rand(1.0, 1.6);     // small — 30%
  return rand(1.8, 2.8);                    // bright — 15%
}

// ── Star generation with intentional clustering ──────────────
function generateStars(w: number, h: number, count: number): Star[] {
  const GRID_COLS = 6;
  const GRID_ROWS = 4;
  const cellW = w / GRID_COLS;
  const cellH = h / GRID_ROWS;

  // Create density map — some zones get 0 stars (void patches)
  const densityMap: number[] = [];
  let totalWeight = 0;
  for (let i = 0; i < GRID_COLS * GRID_ROWS; i++) {
    // ~20% chance of void, ~15% chance of dense cluster, rest normal
    const r = Math.random();
    let weight: number;
    if (r < 0.18) weight = 0;            // void
    else if (r < 0.33) weight = 2.5;     // dense cluster
    else weight = 0.8 + Math.random() * 0.6; // normal
    densityMap.push(weight);
    totalWeight += weight;
  }

  // Distribute stars proportionally across zones
  const stars: Star[] = [];
  for (let i = 0; i < GRID_COLS * GRID_ROWS; i++) {
    if (densityMap[i] === 0) continue;
    const zoneCount = Math.round((densityMap[i] / totalWeight) * count);
    const col = i % GRID_COLS;
    const row = Math.floor(i / GRID_COLS);
    const zoneX = col * cellW;
    const zoneY = row * cellH;

    for (let j = 0; j < zoneCount; j++) {
      stars.push({
        x: zoneX + Math.random() * cellW,
        y: zoneY + Math.random() * cellH,
        size: pickSize(),
        baseOpacity: rand(0.25, 0.95),
        twinkleSpeed: rand(0.0008, 0.004),
        twinkleOffset: rand(0, Math.PI * 2),
        depth: rand(0.1, 1.0),
        color: pickColor(),
      });
    }
  }

  return stars;
}

// ── Component ────────────────────────────────────────────────
const StarFieldBg = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar>({
    x: 0, y: 0, angle: 0, speed: 0, length: 0,
    life: 0, decayRate: 0, active: false,
  });
  const shootTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Mouse state
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const lerpMouseRef = useRef({ x: 0.5, y: 0.5 });

  // Cursor constellation tracking
  const cursorHistoryRef = useRef<{ x: number; y: number; t: number }[]>([]);
  const constellationRef = useRef<{
    lines: { x1: number; y1: number; x2: number; y2: number; birth: number }[];
  }>({ lines: [] });
  const lastThrottleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cw = 0;
    let ch = 0;

    // ── Resize ───────────────────────────────────────────────
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      cw = rect.width;
      ch = rect.height;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = window.innerWidth < 768 ? 100 : 220;
      starsRef.current = generateStars(cw, ch, count);
    };

    resize();
    const ro = new ResizeObserver(resize);
    const parent = canvas.parentElement;
    if (parent) ro.observe(parent);

    // ── Mouse handling ───────────────────────────────────────
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      targetMouseRef.current.x = e.clientX / window.innerWidth;
      targetMouseRef.current.y = e.clientY / window.innerHeight;

      // Throttled cursor history for constellation
      const now = performance.now();
      if (now - lastThrottleRef.current > 80) {
        lastThrottleRef.current = now;
        const history = cursorHistoryRef.current;
        history.push({ x: e.clientX, y: e.clientY, t: now });
        if (history.length > 6) history.shift();
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Shooting star scheduler ──────────────────────────────
    const spawnShootingStar = () => {
      shootingRef.current = {
        x: cw * rand(0.55, 0.95),
        y: ch * rand(0, 0.25),
        angle: rand(210, 240) * (Math.PI / 180),
        speed: rand(7, 11),
        length: rand(90, 150),
        life: 1.0,
        decayRate: 0.022,
        active: true,
      };
      scheduleNextShoot();
    };

    const scheduleNextShoot = () => {
      shootTimerRef.current = setTimeout(spawnShootingStar, rand(5000, 11000));
    };

    scheduleNextShoot();

    // ── Render loop ──────────────────────────────────────────
    const draw = (_time: number) => {
      if (!ctx) return;
      const now = performance.now();
      ctx.clearRect(0, 0, cw, ch);

      // Smooth mouse lerp
      const lm = lerpMouseRef.current;
      const tm = targetMouseRef.current;
      lm.x += (tm.x - lm.x) * 0.04;
      lm.y += (tm.y - lm.y) * 0.04;

      // ── Draw stars ─────────────────────────────────────────
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.3 + 0.7 * Math.abs(
          Math.sin(now * s.twinkleSpeed + s.twinkleOffset)
        );
        const opacity = s.baseOpacity * twinkle;

        const drawX = s.x + (lm.x - 0.5) * s.depth * 18;
        const drawY = s.y + (lm.y - 0.5) * s.depth * 10;

        ctx.globalAlpha = opacity;
        ctx.fillStyle = `rgba(${s.color},1)`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Draw shooting star ─────────────────────────────────
      const ss = shootingRef.current;
      if (ss.active) {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life -= ss.decayRate;

        if (ss.life <= 0 || ss.x < -200 || ss.y > ch + 200) {
          ss.active = false;
        } else {
          const tailX = ss.x - Math.cos(ss.angle) * ss.length;
          const tailY = ss.y - Math.sin(ss.angle) * ss.length;

          const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
          grad.addColorStop(0, `rgba(255,255,255,0)`);
          grad.addColorStop(0.7, `rgba(255,255,255,${ss.life * 0.4})`);
          grad.addColorStop(1, `rgba(255,255,255,${ss.life * 0.95})`);

          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(ss.x, ss.y);
          ctx.stroke();
        }
      }

      // ── Cursor constellation ───────────────────────────────
      if (!isMobile) {
        const history = cursorHistoryRef.current;
        const constRef = constellationRef.current;

        // If cursor has been in roughly the same area for > 2s, find nearby stars
        if (history.length >= 3) {
          const latest = history[history.length - 1];
          const oldest = history[0];
          if (latest.t - oldest.t > 2000) {
            // Check cursor stayed roughly still (within 60px)
            const dx = latest.x - oldest.x;
            const dy = latest.y - oldest.y;
            if (Math.sqrt(dx * dx + dy * dy) < 60) {
              // Get hero-local cursor pos
              const heroRect = canvas.parentElement?.getBoundingClientRect();
              if (heroRect) {
                const cx = latest.x - heroRect.left;
                const cy = latest.y - heroRect.top;

                // Find 3 nearest stars
                const scored = stars
                  .map((s, idx) => {
                    const sdx = s.x + (lm.x - 0.5) * s.depth * 18 - cx;
                    const sdy = s.y + (lm.y - 0.5) * s.depth * 10 - cy;
                    return { idx, dist: Math.sqrt(sdx * sdx + sdy * sdy) };
                  })
                  .filter(s => s.dist < 200)
                  .sort((a, b) => a.dist - b.dist)
                  .slice(0, 3);

                if (scored.length >= 2) {
                  // Only add if we don't already have recent lines
                  if (constRef.lines.length === 0 || now - constRef.lines[0].birth > 1500) {
                    constRef.lines = [];
                    for (let a = 0; a < scored.length; a++) {
                      for (let b = a + 1; b < scored.length; b++) {
                        const sa = stars[scored[a].idx];
                        const sb = stars[scored[b].idx];
                        constRef.lines.push({
                          x1: sa.x + (lm.x - 0.5) * sa.depth * 18,
                          y1: sa.y + (lm.y - 0.5) * sa.depth * 10,
                          x2: sb.x + (lm.x - 0.5) * sb.depth * 18,
                          y2: sb.y + (lm.y - 0.5) * sb.depth * 10,
                          birth: now,
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }

        // Draw constellation lines with fade
        const fadeDuration = 1200;
        constRef.lines = constRef.lines.filter(line => {
          const age = now - line.birth;
          if (age > fadeDuration) return false;
          const alpha = 0.12 * (1 - age / fadeDuration);
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = 'rgba(0,102,255,1)';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
          ctx.stroke();
          return true;
        });
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animRef.current);
      if (shootTimerRef.current) clearTimeout(shootTimerRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="starfield-bg" aria-hidden="true">
      {/* Canvas: stars + shooting stars + constellation */}
      <canvas ref={canvasRef} className="starfield-bg__canvas" />

      {/* CSS overlay layers */}
      <div className="starfield-bg__vignette" />
      <div className="starfield-bg__fade-top" />
      <div className="starfield-bg__fade-bottom" />
    </div>
  );
});

StarFieldBg.displayName = 'StarFieldBg';
export default StarFieldBg;
