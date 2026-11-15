import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'

// Counts up from 0 when it scrolls into view.
export default function Counter({ to, suffix = '', prefix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => { if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString('en-IN') + suffix },
    })
    return () => c.stop()
  }, [inView, to, suffix, prefix, duration])
  return <span ref={ref}>{prefix}0{suffix}</span>
}
