import { useEffect } from 'react'

/** Sets --cursor-x / --cursor-y on :root for radial spotlight (CSS uses vw fallback before first move). */
export function useCursorGlow() {
  useEffect(() => {
    const set = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', set, { passive: true })
    return () => window.removeEventListener('pointermove', set)
  }, [])
}
