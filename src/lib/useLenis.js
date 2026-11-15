import { useEffect } from 'react'
import Lenis from 'lenis'

let instance = null
export const getLenis = () => instance

// Smooth scrolling. Skipped for people who ask their OS for reduced motion.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    instance = new Lenis({ duration: 1.15, smoothWheel: true })
    let id
    const raf = (t) => { instance.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); instance.destroy(); instance = null }
  }, [])
}
