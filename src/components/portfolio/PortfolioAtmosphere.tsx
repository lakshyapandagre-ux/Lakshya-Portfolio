import { useCursorGlow } from '../../hooks/useCursorGlow'

/**
 * Global ambient layers: cursor spotlight, floating blobs, subtle noise.
 * Sits at z-0; page content should use position relative z-[1].
 */
export default function PortfolioAtmosphere() {
  useCursorGlow()

  return (
    <div
      className="portfolio-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Cursor-follow spotlight */}
      <div
        className="portfolio-atmosphere__cursor absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(520px circle at var(--cursor-x, 50vw) var(--cursor-y, 35vh), rgba(0, 102, 255, 0.09), transparent 55%)`,
        }}
      />
      <div
        className="portfolio-atmosphere__cursor-secondary absolute inset-0"
        style={{
          background: `radial-gradient(380px circle at calc(var(--cursor-x, 50vw) + 80px) calc(var(--cursor-y, 35vh) - 40px), rgba(0, 255, 180, 0.05), transparent 50%)`,
        }}
      />

      {/* Floating blobs */}
      <div
        className="portfolio-blob"
        style={{
          left: '-8%',
          top: '6%',
          width: 'min(520px, 58vw)',
          height: 'min(520px, 58vw)',
          background: 'rgba(0, 102, 255, 0.14)',
          animation: 'portfolio-blob-a 22s ease-in-out infinite',
        }}
      />
      <div
        className="portfolio-blob"
        style={{
          right: '-6%',
          top: '28%',
          width: 'min(480px, 50vw)',
          height: 'min(480px, 50vw)',
          background: 'rgba(0, 200, 150, 0.1)',
          animation: 'portfolio-blob-b 18s ease-in-out infinite',
        }}
      />
      <div
        className="portfolio-blob"
        style={{
          left: '18%',
          bottom: '-12%',
          width: 'min(560px, 62vw)',
          height: 'min(420px, 45vh)',
          background: 'rgba(60, 100, 220, 0.08)',
          animation: 'portfolio-blob-c 26s ease-in-out infinite',
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15, 17, 23, 0.4) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 100% 100%, rgba(10, 10, 15, 0.35) 0%, transparent 50%)',
        }}
      />

      {/* Film grain */}
      <div
        className="portfolio-atmosphere__noise pointer-events-none absolute inset-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
